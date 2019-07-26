import { Record } from 'immutable'
import { put } from '../../../../services/httpRequest'
import { addLoader, removeLoader } from '../../../../services/loader'
import { actions as authActions } from '../../login/redux'

// ------------------------------------
// Constants
// ------------------------------------
const USER_EDITED_STATUS = 'ACCOUNT_EDITED'
const USER_EDITING_STATUS = 'ACCOUNT_EDITING'
const GENERIC_ERROR_STATUS = 'GENERIC_ERROR'
const USER_EDITING_ERROR_STATUS = 'USER_EDITING_ERROR'
const USER_INITIAL_STATUS = 'ACCOUNT_INITIAL'
const EMAIL_INVALID_STATUS = 'INVALID_EMAIL'
const EMAIL_VALID_STATUS = 'VALID_EMAIL'
const HTTP_STATUS_CODE_401 = 401

export const statusConstants = {
  USER_EDITED_STATUS,
  USER_EDITING_STATUS,
  USER_EDITING_ERROR_STATUS,
  GENERIC_ERROR_STATUS,
  USER_INITIAL_STATUS,
  EMAIL_INVALID_STATUS,
  EMAIL_VALID_STATUS
}

const INVALID_EMAIL = 'profilemanagement/INVALID_EMAIL'
const USER_EDITED = 'user/USER_EDITED'
const USER_EDITING = 'user/USER_EDITING'
const USER_GENERIC_ERROR = 'user/edit/USER_GENERIC_ERROR'
const USER_EDITING_ERROR = 'user/USER_EDITING_ERROR'
const USER_INITIAL = 'user/edit/USER_INITIAL'
const USER_NOT_FOUND = 'user/USER_NOT_FOUND'

export const actionConstants = {
  USER_EDITED,
  USER_EDITING,
  USER_EDITING_ERROR,
  USER_INITIAL,
  USER_NOT_FOUND,
  USER_GENERIC_ERROR
}

// ------------------------------------
// Action creators
// ------------------------------------
const { loggedOut } = authActions
const editUser = (message) => ({ type: USER_EDITED, message })
const userEditing = () => ({ type: USER_EDITING })
const userEditingError = (message) => ({ type: USER_EDITING_ERROR, message })
const userGenericError = (error, log) => ({ type: USER_GENERIC_ERROR, error:new Error(error.message), log })
const userInitial = () => ({ type: USER_INITIAL })
const userNotFound = (message) => ({ type: USER_NOT_FOUND, message })

export const actions = {}

const edit = ({ username, firstName, lastName, password, groupNames, userId, email }, baseUrl) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    dispatch(userEditing())
    const url = baseUrl ? `${baseUrl}/api/v1/user/${userId}` : `/api/v1/user/${userId}`
    const token = getState().authentication.token
    put(url, { username, firstName, lastName, groupNames, email }, { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(editUser(payload.message))
      }, (payload) => {
        dispatch(removeLoader())
        payload && payload.status === HTTP_STATUS_CODE_401 && dispatch(userEditingError(payload.message))
        payload.error && payload.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
        payload.error && payload.error.toLowerCase() === 'not found' &&
        dispatch(userNotFound(payload.message))
        dispatch(userGenericError(payload, true))
      })
      .catch(err => {
        console.log(err)
        dispatch(removeLoader())
        dispatch(userGenericError(err, true))
      })
  }
}

const clear = () => {
  return (dispatch, getState) => {
    dispatch(userInitial())
  }
}

export const features = {
  edit,
  clear
}
// ------------------------------------
// Reducer
// ------------------------------------

const User = new Record({
  status: null,
  message:'',
  log:''
})

const initialState = new User()

const actionHandlers = {
  [USER_EDITING]: (state) => state.set('status', USER_EDITING_STATUS),

  [USER_EDITED]: (state, { message }) => {
    return state.merge({
      status: USER_EDITED_STATUS
    })
  },
  [INVALID_EMAIL]: (state, { exist }) => state.set('status', exist ? EMAIL_INVALID_STATUS : EMAIL_VALID_STATUS),
  [USER_INITIAL]: (state) => state.merge({
    status: USER_INITIAL_STATUS,
    log:'',
    message:''
  }),
  [USER_EDITING_ERROR]: (state) => state.set('status', USER_EDITING_ERROR_STATUS),
  [USER_GENERIC_ERROR]: (state, { error, log }) => state.merge({
    log:log && error,
    message : log ? 'Unable to Edit User' : error,
    status : GENERIC_ERROR_STATUS
  })
}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

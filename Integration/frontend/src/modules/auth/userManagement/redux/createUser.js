import { Record } from 'immutable'
import { post, get } from '../../../../services/httpRequest'
import { addLoader, removeLoader } from '../../../../services/loader'
import { actions as authActions } from '../../login/redux'
// ------------------------------------
// Constants
// ------------------------------------
const USER_CREATED_STATUS = 'ACCOUNT_CREATED'
const USER_CREATING_STATUS = 'ACCOUNT_CREATING'
const USER_CREATING_ERROR_STATUS = 'USER_CREATING_ERROR'
const USER_GENERIC_ERROR_STATUS = 'USER_GENERIC_ERROR_STATUS'
const USER_INITIAL_STATUS = 'ACCOUNT_INITIAL'
const USER_INVALID_STATUS = 'INVALID_USERNAME'
const USER_VALID_STATUS = 'VALID_USERNAME'
const EMAIL_INVALID_STATUS = 'INVALID_EMAIL'
const EMAIL_VALID_STATUS = 'VALID_EMAIL'

const HTTP_STATUS_CODE_400 = 400
const HTTP_STATUS_CODE_404 = 404

export const statusConstants = {
  USER_CREATED_STATUS,
  USER_CREATING_STATUS,
  USER_CREATING_ERROR_STATUS,
  USER_GENERIC_ERROR_STATUS,
  USER_INITIAL_STATUS,
  USER_INVALID_STATUS,
  USER_VALID_STATUS,
  EMAIL_INVALID_STATUS,
  EMAIL_VALID_STATUS
}

// ----------------------
// actions
// ----------------------
const INVALID_EMAIL = 'profilemanagement/INVALID_EMAIL'
const USER_CREATED = 'user/USER_CREATED'
const USER_CREATING = 'user/USER_CREATING'
const USER_CREATING_ERROR = 'user/USER_CREATING_ERROR'
const INVALID_USER = 'user/INVALID_USER'
const USER_INITIAL = 'user/create/USER_INITIAL'
const USER_GENERIC_ERROR = 'user/create/USER_GENERIC_ERROR'
// const VALIDATE_USERNAME = 'user/VALIDATE_USERNAME'

export const actionConstants = {
  INVALID_EMAIL,
  USER_CREATED,
  USER_CREATING,
  USER_CREATING_ERROR,
  INVALID_USER,
  USER_INITIAL,
  USER_GENERIC_ERROR
}

// ------------------------------------
// Action creators
// ------------------------------------
const { loggedOut } = authActions
const createUser = (message) => ({ type: USER_CREATED, message })
const userCreating = () => ({ type: USER_CREATING })
const userCreatingError = (message) => ({ type: USER_CREATING_ERROR, message })
const userInvalid = (exist) => ({ type: INVALID_USER, exist })
const userInitial = () => ({ type: USER_INITIAL })
const userGenericError = (error, log) => ({ type: USER_GENERIC_ERROR, error: new Error(error.message), log })

export const actions = {}

const create = ({ username, firstName, lastName, password, groupNames, email }, baseUrl) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    dispatch(userCreating())
    const url = baseUrl ? `${baseUrl}/api/v1/user` : `/api/v1/users`
    const token = getState().authentication.token
    post(url, { username, firstName, lastName, password, groupNames, email },
      { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(createUser(payload.message))
      }, (payload) => {
        dispatch(removeLoader())
        payload && payload.status === HTTP_STATUS_CODE_400 &&
         dispatch(userCreatingError(payload.message))
        payload.error && payload.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
        dispatch(userGenericError(payload, true))
      })
      .catch(err => {
        console.log(err)
        dispatch(removeLoader())
        dispatch(userGenericError(err, true))
      })
  }
}

const validateUsername = (userName, baseUrl) => {
  return (dispatch, getState) => {
    const token = getState().authentication.token
    const url = baseUrl ? `${baseUrl}/api/v1/user/validate` : `/api/v1/user/validate`
    get(url, { userName }, { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(payload => {
        dispatch(userInvalid(payload.data.isExist))
      }, (payload) => {
        payload && payload.status === HTTP_STATUS_CODE_404 && dispatch(userInvalid(payload.data.isExist))
      })
      .catch(err => {
        dispatch(userGenericError(err, true))
        console.log(err)
      })
  }
}

const clear = () => {
  return (dispatch, getState) => {
    dispatch(userInitial())
  }
}

export const features = {
  create,
  validateUsername,
  clear
}

// ------------------------------------
// Reducer
// ------------------------------------

const User = new Record({
  status: null,
  log:'',
  message:''
})

const initialState = new User()

const actionHandlers = {
  [USER_CREATING]: (state) => state.set('status', USER_CREATING_STATUS),

  [USER_CREATED]: (state) => {
    return state.merge({
      status: USER_CREATED_STATUS
    })
  },

  [USER_INITIAL]: (state) => state.merge({
    status: USER_INITIAL_STATUS,
    log:'',
    message:''
  }),

  [INVALID_USER]: (state, { exist }) => state.set('status', exist ? USER_INVALID_STATUS : USER_VALID_STATUS),

  [INVALID_EMAIL]: (state, { exist }) => state.set('status', exist ? EMAIL_INVALID_STATUS : EMAIL_VALID_STATUS),

  [USER_CREATING_ERROR]: (state) => state.set('status', USER_CREATING_ERROR_STATUS),

  [USER_GENERIC_ERROR]: (state, { error, log }) => {
    log = log && error
    const message = log ? 'Unable to create user.' : error
    const nextState = Object.assign({}, state, { status: USER_GENERIC_ERROR_STATUS, message, log })
    return nextState
  }
}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

import { Record } from 'immutable'
import { post } from '../../../../services/httpRequest'
import { getUserSettings, cacheKeys } from '../../../../services/userSettings'
import { addLoader, removeLoader } from '../../../../services/loader'
import { actions } from '../../login/redux'
// ------------------------------------
// Constants
// ------------------------------------
export const GENERIC_ERROR_STATUS = 'GENERIC_ERROR'
export const UPDATING_PASSWORD_STATUS = 'UPDATING_PASSWORD_STATUS'
export const PASSWORD_UPDATED_STATUS = 'PASSWORD_UPDATED_STATUS'
export const INVALID_UPDATE_STATUS = 'INVALID_UPDATE_STATUS'
export const PASSWORD_CHANGE_INITIAL_STATUS = 'PASSWORD_CHANGE_INITIAL'

const HTTP_STATUS_CODE_400 = 400
const HTTP_STATUS_CODE_401 = 401
const HTTP_STATUS_CODE_201 = 201

export const statusConstants = {
  GENERIC_ERROR_STATUS,
  UPDATING_PASSWORD_STATUS,
  PASSWORD_UPDATED_STATUS,
  INVALID_UPDATE_STATUS,
  PASSWORD_CHANGE_INITIAL_STATUS
}

// -----------------------------
// actions
// ------------------------------

const PASSWORD_CHANGE_INITIAL = 'changePassword/PASSWORD_CHANGE_INITIAL'
const PASSWORD_UPDATED = '/changePassword/PASSWORD_UPDATED'
const UPDATING_PASSWORD = '/changePassword/UPDATING_PASSWORD'
const INVALID_UPDATE = '/changePassword/INVALID_UPDATE'

export const actionConstants = {
  PASSWORD_CHANGE_INITIAL,
  PASSWORD_UPDATED,
  UPDATING_PASSWORD,
  INVALID_UPDATE
}

// ------------------------------------
// Action creators
// ------------------------------------
const {loggedOut} = actions
const passwordUpdated = (message) => ({ type: PASSWORD_UPDATED, message })

const updatingPassword = () => ({
  type: UPDATING_PASSWORD
})

const initialStatus = () => ({
  type: PASSWORD_CHANGE_INITIAL
})

const invalidUpdate = (message) => ({ type: INVALID_UPDATE, message })

const updatePassword = (currentPassword, newPassword, confirmPassword, url) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    dispatch(updatingPassword())
    const baseUrl = url ? `${url}/api/v1/user/change_password` : `/api/v1/user/change_password`
    const token = getState().authentication.token
    // post(`${url}/api/v1/users/change_password`,{currentpassword,newpassword},{'Authorization':`Bearer ${token}`})
    post(baseUrl, { currentPassword, newPassword, confirmPassword }, { 'Authorization':`Bearer ${token}` }, true)
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(passwordUpdated(payload.message))
      }, (payload) => {
        dispatch(removeLoader())
        payload && payload.status === HTTP_STATUS_CODE_400 &&
         dispatch(invalidUpdate(payload.message))
        payload.error && payload.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
      })
      .catch(err => {
        console.log(err)
        dispatch(removeLoader())
        // dispatch(error())
      })
  }
}

const clearChangePassword = () => {
  return (dispatch) => {
    dispatch(initialStatus())
  }
}

export const features = {
  clearChangePassword,
  updatePassword
}

// ------------------------------------
// Reducer
// ------------------------------------
const token = getUserSettings()[cacheKeys.AUTH_KEY] && getUserSettings()[cacheKeys.AUTH_KEY].token
const User = new Record({
  status: null,
  token: token,
  message: ''
})

const initialState = new User()

const actionHandlers = {
  [UPDATING_PASSWORD]: (state) => state.set('status', UPDATING_PASSWORD_STATUS),
  [INVALID_UPDATE]: (state, { message }) => {
    return state.merge({
      status: INVALID_UPDATE_STATUS,
      message
    })
  },

  [PASSWORD_UPDATED]: (state, { message }) => {
    return state.merge({
      status: PASSWORD_UPDATED_STATUS,
      message
    })
  },
  [PASSWORD_CHANGE_INITIAL]: (state) => state.set('status', PASSWORD_CHANGE_INITIAL_STATUS)
}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

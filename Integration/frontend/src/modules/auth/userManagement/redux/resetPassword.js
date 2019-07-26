import { put } from '../../../../services/httpRequest'
import { addLoader, removeLoader } from '../../../../services/loader'
import { actions as authActions } from '../../login/redux'
// ------------------------------------
// Constants
// ------------------------------------
const HTTP_STATUS_CODE_401 = 401

const PASSWORD_UPDATED_STATUS = 'PASSWORD_UPDATED_STATUS'
const PASSWORD_UPDATING_STATUS = 'PASSWORD_UPDATING_STATUS'
const INVALID_CONFIRM_PASSWORD = 'INVALID_CONFIRM_PASSWORD'
const GENERIC_ERROR_STATUS = 'GENERIC_ERROR'

export const statusConstants = {
  PASSWORD_UPDATED_STATUS,
  PASSWORD_UPDATING_STATUS,
  INVALID_CONFIRM_PASSWORD,
  GENERIC_ERROR_STATUS
}

// ----------------------
// actions
// ----------------------
const USER_INITIAL = 'user/USER_INITIAL'
const USER_RESET_PASSWORD = 'user/USER_RESET_PASSWORD'
const USER_RESETING_PASSWORD = 'user/USER_RESETING_PASSWORD'
const RESET_PASSWORD_ERROR = 'user/RESET_PASSWORD_ERROR'
const USER_GENERIC_ERROR = 'user/reset/USER_GENERIC_ERROR'

export const actionConstants = {
  USER_INITIAL,
  USER_RESET_PASSWORD,
  USER_RESETING_PASSWORD,
  RESET_PASSWORD_ERROR,
  USER_GENERIC_ERROR
}

// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------
const { loggedOut } = authActions
const userInitial = () => ({ type: USER_INITIAL })
const resetPassword = (username, message) => ({ type: USER_RESET_PASSWORD, username, message })
const resettingPassword = () => ({ type:USER_RESETING_PASSWORD })
const resetPasswordError = (message) => ({ type:RESET_PASSWORD_ERROR, message })
const userGenericError = (error, log) => ({ type: USER_GENERIC_ERROR, error:new Error(error.message), log })

export const actions = {}

const clear = () => {
  return userInitial()
}

const resetPasswordUser = (username, newPassword, confirmPassword, baseUrl) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    dispatch(resettingPassword())
    const token = getState().authentication.token
    const url = baseUrl ? `${baseUrl}/api/v1/user/reset_password/${username}`
    : `/api/v1/user/reset_password/${username}`
    put(url, { newPassword, confirmPassword }, { 'Authorization':`Bearer ${token}` }, true)
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(resetPassword(username, payload.message))
      }, (payload) => {
        dispatch(removeLoader())
        payload && payload.status === HTTP_STATUS_CODE_401 && dispatch(resetPasswordError(payload.message))
        payload.error && payload.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
        dispatch(userGenericError(payload))
      })
      .catch(err => {
        console.log(err)
        dispatch(removeLoader())
        dispatch(userGenericError(err, true))
      })
  }
}

export const features = {
  resetPasswordUser,
  clear
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  message:'',
  actionedUser:'',
  status : false,
  log:''
}

const actionHandlers = {
  [USER_RESET_PASSWORD]: (state, { username, message }) => {
    message = message || 'Password reset successfully.'
    const nextState = Object.assign({}, state, { message, status: PASSWORD_UPDATED_STATUS, actionedUser: username })
    return nextState
  },
  [USER_RESETING_PASSWORD]: (state) => {
    const nextState = Object.assign({}, state, { status: PASSWORD_UPDATING_STATUS })
    return nextState
  },
  [RESET_PASSWORD_ERROR]: (state, { message }) => {
    const nextState = Object.assign({}, state, { message })
    return nextState
  },
  [USER_INITIAL]: (state) => {
    return initialState
  },
  [USER_GENERIC_ERROR]: (state, { error, log }) => {
    log = log && error
    const message = log ? 'Unable to reset password.' : error
    const nextState = Object.assign({}, state, { status: GENERIC_ERROR_STATUS, message, log })
    return nextState
  }

}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

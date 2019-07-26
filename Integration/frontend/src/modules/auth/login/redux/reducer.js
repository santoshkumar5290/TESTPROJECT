import { Record } from 'immutable'
import { getUserSettings, getSessionSettings, cacheKeys } from '../../../../services/userSettings'

import { actionConstants, statusConstants, features } from './actions'

// ------------------------------------
// Reducer
// ------------------------------------
const token = getUserSettings()[cacheKeys.AUTH_KEY] && getUserSettings()[cacheKeys.AUTH_KEY].token
const tokenTimeout = getUserSettings()[cacheKeys.AUTH_KEY] && getUserSettings()[cacheKeys.AUTH_KEY].expiry || 0
const refreshToken = null
const interAppAuth = getSessionSettings()[cacheKeys.INTERAUTH_KEY] && getSessionSettings()[cacheKeys.INTERAUTH_KEY].interAppAuth
let Auth = new Record({
  loggedIn : Boolean(token),
  forcedLogOut : false,
  status: null,
  token: token,
  refreshToken,
  tokenTimeout,
  message: '',
  log:'',
  interAppAuth:Boolean(interAppAuth),
  username: getUserSettings()[cacheKeys.AUTH_KEY] && getUserSettings()[cacheKeys.AUTH_KEY].username
})

const initialState = new Auth()

const actionHandlers = {
  [actionConstants.LOGGING_IN]: (state) => state.set('status', statusConstants.LOGGING_IN_STATUS),

  [actionConstants.REFRESHING_SESSION]: (state) => state.set('status', statusConstants.REFRESHING_SESSION_STATUS),

  [actionConstants.LOGGED_IN]: (state, { token, refreshToken, tokenTimeout, username }) => {
    let nextState = state
    if (token) {
      nextState = state.merge({
        loggedIn : true,
        forcedLogOut : false,
        status: statusConstants.LOGGED_IN_STATUS,
        token,
        refreshToken,
        tokenTimeout,
        username
      })
    }
    return nextState
  },

  [actionConstants.LOGGED_OUT]: (state, { token }) => {
    return state.merge({
      loggedIn : false,
      status: statusConstants.LOGGED_OUT_STATUS,
      forcedLogOut : false,
      token,
      username:null
    })
  },
  [actionConstants.FORCED_LOGG_OUT]: (state, { token, message }) => {
    return state.merge({
      loggedIn : false,
      status: statusConstants.LOGGED_OUT_STATUS,
      forcedLogOut : true,
      token,
      message,
      username:null
    })
  },

  [actionConstants.WRONG_CREDS]: (state) => state.set('status', statusConstants.WRONG_CREDS_STATUS),

  [actionConstants.LOGIN_GENERIC_ERROR]: (state, { error, log }) => state.merge({
    log:log && error,
    message : log ? 'Unable to Login' : error,
    status : statusConstants.GENERIC_ERROR_STATUS
  }),

  [actionConstants.LOGIN_INITIAL]: (state) => state.set('status', statusConstants.LOGIN_INITIAL_STATUS)

}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
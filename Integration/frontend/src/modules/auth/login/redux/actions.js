import { get, post, getAuthenticationURL } from '../../../../services/httpRequest'
import { addLoader, removeLoader } from '../../../../services/loader'
import { updateSnack, updateLog } from '../../../../services/snackbar'

// ------------------------------------
// Constants
// ------------------------------------
export const HTTP_STATUS_CODE_400 = 400
export const HTTP_STATUS_CODE_401 = 401
export const HTTP_STATUS_CODE_201 = 201

// -----------------------------
// actions
// ------------------------------

// ------------------------------------
// Action creators
// ------------------------------------

const loggingIn = () => ({
  type: actionConstants.LOGGING_IN
})

const loggedIn = (token, refreshToken, tokenTimeout, username, interAppAuth) => ({
  type: actionConstants.LOGGED_IN,
  token,
  refreshToken,
  tokenTimeout,
  username,
  interAppAuth
})

const refreshingSession = () => ({
  type: actionConstants.REFRESHING_SESSION
})

export const loggedOut = (forced = false) => {
  if (forced) {
    return ({
      type: actionConstants.FORCED_LOGG_OUT
    })
  } else {
    return ({
      type: actionConstants.LOGGED_OUT
    })
  }
}

const error = (error, log) => ({
  type: actionConstants.LOGIN_GENERIC_ERROR,
  error: new Error(error.message),
  log
})

const wrongCreds = () => ({
  type: actionConstants.WRONG_CREDS
})

const initialStatus = () => ({
  type: actionConstants.LOGIN_INITIAL
})

const interApplicationHandshake = () => ({
  type: actionConstants.INTER_APP_HANDSHAKE
})

const login = (username, password, baseUrl) => {
  return (dispatch) => {
    dispatch(addLoader())
    dispatch(loggingIn())
    const url = baseUrl ? `${baseUrl}/oauth/token` : `/oauth/token`
    post(url, {
      username,
      password,
      grant_type: 'password',
      client_id: 'clientapp',
      client_secret: '123456'
    }, { 'Authorization': 'Basic Y2xpZW50YXBwOjEyMzQ1Ng==' }, true)
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(loggedIn(payload.access_token, payload.refresh_token, 120, username))
      }, (payload, status) => {
        dispatch(removeLoader())
        if (payload && payload.error === 'invalid_grant') {
          if (payload.error_description === 'Bad credentials') {
            dispatch(wrongCreds())
          }
          if (payload.error_description === 'User is disabled') {
            dispatch(error(payload.error_description))
          }
        } else {
          dispatch(error(payload, true))
        }
      })
      .catch(err => {
        dispatch(removeLoader())
        dispatch(error(err, true))
        console.log(err)
      })
  }
}

const interApplicationLogin = (loggedInData) => {
  return (dispatch) => {
    // dispatch(addLoader())
    // dispatch(loggingIn())
    // dispatch(removeLoader())
    console.log(loggedInData)
    dispatch(loggedIn(loggedInData.data.access_token, loggedInData.data.refresh_token, 120, loggedInData.username, true))
  }
}

const refreshingtoken = (username, refreshtoken, baseUrl) => {
  return (dispatch) => {
    dispatch(addLoader())
    dispatch(refreshingSession())
    const url = baseUrl ? `${baseUrl}/oauth/token` : `/oauth/token`
    post(url, {
      grant_type: 'refresh_token',
      client_id: 'clientapp',
      client_secret: '123456',
      refresh_token: refreshtoken
    }, { 'Authorization': 'Basic Y2xpZW50YXBwOjEyMzQ1Ng==' }, true)
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(loggedIn(payload.access_token, payload.refresh_token, 120, username))
      }, (payload, status) => {
        dispatch(removeLoader())
        payload && payload.error === 'invalid_grant'
          ? dispatch(wrongCreds())
          : dispatch(error(payload, true))
      })
      .catch(err => {
        dispatch(removeLoader())
        dispatch(error(err, true))
        console.log(err)
      })
  }
}
const logout = (baseUrl, inActive = 'active') => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    const token = getState().authentication.token
    const url = baseUrl ? `${baseUrl}/api/v1/user/logout` : `/api/v1/user/logout`
    post(url, {}, { 'Authorization': `Bearer ${token}` })
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(loggedOut())
      }, (payload) => {
        dispatch(removeLoader())
        payload && (payload.status === HTTP_STATUS_CODE_401) && dispatch(error(payload, true))
        payload.error && payload.error.toLowerCase() === 'invalid_token' &&
         (inActive == 'inActive' ? dispatch(loggedOut()) : dispatch(loggedOut(true)))
        dispatch(error(payload, true))
      })
      .catch(err => {
        dispatch(removeLoader())
        dispatch(error(err, true))
        console.log(err)
      })
  }
}

const initInterApplicationHandshake = (baseUrl, facilityUrl) => {
  return (dispatch, getState) => {
    const token = getState().authentication.token
    const username = getState().authentication.username
    // bind with facilityUrl , so that the url doesn't change
    const startHandshakeWithFacilityUrl = startHandshake.bind(null, facilityUrl)
    fetchApplicationToken(baseUrl, facilityUrl, token, username, startHandshakeWithFacilityUrl, dispatch)
    dispatch(interApplicationHandshake())
  }
}

function startHandshake (facilityUrl, handShakeData) {
  let timeout
  if (handShakeData) {
    window.addEventListener('message', (event) => {
      if (facilityUrl.indexOf(event.origin) < 0) {
        return
      }
      if (event.data === 'SUCCESS') {
        clearInterval(timeout)
      }
    }, { once:true })
  }

  const redirectedWindow = window.open(facilityUrl, '_blank')

  timeout = handShakeData && setInterval(() => {
          // console.log('EA : send message')
    redirectedWindow.postMessage(handShakeData, facilityUrl)
  }, 2000)
}

const fetchApplicationToken = (baseUrl, facilityUrl, token, username, callback, dispatch) => {
  dispatch(addLoader())
  const facility_url = new URL(facilityUrl)
  const url = baseUrl ? `${baseUrl}/api/v1/token/launchtrustedapplication` : `/api/v1/token/launchtrustedapplication`
  get(url, {
    client_id: 'clientapp',
    facility_url: facility_url.href }, // facility login backend url
      { Authorization: `Bearer ${token}` }, true)
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        callback({ ...payload, username })
      }, (payload, status) => {
        dispatch(removeLoader())
        if (facility_url.port === '5080') {
          callback()
        } else {
          facility_url.port = 5080
          fetchApplicationToken(baseUrl, facility_url.href, token, username, callback, dispatch)
        }
      })
      .catch(err => {
        dispatch(removeLoader())
        var snack = {
          message: 'Inter Authentication Failed',
          action: 'REPORT',
          log: err
        }
        callback()
        dispatch(updateSnack(snack))
        console.log(err)
      })
}

const clear = () => {
  return initialStatus()
}

export const statusConstants = {
  LOGIN_READY_STATUS: 'LOGIN_READY',
  LOGGED_IN_STATUS: 'LOGGED_IN',
  LOGGED_OUT_STATUS: 'LOGGED_OUT',
  LOGGING_IN_STATUS: 'LOGGING_IN',
  GENERIC_ERROR_STATUS: 'GENERIC_ERROR',
  LOGIN_INITIAL_STATUS: 'LOGIN_INITIAL',
  WRONG_CREDS_STATUS: 'WRONG_CREDS',
  REFRESHING_SESSION_STATUS: 'REFRESHING_SESSION_STATUS',
  INTER_APP_AUTH_STATUS : 'INTER_APP_AUTH_SUCCESS',
  INTER_APP_HANDSHAKE_STATUS : 'INTER_APP_HANDSHAKE_SUCCESS'
}

export const actionConstants = {
  LOGGING_IN: 'auth/LOGGING_IN',
  LOGGED_IN: 'auth/LOGGED_IN',
  LOGGED_OUT: 'auth/LOGGED_OUT',
  FORCED_LOGG_OUT: 'auth/FORCED_LOGG_OUT',
  LOGIN_GENERIC_ERROR: 'auth/GENERIC_ERROR',
  LOGIN_INITIAL: 'auth/LOGIN_INITIAL',
  WRONG_CREDS: 'auth/WRONG_CREDS',
  REFRESHING_SESSION: 'auth/REFRESHING_SESSION',
  INTER_APP_AUTH: 'auth/INTER_APP_AUTH',
  INTER_APP_HANDSHAKE: 'auth/INTER_APP_HANDSHAKE'
}

export const actions = {
  initialStatus,
  loggingIn,
  loggedIn,
  loggedOut,
  refreshingtoken,
  wrongCreds,
  interApplicationHandshake,
  error
}

export const features = {
  login,
  interApplicationLogin,
  logout,
  clear,
  refreshingtoken,
  initInterApplicationHandshake
}

import { Record } from 'immutable'
import { get } from './httpRequest'

// ------------------------------------
// Constants
// ------------------------------------
export const HTTP_STATUS_CODE_400 = 400
export const HTTP_STATUS_CODE_401 = 401
export const HTTP_STATUS_CODE_201 = 201

export const APP_SETTINGS_RECEIVED = 'SICKPlatform/APP_SETTINGS_RECEIVED'

// ------------------------------------
// Actions
// ------------------------------------
const settingsReceived = (payload, message) => ({ type: APP_SETTINGS_RECEIVED, payload, message })

export const loadAppSettings = (baseUrl) => {
  return (dispatch, getState) => {
    const url = baseUrl ? `${baseUrl}/api/v1/settings` : `/api/v1/settings`
    get(url)
      .then(response => (response.json()))
      .then(response => {
        dispatch(settingsReceived(transformState(response.data), response.message))
      }, (response, status) => {
        response && response.status === HTTP_STATUS_CODE_401
      })
      .catch(err => {
        console.log(err)
      })
  }
}

/*
 ** the transformState function will change as the data from API
 ** will change according to the groups of the keys.
*/
const transformState = (state) => {
  let transformedState = {}
  if (Array.isArray(state)) {
    transformedState = state.reduce((prev, curr) => {
      prev[curr.key] = curr.value
      return prev
    }, {})
  }
  return transformedState
}

const AppSettings = Record({
  idleTimeout:{
    value : 120,
    reminder : 30,
    factor : 1,
    unit : 'seconds'
  },
  message: null
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const initialState = new AppSettings()

const actionHandlers = {
  [APP_SETTINGS_RECEIVED]: (state, { payload, message }) => {
    return state.set('idleTimeout', {
      value : Math.max(0, Number(payload.idle_timeout)),
      reminder : Math.max(0, Number(payload.idle_timeout_reminder)),
      factor : Math.max(1, Number(payload.factor || 1)),
      unit : payload.unit
    }).set('message', message)
  }
}

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

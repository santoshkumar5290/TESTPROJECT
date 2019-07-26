import { post } from './httpRequest'
import { addLoader, removeLoader } from './loader'
// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_MESSAGE = 'SICKPlatform/UPDATE_MESSAGE'
export const CREATE_LOG = 'SICKPlatform/CREATE_LOG'

// ------------------------------------
// Actions
// ------------------------------------
const snackUpdated = (payload) => ({ payload, type: UPDATE_MESSAGE })
const errorLogged = () => ({ type: CREATE_LOG })
let snackId = 0

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateSnack = (snackData) => {
  snackData.id = ++snackId
  return (dispatch) => {
    dispatch(snackUpdated(snackData))
  }
}

export const updateLog = (log, baseUrl) => {
  // log API call - To do
  let errorLog = {}
  if (log instanceof Error) {
    errorLog.error = log.message
    errorLog.stack = log.stack
  }
  console.log(errorLog)
  return (dispatch, getState) => {
    dispatch(addLoader())
    const authState = getState().authentication
    errorLog.user = authState.loggedIn ? authState.username : 'Guest'
    const url = baseUrl ? `${baseUrl}/api/v1/log` : `/api/v1/log`
    post(url, errorLog)
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(errorLogged())
      }, (payload, status) => {
        dispatch(removeLoader())
      })
      .catch(() => {
        dispatch(removeLoader())
      })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  id: snackId,
  action: '',
  log: '',
  message: '',
  onActionTouchTap: null
}

export default function snackbarReducer (state = initialState, action) {
  if (action.type !== UPDATE_MESSAGE) return state
  const nextState = Object.assign({}, action.payload)
  return nextState
}

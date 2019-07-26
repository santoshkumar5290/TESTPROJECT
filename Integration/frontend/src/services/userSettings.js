// This file is same as that in widgets ducks , it will listen to the same action UPDATE
// created in repo/store/userSettings so that any changes to localStorage can be listened
// and kept in sync with this file's state . From here the preferences updated
// in localStorage will be posted to backend.

// ------------------------------------
// Constants
// ------------------------------------
const UPDATE = 'UPDATE'
// const PREFERENCE_UPDATING = 'PREFERENCE_UPDATING'
const UPDATE_PACKAGE_LIST = 'UPDATE_PACKAGE_LIST'
export const cacheKeys = {
  AUTH_KEY: 'auth',
  PREFERENCE_KEY: 'preferences',
  INTERAUTH_KEY: 'interAuth'
}

// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------

const update = (settings, key, session) => ({ type: UPDATE, settings, key, session })
const updatedUserPreferences = (packageListColumns, key) => ({ type: UPDATE_PACKAGE_LIST, packageListColumns, key })

function save (key, settings, session) {
  session ? sessionStorage.setItem(key, JSON.stringify(settings)) : localStorage.setItem(key, JSON.stringify(settings))
}

/** @private */
export function updateUserSettings (settings) {
  const updatedSettings = Object.assign({}, JSON.parse(localStorage.getItem(cacheKeys.AUTH_KEY)), settings)
  return update(updatedSettings, cacheKeys.AUTH_KEY)
}

export function updateInterAppAuthSettings (settings) {
  const updatedSettings = Object.assign({}, JSON.parse(sessionStorage.getItem(cacheKeys.INTERAUTH_KEY)), settings)
  return update(updatedSettings, cacheKeys.INTERAUTH_KEY, true)
}

export function updatePreferences (settings, baseUrl) {
  return updatedUserPreferences(settings, cacheKeys.PREFERENCE_KEY)
}

/** @private
  * returns object same as localStorage
 */
export function getUserSettings () {
  return Object.keys(cacheKeys).reduce((obj, key) => {
    obj[cacheKeys[key]] = JSON.parse(localStorage.getItem(cacheKeys[key]) || '{}')
    return obj
  }, {})
}

/** @private
  * returns object same as sessionStorage
 */
export function getSessionSettings () {
  return Object.keys(cacheKeys).reduce((obj, key) => {
    obj[cacheKeys[key]] = JSON.parse(sessionStorage.getItem(cacheKeys[key]) || '{}')
    return obj
  }, {})
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = { ...getUserSettings(), status:'' }

const actionHandlers = {
  [UPDATE]: (state, { settings, key }) => {
    const nextState = Object.assign({}, state, { [key]:settings })
    save(key, settings)
    return nextState
  },
  [UPDATE_PACKAGE_LIST]: (state, { packageListColumns, key }) => {
    save(key, packageListColumns)
    return state
  }
}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

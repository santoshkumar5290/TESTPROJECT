import { isEmpty } from 'lodash'

import { get, post, put, getAuthenticationURL } from './httpRequest'
import { cacheKeys } from './userSettings'
import { addLoader, removeLoader } from './loader'
import { actions } from 'platform/auth'
// import PackageListRedux from 'ap-widget-repo/PackageListTable/redux'
// This file is same as that in widgets ducks , it will listen to the same action
// UPDATE created in repo/ducks/userSettings so that any changes to localStorage
// can be listened and kept in sync with this file's state.
// From here the preferences updated in localStorage will be posted to backend.

// ------------------------------------
// Constants
// ------------------------------------
export const HTTP_STATUS_CODE_404 = 404
export const HTTP_STATUS_CODE_401 = 401
export const HTTP_STATUS_CODE_201 = 201
const USER_PREFERENCES_UPDATED = 'USER_PREFERENCES_UPDATED'
const USER_PREFERENCES_LOADED = 'USER_PREFERENCES_LOADED'
const GUEST_PREFERENCES_LOADED = 'GUEST_PREFERENCES_LOADED'
const GUEST_PREFERENCES_SAVED = 'GUEST_PREFERENCES_SAVED'
const USER_PREFERENCES_SAVED = 'USER_PREFERENCES_SAVED'
const PREFERENCE_CLEAR = 'PREFERENCE_CLEAR'
const UPDATE_PACKAGE_LIST_COLUMNS = 'UPDATE_PACKAGE_LIST_COLUMNS'
// const preferenceKey = cacheKeys.PREFERENCE_KEY

export const PreferenceTypes = {
  'PACKAGE_LIST_TABLE': 'packageListTable'
}

// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------
const {loggedOut} = actions
const updateUserPreferences = (preference) => ({ type: USER_PREFERENCES_UPDATED, preference })
const loadUserPreferences = (preference) => ({ type: USER_PREFERENCES_LOADED, preference })
const loadGuestPreferences = (preference) => ({ type: GUEST_PREFERENCES_LOADED, preference })
const postGuestPreferences = (preference) => ({ type: GUEST_PREFERENCES_SAVED, preference })
const postUserPreferences = (preference) => ({ type: USER_PREFERENCES_SAVED, preference })

/** @private */
export function setGlobalPreferenceToStorage (packageListColumns) {
  return { type:UPDATE_PACKAGE_LIST_COLUMNS, packageListColumns }
}

export function fetchGuestPreferences (baseUrl) {
  return (dispatch, getState) => {
    dispatch(addLoader())
    if (!getState().authentication.loggedIn) {
      const baseUrl = getAuthenticationURL()
      const url = baseUrl ? `${baseUrl}/api/v1/preferences/global` : `/api/v1/preferences/global`
      get(url)
        .then(response => (response.json()))
        .then(payload => {
          dispatch(removeLoader())
          dispatch(loadGuestPreferences(payload))
        }, (payload) => {
          dispatch(removeLoader())
          payload.error && payload.error.toLowerCase() === 'invalid_token' &&
            dispatch(loggedOut(true))
        })
        .catch(err => {
          dispatch(removeLoader())
          dispatch(loadGuestPreferences(null))
          console.log(err)
        })
      // dispatch(loadGuestPreferences(JSON.stringify(guestPreference)))
    }
  }
}

export function fetchUserPreferences (baseUrl) {
  return (dispatch, getState) => {
    dispatch(addLoader())
    if (getState().authentication.loggedIn) {
      const token = getState().authentication.token
      const baseUrl = getAuthenticationURL()
      const url = baseUrl ? `${baseUrl}/api/v1/preferences/user` : `/api/v1/preferences/user`
      get(url, null, { 'Authorization':`Bearer ${token}` })
        .then(response => (response.json()))
        .then(payload => {
          dispatch(removeLoader())
          if (payload && payload.status === HTTP_STATUS_CODE_404) {
            dispatch(loadUserPreferences({}))
          } else {
            dispatch(loadUserPreferences(payload))
          }
        }, (payload) => {
          dispatch(removeLoader())
          payload.error && payload.error.toLowerCase() === 'invalid_token' &&
            dispatch(loggedOut(true))
        })
        .catch(err => {
          dispatch(removeLoader())
          console.log(err)
        })
    }
  }
}

export const hasUserPreferences = () => {
  return (dispatch, getState) => {
    const userPreferences = getState().userPreference.user.json
    return new Promise((resolve, reject) =>
      resolve(!isEmpty(userPreferences)))
  }
}

export const saveGuestPreferences = (baseUrl) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    if (!getState().authentication.loggedIn) {
      const baseUrl = getAuthenticationURL()
      const url = baseUrl ? `${baseUrl}/api/v1/preferences/global` : `/api/v1/preferences/global`
      post(url)
        .then(response => (response.json()))
        .then(payload => {
          dispatch(removeLoader())
          dispatch(postGuestPreferences())
        })
        .catch(err => {
          console.log(err)
          dispatch(removeLoader())
        })
    }
  }
}

export const saveUserPreferences = (preferences) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    const state = getState()
    const token = state.authentication.token
    const baseUrl = getAuthenticationURL()
    const url = baseUrl ? `${baseUrl}/api/v1/preferences/user` : `/api/v1/preferences/user`
    return post(url, preferences, { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(postUserPreferences(preferences))
      }, (payload) => {
        dispatch(removeLoader())
        payload.error && payload.error.toLowerCase() === 'invalid_token' &&
            dispatch(loggedOut(true))
      })
      .catch(err => {
        console.log(err)
        dispatch(removeLoader())
      })
  }
}

export const editUserPreferences = (preferences) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    const state = getState()
    const token = state.authentication.token
    const baseUrl = getAuthenticationURL()
    const url = baseUrl ? `${baseUrl}/api/v1/preferences/user` : `/api/v1/preferences/user`
    return put(url, preferences, { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(updateUserPreferences(preferences))
      }, (payload) => {
        dispatch(removeLoader())
        payload.error && payload.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
      })
      .catch(err => {
        console.log(err)
        dispatch(removeLoader())
      })
  }
}

export function clearPreferences () {
  return { type: PREFERENCE_CLEAR }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  guest: {
    loaded: false,
    saved: false,
    json: JSON.parse(localStorage.getItem(cacheKeys.PREFERENCE_KEY)) || {}
  },
  user: {
    loaded: false,
    saved: false,
    updated: false,
    json: {}
  },
  storing:false,
  cleared : true
}

const actionHandlers = {
  [GUEST_PREFERENCES_LOADED]: (state, { preference }) => {
    const guest = {
      loaded: true,
      saved: false,
      json: preference
    }
    const nextState = Object.assign({}, state, { guest, storing: false, cleared: false })
    return nextState
  },
  [USER_PREFERENCES_LOADED]: (state, { preference }) => {
    const user = {
      loaded: true,
      saved: false,
      json: preference
    }
    const nextState = Object.assign({}, state, { user, storing: false, cleared: false })
    return nextState
  },
  [GUEST_PREFERENCES_SAVED]: (state, { preference }) => {
    const guest = {
      loaded: false,
      saved: true,
      json: preference
    }
    const nextState = Object.assign({}, state, { guest, storing: false, cleared: false })
    return nextState
  },
  [USER_PREFERENCES_SAVED]: (state, { preference }) => {
    const user = {
      loaded: false,
      saved: true,
      json: preference
    }
    const nextState = Object.assign({}, state, { user, cleared: false })
    return nextState
  },
  [USER_PREFERENCES_UPDATED]: (state, { preference }) => {
    const user = {
      loaded: false,
      saved: false,
      updated:true,
      json: Object.assign({}, state.user.json, preference)
    }

    const nextState = Object.assign({}, state, { user, storing: false, cleared: false })
    return nextState
  },
  [UPDATE_PACKAGE_LIST_COLUMNS]: (state, { payload }) => {
    const user = {
      loaded: false,
      saved: false,
      updated: false,
      json: payload
    }
    const nextState = Object.assign({}, state, { user, storing: true, cleared: false })
    return nextState
  },
  [PREFERENCE_CLEAR]: (state) => {
    return initialState
  }

}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

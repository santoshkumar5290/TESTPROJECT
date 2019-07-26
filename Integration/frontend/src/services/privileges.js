import { get } from './httpRequest'

// ------------------------------------
// Constants
// ------------------------------------
let privilegePromise = null
export const HTTP_STATUS_CODE_404 = 404
export const PRIVILEGES_LOADING = 'PRIVILEGES_LOADING'
export const GLOBAL_PRIVILEGES_LOADED_STATUS = 'GLOBAL_PRIVILEGES_LOADED_STATUS'
export const GLOBAL_PRIVILEGES_LOADING_STATUS = 'GLOBAL_PRIVILEGES_LOADING_STATUS'
export const USER_PRIVILEGES_LOADED_STATUS = 'USER_PRIVILEGES_LOADED_STATUS'
export const USER_PRIVILEGES_LOADING_STATUS = 'USER_PRIVILEGES_LOADING_STATUS'
export const GUEST_PRIVILEGES_LOADED_STATUS = 'GUEST_PRIVILEGES_LOADED_STATUS'
export const PRIVILEGES_LOADING_FAILURE_STATUS = 'PRIVILEGES_LOADING_FAILURE_STATUS'
export const PRIVILEGES_GENERIC_ERROR_STATUS = 'PRIVILEGES_GENERIC_ERROR_STATUS'

const GLOBAL_PRIVILEGES_LOADED = 'GLOBAL_PRIVILEGES_LOADED'
const GLOBAL_PRIVILEGES_LOADING = 'GLOBAL_PRIVILEGES_LOADING'
const USER_PRIVILEGES_LOADED = 'USER_PRIVILEGES_LOADED'
const USER_PRIVILEGES_LOADING = 'USER_PRIVILEGES_LOADING'
const GUEST_PRIVILEGES_LOADED = 'GUEST_PRIVILEGES_LOADED'
const PRIVILEGES_LOADING_FAILURE = 'PRIVILEGES_LOADING_FAILURE'
const PRIVILEGES_GENERIC_ERROR = 'PRIVILEGES_GENERIC_ERROR'
const HTTP_STATUS_CODE_401 = 'HTTP_STATUS_CODE_401'
// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------
const loadingPrivileges = (loading = true) => ({ type: PRIVILEGES_LOADING, loading })
const loadGlobalPrivileges = (privileges) => ({ type: GLOBAL_PRIVILEGES_LOADED, privileges })
const loadingGlobalPrivileges = () => ({ type: GLOBAL_PRIVILEGES_LOADING })
const loadUserPrivileges = (privileges) => ({ type: USER_PRIVILEGES_LOADED, privileges })
const loadingUserPrivileges = () => ({ type: USER_PRIVILEGES_LOADING })
const loadGuestPrivileges = (privileges) => ({ type: GUEST_PRIVILEGES_LOADED, privileges })
const privilegeLoadingFailure = () => ({ type: PRIVILEGES_LOADING_FAILURE })
const privilegeGenericError = () => ({ type: PRIVILEGES_GENERIC_ERROR })

/** @private */
export const fetchGlobalPrivileges = (baseUrl) => {
  return (dispatch) => {
    const url = baseUrl ? `${baseUrl}/api/v1/privilege/all` : `/api/v1/privilege/all`
    dispatch(loadingGlobalPrivileges())
    dispatch(loadingPrivileges())
    get(url)
      .then(response => (response.json()))
      .then(response => {
        dispatch(loadGlobalPrivileges(response.data))
      }, (response, status) => {
        response && response.status === HTTP_STATUS_CODE_401 && dispatch(privilegeLoadingFailure())
      }).then(response => {
        fetchGuestPrivileges(baseUrl, dispatch)
        setPrivilegeTimer(dispatch)
      })
      .catch(err => {
        console.log(err)
        dispatch(privilegeGenericError())
        setPrivilegeTimer(dispatch)
      })
  }
}

export const fetchGuestPrivileges = (baseUrl, dispatch) => {
  dispatch(loadGuestPrivileges({}))

  // to be uncommented when guest privileges API is published
  // const url = baseUrl ? `${baseUrl}/api/v1/privilege/guest` : `/api/v1/privilege/guest`
  // get(url)
  //   .then(response => {
  //     dispatch(loadGuestPrivileges({}))
  //   }, (response, status) => {
  //     response && response.status === HTTP_STATUS_CODE_401 && dispatch(privilegeLoadingFailure())
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     dispatch(privilegeGenericError())
  //   })
}

export const fetchUserPrivileges = (baseUrl) => {
  return (dispatch, getState) => {
    const url = baseUrl ? `${baseUrl}/api/v1/privilege` : `/api/v1/privilege`
    const token = getState().authentication.token
    dispatch(loadingUserPrivileges())
    dispatch(loadingPrivileges())
    get(url, null, { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(response => {
        dispatch(loadUserPrivileges(response.data))
        setPrivilegeTimer(dispatch)
      }, response => {
        response && response.status === HTTP_STATUS_CODE_401 && dispatch(privilegeLoadingFailure())
        response && response.status === HTTP_STATUS_CODE_404 && dispatch(loadUserPrivileges({}))
        setPrivilegeTimer(dispatch)
      })
      .catch(err => {
        console.log(err)
        dispatch(privilegeGenericError())
        setPrivilegeTimer(dispatch)
      })
  }
}

function setPrivilegeTimer (dispatch) {
  clearTimeout(privilegePromise)
  privilegePromise = setTimeout(() => {
      dispatch(loadingPrivileges(false))
    }, 3000)
}

// ----------------------------------
// Privileges Transformation
// ----------------------------------
const mapPrivileges = (privileges, mapValue) => {
  const updatedPrivileges = {}
  const categories = Object.keys(privileges)

  categories.forEach((category) => {
    updatedPrivileges[category.toLowerCase()] = {}
    Object.keys(privileges[category]).forEach((operation) => {
      updatedPrivileges[category.toLowerCase()][operation.toLowerCase()] = mapValue
    })
  })
  return updatedPrivileges
}

const updatePrivileges = (state, privileges, mapValue, globalPrivilege) => {
  if (!globalPrivilege && privileges.hasOwnProperty('ACCESS')) {
    mapValue = Boolean(privileges['ACCESS']['FULL'])
    privileges = state.values
  }
  const codes = (state.codes && state.codes.length) ? state.codes : mapPrivilegesCode(state, privileges)
  const values = Object.assign({}, state.values, mapPrivileges(privileges, mapValue))
  return { codes, values }
}

const mapPrivilegesCode = (state, privileges) => {
  let codes = []
  Object.keys(privileges).forEach((category) => {
    codes = codes.concat(Object.keys(privileges[category]).map((operation) => {
      return { code:`${operation}_${category}`, name:privileges[category][operation] }
    }))
  })

  return codes
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = { codes:[], values:{}, status:null, loading: false }

const actionHandlers = {
  [PRIVILEGES_LOADING]: (state, { loading }) => {
    return Object.assign({}, state,
       { loading })
  },
  [GLOBAL_PRIVILEGES_LOADED]: (state, { privileges }) => {
    const { codes, values } = updatePrivileges(state, privileges, false, true)
    return Object.assign({}, state,
       { values, codes, status:GLOBAL_PRIVILEGES_LOADED_STATUS })
  },
  [GLOBAL_PRIVILEGES_LOADING]: (state) => {
    return Object.assign({}, state, { status:GLOBAL_PRIVILEGES_LOADING_STATUS })
  },
  [USER_PRIVILEGES_LOADED]: (state, { privileges }) => {
    const { codes, values } = updatePrivileges(state, privileges, true)
    return Object.assign({}, state, { values, codes, status:USER_PRIVILEGES_LOADED_STATUS })
  },
  [USER_PRIVILEGES_LOADING]: (state) => {
    return Object.assign({}, state, { status:USER_PRIVILEGES_LOADING_STATUS })
  },
  [GUEST_PRIVILEGES_LOADED]: (state, { privileges }) => {
    const { codes, values } = updatePrivileges(state, privileges, true)
    return Object.assign({}, state, { values, codes, status:GUEST_PRIVILEGES_LOADED_STATUS })
  },
  [PRIVILEGES_LOADING_FAILURE]: (state) => {
    return Object.assign({}, state, { values:null, status:PRIVILEGES_LOADING_FAILURE_STATUS })
  }
}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

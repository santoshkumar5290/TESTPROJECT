import { get, del } from '../../../../services/httpRequest'
import { addLoader, removeLoader } from '../../../../services/loader'
import { actions as authActions } from '../../login/redux'
// import { ROLE_CREATED } from './createRole'

// ------------------------------------
// Constants
// ------------------------------------
export const ROLE_MANAGE_INITIAL_STATUS = 'ROLE_MANAGE_INITIAL'
export const HTTP_STATUS_CODE_400 = 400
export const HTTP_STATUS_CODE_401 = 401
export const HTTP_STATUS_CODE_201 = 201

export const statusConstants = {
  ROLE_MANAGE_INITIAL_STATUS
}

// ----------------------
// actions
// ----------------------
const ROLE_NOT_FOUND = 'role/edit/ROLE_NOT_FOUND'
const ROLE_EDITED = ROLE_EDITED || 'role/edit/ROLE_EDITED'
const LOAD_ROLES = 'rolemanagement/LOAD_ROLES'
const ROLE_CREATED = ROLE_CREATED || 'role/create/ROLE_CREATED'
const ROLE_MANAGE_INITIAL = 'rolemanagement/ROLE_MANAGE_INITIAL'
const ROLE_GENERIC_ERROR = 'rolemanagement/ROLE_MANAGE_ERROR'
const ROLE_DELETED = 'rolemanagement/ROLE_DELETED'
const LOADING_ROLES = 'rolemanagement/LOADING_ROLES'

export const actionConstants = {
  LOAD_ROLES,
  ROLE_CREATED,
  ROLE_MANAGE_INITIAL,
  ROLE_GENERIC_ERROR,
  ROLE_DELETED,
  LOADING_ROLES
}

// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------
const { loggedOut } = authActions
const loadRoles = (roles) => ({ type: LOAD_ROLES, roles })
const loadingRoles = (loading) => ({ type: LOADING_ROLES, loading })
const deleteRole = (roleId, roleName, message) => ({ type: ROLE_DELETED, roleId, roleName, message })
export const roleGenericError = (error, log) => ({ type: ROLE_GENERIC_ERROR, error:new Error(error.message), log })
const roleInitial = () => ({ type: ROLE_MANAGE_INITIAL })
const roleNotFound = (message) => ({ type: ROLE_NOT_FOUND, message })

export const actions = {
  loadRoles,
  deleteRole,
  roleGenericError,
  roleInitial,
  roleNotFound
}

/**
 * @func
 * clear the redux state
**/
export const clear = () => {
  return roleInitial()
}

/**
 * @func
 * API hit for fetching roles
 * @url {string} /api/v1/role
**/
export const fetchAllRoles = (baseUrl) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    dispatch(loadingRoles(true))
    const token = getState().authentication.token
    const url = baseUrl ? `${baseUrl}/api/v1/role` : `/api/v1/role`
    get(url, null, { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(response => {
        dispatch(removeLoader())
        dispatch(loadRoles(response.data))
      }, (response) => {
        dispatch(removeLoader())
        response && response.status === HTTP_STATUS_CODE_401 && dispatch(roleGenericError(response.message))
        response.error && response.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
        dispatch(roleGenericError(response, true))
      })
      .catch(err => {
        dispatch(removeLoader())
        dispatch(roleGenericError(err, true))
        console.log(err)
      })
  }
}

/**
 * @func
 * @param {number} roleId
 * API hit for fetching roles
 * @url {string} /api/v1/role/${roleId}
**/
export const removeRole = (roleId, baseUrl) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    const token = getState().authentication.token
    const url = baseUrl ? `${baseUrl}/api/v1/role/${roleId}` : `/api/v1/role/${roleId}`
    del(url, null, { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(response => {
        dispatch(removeLoader())
        dispatch(deleteRole(roleId, response.message))
      }, (response) => {
        dispatch(removeLoader())
        response && response.status === HTTP_STATUS_CODE_401 && dispatch(roleGenericError(response.message))
        response.error && response.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
        response.error && response.error.toLowerCase() === 'not found' &&
        dispatch(roleNotFound(response.message))
        dispatch(roleGenericError(response, true))
      })
      .catch(err => {
        console.log(err)
        dispatch(removeLoader())
        dispatch(roleGenericError(err, true))
      })
  }
}

export const features = {
  fetchAllRoles,
  removeRole,
  clear
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  roles:[],
  message:'',
  log:null,
  actionedRole:'',
  status : false,
  loading : true
}

const actionHandlers = {
  [LOAD_ROLES]: (state, { roles }) => {
    const status = true
    const loading = false
    const message = roles.length ? '' : 'No Role(s) exists.'
    const nextState = Object.assign({}, state, { message, status, loading, roles : roles.filter(role => (role.id >= 0)) })
    return nextState
  },
  [LOADING_ROLES]: (state, { loading }) => {
    const status = true
    const nextState = Object.assign({}, state, {
      loading,
      status
    })
    return nextState
  },
  [ROLE_CREATED]: (state, { message }) => {
    message = message || 'Role created successfully.'
    const nextState = Object.assign({}, state, { message, status: false, actionedRole:'' })
    return nextState
  },
  [ROLE_EDITED]: (state, { message }) => {
    message = message || 'Role edited successfully.'
    const nextState = Object.assign({}, state, { message, status: false })
    return nextState
  },
  [ROLE_DELETED]: (state, { roleId, roleName, message }) => {
    message = message || 'Role deleted successfully.'
    const nextState = Object.assign({}, state, { message, status: false, actionedRole: roleName })
    return nextState
  },
  [ROLE_MANAGE_INITIAL]: (state) => {
    const message = ''
    const nextState = Object.assign({}, state, { message, status:true, log:null })
    return nextState
  },
  [ROLE_GENERIC_ERROR]: (state, { error, log }) => {
    log = log && error
    const message = log ? 'Error while loading roles.' : error
    const nextState = Object.assign({}, state, { status: true, message, log })
    return nextState
  },
  [ROLE_NOT_FOUND]: (state, { message }) => {
    message = message || 'Role not found.'
    const nextState = Object.assign({}, state, { message, status: false })
    return nextState
  }

}

/**
 * @func
 * @param {object} state
 * @param {{ TYPE : string }} state
 * Reducer function
**/
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

import { Record } from 'immutable'
import { post } from '../../../../services/httpRequest'
import { addLoader, removeLoader } from '../../../../services/loader'
import { actions as authActions } from '../../login/redux'
import * as roleReduxActions from './roleManagement'
// ------------------------------------
// Constants
// ------------------------------------
const ROLE_CREATED_STATUS = 'ROLE_CREATED'
const ROLE_CREATING_STATUS = 'ROLE_CREATING'
const ROLE_GENERIC_ERROR_STATUS = 'ROLE_GENERIC_ERROR_STATUS'
const ROLE_CREATE_INITIAL_STATUS = 'ROLE_CREATE_INITIAL'
const INVALID_ROLE_NAME_STATUS = 'INVALID_ROLE_NAME'
const INVALID_ROLE_DISPLAYNAME_STATUS = 'INVALID_ROLE_DISPLAYNAME'
const VALID_ROLE_NAME_STATUS = 'VALID_ROLE_NAME'
const VALID_ROLE_DISPLAYNAME_STATUS = 'VALID_ROLE_DISPLAYNAME'
const HTTP_STATUS_NAME_400 = 400

export const statusConstants = {
  ROLE_CREATE_INITIAL_STATUS,
  ROLE_GENERIC_ERROR_STATUS,
  ROLE_CREATED_STATUS,
  ROLE_CREATING_STATUS,
  INVALID_ROLE_NAME_STATUS,
  INVALID_ROLE_DISPLAYNAME_STATUS,
  VALID_ROLE_NAME_STATUS,
  VALID_ROLE_DISPLAYNAME_STATUS
}

// ----------------------
// actions
// ----------------------
const { ROLE_GENERIC_ERROR } = roleReduxActions.actionConstants
const ROLE_CREATED = 'role/create/ROLE_CREATED'
const ROLE_CREATING = 'role/create/ROLE_CREATING'
const INVALID_ROLE_NAME = 'role/create/INVALID_ROLE_NAME'
const INVALID_ROLE_DISPLAYNAME = 'role/create/INVALID_ROLE_DISPLAYNAME'
const VALID_ROLE_NAME = 'role/create/VALID_ROLE_NAME'
const VALID_ROLE_DISPLAYNAME = 'role/create/VALID_ROLE_DISPLAYNAME'
const ROLE_CREATE_INITIAL = 'role/create/ROLE_CREATE_INITIAL'

export const actionConstants = {
  ROLE_CREATED,
  ROLE_CREATING,
  INVALID_ROLE_NAME,
  INVALID_ROLE_DISPLAYNAME,
  VALID_ROLE_NAME,
  VALID_ROLE_DISPLAYNAME,
  ROLE_CREATE_INITIAL
}

// ------------------------------------
// Action creators
// ------------------------------------
const { loggedOut } = authActions
const { roleGenericError } = roleReduxActions.actions
const createRole = (message) => ({ type: ROLE_CREATED, message })
const roleCreating = () => ({ type: ROLE_CREATING })
const roleNameInvalid = () => ({ type: INVALID_ROLE_NAME })
const roleDisplayNameInvalid = () => ({ type: INVALID_ROLE_DISPLAYNAME })
const roleNameValid = () => ({ type: VALID_ROLE_NAME })
const roleDisplayNameValid = () => ({ type: VALID_ROLE_DISPLAYNAME })
const roleInitial = () => ({ type: ROLE_CREATE_INITIAL })

export const actions = {
  createRole,
  roleCreating,
  roleNameInvalid,
  roleDisplayNameInvalid,
  roleNameValid,
  roleDisplayNameValid,
  roleInitial
}

/**
 * @func
 * API hit for create a role
 * @url {string} /api/v1/role
**/
const create = ({ name, displayName, privileges }, baseUrl) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    dispatch(roleCreating())
    const url = baseUrl ? `${baseUrl}/api/v1/role` : `/api/v1/role`
    const token = getState().authentication.token
    post(url, { name, displayName, privilege:privileges.join(',') },
      { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(response => {
        dispatch(removeLoader())
        dispatch(createRole(response.message))
      }, (response) => {
        dispatch(removeLoader())
        response && response.status === HTTP_STATUS_NAME_400 &&
         dispatch(roleGenericError(response.message))
        response.error && response.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
        dispatch(roleGenericError(response, true))
      })
      .catch(err => {
        console.log(err)
        dispatch(removeLoader())
        dispatch(roleGenericError(err, true))
      })
  }
}

/**
 * @func
 * Check for duplicate role name
**/
const validateRoleName = (name) => {
  return (dispatch, getState) => {
    const roles = getState().roleManagement.roles
    const nameExists = name && (name.trim().length > 0) && roles
      .find(role => name.toLowerCase() === role.name.toLowerCase())

    dispatch(nameExists ? roleNameInvalid() : roleNameValid())
  }
}

/**
 * @func
 * Check for duplicate role display name
**/
const validateRoleDisplayName = (displayName) => {
  return (dispatch, getState) => {
    const roles = getState().roleManagement.roles
    const displayNameExists = displayName && (displayName.trim().length > 0) && roles
      .find(role => displayName.toLowerCase() === role.displayName.toLowerCase())

    dispatch(displayNameExists ? roleDisplayNameInvalid() : roleDisplayNameValid())
  }
}

/**roleNameInvalid
 * @func
 * clear the redux state
**/
const clear = () => {
  return roleInitial()
}

/**
 * @const roleActions
 * bundle role action creators
**/
export const features = {
  create,
  validateRoleName,
  validateRoleDisplayName,
  clear
}

const Role = new Record({
  status: null,
  log:'',
  message:null
})

const initialState = new Role()

const actionHandlers = {
  [ROLE_CREATING]: (state) => state.set('status', ROLE_CREATING_STATUS),

  [ROLE_CREATED]: (state, { message }) => {
    return state.merge({
      status: ROLE_CREATED_STATUS
    })
  },

  [ROLE_CREATE_INITIAL]: (state) => state.merge({
    status: ROLE_CREATE_INITIAL_STATUS,
    log:'',
    message:''
  }),

  [INVALID_ROLE_NAME]: (state) => state.set('status', INVALID_ROLE_NAME_STATUS),

  [VALID_ROLE_NAME]: (state) => state.set('status', VALID_ROLE_NAME_STATUS),

  [INVALID_ROLE_DISPLAYNAME]: (state) => state.set('status', INVALID_ROLE_DISPLAYNAME_STATUS),

  [VALID_ROLE_DISPLAYNAME]: (state) => state.set('status', VALID_ROLE_DISPLAYNAME_STATUS),

  [ROLE_GENERIC_ERROR]: (state, { error, log }) => state.merge({
    log:log && error,
    message : log ? 'Unable to Create Role' : error,
    status : ROLE_GENERIC_ERROR_STATUS
  })
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

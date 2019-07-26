import { Record } from 'immutable'
import { put } from '../../../../services/httpRequest'
import { addLoader, removeLoader } from '../../../../services/loader'
import { actions as authActions } from '../../login/redux'
import * as roleReduxActions from './roleManagement'

// ------------------------------------
// Constants
// ------------------------------------
const ROLE_EDITED_STATUS = 'ROLE_EDITED'
const ROLE_EDITING_STATUS = 'ROLE_EDITING'
const INVALID_ROLE_NAME_STATUS = 'INVALID_ROLE_NAME'
const INVALID_ROLE_DISPLAYNAME_STATUS = 'INVALID_ROLE_DISPLAYNAME'
const VALID_ROLE_NAME_STATUS = 'VALID_ROLE_NAME'
const VALID_ROLE_DISPLAYNAME_STATUS = 'VALID_ROLE_DISPLAYNAME'
const ROLE_GENERIC_ERROR_STATUS = 'ROLE_GENERIC_ERROR_STATUS'
const ROLE_INITIAL_STATUS = 'ROLE_INITIAL'
const HTTP_STATUS_NAME_400 = 400
const HTTP_STATUS_NAME_401 = 401
const HTTP_STATUS_NAME_201 = 201
const HTTP_STATUS_NAME_404 = 404

export const statusConstants = {
  ROLE_INITIAL_STATUS,
  ROLE_GENERIC_ERROR_STATUS,
  ROLE_EDITED_STATUS,
  ROLE_EDITING_STATUS,
  INVALID_ROLE_NAME_STATUS,
  INVALID_ROLE_DISPLAYNAME_STATUS,
  VALID_ROLE_NAME_STATUS,
  VALID_ROLE_DISPLAYNAME_STATUS
}

const { ROLE_GENERIC_ERROR } = roleReduxActions.actionConstants
const ROLE_EDITED = 'role/edit/ROLE_EDITED'
const ROLE_EDITING = 'role/edit/ROLE_EDITING'
const INVALID_ROLE_NAME = 'role/edit/INVALID_ROLE_NAME'
const INVALID_ROLE_DISPLAYNAME = 'role/edit/INVALID_ROLE_DISPLAYNAME'
const VALID_ROLE_NAME = 'role/edit/VALID_ROLE_NAME'
const VALID_ROLE_DISPLAYNAME = 'role/edit/VALID_ROLE_DISPLAYNAME'
const ROLE_EDIT_INITIAL = 'role/edit/ROLE_EDIT_INITIAL'
const ROLE_NOT_FOUND = 'role/edit/ROLE_NOT_FOUND'

export const actionConstants = {
  ROLE_EDITED,
  ROLE_EDITING,
  INVALID_ROLE_NAME,
  INVALID_ROLE_DISPLAYNAME,
  VALID_ROLE_NAME,
  VALID_ROLE_DISPLAYNAME,
  ROLE_EDIT_INITIAL,
  ROLE_NOT_FOUND,
}

// ------------------------------------
// Action creators
// ------------------------------------
const { loggedOut } = authActions
const { roleGenericError } = roleReduxActions.actions
const editRole = (message) => ({ type: ROLE_EDITED, message })
const roleEditing = () => ({ type: ROLE_EDITING })
const roleNameInvalid = () => ({ type: INVALID_ROLE_NAME })
const roleDisplayNameInvalid = () => ({ type: INVALID_ROLE_DISPLAYNAME })
const roleNameValid = () => ({ type: VALID_ROLE_NAME })
const roleDisplayNameValid = () => ({ type: VALID_ROLE_DISPLAYNAME })
const roleInitial = () => ({ type: ROLE_EDIT_INITIAL })
const roleNotFound = (message) => ({ type: ROLE_NOT_FOUND, message })

export const actions = {
  editRole,
  roleEditing,
  roleNameInvalid,
  roleDisplayNameInvalid,
  roleNameValid,
  roleDisplayNameValid,
  roleInitial,
  roleNotFound,
}

const edit = ({ name, displayName, privileges, roleId }, baseUrl) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    dispatch(roleEditing())
    const url = baseUrl ? `${baseUrl}/api/v1/role/${roleId}` : `/api/v1/user/${roleId}`
    const token = getState().authentication.token
    put(url, { name, displayName, privilege: privileges.join(',') }, { 'Authorization': `Bearer ${token}` })
      .then(response => (response.json()))
      .then(response => {
        dispatch(removeLoader())
        dispatch(editRole(response.message))
      }, (response) => {
        dispatch(removeLoader())
        response && response.error && response.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
        response.error && response.status === HTTP_STATUS_NAME_404 &&
          dispatch(roleNotFound(response.message))
        dispatch(roleGenericError(response))
      })
      .catch(err => {
        console.log(err)
        dispatch(removeLoader())
        dispatch(roleGenericError(err, true))
      })
  }
}

const validateRoleName = (name) => {
  return (dispatch, getState) => {
    const roles = getState().roleManagement.roles
    const nameExists = name && (name.trim().length > 0) && roles
      .find(role => name === role.name)
    dispatch(nameExists ? roleNameInvalid() : roleNameValid())
  }
}

const validateRoleDisplayName = (displayName) => {
  return (dispatch, getState) => {
    const roles = getState().roleManagement.roles
    const displayNameExists = displayName && (displayName.trim().length > 0) && roles
      .find(role => displayName.toLowerCase() === role.displayName.toLowerCase())
    dispatch(displayNameExists ? roleDisplayNameInvalid() : roleDisplayNameValid())
  }
}

const clear = () => roleInitial()

export const features = {
  edit,
  validateRoleName,
  validateRoleDisplayName,
  clear
}
// ------------------------------------
// Reducer
// ------------------------------------

const Role = new Record({
  status: null,
  message: '',
  log: ''
})

const initialState = new Role()

const actionHandlers = {
  [ROLE_EDITING]: (state) => state.set('status', ROLE_EDITING_STATUS),

  [ROLE_EDITED]: (state, { message }) => {
    return state.merge({
      status: ROLE_EDITED_STATUS
    })
  },
  [INVALID_ROLE_NAME]: (state) => state.set('status', INVALID_ROLE_NAME_STATUS),

  [VALID_ROLE_NAME]: (state) => state.set('status', VALID_ROLE_NAME_STATUS),

  [INVALID_ROLE_DISPLAYNAME]: (state) => state.set('status', INVALID_ROLE_DISPLAYNAME_STATUS),

  [VALID_ROLE_DISPLAYNAME]: (state) => state.set('status', VALID_ROLE_DISPLAYNAME_STATUS),
  [ROLE_EDIT_INITIAL]: (state) => state.merge({
    status: ROLE_INITIAL_STATUS,
    log: '',
    message: ''
  }),
  [ROLE_GENERIC_ERROR]: (state, { error, log }) => state.merge({
    log: log && error,
    message: log ? 'Unable to Edit Role' : error,
    status: ROLE_GENERIC_ERROR_STATUS
  })
}

/** @private */
export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

import { Record } from 'immutable'
import { put } from '../../../../services/httpRequest'
import { addLoader, removeLoader } from '../../../../services/loader'
import { actions as authActions } from '../../login/redux'
import * as groupReduxActions from './groupManagement'

// ------------------------------------
// Constants
// ------------------------------------
const GROUP_EDITED_STATUS = 'GROUP_EDITED'
const GROUP_EDITING_STATUS = 'GROUP_EDITING'
const GROUP_GENERIC_ERROR_STATUS = 'GROUP_GENERIC_ERROR_STATUS'
const GROUP_INITIAL_STATUS = 'GROUP_INITIAL'
const INVALID_GROUP_CODE_STATUS = 'INVALID_GROUP_CODE'
const INVALID_GROUP_LABEL_STATUS = 'INVALID_GROUP_LABEL'
const VALID_GROUP_CODE_STATUS = 'VALID_GROUP_CODE'
const VALID_GROUP_LABEL_STATUS = 'VALID_GROUP_LABEL'

const HTTP_STATUS_CODE_401 = 401

export const statusConstants = {
  GROUP_EDITED_STATUS,
  GROUP_EDITING_STATUS,
  GROUP_GENERIC_ERROR_STATUS,
  GROUP_INITIAL_STATUS,
  INVALID_GROUP_CODE_STATUS,
  INVALID_GROUP_LABEL_STATUS,
  VALID_GROUP_CODE_STATUS,
  VALID_GROUP_LABEL_STATUS
}

const { GROUP_GENERIC_ERROR } = groupReduxActions.actionConstants
const GROUP_EDITED = 'group/GROUP_EDITED'
const GROUP_EDITING = 'group/GROUP_EDITING'
const GROUP_INITIAL = 'group/GROUP_INITIAL'
const INVALID_GROUP_CODE = 'group/INVALID_GROUP_CODE'
const INVALID_GROUP_LABEL = 'group/INVALID_GROUP_LABEL'
const VALID_GROUP_CODE = 'group/VALID_GROUP_CODE'
const VALID_GROUP_LABEL = 'group/VALID_GROUP_LABEL'
const GROUP_NOT_FOUND = 'group/GROUP_NOT_FOUND'

export const actionConstants = {
  GROUP_EDITED,
  GROUP_EDITING,
  GROUP_INITIAL,
  INVALID_GROUP_CODE,
  INVALID_GROUP_LABEL,
  VALID_GROUP_CODE,
  VALID_GROUP_LABEL,
  GROUP_NOT_FOUND
}

// ------------------------------------
// Action creators
// ------------------------------------
const { groupGenericError } = groupReduxActions.actions
const { loggedOut } = authActions
const editGroup = (message) => ({ type: GROUP_EDITED, message })
const groupEditing = () => ({ type: GROUP_EDITING })
const groupInitial = () => ({ type: GROUP_INITIAL })
const groupCodeInvalid = () => ({ type: INVALID_GROUP_CODE })
const groupLabelInvalid = () => ({ type: INVALID_GROUP_LABEL })
const groupCodeValid = () => ({ type: VALID_GROUP_CODE })
const groupLabelValid = () => ({ type: VALID_GROUP_LABEL })
const groupNotFound = (message) => ({ type: GROUP_NOT_FOUND, message })

export const actions = {
  editGroup,
  groupEditing,
  groupInitial,
  groupCodeInvalid,
  groupCodeValid,
  groupLabelInvalid,
  groupLabelValid,
  groupNotFound
}

const edit = ({ name, displayName, role, description, groupId }, baseUrl) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    dispatch(groupEditing())
    const token = getState().authentication.token
    const url = baseUrl ? `${baseUrl}/api/v1/group/${groupId}` : `/api/v1/user/${groupId}`
    put(url, { name, displayName, role, description }, { 'Authorization': `Bearer ${token}` })
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(editGroup(payload.message))
      }, (payload) => {
        payload && payload.status === HTTP_STATUS_CODE_401
        dispatch(removeLoader())
        payload.error && payload.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
        payload.error && payload.error.toLowerCase() === 'not found' &&
          dispatch(groupNotFound(payload.message))
        dispatch(groupGenericError(payload, true))
      })
      .catch(err => {
        console.log(err)
        dispatch(removeLoader())
        dispatch(groupGenericError(err, true))
      })
  }
}

const validateGroupName = (name) => {
  return (dispatch, getState) => {
    const groups = getState().groupManagement.groups
    const nameExists = name && (name.trim().length > 0) && groups
      .find(group => name.toLowerCase() === group.name.toLowerCase())
    dispatch(nameExists ? groupCodeInvalid() : groupCodeValid())
  }
}

const validateGroupDisplayName = (displayName) => {
  return (dispatch, getState) => {
    const groups = getState().groupManagement.groups
    const displayNameExists = displayName && (displayName.trim().length > 0) && groups
      .find(group => displayName.toLowerCase() === group.displayName.toLowerCase())
    dispatch(displayNameExists ? groupLabelInvalid() : groupLabelValid())
  }
}

const clear = () => {
  return (dispatch, getState) => {
    dispatch(groupInitial())
  }
}

export const features = {
  edit,
  validateGroupName,
  validateGroupDisplayName,
  clear
}
// ------------------------------------
// Reducer
// ------------------------------------

const Group = new Record({
  status: null,
  message: '',
  log: ''
})

const initialState = new Group()

const actionHandlers = {
  [GROUP_EDITING]: (state) => state.set('status', GROUP_EDITING_STATUS),

  [GROUP_EDITED]: (state, { message }) => {
    return state.merge({
      status: GROUP_EDITED_STATUS
    })
  },
  [GROUP_INITIAL]: (state) => state.merge({
    status: GROUP_INITIAL_STATUS,
    log: '',
    message: ''
  }),
  [GROUP_GENERIC_ERROR]: (state, { error, log }) => state.merge({
    log: log && error,
    message: log ? 'Unable to Edit Group' : error,
    status: GROUP_GENERIC_ERROR_STATUS
  }),
  [INVALID_GROUP_CODE]: (state) => state.set('status', INVALID_GROUP_CODE_STATUS),

  [VALID_GROUP_CODE]: (state) => state.set('status', VALID_GROUP_CODE_STATUS),

  [INVALID_GROUP_LABEL]: (state) => state.set('status', INVALID_GROUP_LABEL_STATUS),

  [INVALID_GROUP_LABEL]: (state) => state.set('status', INVALID_GROUP_LABEL_STATUS)

}

/** @private */
export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

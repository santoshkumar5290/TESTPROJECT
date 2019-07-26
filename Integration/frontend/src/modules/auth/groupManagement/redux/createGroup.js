import { Record } from 'immutable'
import { post } from '../../../../services/httpRequest'
import { addLoader, removeLoader } from '../../../../services/loader'
import { actions as authActions } from '../../login/redux'
import * as groupReduxActions from './groupManagement'
// ------------------------------------
// Constants
// ------------------------------------
const GROUP_CREATED_STATUS = 'GROUP_CREATED'
const GROUP_CREATING_STATUS = 'GROUP_CREATING'
const GROUP_GENERIC_ERROR_STATUS = 'GROUP_GENERIC_ERROR_STATUS'
const GROUP_INITIAL_STATUS = 'GROUP_INITIAL'
const INVALID_GROUP_CODE_STATUS = 'INVALID_GROUP_CODE'
const INVALID_GROUP_LABEL_STATUS = 'INVALID_GROUP_LABEL'
const VALID_GROUP_CODE_STATUS = 'VALID_GROUP_CODE'
const VALID_GROUP_LABEL_STATUS = 'VALID_GROUP_LABEL'

export const statusConstants = {
  GROUP_CREATED_STATUS,
  GROUP_CREATING_STATUS,
  GROUP_GENERIC_ERROR_STATUS,
  GROUP_INITIAL_STATUS,
  INVALID_GROUP_CODE_STATUS,
  INVALID_GROUP_LABEL_STATUS,
  VALID_GROUP_CODE_STATUS,
  VALID_GROUP_LABEL_STATUS
}

// ----------------------
// actions
// ----------------------
const { GROUP_GENERIC_ERROR } = groupReduxActions.actionConstants
const GROUP_CREATED = 'group/GROUP_CREATED'
const GROUP_CREATING = 'group/GROUP_CREATING'
const GROUP_INITIAL = 'group/GROUP_INITIAL'
const INVALID_GROUP_CODE = 'group/INVALID_GROUP_CODE'
const INVALID_GROUP_LABEL = 'group/INVALID_GROUP_LABEL'
const VALID_GROUP_CODE = 'group/VALID_GROUP_CODE'
const VALID_GROUP_LABEL = 'group/VALID_GROUP_LABEL'

export const actionConstants = {
  GROUP_CREATED,
  GROUP_CREATING,
  GROUP_INITIAL,
  INVALID_GROUP_CODE,
  INVALID_GROUP_LABEL,
  VALID_GROUP_CODE,
  VALID_GROUP_LABEL
}

// ------------------------------------
// Action creators
// ------------------------------------
const { groupGenericError } = groupReduxActions.actions
const { loggedOut } = authActions
const createGroup = (message) => ({ type: GROUP_CREATED, message })
const groupCreating = () => ({ type: GROUP_CREATING })
const groupInitial = () => ({ type: GROUP_INITIAL })
const groupCodeInvalid = () => ({ type: INVALID_GROUP_CODE })
const groupCodeValid = () => ({ type: VALID_GROUP_CODE })
const groupLabelInvalid = () => ({ type: INVALID_GROUP_LABEL })
const groupLabelValid = () => ({ type: VALID_GROUP_LABEL })

export const actions = {
  createGroup,
  groupCreating,
  groupInitial,
  groupCodeInvalid,
  groupCodeValid,
  groupLabelInvalid,
  groupLabelValid
}

const create = ({ name, description, displayName, role }, baseUrl) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    dispatch(groupCreating())
    const url = baseUrl ? `${baseUrl}/api/v1/group` : `/api/v1/group`
    const token = getState().authentication.token
    post(url, { name, description, displayName, role },
      { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(createGroup(payload.message))
      }, (payload) => {
        dispatch(removeLoader())
        payload.error && payload.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
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
  create,
  validateGroupName,
  validateGroupDisplayName,
  clear
}

// ------------------------------------
// Reducer
// ------------------------------------

const Group = new Record({
  status: null,
  message:'',
  log:''
})

const initialState = new Group()

const actionHandlers = {
  [GROUP_CREATING]: (state) => state.set('status', GROUP_CREATING_STATUS),

  [GROUP_CREATED]: (state) => {
    return state.merge({
      status: GROUP_CREATED_STATUS
    })
  },
  [INVALID_GROUP_CODE]: (state) => state.set('status', INVALID_GROUP_CODE),

  [GROUP_INITIAL]: (state) => state.merge({
    status: GROUP_INITIAL_STATUS,
    log:'',
    message:''
  }),

  [INVALID_GROUP_CODE]: (state) => state.set('status', INVALID_GROUP_CODE_STATUS),

  [VALID_GROUP_CODE]: (state) => state.set('status', VALID_GROUP_CODE_STATUS),

  [INVALID_GROUP_LABEL]: (state) => state.set('status', INVALID_GROUP_LABEL_STATUS),

  [VALID_GROUP_LABEL]: (state) => state.set('status', VALID_GROUP_LABEL_STATUS),

  [GROUP_GENERIC_ERROR]: (state, { error, log }) => state.merge({
    log:log && error,
    message : log ? 'Unable to Create Group' : error,
    status : GROUP_GENERIC_ERROR_STATUS
  })
}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

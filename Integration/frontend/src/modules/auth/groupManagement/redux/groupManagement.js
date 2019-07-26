import { get, del } from '../../../../services/httpRequest'
import { addLoader, removeLoader } from '../../../../services/loader'
import { actions as authActions } from '../../login/redux'

// ------------------------------------
// Constants
// ------------------------------------
const HTTP_STATUS_CODE_401 = 401

export const statusConstants = {}

// ------------------------------------
// actions
// ------------------------------------
const GROUP_NOT_FOUND = 'group/GROUP_NOT_FOUND'
const GROUP_EDITED = 'group/GROUP_EDITED'
const LOAD_GROUPS = 'groupmanagement/LOAD_GROUPS'
const LOADING_GROUPS = 'groupmanagement/LOADING_GROUPS'
const GROUP_DELETED = 'group/GROUP_DELETED'
const GROUP_CREATED = 'group/GROUP_CREATED'
const GROUP_GENERIC_ERROR = 'groupmanagement/GROUP_GENERIC_ERROR'
const GROUP_MANAGE_INITIAL = 'groupmanagement/GROUP_MANAGE_INITIAL'

export const actionConstants = {
  LOAD_GROUPS,
  LOADING_GROUPS,
  GROUP_DELETED,
  GROUP_CREATED,
  GROUP_GENERIC_ERROR,
  GROUP_MANAGE_INITIAL
}

// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------
const { loggedOut } = authActions
const loadGroups = (groups) => ({ type: LOAD_GROUPS, groups })
const loadingGroups = (loading) => ({ type: LOADING_GROUPS, loading })
const deleteGroup = (groupId, message) => ({ type: GROUP_DELETED, groupId, message })
const groupGenericError = (error, log) => ({ type: GROUP_GENERIC_ERROR, error:new Error(error.message), log })
const groupInitial = () => ({ type: GROUP_MANAGE_INITIAL })
const groupNotFound = (message) => ({ type: GROUP_NOT_FOUND, message })

export const actions = {
  loadGroups,
  deleteGroup,
  groupGenericError,
  groupInitial,
  groupNotFound,
  loadingGroups
}

const clear = () => {
  return groupInitial()
}

const fetchAllGroups = (baseUrl) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    dispatch(loadingGroups(true))
    const token = getState().authentication.token
    const url = baseUrl ? `${baseUrl}/api/v1/group` : `/api/v1/group`
    get(url, null, { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(loadGroups(payload.data))
      }, (payload, status) => {
        dispatch(removeLoader())
        payload && payload.status === HTTP_STATUS_CODE_401 && dispatch(groupGenericError(payload.message))
        payload.error && payload.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
        dispatch(groupGenericError(payload, true))
      })
      .catch(err => {
        dispatch(removeLoader())
        dispatch(groupGenericError(err, true))
        console.log(err)
      })
  }
}

const removeGroup = (groupId, baseUrl) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    const token = getState().authentication.token
    const url = baseUrl ? `${baseUrl}/api/v1/group/${groupId}` : `/api/v1/group/${groupId}`
    del(url, null, { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(response => {
        dispatch(removeLoader())
        dispatch(deleteGroup(groupId, response.message))
      }, (response) => {
        dispatch(removeLoader())
        response && response.status === HTTP_STATUS_CODE_401 && dispatch(groupGenericError(response.message))
        response.error && response.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
        response.error && response.error.toLowerCase() === 'not found' &&
        dispatch(groupNotFound(response.message))
        dispatch(groupGenericError(response, true))
      })
      .catch(err => {
        dispatch(removeLoader())
        dispatch(groupGenericError(err, true))
        console.log(err)
      })
  }
}

export const features = {
  fetchAllGroups,
  removeGroup,
  clear
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  groups:[],
  message:'',
  actionedGroup:'',
  log:'',
  loading: true
}

const actionHandlers = {
  [LOAD_GROUPS]: (state, { groups }) => {
    const status = true
    const loading = false
    const message = groups.length ? '' : 'NO_GROUP_EXIST'
    const nextState = Object.assign({}, state, { message, status, loading, groups : groups.filter(group => (group.id >= 0)) })
    return nextState
  },
  [LOADING_GROUPS]: (state, { loading }) => {
    const status = true
    const nextState = Object.assign({}, state, { loading, status })
    return nextState
  },
  [GROUP_CREATED]: (state, { message }) => {
    message = message || 'GROUP_CREATE_SUCCESS.'
    const nextState = Object.assign({}, state, { message, status: false, actionedGroup:'' })
    return nextState
  },
  [GROUP_EDITED]: (state, { message }) => {
    message = message || 'Group edited successfully.'
    const nextState = Object.assign({}, state, { message, status: false })
    return nextState
  },
  [GROUP_DELETED]: (state, { groupId, groupName, message }) => {
    message = message || 'GROUP_DELETE_SUCCESS.'
    const nextState = Object.assign({}, state, { message, status: false, actionedRole: groupName })
    return nextState
  },
  [GROUP_MANAGE_INITIAL]: (state) => {
    const message = ''
    const nextState = Object.assign({}, state, { message, status:true, log:'' })
    return nextState
  },
  [GROUP_GENERIC_ERROR]: (state, { error, log }) => {
    log = log && error
    const message = log ? 'Unable to load groups.' : error
    const nextState = Object.assign({}, state, { status: true, message, log })
    return nextState
  },
  [GROUP_NOT_FOUND]: (state, { message }) => {
    message = message || 'Group not found.'
    const nextState = Object.assign({}, state, { message, status: false })
    return nextState
  }
}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

import { del, get } from '../../../../services/httpRequest'
import { addLoader, removeLoader } from '../../../../services/loader'
import { actions as authActions } from '../../login/redux'

import { actionConstants as createUserActionConstants } from './createUser'
import { actionConstants as editUserActionConstants, actions as editUserActions } from './editUser'
import { actionConstants as resetPasswordActionConstants } from './resetPassword'

// ------------------------------------
// Constants
// ------------------------------------
// ----------------------
// actions
// ----------------------
const { USER_CREATED, USER_CREATING_ERROR } = createUserActionConstants
const { USER_EDITED, USER_EDITING_ERROR, USER_NOT_FOUND } = editUserActionConstants
const { USER_RESET_PASSWORD, RESET_PASSWORD_ERROR } = resetPasswordActionConstants
const LOAD_USERS = 'usermanagement/LOAD_USERS'
const USER_MANAGE_INITIAL = 'usermanagement/USER_MANAGE_INITIAL'
const USER_GENERIC_ERROR = 'usermanagement/USER_GENERIC_ERROR'
const USER_DELETED = 'user/USER_DELETED'
const LOADING_USERS = 'user/LOADING_USERS'

export const actionConstants = {}

// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------
const { loggedOut } = authActions
const loadUsers = (users) => ({ type: LOAD_USERS, users })
const loadingUsers = (loading) => ({ type: LOADING_USERS, loading })
const deleteUser = (userId, username, message) => ({ type: USER_DELETED, userId, username, message })
const userGenericError = (error, log) => ({ type: USER_GENERIC_ERROR, error:new Error(error.message), log })
const userInitial = () => ({ type: USER_MANAGE_INITIAL })
const { userNotFound } = editUserActions

export const actions = {}

const clear = () => {
  return userInitial()
}

/** @private */
const fetchAllUsers = (baseUrl) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    dispatch(loadingUsers(true))
    const token = getState().authentication.token
    const url = baseUrl ? `${baseUrl}/api/v1/user` : `/api/v1/user`
    get(url, null, { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(loadUsers(payload.data))
      }, (payload) => {
        dispatch(removeLoader())
        payload.error && payload.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
        dispatch(userGenericError(payload, true))
      })
      .catch(err => {
        dispatch(removeLoader())
        dispatch(userGenericError(err, true))
        console.log(err)
      })
  }
}

const removeUser = (userId, username, baseUrl) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    const token = getState().authentication.token
    const url = baseUrl ? `${baseUrl}/api/v1/user/${userId}` : `/api/v1/user/${userId}`
    del(url, null, { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(response => {
        dispatch(removeLoader())
        dispatch(deleteUser(userId, username, response.message))
      }, (response) => {
        dispatch(removeLoader())
        response.error && response.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
        response.error && response.error.toLowerCase() === 'not found' &&
        dispatch(userNotFound(response.message))
        dispatch(userGenericError(response, true))
      })
      .catch(err => {
        dispatch(removeLoader())
        console.log(err)
        dispatch(userGenericError(err, true))
      })
  }
}

export const features = {
  fetchAllUsers,
  removeUser,
  clear
}
// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  users:[],
  message:'',
  actionedUser:'',
  status : false,
  log:'',
  loading:true
}

const actionHandlers = {
  [LOAD_USERS]: (state, { users }) => {
    const status = true
    const loading = false
    const message = users.length ? '' : 'NO_USER_EXIST'
    const nextState = Object.assign({}, state, { message, status, loading, users : users.filter(user => (user.id >= 0)) })
    return nextState
  },
  [LOADING_USERS]: (state, { loading }) => {
    const status = true
    const nextState = Object.assign({}, state, {
      status,
      loading
    })
    return nextState
  },
  [USER_CREATED]: (state, { message }) => {
    message = message || 'USER_CREATE_SUCCESS'
    const nextState = Object.assign({}, state, { message, status: false, actionedUser:'' })
    return nextState
  },
  [USER_EDITED]: (state, { message }) => {
    message = message || 'USER_EDIT_SUCCESS'
    const nextState = Object.assign({}, state, { message, status: false })
    return nextState
  },
  [USER_DELETED]: (state, { userId, username, message }) => {
    message = message || 'USER_DELETE_SUCCESS'
    const nextState = Object.assign({}, state, { message, status: false, actionedUser: username })
    return nextState
  },
  [USER_RESET_PASSWORD]: (state, { username, message }) => {
    message = message || 'Password reset successfully.'
    const nextState = Object.assign({}, state, { message, status: false, actionedUser: username })
    return nextState
  },
  [RESET_PASSWORD_ERROR]: (state, { message }) => {
    const nextState = Object.assign({}, state, { status: true, message })
    return nextState
  },
  [USER_MANAGE_INITIAL]: (state) => {
    const message = ''
    const nextState = Object.assign({}, state, { message, status:true, log:null })
    return nextState
  },
  [USER_CREATING_ERROR]: (state, { message }) => {
    const nextState = Object.assign({}, state, { status: true, message })
    return nextState
  },
  [USER_EDITING_ERROR]: (state, { message }) => {
    const nextState = Object.assign({}, state, { status: true, message })
    return nextState
  },
  [USER_GENERIC_ERROR]: (state, { error, log }) => {
    log = log && error
    const message = log ? 'Unable to load users.' : error
    const nextState = Object.assign({}, state, { status: true, message, log })
    return nextState
  },
  [USER_NOT_FOUND]: (state, { message }) => {
    message = message || 'USER_NOT_FOUND'
    const nextState = Object.assign({}, state, { message, status: false })
    return nextState
  }

}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

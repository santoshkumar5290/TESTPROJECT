import { get, put } from '../../../../services/httpRequest'
import { Record } from 'immutable'
import { addLoader, removeLoader } from '../../../../services/loader'
import { updateSnack } from '../../../../services/snackbar'
import { actions } from '../../login/redux'
// ------------------------------------
// Constants
// ------------------------------------

const HTTP_STATUS_CODE_400 = 400
const HTTP_STATUS_CODE_404 = 404
const HTTP_STATUS_CODE_401 = 401
const HTTP_STATUS_CODE_201 = 201
const PROFILE_CREATED_STATUS = 'PROFILE_CREATED_STATUS'
const PROFILE_CREATING_STATUS = 'PROFILE_CREATING_STATUS'
const PROFILE_EDITED_STATUS = 'PROFILE_EDITED'
const PROFILE_EDITING_STATUS = 'PROFILE_EDITING'
const GENERIC_ERROR_STATUS = 'PROFILE_GENERIC_ERROR'
const EMAIL_INVALID_STATUS = 'INVALID_EMAIL'
const EMAIL_VALID_STATUS = 'VALID_EMAIL'

export const statusConstants = {
  PROFILE_CREATED_STATUS,
  PROFILE_CREATING_STATUS,
  PROFILE_EDITED_STATUS,
  PROFILE_EDITING_STATUS,
  GENERIC_ERROR_STATUS,
  EMAIL_INVALID_STATUS,
  EMAIL_VALID_STATUS
}

// ------------------------------------

// ----------------------
// actions
// ----------------------

// const PROFILE_CREATED = 'profilemanagement/PROFILE_CREATED'
// const PROFILE_CREATING = 'profilemanagement/PROFILE_CREATING'
// const PROFILE_CLEAR = 'profilemanagement/PROFILE_CLEAR'
// const PROFILE_GENERIC_ERROR = 'profilemanagement/PROFILE_ERROR'
// const PROFILE_EDITED = 'profilemanagement/PROFILE_EDITED'
// const PROFILE_EDITING = 'profilemanagement/PROFILE_EDITING'
// const INVALID_EMAIL = 'profilemanagement/INVALID_EMAIL'


export const actionConstants={
   PROFILE_CREATED : 'profilemanagement/PROFILE_CREATED',
   PROFILE_CREATING : 'profilemanagement/PROFILE_CREATING',
   PROFILE_CLEAR : 'profilemanagement/PROFILE_CLEAR',
   PROFILE_GENERIC_ERROR : 'profilemanagement/PROFILE_ERROR',
   PROFILE_EDITED : 'profilemanagement/PROFILE_EDITED',
   PROFILE_EDITING : 'profilemanagement/PROFILE_EDITING',
   INVALID_EMAIL : 'profilemanagement/INVALID_EMAIL'
}

// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------
const { loggedOut } = actions
const loadProfile = (profile) => ({ type: actionConstants.PROFILE_CREATED, profile })
const loadingProfile = () => ({ type: actionConstants.PROFILE_CREATING })
const profileGenericError = (error, log) => ({ type: actionConstants.PROFILE_GENERIC_ERROR, error:new Error(error.message), log })
const editedProfile = (message) => ({ type: actionConstants.PROFILE_EDITED, message })
const profileEditing = () => ({ type: actionConstants.PROFILE_EDITING })
const emailInvalid = (exist) => ({ type: actionConstants.INVALID_EMAIL, exist })

/** @private */

const fetchProfile = (username, baseUrl) => {
  return (dispatch, getState) => {
    dispatch(loadingProfile())
    dispatch(addLoader())
    const token = getState().authentication.token
    const url = baseUrl ? `${baseUrl}/api/v1/user/user` : `/api/v1/user/user`
    get(url, { username }, { 'Authorization':`Bearer ${token}` }, true)
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(loadProfile(payload.data))
      }, (payload) => {
        dispatch(removeLoader())
        if (payload) {
          payload.error && payload.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
          payload && dispatch(profileGenericError(payload, true))
        }
      })
      .catch(err => {
        console.log(err)
        dispatch(removeLoader())
        dispatch(profileGenericError(err, true))
      })
  }
}

const editProfile = (url, obj) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    dispatch(profileEditing())
    const token = getState().authentication.token
    var payloadObj = {}
    for (var item in obj) {
      if (obj[item] !== null && obj[item] !== undefined &&
        obj[item] !== '' && item !== 'userId' && item !== 'groupNames') {
        payloadObj = Object.assign(payloadObj, { [item]: obj[item] })
      }
    }
    put(`${url}/api/v1/user/${obj.userId}`, payloadObj,
     { 'Authorization':`Bearer ${token}` })
      .then(response => (response.json()))
      .then(payload => {
        dispatch(removeLoader())
        dispatch(editedProfile(payload.message))
      }, (payload) => {
        dispatch(removeLoader())
        payload.error && payload.error.toLowerCase() === 'invalid_token' &&
          dispatch(loggedOut(true))
        if(payload.status===403)
          dispatch(updateSnack(payload))
        else{
          payload && dispatch(profileGenericError(payload, true))
        }
      })
      .catch(err => {
        dispatch(removeLoader())
        dispatch(profileGenericError(err, true))
      })
  }
}

const validateEmail = (email, baseUrl) => {
  return (dispatch, getState) => {
    const token = getState().authentication.token
    const url = baseUrl ? `${baseUrl}/api/v1/user/validateEmail` : `/api/v1/user/validateEmail`
    get(url, { email }, { 'Authorization':`Bearer ${token}` }, true)
      .then(response => (response.json()))
      .then(payload => {
        dispatch(emailInvalid(payload.data.isExist))
      }, (payload) => {
        payload && payload.status === HTTP_STATUS_CODE_404 && dispatch(emailInvalid(payload.data.isExist))
      })
      .catch(err => {
        dispatch(profileGenericError(err, true))
        console.log(err)
      })
  }
}

const clearProfile = () => {
  return { type : actionConstants.PROFILE_CLEAR }
}

// ------------------------------------
// Reducer
// ------------------------------------
const User = new Record({
  profile:null,
  message:'',
  log:'',
  actionedUser:'',
  status : '',
  cleared : true })

const initialState = new User()

export const features = {
  fetchProfile,
  editProfile,
  validateEmail,
  clearProfile
}

const actionHandlers = {
  [actionConstants.PROFILE_EDITING]:(state) => {
    const nextState = Object.assign({}, state, { status : PROFILE_EDITING_STATUS, log:'', message:'' })
    return nextState
  },
  [actionConstants.PROFILE_EDITED]:(state, { message }) => {
    const nextState = Object.assign({}, state, { status: PROFILE_EDITED_STATUS, message : message, log:'' })
    return nextState
  },
  [actionConstants.PROFILE_CREATED]: (state, { profile }) => {
    const nextState = Object.assign({}, state,
      { profile, status: PROFILE_CREATED_STATUS, cleared: false, log:'', message:'' })
    return nextState
  },
  [actionConstants.PROFILE_CREATING]: (state) => {
    const nextState = Object.assign({}, state,
      { status: PROFILE_CREATING_STATUS, cleared: false, log:'', message:'' })
    return nextState
  },
  [actionConstants.PROFILE_GENERIC_ERROR]: (state, { error, log }) => {
    log = log && error
    const message = log ? 'Unable to load profile.' : error
    const nextState = Object.assign({}, state, { status: GENERIC_ERROR_STATUS, message, log })
    return nextState
  },
  [actionConstants.PROFILE_CLEAR] : (state) => {
    return initialState
  },
  [actionConstants.INVALID_EMAIL]: (state, { exist }) => {
    const nextState = Object.assign({}, state, { status: exist
       ? EMAIL_INVALID_STATUS : EMAIL_VALID_STATUS,
      message:'',
      log:'' })
    return nextState
  }
}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

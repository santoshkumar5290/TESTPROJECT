import { get } from '../../utils/httpRequest'
import { addLoader, removeLoader } from '../loader'
import { updateSnack, updateLog } from '../snackbar'
import { defaultMessages } from './staticMessages'

const LOCALE_UPDATED = 'i18nl10n/LOCALE_UPDATED'
const LOADED_MESSAGES = 'i18nl10n/LOADED_MESSAGES'

// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------
const setLocale = (locale) => ({
  type : LOCALE_UPDATED,
  locale
})

const loadedLocaleContent = (messages) => ({
  type : LOADED_MESSAGES,
  messages
})

export function fetchMessageNLocal (baseUrl){
  return (dispatch, getState) => {
    dispatch(addLoader())
    const url = baseUrl ? `${baseUrl}/api/v1/user/locale` : `/api/v1/user/locale`
    const token = getState().authentication.token
    return get(url,{}, {'Authorization':`Bearer ${token}`})
      .then(response => {
        dispatch(setLocale(response.value))
        dispatch(loadStaticContent(baseUrl, response.value))
        dispatch(removeLoader())
      })
      .catch(err => {
        if(err.error === "invalid_token")
          fetchGlobalMessageNLocal(baseUrl);
        dispatch(removeLoader())
        if (err.message) {
          dispatch(updateLog(err, baseUrl))
        }
        console.log(err)
      })
  }
}

export function fetchGlobalMessageNLocal (baseUrl){
  return (dispatch, getState) => {
    dispatch(addLoader())
    const url = baseUrl ? `${baseUrl}/api/v1/global/configuration` : `/api/v1/global/configuration`
    return get(url)
      .then(response => {
        dispatch(setLocale(response.value))
        dispatch(loadStaticContent(baseUrl, response.value))
        dispatch(removeLoader())
      })
      .catch(err => {
        dispatch(removeLoader())
        if (err.message) {
          dispatch(updateLog(err, baseUrl))
        }
        console.log(err)
      })
  }
}

const loadStaticContent = (baseUrl, localeDef=null) => {
  return (dispatch, getState) => {
    dispatch(addLoader())
    const url = baseUrl ? `${baseUrl}/api/i18nl10n/v1/retrieveMessages` : `/api/i18nl10n/v1/retrieveMessages`
    var locale = getState().i18nl10n.locale
    if(localeDef)
      locale = localeDef
    //dispatch(loadingLocaleContent())
    get(url, {locale: locale})
      .then(response => {
        dispatch(loadedLocaleContent(response.retrieveMessageResponses))
        dispatch(removeLoader())
      // }, (response, status) => {
      //   switch (response.responseCode) {
      //     case HTTP_STATUS_CODE_400:
      //     case HTTP_STATUS_CODE_401:
      //     case HTTP_STATUS_CODE_403:
      //     case HTTP_STATUS_CODE_404:
      //     case HTTP_STATUS_CODE_417:
      //     case HTTP_STATUS_CODE_500:
      //       dispatch(updateLog(response, baseUrl))
      //       break
      //     default: dispatch(updateLog(response, baseUrl))
      //   }
      })
      .catch(err => {
        dispatch(removeLoader())
        dispatch(updateLog(err, baseUrl))
      })
  }
}

const getMessageEnteries = (messages) => {
  return messages.reduce((obj, message) => {
    obj[message.messageKey] = message.messageValue
    return obj
  }, defaultMessages)
}

export const features = {
  fetchGlobalMessageNLocal,
  fetchMessageNLocal
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  messages: defaultMessages,
  locale: 'en_US'
 }

const actionHandlers = {
  [LOADED_MESSAGES]: (state, { messages }) => {
    const messageEnteries = getMessageEnteries(messages || [])
    return Object.assign({}, state, { messages:messageEnteries })
  },
  [LOCALE_UPDATED]: (state, { locale }) => {
    const nextState = Object.assign({}, state, { locale: locale })
    return nextState
  }
}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
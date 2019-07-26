import { get } from '../../utils/httpRequest'
import util from 'util'

const operationsDelimeter = '|'
const promises = {}
const endpoint = '/getLocalizedMessages/%s'
const messages = {}
const sets = []
let locale
let intl

export const messageSets = {
  common: 'common',
  facilityConfig: 'facility-config',
  systemConfig: 'system-config',
  systemDetail: 'system-detail',
  systemLicense: 'system-license',
  systemList: 'system-list',
  systemStatus: 'system-status',
  packageDetail: 'object-detail',
  shift: 'shift',
  widgets: 'widgets'
}

/**
 * Function to request messages over http call
 */
export const loadMessageSet = (set, updateLocale) => {
  let promise

  if (isMessageSetAvailable(set)) { // already retrieved
    promise = new Promise((resolve, reject) => {
      resolve(false)
    })
  } else if (promises[set]) { // currently pending request
    promise = promises[set]
  } else { // need to retrieve
    promise = get(util.format(endpoint, set))
      .then(response => (response.json()))
      .then((response) => {
        updateLocale && setLocale(response.locale)
        addMessages(set, response.messages, response.locale)
        delete promises[set]
        return response
      })
      .catch(err => {
        console.log(err)
        delete promises[set]
        return false
      })
    promises[set] = promise
  }
  return promise
}

export const getLocale = () => (locale)

export const setLocale = (_locale) => {
  sets.length = 0
  locale = _locale
}

export const getMessage = (id) => {
  return {
    id: id,
    defaultMessage: messages[id]
      ? messages[id]
      : util.format('!!!%s!!!', id)
  }
}

export const isMessageSetAvailable = (set) => {
  const setsToCheck = Array.isArray(set) ? set : [set]
  let allAvailable = true
  setsToCheck.forEach((_set) => {
    if (!sets.includes(_set)) {
      allAvailable = false
    }
  })
  return allAvailable
}

export const setIntl = (_intl) => {
  intl = _intl
}

export const getIntl = () => {
  return intl || {}
}

export const formatMessage = (id, values) => {
  return !intl ? id : intl.formatMessage(getMessage(id), values)
}

export const formatHTMLMessage = (id, values) => {
  return !intl ? id : intl.formatHTMLMessage(getMessage(id), values)
}

export const formatOperations = (id, values) => {
  return !intl ? id : intl.formatMessage(getMessage(id), values).split(operationsDelimeter)
}

export const formatNumber = (number, options) => {
  return !intl ? number : intl.formatNumber(number, options)
}

export const formatPercent = (number) => {
  return !intl ? number : intl.formatNumber(number / 100, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  })
}

export const formatPlural = (number, options) => {
  return !intl ? number : intl.formatPlural(number, options)
}

export const formatDate = (date, options) => {
  return !intl ? date : intl.formatDate(date, options)
}

export const formatTime = (date, options) => {
  return !intl ? date : intl.formatTime(date, options)
}

export const formatRelative = (date, options) => {
  return !intl ? date : intl.formatRelative(date, options)
}

const addMessages = (setName, messageSet) => {
  sets.push(setName)
  Object.keys(messageSet).forEach((id) => {
    messages[setName + ':' + id] = messageSet[id]
  })
}

export const localization = {
  getLocale,
  setLocale,
  messages,
  messageSets,
  loadMessageSet,
  isMessageSetAvailable,
  getMessage,
  setIntl,
  getIntl,
  formatMessage,
  formatHTMLMessage,
  formatNumber,
  formatDate,
  formatOperations,
  formatPercent,
  formatPlural,
  formatRelative,
  formatTime
}

import { get } from '../utils/httpRequest'

// Array to keep track of open network connections
let openConnections = []
let openTimeouts = {}

export const pollData = (dataHandler, url, interval = 1000, maxRetries = 5, retryCounter = 0) => {
  openTimeouts[url] && clearTimeout(openTimeouts[url])

  return (dispatch) => {
    if (!openConnections.includes(url)) {
      return
    }
    let _interval
    let _timeout

    if (interval.interval) {
      // if { offset: 1000, interval: 3,600,000 }, then this will poll every everyhour a second into the hour
      // mainly use for checking current shift, so that we can check every minute change
      const currentTime = new Date().getTime()
      _interval = interval.interval
      _timeout = 0 - currentTime % interval.interval + interval.interval + (interval.offset || 0)
    } else {
      _interval = interval
      _timeout = interval
    }

    return get(url)
      .then(response => (response.json()))
      .then((payload) => {
        dispatch(dataHandler(payload))
        openTimeouts[url] = setTimeout(
          pollData(dataHandler, url, _interval, maxRetries).bind(null, dispatch),
          _timeout)
      })
      .catch(err => {
        if (++retryCounter <= maxRetries) {
          openTimeouts[url] = setTimeout(
            pollData(dataHandler, url, _interval, maxRetries, retryCounter).bind(null, dispatch),
            retryCounter * _interval)
        }
        console.log(err)
      })
  }
}

/**
 * Function to remove a network connection
 */
export const stopConnection = (url) => {
  return (dispatch, getState) => {
    if (openConnections.includes(url)) {
      openConnections = openConnections.filter((el) => { el !== url })
      openTimeouts[url] && clearTimeout(openTimeouts[url])
    }
  }
}

/**
 * Function to add a new network connection
 */
export const initConnection = (url) => {
  return (dispatch, getState) => {
    if (!openConnections.includes(url)) {
      openConnections.push(url)
    }
  }
}

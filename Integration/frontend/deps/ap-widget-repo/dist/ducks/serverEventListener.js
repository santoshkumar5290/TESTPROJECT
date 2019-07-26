'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribe = subscribe;
exports.unsubscribe = unsubscribe;
exports.default = reducer;

var _webSocket = require('./webSocket');

var WS = _interopRequireWildcard(_webSocket);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var EVENT_NEW_MESSAGE = 'new_notification';

/**
 * Websocket event handler
 * @param {Function} callback Callback function
 * @param {Object} { channel, event, payload } New message on websocket
 */
function onMessage(callback, _ref) {
  var channel = _ref.channel,
      event = _ref.event,
      payload = _ref.payload;

  if (event === EVENT_NEW_MESSAGE) {
    console.log('new message: ' + payload);
    callback(payload);
  }
}

/**
 * Action creator for subscribing to server events
 * @private
 */
function subscribe(channel, callback) {
  return WS.subscribe(channel, {
    onMessage: onMessage.bind(this, callback)
  });
}

/**
 * Action creator for unsubscribing from server events
 * @private
 */
function unsubscribe(subscriptionKey) {
  return WS.unsubscribe(subscriptionKey);
}

/** @private */
function reducer(state, action) {
  return state;
}
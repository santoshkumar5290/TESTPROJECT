'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATUS_CLOSED = exports.STATUS_OPEN = exports.UNSUBSCRIBE = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _actionHandlers;

exports.send = send;
exports.subscribe = subscribe;
exports.unsubscribe = unsubscribe;
exports.default = reducer;

var _deepmerge = require('../utils/deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _SICKPlatform = require('../SICKPlatform');

var _sockjsClient = require('sockjs-client');

var _sockjsClient2 = _interopRequireDefault(_sockjsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var ERROR = 'SICKPlatform/webSocket/ERROR';
var OPEN = 'SICKPlatform/webSocket/OPEN';
var CLOSE = 'SICKPlatform/webSocket/CLOSE';
var SUBSCRIBE = 'SICKPlatform/webSocket/SUBSCRIBE';
/** @private */
var UNSUBSCRIBE = exports.UNSUBSCRIBE = 'SICKPlatform/webSocket/UNSUBSCRIBE';

/**
 * Status indicating that the web socket is active and ready to accept data.
 */
var STATUS_OPEN = exports.STATUS_OPEN = 'OPEN';
/**
 * Status indicating that the web socket is inactive and is not receiving data.
 */
var STATUS_CLOSED = exports.STATUS_CLOSED = 'CLOSED';

// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------

var webSocket = void 0;

var retryCounter = 0;
/**
 * Contains the currently pending messages to be sent over the websocket connection.
 */
var pendingQueue = [];

/**
 * Setup WebSocket connection (either raw WebSocket (if endpoint starts with ws://) or SockJS)
 */
function createWebSocket() {
  var _store$getState$confi = _SICKPlatform.store.getState().config.webSocket,
      url = _store$getState$confi.url,
      reconnect = _store$getState$confi.reconnect,
      reconnectInterval = _store$getState$confi.reconnectInterval,
      maxRetries = _store$getState$confi.maxRetries;

  var ws = url.startsWith('ws://') ? new WebSocket(url) : new _sockjsClient2.default(url);

  ws.onerror = function onError(error) {
    _SICKPlatform.store.dispatch({
      type: ERROR,
      error: error
    });
  };

  ws.onopen = function onOpen() {
    _SICKPlatform.store.dispatch({
      type: OPEN
    });

    if (retryCounter > 0) {
      retryCounter = 0;
      resubscribeAll();
    }
  };

  ws.onclose = function onClose(event) {
    _SICKPlatform.store.dispatch({
      type: CLOSE
    });

    if (reconnect && retryCounter <= maxRetries) {
      var timeout = void 0;

      if (retryCounter === 0) {
        timeout = 0;
      } else {
        timeout = reconnectInterval * 1000;
      }

      setTimeout(function () {
        webSocket = createWebSocket();
      }, timeout);
      retryCounter++;
    }
  };

  ws.onmessage = function onMessage(message) {
    var data = JSON.parse(message.data);
    var state = _SICKPlatform.store.getState().webSocket;
    var channelState = state.channels[data.channel];
    var url = ws._transport.url.split('/');
    data.sessionId = url[6];
    channelState && channelState.subscribers.forEach(function (id) {
      return state.subscribers[id].handlers.onMessage(data);
    });
  };

  return (0, _extends3.default)({}, ws, {
    send: function send(data) {
      var retries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (data) {
        pendingQueue.unshift(data);
      }

      if (ws.readyState === WebSocket.CONNECTING && retries < maxRetries) {
        setTimeout(this.send.bind(this, null, ++retries), Math.pow(2, retries) * 1000);
        return;
      }

      if (ws.readyState !== WebSocket.OPEN) {
        throw new Error('Connection to ' + url + ' is not open.');
      }

      var queuedData = pendingQueue.pop();

      while (queuedData) {
        ws.send(queuedData);
        queuedData = pendingQueue.pop();
      }
    }
  });
}

function ws() {
  if (!webSocket) {
    if (!_SICKPlatform.store.getState().config.webSocket) {
      throw new Error('You need to configure the WebSocket address in ' + 'SICKPlatform.configure({ webSocket: {url: "http://localhost:8080"} })');
    }

    webSocket = createWebSocket();
  }

  return webSocket;
}

function resubscribeAll() {
  var channels = _SICKPlatform.store.getState().webSocket.channels;

  (0, _keys2.default)(channels).forEach(function (channel) {
    var channelState = channels[channel];

    if (channelState && channelState.subscribers.length > 0) {
      webSocket.send((0, _stringify2.default)({ channel: channel, event: 'subscribe' }));
    }
  });

  var queuedData = pendingQueue.pop();

  while (queuedData) {
    webSocket.send(queuedData);
    queuedData = pendingQueue.pop();
  }
}

/** @private */
function send(data) {
  ws().send((0, _stringify2.default)(data));
}

/** @private */
function subscribe(channel, handlers) {
  var channelState = _SICKPlatform.store.getState().webSocket.channels[channel];
  if (!channelState || channelState.subscribers.length === 0) {
    // TODO: only create the action when it is done subscribing
    send({
      channel: channel,
      event: 'subscribe'
    });
  }
  return {
    type: SUBSCRIBE,
    id: _uuid2.default.v4(),
    channel: channel,
    handlers: handlers
  };
}

/** @private */
function unsubscribe(subscriptionKey) {
  var state = _SICKPlatform.store.getState().webSocket;

  var channel = state.subscribers[subscriptionKey].channel;

  var channelSubscribers = state.channels[channel].subscribers;

  if (channelSubscribers.indexOf(subscriptionKey) === -1) {
    return;
  }

  if (channelSubscribers.length === 1) {
    // TODO: only create the action when it is done unsubscribing
    send({
      channel: channel,
      event: 'unsubscribe'
    });
  }

  return {
    type: UNSUBSCRIBE,
    id: subscriptionKey
  };
}

// ------------------------------------
// Reducer
// ------------------------------------

var initialState = {
  status: STATUS_CLOSED,
  channels: {}
};

var actionHandlers = (_actionHandlers = {}, (0, _defineProperty3.default)(_actionHandlers, OPEN, function (state) {
  return (0, _deepmerge2.default)(state, { status: STATUS_OPEN });
}), (0, _defineProperty3.default)(_actionHandlers, CLOSE, function (state) {
  return (0, _deepmerge2.default)(state, { status: STATUS_CLOSED });
}), (0, _defineProperty3.default)(_actionHandlers, SUBSCRIBE, function (state, _ref) {
  var id = _ref.id,
      channel = _ref.channel,
      handlers = _ref.handlers;

  var channelState = state.channels[channel];

  return (0, _deepmerge2.default)(state, {
    channels: (0, _defineProperty3.default)({}, channel, {
      data: channelState ? channelState.data : null,
      subscribers: channelState ? [].concat((0, _toConsumableArray3.default)(channelState.subscribers), [id]) : [id]
    }),
    subscribers: (0, _defineProperty3.default)({}, id, {
      channel: channel,
      handlers: handlers
    })
  });
}), (0, _defineProperty3.default)(_actionHandlers, UNSUBSCRIBE, function (state, _ref2) {
  var id = _ref2.id;

  var channel = state.subscribers[id].channel;

  var channelState = state.channels[channel];

  if (!channelState) {
    return state;
  }

  var index = channelState.subscribers.indexOf(id);

  var channelSubscribers = [].concat((0, _toConsumableArray3.default)(channelState.subscribers.slice(0, index)), (0, _toConsumableArray3.default)(channelState.subscribers.slice(index + 1)));

  return (0, _deepmerge2.default)(state, {
    channels: (0, _defineProperty3.default)({}, channel, {
      subscribers: channelSubscribers
    }),
    subscribers: (0, _defineProperty3.default)({}, id, undefined)
  });
}), _actionHandlers);

/** @private */
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
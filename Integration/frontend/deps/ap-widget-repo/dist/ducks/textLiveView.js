'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.DATA_RECEIVED = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _actionHandlers;

exports.updateContent = updateContent;
exports.subscribe = subscribe;
exports.unsubscribe = unsubscribe;
exports.default = reducer;

var _immutable = require('immutable');

var _SICKPlatform = require('../SICKPlatform');

var _webSocket = require('./webSocket');

var WS = _interopRequireWildcard(_webSocket);

var _httpRequest = require('../utils/httpRequest');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var EVENT_CONTENT_UPDTAE = 'content_update';
var CONTENT_UPDATE = 'SICKPlatform/textLiveView/CONTENT_UPDATE';

var DATA_RECEIVED = exports.DATA_RECEIVED = 'SICKPlatform/textliveview/DATA_RECEIVED';
var REFRESH = 'SICKPlatform/textliveview/REFRESH';
// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------

var dataReceived = function dataReceived(group, payload) {
  return { type: DATA_RECEIVED, group: group, payload: payload };
};

// Array to keep track of open network connections
var openConnections = [];
var openTimeouts = {};

/**
 * Function to request data over http call
 */
var requestData = function requestData(group, url) {
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  var maxRetries = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;
  var retryCounter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

  openTimeouts[url] && clearTimeout(openTimeouts[url]);

  return function (dispatch, getState) {
    if (!openConnections.includes(url)) {
      return;
    }

    return (0, _httpRequest.get)(url).then(function (response) {
      _SICKPlatform.store.dispatch(dataReceived(group, response));
      openTimeouts[url] = setTimeout(requestData(group, url, interval, maxRetries).bind(null, dispatch, getState), interval);
    }).catch(function (err) {
      if (++retryCounter <= maxRetries) {
        openTimeouts[url] = setTimeout(requestData(group, url, interval, maxRetries, retryCounter).bind(null, dispatch, getState), retryCounter * interval);
      }
      console.log(err);
    });
  };
};

/**
 * Function to remove a network connection
 */
var stopConnection = function stopConnection(url) {
  return function (dispatch, getState) {
    if (openConnections.includes(url)) {
      openConnections = openConnections.filter(function (el) {
        el !== url;
      });
      openTimeouts[url] && clearTimeout(openTimeouts[url]);
    }
  };
};

var refresh = function refresh(group) {
  return function (dispatch) {
    dispatch({ type: REFRESH, group: group });
  };
};

/**
 * Function to add a new network connection
 */
var initConnection = function initConnection(url) {
  return function (dispatch, getState) {
    if (!openConnections.includes(url)) {
      openConnections.push(url);
    }
  };
};

var actions = exports.actions = {
  requestData: requestData,
  initConnection: initConnection,
  stopConnection: stopConnection,
  subscribe: subscribe,
  unsubscribe: unsubscribe,
  refresh: refresh
};

function updateContent(group, payload) {
  return { type: CONTENT_UPDATE, group: group, payload: payload };
}

/**
 * Websocket event handler
 * @param {String} group Group ID
 * @param {Object} { channel, event, payload } Websocket event
 */
function onMessage(group, _ref) {
  var channel = _ref.channel,
      event = _ref.event,
      payload = _ref.payload;

  if (event === EVENT_CONTENT_UPDTAE) {
    _SICKPlatform.store.dispatch(updateContent(group, payload));
  }
}

/**
 * Action creator for subscribing to conveyor belt data updates
 * @private
 */
function subscribe(channel, group) {
  return WS.subscribe(channel, {
    onMessage: onMessage.bind(this, group)
  });
}

/**
 * Action creator for unsubscribing from conveyor belt data updates
 * @private
 */
function unsubscribe(subscriptionKey) {
  return WS.unsubscribe(subscriptionKey);
}

// ------------------------------------
// Reducers
// ------------------------------------
var initialState = new _immutable.Map();
var actionHandlers = (_actionHandlers = {}, (0, _defineProperty3.default)(_actionHandlers, CONTENT_UPDATE, function (state, _ref2) {
  var group = _ref2.group,
      payload = _ref2.payload;

  var nextState = state;
  nextState = nextState.setIn([group, 'content'], payload);

  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, DATA_RECEIVED, function (state, _ref3) {
  var group = _ref3.group,
      payload = _ref3.payload;

  var nextState = state;
  nextState = nextState.setIn([group, 'content'], payload);

  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, REFRESH, function (state, _ref4) {
  var group = _ref4.group;

  var nextState = new _immutable.Map();
  nextState = nextState.setIn([group, 'content'], '');

  return nextState;
}), _actionHandlers);

/** @private */
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
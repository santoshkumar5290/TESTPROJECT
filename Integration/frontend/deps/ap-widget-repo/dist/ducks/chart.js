'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestData = exports.DATA_RECEIVED = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = reducer;

var _SICKPlatform = require('../SICKPlatform');

var _httpRequest = require('../utils/httpRequest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var DATA_RECEIVED = exports.DATA_RECEIVED = 'SICKPlatform/chart/DATA_RECEIVED';
// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------

var dataReceived = function dataReceived(group, payload) {
  return {
    type: DATA_RECEIVED,
    group: group,
    payload: payload
  };
};

var retryCounter = 0;

/**
 * Function to request data over http call
 */
var requestData = exports.requestData = function requestData(group, url, maxRetries) {
  return function (dispatch) {
    return (0, _httpRequest.get)(url).then(function (response) {
      retryCounter = 0;
      _SICKPlatform.store.dispatch(dataReceived(group, response));
    }).catch(function (err) {
      if (++retryCounter <= maxRetries) {
        setTimeout(requestData(group, url, maxRetries), Math.pow(retryCounter, 2) * 1000); // exponential backoff
      }
      console.log(err);
    });
  };
};

// ------------------------------------
// Reducers
// ------------------------------------
var initialState = {};
var actionHandlers = (0, _defineProperty3.default)({}, DATA_RECEIVED, function (state, _ref) {
  var group = _ref.group,
      payload = _ref.payload;

  return (0, _extends3.default)({}, state, {
    group: group,
    data: payload
  });
});

/** @private */
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
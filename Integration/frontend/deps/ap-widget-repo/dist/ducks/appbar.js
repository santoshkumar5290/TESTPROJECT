'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchSystem = exports.getSystems = exports.UPDATE_SYSTEM = exports.SYSTEM_LIST_RECEIVED = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ACTION_HANDLERS;

exports.default = reducer;

var _immutable = require('immutable');

var _httpRequest = require('../utils/httpRequest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------
var SYSTEM_LIST_RECEIVED = exports.SYSTEM_LIST_RECEIVED = 'SYSTEM_LIST_RECEIVED';
var UPDATE_SYSTEM = exports.UPDATE_SYSTEM = 'UPDATE_SYSTEM';

// ------------------------------------
// Actions
// ------------------------------------
var systemsReceived = function systemsReceived(payload) {
  return { type: SYSTEM_LIST_RECEIVED, payload: payload };
};

var updateSystem = function updateSystem(systemName) {
  return { type: UPDATE_SYSTEM, systemName: systemName };
};

var getSystems = exports.getSystems = function getSystems(url) {
  return function (dispatch) {
    return (0, _httpRequest.get)(url).then(function (payload) {
      dispatch(systemsReceived(payload));
    }).catch(function (err) {
      console.log(err);
    });
  };
};

var switchSystem = exports.switchSystem = function switchSystem(systemName) {
  return function (dispatch) {
    dispatch(updateSystem(systemName));
  };
};
// ------------------------------------
// Action Handlers
// ------------------------------------
var System = (0, _immutable.Record)({
  systemName: '',
  systemLabel: 'Default System',
  disabled: false
});

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, (0, _defineProperty3.default)(_ACTION_HANDLERS, SYSTEM_LIST_RECEIVED, function (state, _ref) {
  var payload = _ref.payload;

  var nextState = state;

  var systemMap = (0, _immutable.OrderedMap)();

  payload.map(function (value) {
    var system = new System(value);
    systemMap = systemMap.set(value.systemName, system);
  });

  nextState = nextState.setIn(['systems'], systemMap);

  var selSystem = new System(payload[0]);
  nextState = nextState.setIn(['selectedSystem'], selSystem);

  return nextState;
}), (0, _defineProperty3.default)(_ACTION_HANDLERS, UPDATE_SYSTEM, function (state, _ref2) {
  var systemName = _ref2.systemName;

  var nextState = state;

  var systemLabel = nextState.get('systems').get(systemName) ? nextState.get('systems').get(systemName).systemLabel : '';

  nextState = nextState.setIn(['selectedSystem', 'systemName'], systemName);
  nextState = nextState.setIn(['selectedSystem', 'systemLabel'], systemLabel);

  return nextState;
}), _ACTION_HANDLERS);

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = new _immutable.Map();

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.updateConfig = updateConfig;
exports.default = reducer;

var _deepmerge = require('../utils/deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _SICKMuiTheme = require('../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var UPDATE = 'SICKPlatform/config/UPDATE';

// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------

/** @private */
function updateConfig(config) {
  return {
    type: UPDATE,
    config: config
  };
}

// ------------------------------------
// Reducer
// ------------------------------------

var initialState = {
  theme: _SICKMuiTheme2.default,
  webSocket: {
    reconnect: true,
    reconnectInterval: 5,
    maxRetries: 5
  }
};

var actionHandlers = (0, _defineProperty3.default)({}, UPDATE, function (state, _ref) {
  var config = _ref.config;
  return (0, _deepmerge2.default)(state, config);
});

/** @private */
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
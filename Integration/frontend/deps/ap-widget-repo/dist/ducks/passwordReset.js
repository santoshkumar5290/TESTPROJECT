'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.INVALID_PASSWORD_MATCH = exports.INVALID_PASSWORD = exports.PASSWORD_INITIAL_STATUS = exports.GENERIC_ERROR_STATUS = exports.PASSWORD_RESET_OK_STATUS = exports.PASSWORD_RESETING_STATUS = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _actionHandlers;

exports.default = reducer;

var _immutable = require('immutable');

var _httpRequest = require('../utils/httpRequest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var PASSWORD_RESETING_STATUS = exports.PASSWORD_RESETING_STATUS = 'PASSWORD_RESETING';
var PASSWORD_RESET_OK_STATUS = exports.PASSWORD_RESET_OK_STATUS = 'PASSWORD_RESET_OK';
var GENERIC_ERROR_STATUS = exports.GENERIC_ERROR_STATUS = 'PASSWORD_RESET_ERROR';
var PASSWORD_INITIAL_STATUS = exports.PASSWORD_INITIAL_STATUS = 'PASSWORD_INITIAL';

var INVALID_PASSWORD = exports.INVALID_PASSWORD = 'SICKPlatform/password/INVALID_PASSWORD';
var INVALID_PASSWORD_MATCH = exports.INVALID_PASSWORD_MATCH = 'SICKPlatform/password/INVALID_PASSWORD_MATCH';

var PASSWORD_RESETING = 'SICKPlatform/password/PASSWORD_RESETING';
var PASSWORD_RESET_OK = 'SICKPlatform/password/PASSWORD_RESET_OK';
var GENERIC_ERROR = 'SICKPlatform/password/GENERIC_ERROR';
var PASSWORD_INITIAL = 'SICKPlatform/password/PASSWORD_INITIAL';
var WRONG_CREDS_STATUS_CODE = 404;

// ------------------------------------
// Action creators
// ------------------------------------

var passwordReseting = function passwordReseting() {
  return { type: PASSWORD_RESETING };
};

var passwordResetOk = function passwordResetOk(user) {
  return { type: PASSWORD_RESET_OK, user: user };
};

var passwordGenericError = function passwordGenericError() {
  return { type: GENERIC_ERROR };
};

var passwordInitial = function passwordInitial() {
  return { type: PASSWORD_INITIAL };
};

var reset = function reset(url, userid, password, password2) {
  return function (dispatch, getState) {
    dispatch(passwordReseting());

    (0, _httpRequest.put)(url + '/user/' + userid + '/password', password).then(function (response) {
      dispatch(passwordResetOk(userid));
    }).catch(function (err) {
      if (err.response && err.response.status === WRONG_CREDS_STATUS_CODE) {
        // Todo: probably will not be required to handle a specific error code.
      }
      dispatch(passwordGenericError());
    });
  };
};

var clear = function clear() {
  return function (dispatch, getState) {
    dispatch(passwordInitial());
  };
};

var actions = exports.actions = {
  reset: reset,
  clear: clear

  // ------------------------------------
  // Reducer
  // ------------------------------------

};var PasswordReset = new _immutable.Record({
  status: null,
  userId: null
});

var initialState = new PasswordReset();

var actionHandlers = (_actionHandlers = {}, (0, _defineProperty3.default)(_actionHandlers, PASSWORD_RESETING, function (state) {
  return state.set('status', PASSWORD_RESETING_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, PASSWORD_RESET_OK, function (state, _ref) {
  var user = _ref.user;

  return state.merge({
    status: PASSWORD_RESET_OK_STATUS,
    userId: user
  });
}), (0, _defineProperty3.default)(_actionHandlers, GENERIC_ERROR, function (state) {
  return state.set('status', GENERIC_ERROR_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, PASSWORD_INITIAL, function (state) {
  return state.set('status', PASSWORD_INITIAL_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, GENERIC_ERROR, function (state) {
  return state.set('status', GENERIC_ERROR_STATUS);
}), _actionHandlers);

/** @private */
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
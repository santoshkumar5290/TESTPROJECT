'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.RECOVER_INITIAL_STATUS = exports.GENERIC_ERROR_STATUS = exports.PASSWORD_RECOVER_INVALID_USERNAME_STATUS = exports.PASSWORD_RECOVER_OK_STATUS = exports.PASSWORD_RECOVERING_STATUS = undefined;

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

var PASSWORD_RECOVERING_STATUS = exports.PASSWORD_RECOVERING_STATUS = 'PASSWORD_RECOVERING';
var PASSWORD_RECOVER_OK_STATUS = exports.PASSWORD_RECOVER_OK_STATUS = 'PASSWORD_RECOVER_OK';
var PASSWORD_RECOVER_INVALID_USERNAME_STATUS = exports.PASSWORD_RECOVER_INVALID_USERNAME_STATUS = 'PASSWORD_RECOVER_INVALID_USERNAME';
var GENERIC_ERROR_STATUS = exports.GENERIC_ERROR_STATUS = 'GENERIC_ERROR';
var RECOVER_INITIAL_STATUS = exports.RECOVER_INITIAL_STATUS = 'RECOVER_INITIAL';

var PASSWORD_RECOVERING = 'SICKPlatform/recover/PASSWORD_RECOVERING';
var PASSWORD_RECOVER_OK = 'SICKPlatform/recover/PASSWORD_RECOVER_OK';
var PASSWORD_RECOVER_INVALID_USERNAME = 'SICKPlatform/recover/PASSWORD_RECOVER_INVALID_USERNAME';
var GENERIC_ERROR = 'SICKPlatform/recover/GENERIC_ERROR';
var RECOVER_INITIAL = 'SICKPlatform/auth/RECOVER_INITIAL';

var WRONG_CREDS_STATUS_CODE = 404;

// ------------------------------------
// Action creators
// ------------------------------------

var passwordRecovering = function passwordRecovering() {
  return { type: PASSWORD_RECOVERING };
};

var passwordRecoverOk = function passwordRecoverOk() {
  return { type: PASSWORD_RECOVER_OK };
};

var passwordRecoverInvalidUser = function passwordRecoverInvalidUser() {
  return { type: PASSWORD_RECOVER_INVALID_USERNAME };
};

var passwordRecoverGenericError = function passwordRecoverGenericError() {
  return { type: GENERIC_ERROR };
};

var initialStatus = function initialStatus() {
  return { type: RECOVER_INITIAL };
};

var recover = function recover(url, userId) {
  return function (dispatch, getState) {
    dispatch(passwordRecovering());

    (0, _httpRequest.get)(url + '/user/' + userId + '/password', {}).then(function (response) {
      dispatch(passwordRecoverOk(userId));
    }).catch(function (err) {
      if (err.response && err.response.status === WRONG_CREDS_STATUS_CODE) {
        dispatch(passwordRecoverInvalidUser());
      } else {
        dispatch(passwordRecoverGenericError());
      }
    });
  };
};

var clear = function clear() {
  return function (dispatch, getState) {
    dispatch(initialStatus());
  };
};

var actions = exports.actions = {
  recover: recover,
  clear: clear

  // ------------------------------------
  // Reducer
  // ------------------------------------

};var PasswordRecover = new _immutable.Record({
  status: null,
  userId: null
});

var initialState = new PasswordRecover();

var actionHandlers = (_actionHandlers = {}, (0, _defineProperty3.default)(_actionHandlers, PASSWORD_RECOVERING, function (state) {
  return state.set('status', PASSWORD_RECOVERING_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, PASSWORD_RECOVER_OK, function (state) {
  return state.set('status', PASSWORD_RECOVER_OK_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, PASSWORD_RECOVER_INVALID_USERNAME, function (state) {
  return state.set('status', PASSWORD_RECOVER_INVALID_USERNAME_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, GENERIC_ERROR, function (state) {
  return state.set('status', GENERIC_ERROR_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, RECOVER_INITIAL, function (state) {
  return state.set('status', RECOVER_INITIAL_STATUS);
}), _actionHandlers);

/** @private */
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
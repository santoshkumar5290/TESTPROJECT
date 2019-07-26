'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.AUTH_SETTINGS_KEY = exports.WRONG_CREDS_STATUS = exports.LOGIN_INITIAL_STATUS = exports.GENERIC_ERROR_STATUS = exports.LOGGING_IN_STATUS = exports.LOGGED_IN_STATUS = undefined;

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

var LOGGED_IN_STATUS = exports.LOGGED_IN_STATUS = 'LOGGED_IN';
var LOGGING_IN_STATUS = exports.LOGGING_IN_STATUS = 'LOGGING_IN';
var GENERIC_ERROR_STATUS = exports.GENERIC_ERROR_STATUS = 'GENERIC_ERROR';
var LOGIN_INITIAL_STATUS = exports.LOGIN_INITIAL_STATUS = 'LOGIN_INITIAL';
var WRONG_CREDS_STATUS = exports.WRONG_CREDS_STATUS = 'WRONG_CREDS';
var AUTH_SETTINGS_KEY = exports.AUTH_SETTINGS_KEY = 'auth';

var LOGGING_IN = 'SICKPlatform/auth/LOGGING_IN';
var LOGGED_IN = 'SICKPlatform/auth/LOGGED_IN';
var GENERIC_ERROR = 'SICKPlatform/auth/GENERIC_ERROR';
var LOGIN_INITIAL = 'SICKPlatform/auth/LOGIN_INITIAL';
var WRONG_CREDS = 'SICKPlatform/auth/WRONG_CREDS';
var WRONG_CREDS_STATUS_CODE = 401;

// ------------------------------------
// Action creators
// ------------------------------------

var loggingIn = function loggingIn() {
  return { type: LOGGING_IN };
};

var loggedIn = function loggedIn(user) {
  return { type: LOGGED_IN, user: user };
};

var error = function error() {
  return { type: GENERIC_ERROR };
};

var wrongCreds = function wrongCreds() {
  return { type: WRONG_CREDS };
};

var initialStatus = function initialStatus() {
  return { type: LOGIN_INITIAL };
};

var login = function login(url, userid, password, rememberMe) {
  return function (dispatch, getState) {
    dispatch(loggingIn());

    (0, _httpRequest.post)(url + '/auth', { userid: userid, password: password, rememberMe: rememberMe }).then(function (response) {
      dispatch(loggedIn(userid));
    }).catch(function (err) {
      var response = err.response;
      response && response.status === WRONG_CREDS_STATUS_CODE ? dispatch(wrongCreds()) : dispatch(error());
    });
  };
};

var clear = function clear() {
  return function (dispatch, getState) {
    dispatch(initialStatus());
  };
};

var actions = exports.actions = {
  login: login,
  clear: clear

  // ------------------------------------
  // Reducer
  // ------------------------------------

};var Auth = new _immutable.Record({
  status: null,
  userId: null
});

var initialState = new Auth();

var actionHandlers = (_actionHandlers = {}, (0, _defineProperty3.default)(_actionHandlers, LOGGING_IN, function (state) {
  return state.set('status', LOGGING_IN_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, LOGGED_IN, function (state, _ref) {
  var user = _ref.user;

  return state.merge({
    status: LOGGED_IN_STATUS,
    userId: user
  });
}), (0, _defineProperty3.default)(_actionHandlers, WRONG_CREDS, function (state) {
  return state.set('status', WRONG_CREDS_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, GENERIC_ERROR, function (state) {
  return state.set('status', GENERIC_ERROR_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, LOGIN_INITIAL, function (state) {
  return state.set('status', LOGIN_INITIAL_STATUS);
}), _actionHandlers);

/** @private */
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.INVALID_PASSWORD_MATCH = exports.INVALID_PASSWORD = exports.INVALID_USERNAME = exports.ACCOUNT_INVALID_STATUS = exports.ACCOUNT_INITIAL_STATUS = exports.GENERIC_ERROR_STATUS = exports.ACCOUNT_CREATING_STATUS = exports.ACCOUNT_CREATED_STATUS = undefined;

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

var ACCOUNT_CREATED_STATUS = exports.ACCOUNT_CREATED_STATUS = 'ACCOUNT_CREATED';
var ACCOUNT_CREATING_STATUS = exports.ACCOUNT_CREATING_STATUS = 'ACCOUNT_CREATING';
var GENERIC_ERROR_STATUS = exports.GENERIC_ERROR_STATUS = 'GENERIC_ERROR';
var ACCOUNT_INITIAL_STATUS = exports.ACCOUNT_INITIAL_STATUS = 'ACCOUNT_INITIAL';
var ACCOUNT_INVALID_STATUS = exports.ACCOUNT_INVALID_STATUS = 'INVALID_ACCOUNT';
var INVALID_USERNAME = exports.INVALID_USERNAME = 'SICKPlatform/account/INVALID_USERNAME';
var INVALID_PASSWORD = exports.INVALID_PASSWORD = 'SICKPlatform/account/INVALID_PASSWORD';
var INVALID_PASSWORD_MATCH = exports.INVALID_PASSWORD_MATCH = 'SICKPlatform/account/INVALID_PASSWORD_MATCH';

var ACCOUNT_CREATED = 'SICKPlatform/account/ACCOUNT_CREATED';
var ACCOUNT_CREATING = 'SICKPlatform/account/ACCOUNT_CREATING';
var GENERIC_ERROR = 'SICKPlatform/account/GENERIC_ERROR';
var INVALID_ACCOUNT = 'SICKPlatform/account/INVALID_ACCOUNT';
var ACCOUNT_INITIAL = 'SICKPlatform/account/ACCOUNT_INITIAL';
var WRONG_CREDS_STATUS_CODE = 400;
var USER_CREATED_STATUS_CODE = 201;

// ------------------------------------
// Action creators
// ------------------------------------

var accountCreating = function accountCreating() {
  return { type: ACCOUNT_CREATING };
};

var accountCreated = function accountCreated(user) {
  return { type: ACCOUNT_CREATED, user: user };
};

var accountGenericError = function accountGenericError() {
  return { type: GENERIC_ERROR };
};

var accountInvalid = function accountInvalid(user) {
  return { type: INVALID_ACCOUNT, user: user };
};

var accountInitial = function accountInitial() {
  return { type: ACCOUNT_INITIAL };
};

var create = function create(url, userid, password, password2) {
  return function (dispatch, getState) {
    dispatch(accountCreating());

    (0, _httpRequest.post)(url + '/user', { userid: userid, password: password }).then(function (response) {
      response.status === USER_CREATED_STATUS_CODE ? dispatch(accountCreated(userid)) : dispatch(accountGenericError());
    }).catch(function (err) {
      var res = err.response;
      res && res.status === WRONG_CREDS_STATUS_CODE ? dispatch(accountInvalid(userid)) : dispatch(accountGenericError());
    });
  };
};

var clear = function clear() {
  return function (dispatch, getState) {
    dispatch(accountInitial());
  };
};

var actions = exports.actions = {
  create: create,
  clear: clear

  // ------------------------------------
  // Reducer
  // ------------------------------------

};var UserAccount = new _immutable.Record({
  status: null,
  userId: null
});

var initialState = new UserAccount();

var actionHandlers = (_actionHandlers = {}, (0, _defineProperty3.default)(_actionHandlers, ACCOUNT_CREATING, function (state) {
  return state.set('status', ACCOUNT_CREATING_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, ACCOUNT_CREATED, function (state, _ref) {
  var user = _ref.user;

  return state.merge({
    status: ACCOUNT_CREATED_STATUS,
    userId: user
  });
}), (0, _defineProperty3.default)(_actionHandlers, ACCOUNT_CREATING, function (state) {
  return state.set('status', ACCOUNT_CREATING_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, ACCOUNT_INITIAL, function (state) {
  return state.set('status', ACCOUNT_INITIAL_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, INVALID_ACCOUNT, function (state) {
  return state.set('status', ACCOUNT_INVALID_STATUS);
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
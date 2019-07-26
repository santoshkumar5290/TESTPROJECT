'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.EXPORT_PARAMS_SET_STATUS = exports.INITIAL_STATUS = exports.GENERIC_ERROR_STATUS = exports.EXPORT_SERVER_ERROR_STATUS = exports.EXPORT_SUCCESS_STATUS = exports.EXPORT_REQUEST_STATUS = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _actionHandlers;

exports.default = reducer;

var _immutable = require('immutable');

var _httpRequest = require('../utils/httpRequest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var EXPORT_REQUEST_STATUS = exports.EXPORT_REQUEST_STATUS = 'EXPORT_REQUEST';
var EXPORT_SUCCESS_STATUS = exports.EXPORT_SUCCESS_STATUS = 'EXPORT_SUCCESS';
var EXPORT_SERVER_ERROR_STATUS = exports.EXPORT_SERVER_ERROR_STATUS = 'EXPORT_SERVER_ERROR';
var GENERIC_ERROR_STATUS = exports.GENERIC_ERROR_STATUS = 'GENERIC_ERROR';
var INITIAL_STATUS = exports.INITIAL_STATUS = 'INITIAL_STATUS';
var EXPORT_PARAMS_SET_STATUS = exports.EXPORT_PARAMS_SET_STATUS = 'EXPORT_PARAMS_SET';

var EXPORT_REQUEST = 'SICKPlatform/exportData/EXPORT_REQUEST';
var EXPORT_RECIEVED = 'SICKPlatform/exportData/EXPORT_RECIEVED';
var EXPORT_SERVER_ERROR = 'SICKPlatform/exportData/EXPORT_SERVER_ERROR';
var GENERIC_ERROR = 'SICKPlatform/exportData/GENERIC_ERROR';
var INITIAL_DATA = 'SICKPlatform/exportData/INITIAL_DATA';
var EXPORT_PARAMS_SET = 'SICKPlatform/exportData/EXPORT_PARAMS_SET';

var SERVER_ERROR_STATUS_CODE = 500;

// ------------------------------------
// Action creators
// ------------------------------------

var exportRequest = function exportRequest() {
  return { type: EXPORT_REQUEST };
};

var exportRecieved = function exportRecieved(group, payload, params) {
  return { type: EXPORT_RECIEVED, group: group, payload: payload, params: params };
};

var exportParamsSet = function exportParamsSet(group, params) {
  return { type: EXPORT_PARAMS_SET, group: group, params: params };
};

var exportServerError = function exportServerError() {
  return { type: EXPORT_SERVER_ERROR };
};

var genericError = function genericError() {
  return { type: GENERIC_ERROR };
};

var initialStatus = function initialStatus(group, url) {
  return { type: INITIAL_DATA, group: group, url: url };
};

var requestQuery = function requestQuery(group, url, params) {
  var request = [];

  var allFlag = params.all,
      otherParams = (0, _objectWithoutProperties3.default)(params, ['all']);

  if (allFlag === true) {
    request = [url + '/all', otherParams];
  } else {
    request = [url, params];
  }

  return request;
};

var requestDownload = function requestDownload(group, url, params) {
  var request = requestQuery(group, url, params);
  window.open(request[0] + '?' + (0, _httpRequest.encodeParams)(request[1]));
};

var requestExport = function requestExport(group) {
  var nextParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function (dispatch, getState) {
    dispatch(exportRequest());

    var _getState$exportData$ = getState().exportData.get(group),
        url = _getState$exportData$.url,
        params = _getState$exportData$.params;

    var combinedParams = (0, _assign2.default)({}, params, nextParams);

    var request = requestQuery(group, url, combinedParams);

    return _httpRequest.get.apply(undefined, (0, _toConsumableArray3.default)(request)).then(function (response) {
      dispatch(exportRecieved(group, response, combinedParams));
    }).catch(function (err) {
      if (err.response && err.response.status === SERVER_ERROR_STATUS_CODE) {
        dispatch(exportServerError());
      } else {
        dispatch(genericError());
      }
    });
  };
};

var setExportParams = function setExportParams(group, params) {
  return function (dispatch, getState) {
    dispatch(exportParamsSet(group, params));
  };
};

var initExportData = function initExportData(group, url) {
  return function (dispatch, getState) {
    return dispatch(initialStatus(group, url));
  };
};

var actions = exports.actions = {
  initExportData: initExportData,
  setExportParams: setExportParams,
  requestDownload: requestDownload,
  requestExport: requestExport

  // ------------------------------------
  // Reducer
  // ------------------------------------

};var ExportData = (0, _immutable.Record)({
  url: '',
  params: {},
  data: ''
});

var initialState = new _immutable.Map();

var actionHandlers = (_actionHandlers = {}, (0, _defineProperty3.default)(_actionHandlers, EXPORT_REQUEST, function (state) {
  return state.set('status', EXPORT_REQUEST_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, EXPORT_RECIEVED, function (state, _ref) {
  var group = _ref.group,
      payload = _ref.payload,
      params = _ref.params;

  var nextState = state;

  nextState.set('status', EXPORT_SUCCESS_STATUS);

  nextState = nextState.setIn([group, 'data'], payload);

  nextState = nextState.setIn([group, 'params'], params);

  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, EXPORT_SERVER_ERROR, function (state) {
  return state.set('status', EXPORT_SERVER_ERROR_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, EXPORT_PARAMS_SET, function (state, _ref2) {
  var group = _ref2.group,
      params = _ref2.params;

  var nextState = state;

  nextState.set('status', EXPORT_PARAMS_SET_STATUS);

  nextState = nextState.setIn([group, 'params'], params);

  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, GENERIC_ERROR, function (state) {
  return state.set('status', GENERIC_ERROR_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, INITIAL_DATA, function (state, _ref3) {
  var group = _ref3.group,
      url = _ref3.url;

  var nextState = state;

  nextState.set('status', INITIAL_STATUS);

  if (!nextState.get(group)) {
    nextState = nextState.set(group, new ExportData());
  }

  nextState = nextState.setIn([group, 'url'], url);

  return nextState;
}), _actionHandlers);

/** @private */
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
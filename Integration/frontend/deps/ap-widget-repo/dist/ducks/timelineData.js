'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = exports.actions = exports.INITIAL_DATA = exports.GENERIC_ERROR = exports.PACKAGE_SERVER_ERROR = exports.PACKAGE_RECIEVED = exports.PACKAGE_REQUEST = exports.INITIAL_STATUS = exports.GENERIC_ERROR_STATUS = exports.PACKAGE_SERVER_ERROR_STATUS = exports.PACKAGE_SUCCESS_STATUS = exports.PACKAGE_REQUEST_STATUS = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _actionHandlers;

exports.default = reducer;

var _immutable = require('immutable');

var _httpRequest = require('../utils/httpRequest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var PACKAGE_REQUEST_STATUS = exports.PACKAGE_REQUEST_STATUS = 'PACKAGE_REQUEST';
var PACKAGE_SUCCESS_STATUS = exports.PACKAGE_SUCCESS_STATUS = 'PACKAGE_SUCCESS';
var PACKAGE_SERVER_ERROR_STATUS = exports.PACKAGE_SERVER_ERROR_STATUS = 'PACKAGE_SERVER_ERROR';
var GENERIC_ERROR_STATUS = exports.GENERIC_ERROR_STATUS = 'GENERIC_ERROR';
var INITIAL_STATUS = exports.INITIAL_STATUS = 'INITIAL_STATUS';

var PACKAGE_REQUEST = exports.PACKAGE_REQUEST = 'SICKPlatform/timelineData/PACKAGE_REQUEST';
var PACKAGE_RECIEVED = exports.PACKAGE_RECIEVED = 'SICKPlatform/timelineData/PACKAGE_RECIEVED';
var PACKAGE_SERVER_ERROR = exports.PACKAGE_SERVER_ERROR = 'SICKPlatform/timelineData/PACKAGE_SERVER_ERROR';
var GENERIC_ERROR = exports.GENERIC_ERROR = 'SICKPlatform/timelineData/GENERIC_ERROR';
var INITIAL_DATA = exports.INITIAL_DATA = 'SICKPlatform/timelineData/INITIAL_DATA';

var SERVER_ERROR_STATUS_CODE = 500;

// ------------------------------------
// Action creators
// ------------------------------------

var packageRequest = function packageRequest() {
  return { type: PACKAGE_REQUEST };
};

var packageRecieved = function packageRecieved(group, payload, params) {
  return { type: PACKAGE_RECIEVED, group: group, payload: payload, params: params };
};

var packageServerError = function packageServerError() {
  return { type: PACKAGE_SERVER_ERROR };
};

var genericError = function genericError() {
  return { type: GENERIC_ERROR };
};

var initialStatus = function initialStatus(group, url, params) {
  return { type: INITIAL_DATA, group: group, url: url, params: params };
};

var requestPackage = function requestPackage(group) {
  var nextParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function (dispatch, getState) {
    dispatch(packageRequest());

    var _getState$timelineDat = getState().timelineData.get(group),
        url = _getState$timelineDat.url,
        params = _getState$timelineDat.params;

    var combinedParams = (0, _assign2.default)({}, params, nextParams);
    return (0, _httpRequest.get)(url, combinedParams).then(function (response) {
      dispatch(packageRecieved(group, response, combinedParams));
    }).catch(function (err) {
      if (err.response && err.response.status === SERVER_ERROR_STATUS_CODE) {
        dispatch(packageServerError());
      } else {
        dispatch(genericError());
      }
    });
  };
};

var initTimelineData = function initTimelineData(group, url, params) {
  return function (dispatch, getState) {
    dispatch(initialStatus(group, url, params));
    return dispatch(requestPackage(group));
  };
};

var actions = exports.actions = {
  initTimelineData: initTimelineData,
  requestPackage: requestPackage

  // ------------------------------------
  // Reducer
  // ------------------------------------

};var Item = exports.Item = (0, _immutable.Record)({
  id: 0,
  _id: 0,
  timestamp: '',
  conditions: [],
  barcodes: [],
  devices: [],
  scaledata: {
    weight: {
      measurement: '30',
      unit: 'lbs'
    }
  },
  hostmessage: '',
  dimension: {
    measurement: '-x-x-',
    unit: 'mm'
  }
});

var PackageData = (0, _immutable.Record)({
  url: '',
  params: {},
  total: 0,
  index: 0,
  items: new _immutable.OrderedMap()
});

var initialState = new _immutable.Map();

var actionHandlers = (_actionHandlers = {}, (0, _defineProperty3.default)(_actionHandlers, PACKAGE_REQUEST, function (state) {
  return state.set('status', PACKAGE_REQUEST_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, PACKAGE_RECIEVED, function (state, _ref) {
  var group = _ref.group,
      payload = _ref.payload,
      params = _ref.params;

  var nextState = state;

  var itemsTotal = payload.itemsTotal,
      itemsIndex = payload.itemsIndex,
      itemsList = payload.itemsList;


  if (itemsTotal === undefined || itemsIndex === undefined || itemsList === undefined) {
    nextState.set('status', GENERIC_ERROR_STATUS);
    return nextState;
  }

  nextState.set('status', PACKAGE_SUCCESS_STATUS);

  nextState = nextState.setIn([group, 'items'], new _immutable.OrderedMap());

  nextState = nextState.setIn([group, 'total'], itemsTotal);

  nextState = nextState.setIn([group, 'index'], itemsIndex);

  itemsList.map(function (item) {
    nextState = nextState.setIn([group, 'items', item.timestamp], new Item(item));
  });

  var currentParams = nextState.getIn([group, 'params']) || {};

  nextState = nextState.mergeIn([group, 'params'], (0, _assign2.default)(currentParams, params));

  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, PACKAGE_SERVER_ERROR, function (state) {
  return state.set('status', PACKAGE_SERVER_ERROR_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, GENERIC_ERROR, function (state) {
  return state.set('status', GENERIC_ERROR_STATUS);
}), (0, _defineProperty3.default)(_actionHandlers, INITIAL_DATA, function (state, _ref2) {
  var group = _ref2.group,
      url = _ref2.url,
      params = _ref2.params;

  var nextState = state;

  nextState = nextState.set('status', INITIAL_STATUS);

  if (!nextState.get(group)) {
    nextState = nextState.set(group, new PackageData());
  }

  nextState = nextState.setIn([group, 'url'], url);

  nextState = nextState.setIn([group, 'params'], params);

  return nextState;
}), _actionHandlers);

/** @private */
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
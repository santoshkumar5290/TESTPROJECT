'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.updateUserSettings = updateUserSettings;
exports.initialUserSettings = initialUserSettings;
exports.default = reducer;

var _deepmerge2 = require('../utils/deepmerge');

var _deepmerge3 = _interopRequireDefault(_deepmerge2);

var _SICKPlatform = require('../SICKPlatform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var STORAGE_KEY = 'SICKPlatform/userSettings';
var UPDATE = 'SICKPlatform/userSettings/UPDATE';

// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------

var update = function update(settings) {
  return { type: UPDATE, settings: settings };
};

function save(settings) {
  localStorage.setItem(STORAGE_KEY, (0, _stringify2.default)(settings));
}

/** @private */
function updateUserSettings(settingsKey, settings) {
  var nextSettings = (0, _deepmerge3.default)(_SICKPlatform.store.getState().userSettings, (0, _defineProperty3.default)({}, settingsKey, settings));

  save(nextSettings);

  return update(nextSettings);
}

/** @private */
function initialUserSettings() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}

// ------------------------------------
// Reducer
// ------------------------------------

var initialState = {};

var actionHandlers = (0, _defineProperty3.default)({}, UPDATE, function (state, _ref) {
  var settings = _ref.settings;

  return (0, _deepmerge3.default)(state, settings);
});

/** @private */
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
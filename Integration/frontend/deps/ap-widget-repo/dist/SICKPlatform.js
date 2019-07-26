'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.reducers = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.connect = connect;
exports.configure = configure;
exports.registerTapEvents = registerTapEvents;
exports.updateUserSettings = updateUserSettings;
exports.initFixCompatibility = initFixCompatibility;

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _ducks = require('./ducks');

var _ducks2 = _interopRequireDefault(_ducks);

var _ie11helper = require('./utils/ie11helper');

var _ie11helper2 = _interopRequireDefault(_ie11helper);

var _httpRequest = require('./utils/httpRequest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Reducers
// ------------------------------------

// TODO: inject reducer on demand
var reducers = exports.reducers = (0, _keys2.default)(_ducks2.default).reduce(function (obj, duck) {
  obj[duck] = _ducks2.default[duck].default;
  return obj;
}, {});

var initialState = {
  userSettings: _ducks2.default.userSettings.initialUserSettings()

  /** @private */
};var middleware = [_reduxThunk2.default];
var enhancers = [];

if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
  enhancers.push(window.devToolsExtension());
}

// ------------------------------------
// Set up store
// ------------------------------------
/** @private */
var store = exports.store = (0, _redux.createStore)((0, _redux.combineReducers)(reducers), initialState, _redux.compose.apply(undefined, [_redux.applyMiddleware.apply(undefined, middleware)].concat(enhancers)));

/**
 * Wraps react-redux's connect component to automatically provide our connected components
 * with our global store.
 * @private
 */
function connect() {
  var _this = this;

  var args = arguments;
  return function (component) {
    var connectedComponent = _reactRedux.connect.apply(_this, args)(component);
    connectedComponent.defaultProps = (0, _extends3.default)({}, connectedComponent.defaultProps, {
      store: store

      /**
       * React-Redux's `connect()` function wraps components in a `Connected` component.
       * In doing so, it will hoist statics. It cannot see super statics though, so we must
       * redefine the static here if it's not overridden by the component.
       */
    });if (!connectedComponent.init) {
      connectedComponent.init = connectedComponent.WrappedComponent.init;
    }
    return connectedComponent;
  };
}

/**
 * This function can be used to configure application level parameters
 * like websocket connection
 *
 * @example
 * SICKPlatform.configure({
 *  websocket: {
 *    url: 'http://localhost:8080/websocket/sockjs',
 *    reconnect: true,
 *    reconnectInterval: 5,
 *    maxRetries: 5
 *  }
 * })
 * @param {Object} config The configuration
 */
function configure(config) {
  config.rest && config.rest.url && (0, _httpRequest.setRestBaseURL)(config.rest.url);

  store.dispatch(_ducks2.default.config.updateConfig(config));
}

/**
 * Called once on app start when tap events need to be registered by the platform
 *
 * This is a constraint with the current React version. This may be deprecated in
 * future platform versions.
 */
function registerTapEvents() {
  require('react-tap-event-plugin')();
}

/**
 * Update user settings by specifying a settings key and the settings to be updated.
 * @param {String} settingsKey The settings key to be updated. Typically a group ID.
 * @param {Object} settings New user settings to be merged into the current user
 * settings under the specified settings key.
 * @private
 */
function updateUserSettings(settingsKey, settings) {
  store.dispatch(_ducks2.default.userSettings.updateUserSettings(settingsKey, settings));
}

/**
 * Called before application starts.
 * Fixes compatibility issues.
 */
function initFixCompatibility() {
  (0, _ie11helper2.default)();
}
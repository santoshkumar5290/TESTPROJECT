'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.play = exports.pause = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _actionHandlers;

exports.load = load;
exports.next = next;
exports.prev = prev;
exports.updateCamera = updateCamera;
exports.subscribe = subscribe;
exports.unsubscribe = unsubscribe;
exports.default = reducer;

var _immutable = require('immutable');

var _SICKPlatform = require('../SICKPlatform');

var _webSocket = require('./webSocket');

var WS = _interopRequireWildcard(_webSocket);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!global._babelPolyfill) {
  require('babel-polyfill');
}

// ------------------------------------
// Constants
// ------------------------------------

var EVENT_NEW_IMAGE = 'new_image';
var IMAGE_ADD = 'SICKPlatform/imageLiveView/IMAGE_ADD';
var ILV_INIT = 'SICKPlatform/imageLiveView/ILV_INIT';
var PLAY = 'SICKPlatform/imageLiveView/PLAY';
var PAUSE = 'SICKPlatform/imageLiveView/PAUSE';
var CAMERA_UPDATE = 'SICKPlatform/imageLiveView/CAMERA_UPDATE';
var FETCH_IMAGE = 'SICKPlatform/imageLiveView/FETCH_IMAGE';
var FETCH_IMAGE_SUCCESS = 'SICKPlatform/imageLiveView/FETCH_IMAGE_SUCCESS';

// Placeholder until we move to STOMP based websocket
var SESSION_ID = 'sessionid';
// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------

function addImage(group, image) {
  return { type: IMAGE_ADD, group: group, image: new Image(image) };
}

function load(group, data) {
  return { type: ILV_INIT, group: group, data: data };
}

function fetchImage(group) {
  return { type: FETCH_IMAGE, group: group };
}

function imageReceived(group, image) {
  return { type: FETCH_IMAGE_SUCCESS, group: group, image: new Image(image) };
}

function next(group, id, baseUrl) {
  return function (dispatch) {
    dispatch(fetchImage(group));

    return (0, _isomorphicFetch2.default)(baseUrl + '/image/' + id).then(function (response) {
      return response.json();
    }).then(function (image) {
      return dispatch(imageReceived(group, image));
    });
  };
}

function prev(group, id, baseUrl) {
  return function (dispatch) {
    dispatch(fetchImage(group));

    return (0, _isomorphicFetch2.default)(baseUrl + '/image/' + id).then(function (response) {
      return response.json();
    }).then(function (image) {
      return dispatch(imageReceived(group, image));
    });
  };
}

/** @private */
var pause = exports.pause = function pause(group) {
  return { type: PAUSE, group: group };
};

/** @private */
var play = exports.play = function play(group) {
  return { type: PLAY, group: group };
};

/** @private */
function updateCamera(group, channel, camera, imageLiveView, baseUrl) {
  return function (dispatch) {
    dispatch(fetchImage(group));

    var packageId = void 0;

    if (imageLiveView && imageLiveView.image && imageLiveView.image.packageId) {
      packageId = imageLiveView.image.packageId;
    } else {
      packageId = 1;
    }

    var options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: (0, _stringify2.default)({ camera: camera.id, packageId: packageId })
    };

    return (0, _isomorphicFetch2.default)(baseUrl + '/session/' + SESSION_ID + '/ilv', options).then(function (response) {
      return response.json();
    }).then(function (image) {
      dispatch(imageReceived(group, image));
      dispatch({ type: CAMERA_UPDATE, group: group, camera: new Camera(camera) });
    });
  };
}

/**
 * Websocket event handler
 * @param {String} group Group ID
 * @param {Object} { channel, event, payload, sessionId } Websocket event
 */
function onMessage(group, _ref) {
  var channel = _ref.channel,
      event = _ref.event,
      payload = _ref.payload,
      sessionId = _ref.sessionId;

  SESSION_ID = sessionId;

  if (event === EVENT_NEW_IMAGE) {
    _SICKPlatform.store.dispatch(addImage(group, payload));
    _SICKPlatform.store.dispatch(imageReceived(group, payload));
  }
}

/**
 * Action creator for subscribing to conveyor belt data updates
 * @private
 */
function subscribe(channel, group) {
  return WS.subscribe(channel, {
    onMessage: onMessage.bind(this, group)
  });
}

/**
 * Action creator for unsubscribing from conveyor belt data updates
 * @private
 */
function unsubscribe(subscriptionKey) {
  return WS.unsubscribe(subscriptionKey);
}

// ------------------------------------
// Reducer
// ------------------------------------
var Camera = (0, _immutable.Record)({
  id: 1,
  label: '',
  model: ''
});

var Image = (0, _immutable.Record)({
  id: 1,
  parentSize: 1,
  sequenceNumber: 1,
  packageId: 1,
  source: '',
  nextImageId: 1,
  prevImageId: 1
});

var ImageLiveView = (0, _immutable.Record)({
  image: new Image(),
  cameraList: [],
  selectedCamera: new Camera(),
  isPaused: false,
  title: 'Image Live View',
  isFetching: false
});

var initialState = new _immutable.Map();

var actionHandlers = (_actionHandlers = {}, (0, _defineProperty3.default)(_actionHandlers, ILV_INIT, function (state, _ref2) {
  var group = _ref2.group,
      data = _ref2.data;

  return state.set(group, new ImageLiveView(data));
}), (0, _defineProperty3.default)(_actionHandlers, IMAGE_ADD, function (state, _ref3) {
  var group = _ref3.group,
      image = _ref3.image;

  var nextState = void 0;

  if (state.get(group)) {
    nextState = state.mergeIn([group, 'image'], image);
  } else {
    nextState = state.setIn([group, 'image'], image);
  }

  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, PAUSE, function (state, _ref4) {
  var group = _ref4.group;

  return state.setIn([group, 'isPaused'], true);
}), (0, _defineProperty3.default)(_actionHandlers, PLAY, function (state, _ref5) {
  var group = _ref5.group;

  return state.setIn([group, 'isPaused'], false);
}), (0, _defineProperty3.default)(_actionHandlers, CAMERA_UPDATE, function (state, _ref6) {
  var group = _ref6.group,
      camera = _ref6.camera;

  return state.setIn([group, 'selectedCamera'], camera);
}), (0, _defineProperty3.default)(_actionHandlers, FETCH_IMAGE, function (state, _ref7) {
  var group = _ref7.group;

  return state.setIn([group, 'isFetching'], true);
}), (0, _defineProperty3.default)(_actionHandlers, FETCH_IMAGE_SUCCESS, function (state, _ref8) {
  var group = _ref8.group,
      image = _ref8.image;

  var nextState = state.setIn([group, 'isFetching'], false);
  return nextState.setIn([group, 'image'], image);
}), _actionHandlers);

/** @private */
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
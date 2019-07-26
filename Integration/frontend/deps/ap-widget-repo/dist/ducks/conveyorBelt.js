'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shiftChange = exports.removeItem = exports.play = exports.pause = exports.applyFilter = exports.MAX_ITEMS = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _actionHandlers;

exports.refresh = refresh;
exports.subscribe = subscribe;
exports.unsubscribe = unsubscribe;
exports.default = reducer;

var _immutable = require('immutable');

var _SICKPlatform = require('../SICKPlatform');

var _webSocket = require('./webSocket');

var WS = _interopRequireWildcard(_webSocket);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var MAX_ITEMS = exports.MAX_ITEMS = 300;

var EVENT_BELT_UPDATE = 'belt_update';
var EVENT_BELT_ITEM = 'new_item';

var BELT_UPDATE = 'SICKPlatform/conveyorBelt/BELT_UPDATE';
var FILTER_APPLY = 'SICKPlatform/conveyorBelt/FILTER_APPLY';
var FILTER_CLEAR = 'SICKPlatform/conveyorBelt/FILTER_CLEAR';
var ITEM_ADD = 'SICKPlatform/conveyorBelt/ITEM_ADD';
var ITEM_REMOVE = 'SICKPlatform/conveyorBelt/ITEM_REMOVE';
var PAUSE = 'SICKPlatform/conveyorBelt/PAUSE';
var PLAY = 'SICKPlatform/conveyorBelt/PLAY';
var REFRESH = 'SICKPlatform/conveyorBelt/REFRESH';
var SHIFT_CHANGE = 'SICKPlatform/converyorBelt/SHIFT_CHANGE';

// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------

function addItem(group, item) {
  return { type: ITEM_ADD, group: group, item: item };
}

/** @private */
var applyFilter = exports.applyFilter = function applyFilter(group, filter) {
  return { type: FILTER_APPLY, group: group, filter: filter };
};

/** @private */
var pause = exports.pause = function pause(group) {
  return { type: PAUSE, group: group };
};

/** @private */
var play = exports.play = function play(group) {
  return { type: PLAY, group: group };
};

/** @private */
var removeItem = exports.removeItem = function removeItem(group, item) {
  return { type: ITEM_REMOVE, group: group, item: item };
};

var updateBelt = function updateBelt(group, data) {
  return { type: BELT_UPDATE, group: group, data: data };
};

function refresh(group) {
  return function (dispatch) {
    dispatch({ type: REFRESH, group: group });
  };
}

var shiftChange = exports.shiftChange = function shiftChange(group) {
  return { type: SHIFT_CHANGE, group: group };
};
/**
 * Websocket event handler
 * @param {String} group Group ID
 * @param {Object} { channel, event, payload } Websocket event
 */
function onMessage(group, _ref) {
  var channel = _ref.channel,
      event = _ref.event,
      temp = _ref.temp,
      payload = _ref.payload;

  if (event === EVENT_BELT_UPDATE) {
    _SICKPlatform.store.dispatch(updateBelt(group, payload));
  } else if (event === EVENT_BELT_ITEM) {
    _SICKPlatform.store.dispatch(addItem(group, payload));
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

function filterItem(item) {
  var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return filter.reduce(function (n, key) {
    return item.conditions.indexOf(key) > -1 ? ++n : n;
  }, 0) === filter.length;
}

// ------------------------------------
// Reducer
// ------------------------------------
var ConveyorBelt = (0, _immutable.Record)({
  filter: [],
  items: new _immutable.List(),
  speed: 0,
  unit: 'm/sec',
  width: 1,
  isPaused: false,
  frozenItems: new _immutable.List(),
  newItem: {}
});

var initialState = new _immutable.Map();

var actionHandlers = (_actionHandlers = {}, (0, _defineProperty3.default)(_actionHandlers, BELT_UPDATE, function (state, _ref2) {
  var group = _ref2.group,
      data = _ref2.data;

  var nextState = state;

  if (nextState.get(group)) {
    nextState = nextState.mergeIn([group], data);
  } else {
    nextState = nextState.set(group, new ConveyorBelt(data));
  }

  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, FILTER_APPLY, function (state, _ref3) {
  var group = _ref3.group,
      filter = _ref3.filter;

  var nextState = state;

  nextState = nextState.updateIn([group, 'items'], function (items) {
    return items.filter(function (item) {
      return filterItem(item, filter);
    });
  });

  nextState = nextState.setIn([group, 'filter'], filter);

  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, FILTER_CLEAR, function (state, _ref4) {
  var group = _ref4.group;

  return state.setIn([group, 'filter'], []);
}), (0, _defineProperty3.default)(_actionHandlers, ITEM_ADD, function (state, _ref5) {
  var group = _ref5.group,
      item = _ref5.item;

  var nextState = state;

  if (!nextState.get(group)) {
    nextState = nextState.set(group, new ConveyorBelt());
  }

  var isPaused = nextState.getIn([group, 'isPaused']);
  var listName = isPaused ? 'frozenItems' : 'items';
  var list = nextState.getIn([group, listName]);

  list = list.push(item);
  if (list.size > MAX_ITEMS) {
    list = list.slice(list.size - MAX_ITEMS);
  }

  nextState = nextState.setIn([group, listName], list);
  if (!isPaused) {
    nextState = nextState.setIn([group, 'newItem'], item);
  }

  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, ITEM_REMOVE, function (state, _ref6) {
  var group = _ref6.group,
      item = _ref6.item;

  var nextState = state;

  nextState = nextState.deleteIn([group, 'items', nextState.getIn([group, 'items']).indexOf(item)]);
  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, PAUSE, function (state, _ref7) {
  var group = _ref7.group;

  var nextState = state;
  nextState = nextState.setIn([group, 'isPaused'], true);
  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, PLAY, function (state, _ref8) {
  var group = _ref8.group;

  var latest = void 0;
  var nextState = state;
  var items = nextState.getIn([group, 'items']) || new _immutable.List();
  var frozen = nextState.getIn([group, 'frozenItems']);
  nextState = nextState.setIn([group, 'isPaused'], false);

  frozen && frozen.forEach(function (item) {
    latest = item;
    items = items.push(item);
  });
  if (items.size > MAX_ITEMS) {
    items = items.slice(items.size - MAX_ITEMS);
  }

  nextState = nextState.setIn([group, 'items'], items);
  nextState = nextState.setIn([group, 'frozenItems'], new _immutable.List());
  if (latest) {
    nextState = nextState.setIn([group, 'newItem'], latest);
  }

  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, REFRESH, function (state, _ref9) {
  var group = _ref9.group;

  var nextState = state;
  nextState = nextState.set(group, new ConveyorBelt());
  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, SHIFT_CHANGE, function (state, _ref10) {
  var group = _ref10.group;

  var nextState = state;
  nextState = nextState.setIn([group, 'items'], new _immutable.List());
  nextState = nextState.setIn([group, 'frozenItems'], new _immutable.List());
  return nextState;
}), _actionHandlers);

/** @private */
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
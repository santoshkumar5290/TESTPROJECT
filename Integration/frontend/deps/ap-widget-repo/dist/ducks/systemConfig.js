'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.startOver = exports.DEVICES_RELOADED = exports.DEVICE_ADDED = exports.DEVICE_REMOVED = exports.DEVICE_UPDATED = exports.DEVICE_UNDO_REMOVED_STATUS = exports.DEVICE_ADDED_UNDO_STATUS = exports.GENERIC_ERROR_STATUS = exports.DEVICE_EDIT_STATUS = exports.DEVICES_RELOADED_STATUS = exports.DEVICE_CLEAR_STATUS = exports.DEVICE_START_OVER_STATUS = exports.DEVICE_ERROR_STATUS = exports.DEVICE_REMOVED_STATUS = exports.DEVICE_UPDATED_STATUS = exports.DEVICE_ADDED_STATUS = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _parseInt = require('babel-runtime/core-js/number/parse-int');

var _parseInt2 = _interopRequireDefault(_parseInt);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _actionHandlers;

exports.default = reducer;

var _immutable = require('immutable');

var _SICKPlatform = require('../SICKPlatform');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _httpRequest = require('../utils/httpRequest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var DEVICE_ADDED_STATUS = exports.DEVICE_ADDED_STATUS = 'DEVICE_ADDED';
var DEVICE_UPDATED_STATUS = exports.DEVICE_UPDATED_STATUS = 'DEVICE_UPDATED';
var DEVICE_REMOVED_STATUS = exports.DEVICE_REMOVED_STATUS = 'DEVICE_REMOVED';
var DEVICE_ERROR_STATUS = exports.DEVICE_ERROR_STATUS = 'DEVICE_ERROR';
var DEVICE_START_OVER_STATUS = exports.DEVICE_START_OVER_STATUS = 'DEVICE_START_OVER';
var DEVICE_CLEAR_STATUS = exports.DEVICE_CLEAR_STATUS = 'DEVICE_CLEAR';
var DEVICES_RELOADED_STATUS = exports.DEVICES_RELOADED_STATUS = 'DEVICES_RELOADED';
var DEVICE_EDIT_STATUS = exports.DEVICE_EDIT_STATUS = 'DEVICE_EDIT';
var GENERIC_ERROR_STATUS = exports.GENERIC_ERROR_STATUS = 'GENERIC_ERROR';
var DEVICE_ADDED_UNDO_STATUS = exports.DEVICE_ADDED_UNDO_STATUS = 'DEVICE_ADDED_UNDO';
var DEVICE_UNDO_REMOVED_STATUS = exports.DEVICE_UNDO_REMOVED_STATUS = 'DEVICE_UNDO_REMOVED';

var DEVICE_UPDATED = exports.DEVICE_UPDATED = 'SICKPlatform/systemConfiguration/DEVICE_UPDATED';
var DEVICE_REMOVED = exports.DEVICE_REMOVED = 'SICKPlatform/systemConfiguration/DEVICE_REMOVED';
var DEVICE_ADDED = exports.DEVICE_ADDED = 'SICKPlatform/systemConfiguration/DEVICE_ADDED';
var DEVICES_RELOADED = exports.DEVICES_RELOADED = 'SICKPlatform/systemConfiguration/DEVICE_RELOAD_ALL';
var DEVICE_ERROR = 'SICKPlatform/systemConfiguration/DEVICE_ERROR';
var DEVICE_START_OVER = 'SICKPlatform/systemConfiguration/DEVICE_START_OVER';
var DEVICE_CLEAR = 'SICKPlatform/systemConfiguration/DEVICE_CLEAR';
var DEVICE_EDIT = 'SICKPlatform/systemConfiguration/DEVICE_EDIT';
var GENERIC_ERROR = 'SICKPlatform/systemConfiguration/GENERIC_ERROR';
var DEVICE_ADDED_UNDO = 'SICKPlatform/systemConfiguration/DEVICE_ADDED_UNDO';
var DEVICE_UNDO_REMOVED = 'SICKPlatform/systemConfiguration/DEVICE_UNDO_REMOVED';

// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------

var update = function update(device) {
  return { type: DEVICE_UPDATED, device: device };
};

var remove = function remove(deviceId) {
  return { type: DEVICE_REMOVED, deviceId: deviceId };
};

var add = function add(device) {
  return { type: DEVICE_ADDED, device: device };
};

var undoAdd = function undoAdd(deviceId) {
  return { type: DEVICE_ADDED_UNDO, deviceId: deviceId };
};

var undoRemove = function undoRemove(device) {
  return { type: DEVICE_UNDO_REMOVED, device: device };
};

var error = function error(errors) {
  return { type: DEVICE_ERROR, errors: errors };
};

var genericError = function genericError(error) {
  return { type: GENERIC_ERROR, error: error };
};

var start = function start() {
  return { type: DEVICE_START_OVER };
};

var clear = function clear() {
  return { type: DEVICE_CLEAR };
};

var edit = function edit(deviceId) {
  return { type: DEVICE_EDIT, deviceId: deviceId };
};

function reload(data) {
  var items = new _immutable.Map();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(data), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      items = items.set(item.deviceId, item);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return { type: DEVICES_RELOADED, items: items };
}

/** @private */
var addDevice = function addDevice(url, device) {
  return function (dispatch, getState) {
    device.deviceId = (0, _parseInt2.default)(device.deviceId);
    var errors = new _immutable.Map();

    (0, _httpRequest.post)(url, device).then(function (response) {
      dispatch(add(response));
    }).catch(function (err) {
      if (err.status === 400) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, _getIterator3.default)(err.errors), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var value = _step2.value;

            errors = errors.set(value.field, value.code);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        dispatch(error(errors));
      } else {
        dispatch(genericError());
      }
    });
  };
};

/** @private */
var updateDevice = function updateDevice(url, device) {
  return function (dispatch, getState) {
    device.deviceId = (0, _parseInt2.default)(device.deviceId);
    var errors = new _immutable.Map();

    (0, _httpRequest.put)(url + '/' + device.id, device).then(function (response) {
      dispatch(update(response));
    }).catch(function (err) {
      if (err.status === 404) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (0, _getIterator3.default)(err.errors), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var value = _step3.value;

            errors = errors.set(value.field, value.code);
          }
          // dispatch(error(errors))
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      } else {
        dispatch(genericError());
      }
    });
  };
};

/** @private */
var reloadDevices = function reloadDevices(url) {
  return function (dispatch, getState) {
    (0, _isomorphicFetch2.default)(url).then(function (response) {
      return response.json();
    }).then(function (items) {
      return _SICKPlatform.store.dispatch(reload(items));
    });
  };
};

/** @private */
var deleteDevice = function deleteDevice(url, id, deviceId) {
  return function (dispatch, getState) {
    var errors = new _immutable.Map();

    (0, _httpRequest.del)(url + '/' + id, {}).then(function (response) {
      dispatch(remove(deviceId));
    }).catch(function (err) {
      if (err.status === 404) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = (0, _getIterator3.default)(err.errors), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var value = _step4.value;

            errors = errors.set(value.field, value.code);
          }
          // dispatch(error(errors))
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      } else {
        dispatch(genericError());
      }
    });
  };
};

/** @private */
var undoAddDevice = function undoAddDevice(url, id, deviceId) {
  return function (dispatch, getState) {
    (0, _httpRequest.del)(url + '/' + id, {}).then(function (response) {
      dispatch(undoAdd(deviceId));
    }).catch(function (err) {
      console.error(err);
      dispatch(genericError());
    });
  };
};

/** @private */
var undoRemoveDevice = function undoRemoveDevice(url, device) {
  return function (dispatch, getState) {
    (0, _httpRequest.post)(url, device).then(function (response) {
      dispatch(undoRemove(response));
    }).catch(function (err) {
      console.error(err);
      dispatch(genericError());
    });
  };
};

/** @private */
var clearStatus = function clearStatus() {
  return function (dispatch, getState) {
    dispatch(clear());
  };
};

var startOver = exports.startOver = function startOver() {
  _SICKPlatform.store.dispatch(start());
};

var editDevice = function editDevice(device) {
  _SICKPlatform.store.dispatch(edit(device));
};

var actions = exports.actions = {
  addDevice: addDevice,
  updateDevice: updateDevice,
  reloadDevices: reloadDevices,
  deleteDevice: deleteDevice,
  editDevice: editDevice,
  clearStatus: clearStatus,
  undoAddDevice: undoAddDevice,
  undoRemoveDevice: undoRemoveDevice

  // ------------------------------------
  // Reducer
  // ------------------------------------

};var initialState = new _immutable.Map();

var actionHandlers = (_actionHandlers = {}, (0, _defineProperty3.default)(_actionHandlers, DEVICES_RELOADED, function (state, _ref) {
  var items = _ref.items;

  var nextState = new _immutable.Map();
  nextState = nextState.set('items', items);
  nextState = nextState.set('status', DEVICES_RELOADED_STATUS);
  nextState = nextState.set('wsErrors', new _immutable.Map());

  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, DEVICE_UPDATED, function (state, _ref2) {
  var device = _ref2.device;

  var nextState = state;
  nextState = nextState.setIn(['items', device.deviceId], device);
  nextState = nextState.set('status', DEVICE_UPDATED_STATUS);
  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, DEVICE_ADDED, function (state, _ref3) {
  var device = _ref3.device;

  var nextState = state;
  nextState = nextState.setIn(['items', device.deviceId], device);
  nextState = nextState.set('status', DEVICE_ADDED_STATUS);
  nextState = nextState.set('lastInsertedId', device.deviceId);
  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, DEVICE_REMOVED, function (state, _ref4) {
  var deviceId = _ref4.deviceId;

  var nextState = state;
  nextState = nextState.deleteIn(['items', deviceId]);
  nextState = nextState.set('status', DEVICE_REMOVED_STATUS);
  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, DEVICE_ADDED_UNDO, function (state, _ref5) {
  var deviceId = _ref5.deviceId;

  var nextState = state;
  nextState = nextState.deleteIn(['items', deviceId]);
  nextState = nextState.set('status', DEVICE_ADDED_UNDO_STATUS);
  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, DEVICE_CLEAR, function (state) {
  var nextState = state;
  nextState = nextState.set('status', DEVICE_CLEAR_STATUS);
  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, DEVICE_START_OVER, function (state) {
  var nextState = state;
  nextState = nextState.set('status', DEVICE_START_OVER_STATUS);
  nextState = nextState.set('wsErrors', new _immutable.Map());
  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, DEVICE_ERROR, function (state, _ref6) {
  var errors = _ref6.errors;

  var nextState = state;
  nextState = nextState.set('status', DEVICE_ERROR_STATUS);
  nextState = nextState.set('wsErrors', errors);
  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, GENERIC_ERROR, function (state, _ref7) {
  var errors = _ref7.errors;

  var nextState = state;
  nextState = nextState.set('status', GENERIC_ERROR_STATUS);
  return nextState;
}), (0, _defineProperty3.default)(_actionHandlers, DEVICE_UNDO_REMOVED, function (state, _ref8) {
  var device = _ref8.device;

  var nextState = state;
  nextState = nextState.setIn(['items', device.deviceId], device);
  nextState = nextState.set('status', DEVICE_UNDO_REMOVED_STATUS);
  nextState = nextState.set('lastUndoDevice', device);
  return nextState;
}), _actionHandlers);

/** @private */
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _immutable = require('immutable');

var _initial_state = require('./initial_state');

var _initial_state2 = _interopRequireDefault(_initial_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.fromJS)(_initial_state2.default);
  var action = arguments[1];

  switch (action.type) {
    case _constants2.default.UPDATE_PACKAGE_LIST_COLUMNS:
      {
        var packageListColumns = action.packageListColumns;

        return state.merge({
          data: packageListColumns
        });
      }
    default:
      {
        return state;
      }
  }
}
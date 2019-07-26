'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _initial_state = require('./initial_state');

var _initial_state2 = _interopRequireDefault(_initial_state);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is to support the 'ducks' thing
// that's going on in this repo...
exports.default = (0, _assign2.default)({
  default: _reducer2.default,
  initialState: _initial_state2.default
}, _constants2.default, _actions2.default);
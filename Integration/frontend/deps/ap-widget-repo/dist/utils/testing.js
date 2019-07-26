'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderWithContext = exports.shallowWithContext = exports.mountWithContext = undefined;

var _enzyme = require('enzyme');

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _SICKMuiTheme = require('../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = { context: { muiTheme: (0, _getMuiTheme2.default)(_SICKMuiTheme2.default) } };

var mountWithContext = exports.mountWithContext = function mountWithContext(component) {
  return (0, _enzyme.mount)(component, options);
};

var shallowWithContext = exports.shallowWithContext = function shallowWithContext(component) {
  return (0, _enzyme.shallow)(component, options);
};

var renderWithContext = exports.renderWithContext = function renderWithContext(component) {
  return (0, _enzyme.render)(component, options);
};
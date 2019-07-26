'use strict';

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _TimelineGridSettingsDialog = require('./TimelineGridSettingsDialog');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @test {(Widget -> Component) TimelineGrid -> TimelineGridSettingsDialog} */
describe('(Widget -> Component) TimelineGrid -> TimelineGridSettingsDialog', function () {
  it('should render properly', function () {
    var measurementSystem = 'metric';
    var group = 'test-group';
    var wrapper = (0, _enzyme.shallow)((0, _jsx3.default)(_TimelineGridSettingsDialog.TimelineGridSettingsDialog, {
      open: true,
      measurementSystem: measurementSystem,
      group: group
    }));
    expect(wrapper.type()).to.equal(_Dialog2.default);
    expect(wrapper.find(_SelectField2.default)).to.have.length(1);
  });
});
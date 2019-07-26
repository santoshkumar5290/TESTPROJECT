'use strict';

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _TimelineGridColumnSettings = require('./TimelineGridColumnSettings');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @test {(Widget -> Component) TimelineGrid -> TimelineGridColumnSettings} */
describe('(Widget -> Component) TimelineGrid -> TimelineGridColumnSettings', function () {
  it('should render properly', function () {
    var group = 'test-group';
    var wrapper = (0, _enzyme.shallow)((0, _jsx3.default)(_TimelineGridColumnSettings.TimelineGridColumnSettings, {
      open: true,
      group: group,
      columns: _utils.columns
    }));

    expect(wrapper.type()).to.equal(_Dialog2.default);
  });
});
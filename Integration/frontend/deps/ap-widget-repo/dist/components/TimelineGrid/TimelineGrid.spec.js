'use strict';

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _TimelineGrid = require('./TimelineGrid');

var _TimelineGrid2 = _interopRequireDefault(_TimelineGrid);

var _TimelineGridColumnSettings = require('./TimelineGridColumnSettings');

var _TimelineGridColumnSettings2 = _interopRequireDefault(_TimelineGridColumnSettings);

var _TimelineGridSettingsDialog = require('./TimelineGridSettingsDialog');

var _TimelineGridSettingsDialog2 = _interopRequireDefault(_TimelineGridSettingsDialog);

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableBody = require('./TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _TableFooter = require('./TableFooter');

var _TableFooter2 = _interopRequireDefault(_TableFooter);

var _SearchFilter = require('./SearchFilter');

var _DateRangeFilter = require('./DateRangeFilter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @test {(Widget) TimelineGrid} */
describe('(Widget) TimelineGrid', function () {
  it('should render itself as well as nested components', function () {
    var group = 'test-group';

    var wrapper = (0, _enzyme.mount)((0, _jsx3.default)(_TimelineGrid2.default, {
      title: 'Package Data',
      group: group,
      channel: 'warehouse_1',
      packageUrl: 'http://localhost:8080/package',
      exportUrl: 'http://localhost:8080/export',
      style: { height: 600 },
      conditionDefinitions: {},
      start: new Date(Date.now() - 86400000),
      end: new Date(Date.now() + 86400000),
      limit: 20,
      desc: true,
      startRowIndex: 0,
      searchTerm: '',
      excludeConditions: []
    }));

    // Assert TimelineGrid structure
    expect(wrapper.find(_TableHeader2.default)).to.have.length(1);
    expect(wrapper.find(_TableBody2.default)).to.have.length(1);
    expect(wrapper.find(_TableFooter2.default)).to.have.length(1);
    expect(wrapper.find(_TimelineGridColumnSettings2.default)).to.have.length(0);
    expect(wrapper.find(_TimelineGridSettingsDialog2.default)).to.have.length(0);

    // Header buttons
    expect(wrapper.find(_SearchFilter.SearchFilter)).to.have.length(1);
    expect(wrapper.find(_DateRangeFilter.DateRangeFilter)).to.have.length(1);
    expect(wrapper.find('.reload-data-button')).to.have.length(1);
  });
});
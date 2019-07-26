'use strict';

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _DateRangeFilter = require('./DateRangeFilter');

var _DatePicker = require('material-ui/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _TimePicker = require('material-ui/TimePicker');

var _TimePicker2 = _interopRequireDefault(_TimePicker);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @test {(Widget -> Component) TimelineGrid -> DateRangeFilter} */
var _ref = (0, _jsx3.default)(_DateRangeFilter.DateRangeFilter, {});

describe('(Widget -> Component) TimelineGrid -> DateRangeFilter', function () {
    it('should render self and subcomponents', function () {
        var wrapper = (0, _enzyme.shallow)(_ref);

        // Root component is a div.
        expect(wrapper.type()).to.equal('div');

        // There should be on IconButton.
        expect(wrapper.find(_IconButton2.default)).to.have.length(1);

        // The should be one dialog.
        var dialog = wrapper.find(_Dialog2.default);
        expect(dialog).to.have.length(1);
        // Dialog contains 2 date pickers and 2 time pickers.
        expect(dialog.prop('open')).to.equal(false);
        expect(dialog.find(_DatePicker2.default)).to.have.length(2);
        expect(dialog.find(_TimePicker2.default)).to.have.length(2);
    });
});
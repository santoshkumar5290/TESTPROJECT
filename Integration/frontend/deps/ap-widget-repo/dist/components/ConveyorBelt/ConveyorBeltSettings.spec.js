'use strict';

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ConveyorBeltSettings = require('./ConveyorBeltSettings');

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _SICKMuiTheme = require('../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderConveyorBelt() {
  var context = {
    muiTheme: (0, _getMuiTheme2.default)(_SICKMuiTheme2.default)
  };

  return (0, _enzyme.shallow)((0, _jsx3.default)(_ConveyorBeltSettings.ConveyorBeltSettings, {
    open: true,
    group: 'test',
    conditionDefinitions: {
      colors: {
        '#009688': {
          'condition': 'None'
        },
        '#F5A623': {
          'condition': 'None'
        },
        '#D0021B': {
          'condition': 'None'
        },
        '#0288D1': {
          'condition': 'None'
        }
      },
      noread: {
        label: 'No reads',
        defaultValue: '#F4511E'
      },
      multiread: {
        label: 'Multiple reads',
        defaultValue: '#4CAF50'
      }
    },
    userSettings: {}
  }), { context: context });
}

/** @test {(Widget) ConveyorBeltSettings} */
describe('(Widget) ConveyorBeltSettings', function () {
  it('Should render as <Dialog>.', function () {
    var conveyorBelt = renderConveyorBelt();

    expect(conveyorBelt.type()).to.equal(_Dialog2.default);
  });
});
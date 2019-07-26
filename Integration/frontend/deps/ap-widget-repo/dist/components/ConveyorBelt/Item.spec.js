'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sampleItem = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _velocityReact = require('velocity-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @private */
var sampleItem = exports.sampleItem = {
  'id': '12346038',
  'timestamp': '2016-05-31T00:25:59.282',
  'imageUrl': '',
  'conditions': ['multiread'],
  'shape': {
    'type': 'box',
    'unit': 'm',
    'distanceToEdge': '0.08',
    'placementAngle': '142.92',
    'dimensions': {
      'length': '0.47',
      'width': '0.49',
      'height': '0.44'
    },
    'boundingBoxWidth': '0.6742961599677414'
  },
  'barcodes': [{
    'x': '-0.06',
    'y': '-0.05',
    'width': '0.1016',
    'height': '0.1016',
    'degree': '0.22'
  }],
  'scaleData': {
    'weight': {
      'measurement': '1',
      'unit': 'kg'
    }
  }
};

var removeItem = function removeItem() {};

function conveyorBeltStateWithItems(group, items) {
  return (0, _defineProperty3.default)({}, group, {
    items: new _map2.default(),
    speed: 0,
    unit: 'm/sec',
    width: 1
  });
}

/** @test {(Widget -> Component) ConveyorBelt -> Item} */
describe('(Widget -> Component) ConveyorBelt -> Item', function () {
  it('Should render as a <VelocityComponent>.', function () {
    var group = 'test';

    var conveyorBeltState = conveyorBeltStateWithItems(group, []);

    var conveyorBeltItem = (0, _enzyme.shallow)((0, _jsx3.default)(_Item2.default, {
      data: sampleItem,
      belt: conveyorBeltState,
      conditionDefinitions: {
        noread: {
          label: 'No reads',
          defaultValue: '#F4511E'
        },
        multiread: {
          label: 'Multiple reads',
          defaultValue: '#4CAF50'
        }
      },
      direction: _Item.RIGHT_TO_LEFT,
      distance: 1000,
      speed: conveyorBeltState[group].speed,
      pixelsPerUnit: 10,
      settings: {},
      onComplete: removeItem,
      view: _Item.TOP_VIEW
    }, 1));

    expect(conveyorBeltItem.type()).to.equal(_velocityReact.VelocityComponent);
  });
});
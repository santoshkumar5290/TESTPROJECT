'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _enzyme = require('enzyme');

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _ConveyorBelt = require('./ConveyorBelt');

var _Item = require('./Item.spec');

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var State = (0, _immutable.Record)({
  items: new _immutable.Map(),
  speed: 0,
  unit: 'm/sec',
  width: 1
});

function stateWithItems(items) {
  var state = new State();

  items.forEach(function (item) {
    item._id = _nodeUuid2.default.v4();
    state = state.setIn(['items', item._id], item);
  });

  return state;
}

var actionCreators = {
  removeItem: function removeItem() {},
  subscribe: function subscribe() {
    return { id: 'sub-id' };
  },
  unsubscribe: function unsubscribe() {}

  /** @test {(Widget) ConveyorBelt} */
};describe('(Widget) ConveyorBelt', function () {
  it('Should render with empty state as <div>.', function () {
    var conveyorBelt = (0, _enzyme.shallow)(_react2.default.createElement(_ConveyorBelt.ConveyorBelt, (0, _extends3.default)({}, actionCreators, {
      userSettings: {},
      channel: 'warehouse_1',
      conditionDefinitions: {},
      conveyorBelt: {}
    })));

    expect(conveyorBelt.type()).to.equal(_Paper2.default);
  });

  it('Should render with state as <div>.', function () {
    var conveyorBelt = (0, _enzyme.shallow)(_react2.default.createElement(_ConveyorBelt.ConveyorBelt, (0, _extends3.default)({}, actionCreators, {
      userSettings: {},
      channel: 'warehouse_1',
      conditionDefinitions: {},
      group: 'test',
      conveyorBelt: stateWithItems([_Item.sampleItem])
    })));

    expect(conveyorBelt.type()).to.equal(_Paper2.default);
  });

  it('Should render item', function () {
    var state = stateWithItems([_Item.sampleItem]);
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_ConveyorBelt.ConveyorBelt, (0, _extends3.default)({}, actionCreators, {
      userSettings: {},
      group: 'test',
      channel: 'warehouse_1',
      conveyorBelt: state,
      conditionDefinitions: {
        noread: {
          label: 'No reads',
          defaultValue: '#F4511E'
        },
        multiread: {
          label: 'Multiple reads',
          defaultValue: '#4CAF50'
        }
      }
    })));
    var itemId = state.items.first()._id;
    var item = wrapper.find('#SICKConveyorBeltItem-' + itemId);
    expect(item.type()).to.equal('div');
  });
});
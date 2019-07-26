'use strict';

var _systemConfig = require('./systemConfig');

var _systemConfig2 = _interopRequireDefault(_systemConfig);

var _immutable = require('immutable');

var _deepFreezeStrict = require('deep-freeze-strict');

var _deepFreezeStrict2 = _interopRequireDefault(_deepFreezeStrict);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Sample device (1)
var device1 = {
  'deviceId': 100,
  'name': 'device 1',
  'family': 'OTHER',
  'label': 'Device 1 Label',
  'ftpInformation': {
    'username': 'admin',
    'password': 'admin'
  },
  'ipAddress': '127.0.0.1'

  // Sample device (2)
};var device2 = {
  'deviceId': 200,
  'name': 'device 2',
  'family': 'OTHER',
  'label': 'Device 2 Label'

  // Sample device (3)
};var device3 = {
  'deviceId': 200,
  'name': 'device 3',
  'family': 'OTHER',
  'label': 'Device 3 Label'

  // Sample list of devices
};var sampleItems = new _immutable.Map([[device1.deviceId, device1], [device2.deviceId, device2]]);

var state = new _immutable.Map([['items', new _immutable.Map()], ['status', ''], ['lastInsertedId', 0]]);

(0, _deepFreezeStrict2.default)(state);

describe('(Duck -> Reducer) systemConfig', function () {
  it('Should load all devices when DEVICES_RELOADED action is dispatched', function () {
    var newState = (0, _systemConfig2.default)(state, { type: _systemConfig.DEVICES_RELOADED, items: sampleItems });

    expect(newState.get('items').size).to.equal(2);
    expect(newState.get('status')).to.equal(_systemConfig.DEVICES_RELOADED_STATUS);
  });

  it('Should add the device into the state when DEVICE_ADDED action is dispatched', function () {
    var newState = (0, _systemConfig2.default)(state, { type: _systemConfig.DEVICE_ADDED, device: device1 });

    expect(newState.get('items').size).to.equal(1);
    expect(newState.get('lastInsertedId')).to.equal(100);
    expect(newState.get('status')).to.equal(_systemConfig.DEVICE_ADDED_STATUS);
  });

  it('Should update the device into the state when DEVICE_UPDATED action is dispatched', function () {
    var newState = (0, _systemConfig2.default)(state, { type: _systemConfig.DEVICES_RELOADED, items: sampleItems });
    var newStateUpdate = (0, _systemConfig2.default)(newState, { type: _systemConfig.DEVICE_UPDATED, device: device3 });

    expect(newStateUpdate.get('items').size).to.equal(2);
    expect(newStateUpdate.get('status')).to.equal(_systemConfig.DEVICE_UPDATED_STATUS);
    expect(newStateUpdate.get('items').get(200).label).to.equal('Device 3 Label');
  });

  it('Should remove the device into the state when DEVICE_REMOVED action is dispatched', function () {
    var newState = (0, _systemConfig2.default)(state, { type: _systemConfig.DEVICES_RELOADED, items: sampleItems });
    var newStateUpdate = (0, _systemConfig2.default)(newState, { type: _systemConfig.DEVICE_REMOVED, deviceId: 200 });

    expect(newStateUpdate.get('items').size).to.equal(1);
    expect(newStateUpdate.get('status')).to.equal(_systemConfig.DEVICE_REMOVED_STATUS);
    expect(newStateUpdate.get('items').has(200)).to.equal(false);
  });
});
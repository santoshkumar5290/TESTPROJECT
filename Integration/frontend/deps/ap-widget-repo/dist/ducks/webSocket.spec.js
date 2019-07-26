'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _subscribers;

var _webSocket = require('./webSocket');

var _webSocket2 = _interopRequireDefault(_webSocket);

var _deepFreezeStrict = require('deep-freeze-strict');

var _deepFreezeStrict2 = _interopRequireDefault(_deepFreezeStrict);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var channel = 'conveyorbelt';
var channelData = {};
var subscriberId = 'foo-bar';
var otherSubscriberId = 'foo-bar-2';
var onMessage = function onMessage() {};

var state = {
  channels: (0, _defineProperty3.default)({}, channel, {
    data: channelData,
    subscribers: [subscriberId, otherSubscriberId]
  }),
  subscribers: (_subscribers = {}, (0, _defineProperty3.default)(_subscribers, subscriberId, {
    channel: channel,
    handlers: {
      onMessage: onMessage
    }
  }), (0, _defineProperty3.default)(_subscribers, otherSubscriberId, {
    channel: channel,
    handlers: {
      onMessage: onMessage
    }
  }), _subscribers)
};

(0, _deepFreezeStrict2.default)(state);

describe('(Duck -> Reducer) WebSocket', function () {
  it('Should remove the subscriber from the state when UNSUBSCRIBE action is dispatched', function () {
    var newState = (0, _webSocket2.default)(state, { type: _webSocket.UNSUBSCRIBE, id: subscriberId });

    expect(newState.channels[channel].subscribers).to.deep.equal([otherSubscriberId]);

    expect(newState.subscribers).to.not.have.property(subscriberId);

    expect(newState.subscribers).to.have.property(otherSubscriberId);
  });
});
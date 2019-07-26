'use strict';

var _textLiveView = require('./textLiveView');

var _textLiveView2 = _interopRequireDefault(_textLiveView);

var _immutable = require('immutable');

var _deepFreezeStrict = require('deep-freeze-strict');

var _deepFreezeStrict2 = _interopRequireDefault(_deepFreezeStrict);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var group = 'test-group';
var state = new _immutable.Map();
var payload = 'updated content';
(0, _deepFreezeStrict2.default)(state);

describe('(Duck -> Reducer) textLiveView', function () {
  it('CONTENT_UPDATE action should set widget content in the state', function () {
    var nextState = (0, _textLiveView2.default)(state, (0, _textLiveView.updateContent)(group, payload));

    expect(nextState.getIn([group, 'content'])).to.equal(payload);
  });
});
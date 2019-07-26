'use strict';

var _timelineData = require('./timelineData');

var _timelineData2 = _interopRequireDefault(_timelineData);

var _immutable = require('immutable');

var _deepFreezeStrict = require('deep-freeze-strict');

var _deepFreezeStrict2 = _interopRequireDefault(_deepFreezeStrict);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var payload = {
  'itemsTotal': 10,
  'itemsIndex': 0,
  'itemsList': [{
    'id': '17047163',
    'timestamp': '2016-10-26T16:23:15.317',
    'imageUrl': '',
    'hostmessage': ']C10259612019768754940129136,]C102300008829733069612220,]' + 'C102300008829733069612237,PDF,]C101142010001',
    'conditions': ['ValidDim', 'Shape', 'ValidWeight', 'ValidRead', 'PDFNoRead', 'LFT', 'CLV', 'CLVonly', 'InfoBarcode', 'Info', 'OcsRx', 'OcsValid', 'OcsGood'],
    'devices': ['Top', ' L/F', ' R/B'],
    'shape': {
      'type': 'box',
      'unit': 'm',
      'distanceToEdge': null,
      'placementAngle': '0.0',
      'dimensions': {
        'length': '1.29032',
        'width': '0.5435599999999999',
        'height': '0.41147999999999996'
      },
      'boundingBoxWidth': 0.5435599999999999
    },
    'barcodes': [{
      'x': '0.21',
      'y': '-0.02',
      'width': '0.1016',
      'height': '0.1016',
      'degree': '0.28'
    }],
    'scaledata': {
      'weight': {
        'measurement': '33.71',
        'unit': 'lb'
      }
    }
  }, {
    'id': '17047164',
    'timestamp': '2016-10-26T16:23:15.32',
    'imageUrl': '',
    'hostmessage': ']C10259612019768754940129136,]C102300008829733069612220,]' + 'C102300008829733069612237,PDF,]C101142010001',
    'conditions': ['ValidDim', 'Shape', 'ValidWeight', 'ValidRead', 'PDFNoRead', 'LFT', 'CLV', 'CLVonly', 'InfoBarcode', 'Info', 'OcsRx', 'OcsValid', 'OcsGood'],
    'devices': ['R/B'],
    'shape': {
      'type': 'box',
      'unit': 'm',
      'distanceToEdge': '0.07',
      'placementAngle': '-15.69',
      'dimensions': {
        'length': '1.29032',
        'width': '0.5435599999999999',
        'height': '0.41147999999999996'
      },
      'boundingBoxWidth': 0.8722507500960704
    },
    'barcodes': [{
      'x': '0.41',
      'y': '-0.02',
      'width': '0.1016',
      'height': '0.1016',
      'degree': '0.03'
    }],
    'scaledata': {
      'weight': {
        'measurement': '69.59',
        'unit': 'lb'
      }
    }
  }]
};
var group = 'test-group';
var url = 'http://www.example.com';
var params = {
  desc: true,
  start: new Date(),
  end: new Date(),
  limit: 2,
  searchTerm: '',
  startRowIndex: 0
};
var state = new _immutable.Map();
(0, _deepFreezeStrict2.default)(state);

describe('(Duck -> Reducer) timelineData', function () {
  it('INITIAL_DATA action should set initial package data', function () {
    var nextState = (0, _timelineData2.default)(state, {
      type: _timelineData.INITIAL_DATA,
      group: group,
      url: url,
      params: params
    });

    expect(nextState.get('status')).to.equal(_timelineData.INITIAL_STATUS);

    expect(nextState.getIn([group, 'url'])).to.equal(url);

    expect(nextState.getIn([group, 'params'])).to.deep.equal(params);

    expect(nextState.getIn([group, 'items']).toJS()).to.be.empty;

    expect(nextState.getIn([group, 'total'])).to.equal(0);

    expect(nextState.getIn([group, 'index'])).to.equal(0);
  });

  it('PACKAGE_RECIEVED action should populate state with received data', function () {
    var nextState = (0, _timelineData2.default)(state, {
      type: _timelineData.PACKAGE_RECIEVED,
      group: group,
      payload: payload,
      params: params
    });
    var itemsTotal = payload.itemsTotal,
        itemsIndex = payload.itemsIndex,
        itemsList = payload.itemsList;

    var item = itemsList[0];

    expect(nextState.getIn([group, 'items'])).to.be.an.instanceof(_immutable.OrderedMap);

    expect(nextState.getIn([group, 'total'])).to.equal(itemsTotal);

    expect(nextState.getIn([group, 'index'])).to.equal(itemsIndex);

    expect(nextState.getIn([group, 'items']).size).to.equal(itemsList.length);

    expect(nextState.getIn([group, 'items', item.id])).to.be.an.instanceof(_timelineData.Item);

    expect(nextState.getIn([group, 'params']).toJS()).to.deep.equal(params);
  });
});
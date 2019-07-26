'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = (0, _jsx3.default)('span', {}, void 0, '\'true\'');

var _ref2 = (0, _jsx3.default)('span', {}, void 0, '\'false\'');

exports.default = {
  data: [{
    index: 0,
    property: 'ID',
    active: true,
    width: 50
  }, {
    index: 1,
    property: 'Conditions',
    active: true,
    expanded: false,
    width: 50,
    children: [{
      index: 0,
      property: 'TN1Z',
      active: true,
      width: 50
    }, {
      index: 1,
      property: 'PTN',
      active: true,
      width: 50
    }, {
      index: 2,
      property: 'ZIP',
      active: true,
      width: 50
    }, {
      index: 3,
      property: 'MAXI',
      active: true,
      width: 50
    }, {
      index: 4,
      property: 'TOTE',
      active: true,
      width: 50
    }, {
      index: 5,
      property: 'Small',
      active: true,
      width: 50
    }]
  }, {
    index: 2,
    property: 'Barcode',
    active: true,
    expanded: false,
    width: 50,
    children: [{
      index: 0,
      property: 'TV',
      active: true,
      width: 50
    }, {
      index: 1,
      property: 'TOPA',
      active: true,
      width: 50
    }, {
      index: 2,
      property: 'LF',
      active: true,
      width: 50
    }, {
      index: 3,
      property: 'RB',
      active: true,
      width: 50
    }, {
      index: 4,
      property: 'RF',
      active: true,
      width: 50
    }, {
      index: 5,
      property: 'LB',
      active: true,
      width: 50
    }, {
      index: 6,
      property: 'BOT',
      active: true,
      width: 50
    }],
    formatters: [function (val) {
      return val ? _ref : _ref2;
    }]
  }, {
    index: 3,
    property: 'Dimensions',
    active: true,
    expanded: false,
    width: 50,
    children: [{
      index: 0,
      property: 'L',
      active: true,
      width: 50
    }, {
      index: 1,
      property: 'W',
      active: true,
      width: 50
    }, {
      index: 2,
      property: 'H',
      active: true,
      width: 50
    }, {
      index: 3,
      property: 'Gap',
      active: true,
      width: 50
    }]
  }, {
    index: 4,
    property: 'User Fields',
    active: true,
    expanded: false,
    width: 50,
    children: [{
      index: 0,
      property: 'STATUS',
      active: true,
      width: 50
    }, {
      index: 1,
      property: 'NTEP',
      active: true,
      width: 50
    }, {
      index: 2,
      property: 'DIM',
      active: true,
      width: 50
    }, {
      index: 3,
      property: 'PLC',
      active: true,
      width: 50
    }, {
      index: 4,
      property: 'PLC ID',
      active: true,
      width: 50
    }]
  }, {
    index: 5,
    property: 'Host Message',
    active: true,
    width: 50
  }]
};
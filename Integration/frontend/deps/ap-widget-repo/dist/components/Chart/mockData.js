'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetchMock = require('fetch-mock');

var _fetchMock2 = _interopRequireDefault(_fetchMock);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Returns a an array in the structure defined in ChartView.js
*/
/* eslint-disable */
var seriesSet = function seriesSet() {
  var seriesSet = [];
  var newSeries = void 0,
      date = void 0,
      i = void 0,
      d = void 0;

  for (i = 0; i < 31; i++) {
    newSeries = {
      name: 'Series ' + i,
      data: []
    };
    date = (0, _moment2.default)('2016-01-01');
    for (d = 0; d < 10; d++) {
      if (Math.random() < 0.1) {
        // skip at this rate to simulate missing data
        date.add(1, 'day');
        continue;
      }
      newSeries.data.push({ x: date.valueOf() / 86400000, y: Math.random(), xLabel: date.format('MMM D YYYY') });
      date.add(1, 'day');
    }
    seriesSet.push(newSeries);
  }

  return seriesSet;
};

exports.default = seriesSet;

/**
* Intercept request and return object based on the service contract, see ChartController
*/

_fetchMock2.default.get('express::protocol//:host/chartData/:seriesCount/:points', function (url, data, keys) {
  var seriesSet = [];
  var newSeries = void 0,
      date = void 0,
      i = void 0,
      d = void 0;
  var _url = url.split('/');
  var points = _url.pop();
  var series = _url.pop();

  for (i = 0; i < series; i++) {
    newSeries = {
      statisticName: 'Series ' + i,
      data: []
    };
    date = (0, _moment2.default)('2016-01-01');
    for (d = 0; d < points; d++) {
      if (Math.random() < 0.1) {
        // skip at this rate to simulate missing data
        date.add(1, 'day');
        continue;
      }
      newSeries.data.push({
        start: {},
        end: {
          label: date.format('MMM D YYYY'),
          value: date.toISOString()
        },
        readRate: parseFloat(Math.random() * 100).toFixed(1)
      });
      date.add(1, 'day');
    }
    seriesSet.push(newSeries);
  }

  return {
    metaData: {},
    statistics: seriesSet
  };
});

// Pass unmatched requests to native fetch.
_fetchMock2.default.spy();
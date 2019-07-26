'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestData = exports.fetchImage = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _httpRequest = require('../utils/httpRequest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchImage = exports.fetchImage = function fetchImage(images) {
  return function (dispatch) {
    return new _promise2.default(function (resolve, reject) {
      var requests = 0;
      for (var i = 0; i < images.length; i++) {
        requestData(images[i]).then(function (res) {
          if (res.data) {
            return resolve(res.data);
          }

          requests += 1;
          if (requests === images.length) {
            return resolve(false);
          }
        });
      }
    });
  };
};

var requestData = exports.requestData = function requestData(url) {
  var maxRetries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var attempts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  return (0, _httpRequest.get)(url).catch(function () {
    if (maxRetries) {
      attempts++;
      maxRetries--;
      setTimeout(function () {
        requestData(url, maxRetries, attempts);
      }, Math.pow(attempts, 2) * 1000); // exponential backoff
    }

    return { data: '' };
  });
};
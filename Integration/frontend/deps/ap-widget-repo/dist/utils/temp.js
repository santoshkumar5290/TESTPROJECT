'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = exports.post = exports.put = exports.del = exports.encodeParams = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.request = request;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function serialize() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var URIencode = function URIencode(k, v) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(v);
  };

  return (0, _keys2.default)(params).map(function (k) {
    var temp = params[k];
    // convert array to array notation.
    if (temp.constructor === Array && temp.length) {
      return encodeURIComponent(k) + '=' + temp.map(function (i) {
        return encodeURIComponent(i);
      }).join(',') + '';
    } else if (temp.constructor === Date) {
      // convert date to iso format
      temp = (0, _moment2.default)(temp).format('YYYY-MM-DDTHH:mm:ss.SSS');
    }

    return URIencode(k, temp);
  }).join('&');
}

function checkResponseStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    console.error(response);
  }
}

function request(method, url, params) {
  var options = {
    method: method,
    headers: {
      'Accept': 'application/json'
    }
  };

  var paramsRequests = ['delete', 'update', 'post', 'put'];

  if (paramsRequests.includes(method.toLowerCase())) {
    options.headers['Content-Type'] = 'application/json';
    options.body = (typeof params === 'undefined' ? 'undefined' : (0, _typeof3.default)(params)) === 'object' ? (0, _stringify2.default)(params) : params;
  } else if (params) {
    url = url + '?' + serialize(params);
  }

  return fetch(url, options).then(checkResponseStatus);
}

var encodeParams = exports.encodeParams = function encodeParams(params) {
  return serialize(params);
};

var del = exports.del = function del(url, params) {
  return request('delete', url, params);
};

var put = exports.put = function put(url, params) {
  return request('put', url, params);
};

var post = exports.post = function post(url, params) {
  return request('post', url, params);
};

var get = exports.get = function get(url, params) {
  return request('get', url, params);
};
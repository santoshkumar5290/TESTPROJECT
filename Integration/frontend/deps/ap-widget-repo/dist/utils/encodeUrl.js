'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var fixedEncodeURIComponent = exports.fixedEncodeURIComponent = function fixedEncodeURIComponent(str) {
  var encodeStr = encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
  return encodeStr.replace(/\./g, '%2E');
};
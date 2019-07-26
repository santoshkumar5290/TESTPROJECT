'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepmerge;

var _lodash = require('lodash.mergewith');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function customizer(destValue, srcValue, key, destParent) {
  if (srcValue === undefined) {
    delete destParent[key];
  } else if (destValue instanceof Array && srcValue instanceof Array) {
    if (destValue.length !== srcValue.length) {
      return srcValue;
    }
  }
}

/** @ignore */
function deepmerge(original, next) {
  return (0, _lodash2.default)({}, original, next, customizer);
}
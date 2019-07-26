"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Converts Base64 data to UintArray
 *
 * @param data Base64 data
 * @returns {*} UintArray data
 */
var b64ToUintArray = exports.b64ToUintArray = function b64ToUintArray(data) {
  var byteChars = atob(data);
  var byteNumbers = new Uint8Array(byteChars.length);
  for (var i = 0; i < byteNumbers.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  return byteNumbers;
};
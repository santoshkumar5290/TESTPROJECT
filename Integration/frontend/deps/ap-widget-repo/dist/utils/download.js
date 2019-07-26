'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startFileDownloadFromBlob = exports.startFileDownloadFromImgSrc = exports.startFileDownload = undefined;

var _base64Converter = require('./base64Converter');

/**
 * Downloads data to the file
 *
 * @param data to download
 * @param extension for the file - .png, .cvs, etc.
 * @param type is a mimeType
 * @param prefix name for file
 */
var startFileDownload = exports.startFileDownload = function startFileDownload(data, extension, type, prefix) {
  var blob = new Blob([data], { type: type });
  startFileDownloadFromBlob(blob, extension, prefix);
};

/**
 * Downloads data to the file
 *
 * @param src data to download - base64 encoded data
 * @param extension for the file - .png, .cvs, etc.
 * @param type is a mimeType
 * @param prefix name for file
 */
var startFileDownloadFromImgSrc = exports.startFileDownloadFromImgSrc = function startFileDownloadFromImgSrc(src, extension, type, prefix) {
  var data = (0, _base64Converter.b64ToUintArray)(src.replace('data:image/jpg;base64,', ''));
  startFileDownload(data, extension, type, prefix);
};

/**
 * Downloads data to the file
 *
 * @param blob data to download - expects correct Blob object
 * @param extension for the file - .png, .cvs, etc.
 * @param prefix name for file
 */
var startFileDownloadFromBlob = exports.startFileDownloadFromBlob = function startFileDownloadFromBlob(blob, extension, prefix) {
  // create filename and replace non-valid symbols like '/' or ':'
  // then remove all hidden characters.
  var filename = (prefix + '-' + new Date().toLocaleString() + extension).replace(/[/:]/g, '-').replace(/[^a-zA-Z0-9 -.]/g, '');
  if (window.navigator.msSaveOrOpenBlob) {
    // IE 10 / Edge compatibility
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    var a = document.createElement('a');
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.dispatchEvent(new MouseEvent('click'));
    // set timeout that revokeObjectURL can work correctly
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
};
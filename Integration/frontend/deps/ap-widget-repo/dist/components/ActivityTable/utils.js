'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columns = exports.transformers = exports.labels = exports.PACKAGE_ID_KEY = exports.HOST_MESSAGE_KEY = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

exports.renderTableColumns = renderTableColumns;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualized = require('react-virtualized');

var _CellWithTooltip = require('./CellWithTooltip');

var _CellWithTooltip2 = _interopRequireDefault(_CellWithTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

/** @private */


// ------------------------------------
// Components
// ------------------------------------

var HOST_MESSAGE_KEY = exports.HOST_MESSAGE_KEY = 'hostMessage';
/** @private */
var PACKAGE_ID_KEY = exports.PACKAGE_ID_KEY = 'objectIndex';

// ------------------------------------
// Transformers
// ------------------------------------

var plainContentTransformer = function plainContentTransformer(data) {
  return data;
};

var stringTransformer = function stringTransformer(data) {
  return (0, _jsx3.default)(_CellWithTooltip2.default, {
    content: data
  });
};

var positionTransformer = function positionTransformer(data) {
  // added null checks
  var content = data && data.x + ' (' + data.xmin + ' - ' + data.xmax + '), ' + data.y + ', ' + data.z + ' (' + data.unit + ')';

  return stringTransformer(content);
};

var dimensionsTransformer = function dimensionsTransformer(dimensions) {
  var content = dimensions && dimensions.length + ' x ' + dimensions.width + ' x ' + dimensions.height + ' (' + dimensions.unit + ')';

  return stringTransformer(content);
};

var weightTransformer = function weightTransformer(scaleData) {
  var content = scaleData && scaleData.weight && scaleData.weight.measurement + ' ' + scaleData.weight.unit;

  return stringTransformer(content);
};

// ------------------------------------
// Table column definitions
// ------------------------------------

// Possible base work for dynamic columns being defined by developers

/** @private */
var labels = exports.labels = {
  objectIndex: 'Object Index',
  barcodeIndex: 'Barcode Index',
  readList: 'Devices Read',
  bc: 'Barcode Content',
  barcodeConditions: 'Barcode Conditions',
  cs: 'Code Security',
  scaleData: 'Weight',
  barcodePosition: 'x,y,z - Position',
  dimensions: 'LxWxH - Dimensions',
  objectConditions: 'Evaluation Conditions',
  hostMessage: 'Host Message'

  /** @private */
};var transformers = exports.transformers = {
  objectIndex: stringTransformer,
  barcodeIndex: stringTransformer,
  readList: stringTransformer,
  bc: plainContentTransformer,
  barcodeConditions: stringTransformer,
  cs: stringTransformer,
  scaleData: weightTransformer,
  barcodePosition: positionTransformer,
  dimensions: dimensionsTransformer,
  objectConditions: stringTransformer,
  hostMessage: plainContentTransformer

  /** @private */
};var columns = exports.columns = [{ key: 'objectIndex', width: 100, isShown: true }, { key: 'barcodeIndex', width: 100, isShown: true }, { key: 'readList', width: 100, isShown: true }, { key: 'bc', width: 200, isShown: true }, { key: 'barcodeConditions', width: 200, isShown: true }, { key: 'cs', width: 100, isShown: true }, { key: 'scaleData', width: 100, isShown: true }, { key: 'barcodePosition', width: 200, isShown: true }, { key: 'dimensions', width: 200, isShown: true }, { key: 'objectConditions', width: 200, isShown: true }, { key: 'hostMessage', width: 200, isShown: true }];

// ------------------------------------
// Functions
// ------------------------------------

/**
 * @private
 */
function renderTableColumns(columns, labels, transformers, rowColumnStyle) {
  return columns.filter(function (c) {
    return c.isShown;
  }).map(function (_ref) {
    var key = _ref.key,
        width = _ref.width;
    return (0, _jsx3.default)(_reactVirtualized.FlexColumn, {
      disableSort: true,
      flexGrow: 1,
      width: width,
      style: rowColumnStyle(key),
      label: labels[key] ? labels[key] : key,
      dataKey: key,
      cellRenderer: cellRenderer(key, transformers[key])
    });
  });
}

/**
 * Return a renderer function to be used in FlexColumn
 *
 * @private
 * @param {string} key
 * @param {function} [transformer] transformer
 */
function cellRenderer(key, transformer) {
  transformer = transformer || stringTransformer;

  var renderer = function renderer(_ref2) {
    var rowData = _ref2.rowData;
    return transformer(rowData[key]);
  };

  return renderer;
}
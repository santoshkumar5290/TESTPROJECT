'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columns = exports.transformers = exports.labels = exports.CONDITIONS_ID_KEY = exports.IMPERIAL = exports.METRIC = exports.TIME_ID_KEY = exports.PACKAGE_ID_KEY = exports.HOST_MESSAGE_KEY = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _labels;

// ------------------------------------
// Components
// ------------------------------------

exports.renderTableColumns = renderTableColumns;
exports.getUnit = getUnit;
exports.getColumnLabel = getColumnLabel;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _reactVirtualized = require('react-virtualized');

var _CellWithTooltip = require('./CellWithTooltip');

var _CellWithTooltip2 = _interopRequireDefault(_CellWithTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var HOST_MESSAGE_KEY = exports.HOST_MESSAGE_KEY = 'hostmessage';
var PACKAGE_ID_KEY = exports.PACKAGE_ID_KEY = 'id';
var TIME_ID_KEY = exports.TIME_ID_KEY = 'timestamp';
var METRIC = exports.METRIC = 'metric';
var IMPERIAL = exports.IMPERIAL = 'imperial';
var CONDITIONS_ID_KEY = exports.CONDITIONS_ID_KEY = 'conditions';

// ------------------------------------
// Transformers
// ------------------------------------

var plainContentTransformer = function plainContentTransformer(data) {
  return data;
};

var arrayTransformer = function arrayTransformer(data) {
  return (0, _jsx3.default)(_CellWithTooltip2.default, {
    content: data.join(', ')
  });
};

var stringTransformer = function stringTransformer(data) {
  return (0, _jsx3.default)(_CellWithTooltip2.default, {
    content: data
  });
};

var countTransformer = function countTransformer(data) {
  return (0, _jsx3.default)(_CellWithTooltip2.default, {
    content: data.length,
    tooltipContent: data.length
  });
};

var weightTransformer = function weightTransformer(data, system) {
  return stringTransformer(data.weight.measurement);
};

var dimensionsTransformer = function dimensionsTransformer(dimension, system) {
  return stringTransformer(dimension.measurement);
};

// ------------------------------------
// Table column definitions
// ------------------------------------

// Possible base work for dynamic columns being defined by developers

var labels = exports.labels = (_labels = {}, (0, _defineProperty3.default)(_labels, PACKAGE_ID_KEY, 'Package ID'), (0, _defineProperty3.default)(_labels, TIME_ID_KEY, 'Time'), (0, _defineProperty3.default)(_labels, CONDITIONS_ID_KEY, 'Conditions'), (0, _defineProperty3.default)(_labels, 'devices', 'Devices'), (0, _defineProperty3.default)(_labels, 'barcodes', 'Barcodes'), (0, _defineProperty3.default)(_labels, 'dimension', 'Dimensions'), (0, _defineProperty3.default)(_labels, 'scaledata', 'Scale Data'), (0, _defineProperty3.default)(_labels, HOST_MESSAGE_KEY, 'Host Message'), _labels);

var transformers = exports.transformers = (0, _defineProperty3.default)({
  conditions: arrayTransformer,
  devices: arrayTransformer,
  barcodes: countTransformer,
  dimension: dimensionsTransformer,
  scaledata: weightTransformer
}, HOST_MESSAGE_KEY, plainContentTransformer);

var columns = exports.columns = [{ key: 'id', width: 100, isShown: true }, { key: 'timestamp', width: 200, isShown: true }, { key: 'conditions', width: 200, isShown: true }, { key: 'devices', width: 200, isShown: true }, { key: 'barcodes', width: 100, isShown: true }, { key: 'dimension', width: 200, isShown: true, type: 'length' }, { key: 'scaledata', width: 100, isShown: true, type: 'weight' }, { key: 'hostmessage', width: 300, isShown: true }];

// ------------------------------------
// Functions
// ------------------------------------

/**
 * @private
 */
function renderTableColumns(columns, labels, transformers, rowColumnStyle, measurementSystem) {
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
      label: getColumnLabel(key, null, labels, measurementSystem),
      dataKey: key,
      cellRenderer: cellRenderer(key, measurementSystem, transformers[key])
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
function cellRenderer(key, measurementSystem, transformer) {
  transformer = transformer || stringTransformer;

  var renderer = function renderer(_ref2) {
    var rowData = _ref2.rowData;
    return transformer(rowData[key], measurementSystem);
  };

  return renderer;
}

/**
 * Get unit string according to a specific measurement type and system
 * @param {string} type - measurement type [length | weight]
 * @param {string} system - measurement system [metric | imperial]
 * @return {string} unit - unit string, defaults to null.
 */
function getUnit(type, system) {
  var system2unit = {
    weight: {
      metric: 'kg',
      imperial: 'lbs'
    },
    length: {
      metric: 'mm',
      imperial: 'inch'
    }
  };

  return (0, _lodash.get)(system2unit, type + '.' + system, null);
}

/**
 * Get column label.
 * @param {string} opKey - column key.
 * @param {array} opColumns - Optional. Used to override global column definitions array.
 * @param {array} opLabels - Optional. Used to override global column labels array.
 * @param {string} measurementSystem - [ metric | imperial ]
 * @return {string} label
 */
function getColumnLabel(opKey, opColumns, opLabels, measurementSystem) {
  opColumns = opColumns || columns;
  opLabels = opLabels || labels;
  var label = opLabels[opKey] ? opLabels[opKey] : opKey;
  var type = (0, _lodash.result)((0, _lodash.find)(opColumns, function (_ref3) {
    var key = _ref3.key;
    return key === opKey;
  }), 'type');

  // Append unit string.
  if (type) {
    var unit = getUnit(type, measurementSystem);
    label = unit ? label + ' (' + unit + ')' : label;
  }

  return label;
}
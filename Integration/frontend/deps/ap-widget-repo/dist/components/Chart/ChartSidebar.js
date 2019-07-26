'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Toggle = require('material-ui/Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChartSidebar = function ChartSidebar(_ref) {
  var seriesSet = _ref.seriesSet,
      enabledSeriesNames = _ref.enabledSeriesNames,
      seriesColors = _ref.seriesColors,
      handleSeriesToggle = _ref.handleSeriesToggle,
      handleAllToggle = _ref.handleAllToggle,
      legendWidth = _ref.legendWidth,
      styles = _ref.styles,
      localization = _ref.localization,
      localizationSet = _ref.localizationSet,
      className = _ref.className;

  styles = (0, _extends3.default)({
    container: {
      width: legendWidth + 'px',
      height: 'inherit',
      overflow: 'auto',
      boxSizing: 'border-box',
      padding: '10px 5px'
    },
    label: {
      whiteSpace: 'normal',
      wordBreak: 'break-all',
      lineHeight: '22px'
    }
  }, styles);

  var legend = seriesSet.map(function (series) {
    return (0, _jsx3.default)(_Toggle2.default, {
      className: 'legend ' + series.name,
      name: series.name,
      label: series.name,
      labelPosition: 'right',
      labelStyle: styles.label,
      defaultToggled: enabledSeriesNames.includes(series.name),
      thumbSwitchedStyle: {
        backgroundColor: seriesColors[series.name]
      },
      trackSwitchedStyle: {
        backgroundColor: seriesColors[series.name],
        opacity: '.5'
      },
      thumbStyle: {
        backgroundColor: _colors.grey200
      },
      trackStyle: {
        backgroundColor: _colors.grey400
      },
      onToggle: handleSeriesToggle
    });
  });

  return (0, _jsx3.default)('div', {
    className: className,
    style: styles.container
  }, void 0, seriesSet.length > 1 && (0, _jsx3.default)(_Toggle2.default, {
    className: 'legend all',
    name: 'all',
    label: localization.formatMessage(localizationSet + ':chartAll'),
    labelPosition: 'right',
    labelStyle: styles.label,
    defaultToggled: seriesSet.length === enabledSeriesNames.length,
    thumbSwitchedStyle: {
      backgroundColor: _colors.darkBlack
    },
    trackSwitchedStyle: {
      backgroundColor: _colors.darkBlack,
      opacity: '.5'
    },
    thumbStyle: {
      backgroundColor: _colors.grey200
    },
    trackStyle: {
      backgroundColor: _colors.grey400
    },
    onToggle: handleAllToggle
  }), legend);
};

exports.default = ChartSidebar;
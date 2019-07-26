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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 = (0, _jsx3.default)('div', {
  className: 'content'
});

var ChartTip = function ChartTip(_ref) {
  var setTipNode = _ref.setTipNode,
      styles = _ref.styles;

  styles = (0, _extends3.default)({
    container: {
      opacity: 0,
      position: 'absolute',
      textAlign: 'center',
      color: '#fff',
      boxSizing: 'border-box',
      padding: '4px',
      fontSize: '12px',
      background: 'rgba(0, 0, 0, 0.7)',
      pointerEvents: 'none',
      transition: 'all .2s'
    },
    pointer: {
      position: 'relative',
      height: '0px',
      top: '1px',
      color: 'rgba(0, 0, 0, 0.7)'
    }
  }, styles);
  return _react2.default.createElement(
    'div',
    {
      className: 'tip',
      ref: setTipNode,
      style: styles.container },
    _ref2,
    (0, _jsx3.default)('div', {
      className: 'pointer',
      style: styles.pointer
    }, void 0, '\u25BC')
  );
};

exports.default = ChartTip;
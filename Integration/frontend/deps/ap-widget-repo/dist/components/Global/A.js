'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
  textDecoration: 'none',
  cursor: 'pointer'

  /**
   * Reusable component to encapsulate hyperlink.
   * @private
   */
};
var A = function () {
  function A(props) {
    var finalStyle = (0, _extends3.default)({}, style, props.style);

    return _react2.default.createElement(
      'a',
      (0, _extends3.default)({}, props, { style: finalStyle }),
      props.children
    );
  }

  return A;
}();

A.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = A;
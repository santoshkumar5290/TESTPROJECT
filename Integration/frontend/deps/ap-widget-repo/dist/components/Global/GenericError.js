'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _colors = require('material-ui/styles/colors');

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Helpers
// ------------------------------------

function getStyles() {
  return {
    title: {
      color: _colors.red400,
      textTransform: 'uppercase',
      marginRight: 50
    },
    message: {
      textAlign: 'right'
    }
  };
}

/**
 * Component that encapsulates snackbar error messages.
 * @private
 */


// ------------------------------------
// Components
// ------------------------------------

var GenericError = function (_React$Component) {
  (0, _inherits3.default)(GenericError, _React$Component);

  function GenericError() {
    (0, _classCallCheck3.default)(this, GenericError);
    return (0, _possibleConstructorReturn3.default)(this, (GenericError.__proto__ || (0, _getPrototypeOf2.default)(GenericError)).apply(this, arguments));
  }

  (0, _createClass3.default)(GenericError, [{
    key: '_getMessage',
    value: function _getMessage(title, message) {
      var styles = getStyles();

      return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('span', {
        style: styles.title
      }, void 0, title), (0, _jsx3.default)('span', {
        style: styles.message
      }, void 0, message));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          message = _props.message,
          open = _props.open,
          autoHideDuration = _props.autoHideDuration;


      return (0, _jsx3.default)(_Snackbar2.default, {
        open: open,
        message: this._getMessage(title, message),
        autoHideDuration: autoHideDuration
      });
    }
  }]);
  return GenericError;
}(_react2.default.Component);

GenericError.defaultProps = {
  title: 'Error',
  message: 'Something went wrong',
  open: false,
  autoHideDuration: 5000
};
exports.default = GenericError;
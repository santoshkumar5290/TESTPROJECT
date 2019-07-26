'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebSocketStatus = undefined;

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

var _SICKPlatform = require('../../SICKPlatform');

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _warning = require('material-ui/svg-icons/alert/warning');

var _warning2 = _interopRequireDefault(_warning);

var _checkCircle = require('material-ui/svg-icons/action/check-circle');

var _checkCircle2 = _interopRequireDefault(_checkCircle);

var _webSocket = require('../../ducks/webSocket');

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Components
// ------------------------------------

function getStyles(props, context) {
  return {
    activeContent: {
      display: 'flex',
      alignItems: 'center'
    },
    inactiveContent: {
      display: 'flex',
      alignItems: 'center'
    },
    activeIcon: {
      height: 16,
      width: 16,
      marginRight: 4,
      fill: _colors.green500
    },
    inactiveIcon: {
      height: 16,
      width: 16,
      marginRight: 4,
      fill: _colors.red500
    }
  };
}

/**
 * Creates a small component which indicates the current status of the global websocket connection.
 * *Note: This component is currently designed for private use only.*
 *
 * @private
 */

var WebSocketStatus = exports.WebSocketStatus = function (_SICKComponent) {
  (0, _inherits3.default)(WebSocketStatus, _SICKComponent);

  function WebSocketStatus() {
    (0, _classCallCheck3.default)(this, WebSocketStatus);
    return (0, _possibleConstructorReturn3.default)(this, (WebSocketStatus.__proto__ || (0, _getPrototypeOf2.default)(WebSocketStatus)).apply(this, arguments));
  }

  (0, _createClass3.default)(WebSocketStatus, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          status = _props.status,
          style = _props.style;

      var styles = getStyles(this.props, this.context);
      return (0, _jsx3.default)('div', {
        style: style
      }, void 0, status === _webSocket.STATUS_OPEN ? (0, _jsx3.default)('div', {
        style: styles.activeContent
      }, void 0, (0, _jsx3.default)(_checkCircle2.default, {
        style: styles.activeIcon
      }), 'Active') : (0, _jsx3.default)('div', {
        style: styles.inactiveContent
      }, void 0, (0, _jsx3.default)(_warning2.default, {
        style: styles.inactiveIcon
      }), 'Inactive'));
    }

    /** @ignore */

  }]);
  return WebSocketStatus;
}(_SICKComponent3.default);

WebSocketStatus.propTypes = {
  status: _propTypes2.default.oneOf([_webSocket.STATUS_CLOSED, _webSocket.STATUS_OPEN])
};
exports.default = (0, _SICKPlatform.connect)(function (_ref) {
  var webSocket = _ref.webSocket;
  return { status: webSocket.status };
})(WebSocketStatus);
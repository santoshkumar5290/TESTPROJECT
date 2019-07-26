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

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _visibility = require('material-ui/svg-icons/action/visibility');

var _visibility2 = _interopRequireDefault(_visibility);

var _visibilityOff = require('material-ui/svg-icons/action/visibility-off');

var _visibilityOff2 = _interopRequireDefault(_visibilityOff);

var _SICKMuiTheme = require('../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A component to toggle the visibility icon.
 * @private
 */


// ------------------------------------
// Components
// ------------------------------------

var HeaderWithVisibilityToggle = function (_React$Component) {
  (0, _inherits3.default)(HeaderWithVisibilityToggle, _React$Component);

  function HeaderWithVisibilityToggle(props, context) {
    (0, _classCallCheck3.default)(this, HeaderWithVisibilityToggle);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HeaderWithVisibilityToggle.__proto__ || (0, _getPrototypeOf2.default)(HeaderWithVisibilityToggle)).call(this, props, context));

    _this.state = {
      on: _this.props.onByDefault
    };

    _this._toggle = _this._toggle.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(HeaderWithVisibilityToggle, [{
    key: '_toggle',
    value: function _toggle() {
      var onOrOff = !this.state.on;

      this.setState({
        on: onOrOff
      });

      this.props.onToggle && this.props.onToggle(onOrOff);
    }
  }, {
    key: 'render',
    value: function render() {
      var label = this.props.label;

      var actionIconColor = _SICKMuiTheme2.default.palette.iconColor;

      return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('span', {}, void 0, label), (0, _jsx3.default)(_IconButton2.default, {
        style: { position: 'absolute', top: '0', right: '0' },
        onClick: this._toggle,
        name: 'sap-at-visibility-toggle'
      }, void 0, this.state.on ? (0, _jsx3.default)(_visibilityOff2.default, {
        color: actionIconColor
      }) : (0, _jsx3.default)(_visibility2.default, {
        color: actionIconColor
      })));
    }
  }]);
  return HeaderWithVisibilityToggle;
}(_react2.default.Component);

// ------------------------------------
// Constants
// ------------------------------------

HeaderWithVisibilityToggle.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
HeaderWithVisibilityToggle.defaultProps = {
  onByDefault: false
};
exports.default = HeaderWithVisibilityToggle;
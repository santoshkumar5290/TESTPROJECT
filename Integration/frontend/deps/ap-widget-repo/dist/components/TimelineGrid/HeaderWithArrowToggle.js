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

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _arrowDownward = require('material-ui/svg-icons/navigation/arrow-downward');

var _arrowDownward2 = _interopRequireDefault(_arrowDownward);

var _arrowUpward = require('material-ui/svg-icons/navigation/arrow-upward');

var _arrowUpward2 = _interopRequireDefault(_arrowUpward);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var style = {
  header: {
    display: 'flex',
    color: _colors.darkBlack
  }

  /**
   * A component to toggle the visibility icon.
   * @private
   */
};

// ------------------------------------
// Components
// ------------------------------------

var _ref = (0, _jsx3.default)(_arrowDownward2.default, {});

var _ref2 = (0, _jsx3.default)(_arrowUpward2.default, {});

var HeaderWithArrowToggle = function (_React$Component) {
  (0, _inherits3.default)(HeaderWithArrowToggle, _React$Component);

  function HeaderWithArrowToggle(props, context) {
    (0, _classCallCheck3.default)(this, HeaderWithArrowToggle);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HeaderWithArrowToggle.__proto__ || (0, _getPrototypeOf2.default)(HeaderWithArrowToggle)).call(this, props, context));

    _this.state = {
      on: _this.props.onByDefault
    };

    _this._toggle = _this._toggle.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(HeaderWithArrowToggle, [{
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


      return (0, _jsx3.default)('div', {
        style: style.header
      }, void 0, (0, _jsx3.default)(_IconButton2.default, {
        onClick: this._toggle
      }, void 0, this.props.onByDefault ? _ref : _ref2), (0, _jsx3.default)('span', {}, void 0, label));
    }
  }]);
  return HeaderWithArrowToggle;
}(_react2.default.Component);

HeaderWithArrowToggle.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
HeaderWithArrowToggle.defaultProps = {
  onByDefault: true
};
exports.default = HeaderWithArrowToggle;
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

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _Tooltip = require('material-ui/internal/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'

  /**
   * Componene to handle the tooltip functionality
   *
   * @private
   */
};

// ------------------------------------
// Components
// ------------------------------------

var CellWithTooltip = function (_React$Component) {
  (0, _inherits3.default)(CellWithTooltip, _React$Component);

  function CellWithTooltip(props, context) {
    (0, _classCallCheck3.default)(this, CellWithTooltip);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CellWithTooltip.__proto__ || (0, _getPrototypeOf2.default)(CellWithTooltip)).call(this, props, context));

    _this.state = {
      tooltipShown: false
    };

    _this.hideTooltip = _this.hideTooltip.bind(_this);
    _this.showTooltip = _this.showTooltip.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(CellWithTooltip, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: 'hideTooltip',
    value: function hideTooltip() {
      this.setState({
        tooltipShown: false
      });
    }
  }, {
    key: 'showTooltip',
    value: function showTooltip() {
      this.setState({
        tooltipShown: true
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          content = _props.content,
          tooltipContent = _props.tooltipContent;


      return (0, _jsx3.default)('div', {
        style: styles,
        onMouseLeave: this.hideTooltip,
        onMouseEnter: this.showTooltip
      }, void 0, content, this.state.tooltipShown && (0, _jsx3.default)(_Tooltip2.default, {
        label: tooltipContent || content,
        show: this.state.tooltipShown,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      }));
    }
  }]);
  return CellWithTooltip;
}(_react2.default.Component);

exports.default = CellWithTooltip;
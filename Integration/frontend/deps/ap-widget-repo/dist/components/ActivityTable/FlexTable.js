'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactVirtualized = require('react-virtualized');

var _HeaderWithVisibilityToggle = require('./HeaderWithVisibilityToggle');

var _HeaderWithVisibilityToggle2 = _interopRequireDefault(_HeaderWithVisibilityToggle);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Component that encapsulates the dynamic nature of the table body in Activity table. It uses the
 * open source react-virtualized component.
 *
 * @private
 */
var FlexTable = function (_React$Component) {
  (0, _inherits3.default)(FlexTable, _React$Component);

  function FlexTable(props, context) {
    (0, _classCallCheck3.default)(this, FlexTable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FlexTable.__proto__ || (0, _getPrototypeOf2.default)(FlexTable)).call(this, props, context));

    _this.state = {
      fullHostMessage: false
    };

    _this._rowColumnStyle = _this._rowColumnStyle.bind(_this);
    _this._toggleFullHostMessage = _this._toggleFullHostMessage.bind(_this);

    _this.labels = (0, _extends3.default)({}, _utils.labels);

    _this.labels[_utils.HOST_MESSAGE_KEY] = (0, _jsx3.default)(_HeaderWithVisibilityToggle2.default, {
      label: 'Host Message',
      onToggle: _this._toggleFullHostMessage
    });
    /* eslint-disable */
    // Need to improve override toString method
    _this.labels[_utils.HOST_MESSAGE_KEY].__proto__.toString = function () {
      return 'Host Message';
    };
    /* eslint-enable */
    return _this;
  }

  (0, _createClass3.default)(FlexTable, [{
    key: '_rowColumnStyle',
    value: function _rowColumnStyle(column) {
      var styles = this.props.styles;


      if (column === _utils.HOST_MESSAGE_KEY && this.state.fullHostMessage) {
        return styles.rowColumnWrapped;
      }

      if (column === _utils.PACKAGE_ID_KEY) {
        return styles.rowColumnPackageID;
      }

      return styles.rowColumn;
    }
  }, {
    key: '_toggleFullHostMessage',
    value: function _toggleFullHostMessage(onOrOff) {
      this.setState({
        fullHostMessage: onOrOff
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          rowGetter = _props.rowGetter,
          rowCount = _props.rowCount,
          columns = _props.columns,
          styles = _props.styles;


      return (0, _jsx3.default)(_reactVirtualized.AutoSizer, {}, void 0, function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        return (0, _jsx3.default)(_reactVirtualized.FlexTable, {
          rowWrapperStyle: styles.rowWrapper,
          rowStyle: styles.row,
          gridStyle: styles.grid,
          headerStyle: styles.header,
          headerHeight: 50,
          rowHeight: _this2.state.fullHostMessage ? styles.rowHeightFullHostMessage : styles.rowHeight,
          rowGetter: rowGetter,
          rowCount: rowCount,
          scrollToIndex: 0,
          height: height,
          width: width
        }, void 0, (0, _utils.renderTableColumns)(columns, _this2.labels, _utils.transformers, _this2._rowColumnStyle));
      });
    }
  }]);
  return FlexTable;
}(_react2.default.Component);

// ------------------------------------
// Helpers
// ------------------------------------

// ------------------------------------
// Components
// ------------------------------------

FlexTable.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = FlexTable;
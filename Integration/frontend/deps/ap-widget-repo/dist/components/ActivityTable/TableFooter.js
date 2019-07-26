'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableFooter = undefined;

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

var _SICKPlatform = require('../../SICKPlatform');

var _colors = require('material-ui/styles/colors');

var _Toolbar = require('material-ui/Toolbar');

var _SICKMuiTheme = require('../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

var _colorManipulator = require('material-ui/utils/colorManipulator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

function getStyles(props) {
  return {
    footerToolbar: {
      display: 'block',
      textAlign: 'right',
      height: 50,
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid ' + _colors.grey300,
      paddingRight: '10px',
      zIndex: 1
    },
    footerToolbarTitle: {
      fontSize: 12,
      color: (0, _colorManipulator.fade)(_SICKMuiTheme2.default.palette.textColor, 0.54)
    },
    footerToolbarGroup: {
      display: 'block',
      textAlign: 'right'
    }
  };
}

// ------------------------------------
// Helpers
// ------------------------------------

// ------------------------------------
// Components
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    conveyorBelt: state.conveyorBelt.get(ownProps.group)
  };
};

/**
 * Component encapsulating the Activity table footer.
 * @private
 */

var TableFooter = exports.TableFooter = function (_React$Component) {
  (0, _inherits3.default)(TableFooter, _React$Component);

  /** @ignore */
  function TableFooter(props, context) {
    (0, _classCallCheck3.default)(this, TableFooter);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (TableFooter.__proto__ || (0, _getPrototypeOf2.default)(TableFooter)).call(this, props, context));

    _this.channelSubscription = null;
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(TableFooter, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var conveyorBelt = this.props.conveyorBelt;

      var styles = getStyles(this.props);

      var isPaused = conveyorBelt && conveyorBelt.isPaused;
      var rowCount = 0;

      if (isPaused) {
        rowCount = conveyorBelt.frozenItems.size;
      } else if (conveyorBelt) {
        rowCount = conveyorBelt.items.size;
      }

      return (0, _jsx3.default)(_Toolbar.Toolbar, {
        style: styles.footerToolbar
      }, void 0, (0, _jsx3.default)(_Toolbar.ToolbarGroup, {
        style: styles.footerToolbarGroup
      }, void 0, (0, _jsx3.default)(_Toolbar.ToolbarTitle, {
        text: rowCount + ' Items',
        style: styles.footerToolbarTitle,
        name: 'sap-at-footer-count'
      })));
    }
  }]);
  return TableFooter;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps)(TableFooter);
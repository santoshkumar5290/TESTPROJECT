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

var _timelineData = require('../../ducks/timelineData');

var _Toolbar = require('material-ui/Toolbar');

var _DropDownMenu = require('material-ui/DropDownMenu');

var _DropDownMenu2 = _interopRequireDefault(_DropDownMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _keyboardArrowLeft = require('material-ui/svg-icons/hardware/keyboard-arrow-left');

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

var _keyboardArrowRight = require('material-ui/svg-icons/hardware/keyboard-arrow-right');

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

var _SICKMuiTheme = require('../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Helpers
// ------------------------------------

// ------------------------------------
// Action creators
// ------------------------------------

var textColor = _SICKMuiTheme2.default.palette.textColor;

// ------------------------------------
// Components
// ------------------------------------

// ------------------------------------
// Constants
// ------------------------------------

var itemPageSizes = [20, 50, 100];

var styles = {
  footerToolbar: {
    display: 'block',
    textAlign: 'right',
    backgroundColor: 'white',
    borderTop: '1px solid ' + _colors.grey300,
    paddingRight: '10px',
    zIndex: 1
  },
  footerToolbarGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  footerToolbarTitle: {
    fontSize: 13,
    color: textColor,
    flex: 'none',
    alignSelf: 'center'
  },
  footerDropMenu: {
    fontSize: 13,
    color: textColor,
    flex: 'none',
    alignSelf: 'auto'
  }
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    timelineData: state.timelineData.get(ownProps.group)
  };
};

/* eslint-enable */
/**
 * @private
 */

var TableFooter = exports.TableFooter = function (_React$Component) {
  (0, _inherits3.default)(TableFooter, _React$Component);

  /** @ignore */
  function TableFooter(props, context) {
    (0, _classCallCheck3.default)(this, TableFooter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TableFooter.__proto__ || (0, _getPrototypeOf2.default)(TableFooter)).call(this, props, context));

    _this._handleRowsPerPageChange = _this._handleRowsPerPageChange.bind(_this);
    _this._handlePrevClicked = _this._handlePrevClicked.bind(_this);
    _this._handleNextClicked = _this._handleNextClicked.bind(_this);

    _this.state = {
      counter: 0
    };
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(TableFooter, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_handleRowsPerPageChange',
    value: function _handleRowsPerPageChange(e, idx, val) {
      var _props = this.props,
          group = _props.group,
          requestPackage = _props.requestPackage;


      requestPackage(group, {
        limit: val,
        action: 'refresh'
      });
    }
  }, {
    key: '_handlePrevClicked',
    value: function _handlePrevClicked() {
      var _props2 = this.props,
          timelineData = _props2.timelineData,
          group = _props2.group,
          requestPackage = _props2.requestPackage;


      var counter = this.state.counter - 1;

      this.setState({ counter: counter });

      requestPackage(group, {
        action: 'prev',
        firstRowKey: timelineData.get('items').first().timestamp,
        lastRowKey: timelineData.get('items').last().timestamp
      });
    }
  }, {
    key: '_handleNextClicked',
    value: function _handleNextClicked() {
      var _props3 = this.props,
          timelineData = _props3.timelineData,
          group = _props3.group,
          requestPackage = _props3.requestPackage;


      var counter = this.state.counter + 1;

      this.setState({ counter: counter });

      requestPackage(group, {
        action: 'next',
        firstRowKey: timelineData.get('items').first().timestamp,
        lastRowKey: timelineData.get('items').last().timestamp
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var timelineData = nextProps.timelineData;


      if (timelineData && timelineData.params && timelineData.params.action === 'refresh') {
        this.setState({ counter: 0 });
      }
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var timelineData = this.props.timelineData;

      var iconColor = _SICKMuiTheme2.default.palette.iconColor;

      var rowCount = 0;
      var rowsPerPage = 0;
      var rowsTotal = 0;
      var rowsIndex = 0;
      var prevDisabled = false;
      var nextDisabled = false;
      var pageCounter = this.state.counter;

      if (timelineData) {
        var items = timelineData.items,
            params = timelineData.params,
            total = timelineData.total;


        rowsTotal = total;
        rowsPerPage = params.limit;

        if (items) {
          rowCount = pageCounter * rowsPerPage + items.size;
          rowsIndex = pageCounter * rowsPerPage + 1;
        }
        nextDisabled = rowsTotal - rowsIndex < rowsPerPage;
        prevDisabled = pageCounter <= 0;
      }

      var menuItems = [];
      for (var i = 0; i < itemPageSizes.length; i++) {
        menuItems.push((0, _jsx3.default)(_MenuItem2.default, {
          value: itemPageSizes[i],
          primaryText: '' + itemPageSizes[i]
        }, itemPageSizes[i]));
      }

      return rowsTotal > 0 && (0, _jsx3.default)(_Toolbar.Toolbar, {
        style: styles.footerToolbar
      }, void 0, (0, _jsx3.default)(_Toolbar.ToolbarGroup, {
        style: styles.footerToolbarGroup
      }, void 0, (0, _jsx3.default)(_Toolbar.ToolbarTitle, {
        text: 'Rows per page:',
        style: styles.footerToolbarTitle
      }), (0, _jsx3.default)(_DropDownMenu2.default, {
        value: rowsPerPage,
        onChange: this._handleRowsPerPageChange,
        style: styles.footerDropMenu
      }, void 0, menuItems), (0, _jsx3.default)(_Toolbar.ToolbarTitle, {
        text: rowsIndex + '-' + rowCount + ' of ' + rowsTotal,
        style: styles.footerToolbarTitle
      }), (0, _jsx3.default)(_IconButton2.default, {
        disabled: prevDisabled,
        onClick: this._handlePrevClicked,
        style: styles.footerToolbarTitle
      }, void 0, (0, _jsx3.default)(_keyboardArrowLeft2.default, {
        color: iconColor
      })), (0, _jsx3.default)(_IconButton2.default, {
        disabled: nextDisabled,
        onClick: this._handleNextClicked,
        style: styles.footerToolbarTitle
      }, void 0, (0, _jsx3.default)(_keyboardArrowRight2.default, {
        color: iconColor
      }))));
    }
  }]);
  return TableFooter;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps, _timelineData.actions)(TableFooter);
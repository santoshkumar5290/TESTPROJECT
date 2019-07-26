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

var _Tabs = require('material-ui/Tabs');

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _pauseCircleFilled = require('material-ui/svg-icons/av/pause-circle-filled');

var _pauseCircleFilled2 = _interopRequireDefault(_pauseCircleFilled);

var _playCircleFilled = require('material-ui/svg-icons/av/play-circle-filled');

var _playCircleFilled2 = _interopRequireDefault(_playCircleFilled);

var _viewColumn = require('material-ui/svg-icons/action/view-column');

var _viewColumn2 = _interopRequireDefault(_viewColumn);

var _colors = require('material-ui/styles/colors');

var _SICKMuiTheme = require('../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  paper: {
    height: 56,
    width: '100%',
    display: 'flex'
  },
  tabheader: {
    fontSize: 16,
    fontWeight: 800,
    color: _colors.lightBlack,
    minWidth: '140px'
  },
  tabs: {
    display: 'flex',
    height: '100%',
    width: '30%',
    minWidth: '270px',
    flexDirection: 'column'
  },
  tabContainer: {
    backgroundColor: _colors.grey300,
    height: 56,
    whiteSpace: 'normal',
    flexShrink: 0
  },
  tabTemplate: {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0'
  },
  contentContainer: {
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative'
  },
  toolbar: {
    height: 56,
    width: '70%',
    backgroundColor: _colors.grey300,
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  sortIcon: {
    height: 56
  },
  tabLabel: {
    width: '75%',
    display: 'inline-block'
  },
  tabIcon: {
    width: '20%',
    display: 'inline-block'
  }
};

var PackageListTableHeader = function (_React$Component) {
  (0, _inherits3.default)(PackageListTableHeader, _React$Component);

  function PackageListTableHeader(props, context) {
    (0, _classCallCheck3.default)(this, PackageListTableHeader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PackageListTableHeader.__proto__ || (0, _getPrototypeOf2.default)(PackageListTableHeader)).call(this, props, context));

    _this.handleTabChange = function (value) {
      _this.setState({
        selectedTab: value
      });
    };

    _this.togglePlay = function () {
      _this.state.isPaused ? _this.props.play() : _this.props.pause();
      _this.setState({
        isPaused: !_this.state.isPaused
      });
    };

    _this.state = {
      selectedTab: 'at-packagelist-tab',
      isPaused: props.isPaused
    };
    return _this;
  }

  (0, _createClass3.default)(PackageListTableHeader, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          toggleColumnEditorModal = _props.toggleColumnEditorModal,
          localization = _props.localization,
          localizationSet = _props.localizationSet;
      var _state = this.state,
          isPaused = _state.isPaused,
          selectedTab = _state.selectedTab;

      var actionIconColor = _SICKMuiTheme2.default.palette.iconColor;

      return (0, _jsx3.default)(_Paper2.default, {
        zDepth: 1,
        style: styles.paper
      }, void 0, (0, _jsx3.default)(_Tabs.Tabs, {
        style: styles.tabs,
        contentContainerStyle: styles.contentContainer,
        tabItemContainerStyle: styles.tabContainer,
        tabTemplateStyle: styles.tabTemplate,
        inkBarStyle: { backgroundColor: _colors.lightBlue700 },
        value: selectedTab,
        onChange: this.handleTabChange
      }, void 0, (0, _jsx3.default)(_Tabs.Tab, {
        style: styles.tabheader,
        label: (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('div', {
          style: styles.tabLabel
        }, void 0, localization.formatMessage(localizationSet + ':activityTable')), (0, _jsx3.default)('div', {
          style: styles.tabIcon
        }, void 0, (0, _jsx3.default)(_FlatButton2.default, {
          icon: isPaused ? (0, _jsx3.default)(_playCircleFilled2.default, {
            color: actionIconColor
          }) : (0, _jsx3.default)(_pauseCircleFilled2.default, {
            color: actionIconColor
          }),
          onClick: this.togglePlay,
          name: 'sap-at-toolbar-play-button'
        }))),
        value: 'at-packagelist-tab'
      })), (0, _jsx3.default)('div', {
        style: styles.toolbar
      }, void 0, (0, _jsx3.default)(_IconButton2.default, {
        tooltip: localization.formatMessage(localizationSet + ':tableDisplaySettings'),
        tooltipPosition: 'bottom-left',
        onTouchTap: toggleColumnEditorModal,
        style: styles.sortIcon
      }, void 0, (0, _jsx3.default)(_viewColumn2.default, {
        color: actionIconColor
      }))));
    }
  }]);
  return PackageListTableHeader;
}(_react2.default.Component);

exports.default = PackageListTableHeader;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SystemConfiguration = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _viewList = require('material-ui/svg-icons/action/view-list');

var _viewList2 = _interopRequireDefault(_viewList);

var _viewModule = require('material-ui/svg-icons/action/view-module');

var _viewModule2 = _interopRequireDefault(_viewModule);

var _Devices = require('./Devices');

var _Devices2 = _interopRequireDefault(_Devices);

var _DeviceConfigurator = require('./DeviceConfigurator');

var _DeviceConfigurator2 = _interopRequireDefault(_DeviceConfigurator);

var _InformationDialog = require('./Dialogs/InformationDialog');

var _InformationDialog2 = _interopRequireDefault(_InformationDialog);

var _A = require('../Global/A');

var _A2 = _interopRequireDefault(_A);

var _GridList = require('material-ui/GridList');

var _colorManipulator = require('material-ui/utils/colorManipulator');

var _systemConfig = require('../../ducks/systemConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, muiTheme) {
  return {
    title: {
      fontSize: 24,
      margin: 0,
      marginLeft: 15
    },
    viewTypeActions: {
      textAlign: 'right'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    configurator: {
      optional: {
        display: 'block',
        position: 'absolute',
        left: 46,
        bottom: 8,
        fontSize: 11,
        color: (0, _colorManipulator.fade)(muiTheme.palette.textColor, 0.54)
      }
    },
    informationDialog: {
      container: {
        maxWidth: 400
      }
    },
    iconColor: muiTheme.palette.iconColor,
    iconActiveColor: muiTheme.palette.primary1Color
  };
}

// ------------------------------------
// Helpers
// ------------------------------------


// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Components
// ------------------------------------


var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    config: state.config
  };
};

/* eslint-disable */
/**
 * SystemConfiguration widget
 * 
 * @private
 * 
 * **Available properties:**
 *
 * | Property               | Type     | Description                                                             | Allowed values   | Default Value                           | Required |
 * |------------------------|----------|-------------------------------------------------------------------------|------------------|-----------------------------------------|----------|
 * | `style`                | `Object` | Custom style for the widget                                             | object           |                                         | NO       |
 *
 * @example
 * const systemConfig = SICKPlatform.SystemConfiguration.init(document.createElement('div'), {
 * })
 * systemConfig.destroy()
 *
 * @example
 * render() {
 *   return (
 *     <div>
 *       <SystemConfiguration
 *       />
 *     </div>
 *   )
 * }
 */
/* eslint-enable */

var SystemConfiguration = exports.SystemConfiguration = function (_SICKComponent) {
  (0, _inherits3.default)(SystemConfiguration, _SICKComponent);

  /** @ignore */
  function SystemConfiguration(props, context) {
    (0, _classCallCheck3.default)(this, SystemConfiguration);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SystemConfiguration.__proto__ || (0, _getPrototypeOf2.default)(SystemConfiguration)).call(this, props, context));

    _this._getDevices = function () {
      var config = _this.props.config;

      var url = config && config.systemConfiguration && config.systemConfiguration.url;

      _this.props.reloadDevices(url);
    };

    _this.state = {
      infoTitle: '',
      infoMessage: '',
      showInfoDialog: false,
      viewMode: 'grid'
    };

    _this._handleShowInformation = _this._handleShowInformation.bind(_this);
    _this._handleInformationDialogDismiss = _this._handleInformationDialogDismiss.bind(_this);
    _this._handleViewGrid = _this._handleViewGrid.bind(_this);
    _this._handleViewTable = _this._handleViewTable.bind(_this);
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(SystemConfiguration, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /** @ignore */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._getDevices();
    }
  }, {
    key: '_handleShowInformation',
    value: function _handleShowInformation(title, message) {
      this.setState({
        showInfoDialog: true,
        infoTitle: title,
        infoMessage: message
      });
    }
  }, {
    key: '_handleInformationDialogDismiss',
    value: function _handleInformationDialogDismiss() {
      this.setState({ showInfoDialog: false });
    }
  }, {
    key: '_handleViewGrid',
    value: function _handleViewGrid() {
      this.setState({ viewMode: 'grid' });
    }
  }, {
    key: '_handleViewTable',
    value: function _handleViewTable() {
      this.setState({ viewMode: 'table' });
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var styles = getStyles(this.props, this.muiTheme);
      var _props = this.props,
          title = _props.title,
          config = _props.config;
      var _state = this.state,
          showInfoDialog = _state.showInfoDialog,
          infoTitle = _state.infoTitle,
          infoMessage = _state.infoMessage,
          viewMode = _state.viewMode;


      var subProps = {
        url: config.systemConfiguration.url,
        onInfoOpen: this._handleShowInformation
      };

      return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)(_GridList.GridList, {
        cols: 4,
        rows: 10,
        padding: 15
      }, void 0, (0, _jsx3.default)(_GridList.GridTile, {
        cols: 1,
        rows: 0.2,
        style: styles.leftContainer
      }, void 0, (0, _jsx3.default)('h2', {
        style: styles.title
      }, void 0, title)), (0, _jsx3.default)(_GridList.GridTile, {
        cols: 3,
        rows: 0.2,
        style: styles.viewTypeActions
      }, void 0, (0, _jsx3.default)(_A2.default, {
        href: '#',
        onTouchTap: this._handleViewGrid
      }, void 0, (0, _jsx3.default)(_viewModule2.default, {
        style: styles.viewIcon,
        color: viewMode === 'grid' ? styles.iconActiveColor : styles.iconColor
      })), (0, _jsx3.default)(_A2.default, {
        href: '#',
        onTouchTap: this._handleViewTable
      }, void 0, (0, _jsx3.default)(_viewList2.default, {
        style: styles.viewIcon,
        color: viewMode === 'table' ? styles.iconActiveColor : styles.iconColor
      }))), (0, _jsx3.default)(_GridList.GridTile, {
        cols: 1,
        rows: 5,
        style: styles.leftContainer
      }, void 0, _react2.default.createElement(_DeviceConfigurator2.default, (0, _extends3.default)({}, subProps, { style: styles.configurator }))), (0, _jsx3.default)(_GridList.GridTile, {
        cols: 3,
        rows: 10,
        style: styles.rightContainer
      }, void 0, _react2.default.createElement(_Devices2.default, (0, _extends3.default)({}, subProps, { viewMode: viewMode })))), showInfoDialog && (0, _jsx3.default)(_InformationDialog2.default, {
        open: true,
        title: infoTitle,
        message: infoMessage,
        onClose: this._handleInformationDialogDismiss,
        style: styles.informationDialog
      }));
    }
  }]);
  return SystemConfiguration;
}(_SICKComponent3.default);

SystemConfiguration.propTypes = {
  title: _propTypes2.default.string,
  reloadDevices: _propTypes2.default.func };
SystemConfiguration.defaultProps = {
  title: 'System Configuration'
};
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, (0, _extends3.default)({}, _systemConfig.actions))(SystemConfiguration);
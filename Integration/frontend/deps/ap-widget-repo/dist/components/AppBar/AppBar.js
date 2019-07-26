'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppBar = undefined;

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

var _Toolbar = require('material-ui/Toolbar');

var _DropDownMenu = require('material-ui/DropDownMenu');

var _DropDownMenu2 = _interopRequireDefault(_DropDownMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _colors = require('material-ui/styles/colors');

var _SICKPlatform = require('../../SICKPlatform');

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _appbar = require('../../ducks/appbar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    appbar: state.appbar
  };
};

var styles = {
  appbar: {
    backgroundColor: _colors.white,
    height: 45,
    fontSize: 12,
    color: _colors.lightBlack
  },
  dropdown: {
    fontSize: 16,
    fontWeight: 600,
    marginLeft: 180,
    color: _colors.darkBlack
  },
  systemLabel: {
    marginLeft: -20,
    marginTop: 5
  },
  shiftLabel: {
    marginLeft: 30,
    marginTop: 5
  },
  button: {
    height: 32
  }

  /**
   * Component for rendering secondary header in the template
   */
};
var AppBar = exports.AppBar = function (_SICKComponent) {
  (0, _inherits3.default)(AppBar, _SICKComponent);

  /** @ignore */


  /** @ignore */
  function AppBar(props, context) {
    (0, _classCallCheck3.default)(this, AppBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AppBar.__proto__ || (0, _getPrototypeOf2.default)(AppBar)).call(this, props, context));

    _this.handleChange = function (event, index, value) {
      return _this.props.switchSystem(value);
    };

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  /** @ignore */


  (0, _createClass3.default)(AppBar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.url && this.props.getSystems(this.props.url);
    }
  }, {
    key: 'render',
    value: function render() {
      var appbar = this.props.appbar;

      var systems = appbar.get('systems') ? appbar.get('systems').keySeq().toArray().sort() : [];
      var fullSystemDetails = appbar.get('systems');

      var selSystemName = '';
      var selSystemLabel = 'Default System';

      if (appbar.get('selectedSystem')) {
        selSystemName = appbar.get('selectedSystem').get('systemName');
        selSystemLabel = appbar.get('selectedSystem').get('systemLabel');
      } else if (systems.length > 0) {
        selSystemName = systems[0];
        selSystemLabel = fullSystemDetails.get(selSystemName);
      }
      return (0, _jsx3.default)(_Toolbar.Toolbar, {
        style: styles.appbar
      }, void 0, (0, _jsx3.default)(_Toolbar.ToolbarGroup, {}, void 0, (0, _jsx3.default)(_DropDownMenu2.default, {
        id: 'il-appbar-system-selection',
        value: selSystemName,
        maxHeight: 2500,
        onChange: this.handleChange,
        style: styles.dropdown
      }, void 0, systems.map(function (name) {
        return (0, _jsx3.default)(_MenuItem2.default, {
          value: name,
          primaryText: name,
          disabled: fullSystemDetails.get(name).disabled
        }, name);
      })), (0, _jsx3.default)('span', {
        id: 'il-appbar-system-label',
        style: styles.systemLabel
      }, void 0, selSystemLabel || selSystemName), this.props.sortLabel && (0, _jsx3.default)('span', {
        id: 'il-appbar-sort-label',
        style: styles.shiftLabel
      }, void 0, this.props.sortLabel)), (0, _jsx3.default)(_Toolbar.ToolbarGroup, {
        lastChild: true
      }, void 0, this.props.infoMessage && (0, _jsx3.default)('div', {
        style: this.props.infoMessageStyle
      }, void 0, ' ', this.props.infoMessage, ' '), this.props.resetAction && (0, _jsx3.default)(_RaisedButton2.default, {
        id: 'il-appbar-reset-button',
        label: 'Reset',
        primary: true,
        buttonStyle: styles.button,
        onClick: this.props.resetAction
      })));
    }
  }]);
  return AppBar;
}(_SICKComponent3.default);

AppBar.propTypes = {
  appbar: _propTypes2.default.object.isRequired,
  resetAction: _propTypes2.default.func,
  url: _propTypes2.default.string,
  sortLabel: _propTypes2.default.string,
  infoMessage: _propTypes2.default.string,
  infoMessageStyle: _propTypes2.default.object };
AppBar.defaultProps = {
  appbar: {} };
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, { getSystems: _appbar.getSystems, switchSystem: _appbar.switchSystem })(AppBar);
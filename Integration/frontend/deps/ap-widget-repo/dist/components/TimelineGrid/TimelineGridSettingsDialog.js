'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineGridSettingsDialog = undefined;

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

var _SICKPlatform = require('../../SICKPlatform');

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _deepmerge = require('../../utils/deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _defaults = require('../../utils/defaults');

var _utils = require('./utils');

var _userSettings = require('../../ducks/userSettings');

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var style = {
  container: {
    width: '475px'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    margin: '24px 0',
    justifyContent: 'space-between'
  },
  menu: {
    width: '175px'
  }

  // ------------------------------------
  // Action creators
  // ------------------------------------

};

// ------------------------------------
// Components
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    userSettings: state.userSettings[ownProps.group] || _defaults.DEFAULT_EMPTY_OBJECT
  };
};

/**
 * Component for configuring Timeline Grid display.
 *
 * This component manages the state of a `settings` object. This object is eventually saved as the userSettings state.
 * The following properties are currently availble on `settings`:
 *
 * `measurementSystem` -- Whether to display measurements in metric or imperial system.
 *
 * @private
 * @extends {SICKComponent}
 */

var _ref = (0, _jsx3.default)('div', {}, void 0, 'Configure how this widget appears.');

var _ref2 = (0, _jsx3.default)('span', {}, void 0, 'Distance Units');

var _ref3 = (0, _jsx3.default)(_MenuItem2.default, {
  value: _utils.METRIC,
  primaryText: 'Metric'
});

var _ref4 = (0, _jsx3.default)(_MenuItem2.default, {
  value: _utils.IMPERIAL,
  primaryText: 'Imperial'
});

var TimelineGridSettingsDialog = exports.TimelineGridSettingsDialog = function (_SICKComponent) {
  (0, _inherits3.default)(TimelineGridSettingsDialog, _SICKComponent);

  /** @ignore */


  /** @ignore */
  function TimelineGridSettingsDialog(props, context) {
    (0, _classCallCheck3.default)(this, TimelineGridSettingsDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TimelineGridSettingsDialog.__proto__ || (0, _getPrototypeOf2.default)(TimelineGridSettingsDialog)).call(this, props, context));

    _this.state = {
      settings: (0, _deepmerge2.default)({
        measurementSystem: props.measurementSystem
      }, props.userSettings)
    };

    _this._onSave = _this._onSave.bind(_this);
    _this._handleMeasurementSystemChange = _this._handleMeasurementSystemChange.bind(_this);
    return _this;
  }

  /** @private */


  /** @ignore */


  (0, _createClass3.default)(TimelineGridSettingsDialog, [{
    key: '_onSave',
    value: function _onSave() {
      this.props.updateUserSettings(this.props.group, this.state.settings);
      this.props.onRequestClose();
    }

    /** @private */

  }, {
    key: '_handleMeasurementSystemChange',
    value: function _handleMeasurementSystemChange(event, index, value) {
      var settings = (0, _extends3.default)({}, this.state.settings, {
        measurementSystem: value
      });

      this.setState({ settings: settings });
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var settings = this.state.settings;


      var actions = [(0, _jsx3.default)(_FlatButton2.default, {
        primary: true,
        label: 'Cancel',
        onTouchTap: this.props.onRequestClose
      }), (0, _jsx3.default)(_FlatButton2.default, {
        primary: true,
        label: 'Save',
        onTouchTap: this._onSave
      })];
      return _react2.default.createElement(
        _Dialog2.default,
        (0, _extends3.default)({}, this.props, {
          title: 'Widget Settings',
          actions: actions,
          modal: true,
          contentStyle: style.container }),
        _ref,
        (0, _jsx3.default)('div', {
          style: style.row
        }, void 0, _ref2, (0, _jsx3.default)(_SelectField2.default, {
          onChange: this._handleMeasurementSystemChange,
          value: settings.measurementSystem,
          style: style.menu
        }, void 0, _ref3, _ref4))
      );
    }
  }]);
  return TimelineGridSettingsDialog;
}(_SICKComponent3.default);

TimelineGridSettingsDialog.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  group: _propTypes2.default.string.isRequired,
  userSettings: _propTypes2.default.object.isRequired,
  updateUserSettings: _propTypes2.default.func.isRequired,
  onRequestClose: _propTypes2.default.func });
TimelineGridSettingsDialog.defaultProps = (0, _extends3.default)({}, _SICKComponent3.default.defaultProps, {
  onRequestClose: function onRequestClose() {} });
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, { updateUserSettings: _userSettings.updateUserSettings })(TimelineGridSettingsDialog);
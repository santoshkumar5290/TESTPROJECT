'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConveyorBeltSettings = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _Item = require('./Item');

var _userSettings = require('../../ducks/userSettings');

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _RadioButton = require('material-ui/RadioButton');

var _DropDownMenu = require('material-ui/DropDownMenu');

var _DropDownMenu2 = _interopRequireDefault(_DropDownMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Subheader = require('material-ui/Subheader');

var _Subheader2 = _interopRequireDefault(_Subheader);

var _Tabs = require('material-ui/Tabs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Action creators
// ------------------------------------

// ------------------------------------
// Constants
// ------------------------------------

function getStyles(props, context) {
  var toolbar = context.muiTheme.toolbar;


  return {
    condition: {
      base: {
        display: 'flex',
        flexDirection: 'row'
      },
      swatch: {
        height: 44,
        width: 44,
        borderRadius: 22,
        margin: 16
      },
      dropDown: {
        marginTop: 10
      },
      labelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        minWidth: 100
      },
      underlineStyle: {
        borderWidth: '2px',
        borderColor: '#999999'
      }
    },
    title: {
      backgroundColor: toolbar.backgroundColor,
      fontSize: toolbar.titleFontSize,
      padding: 8
    },
    body: {
      padding: 0
    },
    radioButton: {
      marginBottom: 16
    },
    tabContent: {
      padding: 24
    },
    tabItemContainer: {
      backgroundColor: toolbar.backgroundColor
    },
    tab: {
      color: toolbar.color
    }
  };
}

// ------------------------------------
// Components
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    userSettings: state.userSettings[ownProps.group] || _defaults.DEFAULT_EMPTY_OBJECT
  };
};

/**
 * Component for the conveyor belt settings modal.
 *
 * This component manages the state of a `settings` object. This object is eventually saved as the userSettings state.
 * The following properties are currently availble on `settings`:
 *
 * `conditionDefinitions` -- The user's custom preferences for the definitions of conditios.
 * `direction` -- Which way the belt should move in the "forward" direction.
 * `view` -- Which perspective of the belt to show. Currently supported is a side view and a "bird's eye view."
 *
 * @private
 * @extends {SICKComponent}
 *
 * @example
 * TODO
 *
 */

var _ref = (0, _jsx3.default)(_MenuItem2.default, {
  value: 'None',
  primaryText: 'None'
});

var _ref2 = (0, _jsx3.default)(_Subheader2.default, {}, void 0, 'Time frame');

var _ref3 = (0, _jsx3.default)(_Subheader2.default, {}, void 0, 'View Mode');

var _ref4 = (0, _jsx3.default)(_Subheader2.default, {}, void 0, 'Belt direction');

var _ref5 = (0, _jsx3.default)(_Subheader2.default, {}, void 0, 'Select a condition for each color');

var ConveyorBeltSettings = exports.ConveyorBeltSettings = function (_SICKComponent) {
  (0, _inherits3.default)(ConveyorBeltSettings, _SICKComponent);

  function ConveyorBeltSettings(props, context) {
    (0, _classCallCheck3.default)(this, ConveyorBeltSettings);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConveyorBeltSettings.__proto__ || (0, _getPrototypeOf2.default)(ConveyorBeltSettings)).call(this, props, context));

    _this.state = {
      settings: (0, _deepmerge2.default)({
        conditionDefinitions: props.conditionDefinitions,
        direction: props.direction,
        view: props.view
      }, props.userSettings)
    };

    _this._onColorConditionChange = _this._onColorConditionChange.bind(_this);
    _this._onDirectionChange = _this._onDirectionChange.bind(_this);
    _this._onTimeframeChange = _this._onTimeframeChange.bind(_this);
    _this._onSave = _this._onSave.bind(_this);
    _this._onViewChange = _this._onViewChange.bind(_this);
    _this._renderConditionField = _this._renderConditionField.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ConveyorBeltSettings, [{
    key: '_onColorConditionChange',
    value: function _onColorConditionChange(key, e, idx, value) {
      this.setState({
        settings: (0, _deepmerge2.default)(this.state.settings, {
          conditionDefinitions: {
            colors: (0, _defineProperty3.default)({}, key, {
              condition: value
            })
          }
        })
      });
    }
  }, {
    key: '_onDirectionChange',
    value: function _onDirectionChange(e, value) {
      this.setState({
        settings: (0, _deepmerge2.default)(this.state.settings, {
          direction: value
        })
      });
    }
  }, {
    key: '_onTimeframeChange',
    value: function _onTimeframeChange(e, value) {
      this.setState({
        settings: (0, _deepmerge2.default)(this.state.settings, {
          timeframe: value === 'auto' ? null : value
        })
      });
    }
  }, {
    key: '_onSave',
    value: function _onSave() {
      this.props.updateUserSettings(this.props.group, this.state.settings);
      this.props.onSettingsToggle();
    }
  }, {
    key: '_onViewChange',
    value: function _onViewChange(e, value) {
      this.setState({
        settings: (0, _deepmerge2.default)(this.state.settings, {
          view: value
        })
      });
    }
  }, {
    key: '_getColorConditionMenuItems',
    value: function _getColorConditionMenuItems(currConditions, conditions) {
      var menuItems = [];
      (0, _keys2.default)(conditions).forEach(function (key) {
        if (currConditions.indexOf(key) === -1) {
          menuItems.push((0, _jsx3.default)(_MenuItem2.default, {
            value: key,
            primaryText: conditions[key].label
          }));
        }
      });
      return menuItems;
    }
  }, {
    key: '_getCurrentColorConditions',
    value: function _getCurrentColorConditions(color, colors) {
      var currConditions = [];
      (0, _keys2.default)(colors).forEach(function (key) {
        if (key !== color) {
          currConditions.push(colors[key].condition);
        }
      });
      return currConditions;
    }
  }, {
    key: '_renderConditionField',
    value: function _renderConditionField(key) {
      var styles = getStyles(this.props, this.context);
      var settings = this.state.settings;


      var colors = settings.conditionDefinitions.colors;
      var colorCondition = colors[key].condition;
      var conditions = settings.conditionDefinitions.conditions;
      var onColorConditionChange = this._onColorConditionChange.bind(this, key);
      var currConditions = this._getCurrentColorConditions(key, colors);
      var menuItems = this._getColorConditionMenuItems(currConditions, conditions);

      return (0, _jsx3.default)('div', {
        style: styles.condition.base
      }, key, (0, _jsx3.default)('div', {
        style: (0, _extends3.default)({}, styles.condition.swatch, { backgroundColor: key })
      }), (0, _jsx3.default)(_DropDownMenu2.default, {
        style: styles.condition.dropDown,
        underlineStyle: styles.condition.underlineStyle,
        labelStyle: styles.condition.labelStyle,
        maxHeight: 300,
        autoWidth: false,
        value: colorCondition,
        onChange: onColorConditionChange
      }, void 0, _ref, menuItems));
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = getStyles(this.props, this.context);
      var timeframes = this.props.timeframes;
      var settings = this.state.settings;

      var actions = [(0, _jsx3.default)(_FlatButton2.default, {
        primary: true,
        label: 'Cancel',
        onTouchTap: this.props.onSettingsToggle
      }), (0, _jsx3.default)(_FlatButton2.default, {
        primary: true,
        label: 'Save',
        onTouchTap: this._onSave
      })];

      return _react2.default.createElement(
        _Dialog2.default,
        (0, _extends3.default)({}, this.props, {
          title: 'Conveyor Belt Settings',
          titleStyle: styles.title,
          bodyStyle: styles.body,
          actions: actions,
          modal: true }),
        (0, _jsx3.default)(_Tabs.Tabs, {
          contentContainerStyle: styles.tabContent,
          tabItemContainerStyle: styles.tabItemContainer
        }, void 0, (0, _jsx3.default)(_Tabs.Tab, {
          label: 'Metrics',
          style: styles.tab
        }, void 0, _ref2, (0, _jsx3.default)(_RadioButton.RadioButtonGroup, {
          name: 'timeframe',
          defaultSelected: this.state.settings.timeframe || 'auto',
          onChange: this._onTimeframeChange
        }, void 0, (0, _jsx3.default)(_RadioButton.RadioButton, {
          value: 'auto',
          label: 'Auto',
          style: styles.radioButton
        }), timeframes.map(function (t) {
          return (0, _jsx3.default)(_RadioButton.RadioButton, {
            value: t.toString(),
            label: t + ' seconds',
            style: styles.radioButton
          });
        }))), (0, _jsx3.default)(_Tabs.Tab, {
          label: 'Perspective',
          style: styles.tab
        }, void 0, _ref3, (0, _jsx3.default)(_RadioButton.RadioButtonGroup, {
          name: 'view',
          defaultSelected: this.state.settings.view,
          onChange: this._onViewChange
        }, void 0, (0, _jsx3.default)(_RadioButton.RadioButton, {
          value: _Item.TOP_VIEW,
          label: 'Bird\'s Eye View',
          style: styles.radioButton
        }), (0, _jsx3.default)(_RadioButton.RadioButton, {
          value: _Item.SIDE_VIEW,
          label: 'Side view',
          style: styles.radioButton
        })), _ref4, (0, _jsx3.default)(_RadioButton.RadioButtonGroup, {
          name: 'direction',
          defaultSelected: this.state.settings.direction,
          onChange: this._onDirectionChange
        }, void 0, (0, _jsx3.default)(_RadioButton.RadioButton, {
          value: _Item.LEFT_TO_RIGHT,
          label: 'Left to Right',
          style: styles.radioButton
        }), (0, _jsx3.default)(_RadioButton.RadioButton, {
          value: _Item.RIGHT_TO_LEFT,
          label: 'Right to Left',
          style: styles.radioButton
        }))), (0, _jsx3.default)(_Tabs.Tab, {
          label: 'Colour Coding',
          style: styles.tab
        }, void 0, _ref5, (0, _keys2.default)(settings.conditionDefinitions.colors).map(this._renderConditionField)))
      );
    }
  }]);
  return ConveyorBeltSettings;
}(_SICKComponent3.default);

ConveyorBeltSettings.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  group: _propTypes2.default.string.isRequired,
  userSettings: _propTypes2.default.object.isRequired,
  updateUserSettings: _propTypes2.default.func.isRequired,
  onSettingsToggle: _propTypes2.default.func,
  conditionDefinitions: _propTypes2.default.object.isRequired,
  direction: _propTypes2.default.oneOf([_Item.LEFT_TO_RIGHT, _Item.RIGHT_TO_LEFT]),
  view: _propTypes2.default.oneOf([_Item.TOP_VIEW, _Item.SIDE_VIEW]),
  open: _propTypes2.default.bool
});
ConveyorBeltSettings.defaultProps = (0, _extends3.default)({}, _SICKComponent3.default.defaultProps, {
  timeframes: [3, 5, 10, 20],
  onSettingsToggle: function onSettingsToggle() {}
});
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, { updateUserSettings: _userSettings.updateUserSettings })(ConveyorBeltSettings);
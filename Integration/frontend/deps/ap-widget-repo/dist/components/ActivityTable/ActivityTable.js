'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTable = undefined;

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

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _SICKPlatform = require('../../SICKPlatform');

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _defaults = require('../../utils/defaults');

var _conveyorBelt = require('../../ducks/conveyorBelt');

var _ActivityTableColumnSettings = require('./ActivityTableColumnSettings');

var _ActivityTableColumnSettings2 = _interopRequireDefault(_ActivityTableColumnSettings);

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableBody = require('./TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Action creators
// ------------------------------------

function getStyles(props, muiTheme) {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  };
}

// ------------------------------------
// Helpers
// ------------------------------------

// ------------------------------------
// Components
// ------------------------------------

// ------------------------------------
// Constants
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    config: state.config,
    userSettings: state.userSettings[ownProps.group] || _defaults.DEFAULT_EMPTY_OBJECT,
    appbar: state.appbar
  };
};

/* eslint-disable */
/**
 * Activity table can be used to visualize a dynamic table in which rows get updated in real time.
 * 
 * This widget connects to back-end using a websocket and adds new rows to the top of the widget whenever a message is received on websocket channel.
 * 
 * It has features to filter rows by matching condition column, hide/show columns and re-arrange the column order.  
 *
 * **Available properties:**
 *
 * | Property               | Type     | Description                                                                                                | Allowed values                          | Default Value   | Required |
 * |------------------------|----------|------------------------------------------------------------------------------------------------------------|-----------------------------------------|-----------------|----------|
 * | `title`                | `String` | The widget title.                                                                                          | *                                       | 'Activity Table'| NO       |
 * | `channel`              | `String` | The WebSocket channel to connect to using the Conveyor Belt protocol.                                      | *                                       |                 | YES      |
 * | `group`                | `String` | Components are grouped using a group ID. Components with matching group IDs share state and user settings. | *                                       |                 | YES      |
 * |                        |          | Make sure that the group ID is unique per widget type.                                                     |                                         |                 |          |
 * |                        |          | E.g. ActivityTable and ConveyorBelt must have different group IDs                                          |                                         |                 |          |
 * | `style`                | `Object` | Custom style for the widget                                                                                | *                                       |                 | NO       |
 *
 * @example
 * const table = SICKPlatform.ActivityTable.init(document.createElement('div'), {
 *   title: 'Activity Table',
 *   group: 'example',
 *   channel: 'your_channel_id'
 * })
 * table.update({ title: 'Updated Title' })
 * table.destroy()
 *
 * @example
 * render() {
 *   return (
 *     <div>
 *       <ActivityTable
 *         title='Activity Table'
 *         group='example'
 *         channel='your_channel_id'
 *       />
 *     </div>
 *   )
 * }
 */
/* eslint-enable */

var ActivityTable = exports.ActivityTable = function (_SICKComponent) {
  (0, _inherits3.default)(ActivityTable, _SICKComponent);

  /** @ignore */


  /** @ignore */
  function ActivityTable(props, context) {
    (0, _classCallCheck3.default)(this, ActivityTable);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (ActivityTable.__proto__ || (0, _getPrototypeOf2.default)(ActivityTable)).call(this, props, context));

    _this.state = {
      editColumnsDialogOpen: false,
      settingsDialogOpen: false

      /** @private */
    };_this.channelSubscription = null;

    _this._toggleColumnEditorDialog = _this._toggleColumnEditorDialog.bind(_this);
    return _this;
  }

  /** @ignore */


  (0, _createClass3.default)(ActivityTable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var system = this.props.appbar.get('selectedSystem') && this.props.appbar.get('selectedSystem').get('systemName');
      if (system) {
        var subscription = this.props.subscribe(system + this.props.channel, this.props.group);
        this.channelSubscription = subscription.id;
      }
    }

    /** @ignore */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.channelSubscription && this.props.unsubscribe(this.channelSubscription);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var appbar = this.props.appbar;

      var currentSystem = appbar.get('selectedSystem') && appbar.get('selectedSystem').get('systemName');

      var nextSystem = nextProps.appbar.get('selectedSystem') && nextProps.appbar.get('selectedSystem').get('systemName');

      var currentShift = this.props.currentShift && this.props.currentShift.startTime && this.props.currentShift.startTime.date;
      var nextShift = nextProps.currentShift && nextProps.currentShift.startTime && nextProps.currentShift.startTime.date;

      if (currentSystem !== nextSystem) {
        if (this.channelSubscription) {
          this.props.refresh(this.props.group);
          this.props.unsubscribe(this.channelSubscription);
        }
        var subscription = this.props.subscribe(nextSystem + this.props.channel, this.props.group);
        this.channelSubscription = subscription.id;
      } else if (currentShift && currentShift < nextShift) {
        // there has been a shift change, reset the activity table
        this.props.shiftChange(this.props.group);
      }
    }

    /** @ignore */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_toggleColumnEditorDialog',
    value: function _toggleColumnEditorDialog(e, ref) {
      this.setState({
        editColumnsDialogOpen: !this.state.editColumnsDialogOpen
      });
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          group = _props.group,
          userSettings = _props.userSettings,
          style = _props.style,
          title = _props.title,
          conditionDefinitions = _props.conditionDefinitions;

      var styles = getStyles(this.props, this.muiTheme);

      var containerStyle = (0, _extends3.default)({}, styles.container, style);

      var columns = userSettings && userSettings.columns || _utils.columns;

      return (0, _jsx3.default)(_Paper2.default, {
        style: containerStyle
      }, void 0, (0, _jsx3.default)(_TableHeader2.default, {
        title: title,
        group: group,
        onColumnSettings: this._toggleColumnEditorDialog,
        conditionDefinitions: conditionDefinitions
      }), (0, _jsx3.default)(_TableBody2.default, {
        columns: columns,
        group: group
      }), this.state.editColumnsDialogOpen && (0, _jsx3.default)(_ActivityTableColumnSettings2.default, {
        open: true,
        group: group,
        columns: columns,
        onRequestClose: this._toggleColumnEditorDialog
      }));
    }
  }]);
  return ActivityTable;
}(_SICKComponent3.default);

ActivityTable.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  title: _propTypes2.default.string,
  channel: _propTypes2.default.string.isRequired,
  conditionDefinitions: _propTypes2.default.object,
  conveyorBelt: _propTypes2.default.object,
  appbar: _propTypes2.default.object,
  subscribe: _propTypes2.default.func.isRequired,
  unsubscribe: _propTypes2.default.func.isRequired,
  style: _propTypes2.default.object,
  currentShift: _propTypes2.default.object
});
ActivityTable.defaultProps = {
  title: 'Activity Table',
  conditionDefinitions: _defaults.DEFAULT_EMPTY_OBJECT,
  appbar: {} };
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, { subscribe: _conveyorBelt.subscribe, unsubscribe: _conveyorBelt.unsubscribe, removeItem: _conveyorBelt.removeItem, refresh: _conveyorBelt.refresh, shiftChange: _conveyorBelt.shiftChange })(ActivityTable);
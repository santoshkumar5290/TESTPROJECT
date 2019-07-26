'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineGrid = undefined;

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

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _defaults = require('../../utils/defaults');

var _timelineData = require('../../ducks/timelineData');

var _exportData = require('../../ducks/exportData');

var _TimelineGridColumnSettings = require('./TimelineGridColumnSettings');

var _TimelineGridColumnSettings2 = _interopRequireDefault(_TimelineGridColumnSettings);

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableBody = require('./TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _TableFooter = require('./TableFooter');

var _TableFooter2 = _interopRequireDefault(_TableFooter);

var _TimelineGridSettingsDialog = require('./TimelineGridSettingsDialog');

var _TimelineGridSettingsDialog2 = _interopRequireDefault(_TimelineGridSettingsDialog);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
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
// Action creators
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    timelineData: state.timelineData.get(ownProps.group),
    config: state.config,
    userSettings: state.userSettings[ownProps.group] || _defaults.DEFAULT_EMPTY_OBJECT
  };
};

/* eslint-disable */
/**
 * Widget that can be used to visualize historical package information in a tabular format.
 * 
 * Uses REST webservices to fetch data from server.  
 *
 * **Available properties:**
 *
 * | Property               | Type     | Description                                                                                                | Allowed values                          | Default Value   | Required |
 * |------------------------|----------|------------------------------------------------------------------------------------------------------------|-----------------------------------------|-----------------|----------|
 * | `title`                | `String` | The widget title.                                                                                          | *                                       | 'Package Data'  | NO       |
 * | `channel`              | `String` | The channel to connect to using the Conveyor Belt protocol.                                                | *                                       |                 | YES      |
 * | `group`                | `String` | Components are grouped using a group ID. Components with matching group IDs share state and user settings. | *                                       |                 | YES      |
 * |                        |          | Make sure that the group ID is unique per widget type.                                                     |                                         |                 |          |
 * |                        |          | E.g. ActivityTable ConveyorBelt and TimelineGrid must have different group IDs                             |                                         |                 |          |
 * | `conditionDefinitions` | `Object` | An object of all the condition definitions (with the required key 'label' for each condition)              | Object with defined shape (see example) |                 | YES      |
 * | `style`                | `Object` | Custom style for the widget                                                                                | *                                       |                 | NO       |
 * | `start`                | `Object` | Provides 'starting date' for date range filtering                                                          | Date object                             | Current time    | NO       |
 * | `end`                  | `Object` | Provides 'end date' for date range filtering                                                               | Date object                             | Current time    | NO       |
 * | `limit`                | `Number` | Number of items per page                                                                                   | Unsigned integer                        | 20              | NO       |
 * | `desc`                 | `Boolean`| If true, items will be sorted in descending order, ascending otherwise                                     | [true, false]                           | true            | NO       |
 * | `startRowIndex`        | `Number` | Zero-based index of the first item to display                                                              | Unsigned integer                        | 0               | NO       |
 * | `searchTerm`           | `String` | Optional search term used filter displayed items                                                           | Alpha-numeric text                      |                 | NO       |
 * | `excludeConditions`    | `Array`  | Exclude items associated with these conditions                                                             | An array of condition keys              |                 | NO       |
 * | `packageUrl`           | `String` | URL of package service                                                                                     | Valid URL                               |                 | YES      |
 * | `exportUrl`            | `String` | URL of export service                                                                                      | Valid URL                               |                 | YES      |
 * @example
 * const grid = TimelineGrid.init(document.getElementById('timeline-grid'), {
 *   title: 'Package Data',
 *   group: 'timeline-grid-test',
 *   channel: 'warehouse_1',
 *   packageUrl: 'http://localhost:8080/package',
 *   exportUrl: 'http://localhost:8080/export',
 *   style: {
 *     height: 600
 *   },
 *   conditionDefinitions: {
 *     noread: {
 *       label: 'No reads'
 *     },
 *     multiread: {
 *       label: 'Multiple reads'
 *     }
 *   },
 *   start: new Date(),
 *   end: new Date(),
 *   limit: 20,
 *   desc: true,
 *   startRowIndex: 0,
 *   searchTerm: "",
 *   excludeConditions: []
 * })
 *
 * @example
 * render() {
 *   return (
 *     <ConnectedTimelineGrid
 *        title='Package Data'
 *        group={group}
 *        channel='warehouse_1'
 *        packageUrl='http://localhost:8080/package'
 *        exportUrl='http://localhost:8080/export'
 *        style={{ height: 600 }}
 *        conditionDefinitions: {{
 *          noread: {
 *            label: 'No reads'
 *          },
 *          multiread: {
 *            label: 'Multiple reads'
 *          }
 *        }}
 *        start={new Date(Date.now() - 86400000)}
 *        end={new Date(Date.now() + 86400000)}
 *        limit={20}
 *        desc
 *        startRowIndex={0}
 *        searchTerm=''
 *        excludeConditions={[]}
 *     />
 *   )
 * }
 */
/* eslint-enable */

var TimelineGrid = exports.TimelineGrid = function (_SICKComponent) {
  (0, _inherits3.default)(TimelineGrid, _SICKComponent);

  /** @ignore */


  /** @ignore */
  function TimelineGrid(props, context) {
    (0, _classCallCheck3.default)(this, TimelineGrid);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (TimelineGrid.__proto__ || (0, _getPrototypeOf2.default)(TimelineGrid)).call(this, props, context));

    _this.state = {
      editColumnsDialogOpen: false,
      settingsDialogOpen: false,
      params: {
        start: new Date(Date.now() - _defaults.DEFAULT_TLG_INTERVAL),
        end: new Date(),
        channel: props.channel,
        limit: 20,
        desc: true,
        firstRowKey: '',
        lastRowKey: '',
        filterConditions: [],
        action: 'refresh'
      }

      /** @private */
    };_this._toggleColumnEditorDialog = _this._toggleColumnEditorDialog.bind(_this);
    _this._toggleSettingsDialog = _this._toggleSettingsDialog.bind(_this);
    return _this;
  }

  /** @ignore */


  (0, _createClass3.default)(TimelineGrid, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          group = _props.group,
          packageUrl = _props.packageUrl,
          exportUrl = _props.exportUrl,
          initTimelineData = _props.initTimelineData,
          initExportData = _props.initExportData;
      var params = this.state.params;

      initTimelineData(group, packageUrl, params);
      initExportData(group, exportUrl);
    }

    /** @ignore */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /** @private */

  }, {
    key: '_toggleColumnEditorDialog',
    value: function _toggleColumnEditorDialog(e, ref) {
      this.setState({
        editColumnsDialogOpen: !this.state.editColumnsDialogOpen
      });
    }

    /** @private */

  }, {
    key: '_toggleSettingsDialog',
    value: function _toggleSettingsDialog(e, ref) {
      this.setState({
        settingsDialogOpen: !this.state.settingsDialogOpen
      });
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          group = _props2.group,
          userSettings = _props2.userSettings,
          style = _props2.style,
          title = _props2.title,
          conditionDefinitions = _props2.conditionDefinitions;

      var styles = getStyles(this.props, this.muiTheme);

      var containerStyle = (0, _extends3.default)({}, styles.container, style);

      var columns = userSettings && userSettings.columns || _utils.columns;
      var measurementSystem = userSettings && userSettings.measurementSystem || _defaults.DEFAULT_MEASUREMENT_SYSTEM;

      return (0, _jsx3.default)(_Paper2.default, {
        style: containerStyle
      }, void 0, (0, _jsx3.default)(_TableHeader2.default, {
        title: title,
        group: group,
        onColumnSettings: this._toggleColumnEditorDialog,
        onSettingsDialog: this._toggleSettingsDialog,
        conditionDefinitions: conditionDefinitions
      }), (0, _jsx3.default)(_TableBody2.default, {
        columns: columns,
        measurementSystem: measurementSystem,
        group: group
      }), (0, _jsx3.default)(_TableFooter2.default, {
        group: group
      }), this.state.editColumnsDialogOpen && (0, _jsx3.default)(_TimelineGridColumnSettings2.default, {
        open: true,
        group: group,
        columns: columns,
        onRequestClose: this._toggleColumnEditorDialog
      }), this.state.settingsDialogOpen && (0, _jsx3.default)(_TimelineGridSettingsDialog2.default, {
        open: true,
        measurementSystem: measurementSystem,
        group: group,
        onRequestClose: this._toggleSettingsDialog
      }));
    }
  }]);
  return TimelineGrid;
}(_SICKComponent3.default);

TimelineGrid.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  title: _propTypes2.default.string,
  channel: _propTypes2.default.string.isRequired,
  timelineData: _propTypes2.default.object,
  conditionDefinitions: _propTypes2.default.object,
  style: _propTypes2.default.object
});
TimelineGrid.defaultProps = {
  title: 'Package Data',
  conditionDefinitions: _defaults.DEFAULT_EMPTY_OBJECT };
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, (0, _extends3.default)({}, _timelineData.actions, _exportData.actions))(TimelineGrid);
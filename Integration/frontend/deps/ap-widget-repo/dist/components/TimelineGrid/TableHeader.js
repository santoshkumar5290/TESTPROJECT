'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableHeader = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _lodash = require('lodash');

var _timelineData = require('../../ducks/timelineData');

var _exportData = require('../../ducks/exportData');

var _Toolbar = require('material-ui/Toolbar');

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _refresh = require('material-ui/svg-icons/navigation/refresh');

var _refresh2 = _interopRequireDefault(_refresh);

var _DateRangeFilter = require('./DateRangeFilter');

var _DateRangeFilter2 = _interopRequireDefault(_DateRangeFilter);

var _SICKMuiTheme = require('../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

var _FilterListMenu = require('./FilterListMenu');

var _FilterListMenu2 = _interopRequireDefault(_FilterListMenu);

var _ExportDataDialog = require('./ExportDataDialog');

var _ExportDataDialog2 = _interopRequireDefault(_ExportDataDialog);

var _defaults = require('../../utils/defaults');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
  toolbar: {
    height: 56
  },
  iconMenu: {
    horizontal: 'right',
    vertical: 'top'
  }

  // ------------------------------------
  // Helpers
  // ------------------------------------

};

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Components
// ------------------------------------

// ------------------------------------
// Action creators
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    exportData: state.exportData.get(ownProps.group),
    timelineData: state.timelineData.get(ownProps.group),
    userSettings: state.userSettings[ownProps.group] || _defaults.DEFAULT_EMPTY_OBJECT
  };
};

/**
 * @private
 */

var TableHeader = exports.TableHeader = function (_React$Component) {
  (0, _inherits3.default)(TableHeader, _React$Component);

  /** @ignore */
  function TableHeader(props, context) {
    (0, _classCallCheck3.default)(this, TableHeader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TableHeader.__proto__ || (0, _getPrototypeOf2.default)(TableHeader)).call(this, props, context));

    _this.state = {
      conditions: (0, _keys2.default)(props.conditionDefinitions)

      /** @private */
    };_this._reloadData = _this._reloadData.bind(_this);
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(TableHeader, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_reloadData',
    value: function _reloadData() {
      var _props = this.props,
          group = _props.group,
          requestPackage = _props.requestPackage,
          setExportParams = _props.setExportParams;


      requestPackage(group, { action: 'refresh', desc: true });

      // clear checked rows on applied filter
      setExportParams(group, {});
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          conditionDefinitions = _props2.conditionDefinitions,
          timelineData = _props2.timelineData,
          exportData = _props2.exportData,
          userSettings = _props2.userSettings,
          title = _props2.title,
          group = _props2.group;

      var actionIconColor = _SICKMuiTheme2.default.palette.iconColor;
      var conditions = this.state.conditions;

      var columns = userSettings.columns;

      var columnHidden = columns && columns.find(function (col) {
        return col.key === _utils.CONDITIONS_ID_KEY && !col.isShown;
      });

      return (0, _jsx3.default)(_Toolbar.Toolbar, {
        style: style.toolbar
      }, void 0, (0, _jsx3.default)(_Toolbar.ToolbarGroup, {}, void 0, (0, _jsx3.default)(_Toolbar.ToolbarTitle, {
        text: title
      })), (0, _jsx3.default)(_Toolbar.ToolbarGroup, {
        lastChild: true
      }, void 0, (0, _jsx3.default)(_IconButton2.default, {
        className: 'reload-data-button',
        onClick: this._reloadData
      }, void 0, (0, _jsx3.default)(_refresh2.default, {
        color: actionIconColor
      })), timelineData && (0, _jsx3.default)(_DateRangeFilter2.default, {
        group: group
      }), exportData && !(0, _lodash.isEmpty)(exportData.get('params')) && (0, _jsx3.default)(_ExportDataDialog2.default, {
        group: group
      }), timelineData && !columnHidden && (0, _jsx3.default)(_FilterListMenu2.default, {
        group: group,
        conditionDefinitions: conditionDefinitions,
        conditions: conditions,
        iconColor: actionIconColor
      }), (0, _jsx3.default)(_IconButton2.default, {
        onClick: this.props.onColumnSettings
      }, void 0, (0, _jsx3.default)(_moreVert2.default, {
        color: actionIconColor
      }))));
    }
  }]);
  return TableHeader;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps, (0, _extends3.default)({}, _timelineData.actions, _exportData.actions))(TableHeader);
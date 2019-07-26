'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineGridColumnSettings = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _update = require('react/lib/update');

var _update2 = _interopRequireDefault(_update);

var _colors = require('material-ui/styles/colors');

var _lodash = require('lodash');

var _defaults = require('../../utils/defaults');

var _utils = require('./utils');

var _userSettings = require('../../ducks/userSettings');

var _ColumnOrderItem = require('./ColumnOrderItem');

var _ColumnOrderItem2 = _interopRequireDefault(_ColumnOrderItem);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _List = require('material-ui/List');

var _reorder = require('material-ui/svg-icons/action/reorder');

var _reorder2 = _interopRequireDefault(_reorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Components
// ------------------------------------

var style = {
  container: {
    width: '500px'
  },
  title: {
    padding: '24px 24px 8px 24px'
  },
  subtitle: {
    padding: '0 16px 8px 16px'
  },
  body: {
    padding: '0 8px'
  }
};

// ------------------------------------
// Action creators
// ------------------------------------

// ------------------------------------
// Constants
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    userSettings: state.userSettings[ownProps.group] || _defaults.DEFAULT_EMPTY_OBJECT
  };
};

/**
 * Component for adjusting the order and visibility of columns in the timeline grid
 *
 * This component manages the state of a `settings` object. This object is eventually saved as the userSettings state.
 * The following properties are currently availble on `settings`:
 *
 * `columns` -- The user's custom preferences which define the columns to be shown.
 *
 * @private
 * @extends {SICKComponent}
 */

var _ref = (0, _jsx3.default)(_Checkbox2.default, {
  checked: true,
  disabled: true
});

var _ref2 = (0, _jsx3.default)(_reorder2.default, {});

var _ref3 = (0, _jsx3.default)(_Checkbox2.default, {
  checked: true
});

var TimelineGridColumnSettings = exports.TimelineGridColumnSettings = function (_SICKComponent) {
  (0, _inherits3.default)(TimelineGridColumnSettings, _SICKComponent);

  function TimelineGridColumnSettings(props, context) {
    (0, _classCallCheck3.default)(this, TimelineGridColumnSettings);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TimelineGridColumnSettings.__proto__ || (0, _getPrototypeOf2.default)(TimelineGridColumnSettings)).call(this, props, context));

    _this.state = {
      settings: (0, _deepmerge2.default)({
        columns: props.columns
      }, props.userSettings)
    };

    _this._moveItem = _this._moveItem.bind(_this);
    _this._renderItem = _this._renderItem.bind(_this);
    _this._onSave = _this._onSave.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(TimelineGridColumnSettings, [{
    key: '_moveItem',
    value: function _moveItem(dragIndex, hoverIndex) {
      var settings = this.state.settings;


      var dragItem = settings.columns[dragIndex];

      this.setState({
        settings: (0, _extends3.default)({}, (0, _update2.default)(this.state.settings, {
          columns: {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
          }
        }))
      });
    }
  }, {
    key: '_onItemCheck',
    value: function _onItemCheck(item, e, checked) {
      var columns = [].concat((0, _toConsumableArray3.default)(this.state.settings.columns));

      var col = columns.find(function (col) {
        return col.key === item.key;
      });
      col.isShown = checked;

      this.setState({
        settings: (0, _extends3.default)({}, this.state.settings, {
          columns: columns
        })
      });
    }
  }, {
    key: '_onSave',
    value: function _onSave() {
      this.props.updateUserSettings(this.props.group, this.state.settings);
      this.props.onRequestClose();
    }
  }, {
    key: '_renderItem',
    value: function _renderItem(item, isDragging) {
      var opacity = isDragging ? 0.5 : 1;

      var onCheck = this._onItemCheck.bind(this, item);

      var mandatory = item.key === _utils.PACKAGE_ID_KEY;

      return (0, _jsx3.default)(_List.ListItem, {
        disabled: mandatory,
        leftCheckbox: mandatory ? _ref : (0, _jsx3.default)(_Checkbox2.default, {
          checked: item.isShown,
          onCheck: onCheck
        }),
        rightIcon: !mandatory && _ref2,
        style: { opacity: opacity },
        primaryText: _utils.labels[item.key] ? _utils.labels[item.key] : item.key
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var settings = this.state.settings;


      var actions = [(0, _jsx3.default)(_FlatButton2.default, {
        primary: true,
        label: 'Cancel',
        onTouchTap: this.props.onRequestClose
      }), (0, _jsx3.default)(_FlatButton2.default, {
        primary: true,
        label: 'Save',
        hoverColor: _colors.yellowA700,
        backgroundColor: _colors.yellowA700,
        onTouchTap: this._onSave,
        disabled: (0, _lodash.isEqual)(this.props.columns, settings.columns)
      })];

      return _react2.default.createElement(
        _Dialog2.default,
        (0, _extends3.default)({}, this.props, {
          title: 'Edit Columns',
          titleStyle: style.title,
          bodyStyle: style.body,
          actions: actions,
          modal: true,
          contentStyle: style.container }),
        (0, _jsx3.default)('div', {
          style: style.subtitle
        }, void 0, 'Choose which columns should display and in what order'),
        (0, _jsx3.default)(_List.List, {}, void 0, (0, _jsx3.default)(_List.ListItem, {
          leftCheckbox: _ref3,
          style: { opacity: 0.5 },
          primaryText: _utils.labels[_utils.PACKAGE_ID_KEY]
        }), settings.columns.map(function (column, index) {
          return column.key !== _utils.PACKAGE_ID_KEY && (0, _jsx3.default)(_ColumnOrderItem2.default, {
            canDrag: true,
            index: index,
            data: column,
            moveItem: _this2._moveItem,
            renderItem: _this2._renderItem
          }, column.id);
        }))
      );
    }
  }]);
  return TimelineGridColumnSettings;
}(_SICKComponent3.default);

TimelineGridColumnSettings.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  group: _propTypes2.default.string.isRequired,
  userSettings: _propTypes2.default.object.isRequired,
  updateUserSettings: _propTypes2.default.func.isRequired,
  onRequestClose: _propTypes2.default.func
});
TimelineGridColumnSettings.defaultProps = (0, _extends3.default)({}, _SICKComponent3.default.defaultProps, {
  onRequestClose: function onRequestClose() {}
});
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, { updateUserSettings: _userSettings.updateUserSettings })((0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(TimelineGridColumnSettings));
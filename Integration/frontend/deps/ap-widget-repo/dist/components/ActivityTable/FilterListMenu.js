'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _IconMenu = require('material-ui/IconMenu');

var _IconMenu2 = _interopRequireDefault(_IconMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _filterList = require('material-ui/svg-icons/content/filter-list');

var _filterList2 = _interopRequireDefault(_filterList);

var _checkBoxOutlineBlank = require('material-ui/svg-icons/toggle/check-box-outline-blank');

var _checkBoxOutlineBlank2 = _interopRequireDefault(_checkBoxOutlineBlank);

var _checkBox = require('material-ui/svg-icons/toggle/check-box');

var _checkBox2 = _interopRequireDefault(_checkBox);

var _conveyorBelt = require('../../ducks/conveyorBelt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    conveyorBelt: state.conveyorBelt.get(ownProps.group)
  };
};

/**
 * Component encapsulating the functionality to filter rows by condition code in Activity table.
 */


// ------------------------------------
// Action creators
// ------------------------------------

var FilterListMenu = function (_Component) {
  (0, _inherits3.default)(FilterListMenu, _Component);

  function FilterListMenu(props, context) {
    (0, _classCallCheck3.default)(this, FilterListMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FilterListMenu.__proto__ || (0, _getPrototypeOf2.default)(FilterListMenu)).call(this, props, context));

    _this._toggleFilter = _this._toggleFilter.bind(_this);
    _this._renderMenuItem = _this._renderMenuItem.bind(_this);
    return _this;
  }

  /** @ignore */


  (0, _createClass3.default)(FilterListMenu, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var oldFilter = this.props.conveyorBelt && this.props.conveyorBelt.filter;
      var currentFilter = nextProps.conveyorBelt && nextProps.conveyorBelt.filter;

      return oldFilter !== currentFilter;
    }
  }, {
    key: '_toggleFilter',
    value: function _toggleFilter(e, ref) {
      var key = ref.props.value;
      var _props = this.props,
          conveyorBelt = _props.conveyorBelt,
          group = _props.group;

      var currentFilter = conveyorBelt && conveyorBelt.filter;
      var filter = [].concat((0, _toConsumableArray3.default)(currentFilter));

      var keyIndex = filter.indexOf(key);

      if (keyIndex === -1) {
        filter.push(key);
      } else {
        filter.splice(keyIndex, 1);
      }

      this.props.applyFilter(group, filter);
    }
  }, {
    key: '_renderMenuItem',
    value: function _renderMenuItem(key) {
      var _props2 = this.props,
          conditionDefinitions = _props2.conditionDefinitions,
          conveyorBelt = _props2.conveyorBelt;

      var condition = conditionDefinitions[key];
      var currentFilter = conveyorBelt && conveyorBelt.filter;

      var color = condition.value || condition.defaultValue;
      var checked = currentFilter && currentFilter.indexOf(key) > -1;

      var Icon = checked ? _checkBox2.default : _checkBoxOutlineBlank2.default;

      return (0, _jsx3.default)(_MenuItem2.default, {
        value: key,
        primaryText: condition.label,
        leftIcon: (0, _jsx3.default)(Icon, {
          color: color
        })
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          conditions = _props3.conditions,
          iconColor = _props3.iconColor;


      return (0, _jsx3.default)(_IconMenu2.default, {
        iconButtonElement: (0, _jsx3.default)(_IconButton2.default, {}, void 0, (0, _jsx3.default)(_filterList2.default, {
          color: iconColor
        })),
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        targetOrigin: { horizontal: 'right', vertical: 'top' },
        onItemTouchTap: this._toggleFilter
      }, void 0, conditions.map(this._renderMenuItem));
    }
  }]);
  return FilterListMenu;
}(_react.Component);

FilterListMenu.contextTypes = {
  muiTheme: _propTypes2.default.object
};
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, { applyFilter: _conveyorBelt.applyFilter })(FilterListMenu);
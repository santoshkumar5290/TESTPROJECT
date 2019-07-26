'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _colors = require('material-ui/styles/colors');

var _lodash = require('lodash');

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

var _timelineData = require('../../ducks/timelineData');

var _exportData = require('../../ducks/exportData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var style = {
  anchor: {
    horizontal: 'right',
    vertical: 'top'
  },
  target: {
    horizontal: 'right',
    vertical: 'top'
  }

  // ------------------------------------
  // Components
  // ------------------------------------

};

// ------------------------------------
// Action creators
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    timelineData: state.timelineData.get(ownProps.group)
  };
};

var FilterListMenu = function (_Component) {
  (0, _inherits3.default)(FilterListMenu, _Component);

  function FilterListMenu(props, context) {
    (0, _classCallCheck3.default)(this, FilterListMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FilterListMenu.__proto__ || (0, _getPrototypeOf2.default)(FilterListMenu)).call(this, props, context));

    _this.state = {
      conditionsFilter: [],
      openMenu: false
    };

    _this._toggleFilter = _this._toggleFilter.bind(_this);
    _this._renderMenuItem = _this._renderMenuItem.bind(_this);
    _this._menuStateChange = _this._menuStateChange.bind(_this);
    return _this;
  }

  /** @ignore */


  (0, _createClass3.default)(FilterListMenu, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var timelineData = this.props.timelineData;
      var params = timelineData.params;

      if (!params) {
        return;
      }

      this.setState({
        conditionsFilter: [].concat((0, _toConsumableArray3.default)(params.filterConditions))
      });
    }

    /** @ignore */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_menuStateChange',
    value: function _menuStateChange(open) {
      if (!open) {
        var _props = this.props,
            group = _props.group,
            requestPackage = _props.requestPackage,
            setExportParams = _props.setExportParams;


        requestPackage(group, { filterConditions: this.state.conditionsFilter, action: 'refresh' });

        // clear checked rows on applied filter
        setExportParams(group, {});
      }
      this.setState({
        openMenu: open
      });
    }
  }, {
    key: '_toggleFilter',
    value: function _toggleFilter(e, ref) {
      var key = ref.props.value;
      var timelineData = this.props.timelineData;
      var params = timelineData.params;

      if (!params) {
        return;
      }

      var nextFilter = (0, _lodash.union)(this.state.conditionsFilter, params.filterConditions);

      var keyIndex = nextFilter.indexOf(key);

      if (keyIndex === -1) {
        nextFilter.push(key);
      } else {
        nextFilter.splice(keyIndex, 1);
      }

      this.setState({
        conditionsFilter: nextFilter
      });
    }
  }, {
    key: '_renderMenuItem',
    value: function _renderMenuItem(key) {
      var conditionDefinitions = this.props.conditionDefinitions;

      var condition = conditionDefinitions[key];
      var checked = this.state.conditionsFilter.indexOf(key) > -1;
      var color = checked ? _colors.yellowA700 : _colors.grey600;
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
      var _props2 = this.props,
          conditions = _props2.conditions,
          iconColor = _props2.iconColor;


      return (0, _jsx3.default)(_IconMenu2.default
      // Disable auto-close functionality.
      , {
        touchTapCloseDelay: 0,
        iconButtonElement: (0, _jsx3.default)(_IconButton2.default, {}, void 0, (0, _jsx3.default)(_filterList2.default, {
          color: iconColor
        })),
        anchorOrigin: style.anchor,
        targetOrigin: style.target,
        open: this.state.openMenu,
        onRequestChange: this._menuStateChange,
        onItemTouchTap: this._toggleFilter
      }, void 0, conditions.map(this._renderMenuItem));
    }
  }]);
  return FilterListMenu;
}(_react.Component);

FilterListMenu.contextTypes = {
  muiTheme: _propTypes2.default.object
};
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, (0, _extends3.default)({}, _timelineData.actions, _exportData.actions))(FilterListMenu);
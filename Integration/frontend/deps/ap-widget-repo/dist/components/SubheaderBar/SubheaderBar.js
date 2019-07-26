'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubheaderBar = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _filterList = require('material-ui/svg-icons/content/filter-list');

var _filterList2 = _interopRequireDefault(_filterList);

var _Toolbar = require('material-ui/Toolbar');

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _colors = require('material-ui/styles/colors');

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

require('./SubheaderBar.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dialogStyles = {
  modalBody: {
    paddingRight: 30
  },
  modalContents: {
    paddingRight: 10,
    fontSize: 13
  },
  selectMenu: {
    label: {
      top: 0
    },
    icon: {
      top: '4px'
    },
    underline: {
      bottom: '5px'
    }
  }
};

var _ref = (0, _jsx3.default)(_filterList2.default, {
  color: _colors.darkBlack
});

var SubheaderBar = exports.SubheaderBar = function (_SICKComponent) {
  (0, _inherits3.default)(SubheaderBar, _SICKComponent);

  /** @ignore */


  /** @ignore */
  function SubheaderBar(props) {
    (0, _classCallCheck3.default)(this, SubheaderBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SubheaderBar.__proto__ || (0, _getPrototypeOf2.default)(SubheaderBar)).call(this, props));

    _this.createDropdownMenu = function (id, definition) {
      var isModal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var currentValue = _this.state[id] ? _this.state[id] : definition.value;

      var style = {};
      if (!isModal) {
        style.width = 'auto';
      }

      var changeFn = function changeFn(event, index, value) {
        var changes = {};
        changes[id] = value;
        _this.setState(changes);

        if (definition.onChange) {
          definition.onChange(value, definition.name);
        }
      };

      var items = definition.options.map(function (item) {
        return (0, _jsx3.default)(_MenuItem2.default, {
          value: item.code,
          primaryText: item.label
        }, item.code);
      });

      return (0, _jsx3.default)('div', {
        className: 'subheader-menu'
      }, void 0, (0, _jsx3.default)(_SelectField2.default, {
        floatingLabelText: isModal ? definition.label : null,
        value: currentValue,
        disabled: definition.options.length === 1,
        autoWidth: true,
        style: style,
        labelStyle: dialogStyles.selectMenu.label,
        iconStyle: dialogStyles.selectMenu.icon,
        underlineStyle: dialogStyles.selectMenu.underline,
        onChange: changeFn
      }, void 0, items));
    };

    _this.createMenu = function (id, definition) {
      var isModal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var options = definition.options,
          value = definition.value;


      if (options && options.length) {
        return _this.createDropdownMenu(id, definition, isModal);
      }
      if (value) {
        return (0, _jsx3.default)('div', {
          className: 'subheader-menu subheader-menu-text'
        }, void 0, value);
      }
    };

    _this.updateMenuState = function (menu) {
      menu.map(function (definition, index) {
        var options = definition.options;

        if (options && options.length > 1) {
          var nextState = _this.state;
          nextState[index] = definition.value;
          _this.setState(nextState);
        }
      });
    };

    _this.toggleFilterDialog = function () {
      _this.setState({
        filterModalOpen: !_this.state.filterModalOpen
      });
    };

    _this.state = {
      filterModalOpen: false
    };
    return _this;
  }

  /** @ignore */


  (0, _createClass3.default)(SubheaderBar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateMenuState(this.props.menu);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.updateMenuState(nextProps.menu);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          menu = _props.menu,
          containerClass = _props.containerClass,
          containerStyle = _props.containerStyle,
          localization = _props.localization,
          localizationSet = _props.localizationSet;


      var wrapperClass = 'subheader';
      if (containerClass) {
        wrapperClass = wrapperClass + ' ' + containerClass;
      }
      var toolbarStyle = (0, _assign2.default)({
        backgroundColor: 'auto'
      }, containerStyle);

      var hasSettings = menu.length > 1 || menu.length === 1 && menu[0].options && menu[0].options.length;

      var actions = [(0, _jsx3.default)(_FlatButton2.default, {
        label: localization.formatMessage(localizationSet + ':closeButton'),
        primary: true,
        onTouchTap: this.toggleFilterDialog
      })];

      return (0, _jsx3.default)('div', {
        className: wrapperClass
      }, void 0, (0, _jsx3.default)(_Toolbar.Toolbar, {
        style: toolbarStyle
      }, void 0, (0, _jsx3.default)(_Toolbar.ToolbarGroup, {}, void 0, menu.map(function (definition, index) {
        return _this2.createMenu(index, definition);
      })), (0, _jsx3.default)(_Toolbar.ToolbarGroup, {
        lastChild: true
      }, void 0, hasSettings && (0, _jsx3.default)('div', {
        className: 'subheader-filter-button-wrapper'
      }, void 0, (0, _jsx3.default)(_IconButton2.default, {
        onTouchTap: this.toggleFilterDialog
      }, void 0, _ref)), hasSettings && (0, _jsx3.default)(_Dialog2.default, {
        bodyStyle: dialogStyles.modalBody,
        actions: actions,
        modal: true,
        contentStyle: dialogStyles.modalContents,
        open: this.state.filterModalOpen
      }, void 0, (0, _jsx3.default)('div', {
        className: 'modal'
      }, void 0, menu.map(function (definition, index) {
        return _this2.createMenu(index, definition, true);
      }))), this.props.children)));
    }
  }]);
  return SubheaderBar;
}(_SICKComponent3.default);

SubheaderBar.propTypes = {
  menu: _propTypes2.default.array.isRequired,
  containerClass: _propTypes2.default.string,
  containerStyle: _propTypes2.default.object,
  localization: _propTypes2.default.object.isRequired,
  localizationSet: _propTypes2.default.string };
SubheaderBar.defaultProps = {
  localizationSet: 'widgets' };
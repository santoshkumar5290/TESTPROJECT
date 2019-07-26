'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _A = require('./A');

var _A2 = _interopRequireDefault(_A);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Helpers
// ------------------------------------

function getStyles() {
  return {
    passwordTipsLink: {
      float: 'right',
      fontSize: 'small',
      position: 'absolute',
      display: 'block',
      zIndex: 1,
      right: 0,
      top: 0
    },
    modalTitle: {
      padding: 16
    },
    modalBody: {
      padding: 16
    },
    modalStyle: {
      width: 340
    },
    modalActionsStyle: {
      textAlign: 'right'
    },
    modalContainer: {
      position: 'relative'
    }
  };
}

/**
 * Modal for displaying password tips.
 *
 * @private
 */


// ------------------------------------
// Components
// ------------------------------------

var _ref2 = (0, _jsx3.default)('ul', {}, void 0, (0, _jsx3.default)('li', {}, void 0, 'Minimum of 8 characters in length'), (0, _jsx3.default)('li', {}, void 0, 'Must contain at least one number (0-9)'), (0, _jsx3.default)('li', {}, void 0, 'Must contain at least one uppercase letter (A-Z)'));

var DialogPasswordTips = function (_React$Component) {
  (0, _inherits3.default)(DialogPasswordTips, _React$Component);

  function DialogPasswordTips() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DialogPasswordTips);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DialogPasswordTips.__proto__ || (0, _getPrototypeOf2.default)(DialogPasswordTips)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.handleOpen = function () {
      _this.setState({ open: true });
    }, _this.handleClose = function () {
      _this.setState({ open: false });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DialogPasswordTips, [{
    key: 'render',
    value: function render() {
      var styles = getStyles();

      var actions = [(0, _jsx3.default)(_FlatButton2.default, {
        label: 'OK',
        primary: true,
        onTouchTap: this.handleClose
      })];

      return (0, _jsx3.default)('div', {
        style: styles.modalContainer
      }, void 0, (0, _jsx3.default)(_A2.default, {
        style: styles.passwordTipsLink,
        href: '#',
        onTouchTap: this.handleOpen
      }, void 0, 'Password tips'), (0, _jsx3.default)(_Dialog2.default, {
        title: 'Password tips',
        titleStyle: styles.modalTitle,
        bodyStyle: styles.modalBody,
        open: this.state.open,
        contentStyle: styles.modalStyle,
        actionsContainerStyle: styles.modalActionsStyle,
        actions: actions,
        modal: true
      }, void 0, _ref2));
    }
  }]);
  return DialogPasswordTips;
}(_react2.default.Component);

exports.default = DialogPasswordTips;
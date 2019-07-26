'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordReset = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _SICKPlatform = require('../../SICKPlatform');

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _validations = require('../../utils/validations');

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _GridList = require('material-ui/GridList');

var _reportProblem = require('material-ui/svg-icons/action/report-problem');

var _reportProblem2 = _interopRequireDefault(_reportProblem);

var _PasswordTips = require('../Global/PasswordTips');

var _PasswordTips2 = _interopRequireDefault(_PasswordTips);

var _GenericError = require('../Global/GenericError');

var _GenericError2 = _interopRequireDefault(_GenericError);

var _A = require('../Global/A');

var _A2 = _interopRequireDefault(_A);

var _colorManipulator = require('material-ui/utils/colorManipulator');

var _passwordReset = require('../../ducks/passwordReset');

var _defaults = require('../../utils/defaults');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, muiTheme) {
  return {
    container: {
      padding: 40,
      paddingBottom: 20,
      paddingTop: 20,
      width: 400,
      backgroundColor: muiTheme.palette.white
    },
    passwordResetTopWrapper: {
      margin: 'auto',
      marginBottom: 30
    },
    passwordResetMiddleWrapper: {
      // marginTop: 50
    },
    header: {
      textAlign: 'center'
    },
    headerHeadline: {
      margin: 0,
      fontWeight: 'normal'
    },
    headerText: {
      display: 'block',
      marginTop: 5,
      marginBottom: 10,
      fontSize: 15,
      color: (0, _colorManipulator.fade)(muiTheme.palette.textColor, 0.54)
    },
    textField: {
      width: '100%'
    },
    actionWrapper: {},
    leftButton: {
      textAlign: 'left',
      lineHeight: '36px',
      fontWeight: 500,
      color: (0, _colorManipulator.fade)(muiTheme.palette.textColor, 0.54)
    },
    rightButton: {
      textAlign: 'right'
    },
    passwordErrorText: {
      marginTop: 5,
      marginBottom: 20
    },
    passwordErrorIcon: {
      float: 'right',
      height: 16,
      width: 16
    }
  };
}

// ------------------------------------
// Helpers
// ------------------------------------


// ------------------------------------
// Components
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    passwordReset: state.passwordReset,
    config: state.config
  };
};

/* eslint-disable */
/**
 * Password reset widget
 *
 * @private
 * 
 * **Available properties:**
 *
 * | Property               | Type     | Description                                                             | Allowed values   | Default Value                                                 | Required |
 * |------------------------|----------|-------------------------------------------------------------------------|------------------|---------------------------------------------------------------|----------|
 * | `primaryHeader`        | `String` | The widget main header                                                  | string           | 'Reset your password'                                         | NO       |
 * | `secondaryHeader`      | `String` | The widget secondary header                                             | string           | 'Enter your new password below to login to your dashboard.'   | NO       |
 * | `onCancel`             | `String` | Callback to be called when user clicks on Cancel button                 | function         |                                                               | NO       |
 * | `onSuccess`            | `String` | Callback to be called when password successfully reset                  | function         |                                                               | NO       |
 * | `userId`             | `string` | Username to perform reset operation                                       | string           |                                                               | YES      |
 * | `style`                | `Object` | Custom style for the widget                                             | object           |                                                               | NO       |
 *
 * @example
 * const reset = SICKPlatform.PasswordReset.init(document.createElement('div'), {
 *   userId: 'username',
 *   primaryHeader: 'Reset your password',
 *   secondaryHeader: 'Enter your new password below to login to your dashboard.',
 *   style: {
 *     width: 280
 *   },
 *   onCancel: function () {
 *     window.location.href = '#login'
 *   },
 *   onSuccess: function () {
 *     window.location.href = '#login'
 *   },
 * })
 * login.destroy()
 *
 * @example
 * render() {
 *   return (
 *     <div>
 *       <PasswordReset
 *         userId='username'
 *         primaryHeader='Reset your password'
 *         secondaryHeader='Enter your new password below to login to your dashboard.'
 *         onCancel={() => window.location.href = '#login'}
 *         onSuccess={() => window.location.href = '#login'}
 *         style={{ width: 280 }}
 *       />
 *     </div>
 *   )
 * }
 */
/* eslint max-len: ["error", 140] */
/* eslint-enable */

var _ref = (0, _jsx3.default)(_GenericError2.default, {
  open: true,
  title: 'Password Reset',
  message: 'Something went wrong'
});

var _ref2 = (0, _jsx3.default)(_PasswordTips2.default, {});

var PasswordReset = exports.PasswordReset = function (_SICKComponent) {
  (0, _inherits3.default)(PasswordReset, _SICKComponent);

  function PasswordReset(props, context) {
    (0, _classCallCheck3.default)(this, PasswordReset);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PasswordReset.__proto__ || (0, _getPrototypeOf2.default)(PasswordReset)).call(this, props, context));

    _this._reset = function () {
      var _this$state = _this.state,
          password1 = _this$state.password1,
          password2 = _this$state.password2;
      var _this$props = _this.props,
          reset = _this$props.reset,
          config = _this$props.config,
          userId = _this$props.userId;

      var url = config.authentication && config.authentication.url;

      reset(url, userId, password1, password2);
    };

    _this._handleEnterKey = function (e) {
      if (e.key === 'Enter') {
        var errors = _this._validateFields();
        if (_this._checkResetEnabled(errors)) {
          _this._reset();
        }
      }
    };

    _this._setPassword1 = function (e) {
      _this.setState({
        password1: e.target.value
      });
    };

    _this._setPassword2 = function (e) {
      _this.setState({
        password2: e.target.value
      });
    };

    _this.state = {
      password1: '',
      password2: ''
    };
    return _this;
  }

  (0, _createClass3.default)(PasswordReset, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.passwordReset.status === _passwordReset.PASSWORD_RESET_OK_STATUS) {
        this.props.onSuccess(nextProps.passwordReset.userId);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.passwordReset.status === _passwordReset.GENERIC_ERROR_STATUS) {
        prevProps.clear();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.clear();
    }
  }, {
    key: '_getPasswordErrorText',
    value: function _getPasswordErrorText(styles) {
      return (0, _jsx3.default)('p', {
        style: styles.passwordErrorText
      }, void 0, 'Please enter a valid password.', (0, _jsx3.default)(_reportProblem2.default, {
        style: styles.passwordErrorIcon,
        color: this.muiTheme.textField.errorColor
      }));
    }
  }, {
    key: '_getNotMatchPasswordErrorText',
    value: function _getNotMatchPasswordErrorText(styles) {
      return (0, _jsx3.default)('p', {
        style: styles.passwordErrorText
      }, void 0, 'Passwords do not match.', (0, _jsx3.default)(_reportProblem2.default, {
        style: styles.passwordErrorIcon,
        color: this.muiTheme.textField.errorColor
      }));
    }
  }, {
    key: '_showGenericError',
    value: function _showGenericError(status) {
      if (status === _passwordReset.GENERIC_ERROR_STATUS) {
        return _ref;
      }
    }
  }, {
    key: '_validateFields',
    value: function _validateFields() {
      var _state = this.state,
          password1 = _state.password1,
          password2 = _state.password2;

      var errors = [];

      if (password1.length && !(0, _validations.validatePassword)(password1)) {
        errors.push(_passwordReset.INVALID_PASSWORD);
      }

      if (password1 !== password2) {
        errors.push(_passwordReset.INVALID_PASSWORD_MATCH);
      }

      return errors;
    }
  }, {
    key: '_checkResetEnabled',
    value: function _checkResetEnabled(errors) {
      var passwordReset = this.props.passwordReset;
      var _state2 = this.state,
          password1 = _state2.password1,
          password2 = _state2.password2;

      var fieldsLength = password1.length && password2.length;
      return fieldsLength && errors.length === 0 && passwordReset.status !== _passwordReset.PASSWORD_RESETING_STATUS;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onCancel = _props.onCancel,
          passwordReset = _props.passwordReset,
          primaryHeader = _props.primaryHeader,
          secondaryHeader = _props.secondaryHeader;
      var _state3 = this.state,
          password1 = _state3.password1,
          password2 = _state3.password2;


      var styles = getStyles(this.props, this.muiTheme);

      var containerStyle = (0, _extends3.default)({}, styles.container, this.props.style);

      var errors = this._validateFields();

      return (0, _jsx3.default)(_Paper2.default, {
        style: containerStyle
      }, void 0, (0, _jsx3.default)('div', {
        style: styles.passwordResetTopWrapper,
        onKeyPress: this._handleEnterKey
      }, void 0, (0, _jsx3.default)('div', {
        style: styles.header
      }, void 0, (0, _jsx3.default)('h2', {
        style: styles.headerHeadline
      }, void 0, primaryHeader), (0, _jsx3.default)('small', {
        style: styles.headerText
      }, void 0, secondaryHeader)), (0, _jsx3.default)(_TextField2.default, {
        style: styles.textField,
        value: password1,
        onChange: this._setPassword1,
        type: 'password',
        hintText: 'Password',
        errorText: errors.indexOf(_passwordReset.INVALID_PASSWORD) !== -1 ? this._getPasswordErrorText(styles) : null,
        floatingLabelText: 'Password'
      }), _ref2, (0, _jsx3.default)(_TextField2.default, {
        style: styles.textField,
        value: password2,
        onChange: this._setPassword2,
        type: 'password',
        hintText: 'Repeat Password',
        errorText: errors.indexOf(_passwordReset.INVALID_PASSWORD_MATCH) !== -1 ? this._getNotMatchPasswordErrorText(styles) : null,
        floatingLabelText: 'Repeat Password'
      })), (0, _jsx3.default)('div', {
        style: styles.actionWrapper
      }, void 0, (0, _jsx3.default)(_GridList.GridList, {
        cellHeight: 45
      }, void 0, (0, _jsx3.default)(_GridList.GridTile, {}, void 0, (0, _jsx3.default)(_A2.default, {
        href: '#',
        onTouchTap: onCancel,
        style: styles.leftButton
      }, void 0, 'CANCEL')), (0, _jsx3.default)(_GridList.GridTile, {
        style: styles.rightButton
      }, void 0, (0, _jsx3.default)(_RaisedButton2.default, {
        disabled: !this._checkResetEnabled(errors),
        onTouchTap: this._reset,
        primary: true,
        label: 'Login'
      })))), this._showGenericError(passwordReset.status));
    }
  }]);
  return PasswordReset;
}(_SICKComponent3.default);

PasswordReset.propTypes = {
  styles: _propTypes2.default.object,
  onCancel: _propTypes2.default.func,
  onPasswordTipsClicked: _propTypes2.default.func,
  onSuccess: _propTypes2.default.func,
  reset: _propTypes2.default.func.isRequired,
  clear: _propTypes2.default.func.isRequired,
  passwordReset: _propTypes2.default.object.isRequired,
  userId: _propTypes2.default.string.isRequired,
  primaryHeader: _propTypes2.default.string,
  secondaryHeader: _propTypes2.default.string
};
PasswordReset.defaultProps = {
  onCancel: _defaults.NOOP,
  onPasswordTipsClicked: _defaults.NOOP,
  onSuccess: _defaults.NOOP,
  primaryHeader: 'Reset your password',
  secondaryHeader: 'Enter your new password below to login to your dashboard.'
};
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, _passwordReset.actions)(PasswordReset);
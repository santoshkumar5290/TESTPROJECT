'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordRecover = undefined;

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

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _GridList = require('material-ui/GridList');

var _reportProblem = require('material-ui/svg-icons/action/report-problem');

var _reportProblem2 = _interopRequireDefault(_reportProblem);

var _GenericError = require('../Global/GenericError');

var _GenericError2 = _interopRequireDefault(_GenericError);

var _A = require('../Global/A');

var _A2 = _interopRequireDefault(_A);

var _colorManipulator = require('material-ui/utils/colorManipulator');

var _passwordRecover = require('../../ducks/passwordRecover');

var _defaults = require('../../utils/defaults');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Components
// ------------------------------------

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
    usernameTextFieldError: {
      borderColor: muiTheme.textField.errorColor
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


var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    passwordRecover: state.passwordRecover,
    config: state.config
  };
};

/* eslint-disable */
/**
 * Password recover widget
 * 
 * @private
 * 
 * **Available properties:**
 *
 * | Property               | Type     | Description                                                             | Allowed values   | Default Value                                               | Required |
 * |------------------------|----------|-------------------------------------------------------------------------|------------------|-------------------------------------------------------------|----------|
 * | `primaryHeader`        | `String` | The widget main header                                                  | string           | 'Forgot your password?'                                     | NO       |
 * | `secondaryHeader`      | `String` | The widget secondary header                                             | string           | 'Enter your username or email below to reset your password' | NO       |
 * | `onCancel`             | `String` | Callback to be called when user clicks on Cancel button                 | function         |                                                             | NO       |
 * | `onSuccess`            | `String` | Callback to be called when password successfully reset                  | function         |                                                             | NO       |
 * | `userId`             | `string` | Username to perform recover operation                                     | string           |                                                             | YES      |
 * | `style`                | `Object` | Custom style for the widget                                             | object           |                                                             | NO       |
 *
 * @example
 * const recover = SICKPlatform.PasswordReset.init(document.createElement('div'), {
 *   userId: 'username',
 *   primaryHeader: 'Forgot your password?',
 *   secondaryHeader: 'Enter your username or email below to recover your password',
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
 *       <PasswordRecover
 *         userId='username'
 *         primaryHeader='Forgot your password?'
 *         secondaryHeader='Enter your username or email below to recover your password'
 *         onCancel={() => window.location.href = '#login'}
 *         onSuccess={() => window.location.href = '#login'}
 *         style={{ width: 280 }}
 *       />
 *     </div>
 *   )
 * }
 */
/* eslint-enable */

var _ref = (0, _jsx3.default)(_GenericError2.default, {
  open: true,
  title: 'Password recover',
  message: 'Something went wrong'
});

var PasswordRecover = exports.PasswordRecover = function (_SICKComponent) {
  (0, _inherits3.default)(PasswordRecover, _SICKComponent);

  function PasswordRecover(props, context) {
    (0, _classCallCheck3.default)(this, PasswordRecover);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PasswordRecover.__proto__ || (0, _getPrototypeOf2.default)(PasswordRecover)).call(this, props, context));

    _this._recover = function () {
      var userId = _this.state.userId;
      var _this$props = _this.props,
          recover = _this$props.recover,
          config = _this$props.config;

      var url = config.authentication && config.authentication.url;

      recover(url, userId);
    };

    _this._handleEnterKey = function (e) {
      if (e.key === 'Enter' && _this._checkRecoverEnabled()) {
        _this._recover();
      }
    };

    _this._setUsername = function (e) {
      _this.setState({
        userId: e.target.value.trim()
      });
    };

    _this.state = {
      userId: ''
    };
    return _this;
  }

  (0, _createClass3.default)(PasswordRecover, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.passwordRecover.status === _passwordRecover.PASSWORD_RECOVER_OK_STATUS) {
        this.props.onSuccess(nextProps.passwordRecover.userId);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.passwordRecover.status === _passwordRecover.GENERIC_ERROR_STATUS) {
        prevProps.clear();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.clear();
    }
  }, {
    key: '_getUsernameErrorText',
    value: function _getUsernameErrorText(styles) {
      return (0, _jsx3.default)('p', {
        style: styles.passwordErrorText
      }, void 0, 'Please enter a valid username or email address.', (0, _jsx3.default)(_reportProblem2.default, {
        style: styles.passwordErrorIcon,
        color: this.muiTheme.textField.errorColor
      }));
    }
  }, {
    key: '_showGenericError',
    value: function _showGenericError(status) {
      if (status === _passwordRecover.GENERIC_ERROR_STATUS) {
        return _ref;
      }
    }
  }, {
    key: '_checkRecoverEnabled',
    value: function _checkRecoverEnabled() {
      var passwordRecover = this.props.passwordRecover;
      var userId = this.state.userId;

      return userId.length && passwordRecover.status !== _passwordRecover.PASSWORD_RECOVERING_STATUS;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onCancel = _props.onCancel,
          passwordRecover = _props.passwordRecover,
          primaryHeader = _props.primaryHeader,
          secondaryHeader = _props.secondaryHeader;
      var userId = this.state.userId;


      var styles = getStyles(this.props, this.muiTheme);

      var containerStyle = (0, _extends3.default)({}, styles.container, this.props.style);

      var errorStatus = passwordRecover.status === _passwordRecover.PASSWORD_RECOVER_INVALID_USERNAME_STATUS;

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
        value: userId,
        onChange: this._setUsername,
        hintText: 'Username or Email address',
        underlineStyle: errorStatus ? styles.usernameTextFieldError : null,
        errorText: errorStatus ? this._getUsernameErrorText(styles) : null,
        floatingLabelText: 'Username or Email address'
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
        onTouchTap: this._recover,
        disabled: !this._checkRecoverEnabled,
        primary: true,
        label: 'Reset'
      })))), this._showGenericError(passwordRecover.status));
    }
  }]);
  return PasswordRecover;
}(_SICKComponent3.default);

PasswordRecover.propTypes = {
  styles: _propTypes2.default.object,
  onCancel: _propTypes2.default.func,
  onPasswordTipsClicked: _propTypes2.default.func,
  onSuccess: _propTypes2.default.func,
  recover: _propTypes2.default.func.isRequired,
  clear: _propTypes2.default.func.isRequired,
  passwordRecover: _propTypes2.default.object.isRequired,
  primaryHeader: _propTypes2.default.string,
  secondaryHeader: _propTypes2.default.string
};
PasswordRecover.defaultProps = {
  onCancel: _defaults.NOOP,
  onPasswordTipsClicked: _defaults.NOOP,
  onSuccess: _defaults.NOOP,
  primaryHeader: 'Forgot your password?',
  secondaryHeader: 'Enter your username or email below to reset your password'
};
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, _passwordRecover.actions)(PasswordRecover);
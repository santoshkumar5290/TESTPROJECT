'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Login = undefined;

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

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _GridList = require('material-ui/GridList');

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _GenericError = require('../Global/GenericError');

var _GenericError2 = _interopRequireDefault(_GenericError);

var _reportProblem = require('material-ui/svg-icons/action/report-problem');

var _reportProblem2 = _interopRequireDefault(_reportProblem);

var _A = require('../Global/A');

var _A2 = _interopRequireDefault(_A);

var _colorManipulator = require('material-ui/utils/colorManipulator');

var _auth = require('../../ducks/auth');

var _userSettings = require('../../ducks/userSettings');

var _defaults = require('../../utils/defaults');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Helpers
// ------------------------------------


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
    loginTopWrapper: {
      margin: 'auto',
      marginBottom: 0
    },
    loginMiddleWrapper: {
      marginTop: 30
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
    forgotPassword: {
      textAlign: 'right',
      fontSize: 14,
      lineHeight: '21px'
    },
    rememberMeStyle: {
      fontSize: 14
    },
    actionWrapper: {
      textAlign: 'center',
      fontSize: 14
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

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth,
    config: state.config,
    userSettings: state.userSettings['auth'] || _defaults.DEFAULT_EMPTY_OBJECT
  };
};

/* eslint-disable */
/**
 * Login widget
 * 
 * @private
 * 
 * **Available properties:**
 *
 * | Property               | Type     | Description                                                             | Allowed values   | Default Value                           | Required |
 * |------------------------|----------|-------------------------------------------------------------------------|------------------|-----------------------------------------|----------|
 * | `primaryHeader`        | `String` | The widget main header                                                  | string           | 'Welcome'                               | NO       |
 * | `secondaryHeader`      | `String` | The widget secondary header                                             | string           | 'Please login to access your dashboard' | NO       |
 * | `onForgetPassword`     | `String` | Callback to be called when user clicks on the Forget Password link      | function         |                                         | YES      |
 * | `onSignUpClicked`      | `String` | Callback to be called when user clicks on the Sign Up link              | function         |                                         | NO       |
 * | `onSuccess`            | `String` | Callback to be called when user is successfully logged in               | function         |                                         | NO       |
 * | `style`                | `Object` | Custom style for the widget                                             | object           |                                         | NO       |
 *
 * @example
 * const login = SICKPlatform.Login.init(document.createElement('div'), {
 *   primaryHeader: 'Welcome to SICK',
 *   secondaryHeader: 'Small text below welcome',
 *   style: {
 *     width: 280
 *   },
 *   onSignUpClicked: function () {
 *     window.location.href = '#sign-up'
 *   },
 *   onForgetPassword: function () {
 *     window.location.href = '#forget-password'
 *   },
 *   onSuccess: function () {
 *     window.location.href = '#dashboard'
 *   },
 * })
 * login.update({ primaryHeader: 'Updated Header' })
 * login.destroy()
 *
 * @example
 * render() {
 *   return (
 *     <div>
 *       <Login
 *         primaryHeader='Welcome to SICK'
 *         secondaryHeader='Small text below welcome'
 *         onSignUpClicked={() => window.location.href = '#sign-up'}
 *         onForgetPassword={() => window.location.href = '#forget-password'}
 *         onSuccess={() => window.location.href = '#dashboard'}
 *         style={{ width: 280 }}
 *       />
 *     </div>
 *   )
 * }
 */
/* eslint-enable */

var _ref = (0, _jsx3.default)(_GenericError2.default, {
  open: true,
  title: 'Login',
  message: 'Something went wrong'
});

var _ref2 = (0, _jsx3.default)('br', {});

var Login = exports.Login = function (_SICKComponent) {
  (0, _inherits3.default)(Login, _SICKComponent);

  function Login(props, context) {
    (0, _classCallCheck3.default)(this, Login);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Login.__proto__ || (0, _getPrototypeOf2.default)(Login)).call(this, props, context));

    _this._login = function () {
      var _this$state = _this.state,
          userId = _this$state.userId,
          password = _this$state.password,
          rememberMe = _this$state.rememberMe;
      var _this$props = _this.props,
          login = _this$props.login,
          config = _this$props.config;

      var url = config.authentication && config.authentication.url;

      login(url, userId, password, rememberMe);
    };

    _this._handleEnterKey = function (e) {
      if (e.key === 'Enter' && _this._checkSignInEnabled()) {
        _this._login();
      }
    };

    _this._setUsername = function (e) {
      _this.setState({
        userId: e.target.value.trim()
      });
    };

    _this._setPassword = function (e) {
      _this.setState({
        password: e.target.value
      });
    };

    _this._checkRememberMe = function (e, isInputChecked) {
      if (isInputChecked) {
        _this.props.updateUserSettings(_auth.AUTH_SETTINGS_KEY, { 'rememberMe': isInputChecked });
      } else {
        _this.props.updateUserSettings(_auth.AUTH_SETTINGS_KEY, { 'rememberMe': isInputChecked, 'username': '' });
      }
      _this.setState({ 'rememberMe': isInputChecked });
    };

    _this.state = {
      userId: '',
      password: '',
      rememberMe: true
    };
    return _this;
  }

  (0, _createClass3.default)(Login, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.auth.status === _auth.LOGGED_IN_STATUS) {
        this.props.onSuccess(nextProps.auth.userId);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.auth.status === _auth.LOGGED_IN_STATUS && this.state.rememberMe) {
        var update = { 'rememberMe': this.state.rememberMe, 'username': this.state.userId };
        this.props.updateUserSettings(_auth.AUTH_SETTINGS_KEY, update);
      }
      if (prevProps.auth.status === _auth.GENERIC_ERROR_STATUS) {
        prevProps.clear();
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var userSettings = this.props.userSettings;

      if (userSettings && userSettings.rememberMe !== undefined) {
        var username = userSettings.username,
            rememberMe = userSettings.rememberMe;

        if (rememberMe && username) {
          this.setState({ 'rememberMe': rememberMe, 'userId': username });
        } else if (!rememberMe) {
          this.setState({ 'rememberMe': rememberMe, 'userId': '' });
        }
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
      }, void 0, 'Username or password is incorrect', (0, _jsx3.default)(_reportProblem2.default, {
        style: styles.passwordErrorIcon,
        color: this.muiTheme.textField.errorColor
      }));
    }
  }, {
    key: '_showGenericError',
    value: function _showGenericError(status) {
      if (status === _auth.GENERIC_ERROR_STATUS) {
        return _ref;
      }
    }
  }, {
    key: '_checkSignInEnabled',
    value: function _checkSignInEnabled() {
      var _state = this.state,
          userId = _state.userId,
          password = _state.password;
      var auth = this.props.auth;

      return userId.length && password.length && auth.status !== _auth.LOGGING_IN_STATUS;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onSignUpClicked = _props.onSignUpClicked,
          onForgetPassword = _props.onForgetPassword,
          auth = _props.auth,
          primaryHeader = _props.primaryHeader,
          secondaryHeader = _props.secondaryHeader;
      var _state2 = this.state,
          userId = _state2.userId,
          password = _state2.password,
          rememberMe = _state2.rememberMe;


      var styles = getStyles(this.props, this.muiTheme);

      var containerStyle = (0, _extends3.default)({}, styles.container, this.props.style);

      return (0, _jsx3.default)(_Paper2.default, {
        style: containerStyle
      }, void 0, (0, _jsx3.default)('div', {
        style: styles.loginTopWrapper,
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
        hintText: userId.length === 0 ? 'Username or Email address' : '',
        underlineStyle: auth.status === _auth.WRONG_CREDS_STATUS ? styles.usernameTextFieldError : null,
        floatingLabelText: 'Username or Email address'
      }), _ref2, (0, _jsx3.default)(_TextField2.default, {
        style: styles.textField,
        value: password,
        onChange: this._setPassword,
        type: 'password',
        hintText: password.length === 0 ? 'Password' : '',
        errorText: auth.status === _auth.WRONG_CREDS_STATUS ? this._getPasswordErrorText(styles) : null,
        floatingLabelText: 'Password'
      })), (0, _jsx3.default)(_GridList.GridList, {
        cellHeight: 55,
        style: styles.loginMiddleWrapper
      }, void 0, (0, _jsx3.default)(_GridList.GridTile, {}, void 0, (0, _jsx3.default)(_Checkbox2.default, {
        iconStyle: { marginRight: 3 },
        labelStyle: styles.rememberMeStyle,
        label: 'Remember Me',
        checked: rememberMe,
        onCheck: this._checkRememberMe
      })), (0, _jsx3.default)(_GridList.GridTile, {
        style: { textAlign: 'right' }
      }, void 0, (0, _jsx3.default)(_A2.default, {
        style: styles.forgotPassword,
        href: '#',
        onTouchTap: onForgetPassword
      }, void 0, 'Forgot password?'))), (0, _jsx3.default)('div', {
        style: styles.actionWrapper
      }, void 0, (0, _jsx3.default)(_RaisedButton2.default, {
        onTouchTap: this._login,
        disabled: !this._checkSignInEnabled(),
        primary: true,
        label: 'SIGN IN'
      }), (0, _jsx3.default)('p', {}, void 0, 'Don\'t have an account? ', (0, _jsx3.default)(_A2.default, {
        href: '#',
        onTouchTap: onSignUpClicked,
        style: styles.leftButton
      }, void 0, 'Sign Up'))), this._showGenericError(auth.status));
    }
  }]);
  return Login;
}(_SICKComponent3.default);

Login.propTypes = {
  styles: _propTypes2.default.object,
  onSignUpClicked: _propTypes2.default.func,
  onForgetPassword: _propTypes2.default.func,
  onSuccess: _propTypes2.default.func,
  login: _propTypes2.default.func.isRequired,
  clear: _propTypes2.default.func.isRequired,
  auth: _propTypes2.default.object.isRequired,
  primaryHeader: _propTypes2.default.string,
  secondaryHeader: _propTypes2.default.string,
  userSettings: _propTypes2.default.object.isRequired
};
Login.defaultProps = {
  onSignUpClicked: _defaults.NOOP,
  onForgetPassword: _defaults.NOOP,
  onSuccess: _defaults.NOOP,
  primaryHeader: 'Welcome',
  secondaryHeader: 'Please login to access your dashboard'
};
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, (0, _extends3.default)({}, _auth.actions, { updateUserSettings: _userSettings.updateUserSettings }))(Login);
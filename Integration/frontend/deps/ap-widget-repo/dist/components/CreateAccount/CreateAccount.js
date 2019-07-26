'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAccount = undefined;

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

var _userAccount = require('../../ducks/userAccount');

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
    accountCreateTopWrapper: {
      margin: 'auto',
      marginBottom: 30
    },
    accountCreateMiddleWrapper: {
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


// ------------------------------------
// Components
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    account: state.account,
    config: state.config
  };
};

/* eslint-disable */
/**
 * User creation widget
 *
 * @private
 *   
 * **Available properties:**
 *
 * | Property               | Type     | Description                                                             | Allowed values   | Default Value                                     | Required |
 * |------------------------|----------|-------------------------------------------------------------------------|------------------|---------------------------------------------------|----------|
 * | `primaryHeader`        | `String` | The widget main header                                                  | string           | 'Create Account'                                  | NO       |
 * | `secondaryHeader`      | `String` | The widget secondary header                                             | string           | 'To access your dashboard you'll need an account' | NO       |
 * | `onCancel`             | `String` | Callback to be called when user clicks on Cancel button                 | function         |                                                   | NO       |
 * | `onSuccess`            | `String` | Callback to be called when user account is successfully created         | function         |                                                   | NO       |
 * | `style`                | `Object` | Custom style for the widget                                             | object           |                                                   | NO       |
 *
 * @example
 * const create = SICKPlatform.CreateAccount.init(document.createElement('div'), {
 *   primaryHeader: 'Create Account',
 *   secondaryHeader: 'To access your dashboard you'll need an account',
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
 *       <CreateAccount
 *         primaryHeader='Create Account'
 *         secondaryHeader='To access your dashboard you'll need an account'
 *         onCancel={() => window.location.href = '#login'}
 *         onSuccess={() => window.location.href = '#login'}
 *         style={{ width: 280 }}
 *       />
 *     </div>
 *   )
 * }
 */
/* eslint quotes: ["error", "single", {"allowTemplateLiterals": true}] */
/* eslint-enable */

var _ref = (0, _jsx3.default)(_GenericError2.default, {
  open: true,
  title: 'Create Account',
  message: 'Something went wrong'
});

var _ref2 = (0, _jsx3.default)('br', {});

var _ref3 = (0, _jsx3.default)(_PasswordTips2.default, {});

var CreateAccount = exports.CreateAccount = function (_SICKComponent) {
  (0, _inherits3.default)(CreateAccount, _SICKComponent);

  function CreateAccount(props, context) {
    (0, _classCallCheck3.default)(this, CreateAccount);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CreateAccount.__proto__ || (0, _getPrototypeOf2.default)(CreateAccount)).call(this, props, context));

    _this._create = function () {
      var _this$state = _this.state,
          userId = _this$state.userId,
          password1 = _this$state.password1,
          password2 = _this$state.password2;
      var _this$props = _this.props,
          create = _this$props.create,
          config = _this$props.config;

      var url = config.authentication && config.authentication.url;

      create(url, userId, password1, password2);
    };

    _this._handleEnterKey = function (e) {
      if (e.key === 'Enter') {
        var errors = _this._validateFields();
        if (_this._checkCreateEnabled(errors)) {
          _this._create();
        }
      }
    };

    _this._setUsername = function (e) {
      _this.setState({
        userId: e.target.value.trim()
      });
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
      userId: '',
      password1: '',
      password2: ''
    };
    return _this;
  }

  (0, _createClass3.default)(CreateAccount, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.account.status === _userAccount.ACCOUNT_CREATED_STATUS) {
        this.props.onSuccess(nextProps.account.userId);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.account.status === _userAccount.GENERIC_ERROR_STATUS) {
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
      if (status === _userAccount.GENERIC_ERROR_STATUS) {
        return _ref;
      }
    }
  }, {
    key: '_validateFields',
    value: function _validateFields() {
      var account = this.props.account;

      var status = account && account.status;
      var _state = this.state,
          userId = _state.userId,
          password1 = _state.password1,
          password2 = _state.password2;


      var errors = [];

      if (userId.length && !(0, _validations.validateUsername)(userId)) {
        errors.push(_userAccount.INVALID_USERNAME);
      }

      if (password1.length && !(0, _validations.validatePassword)(password1)) {
        errors.push(_userAccount.INVALID_PASSWORD);
      }

      if (password1 !== password2) {
        errors.push(_userAccount.INVALID_PASSWORD_MATCH);
      }

      if (status === _userAccount.ACCOUNT_INVALID_STATUS) {
        errors.push(_userAccount.INVALID_USERNAME);
      }

      return errors;
    }
  }, {
    key: '_checkCreateEnabled',
    value: function _checkCreateEnabled(errors) {
      var account = this.props.account;
      var _state2 = this.state,
          userId = _state2.userId,
          password1 = _state2.password1,
          password2 = _state2.password2;

      var fieldLengths = userId.length && password1.length && password2.length;
      return errors.length === 0 && fieldLengths && account.status !== _userAccount.ACCOUNT_CREATING_STATUS;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onCancel = _props.onCancel,
          account = _props.account,
          primaryHeader = _props.primaryHeader,
          secondaryHeader = _props.secondaryHeader;
      var _state3 = this.state,
          userId = _state3.userId,
          password1 = _state3.password1,
          password2 = _state3.password2;


      var styles = getStyles(this.props, this.muiTheme);

      var containerStyle = (0, _extends3.default)({}, styles.container, this.props.style);

      var errors = this._validateFields();

      return (0, _jsx3.default)(_Paper2.default, {
        style: containerStyle
      }, void 0, (0, _jsx3.default)('div', {
        style: styles.accountCreateTopWrapper,
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
        underlineStyle: errors.indexOf(_userAccount.INVALID_USERNAME) !== -1 ? styles.usernameTextFieldError : null,
        errorText: errors.indexOf(_userAccount.INVALID_USERNAME) !== -1 ? this._getUsernameErrorText(styles) : null,
        floatingLabelText: 'Username or Email address'
      }), _ref2, (0, _jsx3.default)(_TextField2.default, {
        style: styles.textField,
        value: password1,
        onChange: this._setPassword1,
        type: 'password',
        hintText: 'Password',
        errorText: errors.indexOf(_userAccount.INVALID_PASSWORD) !== -1 ? this._getPasswordErrorText(styles) : null,
        floatingLabelText: 'Password'
      }), _ref3, (0, _jsx3.default)(_TextField2.default, {
        style: styles.textField,
        value: password2,
        onChange: this._setPassword2,
        type: 'password',
        hintText: 'Repeat Password',
        errorText: errors.indexOf(_userAccount.INVALID_PASSWORD_MATCH) !== -1 ? this._getNotMatchPasswordErrorText(styles) : null,
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
        onTouchTap: this._create,
        primary: true,
        label: 'Create Account',
        disabled: !this._checkCreateEnabled(errors)
      })))), this._showGenericError(account.status));
    }
  }]);
  return CreateAccount;
}(_SICKComponent3.default);

CreateAccount.propTypes = {
  styles: _propTypes2.default.object,
  onCancel: _propTypes2.default.func,
  onPasswordTipsClicked: _propTypes2.default.func,
  onSuccess: _propTypes2.default.func,
  create: _propTypes2.default.func.isRequired,
  clear: _propTypes2.default.func.isRequired,
  account: _propTypes2.default.object.isRequired,
  primaryHeader: _propTypes2.default.string,
  secondaryHeader: _propTypes2.default.string
};
CreateAccount.defaultProps = {
  onCancel: _defaults.NOOP,
  onPasswordTipsClicked: _defaults.NOOP,
  onSuccess: _defaults.NOOP,
  primaryHeader: 'Create Account',
  secondaryHeader: 'To access your dashboard you\'ll need an account'
};
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, _userAccount.actions)(CreateAccount);
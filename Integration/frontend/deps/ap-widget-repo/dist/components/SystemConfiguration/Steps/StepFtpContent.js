'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepFtpContent = undefined;

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

var _SICKPlatform = require('../../../SICKPlatform');

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _visibility = require('material-ui/svg-icons/action/visibility');

var _visibility2 = _interopRequireDefault(_visibility);

var _A = require('../../Global/A');

var _A2 = _interopRequireDefault(_A);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Helpers
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {};
};

/** @private */


// ------------------------------------
// Components
// ------------------------------------

var StepFtpContent = exports.StepFtpContent = function (_React$Component) {
  (0, _inherits3.default)(StepFtpContent, _React$Component);

  /** @ignore */
  function StepFtpContent(props, context) {
    (0, _classCallCheck3.default)(this, StepFtpContent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (StepFtpContent.__proto__ || (0, _getPrototypeOf2.default)(StepFtpContent)).call(this, props, context));

    _this.state = {
      username: _this.props.value.username,
      password: _this.props.value.password,
      showPassword: false

      /** @private */
    };_this._setUsername = _this._setUsername.bind(_this);
    _this._setPassword = _this._setPassword.bind(_this);
    _this._handleNext = _this._handleNext.bind(_this);
    _this._handlePrev = _this._handlePrev.bind(_this);
    _this._showPassword = _this._showPassword.bind(_this);
    _this._hidePassword = _this._hidePassword.bind(_this);
    return _this;
  }

  /* updates the username value */


  /** @ignore */


  (0, _createClass3.default)(StepFtpContent, [{
    key: '_setUsername',
    value: function _setUsername(e) {
      var value = this.props.value;

      value.username = e.target.value.trim();
      this.setState({ username: value.username });
      this.props.onChange('ftpInformation', value, true);
    }

    /* updates the password value */

  }, {
    key: '_setPassword',
    value: function _setPassword(e) {
      var value = this.props.value;

      value.password = e.target.value.trim();
      this.setState({ password: value.password });
      this.props.onChange('ftpInformation', value, true);
    }

    /* validates the field value */

  }, {
    key: '_validate',
    value: function _validate(value) {
      if (value.length > 0) {
        return this._validateUsername(value.username) && this._validatePassword(value.password);
      }
      return true;
    }

    /* no validation rules are defined for username */

  }, {
    key: '_validateUsername',
    value: function _validateUsername(username) {
      return true;
    }

    /* no validation rules are defined for password */

  }, {
    key: '_validatePassword',
    value: function _validatePassword(username) {
      return true;
    }

    /* moves to the next step using the parent component function */

  }, {
    key: '_handleNext',
    value: function _handleNext() {
      var value = this.props.value;

      if (!this._validate(value)) {
        this.props.onChange('ftpInformation', value, false);
      }
      this.props.onNext();
    }

    /* moves to the previous step using the parent component function */

  }, {
    key: '_handlePrev',
    value: function _handlePrev() {
      var value = this.props.value;

      if (!this._validate(value)) {
        this.props.onChange('ftpInformation', value, false);
      }
      this.props.onPrev();
    }

    /* turn the password field value visible */

  }, {
    key: '_showPassword',
    value: function _showPassword() {
      this.setState({ showPassword: true });
    }

    /* turn the password field value hidden (asterisks) */

  }, {
    key: '_hidePassword',
    value: function _hidePassword() {
      this.setState({ showPassword: false });
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          showPassword = _state.showPassword,
          username = _state.username,
          password = _state.password;
      var styles = this.props.styles;


      return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {
        style: styles.stepDescription
      }, void 0, 'For each device that you wish to add to the configuration, enter the FTP login credentials below. If the device is not capable of FTP communication, you can skip this step.'), (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)(_TextField2.default, {
        name: 'device-ftp-username',
        style: styles.textField,
        value: username,
        onChange: this._setUsername,
        hintText: username.length === 0 ? 'FTP Username' : '',
        floatingLabelText: 'FTP Username'
      })), (0, _jsx3.default)('div', {
        style: { position: 'relative' }
      }, void 0, (0, _jsx3.default)(_TextField2.default, {
        name: 'device-ftp-password',
        style: styles.textField,
        value: password,
        onChange: this._setPassword,
        type: showPassword ? 'text' : 'password',
        hintText: password.length === 0 ? 'FTP Password' : '',
        floatingLabelText: 'FTP Password'
      }), (0, _jsx3.default)(_A2.default, {
        href: '#',
        onMouseDown: this._showPassword,
        onMouseUp: this._hidePassword,
        style: styles.passwordLink
      }, void 0, (0, _jsx3.default)(_visibility2.default, {
        style: styles.passwordIcon,
        color: styles.iconColor
      })))), (0, _jsx3.default)('div', {
        style: styles.actionButtons
      }, void 0, (0, _jsx3.default)(_RaisedButton2.default, {
        name: 'step-ftp-next',
        label: 'Next',
        disableTouchRipple: true,
        disableFocusRipple: true,
        primary: true,
        onTouchTap: this._handleNext,
        style: styles.buttonNext
      }), (0, _jsx3.default)(_FlatButton2.default, {
        name: 'step-ftp-back',
        label: 'Back',
        disableTouchRipple: true,
        disableFocusRipple: true,
        style: styles.buttonBack,
        onTouchTap: this._handlePrev
      })));
    }
  }]);
  return StepFtpContent;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps)(StepFtpContent);
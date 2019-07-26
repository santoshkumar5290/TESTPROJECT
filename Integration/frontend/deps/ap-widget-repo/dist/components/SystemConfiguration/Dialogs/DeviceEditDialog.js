'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _parseInt = require('babel-runtime/core-js/number/parse-int');

var _parseInt2 = _interopRequireDefault(_parseInt);

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

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _visibility = require('material-ui/svg-icons/action/visibility');

var _visibility2 = _interopRequireDefault(_visibility);

var _info = require('material-ui/svg-icons/action/info');

var _info2 = _interopRequireDefault(_info);

var _A = require('../../Global/A');

var _A2 = _interopRequireDefault(_A);

var _SICKMuiTheme = require('../../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Helpers
// ------------------------------------

var styles = {
  container: {
    maxWidth: 350
  },
  header: {
    paddingBottom: 0
  },
  deviceName: {
    margin: 0,
    textTransform: 'uppercase',
    marginBottom: 10
  },
  textField: {
    marginTop: 0,
    width: 256
  },
  textFieldError: {
    borderColor: _SICKMuiTheme2.default.textField.errorColor
  },
  errorText: {
    marginTop: 0,
    marginBottom: -30
  },
  errorIcon: {
    float: 'right',
    height: 16,
    width: 16
  },
  passwordLink: {
    position: 'absolute',
    left: 256,
    top: 36
  },
  passwordIcon: {
    height: 22,
    width: 22
  },
  iconColor: _SICKMuiTheme2.default.palette.iconColor,
  actionButtons: {
    margin: '6px 0'
  },
  informationLink: {
    position: 'absolute',
    left: 256,
    top: 36
  },
  informationIpLink: {
    position: 'absolute',
    left: 256,
    top: 36
  },
  ipAddressContainer: {
    marginTop: 20,
    position: 'relative'
  },
  ipAddressField: {
    width: 40,
    height: 36,
    marginLeft: 4,
    marginRight: 4,
    textAlign: 'center'
  }

  /**
   * Component for editing device information.
   *
   * @private
   */
};

// ------------------------------------
// Components
// ------------------------------------

var _ref = (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {}, void 0, 'The Device Name is defined in SOPAS ET in the following section:'), (0, _jsx3.default)('p', {}, void 0, 'Parameter > Network / Interface / IOs > Network Options'));

var _ref2 = (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {}, void 0, 'If the device you\'re trying to add is configured with a static ip address you can enter it here. If your device is configured to use DHCP or is not on a network, this fields can be left blank.'));

var _ref3 = (0, _jsx3.default)('p', {}, void 0, 'IP Address');

var _ref4 = (0, _jsx3.default)('span', {}, void 0, '.');

var _ref5 = (0, _jsx3.default)('span', {}, void 0, '.');

var _ref6 = (0, _jsx3.default)('span', {}, void 0, '.');

var DeviceEditDialog = function (_React$Component) {
  (0, _inherits3.default)(DeviceEditDialog, _React$Component);

  /** @ignore */
  function DeviceEditDialog(props, context) {
    (0, _classCallCheck3.default)(this, DeviceEditDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DeviceEditDialog.__proto__ || (0, _getPrototypeOf2.default)(DeviceEditDialog)).call(this, props, context));

    _initialiseProps.call(_this);

    var device = _this.props.device;

    _this.state = {
      label: device && device.label || '',
      username: device && device.ftpInformation && device.ftpInformation.username || '',
      password: device && device.ftpInformation && device.ftpInformation.password || '',
      ipAddress: device && device.ipAddress || '',
      showPassword: false

      /** @private */
    };_this._handleSave = _this._handleSave.bind(_this);
    _this._handleCancel = _this._handleCancel.bind(_this);
    _this._showPassword = _this._showPassword.bind(_this);
    _this._hidePassword = _this._hidePassword.bind(_this);
    _this._setUsername = _this._setUsername.bind(_this);
    _this._setPassword = _this._setPassword.bind(_this);
    _this._validateIpAddress = _this._validateIpAddress.bind(_this);
    _this._handleChangeIpAddress = _this._handleChangeIpAddress.bind(_this);
    _this._handleChangeLabel = _this._handleChangeLabel.bind(_this);
    _this._handleLabelInfoMessage = _this._handleLabelInfoMessage.bind(_this);
    _this._handleIpInfoMessage = _this._handleIpInfoMessage.bind(_this);
    return _this;
  }

  /* sets the new label value */


  /** @ignore */


  (0, _createClass3.default)(DeviceEditDialog, [{
    key: '_handleChangeLabel',
    value: function _handleChangeLabel(e) {
      if (this._validateLabel(e.target.value)) {
        this.setState({
          label: e.target.value
        });
      }
    }

    /* validates the label value */

  }, {
    key: '_validateLabel',
    value: function _validateLabel(value) {
      return (/^([a-z\d\s]){0,256}$/i.test(value)
      );
    }

    /* saves a device */


    /* cancels the edit */

  }, {
    key: '_showPassword',


    /* turn the password field value visible */
    value: function _showPassword() {
      this.setState({ showPassword: true });
    }

    /* turn the password field value hidden (asterisks) */

  }, {
    key: '_hidePassword',
    value: function _hidePassword() {
      this.setState({ showPassword: false });
    }

    /* updates the username value */

  }, {
    key: '_setUsername',
    value: function _setUsername(e) {
      this.setState({ username: e.target.value.trim() });
    }

    /* updates the password value */

  }, {
    key: '_setPassword',
    value: function _setPassword(e) {
      this.setState({ password: e.target.value.trim() });
    }

    /* updates and validates the ip addres */

  }, {
    key: '_handleChangeIpAddress',
    value: function _handleChangeIpAddress(e) {
      var index = (0, _parseInt2.default)(e.target.name.replace('ip-section-', '')) - 1;
      var field = e.target.value.trim();

      var value = this.state.ipAddress;
      var sections = value && value.split('.') || ['', '', '', ''];

      if (field.length === 0 || this._validateIpField(field)) {
        sections[index] = field;
      }

      this.setState({
        ipAddress: sections.join('.')
      });

      if ((field.length === 3 || field.indexOf('.') > -1) && index < 3) {
        index = index + 2;
        document.getElementsByName('ip-section-' + index)[0].focus();
      }
    }

    /* validates an ip section */

  }, {
    key: '_validateIpField',
    value: function _validateIpField(value) {
      return (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)
      );
    }

    /* validates a complete ip address */

  }, {
    key: '_validateIpAddress',
    value: function _validateIpAddress(sections) {
      /* Ipaddress is valid if all sections are valid or all sections are empty */
      return sections.join('').length === 0 || this._validateIpField(sections[0]) && this._validateIpField(sections[1]) && this._validateIpField(sections[2]) && this._validateIpField(sections[3]);
    }

    /** renders the label field information message */

  }, {
    key: '_handleLabelInfoMessage',
    value: function _handleLabelInfoMessage() {
      var message = _ref;
      this.props.onInfoOpen('Device Name', message);
    }

    /** renders the ip address field information message */

  }, {
    key: '_handleIpInfoMessage',
    value: function _handleIpInfoMessage() {
      var message = _ref2;
      this.props.onInfoOpen('IP Address', message);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          open = _props.open,
          device = _props.device;
      var _state = this.state,
          showPassword = _state.showPassword,
          label = _state.label,
          username = _state.username,
          password = _state.password,
          ipAddress = _state.ipAddress;


      var actions = [(0, _jsx3.default)(_FlatButton2.default, {
        label: 'Save',
        primary: true,
        onTouchTap: this._handleSave
      }), (0, _jsx3.default)(_FlatButton2.default, {
        label: 'Cancel',
        onTouchTap: this._handleCancel
      })];

      var ipSections = ipAddress && ipAddress.split('.') || ['', '', '', ''];
      var validIp = this._validateIpAddress(ipSections);

      return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)(_Dialog2.default, {
        title: 'Edit Device Details',
        actions: actions,
        modal: true,
        contentStyle: styles.container,
        titleStyle: styles.header,
        open: open
      }, void 0, (0, _jsx3.default)('p', {
        style: styles.deviceName
      }, void 0, device.name), (0, _jsx3.default)('div', {
        style: { position: 'relative' }
      }, void 0, (0, _jsx3.default)(_TextField2.default, {
        name: 'device-label',
        style: styles.textField,
        floatingLabelText: 'Device Label',
        value: label,
        onChange: this._handleChangeLabel
      }), (0, _jsx3.default)(_A2.default, {
        href: '#',
        onTouchTap: this._handleLabelInfoMessage,
        style: styles.informationLink
      }, void 0, (0, _jsx3.default)(_info2.default, {
        style: styles.informationIcon,
        color: styles.iconColor
      }))), (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)(_TextField2.default, {
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
      }))), (0, _jsx3.default)('div', {
        style: styles.ipAddressContainer
      }, void 0, _ref3, (0, _jsx3.default)(_TextField2.default, {
        name: 'ip-section-1',
        style: styles.ipAddressField,
        inputStyle: { textAlign: 'center' },
        value: ipSections[0],
        onChange: this._handleChangeIpAddress,
        underlineStyle: !validIp ? styles.textFieldError : null
      }), _ref4, (0, _jsx3.default)(_TextField2.default, {
        name: 'ip-section-2',
        style: styles.ipAddressField,
        inputStyle: { textAlign: 'center' },
        value: ipSections[1],
        onChange: this._handleChangeIpAddress,
        underlineStyle: !validIp ? styles.textFieldError : null
      }), _ref5, (0, _jsx3.default)(_TextField2.default, {
        name: 'ip-section-3',
        style: styles.ipAddressField,
        inputStyle: { textAlign: 'center' },
        value: ipSections[2],
        onChange: this._handleChangeIpAddress,
        underlineStyle: !validIp ? styles.textFieldError : null
      }), _ref6, (0, _jsx3.default)(_TextField2.default, {
        name: 'ip-section-4',
        style: styles.ipAddressField,
        inputStyle: { textAlign: 'center' },
        value: ipSections[3],
        onChange: this._handleChangeIpAddress,
        underlineStyle: !validIp ? styles.textFieldError : null
      }), (0, _jsx3.default)(_A2.default, {
        href: '#',
        onTouchTap: this._handleIpInfoMessage,
        style: styles.informationIpLink
      }, void 0, (0, _jsx3.default)(_info2.default, {
        style: styles.informationIcon,
        color: styles.iconColor
      })))));
    }
  }]);
  return DeviceEditDialog;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._handleSave = function () {
    var device = _this2.props.device;
    var _state2 = _this2.state,
        label = _state2.label,
        username = _state2.username,
        password = _state2.password,
        ipAddress = _state2.ipAddress;

    var ipSections = ipAddress.split('.');
    device.label = label;
    device.ftpInformation.username = username;
    device.ftpInformation.password = password;
    device.ipAddress = ipSections[0].length > 0 ? ipAddress : '';
    _this2.props.onSave(device);
  };

  this._handleCancel = function () {
    _this2.props.onCancel();
  };
};

exports.default = DeviceEditDialog;
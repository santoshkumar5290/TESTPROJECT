'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepIpContent = undefined;

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

var _SICKPlatform = require('../../../SICKPlatform');

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _info = require('material-ui/svg-icons/action/info');

var _info2 = _interopRequireDefault(_info);

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

var _ref = (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {}, void 0, 'If the device you\'re trying to add is configured with a static ip address you can enter it here. If your device is configured to use DHCP or is not on a network, this fields can be left blank.'));

var _ref2 = (0, _jsx3.default)('span', {}, void 0, '.');

var _ref3 = (0, _jsx3.default)('span', {}, void 0, '.');

var _ref4 = (0, _jsx3.default)('span', {}, void 0, '.');

var StepIpContent = exports.StepIpContent = function (_React$Component) {
  (0, _inherits3.default)(StepIpContent, _React$Component);

  /** @ignore */
  function StepIpContent(props, context) {
    (0, _classCallCheck3.default)(this, StepIpContent);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (StepIpContent.__proto__ || (0, _getPrototypeOf2.default)(StepIpContent)).call(this, props, context));

    _this._handleChangeField = _this._handleChangeField.bind(_this);
    _this._handleNext = _this._handleNext.bind(_this);
    _this._handlePrev = _this._handlePrev.bind(_this);
    _this._validateIpAddress = _this._validateIpAddress.bind(_this);
    _this._handleInfoMessage = _this._handleInfoMessage.bind(_this);
    return _this;
  }

  /* updates and validates the ip addres */


  /** @ignore */


  (0, _createClass3.default)(StepIpContent, [{
    key: '_handleChangeField',
    value: function _handleChangeField(e) {
      var index = (0, _parseInt2.default)(e.target.name.replace('ip-section-', '')) - 1;
      var field = e.target.value.trim();

      var value = this.props.value;

      var sections = value && value.split('.') || ['', '', '', ''];

      if (field.length === 0 || this._validateIpField(field)) {
        sections[index] = field;
      }

      if (this._validateIpAddress(sections)) {
        this.props.onChange('ipAddress', sections.join('.'), true);
      } else {
        this.props.onChange('ipAddress', sections.join('.'), false);
      }

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

    /* validates a full ip address */

  }, {
    key: '_validateIpAddress',
    value: function _validateIpAddress(sections) {
      /* Ipaddress is valid if all sections are valid or all sections are empty */
      return sections.join('').length === 0 || this._validateIpField(sections[0]) && this._validateIpField(sections[1]) && this._validateIpField(sections[2]) && this._validateIpField(sections[3]);
    }

    /* moves to the next step using the parent component function */

  }, {
    key: '_handleNext',
    value: function _handleNext() {
      var value = this.props.value;

      var sections = value && value.split('.') || ['', '', '', ''];
      if (!this._validateIpAddress(sections)) {
        this.props.onChange('ipAddress', value, false);
      }
      this.props.onNext();
    }

    /* moves to the previous step using the parent component function */

  }, {
    key: '_handlePrev',
    value: function _handlePrev() {
      var value = this.props.value;

      var sections = value && value.split('.') || ['', '', '', ''];
      if (!this._validateIpAddress(sections)) {
        this.props.onChange('ipAddress', value, false);
      }
      this.props.onPrev();
    }

    /* renders the information dialog */

  }, {
    key: '_handleInfoMessage',
    value: function _handleInfoMessage() {
      var message = _ref;
      this.props.onInfoOpen('IP Address', message);
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          styles = _props.styles,
          value = _props.value;


      var ipSections = value && value.split('.') || ['', '', '', ''];
      var validIp = this._validateIpAddress(ipSections);

      return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {
        style: styles.stepDescription
      }, void 0, 'For each device that you wish to add to the configuration, if you know the static IP address of the device you can enter it below.'), (0, _jsx3.default)('div', {
        style: { marginTop: 5, position: 'relative' }
      }, void 0, (0, _jsx3.default)(_TextField2.default, {
        name: 'ip-section-1',
        style: styles.ipAddressField,
        inputStyle: { textAlign: 'center' },
        value: ipSections[0],
        onChange: this._handleChangeField,
        underlineStyle: !validIp ? styles.textFieldError : null
      }), _ref2, (0, _jsx3.default)(_TextField2.default, {
        name: 'ip-section-2',
        style: styles.ipAddressField,
        inputStyle: { textAlign: 'center' },
        value: ipSections[1],
        onChange: this._handleChangeField,
        underlineStyle: !validIp ? styles.textFieldError : null
      }), _ref3, (0, _jsx3.default)(_TextField2.default, {
        name: 'ip-section-3',
        style: styles.ipAddressField,
        inputStyle: { textAlign: 'center' },
        value: ipSections[2],
        onChange: this._handleChangeField,
        underlineStyle: !validIp ? styles.textFieldError : null
      }), _ref4, (0, _jsx3.default)(_TextField2.default, {
        name: 'ip-section-4',
        style: styles.ipAddressField,
        inputStyle: { textAlign: 'center' },
        value: ipSections[3],
        onChange: this._handleChangeField,
        underlineStyle: !validIp ? styles.textFieldError : null
      }), (0, _jsx3.default)(_A2.default, {
        href: '#',
        onTouchTap: this._handleInfoMessage,
        style: styles.informationIpLink
      }, void 0, (0, _jsx3.default)(_info2.default, {
        style: styles.informationIcon,
        color: styles.iconColor
      })))), (0, _jsx3.default)('div', {
        style: styles.actionButtons
      }, void 0, (0, _jsx3.default)(_RaisedButton2.default, {
        name: 'step-ip-next',
        label: 'Next',
        disableTouchRipple: true,
        disableFocusRipple: true,
        primary: true,
        disabled: !validIp,
        onTouchTap: this._handleNext,
        style: styles.buttonNext
      }), (0, _jsx3.default)(_FlatButton2.default, {
        name: 'step-ip-back',
        label: 'Back',
        disableTouchRipple: true,
        disableFocusRipple: true,
        disabled: !validIp,
        style: styles.buttonBack,
        onTouchTap: this._handlePrev
      })));
    }
  }]);
  return StepIpContent;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps)(StepIpContent);
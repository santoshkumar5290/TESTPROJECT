'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepNameContent = undefined;

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

var _SICKMuiTheme = require('../../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

var _reportProblem = require('material-ui/svg-icons/action/report-problem');

var _reportProblem2 = _interopRequireDefault(_reportProblem);

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

var _ref = (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {}, void 0, 'The Device Name is defined in SOPAS ET in the following section:'), (0, _jsx3.default)('p', {}, void 0, 'Parameter > Network / Interface / IOs > Network Options'));

var StepNameContent = exports.StepNameContent = function (_React$Component) {
  (0, _inherits3.default)(StepNameContent, _React$Component);

  /** @ignore */
  function StepNameContent(props, context) {
    (0, _classCallCheck3.default)(this, StepNameContent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (StepNameContent.__proto__ || (0, _getPrototypeOf2.default)(StepNameContent)).call(this, props, context));

    _this.state = {
      warning: false

      /** @private */
    };_this._handleChange = _this._handleChange.bind(_this);
    _this._handleNext = _this._handleNext.bind(_this);
    _this._handlePrev = _this._handlePrev.bind(_this);
    _this._handleInfoMessage = _this._handleInfoMessage.bind(_this);
    return _this;
  }

  /* updates the device name value */


  /** @ignore */


  (0, _createClass3.default)(StepNameContent, [{
    key: '_handleChange',
    value: function _handleChange(e) {
      if (e.target.value.length === 0) {
        this.props.onChange('name', e.target.value, false);
      } else {
        if (this._validate(e.target.value)) {
          this.props.onChange('name', e.target.value, true);
          this.setState({ warning: false });
        } else {
          this.setState({ warning: true });
        }
      }
    }

    /* validates the device name value */

  }, {
    key: '_validate',
    value: function _validate(value) {
      return value.indexOf('_') === -1 && value.length <= 256;
    }

    /* moves to the next step using the parent component function */

  }, {
    key: '_handleNext',
    value: function _handleNext() {
      var value = this.props.value;

      if (value.length === 0 || !this._validate(value)) {
        this.props.onChange('name', value, false);
      }
      this.props.onNext();
    }

    /* moves to the previous step using the parent component function */

  }, {
    key: '_handlePrev',
    value: function _handlePrev() {
      var value = this.props.value;

      if (value.length === 0 || !this._validate(value)) {
        this.props.onChange('name', value, false);
      }
      this.props.onPrev();
    }

    /* renders the error message */

  }, {
    key: '_getErrorText',
    value: function _getErrorText(styles) {
      return (0, _jsx3.default)('p', {
        style: styles.errorText
      }, void 0, 'Device Name is incorrect, please confirm your input.', (0, _jsx3.default)(_reportProblem2.default, {
        style: styles.errorIcon,
        color: _SICKMuiTheme2.default.textField.errorColor
      }));
    }

    /* get the warning message */

  }, {
    key: '_getWarningText',
    value: function _getWarningText(styles) {
      return (0, _jsx3.default)('p', {
        style: styles.errorText
      }, void 0, 'You can\'t use the character _ (underscore).');
    }

    /* renders the information dialog */

  }, {
    key: '_handleInfoMessage',
    value: function _handleInfoMessage() {
      var message = _ref;
      this.props.onInfoOpen('Device Name', message);
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          styles = _props.styles,
          value = _props.value,
          error = _props.error;
      var warning = this.state.warning;

      var errorMessage = null;

      if (warning) {
        errorMessage = this._getWarningText(styles);
      }
      if (error) {
        errorMessage = this._getErrorText(styles);
      }

      return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {
        style: styles.stepDescription
      }, void 0, 'For each device that you wish to add to the configuration, enter the unique device name in the field below. This name needs to match the device name configured in SOPAS ET.'), (0, _jsx3.default)('div', {
        style: { position: 'relative' }
      }, void 0, (0, _jsx3.default)(_TextField2.default, {
        name: 'device-name',
        style: { marginTop: 0, maxWidth: 170 },
        floatingLabelText: 'Device Name',
        value: value,
        onChange: this._handleChange,
        underlineStyle: error ? styles.textFieldError : null,
        errorText: errorMessage
      }), (0, _jsx3.default)(_A2.default, {
        href: '#',
        onTouchTap: this._handleInfoMessage,
        style: styles.informationLink
      }, void 0, (0, _jsx3.default)(_info2.default, {
        style: styles.informationIcon,
        color: styles.iconColor
      })))), (0, _jsx3.default)('div', {
        style: styles.actionButtons
      }, void 0, (0, _jsx3.default)(_RaisedButton2.default, {
        name: 'step-name-next',
        label: 'Next',
        disableTouchRipple: true,
        disableFocusRipple: true,
        disabled: error || !value,
        primary: true,
        onTouchTap: this._handleNext,
        style: warning && styles.stepButtonNextError || styles.buttonNext
      }), (0, _jsx3.default)(_FlatButton2.default, {
        name: 'step-name-back',
        label: 'Back',
        disabled: error || !value,
        disableTouchRipple: true,
        disableFocusRipple: true,
        onTouchTap: this._handlePrev,
        style: warning && styles.stepButtonBackError || styles.buttonBack
      })));
    }
  }]);
  return StepNameContent;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps)(StepNameContent);
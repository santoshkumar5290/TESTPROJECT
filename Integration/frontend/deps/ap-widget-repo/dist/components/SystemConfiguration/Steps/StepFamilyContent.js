'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepFamilyContent = undefined;

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

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

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

// ------------------------------------
// Components
// ------------------------------------
var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {};
};

/** @private */

var _ref = (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {}, void 0, 'You can select the device model or family that is closest to to the device your\'re trying to add to the configuration.', (0, _jsx3.default)('br', {}), 'Typical device models are MSC800, ICR, LECTOR, CLV, etc.'));

var _ref2 = (0, _jsx3.default)(_MenuItem2.default, {
  value: 'CLV 490',
  primaryText: 'CLV 490'
});

var _ref3 = (0, _jsx3.default)(_MenuItem2.default, {
  value: 'CLV 690',
  primaryText: 'CLV 690'
});

var _ref4 = (0, _jsx3.default)(_MenuItem2.default, {
  value: 'ICR890',
  primaryText: 'ICR890'
});

var _ref5 = (0, _jsx3.default)(_MenuItem2.default, {
  value: 'LECTOR 65x',
  primaryText: 'LECTOR 65x'
});

var _ref6 = (0, _jsx3.default)(_MenuItem2.default, {
  value: 'MSC800',
  primaryText: 'MSC800'
});

var _ref7 = (0, _jsx3.default)(_MenuItem2.default, {
  value: 'IPCAM',
  primaryText: 'IPCAM'
});

var _ref8 = (0, _jsx3.default)(_MenuItem2.default, {
  value: 'OTHER',
  primaryText: 'OTHER'
});

var StepFamilyContent = exports.StepFamilyContent = function (_React$Component) {
  (0, _inherits3.default)(StepFamilyContent, _React$Component);

  /** @ignore */
  function StepFamilyContent(props, context) {
    (0, _classCallCheck3.default)(this, StepFamilyContent);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (StepFamilyContent.__proto__ || (0, _getPrototypeOf2.default)(StepFamilyContent)).call(this, props, context));

    _this._handleChange = _this._handleChange.bind(_this);
    _this._handleNext = _this._handleNext.bind(_this);
    _this._handlePrev = _this._handlePrev.bind(_this);
    _this._handleInfoMessage = _this._handleInfoMessage.bind(_this);
    return _this;
  }

  /* change the value by calling the parent component function */


  /** @ignore */


  (0, _createClass3.default)(StepFamilyContent, [{
    key: '_handleChange',
    value: function _handleChange(e, index, value) {
      this.props.onChange('family', value, true);
    }

    /* validate the family value */

  }, {
    key: '_validate',
    value: function _validate(value) {
      return value.length > 0;
    }

    /* moves to the next step using the parent component function */

  }, {
    key: '_handleNext',
    value: function _handleNext() {
      var value = this.props.value;

      if (!this._validate(value)) {
        this.props.onChange('family', value, false);
      }
      this.props.onNext();
    }

    /* moves to the previous step using the parent component function */

  }, {
    key: '_handlePrev',
    value: function _handlePrev() {
      var value = this.props.value;

      if (!this._validate(value)) {
        this.props.onChange('family', value, false);
      }
      this.props.onPrev();
    }

    /* get the error message */

  }, {
    key: '_getErrorText',
    value: function _getErrorText(styles) {
      return (0, _jsx3.default)('p', {
        style: styles.errorText
      }, void 0, 'Device Model/Family is incorrect', (0, _jsx3.default)(_reportProblem2.default, {
        style: styles.errorIcon,
        color: _SICKMuiTheme2.default.textField.errorColor
      }));
    }

    /* opens the information dialog  */

  }, {
    key: '_handleInfoMessage',
    value: function _handleInfoMessage() {
      var message = _ref;
      this.props.onInfoOpen('Device Family', message);
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          styles = _props.styles,
          value = _props.value,
          error = _props.error;


      return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {
        style: styles.stepDescription
      }, void 0, 'For each device that you wish to add to the configuration, select the device model or family below. If you do not see the model listed, select "OTHER".'), (0, _jsx3.default)('div', {
        style: { position: 'relative' }
      }, void 0, (0, _jsx3.default)(_A2.default, {
        href: '#',
        onTouchTap: this._handleInfoMessage,
        style: styles.informationLinkSelect
      }, void 0, (0, _jsx3.default)(_info2.default, {
        style: styles.informationIcon,
        color: styles.iconColor
      })), (0, _jsx3.default)(_SelectField2.default, {
        name: 'device-family',
        value: value,
        onChange: this._handleChange,
        style: { maxWidth: 170 },
        errorText: error ? this._getErrorText(styles) : null
      }, void 0, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8))), (0, _jsx3.default)('div', {
        style: styles.actionButtons
      }, void 0, (0, _jsx3.default)(_RaisedButton2.default, {
        name: 'step-family-next',
        label: 'Next',
        disabled: error || !value,
        disableTouchRipple: true,
        disableFocusRipple: true,
        primary: true,
        onTouchTap: this._handleNext,
        style: error && styles.stepButtonError || styles.buttonBack
      }), (0, _jsx3.default)(_FlatButton2.default, {
        name: 'step-family-back',
        label: 'Back',
        disabled: error || !value,
        disableTouchRipple: true,
        disableFocusRipple: true,
        style: error && styles.stepButtonError || styles.buttonBack,
        onTouchTap: this._handlePrev
      })));
    }
  }]);
  return StepFamilyContent;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps)(StepFamilyContent);
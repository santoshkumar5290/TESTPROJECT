'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepLabelContent = undefined;

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

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

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

var _ref = (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {}, void 0, 'You can enter a more descriptive label for any device to better identify it when viewing information on the dashboard'), (0, _jsx3.default)('p', {}, void 0, 'a-Z, A-Z, 0-9 and spaces are acceptable to use in the label.'));

var StepLabelContent = exports.StepLabelContent = function (_React$Component) {
  (0, _inherits3.default)(StepLabelContent, _React$Component);

  /** @ignore */
  function StepLabelContent(props, context) {
    (0, _classCallCheck3.default)(this, StepLabelContent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (StepLabelContent.__proto__ || (0, _getPrototypeOf2.default)(StepLabelContent)).call(this, props, context));

    _this.state = {
      warning: false

      /** @private */
    };_this._handleChange = _this._handleChange.bind(_this);
    _this._handleNext = _this._handleNext.bind(_this);
    _this._handlePrev = _this._handlePrev.bind(_this);
    _this._handleInfoMessage = _this._handleInfoMessage.bind(_this);
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(StepLabelContent, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /* updates the label value on select change */

  }, {
    key: '_handleChange',
    value: function _handleChange(e) {
      if (this._validate(e.target.value)) {
        this.props.onChange('label', e.target.value, true);
        this.setState({ warning: false });
      } else {
        this.setState({ warning: true });
      }
    }

    /* validates the label value */

  }, {
    key: '_validate',
    value: function _validate(value) {
      return (/^([a-z\d\s]){0,256}$/i.test(value)
      );
    }

    /* moves to the next step using the parent component function */

  }, {
    key: '_handleNext',
    value: function _handleNext() {
      var value = this.props.value;

      if (!this._validate(value)) {
        this.props.onChange('label', value, false);
      }
      this.props.onNext();
    }

    /* moves to the previous step using the parent component function */

  }, {
    key: '_handlePrev',
    value: function _handlePrev() {
      var value = this.props.value;

      if (!this._validate(value)) {
        this.props.onChange('label', value, false);
      }
      this.props.onPrev();
    }

    /* renders the information dialog */

  }, {
    key: '_handleInfoMessage',
    value: function _handleInfoMessage() {
      var message = _ref;
      this.props.onInfoOpen('Device Label', message);
    }

    /* get the warning message */

  }, {
    key: '_getWarningText',
    value: function _getWarningText(styles) {
      return (0, _jsx3.default)('p', {
        style: styles.errorText
      }, void 0, 'You can use only alphanumeric chars and spaces.');
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          styles = _props.styles,
          value = _props.value;
      var warning = this.state.warning;


      return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {
        style: styles.stepDescription
      }, void 0, 'For each device that you wish to add to the configuration, you can enter a more descriptive label in the field below. If this label is left blank, the Device Name will be used for identification.'), (0, _jsx3.default)('div', {
        style: { position: 'relative' }
      }, void 0, (0, _jsx3.default)(_TextField2.default, {
        name: 'device-label',
        style: { marginTop: 0, maxWidth: 170 },
        floatingLabelText: 'Device Label',
        value: value,
        onChange: this._handleChange,
        errorText: warning ? this._getWarningText(styles) : null
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
        name: 'step-label-next',
        label: 'Next',
        disableTouchRipple: true,
        disableFocusRipple: true,
        primary: true,
        onTouchTap: this._handleNext,
        style: warning && styles.stepButtonNextError || styles.buttonNext
      }), (0, _jsx3.default)(_FlatButton2.default, {
        name: 'step-label-back',
        label: 'Back',
        disableTouchRipple: true,
        disableFocusRipple: true,
        onTouchTap: this._handlePrev,
        style: warning && styles.stepButtonBackError || styles.buttonBack
      })));
    }
  }]);
  return StepLabelContent;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps)(StepLabelContent);
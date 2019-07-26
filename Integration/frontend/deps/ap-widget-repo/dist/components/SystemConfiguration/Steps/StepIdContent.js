'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepIdContent = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _AutoComplete = require('material-ui/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _SICKMuiTheme = require('../../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

var _reportProblem = require('material-ui/svg-icons/action/report-problem');

var _reportProblem2 = _interopRequireDefault(_reportProblem);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

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

var _ref = (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {}, void 0, 'The Device ID is defined in SOPAS ET in the following section:'), (0, _jsx3.default)('p', {}, void 0, 'Parameter > Network / Interface / IOs > Network Options'));

var StepIdContent = exports.StepIdContent = function (_React$Component) {
  (0, _inherits3.default)(StepIdContent, _React$Component);

  /** @ignore */
  function StepIdContent(props, context) {
    (0, _classCallCheck3.default)(this, StepIdContent);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (StepIdContent.__proto__ || (0, _getPrototypeOf2.default)(StepIdContent)).call(this, props, context));

    _this._handleChange = _this._handleChange.bind(_this);
    _this._handleInput = _this._handleInput.bind(_this);
    _this._getAllDeviceIds = _this._getAllDeviceIds.bind(_this);
    _this._handleNext = _this._handleNext.bind(_this);
    _this._handleInfoMessage = _this._handleInfoMessage.bind(_this);
    _this.inputValue = _this.props.value;
    return _this;
  }

  /* updates the deviceId value on select change */


  /** @ignore */


  (0, _createClass3.default)(StepIdContent, [{
    key: '_handleChange',
    value: function _handleChange(value, index) {
      this.props.onChange('deviceId', value.slice(0, 3), this._validate(value));
    }

    /* updates the deviceId on textfield change */

  }, {
    key: '_handleInput',
    value: function _handleInput(value, datasource) {
      this.props.onChange('deviceId', value, this._validate(value));
    }

    /* validates the deviceId value */

  }, {
    key: '_validate',
    value: function _validate(value) {
      return (/^[1-9]$|^[1-9][0-9]$|^[1-9][0-9][0-9]$/.test(value)
      );
    }

    /*
     * populates a list of device ids
     * list is composed from values between 1 and 32, and 80 and 90
     */

  }, {
    key: '_getAllDeviceIds',
    value: function _getAllDeviceIds() {
      var ids = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(Array(32).keys()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var i = _step.value;

          ids.push((i + 1).toString());
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      ids.push('80');
      ids.push('90');

      return ids;
    }

    /* renders the error text message */

  }, {
    key: '_getErrorText',
    value: function _getErrorText(styles) {
      return (0, _jsx3.default)('p', {
        style: styles.errorText
      }, void 0, 'Device ID value is incorrect or already exists in the system.', (0, _jsx3.default)(_reportProblem2.default, {
        style: styles.errorIcon,
        color: _SICKMuiTheme2.default.textField.errorColor
      }));
    }

    /* moves to the next step using the parent component function */

  }, {
    key: '_handleNext',
    value: function _handleNext() {
      var value = this.props.value;

      if (!this._validate(value)) {
        this.props.onChange('deviceId', value, false);
      }
      this.props.onNext();
    }

    /* renders the information dialog  */

  }, {
    key: '_handleInfoMessage',
    value: function _handleInfoMessage() {
      var message = _ref;
      this.props.onInfoOpen('Device ID', message);
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          styles = _props.styles,
          error = _props.error,
          value = _props.value;


      return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {
        style: styles.stepDescription
      }, void 0, 'For each device that you wish to add to the configuration, enter or select the unique device ID number in the field below. This number needs to match the device ID configured in SOPAS ET.'), (0, _jsx3.default)('div', {
        style: { position: 'relative' }
      }, void 0, (0, _jsx3.default)(_A2.default, {
        href: '#',
        onTouchTap: this._handleInfoMessage,
        style: styles.informationLink
      }, void 0, (0, _jsx3.default)(_info2.default, {
        style: styles.informationIcon,
        color: styles.iconColor
      })), (0, _jsx3.default)(_AutoComplete2.default, {
        name: 'device-id',
        floatingLabelText: 'Device ID',
        textFieldStyle: { width: 170 },
        searchText: value,
        dataSource: this._getAllDeviceIds(),
        onUpdateInput: this._handleInput,
        onNewRequest: this._handleChange,
        underlineStyle: error ? styles.textFieldError : null,
        errorText: error ? this._getErrorText(styles) : null
      }))), (0, _jsx3.default)('div', {
        style: styles.actionButtons
      }, void 0, (0, _jsx3.default)(_RaisedButton2.default, {
        name: 'step-id-next',
        label: 'Next',
        disableTouchRipple: true,
        disableFocusRipple: true,
        primary: true,
        disabled: error || !value,
        onTouchTap: this._handleNext,
        style: error && styles.stepButtonNextError || styles.buttonNext
      })));
    }
  }]);
  return StepIdContent;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps)(StepIdContent);
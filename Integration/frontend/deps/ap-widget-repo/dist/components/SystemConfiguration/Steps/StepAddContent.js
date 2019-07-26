'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepAddContent = undefined;

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

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

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

var StepAddContent = exports.StepAddContent = function (_React$Component) {
  (0, _inherits3.default)(StepAddContent, _React$Component);

  function StepAddContent(props, context) {
    (0, _classCallCheck3.default)(this, StepAddContent);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (StepAddContent.__proto__ || (0, _getPrototypeOf2.default)(StepAddContent)).call(this, props, context));

    _this._handleAdd = _this._handleAdd.bind(_this);
    _this._handleStartOver = _this._handleStartOver.bind(_this);
    return _this;
  }

  /* processes the add device */


  /** @ignore */


  (0, _createClass3.default)(StepAddContent, [{
    key: '_handleAdd',
    value: function _handleAdd() {
      this.props.onAdd();
    }

    /* processes the start over */

  }, {
    key: '_handleStartOver',
    value: function _handleStartOver() {
      this.props.onStartOver();
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          styles = _props.styles,
          addEnabled = _props.addEnabled;

      // Override default button styles

      styles.buttonNext.minWidth = 60;
      styles.buttonNext.width = 60;
      styles.buttonNext.maxWidth = 60;
      styles.buttonBack.minWidth = 120;
      styles.buttonBack.width = 120;
      styles.buttonBack.maxWidth = 120;
      styles.buttonBack.paddingLeft = 6;
      styles.buttonBack.paddingRight = 6;

      return (0, _jsx3.default)('div', {
        style: { margin: '12px 0' }
      }, void 0, (0, _jsx3.default)('p', {
        style: { fontSize: 14, emarginBottom: 20 }
      }, void 0, 'Click the Add button below to add the device to your configuration, or click on any step to enter the device information.'), (0, _jsx3.default)(_RaisedButton2.default, {
        name: 'step-add',
        label: 'Add',
        disabled: !addEnabled,
        disableTouchRipple: true,
        disableFocusRipple: true,
        primary: true,
        onTouchTap: this._handleAdd,
        style: styles.buttonNext
      }), (0, _jsx3.default)(_FlatButton2.default, {
        name: 'step-start-over',
        label: 'Start Over',
        disableTouchRipple: true,
        disableFocusRipple: true,
        style: styles.buttonBack,
        onTouchTap: this._handleStartOver
      }));
    }
  }]);
  return StepAddContent;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps)(StepAddContent);
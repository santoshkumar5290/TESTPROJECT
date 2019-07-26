'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeltSpeedInfo = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Helpers
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    conveyorBelt: state.conveyorBelt.get(ownProps.group)
  };
};

/**
 * Component to display current speed of conveyor belt.
 * @private
 */

var BeltSpeedInfo = exports.BeltSpeedInfo = function (_React$Component) {
  (0, _inherits3.default)(BeltSpeedInfo, _React$Component);

  /** @ignore */
  function BeltSpeedInfo(props, context) {
    (0, _classCallCheck3.default)(this, BeltSpeedInfo);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (BeltSpeedInfo.__proto__ || (0, _getPrototypeOf2.default)(BeltSpeedInfo)).call(this, props, context));

    _this.channelSubscription = null;
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(BeltSpeedInfo, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var conveyorBelt = this.props.conveyorBelt;

      var currSpeed = conveyorBelt && conveyorBelt.speed || 1;
      var nextSpeed = nextProps.conveyorBelt && nextProps.conveyorBelt.speed || 1;
      return currSpeed !== nextSpeed;
    }
  }, {
    key: 'render',


    /** @ignore */
    value: function render() {
      var style = this.props.style;

      var speed = this._beltSpeedInfoDisplay;

      return (0, _jsx3.default)('div', {
        style: style
      }, void 0, speed);
    }
  }, {
    key: '_beltSpeedInfoDisplay',
    get: function get() {
      var conveyorBelt = this.props.conveyorBelt;


      if (!conveyorBelt) {
        return 'N/A';
      }

      if (!conveyorBelt.speed || !conveyorBelt.unit) {
        return '';
      }

      return Math.round(conveyorBelt.speed * 1000) / 1000 + ' ' + conveyorBelt.unit;
    }
  }]);
  return BeltSpeedInfo;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps)(BeltSpeedInfo);
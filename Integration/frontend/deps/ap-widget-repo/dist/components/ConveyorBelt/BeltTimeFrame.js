'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeltTimeFrame = undefined;

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

var _defaults = require('../../utils/defaults');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Helpers
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    conveyorBelt: state.conveyorBelt.get(ownProps.group),
    userSettings: state.userSettings[ownProps.group] || _defaults.DEFAULT_EMPTY_OBJECT
  };
};

/**
 * Component to handle conveyor belt's timeframe functionality.
 * @private
 */


// ------------------------------------
// Constants
// ------------------------------------

var BeltTimeFrame = exports.BeltTimeFrame = function (_React$Component) {
  (0, _inherits3.default)(BeltTimeFrame, _React$Component);

  /** @ignore */
  function BeltTimeFrame(props, context) {
    (0, _classCallCheck3.default)(this, BeltTimeFrame);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (BeltTimeFrame.__proto__ || (0, _getPrototypeOf2.default)(BeltTimeFrame)).call(this, props, context));

    _this.lastSpeed = props.conveyorBelt && parseFloat(props.conveyorBelt.speed) || 1;
    _this.channelSubscription = null;
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(BeltTimeFrame, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.conveyorBelt && nextProps.conveyorBelt) {
        this.lastSpeed = parseFloat(nextProps.conveyorBelt.speed);
      } else if (nextProps.conveyorBelt && nextProps.conveyorBelt.speed !== this.props.conveyorBelt.speed) {
        this.lastSpeed = parseFloat(this.props.conveyorBelt.speed);
      }
    }

    /** @ignore */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var currSettings = this.props.userSettings;
      var nextSettings = nextProps.userSettings;
      // Only update if timeframe is auto or it was changed
      return !nextSettings.timeframe || currSettings.timeframe !== nextSettings.timeframe;
    }
  }, {
    key: 'render',


    /** @ignore */
    value: function render() {
      var style = this.props.style;


      return (0, _jsx3.default)('div', {
        style: style
      }, void 0, 'Last ' + this._timeframeDisplay + ' seconds');
    }
  }, {
    key: '_timeframeDisplay',
    get: function get() {
      return parseFloat(this._customFiniteTimeframe).toFixed(2);
    }
  }, {
    key: '_distance',
    get: function get() {
      var _props = this.props,
          conveyorBelt = _props.conveyorBelt,
          width = _props.width,
          height = _props.height;


      return width / height * (conveyorBelt ? conveyorBelt.width : 1) || 1;
    }

    /**
     * Gets the timeframe for the component. The primary source of this value is the users settings.
     * If the user has not set a timeframe, we'll use the timeframe set by the developer. If the developer
     * hasn't set the timeframe, we'll automatically define one.
     */

  }, {
    key: '_customTimeframe',
    get: function get() {
      var _props2 = this.props,
          conveyorBelt = _props2.conveyorBelt,
          timeframe = _props2.timeframe,
          userSettings = _props2.userSettings;


      var defaultTimeframe = this._distance / (conveyorBelt ? conveyorBelt.speed : 1);

      return userSettings.timeframe || timeframe || defaultTimeframe;
    }

    /**
     * If no default timeframe is specified and the user has not specified a custom timeframe, the default is
     * calculated based on the speed. If the speed is zero a division by zero will occur. This method provides
     * a hassle-free solution for that case.
     */

  }, {
    key: '_customFiniteTimeframe',
    get: function get() {
      var timeframe = this._customTimeframe;

      // If timeframe is infinite, use the last known non-zero speed, or default to something sane.
      if (!isFinite(timeframe)) {
        timeframe = this._distance / (this.lastSpeed || 1);
      }

      return timeframe;
    }
  }]);
  return BeltTimeFrame;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps)(BeltTimeFrame);
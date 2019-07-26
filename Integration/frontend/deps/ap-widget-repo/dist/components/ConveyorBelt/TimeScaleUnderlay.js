'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeScaleUnderlay = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _colors = require('material-ui/styles/colors');

var _colorManipulator = require('material-ui/utils/colorManipulator');

var _ConveyorBelt = require('./ConveyorBelt');

var _SICKPlatform = require('../../SICKPlatform');

var _Item = require('./Item');

var _defaults = require('../../utils/defaults');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var palette = context.muiTheme.palette;

  return {
    timeScaleUnderlay: {
      backgroundColor: _colors.blueGrey100
    },
    underlay: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    },
    intervals: {
      display: 'flex',
      flex: 8,
      justifyContent: 'space-between'
    },
    interval: {
      borderLeft: props.hideUnderlayInterval ? null : '1px solid ' + _colors.blueGrey200,
      position: 'relative',
      flex: 0
    },
    intervalLabels: {
      backgroundColor: '#FFFFFF',
      borderLeft: '1px solid ' + _colors.grey300,
      borderRight: '1px solid ' + _colors.grey300,
      borderBottom: '1px solid ' + _colors.grey300,
      borderTop: '1px solid ' + _colors.blueGrey200,
      display: 'flex',
      height: _ConveyorBelt.FOOTER_HEIGHT,
      lineHeight: _ConveyorBelt.FOOTER_HEIGHT + 'px',
      justifyContent: 'space-between'
    },
    intervalLabel: {
      color: (0, _colorManipulator.fade)(palette.textColor, 0.54),
      fontSize: 12,
      flex: 0,
      whiteSpace: 'nowrap'
    },
    indentWrapper: {
      height: 8,
      width: '100%',
      position: 'absolute',
      left: 0,
      bottom: _ConveyorBelt.FOOTER_HEIGHT - 7,
      display: 'flex',
      flex: 0,
      justifyContent: 'space-between'
    },
    indents: {
      borderLeft: '1px solid ' + _colors.blueGrey200,
      position: 'relative',
      flex: 0
    }
  };
}

/** @private {Number} Number of time blocks to show in the underlay. */
var INTERVAL_COUNT = 4;

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    config: state.config,
    conveyorBelt: state.conveyorBelt.get(ownProps.group),
    userSettings: state.userSettings[ownProps.group] || _defaults.DEFAULT_EMPTY_OBJECT
  };
};

/**
 * Component to handle different timescales on conveyor belt.
 * @private
 */

var TimeScaleUnderlay = exports.TimeScaleUnderlay = function (_Component) {
  (0, _inherits3.default)(TimeScaleUnderlay, _Component);

  /** @ignore */


  /** @ignore */
  function TimeScaleUnderlay(props, context) {
    (0, _classCallCheck3.default)(this, TimeScaleUnderlay);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (TimeScaleUnderlay.__proto__ || (0, _getPrototypeOf2.default)(TimeScaleUnderlay)).call(this, props, context));

    _this.lastSpeed = props.conveyorBelt && parseFloat(props.conveyorBelt.speed) || 1;
    return _this;
  }

  /** @ignore */


  (0, _createClass3.default)(TimeScaleUnderlay, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.conveyorBelt && nextProps.conveyorBelt) {
        this.lastSpeed = parseFloat(nextProps.conveyorBelt.speed);
      } else if (nextProps.conveyorBelt && nextProps.conveyorBelt.speed !== this.props.conveyorBelt.speed) {
        this.lastSpeed = parseFloat(this.props.conveyorBelt.speed);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _props = this.props,
          conveyorBelt = _props.conveyorBelt,
          userSettings = _props.userSettings,
          width = _props.width;
      // Update if the width changed (e.g. browser was resized).

      if (width !== nextProps.width) {
        return true;
      }
      var currTimeframe = userSettings && userSettings.timeframe;
      var nextTimeframe = nextProps.userSettings.timeframe;
      var lastSpeed = conveyorBelt && conveyorBelt.speed || 1;
      var nextSpeed = nextProps.conveyorBelt && nextProps.conveyorBelt.speed || 1;
      // Only update if timeframe is auto (and speed changed) or it was changed
      return !conveyorBelt || !nextTimeframe && lastSpeed !== nextSpeed || currTimeframe !== nextTimeframe;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height,
          direction = _props2.direction;


      var timeframe = this._customFiniteTimeframe;

      var fractions = [].concat((0, _toConsumableArray3.default)((0, _from2.default)(Array(INTERVAL_COUNT)).map(function (val, i) {
        var fraction = timeframe - i * (timeframe / INTERVAL_COUNT);
        return fraction % 1 === 0 ? fraction : fraction.toFixed(2);
      })), [0]);

      if (direction === _Item.LEFT_TO_RIGHT) {
        fractions = fractions.reverse();
      }

      var notches = [].concat((0, _toConsumableArray3.default)(Array(fractions.length * 2 - 1).keys()));

      var styles = getStyles(this.props, this.context);

      var finalTimeScaleStyle = (0, _extends3.default)({}, styles.timeScaleUnderlay, {
        height: height + _ConveyorBelt.FOOTER_HEIGHT,
        width: width
      });

      return (0, _jsx3.default)('div', {
        style: (0, _extends3.default)({}, finalTimeScaleStyle, styles.underlay)
      }, void 0, (0, _jsx3.default)('div', {
        style: styles.intervals
      }, void 0, fractions.map(function (f) {
        return (0, _jsx3.default)('div', {
          style: styles.interval
        });
      })), (0, _jsx3.default)('div', {
        style: styles.intervalLabels
      }, void 0, fractions.map(function (f) {
        return (0, _jsx3.default)('div', {
          style: styles.intervalLabel
        }, void 0, f + ' sec');
      })), (0, _jsx3.default)('div', {
        style: styles.indentWrapper
      }, void 0, notches.map(function (n) {
        return (0, _jsx3.default)('div', {
          style: styles.indents
        });
      })));
    }
  }, {
    key: '_distance',
    get: function get() {
      var _props3 = this.props,
          conveyorBelt = _props3.conveyorBelt,
          width = _props3.width,
          height = _props3.height;


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
      var _props4 = this.props,
          conveyorBelt = _props4.conveyorBelt,
          timeframe = _props4.timeframe,
          userSettings = _props4.userSettings;


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
  return TimeScaleUnderlay;
}(_react.Component);

TimeScaleUnderlay.contextTypes = {
  muiTheme: _propTypes2.default.object };
exports.default = (0, _SICKPlatform.connect)(mapStateToProps)(TimeScaleUnderlay);
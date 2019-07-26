'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeltItems = undefined;

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

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _SICKPlatform = require('../../SICKPlatform');

var _defaults = require('../../utils/defaults');

var _conveyorBelt = require('../../ducks/conveyorBelt');

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

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
 * Component to display items on the conveyor belt. This in turn calls the Item
 * component for animation.
 * @private
 */


// ------------------------------------
// Components
// ------------------------------------

// ------------------------------------
// Constants
// ------------------------------------

var BeltItems = exports.BeltItems = function (_React$Component) {
  (0, _inherits3.default)(BeltItems, _React$Component);

  /** @ignore */
  function BeltItems(props, context) {
    (0, _classCallCheck3.default)(this, BeltItems);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (BeltItems.__proto__ || (0, _getPrototypeOf2.default)(BeltItems)).call(this, props, context));

    _this._renderItem = _this._renderItem.bind(_this);
    _this._removeItem = _this._removeItem.bind(_this);
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(BeltItems, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /**
     * The belt's length represented based on the DOM width, height and the real belt's width
     * e.g.
     * Belt's real width (the cross axis): 1m
     * DOM height: 200px
     * => The ratio: 1:200
     *
     * Then the length being represented will be: (DOM width / 200) m
     */

  }, {
    key: '_removeItem',
    value: function _removeItem(item) {
      this.props.removeItem(this.props.group, item);
    }
  }, {
    key: '_renderItem',
    value: function _renderItem(item, attributes) {
      var _props = this.props,
          width = _props.width,
          conditionDefinitions = _props.conditionDefinitions,
          conveyorBelt = _props.conveyorBelt,
          userSettings = _props.userSettings,
          direction = _props.direction,
          view = _props.view;

      var distance = this._distance;
      var pixelsPerUnit = width / distance;
      var defaultTimeframe = distance / conveyorBelt.speed;
      var timeScaleFactor = this._customTimeframe / defaultTimeframe || 1;

      return (0, _jsx3.default)(_Item2.default, {
        data: item,
        conditionDefinitions: conditionDefinitions,
        direction: direction,
        scaleFactor: timeScaleFactor,
        distance: distance,
        speed: conveyorBelt.speed,
        pixelsPerUnit: pixelsPerUnit,
        settings: userSettings,
        onComplete: this._removeItem,
        view: view,
        timeframe: this._customTimeframe
      }, item._id);
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var conveyorBelt = this.props.conveyorBelt;

      var items = conveyorBelt && conveyorBelt.items;

      return (0, _jsx3.default)('div', {}, void 0, items && items.valueSeq().map(this._renderItem), ')');
    }
  }, {
    key: '_distance',
    get: function get() {
      var _props2 = this.props,
          conveyorBelt = _props2.conveyorBelt,
          height = _props2.height,
          width = _props2.width;

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
      var _props3 = this.props,
          conveyorBelt = _props3.conveyorBelt,
          timeframe = _props3.timeframe,
          userSettings = _props3.userSettings;


      var defaultTimeframe = this._distance / (conveyorBelt ? conveyorBelt.speed : 1);

      return userSettings.timeframe || timeframe || defaultTimeframe;
    }
  }]);
  return BeltItems;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps, { removeItem: _conveyorBelt.removeItem })(BeltItems);
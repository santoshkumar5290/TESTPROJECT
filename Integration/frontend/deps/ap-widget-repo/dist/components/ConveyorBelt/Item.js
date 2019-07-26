'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RIGHT_TO_LEFT = exports.LEFT_TO_RIGHT = exports.SIDE_VIEW = exports.TOP_VIEW = exports.DEFAULT_BOX_COLOR = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _velocityReact = require('velocity-react');

var _colors = require('material-ui/styles/colors');

var _shape = require('../../utils/shape');

var _FitText = require('../FitText/FitText');

var _FitText2 = _interopRequireDefault(_FitText);

var _defaults = require('../../utils/defaults');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @private */
var DEFAULT_BOX_COLOR = exports.DEFAULT_BOX_COLOR = _colors.grey500;

/**
 * Use to specify the "top" view for the conveyor belt.
 * @type {String}
 * @private
 */


// ------------------------------------
// Constants
// ------------------------------------
var TOP_VIEW = exports.TOP_VIEW = 'top';
/**
 * Use to specify the "side" view for the conveyor belt.
 * @type {String}
 * @private
 */
var SIDE_VIEW = exports.SIDE_VIEW = 'side';
/**
 * Use to specify that the items on the belt should move from left to right.
 * @type {String}
 * @private
 */
var LEFT_TO_RIGHT = exports.LEFT_TO_RIGHT = 'ltr';
/**
 * Use to specify that the items on the belt should move from right to left.
 * @type {String}
 * @private
 */
var RIGHT_TO_LEFT = exports.RIGHT_TO_LEFT = 'rtl';

var styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  shape: {
    border: '2px solid ' + _colors.grey100,
    zIndex: '10'
  }

  /**
   * This component depicts the moving object on conveyor belt.
   * @private
   */
};
var Item = function (_Component) {
  (0, _inherits3.default)(Item, _Component);

  function Item(props, context) {
    (0, _classCallCheck3.default)(this, Item);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).call(this, props, context));

    _this.speedLastUpdated = new Date().getTime();
    _this.lastDistanceTraveled = _this.distanceTraveled;

    _this._onComplete = _this._onComplete.bind(_this);
    _this._handleVelocityRef = _this._handleVelocityRef.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Item, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // If timeframe changed
      if (nextProps.timeframe !== this.props.timeframe) {
        this._velocityRef._stopAnimation();
        this._velocityRef._scheduleAnimation();
      }

      // If speed changed
      if (nextProps.speed !== this.props.speed) {
        this.lastDistanceTraveled = this.distanceTraveled;
        this.speedLastUpdated = new Date().getTime();
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this._velocityRef && prevProps.speed !== this.props.speed) {
        this._velocityRef._stopAnimation();
        this._velocityRef._scheduleAnimation();
      }
    }
  }, {
    key: 'getShapeDimensions',
    value: function getShapeDimensions() {
      var _SIDE_VIEW$TOP_VIEW$v;

      var _props = this.props,
          data = _props.data,
          view = _props.view;
      var _data$shape = data.shape,
          dimensions = _data$shape.dimensions,
          placementAngle = _data$shape.placementAngle;


      var boundingBoxDimensions = (0, _shape.getBoundingBoxDimensions)(dimensions.width, dimensions.length, placementAngle);

      var boundingBox = (_SIDE_VIEW$TOP_VIEW$v = {}, (0, _defineProperty3.default)(_SIDE_VIEW$TOP_VIEW$v, SIDE_VIEW, {
        height: dimensions.height,
        width: boundingBoxDimensions.mainAxis
      }), (0, _defineProperty3.default)(_SIDE_VIEW$TOP_VIEW$v, TOP_VIEW, {
        height: boundingBoxDimensions.crossAxis,
        width: boundingBoxDimensions.mainAxis
      }), _SIDE_VIEW$TOP_VIEW$v)[view];

      return {
        boundingBox: boundingBox,
        shape: dimensions
      };
    }
  }, {
    key: 'getShapeStyles',
    value: function getShapeStyles(dimensions) {
      var _extends3, _SIDE_VIEW$TOP_VIEW$v2, _SIDE_VIEW$TOP_VIEW$v3;

      var _props2 = this.props,
          data = _props2.data,
          scaleFactor = _props2.scaleFactor,
          view = _props2.view,
          direction = _props2.direction;


      var directionProperty = direction === LEFT_TO_RIGHT ? 'left' : 'right';

      var startX = (-dimensions.boundingBox.width + this.distanceTraveled) * this.pixelsPerUnit;

      var boundingBox = (_SIDE_VIEW$TOP_VIEW$v2 = {}, (0, _defineProperty3.default)(_SIDE_VIEW$TOP_VIEW$v2, SIDE_VIEW, (0, _extends5.default)({}, styles.container, (0, _defineProperty3.default)({
        bottom: 0
      }, directionProperty, startX))), (0, _defineProperty3.default)(_SIDE_VIEW$TOP_VIEW$v2, TOP_VIEW, (0, _extends5.default)({}, styles.container, (_extends3 = {
        width: dimensions.boundingBox.width * this.pixelsPerUnit,
        height: dimensions.boundingBox.height * this.pixelsPerUnit
      }, (0, _defineProperty3.default)(_extends3, directionProperty, startX), (0, _defineProperty3.default)(_extends3, 'top', data.shape.distanceToEdge * scaleFactor * this.pixelsPerUnit), _extends3))), _SIDE_VIEW$TOP_VIEW$v2)[view];

      var shape = (_SIDE_VIEW$TOP_VIEW$v3 = {}, (0, _defineProperty3.default)(_SIDE_VIEW$TOP_VIEW$v3, SIDE_VIEW, (0, _extends5.default)({}, styles.shape, {
        height: dimensions.shape.height * this.pixelsPerUnit,
        width: dimensions.boundingBox.width * this.pixelsPerUnit
      })), (0, _defineProperty3.default)(_SIDE_VIEW$TOP_VIEW$v3, TOP_VIEW, (0, _extends5.default)({}, styles.shape, {
        height: dimensions.shape.width * this.pixelsPerUnit,
        width: dimensions.shape.length * this.pixelsPerUnit,
        transform: 'rotate(' + data.shape.placementAngle + 'deg)'
      })), _SIDE_VIEW$TOP_VIEW$v3)[view];

      return {
        boundingBox: boundingBox,
        shape: (0, _extends5.default)({}, shape, {
          backgroundColor: this.color
        })
      };
    }
  }, {
    key: '_handleVelocityRef',
    value: function _handleVelocityRef(ref) {
      this._velocityRef = ref;
    }
  }, {
    key: '_onComplete',
    value: function _onComplete() {
      this.props.onComplete(this.props.data);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          data = _props3.data,
          speed = _props3.speed,
          direction = _props3.direction;


      var dimensions = this.getShapeDimensions();

      // Expand the distance to account for extra travel distance so that the items
      // move at the same speed regardless of their width
      var totalAnimationDistance = this.distance + dimensions.boundingBox.width;

      var animationTime = void 0;

      if (speed) {
        animationTime = Math.max(totalAnimationDistance - this.distanceTraveled, 0) / speed * 1000;
      } else {
        animationTime = Infinity;
      }

      var directionProperty = direction === LEFT_TO_RIGHT ? 'left' : 'right';
      var animation = (0, _defineProperty3.default)({}, directionProperty, this.distance * this.pixelsPerUnit);

      var computedStyles = this.getShapeStyles(dimensions);

      return _react2.default.createElement(
        _velocityReact.VelocityComponent,
        {
          runOnMount: true,
          animation: animation,
          easing: 'linear',
          ref: this._handleVelocityRef,
          duration: animationTime,
          complete: this._onComplete },
        (0, _jsx3.default)('div', {
          id: 'SICKConveyorBeltItem-' + data._id,
          onClick: this.props.onClick,
          style: computedStyles.boundingBox
        }, void 0, (0, _jsx3.default)('div', {
          style: computedStyles.shape
        }, void 0, (0, _jsx3.default)(_FitText2.default, {
          parentHeight: computedStyles.shape.height,
          parentWidth: computedStyles.shape.width,
          angle: this.props.view === TOP_VIEW ? -data.shape.placementAngle : 0,
          text: data.id,
          bgColor: computedStyles.shape.backgroundColor
        })))
      );
    }
  }, {
    key: 'color',
    get: function get() {
      var _props4 = this.props,
          data = _props4.data,
          settings = _props4.settings,
          conditionDefinitions = _props4.conditionDefinitions;


      if (!data.conditions.length) {
        return DEFAULT_BOX_COLOR;
      }

      var customCondDefinitions = settings.conditionDefinitions ? settings.conditionDefinitions : conditionDefinitions;
      var colors = customCondDefinitions && customCondDefinitions.colors || _defaults.DEFAULT_EMPTY_OBJECT;
      var color = DEFAULT_BOX_COLOR;

      (0, _keys2.default)(colors).some(function (key) {
        if (data.conditions.indexOf(colors[key].condition) !== -1) {
          color = key;
          return true;
        }
      });

      return color;
    }
  }, {
    key: 'distanceTraveled',
    get: function get() {
      var speed = this.props.speed;


      var timePassed = new Date().getTime() - this.speedLastUpdated;

      return (this.lastDistanceTraveled || 0) + speed * (timePassed / 1000);
    }
  }, {
    key: 'distance',
    get: function get() {
      return this.props.distance * this.props.scaleFactor;
    }
  }, {
    key: 'pixelsPerUnit',
    get: function get() {
      return this.props.pixelsPerUnit / this.props.scaleFactor;
    }
  }]);
  return Item;
}(_react.Component);

exports.default = Item;
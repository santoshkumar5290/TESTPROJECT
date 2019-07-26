'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Belt = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _colors = require('material-ui/styles/colors');

var _defaults = require('../../utils/defaults');

var _Item = require('./Item');

var _BeltItems = require('./BeltItems');

var _BeltItems2 = _interopRequireDefault(_BeltItems);

var _TimeScaleUnderlay = require('./TimeScaleUnderlay');

var _TimeScaleUnderlay2 = _interopRequireDefault(_TimeScaleUnderlay);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------
var styles = {
  belt: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    height: 200
  },
  timeScaleUnderlay: {
    backgroundColor: _colors.blueGrey100
  }
};

// ------------------------------------
// Components
// ------------------------------------

// ------------------------------------
// Helpers
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    userSettings: state.userSettings[ownProps.group] || _defaults.DEFAULT_EMPTY_OBJECT
  };
};

/**
 * React component to visualize the base conveyor belt on which items will be depicted.
 * @private
 */

var Belt = exports.Belt = function (_SICKComponent) {
  (0, _inherits3.default)(Belt, _SICKComponent);

  /** @ignore */
  function Belt(props, context) {
    (0, _classCallCheck3.default)(this, Belt);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (Belt.__proto__ || (0, _getPrototypeOf2.default)(Belt)).call(this, props, context));

    _this.channelSubscription = null;
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(Belt, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_selectedView',
    value: function _selectedView() {
      var _props = this.props,
          view = _props.view,
          userSettings = _props.userSettings;


      return userSettings.view || view;
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          group = _props2.group,
          width = _props2.width,
          height = _props2.height,
          direction = _props2.direction,
          timeframe = _props2.timeframe;


      var finalBeltStyle = (0, _extends3.default)({}, styles.belt, {
        height: height,
        width: width
      });

      var view = this._selectedView();

      return (0, _jsx3.default)(_Paper2.default, {
        zDepth: 0,
        style: { position: 'relative' }
      }, void 0, (0, _jsx3.default)('div', {
        style: finalBeltStyle
      }, void 0, (0, _jsx3.default)(_BeltItems2.default, {
        group: group,
        view: view,
        width: width,
        direction: direction
      })), (0, _jsx3.default)(_TimeScaleUnderlay2.default, {
        group: group,
        direction: direction,
        timeframe: timeframe,
        hideUnderlayInterval: view === _Item.SIDE_VIEW,
        width: width,
        height: height
      }));
    }
  }]);
  return Belt;
}(_SICKComponent3.default);

Belt.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  timeframe: _propTypes2.default.number,
  view: _propTypes2.default.string });
exports.default = (0, _SICKPlatform.connect)(mapStateToProps)(Belt);
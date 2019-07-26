'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConveyorBelt = exports.FOOTER_HEIGHT = undefined;

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

var _reactDom = require('react-dom');

var _SICKPlatform = require('../../SICKPlatform');

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _conveyorBelt = require('../../ducks/conveyorBelt');

var _Item = require('./Item');

var _BeltHeader = require('./BeltHeader');

var _BeltHeader2 = _interopRequireDefault(_BeltHeader);

var _Belt = require('./Belt');

var _Belt2 = _interopRequireDefault(_Belt);

var _ConveyorBeltSettings = require('./ConveyorBeltSettings');

var _ConveyorBeltSettings2 = _interopRequireDefault(_ConveyorBeltSettings);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _defaults = require('../../utils/defaults');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

/** @private {Number} The height in pixels of the footer of the conveyor belt. */


// ------------------------------------
// Action creators
// ------------------------------------

var FOOTER_HEIGHT = exports.FOOTER_HEIGHT = 50;

// ------------------------------------
// Components
// ------------------------------------

var styles = {
  container: {},
  belt: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden'
  },
  toolbarText: {
    fontSize: 14,
    lineHeight: '56px',
    marginLeft: 10
  }
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    config: state.config,
    // conveyorBelt: state.conveyorBelt.get(ownProps.group),
    userSettings: state.userSettings[ownProps.group] || _defaults.DEFAULT_EMPTY_OBJECT
  };
};

/* eslint-disable */
/**
 * Visualizes the conveyor belt with animation to show moving objects. This widget has provisions to display current speed of the conveyor belt,
 * websocket connection status and settings option to configure direction of the belt, user perspective(top or side view) and the timescale.
 *
 * **Available properties:**
 *
 * | Property               | Type     | Description                                                                                                | Allowed values                          | Default Value   | Required |
 * |------------------------|----------|------------------------------------------------------------------------------------------------------------|-----------------------------------------|-----------------|----------|
 * | `title`                | `String` | Title to be displayed on the widget.                                                                       | *                                       | 'Conveyor Belt' | NO       |
 * | `channel`              | `String` | Channel or the tunnel name for which the objects to be retrieved from server.                              | *                                       |                 | YES      |
 * | `conditionDefinitions` | `Object` | An object of all the condition definitions (with the required key 'label' for each condition)              | Object with defined shape (see example) |                 | YES      |
 * | `group`                | `String` | Components are grouped using a group ID. Components with matching group IDs share state and user settings. | *                                       |                 | YES      |
 * |                        |          | Make sure that the group ID is unique per widget type.                                                     |                                         |                 |          |
 * |                        |          | E.g. ActivityTable and ConveyorBelt must have different group IDs                                          |                                         |                 |          |
 * | `style`                | `Object` | Custom style for the widget. This will override the default style values.                                  | *                                       |                 | NO       |
 * 
 * @extends {SICKComponent}
 * 
 * @example
 * const conveyorBelt = SICKPlatform.ConveyorBelt.init(document.createElement('div'), {
 *   title: 'Conveyor Belt Example',
 *   group: 'example',
 *   channel: 'your_channel_id',
 *   style: {
 *     height: 280
 *   },
 *   conditionDefinitions: {
 *     noread: {
 *       label: 'No reads'
 *     },
 *     multiread: {
 *       label: 'Multiple reads'
 *     }
 *   }
 * })
 * conveyorBelt.update({ title: 'Updated Conveyor Belt' })
 * conveyorBelt.destroy()
 *
 * @example
 * render() {
 *   return (
 *     <div>
 *       <ConveyorBelt
 *         title='Conveyor Belt Example'
 *         group='example'
 *         channel='your_channel_id',
 *         style={{ height: 280 }}
 *         conditionDefinitions={{
 *           noread: {
 *             label: 'No reads'
 *           },
 *           multiread: {
 *             label: 'Multiple reads'
 *           }
 *         }}
 *       />
 *     </div>
 *   )
 * }
 */
/* eslint-enable */

var ConveyorBelt = exports.ConveyorBelt = function (_SICKComponent) {
  (0, _inherits3.default)(ConveyorBelt, _SICKComponent);

  /** @ignore */


  /** @ignore */
  function ConveyorBelt(props, context) {
    (0, _classCallCheck3.default)(this, ConveyorBelt);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (ConveyorBelt.__proto__ || (0, _getPrototypeOf2.default)(ConveyorBelt)).call(this, props, context));

    _this.state = (0, _extends3.default)({}, _this.state, {
      height: 0,
      width: 0,
      settingsDialogOpen: false

      /** @private */
    });_this.channelSubscription = null;
    /** @private */
    _this._handleToolbarRef = _this._handleToolbarRef.bind(_this);
    _this._toggleSettingsDialog = _this._toggleSettingsDialog.bind(_this);
    _this._updateDimensions = _this._updateDimensions.bind(_this);
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(ConveyorBelt, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this._node = (0, _reactDom.findDOMNode)(this);

      if (!this._node) {
        return;
      }

      // Check for resize event and update the belt dimensions based on recalculation.
      window.addEventListener('resize', this._updateDimensions);

      // We have to listen to DOM mutations so we know when the backing DOM element changes
      // in a way that is outside our control (ie. user updates the element.style object)
      this._dimensionsObserver = new MutationObserver(function (mutations) {
        if (_this2._node && _this2._toolbarNode) {
          _this2.setState(_this2._beltDimensions);
        }
      });

      // Start observing the node
      this._dimensionsObserver.observe(this._node, {
        attributes: true
      });
    }

    /** @ignore */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /** @ignore */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      // TODO: resubscribe to new channel if prop changes
      if (this.props.channel) {
        var subscription = this.props.subscribe(this.props.channel, this.props.group);
        this.channelSubscription = subscription.id;
      }
    }

    /** @ignore */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._updateDimensions);
    }
  }, {
    key: '_updateDimensions',
    value: function _updateDimensions() {
      if (this._node && this._toolbarNode) {
        this.setState(this._beltDimensions);
      }
    }
  }, {
    key: '_handleToolbarRef',
    value: function _handleToolbarRef(ref) {
      var _this3 = this;

      this._toolbarNode = (0, _reactDom.findDOMNode)(ref);

      if (!this._toolbarNode) {
        return;
      }

      setTimeout(function () {
        if (_this3._node && _this3._toolbarNode) {
          _this3.setState(_this3._beltDimensions);
        }
      }, 0);
    }
  }, {
    key: '_toggleSettingsDialog',
    value: function _toggleSettingsDialog() {
      this.setState({
        settingsDialogOpen: !this.state.settingsDialogOpen
      });
    }

    /**
     * Get the dimensions of the element that represents the actual conveyor belt inside this component.
     */

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
      var _state = this.state,
          height = _state.height,
          settingsDialogOpen = _state.settingsDialogOpen,
          width = _state.width;
      var _props2 = this.props,
          conditionDefinitions = _props2.conditionDefinitions,
          group = _props2.group,
          style = _props2.style,
          title = _props2.title,
          timeframe = _props2.timeframe,
          timeframes = _props2.timeframes;

      var view = this._selectedView();

      var finalStyle = (0, _extends3.default)({}, styles.container, style);

      return (0, _jsx3.default)(_Paper2.default, {
        style: finalStyle
      }, void 0, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)(_BeltHeader2.default, {
        title: title,
        group: group,
        width: width,
        height: height,
        timeframe: timeframe,
        handleToolbarRef: this._handleToolbarRef,
        onSettingsClick: this._toggleSettingsDialog
      }), (0, _jsx3.default)(_Belt2.default, {
        group: group,
        width: width,
        height: height,
        timeframe: timeframe,
        direction: this._direction,
        view: view
      }), settingsDialogOpen && (0, _jsx3.default)(_ConveyorBeltSettings2.default, {
        open: true,
        group: group,
        conditionDefinitions: conditionDefinitions,
        direction: this._direction,
        timeframes: timeframes,
        view: view,
        onSettingsToggle: this._toggleSettingsDialog
      })));
    }
  }, {
    key: '_beltDimensions',
    get: function get() {
      return {
        height: this._node.offsetHeight - this._toolbarNode.offsetHeight - FOOTER_HEIGHT,
        width: this._node.offsetWidth
      };
    }
  }, {
    key: '_direction',
    get: function get() {
      var _props3 = this.props,
          direction = _props3.direction,
          userSettings = _props3.userSettings;


      return userSettings && userSettings.direction || direction;
    }
  }]);
  return ConveyorBelt;
}(_SICKComponent3.default);

ConveyorBelt.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  title: _propTypes2.default.string,
  channel: _propTypes2.default.string.isRequired,
  direction: _propTypes2.default.oneOf([_Item.LEFT_TO_RIGHT, _Item.RIGHT_TO_LEFT]),
  view: _propTypes2.default.oneOf([_Item.TOP_VIEW, _Item.SIDE_VIEW]),
  conditionDefinitions: _propTypes2.default.object.isRequired,
  style: _propTypes2.default.object,
  timeframe: _propTypes2.default.number,
  userSettings: _propTypes2.default.object.isRequired });
ConveyorBelt.defaultProps = (0, _extends3.default)({}, _SICKComponent3.default.defaultProps, {
  title: 'Conveyor Belt',
  direction: _Item.RIGHT_TO_LEFT,
  view: _Item.TOP_VIEW });
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, { subscribe: _conveyorBelt.subscribe, unsubscribe: _conveyorBelt.unsubscribe })(ConveyorBelt);
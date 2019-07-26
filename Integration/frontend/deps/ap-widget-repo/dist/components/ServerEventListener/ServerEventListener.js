'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerEventListener = undefined;

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SICKPlatform = require('../../SICKPlatform');

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _serverEventListener = require('../../ducks/serverEventListener');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {};
};

/* eslint-disable */
/**
 * Provides a general-purpose event listener for notification events from server over websocket.
 * 
 * This widget is not visible on UI. Once it is attached to the webpage, it runs in the background and executes the callback on new message.
 *
 * **Available properties:**
 *
 * | Property               | Type       | Description                                                                                                | Allowed values                          | Default Value   | Required |
 * |------------------------|------------|------------------------------------------------------------------------------------------------------------|-----------------------------------------|-----------------|----------|
 * | `channel`              | `String`   | The WebSocket channel to connect to                                                                        | *                                       |                 | YES      |
 * | `callback`             | `function` | Callback function that will be executed once message is received                                           | JS function                             |                 | YES      |
 *
 * @example
 * import ServerEventListener from 'src/components/ServerEventListener'
 * window.serverEventListener = ServerEventListener.init(document.getElementById('server-event-listener'), {
 *    channel: 'notification_events',
 *    callback: callback
 * })
 *
 * @example
 * <ServerEventListener
 *   channel='notification_events'
 *   callback={callback}
 * />
 */
/* eslint-enable */

var ServerEventListener = exports.ServerEventListener = function (_SICKComponent) {
  (0, _inherits3.default)(ServerEventListener, _SICKComponent);

  /** @ignore */


  /** @ignore */
  function ServerEventListener(props, context) {
    (0, _classCallCheck3.default)(this, ServerEventListener);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (ServerEventListener.__proto__ || (0, _getPrototypeOf2.default)(ServerEventListener)).call(this, props, context));

    _this.channelSubscription = null;

    _this._subscribe = _this._subscribe.bind(_this);
    _this._unsubscribe = _this._unsubscribe.bind(_this);
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(ServerEventListener, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._subscribe();
    }

    /** @ignore */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unsubscribe();
    }
  }, {
    key: '_subscribe',
    value: function _subscribe() {
      var _props = this.props,
          channel = _props.channel,
          callback = _props.callback,
          subscribe = _props.subscribe;


      if (channel) {
        var subscription = subscribe(channel, callback);
        this.channelSubscription = subscription.id;
      }
    }
  }, {
    key: '_unsubscribe',
    value: function _unsubscribe() {
      this.channelSubscription && this.props.unsubscribe(this.channelSubscription);
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return ServerEventListener;
}(_SICKComponent3.default);

ServerEventListener.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  channel: _propTypes2.default.string.isRequired,
  serverEventListener: _propTypes2.default.object.isRequired,
  callback: _propTypes2.default.func.isRequired });
ServerEventListener.defaultProps = (0, _extends3.default)({}, _SICKComponent3.default.defaultProps, {
  serverEventListener: {} });
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, { subscribe: _serverEventListener.subscribe, unsubscribe: _serverEventListener.unsubscribe })(ServerEventListener);
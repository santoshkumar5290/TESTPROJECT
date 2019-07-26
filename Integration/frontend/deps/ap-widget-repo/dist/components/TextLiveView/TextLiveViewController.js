'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextLiveViewController = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SICKPlatform = require('../../SICKPlatform');

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _TextLiveView = require('./TextLiveView');

var _TextLiveView2 = _interopRequireDefault(_TextLiveView);

var _lodash = require('lodash');

var _defaults = require('../../utils/defaults');

var _userSettings = require('../../ducks/userSettings');

var _textLiveView = require('../../ducks/textLiveView');

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _encodeUrl = require('../../utils/encodeUrl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  container: {
    height: '100%'
  }

  /**
   * Controller for wiring websocket and redux store to view component
   *
   * @private
   */
};
var TextLiveViewController = exports.TextLiveViewController = function (_SICKComponent) {
  (0, _inherits3.default)(TextLiveViewController, _SICKComponent);
  (0, _createClass3.default)(TextLiveViewController, [{
    key: '_handleBlur',


    /** @private */


    /** @private */

    /** @ignore */
    value: function _handleBlur(e, ref) {
      var value = this.state.title;
      var group = this.props.group;

      // Save new value to the store.

      var nextState = { title: value };
      this.props.updateUserSettings(group, nextState);
    }

    /** @private */


    /** @private */


    /** @ignore */

  }, {
    key: '_handleChange',
    value: function _handleChange(e, ref) {
      var value = e.target.value;

      if (!(0, _lodash.isEmpty)(value.trim())) {
        this.setState({
          title: value,
          snackbarOpen: false
        });
      } else {
        this.setState({
          snackbarOpen: true
        });
      }
    }

    /** @private */

  }, {
    key: '_handleSnackbarClose',
    value: function _handleSnackbarClose(reason) {
      this.setState({
        snackbarOpen: false
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.updateSubscription(nextProps);
    }

    /**
     * @private
     *
     * Subscribe to configured WebSocket channel.
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateSubscription(this.props, true);
    }
  }, {
    key: 'componentWillUnmount',


    /**
     * @private
     *
     * Unsubscribe from the channel.
     */
    value: function componentWillUnmount() {
      if (this.channelSubscription) {
        this.props.unsubscribe(this.channelSubscription);
      }
      if (this.finalUrl) {
        this.props.stopConnection(this.finalUrl);
      }
    }

    /** @ignore */

  }]);

  function TextLiveViewController(props, context) {
    (0, _classCallCheck3.default)(this, TextLiveViewController);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TextLiveViewController.__proto__ || (0, _getPrototypeOf2.default)(TextLiveViewController)).call(this, props, context));

    _this.channelSubscription = null;
    _this.finalUrl = null;

    _this.updateSubscription = function (nextProps, init) {
      var currentSystem = _this.props.selectedSystem && _this.props.selectedSystem.systemId;

      var nextSystem = nextProps.selectedSystem && nextProps.selectedSystem.systemId;

      if (nextSystem && (init || currentSystem !== nextSystem)) {
        var url = nextProps.url,
            refreshInterval = nextProps.refreshInterval,
            maxRetries = nextProps.maxRetries,
            channel = nextProps.channel,
            group = nextProps.group;


        _this.props.refresh(group);

        if (url) {
          if (_this.finalUrl) {
            _this.props.stopConnection(_this.finalUrl);
          }
          _this.finalUrl = url.replace('{systemId}', (0, _encodeUrl.fixedEncodeURIComponent)(nextSystem));
          _this.props.initConnection(_this.finalUrl);
          _this.props.requestData(group, _this.finalUrl, refreshInterval, maxRetries);
        } else {
          if (_this.channelSubscription) {
            _this.props.unsubscribe(_this.channelSubscription);
          }
          var subscription = _this.props.subscribe(nextSystem + channel, group);
          _this.channelSubscription = subscription.id;
        }
      }
    };

    var title = props.title,
        userSettings = props.userSettings;

    var settingTitle = (0, _lodash.get)(userSettings, 'title', false);
    // If user has a title saved in userSettings, then it should override
    // props.title.
    var newTitle = settingTitle || title;
    /** @private */
    _this.state = {
      title: newTitle,
      snackbarOpen: false
    };

    _this._handleBlur = _this._handleBlur.bind(_this);
    _this._handleChange = _this._handleChange.bind(_this);
    _this._handleSnackbarClose = _this._handleSnackbarClose.bind(_this);
    return _this;
  }

  /** @ignore */


  (0, _createClass3.default)(TextLiveViewController, [{
    key: 'render',
    value: function render() {
      var content = '';
      var subtext = '';
      var subtextPosition = this.props.subtextPosition;

      if ((0, _lodash.isEmpty)(this.props.textLiveView) || !this.props.textLiveView.get('content') || !this.props.textLiveView.get('content').value) {
        content = this.props.content;
        subtext = this.props.subtext;
      } else {
        content = this.props.textLiveView.get('content') && this.props.textLiveView.get('content').value;
        subtext = this.props.textLiveView.get('content') && this.props.textLiveView.get('content').info;
      }

      if (!subtext) {
        subtext = '';
      }

      var childrenProps = (0, _extends3.default)({}, this.props, {
        content: content,
        subtext: subtext,
        subtextPosition: subtextPosition,
        title: this.state.title,
        onBlur: this._handleBlur,
        onChange: this._handleChange
      });
      return (0, _jsx3.default)('div', {
        style: styles.container,
        className: 'text-live'
      }, void 0, _react2.default.createElement(_TextLiveView2.default, childrenProps), (0, _jsx3.default)(_Snackbar2.default, {
        open: this.state.snackbarOpen,
        message: 'Title label cannot be empty',
        onRequestClose: this._handleSnackbarClose
      }));
    }
  }]);
  return TextLiveViewController;
}(_SICKComponent3.default);

/** @ignore */


TextLiveViewController.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  group: _propTypes2.default.string.isRequired,
  channel: _propTypes2.default.string,
  title: _propTypes2.default.string.isRequired,
  content: _propTypes2.default.string,
  subtext: _propTypes2.default.string,
  subtextPosition: _propTypes2.default.string,
  userSettings: _propTypes2.default.object.isRequired,
  selectedSystem: _propTypes2.default.object,
  titleStyle: _propTypes2.default.object,
  inputStyle: _propTypes2.default.object,
  contentStyle: _propTypes2.default.object,
  containerStyle: _propTypes2.default.object,
  textLiveView: _propTypes2.default.object.isRequired,
  url: _propTypes2.default.string,
  refreshInterval: _propTypes2.default.number,
  maxRetries: _propTypes2.default.number });
TextLiveViewController.defaultProps = {
  textLiveView: {} };
var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    userSettings: state.userSettings[ownProps.group] || _defaults.DEFAULT_EMPTY_OBJECT,
    textLiveView: state.textLiveView.get(ownProps.group)
  };
};

exports.default = (0, _SICKPlatform.connect)(mapStateToProps, (0, _extends3.default)({ updateUserSettings: _userSettings.updateUserSettings }, _textLiveView.actions))(TextLiveViewController);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _SICKPlatform = require('../../SICKPlatform');

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _PackageListTable = require('./PackageListTable');

var _PackageListTable2 = _interopRequireDefault(_PackageListTable);

var _defaults = require('../../utils/defaults');

var _conveyorBelt = require('../../ducks/conveyorBelt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RENDER_THROTTLE_INTERVAL = 1000;

var PackageListTableWS = function (_SICKComponent) {
  (0, _inherits3.default)(PackageListTableWS, _SICKComponent);

  /** @ignore */


  /** @ignore */
  function PackageListTableWS(props, context) {
    (0, _classCallCheck3.default)(this, PackageListTableWS);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (PackageListTableWS.__proto__ || (0, _getPrototypeOf2.default)(PackageListTableWS)).call(this, props, context));

    _this.getNewItems = function (nextProps) {
      if (nextProps.conveyorBelt) {
        var items = void 0;
        var newItems = void 0;
        var latest = _this.props.conveyorBelt ? _this.props.conveyorBelt.get('newItem') || {} : {};
        var nextLatest = nextProps.conveyorBelt.get('newItem') || {};

        var isPaused = _this.props.conveyorBelt ? _this.props.conveyorBelt.get('isPaused') : null;
        var nextIsPaused = nextProps.conveyorBelt.get('isPaused') || null;

        if (nextLatest.id !== latest.id) {
          items = nextProps.conveyorBelt.get('items');

          if (!nextIsPaused && nextIsPaused !== isPaused) {
            // was previously paused, need a range of latest items
            newItems = items.slice(items.indexOf(latest) + 1).toArray();
          } else {
            // playing, assume we only need the latest one
            newItems = [nextLatest];
          }

          if (newItems.length) {
            _this.processItems(newItems);
            nextProps.onNewItems && nextProps.onNewItems(newItems);
          }
        }
      }
    };

    _this.processItems = function (newItems) {
      var _this$state = _this.state,
          rows = _this$state.rows,
          items = _this$state.items;


      newItems.forEach(function (item) {
        rows = _this.props.dataTransformer(item).reverse().concat(rows); // newest first
        items.push(item);
      });

      if (rows.length > _conveyorBelt.MAX_ITEMS) {
        rows = rows.slice(0, _conveyorBelt.MAX_ITEMS);
      }
      if (items.length > _conveyorBelt.MAX_ITEMS) {
        items = items.slice(items.length - _conveyorBelt.MAX_ITEMS);
      }

      _this.setState({
        rows: rows,
        items: items
      });
    };

    _this.channelSubscription = null;

    _this.state = {
      rows: props.rows,
      items: []
    };
    _this.lastRender = 0;
    return _this;
  }

  /** @ignore */


  (0, _createClass3.default)(PackageListTableWS, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var system = this.props.selectedSystem && this.props.selectedSystem.systemName;
      if (system) {
        var subscription = this.props.subscribe('' + this.props.selectedSystem.systemName + this.props.channel, this.props.group);
        this.channelSubscription = subscription.id;
      }
    }

    /** @ignore */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.channelSubscription && this.props.unsubscribe(this.channelSubscription);
      this.rerenderTimeout && clearTimeout(this.rerenderTimeout);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var currentSystem = this.props.selectedSystem && this.props.selectedSystem.systemName;

      var nextSystem = nextProps.selectedSystem && nextProps.selectedSystem.systemName;

      var items = this.state.items;

      if (currentSystem !== nextSystem) {
        if (this.channelSubscription) {
          this.props.refresh(this.props.group);
          this.props.unsubscribe(this.channelSubscription);
        }
        var subscription = this.props.subscribe('' + nextSystem + this.props.channel, this.props.group);
        this.channelSubscription = subscription.id;
        window.channelSubscription = this.channelSubscription;
      }

      this.getNewItems(nextProps);

      if (nextProps.selectedMode !== this.state.selectedMode) {
        this.state.rows = nextProps.rows;
        this.state.items = [];
        this.processItems(items);
        // reprocess all items, assuming different selectedMode means different dataTransformer
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this2 = this;

      var time = new Date().getTime();

      if (time - this.lastRender > RENDER_THROTTLE_INTERVAL) {
        // Render this component at the most once per sec.
        this.state.rerender = false;
        this.lastRender = time;
        return true;
      } else {
        clearTimeout(this.rerenderTimeout);
        // force rerender at the end
        this.rerenderTimeout = setTimeout(function () {
          _this2.setState({
            rerender: time
          });
        }, RENDER_THROTTLE_INTERVAL);
      }

      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var props = (0, _extends3.default)({}, this.props);

      props.rows = this.state.rows;
      props.pause = function () {
        return _this3.props.pause(props.group);
      };
      props.play = function () {
        return _this3.props.play(props.group);
      };
      props.isPaused = this.props.conveyorBelt && this.props.conveyorBelt.get('isPaused');

      return _react2.default.createElement(_PackageListTable2.default, props);
    }
  }]);
  return PackageListTableWS;
}(_SICKComponent3.default);

PackageListTableWS.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  rows: _propTypes2.default.array,
  channel: _propTypes2.default.string.isRequired,
  subscribe: _propTypes2.default.func.isRequired,
  unsubscribe: _propTypes2.default.func.isRequired,
  play: _propTypes2.default.func.isRequired,
  pause: _propTypes2.default.func.isRequired,
  selectedSystem: _propTypes2.default.object,
  dataTransformer: _propTypes2.default.func,
  onNewItems: _propTypes2.default.func,
  onRowSelection: _propTypes2.default.func,
  selectedMode: _propTypes2.default.string
});
PackageListTableWS.defaultProps = {
  rows: [],
  dataTransformer: function dataTransformer(item) {
    return [item];
  } // transform 1 item to 1+ row(s)
};


var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    config: state.config,
    userSettings: state.userSettings[ownProps.group] || _defaults.DEFAULT_EMPTY_OBJECT,
    conveyorBelt: state.conveyorBelt.get(ownProps.group)
  };
};

exports.default = (0, _SICKPlatform.connect)(mapStateToProps, { subscribe: _conveyorBelt.subscribe, unsubscribe: _conveyorBelt.unsubscribe, removeItem: _conveyorBelt.removeItem, refresh: _conveyorBelt.refresh, pause: _conveyorBelt.pause, play: _conveyorBelt.play })(PackageListTableWS);
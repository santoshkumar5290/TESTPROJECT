'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeltHeader = undefined;

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

var _BeltSpeedInfo = require('./BeltSpeedInfo');

var _BeltSpeedInfo2 = _interopRequireDefault(_BeltSpeedInfo);

var _BeltTimeFrame = require('./BeltTimeFrame');

var _BeltTimeFrame2 = _interopRequireDefault(_BeltTimeFrame);

var _Toolbar = require('material-ui/Toolbar');

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _WebSocketStatus = require('../WebSocketStatus');

var _WebSocketStatus2 = _interopRequireDefault(_WebSocketStatus);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _SICKMuiTheme = require('../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------
var styles = {
  toolbarText: {
    fontSize: 14,
    lineHeight: '56px',
    marginLeft: 10
  }

  // ------------------------------------
  // Components
  // ------------------------------------

};

// ------------------------------------
// Helpers
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {};
};

/**
 * Component to visualize Conveyor belt's toolbar. Encapsulates the websocket status
 * and settings button.
 * @private
 */

var BeltHeader = exports.BeltHeader = function (_React$Component) {
  (0, _inherits3.default)(BeltHeader, _React$Component);

  function BeltHeader() {
    (0, _classCallCheck3.default)(this, BeltHeader);
    return (0, _possibleConstructorReturn3.default)(this, (BeltHeader.__proto__ || (0, _getPrototypeOf2.default)(BeltHeader)).apply(this, arguments));
  }

  (0, _createClass3.default)(BeltHeader, [{
    key: 'shouldComponentUpdate',


    /** @ignore */
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /** @ignore */


    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          group = _props.group,
          width = _props.width,
          height = _props.height,
          timeframe = _props.timeframe;

      var actionIconColor = _SICKMuiTheme2.default.palette.iconColor;

      return _react2.default.createElement(
        _Toolbar.Toolbar,
        { ref: this.props.handleToolbarRef },
        (0, _jsx3.default)(_Toolbar.ToolbarGroup, {}, void 0, (0, _jsx3.default)(_Toolbar.ToolbarTitle, {
          text: title
        }), (0, _jsx3.default)(_BeltSpeedInfo2.default, {
          group: group,
          style: styles.toolbarText
        })),
        (0, _jsx3.default)(_Toolbar.ToolbarGroup, {
          lastChild: true
        }, void 0, (0, _jsx3.default)(_WebSocketStatus2.default, {
          style: styles.toolbarText
        }), (0, _jsx3.default)(_BeltTimeFrame2.default, {
          group: group,
          width: width,
          height: height,
          timeframe: timeframe,
          style: styles.toolbarText
        }), (0, _jsx3.default)(_IconButton2.default, {
          onClick: this.props.onSettingsClick
        }, void 0, (0, _jsx3.default)(_moreVert2.default, {
          color: actionIconColor
        })))
      );
    }
  }]);
  return BeltHeader;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps)(BeltHeader);
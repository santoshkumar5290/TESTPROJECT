'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableHeader = undefined;

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

var _conveyorBelt = require('../../ducks/conveyorBelt');

var _Toolbar = require('material-ui/Toolbar');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _pauseCircleFilled = require('material-ui/svg-icons/av/pause-circle-filled');

var _pauseCircleFilled2 = _interopRequireDefault(_pauseCircleFilled);

var _playCircleFilled = require('material-ui/svg-icons/av/play-circle-filled');

var _playCircleFilled2 = _interopRequireDefault(_playCircleFilled);

var _viewColumn = require('material-ui/svg-icons/action/view-column');

var _viewColumn2 = _interopRequireDefault(_viewColumn);

var _SICKMuiTheme = require('../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Components
// ------------------------------------

var style = {
  toolbar: {
    height: 56
  },
  label: {
    color: _colors.lightBlue700
  }

  // ------------------------------------
  // Helpers
  // ------------------------------------

};

// ------------------------------------
// Action creators
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    conveyorBelt: state.conveyorBelt.get(ownProps.group)
  };
};

/**
 * Component encapsulating the Activity table header.
 * @private
 */

var TableHeader = exports.TableHeader = function (_React$Component) {
  (0, _inherits3.default)(TableHeader, _React$Component);

  /** @ignore */
  function TableHeader(props, context) {
    (0, _classCallCheck3.default)(this, TableHeader);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (TableHeader.__proto__ || (0, _getPrototypeOf2.default)(TableHeader)).call(this, props, context));

    _this._togglePlay = _this._togglePlay.bind(_this);
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(TableHeader, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var oldPaused = this.props.conveyorBelt && this.props.conveyorBelt.get('isPaused');
      var currentPaused = nextProps.conveyorBelt && nextProps.conveyorBelt.get('isPaused');

      return oldPaused !== currentPaused;
    }
  }, {
    key: '_togglePlay',
    value: function _togglePlay() {
      var _props = this.props,
          conveyorBelt = _props.conveyorBelt,
          group = _props.group;

      if (conveyorBelt && conveyorBelt.get('isPaused')) {
        this.props.play(group);
      } else {
        this.props.pause(group);
      }
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          conveyorBelt = _props2.conveyorBelt,
          title = _props2.title;

      var actionIconColor = _SICKMuiTheme2.default.palette.iconColor;

      var isPaused = conveyorBelt && conveyorBelt.get('isPaused');

      return (0, _jsx3.default)(_Toolbar.Toolbar, {
        style: style.toolbar
      }, void 0, (0, _jsx3.default)(_Toolbar.ToolbarGroup, {}, void 0, (0, _jsx3.default)(_Toolbar.ToolbarTitle, {
        text: title,
        name: 'sap-at-toolbar-title'
      }), (0, _jsx3.default)(_FlatButton2.default, {
        label: isPaused ? 'Play' : 'Pause',
        labelStyle: style.label,
        icon: isPaused ? (0, _jsx3.default)(_playCircleFilled2.default, {
          color: actionIconColor
        }) : (0, _jsx3.default)(_pauseCircleFilled2.default, {
          color: actionIconColor
        }),
        onClick: this._togglePlay,
        name: 'sap-at-toolbar-play-button'
      })), (0, _jsx3.default)(_Toolbar.ToolbarGroup, {
        lastChild: true,
        name: 'sap-at-toolbar-edit-column'
      }, void 0, (0, _jsx3.default)(_IconButton2.default, {
        tooltip: 'Edit Columns',
        onTouchTap: this.props.onColumnSettings
      }, void 0, (0, _jsx3.default)(_viewColumn2.default, {
        color: actionIconColor
      }))));
    }
  }]);
  return TableHeader;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps, { pause: _conveyorBelt.pause, play: _conveyorBelt.play })(TableHeader);
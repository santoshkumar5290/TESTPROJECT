'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableBody = undefined;

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

var _colors = require('material-ui/styles/colors');

var _colorManipulator = require('material-ui/utils/colorManipulator');

var _SICKMuiTheme = require('../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

var _FlexTable = require('./FlexTable');

var _FlexTable2 = _interopRequireDefault(_FlexTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props) {
  return {
    container: {
      height: '100%'
    },
    rowHeight: 55,
    rowHeightFullHostMessage: 80,
    rowColumn: {
      marginRight: 10,
      marginLeft: 10,
      fontSize: 12,
      color: (0, _colorManipulator.fade)(_SICKMuiTheme2.default.palette.textColor, 0.54),
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    rowColumnPackageID: {
      marginRight: 10,
      marginLeft: 10,
      fontSize: 12,
      fontWeight: 400,
      color: _SICKMuiTheme2.default.palette.textColor,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    rowColumnWrapped: {
      marginRight: 10,
      marginLeft: 10,
      fontSize: 12,
      color: (0, _colorManipulator.fade)(_SICKMuiTheme2.default.palette.textColor, 0.54),
      wordBreak: 'break-all',
      whiteSpace: 'normal'
    },
    header: {
      fontSize: 12,
      fontWeight: 400,
      marginRight: 10,
      marginLeft: 10,
      color: (0, _colorManipulator.fade)(_SICKMuiTheme2.default.palette.textColor, 0.54),
      lineHeight: '50px',
      overflow: 'hidden',
      display: 'block',
      float: 'left',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    row: {
      borderBottom: '1px solid ' + _colors.grey300,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden'
    },
    rowWrapper: {
      position: 'absolute'
    },
    grid: {
      position: 'relative'
    }
  };
}

// ------------------------------------
// Components
// ------------------------------------

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Colors
// ------------------------------------

// ------------------------------------
// Helpers
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    conveyorBelt: state.conveyorBelt.get(ownProps.group)
  };
};

/**
 * Component encapsulating the Activity table body.
 * @private
 */

var TableBody = exports.TableBody = function (_React$Component) {
  (0, _inherits3.default)(TableBody, _React$Component);

  /** @ignore */
  function TableBody(props, context) {
    (0, _classCallCheck3.default)(this, TableBody);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (TableBody.__proto__ || (0, _getPrototypeOf2.default)(TableBody)).call(this, props, context));

    _this._rowGetter = _this._rowGetter.bind(_this);
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(TableBody, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_rowGetter',
    value: function _rowGetter(_ref) {
      var index = _ref.index;
      var conveyorBelt = this.props.conveyorBelt;


      var isPaused = conveyorBelt.get('isPaused');
      var items = void 0;
      if (isPaused) {
        items = conveyorBelt.get('frozenItems').valueSeq();
      } else {
        items = conveyorBelt.get('items').valueSeq();
      }

      return items.get(items.size - 1 - index);
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          conveyorBelt = _props.conveyorBelt,
          columns = _props.columns,
          group = _props.group;


      var isPaused = conveyorBelt && conveyorBelt.get('isPaused');
      var rowCount = 0;

      if (isPaused) {
        rowCount = conveyorBelt.get('frozenItems').size;
      } else if (conveyorBelt) {
        rowCount = conveyorBelt.get('items').size;
      }

      var styles = getStyles(this.props);

      return (0, _jsx3.default)('div', {
        style: styles.container
      }, void 0, (0, _jsx3.default)(_FlexTable2.default, {
        group: group,
        columns: columns,
        rowGetter: this._rowGetter,
        rowCount: rowCount,
        styles: styles
      }));
    }
  }]);
  return TableBody;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps)(TableBody);
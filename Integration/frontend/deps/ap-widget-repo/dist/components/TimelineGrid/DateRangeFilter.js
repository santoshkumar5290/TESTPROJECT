'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateRangeFilter = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _SICKComponent = require('../SICKComponent');

var _SICKComponent2 = _interopRequireDefault(_SICKComponent);

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _defaults = require('../../utils/defaults');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _colors = require('material-ui/styles/colors');

var _timelineData = require('../../ducks/timelineData');

var _exportData = require('../../ducks/exportData');

var _DatePicker = require('material-ui/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _dateRange = require('material-ui/svg-icons/action/date-range');

var _dateRange2 = _interopRequireDefault(_dateRange);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _TimePicker = require('material-ui/TimePicker');

var _TimePicker2 = _interopRequireDefault(_TimePicker);

var _SICKMuiTheme = require('../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var style = {
  dialog: {
    width: '375px'
  },
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    margin: '10px 0'
  },
  date: {
    width: '100%'
  },
  time: {
    width: '100%'
  }

  // ------------------------------------
  // Action creators
  // ------------------------------------

};

// ------------------------------------
// Components
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    timelineData: state.timelineData.get(ownProps.group)
  };
};

/**
 * Provides a duration, date and time picker.
 *
 * @private
 */

var DateRangeFilter = exports.DateRangeFilter = function (_React$Component) {
  (0, _inherits3.default)(DateRangeFilter, _React$Component);

  function DateRangeFilter(props, context) {
    (0, _classCallCheck3.default)(this, DateRangeFilter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DateRangeFilter.__proto__ || (0, _getPrototypeOf2.default)(DateRangeFilter)).call(this, props, context));

    _this._handleOpen = function () {
      _this.setState({
        open: true
      });
    };

    _this._handleClose = function () {
      _this.setState({
        open: false
      });
    };

    _this._handleApply = function () {
      var _this$props = _this.props,
          group = _this$props.group,
          requestPackage = _this$props.requestPackage,
          setExportParams = _this$props.setExportParams;


      requestPackage(group, {
        start: _this.state.dateRange.from,
        end: _this.state.dateRange.to,
        action: 'refresh'
      });

      // clear rows on applied filter
      setExportParams(group, {});

      _this._handleClose();
    };

    _this._handleFromDateChange = function (e, ref) {
      var _this$state$dateRange = _this.state.dateRange,
          from = _this$state$dateRange.from,
          to = _this$state$dateRange.to;

      _this._setDateState(new Date(ref.toDateString() + ' ' + from.toTimeString()), to);
    };

    _this._handleFromTimeChange = function (e, ref) {
      var _this$state$dateRange2 = _this.state.dateRange,
          from = _this$state$dateRange2.from,
          to = _this$state$dateRange2.to;

      _this._setDateState(new Date(from.toDateString() + ' ' + ref.toTimeString()), to);
    };

    _this._handleToDateChange = function (e, ref) {
      var _this$state$dateRange3 = _this.state.dateRange,
          from = _this$state$dateRange3.from,
          to = _this$state$dateRange3.to;

      _this._setDateState(from, new Date(ref.toDateString() + ' ' + to.toTimeString()));
    };

    _this._handleToTimeChange = function (e, ref) {
      var _this$state$dateRange4 = _this.state.dateRange,
          from = _this$state$dateRange4.from,
          to = _this$state$dateRange4.to;

      _this._setDateState(from, new Date(to.toDateString() + ' ' + ref.toTimeString()));
    };

    _this._toggleMinimunTimeDiffError = function () {
      _this.setState({
        minimunTimeDiffError: !_this.state.minimunTimeDiffError
      });
    };

    _this._setDateState = function (fromValue, toValue) {
      var diff = toValue - fromValue;
      if (diff < _defaults.MINIMUM_TIME_DIFF) {
        // Show error message.
        _this._toggleMinimunTimeDiffError();
        return;
      }

      _this.setState({
        dateRange: {
          from: fromValue,
          to: toValue
        }
      });
    };

    _this.state = {
      open: false,
      dateRange: {
        from: new Date(),
        to: new Date(Date.now() + _defaults.MINIMUM_TIME_DIFF)
      },
      minimunTimeDiffError: false
    };

    _this._handleOpen = _this._handleOpen.bind(_this);
    _this._handleClose = _this._handleClose.bind(_this);
    _this._handleApply = _this._handleApply.bind(_this);
    _this._handleFromDateChange = _this._handleFromDateChange.bind(_this);
    _this._handleFromTimeChange = _this._handleFromTimeChange.bind(_this);
    _this._handleToDateChange = _this._handleToDateChange.bind(_this);
    _this._handleToTimeChange = _this._handleToTimeChange.bind(_this);
    _this._setDateState = _this._setDateState.bind(_this);
    _this._toggleMinimunTimeDiffError = _this._toggleMinimunTimeDiffError.bind(_this);
    return _this;
  }

  /** @ignore */


  (0, _createClass3.default)(DateRangeFilter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var params = this.props.timelineData.params;


      if (params && (0, _lodash2.default)(params, 'from') && (0, _lodash2.default)(params, 'to')) {
        this.setState({ dateRange: { from: params.start, to: params.end } });
      }
    }

    /** @ignore */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: 'render',
    value: function render() {
      var actionIconColor = _SICKMuiTheme2.default.palette.iconColor;
      var actions = [(0, _jsx3.default)(_FlatButton2.default, {
        label: 'CANCEL',
        onTouchTap: this._handleClose
      })];
      if (!this.state.minimunTimeDiffError) {
        actions.push((0, _jsx3.default)(_FlatButton2.default, {
          label: 'APPLY',
          hoverColor: _colors.yellowA700,
          backgroundColor: _colors.yellowA700,
          primary: true,
          keyboardFocused: true,
          onTouchTap: this._handleApply
        }));
      }
      var _state$dateRange = this.state.dateRange,
          from = _state$dateRange.from,
          to = _state$dateRange.to;

      return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)(_IconButton2.default, {
        onTouchTap: this._handleOpen
      }, void 0, (0, _jsx3.default)(_dateRange2.default, {
        color: actionIconColor
      })), (0, _jsx3.default)(_Dialog2.default, {
        modal: true,
        title: 'Select Time Range',
        actions: actions,
        open: this.state.open,
        onRequestClose: this._handleOpen,
        contentStyle: style.dialog
      }, void 0, (0, _jsx3.default)('div', {
        style: style.container
      }, void 0, (0, _jsx3.default)(_DatePicker2.default, {
        floatingLabelText: 'From',
        value: from,
        onChange: this._handleFromDateChange,
        textFieldStyle: style.date,
        maxDate: to
      }), (0, _jsx3.default)(_TimePicker2.default, {
        hintText: 'From',
        value: from,
        onChange: this._handleFromTimeChange,
        textFieldStyle: style.time,
        dialogBodyStyle: { color: _colors.darkBlack },
        dialogStyle: { color: _colors.darkBlack },
        style: { color: _colors.darkBlack }
      })), (0, _jsx3.default)('div', {
        style: style.container
      }, void 0, (0, _jsx3.default)(_DatePicker2.default, {
        floatingLabelText: 'To',
        value: to,
        onChange: this._handleToDateChange,
        textFieldStyle: style.date,
        minDate: from
      }), (0, _jsx3.default)(_TimePicker2.default, {
        hintText: 'To',
        value: to,
        onChange: this._handleToTimeChange,
        textFieldStyle: style.time,
        dialogBodyStyle: { color: _colors.darkBlack },
        dialogStyle: { color: _colors.darkBlack },
        style: { color: _colors.darkBlack }
      }))), (0, _jsx3.default)(_Snackbar2.default, {
        open: this.state.minimunTimeDiffError,
        message: 'Time selected is invalid - [To] time must be greather than [From] time',
        onRequestClose: this._toggleMinimunTimeDiffError
      }));
    }
  }]);
  return DateRangeFilter;
}(_react2.default.Component);

exports.default = (0, _SICKPlatform.connect)(mapStateToProps, (0, _extends3.default)({}, _timelineData.actions, _exportData.actions))(DateRangeFilter);
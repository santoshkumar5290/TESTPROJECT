'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartController = undefined;

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

var _ChartView = require('./ChartView');

var _ChartView2 = _interopRequireDefault(_ChartView);

var _chart = require('../../ducks/chart');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
/**
 * Provides a charting widget.
 *
 * The widget renders a svg chart via d3 library and is composed of 
 * toolbar and sidebar sub-components.
 *
 * 
 * **Available properties:**
 *
 * | Property               | Type     | Description                                                                                                | Allowed values                          | Default Value   | Required |
 * |------------------------|----------|------------------------------------------------------------------------------------------------------------|-----------------------------------------|-----------------|----------|
 * | `group`                | `String` | Components are grouped using a group ID. Components with matching group IDs share state and user settings. | *                                       |                 | YES      |
 * | `title`                | `String` | The widget title.                                                                                          | *                                       |                 | YES      |
 * | `xLabel`               | `String` | The x-axis label                                                                                           | *                                       |                 | YES      |
 * | `yLabel`               | `String` | The y-axis label                                                                                           | *                                       |                 | YES      |
 * | `seriesSet`            | `Object` | An array of series objects                                                                                 | An array of objects                     |                 | YES      |
 * | `styles`               | `Object` | An object mapping of style objects                                                                         | Object of css attributes                |                 | NO       |
 * | `colors`               | `Array`  | An array of css colors                                                                                     | Array of css colors in hex, rbg, etc.   |                 | NO       |
 * | `chartType`            | `String` | String for initial chart type                                                                              | String 'line' or 'bar'                  | 'line'          | NO       |
 * | `chartMargin`          | `Object` | An object top, left, right, bottom margins in ints around chart graph                                      | Object margin in ints                   |                 | NO       |
 * | `legendWidth`          | `Int`    | An object mapping of style objects                                                                         | Object of css attributes                |                 | NO       |
 * | `url`                  | `String` | URL endpoint to retrieve data from                                                                         | A string url/path                       |                 | NO       |
 * | `maxRetries`           | `Int`    | An integer to that specify how many times to retry the request                                             | A positive int                          |                 | NO       |
 *
 * @example
 * import Chart from 'src/components/Chart'
 * window.chart = Chart.init(document.getElementById('chart'), {
 *   title: 'Read rate histogram',
 *   xLabel: 'Date',
 *   yLabel: 'Read Rate',
 *   seriesSet: [],
 * })
 *
 * @example
 * <Chart
 *   title='Read rate histogram'
 *   xLabel='Date'
 *   yLabel='Read rate'
 *   url='http://some/endpoint'
 * />
 */
/* eslint-enable */

/**
 * Controller for retrieving/translating data and redux store to view component
 *
 * @private
 */
var ChartController = exports.ChartController = function (_SICKComponent) {
  (0, _inherits3.default)(ChartController, _SICKComponent);

  function ChartController() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ChartController);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ChartController.__proto__ || (0, _getPrototypeOf2.default)(ChartController)).call.apply(_ref, [this].concat(args))), _this), _this.componentWillMount = function () {
      _this.props.url && _this.props.group && _this.props.requestData(_this.props.group, _this.props.url, _this.props.maxRetries);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  /** @ignore */


  /** @ignore */


  /**
   * @private
   *
   * Request data.
   */


  (0, _createClass3.default)(ChartController, [{
    key: 'render',


    /** @ignore */
    value: function render() {
      var viewProps = (0, _extends3.default)({}, this.props);

      if (this.props.data) {
        if (this.props.dataTransformer) {
          viewProps.seriesSet = this.props.dataTransformer(this.props.data);
        } else {
          viewProps.seriesSet = this.props.data;
        }
      }

      return _react2.default.createElement(_ChartView2.default, viewProps);
    }
  }]);
  return ChartController;
}(_SICKComponent3.default);

/** @ignore */


ChartController.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  group: _propTypes2.default.string,
  title: _propTypes2.default.string.isRequired,
  xLabel: _propTypes2.default.string.isRequired,
  yLabel: _propTypes2.default.string.isRequired,
  seriesSet: _propTypes2.default.array,
  styles: _propTypes2.default.object,
  colors: _propTypes2.default.array,
  chartType: _propTypes2.default.string,
  chartMargin: _propTypes2.default.object,
  legendWidth: _propTypes2.default.number,
  url: _propTypes2.default.string,
  dataTransformer: _propTypes2.default.func,
  maxRetries: _propTypes2.default.number,
  localization: _propTypes2.default.object.isRequired,
  localizationSet: _propTypes2.default.string });
ChartController.defaultProps = {
  localizationSet: 'widgets',
  maxRetries: 0,
  dataTransformer: function dataTransformer(data) {
    var seriesSet = [];
    var precision = 86400000; // 1 day in ms

    data.statistics.forEach(function (_statistic) {
      var series = {
        name: _statistic.statisticName,
        data: []
      };
      _statistic.data.forEach(function (_data) {
        series.data.push({
          x: Math.ceil(new Date(_data.end.value).getTime() / precision), // reduce precision to 1 day
          xLabel: _data.end.label,
          y: _data.readRate / 100
        });
      });
      seriesSet.push(series);
    });
    return seriesSet;
  } };
var mapStateToProps = function mapStateToProps(state, ownProps) {
  var props = {};

  if (state.chart && ownProps.group === state.chart.group) {
    props.data = state.chart.data;
  }
  return props;
};

exports.default = (0, _SICKPlatform.connect)(mapStateToProps, { requestData: _chart.requestData })(ChartController);
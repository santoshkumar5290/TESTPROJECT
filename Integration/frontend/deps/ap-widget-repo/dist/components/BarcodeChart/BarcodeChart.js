'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

require('./BarcodeChart.scss');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BarcodeChart = function (_SICKComponent) {
  (0, _inherits3.default)(BarcodeChart, _SICKComponent);

  function BarcodeChart() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, BarcodeChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BarcodeChart.__proto__ || (0, _getPrototypeOf2.default)(BarcodeChart)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      _this.updateStateFromProps(_this.props);

      setTimeout(_this.drawChart); // wait for containers to render to get height
      window.addEventListener('resize', _this.drawChart);
    }, _this.componentWillReceiveProps = function (nextProps) {
      _this.updateStateFromProps(nextProps);
    }, _this.componentDidUpdate = function () {
      setTimeout(_this.drawChart); // wait for containers to render to get height
    }, _this.componentWillUnmount = function () {
      window.removeEventListener('resize', _this.drawChart);
    }, _this.updateStateFromProps = function (props) {
      var nextState = {};
      var posLength = props.package.poly.positions.length;

      nextState.units = props.package.poly.unit || 'mm';
      nextState.beltWidth = props.beltWidth || (nextState.units === 'mm' ? 1524 : 60);
      nextState.barcodes = props.barcodes;
      nextState.barcodeSelected = props.defaultSelected || {};
      nextState.packagePositions = props.package.poly.positions.sort(function (a, b) {
        if (a.x < b.x) {
          return -1;
        } else if (a.x > b.x) {
          return 1;
        } else if (a.y > b.y) {
          return -1;
        } else if (a.y < b.y) {
          return 1;
        }

        return 0;
      });

      if (props.orientation === 'vertical') {
        nextState.packagePositions = nextState.packagePositions.map(function (position, index) {
          if (index === posLength - 2) {
            position = props.package.poly.positions[posLength - 1];
          } else if (index === posLength - 1) {
            position = props.package.poly.positions[posLength - 2];
          }

          return position;
        });
      }

      _this.setState(nextState);
    }, _this.caclulateAngledHeight = function (angle, width, height) {
      var rad = angle * (Math.PI / 180);

      return Math.abs(width * Math.sin(rad) + Math.abs(height * Math.cos(rad)));
    }, _this.tickLabelFormat = function (d, i) {
      var _this$props = _this.props,
          localization = _this$props.localization,
          localizationSet = _this$props.localizationSet;
      var units = _this.state.units;


      if (!d) {
        return 0;
      } else {
        return localization.formatMessage(localizationSet + ':barcodeTickLabel', {
          'value': d,
          'units': units
        });
      }
    }, _this.drawChart = function () {
      var _this$state = _this.state,
          barcodes = _this$state.barcodes,
          beltWidth = _this$state.beltWidth;
      var _this$props2 = _this.props,
          orientation = _this$props2.orientation,
          chartMargin = _this$props2.chartMargin;


      if (!_this.wrapperNode || !_this.chartNode) {
        return;
      }

      var chart = d3.select(_this.chartNode);
      chart.selectAll('*').remove();

      var g = chart.append('g');
      var yAxis = g.append('g').classed('y-axis', true);
      var xAxis = g.append('g').classed('x-axis', true);
      var xAxisLines = g.append('g').classed('x-axis', true);

      var innerWidth = _this.chartNode.parentNode.clientWidth - chartMargin.left - chartMargin.right;
      var innerHeight = _this.chartNode.parentNode.clientHeight - chartMargin.top - chartMargin.bottom;
      var sizeRatio = innerHeight / beltWidth;

      _this.chartNode.style.width = innerWidth + chartMargin.left + chartMargin.right;

      var x = d3.scaleLinear().range([0, innerWidth], 1).domain([0, innerWidth / sizeRatio]);

      var y = d3.scaleLinear().range([innerHeight, 0], 1).domain([0, beltWidth]);

      g.attr('transform', 'translate(' + chartMargin.left + ',' + chartMargin.top + ')');

      // X-Axis
      xAxis.attr('transform', 'translate(0,' + innerHeight + ')');
      xAxis.call(d3.axisBottom(x).ticks(3).tickFormat(_this.tickLabelFormat));

      // Y-Axis
      yAxis.call(d3.axisLeft(y).ticks(5).tickFormat(_this.tickLabelFormat));

      // Chart Lines
      if (orientation === 'vertical') {
        xAxisLines.call(d3.axisBottom(x).ticks(3).tickFormat(''));
        xAxisLines.select('path').style('stroke-opacity', 0);
        xAxisLines.selectAll('.tick').select('line').attr('y1', 0).attr('y2', innerHeight).attr('stroke-dasharray', '4, 2').attr('stroke-opacity', 0.5);
      } else if (orientation === 'horizontal') {
        yAxis.selectAll('.tick').select('line').attr('x1', 0).attr('x2', innerWidth).attr('stroke-dasharray', '4, 2').attr('stroke-opacity', 0.5);
      }

      _this.drawPackage(chart, sizeRatio);
      if (barcodes.length) {
        _this.plotBarcodes(chart, sizeRatio);
      }
    }, _this.drawPackage = function (chart, sizeRatio) {
      var _this$state2 = _this.state,
          packagePositions = _this$state2.packagePositions,
          beltWidth = _this$state2.beltWidth;
      var _this$props3 = _this.props,
          chartMargin = _this$props3.chartMargin,
          orientation = _this$props3.orientation;


      if (packagePositions.length < 2) {
        return;
      }

      // Plot Package on chart
      var g = chart.append('g');
      g.attr('transform', 'translate(' + chartMargin.left + ',' + chartMargin.top + ')');

      var poly = [];
      var first = void 0;
      var last = void 0;

      if (orientation === 'vertical') {
        poly = packagePositions;
      } else {
        first = packagePositions[0];
        last = packagePositions[packagePositions.length - 1];

        poly.push({
          x: first.x,
          y: beltWidth
        });
        poly.push({
          x: last.x,
          y: beltWidth
        });
        poly.push({
          x: last.x,
          y: beltWidth - _this.props.package.height
        });
        poly.push({
          x: first.x,
          y: beltWidth - _this.props.package.height
        });
      }

      g.selectAll('polygon').data([poly]).enter().append('polygon').attr('points', function (d) {
        return d.map(function (d) {
          var x = d.x * sizeRatio;
          var y = d.y * sizeRatio;

          return [x, y].join(',');
        }).join(' ');
      }).attr('stroke', 'black').attr('stroke-width', '1px').attr('fill', 'none');

      if (orientation === 'horizontal') {
        var positions = packagePositions.slice(0);
        positions.shift();
        positions.pop();

        positions.map(function (position, i) {
          var line = g.append('line').attr('x1', position.x * sizeRatio).attr('y1', beltWidth * sizeRatio).attr('x2', position.x * sizeRatio).attr('y2', (beltWidth - _this.props.package.height) * sizeRatio).attr('stroke', 'black').attr('stroke-width', '1px');

          if (position.y < first.y) {
            line.attr('stroke-dasharray', '4, 2').attr('stroke-opacity', 0.5);
          }
        });
      }
    }, _this.plotBarcodes = function (chart, sizeRatio) {
      var _this$props4 = _this.props,
          colors = _this$props4.colors,
          orientation = _this$props4.orientation,
          chartMargin = _this$props4.chartMargin;
      var _this$state3 = _this.state,
          barcodes = _this$state3.barcodes,
          barcodeSelected = _this$state3.barcodeSelected,
          beltWidth = _this$state3.beltWidth;

      // Plot Package on chart

      var g = chart.append('g');
      g.attr('transform', 'translate(' + chartMargin.left + ',' + chartMargin.top + ')');

      barcodes.forEach(function (barcode, i) {
        var cx = barcode.position.x;
        var cy = barcode.position.y;

        if (orientation === 'horizontal') {
          cy = beltWidth - barcode.position.z;
        }

        var dot = g.append('g').classed('barcode', true).attr('transform', 'translate(' + cx * sizeRatio + ',' + cy * sizeRatio + ')').on('click', function () {
          _this.onBarcodeClick(barcode, i);
        }).on('mouseover', function () {
          _this.props.onBarcodeHover(barcode, i);
        });

        var size = 10;
        var textSize = size / (size * 10 / 100);
        var textY = size / (size * 25 / 100);
        var isSelected = barcodeSelected && barcodeSelected.value && barcodeSelected.value === barcode.value;

        if (isSelected) {
          size += 2;
        }

        dot.append('circle').attr('r', size).style('fill', colors[i]);

        if (isSelected) {
          dot.append('circle').attr('r', 10).style('fill', colors[i]).style('stroke', 'white');
        }

        dot.append('text').text(i + 1).attr('fill', 'white').attr('text-anchor', 'middle').attr('font-size', textSize).attr('dy', textY);
      });
    }, _this.onBarcodeClick = function (barcode, i) {
      _this.setState({
        barcodeSelected: i
      });

      _this.props.onBarcodeSelection(barcode, i);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BarcodeChart, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          className: 'wrapper',
          ref: function ref(el) {
            _this2.wrapperNode = el;
          },
          style: this.props.styles.wrapper },
        (0, _jsx3.default)('div', {
          className: 'content',
          style: this.props.styles.content
        }, void 0, _react2.default.createElement('svg', {
          className: 'chart',
          style: this.props.styles.chart,
          ref: function ref(el) {
            _this2.chartNode = el;
          } }))
      );
    }
  }]);
  return BarcodeChart;
}(_SICKComponent3.default);

BarcodeChart.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  styles: _propTypes2.default.object,
  colors: _propTypes2.default.array,
  chartMargin: _propTypes2.default.object,
  orientation: _propTypes2.default.string,
  beltWidth: _propTypes2.default.number,
  package: _propTypes2.default.object.isRequired,
  barcodes: _propTypes2.default.array,
  defaultSelected: _propTypes2.default.object,
  onBarcodeSelection: _propTypes2.default.func,
  onBarcodeHover: _propTypes2.default.func,
  localization: _propTypes2.default.object.isRequired,
  localizationSet: _propTypes2.default.string
});
BarcodeChart.defaultProps = {
  styles: {
    wrapper: {
      height: '400px',
      width: '100%',
      overflow: 'hidden'
    },
    content: {
      display: 'inline-block',
      width: '100%',
      height: 'inherit',
      verticalAlign: 'top',
      overflow: 'auto'
    },
    chart: {
      width: '100%',
      height: 'inherit'
    }
  },
  colors: ['#ae017e', '#fdae6b', '#6baed6', '#f768a1', '#8c2d04', '#005a32', '#9e9ac8', '#fd8d3c', '#238b45', '#fdd0a2', '#4292c6', '#9ecae1', '#bcbddc', '#fa9fb5', '#a1d99b', '#4a1486', '#dd3497', '#dadaeb', '#7a0177', '#c6dbef', '#6a51a3', '#807dba', '#d94801', '#41ab5d', '#fcc5c0', '#74c476', '#c7e9c0', '#2171b5', '#084594', '#f16913'],
  chartMargin: { top: 10, right: 25, bottom: 25, left: 50 },
  orientation: 'vertical',
  package: {
    length: 0,
    width: 0,
    height: 0,
    angle: 0,
    gap: 0
  },
  barcodes: [],
  onBarcodeSelection: function onBarcodeSelection() {},
  onBarcodeHover: function onBarcodeHover() {},
  localizationSet: 'widgets'
};
exports.default = BarcodeChart;
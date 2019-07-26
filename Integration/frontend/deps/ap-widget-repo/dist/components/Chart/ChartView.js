'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartView = undefined;

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _ChartToolbar = require('./ChartToolbar');

var _ChartToolbar2 = _interopRequireDefault(_ChartToolbar);

var _ChartSidebar = require('./ChartSidebar');

var _ChartSidebar2 = _interopRequireDefault(_ChartSidebar);

var _ChartTip = require('./ChartTip');

var _ChartTip2 = _interopRequireDefault(_ChartTip);

var _download = require('../../utils/download');

var _canvg = require('../../utils/canvg');

var _canvg2 = _interopRequireDefault(_canvg);

require('./Chart.scss');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
 * | `title`                | `String` | The widget title.                                                                                          | *                                       |                 | YES      |
 * | `xLabel`               | `String` | The x-axis label                                                                                           | *                                       |                 | YES      |
 * | `yLabel`               | `String` | The y-axis label                                                                                           | *                                       |                 | YES      |
 * | `seriesSet`            | `Object` | An array of series objects [{x: int, y: float, xLabel: string}]                                            | An array of objects                     |                 | YES      |
 * | `styles`               | `Object` | An object mapping of style objects                                                                         | Object of css attributes                |                 | NO       |
 * | `colors`               | `Array`  | An array of css colors                                                                                     | Array of css colors in hex, rbg, etc.   |                 | NO       |
 * | `chartType`            | `String` | String for initial chart type                                                                              | String 'line' or 'bar'                  | 'line'          | NO       |
 * | `chartMargin`          | `Object` | An object top, left, right, bottom margins in ints around chart graph                                      | Object margin in ints                   |                 | NO       |
 * | `legendWidth`          | `Int`    | An object mapping of style objects                                                                         | Object of css attributes                |                 | NO       |
 * | `enabledSeriesNames`   | `Array`  | An array of default enabled series names ['stat 1', 'stat 2', 'stat 3']                                    | Array of enabled series names           | []              | NO       |
 * | `showRangeTooltips`    | `Bool`   | An bool value indicate weather to display a range value tooltips                                           | Bool                                    | false           | NO       |
 * 
 * @example
 * import { ChartView } from 'src/components/ChartView'
 * window.chart = Chart.init(document.getElementById('chart'), {
 *   title: 'Read rate histogram',
 *   xLabel: 'Date',
 *   yLabel: 'Read Rate',
 *   seriesSet: [],
 * })
 *
 * @example
 * <ChartView
 *   title='Read rate histogram'
 *   xLabel='Date'
 *   yLabel='Read rate'
 *   seriesSet={[]}
 * />
 */
/* eslint-enable */

// Monkey-patched version hosted locally until fix is released
var typeBar = 'bar';
var typeLine = 'line';
var downloadCSV = 'csv';
var downloadImage = 'image';

var ChartView = exports.ChartView = function (_SICKComponent) {
  (0, _inherits3.default)(ChartView, _SICKComponent);

  /** @ignore */

  /** @ignore */
  function ChartView(props, context) {
    (0, _classCallCheck3.default)(this, ChartView);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ChartView.__proto__ || (0, _getPrototypeOf2.default)(ChartView)).call(this, props, context));

    _initialiseProps.call(_this);

    (0, _keys2.default)(ChartView.defaultProps.styles).forEach(function (key) {
      if (!_this.props.styles[key]) {
        _this.props.styles[key] = ChartView.defaultProps.styles[key];
      }
    });

    _this.state = (0, _extends3.default)({}, _this.props, {
      seriesColors: {},
      seriesDialogOpen: false
    });
    return _this;
  }

  /** @private */


  /** @ignore */


  /** @private */


  /** @private */


  /** @private */


  /** @private */


  /** @private */


  /** @private */


  /** @private */


  /** @private */


  /** @private */


  /** @private */


  (0, _createClass3.default)(ChartView, [{
    key: 'render',


    /** @private */
    value: function render() {
      var _this2 = this;

      return (0, _jsx3.default)(_Paper2.default, {
        className: 'chart-widget',
        zDepth: 1,
        style: this.props.styles.container,
        onClick: this.hideTip
      }, void 0, _react2.default.createElement(
        'div',
        {
          className: this.state.showSeriesToggles ? 'wrapper has-legend' : 'wrapper',
          ref: function ref(el) {
            _this2.wrapperNode = el;
          },
          style: this.props.styles.wrapper },
        _react2.default.createElement(_ChartToolbar2.default, (0, _extends3.default)({}, this.props, {
          styles: this.props.styles.toolbar,
          chartType: this.state.chartType,
          typeBar: typeBar,
          typeLine: typeLine,
          downloadCSV: downloadCSV,
          downloadImage: downloadImage,
          handleChartTypeSelection: this.handleChartTypeSelection,
          handleExportFile: this.handleExportFile,
          openSeriesDialog: this.state.showSeriesToggles && this.openSeriesDialog })),
        (0, _jsx3.default)('div', {
          className: 'content',
          style: (0, _extends3.default)({}, this.props.styles.content, {
            width: this.state.showSeriesToggles ? 'calc(100% - ' + this.props.legendWidth + 'px)' : '100%',
            minWidth: 400
          })
        }, void 0, _react2.default.createElement('svg', {
          className: 'chart',
          style: this.props.styles.chart,
          ref: function ref(el) {
            _this2.chartNode = el;
          } })),
        this.state.showSeriesToggles && this.getSideBar('sidebar-hidden'),
        (0, _jsx3.default)(_ChartTip2.default, {
          setTipNode: function setTipNode(el) {
            _this2.tipNode = el;
          }
        }),
        this.state.showSeriesToggles && (0, _jsx3.default)(_Dialog2.default, {
          title: this.props.localization.formatMessage(this.props.localizationSet + ':chartSeriesDialogTitle'),
          open: this.state.seriesDialogOpen,
          actions: [(0, _jsx3.default)(_FlatButton2.default, {
            label: this.props.localization.formatMessage(this.props.localizationSet + ':closeButton'),
            primary: true,
            onClick: this.closeSeriesDialog
          })],
          onRequestClose: this.closeSeriesDialog,
          autoScrollBodyContent: true
        }, void 0, this.getSideBar())
      ));
    }
  }]);
  return ChartView;
}(_SICKComponent3.default);

ChartView.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  title: _propTypes2.default.string.isRequired,
  xLabel: _propTypes2.default.string.isRequired,
  yLabel: _propTypes2.default.string.isRequired,
  seriesSet: _propTypes2.default.array,
  enabledSeriesNames: _propTypes2.default.array,
  showRangeTooltips: _propTypes2.default.bool,
  styles: _propTypes2.default.object,
  colors: _propTypes2.default.array,
  chartType: _propTypes2.default.string,
  chartMargin: _propTypes2.default.object,
  barChartSeriesMargin: _propTypes2.default.number,
  xAxisAlign: _propTypes2.default.string,
  xAxisHighlight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  legendWidth: _propTypes2.default.number,
  legendImageWidth: _propTypes2.default.number,
  pointClickHandler: _propTypes2.default.func,
  scrollable: _propTypes2.default.bool,
  dataPointWidth: _propTypes2.default.number,
  yRange: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
  localizationSet: _propTypes2.default.string });
ChartView.defaultProps = {
  localizationSet: 'widgets',
  seriesSet: [],
  enabledSeriesNames: [],
  showRangeTooltips: false,
  styles: {
    container: {
      height: '700px',
      width: '100%'
    },
    wrapper: {
      height: '100%',
      overflowY: 'hidden',
      overflowX: 'auto'
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
      height: 'inherit',
      overflowX: 'auto'
    }
  },
  colors: ['#ae017e', '#fdae6b', '#6baed6', '#f768a1', '#8c2d04', '#005a32', '#9e9ac8', '#fd8d3c', '#238b45', '#fdd0a2', '#4292c6', '#9ecae1', '#bcbddc', '#fa9fb5', '#a1d99b', '#4a1486', '#dd3497', '#dadaeb', '#7a0177', '#c6dbef', '#6a51a3', '#807dba', '#d94801', '#41ab5d', '#fcc5c0', '#74c476', '#c7e9c0', '#2171b5', '#084594', '#f16913'],
  chartType: 'line',
  chartMargin: { top: 10, right: 10, bottom: 90, left: 60 },
  barChartSeriesMargin: 3,
  xAxisAlign: 'center',
  legendWidth: 200,
  legendImageWidth: 400,
  scrollable: true,
  dataPointWidth: 10,
  yRange: 'auto' };

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.componentDidMount = function () {
    _this3.updateStatesFromProps(_this3.props);

    setTimeout(_this3.drawChart); // wait for containers to render to get height
    window.addEventListener('resize', _this3.drawChart);
  };

  this.componentWillReceiveProps = function (nextProps) {
    _this3.updateStatesFromProps(nextProps);
  };

  this.updateStatesFromProps = function (props) {
    var nextState = {};
    var seriesColors = {};
    var allSeriesNames = props.seriesSet.map(function (series) {
      return series.name;
    });
    var nonExistingSeriesName = allSeriesNames.length && props.enabledSeriesNames.find(function (enabledSeriesName) {
      return !allSeriesNames.includes(enabledSeriesName);
    });
    var updateColors = false;

    if (props.enabledSeriesNames.length === 0 || nonExistingSeriesName) {
      nextState.enabledSeriesNames = allSeriesNames;
      updateColors = true;
    } else {
      nextState.enabledSeriesNames = props.enabledSeriesNames;
    }

    if ((0, _values2.default)(_this3.state.seriesColors).length === 0 || updateColors) {
      allSeriesNames.forEach(function (seriesName, i) {
        seriesColors[seriesName] = props.colors[i];
      });
      nextState.seriesColors = seriesColors;
    }

    if (props.chartType && props.chartType !== _this3.state.chartType) {
      nextState.chartType = props.chartType;
    }

    nextState.showSeriesToggles = props.seriesSet.length > 1;

    _this3.setState(nextState);
  };

  this.componentDidUpdate = function () {
    setTimeout(_this3.drawChart); // wait for containers to render to get height
  };

  this.componentWillUnmount = function () {
    window.removeEventListener('resize', _this3.drawChart);
  };

  this.normalizeSeriesData = function () {
    var xToYMapping = {};
    var xToLabelMapping = {};
    var normalizedSeries = {};

    _this3.allX = []; // [{x: x, label: xLabel},...]
    _this3.allY = []; // [y,...]

    // get all x and y values and reduce granualrity on the x axis to specified precision
    _this3.state.enabledSeriesNames.forEach(function (seriesName) {
      xToYMapping[seriesName] = {};
      var enabledSeries = _this3.props.seriesSet.find(function (series) {
        return seriesName === series.name;
      });
      enabledSeries && enabledSeries.data.forEach(function (dataPoint) {
        xToYMapping[seriesName][dataPoint.x] = dataPoint.y;

        if (xToLabelMapping[dataPoint.x] === undefined) {
          xToLabelMapping[dataPoint.x] = dataPoint.xLabel;
          _this3.allX.push({
            key: dataPoint.key || dataPoint.x,
            x: dataPoint.x,
            label: dataPoint.xLabel
          });
        }

        _this3.allY.push(dataPoint.y);
      });
    });

    // sort by timestamp
    if (Array.isArray(_this3.allX) && _this3.allX[0] && !isNaN(_this3.allX[0].x)) {
      _this3.allX.sort(function (a, b) {
        return a.x - b.x;
      });
    }

    // make sure all series has a value for each x value, zeroed if needed
    _this3.allX.forEach(function (xObj) {
      _this3.state.enabledSeriesNames.forEach(function (seriesName) {
        var noRead = xToYMapping[seriesName]['' + xObj.x] === undefined;
        var y = !noRead ? xToYMapping[seriesName]['' + xObj.x] : 0;

        if (normalizedSeries[seriesName] === undefined) {
          normalizedSeries[seriesName] = [];
        }
        normalizedSeries[seriesName].push({
          key: xObj.key || xObj.x,
          y: y,
          x: xObj.label,
          name: seriesName,
          noRead: noRead
        });

        _this3.allY.push(y);
      });
    });

    _this3.series = normalizedSeries;
  };

  this.handleChartTypeSelection = function (event, item) {
    _this3.setState({ chartType: item.props.value });
  };

  this.handleSeriesToggle = function (event) {
    var enabledSeriesNames = _this3.state.enabledSeriesNames;

    if (!enabledSeriesNames.includes(event.currentTarget.name)) {
      enabledSeriesNames.push(event.currentTarget.name);
    } else {
      enabledSeriesNames = enabledSeriesNames.filter(function (name) {
        return name !== event.currentTarget.name;
      });
    }

    _this3.setState({ enabledSeriesNames: enabledSeriesNames });
  };

  this.handleAllToggle = function (event) {
    if (_this3.props.seriesSet.length !== _this3.state.enabledSeriesNames.length) {
      _this3.setState({ enabledSeriesNames: _this3.props.seriesSet.map(function (series) {
          return series.name;
        }) });
    } else {
      _this3.setState({ enabledSeriesNames: [] });
    }
  };

  this.getChartWidth = function (chartNode) {
    return chartNode.parentNode.clientWidth - (_this3.props.seriesSet.length > 1 ? _this3.props.legendWidth : 0);
  };

  this.createLegend = function (chartNode) {
    var seriesLabel = void 0,
        seriesText = void 0,
        characterLength = void 0,
        charactersPerLine = void 0,
        textLines = void 0;
    var colorDimension = 20;
    var allowedWidth = _this3.props.legendWidth - colorDimension - 15 - _this3.props.chartMargin.right;
    var height = 0;

    var legend = d3.select(chartNode).append('g');
    legend.attr('transform', 'translate(' + (chartNode.getBBox().width + 5) + ',' + _this3.props.chartMargin.top + ')');

    _this3.state.enabledSeriesNames.forEach(function (seriesName, index) {
      seriesLabel = legend.append('g').classed('legend', true);
      seriesLabel.append('rect').style('stroke-width', 1).attr('width', colorDimension).attr('height', colorDimension).attr('rx', colorDimension / 2).attr('ry', colorDimension / 2).style('fill', _this3.state.seriesColors[seriesName]);

      seriesText = seriesLabel.append('text').text(seriesName).attr('transform', 'translate(' + (colorDimension + 8) + ',' + (colorDimension / 2 + 4) + ')');

      if (seriesText.node().clientWidth > allowedWidth) {
        characterLength = seriesText.node().clientWidth / seriesText.text().length;
        charactersPerLine = Math.round(allowedWidth / characterLength);
        textLines = Math.ceil(seriesText.text().length / charactersPerLine);

        seriesText.remove();

        for (var i = 0; i < textLines; i++) {
          seriesLabel.append('text').text(seriesName.substring(i * charactersPerLine, i * charactersPerLine + charactersPerLine)).attr('transform', 'translate(' + (colorDimension + 8) + ',' + (colorDimension / 2 + 4) * (i + 1) + ')');
        }
      }

      seriesLabel.attr('transform', 'translate(2,' + (height + 4) + ')');

      height += seriesLabel.node().getBBox().height + 5;
    });
    return legend;
  };

  this.handleExportFile = function (event, item) {
    switch (item.props.value) {
      case downloadImage:
        _this3.exportImage();
        break;
      case downloadCSV:
        _this3.exportCSV();
        break;
    }
  };

  this.exportImage = function () {
    // Add legend to chart in dom (but is past visible area so will be hidden).
    var legend = _this3.createLegend(_this3.chartNode);
    var svg = _this3.chartNode.cloneNode(true);
    // Remove legend from chart in dom. No longer needed.
    legend.remove();

    var width = _this3.chartNode.getBBox().width + _this3.props.legendWidth;
    var height = _this3.chartNode.parentNode.clientHeight;
    // set width and height for the image so it can draw it correctly
    // Note: works only if value is defined with 'px' extension
    svg.setAttribute('style', 'width: ' + width + 'px;' + 'height: ' + height + 'px;');

    // rectangle acts as a background so that it appears correctly
    // without a transparent background.
    var rectangle = document.createElement('rect');
    rectangle.setAttribute('width', width + 'px');
    rectangle.setAttribute('height', height + 'px');
    rectangle.setAttribute('fill', '#FFFFFF');
    svg.insertBefore(rectangle, svg.childNodes[0]);

    var xml = new XMLSerializer().serializeToString(svg);
    // create canvas element
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    // perform svg-to-canvas action

    // Known MS Edge issue: https://github.com/canvg/canvg/issues/520
    // using a patched utils version of canvg as a workaround.
    (0, _canvg2.default)(canvas, xml, { ignoreClear: true, ignoreDimensions: true });

    // save through the Blob object so IE / EDGE can save it too
    if (canvas.msToBlob) {
      (0, _download.startFileDownloadFromBlob)(canvas.msToBlob(), '.png', 'chart');
    } else {
      canvas.toBlob(function (blob) {
        (0, _download.startFileDownloadFromBlob)(blob, '.png', 'chart');
      });
    }
  };

  this.exportCSV = function () {
    var rows = [];
    var dates = [];

    _this3.state.enabledSeriesNames.forEach(function (seriesName, index) {
      var row = [];
      var data = _this3.series[seriesName];

      if (data.length) {
        data.forEach(function (point) {
          if (dates.length < data.length) {
            dates.push(point.x);
          }
          row.push(point.y);
        });
      }
      rows.push(row);
    });
    rows.unshift(dates);

    var transposed = rows[0].map(function (col, i) {
      // transpose matrix to match desired orientation
      return rows.map(function (row) {
        return row[i];
      });
    });

    transposed.unshift([_this3.props.xLabel].concat(_this3.state.enabledSeriesNames));

    var csvContent = transposed.map(function (row) {
      return row.join(',');
    }).join('\r\n');

    (0, _download.startFileDownload)(csvContent, '.csv', 'text/csv', 'csv');
  };

  this.drawChart = function () {
    if (!_this3.wrapperNode) {
      return;
    }

    _this3.normalizeSeriesData(); // only normalize for enabled series

    var chart = d3.select(_this3.chartNode);

    chart.selectAll('*').remove();

    d3.select(_this3.wrapperNode).select('.content').style('height', _this3.wrapperNode.parentNode.clientHeight - d3.select(_this3.wrapperNode).select('.toolbar').node().offsetHeight + 'px');

    var minInnerWidth = _this3.chartNode.parentNode.clientWidth - _this3.props.chartMargin.left - _this3.props.chartMargin.right;
    var innerWidth = _this3.allX.length * _this3.props.dataPointWidth * _this3.state.enabledSeriesNames.length;
    var innerHeight = _this3.chartNode.parentNode.clientHeight - _this3.props.chartMargin.top - _this3.props.chartMargin.bottom;
    var g = chart.append('g');
    var xAxis = g.append('g').classed('x-axis', true);
    var yAxis = g.append('g').classed('y-axis', true);
    var that = _this3;

    if (!_this3.props.scrollable || innerWidth < minInnerWidth) {
      innerWidth = minInnerWidth;
    }
    _this3.chartNode.style.width = innerWidth + _this3.props.chartMargin.left + _this3.props.chartMargin.right;

    var x = void 0;
    var y = void 0;
    var yMin = void 0;
    var yMax = void 0;
    var yDif = void 0;
    var element = void 0;
    var ticks = void 0;
    var pointWidth = void 0;
    var xAxisTransformX = void 0;

    _this3.normalizeSeriesData(); // only normalize for enabled series

    x = d3.scaleBand().range([0, innerWidth], 0.1).domain(_this3.allX.map(function (d) {
      return d.label;
    }));

    pointWidth = x.bandwidth() / (_this3.state.enabledSeriesNames.length || 1);

    y = d3.scaleLinear().range([innerHeight, 0], 1);

    if (_this3.props.yRange === 'auto') {
      yMin = d3.min(_this3.allY, function (d) {
        return d;
      });
      yMax = d3.max(_this3.allY, function (d) {
        return d;
      });
      yDif = Math.max(yMax - yMin, 0.1);
      y = y.domain([yMin === yMax ? 0 : Math.max(yMin - yDif / 20, 0), Math.min(yMax + yDif / 10, 1)]);
    } else {
      y = y.domain(_this3.props.yRange);
    }

    g.attr('transform', 'translate(' + _this3.props.chartMargin.left + ',' + _this3.props.chartMargin.top + ')');

    switch (_this3.props.xAxisAlign) {
      case 'left':
        xAxisTransformX = -pointWidth * _this3.state.enabledSeriesNames.length / 2;
        break;
      case 'right':
        xAxisTransformX = pointWidth * _this3.state.enabledSeriesNames.length / 2;
        break;
      case 'center':
      default:
        xAxisTransformX = 0;
        break;
    }
    xAxisTransformX -= _this3.props.barChartSeriesMargin / 2;
    xAxis.attr('transform', 'translate(' + xAxisTransformX + ',' + innerHeight + ')').call(d3.axisBottom(x));

    xAxis.select('path').style('stroke-opacity', _this3.props.xAxisAlign === 'center' ? 0.5 : 0);

    // repeatedly remove every other ticks until no overlaps
    ticks = xAxis.selectAll('.tick');

    while (ticks.size() > 1 && innerWidth / ticks.size() < xAxis.select('.x-axis text').node().getBBox().height + 2) {
      ticks.each(function (d, i) {
        if (i % 2) {
          d3.select(this).remove();
        }
      });
      ticks = xAxis.selectAll('.tick');
    }
    _this3.props.xAxisHighlight && ticks.each(function (d, i) {
      var text = d3.select(this).select('text');
      if (text.html() === that.props.xAxisHighlight) {
        text.attr('font-weight', 'bold');
      }
    });

    // make diagonal
    xAxis.selectAll('.tick text').attr('text-anchor', 'end').attr('transform-origin', '100% 100%').attr('transform', 'rotate(-45)');

    yAxis.call(d3.axisLeft(y).ticks(10, '%'));

    yAxis.select('path').style('stroke-opacity', 0);

    yAxis.selectAll('.tick').select('line').attr('x1', 0).attr('x2', innerWidth).attr('stroke-dasharray', '4, 2').attr('stroke-opacity', 0.5);

    // now add labels to the axes
    element = g.append('text').text(_this3.props.yLabel).classed('y-label', true);
    element.attr('text-anchor', 'middle').attr('transform-origin', '100% 100%').attr('transform', 'translate(' + (element.node().getBBox().height - _this3.props.chartMargin.left) + ',' + innerHeight / 2 + ') rotate(-90)');

    g.append('text').attr('text-anchor', 'middle').attr('transform', 'translate(' + innerWidth / 2 + ',' + (innerHeight + _this3.props.chartMargin.bottom - _this3.props.chartMargin.top) + ')').text(_this3.props.xLabel).classed('x-label', true);

    _this3.state.enabledSeriesNames.forEach(function (seriesName, index) {
      switch (_this3.state.chartType) {
        case typeBar:
          _this3.drawBarChart(g, innerHeight, x, y, seriesName, index);
          break;
        case typeLine:
          _this3.drawLineChart(g, x, y, seriesName, index);
          break;
      }
    });
  };

  this.drawBarChart = function (g, innerHeight, x, y, seriesName, index) {
    var data = _this3.series[seriesName];
    var bandwidth = (x.bandwidth() - _this3.props.barChartSeriesMargin) / _this3.state.enabledSeriesNames.length;
    var color = _this3.state.seriesColors[seriesName];
    var that = _this3;

    if (!data || !data.length) {
      return;
    }

    g.selectAll('.bar').data(data).enter().append('rect').style('stroke-width', 1).attr('width', bandwidth).attr('height', function (d) {
      return innerHeight - y(d.y);
    }).attr('y', function (d) {
      return y(d.y);
    }).attr('x', function (d) {
      return x(d.x) + index * bandwidth;
    }).style('fill', color).on('mouseover', function (d, i, n) {
      if (that.props.pointClickHandler) {
        d3.select(this).style('cursor', 'pointer');
      }
      that.showTip(d, i, n, data);
    }).on('mouseout', _this3.hideTip).on('click', function (d, i, n) {
      if (_this3.props.pointClickHandler) {
        _this3.props.pointClickHandler(d);
        _this3.hideTip(d, i, n);
      }
    });
  };

  this.drawLineChart = function (g, x, y, seriesName, index) {
    var data = _this3.series[seriesName];
    var that = _this3;

    if (!data || !data.length) {
      return;
    }

    var valueline = d3.line().x(function (d) {
      return x(d.x) + x.bandwidth() / 2;
    }).y(function (d) {
      return y(d.y);
    });

    var color = _this3.state.seriesColors[seriesName];

    g.append('path').style('fill', 'none').style('stroke', color).style('stroke-width', 2).attr('d', valueline(data));

    g.selectAll('dot').data(data).enter().append('circle').style('stroke-width', 1).style('fill', color).attr('r', 3.5).attr('cx', function (d) {
      return x(d.x) + x.bandwidth() / 2;
    }).attr('cy', function (d) {
      return y(d.y);
    }).on('mouseover', function (d, i, n) {
      if (that.props.pointClickHandler) {
        d3.select(this).style('cursor', 'pointer');
      }
      that.showTip(d, i, n);
    }).on('mouseout', _this3.hideTip).on('click', function (d, i, n) {
      if (_this3.props.pointClickHandler) {
        _this3.props.pointClickHandler(d);
        _this3.hideTip(d, i, n);
      }
    });
  };

  this.showTip = function (d, i, n, data) {
    var content = _util2.default.format('<strong>%s</strong><hr style="border: solid 2px %s;"/>', d.name, _this3.state.seriesColors[d.name]);

    content += _util2.default.format('<span>%s: %s</span><br/>', _this3.props.xLabel, _this3.props.showRangeTooltips ? i === 0 || i === data.length - 1 ? d.x : d.x + ' - ' + data[i + 1].x : d.x);
    content += _util2.default.format('<span>%s: %s</span><br/>', _this3.props.yLabel, d.noRead ? 'N/A' : parseFloat(100 * d.y).toFixed(1) + '%');

    d3.select(_this3.tipNode).select('.content').html(content);
    d3.select(_this3.tipNode).style('left', d3.event.pageX - _this3.tipNode.offsetWidth / 2 + 'px').style('top', d3.event.pageY - _this3.tipNode.offsetHeight - 12 + 'px').style('opacity', 1);

    d3.select(n[i]).style('stroke', 'rgba(0, 0, 0, 0.7)');
  };

  this.hideTip = function (d, i, n) {
    d3.select(_this3.tipNode).style('opacity', 0);

    d && i && n && d3.select(n[i]).style('stroke', 'none');
  };

  this.openSeriesDialog = function () {
    _this3.setState({
      seriesDialogOpen: true
    });
  };

  this.closeSeriesDialog = function () {
    _this3.setState({
      seriesDialogOpen: false
    });
  };

  this.getSideBar = function (className) {
    return _react2.default.createElement(_ChartSidebar2.default, (0, _extends3.default)({}, _this3.props, {
      className: 'sidebar ' + (className || ''),
      styles: _this3.props.styles.sidebar,
      enabledSeriesNames: _this3.state.enabledSeriesNames,
      seriesColors: _this3.state.seriesColors,
      handleSeriesToggle: _this3.handleSeriesToggle,
      handleAllToggle: _this3.handleAllToggle }));
  };
};

exports.default = ChartView;
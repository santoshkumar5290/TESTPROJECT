'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

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

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

require('./MediaOverlay.scss');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OVERLAY_QUALIFIER = 'Qualifier';

var MediaOverlay = function (_SICKComponent) {
  (0, _inherits3.default)(MediaOverlay, _SICKComponent);

  function MediaOverlay() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MediaOverlay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MediaOverlay.__proto__ || (0, _getPrototypeOf2.default)(MediaOverlay)).call.apply(_ref, [this].concat(args))), _this), _this.generateOverlays = function () {
      var overlay = _this.props.overlay;


      if (!_this.overlayNode) {
        return;
      }

      if (!overlay.imageinfo) {
        overlay.imageinfo = MediaOverlay.defaultProps.overlay.imageinfo;
      }
      if (!overlay.imageinfo.origin) {
        overlay.imageinfo.origin = MediaOverlay.defaultProps.overlay.imageinfo.origin;
      }

      var container = d3.select(_this.overlayNode);
      container.selectAll('*').remove();

      var g = container.append('g');
      g.attr('transform', 'translate(' + overlay.imageinfo.origin.x + ',' + overlay.imageinfo.origin.y + ')');

      (0, _keys2.default)(overlay.overlays).map(function (key) {
        var overlays = overlay.overlays[key];

        if (overlays instanceof Array) {
          overlays.map(function (overlay) {
            _this.generateOverlay(key, g, overlay);
          });
        } else {
          _this.generateOverlay(key, g, overlays);
        }
      });
    }, _this.generateOverlay = function (type, g, overlay) {
      var selectedOverlays = _this.props.selectedOverlays;

      // Check if should be shown based on what's in selectedOverlays

      if (type === 'symbol' || selectedOverlays.indexOf(overlay.name) === -1) {
        return;
      }

      switch (type) {
        case 'symbol':
          _this.generateSymbol(g, overlay);
          break;

        case 'box':
          // case 'parcel':
          _this.generateBox(g, overlay);
          break;

        case 'text':
          _this.generateText(g, overlay);
          break;

        case 'line':
          _this.generateLine(g, overlay);
          break;
      }
    }, _this.generateBox = function (g, overlay) {
      var polygon = g.append('polygon').attr('points', overlay.pos.join(' ')).attr('stroke', overlay.color || 'black').attr('stroke-width', '5px');

      if (overlay.hasOwnProperty('fillcolor')) {
        polygon.attr('fill', overlay.fillcolor);
      } else {
        polygon.attr('fill', 'none');
      }
    }, _this.generateText = function (g, overlay) {
      var _ref2 = _this.props.overlay || {},
          imageinfo = _ref2.imageinfo;

      if (!imageinfo.size) {
        imageinfo.size = MediaOverlay.defaultProps.overlay.imageinfo.size;
      }

      var fontsize = imageinfo.size.length / 35;
      g.append('text').attr('x', overlay.pos[0]).attr('y', overlay.pos[1] * 1 + fontsize / 2).attr('font-size', fontsize).attr('fill', overlay.color).text(overlay.string);
    }, _this.generateLine = function (g, overlay) {
      g.append('line').attr('x1', overlay.pos[0]).attr('y1', overlay.pos[1]).attr('x2', overlay.pos[2]).attr('y2', overlay.pos[3]).attr('stroke', overlay.color).attr('stroke-width', '5px');
    }, _this.createQualifier = function (index, overlay) {
      return (0, _jsx3.default)('div', {
        className: 'qualifier-item'
      }, void 0, (0, _jsx3.default)('div', {}, void 0, '#', index + 1), (0, _jsx3.default)('div', {}, void 0, overlay.type), overlay.hasOwnProperty('qualifier') && (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('div', {}, void 0, 'rq: ', overlay.qualifier.rq), (0, _jsx3.default)('div', {}, void 0, 'fvec: ', overlay.qualifier.fvec)), overlay.hasOwnProperty('symbolinfo') && overlay.symbolinfo.hasOwnProperty('qualifier') && (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('div', {}, void 0, 'rq: ', overlay.symbolinfo.qualifier.rq), (0, _jsx3.default)('div', {}, void 0, 'fvec: ', overlay.symbolinfo.qualifier.fvec)));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MediaOverlay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // wait for containers to render to get height
      setTimeout(this.generateOverlays);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // wait for containers to render to get height
      setTimeout(this.generateOverlays);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          overlay = _props.overlay,
          style = _props.style,
          selectedOverlays = _props.selectedOverlays;


      if (!overlay.imageinfo) {
        overlay.imageinfo = MediaOverlay.defaultProps.overlay.imageinfo;
      }
      if (!overlay.imageinfo.origin) {
        overlay.imageinfo.origin = MediaOverlay.defaultProps.overlay.imageinfo.origin;
      }
      if (!overlay.imageinfo.size) {
        overlay.imageinfo.size = MediaOverlay.defaultProps.overlay.imageinfo.size;
      }

      var viewBox = [overlay.imageinfo.origin.x, overlay.imageinfo.origin.y, overlay.imageinfo.size.width, overlay.imageinfo.size.length];
      var showQualifiers = overlay.overlays.hasOwnProperty('symbol') && selectedOverlays.indexOf(OVERLAY_QUALIFIER) !== -1;

      return (0, _jsx3.default)('div', {
        className: 'media-overlay',
        style: style
      }, void 0, _react2.default.createElement('svg', {
        version: '1.1.1',
        preserveAspectRatio: 'xMinYMin meet',
        viewBox: viewBox.join(' '),
        ref: function ref(el) {
          _this2.overlayNode = el;
        } }), showQualifiers && (0, _jsx3.default)('div', {
        className: 'qualifier-overlay'
      }, void 0, overlay.overlays.symbol.map(function (overlay, index) {
        return _this2.createQualifier(index, overlay);
      })));
    }
  }]);
  return MediaOverlay;
}(_SICKComponent3.default);

MediaOverlay.propTypes = {
  overlay: _propTypes2.default.object.isRequired,
  selectedOverlays: _propTypes2.default.array,
  style: _propTypes2.default.object
};
MediaOverlay.defaultProps = {
  overlay: {
    imageinfo: {
      size: {
        length: 0,
        width: 0
      },
      origin: {
        x: 0,
        y: 0
      }
    },
    overlays: {}
  },
  selectedOverlays: [],
  style: {}
};
exports.default = MediaOverlay;
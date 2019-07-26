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

var _ImageViewer = require('../ImageViewer');

var _ImageViewer2 = _interopRequireDefault(_ImageViewer);

var _MediaOverlay = require('../MediaOverlay');

var _MediaOverlay2 = _interopRequireDefault(_MediaOverlay);

require('./DeviceViewer.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeviceViewer = function (_SICKComponent) {
  (0, _inherits3.default)(DeviceViewer, _SICKComponent);

  function DeviceViewer(props) {
    (0, _classCallCheck3.default)(this, DeviceViewer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DeviceViewer.__proto__ || (0, _getPrototypeOf2.default)(DeviceViewer)).call(this, props));

    _this.handleImageViewed = function (img, i) {
      var overlays = _this.props.overlays;

      _this.setState({ overlay: overlays[i] });
    };

    _this.handleImageTranformed = function (img) {
      var overlayStyle = {
        width: img.style.width,
        height: img.style.height,
        marginLeft: img.style['margin-left'],
        marginTop: img.style['margin-top'],
        transform: img.style.transform
      };
      _this.setState({ overlayStyle: overlayStyle });
    };

    _this.state = {
      overlayStyle: {}
    };
    return _this;
  }

  /** @ignore */


  (0, _createClass3.default)(DeviceViewer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          images = _props.images,
          styles = _props.styles,
          play = _props.play,
          selectedOverlays = _props.selectedOverlays;
      var _state = this.state,
          overlay = _state.overlay,
          overlayStyle = _state.overlayStyle;


      return (0, _jsx3.default)('div', {
        className: 'device-viewer',
        style: styles.container
      }, void 0, (0, _jsx3.default)(_ImageViewer2.default, {
        images: images,
        styles: styles,
        play: play,
        imageViewedHandler: this.handleImageViewed,
        imageTranformedHandler: this.handleImageTranformed
      }), overlay && overlay.imageinfo && (0, _jsx3.default)(_MediaOverlay2.default, {
        overlay: overlay,
        selectedOverlays: selectedOverlays,
        style: (0, _extends3.default)({}, overlayStyle, { zIndex: 2 })
      }));
    }
  }]);
  return DeviceViewer;
}(_SICKComponent3.default);

DeviceViewer.propTypes = {
  images: _propTypes2.default.array,
  overlays: _propTypes2.default.array,
  selectedOverlays: _propTypes2.default.array,
  styles: _propTypes2.default.object,
  play: _propTypes2.default.bool };
DeviceViewer.defaultProps = {
  images: [],
  overlays: [],
  selectedOverlays: [],
  styles: {}
};
exports.default = DeviceViewer;
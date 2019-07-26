'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _checkCircle = require('material-ui/svg-icons/action/check-circle');

var _checkCircle2 = _interopRequireDefault(_checkCircle);

var _rotateLeft = require('material-ui/svg-icons/image/rotate-left');

var _rotateLeft2 = _interopRequireDefault(_rotateLeft);

var _rotateRight = require('material-ui/svg-icons/image/rotate-right');

var _rotateRight2 = _interopRequireDefault(_rotateRight);

var _colors = require('material-ui/styles/colors');

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _sharedDeviceStyles = require('./sharedDeviceStyles');

var _sharedDeviceStyles2 = _interopRequireDefault(_sharedDeviceStyles);

var _ImageLoader = require('../ImageLoader');

var _ImageLoader2 = _interopRequireDefault(_ImageLoader);

var _MediaOverlay = require('../MediaOverlay');

var _MediaOverlay2 = _interopRequireDefault(_MediaOverlay);

var _styles = require('./styles');

require('./DeviceLoader.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = (0, _jsx3.default)('div', {});

var DeviceLoader = function (_SICKComponent) {
  (0, _inherits3.default)(DeviceLoader, _SICKComponent);

  function DeviceLoader(props) {
    (0, _classCallCheck3.default)(this, DeviceLoader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DeviceLoader.__proto__ || (0, _getPrototypeOf2.default)(DeviceLoader)).call(this, props));

    _this.rotateImages = function (direction) {
      _this.setState({
        rotation: _this.state.rotation + direction * 90
      });
    };

    _this.getStyle = function (styleKey) {
      var _this$props = _this.props,
          expanded = _this$props.expanded,
          styles = _this$props.styles;


      var mergedStyle = null;
      if (expanded) {
        if (_styles.expandedStyles[styleKey]) {
          mergedStyle = (0, _assign2.default)({}, mergedStyle, _styles.expandedStyles[styleKey]);
        }
        if (styles.expanded && styles.expanded[styleKey]) {
          mergedStyle = (0, _assign2.default)({}, mergedStyle, styles.expanded[styleKey]);
        }
      }

      if (mergedStyle === null) {
        if (_styles.defaultStyles[styleKey]) {
          mergedStyle = (0, _assign2.default)({}, mergedStyle, _styles.defaultStyles[styleKey]);
        }
        if (styles.default && styles.default[styleKey]) {
          mergedStyle = (0, _assign2.default)({}, mergedStyle, styles.default[styleKey]);
        }
      }

      return mergedStyle || {};
    };

    _this.state = {
      rotation: null,
      reloading: false,
      shownImageIndex: 0
    };
    return _this;
  }

  (0, _createClass3.default)(DeviceLoader, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (this.props.styles.image.height !== nextProps.styles.image.height) {
        this.setState({
          reloading: true
        });
        setTimeout(function () {
          _this2.setState({
            reloading: false
          });
        }, 0);
      }

      // DeviceGroupLoader case
      if (nextProps.rotation !== null && nextProps.rotation !== undefined) {
        this.setState({
          rotation: nextProps.rotation
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.showImageInterval) clearInterval(this.showImageInterval);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.showImageInterval) clearInterval(this.showImageInterval);
      if (this.state.reloading === true) return null;
      var _props = this.props,
          device = _props.device,
          images = _props.images,
          overlays = _props.overlays;


      var hasMultipleImages = this.props.images.length > 1;
      var imageStyles = (0, _assign2.default)({}, this.getStyle('image'), { height: this.props.styles.image.height });
      var titleBoxStyles = (0, _assign2.default)({}, this.getStyle('titleBox'), { height: this.props.styles.image.height });

      var overlayTransform = {};

      if (this.state.rotation && this.state.rotation % 360) {
        overlayTransform.transform = 'rotate(' + this.state.rotation + 'deg)';
      }

      // Cycle images if multiple and non-expanded
      if (!this.props.expanded && hasMultipleImages) {
        this.showImageInterval = setInterval(function () {
          if (this.state.shownImageIndex < 1) {
            this.setState({ shownImageIndex: this.state.shownImageIndex += 1 });
          } else {
            this.setState({ shownImageIndex: 0 });
          }
        }.bind(this), 4000);
      }

      return (0, _jsx3.default)('div', {
        style: (0, _assign2.default)({}, this.getStyle('container'))
      }, void 0, (0, _jsx3.default)('div', {
        style: this.getStyle('imagesContainer'),
        onTouchTap: function onTouchTap() {
          return _this3.props.onTouchTap(device);
        }
      }, void 0, this.props.expanded && (0, _jsx3.default)('div', {
        style: titleBoxStyles
      }, void 0, (0, _jsx3.default)('div', {
        style: this.getStyle('titleBoxBarcodeIndicator')
      }, void 0, this.props.device.barcodeCount > 0 && (0, _jsx3.default)(_checkCircle2.default, {
        style: { fill: _colors.green500 }
      })), (0, _jsx3.default)('div', {
        style: this.getStyle('titleBoxHeader')
      }, void 0, device.deviceName), (0, _jsx3.default)('div', {
        style: this.getStyle('titleBoxContent')
      }, void 0, device.deviceType ? device.deviceType.name : '-'), (0, _jsx3.default)('div', {
        style: this.getStyle('titleBoxContent')
      }, void 0, device.barcodeCount, ' Barcodes')), images.map(function (image, index) {
        return (0, _jsx3.default)('div', {
          className: 'wrapper',
          style: (0, _extends3.default)({}, _this3.getStyle('imageContainer'), {
            borderRight: index === images.length - 1 ? 'none' : '',
            display: _this3.props.expanded || _this3.state.shownImageIndex === index ? 'inline-block' : 'none'
          })
        }, void 0, (0, _jsx3.default)(_ImageLoader2.default, {
          image: image,
          styles: imageStyles,
          rotation: _this3.state.rotation
        }), overlays && overlays[index] && overlays[index].imageinfo && (0, _jsx3.default)(_MediaOverlay2.default, {
          overlay: overlays[index],
          selectedOverlays: _this3.props.selectedOverlays,
          style: (0, _extends3.default)({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }, overlayTransform)
        }));
      })), this.props.multiDevice ? null : (0, _jsx3.default)('div', {
        className: 'device-loader-bar',
        style: this.getStyle('deviceLoaderBar')
      }, void 0, (0, _jsx3.default)('div', {}, void 0, this.props.expanded ? null : device.deviceName), this.props.expanded ? (0, _jsx3.default)('div', {
        style: _sharedDeviceStyles2.default.rotationContainer
      }, void 0, (0, _jsx3.default)(_rotateLeft2.default, {
        style: _sharedDeviceStyles2.default.leftRotationButton,
        onClick: function onClick() {
          return _this3.rotateImages(-1);
        }
      }), (0, _jsx3.default)(_rotateRight2.default, {
        style: _sharedDeviceStyles2.default.rightRotationButton,
        onClick: function onClick() {
          return _this3.rotateImages(1);
        }
      })) : _ref, !this.props.expanded ? this.props.device.barcodeCount > 0 && (0, _jsx3.default)(_checkCircle2.default, {
        style: { fill: _colors.green500 }
      }) : null));
    }
  }]);
  return DeviceLoader;
}(_SICKComponent3.default);

DeviceLoader.propTypes = {
  device: _propTypes2.default.object.isRequired,
  images: _propTypes2.default.array.isRequired,
  expanded: _propTypes2.default.bool.isRequired,
  styles: _propTypes2.default.object,
  multiDevice: _propTypes2.default.bool,
  overlays: _propTypes2.default.array,
  selectedOverlays: _propTypes2.default.array,
  onTouchTap: _propTypes2.default.func,
  rotation: _propTypes2.default.number
};
DeviceLoader.defaultProps = {
  styles: _styles.defaultStyles,
  multiDevice: false,
  onTouchTap: function onTouchTap() {}
};
exports.default = DeviceLoader;
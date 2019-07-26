'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _rotateLeft = require('material-ui/svg-icons/image/rotate-left');

var _rotateLeft2 = _interopRequireDefault(_rotateLeft);

var _rotateRight = require('material-ui/svg-icons/image/rotate-right');

var _rotateRight2 = _interopRequireDefault(_rotateRight);

var _colors = require('material-ui/styles/colors');

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _DeviceLoader = require('../DeviceLoader');

var _DeviceLoader2 = _interopRequireDefault(_DeviceLoader);

var _sharedDeviceStyles = require('../DeviceLoader/sharedDeviceStyles');

var _sharedDeviceStyles2 = _interopRequireDefault(_sharedDeviceStyles);

require('./DeviceGroupLoader.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyles = {
  container: {
    margin: 0,
    display: 'inline-block',
    minWidth: 200,
    maxWidth: '100%',
    border: '2px solid ' + _colors.black,
    overflow: 'hidden'
  },
  devicesContainer: {
    width: '100%',
    overflow: 'hidden',
    display: 'block',
    background: _colors.grey300
  },
  devicesScroller: {
    overflowX: 'auto',
    overflowY: 'hidden'
  },
  loaderBar: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    backgroundColor: _colors.black,
    color: _colors.white,
    padding: 10,
    width: '100%',
    height: 40
  },
  imagesContainer: {
    display: 'flex'
  },
  image: {
    height: 300,
    width: 'auto',
    overflow: 'hidden',
    flexShrink: 0
  },
  imageContainer: {
    display: 'flex',
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  }
};

var DeviceGroupLoader = function (_SICKComponent) {
  (0, _inherits3.default)(DeviceGroupLoader, _SICKComponent);

  function DeviceGroupLoader(props) {
    (0, _classCallCheck3.default)(this, DeviceGroupLoader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DeviceGroupLoader.__proto__ || (0, _getPrototypeOf2.default)(DeviceGroupLoader)).call(this, props));

    _this.rotateImages = function (direction) {
      _this.setState({
        rotation: _this.state.rotation + direction * 90
      });
    };

    _this.state = {
      rotation: 0
    };
    return _this;
  }

  (0, _createClass3.default)(DeviceGroupLoader, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          devices = _props.devices,
          images = _props.images,
          overlays = _props.overlays,
          selectedOverlays = _props.selectedOverlays;

      var deviceLoaderStyles = (0, _assign2.default)({}, this.props.styles, {
        container: {
          margin: 0,
          display: 'block'
        }
      });

      return (0, _jsx3.default)('div', {
        style: (0, _assign2.default)({}, defaultStyles.container, this.props.styles.container),
        className: 'device-group-loader'
      }, void 0, (0, _jsx3.default)('div', {
        className: 'device-group-loader-devices',
        style: defaultStyles.devicesContainer
      }, void 0, (0, _jsx3.default)('div', {
        style: defaultStyles.devicesScroller
      }, void 0, (0, _jsx3.default)('div', {
        className: 'device-group__devices-bounding'
      }, void 0, devices.map(function (device, index) {
        var _images = images[device.deviceId];
        var _overlays = overlays.get(device.deviceId);
        return (0, _jsx3.default)(_DeviceLoader2.default, {
          device: device,
          images: _images,
          overlays: _overlays,
          selectedOverlays: selectedOverlays,
          expanded: true,
          styles: index === 0 ? deviceLoaderStyles : (0, _assign2.default)({ titleBox: { borderTop: 'none' } }, deviceLoaderStyles),
          barcode: device.barcode,
          multiDevice: true,
          onTouchTap: _this2.props.onTouchTap,
          rotation: _this2.state.rotation
        }, device.deviceId);
      })))), (0, _jsx3.default)('div', {
        style: defaultStyles.loaderBar
      }, void 0, (0, _jsx3.default)('div', {
        style: _sharedDeviceStyles2.default.rotationContainer
      }, void 0, (0, _jsx3.default)(_rotateLeft2.default, {
        style: _sharedDeviceStyles2.default.leftRotationButton,
        onClick: function onClick() {
          return _this2.rotateImages(-1);
        }
      }), (0, _jsx3.default)(_rotateRight2.default, {
        style: _sharedDeviceStyles2.default.rightRotationButton,
        onClick: function onClick() {
          return _this2.rotateImages(1);
        }
      }))));
    }
  }]);
  return DeviceGroupLoader;
}(_SICKComponent3.default);

DeviceGroupLoader.propTypes = {
  devices: _propTypes2.default.array.isRequired,
  images: _propTypes2.default.object.isRequired,
  overlays: _propTypes2.default.object,
  selectedOverlays: _propTypes2.default.array,
  styles: _propTypes2.default.object.isRequired,
  systemId: _propTypes2.default.string.isRequired,
  packageId: _propTypes2.default.string.isRequired,
  onTouchTap: _propTypes2.default.func.isRequired
};
exports.default = DeviceGroupLoader;
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

var _materialUiImage = require('material-ui-image');

var _materialUiImage2 = _interopRequireDefault(_materialUiImage);

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

require('./ImageLoader.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 = (0, _jsx3.default)(_CircularProgress2.default, {
  className: 'loader',
  size: 100,
  thickness: 8
});

var ImageLoader = function (_SICKComponent) {
  (0, _inherits3.default)(ImageLoader, _SICKComponent);

  function ImageLoader() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ImageLoader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ImageLoader.__proto__ || (0, _getPrototypeOf2.default)(ImageLoader)).call.apply(_ref, [this].concat(args))), _this), _this.isHorizontal = function () {
      return _this.props.rotation / 90 % 2 === 0;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ImageLoader, [{
    key: 'render',
    value: function render() {
      var containerStyles = {
        height: this.isHorizontal() ? this.props.styles.height : '',
        width: this.isHorizontal() ? '' : this.props.styles.height,
        minWidth: this.props.image ? '' : this.props.styles.height
      };

      if (this.props.rotation && this.props.rotation % 360) {
        containerStyles.transform = 'rotate(' + this.props.rotation + 'deg)';
      }

      return (0, _jsx3.default)('div', {
        className: 'image-loader',
        style: (0, _extends3.default)({}, this.props.styles, containerStyles),
        onTouchTap: this.props.onTouchTap
      }, void 0, !this.props.image ? _ref2 : (0, _jsx3.default)(_materialUiImage2.default, {
        src: this.props.image,
        color: 'white',
        imageStyle: {
          width: this.isHorizontal() ? 'auto' : '',
          height: this.isHorizontal() ? '' : 'auto',
          maxHeight: this.isHorizontal() ? '100%' : '',
          maxWidth: this.isHorizontal() ? '' : '100%',
          position: 'inherit',
          display: 'block',
          margin: '0 auto'
        },
        style: {
          display: 'inline'
        }
      }));
    }
  }]);
  return ImageLoader;
}(_SICKComponent3.default);

ImageLoader.propTypes = {
  image: _propTypes2.default.string,
  onTouchTap: _propTypes2.default.func.isRequired,
  styles: _propTypes2.default.object.isRequired,
  rotation: _propTypes2.default.number
};
ImageLoader.defaultProps = {
  rotation: 0
};
exports.default = ImageLoader;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageViewer = undefined;

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _rotateLeft = require('material-ui/svg-icons/image/rotate-left');

var _rotateLeft2 = _interopRequireDefault(_rotateLeft);

var _rotateRight = require('material-ui/svg-icons/image/rotate-right');

var _rotateRight2 = _interopRequireDefault(_rotateRight);

var _add = require('material-ui/svg-icons/content/add');

var _add2 = _interopRequireDefault(_add);

var _remove = require('material-ui/svg-icons/content/remove');

var _remove2 = _interopRequireDefault(_remove);

var _save = require('material-ui/svg-icons/content/save');

var _save2 = _interopRequireDefault(_save);

var _centerFocusStrong = require('material-ui/svg-icons/image/center-focus-strong');

var _centerFocusStrong2 = _interopRequireDefault(_centerFocusStrong);

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _viewerjs = require('viewerjs');

var _viewerjs2 = _interopRequireDefault(_viewerjs);

var _images = require('../../ducks/images');

var _download = require('../../utils/download');

require('./Viewer.scss');

require('./ImageViewer.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENT_TRANSITION_END = 'transitionend';
var EVENT_POINTER_UP = window.PointerEvent ? 'pointermove' : 'mousemove touchmove';

var _ref = (0, _jsx3.default)(_CircularProgress2.default, {
  className: 'loader',
  size: 100,
  thickness: 8
});

var _ref2 = (0, _jsx3.default)(_save2.default, {});

var _ref3 = (0, _jsx3.default)(_rotateLeft2.default, {});

var _ref4 = (0, _jsx3.default)(_rotateRight2.default, {});

var _ref5 = (0, _jsx3.default)(_add2.default, {});

var _ref6 = (0, _jsx3.default)(_remove2.default, {});

var _ref7 = (0, _jsx3.default)(_centerFocusStrong2.default, {});

var ImageViewer = exports.ImageViewer = function (_SICKComponent) {
  (0, _inherits3.default)(ImageViewer, _SICKComponent);

  function ImageViewer(props) {
    (0, _classCallCheck3.default)(this, ImageViewer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ImageViewer.__proto__ || (0, _getPrototypeOf2.default)(ImageViewer)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      images: [],
      viewerOptions: props.viewerOptions
    };
    return _this;
  }

  /** @ignore */


  (0, _createClass3.default)(ImageViewer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateStateFromProps(this.props, true);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.updateStateFromProps(nextProps);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this2 = this;

      var _props = this.props,
          play = _props.play,
          playInterval = _props.playInterval;


      setTimeout(function () {
        if (_this2.viewer) {
          _this2.viewer.update();
        } else if (_this2.images) {
          _this2.state.viewerOptions.viewed = _this2.imageViewed;
          _this2.viewer = new _viewerjs2.default(_this2.images, _this2.state.viewerOptions);
        }
      });

      if (play && !this.interval) {
        var i = 0;
        this.interval = setInterval(function () {
          _this2.viewer.view(i);
          i = (i + 1) % _this2.state.imageCount;
        }, playInterval);
      } else if (!play && this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.currentImg && this.currentImg.removeEventListener(EVENT_TRANSITION_END, this.imageTranformed, false);
      this.currentImg && this.currentImg.ownerDocument.removeEventListener(EVENT_POINTER_UP, this.imageTranformed, false);
      this.interval && clearInterval(this.interval);
      this.viewer && this.viewer.destroy();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var styles = this.props.styles;
      var images = this.state.images;

      var containerClasses = ['image-viewer'];

      images = images.filter(function (image) {
        return image && (image.full || image.thumb);
      }).map(function (image, i) {
        var img = image.full || image.thumb;
        return (0, _jsx3.default)('img', {
          'data-original': img,
          src: img
        }, i);
      });

      this.state.imageCount = images.length;
      this.state.viewerOptions.navbar = this.state.imageCount > 1;
      if (this.state.viewerOptions.navbar) {
        containerClasses.push('has-navbar');
      }

      return !this.state.imageCount ? (0, _jsx3.default)('div', {
        className: containerClasses.join(' '),
        style: styles.container
      }, void 0, _ref) : (0, _jsx3.default)('div', {
        className: containerClasses.join(' '),
        style: styles.container
      }, void 0, (0, _jsx3.default)('div', {
        className: 'save control-set'
      }, void 0, (0, _jsx3.default)(_IconButton2.default, {
        iconStyle: styles.icon,
        onClick: this.saveImage
      }, void 0, _ref2)), (0, _jsx3.default)('div', {
        className: 'rotate control-set'
      }, void 0, (0, _jsx3.default)(_IconButton2.default, {
        iconStyle: styles.icon,
        onClick: this.rotateLeft
      }, void 0, _ref3), (0, _jsx3.default)(_IconButton2.default, {
        iconStyle: styles.icon,
        onClick: this.rotateRight
      }, void 0, _ref4)), (0, _jsx3.default)('div', {
        className: 'zoom control-set'
      }, void 0, (0, _jsx3.default)(_IconButton2.default, {
        iconStyle: styles.icon,
        onClick: this.zoomIn
      }, void 0, _ref5), (0, _jsx3.default)(_IconButton2.default, {
        iconStyle: styles.icon,
        onClick: this.zoomOut
      }, void 0, _ref6)), (0, _jsx3.default)('div', {
        className: 'reset control-set'
      }, void 0, (0, _jsx3.default)(_IconButton2.default, {
        iconStyle: styles.icon,
        onClick: this.resetViewer
      }, void 0, _ref7)), _react2.default.createElement(
        'div',
        { className: 'source', ref: function ref(el) {
            _this3.images = el;
          } },
        images
      ));
    }
  }]);
  return ImageViewer;
}(_SICKComponent3.default);

ImageViewer.propTypes = {
  images: _propTypes2.default.array,
  zoomIncrement: _propTypes2.default.number,
  rotationIncrement: _propTypes2.default.number,
  playInterval: _propTypes2.default.number,
  play: _propTypes2.default.bool,
  viewerOptions: _propTypes2.default.object,
  styles: _propTypes2.default.object,
  imageViewedHandler: _propTypes2.default.func,
  imageTranformedHandler: _propTypes2.default.func };
ImageViewer.defaultProps = {
  images: [],
  zoomIncrement: 0.2,
  rotationIncrement: 90,
  playInterval: 3000,
  play: false,
  viewerOptions: {
    inline: true,
    toolbar: false,
    button: false,
    tooltip: false,
    title: false
  },
  styles: {
    container: {
      width: '100%',
      height: '100%'
    }
  },
  imageViewedHandler: function imageViewedHandler() {},
  imageTranformedHandler: function imageTranformedHandler() {}
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.updateStateFromProps = function (props, init) {
    if (init || (0, _stringify2.default)(props.images) !== (0, _stringify2.default)(_this4.props.images)) {
      var setImage = function setImage(data, i, size) {
        var images = _this4.state.images;


        images[i] = images[i] || {};
        if (size) {
          images[i][size] = data;
        } else {
          images[i] = {
            thumb: data,
            full: data
          };
        }

        _this4.setState({ images: images });
      };

      props.images.forEach(function (image, i) {
        if (image.thumb && image.full) {
          props.fetchImage([image.full]).then(function (data) {
            setImage(data, i, 'full');
          });
          props.fetchImage([image.thumb]).then(function (data) {
            setImage(data, i, 'thumb');
          });
        } else {
          props.fetchImage([image]).then(function (data) {
            setImage(data, i);
          });
        }
      });
    }
  };

  this.imageViewed = function () {
    _this4.currentImg && _this4.currentImg.removeEventListener(EVENT_TRANSITION_END, _this4.imageTranformed, false);
    _this4.currentImg && _this4.currentImg.ownerDocument.removeEventListener(EVENT_POINTER_UP, _this4.imageTranformed, false);
    (0, _setImmediate3.default)(function () {
      _this4.currentImg = _this4.viewer.image;
      _this4.props.imageViewedHandler(_this4.currentImg, _this4.viewer.index);
      _this4.currentImg.addEventListener(EVENT_TRANSITION_END, _this4.imageTranformed, false);
      _this4.currentImg.addEventListener(EVENT_POINTER_UP, _this4.imageTranformed, false);
    });
  };

  this.imageTranformed = function () {
    _this4.props.imageTranformedHandler(_this4.currentImg, _this4.viewer.index);
  };

  this.rotateLeft = function () {
    _this4.viewer.rotate(-_this4.props.rotationIncrement);
  };

  this.rotateRight = function () {
    _this4.viewer.rotate(_this4.props.rotationIncrement);
  };

  this.zoomIn = function () {
    _this4.viewer.zoom(_this4.props.zoomIncrement);
  };

  this.zoomOut = function () {
    _this4.viewer.zoom(-_this4.props.zoomIncrement);
  };

  this.resetViewer = function () {
    _this4.viewer.reset();
  };

  this.saveImage = function () {
    _this4.currentImg && (0, _download.startFileDownloadFromImgSrc)(_this4.currentImg.src, '.png', 'image/png', 'object-image');
  };
};

var mapDispatchToProps = {
  fetchImage: _images.fetchImage
};

exports.default = (0, _SICKPlatform.connect)(null, mapDispatchToProps)(ImageViewer);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageLiveView = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

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

var _reactDom = require('react-dom');

var _SICKPlatform = require('../../SICKPlatform');

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _colors = require('material-ui/styles/colors');

var _imageLiveView = require('../../ducks/imageLiveView');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Toolbar = require('material-ui/Toolbar');

var _RefreshIndicator = require('material-ui/RefreshIndicator');

var _RefreshIndicator2 = _interopRequireDefault(_RefreshIndicator);

var _IconMenu = require('material-ui/IconMenu');

var _IconMenu2 = _interopRequireDefault(_IconMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _GridList = require('material-ui/GridList');

var _Card = require('material-ui/Card');

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _pauseCircleFilled = require('material-ui/svg-icons/av/pause-circle-filled');

var _pauseCircleFilled2 = _interopRequireDefault(_pauseCircleFilled);

var _keyboardArrowLeft = require('material-ui/svg-icons/hardware/keyboard-arrow-left');

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

var _keyboardArrowRight = require('material-ui/svg-icons/hardware/keyboard-arrow-right');

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

var _playCircleFilled = require('material-ui/svg-icons/av/play-circle-filled');

var _playCircleFilled2 = _interopRequireDefault(_playCircleFilled);

var _permMedia = require('material-ui/svg-icons/action/perm-media');

var _permMedia2 = _interopRequireDefault(_permMedia);

var _photoCamera = require('material-ui/svg-icons/image/photo-camera');

var _photoCamera2 = _interopRequireDefault(_photoCamera);

var _defaults = require('../../utils/defaults');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Components
// ------------------------------------

var DATA_URI_PREFIX = 'data:image/jpg;base64,';

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Action creators
// ------------------------------------

var styles = {
  card: {
    backgroundColor: '#FFFFFF'
  },
  media: {
    position: 'relative',
    height: '100%',
    maxHeight: '100%',
    backgroundColor: _colors.blueGrey100
  },
  image: {
    position: 'absolute',
    maxHeight: '100%'
  },
  action: {
    padding: 0
  },
  pause: {
    textAlign: 'left'
  },
  model: {
    paddingTop: 10
  },
  filmstrip: {
    paddingTop: 5
  },
  filmstripText: {
    paddingTop: 8,
    textAlign: 'center'
  },
  underline: {
    borderBottom: '1px solid gainsboro'
  },
  rightArrow: {
    marginLeft: 20
  },
  cameraSelection: {
    paddingTop: 10,
    textAlign: 'right'
  },
  detail: {
    textAlign: 'right'
  },
  title: {
    fontSize: 18
  },
  refresh: {
    position: 'relative',
    height: 170,
    maxHeight: '100%'
  }
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    config: state.config,
    imageLiveView: state.imageLiveView.get(ownProps.group),
    userSettings: state.userSettings[ownProps.group] || _defaults.DEFAULT_EMPTY_OBJECT
  };
};

/* eslint-disable */
/**
 * Image streaming widget with options to pause/play, change camera and navigate through available images for an object
 *
 * **Available properties:**
 *
 * | Property               | Type     | Description                                                                                                | Allowed values                          | Default Value   | Required |
 * |------------------------|----------|------------------------------------------------------------------------------------------------------------|-----------------------------------------|-----------------|----------|
 * | `title`                | `String` | The widget title.                                                                                          | *                                       |'Image Live View'| NO       |
 * | `channel`              | `String` | The WebSocket channel to connect to.                                                                       | *                                       |                 | YES      |
 * | `cameraList`           | `Array`  | An Array of all the available cameras (with the required key 'label' and 'id' for each camera)             | Array of Camera Object (see example)    |                 | YES      |
 * | `group`                | `String` | Components are grouped using a group ID. Components with matching group IDs share state and user settings. | *                                       |                 | YES      |
 * |                        |          | Make sure that the group ID is unique per widget type.                                                     |                                         |                 |          |
 * |                        |          | E.g. ActivityTable and ConveyorBelt must have different group IDs                                          |                                         |                 |          |
 * | `style`                | `Object` | Custom style for the widget                                                                                | *                                       |                 | NO       |
 * | `baseUrl`              | `String` | Base URL for making REST calls                                                                             | valid URL strings                       |                 | YES      |
 * | `height`               | `Number` | Fixed image height in pixels                                                                               | *                                       |    200          | NO       |
 *
 * @example
 * const imageLiveView = SICKPlatform.ImageLiveView.init(document.createElement('div'), {
 *   title: 'ImageLiveView Example',
 *   group: 'example',
 *   channel: 'your_channel_id',
 *   height: 280,
 *   baseUrl: 'http://localhost:8080/'
 *   cameraList: [
 *    {id: 1, label: 'Top', model: 'Lector'},
 *    {id: 2, label: 'Bottom', model: 'ICR890-3'}
 *   ]
 * })
 * imageLiveView.update({ title: 'Updated Image Live View' })
 * imageLiveView.destroy()
 *
 * @example
 * render() {
 *   return (
 *     <div>
 *       <ImageLiveView
 *         title='ImageLiveView Example'
 *         group='example'
 *         channel='your_channel_id',
 *         height: 280,
 *         baseUrl: 'http://localhost:8080/'
 *         cameraList=[
 *          {id: 1, label: 'Top', model: 'Lector'},
 *           {id: 2, label: 'Bottom', model: 'ICR890-3'}
 *        ]
 *       />
 *     </div>
 *   )
 * }
 */
/* eslint-enable */

var _ref = (0, _jsx3.default)(_Toolbar.ToolbarGroup, {
  lastChild: true
}, void 0, (0, _jsx3.default)(_IconButton2.default, {
  disabled: true
}, void 0, (0, _jsx3.default)(_moreVert2.default, {})));

var _ref2 = (0, _jsx3.default)(_keyboardArrowLeft2.default, {});

var _ref3 = (0, _jsx3.default)(_keyboardArrowRight2.default, {});

var _ref4 = (0, _jsx3.default)(_IconButton2.default, {}, void 0, (0, _jsx3.default)(_photoCamera2.default, {}));

var _ref5 = (0, _jsx3.default)(_playCircleFilled2.default, {});

var _ref6 = (0, _jsx3.default)(_pauseCircleFilled2.default, {});

var _ref7 = (0, _jsx3.default)(_RaisedButton2.default, {
  label: 'DETAILS',
  primary: true
});

var ImageLiveView = exports.ImageLiveView = function (_SICKComponent) {
  (0, _inherits3.default)(ImageLiveView, _SICKComponent);

  /** @ignore */


  /** @ignore */
  function ImageLiveView(props, context) {
    (0, _classCallCheck3.default)(this, ImageLiveView);

    /** @private */
    var _this = (0, _possibleConstructorReturn3.default)(this, (ImageLiveView.__proto__ || (0, _getPrototypeOf2.default)(ImageLiveView)).call(this, props, context));

    _this.state = (0, _extends3.default)({}, _this.state, {
      width: 0

      /** @private */
    });_this.channelSubscription = null;

    _this._handleImageRef = _this._handleImageRef.bind(_this);
    _this._togglePlay = _this._togglePlay.bind(_this);
    _this._subscribe = _this._subscribe.bind(_this);
    _this._unsubscribe = _this._unsubscribe.bind(_this);
    _this._handleCameraChange = _this._handleCameraChange.bind(_this);
    _this._getNextImage = _this._getNextImage.bind(_this);
    _this._getPrevImage = _this._getPrevImage.bind(_this);
    _this._renderImage = _this._renderImage.bind(_this);
    _this._handleImageContainerRef = _this._handleImageContainerRef.bind(_this);
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(ImageLiveView, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          group = _props.group,
          cameraList = _props.cameraList;


      this.props.load(group, { cameraList: cameraList, selectedCamera: cameraList[0] });
      this._subscribe();
      this.props.updateCamera(this.props.group, this.props.channel, this.props.cameraList[0], this.props.imageLiveView, this.props.baseUrl);
    }

    /** @ignore */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unsubscribe();
    }
  }, {
    key: '_renderImage',
    value: function _renderImage() {
      var imageLiveView = this.props.imageLiveView;


      var image = imageLiveView && imageLiveView.image;

      var imageSrc = DATA_URI_PREFIX + _defaults.DEFAULT_EMPTY_IMAGE;

      if (image && image.source) {
        imageSrc = DATA_URI_PREFIX + image.source;
      }

      var dummy = new Image();
      dummy.src = imageSrc;

      var style = {};

      if (this._imageContainerNode) {
        var maxWidth = this._imageContainerNode.getBoundingClientRect().width;
        var maxHeight = this.props.height;
        var srcWidth = dummy.width;
        var srcHeight = dummy.height;

        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

        style.width = Math.floor(srcWidth * ratio);
        style.height = Math.floor(srcHeight * ratio);

        style.left = maxWidth > style.width ? Math.floor((maxWidth - style.width) / 2) : 0;
        style.top = maxHeight > style.height ? Math.floor((maxHeight - style.height) / 2) : 0;
        style.minWidth = style.width;
      }

      var finalStyles = (0, _extends3.default)({}, styles.image, style);
      return _react2.default.createElement('img', { style: finalStyles, ref: this._handleImageRef, src: imageSrc });
    }
  }, {
    key: '_handleImageRef',
    value: function _handleImageRef(ref) {
      this._imageNode = (0, _reactDom.findDOMNode)(ref);
    }
  }, {
    key: '_handleImageContainerRef',
    value: function _handleImageContainerRef(ref) {
      this._imageContainerNode = (0, _reactDom.findDOMNode)(ref);
    }
  }, {
    key: '_subscribe',
    value: function _subscribe() {
      if (this.props.channel) {
        var subscription = this.props.subscribe(this.props.channel, this.props.group);
        this.channelSubscription = subscription.id;
      }
    }
  }, {
    key: '_unsubscribe',
    value: function _unsubscribe() {
      this.channelSubscription && this.props.unsubscribe(this.channelSubscription);
    }
  }, {
    key: '_togglePlay',
    value: function _togglePlay() {
      var _props2 = this.props,
          imageLiveView = _props2.imageLiveView,
          group = _props2.group;


      if (imageLiveView && imageLiveView.isPaused) {
        this.props.play(group);
        this._subscribe();
      } else {
        this.props.pause(group);
        this._unsubscribe();
      }
    }
  }, {
    key: '_handleCameraChange',
    value: function _handleCameraChange(event, item) {
      var selectedCamera = this.props.cameraList.find(function (camera) {
        return camera.id === item.props.value;
      });

      this.props.updateCamera(this.props.group, this.props.channel, selectedCamera, this.props.imageLiveView, this.props.baseUrl);
    }
  }, {
    key: '_getPrevImage',
    value: function _getPrevImage() {
      var imageLiveView = this.props.imageLiveView;


      var image = imageLiveView && imageLiveView.image;

      this.props.prev(this.props.group, image.prevImageId, this.props.baseUrl);
    }
  }, {
    key: '_getNextImage',
    value: function _getNextImage() {
      var imageLiveView = this.props.imageLiveView;


      var image = imageLiveView && imageLiveView.image;

      this.props.next(this.props.group, image.nextImageId, this.props.baseUrl);
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          imageLiveView = _props3.imageLiveView,
          style = _props3.style;
      var isPaused = imageLiveView.isPaused,
          _imageLiveView$image = imageLiveView.image,
          image = _imageLiveView$image === undefined ? {} : _imageLiveView$image,
          selectedCamera = imageLiveView.selectedCamera,
          cameraList = imageLiveView.cameraList,
          isFetching = imageLiveView.isFetching;
      var _image$packageId = image.packageId,
          packageId = _image$packageId === undefined ? ' ' : _image$packageId,
          _image$parentSize = image.parentSize,
          parentSize = _image$parentSize === undefined ? 1 : _image$parentSize,
          _image$sequenceNumber = image.sequenceNumber,
          sequenceNumber = _image$sequenceNumber === undefined ? 1 : _image$sequenceNumber;


      var height = this.props.height;

      var finalMediaStyle = (0, _extends3.default)({}, styles.media, {
        height: height
      });

      return (0, _jsx3.default)(_Paper2.default, {
        style: style,
        zDepth: 2
      }, void 0, (0, _jsx3.default)(_Card.Card, {
        style: styles.card
      }, void 0, (0, _jsx3.default)(_Toolbar.Toolbar, {}, void 0, (0, _jsx3.default)(_Toolbar.ToolbarGroup, {}, void 0, (0, _jsx3.default)(_Toolbar.ToolbarTitle, {
        text: this.props.title
      })), _ref), isFetching ? _react2.default.createElement(
        _Card.CardText,
        { style: styles.refresh, ref: this._handleImageContainerRef },
        (0, _jsx3.default)(_RefreshIndicator2.default, {
          size: 40,
          left: -20,
          top: 80,
          status: 'loading',
          style: { marginLeft: '50%' }
        })
      ) : _react2.default.createElement(
        _Card.CardMedia,
        { mediaStyle: finalMediaStyle, ref: this._handleImageContainerRef },
        this._renderImage()
      ), (0, _jsx3.default)(_GridList.GridList, {
        cellHeight: 30,
        cols: 3,
        style: styles.underline
      }, void 0, (0, _jsx3.default)(_GridList.GridTile, {}, void 0, isPaused && parentSize > 1 ? (0, _jsx3.default)(_FlatButton2.default, {
        onClick: this._getPrevImage,
        icon: _ref2
      }) : ''), (0, _jsx3.default)(_GridList.GridTile, {}, void 0, (0, _jsx3.default)(_GridList.GridList, {
        cellHeight: 30
      }, void 0, (0, _jsx3.default)(_GridList.GridTile, {
        style: styles.filmstripText
      }, void 0, sequenceNumber + ' / ' + parentSize), (0, _jsx3.default)(_GridList.GridTile, {}, void 0, (0, _jsx3.default)(_permMedia2.default, {
        style: styles.filmstrip
      })))), (0, _jsx3.default)(_GridList.GridTile, {
        style: styles.rightArrow
      }, void 0, isPaused && parentSize > 1 ? (0, _jsx3.default)(_FlatButton2.default, {
        onClick: this._getNextImage,
        icon: _ref3
      }) : '')), (0, _jsx3.default)(_GridList.GridList, {
        cellHeight: 120,
        cols: 3
      }, void 0, (0, _jsx3.default)(_GridList.GridTile, {
        cols: 2
      }, void 0, (0, _jsx3.default)(_Card.CardTitle, {
        title: 'Package ' + packageId,
        titleStyle: styles.title,
        subtitle: selectedCamera && selectedCamera.label + ' Camera View'
      }, void 0, (0, _jsx3.default)('div', {
        style: styles.model
      }, void 0, selectedCamera && selectedCamera.model))), (0, _jsx3.default)(_GridList.GridTile, {
        style: styles.cameraSelection,
        cols: 1
      }, void 0, (0, _jsx3.default)(_IconMenu2.default, {
        iconButtonElement: _ref4,
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        targetOrigin: { horizontal: 'right', vertical: 'top' },
        onItemTouchTap: this._handleCameraChange
      }, void 0, cameraList && cameraList.map(function (camera) {
        return (0, _jsx3.default)(_MenuItem2.default, {
          value: camera.id,
          primaryText: camera.label
        });
      })))), (0, _jsx3.default)(_Card.CardActions, {
        style: styles.action
      }, void 0, (0, _jsx3.default)(_GridList.GridList, {
        cellHeight: 50
      }, void 0, (0, _jsx3.default)(_GridList.GridTile, {
        style: styles.pause
      }, void 0, (0, _jsx3.default)(_FlatButton2.default, {
        label: isPaused ? 'RESUME' : 'PAUSE',
        labelPosition: 'after',
        icon: isPaused ? _ref5 : _ref6,
        onClick: this._togglePlay
      })), (0, _jsx3.default)(_GridList.GridTile, {
        style: styles.detail
      }, void 0, _ref7)))));
    }
  }]);
  return ImageLiveView;
}(_SICKComponent3.default);

ImageLiveView.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  title: _propTypes2.default.string,
  height: _propTypes2.default.number,
  channel: _propTypes2.default.string.isRequired,
  config: _propTypes2.default.object.isRequired,
  group: _propTypes2.default.string.isRequired,
  imageLiveView: _propTypes2.default.object,
  subscribe: _propTypes2.default.func.isRequired,
  unsubscribe: _propTypes2.default.func.isRequired,
  load: _propTypes2.default.func.isRequired,
  play: _propTypes2.default.func.isRequired,
  pause: _propTypes2.default.func.isRequired,
  updateCamera: _propTypes2.default.func.isRequired,
  next: _propTypes2.default.func.isRequired,
  prev: _propTypes2.default.func.isRequired,
  style: _propTypes2.default.object,
  userSettings: _propTypes2.default.object.isRequired,
  cameraList: _propTypes2.default.array.isRequired,
  baseUrl: _propTypes2.default.string.isRequired });
ImageLiveView.defaultProps = (0, _extends3.default)({}, _SICKComponent3.default.defaultProps, {
  title: 'Image Live View',
  height: 200,
  imageLiveView: {} });
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, { subscribe: _imageLiveView.subscribe, unsubscribe: _imageLiveView.unsubscribe, load: _imageLiveView.load, play: _imageLiveView.play, pause: _imageLiveView.pause, updateCamera: _imageLiveView.updateCamera, next: _imageLiveView.next, prev: _imageLiveView.prev })(ImageLiveView);
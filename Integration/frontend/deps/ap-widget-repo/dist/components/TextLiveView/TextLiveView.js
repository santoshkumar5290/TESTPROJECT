'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTextTruncate = require('react-text-truncate');

var _reactTextTruncate2 = _interopRequireDefault(_reactTextTruncate);

var _SICKMuiTheme = require('../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

var _colorManipulator = require('material-ui/utils/colorManipulator');

var _colors = require('material-ui/styles/colors');

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
/**
 * Provides a general-purpose, websocket-enabled widget.
 *
 * The widget is composed of two simple title and content components. Title
 * is editable by a user. Once modifies, it gets saved to user settings.
 * Widget content is received from the server as a websocket message.
 *
 * 
 * **Available properties:**
 *
 * | Property               | Type     | Description                                                                                                | Allowed values                          | Default Value   | Required |
 * |------------------------|----------|------------------------------------------------------------------------------------------------------------|-----------------------------------------|-----------------|----------|
 * | `group`                | `String` | Components are grouped using a group ID. Components with matching group IDs share state and user settings. | *                                       |                 | YES      |
 * | `channel`              | `String` | The WebSocket channel to connect to                                                                        | *                                       |                 | YES      |
 * | `title`                | `String` | The widget title.                                                                                          | *                                       |                 | YES      |
 * | `content`              | `String` | Default content of the widget. It will get overriden once a socket connection is established               | *                                       |                 | NO       |
 * | `containerStyle`       | `Object` | A style object to be passed to the wrapper container                                                       | Object of css attributes                |                 | NO       |
 * | `titleStyle`           | `Object` | A style object to be passed to widget's title                                                              | Object of css attributes                |                 | NO       |
 * | `inputStyle`           | `Object` | A style object to be passed to widget's input                                                              | Object of css attributes                |                 | NO       |
 * | `contentStyle`         | `Object` | A style object to be passed to widget's content                                                            | Object of css attributes                |                 | NO       |
 *
 * @example
 * import TextLiveView from 'src/components/TextLiveView'
 * window.livetext1 = TextLiveView.init(document.getElementById('text-live-view-temperture'), {
 *    group: 'temperture1',
 *    channel: 'temperture',
 *    containerStyle: {
 *      height: '110px',
 *      width: '250px',
 *    },
 *    contentStyle: {
 *      height: '70px',
 *      line: 3
 *    },
 *    title: 'Temperture',
 *    content: '10.0 °C'
 * })
 *
 * @example
 * <TextLiveView
 *   group='news1'
 *   channel='news'
 *   containerStyle={{
 *     height: '180px',
 *     width: '250px'
 *   }}
 *   titleStyle={{
 *     textAlign: 'right'
 *   }}
 *   contentStyle={{
 *     height: '100px'
 *   }}
 *   title='News'
 *   content='Lorem ipsum dolor sit amet, consectetur adipiscing elit'
 * />
 */
/* eslint-enable */
var TextLiveView = function TextLiveView(_ref) {
  var containerStyle = _ref.containerStyle,
      titleStyle = _ref.titleStyle,
      contentStyle = _ref.contentStyle,
      inputStyle = _ref.inputStyle,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      title = _ref.title,
      content = _ref.content,
      subtext = _ref.subtext,
      subtextPosition = _ref.subtextPosition;

  var styles = {
    container: (0, _extends3.default)({
      height: '100%',
      width: '100%',
      backgroundColor: 'white'
    }, containerStyle),
    title: (0, _extends3.default)({
      /* SICK Guidelines: Subheader */
      fontSize: '16px',
      lineHeight: '24px',
      width: 'calc(100% - 32px)',
      color: (0, _colorManipulator.fade)(_SICKMuiTheme2.default.palette.textColor, 0.87),
      padding: '8px'
    }, titleStyle),
    input: (0, _extends3.default)({
      textAlign: 'left',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }, inputStyle),
    content: (0, _extends3.default)({
      /* SICK Guidelines: Headline */
      fontSize: '24px',
      color: (0, _colorManipulator.fade)(_SICKMuiTheme2.default.palette.textColor, 0.87),
      textAlign: 'left',
      paddingLeft: '8px'
    }, contentStyle),
    subtext: {
      fontSize: '14px',
      textAlign: 'left',
      paddingLeft: '8px',
      color: _colors.lightBlue700
    }
  };

  var newline = false;

  if (subtextPosition === 'newline') {
    newline = true;
    styles.content.height = 'calc(100% - 84px)';
  } else if (subtextPosition === 'hidden') {
    styles.content.height = 'calc(100% - 64px)';
  } else {
    content = content + ' ' + subtext;
    styles.content.height = 'calc(100% - 64px)';
  }

  return (0, _jsx3.default)(_Paper2.default, {
    style: styles.container,
    className: 'text-live-inner'
  }, void 0, (0, _jsx3.default)('div', {
    name: 'title-textfield',
    className: 'text-live-view-title',
    style: styles.title
  }, void 0, title), (0, _jsx3.default)(_Divider2.default, {
    style: { marginBottom: 8, marginLeft: 8, marginRight: 16 }
  }), (0, _jsx3.default)('div', {
    className: 'text-live-view-content',
    style: styles.content
  }, void 0, (0, _jsx3.default)(_reactTextTruncate2.default, {
    line: contentStyle ? contentStyle.line || 1 : 1,
    text: content
  })), newline && (0, _jsx3.default)('div', {
    className: 'text-live-view-subtext',
    style: styles.subtext
  }, void 0, subtext));
};

TextLiveView.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};

exports.default = TextLiveView;
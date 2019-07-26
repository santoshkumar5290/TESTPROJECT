'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Component that encapsulate simple pop-up dialog.
 *
 * @private
 */
function InformationDialog(props) {
  var style = props.style,
      title = props.title,
      message = props.message,
      open = props.open,
      onClose = props.onClose;


  var actions = [(0, _jsx3.default)(_FlatButton2.default, {
    label: 'Ok',
    primary: true,
    onTouchTap: onClose
  })];

  return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)(_Dialog2.default, {
    title: title,
    actions: actions,
    modal: true,
    contentStyle: style.container,
    open: open
  }, void 0, (0, _jsx3.default)('div', {}, void 0, message)));
}

exports.default = InformationDialog;
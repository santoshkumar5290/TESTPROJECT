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
 * Component that encapsulate remove confirmation dialog.
 *
 * @private
 */
function RemoveDialog(props) {
  var actions = [(0, _jsx3.default)(_FlatButton2.default, {
    label: 'Remove',
    primary: true,
    onTouchTap: props.onRemove
  }), (0, _jsx3.default)(_FlatButton2.default, {
    label: 'Cancel',
    onTouchTap: props.onCancel
  })];

  return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)(_Dialog2.default, {
    title: 'Remove?',
    actions: actions,
    modal: true,
    open: props.open
  }, void 0, 'Device will be removed from the system.'));
}

exports.default = RemoveDialog;
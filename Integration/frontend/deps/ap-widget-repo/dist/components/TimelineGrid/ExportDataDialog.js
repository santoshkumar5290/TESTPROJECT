'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExportDataDialog = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _SICKPlatform = require('../../SICKPlatform');

var _SICKComponent = require('../SICKComponent');

var _SICKComponent2 = _interopRequireDefault(_SICKComponent);

var _colors = require('material-ui/styles/colors');

var _exportData = require('../../ducks/exportData');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _fileDownload = require('material-ui/svg-icons/file/file-download');

var _fileDownload2 = _interopRequireDefault(_fileDownload);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _RadioButton = require('material-ui/RadioButton');

var _SICKMuiTheme = require('../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

var style = {
  container: {
    width: '475px'
  },
  fileInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  },
  fileContainer: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  radioGroup: {
    margin: '30px 0'
  },
  radioButton: {
    margin: '10px 0'
  }

  // ------------------------------------
  // Action creators
  // ------------------------------------

};

// ------------------------------------
// Components
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    exportData: state.exportData.get(ownProps.group)
  };
};

/**
 * Provides a file location and type picker for export.
 *
 * @private
 * @extends {React.Component}
 */

var ExportDataDialog = exports.ExportDataDialog = function (_React$Component) {
  (0, _inherits3.default)(ExportDataDialog, _React$Component);

  /**
   * propTypes
   * @type {object}
   * @property {object} exportData.
   * @property {string} group. State group.
   * @property {function} requestDownload. Action creator.
   */
  function ExportDataDialog(props, context) {
    (0, _classCallCheck3.default)(this, ExportDataDialog);

    /**
     * @type {object}
     * @property {boolean} open dialog open state.
     * @property {string} fileType. Downloaded export file type.
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (ExportDataDialog.__proto__ || (0, _getPrototypeOf2.default)(ExportDataDialog)).call(this, props, context));

    _this.state = {
      open: false,
      fileType: 'csv'
    };

    _this._handleOpen = _this._handleOpen.bind(_this);
    _this._handleClose = _this._handleClose.bind(_this);
    _this._handleExport = _this._handleExport.bind(_this);
    _this._handleFileTypeChanged = _this._handleFileTypeChanged.bind(_this);
    return _this;
  }

  /**
   * @private
   *
   * Handle changed file type selection.
   */


  /**
   * contextTypes
   * @type {object}
   * @property {object} muiTheme.
   */


  (0, _createClass3.default)(ExportDataDialog, [{
    key: '_handleFileTypeChanged',
    value: function _handleFileTypeChanged(e, v) {
      this.setState((0, _assign2.default)(this.state, {
        fileType: v
      }));
    }

    /**
     * @private
     *
     * Set export dialog as open.
     */

  }, {
    key: '_handleOpen',
    value: function _handleOpen() {
      this.setState({
        open: true
      });
    }

    /**
     * @private
     *
     * Set export dialog as closed.
     */

  }, {
    key: '_handleClose',
    value: function _handleClose() {
      this.setState({
        open: false
      });
    }

    /**
     * @private
     *
     * Handle data export.
     */

  }, {
    key: '_handleExport',
    value: function _handleExport() {
      // request file data
      var _props = this.props,
          group = _props.group,
          exportData = _props.exportData,
          requestDownload = _props.requestDownload;
      var url = exportData.url,
          params = exportData.params;

      requestDownload(group, url, (0, _extends3.default)({}, params, { downloadType: this.state.fileType }));
      this._handleClose();
    }

    /**
     * @ignore
     */

  }, {
    key: 'render',
    value: function render() {
      var actionIconColor = _SICKMuiTheme2.default.palette.iconColor;
      var actions = [(0, _jsx3.default)(_FlatButton2.default, {
        label: 'CANCEL',
        onTouchTap: this._handleClose
      }), (0, _jsx3.default)(_FlatButton2.default, {
        label: 'EXPORT',
        primary: true,
        keyboardFocused: true,
        hoverColor: _colors.yellowA700,
        backgroundColor: _colors.yellowA700,
        onTouchTap: this._handleExport
      })];
      return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)(_IconButton2.default, {
        onTouchTap: this._handleOpen
      }, void 0, (0, _jsx3.default)(_fileDownload2.default, {
        color: actionIconColor
      })), (0, _jsx3.default)(_Dialog2.default, {
        modal: true,
        title: 'Export Selected Data',
        actions: actions,
        open: this.state.open,
        onRequestClose: this._handleOpen,
        contentStyle: style.container
      }, void 0, (0, _jsx3.default)('div', {
        style: style.fileContainer
      }, void 0, 'Select File Format'), (0, _jsx3.default)(_RadioButton.RadioButtonGroup, {
        defaultSelected: this.state.fileType,
        style: style.radioGroup,
        onChange: this._handleFileTypeChanged
      }, void 0, (0, _jsx3.default)(_RadioButton.RadioButton, {
        label: 'Comma Separated (CSV)',
        value: 'csv',
        style: style.radioButton
      }), (0, _jsx3.default)(_RadioButton.RadioButton, {
        label: 'PDF',
        value: 'pdf',
        style: style.radioButton
      }))));
    }
  }]);
  return ExportDataDialog;
}(_react2.default.Component);

ExportDataDialog.contextTypes = {
  muiTheme: _propTypes2.default.object
};
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, _exportData.actions)(ExportDataDialog);
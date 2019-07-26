'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Devices = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _parseInt = require('babel-runtime/core-js/number/parse-int');

var _parseInt2 = _interopRequireDefault(_parseInt);

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

var _immutable = require('immutable');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _SICKPlatform = require('../../SICKPlatform');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defaults = require('../../utils/defaults');

var _userSettings = require('../../ducks/userSettings');

var _Card = require('material-ui/Card');

var _GridList = require('material-ui/GridList');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _create = require('material-ui/svg-icons/content/create');

var _create2 = _interopRequireDefault(_create);

var _clear = require('material-ui/svg-icons/content/clear');

var _clear2 = _interopRequireDefault(_clear);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _sentimentDissatisfied = require('material-ui/svg-icons/social/sentiment-dissatisfied');

var _sentimentDissatisfied2 = _interopRequireDefault(_sentimentDissatisfied);

var _arrowDropDown = require('material-ui/svg-icons/navigation/arrow-drop-down');

var _arrowDropDown2 = _interopRequireDefault(_arrowDropDown);

var _arrowDropUp = require('material-ui/svg-icons/navigation/arrow-drop-up');

var _arrowDropUp2 = _interopRequireDefault(_arrowDropUp);

var _Table = require('material-ui/Table');

var _SICKMuiTheme = require('../../SICKMuiTheme');

var _SICKMuiTheme2 = _interopRequireDefault(_SICKMuiTheme);

var _DeviceEditDialog = require('./Dialogs/DeviceEditDialog');

var _DeviceEditDialog2 = _interopRequireDefault(_DeviceEditDialog);

var _RemoveConfirmDialog = require('./Dialogs/RemoveConfirmDialog');

var _RemoveConfirmDialog2 = _interopRequireDefault(_RemoveConfirmDialog);

var _TableColumnSettings = require('./Dialogs/TableColumnSettings');

var _TableColumnSettings2 = _interopRequireDefault(_TableColumnSettings);

var _A = require('../Global/A');

var _A2 = _interopRequireDefault(_A);

var _systemConfig = require('../../ducks/systemConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultColumns = [{ key: 'deviceId', label: 'Device ID', mandatory: true, isShown: true }, { key: 'name', label: 'Device Name', mandatory: true, isShown: true }, { key: 'family', label: 'Device Model', mandatory: true, isShown: true }, { key: 'label', label: 'Device Label', mandatory: true, isShown: true }, { key: 'ftpUsername', label: 'FTP Username', mandatory: false, isShown: false }, { key: 'ftpPassword', label: 'FTP Password', mandatory: false, isShown: false }, { key: 'ipAddress', label: 'IP Address', mandatory: false, isShown: false }];

// ------------------------------------
// Constants
// ------------------------------------


var defaultOrder = {
  field: 'deviceId',
  sort: 'asc'
};

var styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'normal'
  },
  tile: {
    paddingBottom: 8
  },
  gridList: {
    width: '100%',
    overflowY: 'auto'
  },
  card: {
    border: '3px',
    borderStyle: 'solid',
    borderColor: '#ccc',
    backgroundColor: 'white',
    minWidth: 175
  },
  cardTextContainer: {
    height: 95,
    minHeight: 95
  },
  headerCard: {
    paddingBottom: 0
  },
  headerText: {
    paddingRight: 15,
    width: '90%'
  },
  headerTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 15,
    width: 'auto',
    maxWidth: '100%',
    padding: 0,
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  actions: {
    textAlign: 'right',
    margin: 0,
    padding: 0,
    paddingBottom: 4
  },
  actionButton: {
    fontSize: 12,
    minWidth: 50
  },
  actionIcon: {
    width: 16,
    height: 16,
    marginLeft: 10
  },
  iconColor: _SICKMuiTheme2.default.palette.iconColor,
  table: {
    border: '2px solid #ccc',
    backgroundColor: _SICKMuiTheme2.default.palette.canvasColor
  },
  tableHeader: {
    height: 48,
    maxHeight: 48
  },
  headerCol: {
    height: 48,
    maxHeight: 48,
    color: _SICKMuiTheme2.default.palette.textColor,
    fontWeight: 'bold'
  },
  headerRow: {
    height: 48,
    maxHeight: 48
  },
  row: {
    height: 42
  },
  col: {
    height: 42,
    textAlign: 'left'
  },
  headerColActions: {
    height: 48,
    maxHeight: 48,
    width: 70,
    minWidth: 70,
    paddingRight: 5,
    paddingLeft: 5,
    color: _SICKMuiTheme2.default.palette.textColor,
    fontWeight: 'bold'
  },
  colActions: {
    width: 70,
    minWidth: 70,
    paddingRight: 0,
    paddingLeft: 0
  },
  faceIcon: {
    width: 48,
    height: 48
  },
  orderIcon: {
    width: 18,
    height: 18,
    position: 'absolute',
    top: 0,
    right: 0
  },
  settingsIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: 5,
    right: 5
  }

  // ------------------------------------
  // Action creators
  // ------------------------------------
};

// ------------------------------------
// Components
// ------------------------------------


// ------------------------------------
// Helpers
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    status: state.systemConfig.get('status'),
    items: state.systemConfig.get('items'),
    lastUndoDevice: state.systemConfig.get('lastUndoDevice'),
    userSettings: state.userSettings['systemConfiguration'] || _defaults.DEFAULT_EMPTY_OBJECT
  };
};

/**
 * Component to render device cards and device listing.
 *
 * @private
 */

var _ref = (0, _jsx3.default)('span', {}, void 0, 'Device ID:');

var _ref2 = (0, _jsx3.default)('span', {}, void 0, 'Device Name:');

var _ref3 = (0, _jsx3.default)('span', {}, void 0, 'Device Label:');

var _ref4 = (0, _jsx3.default)('span', {}, void 0, 'IP Address:');

var _ref7 = (0, _jsx3.default)('p', {}, void 0, 'No devices have been added to the system. Click a step on the left to get started.');

var _ref8 = (0, _jsx3.default)(_Snackbar2.default, {
  open: true,
  message: 'Your action was reverted.',
  autoHideDuration: 5000
});

var Devices = exports.Devices = function (_React$Component) {
  (0, _inherits3.default)(Devices, _React$Component);

  /** @ignore */


  /** @ignore */
  function Devices(props, context) {
    (0, _classCallCheck3.default)(this, Devices);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Devices.__proto__ || (0, _getPrototypeOf2.default)(Devices)).call(this, props, context));

    _this._handleRemoveDialog = function (id) {
      var items = _this.props.items;

      _this.setState({
        removeConfirmDialogOpen: true,
        device: items.get((0, _parseInt2.default)(id))
      });
    };

    _this.state = {
      editDialogOpen: false,
      showColumnsDialog: false,
      removeConfirmDialogOpen: false,
      device: new _immutable.Record()

      /** @private */
    };_this._renderDeviceCard = _this._renderDeviceCard.bind(_this);
    _this._renderDeviceRow = _this._renderDeviceRow.bind(_this);
    _this._handleEditDialog = _this._handleEditDialog.bind(_this);
    _this._handleRemoveDialog = _this._handleRemoveDialog.bind(_this);
    _this._handleRemove = _this._handleRemove.bind(_this);
    _this._handleEditDialogDismiss = _this._handleEditDialogDismiss.bind(_this);
    _this._handleEditDialogSave = _this._handleEditDialogSave.bind(_this);
    _this._handleRemoveUndo = _this._handleRemoveUndo.bind(_this);
    _this._handleConfirmRemoveDismiss = _this._handleConfirmRemoveDismiss.bind(_this);
    _this._toggleColumnEditorDialog = _this._toggleColumnEditorDialog.bind(_this);
    _this._handleSortChange = _this._handleSortChange.bind(_this);
    _this._handleOrderChange = _this._handleOrderChange.bind(_this);
    return _this;
  }

  /** @ignore */


  /** @ignore */


  (0, _createClass3.default)(Devices, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextStatus = nextProps.status;

      if (nextStatus === _systemConfig.DEVICE_REMOVED_STATUS) {
        this.setState({
          removeConfirmDialogOpen: false
        });
      } else if (nextStatus === _systemConfig.DEVICE_UPDATED_STATUS) {
        this.setState({
          editDialogOpen: false,
          device: new _immutable.Record()
        });
      } else if (nextStatus === _systemConfig.GENERIC_ERROR_STATUS) {
        this.setState({
          editDialogOpen: false,
          removeConfirmDialogOpen: false
        });
      } else if (nextStatus === _systemConfig.DEVICE_UNDO_REMOVED_STATUS) {
        this.setState({
          device: nextProps.lastUndoDevice
        });
      }
    }

    /** @ignore */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /** @ignore */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var infoStates = [_systemConfig.DEVICE_REMOVED_STATUS, _systemConfig.DEVICE_UPDATED_STATUS, _systemConfig.DEVICE_UNDO_REMOVED_STATUS];
      if (infoStates.indexOf(prevProps.status) > -1 && prevProps.status === this.props.status) {
        prevProps.clearStatus();
      }
    }

    /** @ignore */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.clearStatus();
    }

    /* opens the device edit dialog */

  }, {
    key: '_handleEditDialog',
    value: function _handleEditDialog(id) {
      var items = this.props.items;

      this.setState({
        editDialogOpen: true,
        device: items.get((0, _parseInt2.default)(id))
      });
    }

    /* opens the remove confirmation dialog */

  }, {
    key: '_handleEditDialogDismiss',


    /* closes the device edit dialog */
    value: function _handleEditDialogDismiss() {
      this.setState({ editDialogOpen: false });
    }

    /* updates device when user hit save button */

  }, {
    key: '_handleEditDialogSave',
    value: function _handleEditDialogSave(device) {
      this.props.updateDevice(this.props.url, device);
    }

    /* removes device when user hit the delete confirm button */

  }, {
    key: '_handleRemove',
    value: function _handleRemove() {
      this.props.deleteDevice(this.props.url, this.state.device.id, this.state.device.deviceId);
    }

    /* undoes a device remove when user hit the undo link */

  }, {
    key: '_handleRemoveUndo',
    value: function _handleRemoveUndo() {
      var device = this.state.device;

      this.props.undoRemoveDevice(this.props.url, device);
    }

    /* cancels the remove action and closes the remove dialog */

  }, {
    key: '_handleConfirmRemoveDismiss',
    value: function _handleConfirmRemoveDismiss() {
      this.setState({ removeConfirmDialogOpen: false });
    }

    /* opens the columns editor dialog */

  }, {
    key: '_toggleColumnEditorDialog',
    value: function _toggleColumnEditorDialog(e, ref) {
      this.setState({
        showColumnsDialog: !this.state.showColumnsDialog
      });
    }

    /**
     * renders a device using the material-ui card template format
     */

  }, {
    key: '_renderDeviceCard',
    value: function _renderDeviceCard(device) {
      var _this2 = this;

      var name = device.name.length > 25 ? device.name.substr(0, 25) + '...' : device.name;
      var label = device.label.length > 25 ? device.label.substr(0, 25) + '...' : device.label;

      return (0, _jsx3.default)(_GridList.GridTile, {
        cols: 2,
        rows: 1.1,
        style: styles.tile
      }, void 0, (0, _jsx3.default)(_Card.Card, {
        style: styles.card
      }, void 0, (0, _jsx3.default)(_Card.CardHeader, {
        style: styles.headerCard,
        textStyle: styles.headerText,
        title: device.family,
        titleStyle: styles.headerTitle,
        actAsExpander: false
      }), (0, _jsx3.default)(_Card.CardText, {
        expandable: false,
        style: styles.cardTextContainer
      }, void 0, (0, _jsx3.default)('div', {}, void 0, _ref, ' ', device.deviceId), (0, _jsx3.default)('div', {}, void 0, _ref2, ' ', name), device.label && (0, _jsx3.default)('div', {
        style: styles.label
      }, void 0, _ref3, ' ', label), device.ipAddress && (0, _jsx3.default)('div', {}, void 0, _ref4, ' ', device.ipAddress)), (0, _jsx3.default)(_Card.CardActions, {
        style: styles.actions
      }, void 0, (0, _jsx3.default)(_FlatButton2.default, {
        name: 'edit-' + device.deviceId,
        label: 'edit',
        disableTouchRipple: true,
        disableFocusRipple: true,
        style: styles.actionButton,
        onTouchTap: function onTouchTap() {
          return _this2._handleEditDialog(device.deviceId);
        }
      }), (0, _jsx3.default)(_FlatButton2.default, {
        name: 'remove-' + device.deviceId,
        label: 'remove',
        disableTouchRipple: true,
        disableFocusRipple: true,
        style: styles.actionButton,
        onTouchTap: function onTouchTap() {
          return _this2._handleRemoveDialog(device.deviceId);
        }
      }))));
    }

    /**
     * renders a row in the devices table using the material-ui TableRow component
     */

  }, {
    key: '_renderDeviceRow',
    value: function _renderDeviceRow(device) {
      var _this3 = this;

      var userSettings = this.props.userSettings;

      var columns = userSettings && userSettings.columns || defaultColumns;
      return (0, _jsx3.default)(_Table.TableRow, {
        selectable: false,
        style: styles.row
      }, void 0, this._renderTableDeviceColumns(device, columns), (0, _jsx3.default)(_Table.TableRowColumn, {
        style: styles.colActions
      }, void 0, (0, _jsx3.default)(_A2.default, {
        name: 'edit-' + device.deviceId,
        href: '#',
        onTouchTap: function onTouchTap() {
          return _this3._handleEditDialog(device.deviceId);
        }
      }, void 0, (0, _jsx3.default)(_create2.default, {
        style: styles.actionIcon,
        color: styles.iconColor
      })), (0, _jsx3.default)(_A2.default, {
        name: 'edit-' + device.deviceId,
        href: '#',
        onTouchTap: function onTouchTap() {
          return _this3._handleRemoveDialog(device.deviceId);
        }
      }, void 0, (0, _jsx3.default)(_clear2.default, {
        style: styles.actionIcon,
        color: styles.iconColor
      }))));
    }

    /*
     * renders a cell value by checking the field type
     * we do that since the ftp username and ftp password
     * are not primary attributes of the device object
     */

  }, {
    key: '_renderTableDeviceCellValue',
    value: function _renderTableDeviceCellValue(key, device) {
      if (key === 'ftpUsername') {
        return device.ftpInformation.username;
      } else if (key === 'ftpPassword') {
        return device.ftpInformation.password;
      } else {
        return device[key];
      }
    }

    /* renders the device row columns */

  }, {
    key: '_renderTableDeviceColumns',
    value: function _renderTableDeviceColumns(device, columns) {
      var _this4 = this;

      return columns.filter(function (c) {
        return c.isShown;
      }).map(function (_ref5) {
        var key = _ref5.key,
            label = _ref5.label;
        return (0, _jsx3.default)(_Table.TableRowColumn, {
          style: styles.col
        }, void 0, _this4._renderTableDeviceCellValue(key, device));
      });
    }

    /* update the sorted field in the user settings property */

  }, {
    key: '_handleSortChange',
    value: function _handleSortChange(key) {
      var userSettings = this.props.userSettings;

      var newSettings = userSettings;
      newSettings.ordering = { field: key, sort: 'asc' };

      this.props.updateUserSettings(this.props.group, newSettings);
    }

    /* update the sort (asc or desc) settings in the user settings property */

  }, {
    key: '_handleOrderChange',
    value: function _handleOrderChange() {
      var userSettings = this.props.userSettings;

      var newSettings = userSettings;
      newSettings.ordering = newSettings.ordering || defaultOrder;
      if (newSettings.ordering.sort === 'asc') {
        newSettings.ordering.sort = 'desc';
      } else {
        newSettings.ordering.sort = 'asc';
      }

      this.props.updateUserSettings(this.props.group, newSettings);
    }

    /* renders a label that is currently defined as default sort */

  }, {
    key: '_renderSortedLabel',
    value: function _renderSortedLabel(key, label) {
      var _this5 = this;

      var userSettings = this.props.userSettings;

      var ordering = userSettings && userSettings.ordering || defaultOrder;

      return (0, _jsx3.default)('div', {
        style: { position: 'relative' }
      }, void 0, (0, _jsx3.default)(_A2.default, {
        name: 'sort-' + key,
        href: '#',
        onTouchTap: function onTouchTap() {
          return _this5._handleOrderChange();
        }
      }, void 0, label), ordering.sort === 'asc' && (0, _jsx3.default)(_arrowDropUp2.default, {
        style: styles.orderIcon,
        color: styles.iconColor
      }), ordering.sort === 'desc' && (0, _jsx3.default)(_arrowDropDown2.default, {
        style: styles.orderIcon,
        color: styles.iconColor
      }));
    }

    /* renders a label that isn't defined as default sort */

  }, {
    key: '_renderUnsortedLabel',
    value: function _renderUnsortedLabel(key, label) {
      var _this6 = this;

      return (0, _jsx3.default)(_A2.default, {
        name: 'sort-' + key,
        href: '#',
        onTouchTap: function onTouchTap() {
          return _this6._handleSortChange(key);
        }
      }, void 0, label);
    }

    /* renders the table labels */

  }, {
    key: '_renderTableDeviceLabels',
    value: function _renderTableDeviceLabels(columns, ordering) {
      var _this7 = this;

      return columns.filter(function (c) {
        return c.isShown;
      }).map(function (_ref6) {
        var key = _ref6.key,
            label = _ref6.label;
        return (0, _jsx3.default)(_Table.TableRowColumn, {
          style: styles.col
        }, void 0, ordering.field === key ? _this7._renderSortedLabel(key, label) : _this7._renderUnsortedLabel(key, label));
      });
    }

    /* reorder the devices map using the configured sort order */

  }, {
    key: '_reorderDevicesByDeviceId',
    value: function _reorderDevicesByDeviceId(arrItems, ordering) {
      var sortedArray = [];
      var newItems = new _immutable.Map();

      sortedArray = arrItems.sort(function (a, b) {
        return ordering.sort === 'asc' ? a[0] - b[0] : b[0] - a[0];
      });

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)((0, _values2.default)(sortedArray)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;

          newItems = newItems.set(value[0], value[1]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return newItems;
    }

    /* reorder the devices map using the configured sort order */

  }, {
    key: '_reorderDevicesByValue',
    value: function _reorderDevicesByValue(arrItems, ordering) {
      var newItems = new _immutable.Map();
      var sortedArray = [];

      // lodash helps using sortBy
      sortedArray = _lodash2.default.chain(arrItems).map(function (val, key) {
        return { name: 'a' + val[1][ordering.field] + val[0], key: val[0], device: val[1] };
      }).sortBy('name');

      if (ordering.sort === 'desc') {
        sortedArray = sortedArray.reverse();
      }

      sortedArray = sortedArray.keyBy('name').mapValues('device').value();

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)((0, _values2.default)(sortedArray)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var value = _step2.value;

          newItems = newItems.set(value.deviceId, value);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return newItems;
    }

    /*
     * reorder the devices map using the configured settings
     * from the user properties
     * since lodash is not working well on ordering numbers we split
     * the ordering in two functions, one for deviceId and the others for all other values
     */

  }, {
    key: '_reorderDevices',
    value: function _reorderDevices(items, ordering) {
      var arrItems = (0, _from2.default)(items);

      /* Lodash seemt to not handle properly integers so we need to use standard sort for deviceId */
      if (ordering.field === 'deviceId') {
        return this._reorderDevicesByDeviceId(arrItems, ordering);
      }

      return this._reorderDevicesByValue(arrItems, ordering);
    }

    /** @ignore */

  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          device = _state.device,
          editDialogOpen = _state.editDialogOpen,
          removeConfirmDialogOpen = _state.removeConfirmDialogOpen;
      var _props = this.props,
          userSettings = _props.userSettings,
          items = _props.items,
          status = _props.status,
          onInfoOpen = _props.onInfoOpen,
          viewMode = _props.viewMode;


      var columns = userSettings && userSettings.columns || defaultColumns;
      var ordering = userSettings && userSettings.ordering || defaultOrder;

      var orderedItems = this._reorderDevices(items, ordering);

      return (0, _jsx3.default)('div', {
        style: styles.root
      }, void 0, items.size === 0 && (0, _jsx3.default)('div', {
        cols: 6
      }, void 0, (0, _jsx3.default)('p', {
        style: { textAlign: 'center' }
      }, void 0, (0, _jsx3.default)(_sentimentDissatisfied2.default, {
        style: styles.faceIcon,
        color: styles.iconColor
      })), _ref7), viewMode === 'grid' && items.size > 0 && (0, _jsx3.default)(_GridList.GridList, {
        cols: 6,
        rows: 10,
        padding: 15,
        style: styles.gridList
      }, void 0, items.valueSeq().map(this._renderDeviceCard)), viewMode === 'table' && items.size > 0 && (0, _jsx3.default)(_Table.Table, {
        selectable: false,
        style: styles.table
      }, void 0, (0, _jsx3.default)(_Table.TableHeader, {
        displaySelectAll: false,
        enableSelectAll: false,
        adjustForCheckbox: false,
        style: styles.tableHeader
      }, void 0, (0, _jsx3.default)(_Table.TableRow, {
        style: styles.headerRow
      }, void 0, this._renderTableDeviceLabels(columns, ordering), (0, _jsx3.default)(_Table.TableHeaderColumn, {
        style: styles.headerColActions
      }, void 0, 'Actions', (0, _jsx3.default)(_A2.default, {
        name: 'edit-' + device.deviceId,
        href: '#',
        onTouchTap: this._toggleColumnEditorDialog
      }, void 0, (0, _jsx3.default)(_moreVert2.default, {
        style: styles.settingsIcon,
        color: styles.iconColor
      }))))), (0, _jsx3.default)(_Table.TableBody, {
        displayRowCheckbox: false,
        stripedRows: true
      }, void 0, orderedItems.valueSeq().map(this._renderDeviceRow))), editDialogOpen && (0, _jsx3.default)(_DeviceEditDialog2.default, {
        open: true,
        onSave: this._handleEditDialogSave,
        onCancel: this._handleEditDialogDismiss,
        device: device,
        onInfoOpen: onInfoOpen
      }), removeConfirmDialogOpen && (0, _jsx3.default)(_RemoveConfirmDialog2.default, {
        open: true,
        onRemove: this._handleRemove,
        onCancel: this._handleConfirmRemoveDismiss
      }), status === _systemConfig.DEVICE_UPDATED_STATUS && (0, _jsx3.default)(_Snackbar2.default, {
        open: true,
        message: 'Your device with name ' + name + ' was succesfully updated',
        autoHideDuration: 10000
      }), status === _systemConfig.DEVICE_REMOVED_STATUS && (0, _jsx3.default)(_Snackbar2.default, {
        open: true,
        message: 'Your device with name ' + name + ' was succesfully removed',
        autoHideDuration: 10000,
        action: 'undo',
        onActionTouchTap: this._handleRemoveUndo
      }), status === _systemConfig.DEVICE_UNDO_REMOVED_STATUS && _ref8, this.state.showColumnsDialog && (0, _jsx3.default)(_TableColumnSettings2.default, {
        open: true,
        group: 'systemConfiguration',
        columns: columns,
        onRequestClose: this._toggleColumnEditorDialog
      }));
    }
  }]);
  return Devices;
}(_react2.default.Component);

Devices.defaultProps = {
  viewMode: 'grid',
  group: 'systemConfiguration',
  items: new _immutable.Map() };
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, (0, _extends3.default)({}, _systemConfig.actions, { updateUserSettings: _userSettings.updateUserSettings }))(Devices);
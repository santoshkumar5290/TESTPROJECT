'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlexTable = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _SICKPlatform = require('../../SICKPlatform');

var _lodash = require('lodash');

var _colors = require('material-ui/styles/colors');

var _colorManipulator = require('material-ui/utils/colorManipulator');

var _reactVirtualized = require('react-virtualized');

var _HeaderWithVisibilityToggle = require('./HeaderWithVisibilityToggle');

var _HeaderWithVisibilityToggle2 = _interopRequireDefault(_HeaderWithVisibilityToggle);

var _HeaderWithArrowToggle = require('./HeaderWithArrowToggle');

var _HeaderWithArrowToggle2 = _interopRequireDefault(_HeaderWithArrowToggle);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _A = require('../Global/A');

var _A2 = _interopRequireDefault(_A);

var _exportData = require('../../ducks/exportData');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Components
// ------------------------------------

var style = {
  checkbox: {
    marginLeft: '10px'
  },
  container: {
    display: 'flex',
    flexColumn: 'column'
  },
  subheader: {
    fontWeight: '500',
    color: (0, _colorManipulator.fade)(_colors.darkBlack, 0.6),
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: '75px',
    opacity: '0',
    width: '100%',
    transition: '0.5s ease'
  }

  // ------------------------------------
  // Helpers
  // ------------------------------------

};

// ------------------------------------
// Action creators
// ------------------------------------

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    exportData: state.exportData.get(ownProps.group)
  };
};

/**
 * @private
 */

var _ref11 = (0, _jsx3.default)('u', {}, void 0, 'Clear Selection');

var FlexTable = exports.FlexTable = function (_React$Component) {
  (0, _inherits3.default)(FlexTable, _React$Component);

  function FlexTable(props, context) {
    (0, _classCallCheck3.default)(this, FlexTable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FlexTable.__proto__ || (0, _getPrototypeOf2.default)(FlexTable)).call(this, props, context));

    _this.state = {
      fullHostMessage: false
    };

    _this._rowGetter = _this._rowGetter.bind(_this);
    _this._rowColumnStyle = _this._rowColumnStyle.bind(_this);
    _this._toggleFullHostMessage = _this._toggleFullHostMessage.bind(_this);
    _this._handleCheckHeaderToggle = _this._handleCheckHeaderToggle.bind(_this);
    _this._renderCheckboxItem = _this._renderCheckboxItem.bind(_this);
    _this._chooseAll = _this._chooseAll.bind(_this);
    _this._clearAll = _this._clearAll.bind(_this);
    _this._isItemChecked = _this._isItemChecked.bind(_this);
    _this._toggleItem = _this._toggleItem.bind(_this);
    _this._updateExport = _this._updateExport.bind(_this);

    _this.labels = (0, _extends3.default)({}, _utils.labels);

    _this.labels[_utils.HOST_MESSAGE_KEY] = (0, _jsx3.default)(_HeaderWithVisibilityToggle2.default, {
      label: 'Host Message',
      onToggle: _this._toggleFullHostMessage
    });

    _this.labels[_utils.TIME_ID_KEY] = (0, _jsx3.default)(_HeaderWithArrowToggle2.default, {
      label: 'Time',
      onByDefault: props.timeSortDesc,
      onToggle: props.onToggleTimeSort
    });
    return _this;
  }

  /** @ignore */


  (0, _createClass3.default)(FlexTable, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.timeSortDesc !== nextProps.timeSortDesc) {
        this.labels[_utils.TIME_ID_KEY] = (0, _jsx3.default)(_HeaderWithArrowToggle2.default, {
          label: 'Time',
          onByDefault: nextProps.timeSortDesc,
          onToggle: this.props.onToggleTimeSort
        });
      }
    }

    /**
     * function to get the row item based on index.
     *
     * @param {number} index
     *   Item's row index.
     */

  }, {
    key: '_rowGetter',
    value: function _rowGetter(_ref) {
      var index = _ref.index;
      var data = this.props.data;

      if (!data) {
        return null;
      }

      var items = data.items;

      if (items) {
        var list = items.valueSeq();
        return list.get(index);
      }

      return null;
    }

    /**
     * function to get the column by type.
     *
     * @param {number} column
     *   Item's column type.
     */

  }, {
    key: '_rowColumnStyle',
    value: function _rowColumnStyle(column) {
      var styles = this.props.styles;


      if (column === _utils.HOST_MESSAGE_KEY && this.state.fullHostMessage) {
        return styles.rowColumnWrapped;
      }

      if (column === _utils.PACKAGE_ID_KEY) {
        return styles.rowColumnPackageID;
      }

      return styles.rowColumn;
    }

    /**
     * Pure helper function to find out whether an item is checked.
     *
     * @param {string} itemID
     *   Item's package ID.
     * @param {string[]} checkedItems
     *   Array of checked item IDs.
     * @return {boolean}
     *   Whether item is checked.
     */

  }, {
    key: '_isItemChecked',
    value: function _isItemChecked(itemID, checkedItems) {
      return checkedItems.indexOf(itemID) !== -1;
    }

    /**
     * Pure helper function to check of all passed items are checked.
     *
     * @param {string[]} items
     *   Array of item IDs.
     * @param {string[]} checkedItems
     *   Array of check item IDs.
     * @return {boolean}
     *   Whether all passed items are checked.
     */

  }, {
    key: '_areAllItemsChecked',
    value: function _areAllItemsChecked(items, checkedItems) {
      // This is an array comparison in disguise.
      return (0, _lodash.intersection)(items, checkedItems).length === items.length && items.length > 0;
    }

    /**
     * Pure helper function to toggle item status.
     *
     * @param {string} itemID
     *   Item's package ID.
     * @param {string[]} checkedItems
     *   Array of checked item IDs.
     * @return {string[]}
     *   New checkedItems array.
     */

  }, {
    key: '_toggleItem',
    value: function _toggleItem(itemID, checkedItems) {
      if (this._isItemChecked(itemID, checkedItems)) {
        return checkedItems.filter(function (item) {
          return !(item === itemID);
        });
      } else {
        return [].concat((0, _toConsumableArray3.default)(checkedItems), [itemID]);
      }
    }

    /**
     * helper function to toggle the host message state.
     */

  }, {
    key: '_toggleFullHostMessage',
    value: function _toggleFullHostMessage() {
      this.setState((0, _assign2.default)(this.state, {
        fullHostMessage: !this.state.fullHostMessage
      }));
    }

    /**
     * function to get the rows checkbox state.
     *
     * @param {object} row
     *   Item's row element.
     */

  }, {
    key: '_renderCheckboxItem',
    value: function _renderCheckboxItem(row) {
      var exportData = this.props.exportData;

      var _ref2 = exportData || {},
          params = _ref2.params;

      var _ref3 = params || {},
          keys = _ref3.keys,
          all = _ref3.all;

      // set checked if all or selected


      var isChecked = all || this._isItemChecked(row.rowData.timestamp, keys || []);
      return (0, _jsx3.default)(_Checkbox2.default, {
        checked: isChecked,
        onCheck: this._handleCheckToggle.bind(this, row),
        style: style.checkbox
      });
    }

    /**
     * helper function to handle the check toggle.
     *
     * @param {object} row
     *   Item's row object.
     * @param {object} e
     *   objects event.
     * @param {boolean} checked
     *   next checked state of item
     */

  }, {
    key: '_handleCheckToggle',
    value: function _handleCheckToggle(row, e, checked) {
      var exportData = this.props.exportData;

      var _ref4 = exportData || {},
          params = _ref4.params;

      var _ref5 = params || {},
          keys = _ref5.keys,
          all = _ref5.all;

      var checkedItemsNext = this._toggleItem(row.rowData.timestamp, keys || []);
      this._updateExport(all && checked, checkedItemsNext);
    }

    /**
     * helper function to handle the check toggle header.
     *
     * @param {object} e
     *   objects event.
     * @param {boolean} checked
     *   checked state of header
     */

  }, {
    key: '_handleCheckHeaderToggle',
    value: function _handleCheckHeaderToggle(e, checked) {
      var _props = this.props,
          data = _props.data,
          exportData = _props.exportData;

      var _ref6 = exportData || {},
          params = _ref6.params;

      var _ref7 = params || {},
          keys = _ref7.keys,
          all = _ref7.all;

      var _ref8 = data || {},
          items = _ref8.items,
          total = _ref8.total;

      var list = [];
      if (checked) {
        list = (0, _lodash.union)(keys || [], items.keySeq().toArray());
      } else {
        list = (0, _lodash.difference)(keys || [], items.keySeq().toArray());
      }
      this._updateExport(all && checked || total > 0 && list.length === total, list);
    }

    /**
     * Pure helper function to update export data
     */

  }, {
    key: '_updateExport',
    value: function _updateExport(allItems, checkedItems) {
      var _props2 = this.props,
          group = _props2.group,
          setExportParams = _props2.setExportParams,
          data = _props2.data;

      var exportUpdate = {};

      if (allItems) {
        exportUpdate['all'] = allItems;
      } else if (!(0, _lodash.isEmpty)(checkedItems)) {
        exportUpdate['keys'] = checkedItems;
      }

      var channel = data && data.params && data.params.channel ? data.params.channel : '';

      exportUpdate['channel'] = channel;

      setExportParams(group, exportUpdate);
    }

    /**
     * helper function to choose all selection
     */

  }, {
    key: '_chooseAll',
    value: function _chooseAll() {
      var _props3 = this.props,
          group = _props3.group,
          setExportParams = _props3.setExportParams,
          data = _props3.data;
      var params = data.params;

      setExportParams(group, (0, _extends3.default)({}, params, { all: true }));
    }

    /**
     * helper function to clear all selection
     */

  }, {
    key: '_clearAll',
    value: function _clearAll(e) {
      this._handleCheckHeaderToggle(e, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props4 = this.props,
          data = _props4.data,
          columns = _props4.columns,
          styles = _props4.styles,
          measurementSystem = _props4.measurementSystem,
          exportData = _props4.exportData;

      var _ref9 = exportData || {},
          params = _ref9.params;

      var _ref10 = params || {},
          keys = _ref10.keys,
          all = _ref10.all;

      var rowCount = 0;
      var totalItems = 0;
      var allChecked = false;
      if (data) {
        var items = data.items,
            total = data.total;

        if (items) {
          rowCount = items.size;

          // compare total checked vs total items
          var list = items.keySeq().toArray();
          allChecked = all || this._areAllItemsChecked(list, keys || []);
        }
        totalItems = total;
      }

      var shouldShowSubheading = allChecked && totalItems > rowCount;

      // adjust height for subheader message
      var gridStyle = shouldShowSubheading ? (0, _assign2.default)({}, styles.grid, { top: styles.rowHeight }) : styles.grid;

      // add width for subheader message
      var subheaderStyle = shouldShowSubheading ? (0, _assign2.default)({}, style.subheader, { opacity: 1 }) : style.subheader;

      // Select all items link
      var itemsChoose = (0, _jsx3.default)('div', {}, void 0, 'All ', rowCount, ' items on this page are selected. ', (0, _jsx3.default)(_A2.default, {
        onTouchTap: this._chooseAll
      }, void 0, (0, _jsx3.default)('u', {}, void 0, 'Select all ', (0, _jsx3.default)('strong', {}, void 0, totalItems), ' in the specified range')));

      // Clear selection link
      var itemsClear = (0, _jsx3.default)('div', {}, void 0, 'All ', totalItems, ' items in the specified range are selected. ', (0, _jsx3.default)(_A2.default, {
        onTouchTap: this._clearAll
      }, void 0, _ref11));

      return (0, _jsx3.default)(_reactVirtualized.AutoSizer, {}, void 0, function (_ref12) {
        var width = _ref12.width,
            height = _ref12.height;
        return (0, _jsx3.default)('div', {
          style: styles.container
        }, void 0, (0, _jsx3.default)('div', {
          style: subheaderStyle
        }, void 0, all ? itemsClear : itemsChoose), (0, _jsx3.default)(_reactVirtualized.FlexTable, {
          rowWrapperStyle: styles.rowWrapper,
          rowStyle: styles.row,
          gridStyle: gridStyle,
          headerStyle: styles.header,
          headerHeight: styles.rowHeight,
          rowHeight: _this2.state.fullHostMessage ? styles.rowHeightFullHostMessage : styles.rowHeight,
          rowGetter: _this2._rowGetter,
          rowCount: rowCount,
          scrollToIndex: 0,
          height: height - (shouldShowSubheading ? styles.rowHeight : 0),
          width: width
        }, void 0, [(0, _jsx3.default)(_reactVirtualized.FlexColumn, {
          disableSort: true,
          flexGrow: 1,
          width: 30,
          label: (0, _jsx3.default)(_Checkbox2.default, {
            checked: allChecked,
            onCheck: _this2._handleCheckHeaderToggle
          }),
          dataKey: 'select',
          cellRenderer: _this2._renderCheckboxItem
        })].concat((0, _utils.renderTableColumns)(columns, _this2.labels, _utils.transformers, _this2._rowColumnStyle, measurementSystem))));
      });
    }
  }]);
  return FlexTable;
}(_react2.default.Component);

FlexTable.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = (0, _SICKPlatform.connect)(mapStateToProps, _exportData.actions)(FlexTable);
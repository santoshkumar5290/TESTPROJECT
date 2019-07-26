'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _immutable = require('immutable');

var _lodash = require('lodash');

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _colors = require('material-ui/styles/colors');

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _SortableList = require('../SortableList');

var _SortableList2 = _interopRequireDefault(_SortableList);

var _utils = require('./utils');

var _PackageListTableHeader = require('./PackageListTableHeader');

var _PackageListTableHeader2 = _interopRequireDefault(_PackageListTableHeader);

var _PackageListTableBody = require('./PackageListTableBody');

var _PackageListTableBody2 = _interopRequireDefault(_PackageListTableBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  body: {
    padding: 0,
    overflowY: 'auto'
  },
  container: {
    height: '100%'
  },
  selectField: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 20
  },
  subheader: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 10
  },
  sortableList: {
    marginLeft: 14,
    marginRight: 14,
    marginBottom: 20
  }
};

var PackageListTable = function (_SICKComponent) {
  (0, _inherits3.default)(PackageListTable, _SICKComponent);

  function PackageListTable(props) {
    (0, _classCallCheck3.default)(this, PackageListTable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PackageListTable.__proto__ || (0, _getPrototypeOf2.default)(PackageListTable)).call(this, props));

    _this.toggleColumnEditorModal = function () {
      _this.setState({
        modalOpen: !_this.state.modalOpen
      });
    };

    _this.sortBase = function (dir, item, parentIndex) {
      var cards = _this.state.columns;
      var length = parentIndex >= 0 ? cards.get(parentIndex).get('children').size : cards.size;
      if (dir === 'up' && item.get('index') === 0 || dir === 'down' && item.get('index') === length - 1) {
        return;
      }

      var updated = (0, _utils.sortCards)({ dir: dir, cards: cards, parentIndex: parentIndex, item: item });
      _this.setState({
        columns: updated
      });
    };

    _this.updateBool = function (index, parentIndex, prop) {
      var cards = _this.state.columns;
      var updated = (0, _utils.updateBool)({ cards: cards, index: index, parentIndex: parentIndex, prop: prop });
      var allSelected = (0, _utils.checkAllEnabled)(updated);
      _this.setState({
        columns: updated,
        allSelected: allSelected
      });
    };

    _this.updateMode = function (event, index, value) {
      _this.props.onModeChange(value);
    };

    _this.updateWidths = function (columnWidths) {
      var cards = _this.state.columns;
      var updated = (0, _utils.setWidths)(cards, columnWidths);

      _this.setState({
        columns: updated
      });
      _this.props.updateColumns(_this.state.columns.toJS());
    };

    _this.cancelTableDisplaySettings = function () {
      _this.toggleColumnEditorModal();
      _this.props.onModeChange(_this.state.initialMode);

      var columns = (0, _immutable.fromJS)(_this.props.columns);
      _this.setState({
        columns: columns,
        allSelected: (0, _utils.checkAllEnabled)(columns)
      });
    };

    _this.saveTableDisplaySettings = function () {
      _this.toggleColumnEditorModal();
      _this.props.updateColumns(_this.state.columns.toJS());
    };

    _this.selectAll = function () {
      var updated = (0, _utils.updateBoolAll)({
        cards: _this.state.columns,
        prop: 'visible',
        boolState: !_this.state.allSelected
      });

      _this.setState({
        columns: updated,
        allSelected: !_this.state.allSelected
      });
    };

    _this.getViewModeLabel = function (mode) {
      switch (mode) {
        case 'VIEW_PER_PACKAGE':
          return ':viewPerPackage';

        case 'VIEW_PER_BARCODE':
          return ':viewPerBarcode';
      }
    };

    _this.state = {
      initialMode: null,
      modalOpen: false,
      allSelected: false,
      rows: []
    };
    return _this;
  }

  (0, _createClass3.default)(PackageListTable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var columns = (0, _immutable.fromJS)(this.props.columns);
      this.setState({
        columns: columns,
        initialMode: this.props.selectedMode,
        allSelected: (0, _utils.checkAllEnabled)(columns)
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var stateChanges = {};
      if (this.state.initialMode === null && nextProps.selectedMode) {
        stateChanges.initialMode = nextProps.selectedMode;
      }

      if (!(0, _lodash.isEqual)(nextProps.columns, this.props.columns)) {
        var nextColumns = (0, _immutable.fromJS)(nextProps.columns);
        stateChanges.columns = nextColumns;
        stateChanges.allSelected = (0, _utils.checkAllEnabled)(nextColumns);
      }

      if ((0, _keys2.default)(stateChanges).length) {
        this.setState(stateChanges);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          selectedMode = _props.selectedMode,
          modes = _props.modes,
          localization = _props.localization,
          localizationSet = _props.localizationSet,
          isPaused = _props.isPaused;


      var actions = [(0, _jsx3.default)(_FlatButton2.default, {
        primary: false,
        style: { color: _colors.lightBlue700 },
        label: localization.formatMessage(localizationSet + ':saveButton'),
        onTouchTap: this.saveTableDisplaySettings,
        name: 'sap-at-edit-columns-cancel-button'
      }), (0, _jsx3.default)(_FlatButton2.default, {
        primary: false,
        style: { color: _colors.lightBlue700 },
        label: localization.formatMessage(localizationSet + ':cancelButton'),
        onTouchTap: this.cancelTableDisplaySettings,
        name: 'sap-at-edit-columns-cancel-button'
      })];

      var modesMenuItems = modes.map(function (mode, index) {
        return (0, _jsx3.default)(_MenuItem2.default, {
          value: mode,
          primaryText: localization.formatMessage('' + localizationSet + _this2.getViewModeLabel(mode))
        }, index);
      });

      return (0, _jsx3.default)('div', {
        style: styles.container
      }, void 0, (0, _jsx3.default)(_PackageListTableHeader2.default, {
        toggleColumnEditorModal: this.toggleColumnEditorModal,
        localization: localization,
        localizationSet: localizationSet,
        isPaused: isPaused,
        play: this.props.play,
        pause: this.props.pause
      }), (0, _jsx3.default)(_PackageListTableBody2.default, {
        headers: (0, _immutable.fromJS)(this.props.columns),
        rows: this.props.rows,
        onRowSelection: this.props.onRowSelection,
        updateWidths: this.updateWidths
      }), this.state.modalOpen ? (0, _jsx3.default)(_Dialog2.default, {
        modal: true,
        open: this.state.modalOpen,
        bodyStyle: styles.body,
        actions: actions,
        title: localization.formatMessage(localizationSet + ':tableDisplaySettings')
      }, void 0, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('h3', {
        style: styles.subheader
      }, void 0, localization.formatMessage(localizationSet + ':rowViewingMode')), (0, _jsx3.default)(_SelectField2.default, {
        value: selectedMode,
        disabled: modesMenuItems.length < 2,
        style: styles.selectField,
        onChange: this.updateMode
      }, void 0, modesMenuItems), (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('h3', {
        style: styles.subheader
      }, void 0, localization.formatMessage(localizationSet + ':columnArrangement')), (0, _jsx3.default)('div', {
        style: styles.sortableList
      }, void 0, (0, _jsx3.default)(_SortableList2.default, {
        updateBool: this.updateBool,
        sortBase: this.sortBase,
        sortableCards: this.state.columns,
        allSelected: this.state.allSelected,
        selectAll: this.selectAll
      }))))) : null);
    }
  }]);
  return PackageListTable;
}(_SICKComponent3.default);

PackageListTable.propTypes = {
  columns: _propTypes2.default.array.isRequired,
  rows: _propTypes2.default.array.isRequired,
  localization: _propTypes2.default.object.isRequired,
  localizationSet: _propTypes2.default.string,
  play: _propTypes2.default.func,
  pause: _propTypes2.default.func,
  isPaused: _propTypes2.default.bool,
  onRowSelection: _propTypes2.default.func,
  selectedMode: _propTypes2.default.string,
  modes: _propTypes2.default.array.isRequired,
  onModeChange: _propTypes2.default.func.isRequired
};
PackageListTable.defaultProps = {
  localizationSet: 'widgets',
  play: function play() {},
  pause: function pause() {},
  isPaused: false
};
exports.default = PackageListTable;
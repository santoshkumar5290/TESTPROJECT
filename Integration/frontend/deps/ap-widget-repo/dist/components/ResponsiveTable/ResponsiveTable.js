'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponsiveTable = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _redux = require('redux');

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _lodash = require('lodash');

var _reactabularTable = require('reactabular-table');

var Table = _interopRequireWildcard(_reactabularTable);

var _reactabularSticky = require('reactabular-sticky');

var Sticky = _interopRequireWildcard(_reactabularSticky);

var _reactabularResizable = require('reactabular-resizable');

var resizeable = _interopRequireWildcard(_reactabularResizable);

var _selectabular = require('selectabular');

var select = _interopRequireWildcard(_selectabular);

var _tableResolver = require('table-resolver');

var resolve = _interopRequireWildcard(_tableResolver);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _stylesheetHelpers = require('stylesheet-helpers');

var stylesheet = _interopRequireWildcard(_stylesheetHelpers);

require('./ResponsiveTable.scss');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResponsiveTable = exports.ResponsiveTable = function (_SICKComponent) {
  (0, _inherits3.default)(ResponsiveTable, _SICKComponent);

  function ResponsiveTable(props) {
    (0, _classCallCheck3.default)(this, ResponsiveTable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ResponsiveTable.__proto__ || (0, _getPrototypeOf2.default)(ResponsiveTable)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      columns: [],
      rows: [],
      headers: [],
      widths: []
    };

    _this.wrapperNode = null;
    _this.tableHeaderRef = null;
    _this.tableBodyRef = null;

    var _stylesheet$create = stylesheet.create(),
        styleSheetElement = _stylesheet$create.styleSheetElement,
        styleSheet = _stylesheet$create.styleSheet;

    _this.stylesheet = {
      element: styleSheetElement,
      sheet: styleSheet
    };
    return _this;
  }

  (0, _createClass3.default)(ResponsiveTable, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmounted = true;
      this.resizeableHelper.cleanup();
      this.resizeableHelper = null;
      this.stylesheet.element.remove();
      this.stylesheet = {};
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var components = this.props.components;
      var _state = this.state,
          columns = _state.columns,
          rows = _state.rows;


      var classes = (0, _classnames2.default)('responsive-table-widget', this.props.fixedHeight && 'fixed-height', this.props.noHeader && 'no-header', this.props.resizeable && 'resizeable', this.props.className);

      return _react2.default.createElement(
        'div',
        {
          className: classes,
          style: this.props.styles.wrapper,
          ref: function ref(el) {
            _this2.wrapperNode = el;
          } },
        (0, _jsx3.default)(Table.Provider, {
          style: this.props.styles.table,
          columns: columns,
          components: components
        }, void 0, this.createTableHeader(), rows.length > 0 ? this.createTableBody() : _react2.default.createElement(
          'tbody',
          { ref: function ref(body) {
              _this2.tableBodyRef = body;
            }, key: 'empty-body', className: 'no-row-indicator' },
          (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('td', {
            colSpan: columns.length
          }, void 0, this.props.emptyRowMessage))
        ))
      );
    }
  }]);
  return ResponsiveTable;
}(_SICKComponent3.default);

ResponsiveTable.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  columns: _propTypes2.default.array.isRequired,
  rows: _propTypes2.default.array.isRequired,
  indexKey: _propTypes2.default.string.isRequired,
  fixedHeight: _propTypes2.default.bool,
  noHeader: _propTypes2.default.bool,
  resizeable: _propTypes2.default.bool,
  styles: _propTypes2.default.object,
  components: _propTypes2.default.object,
  onRow: _propTypes2.default.func,
  onRowSelection: _propTypes2.default.func,
  onDragEnd: _propTypes2.default.func,
  emptyRowMessage: _propTypes2.default.string
});
ResponsiveTable.defaultProps = {
  columns: {},
  rows: {},
  fixedHeight: false,
  noHeader: false,
  resizeable: false,
  styles: {},
  components: {},
  onRowSelection: function onRowSelection() {},
  onDragEnd: function onDragEnd() {},
  emptyRowMessage: 'No data available'
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.componentDidMount = function () {
    _this3.resizeableHelper = resizeable.helper({
      globalId: _uuid2.default.v4(),
      getId: function getId(_ref) {
        var property = _ref.property;
        return property.replace(/[^0-9a-z]/gi, '-');
      }
    });

    _this3.updateStateFromProps(_this3.props);
  };

  this.componentDidUpdate = function () {
    setTimeout(function () {
      _this3.updateTableHeight();
      _this3.updateTableColumns();
    });
  };

  this.componentWillReceiveProps = function (nextProps) {
    if (!(0, _lodash.isEqual)(_this3.props, nextProps)) {
      _this3.updateStateFromProps(nextProps);
    }
  };

  this.initializeResizeableColumns = function (columns) {
    var resizableFormatter = resizeable.column({
      onDragStart: function onDragStart(width, _ref2) {
        var column = _ref2.column;
      },
      onDrag: function onDrag(width, _ref3) {
        var column = _ref3.column;

        _this3.state.widths[column.property] = width;
        _this3.resizeableHelper.update({
          column: column,
          width: width
        });
      },
      onDragEnd: function onDragEnd(width, _ref4) {
        var column = _ref4.column;

        _this3.state.widths[column.property] = width;

        _this3.props.onDragEnd(_this3.state.widths, column);
      }
    });

    return columns.map(function (column, index) {
      if (!column.children) {
        if (!column.header.formatters) {
          column.header.formatters = [];
        }

        if (column.header.formatters.indexOf(resizableFormatter) === -1) {
          column.header.formatters.push(resizableFormatter);
        }
      } else {
        column.children = _this3.initializeResizeableColumns(column.children);
      }

      return column;
    });
  };

  this.updateStateFromProps = function (props) {
    var widths = _this3.state.widths;
    var columns = props.columns,
        rows = props.rows,
        resizeable = props.resizeable;


    if (_this3.resizeableHelper) {
      columns = _this3.resizeableHelper.initialize(columns);

      if (resizeable) {
        columns = _this3.initializeResizeableColumns(columns);
      }
    }

    var resolvedColumns = resolve.columnChildren({ columns: columns });
    var resolvedRows = resolve.resolve({
      columns: resolvedColumns,
      method: resolve.nested
    })(rows);

    if (!resizeable || _this3.state.rows.length === 0 && resolvedRows.length > 0) {
      widths = [];
    }

    _this3.setState({
      rows: resolvedRows,
      columns: resolvedColumns,
      headers: resolve.headerRows({ columns: columns }),
      widths: widths
    });

    (0, _assign2.default)(_this3.props.styles, (0, _extends3.default)({
      wrapper: {},
      table: {},
      header: {},
      body: {}
    }, _this3.props.styles));

    _this3.forceUpdate();
  };

  this.updateTableHeight = function () {
    if (!_this3.props.noHeader && !_this3.unmounted) {
      _this3.tableBodyRef.style.height = 'calc(100% - ' + _this3.tableHeaderRef.clientHeight + 'px)';
    }
  };

  this.updateTableColumns = function () {
    var _state2 = _this3.state,
        columns = _state2.columns,
        rows = _state2.rows;
    var noHeader = _this3.props.noHeader;


    if (!_this3.unmounted) {
      var headerRow = void 0,
          headerCell = void 0,
          firstCell = void 0,
          minWidth = void 0;
      var tableBody = _this3.tableBodyRef;
      var firstRow = tableBody.rows[0];
      var hasRows = rows.length > 0;

      _this3.wrapperNode.className = _this3.wrapperNode.className.replace(' widths-set', '');

      if (!noHeader) {
        headerRow = _this3.tableHeaderRef.rows[_this3.tableHeaderRef.rows.length - 1];
      }

      columns.map(function (column, index) {
        if (column.props && column.props.className) {
          if (_this3.props.resizeable) {
            _this3.updateStylesheet(column.props.className, {
              minWidth: 'inherit',
              width: 'inherit',
              maxWidth: 'inherit'
            });
          } else {
            _this3.updateStylesheet(column.props.className, {
              minWidth: 'inherit'
            });
          }

          minWidth = 0;
          if (column.width) {
            minWidth = column.width;
          } else if (_this3.state.widths[column.property]) {
            minWidth = _this3.state.widths[column.property];
          } else if (!noHeader && !hasRows) {
            headerCell = headerRow.getElementsByClassName(column.props.className)[0];
            minWidth = headerCell.clientWidth;
          } else if (!noHeader && hasRows) {
            headerCell = headerRow.getElementsByClassName(column.props.className)[0];
            firstCell = firstRow.getElementsByClassName(column.props.className)[0];
            if (!firstCell) {
              firstCell = headerCell;
            }

            minWidth = headerCell.clientWidth > firstCell.clientWidth ? headerCell.clientWidth : firstCell.clientWidth;
          } else if (hasRows) {
            firstCell = firstRow.getElementsByClassName(column.props.className)[0];
            if (firstCell) {
              minWidth = firstCell.clientWidth;
            }
          }

          _this3.state.widths[column.property] = minWidth;

          if (_this3.props.resizeable) {
            _this3.updateStylesheet(column.props.className, {
              minWidth: minWidth + 'px',
              width: minWidth + 'px',
              maxWidth: minWidth + 'px'
            });
          } else {
            _this3.updateStylesheet(column.props.className, {
              minWidth: minWidth + 'px'
            });
          }
        }
      });

      _this3.wrapperNode.className += ' widths-set';
    }
  };

  this.updateStylesheet = function (className, props) {
    if (!_this3.unmounted) {
      stylesheet.updateProperties(window, _this3.stylesheet.sheet, className, props);
    }
  };

  this.onBodyRow = function (row, _ref5) {
    var rowIndex = _ref5.rowIndex,
        rowKey = _ref5.rowKey;

    var onRow = _this3.props.onRow ? _this3.props.onRow(row, { rowIndex: rowIndex, rowKey: rowKey }) : {};
    return (0, _extends3.default)({
      className: (0, _classnames2.default)(row.selected && 'selected'),
      onClick: function onClick() {
        return _this3.onBodyRowClick(row, rowIndex);
      }
    }, onRow);
  };

  this.onHeaderRow = function () {
    return {};
  };

  this.onBodyRowClick = function (row, rowIndex) {
    var rows = _this3.state.rows;


    _this3.setState((0, _redux.compose)(select.rows(function (r) {
      return r[_this3.props.indexKey] === row[_this3.props.indexKey];
    }), select.none)(rows));

    _this3.props.onRowSelection(row, rowIndex);
  };

  this.createTableHeader = function () {
    var headerProps = {
      style: _this3.props.styles.header,
      key: 'responsive-header',
      ref: function ref(header) {
        _this3.tableHeaderRef = header && header.getRef();
      },
      headerRows: _this3.state.headers,
      onRow: _this3.onHeaderRow
    };

    if (_this3.props.fixedHeight && !_this3.props.noHeader) {
      return _react2.default.createElement(Sticky.Header, (0, _extends3.default)({
        tableBody: _this3.tableBodyRef
      }, headerProps));
    } else if (_this3.props.noHeader) {
      return '';
    } else {
      return _react2.default.createElement(Table.Header, headerProps);
    }
  };

  this.createTableBody = function () {
    var rows = _this3.state.rows;
    var rowKey = _this3.props.rowKey;


    var bodyProps = {
      key: 'responsive-body',
      rowKey: rowKey || '_index',
      style: _this3.props.styles.body,
      ref: function ref(body) {
        _this3.tableBodyRef = body && body.getRef();
      },
      rows: rows,
      onRow: _this3.onBodyRow
    };

    if (_this3.props.fixedHeight) {
      return _react2.default.createElement(Sticky.Body, (0, _extends3.default)({
        tableHeader: _this3.tableHeaderRef
      }, bodyProps));
    } else {
      return _react2.default.createElement(Table.Body, bodyProps);
    }
  };
};
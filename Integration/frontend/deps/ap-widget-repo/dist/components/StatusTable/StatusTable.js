'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusTable = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _SICKComponent2 = require('../SICKComponent');

var _SICKComponent3 = _interopRequireDefault(_SICKComponent2);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Table = require('material-ui/Table');

var _arrowUpward = require('material-ui/svg-icons/navigation/arrow-upward');

var _arrowUpward2 = _interopRequireDefault(_arrowUpward);

var _arrowDownward = require('material-ui/svg-icons/navigation/arrow-downward');

var _arrowDownward2 = _interopRequireDefault(_arrowDownward);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _colors = require('material-ui/styles/colors');

var _StaticHeaderTable = require('../StaticHeaderTable');

var _StaticHeaderTable2 = _interopRequireDefault(_StaticHeaderTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  container: {
    overflowX: 'hidden',
    overflowY: 'auto',
    width: '100%',
    height: '100%'
  },
  headerLabel: {
    textTransform: 'none',
    paddingLeft: 0,
    color: _colors.lightBlack,
    fontSize: 13
  },
  mainHeaderRow: {
    borderBottomWidth: 2,
    height: 36
  },
  mainHeaderColumn: {
    height: 36
  },
  column: {
    fontSize: 14
  },
  checkFilter: {
    display: 'inline-block',
    width: '',
    marginLeft: '15px'
  },
  labelWrapper: {
    marginRight: '10px'
  },
  tableWrapper: {
    clear: 'both'
  },
  toolbar: {
    width: '100%'
  },
  toolbarTitle: {
    fontSize: 18,
    color: _colors.black
  },
  toolbarFilters: {
    fontSize: 13,
    float: 'right',
    color: _colors.lightBlack
  }
};

var defaultSortHandler = function defaultSortHandler(data, field, direction) {
  return data.sort(function (a, b) {
    if (direction === 'asc' && a[field].value < b[field].value || direction === 'desc' && a[field].value > b[field].value) {
      return -1;
    } else if (direction === 'asc' && a[field].value > b[field].value || direction === 'desc' && a[field].value < b[field].value) {
      return 1;
    } else {
      return 0;
    }
  });
};

/* eslint-disable */
/**
 * Provides a general-purpose Status Table with filter and sort capabilities.
 *
 * **Available properties:**
 *
 * | Property               | Type       | Description                                                                                                | Allowed values                          | Default Value   | Required |
 * |------------------------|------------|------------------------------------------------------------------------------------------------------------|-----------------------------------------|-----------------|----------|
 * | `title`                | `string`   | The table title                                                                                            | *                                       |                 | YES      |
 * | `headers`              | `array`    | The headers array composed in form of value:label                                                          | *                                       |                 | YES      |
 * | `data`                 | `array`    | The table rows/columns where each column                                                                   | *                                       |                 | YES      |
 * | `sortBy`               | `string`   | Default sort field                                                                                         | *                                       |                 | YES      |
 * | `sortDirection`        | `string`   | Default sort direction                                                                                     | asc|desc                                | asc             | No       |
 * | `filters`              | `array`    | Optional array with filters                                                                                | *                                       |                 | No       |
 * | `sortHandler`          | `function` | Optional sort handler                                                                                      | JS function                             |                 | No       |
 * | `emptyTableMessage`    | `string`   | Optional mesage to display if data is empty                                                                | *                                       |                 | No       |
 * @example
 * import StatusTable from 'src/components/StatusTable'
 * statusTable = StatusTable.init(document.getElementById('status-table'), {
 *    title: 'Health Status',
 *    headers: headersArray,
 *    filters: filtersArray,
 *    data: dataArray,
 *    sortBy: 'deviceId',
 *    sortDirection: 'desc'
 *    emptyTableMessage: 'No data to display.'
 * })
 *
 * @example
 *  <StatusTable
 *    title={'Health Status'}
 *    headers={statusTableHeaders}
 *    filters={statusTableFilters}
 *    data={statusTableData}
 *    sortBy={'deviceId'}
 *    sortDirection={'desc'}
 *    emptyTableMessage={'No data to display'}
 *  />
 */
/* eslint-enable */

var StatusTable = exports.StatusTable = function (_SICKComponent) {
  (0, _inherits3.default)(StatusTable, _SICKComponent);

  function StatusTable(props) {
    (0, _classCallCheck3.default)(this, StatusTable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (StatusTable.__proto__ || (0, _getPrototypeOf2.default)(StatusTable)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      sortBy: props.sortBy,
      sortDirection: props.sortDirection,
      data: []
    };
    return _this;
  }

  /**
   * Setup the initial sort and state when the component is about to mount
   */


  (0, _createClass3.default)(StatusTable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateStatData(this.props);
    }

    /**
     * Each time new props are received from the parent, sort related state needs to be updated
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.updateStatData(nextProps);
    }

    /**
     * Function called when header is clicked.
     *
     * @param {string} sortBy
     */


    /**
     * Function to return correct sort direction icon
     *
     * @param {string} field
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          title = _props.title,
          filters = _props.filters,
          headers = _props.headers;

      var data = this.state.data;

      return (0, _jsx3.default)(_Paper2.default, {
        zDepth: 1,
        style: styles.container
      }, void 0, (0, _jsx3.default)(_StaticHeaderTable2.default, {
        fixedHeader: true,
        fixedFooter: false,
        wrapperStyle: styles.tableWrapper
      }, void 0, (0, _jsx3.default)(_Table.TableHeader, {
        displaySelectAll: false,
        adjustForCheckbox: false
      }, void 0, (0, _jsx3.default)(_Table.TableRow, {
        style: styles.mainHeaderRow
      }, void 0, (0, _jsx3.default)(_Table.TableHeaderColumn, {
        colSpan: headers.length,
        style: styles.mainHeaderColumn
      }, void 0, (0, _jsx3.default)('div', {
        style: styles.toolbar
      }, void 0, (0, _jsx3.default)('span', {
        style: styles.toolbarTitle
      }, void 0, title), (0, _jsx3.default)('span', {
        style: styles.toolbarFilters
      }, void 0, filters.map(function (row, index) {
        return row;
      }))))), (0, _jsx3.default)(_Table.TableRow, {}, void 0, headers.map(function (row, index) {
        return (0, _jsx3.default)(_Table.TableHeaderColumn, {}, void 0, (0, _jsx3.default)(_FlatButton2.default, {
          label: row.label,
          labelPosition: 'before',
          labelStyle: styles.headerLabel,
          icon: _this2._getIcon(row.value),
          onClick: function onClick() {
            return _this2._sort(row.value);
          }
        }));
      }))), (0, _jsx3.default)(_Table.TableBody, {
        displayRowCheckbox: false,
        stripedRows: false
      }, void 0, data && data.length > 0 || !this.props.emptyTableMessage ? data.map(function (row, index) {
        return (0, _jsx3.default)(_Table.TableRow, {}, index, _this2._getColunmns(row));
      }) : (0, _jsx3.default)(_Table.TableRow, {
        displayBorder: false
      }, void 0, (0, _jsx3.default)(_Table.TableRowColumn, {}, void 0, (0, _jsx3.default)('div', {
        style: this.props.emptyTableMessageStyle
      }, void 0, this.props.emptyTableMessage))), '}')));
    }
  }]);
  return StatusTable;
}(_SICKComponent3.default);

StatusTable.propTypes = (0, _extends3.default)({}, _SICKComponent3.default.propTypes, {
  title: _propTypes2.default.string.isRequired,
  headers: _propTypes2.default.array.isRequired,
  data: _propTypes2.default.array.isRequired,
  sortBy: _propTypes2.default.string.isRequired,
  sortDirection: _propTypes2.default.string,
  filters: _propTypes2.default.array,
  sortHandler: _propTypes2.default.func,
  emptyTableMessage: _propTypes2.default.string,
  emptyTableMessageStyle: _propTypes2.default.object
});
StatusTable.defaultProps = {
  filters: [],
  headers: [],
  data: [],
  sortHandler: defaultSortHandler,
  sortDirection: 'asc',
  emptyTableMessage: ''
};

var _ref = (0, _jsx3.default)(_arrowUpward2.default, {
  color: _colors.lightBlack
});

var _ref2 = (0, _jsx3.default)(_arrowDownward2.default, {
  color: _colors.lightBlack
});

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.updateStatData = function (props) {
    var data = props.data;
    var _state = _this3.state,
        sortBy = _state.sortBy,
        sortDirection = _state.sortDirection;

    var flattenData = _this3.props.sortHandler(data, sortBy, sortDirection);

    _this3.setState({
      data: flattenData
    });
  };

  this._sort = function (sortBy) {
    var _state2 = _this3.state,
        sortDirection = _state2.sortDirection,
        data = _state2.data;

    sortDirection = _this3.state.sortBy === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
    _this3.props.sortHandler(data, sortBy, sortDirection);
    _this3.setState({ data: data, sortBy: sortBy, sortDirection: sortDirection });
  };

  this._getIcon = function (field) {
    var _state3 = _this3.state,
        sortBy = _state3.sortBy,
        sortDirection = _state3.sortDirection;


    if (sortBy !== field) {
      return;
    }

    return sortDirection === 'asc' ? _ref : _ref2;
  };

  this._getColunmns = function (row) {
    var columns = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(row)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        columns.push((0, _jsx3.default)(_Table.TableRowColumn, {
          style: styles.column
        }, void 0, row[key].label || row[key].value));
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

    return columns;
  };
};
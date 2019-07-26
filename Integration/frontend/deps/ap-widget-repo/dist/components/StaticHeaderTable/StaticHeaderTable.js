'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticHeaderTable = undefined;

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Table2 = require('material-ui/Table');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StaticHeaderTable = exports.StaticHeaderTable = function (_Table) {
  (0, _inherits3.default)(StaticHeaderTable, _Table);

  function StaticHeaderTable() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, StaticHeaderTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = StaticHeaderTable.__proto__ || (0, _getPrototypeOf2.default)(StaticHeaderTable)).call.apply(_ref, [this].concat(args))), _this), _this.updateTableHeight = function () {
      if (_this.props.fixedHeader && !_this.unmounted) {
        var height = void 0;
        var table = _reactDom2.default.findDOMNode(_this);
        var tableDiv = _reactDom2.default.findDOMNode(_this.refs.tableDiv);
        var tableBody = _reactDom2.default.findDOMNode(_this.refs.tableBodyChild);
        var tableHeader = _reactDom2.default.findDOMNode(_this.refs.tableHeader);

        // Reset heights before recalculating new table height.
        tableDiv.style.height = 'inherit';
        tableBody.style.height = 'inherit';

        height = table.parentElement.clientHeight - tableHeader.clientHeight;

        tableDiv.style.height = height + 'px';
        tableBody.style.height = height + 'px';
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(StaticHeaderTable, [{
    key: 'createTableHeader',
    value: function createTableHeader(base) {
      return _react2.default.cloneElement(base, {
        enableSelectAll: base.props.enableSelectAll && this.props.selectable && this.props.multiSelectable,
        onSelectAll: this.onSelectAll,
        selectAllSelected: this.state.allRowsSelected,
        ref: 'tableHeader' // Override to add ref for table header element.
      });
    }
  }, {
    key: 'createTableBody',
    value: function createTableBody(base) {
      return _react2.default.cloneElement(base, {
        allRowsSelected: this.state.allRowsSelected,
        multiSelectable: this.props.multiSelectable,
        onCellClick: this.onCellClick,
        onCellHover: this.onCellHover,
        onCellHoverExit: this.onCellHoverExit,
        onRowHover: this.onRowHover,
        onRowHoverExit: this.onRowHoverExit,
        onRowSelection: this.onRowSelection,
        selectable: this.props.selectable,
        style: (0, _assign2.default)({ height: this.props.height }, base.props.style),
        ref: 'tableBodyChild' // Override to add ref for table body element.
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        window.addEventListener('resize', _this2.updateTableHeight);
        _this2.updateTableHeight();
      }, 0);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateTableHeight();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmounted = true;
      window.removeEventListener('resize', this.updateTableHeight);
    }
  }]);
  return StaticHeaderTable;
}(_Table2.Table);
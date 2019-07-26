'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _ResponsiveTable = require('../ResponsiveTable');

var _ResponsiveTable2 = _interopRequireDefault(_ResponsiveTable);

require('./PackageListTableBody.scss');

var _check = require('../../../images/check.png');

var _check2 = _interopRequireDefault(_check);

var _circle = require('../../../images/circle.png');

var _circle2 = _interopRequireDefault(_circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing png instead of svg to reduce render load
var removeNull = function removeNull(element) {
  return element !== null;
};

var styles = {
  paper: {
    height: 'calc(100% - 56px)'
  },
  table: {
    wrapper: {
      height: '100%'
    },
    table: {
      height: '100%'
    }
  }
};

var _ref = (0, _jsx3.default)('img', {
  src: _check2.default
});

var _ref2 = (0, _jsx3.default)('img', {
  src: _circle2.default
});

var PackageListTableBody = function (_React$Component) {
  (0, _inherits3.default)(PackageListTableBody, _React$Component);

  function PackageListTableBody() {
    (0, _classCallCheck3.default)(this, PackageListTableBody);
    return (0, _possibleConstructorReturn3.default)(this, (PackageListTableBody.__proto__ || (0, _getPrototypeOf2.default)(PackageListTableBody)).apply(this, arguments));
  }

  (0, _createClass3.default)(PackageListTableBody, [{
    key: 'getHeaderLabel',
    value: function getHeaderLabel(column) {
      return column.getIn(['header', 'label']) || column.get('property');
    }
  }, {
    key: 'getHeaders',
    value: function getHeaders() {
      var _this2 = this;

      var headers = this.props.headers;


      return headers.map(function (column, index) {
        if (!column.get('visible') || !column.get('active')) {
          return null;
        }

        var header = {
          header: {
            label: column.get('children') ? _this2.getHeaderLabel(column) : ''
          }
        };

        if (column.get('children') && column.get('children').size) {
          header.children = column.get('children').map(function (child) {
            if (!child.get('visible') || !child.get('active')) {
              return null;
            }

            var formattedChild = {
              property: column.get('property').split(' ').join('') + '.' + child.get('property').split(' ').join(''),
              header: {
                label: _this2.getHeaderLabel(child)
              },
              cell: {
                formatters: []
              },
              width: child.get('width')
            };

            if (child.get('formatters')) {
              formattedChild.cell.formatters = child.get('formatters');
            }
            if (child.get('booleanIcon')) {
              formattedChild.cell.formatters.push(function (val) {
                return val ? _ref : _ref2;
              });
            }

            return formattedChild;
          }).toJS().filter(removeNull);
        } else {
          header.children = [{
            header: { label: _this2.getHeaderLabel(column) },
            property: column.get('property').split(' ').join(''),
            width: column.get('width')
          }];
        }

        return header;
      }).toJS().filter(removeNull);
    }
  }, {
    key: 'render',
    value: function render() {
      var columns = this.getHeaders();

      return (0, _jsx3.default)(_Paper2.default, {
        zDepth: 1,
        style: styles.paper,
        className: 'plt-body'
      }, void 0, (0, _jsx3.default)(_ResponsiveTable2.default, {
        columns: columns,
        rows: this.props.rows,
        style: styles.table,
        onDragEnd: this.props.updateWidths,
        fixedHeight: true,
        resizeable: true,
        onRowSelection: this.props.onRowSelection
      }));
    }
  }]);
  return PackageListTableBody;
}(_react2.default.Component);

PackageListTableBody.defaultProps = {
  updateWidths: function updateWidths() {}
};
exports.default = PackageListTableBody;
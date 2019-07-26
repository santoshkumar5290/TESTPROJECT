'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _SICKComponent4 = require('../SICKComponent');

var _SICKComponent5 = _interopRequireDefault(_SICKComponent4);

var _keyboardArrowUp = require('material-ui/svg-icons/hardware/keyboard-arrow-up');

var _keyboardArrowUp2 = _interopRequireDefault(_keyboardArrowUp);

var _keyboardArrowDown = require('material-ui/svg-icons/hardware/keyboard-arrow-down');

var _keyboardArrowDown2 = _interopRequireDefault(_keyboardArrowDown);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _colors = require('material-ui/styles/colors');

require('./SortableList.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  expander: {
    display: 'inline-block',
    width: 20,
    textAlign: 'center',
    cursor: 'pointer'
  },
  noExpander: {
    display: 'inline-block',
    width: 20,
    paddingLeft: '10px'
  },
  iconStyle: {
    marginLeft: 5,
    marginRigth: 5,
    fill: _colors.lightBlue700
  },
  labelStyle: {
    fontSize: '14px',
    width: 'auto',
    wordBreak: 'break-word'
  },
  card: {
    borderBottom: '1px solid #E0E0E0',
    padding: 10,
    display: 'flex',
    backgroundColor: 'rgba(0,0,0,0.05)'
  },
  selectAllCard: {
    borderBottom: '1px solid #E0E0E0',
    padding: 10,
    paddingLeft: 20,
    display: 'flex'
  }
};

var canMoveUp = function canMoveUp(index, cards) {
  var before = cards.slice(0, index + 1).filter(function (card) {
    return card.get('active');
  });
  var newIndex = before.size - 1;

  if (index === 0) {
    return false;
  } else if (before.size === 0) {
    return false;
  } else if (before.get(newIndex).get('property').toLowerCase() === 'id') {
    return false;
  } else if (before.get(newIndex - 1).get('property').toLowerCase() === 'id') {
    return false;
  }

  return true;
};

var canMoveDown = function canMoveDown(index, cards) {
  var after = cards.slice(index, cards.size).filter(function (card) {
    return card.get('active');
  });
  var newIndex = 0;

  if (index === cards.size - 1) {
    return false;
  } else if (after.size === 0) {
    return false;
  } else if (after.get(newIndex).get('property').toLowerCase() === 'id') {
    return false;
  } else if (after.get(newIndex + 1).get('property').toLowerCase() === 'id') {
    return false;
  }

  return true;
};

var SelectAllCard = function (_SICKComponent) {
  (0, _inherits3.default)(SelectAllCard, _SICKComponent);

  function SelectAllCard() {
    (0, _classCallCheck3.default)(this, SelectAllCard);
    return (0, _possibleConstructorReturn3.default)(this, (SelectAllCard.__proto__ || (0, _getPrototypeOf2.default)(SelectAllCard)).apply(this, arguments));
  }

  (0, _createClass3.default)(SelectAllCard, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return (0, _jsx3.default)('div', {
        style: styles.selectAllCard
      }, void 0, (0, _jsx3.default)(_Checkbox2.default, {
        iconStyle: styles.iconStyle,
        labelStyle: styles.labelStyle,
        style: { width: 'auto' },
        label: 'Select All',
        checked: this.props.allSelected,
        onCheck: function onCheck() {
          return _this2.props.selectAll();
        }
      }));
    }
  }]);
  return SelectAllCard;
}(_SICKComponent5.default);

SelectAllCard.propTypes = (0, _extends3.default)({}, _SICKComponent5.default.propTypes, {
  styles: _propTypes2.default.object.isRequired,
  selectAll: _propTypes2.default.func.isRequired,
  allSelected: _propTypes2.default.bool.isRequired
});

var _ref = (0, _jsx3.default)('div', {
  className: 'sl-expander--down'
});

var _ref2 = (0, _jsx3.default)('div', {
  className: 'sl-expander--right'
});

var Card = function (_SICKComponent2) {
  (0, _inherits3.default)(Card, _SICKComponent2);

  function Card() {
    (0, _classCallCheck3.default)(this, Card);
    return (0, _possibleConstructorReturn3.default)(this, (Card.__proto__ || (0, _getPrototypeOf2.default)(Card)).apply(this, arguments));
  }

  (0, _createClass3.default)(Card, [{
    key: 'getHeaderLabel',
    value: function getHeaderLabel(column) {
      return column.getIn(['header', 'label']) || column.get('property');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          key = _props.key,
          item = _props.item,
          moveUp = _props.moveUp,
          moveDown = _props.moveDown,
          sortBase = _props.sortBase,
          updateBool = _props.updateBool,
          depth = _props.depth,
          parentIndex = _props.parentIndex;


      var hasChildren = item.get('children') && item.get('children').size > 0;

      var handleExpand = null;
      if (hasChildren) {
        handleExpand = function handleExpand() {
          return updateBool(item.get('index'), parentIndex[0], 'expanded');
        };
      }

      return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('div', {
        style: (0, _assign2.default)({}, this.props.styles, { paddingLeft: depth * 40 })
      }, key, (0, _jsx3.default)('div', {
        style: {
          display: 'flex',
          width: 'calc(100% - 50px)',
          cursor: hasChildren ? 'pointer' : 'default',
          marginLeft: 0
        },
        onClick: handleExpand
      }, void 0, hasChildren ? (0, _jsx3.default)('div', {
        style: styles.expander,
        onClick: handleExpand
      }, void 0, item.get('expanded') ? _ref : _ref2) : (0, _jsx3.default)('div', {
        style: styles.noExpander
      }), (0, _jsx3.default)(_Checkbox2.default, {
        iconStyle: styles.iconStyle,
        labelStyle: styles.labelStyle,
        style: { width: 'auto' },
        label: this.getHeaderLabel(item),
        checked: item.get('visible'),
        onCheck: function onCheck() {
          return updateBool(item.get('index'), parentIndex[0], 'visible');
        },
        disabled: item.get('property').toLowerCase() === 'id'
      })), (0, _jsx3.default)('div', {
        style: { marginLeft: 'auto' }
      }, void 0, (0, _jsx3.default)(_keyboardArrowUp2.default, {
        onClick: function onClick() {
          return sortBase('up', item, parentIndex[0]);
        },
        style: {
          cursor: 'pointer',
          display: moveUp ? 'initial' : 'none',
          marginRight: moveDown ? 0 : 24
        }
      }), (0, _jsx3.default)(_keyboardArrowDown2.default, {
        onClick: function onClick() {
          return sortBase('down', item, parentIndex[0]);
        },
        style: {
          cursor: 'pointer',
          display: moveDown ? 'initial' : 'none'
        }
      }))), item.get('expanded') && hasChildren ? item.get('children').map(function (child, j, children) {
        return (0, _jsx3.default)(Card, {
          styles: (0, _assign2.default)({}, _this4.props.styles, { backgroundColor: 'white' }),
          item: child,
          moveUp: canMoveUp(j, children),
          moveDown: canMoveDown(j, children),
          sortBase: sortBase,
          updateBool: updateBool,
          depth: depth + 1,
          parentIndex: [item.get('index')]
        }, j);
      }) : null);
    }
  }]);
  return Card;
}(_SICKComponent5.default);

Card.propTypes = (0, _extends3.default)({}, _SICKComponent5.default.propTypes, {
  key: _propTypes2.default.number.isRequired,
  item: _propTypes2.default.object.isRequired,
  moveUp: _propTypes2.default.bool.isRequired,
  moveDown: _propTypes2.default.bool.isRequired,
  sortBase: _propTypes2.default.func.isRequired,
  updateBool: _propTypes2.default.func.isRequired,
  depth: _propTypes2.default.number.isRequired,
  parentIndex: _propTypes2.default.array,
  styles: _propTypes2.default.object
});
Card.defaultProps = {
  styles: {
    border: '1px solid black',
    width: 200,
    padding: 10
  },
  parentIndex: [-1]
};

var SortableList = function (_SICKComponent3) {
  (0, _inherits3.default)(SortableList, _SICKComponent3);

  function SortableList() {
    (0, _classCallCheck3.default)(this, SortableList);
    return (0, _possibleConstructorReturn3.default)(this, (SortableList.__proto__ || (0, _getPrototypeOf2.default)(SortableList)).apply(this, arguments));
  }

  (0, _createClass3.default)(SortableList, [{
    key: 'render',
    value: function render() {
      var _this6 = this;

      return (0, _jsx3.default)('div', {
        style: {
          border: '1px solid #E0E0E0',
          borderBottom: 'none',
          marginRight: '10px',
          marginLeft: '10px'
        }
      }, void 0, (0, _jsx3.default)(SelectAllCard, {
        styles: styles.card,
        selectAll: this.props.selectAll,
        allSelected: this.props.allSelected
      }), this.props.sortableCards.map(function (item, i, allCards) {
        return (0, _jsx3.default)(Card, {
          styles: item.get('active') ? styles.card : (0, _assign2.default)({}, styles.card, { display: 'none' }),
          item: item,
          moveUp: canMoveUp(i, allCards),
          moveDown: canMoveDown(i, allCards),
          last: i === allCards.size - 1,
          sortBase: _this6.props.sortBase,
          updateBool: _this6.props.updateBool,
          depth: 0
        }, i);
      }));
    }
  }]);
  return SortableList;
}(_SICKComponent5.default);

SortableList.propTypes = (0, _extends3.default)({}, _SICKComponent5.default.propTypes, {
  sortableCards: _propTypes2.default.object.isRequired,
  sortBase: _propTypes2.default.func.isRequired,
  updateBool: _propTypes2.default.func.isRequired,
  selectAll: _propTypes2.default.func.isRequired,
  allSelected: _propTypes2.default.bool.isRequired,
  styles: _propTypes2.default.object
});
SortableList.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = SortableList;
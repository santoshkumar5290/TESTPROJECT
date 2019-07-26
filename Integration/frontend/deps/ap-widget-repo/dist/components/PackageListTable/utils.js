'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.sortCards = sortCards;
exports.checkAllEnabled = checkAllEnabled;
exports.updateBoolAll = updateBoolAll;
exports.updateBool = updateBool;
exports.setWidths = setWidths;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderByIndex = function orderByIndex(a, b) {
  if (a.get('index') === b.get('index')) return 0;
  return a.get('index') < b.get('index') ? -1 : 1;
};
var removeSpaces = function removeSpaces(string) {
  return string.split(' ').join('');
};

var structureWidths = function structureWidths(arr) {
  var keys = (0, _keys2.default)(arr);
  return keys.reduce(function (obj, item) {
    if (item.includes('.')) {
      var nest = item.split('.');
      obj[nest[0]] = obj[nest[0]] ? obj[nest[0]] : {};
      obj[nest[0]][nest[1]] = arr[item];
    } else {
      obj[item] = arr[item];
    }

    return obj;
  }, {});
};

function swappingWithID(cards, index, swappedIndex) {
  var result = false;
  if (cards.getIn([index, 'property']).toLowerCase() === 'id') {
    result = true;
  }

  if (cards.getIn([swappedIndex, 'property']).toLowerCase() === 'id') {
    result = true;
  }

  return result;
}

function sortCards(_ref) {
  var dir = _ref.dir,
      cards = _ref.cards,
      parentIndex = _ref.parentIndex,
      item = _ref.item;

  var activeCards = parentIndex === -1 ? cards.filter(function (card) {
    return card.get('active');
  }) : cards.getIn([parentIndex, 'children']).filter(function (card) {
    return card.get('active');
  });

  var itemIndex = item.get('index');
  var itemActiveIndex = activeCards.findIndex(function (card) {
    return card.get('property') === item.get('property');
  });
  var swappedIndex = dir === 'up' ? itemActiveIndex - 1 : itemActiveIndex + 1;

  // As per client request, the ID card should not be
  // movable from it's starting position in the list.
  if (swappingWithID(activeCards, itemActiveIndex, swappedIndex) && parentIndex === -1) {
    return cards;
  }

  var targetIndex = activeCards.get(swappedIndex).get('index');

  if (parentIndex >= 0) {
    var updated = cards.setIn([parentIndex, 'children', itemIndex, 'index'], targetIndex).setIn([parentIndex, 'children', targetIndex, 'index'], itemIndex);

    return updated.setIn([parentIndex, 'children'], updated.getIn([parentIndex, 'children']).sort(orderByIndex).map(function (c, index) {
      c.index = index;
      return c;
    }));
  }

  return cards.setIn([itemIndex, 'index'], targetIndex).setIn([targetIndex, 'index'], itemIndex).sort(orderByIndex).map(function (c, index) {
    c.index = index;
    return c;
  });
}

function updateParentFromChildren(_ref2) {
  var cards = _ref2.cards,
      parentIndex = _ref2.parentIndex,
      prop = _ref2.prop;

  if (cards.getIn([parentIndex, 'children']).some(function (child) {
    return child.get(prop) === true;
  })) {
    return cards.setIn([parentIndex, prop], true);
  }

  return cards.setIn([parentIndex, prop], false);
}

function checkAllEnabled(cards) {
  var result = true;

  cards.forEach(function (card) {
    if (card.get('children') && card.get('children').size) {
      if (card.get('children').some(function (child) {
        return child.get('visible') === false;
      })) {
        result = false;
      }
    }

    if (card.get('visible') === false) {
      result = false;
    }
  });

  return result;
}

function updateBoolAll(_ref3) {
  var cards = _ref3.cards,
      prop = _ref3.prop,
      boolState = _ref3.boolState;

  return cards.map(function (card) {
    if (card.get('property').toLowerCase() === 'id') {
      return card;
    }

    if (card.get('children') && card.get('children').size) {
      return card.set('children', card.get('children').map(function (card) {
        return card.set(prop, boolState);
      })).set(prop, boolState);
    }

    return card.set(prop, boolState);
  });
}

function updateBool(_ref4) {
  var cards = _ref4.cards,
      index = _ref4.index,
      parentIndex = _ref4.parentIndex,
      prop = _ref4.prop;

  if (parentIndex >= 0) {
    var updatedChildren = cards.setIn([parentIndex, 'children', index, prop], !cards.getIn([parentIndex, 'children', index, prop]));

    // Check if ALL children are now disabled, if so, disable parents
    // If child is enabled, ensure parent is enabled.
    return updateParentFromChildren({
      cards: updatedChildren,
      parentIndex: parentIndex,
      prop: prop
    });
  }

  var updated = cards.setIn([index, prop], !cards.getIn([index, prop]));

  if (updated.getIn([index, 'children'])) {
    return updated.setIn([index, 'children'], updated.getIn([index, 'children']).map(function (item) {
      return item.set(prop, updated.getIn([index, prop]));
    }));
  }

  return updated;
}

function setWidths(cards, columnWidths) {
  var newWidths = structureWidths(columnWidths);

  return cards.map(function (card) {
    if (card.get('children') && card.get('children').size > 0) {
      return card.set('children', card.get('children').map(function (child) {
        // If the parent is currently hidden, just return the
        // existing child as width can not have changed.
        if (newWidths[removeSpaces(card.get('property'))]) {
          return child.set('width', newWidths[removeSpaces(card.get('property'))][removeSpaces(child.get('property'))]);
        }

        return child;
      }));
    } else {
      return card.set('width', newWidths[removeSpaces(card.get('property'))]);
    }
  });
}

exports.default = {
  setWidths: setWidths,
  updateBool: updateBool,
  updateBoolAll: updateBoolAll,
  checkAllEnabled: checkAllEnabled,
  sortCards: sortCards
};
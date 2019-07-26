import calculatePixelSize from 'calculate-pixel-size'

export const frozenColumnId = 'objectindex'

const orderByIndex = (a, b) => {
  if (a.get('index') === b.get('index')) return 0
  return a.get('index') < b.get('index') ? -1 : 1
}
const removeSpaces = string => string.split(' ').join('')

const structureWidths = (arr) => {
  const keys = Object.keys(arr)
  return keys.reduce((obj, item) => {
    if (item.includes('.')) {
      const nest = item.split('.')
      obj[nest[0]] = obj[nest[0]] ? obj[nest[0]] : {}
      obj[nest[0]][nest[1]] = arr[item]
    } else {
      obj[item] = arr[item]
    }

    return obj
  }, {})
}

function swappingWithID (cards, index, swappedIndex) {
  let result = false
  if (cards.getIn([index, 'property']).toLowerCase() === frozenColumnId) {
    result = true
  }

  if (cards.getIn([swappedIndex, 'property']).toLowerCase() === frozenColumnId) {
    result = true
  }

  return result
}

export function sortCards ({ dir, cards, parentIndex, item }) {
  const activeCards = parentIndex === -1
    ? cards.filter((card) => (card.get('isActive')))
    : cards.getIn([parentIndex, 'children']).filter(card => card.get('isActive'))

  const itemIndex = item.get('index')
  const itemActiveIndex = activeCards.findIndex((card) => (card.get('property') === item.get('property')))
  const swappedIndex = dir === 'up' ? itemActiveIndex - 1 : itemActiveIndex + 1

  // As per client request, the ID card should not be
  // movable from it's starting position in the list.
  if (swappingWithID(activeCards, itemActiveIndex, swappedIndex) && parentIndex === -1) {
    return cards
  }

  const targetIndex = activeCards
    .get(swappedIndex)
    .get('index')

  if (parentIndex >= 0) {
    const updated = cards
      .setIn([parentIndex, 'children', itemIndex, 'index'], targetIndex)
      .setIn([parentIndex, 'children', targetIndex, 'index'], itemIndex)

    return updated
      .setIn(
        [parentIndex, 'children'],
        updated.getIn([parentIndex, 'children'])
          .sort(orderByIndex)
          .map((c, index) => {
            c.index = index
            return c
          })
      )
  }

  return cards
    .setIn([itemIndex, 'index'], targetIndex)
    .setIn([targetIndex, 'index'], itemIndex)
    .sort(orderByIndex)
    .map((c, index) => {
      c.index = index
      return c
    })
}

function updateParentFromChildren ({ cards, parentIndex, prop }) {
  if (cards.getIn([parentIndex, 'children']).some(child => child.get(prop) === true)) {
    return cards.setIn([parentIndex, prop], true)
  }

  return cards.setIn([parentIndex, prop], false)
}

export function checkAllEnabled (cards) {
  let result = true

  cards.forEach((card) => {
    if (card.get('children') && card.get('children').size) {
      if (card.get('children').some(child => child.get('isVisible') === false)) {
        result = false
      }
    }

    if (card.get('isVisible') === false) {
      result = false
    }
  })

  return result
}

export function updateBoolAll ({ cards, prop, boolState }) {
  return cards.map((card) => {
    
    if(!card.get('columnEditable')){
      return card.set(prop, true)
    }

    if (card.get('property').toLowerCase() === frozenColumnId) {
      return card
    }

    if (card.get('children') && card.get('children').size) {
      return card
        .set('children', card.get('children').map(card => card.set(prop, boolState)))
        .set(prop, boolState)
    }

    return card.set(prop, boolState)
  })
}

export function updateBool ({ cards, index, parentIndex, prop }) {
  if (parentIndex >= 0) {
    const updatedChildren = cards
      .setIn([parentIndex, 'children', index, prop],
        !cards.getIn([parentIndex, 'children', index, prop]))

    // Check if ALL children are now disabled, if so, disable parents
    // If child is enabled, ensure parent is enabled.
    return updateParentFromChildren({
      cards: updatedChildren,
      parentIndex,
      prop
    })
  }

  const updated = cards
    .setIn([index, prop], !cards.getIn([index, prop]))

  if (updated.getIn([index, 'children'])) {
    return updated.setIn([index, 'children'],
      updated.getIn([index, 'children']).map(item =>
        item.set(prop, updated.getIn([index, prop]))))
  }

  return updated
}

export function updateDependentBool ({ cards, index, index2, prop }) {
  var updated = cards.setIn([index, prop], !cards.getIn([index, prop]))
  updated = updated.setIn([index2, prop], !updated.getIn([index2, prop]))
  return updated
}

export function setWidths (cards, columnWidths) {
  const newWidths = structureWidths(columnWidths)

  return cards
    .map((card) => {
      if (card.get('children') && card.get('children').size > 0) {
        return card.set('children', card.get('children').map((child) => {
          // If the parent is currently hidden, just return the
          // existing child as width can not have changed.
          if (newWidths[removeSpaces(card.get('property'))]) {
            return child.set('width',
              newWidths[removeSpaces(card.get('property'))][removeSpaces(child.get('property'))])
          }

          return child
        }))
      } else {
        return card.set('width', newWidths[removeSpaces(card.get('property'))])
      }
    })
}

/**
 * Get State element for corresponding event.
 */
export const  _getTextLength = (input, type = '', dateValue = '') => {
  let valueData = ''
  // 2*size is added for error in calculation by calculatePixelSize
  if (type === 'LONGSTRING' && input[0] !== null) {
    for (let i = 0; i < input.length; i++) {
      valueData += input[i].value
      valueData += ', '
    }
    valueData = valueData.slice(0, -2)
    return calculatePixelSize(valueData).width + 2 * valueData.length + 20
  } else if (type === 'DROPDOWN') {
    // 5 added for dropdown
    return calculatePixelSize(input[0]).width + 2 * input[0].length + 10
  } else if (type === 'CHECKBOX') {
    // 80 added for checkbox size
    return calculatePixelSize(input).width + 2 * input.length + 80
  } else if (type === 'DATE') {
    return calculatePixelSize(dateValue).width + 2 * input.length + 25
  } else {
    return calculatePixelSize(input).width + 2 * input.length + 25
  }
};

export const setMinWidth = (columns) => {
  var minWidth = []
  for (let i = 0; i < columns.length; i++) {
    var max = 0
    var words = columns[i].header && columns[i].header.label && columns[i].header.label.split(' ') || []
    for (let j = 0; j < words.length; j++) {
      if (_getTextLength(words[j]) > max) max = _getTextLength(words[j])
    }
    max = Math.round(max)
    // adding 100 due to padding and size of sort icon
    if (columns[i].type === 'CHECKBOX') {
      minWidth[columns[i].property] = max + 115
    } else if (columns[i].type === 'DROPDOWN') {
      minWidth[columns[i].property] = max + 55
    } else if (columns[i].property === 'column1') {
      minWidth[columns[i].property] = max + 65
    } else {
      minWidth[columns[i].property] = max + 50
    }
  }
  return minWidth;
}

export default {
  setWidths,
  updateBool,
  updateBoolAll,
  checkAllEnabled,
  sortCards,
  _getTextLength,
  setMinWidth
}

export const sortStringFn = (a, b) => {
  if (a.label < b.label) return -1
  if (a.label > b.label) return 1
  return 0
}

export const sortSystemsFn = (a, b) => {
  if (a.systemName < b.systemName) return -1
  if (a.systemName > b.systemName) return 1
  return 0
}

export const equalArraysOfObjects = (a, b) => {
  return a.length === b.length && !a.find((_a, i) => (
    !Object.is(_a, b[i])
  ))
}

export const transposeMatrix = (rows) => {
  return rows.length && rows[0].map((col, i) => {
    return rows.map((row) => {
      return row[i]
    })
  })
}

export const isInvalidEntityName = (name) => {
  /* ILCore application cannot handle the use case where the url resourse is  a single dot or double dot,
      hence disabling this input - currently applied to system name, statistic name and group name */
  return name === '.' || name === '..'
}

export const colors = () => {
  return [
    '#ae017e', '#fdae6b', '#6baed6', '#f768a1', '#8c2d04', '#005a32',
    '#9e9ac8', '#fd8d3c', '#238b45', '#fdd0a2', '#4292c6', '#9ecae1',
    '#bcbddc', '#fa9fb5', '#a1d99b', '#4a1486', '#dd3497', '#dadaeb',
    '#7a0177', '#c6dbef', '#6a51a3', '#807dba', '#d94801', '#41ab5d',
    '#fcc5c0', '#74c476', '#c7e9c0', '#2171b5', '#084594', '#f16913'
  ]
}

export const defaultSortHandler = (data, field, direction, subattr = null) => {
  return data.sort((a, b) => {
    const aField = subattr ? a[field][subattr] : a[field]
    const bField = subattr ? b[field][subattr] : b[field]

    if (
      (direction === 'asc' && aField < bField) ||
      (direction === 'desc' && aField > bField)) {
      return -1
    } else if (
      (direction === 'asc' && aField > bField) ||
      (direction === 'desc' && aField < bField)) {
      return 1
    } else {
      return 0
    }
  })
}

export const formatUdfValue = (value, udf) => {
  const types = {
    string: 'string',
    float: 'float',
    integer: 'integer'
  }
  const optionCodes = {
    max_length: 'max_length',
    precision: 'precision'
  }
  const type = udf.dataType.toLowerCase()

  value = value.value ? value.value : value
  udf.options.forEach((option) => {
    var code = option.code.toLowerCase()
    if (code === optionCodes.max_length && typeof value === 'string') {
      value = value.substring(0, type === types.string && value.indexOf('-') === 0
        ? option.value + 1 // account for - symbol for int
        : option.value)
    }
    if (code === optionCodes.precision) {
      if (typeof value === 'string') {
        value = parseFloat(value)
      }
      value = value.toFixed(option.value)
    }
  })
  return value
}

export const textTruncate = (text, digit = 225) => {
  if (typeof text !== 'string' || text.length < digit) {
    return text
  } else if (text.length > digit) {
    return text.substr(0, digit - 3) + '...'
  }
}

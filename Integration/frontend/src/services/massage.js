
export const convertToObjects = (columnNames, rows) =>
  rows.map(row =>
    columnNames.reduce((result, column, index) => {
      result[column] = row[index]
      return result
    }, {})
  )

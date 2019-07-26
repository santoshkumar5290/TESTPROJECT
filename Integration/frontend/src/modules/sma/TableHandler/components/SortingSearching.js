/**
   * Function to sort the given array by the field and direction.
   *
   * @param {array} data
   * @param 
   * @param {string} direction
   */
export const _sortData = (data, field, direction, dataType, dropDownList = null) => {
  var levelDefined = false;
  for (let i = 0; i < data[0].columnData.length; i++) {
    if (data[0].columnData[i]["id"] == field && data[0].columnData[i].cellData.level) {
      levelDefined = true;
      break;
    }
  }
  if (levelDefined) {
    return _sortByState(data, field, direction);
  }
  else {
    switch (dataType) {
      case "STRING":
        return _sortByString(data, field, direction, dropDownList);
      case "LONGSTRING":
        return _sortByLongString(data, field, direction);
      case "INTEGER":
        return _sortByNumber(data, field, direction);
      case "FLOAT":
        return _sortByNumber(data, field, direction);
      case "DATE":
        return _sortByDate(data, field, direction);
      case "BOOLEAN":
        break;
      default:
        return _sortByString(data, field, direction, dropDownList);
    }
  }
};

/**
 * Default sort for column.
 */
const _sortByDate = (data, field, direction) => {
  data.sort((a, b) => {
    var A = "";
    var B = "";
    for (let i = 0; i < a.columnData.length; i++) {
      if (a.columnData[i]["id"] == field) {
        A = new Date(a.columnData[i].cellData.value[0]);
        break;
      }
    }
    for (let i = 0; i < b.columnData.length; i++) {
      if (b.columnData[i]["id"] == field) {
        B = new Date(b.columnData[i].cellData.value[0]);
        break;
      }
    }
    if (direction == "desc") {
      return B - A;
    } else {
      return A - B;
    }
  });
};


/**
 * Default sort for column.
 */
const _sortByState = (data, field, direction) => {
  data.sort((a, b) => {
    var A = "";
    var B = "";
    for (let i = 0; i < a.columnData.length; i++) {
      if (a.columnData[i]["id"] == field) {
        A = parseInt(a.columnData[i].cellData.level);
        break;
      }
    }
    for (let i = 0; i < b.columnData.length; i++) {
      if (b.columnData[i]["id"] == field) {
        B = parseInt(b.columnData[i].cellData.level);
        break;
      }
    }
    if (direction === "asc") {
      return A - B;
    } else {
      return B - A;
    }
  });
};

/**
 * Sort by column number.
 */
const _sortByNumber = (data, field, direction) => {
  data.sort((a, b) => {
    var A = "";
    var B = "";
    for (let i = 0; i < a.columnData.length; i++) {
      if (a.columnData[i]["id"] == field) {
        A = parseFloat(a.columnData[i].cellData.value);
        break;
      }
    }
    for (let i = 0; i < b.columnData.length; i++) {
      if (b.columnData[i]["id"] == field) {
        B = parseFloat(b.columnData[i].cellData.value);
        break;
      }
    }

    if (direction === "desc") {
      if( isNaN(A) ) {
          return 1;
      }
      if( isNaN(B) ) {
          return -1;
      }
      return B - A;
    } else {
      if( isNaN(A) ) {
          return -1;
      }
      if( isNaN(B) ) {
          return 1;
      }
      return A - B;
    }
  });
};

/**
 * Sort by column text value.
 */
const _sortByString = (data, field, direction, dropDownList) => {
  data.sort((a, b) => {
    var textA = "";
    var textB = "";
    for (let i = 0; i < a.columnData.length; i++) {
      if (a.columnData[i]["id"] == field) {
        textA = a.columnData[i].cellData.value[0]
        if (a.columnData[i].cellData.type == "DROPDOWN") {
          for (let j = 0; j < dropDownList[a.rowId].length; j++) {
            if (dropDownList[a.rowId][j].isSelected) {
              textA = dropDownList[a.rowId][j].value;
              break;
            }
          }
        }
        textA = textA.toUpperCase();
        break;
      }
    }
    for (let i = 0; i < b.columnData.length; i++) {
      if (b.columnData[i]["id"] == field) {
        textB = b.columnData[i].cellData.value[0]
        if (b.columnData[i].cellData.type == "DROPDOWN") {
          for (let j = 0; j < dropDownList[b.rowId].length; j++) {
            if (dropDownList[b.rowId][j].isSelected) {
              textB = dropDownList[b.rowId][j].value;
              break;
            }
          }
        }
        textB = textB.toUpperCase();
        break;
      }
    }
    if (
      (direction === "asc" && textA < textB) ||
      (direction === "desc" && textA > textB)
    ) {
      return -1;
    } else if (
      (direction === "asc" && textA > textB) ||
      (direction === "desc" && textA < textB)
    ) {
      return 1;
    }
    return 0;
  });
};

const _sortByLongString = (data, field, direction) => {
  data.sort((a, b) => {
    var textA = "";
    var textB = "";
    for (let i = 0; i < a.columnData.length; i++) {
      if (a.columnData[i]["id"] == field) {
        textA = a.columnData[i].cellData.value
        var value_data = "";
        for (var j = 0; j < textA.length; j++) {
          value_data += textA[j].value;
        }
        textA = value_data.toUpperCase();
        break;
      }
    }
    for (let i = 0; i < b.columnData.length; i++) {
      if (b.columnData[i]["id"] == field) {
        textB = b.columnData[i].cellData.value
        var value_data = "";
        for (var j = 0; j < textB.length; j++) {
          value_data += textB[j].value;
        }
        textB = value_data.toUpperCase();;
        break;
      }
    }
    if (
      (direction === "asc" && textA < textB) ||
      (direction === "desc" && textA > textB)
    ) {
      return -1;
    } else if (
      (direction === "asc" && textA > textB) ||
      (direction === "desc" && textA < textB)
    ) {
      return 1;
    }
    return 0;
  });
};


export const facilitySearching = (rowData, columns, value) => {
  var filteredRows = [];
  var count = 0;
  for (let i = 0; i < rowData.length; i++) {
    for (let j = 0; j < rowData[i].columnData.length; j++) {
      for (count = 0; count < columns.length; count++) {
        if (rowData[i].columnData[j].id === columns[count].property && columns[count].isVisible) {
          var input = rowData[i].columnData[j].cellData.value[0], value_data = "";
          if (rowData[i].columnData[j].cellData.type == "DROPDOWN") {
            for (let c = 0; c < rowData[i].columnData[j].cellData.value.length; c++) {
              if(rowData[i].columnData[j].cellData.value[c].isSelected){
                value_data += rowData[i].columnData[j].cellData.value[c].value;
                value_data += ', ';
              }
            }
            value_data = value_data.slice(0, -2)
            if ((value_data).toUpperCase().indexOf((value).toUpperCase()) >= 0) {
              filteredRows.push(rowData[i]);
              break;
            }
          }
          else if (rowData[i].columnData[j].cellData.type == "LONGSTRING") {
            for (let z = 0; z < rowData[i].columnData[j].cellData.value.length; z++) {
              value_data += rowData[i].columnData[j].cellData.value[z].value;
              value_data += ', ';
            }
            value_data = value_data.slice(0, -2)
            if ((value_data).toUpperCase().indexOf((value).toUpperCase()) >= 0) {
              filteredRows.push(rowData[i]);
              break;
            }
          }
          else {
            if (input && ((input.toString()).toUpperCase().indexOf((value).toUpperCase()) >= 0)) {
              filteredRows.push(rowData[i]);
              break;
            }
          }
        }
      }
      if (count < columns.length) {
        break;
      }
    }
  }
  return filteredRows
}
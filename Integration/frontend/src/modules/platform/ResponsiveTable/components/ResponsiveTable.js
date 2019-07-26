/** React */
import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import * as Table from 'reactabular-table';
import * as Sticky from 'reactabular-sticky';
import * as resizeable from 'reactabular-resizable';
import * as resolve from 'table-resolver';
import classnames from 'classnames';
import uuid from 'uuid';
import * as stylesheet from 'stylesheet-helpers';
import $ from 'jquery';

/** MUI */
import TablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core/styles';

/** Local */
import styles from '../styles';

class ResponsiveTable extends React.Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    fixedHeight: PropTypes.bool,
    noHeader: PropTypes.bool,
    resizeable: PropTypes.bool,
    styles: PropTypes.object,
    components: PropTypes.object,
    onRow: PropTypes.func,
    onRowSelection: PropTypes.func,
    onDragEnd: PropTypes.func,
    isHidden: PropTypes.func,
    handleDragEnd: PropTypes.func,
    classes: PropTypes.object,
    className: PropTypes.string,
    rowKey: PropTypes.string,
  };

  static defaultProps = {
    columns: {},
    rows: {},
    fixedHeight: false,
    noHeader: false,
    resizeable: false,
    styles: {},
    components: {},
    onRowSelection: () => {},
    onDragEnd: () => {},
  };

  /**
   * @ignore
   */

  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      rows: [],
      headers: [],
      widths: [],
      startWidth: 0,
      falseStartWidth: 0,
    };

    this.wrapperNode = null;
    this.tableHeaderRef = null;
    this.tableBodyRef = null;

    const { styleSheetElement, styleSheet } = stylesheet.create();
    this.stylesheet = {
      element: styleSheetElement,
      sheet: styleSheet,
    };
  }

  /**
   * @ignore
   */

  componentDidMount = () => {
    this.resizeableHelper = resizeable.helper({
      globalId: uuid.v4(),
      getId: ({ property }) => property.replace(/[^0-9a-z]/gi, '-'),
    });

    this.updateStateFromProps(this.props);
  };
  /**
   * @ignore
   */

  componentDidUpdate = () => {
    this.calculateIsHidden();
    setTimeout(() => {
      // this.updateTableHeight()
      // this.updateTableColumns()
    });
  };

  /**
   * @ignore
   */

  componentWillReceiveProps = nextProps => {
    if (!isEqual(this.props, nextProps)) {
      this.updateStateFromProps(nextProps);
    }
  };

  /**
   * @ignore
   */

  componentWillUnmount() {
    this.unmounted = true;
    $(this.resizeableHelper).remove();
    this.resizeableHelper = null;
    $(this.stylesheet.element).remove();
    this.stylesheet = {};
  }
  /**
   * Calculate if a column(other than longstring) has a hidden text and send ishidden value to the parent comonent
   * @function
   */
  calculateIsHidden() {
    const { columns } = this.state;
    let isHidden = [];
    for (var i = 0; i < columns.length; i++) {
      isHidden[columns[i].property] = false;
    }
    for (var j = 0; j < columns.length; j++) {
      var row = document.getElementById(columns[j].maxWidthRow);
      var cell = row && row.getElementsByClassName(columns[j].props.className)[0] && row.getElementsByClassName(columns[j].props.className)[0].getElementsByClassName('value_')[0];
      // Condition for truncation.
      // >2 is used as edge was giving some wrong value of clientwidth and scrollwidth
      if (cell && cell.scrollWidth - cell.clientWidth > 2) {
        // For LONGSTRING no expand icon is shown
        if (columns[j].dataType !== 'LONGSTRING' && columns[j].type !== 'PARAGRAPH') {
          isHidden[columns[j].property] = true;
        }
      }
    }
    this.props.isHidden(isHidden);
  }
  /**
   * Initilize table columns
   * @function initializeResizeableColumns
   * @param {Object[]} columns column data
   * @returns {Object[]}
   */
  initializeResizeableColumns = columns => {
    const resizableFormatter = resizeable.column({
      onDragStart: (width, { column }) => {},
      /**
       * It is called when we drag a column
       * @callback onDrag
       * @param width width of the dragged column
       * @param column the column dragged
       */
      onDrag: (width, { column }) => {
        this.state.widths[column.property] = width;
        this.resizeableHelper.update({
          column,
          width: width,
        });
        // this is commented for performance issue
        // this.props.handleOnDrag(this.state.widths[column.property],column)
      },
      onDragEnd: (width, { column }) => {
        this.props.handleDragEnd(width, column);
      },
    });

    return columns.map((column, index) => {
      if (!column.children) {
        if (!column.header.formatters) {
          column.header.formatters = [];
        }

        if (column.header.formatters.indexOf(resizableFormatter) === -1) {
          column.header.formatters.push(resizableFormatter);
        }
      } else {
        column.children = this.initializeResizeableColumns(column.children);
      }

      return column;
    });
  };
  /**
   * This updates states from props
   * @function updateStateFromProps
   * @param {Object} props props of this component
   */

  updateStateFromProps = props => {
    let { widths } = this.state;
    let { columns, rows } = props;

    if (this.resizeableHelper) {
      columns = this.resizeableHelper.initialize(columns);
      columns = this.initializeResizeableColumns(columns);
    }
    const resolvedColumns = resolve.columnChildren({ columns });
    const resolvedRows = resolve.resolve({
      columns: resolvedColumns,
      method: resolve.nested,
    })(rows);

    if (this.state.rows.length === 0 && resolvedRows.length > 0) {
      widths = [];
    }
    this.setState({
      rows: resolvedRows,
      columns: resolvedColumns,
      headers: resolve.headerRows({ columns }),
      widths: widths,
    });

    Object.assign(this.props.styles, {
      wrapper: {},
      table: {},
      header: {},
      body: {},
      ...this.props.styles,
    });

    this.forceUpdate();
  };
  /**
   * Update table height
   * @function
   */
  updateTableHeight = () => {
    if (!this.props.noHeader && !this.unmounted) {
      this.tableBodyRef.style.height = 'calc(100% - ' + this.tableHeaderRef.clientHeight + 'px)';
    }
  };

  /**
   * Update table columns
   * @function
   */

  updateTableColumns = () => {
    const { columns, rows } = this.state;
    const { noHeader } = this.props;

    if (!this.unmounted) {
      let headerRow, headerCell, firstCell, minWidth;
      let tableBody = this.tableBodyRef;
      let firstRow = tableBody.rows[0];
      const hasRows = rows.length > 0;

      // this.wrapperNode.className = this.wrapperNode.className.replace(' widths-set', '') || ""

      if (!noHeader) {
        headerRow = this.tableHeaderRef.rows[this.tableHeaderRef.rows.length - 1];
      }

      columns.map((column, index) => {
        if (column.props && column.props.className) {
          if (this.props.resizeable) {
            this.updateStylesheet(column.props.className, {
              minWidth: 'inherit',
              width: 'inherit',
              maxWidth: 'inherit',
            });
          } else {
            this.updateStylesheet(column.props.className, {
              minWidth: 'inherit',
            });
          }

          minWidth = 0;
          if (column.width) {
            minWidth = column.width;
          } else if (this.state.widths[column.property]) {
            minWidth = this.state.widths[column.property];
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

          this.state.widths[column.property] = minWidth;

          if (this.props.resizeable) {
            this.updateStylesheet(column.props.className, {
              minWidth: minWidth + 'px',
              width: minWidth + 'px',
              maxWidth: minWidth + 'px',
            });
          } else {
            this.updateStylesheet(column.props.className, {
              minWidth: minWidth + 'px',
            });
          }
        }
      });

      // this.wrapperNode.className += ' widths-set'
    }
  };

  /**
   * Update style sheet
   * @function updateStylesheet
   * @param {string} className the class whose style is to be updated
   * @param {Object} props the updated properties
   */
  updateStylesheet = (className, props) => {
    if (!this.unmounted) {
      stylesheet.updateProperties(window, this.stylesheet.sheet, className, props);
    }
  };
  /**
   * Called during creation of body rows
   * @function
   */
  onBodyRow = (row, { rowIndex, rowKey }) => {
    const onRow = this.props.onRow ? this.props.onRow(row, { rowIndex, rowKey }) : {};
    return {
      className: classnames(row.selected && 'selected', row.rowMessage && this.props.classes.errorRow),
      id: row.rowName,
      onClick: () => this.onBodyRowClick(row, rowIndex),
      ...onRow,
    };
  };
  /**
   * Called during creation of header rows
   * @function
   */
  onHeaderRow = () => {
    return {};
  };
  /**
   * Called when we click on a row
   * @callback
   */
  onBodyRowClick = (row, rowIndex) => {
    const defaultRows = this.state.rows;
    for (let i = 0; i < defaultRows.length; i++) {
      if (defaultRows[i].selected) {
        defaultRows[i] = Object.assign({}, defaultRows[i], { selected: false });
      }
    }
    defaultRows[rowIndex] = Object.assign({}, defaultRows[rowIndex], { selected: true });
    this.setState({ rows: defaultRows });
    this.props.onRowSelection(row, rowIndex);
  };
  /**
   * Create table header
   * @function
   */
  createTableHeader = () => {
    const headerProps = {
      style: {
        display: 'inherit',
      },
      key: 'responsive-header',
      ref: header => {
        this.tableHeaderRef = header && header.getRef();
      },
      headerRows: this.state.headers,
      onRow: this.onHeaderRow,
    };

    if (this.props.fixedHeight && !this.props.noHeader) {
      return <Sticky.Header tableBody={this.tableBodyRef} {...headerProps} />;
    } else if (this.props.noHeader) {
      return '';
    } else {
      return <Table.Header {...headerProps} />;
    }
  };
  /**
   * Create table body
   * @function
   */
  createTableBody = () => {
    const { rowKey, pagination, page, pageSize, paginationFrontEnd } = this.props;

    let rows = this.state.rows;
    if (pagination && paginationFrontEnd) {
      const currentIndex = page * pageSize;
      const endOfCurrentPageIndex = Math.min((page + 1) * pageSize, this.state.rows.length);
      rows = this.state.rows.slice(currentIndex, endOfCurrentPageIndex);
    }
    const bodyProps = {
      key: rowKey || '_index',
      rowKey: rowKey || '_index',
      style: { paddingRight: '0px', display: 'inherit' },
      ref: body => {
        this.tableBodyRef = body && body.getRef();
        if (this.tableBodyRef) {
          var elements = this.tableBodyRef.getElementsByClassName(this.props.classes.errorMessage);
          while (elements[0]) {
            elements[0].parentNode.removeChild(elements[0]);
          }
        }
        // Function to add a row for row message for any row which has an element rowMessage.
        let j = 0;
        this.state.rows.forEach((e, i) => {
          if (e.rowMessage && e.rowMessage.length && this.tableBodyRef) {
            // let x = this.tableBodyRef.querySelector('#' + e.columnData[1].cellData.value[0])
            // x && x.parentNode.removeChild(x) // remove existing message if available in the DOM
            let tr = this.tableBodyRef.insertRow(i + j + 1);
            j++;
            let td = tr.insertCell(0);
            td.appendChild(document.createTextNode(e.rowMessage));
            tr.setAttribute('class', this.props.classes.errorMessage);
            // tr.setAttribute('id', 'a'+e.rowId)
            // tr.setAttribute('id', e.columnData[1].cellData.value[0])
          }
        });
      },
      rows: rows,
      onRow: this.onBodyRow,
    };

    if (this.props.fixedHeight) {
      return <Sticky.Body tableHeader={this.tableHeaderRef} {...bodyProps} />;
    } else {
      return <Table.Body {...bodyProps} />;
    }
  };

  /**
   * @ignore
   */
  render() {
    const { components, classes, pagination, pageSize, page, rowCount, localize, tableId } = this.props;
    const { columns, rows } = this.state;
    let pageOptionList = [10, 25, 100, 300];
    const tableStyle = classnames(classes.responsiveTableWidget, this.props.fixedHeight && 'fixedHeight', this.props.className);
    let value = false;
    if (pageSize === 'All' || Math.min(rowCount, (page + 1) * pageSize) === rowCount) value = true;
    if (tableId === 4) pageOptionList = [10, 25, 100, 300, 'All'];
    return (
      <div>
        <div
          className={tableStyle}
          ref={el => {
            this.wrapperNode = el;
          }}
        >
          <Table.Provider className={classes.tableWidget} columns={columns} id={'TableId'} renderers={components}>
            {this.createTableHeader()}
            {rows.length > 0 ? (
              this.createTableBody()
            ) : (
              <tbody
                ref={body => {
                  this.tableBodyRef = body;
                }}
                key="empty-body"
                className={classes.noRowIndicator}
              >
                <tr className={classes.noDataRow}>
                  <td colSpan={columns.length}>{this.props.emptyListMsg}</td>
                </tr>
              </tbody>
            )}
          </Table.Provider>
        </div>
        {pagination ? (
          <TablePagination
            component="div"
            className={classes.pagination}
            classes={{ selectIcon: this.props.classes.selectIcon, select: this.props.classes.selectDropList }}
            count={rowCount}
            rowsPerPage={pageSize}
            page={page}
            labelDisplayedRows={function() {
              return pageSize === 'All' ? `1-${rowCount} of ${rowCount}` : `${rowCount === 0 ? 0 : page * pageSize + 1}-${Math.min(rowCount, (page + 1) * pageSize)} of ${rowCount}`;
            }}
            rowsPerPageOptions={pageOptionList}
            labelRowsPerPage={localize('ROW_PER_PAGE')}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
              disabled: value,
            }}
            onChangePage={this.props.handleChangePage}
            onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
          />
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ResponsiveTable);

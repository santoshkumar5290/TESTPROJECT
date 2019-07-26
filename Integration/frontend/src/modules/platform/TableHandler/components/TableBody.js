/** React */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';

/** MUI */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import * as Colors from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import SignalCellular4Bar from '@material-ui/icons/SignalCellular4Bar';
import InfoOutlined from '@material-ui/icons/InfoOutline';
import DateIcon from '@material-ui/icons/DateRange';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
/** Local */
import { AlertDialog } from '../../../../components/modal';
import { A } from '../../../../components';
import CustomLink from './CustomLink';
// import ChartContainer from '../../Chart'
import ResponsiveTable from '../../ResponsiveTable';
import { _sortData } from './SortingSearching';
import { getAuthenticationURL } from '../../../../services/httpRequest';
// import { configurationRouteConstants } from '../../route';
import styles from '../styles';
import { _getTextLength } from './utils';
import SensorModal from './SensorModal';

const removeNull = element => element !== null;
const MONTH = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

class TableBody extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    columns: PropTypes.array,
    rowsBackup: PropTypes.array,
    data: PropTypes.array,
    handleUpdatedRow: PropTypes.func,
    disableTip: PropTypes.func,
    handleAllSelectedCheckbox: PropTypes.func,
    handleDropDown: PropTypes.func,
    onRowSelection: PropTypes.func,
    requestChartData: PropTypes.func,
    rows: PropTypes.array,
    selectedCheckboxList: PropTypes.func,
    setUserPreference: PropTypes.func,
    selectedRowIdList: PropTypes.array,
    isChartColumnHide: PropTypes.bool,
    isNewDataApiHit: PropTypes.bool,
    tableId: PropTypes.number,
    handleRowDelete: PropTypes.func,
    lastSearched: PropTypes.string,
    dropDownList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    selectedTabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    config: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onFacilityLinkClick: PropTypes.func,
  };
  static defaultProps = {
    data: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      columns: props.columns || [],
      data: [],
      isClicked: false,
      extendedWidth: [],
      rowIconSelected: 'none',
      columnWidth: [],
      isHidden: [],
      selectedRow: '',
      anchorEl: null,
      PopoverData: '',
      openDeleteDialog: false,
      deleteRow: '',
      extendedWidthRow: [],
      allChecked: false,
      lastExpandedColumnIndex: -1,
      lastExpandedColumnWidth: 200,
      open: false,
      index: 0,
      rowId: '',
      addNote: '',
      isTextfieldEmpty: true,
      openDeletePopup: false,
      existingNote: '',
      noteExceedingLimit: false,
    };
  }

  /**
   * @function _getIcon Return correct sort direction icon.
   */
  _getIcon = row => {
    // var { sortDirection } = this.props
    // for (let i = 0; i < sortDirection.length; i++) {
    // if (sortDirection[i].label === row.property) {
    if (row.column.sortingType === 'desc' && row.column.sorting) {
      return <ArrowDownward color="primary" />;
    } else if (row.column.sortingType === 'asc' && row.column.sorting) {
      return <ArrowUpward color="primary" />;
    } else if (row.column.sorting) {
      return <ArrowUpward nativeColor={Colors.grey[700]} />;
    } else {
      return;
    }
  };

  handleAutoSort = () => {
    $('.chartRow').remove();
    var { rowsBackup } = this.props;
    var { columns } = this.state;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].frontEndSort && columns[i].sortingType && rowsBackup.length > 0) {
        _sortData(rowsBackup, columns[i].property, columns[i].sortingType, columns[i].dataType, this.props.dropDownList);
      }
    }
    this.props.handleUpdatedRow(rowsBackup);
  };

  /**
   * Function called when header is clicked.
   * @param {string} sortBy
   */
  _sort = row => {
    $('.chartRow').remove();
    let config = this.props.config;
    var { rowsBackup } = this.props;
    var columnInState = this.state.columns;
    for (let i = 0; i < columnInState.length; i++) {
      if (columnInState[i].property === row.property) {
        if (row.column.sortingType === 'desc') {
          columnInState[i].sortingType = 'asc';
          row.column.sortingType = 'asc';
        } else if (row.column.sortingType === 'asc') {
          columnInState[i].sortingType = 'desc';
          row.column.sortingType = 'desc';
        } else {
          columnInState[i].sortingType = 'desc';
          row.column.sortingType = 'desc';
        }
      } else {
        columnInState[i].sortingType = '';
      }
    }

    var updatedConfig = cloneDeep(this.props.tableConfigBackUp);
    for (let j = 0; j < updatedConfig.header.tabs[this.props.selectedTabIndex].columns.length; j++) {
      for (let k = 0; k < columnInState.length; k++) {
        if (columnInState[k].property === updatedConfig.header.tabs[this.props.selectedTabIndex].columns[j].property) {
          updatedConfig.header.tabs[this.props.selectedTabIndex].columns[j].sortingType = columnInState[k].sortingType;
          break;
        }
      }
    }
    updatedConfig.header.tabs[this.props.selectedTabIndex].sortColumn = row.column.sortAttribute;
    updatedConfig.header.tabs[this.props.selectedTabIndex].sortDirection = row.column.sortingType;
    this.props.setUserPreference(updatedConfig);

    if (row.column.frontEndSort && rowsBackup.length > 0) {
      _sortData(rowsBackup, row.property, row.column.sortingType, row.column.dataType, this.props.dropDownList);
      this.props.handleUpdatedRow(rowsBackup);
    } else {
      // var sortDirection = 'desc';
      // if(row.column.sortingType === 'desc')
      //   sortDirection = 'asc';
      this.props.handleServerSorting(row.column.sortAttribute, row.column.sortingType);
    }
  };
  /**
   * @ignore
   */
  componentWillReceiveProps(nextProps) {
    // if (nextProps.rows.length > 0) {
    //   this.setState({
    //     columns: nextProps.columns
    //   })
    // }
    if (nextProps.selectedRowIdList.length !== nextProps.rows.length) {
      this.setState({ allChecked: false });
    }
    if (nextProps.isChartColumnHide) {
      this._removeToggleTable();
    }
    this.setState({ data: nextProps.rows, columns: nextProps.columns });
    this.setExtendedWidth(nextProps.rows);
    if (this.props.lastSearched !== nextProps.lastSearched) {
      this.openChart(this.state.selectedRow, nextProps.rows);
    }
  }

  /**
   * Called on clicking expand column icon
   * @function
   */
  _expandColumn = (e, row) => {
    this.props.disableTip();
    const defaultColumns = this.state.columns;
    if (this.state.lastExpandedColumnIndex > -1) {
      defaultColumns[this.state.lastExpandedColumnIndex].width = this.state.lastExpandedColumnWidth;
    }
    for (let i = 0; i < defaultColumns.length; i++) {
      if (defaultColumns[i].property === row.property) {
        this.state.lastExpandedColumnIndex = i;
        this.state.lastExpandedColumnWidth = defaultColumns[i].width;
        if (innerWidth > 1600) {
          defaultColumns[i].width = this.state.extendedWidth[defaultColumns[i].property] + 100;
        } else {
          defaultColumns[i].width = this.state.extendedWidth[defaultColumns[i].property] + 20;
        }
        break;
      }
    }
    this.setState({ columns: defaultColumns });
  };

  /**
   * return expand icon if the column has a hidden text
   * @function
   */
  _getExpandIcon = row => {
    return this.state.isHidden[row.property] ? <SignalCellular4Bar color="primary" /> : null;
  };

  _getTableIcon = (row, classes) => {
    if (this.state.selectedRow.rowName === row.rowData.rowName) {
      return (
        <IconButton className={classes.expandIcon} onClick={() => this._removeToggleTable()}>
          <ClearIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton className={classes.expandIcon} onClick={() => this._showToggleTable(row)} disabled={!row.rowData.isChartEnable}>
          <AddIcon />
        </IconButton>
      );
    }
  };

  _removeToggleTable = () => {
    this.setState({ selectedRow: '' });
    $('.chartRow').remove();
    let newData = this.state.data;
    for (let i = 0; i < newData.length; i++) {
      newData[i].isChartOpen = false;
    }
    this.setState({ data: newData });
  };

  openChart = (selectedRow, nextRows = null) => {
    if (selectedRow && $(`#${selectedRow.rowName}`).length > 0) {
      let newData = '';
      let selectedDropDown = '';
      // (document.getElementsByClassName('chartRow')[0] && document.getElementsByClassName('chartRow')[0].remove());
      $('.chartRow').remove();
      // this.props.removeChartData()
      //let rowRef = document.getElementById(selectedRow.rowName)
      let rowRef = $(`#${selectedRow.rowName}`);
      var ele = $('<tr class="chartRow" style="width:100%"><td colspan="42" class="chartBox" id="chartBox"></td></tr>');
      $(ele).insertAfter(rowRef);
      $('#chartBox').animate({ height: '400px' });
      var el = document.querySelector('#chartBox');
      for (let j = 0; j < this.props.dropDownList[selectedRow.rowId].length; j++) {
        if (this.props.dropDownList[selectedRow.rowId][j].isSelected) {
          selectedDropDown = this.props.dropDownList[selectedRow.rowId][j].value;
          break;
        }
      }
      // ReactDOM.render(<ChartContainer localize={this.props.localize} conditionValue={selectedDropDown} facilityId={selectedRow.rowId} />, el)
      if (nextRows) {
        newData = nextRows;
      } else {
        newData = this.state.data;
      }
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].rowName === selectedRow.rowName) {
          newData[i].isChartOpen = true;
        } else {
          newData[i].isChartOpen = false;
        }
      }
      this.setState({ data: newData });
    }
  };

  _showToggleTable = (row, e) => {
    this.setState({ selectedRow: row.rowData });
    this.openChart(row.rowData);
  };

  handleOnDrag = (currentWidth, column) => {
    var columnInState = this.state.columns;
    for (let i = 0; i < columnInState.length; i++) {
      if (columnInState[i].property === column.property) {
        columnInState[i].width = currentWidth;
        this.setState({
          columns: columnInState,
        });
        break;
      }
    }
  };

  handleDragEnd = (currentWidth, column) => {
    var columnInState = this.state.columns;
    var updatedConfig = cloneDeep(this.props.tableConfigBackUp);
    for (let i = 0; i < columnInState.length; i++) {
      if (column.property === columnInState[i].property) {
        if (this.state.lastExpandedColumnIndex === i) {
          this.state.lastExpandedColumnIndex = -1;
        }
        if (currentWidth > columnInState[i].width && this.state.lastExpandedColumnIndex > -1) {
          columnInState[this.state.lastExpandedColumnIndex].width = this.state.lastExpandedColumnWidth;
          this.state.lastExpandedColumnIndex = -1;
        }
        columnInState[i].width = currentWidth;
        break;
      }
    }
    this.setState({
      columns: columnInState,
    });
    for (let j = 0; j < updatedConfig.header.tabs[this.props.selectedTabIndex].columns.length; j++) {
      if (column.property === updatedConfig.header.tabs[this.props.selectedTabIndex].columns[j].property) {
        updatedConfig.header.tabs[this.props.selectedTabIndex].columns[j].width = Math.round((currentWidth * 100) / document.getElementById('tablePaper').offsetWidth);
        break;
      }
    }
    this.props.setUserPreference(updatedConfig);
  };

  setExtendedWidth = rows => {
    var extendedWidth = [];
    var extendedWidthRow = [];
    for (let i = 0; i < rows.length; i++) {
      for (let k = 0; k < rows[i].columnData.length; k++) {
        var columnObjInRowData = rows[i].columnData[k];
        var textLength = _getTextLength(columnObjInRowData.cellData.value, columnObjInRowData.cellData.type, columnObjInRowData.cellData.date);

        //  For first column padding is 20 more
        if (k === 0) textLength += 20;

        if (extendedWidth[columnObjInRowData['id']] && extendedWidth[columnObjInRowData['id']] < textLength) {
          extendedWidth[columnObjInRowData.id] = textLength;
          extendedWidthRow[columnObjInRowData.id] = rows[i].rowName;
        } else if (!extendedWidth[columnObjInRowData['id']]) {
          extendedWidth[columnObjInRowData['id']] = textLength;
          extendedWidthRow[columnObjInRowData.id] = rows[i].rowName;
        }
      }
    }
    this.setState({ extendedWidth: extendedWidth });
    this.setState({ extendedWidthRow: extendedWidthRow });
    return extendedWidth;
  };

  // Checking if state update required
  isHidden = isHidden => {
    const { columns } = this.state;
    var isEqual = true;
    var showTip = false;
    for (let i = 0; i < columns.length; i++) {
      if (!(this.state.isHidden[columns[i].property] === isHidden[columns[i].property])) {
        isEqual = false;
      }
      if (isHidden[columns[i].property]) {
        showTip = true;
      }
    }
    if (!isEqual) {
      this.props.handleShowTipState(showTip);
      this.setState({ isHidden: isHidden });
    }
  };

  handleClickOpen = (selectedRow, id) => {
    this.setState({
      openDeleteDialog: true,
      deleteRow: selectedRow,
    });
  };

  handleClose = () => {
    this.setState({
      openDeleteDialog: false,
    });
  };

  handleRowDelete = () => {
    this.props.handleRowDelete(this.state.deleteRow);
    this.handleClose();
  };

  toggleRowEditorModal = (row, e) => {};

  handlePopoverOpen = (data, e) => {
    const listdata = data.split(',');
    const myList = listdata.map((item, index) => <ListItem key={index}> {item} </ListItem>);
    this.setState({ anchorEl: e.target, PopoverData: <List>{myList}</List> });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null, PopoverData: '' });
  };

  handleParagraphOpen = (data, e) => {
    const { classes } = this.props;
    this.setState({
      anchorEl: e.target,
      PopoverData: (
        <List>
          <div>
            <ListItem key={0}>
              <span className={classes.hostMessage}>{data}</span>
            </ListItem>
          </div>
        </List>
      ),
    });
  };

  handleDropDownChange = (rowId, event) => {
    var dropDownList = this.props.dropDownList;
    var selectedPercentVal = '';
    for (let i = 0; i < dropDownList[rowId].length; i++) {
      if (event.target.value === dropDownList[rowId][i].value) {
        dropDownList[rowId][i].isSelected = true;
        selectedPercentVal = dropDownList[rowId][i].percentage;
      } else {
        dropDownList[rowId][i].isSelected = false;
      }
    }
    this.props.handleDropDown(dropDownList, event.target.value, rowId, selectedPercentVal);
    if (rowId === this.state.selectedRow.rowId) {
      var newData = this.state.data;
      for (let j = 0; j < newData.length; j++) {
        if (newData[j].rowId === rowId) {
          newData[j].selectedDropDown = event.target.value;
          this.setState({ data: newData });
          break;
        }
      }
      this.props.requestChartData(
        getAuthenticationURL(),
        event.target.value,
        rowId // Facility Id
      );
    }
  };

  handleCheckboxChange = (selectedRowId, e) => {
    this.props.selectedCheckboxList(selectedRowId, e);
    let newData = this.state.data;
    for (let i = 0; i < newData.length; i++) {
      if (selectedRowId === newData[i].rowId) {
        newData[i].isChecked = e.target.checked;
        break;
      }
    }
    if (e.target.checked && this.props.selectedRowIdList.length === newData.length) {
      this.setState({ allChecked: true });
    } else {
      this.setState({ allChecked: false });
    }
    this.setState({ data: newData });
  };

  handleSelectAllCheckbox = e => {
    let newData = this.state.data;
    let selectedRowId = [];
    for (let i = 0; i < newData.length; i++) {
      newData[i].isChecked = e.target.checked;
      e.target.checked && selectedRowId.push(newData[i].rowId);
    }
    this.props.handleAllSelectedCheckbox(selectedRowId);
    this.setState({ data: newData, allChecked: e.target.checked });
  };

  handleChangePage = (event, page) => {
    var navType = 'previous';
    if (this.props.page < page) navType = 'next';
    this.props.handlePagination(page, this.props.pageSize, navType);
  };

  handleChangeRowsPerPage = event => {
    this.props.handlePagination(0, event.target.value, 'noChange');
  };

  handleInfo = value => {
    this.props.getInfo(value).then(() => this.setState({ openInfo: true, infoValue: this.props.info }));
  };

  closeInfo = () => {
    this.setState({ openInfo: false });
  };

  getHeaders = () => {
    const { classes } = this.props;
    const { columns } = this.state;
    const rowFormater = [
      (value, row) => {
        var rowsList = row.rowData.columnData;
        for (let i = 0; i < rowsList.length; i++) {
          if (rowsList[i]['id'] === row.property) {
            let columnObject = rowsList[i];
            let value = columnObject.cellData.value;
            if (columnObject.hasSubColumns) {
              // alert("work for subcolumn");
            } else {
              switch (columnObject.cellData.type) {
                case 'LINK':
                  return (
                    <Typography className={classes.linkIcon}>
                      <div className={classNames(classes.truncation, 'value_')}>
                        <A href={columnObject.cellData.href} target="_blank" onClick={this.props.handleFacilityLinkClick}>
                          {value}
                        </A>
                      </div>
                    </Typography>
                  );

                case 'CHECKBOX':
                  return (
                    <div className={classes.checkBoxWrap}>
                      {this.props.selectedRowIdList.indexOf(row.rowData.rowId) >= 0 ? (
                        <FormControlLabel
                          control={<Checkbox checked onChange={e => this.handleCheckboxChange(row.rowData.rowId, e)} value="antoine" color="primary" />}
                          label={<div className={classNames(classes.truncation, 'value_')}>{value}</div>}
                        />
                      ) : (
                        <FormControlLabel
                          control={<Checkbox checked={false} onChange={e => this.handleCheckboxChange(row.rowData.rowId, e)} value="antoine" color="primary" />}
                          label={<div className={classNames(classes.truncation, 'value_')}>{value}</div>}
                        />
                      )}
                    </div>
                  );

                case 'STRING':
                  return <div className={classNames(classes.truncation, 'value_')}>{value}</div>;

                case 'STATE':
                  let color = columnObject.cellData.colorName || '';
                  return (
                    <div style={{ color: color }} className={classes.healthStateContainer}>
                      <div className={classes.healthStateIcon}>
                        <FiberManualRecordIcon />
                      </div>
                      <div className={classNames(classes.healthStateText, classes.truncation, 'value_')}>{value}</div>
                    </div>
                  );

                case 'INTEGER':
                  return <div className={classNames(classes.truncation, 'value_')}>{value}</div>;

                case 'FLOAT':
                  return <div className={classNames(classes.truncation, 'value_')}>{value}</div>;

                case 'INFO':
                  return (
                    <IconButton onClick={() => this.handleInfo(value[0])}>
                      <InfoOutlined color={Colors.lightBlack} />
                    </IconButton>
                  );

                case 'DROPDOWN':
                  var dropDownValue = '';
                  var selectedDropDown = this.props.dropDownList[row.rowData.rowId];
                  const datalist = value.map(item => {
                    return (
                      <MenuItem value={item.value} key={item.id}>
                        {item.value}
                      </MenuItem>
                    );
                  });
                  for (let count = 0; count < selectedDropDown.length; count++) {
                    if (selectedDropDown[count].isSelected) {
                      dropDownValue = selectedDropDown[count].value;
                      break;
                    }
                  }
                  return value.length === 1 && value[0].value === '-' ? (
                    <div className={classNames(classes.truncation, 'value_')}>{value[0].value}</div>
                  ) : (
                    <FormControl className={classes.formControl}>
                      <Select
                        fullWidth
                        classes={{ selectMenu: classes.selectMenu }}
                        className={classes.formControlSelect}
                        value={dropDownValue}
                        onChange={e => this.handleDropDownChange(row.rowData.rowId, e)}
                        name={row.rowData.rowId}
                      >
                        {datalist}
                      </Select>
                    </FormControl>
                  );

                case 'PERCENTAGE':
                  return (
                    <div className={classes.expandColWrap}>
                      <span className={classes.expandText}>{value}</span>
                    </div>
                  );

                case 'DATE':
                  return <div className={classNames(classes.truncation, 'value_')}>{columnObject.cellData.date}</div>;

                case 'LONGSTRING':
                  let hideData = '';
                  let showData = '';
                  let count = 0;
                  let data = '';
                  if (value.length === 1 && value[0].value === '-') {
                    return <div className={classNames(classes.truncation, 'value_')}>{value[0].value}</div>;
                  }
                  if (value[0] && value[0].value === 'No active facility found') {
                    return <div className={classNames(classes.truncation, 'value_')}>{value[0].value}</div>;
                  }
                  for (var j = 0; j < value.length; j++) {
                    data = `${data + value[j].value}, `;
                    // 40 is added for padding and 2*data.length is added for wrong calculation
                    if (_getTextLength(`${data}+ 1 more`) + 40 >= columns[row.columnIndex].width) {
                      count = value.length - j;
                      break;
                    } else {
                      showData += `${value[j].value}, `;
                    }
                  }
                  if (count > 0) {
                    for (let c = j; c < value.length; c++) {
                      hideData += `${value[c].value}, `;
                    }
                    hideData = hideData.slice(0, -2);
                  } else {
                    showData = showData.slice(0, -2);
                  }
                  return (
                    <div className="value_">
                      {showData}
                      {count > 0 ? (
                        <a className={classes.moreLink} onClick={e => this.handlePopoverOpen(hideData, e)}>
                          {' '}
                          +{`${count} ${this.props.localize('MORE')}`}{' '}
                        </a>
                      ) : null}
                    </div>
                  );

                case 'PARAGRAPH':
                  let Data = '';
                  let showMore = true;
                  if (value[0] === '-') {
                    return <div className={classNames(classes.truncation, 'value_')}>{value}</div>;
                  }
                  for (var loop = 0; loop < value[0].length; loop = loop + 6) {
                    Data = value[0].substring(0, loop);
                    if (_getTextLength(`${Data}more`) + 100 >= columns[row.columnIndex].width) break;
                  }
                  if (value[0].length < loop) {
                    Data = value[0];
                    showMore = false;
                  }

                  return (
                    <div className="value_">
                      {Data}
                      {showMore ? (
                        <a className={classes.moreLink} onClick={e => this.handleParagraphOpen(value[0], e)}>
                          {' '}
                          ..more{' '}
                        </a>
                      ) : null}
                    </div>
                  );

                case 'NOTE':
                  Data = '';
                  showMore = true;
                  if (!value[0]) {
                    return (
                      <a className={classes.moreLink} onClick={e => this.handleClickAddNote(e, row.rowData.rowId)}>
                        + Add Note
                      </a>
                    );
                  }
                  if (value[0] === '-') {
                    return <div className={classNames(classes.truncation, 'value_')}>{value}</div>;
                  }
                  for (var loop = 0; loop < value[0].length; loop = loop + 6) {
                    Data = value[0].substring(0, loop);
                    if (_getTextLength(`${Data}more`) + 100 >= columns[row.columnIndex].width) break;
                  }
                  if (value[0].length < loop) {
                    Data = value[0];
                    showMore = false;
                  }

                  return (
                    <div className={classNames(classes.value_, classes.notes)}>
                      {Data}
                      {showMore ? (
                        <a className={classes.moreLink} onClick={e => this.handleParagraphOpen(value[0], e)}>
                          {' '}
                          ..more{' '}
                        </a>
                      ) : null}

                      <div className={classes.fabButtons}>
                        <Fab aria-label="Edit" onClick={e => this.handleEditIconClick(e, value, row.rowData.rowId)}>
                          <Edit />
                        </Fab>
                        <Fab aria-label="Remove" onClick={e => this.handleDeleteIconClick(e, row.rowData.rowId)}>
                          <DeleteIcon />
                        </Fab>
                      </div>
                    </div>
                  );

                case 'BUTTON':
                  // return (
                  //   <div className={classes.editDeleteButtons}>
                  //     {row.rowData.canEdit
                  //       ? (this.props.tableId === 2 && (
                  //           <CustomLink pathname={configurationRouteConstants.EDITFACILITYGROUPINFO} rowID={row.rowData.rowId} name={row.rowData.rowName} enabled={row.rowData.isEditEnable}>
                  //             <Tooltip
                  //               enterDelay={100}
                  //               disableFocusListener
                  //               id="tooltipControlled"
                  //               leaveDelay={100}
                  //               placement="left"
                  //               title={this.props.localize('EDIT_FIELDS')}
                  //               classes={{
                  //                 tooltip: classes.tooltip,
                  //                 popper: classes.tooltipPopper,
                  //                 touch: classes.tooltipOpen,
                  //                 tooltipPlacementTop: classes.tooltipPlacementTop,
                  //                 tooltipPlacementRight: classes.tooltipPlacementRight,
                  //                 tooltipPlacementBottom: classes.tooltipPlacementBottom,
                  //                 tooltipPlacementLeft: classes.tooltipPlacementLeft,
                  //               }}
                  //             >
                  //               <IconButton disabled={!row.rowData.isEditEnable}>
                  //                 <BorderColorIcon color={Colors.lightBlack} />
                  //               </IconButton>
                  //             </Tooltip>
                  //           </CustomLink>
                  //         )) ||
                  //         (this.props.tableId === 3 && (
                  //           <CustomLink pathname={configurationRouteConstants.EDITFACILITYINFO} rowID={row.rowData.rowId} name={row.rowData.rowName} enabled={row.rowData.isEditEnable}>
                  //             <Tooltip
                  //               enterDelay={100}
                  //               disableFocusListener
                  //               id="tooltipControlled"
                  //               leaveDelay={100}
                  //               placement="left"
                  //               title={this.props.localize('EDIT_FIELDS')}
                  //               classes={{
                  //                 tooltip: classes.tooltip,
                  //                 popper: classes.tooltipPopper,
                  //                 touch: classes.tooltipOpen,
                  //                 tooltipPlacementTop: classes.tooltipPlacementTop,
                  //                 tooltipPlacementRight: classes.tooltipPlacementRight,
                  //                 tooltipPlacementBottom: classes.tooltipPlacementBottom,
                  //                 tooltipPlacementLeft: classes.tooltipPlacementLeft,
                  //               }}
                  //             >
                  //               <IconButton disabled={!row.rowData.isEditEnable}>
                  //                 <BorderColorIcon color={Colors.lightBlack} />
                  //               </IconButton>
                  //             </Tooltip>
                  //           </CustomLink>
                  //         )) ||
                  //         (this.props.tableId === 6 && (
                  //           <CustomLink pathname={configurationRouteConstants.EDITREGIONINFO} rowID={row.rowData.rowId} name={row.rowData.rowName} enabled={row.rowData.isEditEnable}>
                  //             <Tooltip
                  //               enterDelay={100}
                  //               disableFocusListener
                  //               id="tooltipControlled"
                  //               leaveDelay={100}
                  //               placement="left"
                  //               title={this.props.localize('EDIT_FIELDS')}
                  //               classes={{
                  //                 tooltip: classes.tooltip,
                  //                 popper: classes.tooltipPopper,
                  //                 touch: classes.tooltipOpen,
                  //                 tooltipPlacementTop: classes.tooltipPlacementTop,
                  //                 tooltipPlacementRight: classes.tooltipPlacementRight,
                  //                 tooltipPlacementBottom: classes.tooltipPlacementBottom,
                  //                 tooltipPlacementLeft: classes.tooltipPlacementLeft,
                  //               }}
                  //             >
                  //               <IconButton disabled={!row.rowData.isEditEnable}>
                  //                 <BorderColorIcon color={Colors.lightBlack} />
                  //               </IconButton>
                  //             </Tooltip>
                  //           </CustomLink>
                  //         ))
                  //       : null}
                  //     {row.rowData.canDelete ? (
                  //       <Tooltip
                  //         enterDelay={100}
                  //         disableFocusListener
                  //         id="tooltipControlled"
                  //         leaveDelay={100}
                  //         placement="left"
                  //         title={this.props.localize('DELETE_FIELDS')}
                  //         classes={{
                  //           tooltip: classes.tooltip,
                  //           popper: classes.tooltipPopper,
                  //           touch: classes.tooltipOpen,
                  //           tooltipPlacementTop: classes.tooltipPlacementTop,
                  //           tooltipPlacementRight: classes.tooltipPlacementRight,
                  //           tooltipPlacementBottom: classes.tooltipPlacementBottom,
                  //           tooltipPlacementLeft: classes.tooltipPlacementLeft,
                  //         }}
                  //       >
                  //         {/* <IconButton tooltipPosition='bottom-right' onClick={() => this.handleClickOpen(row.rowData)}>
                  //           <Delete color={Colors.lightBlack} />
                  //         </IconButton> */}

                  //         <IconButton onClick={() => this.handleClickOpen(row.rowData)} disabled={!row.rowData.isDeleteEnable}>
                  //           <Delete color={Colors.lightBlack} />
                  //         </IconButton>
                  //       </Tooltip>
                  //     ) : null}

                  //     {row.rowData.canCollapseDown ? this._getTableIcon(row, classes) : null}
                  //   </div>
                  // );
                case 'BOOLEAN':
                  break;
                default:
                  return value;
              }
            }
            break;
          }
        }
      },
    ];
    const headerSortable = [
      (value, row) => {
        var isCheckbox = false;
        if (row.column.type === 'CHECKBOX') {
          isCheckbox = true;
        }
        return (
          <span className={classes.titleBox}>
            {isCheckbox ? (
              <span className={classes.rowTitle}>
                <FormControlLabel control={<Checkbox checked={this.state.allChecked} onChange={e => this.handleSelectAllCheckbox(e)} value="antoine" color="primary" />} label={value} />
              </span>
            ) : (
              <span className={classes.rowTitle}>{value}</span>
            )}
            {row.column.sorting && (
              <div className={classes.sortingIconButtons}>
                <IconButton disableFocusListener className={classes.sortIconButton} onClick={() => this._sort(row)}>
                  {this._getIcon(row)}
                </IconButton>
                <IconButton disableFocusListener className={classes.expandIconButton} onClick={e => this._expandColumn(e, row)}>
                  {this._getExpandIcon(row)}
                </IconButton>
              </div>
            )}
          </span>
        );
      },
    ];

    return columns
      .map(column => {
        if (!column.isVisible || !column.isActive) {
          return null;
        }

        const formattedColumn = {
          property: column.property,
          header: {
            label: this._getHeaderLabel(column),
            formatters: headerSortable,
          },
          cell: {
            formatters: rowFormater,
          },
          width: column.width,
          maxWidth: this.state.extendedWidth[column.property],
          maxWidthRow: this.state.extendedWidthRow[column.property],
          minWidth: this.props.minWidth[column.property],
          sorting: column.sorting,
          type: column.type,
          dataType: column.dataType,
          sortingType: column.sortingType,
          frontEndSort: column.frontEndSort,
          sortAttribute: column.sortAttribute,
        };
        return formattedColumn;
      })
      .filter(removeNull);
  };

  _getHeaderLabel = column => {
    return column.header.label;
  };

  handleClickAddNote = (_e, rowId) => {
    const { rowsBackup } = this.props;
    rowsBackup.forEach((e, index) => {
      if (e.rowId === rowId) {
        this.setState({ index, open: true, rowId, existingNote: '', noteExceedingLimit: false });
      }
    });
  };

  handleChangeNote = e => {
    let note = e.target.value;
    note = note.trim();
    if (note !== '' && note.length <= 250) {
      this.setState({ addNote: note, isTextfieldEmpty: false, noteExceedingLimit: false });
    } else {
      if (note.length > 250) {
        this.setState({ noteExceedingLimit: true });
      }
      this.setState({ isTextfieldEmpty: true });
    }
  };

  handleSaveNote = async () => {
    const { putNote, getTableData } = this.props;
    const { rowId, addNote } = this.state;
    const e = await putNote(`/api/v1/sma/component/note/${rowId}`, addNote);
    if (e.type === 'success') {
      getTableData('/api/v1/sma/component/eventLogData');
    }
    this.setState({ open: false, isTextfieldEmpty: true });
  };

  handleEditIconClick = (e, Data, rowId) => {
    const { rowsBackup } = this.props;
    // this.setState({open:true,existingNote:Data,isTextfieldEmpty:false,rowId})
    rowsBackup.forEach((e, index) => {
      if (e.rowId === rowId) {
        this.setState({ open: true, existingNote: Data, isTextfieldEmpty: false, rowId, index, noteExceedingLimit: false });
      }
    });
  };

  handleDeleteIconClick = (e, rowId) => {
    this.setState({ openDeletePopup: true, rowId });
  };

  handleDeleteNote = async () => {
    const { putNote, getTableData } = this.props;
    const { rowId } = this.state;
    const e = await putNote(`/api/v1/sma/component/note/${rowId}`, null);
    if (e.type === 'success') {
      getTableData('/api/v1/sma/component/eventLogData');
    }
    this.setState({ openDeletePopup: false });
  };

  render() {
    const { data = [], anchorEl, selectedRow, deleteRow, columns, PopoverData, index, isTextfieldEmpty, existingNote, openDeletePopup, noteExceedingLimit } = this.state;
    const open = !!anchorEl;
    const { classes, isNewDataApiHit, localize, emptyListMsg, tableId, rowsBackup } = this.props;
    let isChartOpen = false;
    let pagination = false;
    let paginationFrontEnd = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].rowName === selectedRow.rowName) {
        isChartOpen = true;
      }
    }
    if (!isChartOpen && selectedRow) {
      $('.chartRow').remove();
      // this._removeToggleTable();
    }

    if (
      selectedRow &&
      this.props.dropDownList[selectedRow.rowId] &&
      $('.chartRow')
        .prev()
        .attr('id') !== selectedRow.rowName &&
      this.props.dropDownList[selectedRow.rowId][0].value !== '-'
    ) {
      this.openChart(selectedRow);
    }

    if (isNewDataApiHit && columns.length > 0) {
      this.handleAutoSort();
    }

    if (this.props.tabs.length === 1) {
      pagination = this.props.tabs[0].pagination;
      paginationFrontEnd = this.props.tabs[0].paginationFrontEnd;
    }

    return (
      <div className={classes.tableWrapper}>
        <Popover
          className={classes.morePopover}
          classes={{ paper: classes.morePopoverPaper }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          {PopoverData}
        </Popover>
        {this.state.open && (
          <AlertDialog
            open={this.state.open}
            title="Set Event Log"
            Icon={DateIcon}
            contentText={
              <div>
                {`Set a note for ${rowsBackup[index].columnData[0].cellData.value}(${rowsBackup[index].columnData[1].cellData.value}) at ${
                  rowsBackup[index].columnData[2].cellData.value
                } when the component status was changed to ${this.props.rowsBackup[this.state.index].columnData[3].cellData.value}`}
                <TextField
                  className={classes.textField}
                  defaultValue={existingNote}
                  error={noteExceedingLimit}
                  helperText={noteExceedingLimit && 'Exceeding limit'}
                  label="Event Note"
                  onChange={e => this.handleChangeNote(e)}
                  margin="normal"
                  multiline
                />
              </div>
            }
            name="Save Note"
            disableName={isTextfieldEmpty}
            handleNameClick={this.handleSaveNote}
            handleCancelClick={() => this.setState({ open: false, isTextfieldEmpty: true })}
            handleClose={() => this.setState({ open: false, isTextfieldEmpty: true })}
          />
        )}

        {
          <AlertDialog
            open={openDeletePopup}
            title="Delete Event note"
            Icon={DeleteIcon}
            contentText="Are you sure you want to delete this Event Note?"
            name="Yes,Delete"
            handleNameClick={this.handleDeleteNote}
            handleCancelClick={() => this.setState({ openDeletePopup: false })}
            handleClose={() => this.setState({ openDeletePopup: false })}
          />
        }

        <Dialog
          open={this.state.openDeleteDialog}
          onClose={this.handleClose}
          classes={{ paper: this.props.classes.modalDialogPaper }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className={classes.modalDialogHeader} id="alert-dialog-title">
            <div className={classes.modalDialogHeaderCol}>
              <IconButton disableRipple className={classes.deleteIcon}>
                <Delete />
              </IconButton>
            </div>
            <div className={classes.modalDialogHeaderCol}>{`${localize('SMALL_DELETE')} ${deleteRow.rowName}`}</div>
            <div className={classes.modalDialogHeaderCol}>
              <IconButton disableRipple className={classes.closeIcon} onClick={this.handleClose}>
                <Close />
              </IconButton>
            </div>
          </DialogTitle>

          <DialogContent className={classes.modalDialogBody}>
            <DialogContentText id="alert-dialog-description">{`${localize('DELETE_ENTITY')} ${deleteRow.rowName} ?`}</DialogContentText>
          </DialogContent>

          <DialogActions className={classes.modalDialogFooter}>
            <Button className={classes.raisedButton} onClick={this.handleRowDelete} color="primary">
              {localize('DELETE')}
            </Button>
            <Button className={classes.flatButton} onClick={this.handleClose} color="primary" autoFocus>
              {localize('CANCEL')}
            </Button>
          </DialogActions>
        </Dialog>

        {this.state.openInfo && this.props.info  && <SensorModal openInfo={this.state.openInfo} closeInfo={this.closeInfo} info={this.props.info} classes={classes} />}

        <ResponsiveTable
          columns={this.getHeaders()}
          rows={data.map(d => d)}
          handleOnDrag={this.handleOnDrag}
          handleDragEnd={this.handleDragEnd}
          isHidden={this.isHidden}
          resizeable
          fixedHeight
          pagination={pagination}
          rowCount={this.props.rowCount}
          handlePagination={this.props.handlePagination}
          page={this.props.page}
          pageSize={this.props.pageSize}
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          handleChangePage={this.handleChangePage}
          paginationFrontEnd={paginationFrontEnd}
          localize={localize}
          emptyListMsg={emptyListMsg}
          /* tableId={tableId} */
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TableBody);

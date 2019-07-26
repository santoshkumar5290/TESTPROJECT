/** React */
import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { isEqual } from 'lodash';
import { cloneDeep } from 'lodash';

/** MUI */
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

/** Local */
import { facilitySearching } from './SortingSearching';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import SortableList from '../../SortableList';
import { sortCards, updateBool, updateDependentBool, setWidths, checkAllEnabled, updateBoolAll } from './utils';
import styles from '../styles';

/**
 * facility  table container
 *
 */
class TableContainer extends React.Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    localizationSet: PropTypes.string,
    play: PropTypes.func,
    pause: PropTypes.func,
    isPaused: PropTypes.bool,
    onRowSelection: PropTypes.func,
    selectedMode: PropTypes.string,
    includeSettings: PropTypes.bool,
    filtersLabel: PropTypes.string,
    filtersList: PropTypes.array,
    selectedFiltersList: PropTypes.array,
    updateFiltersList: PropTypes.func,
    isChartColumnHide: PropTypes.bool,
    updateColumns: PropTypes.func,
    tabs: PropTypes.array,
    selectedTabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    updatePackageListColumns: PropTypes.func,
    config: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    setUserPreference: PropTypes.func,
    handleDownload: PropTypes.func,
    disableTip: PropTypes.func,
    classes: PropTypes.object,
    tip: PropTypes.object,
    subheader: PropTypes.array,
    handleTableRows: PropTypes.func,
    handleColumns: PropTypes.func,
    tipVisible: PropTypes.bool,
    handleDropDown: PropTypes.func,
    handleRowDelete: PropTypes.func,
    tableId: PropTypes.number,
    handleUpdatedRow: PropTypes.func,
    requestChartData: PropTypes.func,
    isNewDataApiHit: PropTypes.bool,
    dropDownList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    defaultColumn: PropTypes.object,
    onFacilityLinkClick: PropTypes.func,
  };
  /**
   * @ignore
   *
   */
  static defaultProps = {
    localizationSet: 'widgets',
    play: () => {},
    pause: () => {},
    isPaused: false,
    includeSettings: false,
    filtersLabel: '',
    filtersList: [],
    selectedFiltersList: [],
    updateFiltersList: () => {},
    handleServerSorting: () => {},
    handlePagination: () => {},
    page: 0,
    pageSize: 100,
    handleColumnWidthResize: () => {},
    rows: [],
    privilege: {},
  };
  /**
   * @ignore
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      initialMode: null,
      modalOpen: false,
      allSelected: false,
      rows: [],
      lastSearched: '',
      selectedRowIdList: [],
      showTip: true,
    };
  }
  /**
   * @ignore
   *
   */
  componentDidMount() {
    window.onresize = this.handleResizable;
  }

  handleResizable = () => {
    this.props.handleColumnWidthResize();
  };

  componentWillUnmount() {
    window.onresize = null;
  }

  /**
   * @ignore
   *
   */
  componentWillReceiveProps(nextProps) {
    const stateChanges = {};
    if (this.state.initialMode === null && nextProps.selectedMode) {
      stateChanges.initialMode = nextProps.selectedMode;
    }
    if (!isEqual(nextProps.columns, this.props.columns)) {
      const nextColumns = fromJS(nextProps.columns);
      stateChanges.columns = nextColumns;
      stateChanges.allSelected = checkAllEnabled(nextColumns);
    }
    if (this.state.lastSearched === '' && (nextProps.rows.length > 0 || this.props.rows.length > 0)) {
      this.setState({ rows: nextProps.rows });
    }
    if (this.state.lastSearched != '') {
      this.handleTextSearch(this.state.lastSearched);
    }
    if (Object.keys(stateChanges).length) {
      this.setState(stateChanges);
    }
  }

  /**
   * modal for edit table attributes and feilds
   *
   */
  toggleColumnEditorModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  /**
   * sort button handler sort table column in ascending and descending order
   *
   */
  sortBase = (dir, item, parentIndex) => {
    const cards = this.state.columns;
    const length = parentIndex >= 0 ? cards.get(parentIndex).get('children').size : cards.size;
    if ((dir === 'up' && item.get('index') === 0) || (dir === 'down' && item.get('index') === length - 1)) {
      return;
    }

    const updated = sortCards({ dir, cards, parentIndex, item });
    this.setState({
      columns: updated,
    });
  };

  updateBool = (index, label, parentIndex, prop) => {
    const cards = this.state.columns;
    const { localize } = this.props;
    var updated, otherItem, index2;
    if (label === localize('PERCENTAGE')) {
      otherItem = cards.find(item => item.get('header').get('label') === localize('STATISTIC'));
      index2 = otherItem.get('index');
      updated = updateDependentBool({ cards, index, index2, prop });
    } else if (label === localize('STATISTIC')) {
      otherItem = cards.find(item => item.get('header').get('label') === localize('PERCENTAGE'));
      index2 = otherItem.get('index');
      updated = updateDependentBool({ cards, index, index2, prop });
    } else updated = updateBool({ cards, index, parentIndex, prop });
    const allSelected = checkAllEnabled(updated);
    this.setState({
      columns: updated,
      allSelected,
    });
  };

  // updateMode = (event, index, value) => {
  //   this.props.onModeChange(value);
  // };

  updateWidths = columnWidths => {
    let cards = this.state.columns;
    const updated = setWidths(cards, columnWidths);
    this.setState({
      columns: updated,
    });
    this.props.updateColumns(this.state.columns.toJS());
  };

  cancelTableDisplaySettings = () => {
    this.toggleColumnEditorModal();
    const columns = fromJS(this.props.columns);
    this.setState({
      columns,
      allSelected: checkAllEnabled(columns),
    });
  };

  saveTableDisplaySettings = () => {
    var index = 0;
    for (let i = 0; i < this.props.tabs.length; i++) {
      if (this.props.selectedTabIndex === this.props.tabs[i].index) {
        index = this.props.tabs[i].index;
        break;
      }
    }
    this.toggleColumnEditorModal();
    this.props.updatePackageListColumns(this.state.columns.toJS(), index);
    var config = cloneDeep(this.props.config);
    config.header.tabs[this.props.selectedTabIndex].columns = this.state.columns.toJS();
    for (let i = 0; i < config.header.tabs[this.props.selectedTabIndex].columns.length; i++) {
      for (let j = 0; j < this.props.tableConfigBackUp.header.tabs[this.props.selectedTabIndex].columns.length; j++) {
        if (config.header.tabs[this.props.selectedTabIndex].columns[i].property === this.props.tableConfigBackUp.header.tabs[this.props.selectedTabIndex].columns[j].property) {
          config.header.tabs[this.props.selectedTabIndex].columns[i].width = this.props.tableConfigBackUp.header.tabs[this.props.selectedTabIndex].columns[j].width;
          break;
        }
      }
    }
    this.props.setUserPreference(config);
  };

  selectAll = () => {
    const updated = updateBoolAll({
      cards: this.state.columns,
      prop: 'isVisible',
      boolState: !this.state.allSelected,
    });
    const firstReadOnly = updated.setIn([0, 'isVisible'], true);
    this.setState({
      columns: firstReadOnly,
      allSelected: !this.state.allSelected,
    });
  };

  getViewModeLabel = mode => {
    switch (mode) {
      case 'VIEW_PER_PACKAGE':
        return ':viewPerPackage';

      case 'VIEW_PER_BARCODE':
        return ':viewPerBarcode';
    }
  };

  handleTextSearch = value => {
    if (value !== '') {
      var filteredRows = facilitySearching(this.props.rows, this.props.columns, value);
      this.setState({ rows: filteredRows, lastSearched: value });
    } else {
      this.setState({ rows: this.props.rows, lastSearched: '' });
    }
  };

  /**
   * cancel and download button click handler
   *
   */
  handleButtonClick = buttonValue => {
    switch (buttonValue) {
      case 'CANCEL':
        this.setState({ selectedRowIdList: [] });
        for (let i = 0; i < this.props.rows.length; i++) {
          this.props.rows[i].isChecked = false;
        }
        break;
      case 'DOWNLOAD':
        this.props.handleDownload(this.state.selectedRowIdList);
        break;
    }
  };

  selectedCheckboxList = (selectedRowId, e) => {
    var selectedRowList = this.state.selectedRowIdList;
    if (e.target.checked) {
      selectedRowList.push(selectedRowId);
    } else {
      selectedRowList.splice(selectedRowList.indexOf(selectedRowId), 1);
    }
    this.setState({ selectedRowIdList: selectedRowList });
    this.props.disableTip();
  };

  handleAllSelectedCheckbox = selectedRowList => {
    this.setState({ selectedRowIdList: selectedRowList });
    this.props.disableTip();
  };

  handleShowTipState = val => {
    this.setState({ showTip: val });
  };

  /**
   * @ignore
   *
   */

  render() {
    const { localizationSet, classes, localize, emptyListMsg, privilege } = this.props;
    return (
      <Paper className={classes.wrapperPaper} id="tablePaper">
        {this.props.tabs && (
          <TableHeader
            toggleColumnEditorModal={this.toggleColumnEditorModal}
            localizationSet={localizationSet}
            tabs={this.props.tabs}
            subheader={this.props.subheader}
            tip={this.props.tip}
            handleTableRows={this.props.handleTableRows}
            handleColumns={this.props.handleColumns}
            handleTextSearch={this.handleTextSearch}
            handleButtonClick={this.handleButtonClick}
            selectedRow={this.state.selectedRowIdList}
            disableTip={this.props.disableTip}
            tipVisible={this.props.tipVisible}
            handleDownloadIcon={this.props.handleDownloadIcon}
            localize={localize}
            privilege={privilege}
            showTip={this.state.showTip}
            filterTableRowCount={this.props.filterTableRowCount}
            isFilterClick={this.props.isFilterClick}
          />
        )}

        <TableBody
          columns={this.props.columns}
          rows={this.state.rows}
          rowsBackup={this.props.rows}
          dropDownList={this.props.dropDownList}
          handleDropDown={this.props.handleDropDown}
          onRowSelection={this.props.onRowSelection}
          updateWidths={this.updateWidths}
          updatePackageListColumns={this.props.updatePackageListColumns}
          setUserPreference={this.props.setUserPreference}
          selectedTabIndex={this.props.selectedTabIndex}
          handleRowDelete={this.props.handleRowDelete}
          selectedCheckboxList={this.selectedCheckboxList}
          handleAllSelectedCheckbox={this.handleAllSelectedCheckbox}
          selectedRowIdList={this.state.selectedRowIdList}
          lastSearched={this.state.lastSearched}
          handleUpdatedRow={this.props.handleUpdatedRow}
          requestChartData={this.props.requestChartData}
          tableId={this.props.tableId}
          isNewDataApiHit={this.props.isNewDataApiHit}
          disableTip={this.props.disableTip}
          config={this.props.config}
          isChartColumnHide={this.props.isChartColumnHide}
          handleServerSorting={this.props.handleServerSorting}
          tabs={this.props.tabs}
          rowCount={this.props.rowCount}
          handlePagination={this.props.handlePagination}
          handleFacilityLinkClick={this.props.onFacilityLinkClick}
          page={this.props.page}
          pageSize={this.props.pageSize}
          minWidth={this.props.minWidth}
          tableConfigBackUp={this.props.tableConfigBackUp}
          localize={localize}
          emptyListMsg={emptyListMsg}
          handleShowTipState={this.handleShowTipState}
          getInfo={this.props.getInfo}
          info={this.props.info}
          putNote={this.props.putNote}
          getTableData={this.props.getTableData}
        />

        {this.state.modalOpen ? (
          <Dialog bodyStyle={styles.body} className={classes.modalEdit} open={this.state.modalOpen} classes={{ paper: this.props.classes.modalEditPaper }} onClose={this.cancelTableDisplaySettings}>
            <DialogTitle className={classes.modalEditHeader} id="edit-dialog-title">
              {localize('COLUMN_ARRANGEMENT')}
            </DialogTitle>
            <DialogContent className={classes.modalEditContent}>
              <SortableList
                updateBool={this.updateBool}
                sortBase={this.sortBase}
                sortableCards={this.state.columns}
                allSelected={this.state.allSelected}
                selectAll={this.selectAll}
                localize={localize}
              />
            </DialogContent>
            <DialogActions className={classes.modalEditFooter}>
              <Button className={classes.raisedButton} onClick={this.saveTableDisplaySettings} color="primary">
                {localize('SAVE')}
              </Button>
              <Button className={classes.flatButton} onClick={this.cancelTableDisplaySettings} color="primary">
                {localize('CANCEL')}
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TableContainer);

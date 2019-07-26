/** React */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { routeConstants } from 'platform/auth/route';
import TableContainer from '../../platform/TableHandler';
import { setMinWidth } from '../../platform/TableHandler/components/utils';

/** Local */
import { getAuthenticationURL } from '../../../services/httpRequest';
import facilityTableReducer, * as facilityTableReduxActions from './redux';
import { updateBreadcrumb } from '../../../services/breadcrumb';
import { embedI18n } from '../../../services/I18nl10n';

/** Redux */
const { facilityTableActions, facilityFeatures } = facilityTableReduxActions;

const mapStateToProps = state => {
  return {
    facilityTable: state.facilityTable,
    auth: state.authentication,
  };
};

/** Facility Table Id */
const tableId = 3;
const tableName = 'EditFacilityTable';

/** Facility table main component */
class FacilityTableContainer extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
    getfacilityTableConfig: PropTypes.func,
    facilityTable: PropTypes.object,
    handleSelectedTab: PropTypes.func,
    getfacilityTableRows: PropTypes.func,
    setfacilityTableConfig: PropTypes.func,
    updateRow: PropTypes.func,
    handleDropdown: PropTypes.func,
    handleServerSorting: PropTypes.func,
    updatePackageListColumns: PropTypes.func,
    updateBreadcrumb: PropTypes.func,
  };

  /** @ignore */
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedTabIndex: 0,
      tipVisible: true,
      tableConfigBackUp: {},
      minWidth: [],
      tableConfig: null,
    };
  }

  componentDidMount() {
    if (!this.props.auth.loggedIn) {
      this.props.history.replace(routeConstants.LOGIN);
    } else {
      this.props.updateBreadcrumb(this.props.location.pathname);
      this.callback(this.props.config);
    }
  }

  callback = tableConfig => {
    const minWidth = setMinWidth(tableConfig.header.tabs[0].columns) || [];
    var config = cloneDeep(tableConfig);
    var columns = config.header.tabs[0].columns;
    for (let i = 0; i < columns.length; i++) {
      if (document.getElementById('tablePaper')) {
        const widthInPixel = Math.round((columns[i].width * document.getElementById('tablePaper').offsetWidth) / 100);
        columns[i].width = minWidth[columns[i].property] < widthInPixel ? widthInPixel : minWidth[columns[i].property];
      }
    }
    this.setState({ tableConfigBackUp: tableConfig, minWidth: minWidth, tableConfig: config });
  };

  handleColumnWidthResize = () => {
    var { tableConfigBackUp, tableConfig } = this.state;
    if (document.getElementById('tablePaper') && tableConfigBackUp.header && tableConfig) {
      const minWidth = this.state.minWidth;
      const columns = tableConfigBackUp.header.tabs[0].columns;
      for (let i = 0; i < columns.length; i++) {
        const widthInPixel = Math.round((columns[i].width * document.getElementById('tablePaper').offsetWidth) / 100);
        tableConfig.header.tabs[0].columns[i].width = minWidth[columns[i].property] < widthInPixel ? widthInPixel : minWidth[columns[i].property];
      }
      this.setState({ tableConfig: tableConfig });
    }
  };

  /** @ignore */
  componentWillUnmount() {
    this.props.removeTableData();
  }

  /** @ignore */
  componentWillReceiveProps(nextProps) {}

  disableTip = () => {
    let config = this.state.tableConfigBackUp;
    if (config.tip.isVisible) {
      config.tip.isVisible = false;
      this.setState({ tipVisible: false });
      this.setUserPreference(config);
    }
  };

  /**
   * handleColumnDataChange
   * @param {string} table label
   * This function is used to fetch column data for seletec tab.
   */
  handleColumns = (selectedTabIndex, selectedTabUrl) => {
    this.props.handleSelectedTab(selectedTabIndex, selectedTabUrl);
    const tableConfig = this.state.tableConfig;
    for (var i = 0; i < tableConfig.header.tabs.length; i++) {
      if (selectedTabIndex === tableConfig.header.tabs[i].index) {
        this.setState({
          selectedTabIndex: selectedTabIndex,
        });
        break;
      }
    }
  };

  /**
   * handleRowsDataChange
   * @param {string} url
   * This function is used to hit on server for selected tab.
   */
  handleTableRows = url => {
    this.props.getfacilityTableRows(url, getAuthenticationURL());
    return;
  };

  /**
   * setUserPreference
   * @param {obj} object
   * This function is used to set user preference on server.
   */
  setUserPreference = config => {
    this.setState({ tableConfigBackUp: config });
    // this.props.setfacilityTableConfig(getAuthenticationURL(), tableName, config)
  };

  handleRowDelete = row => {
    this.props.handleFacilityDelete(getAuthenticationURL(), row.rowId);
    // this.props.setDeleteRowUndo(jsonVar)
  };

  handleTipVisible = isVisible => {
    // this.props.facilityTable.tableConfig.tip.isVisible = isVisible;
  };

  handleDropDown = dropDownList => {
    this.props.handleDropdown(dropDownList);
  };

  updatePackageListColumns = (columns, index) => {
    var { tableConfig } = this.state;
    tableConfig.header.tabs[index].columns = columns;
    this.setState({ tableConfig: tableConfig });
  };
  handleDownloadIcon = () => {
    const { downloadEventLog } = this.props;
    downloadEventLog(`/api/v1/sma/download/eventlog`);
  };

  render() {
    console.log(this.props);
    const { licenseInfo, facilityTable, classes } = this.props;
    const { tableConfig, tableConfigBackUp, minWidth } = this.state;
    let tabs = [],
      subheader = [],
      tip = {},
      rows = [],
      rowCount = 0,
      dropDownList = [],
      isNewDataApiHit = false,
      config = tableConfig,
      columns = [],
      emptyListMsg = facilityTable.emptyListMsg;

    if (tableConfig && tableConfig.hasOwnProperty('name')) {
      tabs = tableConfig.header.tabs;
      subheader = tableConfig.operations;
      tip = tableConfig.tip;
      columns = tableConfig.header.tabs[0].columns;
    }
    const selectedTabIndex = this.state.selectedTabIndex;

    // if (facilityTable && facilityTable.hasOwnProperty('tableRows') && facilityTable.tableRows) {
    //   rows = facilityTable.tableRows.rows
    //   rowCount = facilityTable.tableRows.rowCount
    // }
    if (this.props.data && this.props.data.rows) {
      rows = this.props.data.rows;
      rowCount = this.props.data.rowCount;
    }
    isNewDataApiHit = facilityTable.isNewDataApiHit;
    if (facilityTable && facilityTable.hasOwnProperty('dropDownList')) {
      dropDownList = facilityTable.dropDownList;
    }
    const handleColumns = this.handleColumns;
    const handleTableRows = this.handleTableRows;
    const setUserPreference = this.setUserPreference;
    const handleRowDelete = this.handleRowDelete;
    const handleDropDown = this.handleDropDown;
    const disableTip = this.disableTip;
    const handleUpdatedRow = this.props.updateRow;
    const handleServerSorting = this.props.handleServerSorting;
    const tipVisible = this.state.tipVisible;
    const updatePackageListColumns = this.updatePackageListColumns;
    const onRowSelection = () => {};
    const updateColumns = () => {};
    const onNewItem = row => {};
    const handleColumnWidthResize = this.handleColumnWidthResize;
    const localize = this.props.localize;
    const getInfo = this.props.getInfo;
    const putNote = this.props.putNote;
    const getTableData = this.props.refresh;
    const handleDownloadIcon = this.handleDownloadIcon;
    const info = facilityTable.info;
    const filterTableRowCount = this.props.data;
    const isFilterClick = this.props.isFilterClick;
    var childrenProps = {
      tabs,
      tip,
      selectedTabIndex,
      subheader,
      columns,
      rows,
      dropDownList,
      onRowSelection,
      updateColumns,
      onNewItem,
      handleTableRows,
      handleColumns,
      handleUpdatedRow,
      handleDropDown,
      updatePackageListColumns,
      setUserPreference,
      handleRowDelete,
      disableTip,
      tableId,
      handleServerSorting,
      isNewDataApiHit,
      tipVisible,
      config,
      rowCount,
      handleColumnWidthResize,
      minWidth,
      tableConfigBackUp,
      localize,
      emptyListMsg,
      getInfo,
      putNote,
      getTableData,
      handleDownloadIcon,
      info,
      filterTableRowCount,
      isFilterClick,
    };

    return <TableContainer {...childrenProps} />;
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      ...facilityFeatures,
      ...facilityTableActions,
      updateBreadcrumb,
    }
  )(embedI18n(FacilityTableContainer))
);

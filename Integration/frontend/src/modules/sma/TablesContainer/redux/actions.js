import { get, del, put, post } from '../../../../utils/httpRequest';
import { getAuthenticationURL } from '../../../../services/httpRequest';
import { addLoader, removeLoader } from '../../../../services/loader';
import { updateSnack, updateLog } from '../../../../services/snackbar';
import { actions } from 'platform/auth';
import { startFileDownload } from '../../../../utils/download';
import { searchFeatures } from "../../Event Log/redux";

import { tableConfig, tableRows } from './tableMockData';
// import * as WS from "./webSocket";
// import { store } from "../SICKPlatform";

// const tableConf = tableConfig;
// const tableRow = tableRows;
// ------------------------------------
// Constants
// ------------------------------------
const FACILITY_TABLE_ROWS = 'FACILITY_TABLE_ROWS';
const UPDATE_ROW = 'SICKPlatform/facilityTable/UPDATE_ROW';
const DROPDOWN_LIST = 'FACILITY_DROPDOWN_IN_TABLE';
const SELECTED_TAB_AND_URL = 'FACILITY_SELECTED_INDEX_AND_URL_IN_TABLE';
const REFRESH_ICON_FADE_IN = 'REFRESH_ICON_FADE_IN';
const AUTO_REFRESH = 'AUTO_REFRESH';
const REMOVE_FACILITY_TABLE_DATA = 'REMOVE_FACILITY_TABLE_DATA';
const HANDLING_SEARCH_ERROR = 'HANDLING_SEARCH_ERROR';
const EMPTY_TABLE_ERROR_MSG = 'EMPTY_TABLE_ERROR_MSG';
const SAVE_INFO = 'SAVE_INFO';

const downloadMsg = ['DOWNLOADING', 'DOWNLOADING'];

// const Facility = new Record({
//   fadeIn:false,
//   isIntervalSet:false,
//   selectedTab:{},
//   isNewDataApiHit: false
// })

// const initialState = new Facility();

// ------------------------------------
// Functions: Action creators / Helpers / etc.
// ------------------------------------

const facilityTableRows = tableRows => ({
  type: FACILITY_TABLE_ROWS,
  tableRows,
});

/**
 * @func
 * @param {object} columns
 * @param {index} number
 * This function is used to update column.
 */

const removeTableData = (payload = null) => ({
  type: REMOVE_FACILITY_TABLE_DATA,
  payload,
});

const updateRow = row => ({
  row,
  type: UPDATE_ROW,
});

const handleDropdown = dropDownList => ({
  dropDownList,
  type: DROPDOWN_LIST,
});

const handleSelectedTab = (selectedTabIndex, selectedTabUrl) => ({
  selectedTabIndex,
  selectedTabUrl,
  type: SELECTED_TAB_AND_URL,
});

const handleFadeIn = val => ({
  val,
  type: REFRESH_ICON_FADE_IN,
});

const addAutoRefresh = isIntervalSet => ({
  isIntervalSet,
  type: AUTO_REFRESH,
});

const handleSearchServerErr = val => ({
  type: HANDLING_SEARCH_ERROR,
  isSearchErr: val,
});

const handleEmptyTableErr = value => ({
  type: EMPTY_TABLE_ERROR_MSG,
  value,
});

const saveInfo = payload => ({
  type: SAVE_INFO,
  payload,
});

/**
 * @func
 * @param {string} url
 * This function is used to fetch table config.
 */
const getfacilityTableConfig = (baseUrl, tableName, callBack, isIntervalSet = null) => {
  return async (dispatch, getState) => {
    dispatch(removeTableData());
    dispatch(addLoader());
    const url = baseUrl ? `${baseUrl}/api/v1/preferences/user/perference/${tableName}` : `/api/v1/preferences/user/perference`;
    const token = getState().authentication.token;
    const locale = getState().i18nl10n.locale;
    try {
      const tableConfig1 = await get(url, { locale: locale }, { Authorization: `Bearer ${token}` });
      dispatch(searchFeatures.handleRemovePercentVal());
      dispatch(removeLoader());
      dispatch(handleSearchServerErr(''));
      callBack(tableConfig);
      dispatch(addAutoRefresh(isIntervalSet));
    }
    catch (err) {
      if (tableName === 'SearchFacilityTableConfig') {
        dispatch(searchFeatures.handleRemovePercentVal());
      }
      dispatch(removeLoader());
      if (err.message) {
        dispatch(updateLog(err, baseUrl));
      }
      if (err.error && err.error.toLowerCase() === 'invalid_token') {
        dispatch(actions.authReduxActions.actions.loggedOut(true));
      }
      console.error(err);
    }
  };
};

/**
 * @func
 * @param {string} url
 * This function is used to fetch table config.
 */
const setfacilityTableConfig = (baseUrl, tableName, body) => {
  return { type: 'DO_NOTHING' };
  return async (dispatch, getState) => {
    const url = baseUrl ? `${baseUrl}/api/v1/preferences/user/perference/${tableName}` : `/api/v1/preferences/user/perference`;
    const token = getState().authentication.token;
    const locale = getState().i18nl10n.locale;
    try {
      const res = await put(url, { locale: locale }, { Authorization: `Bearer ${token}` }, true, body);
      return;
    }
    catch (err) {
      if (err.message) {
        dispatch(updateLog(err, baseUrl));
      }
      if (err.error && err.error.toLowerCase() === 'invalid_token') {
        dispatch(actions.authReduxActions.actions.loggedOut(true));
      }
      console.error(err);
    }
  };
};

/**
 * @function
 * @param {string} url
 * This function is used to fetch table rows.
 */
const getfacilityTableRows = (url, baseUrl, shouldLoad = true, contextParam = {}) => {
  return async (dispatch, getState) => {
    if (shouldLoad) {
      dispatch(addLoader());
    }
    dispatch(handleFadeIn(true));
    const token = getState().authentication.token;
    contextParam['locale'] = getState().i18nl10n.locale;
    try {
      const tableRows1 = await get(`${baseUrl}/api/v1${url}`, contextParam, { Authorization: `Bearer ${token}` });
      var dropDownList = {};
      tableRows.rows &&
        tableRows.rows.map(item => {
          for (let i = 0; i < item.columnData.length; i++) {
            if (item.columnData[i].cellData.type === 'DROPDOWN') {
              dropDownList[item.rowId] = item.columnData[i].cellData.value;
            }
          }
        });
      dispatch(removeLoader());
      dispatch(handleEmptyTableErr(tableRows.message));
      dispatch(handleFadeIn(false));
      dispatch(handleDropdown(dropDownList));
      dispatch(facilityTableRows(tableRows));
    }
    catch (err) {
      dispatch(removeLoader());
      if (err.code === '404')
        dispatch(handleEmptyTableErr(err.message));
      if (err.message) {
        dispatch(updateLog(err, baseUrl));
      }
      if (err.error && err.error.toLowerCase() === 'invalid_token') {
        dispatch(actions.authReduxActions.actions.loggedOut(true));
      }
      console.error(err);
    }
  };
};

/**
 * @func
 * @param {string} url
 * This function is used to set dropdown preference.
 */
const setfacilityRowDropDown = (baseUrl, selectedVal, facilityId) => {
  return async (dispatch, getState) => {
    const url = baseUrl ? `${baseUrl}/api/v1/preferences/user/perference/statistics/${facilityId}/${selectedVal}` : `/api/v1/preferences/user/perference/statistics`;
    const token = getState().authentication.token;
    const locale = getState().i18nl10n.locale;
    try {
      const res = await put(url, { locale: locale }, { Authorization: `Bearer ${token}` });
      return;
    }
    catch (err) {
      if (err.message) {
        dispatch(updateLog(err, baseUrl));
      }
      if (err.error && err.error.toLowerCase() === 'invalid_token') {
        dispatch(actions.authReduxActions.actions.loggedOut(true));
      }
      console.error(err);
    }
  };
};

const handleFacilityGroupDelete = (baseUrl, rowIndex, undo = '') => {
  return async (dispatch, getState) => {
    dispatch(addLoader());
    const token = getState().authentication.token;
    const url = baseUrl ? `${baseUrl}/api/v1/facilityGroup/${rowIndex}` : `/api/v1/facilityGroup`;
    const locale = getState().i18nl10n.locale;
    try {
      const tableConfig1 = await del(url, { locale: locale }, { Authorization: `Bearer ${token}` });
      dispatch(removeLoader());
      dispatch(facilityTableRows(tableConfig));
      var snack = {
        message: `${tableConfig.delMsg}`,
        action: undo,
        log: 'facilityGroup',
      };
      dispatch(handleEmptyTableErr(tableConfig.message));
      dispatch(updateSnack(snack));
    }
    catch (err) {
      dispatch(removeLoader());
      dispatch(updateLog(err, baseUrl));
      dispatch(updateSnack(err));
      if (err.error && err.error.toLowerCase() === 'invalid_token') {
        dispatch(actions.authReduxActions.actions.loggedOut(true));
      }
      console.error(err);
    }
  };
};

const handleFacilityDelete = (baseUrl, rowIndex) => {
  return async (dispatch, getState) => {
    dispatch(addLoader());
    const token = getState().authentication.token;
    const url = baseUrl ? `${baseUrl}/api/v1/facility/delete/${rowIndex}` : `/api/v1/facility/delete`;
    const locale = getState().i18nl10n.locale;
    try {
      const tableConfig = await del(url, { locale: locale }, { Authorization: `Bearer ${token}` });
      dispatch(removeLoader());
      dispatch(facilityTableRows(tableConfig));
      var snack = {
        message: `${tableConfig.delMsg}`,
        log: '',
      };
      dispatch(handleEmptyTableErr(tableConfig.message));
      dispatch(updateSnack(snack));
    }
    catch (err) {
      dispatch(removeLoader());
      dispatch(updateLog(err, baseUrl));
      dispatch(updateSnack(err));
      if (err.error && err.error.toLowerCase() === 'invalid_token') {
        dispatch(actions.authReduxActions.actions.loggedOut(true));
      }
      console.error(err);
    }
  };
};

const handleDownload = (baseUrl, indexList) => {
  return async (dispatch, getState) => {
    dispatch(addLoader());
    const token = getState().authentication.token;
    const url = baseUrl ? `${baseUrl}/api/v1/file/download` : `/api/v1/file/download`;
    const locale = getState().i18nl10n.locale;
    try {
      const res = await post(url, { locale: locale }, { Authorization: `Bearer ${token}` }, true, indexList);
      dispatch(removeLoader());
      startFileDownload(res, '.zip', res.type, 'EnterpriseAppLog');
    }
    catch (err) {
      dispatch(removeLoader());
      dispatch(updateLog(err, baseUrl));
      dispatch(updateSnack(err));
      if (err.error && err.error.toLowerCase() === 'invalid_token') {
        dispatch(actions.authReduxActions.actions.loggedOut(true));
      }
      console.error(err);
    }
  };
};

const handleSearchDownload = (baseUrl, body) => {
  return async (dispatch, getState) => {
    dispatch(searchFeatures.handleRemovePercentVal());
    dispatch(searchFeatures.handlePercentageValue(getState().searchReducer.serverResponseTime, downloadMsg));
    dispatch(addLoader());
    const url = baseUrl ? `${baseUrl}/api/v1/search/download` : `/api/v1/search/download`;
    const token = getState().authentication.token;
    const locale = getState().i18nl10n.locale;
    try {
      const res = await post(url, { locale: locale }, { Authorization: `Bearer ${token}` }, true, body);
      dispatch(searchFeatures.handleRemovePercentVal());
      dispatch(removeLoader());
      startFileDownload(res, '.zip', res.type, 'SearchResult');
    }
    catch (err) {
      dispatch(searchFeatures.handleRemovePercentVal());
      dispatch(removeLoader());
      if (err.message) {
        dispatch(updateLog(err, baseUrl));
        dispatch(updateSnack(err));
      }
      if (err.error && err.error.toLowerCase() === 'invalid_token') {
        dispatch(actions.authReduxActions.actions.loggedOut(true));
      }
      console.error(err);
    }
  };
};

const handleRegionRowDelete = (baseUrl, rowIndex, undo = '') => {
  return async (dispatch, getState) => {
    dispatch(addLoader());
    const token = getState().authentication.token;
    const url = baseUrl ? `${baseUrl}/api/v1/region/${rowIndex}` : `/api/v1/region`;
    const locale = getState().i18nl10n.locale;
    try {
      const tableConfig = await del(url, { locale: locale }, { Authorization: `Bearer ${token}` });
      dispatch(removeLoader());
      dispatch(facilityTableRows(tableConfig));
      var snack = {
        message: `${tableConfig.delMsg}`,
        action: undo,
        log: 'region',
      };
      dispatch(handleEmptyTableErr(tableConfig.message));
      dispatch(updateSnack(snack));
    }
    catch (err) {
      dispatch(removeLoader());
      dispatch(updateLog(err, baseUrl));
      dispatch(updateSnack(err));
      if (err.error && err.error.toLowerCase() === 'invalid_token') {
        dispatch(actions.authReduxActions.actions.loggedOut(true));
      }
      console.error(err);
    }
  };
};

const getInfo = subUrl => {
  return async (dispatch, getState) => {
    try {
      const response = await get(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` });
      return dispatch(saveInfo(response));
    }
    catch (err) {
      dispatch(removeLoader());
      if (err.error && err.error.toLowerCase() === 'invalid_token') {
        dispatch(actions.authReduxActions.actions.loggedOut(true));
      }
      console.error(err);
    }
  };
};

const putNote = (subUrl, note) => async (dispatch, getState) => {
  try {
    dispatch(addLoader());
    const response = await put(getAuthenticationURL() + subUrl, { eventNote: note }, { Authorization: `Bearer ${getState().authentication.token}` });
    dispatch(removeLoader());
    return { type: 'success' };
  } catch (err) {
    console.error(err);
    dispatch(removeLoader());
  }
};

const downloadEventLog = subUrl => async (dispatch,getState)=>{
 
    dispatch(addLoader())
    return  get(getAuthenticationURL() + subUrl,{}, {Authorization: `Bearer ${getState().authentication.token}` })
    .then(res => {
      dispatch(removeLoader())
      startFileDownload(res, '.zip', "application/zip", 'SearchResult')   
     }).catch(err=>{
    console.error(err)
    dispatch(removeLoader())
  })
}

// const getTableData =(subUrl=> async (dispatch,getState)=>{
// try{
//   const response= await get(getAuthenticationURL() + subUrl, { }, { Authorization: `Bearer ${getState().authentication.token}` })
//   dispatch(handleTableData(response))
//   dispatch(removeLoader())
// }catch(err){
//   console.log(err)
//   dispatch(removeLoader())
// }
// },

export const actionConstants = {
  FACILITY_TABLE_ROWS: 'FACILITY_TABLE_ROWS',
  UPDATE_ROW: 'SICKPlatform/facilityTable/UPDATE_ROW',
  DROPDOWN_LIST: 'FACILITY_DROPDOWN_IN_TABLE',
  SELECTED_TAB_AND_URL: 'FACILITY_SELECTED_INDEX_AND_URL_IN_TABLE',
  REFRESH_ICON_FADE_IN: 'REFRESH_ICON_FADE_IN',
  DASHBOARD_VALUE: 'DASHBOARD_VALUE',
  AUTO_REFRESH: 'AUTO_REFRESH',
  UPDATE_BREADCRUMB: 'UPDATE_BREADCRUMB',
  REMOVE_FACILITY_TABLE_DATA: 'REMOVE_FACILITY_TABLE_DATA',
  HANDLING_SEARCH_ERROR: 'HANDLING_SEARCH_ERROR',
  EMPTY_TABLE_ERROR_MSG: 'EMPTY_TABLE_ERROR_MSG',
  SAVE_INFO,
};

export const facilityTableActions = {
  updateRow,
  handleDropdown,
  handleSelectedTab,
  handleFadeIn,
  addAutoRefresh,
  getfacilityTableRows,
  handleSearchServerErr,
  facilityTableRows,
  removeTableData,
  handleEmptyTableErr,
};

export const facilityFeatures = {
  getfacilityTableConfig,
  setfacilityTableConfig,
  getfacilityTableRows,
  handleFacilityGroupDelete,
  handleDownload,
  setfacilityRowDropDown,
  handleSearchDownload,
  handleRegionRowDelete,
  handleFacilityDelete,
  getInfo,
  putNote,
  downloadEventLog
  // getTableData
};

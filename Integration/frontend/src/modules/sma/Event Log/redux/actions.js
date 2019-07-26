import { get, post } from '../../../../utils/httpRequest';
import { addLoader, removeLoader, addPercentLoader, removePercentLoader } from '../../../../services/loader';
import { updateSnack, updateLog } from '../../../../services/snackbar';
import { actions } from 'platform/auth';
import { facilityTableActions } from '../../TablesContainer/redux/actions';
import { tableConfig, tableRows } from './tableMockData'
import { getAuthenticationURL } from '../../../../services/httpRequest';

const HANDLE_SEARCH_OBJECT = 'HANDLE_SEARCH_OBJECT';
const HANDLE_CURRENT_SEARCH_OBJECT = 'HANDLE_CURRENT_SEARCH_OBJECT';
const HANDLE_INITIAL_CALL_BREAK = 'HANDLE_INITIAL_CALL_BREAK';
const HANDLE_STATE_SEARCH_OBJECT = 'HANDLE_STATE_SEARCH_OBJECT';
const HANDLE_FAKE_PERCENTAGE_LOADER = 'HANDLE_FAKE_PERCENTAGE_LOADER';
const HANDLE_SEARCH_PAGINATION_VALUE = 'HANDLE_SEARCH_PAGINATION_VALUE';
const HANDLE_SERVER_RESPONSE_TIME = 'HANDLE_SERVER_RESPONSE_TIME';
const HANDLE_WEEK_STARTS_ON = 'HANDLE_WEEK_STARTS_ON';
const HANDLE_TABLE_DATA = 'HANDLE_TABLE_DATA';
const HANDLE_CONFIG = 'HANDLE_CONFIG';

var interval;
const searchMsg = ['SEARCHING', 'COMMUNICATION'];
const paginationNext = ['FETCHING_NEXT_RECORDS', 'COMMUNICATION'];
const paginationPrevious = ['FETCHING_PREVIOUS_RECORDS', 'COMMUNICATION'];
const paginationChange = ['FETCHING_RECORDS', 'COMMUNICATION'];

const handleTableData = data => ({
  type: HANDLE_TABLE_DATA,
  data,
});

const handleSearchResponseTime = time => ({
  type: HANDLE_SERVER_RESPONSE_TIME,
  time,
});

const handlePageNumber = (page, pageSize) => ({
  type: HANDLE_SEARCH_PAGINATION_VALUE,
  page,
  pageSize,
});

const handleLoaderValue = (percentVal, msg) => ({
  type: HANDLE_FAKE_PERCENTAGE_LOADER,
  percentVal: percentVal,
  msg: msg,
});
const handleStateSearchObject = data => ({
  type: HANDLE_STATE_SEARCH_OBJECT,
  data,
});

const handleSearchObject = data => ({
  type: HANDLE_SEARCH_OBJECT,
  data,
});

const handleCurrentSelected = data => ({
  type: HANDLE_CURRENT_SEARCH_OBJECT,
  data,
});

const searchCallBreak = val => ({
  type: HANDLE_INITIAL_CALL_BREAK,
  val,
});

const handleWeekStartsOn = data => ({
  type: HANDLE_WEEK_STARTS_ON,
  data,
});

//

const handleTableConfig = config => ({
  type: 'HANDLE_CONFIG',
  config,
});

const getTableConfig = subUrl => async (dispatch, getState) => {
  try {
    const response = await get(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` });
    dispatch(removeLoader());
    dispatch(handleTableConfig(response));
  } catch (err) {
    dispatch(removeLoader());
    console.error(err);
  }
};

const getTableData = (subUrl, componentName = '', uniqueId = '', systemName = '', status = '', startDate = '', endDate = '') => async (dispatch, getState) => {
  try {
    dispatch(addLoader());
    const response = await get(getAuthenticationURL() + subUrl, { componentName, uniqueId, systemName, status, startDate, endDate }, { Authorization: `Bearer ${getState().authentication.token}` });
    dispatch(handleTableData(response));
    dispatch(removeLoader());
  } catch (err) {
    console.error(err);
    dispatch(removeLoader());
  }
};

const handleSearchData = (baseUrl, body, actionType) => {
  return (dispatch, getState) => {
    var msgList = searchMsg;
    switch (actionType) {
      case 'sort':
        break;
      case 'next':
        msgList = paginationNext;
        break;
      case 'previous':
        msgList = paginationPrevious;
        break;
      case 'noChange':
        msgList = paginationChange;
        break;
      default:
        break;
    }
    clearInterval(interval);
    dispatch(handlePercentageValue(getState().searchReducer.serverResponseTime, msgList));
    dispatch(addLoader());
    const url = `${baseUrl}/api/v1/facility/search`;
    const token = getState().authentication.token;
    const locale = getState().i18nl10n.locale;
    return post(url, { locale: locale }, { Authorization: `Bearer ${token}` }, true, body)
      .then(tableRows => {
        clearInterval(interval);
        var dropDownList = {};
        tableRows.rows &&
          tableRows.rows.map(item => {
            for (let i = 0; i < item.columnData.length; i++) {
              if (item.columnData[i].cellData.type === 'DROPDOWN') {
                dropDownList[item.rowId] = item.columnData[i].cellData.value;
              }
            }
          });
        if (body.searchObj.values.navigationType !== '') {
          dispatch(handleLoaderValue('', ''));
        }
        dispatch(removeLoader());
        dispatch(handlePageNumber(body.searchObj.values.pageNumber, body.searchObj.values.pageSize));
        dispatch(facilityTableActions.handleSearchServerErr(''));
        dispatch(facilityTableActions.handleFadeIn(false));
        dispatch(facilityTableActions.handleDropdown(dropDownList));
        dispatch(facilityTableActions.facilityTableRows(tableRows));
      })
      .catch(err => {
        dispatch(handleRemovePercentVal());
        dispatch(removeLoader());
        if (err.message) {
          dispatch(facilityTableActions.handleSearchServerErr(err.message));
        }
        if (err.error && err.error.toLowerCase() === 'invalid_token') {
          dispatch(actions.authReduxActions.actions.loggedOut(true));
        }
      });
  };
};

export const handlePercentageValue = (responseTime, msg) => {
  return dispatch => {
    var percentVal = 0,
      count = 0;
    dispatch(handleLoaderValue(percentVal + '%', msg[count]));
    interval = setInterval(function() {
      percentVal = percentVal == 60 ? percentVal : ++percentVal;
      dispatch(handleLoaderValue(percentVal + '%', msg[count]));
    }, responseTime / 60);
    setTimeout(function() {
      count++;
    }, 6000);
    setTimeout(function() {
      clearInterval(interval);
    }, responseTime);
  };
};

export const handleRemovePercentVal = () => {
  return dispatch => {
    clearInterval(interval);
    dispatch(handleLoaderValue('', ''));
  };
};

export const actionConstants = {
  HANDLE_SEARCH_OBJECT: 'HANDLE_SEARCH_OBJECT',
  HANDLE_CURRENT_SEARCH_OBJECT: 'HANDLE_CURRENT_SEARCH_OBJECT',
  HANDLE_INITIAL_CALL_BREAK: 'HANDLE_INITIAL_CALL_BREAK',
  HANDLE_STATE_SEARCH_OBJECT: 'HANDLE_STATE_SEARCH_OBJECT',
  HANDLE_FAKE_PERCENTAGE_LOADER: 'HANDLE_FAKE_PERCENTAGE_LOADER',
  HANDLE_SEARCH_PAGINATION_VALUE: 'HANDLE_SEARCH_PAGINATION_VALUE',
  HANDLE_SERVER_RESPONSE_TIME: 'HANDLE_SERVER_RESPONSE_TIME',
  HANDLE_WEEK_STARTS_ON: 'HANDLE_WEEK_STARTS_ON',
  HANDLE_TABLE_DATA: 'HANDLE_TABLE_DATA',
  HANDLE_CONFIG,
};

export const SearchActions = {
  handleSearchObject,
  handleCurrentSelected,
  searchCallBreak,
  handleStateSearchObject,
  handleLoaderValue,
  handlePageNumber,
  handleSearchResponseTime,
  handleWeekStartsOn,
  handleTableData,
};

export const searchFeatures = {
  handleSearchData,
  // getSearchConfig,
  getTableConfig,
  handlePercentageValue,
  handleRemovePercentVal,
  getTableData,
};

import { Client } from '@stomp/stompjs';
import { getAuthenticationURL, getBasesocketUrl } from '../../../../services/httpRequest';
import { get } from '../../../../utils/httpRequest';
import { addLoader, removeLoader } from '../../../../services/loader';
import { actions } from 'platform/auth';
import { updateSnack } from '../../../../services/snackbar';

// ------------------------------------
// Constants
// ------------------------------------
const SAVE_DATA = 'SAVE_DATA';
const SNACKBAR_CLICK = 'SNACKBAR_CLICK';
const SNACKBAR_CLICKED = 'SNACKBAR_CLICKED';

const dataReceived = (dataType, data) => ({
  type: SAVE_DATA,
  dataType,
  data,
});

const snackbarViewClick = systemName => ({
  type: SNACKBAR_CLICK,
  systemName,
});

const snackbarClickEnd = () => ({
  type: SNACKBAR_CLICKED,
});

const getConfig = subUrl => {
  return async (dispatch, getState) => {
    try {
      dispatch(addLoader());
      const config = await get(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` });
      dispatch(removeLoader());
      return dispatch(dataReceived('config', config));
    } catch (err) {
      dispatch(removeLoader());
      if (err.error && err.error.toLowerCase() === 'invalid_token') {
        dispatch(actions.authReduxActions.actions.loggedOut(true));
      }
    }
  };
};
const getCacheData = subUrl => {
  return async (dispatch, getState) => {
    try {
      dispatch(addLoader());
      await get(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` });
      dispatch(removeLoader());
    } catch (err) {
      dispatch(removeLoader());
      console.error(err);
    }
  };
};

const getDashboardTableData = subUrl => {
  return async (dispatch, getState) => {
    try {
      const data = await get(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` });
      return dispatch(dataReceived('dashboardTableData', data.machine));
    } catch (err) {
      if (err.error && err.error.toLowerCase() === 'invalid_token') {
        dispatch(actions.authReduxActions.actions.loggedOut(true));
      }
    }
  };
};
const getDashboardTable2 = subUrl => {
  return async (dispatch, getState) => {
    try {
      const data = await get(getAuthenticationURL() + subUrl, {}, { Authorization: `Bearer ${getState().authentication.token}` });
      return dispatch(dataReceived('dashboardTableData2', data.dataList));
    } catch (err) {
      if (err.error && err.error.toLowerCase() === 'invalid_token') {
        dispatch(actions.authReduxActions.actions.loggedOut(true));
      }
    }
  };
};

const subscribeToWS = () => (dispatch, getState) => {
  // console.log(this.props);
  const client = new Client();
  client.brokerURL = `ws://${getBasesocketUrl()}/websocket-example`;
  client.onConnect = () => {
    client.subscribe('/topic/machine', message => {
      if (message.body) {
        const arr = getState().sma.dashboardTableData;
        const data = JSON.parse(message.body).dashboardMachine.machine;
        console.log(arr, data, data[0].name);
        dispatch(updateSnack({ message: 'Status Changed in ' + data[parseInt(Math.random() * data.length)].name }));
        dataReceived('dashboardTableData', data);
      }
    });
  };
  client.onStompError = frame => {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.error(`Broker reported error: ${frame.headers.message}`);
    console.error(`Additional details: ${frame.body}`);
  };
  client.activate();
};

export const actionConstants = { SAVE_DATA, SNACKBAR_CLICK, SNACKBAR_CLICKED };

export const smaActions = { dataReceived, snackbarViewClick, snackbarClickEnd };

export const smaFeatures = {
  getDashboardTableData,
  getDashboardTable2,
  getConfig,
  getCacheData,
  subscribeToWS,
};

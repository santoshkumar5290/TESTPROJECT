import { actionConstants } from './actions';

const initialState = {
  sensorData: [],
  tableData: [],
  machineConfig: {},
  machineList: [],
  dashboardTableData: [],
  config: {
    machineConfig: [],
    tableConfig: {},
    pollingFrequency: 5000,
  },
};

const actionHandlers = {
  [actionConstants.SAVE_DATA]: (state, { dataType, data }) => {
    return {
      ...state,
      [dataType]: data,
    };
  },
  [actionConstants.SNACKBAR_CLICK]: (state, { systemName }) => {
    return {
      ...state,
      systemName,
    };
  },
  [actionConstants.SNACKBAR_CLICKED]: state => {
    return {
      ...state,
      systemName: '',
    };
  },
};

/** @private */
export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

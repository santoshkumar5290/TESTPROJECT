import { actionConstants, SearchActions, searchFeatures } from './actions';

const initialState = {
  searchObject: '',
  loadPercent: '',
  loadMsg: '',
  page: 0,
  pageSize: 100,
  serverResponseTime: 0,
  tableRows: {},
};

// const initialState = new Facility();
const actionHandlers = {
  [actionConstants.HANDLE_SEARCH_OBJECT]: (state, { data }) => {
    const nextState = Object.assign({}, state, { searchArray: data });
    return nextState;
  },
  [actionConstants.HANDLE_CURRENT_SEARCH_OBJECT]: (state, { data }) => {
    const nextState = Object.assign({}, state, { selectedSearchObj: data });
    return nextState;
  },
  [actionConstants.HANDLE_INITIAL_CALL_BREAK]: (state, { val }) => {
    const nextState = Object.assign({}, state, { searchInitCallFail: val });
    return nextState;
  },
  [actionConstants.HANDLE_STATE_SEARCH_OBJECT]: (state, { data }) => {
    const nextState = Object.assign({}, state, { searchObject: data });
    return nextState;
  },
  [actionConstants.HANDLE_FAKE_PERCENTAGE_LOADER]: (state, { percentVal, msg }) => {
    const nextState = Object.assign({}, state, { loadPercent: percentVal, loadMsg: msg });
    return nextState;
  },
  [actionConstants.HANDLE_SEARCH_PAGINATION_VALUE]: (state, { page, pageSize }) => {
    const nextState = Object.assign({}, state, { page: page, pageSize: pageSize });
    return nextState;
  },
  [actionConstants.HANDLE_SERVER_RESPONSE_TIME]: (state, { time }) => {
    const nextState = Object.assign({}, state, { serverResponseTime: time });
    return nextState;
  },
  [actionConstants.HANDLE_WEEK_STARTS_ON]: (state, { data }) => {
    const nextState = Object.assign({}, state, { weekStartDay: data });
    return nextState;
  },
  [actionConstants.HANDLE_TABLE_DATA]: (state, { data }) => {
    const nextState = Object.assign({}, state, { tableRows: data });
    return nextState;
  },
  [actionConstants.HANDLE_CONFIG]: (state, { config }) => ({ ...state, tableConfig: config }),
};

export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}

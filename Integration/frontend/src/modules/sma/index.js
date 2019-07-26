import smaReducer, * as smaReduxActions from './MachineWidget/redux';
import systemConfigReducer, * as systemConfigReduxActions from './Configuration/redux';
import facilityTableReducer, * as facilityTableReduxActions from './TablesContainer/redux';
import searchReducer, * as filterTableReduxAction from './Event Log/redux';

const reducers = { sma: smaReducer, facilityTable: facilityTableReducer, systemConfig: systemConfigReducer, filterTable: searchReducer };

const actions = { smaReduxActions, facilityTableReduxActions, systemConfigReduxActions, filterTableReduxAction };

export { reducers };
export { actions };

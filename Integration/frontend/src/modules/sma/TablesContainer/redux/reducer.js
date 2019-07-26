import { actionConstants } from './actions'

// const Facility = new Record({
//   fadeIn:false,
//   isIntervalSet:false,
//   selectedTab:{},
//   isNewDataApiHit: false
// })

const initialState = {
  fadeIn:false,
  isIntervalSet:false,
  selectedTab:{},
  isNewDataApiHit: false,
  isSearchErr: false,
  emptyListMsg: 'No Data Available',
  info: {}
}

/**
  * action handlers
  *
*/
const actionHandlers = {
  [actionConstants.UPDATE_ROW]: (state, { row }) => {
    let nextState = state
    if (row) {
      nextState = Object.assign({}, state, { message : '', log:'' })
    }
    nextState.isNewDataApiHit = false
    if (nextState.tableRows)nextState.tableRows.rows = row
    return nextState
  },

  [actionConstants.FACILITY_TABLE_ROWS]: (state, { tableRows }) => {
    const nextState = Object.assign({}, state, { tableRows:tableRows, message : '', log:'' })
    nextState.isNewDataApiHit = true
    return nextState
  },

  [actionConstants.DROPDOWN_LIST]:(state, { dropDownList }) => {
    let nextState = state
    nextState = Object.assign({}, state, { message : 'dropdown changed successfully', log:'' })
    nextState.dropDownList = dropDownList
    return nextState
  },

  [actionConstants.SELECTED_TAB_AND_URL]:(state, { selectedTabIndex, selectedTabUrl }) => {
    let nextState = state
    nextState = Object.assign({}, state, { message : '', log:'' })
    nextState.selectedTab = {}
    nextState.selectedTab['index'] = selectedTabIndex
    nextState.selectedTab['url'] = selectedTabUrl
    return nextState
  },

  [actionConstants.REFRESH_ICON_FADE_IN]:(state, { val }) => {
    let nextState = state
    nextState = Object.assign({}, state, { message : '', log:'' })
    nextState.fadeIn = val
    return nextState
  },

  [actionConstants.DASHBOARD_VALUE]:(state, { val }) => {
    let nextState = state
    nextState = Object.assign({}, state, { message : '', log:'' })
    nextState.dashboard = val
    return nextState
  },
  [actionConstants.AUTO_REFRESH]:(state, { isIntervalSet }) => {
    const nextState = Object.assign({}, state, { isIntervalSet:isIntervalSet })
    return nextState
  },

  [actionConstants.HANDLING_SEARCH_ERROR]:(state, {isSearchErr})=>{
    const nextState = Object.assign({}, state, {isSearchErr:isSearchErr})
    return nextState;
  },

  [actionConstants.REMOVE_FACILITY_TABLE_DATA]:(state, { payload }) => {
    return {
      ...state,
      tableConfig: payload,
      tableRows: payload,
      isSearchErr: false
    }
  },

  [actionConstants.EMPTY_TABLE_ERROR_MSG]:(state, {value})=>{
    const nextState = Object.assign({}, state, {emptyListMsg : value})
    return nextState;
  },
  [actionConstants.SAVE_INFO]:(state, {payload})=>{
    const nextState = Object.assign({}, state, {info : payload})
    return nextState;
  },



}

/** @private */
export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

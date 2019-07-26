import {get, post} from "../../../../utils/httpRequest";
import { addLoader, removeLoader, addPercentLoader, removePercentLoader } from '../../../../services/loader';
import { updateSnack, updateLog } from '../../../../services/snackbar'
import {actions} from '../../../auth'
import { facilityTableActions } from '../../TablesContainer/redux/actions'

const HANDLE_SEARCH_OBJECT="HANDLE_SEARCH_OBJECT"
const HANDLE_CURRENT_SEARCH_OBJECT="HANDLE_CURRENT_SEARCH_OBJECT";
const HANDLE_INITIAL_CALL_BREAK="HANDLE_INITIAL_CALL_BREAK";
const HANDLE_STATE_SEARCH_OBJECT="HANDLE_STATE_SEARCH_OBJECT";
const HANDLE_FAKE_PERCENTAGE_LOADER="HANDLE_FAKE_PERCENTAGE_LOADER";
const HANDLE_SEARCH_PAGINATION_VALUE="HANDLE_SEARCH_PAGINATION_VALUE";
const HANDLE_SERVER_RESPONSE_TIME="HANDLE_SERVER_RESPONSE_TIME";
const HANDLE_WEEK_STARTS_ON="HANDLE_WEEK_STARTS_ON";

var interval;
const searchMsg = [
  "SEARCHING",
  "COMMUNICATION",
]
const paginationNext = [
  "FETCHING_NEXT_RECORDS",
  "COMMUNICATION",
]
const paginationPrevious = [
  "FETCHING_PREVIOUS_RECORDS",
  "COMMUNICATION",
]
const paginationChange = [
  "FETCHING_RECORDS",
  "COMMUNICATION",
]

 const handleSearchResponseTime = (time) => ({
  type:HANDLE_SERVER_RESPONSE_TIME,
  time
 })

 const handlePageNumber = (page, pageSize) =>({
  type:HANDLE_SEARCH_PAGINATION_VALUE,
  page:page,
  pageSize:pageSize
 })

 const handleLoaderValue = (percentVal, msg)=>({
  type:HANDLE_FAKE_PERCENTAGE_LOADER,
  percentVal: percentVal,
  msg: msg
 })
 const handleStateSearchObject = (data)=> ({
  type:HANDLE_STATE_SEARCH_OBJECT,
  data
})

 const handleSearchObject = (data)=> ({
  type:HANDLE_SEARCH_OBJECT,
  data
})

 const handleCurrentSelected = (data)=> ({
  type:HANDLE_CURRENT_SEARCH_OBJECT,
  data
})

 const searchCallBreak = (val)=>({
  type: HANDLE_INITIAL_CALL_BREAK,
  val
 })

 const handleWeekStartsOn=(data)=>({
  type: HANDLE_WEEK_STARTS_ON,
  data
 })

 const getSearchConfig=(baseUrl)=>{
    return (dispatch,getState)=>{
      dispatch(addLoader())
      const url=baseUrl+`/api/v1/facility/search`
      dispatch(searchCallBreak(false))
      const token = getState().authentication.token
      const locale = getState().i18nl10n.locale
      return get(url,{"locale":locale},{ 'Authorization':`Bearer ${token}` })
         .then(data=>{
            dispatch(removeLoader())
            dispatch(handleSearchObject(data.searchTypes))
            dispatch(handleSearchResponseTime(data.searchResponseTime))
            dispatch(handleWeekStartsOn(data.weekStartsOn))
            for(let i=0; i<data.searchTypes.length; i++){
              if(data.searchTypes[i].selected){
                dispatch(handleCurrentSelected(data.searchTypes[i]))
                break;
              }
            }
         })
         .catch(err=>{
            dispatch(removeLoader())
            dispatch(updateLog(err, baseUrl))
            dispatch(updateSnack(err))
            if(err.message){
              dispatch(facilityTableActions.handleSearchServerErr(err.message))
              dispatch(searchCallBreak(true))
            }
            if(err.error&&err.error.toLowerCase() === 'invalid_token'){
              dispatch(actions.authReduxActions.actions.loggedOut(true))
            }
         })
    }   
  }

  const handleSearchData = (baseUrl, body, actionType) => {
    return (dispatch,getState)=>{
        var msgList = searchMsg;
        switch(actionType){
          case "sort":
            break;
          case "next":
            msgList = paginationNext
            break;
          case "previous":
            msgList = paginationPrevious
            break;
          case "noChange":
            msgList = paginationChange
            break;
          default:
            break;
        }
        clearInterval(interval);
        dispatch(handlePercentageValue(getState().searchReducer.serverResponseTime, msgList));
        dispatch(addLoader())
        const url=`${baseUrl}/api/v1/facility/search`
        const token = getState().authentication.token
        const locale = getState().i18nl10n.locale
        return post(url,{"locale": locale},{'Authorization':`Bearer ${token}` },true,body)
          .then(tableRows => {
            clearInterval(interval);
            var dropDownList = {};
            tableRows.rows && tableRows.rows.map(item => {
              for (let i = 0; i < item.columnData.length; i++) {
                if (item.columnData[i].cellData.type === "DROPDOWN") {
                  dropDownList[item.rowId] = item.columnData[i].cellData.value;
                }
              }
            })
            if(body.searchObj.values.navigationType !== ""){
              dispatch(handleLoaderValue('',''))
            }
            dispatch(removeLoader())
            dispatch(handlePageNumber(body.searchObj.values.pageNumber, body.searchObj.values.pageSize))
            dispatch(facilityTableActions.handleSearchServerErr(''))
            dispatch(facilityTableActions.handleFadeIn(false));
            dispatch(facilityTableActions.handleDropdown(dropDownList))
            dispatch(facilityTableActions.facilityTableRows(tableRows));
          })
          .catch(err => {
            dispatch(handleRemovePercentVal())
            dispatch(removeLoader())
            if(err.message){
              dispatch(facilityTableActions.handleSearchServerErr(err.message))
            }
            if(err.error && err.error.toLowerCase() === 'invalid_token'){
              dispatch(actions.authReduxActions.actions.loggedOut(true))
            }
          });
    }
  }

  export const handlePercentageValue = (responseTime, msg) => {
    return (dispatch) => {
      var percentVal = 0, count = 0;
      dispatch(handleLoaderValue((percentVal)+"%", msg[count]))
      interval = setInterval(function(){
        percentVal = (percentVal == 60) ? percentVal : ++percentVal;
        dispatch(handleLoaderValue((percentVal+"%"), msg[count]))
      }, responseTime/60)
      setTimeout(function(){count++},6000)
      setTimeout(function() { clearInterval( interval ); }, responseTime);
    }
  }

  export const handleRemovePercentVal = () => {
    return (dispatch) => {
      clearInterval(interval);
      dispatch(handleLoaderValue('',''));
    }
  }

export const  actionConstants = {
 HANDLE_SEARCH_OBJECT : "HANDLE_SEARCH_OBJECT",
 HANDLE_CURRENT_SEARCH_OBJECT : "HANDLE_CURRENT_SEARCH_OBJECT",
 HANDLE_INITIAL_CALL_BREAK: "HANDLE_INITIAL_CALL_BREAK",
 HANDLE_STATE_SEARCH_OBJECT:"HANDLE_STATE_SEARCH_OBJECT",
 HANDLE_FAKE_PERCENTAGE_LOADER:"HANDLE_FAKE_PERCENTAGE_LOADER",
 HANDLE_SEARCH_PAGINATION_VALUE:"HANDLE_SEARCH_PAGINATION_VALUE",
 HANDLE_SERVER_RESPONSE_TIME:"HANDLE_SERVER_RESPONSE_TIME",
 HANDLE_WEEK_STARTS_ON:"HANDLE_WEEK_STARTS_ON"
}

export const SearchActions = {
  handleSearchObject,
  handleCurrentSelected,
  searchCallBreak,
  handleStateSearchObject,
  handleLoaderValue,
  handlePageNumber,
  handleSearchResponseTime,
  handleWeekStartsOn
}

export const searchFeatures = {
  handleSearchData,
  getSearchConfig,
  handlePercentageValue,
  handleRemovePercentVal
}
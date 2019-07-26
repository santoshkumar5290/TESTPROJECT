import React from "react"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import classNames from "classnames"
import styles from "../styles"
import Button from "@material-ui/core/Button"
import SvgIcon from '@material-ui/core/SvgIcon'
import { lightBulbIcon } from './../../../../svgIcons'
import { SearchTableContainer } from '../../TablesContainer'
import SubheaderFilter from './SubheaderFilter'
import { getAuthenticationURL } from '../../../../services/httpRequest'
import { actions } from '../../../enterprise'
import { routeConstants } from '../../../auth/route'
import { configurationRouteConstants } from '../../route'
import SpecificHeaderSelector from './SpecificHeaderSelector'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { updateBreadcrumb } from '../../../../services/breadcrumb'
import ErrorOutline from '@material-ui/icons/ErrorOutline'
import SearchIcon from '@material-ui/icons/Search'
import moment from 'moment-timezone';
import { embedI18n } from '../../../../services/I18nl10n'

const { features } = actions.configurationReduxActions
const { ConfigurationActions } = actions.configurationReduxActions
const { facilityFeatures } = actions.facilityTableReduxActions
const { facilityTableActions } = actions.facilityTableReduxActions
const { searchFeatures } = actions.searchReduxActions
const { SearchActions } = actions.searchReduxActions

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            name: [],
            options: [],
            isSearchTableContainerOpen: false,
            isSearchClicked: false,
            searchInnerObj: {},
            errObj: {},
            searchDisabled: false,
            open: false,
            dateErr: false,
            uniqueRandom: Math.random().toString().split('.')[1]
        };
    };

    componentWillMount() {
        if (!this.props.auth.loggedIn) {
            this.props.history.replace(routeConstants.LOGIN)
        }
        else {
            this.props.handleSearchServerErr(false);
            this.props.getActiveFacilities(getAuthenticationURL());
            this.props.updateBreadcrumb(this.props.location.pathname);
            this.props.getSearchConfig(getAuthenticationURL());
        }
    }

    componentWillUnmount() {
        this.props.handleSearchServerErr(false);
        this.props.removeTableData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.configuration.groupList) {
            this.setState({ options: nextProps.configuration.groupList })
        }
        if (nextProps.configuration.res) {
            nextProps.handleSuccess(null);
            this.props.history.replace(configurationRouteConstants.EDITDELETEFACILITYGROUP);
        }
        if (nextProps.selectedSearchObj) {
            this.setState({ type: nextProps.selectedSearchObj.label })
        }
        if (nextProps.facilityTable.isSearchErr === '')
            this.setState({ isSearchTableContainerOpen: true })
    }

    handleTimeInMiliSeconds = (stime, etime) => {
        const query = Object.assign({}, this.state.searchInnerObj, { startDate: stime, endDate: etime, timeZone: moment.tz.guess() })
        this.setState({ searchInnerObj: query, dateErr: false })
    };

    handleSTimeInMiliSec = (stime) => {
        var dateErr = false;
        const query = Object.assign({}, this.state.searchInnerObj, { startDate: stime })
        if (stime && query.endDate && stime > query.endDate)
            dateErr = true;
        if (!stime)
            delete query['startDate']
        this.setState({ searchInnerObj: query, dateErr: dateErr });
    };

    handleETimeInMiliSec = (etime) => {
        var dateErr = false;
        const timeZone = moment.tz.guess();
        const query = Object.assign({}, this.state.searchInnerObj, { endDate: etime, timeZone: timeZone })
        if (etime && query.startDate && query.startDate > etime)
            dateErr = true;
        if (!etime)
            delete query['endDate']
        this.setState({ searchInnerObj: query, dateErr: dateErr })
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => { 
        this.setState({ open: false });
    };

    handleDone = () => {
        this.setState({ open: false });
    };

    handleCancelClick = () => {
        this.setState({ open: false, name: [] });
    };

    handleChange = (val) => {
        if (val[val.length - 1] === 'doneButton') {
            this.handleDone()
            return
        } else if (val[val.length - 1] === 'cancelButton') {
            this.handleCancelClick()
            return
        }
        for (let i = 0; i < val.length; i++) {
            if (typeof (val[i]) === 'undefined') {
                return;
            }
        }
        this.setState({ name: val });
    };

    handleTypeChange = (e) => {
        for (let i = 0; i < this.props.searchArray.length; i++) {
            if (this.props.searchArray[i].label === e.target.value) {
                this.props.handleCurrentSelected(this.props.searchArray[i])
                break;
            }
        }
        this.props.handleSearchServerErr(false);
        this.setState({ searchInnerObj: {}, name: [], isSearchTableContainerOpen: false, isSearchClicked: false, dateErr: false, errObj: {}, searchDisabled: false })
    }

    handleValueChange = (code, regex, val) => {
        var err = false, reg = regex[0];
        if (val.length > 0 && !(RegExp(reg).test(val)))
            err = true;
        const errObj = Object.assign({}, this.state.errObj, { [code]: err })
        const query = Object.assign({}, this.state.searchInnerObj, { [code]: val })
        if (val === "")
            delete query[code]
        this.setState({
            errObj: errObj,
            searchDisabled: err,
            searchInnerObj: query
        })
    }

    // handleInputValue = (code, regex, val) => {
    //     var err = false, reg = regex[0];
    //     if (val.length > 0 && !(RegExp(reg).test(val)))
    //         err = true;
    //     const errObj = Object.assign({}, this.state.errObj, { [code]: err })
    //     this.setState({ errObj: errObj })
    // }

    handleFixedDecimal = (val, decimal) => {
        var afterDecimal = isNaN(parseFloat(val.split('.')[1].slice(0, decimal))) ? "" : parseFloat(val.split('.')[1].slice(0, decimal));
        if (decimal === 2 && afterDecimal.toString().length === 1)
            afterDecimal = '0' + afterDecimal;
        return (val.split('.')[0] + '.' + afterDecimal);
    }

    handleNumberChange = (code, param, e) => {
        var err = false, { searchInnerObj } = this.state, valInFLoat = '', val = e.target.value;
        if (val === "") {
            const query = Object.assign({}, searchInnerObj, { [code]: "" })
            const errObj = Object.assign({}, this.state.errObj, { [param.code[1]]: err })
            if (val === "")
                delete query[code]
            this.setState({ searchInnerObj: query, errObj: errObj, searchDisabled: err })
            return
        }
        if (val != "." && isNaN(parseFloat(val)) && val != "-") {
            return
        }
        const minVal = parseFloat(param.regex[1].split(',')[0]);
        const maxVal = parseFloat(param.regex[1].split(',')[1]);
        if (val.split('.').length > 1) {
            if (this.props.selectedSearchObj.code === "byBoxFactor")
                valInFLoat = (val.split('.')[1].length >= 2) ? this.handleFixedDecimal(val, 2) : this.handleFixedDecimal(val, 1);
            else
                valInFLoat = this.handleFixedDecimal(val, 1);
        }
        else
            valInFLoat = isNaN(parseFloat(val)) ? val : parseFloat(val);
        if (valInFLoat < minVal)
            valInFLoat = minVal
        if (valInFLoat > maxVal){
            if(valInFLoat.toString().length>9)
                valInFLoat = (searchInnerObj[code]).toString()
            else
                valInFLoat = maxVal
        }
        if (this.props.selectedSearchObj.code === "byAngle") {
            if ((valInFLoat !== "") && ((code === param.code[0] && searchInnerObj[param.code[1]] && parseFloat(searchInnerObj[param.code[1]]) > valInFLoat) ||
                (code === param.code[1] && searchInnerObj[param.code[0]] && parseFloat(searchInnerObj[param.code[0]]) < valInFLoat)))
                err = true;
        }
        else if ((valInFLoat !== "") && ((code === param.code[0] && searchInnerObj[param.code[1]] && parseFloat(searchInnerObj[param.code[1]]) < valInFLoat) ||
            (code === param.code[1] && searchInnerObj[param.code[0]] && parseFloat(searchInnerObj[param.code[0]]) > valInFLoat)))
            err = true;
        const query = Object.assign({}, searchInnerObj, { [code]: valInFLoat.toString() })
        const errObj = Object.assign({}, this.state.errObj, { [param.code[1]]: err })
        this.setState({ searchInnerObj: query, errObj: errObj, searchDisabled: err })
    }

    submitSearch = () => {
        var facilities = [], searchObj = '', innerObj = Object.assign({}, this.state.searchInnerObj);
        for (let i = 0; i < this.state.name.length; i++) {
            for (let j = 0; j < this.state.options.length; j++) {
                if (this.state.name[i] === this.state.options[j].value) {
                    facilities.push(this.state.options[j].id)
                }
            }
        }
        innerObj.pageNumber = 0;
        innerObj.pageSize = 100;
        innerObj.requestId = this.state.uniqueRandom;
        innerObj.navigationType = "";
        searchObj = {
            facility: facilities,
            searchObj: {
                id: "",
                type: this.props.selectedSearchObj.code,
                values: innerObj
            }
        }
        this.props.handleStateSearchObject(searchObj)
        this.setState({ isSearchClicked: true });
        this.props.handleSearchData(getAuthenticationURL(), searchObj);
    };

    handleSearchDisabled = () => {
        const innerObj = this.state.searchInnerObj;
        var timeProvided = false;
        if (innerObj.endDate && innerObj.startDate && innerObj.timeZone)
            timeProvided = true
        if (this.props.selectedSearchObj) {
            if (this.props.selectedSearchObj.isRequired && Object.keys(innerObj).length > 3 && timeProvided)
                return false
            else if (!this.props.selectedSearchObj.isRequired && Object.keys(innerObj).length > 2 && timeProvided)
                return false
            return true
        }
    }

    render() {
        const { classes, searchArray, selectedSearchObj, searchInitCallFail, licenseInfo, localize, weekStartDay } = this.props;
        const { isSearchClicked, isSearchTableContainerOpen, searchDisabled, dateErr } = this.state;
        return (
            <Paper className={classes.wrapperPaper}>
                {licenseInfo.features && licenseInfo.features.TABULAR_VIEW ?
                    <div>
                        {searchInitCallFail ? null :
                            <div className={classes.searchHeader}>
                                <form className={classes.SearchTableContainer} noValidate autoComplete="off">
                                    <div className={classNames(classes.searchCol, classes.searchSelectField)}>
                                        <FormControl className={classes.formControl}>
                                            <Select
                                                id="SearchType"
                                                select
                                                fullWidth
                                                className={classes.simpleSelect}
                                                selectClassName={classes.simpleSelectDropdown}
                                                value={this.state.type}
                                                onChange={(e) => this.handleTypeChange(e)}
                                                SelectProps={{
                                                    native: true,
                                                    MenuProps: {
                                                        className: classes.menu,
                                                    },
                                                }}
                                            >
                                                {searchArray && searchArray.map((item, id) =>
                                                    <MenuItem key={id} value={item.label}>
                                                        {item.label}
                                                    </MenuItem >
                                                )}
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div className={classNames(classes.searchCol)}>
                                        <div className={classes.searchField}>
                                            <div className={classes.searchFieldInnerRow}>
                                                {
                                                    selectedSearchObj
                                                    &&
                                                    <SpecificHeaderSelector
                                                        selectedSearchObj={selectedSearchObj}
                                                        searchInnerObj={this.state.searchInnerObj}
                                                        handleValueChange={this.handleValueChange}
                                                        errObj={this.state.errObj}
                                                        handleNumberChange={this.handleNumberChange}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <div className={classes.searchField}>
                                            <Button className={classNames({ [classes.raisedButtonDisabled]: true, [classes.raisedButton]: !(searchDisabled || dateErr || this.handleSearchDisabled()) })} disabled={searchDisabled || dateErr || this.handleSearchDisabled()} onClick={this.submitSearch}>
                                                <SearchIcon className={classes.searchIcon} /> <span className={classes.searchText}>{localize('SEARCH_BUTTON')}</span>
                                            </Button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        }
                        <SubheaderFilter
                            selectedSearchObj={selectedSearchObj}
                            searchInnerObj={this.state.searchInnerObj}
                            options={this.state.options}
                            name={this.state.name}
                            open={this.state.open}
                            handleOpen={this.handleOpen}
                            handleClose={this.handleClose}
                            handleDone={this.handleDone}
                            handleChange={this.handleChange}
                            handleCancelClick={this.handleCancelClick}
                            handleTimeInMiliSeconds={this.handleTimeInMiliSeconds}
                            handleSTimeInMiliSec={this.handleSTimeInMiliSec}
                            handleETimeInMiliSec={this.handleETimeInMiliSec}
                            dateErr={this.state.dateErr}
                            localize={localize}
                            weekStartDay={weekStartDay}
                        />
                        {(isSearchTableContainerOpen && isSearchClicked && !(this.props.facilityTable.isSearchErr)) ?
                            <SearchTableContainer /> :
                            (this.props.facilityTable.isSearchErr) ?
                                <div className={classes.noSearchResult}>
                                    <div className={classes.noSearchResultContent}>
                                        <Typography variant="body1" color="inherit" align="center">
                                            <SvgIcon className={classes.errorOutlineIcon} viewBox="0 0 1000.000000 1000.000000">
                                                <ErrorOutline />
                                            </SvgIcon>
                                        </Typography>
                                        {this.props.facilityTable.isSearchErr.split('|').map((val) =>
                                            <Typography className={classNames(classes.tipsContent, classes.serverError)} variant="subheading" align="center">
                                                {val}
                                            </Typography>)}
                                    </div>
                                </div>
                                :
                                <div className={classes.noSearchResult}>
                                {localize &&
                                    <div className={classes.noSearchResultContent}>
                                        <Typography variant="body1" color="inherit" align="center">
                                            <SvgIcon className={classes.lightBulbIcon} viewBox="0 0 1000.000000 1000.000000">
                                                {lightBulbIcon}
                                            </SvgIcon>
                                        </Typography>
                                        <Typography className={classes.tipsContent} variant="subheading" align="center">
                                            {localize('SEARCH_TIP')}
                                        </Typography>
                                    </div>
                                }
                                </div>
                        }
                    </div> : null
                }
                {licenseInfo.features && !licenseInfo.features.TABULAR_VIEW ?
                    <Paper className={classes.serverErrorContainer}>
                        <Typography className={classNames(classes.tipsContent, classes.serverError)} variant="subheading" align="center">
                            This feature is not available.
                        </Typography>
                    </Paper>:null
                }
            </Paper>

        );
    }

}

/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/

const mapStateToProps = state => {
    return {
        auth: state.authentication,
        configuration: state.configuration,
        facilityTable: state.facilityTable,
        searchArray: state.searchReducer.searchArray,
        selectedSearchObj: state.searchReducer.selectedSearchObj,
        searchInitCallFail: state.searchReducer.searchInitCallFail,
        licenseInfo: state.configuration.licenseInfo,
        weekStartDay: state.searchReducer.weekStartDay
    };
};

export default withRouter(connect(mapStateToProps, {
    ...ConfigurationActions,
    ...features,
    ...facilityFeatures,
    ...facilityTableActions,
    ...searchFeatures,
    ...SearchActions,
    updateBreadcrumb
})(withStyles(styles)(embedI18n(Search))));
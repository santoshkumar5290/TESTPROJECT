import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import SubheaderFilter from './SubheaderFilter';
import styles from '../styles';
import SpecificHeaderSelector from './SpecificHeaderSelector';
import { updateBreadcrumb } from '../../../../services/breadcrumb';
import { embedI18n } from '../../../../services/I18nl10n';
import TableContainer from '../../TablesContainer/SMATableContainer';
import { searchFeatures, SearchActions } from '../redux/actions';
// import { tableConfig } from '../redux/tableMockData';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: [],
      options: [],
      searchInnerObj: {},
      open: false,
      componentName: '',
      uniqueId: '',
      systemName: '',
      status: '',
      startDate: '',
      endDate: '',
    };
  }

  componentDidMount() {
    const { getTableData, getTableConfig } = this.props;
    getTableConfig('/api/v1/sma/component/eventLogTableConfig');
    getTableData('/api/v1/sma/component/eventLogData');
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

  handleChange = val => {
    if (val[val.length - 1] === 'doneButton') {
      this.handleDone();
    } else if (val[val.length - 1] === 'cancelButton') {
      this.handleCancelClick();
    }
  };

  handleValue = args => {
    this.setState({ ...args });
  };

  handleDate = (startDate, endDate) => {
    this.setState({ startDate, endDate });
  };

  submitFilter = () => {
    const { componentName, uniqueId, systemName, status, startDate, endDate } = this.state;
    const { getTableData } = this.props;
    getTableData('/api/v1/sma/component/eventLogData', componentName, uniqueId, systemName, status, startDate, endDate);
  };

  handleSearchDisabled = () => {
    const { searchInnerObj } = this.state;
    const { selectedSearchObj } = this.props;
    let timeProvided = false;
    if (searchInnerObj.endDate && searchInnerObj.startDate && searchInnerObj.timeZone) timeProvided = true;
    if (selectedSearchObj) {
      if (selectedSearchObj.isRequired && Object.keys(searchInnerObj).length > 3 && timeProvided) return false;
      if (!selectedSearchObj.isRequired && Object.keys(searchInnerObj).length > 2 && timeProvided) return false;
      return true;
    }
  };

  render() {
    const { classes, searchInitCallFail, filterTable } = this.props;
    const { tableConfig } = filterTable;
    const { searchInnerObj, options, name, open } = this.state;
    const filters = {
      textFilters: [{ title: 'Component Name', name: 'componentName' }, { title: 'Unique ID', name: 'uniqueId' }, { title: 'System Name', name: 'systemName' }, { title: 'Status', name: 'status' }],
      dateFilters: [
        {
          subCondition: [
            {
              code: 'startDate',
              label: 'Start Date',
              placeholders: ['Select Date', 'Select Time'],
              unit: '',
              dataType: 'DATETIME',
              type: 'DATE',
              required: true,
              isVisible: true,
            },
            {
              code: 'endDate',
              label: 'End Date ',
              placeholders: ['Select Date', 'Select Time'],
              unit: '',
              dataType: 'DATETIME',
              type: 'DATE',
              required: true,
              isVisible: true,
            },
            // {
            //   code: 'today',
            //   label: 'Today',
            //   placeholders: [],
            //   unit: '',
            //   dataType: 'STRING',
            //   type: 'BUTTON',
            //   required: true,
            //   isVisible: true,
            // },
            // {
            //   code: 'week',
            //   label: 'This Week',
            //   placeholders: [],
            //   unit: '',
            //   dataType: 'STRING',
            //   type: 'BUTTON',
            //   required: true,
            //   isVisible: true,
            // },
            // {
            //   code: 'month',
            //   label: 'This Month',
            //   placeholders: [],
            //   unit: '',
            //   dataType: 'STRING',
            //   type: 'BUTTON',
            //   required: true,
            //   isVisible: true,
            // },
            {
              code: 'yesterday',
              label: 'Yesterday',
              placeholders: [],
              unit: '',
              dataType: 'STRING',
              type: 'BUTTON',
              required: true,
              isVisible: true,
            },
            {
              code: '7days',
              label: 'Last 7 days',
              placeholders: [],
              unit: '',
              dataType: 'STRING',
              type: 'BUTTON',
              required: true,
              isVisible: true,
            },
            {
              code: '30days',
              label: 'Last 30 days',
              placeholders: [],
              unit: '',
              dataType: 'STRING',
              type: 'BUTTON',
              required: true,
              isVisible: true,
            },
            {
              code: '90days',
              label: 'Last 90 days',
              placeholders: [],
              unit: '',
              dataType: 'STRING',
              type: 'BUTTON',
              required: true,
              isVisible: true,
            },
          ],
        },
      ],
    };
    const filterQuery = filters.textFilters;
    const { componentName, uniqueId, systemName, status, startDate, endDate } = this.state;
    return (
      <Paper className={classes.wrapperPaper}>
        <div>
          {searchInitCallFail ? null : (
            <div className={classes.searchHeader}>
              <form className={classes.SearchTableContainer} noValidate autoComplete="off">
                <div className={classNames(classes.searchCol)}>
                  <div className={classes.searchField}>
                    <div className={classes.searchFieldInnerRow}>{<SpecificHeaderSelector filterQuery={filterQuery} handleValue={this.handleValue} />}</div>
                  </div>
                  <div className={classes.searchField}>
                    <Button
                      className={classNames({
                        [classes.raisedButtonDisabled]: !(componentName || uniqueId || systemName || status || (startDate && endDate)),
                        [classes.raisedButton]: componentName || uniqueId || systemName || status || (startDate && endDate),
                      })}
                      disabled={!(componentName || uniqueId || systemName || status || (startDate && endDate))}
                      onClick={this.submitFilter}
                    >
                      Filter
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}
          <SubheaderFilter
            searchInnerObj={searchInnerObj}
            options={options}
            name={name}
            open={open}
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
            handleDone={this.handleDone}
            handleChange={this.handleChange}
            handleCancelClick={this.handleCancelClick}
            handleDate={this.handleDate}
            filters={filters.dateFilters}
          />
        </div>
        <div>{tableConfig && <TableContainer config={tableConfig} data={filterTable.tableRows} refresh={this.submitFilter} />}</div>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      ...searchFeatures,
      ...SearchActions,
      updateBreadcrumb,
    }
  )(withStyles(styles)(embedI18n(Search)))
);

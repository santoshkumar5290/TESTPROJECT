import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import styles from '../styles';
import StartDateHandler from './StartDateHandler';
import EndDateHandler from './EndDateHandler';
import TEMP from './mock';

class SubheaderFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      anchorE2: null,
      startDate: '',
      endDate: '',
      isStartDate: false,
      isEndDate: false,
    };
  }

  handleSDatePopup = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleEDatePopup = event => {
    this.setState({ anchorE2: event.currentTarget });
  };

  handleStartDate = e => {
    this.setState({ startDate: e.target.value, isStartDate: true });
  };

  handleStartClose = () => {
    this.setState({ anchorEl: null });
  };

  handleEndDate = e => {
    this.setState({ endDate: e.target.value, isEndDate: true });
  };

  handleEndClose = () => {
    this.setState({ anchorE2: null });
  };

  hanldeDateCall = () => {
    const { startDate, endDate, isStartDate, isEndDate } = this.state;
    const { handleDate } = this.props;
    if (isStartDate || isEndDate) {
      handleDate(startDate, endDate);
      this.setState({ isStartDate: false, isEndDate: false });
    }
  };

  handleDateButtons = code => {
    const { handleDate } = this.props;
    const dateObj = new Date();
    let endDate = dateObj.toISOString().slice(0, 10);
    let startDate = dateObj;
    switch (code) {
      case 'today':
        break;
      case 'week':
        startDate.setDate(dateObj.getDate() - (dateObj.getDay() % 7));
        break;
      case 'month':
        startDate.setDate(1);
        break;
      case '7days':
        startDate.setDate(dateObj.getDate() - 6);
        break;
      case 'yesterday':
        startDate.setDate(dateObj.getDate() - 1);
        endDate = startDate.toISOString().slice(0, 10);
        break;
      case '30days':
        startDate.setDate(dateObj.getDate() - 29);
        break;
      case '90days':
        startDate.setDate(dateObj.getDate() - 89);
        break;
      default:
        return;
    }
    startDate = startDate.toISOString().slice(0, 10);
    this.setState({ startDate, endDate });
    handleDate(startDate, endDate);
  };

  handleSwitch = param => {
    const { classes, dateErr } = this.props;
    const { startDate, anchorEl, endDate, anchorE2 } = this.state;
    if (!param.isVisible) return null;
    switch (param.type) {
      case 'DATE':
        if (param.code === 'startDate')
          return (
            <StartDateHandler
              param={param}
              date={startDate}
              handleClick={this.handleSDatePopup}
              anchor={anchorEl}
              handleClose={this.handleStartClose}
              handleDate={this.handleStartDate}
              handleTime={this.handleStartTime}
              displayTime={startDate}
              classes={classes}
            />
          );

        return (
          <EndDateHandler
            param={param}
            date={endDate}
            handleClick={this.handleEDatePopup}
            anchor={anchorE2}
            handleClose={this.handleEndClose}
            handleDate={this.handleEndDate}
            handleTime={this.handleEndTime}
            displayTime={endDate}
            dateErr={dateErr}
            classes={classes}
          />
        );
      case 'BUTTON':
        return (
          <span className={classes.whiteButtonWrapper}>
            <Button className={classes.whiteButton} onClick={() => this.handleDateButtons(param.code)}>
              {param.label}
            </Button>
          </span>
        );
      default:
        break;
    }
  };

  render() {
    const { classes, filters } = this.props;
    const { isStartDate, isEndDate } = this.state;
    return (
      <div className={classes.advancedSearchHeader}>
        <div className={classes.advancedSearchTableContainer}>
          {(isStartDate || isEndDate) && this.hanldeDateCall()}
          {filters && filters[0].subCondition.map(param => this.handleSwitch(param))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SubheaderFilter);

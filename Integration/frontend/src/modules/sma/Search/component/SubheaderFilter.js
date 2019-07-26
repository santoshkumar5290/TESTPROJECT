import React from 'react'
//import  from ''
import { withStyles } from '@material-ui/core/styles'
import IconButton from "@material-ui/core/IconButton"
import Checkbox from "@material-ui/core/Checkbox"
import Clear from '@material-ui/icons/Clear'
import styles from "../styles"
import Button from "@material-ui/core/Button"
import Popover from '@material-ui/core/Popover'
import Grid from '@material-ui/core/Grid'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import StartDateHandler from './StartDateHandler'
import EndDateHandler from './EndDateHandler'
//import 'react-datepicker/dist/react-datepicker.css'

const MONTH = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
}

const WEEK = {
  "Sunday" : 0,
  "Monday" : 1,
  "Tuesday" : 2,
  "Wednesday" : 3,
  "Thursday" : 4,
  "Friday" : 5,
  "Saturday" : 6
}


class SubheaderFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      anchorE2: null,
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      startTimeDisplay: null,
      endTimeDisplay: null
    };
  };

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.searchInnerObj).length === 0) {
      this.setState({
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        startTimeDisplay: null,
        endTimeDisplay: null
      });
    }
  }

  handleSDatePopup = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleEDatePopup = event => {
    this.setState({ anchorE2: event.currentTarget });
  };

  handleStartDate = (e) => {
    this.setState({ startDate: e.target.value })
  };

  handleStartTime = (e) => {
    this.setState({ startTime: e.target.value })
  };

  handleStartClose = () => {
    if (this.state.startDate && this.state.startTime) {
      //const ss = ("0"+(new Date()).getSeconds()).slice(-2);
      //const ms = ("00"+(new Date()).getMilliseconds()).slice(-3);
      var meridiem = "AM", hour = parseInt(this.state.startTime.split(':')[0]),
        min = this.state.startTime.split(':')[1], dd = this.state.startDate.split('-')[2],
        mm = this.state.startDate.split('-')[1], yyyy = this.state.startDate.split('-')[0];
      if (hour >= 12) {
        meridiem = 'PM';
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour.toString().length == 1) ? "0" + hour : hour;
      }
      if (hour.toString().length == 1)
        hour = (hour === 0) ? "00" : "0" + hour;
      const startTimeDisplay = MONTH[mm] + ' ' + dd + ', ' + yyyy + ' ' + hour + ':' + min + ' ' + meridiem;
      const strtDatems = new Date(yyyy, parseInt(mm) - 1, dd, this.state.startTime.split(':')[0], min, "00", "000").getTime();
      this.setState({ anchorEl: null, startTimeDisplay: startTimeDisplay });
      this.props.handleSTimeInMiliSec(strtDatems);
    }
    else {
      this.setState({ anchorEl: null, startTimeDisplay: null });
      this.props.handleSTimeInMiliSec(null);
    }
  };

  handleEndDate = (e) => {
    this.setState({ endDate: e.target.value })
  };

  handleEndTime = (e) => {
    this.setState({ endTime: e.target.value })
  };

  handleEndClose = () => {
    if (this.state.endDate && this.state.endTime) {
      const ss = ("0" + (new Date()).getSeconds()).slice(-2);
      const ms = ("00" + (new Date()).getMilliseconds()).slice(-3);
      var meridiem = "AM", hour = parseInt(this.state.endTime.split(':')[0]),
        min = this.state.endTime.split(':')[1], dd = this.state.endDate.split('-')[2],
        mm = this.state.endDate.split('-')[1], yyyy = this.state.endDate.split('-')[0];
      if (hour >= 12) {
        meridiem = 'PM';
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour.toString().length == 1) ? "0" + hour : hour;
      }
      if (hour.toString().length == 1)
        hour = (hour === 0) ? "00" : "0" + hour;
      const endTimeDisplay = MONTH[mm] + ' ' + dd + ', ' + yyyy + ' ' + hour + ':' + min + ' ' + meridiem;
      const endDatems = new Date(yyyy, parseInt(mm) - 1, dd, this.state.endTime.split(':')[0], min, ss, ms).getTime();
      this.setState({ anchorE2: null, endTimeDisplay: endTimeDisplay });
      this.props.handleETimeInMiliSec(endDatems);
    }
    else {
      this.setState({ anchorE2: null, endTimeDisplay: null });
      this.props.handleETimeInMiliSec(null);
    }
  };

  handleDateButtons = (code) => {
    switch (code) {
      case "today":
        return this.handleToday();
      case "week":
        return this.handleThisWeek();
      case "month":
        return this.handleThisMonth();
    }
  }

  handleToday = () => {
    const dateObj = new Date();
    var date = dateObj.getDate(), month = dateObj.getMonth() + 1, year = dateObj.getFullYear(),
      hh = dateObj.getHours(), mm = (dateObj.getMinutes().toString().length == 1) ? "0" + dateObj.getMinutes() : dateObj.getMinutes(),
      ss = ("0" + dateObj.getSeconds()).slice(-2),
      ms = ("00" + dateObj.getSeconds()).slice(-3),
      meridiem = 'AM';
    date = date < 10 ? '0' + date : date;
    month = month < 10 ? '0' + month : month;
    if ((hh - 12) >= 0) {
      meridiem = 'PM';
      if (hh - 12 > 0)
        hh = hh - 12;
    }
    hh = (hh.toString().length == 1) ? "0" + hh : hh;
    const startTimeDisplay = MONTH[month] + ' ' + date + ', ' + year + ' 00:00 AM';
    const endTimeDisplay = MONTH[month] + ' ' + date + ', ' + year + ` ${hh}:${mm} ${meridiem}`;
    this.setState({
      startTimeDisplay: startTimeDisplay,
      endTimeDisplay: endTimeDisplay,
      startDate: year + '-' + month + '-' + date,
      endDate: year + '-' + month + '-' + date,
      startTime: '00:00',
      endTime: `${dateObj.getHours()}:${mm}`
    })
    const strtDatems = new Date(year, parseInt(month) - 1, date, "00", "00", "00", "001").getTime();
    const endDatems = new Date(year, parseInt(month) - 1, date, `${dateObj.getHours()}`, `${mm}`, `${ss}`, `${ms}`).getTime();
    this.props.handleTimeInMiliSeconds(strtDatems, endDatems)
  };

  handleThisWeek = () => {
    var dateObj = new Date();
    var date1, month1, year1, date2, month2, year2, week_start, week_end,
      hh = dateObj.getHours(), mm = (dateObj.getMinutes().toString().length == 1) ? "0" + dateObj.getMinutes() : dateObj.getMinutes(),
      ss = ("0" + dateObj.getSeconds()).slice(-2),
      ms = ("00" + dateObj.getSeconds()).slice(-3),
      meridiem = 'AM';
    if ((hh - 12) >= 0) {
      meridiem = 'PM';
      if (hh - 12 > 0)
        hh = hh - 12;
    }
    hh = (hh.toString().length == 1) ? "0" + hh : hh;
    // if (dateObj.getDay() === 0)
    //   week_start = dateObj;
    // else
    week_start = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()-(dateObj.getDay()+7-WEEK[this.props.weekStartDay])%7);
    week_end = dateObj;
    date1 = week_start.getDate(), month1 = week_start.getMonth() + 1, year1 = week_start.getFullYear();
    date2 = week_end.getDate(), month2 = week_end.getMonth() + 1, year2 = week_end.getFullYear();
    date1 = date1 < 10 ? '0' + date1 : date1;
    month1 = month1 < 10 ? '0' + month1 : month1;
    date2 = date2 < 10 ? '0' + date2 : date2;
    month2 = month2 < 10 ? '0' + month2 : month2;
    const startTimeDisplay = MONTH[month1] + ' ' + date1 + ', ' + year1 + ' 00:00 AM';
    const endTimeDisplay = MONTH[month2] + ' ' + date2 + ', ' + year2 + ` ${hh}:${mm} ${meridiem}`;
    this.setState({
      startTimeDisplay: startTimeDisplay,
      endTimeDisplay: endTimeDisplay,
      startDate: year1 + '-' + month1 + '-' + date1,
      endDate: year2 + '-' + month2 + '-' + date2,
      startTime: '00:00',
      endTime: `${dateObj.getHours()}:${mm}`
    })
    const strtDatems = new Date(year1, parseInt(month1) - 1, date1, "00", "00", "00", "001").getTime();
    const endDatems = new Date(year2, parseInt(month2) - 1, date2, `${dateObj.getHours()}`, `${mm}`, `${ss}`, `${ms}`).getTime();
    this.props.handleTimeInMiliSeconds(strtDatems, endDatems)
  };

  handleThisMonth = () => {
    var dateObj = new Date();
    var date1, date2, month = dateObj.getMonth() + 1, year = dateObj.getFullYear(), startObj, endObj,
      hh = dateObj.getHours(), mm = (dateObj.getMinutes().toString().length == 1) ? "0" + dateObj.getMinutes() : dateObj.getMinutes(),
      ss = ("0" + dateObj.getSeconds()).slice(-2),
      ms = ("00" + dateObj.getSeconds()).slice(-3),
      meridiem = 'AM';
    if ((hh - 12) >= 0) {
      meridiem = 'PM';
      if (hh - 12 > 0)
        hh = hh - 12;
    }
    hh = (hh.toString().length == 1) ? "0" + hh : hh;
    startObj = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1)
    endObj = dateObj;
    date1 = startObj.getDate();
    date2 = endObj.getDate();
    date1 = date1 < 10 ? '0' + date1 : date1;
    date2 = date2 < 10 ? '0' + date2 : date2;
    month = month < 10 ? '0' + month : month;
    const startTimeDisplay = MONTH[month] + ' ' + date1 + ', ' + year + ' 00:00 AM';
    const endTimeDisplay = MONTH[month] + ' ' + date2 + ', ' + year + ` ${hh}:${mm} ${meridiem}`;
    this.setState({
      startTimeDisplay: startTimeDisplay,
      endTimeDisplay: endTimeDisplay,
      startDate: year + '-' + month + '-' + date1,
      endDate: year + '-' + month + '-' + date2,
      startTime: '00:00',
      endTime: `${dateObj.getHours()}:${mm}`
    })
    const strtDatems = new Date(year, parseInt(month) - 1, date1, '00', '00', '00', '001').getTime();
    const endDatems = new Date(year, parseInt(month) - 1, date2, `${dateObj.getHours()}`, `${mm}`, `${ss}`, `${ms}`).getTime();
    this.props.handleTimeInMiliSeconds(strtDatems, endDatems)
  };



  handleSwitch = (param) => {
    const { classes, options, dropDownState, name, selectedSearchObj, searchInnerObj, open, localize } = this.props;
    if (!param.isVisible)
      return null;
    switch (param.type) {
      case 'DATE':
        if (param.code[0] === "startDate")
          return (
            <StartDateHandler
              param={param}
              date={this.state.startDate}
              time={this.state.startTime}
              handleClick={this.handleSDatePopup}
              anchor={this.state.anchorEl}
              handleClose={this.handleStartClose}
              handleDate={this.handleStartDate}
              handleTime={this.handleStartTime}
              displayTime={this.state.startTimeDisplay} />);
        else
          return (
            <EndDateHandler
              param={param}
              date={this.state.endDate}
              time={this.state.endTime}
              handleClick={this.handleEDatePopup}
              anchor={this.state.anchorE2}
              handleClose={this.handleEndClose}
              handleDate={this.handleEndDate}
              handleTime={this.handleEndTime}
              displayTime={this.state.endTimeDisplay}
              dateErr={this.props.dateErr} />);
      case "BUTTON":
        return (
          <span className={classes.whiteButtonWrapper}>
            <Button className={classes.whiteButton} onClick={(e) => this.handleDateButtons(param.code[0])}>{param.label}</Button>
          </span>
        );
      case "DROPDOWN":
        return (
          <span className={classes.whiteButtonWrapper}>
            <FormGroup className={classes.multipleSelectGroup}>
              <FormControl fullWidth={true} className={classNames(classes.whiteButton, classes.multipleSelectFormControl)}>
                <InputLabel className={classNames(classes.inputLabel)} htmlFor="Facility">{param.label}<KeyboardArrowDown className={classes.rightIcon} /></InputLabel>
                <Select
                  multiple
                  open={open}
                  onOpen={this.props.handleOpen}
                  onClose={this.props.handleClose}
                  fullWidth={true}
                  value={name}
                  className={classNames(classes.multipleSelect)}
                  onChange={(e) => { this.props.handleChange(e.target.value) }}
                  renderValue={selected => selected.join(",") && ''}
                >
                  {
                    (options.length > 0) && options.map(value => (
                      <MenuItem className={classes.formControleListItem} key={value.id} value={value.value}>
                        <Checkbox checked={this.props.name.indexOf(value.value) > -1} />
                        <ListItemText primary={value.value} />
                      </MenuItem>
                    ))
                  }


                  {/* <Button className={classes.raisedButton} size="medium" variant="raised" disabled={name.length == 0} value='doneButton'> Done </Button>
                  <Button className={classNames(classes.flatButton, classes.cancelButton)} variant="flat" value='cancelButton'> CANCEL </Button> */}

                  <Button className={classNames(classes.labelButtonsMargin, { [classes.raisedButtonDisabled]: true, [classes.raisedButton]: !(name.length === 0) })}
                    disabled={name.length === 0} value='doneButton'> {localize('DONE')} </Button>

                  <Button className={classNames(classes.labelButtonsMargin, classes.flatButton)} variant='flat' value='cancelButton'> {localize('CANCEL')} </Button>

                </Select>
              </FormControl>
            </FormGroup>
          </span>
        );
    }
  }

  render() {
    const { classes, selectedSearchObj } = this.props;
    return (
      <div className={classes.advancedSearchHeader}>
        <div className={classes.advancedSearchTableContainer}>
          {selectedSearchObj && selectedSearchObj.params.subCondition.map((param, id) =>
            this.handleSwitch(param)
          )}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(SubheaderFilter);
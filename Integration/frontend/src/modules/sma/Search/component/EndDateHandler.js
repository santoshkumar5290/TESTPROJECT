import React from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles'
import styles from "../styles"
import Button from "@material-ui/core/Button"
import DateRange from '@material-ui/icons/DateRange'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import ErrorOutline from '@material-ui/icons/ErrorOutline'

class EndDateHandler extends React.Component {
  render() {
    const { classes, anchor, handleClose, param, handleClick, handleDate, handleTime, displayTime, date, time, dateErr } = this.props;
    return (
      <span className={classes.whiteButtonWrapper}>
        <Button
          aria-owns={anchor ? 'start-date-time' : null}
          aria-haspopup="true"
          onClick={handleClick}
          className={classes.whiteButton}>
          {displayTime || param.label}<DateRange className={classes.rightIcon} />
        </Button>
        <Menu
          id="start-date-time"
          className={classes.simpleMenu}
          classes={{ "paper": this.props.classes.simpleMenuPaper }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={handleClose}
        >
          <MenuItem>
            <TextField
              type="date"
              onChange={handleDate}
              defaultValue={date}
              className={classes.calendarPickerInput}
            />
          </MenuItem>
          <MenuItem>
            <TextField
              type="time"
              onChange={handleTime}
              defaultValue={time}
              className={classes.calendarPickerInput}
            />
          </MenuItem>
        </Menu>
        <div className={classes.errorContainer}>
          {dateErr ?
            <Paper className={classes.errorPaper} elevation={1}>
              <ErrorOutline /> {param.errorString}
            </Paper> : null}
        </div>
      </span>
    )
  }
}

export default withStyles(styles)(EndDateHandler);
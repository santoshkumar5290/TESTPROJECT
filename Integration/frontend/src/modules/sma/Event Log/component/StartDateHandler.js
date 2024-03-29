import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateRange from '@material-ui/icons/DateRange';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default ({ classes, anchor, handleClose, param, handleClick, handleDate, displayTime, date }) => (
  <span className={classes.whiteButtonWrapper}>
    <Button aria-owns={anchor ? 'start-date-time' : null} aria-haspopup="true" onClick={handleClick} className={classes.whiteButton}>
      {displayTime || param.label}
      <DateRange className={classes.rightIcon} />
    </Button>
    <Menu
      id="start-date-time"
      className={classes.simpleMenu}
      classes={{ paper: classes.simpleMenuPaper }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={handleClose}
    >
      <MenuItem>
        <TextField type="date" onChange={handleDate} defaultValue={date} className={classes.calendarPickerInput} />
      </MenuItem>
    </Menu>
  </span>
);


import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames'

const styles = theme => ({
  // Modal Window CSS
  modalDialogPaper: {
    maxWidth: '600px',
    width: '600px',
    border: { radius: [6, 6] },
  },
  modalDialogHeader: {
    padding: '24px 30px',
    background: theme.palette.grey1Color,
    color: theme.palette.primary2Color,
    width: '100%',
    display: 'table',
    boxSizing: 'border-box',
  },
  modalDialogHeaderCol: {
    display: 'table-cell',
    verticalAlign: 'middle',
    '&:first-child': { width: '36px' },
    '& h6': { color: theme.palette.primary2Color },
  },
  deleteIcon: {
    color: theme.palette.primary2Color,
    width: 'auto',
    height: 'auto',
    padding: 0,
    background: 'transparent',
    '&:hover': { background: 'transparent' },
  },
  closeIcon: {
    color: theme.palette.grey5Color,
    float: 'right',
    width: 'auto',
    height: 'auto',
    padding: 0,
    background: 'transparent',
    '&:hover': { background: 'transparent' },
  },
  modalDialogBody: {
    padding: '30px 30px',
    background: theme.palette.canvasColor,
    '& p': {},
  },
  modalDialogFooter: {
    padding: '0 30px 30px',
    background: theme.palette.canvasColor,
    margin: 0,
    justifyContent: 'flex-start',
    '& button': { margin: [0, 20, 0, 0] },
  },
  raisedButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.primary2Color,
    letterSpacing: 0,
    border: 0,
    borderRadius: '6px',
    marginLeft: '30px',
    padding: [10, 24, 9],
    '&:hover': { background: theme.palette.secondary3Color },
    '& disabled': {
      color: theme.palette.white,
      backgroundColor: theme.palette.primary2Color,
    },
  },
  raisedButtonDisabled: {
    color: '#FFF!important',
    padding: [10, 24, 9],
    letterSpacing: 0,
    backgroundColor: theme.palette.primary1Color,
    border: 0,
    borderRadius: '6px',
  },
  flatButton: {
    backgroundColor: theme.palette.grey1Color,
    letterSpacing: 0,
    border: 0,
    borderRadius: '6px',
    color: theme.palette.textColor,
    padding: [10, 24, 9],
    '&:hover': { background: theme.palette.grey2Color },
  },
});

const AlertDialog = ({ classes, open, Icon, title, contentText, name, handleNameClick, handleCancelClick, handleClose, disableName }) => {
  return (
    <Dialog open={open} classes={{ paper: classes.modalDialogPaper }}>
      <DialogTitle disableTypography className={classes.modalDialogHeader}>
        <div className={classes.modalDialogHeaderCol}>
          <IconButton disableRipple className={classes.deleteIcon}>
            {Icon && <Icon />}
          </IconButton>
        </div>
        <div className={classes.modalDialogHeaderCol}>
          <Typography variant="h6">{title}</Typography>
        </div>
        <div className={classes.modalDialogHeaderCol}>
          <IconButton disableRipple className={classes.closeIcon} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent className={classes.modalDialogBody}>
        <DialogContentText id="alert-dialog-description">{contentText}</DialogContentText>
      </DialogContent>

      <DialogActions className={classes.modalDialogFooter}>
        <Button className={classNames({ [classes.raisedButtonDisabled]: (disableName), [classes.raisedButton]: !(disableName) })} color="primary" onClick={handleNameClick} disabled={disableName}>
          {name}
        </Button>



        <Button className={classes.flatButton} color="primary" autoFocus onClick={handleCancelClick}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(AlertDialog);

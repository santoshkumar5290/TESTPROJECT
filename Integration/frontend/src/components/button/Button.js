import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const styles = theme => ({
  button: {
    margin: [0, theme.spacing.unit],
    letterSpacing: 0,
    '& first-child': { marginLeft: '0' },
    '& last-child': { marginRight: '0' },
    border: 0,
    padding: [theme.spacing.unit * 1, theme.spacing.unit * 2],
    borderRadius: '6px',
  },

  flatButton: {
    backgroundColor: theme.palette.grey1Color,
    color: theme.palette.textColor,
    '&:hover': { background: theme.palette.grey2Color },
  },
  raisedButton: {
    backgroundColor: theme.palette.primary2Color,
    color: theme.palette.white,
    '&:hover': { background: theme.palette.secondary3Color },
  },

  flatButtonDisabled: {
    color: '#FFF!important',
    padding: [theme.spacing.unit * 1, theme.spacing.unit * 2],
    backgroundColor: theme.palette.grey3Color,
    border: 0,
    borderRadius: '6px',
  },
  raisedButtonDisabled: {
    color: '#FFF!important',
    padding: [theme.spacing.unit * 1, theme.spacing.unit * 2],
    backgroundColor: theme.palette.primary1Color,
    border: 0,
    borderRadius: '6px',
  },
  [theme.breakpoints.up('md')]: {
    button: { padding: [theme.spacing.unit * 2, theme.spacing.unit * 3] },
    buttonDisabled: { padding: [theme.spacing.unit * 2, theme.spacing.unit * 3] },
  },
  [theme.breakpoints.down('md')]: {
    button: { padding: [theme.spacing.unit * 1.5, theme.spacing.unit * 3] },
    buttonDisabled: { padding: [theme.spacing.unit * 1.5, theme.spacing.unit * 3] },
  },

  // --SM, XS Up & Down
  [theme.breakpoints.down('sm')]: {},
  [theme.breakpoints.down('xs')]: {},

  // --Media Queris for Height Mentainence.
  '@media screen and ( max-height: 639px )': {
    button: { padding: [theme.spacing.unit * 1.5, theme.spacing.unit * 3] },
    buttonDisabled: { padding: [theme.spacing.unit * 1.5, theme.spacing.unit * 3] },
  },
  '@media screen and ( max-height: 589px )': {
    button: { padding: [theme.spacing.unit * 1, theme.spacing.unit * 2] },
    buttonDisabled: { padding: [theme.spacing.unit * 1, theme.spacing.unit * 2] },
  },
});

const CustomButton = ({ children, classes, variant, className, ...props }) => (
  <Button
    {...props}
    className={classNames(classes.button, variant === 'flat' ? classes.flatButton : classes.raisedButton, className)}
    classes={{ disabled: variant === 'flat' ? classes.flatButtonDisabled : classes.raisedButtonDisabled }}
  >
    {children}
  </Button>
);

CustomButton.propTypes = { variant: PropTypes.oneOf(['flat', 'raised']) };

export default withStyles(styles)(CustomButton);

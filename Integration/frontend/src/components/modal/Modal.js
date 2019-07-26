/** React */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/** MUI */
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

const styles = theme => ({
  dialogPaper: {
    maxWidth: '700px',
    width: '700px',
    border: {
      radius: [6, 6],
    },
  },
  modalWindow: {
    display: 'block',
  },

  // Modal Header JSS
  modalHeader: {
    //padding: '40px 100px',
    background: theme.palette.canvasColor,
    borderBottom: [[1, 'solid', theme.palette.border3Color]],
    '& h2': {
      margin: 0,
      color: theme.palette.textColorDark,
      '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 'calc(50% - 0)',
        backgroundColor: theme.palette.primary2Color,
      },
    },
    '& p': {
      margin: 0,
    },
  },

  // Modal Form JSS
  modalBody: {
    background: theme.palette.canvasColor,
  },

  // Modal Footer JSS
  modalFooter: {
    background: theme.palette.canvasColor,
    borderTop: [[1, 'solid', theme.palette.border3Color]],
  },
  footerContainer: {
    display: 'block',

    '& button': {
      marginLeft: '20px',
    },
    '& button:first-child': {
      marginLeft: '0',
    },
  },
  raisedButtonDisabled: {
    color: '#FFF!important',
    backgroundColor: [`${theme.palette.primary1Color}!important`],
    border: 0,
    borderRadius: '6px',
    padding: '15px 32px 12px',
  },
  raisedButton: {
    backgroundColor: [`${theme.palette.primary2Color}!important`],
    border: 0,
    borderRadius: '6px',
    color: 'white',
    padding: '15px 32px 12px',
    '&:hover': {
      background: [`${theme.palette.secondary3Color}!important`],
    },
  },
  flatButton: {
    backgroundColor: theme.palette.grey1Color,
    border: 0,
    borderRadius: '6px',
    color: theme.palette.textColor,
    padding: '15px 32px 12px',
    '&:hover': {
      background: theme.palette.grey2Color,
    },
  },

  // Media Queries  ---------------------------------------------

  // --LG Up & Down
  [theme.breakpoints.up('lg')]: {
    modalHeader: {
      padding: '32px 80px',
      '& h2': {
        '&:before': {
          height: '45px',
          width: '8px',
        },
      },
    },
    modalBody: {
      padding: '32px 80px',
    },
    modalFooter: {
      padding: '32px 80px',
    },
  },
  [theme.breakpoints.down('lg')]: {
    modalHeader: {
      padding: '24px 64px',
      '& h2': {
        '&:before': {
          height: '35px',
          width: '6px',
        },
      },
    },
    modalBody: {
      padding: '24px 64px',
    },
    modalFooter: {
      padding: '24px 64px',
    },
  },

  // --MD Up & Down
  [theme.breakpoints.up('md')]: {},
  [theme.breakpoints.down('md')]: {},

  // --SM, XS Up & Down
  [theme.breakpoints.down('sm')]: {
    modalHeader: {
      padding: '24px 40px',
      '& h2': {
        '&:before': {
          height: '25px',
          width: '5px',
        },
      },
    },
    modalBody: {
      padding: '24px 40px',
    },
    modalFooter: {
      padding: '24px 40px',
    },
  },
  [theme.breakpoints.down('xs')]: {
    modalHeader: {
      padding: '16px 32px',
    },
    modalBody: {
      padding: '16px 32px',
    },
    modalFooter: {
      padding: '16px 32px',
    },
  },

  // --Media Queris for Height Mentainence.
  '@media screen and ( max-height: 639px )': {
    modalHeader: {
      padding: '24px 40px',
      '& h2': {
        '&:before': {
          height: '25px',
          width: '5px',
        },
      },
    },
    modalBody: {
      padding: '24px 40px',
    },
    modalFooter: {
      padding: '24px 40px',
    },
  },

  '@media screen and ( max-height: 589px )': {
    modalHeader: {
      padding: '16px 32px',
      '& h2': {
        '&:before': {
          height: '25px',
          width: '5px',
        },
      },
    },
    modalBody: {
      padding: '16px 32px',
    },
    modalFooter: {
      padding: '16px 32px',
    },
  },
});

class ModalComponent extends Component {
  static propTypes = {
    cancelAction: PropTypes.func,
    submitAction: PropTypes.func,
    cancelButton: PropTypes.bool.isRequired,
    submitButton: PropTypes.bool.isRequired,
    cancelLabel: PropTypes.string,
    submitLabel: PropTypes.string,
    cancelDisable: PropTypes.bool,
    submitDisable: PropTypes.bool,
    title: PropTypes.string,
    footer: PropTypes.node,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    styles: PropTypes.object,
    children: PropTypes.node,
    titleStyle: PropTypes.object,
    transparent: PropTypes.bool,
  };

  static defaultProps = {
    cancelAction: () => {},
    submitAction: () => {},
    cancelButton: true,
    submitButton: true,
    cancelLabel: 'CANCEL',
    submitLabel: 'SUBMIT',
    cancelDisable: false,
    submitDisable: true,
    title: '',
    onClose: () => {},
    transparent: false,
    styles: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleEnterKey = e => {
    if (e.key === 'Enter') {
      if (!this.props.submitDisable) {
        this.handleSubmit();
      }
    }
  };

  handleSubmit = () => {
    this.props.submitAction();
  };

  handleCancel = () => {
    this.setState({ open: false }, this.props.cancelAction);
  };

  getFooterNode = () => {
    const { classes } = this.props;
    if (this.props.footer) {
      return this.props.footer;
    }
    return (
      <div className={classes.footerContainer}>
        {this.props.submitButton && (
          <Button className={classNames({ [classes.raisedButtonDisabled]: true, [classes.raisedButton]: !this.props.submitDisable })} disabled={this.props.submitDisable} onClick={this.handleSubmit}>
            {this.props.submitLabel}
          </Button>
        )}

        {this.props.cancelButton && (
          <Button variant="flat" color="primary" disabled={this.props.cancelDisable} onClick={this.handleCancel} className={classes.flatButton}>
            {this.props.cancelLabel}
          </Button>
        )}
      </div>
    );
  };

  componentWillMount() {
    this.setState({ open: this.props.open });
  }

  render() {
    const { classes } = this.props;
    // const styles = Object.assign({}, { width:'400px', maxWidth: 'none', height:600 }, this.props.styles)
    const { title, open, onClose, children } = this.props;
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" classes={{ paper: classes.dialogPaper }} disableBackdropClick disableEscapeKeyDown disableRestoreFocus>
        <div className={classes.modalWindow}>
          <header className={classes.modalHeader}>
            <h2>{title}</h2>
          </header>
          <div className={classes.modalBody} onKeyPress={this.handleEnterKey}>
            {children}
          </div>
          <footer className={classes.modalFooter}>{this.getFooterNode()}</footer>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ModalComponent);

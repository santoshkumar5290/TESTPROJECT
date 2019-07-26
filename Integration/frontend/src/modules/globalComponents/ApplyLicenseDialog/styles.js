export const styles = theme => ({
  textField: {
    fontSize: '2.2rem',
    lineHeight: '1.5',
    color: theme.palette.textColor,
    '& input, & select, & div': {
      color: theme.palette.textColor,
    },
    '& label': {
      fontWeight: '500',
    },
  },
  buttonsMargin: {
    marginRight: '20px',
    '&:last-child': {
      marginRight: '0',
    },
  },
  raisedButton: {
    letterSpacing: 0,
    color: theme.palette.white,
    backgroundColor: theme.palette.primary2Color,
    border: 0,
    borderRadius: '6px',
    padding: '15px 32px 12px',
    '&:hover': {
      background: theme.palette.secondary3Color,
    },
  },
  flatButton: {
    letterSpacing: 0,
    backgroundColor: theme.palette.grey1Color,
    border: 0,
    borderRadius: '6px',
    color: theme.palette.textColor,
    padding: '15px 32px 12px',
    marginLeft: '0',
    '&:hover': {
      background: theme.palette.grey2Color,
    },
  },
  alignRight: {
    float: 'right',
  },
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
    padding: '40px 100px',
    background: theme.palette.canvasColor,
    borderBottom: [[1, 'solid', theme.palette.border3Color]],
    '& h2': {
      margin: 0,
      position: 'relative',
      color: theme.palette.textColorDark,
      '&:before': {
        content: '""',
        position: 'absolute',
        left: '-100px',
        top: '0',
        height: '45px',
        width: '8px',
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
    padding: '40px 100px',
    background: theme.palette.canvasColor,
    borderTop: [[1, 'solid', theme.palette.border3Color]],
  },

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

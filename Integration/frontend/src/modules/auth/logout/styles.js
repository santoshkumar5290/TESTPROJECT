const styles = (theme) => ({
  modalContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: {
      image: 'url("images/login_bg_01.png")',
      color: '#029af5',
      repeat: 'no-repeat',
      position: 'center center',
      size: 'cover'
    },
    width: '100%',
    height: '100vh'
  },
  modalWindow: {
    display: 'block',
  },
  modalWrapper: {
    display: 'block',
  },

  // Modal Header JSS
  modalHeader: {
    background: theme.palette.canvasColor,
    borderBottom: [
      [1, 'solid', theme.palette.border3Color]
    ],
    '& h2': {
      margin: 0,
      position: 'relative',
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
      margin: 0
    }
  },

  // Modal Body JSS
  modalBody: {
    padding: '20px 30px',
    background: theme.palette.canvasColor
  },
  modalRow: {
    display: 'block',
    position: 'relative',
    '& label': {
      fontSize: '22px',
      lineHeight: '1'
    },
    '& input': {
      fontSize: '2.6rem',
      lineHeight: '1.5'
    },
    '& p': {
      fontSize: '1.4rem',
      position: 'absolute',
      bottom: '-20px',
      width: '100%',
      '& span': {
        margin: 0,
        padding: 0
      }
    },
    '&:first-child > div, &:first-child > div > div': {
      marginTop: 0,
    },
    //paddingBottom: 10,
    '&:last-child': {
      paddingTop: 10,
      paddingBottom: 10,
    }
  },
  passwordRow: {
    '& input': {
      width: 'calc(100% - 100px)'
    }
  },
  signInRow: {
    paddingBottom: '40px'
  },
  forgotButton: {
    position: 'absolute',
    right: 0,
    bottom: '40px',
    fontSize: '24px',
    lineHeight: '1.5',
    padding: 0,
    boxShadow: 'none',
    letterSpacing: 0,
    textTransform: 'inherit',
    '&:hover': {
      background: 'transparent',
      color: theme.palette.accent3Color
    }
  },
  signInBack_row: {
    textAlign: 'center'
  },
  signBackInButton: {
    textAlign: 'center',
    textTransform: 'inherit',
    color: theme.palette.accent2Color,
    '&:hover': {
      background: 'transparent',
      color: theme.palette.accent3Color
    }
  },
  folderIcon: {
    fill: theme.palette.accent3Color,
    opacity: 0.1,
  },


  // Modal Footer JSS
  modalFooter: {
    background: theme.palette.secondary3Color
  },
  clientLogo: {
    textAlign: 'left',
    color: theme.palette.primary2Color,
    transitionDuration: 300,
    height: '24px',
    color: theme.palette.primary2Color,
    verticalAlign: 'middle',
  },

  navList: {
    display: 'flex',
    flexDirection: 'row',
    float: 'right',
    padding: 0,
  },
  navItem: {
    width: 'auto',
    marginRight: 0,
    textAlign: 'center',
    padding: '3px 30px',
    '&:first-child': {
      paddingLeft: 0
    },
    '&:last-child': {
      borderRight: 0,
      paddingRight: 0
    },
    '& span': {
      color: theme.palette.primary2Color,
      opacity: '0.7',
    },
    '&:hover span': {
      opacity: '1',
    },
    '&:hover': {
      background: 'transparent'
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      right: '0px',
      top: 'calc(50% - 7px);',
      height: '15px',
      borderRight: [1, 'solid', theme.palette.border1Color],
      opacity: '0.2'
    },
    '&:last-child:before': {
      display: 'none'
    }

  },
  navItemText: {
    padding: 0,
    '& h3': {
      color: theme.palette.alternateTextColor,
      position: 'relative',
      opacity: '0.2',
      fontWeight: '300'
    },
    '& h3:hover': {
      opacity: '0.3'
    }

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
        }
      },
    },
    modalBody: {
      padding: '32px 80px',
    },
    modalFooter: {
      padding: '32px 80px'
    },
    folderIcon: {
      fontSize: 124,
    },
  },
  [theme.breakpoints.down('lg')]: {
    modalHeader: {
      padding: '24px 64px',
      '& h2': {
        '&:before': {
          height: '45px',
          width: '8px',
        }
      },
    },
    modalBody: {
      padding: '24px 64px',
    },
    modalFooter: {
      padding: '24px 64px',
    },
    folderIcon: {
      fontSize: 96,
    },
  },

  // --MD Up & Down
  [theme.breakpoints.up('md')]: {
    signInButton: {
      padding: '21px 35px 18px'
    },
    signInButtonDisabled: {
      padding: '21px 35px 18px'
    },
    clientLogo: {
      fontSize: '96px',
    },
  },

  [theme.breakpoints.down('md')]: {
    signInButton: {
      padding: '15px 24px 12px',
    },
    signInButtonDisabled: {
      padding: '15px 24px 12px',
    },
    clientLogo: {
      fontSize: '60px',
    },
  },

  // --SM, XS Up & Down
  [theme.breakpoints.down('sm')]: {
    modalHeader: {
      padding: '24px 40px',
      '& h2': {
        '&:before': {
          height: '25px',
          width: '5px',
        }
      },
    },
    modalBody: {
      padding: '24px 40px',
    },
    modalFooter: {
      padding: '24px 40px',
    },
    clientLogo: {
      fontSize: '48px',
    },
    folderIcon: {
      fontSize: 84,
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
    navItem: {
      padding: '3px 10px',
    },
    folderIcon: {
      fontSize: 84,
    },
  },
  '@media (min-width: 0px) and (max-width: 359px)': {
    modalHeader: {
      '& h2': {
        fontSize: '2.0rem',
      }
    },
    navItem: {
      padding: '3px 7px',
      '& span': {
        fontSize: '13px',
        lineHeight: '2.0rem',
      }
    }
  },



  // --Media Queris for Height Mentainence.
  '@media screen and ( max-height: 639px )': {
    modalHeader: {
      padding: '24px 40px',
      '& h2': {
        '&:before': {
          height: '25px',
          width: '5px',
        }
      },
    },
    modalBody: {
      padding: '24px 40px',
    },
    modalFooter: {
      padding: '24px 40px',
    },
    signInButton: {
      padding: '15px 24px 12px',
    },
    signInButtonDisabled: {
      padding: '15px 24px 12px',
    },
    clientLogo: {
      fontSize: '48px',
    },
    folderIcon: {
      fontSize: 120,
    },
  },
  '@media screen and ( max-height: 589px )': {
    modalHeader: {
      padding: '16px 32px',
      '& h2': {
        '&:before': {
          height: '25px',
          width: '5px',
        }
      },
    },
    modalBody: {
      padding: '16px 32px',
    },
    modalFooter: {
      padding: '16px 32px',
    },
    signInButton: {
      padding: '15px 24px 12px',
    },
    signInButtonDisabled: {
      padding: '15px 24px 12px',
    },
    clientLogo: {
      fontSize: '48px',
    },
    folderIcon: {
      fontSize: 80,
    },
  },






})

export default styles

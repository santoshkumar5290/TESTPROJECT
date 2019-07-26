const ITEM_HEIGHT = 48;

const styles = theme => ({

  headerToolbarContainer: {
    display: 'table',
    width: '100%',
  },
  headerToolbarLeft: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  headerToolbarRight: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  headerRightAlign: {
    display: 'table',
    float: 'right',
  },
  headerLeftAlign: {
    display: 'table',
    float: 'left',
  },
  [theme.breakpoints.down('sm')]: {
    headerToolbar: {
      minHeight: 'auto',
    }
  },
  headerCol: {
    display: 'table-cell',
    verticalAlign: 'middle',
    paddingLeft: '20px',
    paddingRight: '20px',
    '&:first-child': {
      paddingLeft: 0,
    },
    '&:last-child': {
      paddingRight: 0,
    },
  },
  headerInnerCol: {
    display: 'table-cell',
    verticalAlign: 'middle',
    paddingLeft: '20px',
    '&:first-child': {
      paddingLeft: 0,
    }
  },
  headerColFirst: {
    padding: 0,
  },

  //Header Left 
  menuButton: {
    color: theme.palette.primary2Color,
    '& svg': {
      fontSize: '32px'
    }
  },
  menuTitle: {
    color: theme.palette.textColor,
  },

  //Header Right
  updateTitle: {
    color: theme.palette.textColorLight,
    fontSize: '18px',
  },
  forwardIcons: {
    color: theme.palette.textColor,
    '&:hover': {
      color: theme.palette.primary2Color,
    },
    '& svg': {
      fontSize: '36px',
    }
  },

  viewsPaper: {
    borderRadius: '6px',
    overflow: 'hidden',
  },
  viewsButton: {
    borderRadius: 0,
    color: theme.palette.textColor,
    '&:hover': {
      color: theme.palette.primary2Color,
    },
    '&:first-child': {
      borderRight: [[1, 'solid', theme.palette.border1Color]],
    },
    '&:last-child': {
      borderRight: 0,
    }
  },
  viewsButtonActive: {
    color: theme.palette.primary2Color,
  },


  notificationsIcon: {
    color: theme.palette.textColor,
    position: 'relative',
    '&:hover': {
      color: theme.palette.primary2Color,
    },
    '& svg': {
      fontSize: '36px',
    }
  },
  notificationsCount: {
    display: 'block',
    width: '13px',
    height: '13px',
    position: 'absolute',
    right: 10,
    top: 12,
    fontSize: '8px',
    lineHeight: '13px',
    letterSpacing: 0,
    textAlign: 'center',
    borderRadius: '100%',
    background: theme.palette.primary2Color,
    color: theme.palette.alternateTextColor,
    //border: [[1, 'solid', theme.palette.border1Color]]
  },

  // Bread Crumb
  breadCrumbList: {
    display: 'inline',
  },
  breadCrumbItem: {
    display: 'inline-block',
    width: 'auto',
    fontSize: '22px',
    padding: 0,
    '&:last-child': {
      '& a:hover': {
        color: theme.palette.textColor,
        textDecoration: 'none',
      }
    },
    '&:after': {
      content: '"/"',
      margin: ['0', '20px'],
    },
    '&:last-child:after': {
      display: 'none',
    },
    '& a': {
      color: theme.palette.textColor,
      textDecoration: 'none',
    },
  },

  profileAvatar: {
    maxWidth: '250px',
  },

  // iPad View


  [theme.breakpoints.down('md')]: {
    headerCol: {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    updateTitle: {
      display: 'none'
    },

    breadCrumbItem: {
      fontSize: '18px',
      '&:after': {
        margin: ['0', '10px'],
      },
    }

  },



  // Mobile View
  [theme.breakpoints.down('sm')]: {
    breadCrumbList: {
      display: 'none!important',
    },
    profileAvatar: {
      display: 'none!important'
    },

  },

});

export default styles;
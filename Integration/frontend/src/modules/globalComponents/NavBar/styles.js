const drawerWidth = 300
const styles = theme => ({
  root: {
    flexGrow: 1,
    // height: 430,
    zIndex: 1,
    // overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    paddingTop: '24px',
    paddingBottom: '24px',
    background: 'transparent',
    color: 'inherit',
    boxShadow: 'none',

    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 12
  },

  drawerWrapper: {
    background: theme.palette.secondary1Color,
    minHeight: '100vh'
  },

  drawerContent: {
    display: 'block'
  },
  drawerPaper: {
    position: 'relative',
    background: 'transparent',
    height: 'auto',
    overflowY: 'inherit',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.down('lg')]: {
      width: drawerWidth - theme.spacing.unit * 5
    },
    // Fixed Nav styles
    '& $drawerContent': {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      position: 'fixed',
      width: drawerWidth,
      [theme.breakpoints.down('lg')]: {
        width: drawerWidth - theme.spacing.unit * 5
      }
    }
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    background: 'transparent',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),

    // width: 0,

    [theme.breakpoints.up('lg')]: {
      width: theme.spacing.unit * 14
    },
    [theme.breakpoints.down('lg')]: {
      width: theme.spacing.unit * 10
    },

    // [theme.breakpoints.down('sm')]: {
    //   width: 0
    // },

    // Fixed Nav styles
    '& $drawerContent': {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      position: 'fixed',
      [theme.breakpoints.up('lg')]: {
        width: theme.spacing.unit * 14
      },
      [theme.breakpoints.down('lg')]: {
        width: theme.spacing.unit * 10
      }
    },
    '& $navListItemText': {
      display: 'none'
    },
    '& $sickLogo': {
      paddingLeft: '16px',
      paddingRight: '16px',
      '& a': {
        textAlign: 'center'
      },
      '& svg': {
        fontSize: '43px',
        transitionDuration: 300,
        color: theme.palette.primary2Color
      }
    },
    '& $searchForm': {
      display: 'none'
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  navList: {
    display: 'block',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: 'calc(100vh - 97px)'
  },
  navListItem: {
    textTransform: 'uppercase',
    borderBottom: [1, 'solid', theme.palette.secondary1Color],
    background: theme.palette.secondary1Color,
    '&:last-child': {
      borderBottom: 0
    },
    '&:hover': {
      background: theme.palette.secondary2Color
    }
  },
  navListItemIcon: {
    color: theme.palette.alternateTextColor,
    margin: '0 auto',
    verticalAlign: 'middle',
    boxSizing: 'border-box'
  },

  navListItemText: {
    padding: [0, 0, 0, 8],
    '& span': {
      color: theme.palette.white
      // whiteSpace: 'nowrap',
    }
  },
  content: {
    flexGrow: 1,
    background: theme.palette.grey1Color,
    paddingLeft: theme.spacing.unit * 6.25,
    paddingRight: theme.spacing.unit * 6.25,
    boxSizing: 'border-box',
    width: `calc(100% - ${theme.spacing.unit * 22.5}px)`,
    '&$appBarShift': {
      width: `calc(100% - ${drawerWidth + theme.spacing.unit * 12.5}px)`
    }
  },

  // Logo CSS
  sickLogo: {
    padding: [24, 36],
    textAlign: 'left',
    color: theme.palette.primary2Color,
    transitionDuration: 300,
    '& a': {
      textAlign: 'left',
      display: 'block'
    },
    '& svg': {
      fontSize: '96px',
      color: theme.palette.primary2Color,
      fontWeight: 'bold',
      verticalAlign: 'middle',
      transitionDuration: 300,
      height: '48px'
    }
  },



  // Search Bar CSS
  searchBarContainer: {
    display: 'block',
    padding: '24px 36px',
    background: theme.palette.secondary2Color,
    borderBottom: [1, 'solid', theme.palette.secondary2Color]
  },
  searchBar: {
    display: 'table',
    width: '100%'
  },
  searchBarCol: {
    display: 'table-cell',
    verticalAlign: 'middle',
    height: '40px'
  },
  searchIcon: {
    color: theme.palette.primary2Color,
    width: 'auto',
    height: 'auto',
    marginRight: '16px',
    '& svg': {
      fontSize: '32px'
    }
  },
  searchInput: {
    color: theme.palette.primary2Color,
    fontSize: '18px',
    lineHeight: '24px',
    '&:before, &:after': {
      display: 'none'
    },
    '& input[type="text"]': {
      width: '100%'
    }
  },
  searchForm: {
    display: 'table'
  },

  droplistContainer: {
    borderBottom: [1, 'solid', theme.palette.secondary1Color],

    color: theme.palette.white,
    '& a': {
      paddingTop: '12px',
      paddingBottom: '12px',
      textDecoration: 'none',
      borderBottom: [1, 'solid', theme.palette.secondary2Color],
      background: theme.palette.secondary2Color,
      '& span': {
        fontSize: '1.4rem'
      }
    },
    '& a:hover': {
      textDecoration: 'inherit',
      background: theme.palette.secondary1Color
    },
    '& svg': {
      padding: [0, 4]
    }
  },
  expandedItem: {
    background: theme.palette.secondary2Color
  },

  // Expansion Pannel JSS...
  collapsedList: {
    display: 'block',
    '&:hover': {
      background: 'transparent'
    }
  },
  collapsedListList: {
    display: 'block'
  },
  nestedListItem: {
    display: 'block',
    padding: 0
  },
  expandLessIcon: {
    float: 'right'
  },
  expandMoreIcon: {
    float: 'right'
  },
  // Expansion Pannel JSS...




  // Media Queries

  [theme.breakpoints.only('xl')]: {
    searchBarContainer: {
      padding: [24, 36]
    },
    searchIcon: {
      '& svg': {
        fontSize: '32px',
        padding: [0, 4]
      }
    },
    navListItem: {
      padding: [24, 36]
    },
    navListItemIcon: {
      padding: [4, 8],
      marginRight: 0,
      '& svg': {
        fontSize: '24px',
      }
    },

    droplistContainer: {
      '& a': {
        paddingTop: '12px',
        paddingBottom: '12px'
      }
    }
  },

  [theme.breakpoints.only('lg')]: {
    searchBarContainer: {
      padding: [20, 24]
    },
    navListItem: {
      padding: [16, 24]
    },
    navListItemIcon: {
      padding: [2, 6],
      '& svg': {
        fontSize: '20px'
      }
    },
    droplistContainer: {
      '& a': {
        paddingTop: '8px',
        paddingBottom: '8px'
      }
    }
  },

  [theme.breakpoints.only('md')]: {
    searchBarContainer: {
      padding: [16, 24]
    },
    navListItem: {
      padding: [12, 24]
    },
    navListItemIcon: {
      padding: [2, 6],
      '& svg': {
        fontSize: '20px'
      }
    },
    droplistContainer: {
      '& a': {
        paddingTop: '6px',
        paddingBottom: '6px'
      }
    }
  },

  // Modal Screen Shot CSS
  modalDialogPaper: {
    maxWidth: '1200px',
    width: '1200px',
    flex: 'inherit',
    overflow: 'inherit',
    position: 'relative',
    border: {
      radius: [0, 0]
    }
  },

  closeIconButton: {
    padding: '0',
    minWidth: '36px',
    minHeight: '36px',
    background: 'transparent',
    '&:hover': {
      background: 'transparent'
    },
    position: 'absolute',
    right: 0,
    top: '-36px',
    '&:span': {
      width: 'auto'
    }
  },

  closeIcon: {
    color: theme.palette.white,
    fontSize: '36px',
    padding: 0
  },

  // Modal Form JSS
  modalDialogBody: {
    overflow: 'inherit',
    padding: '30px 30px',
    background: theme.palette.grey2Color,
    '& p': {}
  },
  screenShotImageBox: {
    display: 'block'
  },
  screenShotImage: {
    height: '400px',
    background: '#ccc'
  },

  // Modal Footer JSS
  modalDialogFooter: {
    padding: '0 30px 30px',
    background: theme.palette.grey2Color,
    margin: 0,
    justifyContent: 'flex-start',
    '& button': {
      margin: [0, 20, 0, 0]
    }
  },

  raisedButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.primary2Color,
    letterSpacing: 0,
    border: 0,
    borderRadius: '6px',
    marginLeft: '30px',
    padding: [10, 24, 9],
    '&:hover': {
      background: theme.palette.secondary3Color
    },
    '& disabled': {
      color: theme.palette.white,
      backgroundColor: theme.palette.primary2Color
    }
  },

  flatButton: {
    backgroundColor: theme.palette.grey1Color,
    letterSpacing: 0,
    border: 0,
    borderRadius: '6px',
    color: theme.palette.textColor,
    padding: [10, 24, 9],
    '&:hover': {
      background: theme.palette.grey2Color
    }
  },

  // Vertical Media Queries
  '@media screen and ( max-height: 639px )': {
    navListItem: {
      paddingTop: 12,
      paddingBottom: 12
    },
    droplistContainer: {
      '& a': {
        paddingTop: '6px',
        paddingBottom: '6px'
      }
    }
  },
  '@media screen and ( max-height: 589px )': {
    navListItem: {
      paddingTop: 8,
      paddingBottom: 8
    },
    droplistContainer: {
      '& a': {
        paddingTop: '4px',
        paddingBottom: '4px'
      }
    }
  }
})

export default styles

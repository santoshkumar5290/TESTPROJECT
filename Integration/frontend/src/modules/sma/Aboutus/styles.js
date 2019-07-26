const styles = theme => ({
  wrapperPaper: {
    borderRadius: '6px',
    marginBottom: '48px',
  },
  aboutHeaderAppBar: {
    boxShadow: 'none',
    display: 'table',
    //height: '90px',
    width: '100%',
    background: 'transparent',
    //borderBottom: [[1, 'solid', theme.palette.border1Color]]
  },
  aboutHeaderToolbar: {
    display: 'table-row',
  },
  aboutHeaderLeft: {
    display: 'table-cell',
    verticalAlign: 'middle',
    '& p, & h2, & button, & div': {
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    '& h2': {
      color: theme.palette.primary2Color,
      marginRight: '48px',
      lineHeight: '43px',
    },
    '& button': {
      color: theme.palette.primary1Color,
    },
    '& p': {
      color: theme.palette.primary1Color,
    },
  },
  messageBox: {
    display: 'inline',
    verticalAlign: 'middle',
  },
  aboutHeaderRight: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  aboutHeaderTabs: {
  },
  aboutHeaderTabberTab: {
    height: '60px',
    borderRadius: 0,
    letterSpacing: 0,
    '& span': {
      fontSize: '18px',
      display: 'block'
    }
  },


  aboutBanner: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
  },
  bannerCard: {
    display: 'block',
    width: '100%',
    boxShadow: 'inherit',
  },
  bannerCardMedia: {
    display: 'block',
    width: '100%',
    borderRadius: '6px',
    backgroundPosition: '0 0',
    backgroundSize: 'cover'
  },

  aboutContainer: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
  },
  aboutTitle: {
    fontWeight: 'bold',
  },


  // List Style
  aboutList: {},
  aboutListItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  aboutListItemText: {},

  // Table Style
  aboutTable: {},
  aboutTableBody: {},
  aboutTableRow: {},
  aboutTableCell: {
    paddingLeft: 0,
    paddingRight: 0,
    color: theme.palette.textColor,
    border: 0,
    '&:first-child': {
      width: '300px',
    },
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary2Color,
    },
    '& a:hover': {
      textDecoration: 'none',
    }
  },

  alignButton: {
    display: 'table',
    width: '100%',
    height: '100%',


  },
  alignButtonBottom: {
    display: 'table-cell',
    textAlign: 'right',
    verticalAlign: 'bottom',
  },

  raisedButton: {
    backgroundColor: theme.palette.primary2Color,
    border: 0,
    borderRadius: '6px',
    color: 'white',
    padding: '15px 32px 12px',
    '&:hover': {
      background: theme.palette.secondary3Color,
    }
  },
  flatButton: {
    backgroundColor: theme.palette.grey1Color,
    border: 0,
    borderRadius: '6px',
    color: theme.palette.textColor,
    padding: '15px 32px 12px',
    '&:hover': {
      background: theme.palette.grey2Color,
    }
  },




  // Media Queries

  [theme.breakpoints.up('lg')]: {
    aboutHeaderAppBar: {
      padding: [16, 40],
    },
    aboutBanner: {
      padding: [0, 40],
    },
    aboutContainer: {
      padding: [30, 40],
    },
    bannerCardMedia: {
      height: '420px',
    },
    aboutTitle: {
      fontSize: '42px',
    },
  },

  [theme.breakpoints.down('lg')]: {
    aboutHeaderAppBar: {
      padding: [12, 30],
    },
    aboutBanner: {
      padding: [0, 30],
    },
    aboutContainer: {
      padding: [20, 30],
    },
    bannerCardMedia: {
      height: '320px',
    },
    aboutTitle: {
      fontSize: '36px',
    },
  },

  [theme.breakpoints.up('md')]: {
    aboutHeaderLeft: {
      '& h2': {
        fontSize: '22px',
      },
      '& p': {
        fontSize: '18px',
      },
    },    
  },

  /*
  [theme.breakpoints.down('md')]: {
    aboutHeaderAppBar: {
      padding: [8, 20],
    },
    aboutBanner: {
      padding: [0, 20],
    },
    aboutContainer: {
      padding: [20, 20],
    },
    bannerCardMedia: {
      height: '220px',
    },
    aboutTitle: {
      fontSize: '24px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    aboutHeaderAppBar: {
      padding: [8, 20],
    },
    aboutBanner: {
      padding: [0, 20],
    },
  },

  [theme.breakpoints.down('xs')]: {
    bannerCardMedia: {
      height: '160px',
    },
  },

  */





});

export default styles;
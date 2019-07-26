const drawerWidth = 240;

const styles = theme => ({
  wrapperPaper: {
    borderRadius: '6px',
    marginBottom: '48px',
  },
  tableHeader: {
    display: 'table',
    width: '100%',
  },
  tableHeaderPaper: {
    boxShadow: 'none',
    display: 'table',
    padding: [16, 40],
    width: '100%',
    background: 'transparent',
    borderBottom: [[1, 'solid', theme.palette.border1Color]],
  },
  tableHeaderToolbar: {
    display: 'table-row',
  },

  tableHeaderLeft: {
    display: 'table-cell',
    verticalAlign: 'middle',
    '& p, & h2, & button, & div': {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    '& h2': {
      color: theme.palette.primary2Color,
      textTransform: 'uppercase',
      fontSize: '22px',
      fontWeight: '500',
    },
    '& button': {
      color: theme.palette.primary1Color,
    },
    '& p': {
      fontSize: '18px',
      color: theme.palette.primary1Color,
    },
  },
  tableHeaderRight: {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'right',
  },

  tableFooter: {
    display: 'table',
    width: '100%',
  },
  tableFooterToolbar: {
    display: 'table-row',
  },
  tableFooterPaper: {
    boxShadow: 'none',
    display: 'table',
    padding: [16, 40],
    width: '100%',
    background: 'transparent',
    borderBottom: [[1, 'solid', theme.palette.border1Color]],
  },
  tableFooterLeft: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  tableFooterRight: {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'right',
  },

  // Views Button Styules
  viewsPaper: {
    borderRadius: '6px',
    overflow: 'hidden',
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: '20px',
    background: theme.palette.grey1Color,
    border: [1, 'solid', theme.palette.border2Color],
  },
  viewsButton: {
    borderRadius: 0,
    boxSizing: 'border-box',
    color: theme.palette.textColor,
    '&:hover': {
      color: theme.palette.primary2Color,
    },
    '&:first-child': {
      borderRight: [1, 'solid', theme.palette.border2Color],
    },
    '&:last-child': {
      borderRight: 0,
    },
    '&:focus': {
      focus: 'none',
    },
  },
  viewsButtonActive: {
    color: theme.palette.primary2Color,
  },

  // Buttons Style
  raisedButtonDisabled: {
    letterSpacing: 0,
    color: '#FFF!important',
    backgroundColor: theme.palette.primary1Color,
    border: 0,
    borderRadius: '6px',
    padding: '12px 32px',
  },
  raisedButton: {
    letterSpacing: 0,
    color: theme.palette.white,
    backgroundColor: theme.palette.primary2Color,
    border: 0,
    borderRadius: '6px',
    padding: '12px 32px',
    '&:hover': { background: theme.palette.secondary3Color },
  },
  raisedButtonBrowse: {
    letterSpacing: 0,
    padding: '12px 24px',
    margin: 0,
  },
  flatButton: {
    letterSpacing: 0,
    backgroundColor: theme.palette.grey1Color,
    border: 0,
    borderRadius: '6px',
    color: theme.palette.textColor,
    padding: '12px 32px',
    marginLeft: '0',
    '&:hover': { background: theme.palette.grey2Color },
  },

  // Drawer Stylesss..

  root: { display: 'flex' },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  innerDrawer: {
    width: drawerWidth,
    flexShrink: 0,
    maxHeight: 900,
  },
  drawerPaper: {
    // maxHeight: theme.spacing.unit * 120,
    height: '100%',
    overflowY: 'auto',
    width: theme.spacing.unit * 30,
    position: 'inherit',
    background: 'transparent',
    borderRight: [1, 'solid', theme.palette.border2Color],
  },
  innerDrawerPaper: {
    width: drawerWidth,
    position: 'inherit',
    borderRight: [1, 'solid', theme.palette.border1Color],
  },
  toolbar: theme.mixins.toolbar,
  contentContainer: {
    flex: 'auto',
    overflow: 'auto',
    padding: theme.spacing.unit * 5,
    position: 'relative',
  },

  innerDrawerList: {
    padding: 0,
  },
  innerDrawerListItem: {
    position: 'relative',
    padding: [20, 40],
    backgroundColor: [theme.palette.white, '!important'],
    borderBottom: [1, 'solid', theme.palette.grey1Color],
    '&:before': {
      width: '100%',
      backgroundColor: 'transparent',
      borderLeft: [2, 'solid', theme.palette.grey2Color],
      pointerEvents: 'none',
      content: '""',
      height: '100%',
      position: 'absolute',
      left: 0,
      boxSizing: 'border-box',
    },
    '& svg': {
      margin: 0,
      color: theme.palette.textColor,
    },
    '& span': {
      color: theme.palette.textColor,
    },
    '&:hover': {
      backgroundColor: theme.palette.grey1Color,
      '& svg': {
        color: theme.palette.primary2Color,
      },
      '& span': {
        color: theme.palette.primary2Color,
      },
    },
  },
  innerDrawerListItemIcon: {
    marginRight: 0,
    '& svg': {
      fontSize: '30px',
    },
  },

  innerDrawerListItemSelected: {
    position: 'relative',
    backgroundColor: [theme.palette.grey1Color, '!important'],
    borderBottom: [1, 'solid', theme.palette.grey1Color],
    '&:before': {
      width: '100%',
      backgroundColor: 'transparent',
      borderLeft: [2, 'solid', theme.palette.primary2Color],
      pointerEvents: 'none',
      content: '""',
      height: '100%',
      position: 'absolute',
      left: 0,
      boxSizing: 'border-box',
    },
    '& svg': {
      color: theme.palette.primary2Color,
    },
    '& span': {
      color: theme.palette.primary2Color,
    },
  },

  innerDrawerListItemError: {
    position: 'relative',
    backgroundColor: '#f6d2d2!important',
    borderBottom: [1, 'solid', 'theme.palette.grey1Color'],
    '&:before': {
      width: '100%',
      backgroundColor: 'transparent',
      // border: [2, 'solid', '#fe0000'],
      borderRight: [2, 'solid', '#fe0000'],
      borderLeft: [2, 'solid', '#fe0000'],
      pointerEvents: 'none',
      content: '""',
      height: '100%',
      position: 'absolute',
      left: 0,
      boxSizing: 'border-box',
    },
    '& svg': {
      color: '#fe0000',
    },
    '& span': {
      color: '#fe0000',
    },
    '&:hover': {
      backgroundColor: '#f6d2d2',
      '& svg': {
        color: '#fe0000',
      },
      '& span': {
        color: '#fe0000',
      },
    },
  },

  // table Styles

  table: {
    border: [1, 'solid', theme.palette.border1Color],
    '& th, & td': {
      borderBottom: [1, 'solid', theme.palette.border1Color],
      color: theme.palette.textColor,
    },
  },

  expansionPanel: {
    margin: [0, 0, 16, 0],
    // border: [1, 'solid', theme.palette.primary2Color],
    borderRadius: '0!important',
  },
  expansionPanelSummary: {
    minHeight: '64px',
    background: [theme.palette.primary3Color, '!important'],
    '&:focus': {
      background: theme.palette.primary3Color,
    },
    '& h2, & svg': {
      color: theme.palette.white,
    },
  },
  expansionPanelDetails: {
    padding: 0,
    borderTop: [1, 'solid', theme.palette.primary2Color],
    background: theme.palette.primary3Color,
  },
  expansionList: {
    display: 'block',
    width: '100%',
    padding: 0,
  },
  expansionListItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: 24,
    borderBottom: [1, 'solid', theme.palette.primary2Color],
    '&:hover': {
      background: theme.palette.primary2Color,
      '& p': {
        color: theme.palette.white,
      },
    },
    '&:last-child': {
      borderBottom: 0,
    },
  },
  expansionListRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  expansionListCol: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  expansionListText: {
    '& span': {
      color: theme.palette.white,
      marginBottom: '10px',
    },
    '& p': {
      color: theme.palette.primary1Color,
      lineHeight: '1.2',
    },
  },
  expansionListIcons: {
    '& svg': {
      fontSize: '48px',
      color: theme.palette.white,
    },
  },

  hideContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 99999,
  },

  // Config CSS

  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 2}px 0`,
  },

  // Media Queries

  [theme.breakpoints.only('xl')]: {
    innerDrawerListItem: {
      padding: [24, 30],
    },
  },

  [theme.breakpoints.only('lg')]: {
    innerDrawerListItem: {
      padding: [16, 20],
    },
  },

  [theme.breakpoints.only('md')]: {
    innerDrawerListItem: {
      padding: [12, 20],
    },
  },

  // Vertical Media Queries
  '@media screen and ( max-height: 639px )': {
    innerDrawerListItem: {
      paddingTop: 12,
      paddingBottom: 12,
    },
  },
  '@media screen and ( max-height: 589px )': {
    innerDrawerListItem: {
      paddingTop: 8,
      paddingBottom: 8,
    },
  },
});

export default styles;

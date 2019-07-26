const drawerWidth = 270;

export default theme => ({
  configDialogActions: {
    margin: 0,
    justifyContent: 'inherit',
  },

  browseLabel: {
    marginRight: 'auto!important',
    marginBottom: '0px',
  },
  browseButton: {
    borderRadius: 100,
    padding: [11, 30],
  },
  dividerBorder: {
    marginTop: 12,
    backgroundColor: '#949494',
  },

  uploadedImageWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  uploadImage: {
    border: [1, 'solid', theme.palette.grey1Color],
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
    marginRight: theme.spacing.unit * 1.5,
  },
  uploadedImageImg: {
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
  },
  uploadedImagePath: {
    flex: 'auto',
  },



  leftAuto: { marginRight: 'auto!important' },

  leftButton: { marginLeft: '0!important' },
  rightButton: { marginRight: '0!important' },
  formControl: {
    minWidth: '100%',
    paddingBottom: theme.spacing.unit * 5,
  },
  drawer: { display: 'flex' },
  drawerPaper: {
    maxHeight: theme.spacing.unit * 100,
    height: '100%',
    overflowY: 'auto',
    width: drawerWidth,
    position: 'inherit',
    background: 'transparent',
    borderRight: [1, 'solid', theme.palette.border2Color],
  },
  drawerList: { padding: 0 },
  drawerListItemSelected: {
    backgroundColor: theme.palette.grey1Color,
    '& svg': { color: theme.palette.primary2Color },
    '& span': { color: theme.palette.primary2Color },
  },
  drawerListItem: {
    position: 'relative',
    padding: [20, 40],
    borderBottom: [1, 'solid', theme.palette.grey1Color],
    '&:before': {
      width: '100%',
      backgroundColor: 'transparent',
      borderLeft: [3, 'solid', theme.palette.grey2Color],
      pointerEvents: 'none',
      content: '""',
      height: '100%',
      position: 'absolute',
      left: 0,
      boxSizing: 'border-box',
    },
    '&:hover:before': { borderLeft: [3, 'solid', theme.palette.primary2Color] },
    '& span': { color: theme.palette.textColor },
    '&:hover': {
      backgroundColor: theme.palette.grey1Color,
      '& svg': { color: theme.palette.primary2Color },
      '& span': { color: theme.palette.primary2Color },
    },
  },
  drawerListItemCheckbox: {
    padding: 0,
    marginRight: theme.spacing.unit,
  },
  drawerListItemContainer: {
    '& button': { visibility: 'hidden' },
    '&:hover button': { visibility: 'visible' },
  },
  mainContent: {
    padding: [theme.spacing.unit * 4],
    width: '100%',
    flexGrow: 1,
    maxHeight: theme.spacing.unit * 60,
    height: '100%',
    //overflowY: 'auto'
  },

  bottomContent: { display: 'flex' },
  fab: {
    position: 'absolute',
    top: -30,
    left: 36,
    zIndex: '9999',
  },
  button: {
    margin: [0, theme.spacing.unit],
    letterSpacing: 0,
    '& first-child': { marginLeft: '0' },
    '& last-child': { marginRight: '0' },
  },
  raisedButton: {
    backgroundColor: theme.palette.primary2Color,
    border: 0,
    padding: [theme.spacing.unit * 1, theme.spacing.unit * 2],
    borderRadius: '6px',
    color: theme.palette.white,
    letterSpacing: 0,
    '&:hover': { background: theme.palette.secondary3Color },
  },
  raisedButtonDisabled: {
    color: '#FFF!important',
    padding: [theme.spacing.unit * 1, theme.spacing.unit * 2],
    backgroundColor: theme.palette.primary1Color,
    border: 0,
    borderRadius: '6px',
  },
  flatButton: {
    backgroundColor: theme.palette.grey1Color,
    border: 0,
    borderRadius: '6px',
    color: theme.palette.textColor,
    padding: [theme.spacing.unit * 1, theme.spacing.unit * 2],
    '&:hover': { background: theme.palette.grey2Color },
  },
  uploadButton: { marginRight: theme.spacing.unit },

  // nnn ccc
  uploadSystemContainer: {
    padding: [theme.spacing.unit * 12, theme.spacing.unit * 12],
    textAlign: 'center',
    border: [1, 'dashed', theme.palette.border3Color],
    cursor: 'pointer'
  },

  uploadSystemContainerDragActive: {
    border: [2, 'dashed',
      theme.palette.primary1Color],
    cursor: 'pointer'
  },

  uploadSystemIcon: {
    fill: theme.palette.primary2Color,
    fontSize: 84,
  },

  importButton: { marginTop: [theme.spacing.unit * 3] },

  drawerListTabberTab: {
    // minHeight:theme.spacing.unit*40,
    marginBottom: theme.spacing.unit * 3,
  },

  componentsListContainer: { padding: [theme.spacing.unit * 3] },
  componentsListTitle: {
    marginBottom: [theme.spacing.unit * 3],
    color: theme.palette.textColor,
  },
  componentsList: {},
  componentsListItem: {
    borderBottom: [1, 'solid', theme.palette.border2Color],
    padding: [theme.spacing.unit * 2, 0],
  },

  configContent: {
    padding: 0,
    marginTop: -theme.spacing.unit * 8,
    background: theme.palette.white,
    borderRadius: [6, 6, 0, 0]
  },

  configActions: {
    borderTop: [1, 'solid', theme.palette.border2Color],
    margin: 0,
    position: 'relative'
  },


  tooltip: {
    background: theme.palette.secondary2Color,
    borderRadius: '6px',
    '&:after': {
      content: '""',
      width: 0,
      height: 0,
      display: 'inline-block',
      position: 'absolute'
    }
  },
  tooltipPlacementTop: {
    '&:after': {
      left: 'calc(50% - 10px)',
      bottom: '-8px',
      borderLeft: ['10px', 'solid', 'transparent'],
      borderRight: ['10px', 'solid', 'transparent'],
      borderTop: ['10px', 'solid', theme.palette.secondary2Color]
    }
  },
  tooltipPlacementBottom: {
    '&:after': {
      left: 'calc(50% - 10px)',
      top: '-8px',
      borderLeft: ['10px', 'solid', 'transparent'],
      borderRight: ['10px', 'solid', 'transparent'],
      borderBottom: ['10px', 'solid', theme.palette.secondary2Color]
    }
  },
  tooltipPlacementRight: {
    '&:after': {
      top: 'calc(50% - 10px)',
      left: '-8px',
      borderTop: ['10px', 'solid', 'transparent'],
      borderBottom: ['10px', 'solid', 'transparent'],
      borderRight: ['10px', 'solid', theme.palette.secondary2Color]
    }
  },
  tooltipPlacementLeft: {
    '&:after': {
      top: 'calc(50% - 10px)',
      right: '-8px',
      borderTop: ['10px', 'solid', 'transparent'],
      borderBottom: ['10px', 'solid', 'transparent'],
      borderLeft: ['10px', 'solid', theme.palette.secondary2Color]
    }
  },

  browseLabel: {
    margin: 0,
    padding: 0,
  },

  textField: {
    position: 'relative',
    '& p': {
      fontSize: 14,
      position: 'absolute',
      bottom: '-20px',
    }
  },



  // Media Queries  ---------------------------------------------

  [theme.breakpoints.only('xl')]: {
    tooltip: {
      fontSize: '20px',
      padding: [12, 24],
    }
  },
  [theme.breakpoints.only('lg')]: {
    tooltip: {
      fontSize: '18px',
      padding: [12, 20],
    }
  },
  [theme.breakpoints.only('md')]: {
    tooltip: {
      fontSize: '16px',
      padding: [8, 16],
    },
  },

  [theme.breakpoints.between('xs', 'sm')]: {
    tooltip: {
      fontSize: '14px',
      padding: [8, 12],
    },
  },

  // --LG Up & Down
  [theme.breakpoints.up('lg')]: {},
  [theme.breakpoints.down('lg')]: {},

  // --MD Up & Down
  [theme.breakpoints.up('md')]: {
    raisedButton: { padding: [theme.spacing.unit * 2, theme.spacing.unit * 4] },
    flatButton: { padding: [theme.spacing.unit * 2, theme.spacing.unit * 4] },
    raisedButtonDisabled: { padding: [theme.spacing.unit * 2, theme.spacing.unit * 4] },
  },
  [theme.breakpoints.down('md')]: {
    raisedButton: { padding: [theme.spacing.unit * 1.5, theme.spacing.unit * 3] },
    flatButton: { padding: [theme.spacing.unit * 1.5, theme.spacing.unit * 3] },
    raisedButtonDisabled: { padding: [theme.spacing.unit * 1.5, theme.spacing.unit * 3] },
  },

  // --SM, XS Up & Down
  [theme.breakpoints.down('sm')]: {},
  [theme.breakpoints.down('xs')]: {},

  // --Media Queris for Height Mentainence.
  '@media screen and ( max-height: 639px )': {
    tooltip: {
      fontSize: '16px',
      padding: [8, 16],
    },
    raisedButton: { padding: [theme.spacing.unit * 1.5, theme.spacing.unit * 3] },
    flatButton: { padding: [theme.spacing.unit * 1.5, theme.spacing.unit * 3] },
    raisedButtonDisabled: { padding: [theme.spacing.unit * 1.5, theme.spacing.unit * 3] },
  },
  '@media screen and ( max-height: 589px )': {
    tooltip: {
      fontSize: '14px',
      padding: [8, 12],
    },
    raisedButton: { padding: [theme.spacing.unit * 1, theme.spacing.unit * 2] },
    flatButton: { padding: [theme.spacing.unit * 1, theme.spacing.unit * 2] },
    raisedButtonDisabled: { padding: [theme.spacing.unit * 1, theme.spacing.unit * 2] },
  },
});

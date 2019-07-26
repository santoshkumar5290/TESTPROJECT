const styles = theme => ({
  //Delete & Edit icon of Note
  systemConfigFabButton: {
    boxShadow: 'inherit',
    background: 'transparent',
    fontSize: '2rem',
    color: theme.palette.accent2Color,
    textTransform: 'inherit',
    letterSpacing: 'inherit',
    padding: 0,
    margin: 0,
    '&:hover': {
      background: 'transparent',
      color: theme.palette.accent3Color,
    },
    '& svg': { marginRight: theme.spacing.unit },
  },
  //for textField in +Add Note popUp
  textField: {
    width: '100%',
  },
  // Facilit Table Header CSS Starts here...
  tableHeaderPaper: {
    boxShadow: 'none',
    display: 'table',
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
      marginRight: '18px',
      '&:last-child': {
        marginRight: 0,
      },
    },
    '& button': {
      color: theme.palette.primary1Color,
    },
    '& p': {
      color: theme.palette.primary1Color,
    },
  },

  routeErrorContainer: {
    minHeight: '800px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  messageBox: {
    display: 'inline',
    verticalAlign: 'middle',
    paddingLeft: '20px',
  },
  tableHeaderRight: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  tableHeaderTabs: {},
  tableHeaderTabberTab: {
    height: '60px',
    borderRadius: 0,
    letterSpacing: 0,
    '& span': {
      fontSize: '18px',
      display: 'block',
    },
  },
  // Facility Table Sub Header CSS starts here...
  tableSubHeader: {
    display: 'block',
    boxShadow: 'none',
    background: 'transparent',
    '& h2, & p': {
      color: '0084c2',
    },
  },
  subHeaderToolbar: {
    display: 'block',
    height: '60px',
  },
  subHeaderRight: {
    float: 'right',
  },
  subHeaderRightCol: {
    display: 'table-cell',
    verticalAlign: 'middle',
    '& input[type="text"]': {
      fontSize: '16px',
    },
  },

  dropBox: {
    minWidth: '194px',
  },
  selectedDropDown: {
    width: '100%',
  },
  editIcon: {
    color: theme.palette.textColor,
    marginLeft: '12px',
    width: 'auto',
    height: 'auto',
    '&:hover': {
      color: theme.palette.accent2Color,
      background: 'transparent',
    },
  },
  clearIcon: {
    color: theme.palette.textColor,
    width: 'auto',
    height: 'auto',
    '&:hover': {
      color: theme.palette.accent2Color,
      background: 'transparent',
    },
  },
  searchIcon: {
    color: theme.palette.textColor,
    width: 'auto',
    height: 'auto',
    padding: 0,
    '& svg': {
      fontSize: '32px',
    },
    '&:hover': {
      color: theme.palette.accent2Color,
      background: 'transparent',
    },
  },
  downloadIcon: {
    color: theme.palette.textColor,
    width: 'auto',
    marginLeft: '-66px',
    height: 'auto',
    '& svg': {
      fontSize: '32px',
    },
    '&:hover': {
      color: theme.palette.accent2Color,
      background: 'transparent',
    },
  },

  // Facility Table Body CSS starts here...
  tableWrapper: {
    display: 'block',
    '& .chartBox': {
      padding: 0,
    },
  },
  titleBox: {
    display: 'table',
    width: '100%',
    height: '100%',
  },
  rowTitle: {
    verticalAlign: 'middle',
    display: 'table-cell',
    '& label': {
      margin: 0,
    },
    '& span': {
      fontSize: 'inherit',
      fontWeight: 'bold',
      width: 'auto',
      height: 'auto',
      '& svg': {
        marginRight: '12px',
      },
    },
  },
  checkBoxWrap: {
    display: 'block',
    '& label': {
      margin: 0,
      width: '100%',
    },
    '& span': {
      fontSize: 'inherit',
      width: 'auto',
      height: 'auto',
      '& svg': {
        marginRight: '12px',
      },
    },
    '& span:last-child': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  sortingIconButtons: {
    verticalAlign: 'middle',
    display: 'table-cell',
  },
  sortIconButton: {
    float: 'right',
    position: 'static',
    width: 'auto',
    height: 'auto',
    '&:hover': {
      background: 'transparent',
    },
    '& span + span': {
      opacity: '0',
    },
    '&:hover svg': {
      fill: theme.palette.accent2Color,
    },
  },
  expandIconButton: {
    padding: 0,
    position: 'absolute',
    right: '-2px',
    bottom: '-2px',
    width: 'auto',
    height: 'auto',
    '& svg': {
      fontSize: '14px',
      lineHeight: '14px',
    },
  },
  hostMessage: {
    wordBreak: 'break-all',
  },
  // IE 11 Hack
  '@media all and (-ms-high-contrast:none)': {
    expandIconButton: {
      //bottom: '-15px',
    },
  },
  // IE 11 Hack

  healthStateContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  healthStateIcon: {
    alignSelf: 'center',
    '& svg': {
      fontSize: '16px',
      lineHeight: '1.1',
      //verticalAlign: 'middle',
      marginRight: '8px',
    },
  },

  healthStateText: {
    alignSelf: 'center',
  },
  truncation: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  expandColWrap: {
    display: 'table',
    width: '100%',
  },
  expandText: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  expandIcon: {
    display: 'table-cell',
    float: 'right',
    width: 'auto',
    height: 'auto',
    '&:hover': {
      background: 'transparent',
    },
    '& svg': {
      fill: theme.palette.accent2Color,
    },
    '&:hover svg': {
      fill: theme.palette.primary2Color,
    },
  },

  formControl: {
    margin: 0,
    width: '100%',
  },
  formControlSelect: {
    color: theme.palette.textColor,
    fontSize: 'inherit',
    '&:before, &:after': {
      display: 'none',
    },
    '& MenuItem': {
      fontSize: 'inherit',
    },
  },
  selectMenu: {
    background: 'transparent !important',
  },
  linkIcon: {
    color: theme.palette.primary3Color,
    '& a': {
      color: theme.palette.primary3Color,
    },
  },
  facilitiesContainer: {
    display: 'table',
    width: '100%',
  },
  facilitiesDesc: {
    display: 'table-cell',
    width: '80%',
    paddingRight: '20px',
    whiteSpace: 'wrap',
  },
  facilitiesButtons: {
    display: 'table-cell',
    width: '20%',
    textAlign: 'right',
    paddingLeft: '20px',
  },
  moreLink: {
    padding: '0px',
  },
  morePopover: {
    margin: 0,
    padding: 0,
    overflowY: 'auto',
  },
  morePopoverPaper: {
    width: '300px',
    overflow: 'inherit',
    '&:after': {
      content: '""',
      display: 'block',
      width: 0,
      height: 0,
      position: 'absolute',
      // left: 'calc(50% - 10px)',
      right: '20px',
      borderLeft: [10, 'solid', 'transparent'],
      borderRight: [10, 'solid', 'transparent'],
      top: '-8px',
      borderBottom: [8, 'solid', theme.palette.white],
    },
  },

  editDeleteButtons: {
    display: 'block',
    textAlign: 'right',
    '& button': {
      width: 'auto',
      height: 'auto',
      padding: 0,
      '&:hover': {
        background: 'transparent',
      },
      '&:last-child': {
        marginLeft: '20px;',
      },
    },
  },

  tooltip: {
    background: theme.palette.secondary2Color,
    borderRadius: '6px',
    '&:after': {
      content: '""',
      width: 0,
      height: 0,
      display: 'inline-block',
      position: 'absolute',
    },
  },
  tooltipPlacementTop: {
    '&:after': {
      left: 'calc(50% - 10px)',
      bottom: '-8px',
      borderLeft: ['10px', 'solid', 'transparent'],
      borderRight: ['10px', 'solid', 'transparent'],
      borderTop: ['10px', 'solid', theme.palette.secondary2Color],
    },
  },
  tooltipPlacementBottom: {
    '&:after': {
      left: 'calc(50% - 10px)',
      top: '-8px',
      borderLeft: ['10px', 'solid', 'transparent'],
      borderRight: ['10px', 'solid', 'transparent'],
      borderBottom: ['10px', 'solid', theme.palette.secondary2Color],
    },
  },
  tooltipPlacementRight: {
    '&:after': {
      top: 'calc(50% - 10px)',
      left: '-8px',
      borderTop: ['10px', 'solid', 'transparent'],
      borderBottom: ['10px', 'solid', 'transparent'],
      borderRight: ['10px', 'solid', theme.palette.secondary2Color],
    },
  },
  tooltipPlacementLeft: {
    '&:after': {
      top: 'calc(50% - 10px)',
      right: '-8px',
      borderTop: ['10px', 'solid', 'transparent'],
      borderBottom: ['10px', 'solid', 'transparent'],
      borderLeft: ['10px', 'solid', theme.palette.secondary2Color],
    },
  },

  // Modal Window CSS

  modalDialogPaper: {
    maxWidth: '460px',
    width: '460px',
    border: {
      radius: [6, 6],
    },
  },

  modalDialogHeader: {
    padding: '24px 30px',
    background: theme.palette.grey1Color,
    '& h2': {
      color: theme.palette.primary2Color,
      display: 'table',
      width: '100%',
    },
  },
  modalDialogHeaderCol: {
    display: 'table-cell',
    verticalAlign: 'middle',
    '&:first-child': {
      width: '36px',
    },
  },

  deleteIcon: {
    color: theme.palette.primary2Color,
    width: 'auto',
    height: 'auto',
    padding: 0,
    background: 'transparent',
    '&:hover': {
      background: 'transparent',
    },
  },
  closeIcon: {
    color: theme.palette.grey5Color,
    float: 'right',
    width: 'auto',
    height: 'auto',
    padding: 0,
    background: 'transparent',
    '&:hover': {
      background: 'transparent',
    },
  },

  modalCardMedia: {
    height: '250px',
    backgroundSize: '100%',
    // paddingTop: '100%',
    position: 'relative',
    backgroundColor: theme.palette.primary2Color,
  },
  mediaCloseIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: '999',
    fontSize: '36px',
    color: theme.palette.white,
    opacity: '0.5',
    '&:hover': {
      background: 'transparent',
      opacity: '1',
    },
  },
  mediaBrowseMsg: {
    color: theme.palette.white,
    // textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 30px',
    fontSize: '14px',
  },
  mediaStatusUid: {
    position: 'absolute',
    bottom: 0,
    padding: '20px 30px',
    zIndex: '1',
    color: theme.palette.white,
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
    '& span': {
      flex: 'auto',
      '&:last-child': {
        textAlign: 'right',
      },
    },
  },
  dataSize: {
    float: 'right',
    fontSize: '13px',
    fontWeight: 'normal',
    color: theme.palette.textColor,
  },

  infoValueDescp: {
    whiteSpace: 'pre-wrap',
  },
  eventList: {
    whiteSpace: 'pre-wrap',
  },

  // Modal Form JSS
  modalDialogBody: {
    padding: '30px 30px',
    background: theme.palette.canvasColor,
    '& p': {},
  },

  // Modal Footer JSS
  modalDialogFooter: {
    padding: '0 30px 30px',
    background: theme.palette.canvasColor,
    margin: 0,
    justifyContent: 'flex-start',
    '& button': {
      margin: [0, 20, 0, 0],
    },
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
      background: theme.palette.secondary3Color,
    },
    '& disabled': {
      color: theme.palette.white,
      backgroundColor: theme.palette.primary2Color,
    },
  },

  flatButton: {
    backgroundColor: theme.palette.grey1Color,
    letterSpacing: 0,
    border: 0,
    borderRadius: '6px',
    color: theme.palette.textColor,
    padding: [10, 24, 9],
    '&:hover': {
      background: theme.palette.grey2Color,
    },
  },

  // Facility List Table CSS starts here..

  wrapperPaper: {
    borderRadius: '6px',
    marginBottom: '48px',
  },
  modalEdit: {},
  modalEditPaper: {
    width: '700px',
    borderRadius: '6px',
  },
  modalEditHeader: {
    '& h2': {
      fontSize: '24px',
    },
    borderBottom: [[1, 'solid', theme.palette.grey2Color]],
  },
  modalEditContent: {
    padding: '0',
    margin: '0',
  },
  modalEditFooter: {},
  // FacilitySummaryTableContainer
  routeError: {
    color: '#FF0000',
    fontSize: '22px',
  },

  fabButtons: {
    display: 'inline',

    '& button': {
      width: 'auto',
      height: 'auto',
      minWidth: '20px',
      minHeight: '20px',
      background: 'transparent',
      boxShadow: 'none',
      marginLeft: theme.spacing.unit * 2,
      color: theme.palette.grey5Color,
    },
    '&:hover button': {
      background: 'transparent',
      boxShadow: 'none',
    },
    '& button:hover': {
      color: theme.palette.grey5Color,
    },
    '&:hover button:hover': {
      color: theme.palette.primary2Color,
    },
    '& svg': {
      fontSize: '2rem',
    },
  },
  notes: {
    '& $fabButtons': {
      display: 'none',
    },
    '&:hover $fabButtons': {
      display: 'inline-block',
    },
  },

  // Media Queries
  [theme.breakpoints.only('xl')]: {
    tableHeaderPaper: {
      padding: [24, 40],
    },
    tableHeaderLeft: {
      '& h2': {
        fontSize: '2.4rem',
      },
    },
    tooltip: {
      fontSize: '20px',
      padding: [12, 24],
    },
  },
  [theme.breakpoints.only('lg')]: {
    tableHeaderPaper: {
      padding: [16, 30],
    },
    tooltip: {
      fontSize: '18px',
      padding: [12, 20],
    },
  },
  [theme.breakpoints.only('md')]: {
    tableHeaderPaper: {
      padding: [12, 20],
    },
    tooltip: {
      fontSize: '16px',
      padding: [8, 16],
    },

    raisedButton: {
      padding: [10, 12, 9],
      marginLeft: '10px',
    },
    flatButton: {
      padding: [10, 12, 9],
    },
  },

  [theme.breakpoints.between('xs', 'sm')]: {
    tableHeaderPaper: {
      padding: [12, 20],
    },
    tooltip: {
      fontSize: '14px',
      padding: [8, 12],
    },
    raisedButton: {
      padding: [10, 12, 9],
      marginLeft: '10px',
    },
    flatButton: {
      padding: [10, 12, 9],
    },
  },
  // Media Queries
  '@media screen and ( max-height: 639px )': {
    tooltip: {
      fontSize: '16px',
      padding: [8, 16],
    },
  },

  '@media screen and ( max-height: 589px )': {
    tooltip: {
      fontSize: '14px',
      padding: [8, 12],
    },
  },
});

export default styles;

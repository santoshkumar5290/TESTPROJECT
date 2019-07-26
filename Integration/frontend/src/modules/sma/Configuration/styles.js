export default theme => ({
  tableHeaderPaper: {
    boxShadow: 'none',
    display: 'table',
    padding: [16, 40],
    width: '100%',
    background: 'transparent',
    borderBottom: [[1, 'solid', theme.palette.border1Color]],
  },

  dataSource: {
    width: "110px",
    height: "25px",
    float: "right",
    margin: "10px"
  },

  // Media Queries
  [theme.breakpoints.only('xl')]: { tableHeaderPaper: { padding: [24, 40] } },
  [theme.breakpoints.only('lg')]: { tableHeaderPaper: { padding: [16, 30] } },
  [theme.breakpoints.only('md')]: { tableHeaderPaper: { padding: [12, 20] } },

  [theme.breakpoints.between('xs', 'sm')]: { tableHeaderPaper: { padding: [12, 20] } },
  // Media Queries

  tableHeaderToolbar: { display: 'table-row' },
  tableHeaderBlock: {
    display: 'table-cell',
    verticalAlign: 'middle',
    '& p, & h2': {
      display: 'inline',
      color: theme.palette.primary2Color,
    },
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
    },
    '& button': { color: theme.palette.primary1Color },
    '& p': {
      fontSize: '18px',
      color: theme.palette.primary1Color,
    },
  },
  tableHeaderRight: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  configDialogTitle: { padding: [0, 0, theme.spacing.unit * 3, 0] },
  configDialogContents: {
    padding: 0,
    overflow: 'inherit',
  },
  configDialogActions: {
    margin: 0,
    justifyContent: 'inherit',
    '& button': {
      marginLeft: 0,
    }
  },
  formControl: {
    minWidth: '100%',
    paddingBottom: theme.spacing.unit * 3,
  },
  rightContentTitle: {
    color: theme.palette.textColor,
    fontWeight: '400',
  },
  setupButton: {
    backgroundColor: theme.palette.primary2Color,
    border: 0,
    margin: 0,
    padding: [theme.spacing.unit * 1, theme.spacing.unit * 2],
    borderRadius: '6px',
    color: theme.palette.white,
    letterSpacing: 0,
    '&:hover': { background: theme.palette.secondary3Color },
  },
  setupButtonDisabled: {
    color: '#FFF!important',
    padding: [theme.spacing.unit * 1, theme.spacing.unit * 2],
    backgroundColor: theme.palette.primary1Color,
    border: 0,
    margin: 0,
    borderRadius: '6px',
  },

  // Greeting Content CSS
  greetingFabIconRow: { marginBottom: theme.spacing.unit * 3 },
  greetingFabButton: {
    background: {
      image: 'url("images/blue_stars.png")',
      color: theme.palette.white,
      repeat: 'no-repeat',
      position: 'center center',
      size: 'auto',
    },
    cursor: 'inherit',
    width: '100px',
    height: '100px',
    marginTop: '-66px',
    position: 'relative',
    '& svg': {
      fontSize: '48px',
      fill: theme.palette.primary2Color,
    },
    '&:hover': {
      background: {
        image: 'url("images/blue_stars.png")',
        color: theme.palette.white,
        repeat: 'no-repeat',
        position: 'center center',
        size: 'auto',
      },
    },
    '&:before': {
      position: 'absolute',
      left: '-15px',
      top: '-15px',
      content: '""',
      width: '130px',
      height: '130px',
      borderRadius: '100%',
      background: 'transparent',
      border: [1, 'solid', theme.palette.white],
      opacity: '0.5',
    },
  },
  greetingTitle: { color: theme.palette.primary2Color },

  raisedButtonDisabled: {
    color: '#FFF!important',
    backgroundColor: [`${theme.palette.primary1Color}!important`],
    border: 0,
    borderRadius: '6px',
    padding: [10, 24, 9],
  },

  raisedButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.primary2Color,
    letterSpacing: 0,
    border: 0,
    borderRadius: '6px',
    marginLeft: '30px',
    padding: [10, 24, 9],
    '&:hover': { background: theme.palette.secondary3Color },
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
    '&:hover': { background: theme.palette.grey2Color },
  },

  configContent: {
    padding: 0,
    background: theme.palette.white,
    borderRadius: [6, 6, 0, 0],
  },

  configActions: {
    borderTop: [1, 'solid', theme.palette.border2Color],
    margin: 0,
    position: 'relative',
    padding: [theme.spacing.unit * 2, theme.spacing.unit * 5],
  },

  contentContainer: { padding: '40px' },

  uploadBox: {
    display: 'flex',
  },
  flexAutoBox: {
    flex: 'auto',
  },
  uploadLink: {
    margin: 0,
    padding: 0,
    fontSize: '16px',
    fontWeight: 'bold',
    color: theme.palette.primary2Color,
    '& svg': {
      color: theme.palette.primary2Color,
      verticalAlign: 'middle',
      marginRight: theme.spacing.unit,
    },
    '& input': {
      color: theme.palette.primary2Color,
    }
  },
  uploadCheck: {
    margin: 0,
    padding: 0,
    fontSize: '16px',
    fontWeight: 'bold',
    '& input': {
      width: 'auto',
      height: 'auto',
    },

  },
  checkBox: {
    display: 'inline-block',
    width: 'auto',
    height: 'auto',
    margin: 0,
    padding: 0,
    marginRight: theme.spacing.unit,
  },

  // Media Queries  ---------------------------------------------

  // --LG Up & Down
  [theme.breakpoints.up('lg')]: {},
  [theme.breakpoints.down('lg')]: {},

  // --MD Up & Down
  [theme.breakpoints.up('md')]: {
    setupButton: { padding: [theme.spacing.unit * 2, theme.spacing.unit * 4] },
    setupButtonDisabled: { padding: [theme.spacing.unit * 2, theme.spacing.unit * 4] },
  },
  [theme.breakpoints.down('md')]: {
    setupButton: { padding: [theme.spacing.unit * 1.5, theme.spacing.unit * 3] },
    setupButtonDisabled: { padding: [theme.spacing.unit * 1.5, theme.spacing.unit * 3] },
  },

  // --SM, XS Up & Down
  [theme.breakpoints.down('sm')]: {},
  [theme.breakpoints.down('xs')]: {},

  // --Media Queris for Height Mentainence.
  '@media screen and ( max-height: 639px )': {
    setupButton: { padding: [theme.spacing.unit * 1.5, theme.spacing.unit * 3] },
    setupButtonDisabled: { padding: [theme.spacing.unit * 1.5, theme.spacing.unit * 3] },
  },
  '@media screen and ( max-height: 589px )': {
    setupButton: { padding: [theme.spacing.unit * 1, theme.spacing.unit * 2] },
    setupButtonDisabled: { padding: [theme.spacing.unit * 1, theme.spacing.unit * 2] },
  },
});

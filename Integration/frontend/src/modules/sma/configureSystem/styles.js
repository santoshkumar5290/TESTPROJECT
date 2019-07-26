const styles = theme => ({
  root: {
    height: '200px',
    width: '45px',
    paddingTop: '',
    paddingBottom: '3px',
    float: 'left',
    margin: '8px',
  },
  paperWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  paperHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  paperHeaderCol: {
    '&:last-child': {
      paddingLeft: 0,
      flex: 'auto',
    },
  },
  paperBody: { padding: '20px 30px' },
  configIcon: { color: theme.palette.primary2Color },
  configCaption: { color: theme.palette.textColorLight },
  paperLinks: { display: 'block' },
  buttonLink: {
    textAlign: 'left',
    minHeight: 'auto',
    marginBottom: '12px',
    display: 'block',
    letterSpacing: '1px',
    color: theme.palette.accent2Color,
    padding: 0,
    '&:hover': { background: 'transparent' },
    '& span': {
      textAlign: 'left',
      display: 'inline',
    },
    '&:last-child': { marginBottom: '0' },
  },
  mainContainer: {
    width: '100%',
    boxSizing: 'border-box',
    paddingBottom: '40px',
  },

  // Inner Pages
  wrapperPaper: {
    borderRadius: '6px',
    marginBottom: '48px',
  },
  wrapperContainer: { padding: [40] },

  tableHeaderPaper: {
    boxShadow: 'none',
    display: 'table',
    padding: [16, 40],
    width: '100%',
    background: 'transparent',
    borderBottom: [[1, 'solid', theme.palette.border1Color]],
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

  formGroupScroll: {
    height: '460px',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  spclHeight: { height: '260px' },

  hintIcon: { color: theme.palette.primary1Color },
  hintText: { color: theme.palette.primary1Color },

  formGroup: {
    display: 'block',
    boxSizing: 'border-box',
    minWidth: '500px',
  },
  formGroupContainer: { paddingRight: '20px' },
  formRow: {
    display: 'block',
    boxSizing: 'border-box',
    position: 'relative',
    //paddingBottom: '24px',
    '& p': {
      fontSize: '1.8rem',
      position: 'absolute',
      bottom: '-30px',
      width: '100%',
    },
    '&:first-child > div': { marginTop: 0 },
    '&:last-child': { paddingBottom: 0 },
  },

  textField: {
    fontSize: '2.2rem',
    lineHeight: '1.5',
    color: theme.palette.textColor,
    '& input, & select, & div': { color: theme.palette.textColor },
    '& label': { fontWeight: '500' },
  },

  sliderContainer: { display: 'block' },
  sliderTitle: {
    fontSize: '2rem',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  sliderRange: {
    display: 'block',
    '& > div': {
      marginLeft: '10px',
      marginRight: '10px',
    },
  },

  warningMessage: {
    color: '#FF0000',
    paddingLeft: '10px',
    paddingRight: '10px',
    marginTop: '20px',
    '& svg': {
      verticalAlign: 'middle',
      color: '#FF0000',
      marginRight: '10px',
    },
  },

  textFieldNumber: {
    fontSize: '2.0rem',
    lineHeight: '1.5',
    color: theme.palette.textColor,
    backgroundColor: theme.palette.border1Color,
    border: [1, 'solid', theme.palette.border2Color],
    paddingLeft: '10px',
    paddingRight: '10px',
    borderRadius: '6px',
    boxSizing: 'border-box',
    verticalAlign: 'middle',
    marginTop: '5px',
    '& input': {
      height: 'auto',
      color: theme.palette.textColor,
    },
    '& svg': { color: theme.palette.primary2Color },
    '& select': {
      height: 'auto',
      paddingTop: '10px',
      paddingBottom: '9px',
      color: theme.palette.primary2Color,
    },
    '& label': { color: theme.palette.primary2Color },
    '& div': { margin: 0 },
    '&:before, &:after, & :before, & :after': {
      display: 'none',
      background: 'transparent',
    },
  },

  checkBoxText: {
    marginRight: 0,
    marginBottom: 0,
    '& span': {
      fontSize: '2.2rem',
      lineHeight: '1.5',
    },
  },
  buttonsRow: {
    textAlign: 'left',
    '& button': { marginLeft: '20px' },
    '& button:first-child': { marginLeft: '0' },
  },
  buttonsMargin: {
    marginRight: '20px',
    '&:last-child': { marginRight: '0' },
  },
  labelButtonsMargin: {
    margin: '30px',
    '&:last-child': { marginRight: '0' },
  },
  raisedButtonDisabled: {
    letterSpacing: 0,
    color: '#FFF!important',
    backgroundColor: theme.palette.primary1Color,
    border: 0,
    borderRadius: '6px',
    padding: '15px 32px 12px',
  },
  raisedButton: {
    letterSpacing: 0,
    color: theme.palette.white,
    backgroundColor: theme.palette.primary2Color,
    border: 0,
    borderRadius: '6px',
    padding: '15px 32px 12px',
    '&:hover': { background: theme.palette.secondary3Color },
  },
  raisedButtonBrowse: {
    letterSpacing: 0,
    padding: '12px 24px 10px',
    margin: 0,
  },
  flatButton: {
    letterSpacing: 0,
    backgroundColor: theme.palette.grey1Color,
    border: 0,
    borderRadius: '6px',
    color: theme.palette.textColor,
    padding: '15px 32px 12px',
    marginLeft: '0',
    '&:hover': { background: theme.palette.grey2Color },
  },
  alignRight: { float: 'right' },

  retainNumber: {
    display: 'block',
    border: [1, 'solid', theme.palette.grey1Color],
    borderRadius: '6px',
    marginLeft: '24px',
    marginTop: '24px',
    padding: '6px',
    textAlign: 'center',
  },

  formControle: { width: '100%' },
  formControleList: {
    width: '100%',
    boxSizing: 'border-box',
    '& li': {
      paddingTop: '0',
      paddingBottom: '0',
      paddingRight: '12px',
    },
  },
  formControleListSpcl: {
    paddingLeft: '24px',
    paddingRight: '24px',
  },
  formControleListItem: {
    cursor: 'pointer',
    '&:hover': { backgroundColor: theme.palette.grey1Color },
    '&:focus': { outline: 'none' },
  },

  formControleLabel: {
    marginBottom: 0,
    fontSize: '22px',
    fontWeight: '500',
    padding: '13px 0px',
    zIndex: '999',
    borderRadius: '4px',
    pointerEvents: 'none',
    transform: 'translate(24px, 24px) scale(1)',
    transformOrigin: 'top left',
    boxSizing: 'border-box',
  },
  textFieldSelect: {
    boxSizing: 'border-box',
    backgroundColor: theme.palette.grey1Color,
    padding: '8px 24px',
    borderRadius: '6px',
    '&:before, &:after': { display: 'none' },
    '& div > div': { opacity: 0 },
  },

  formControleLabelGroup: {
    marginBottom: 0,
    fontSize: '22px',
    fontWeight: '500',
    //padding: '13px 0',
    zIndex: '999',
    pointerEvents: 'none',
    transform: 'translate(0px, 32px) scale(1)',
    transformOrigin: 'top left',
    boxSizing: 'border-box',
  },
  textFieldSelectGroup: {
    boxSizing: 'border-box',
    //padding: '6px 0 7px',
    '& div > div': { opacity: 0 },
  },
  // Add Delete FAcility CSS starts here...
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  formDiv: {
    height: 600,
    width: 600,
    padding: 10,
  },
  formFeilds: {
    height: 10,
    width: 300,
    margin: 20,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: theme.spacing.unit * 30,
  },
  btnDiv: { display: 'inline-block' },
  button: {
    width: 10,
    padding: 8,
    display: 'inherit',
    margin: 10,
    backGroundColor: theme.palette.primary1Color,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': { color: theme.palette.accent2Color },
  },

  // Range Slider CSS

  // gridContainer: {
  //   marginBottom: '30px',
  // },
  titleContainer: {
    '& svg': {
      verticalAlign: 'middle',
      marginRight: '10px',
    },
  },

  table: {},
  tableBody: {},
  tableRow: {},
  tableCell: {
    color: 'inherit',
    padding: '12px 0',
    '&:first-child': {
      textAlign: 'left',
      padding: '12px 0',
    },
    '&:last-child': {
      textAlign: 'right',
      padding: '12px 0',
    },
  },
  tableCellTextarea: { resize: 'none' },

  descPaper: {
    padding: '24px 30px',
    borderRadius: '6px',
  },
  descTypography: {
    marginBottom: '12px',
    '&:last-child': { marginBottom: 0 },
  },

  dialogPaper: {
    maxWidth: '700px',
    width: '700px',
    border: { radius: [6, 6] },
  },
  modalWindow: { display: 'block' },

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
    '& p': { margin: 0 },
  },

  // Modal Form JSS
  modalBody: { background: theme.palette.canvasColor },

  // Modal Footer JSS
  modalFooter: {
    padding: '40px 100px',
    background: theme.palette.canvasColor,
    borderTop: [[1, 'solid', theme.palette.border3Color]],
  },
  footerContainer: {
    display: 'block',

    '& button': { marginLeft: '20px' },
    '& button:first-child': { marginLeft: '0' },
  },

  paperTitle: {
    textTransform: 'uppercase',
    fontSize: '22px',
  },

  paperTiles: {
    borderRadius: '6px',
    padding: 0,
    minHeight: '100%',
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
    modalBody: { padding: '32px 80px' },
    modalFooter: { padding: '32px 80px' },

    configIcon: { fontSize: '84px' },
    configTitle: { fontSize: '30px' },
    configCaption: { fontSize: '22px' },
    buttonLink: { fontSize: '20px' },
    formGroupHint: {
      position: 'absolute',
      left: '100%',
      width: '100%',
      top: '16px',
    },
    paperHeader: { minHeight: '150px' },
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
    modalBody: { padding: '24px 64px' },
    modalFooter: { padding: '24px 64px' },

    configIcon: { fontSize: '72px' },
    configTitle: { fontSize: '24px' },
    configCaption: { fontSize: '18px' },
    buttonLink: { fontSize: '16px' },
    formGroupHint: {
      position: 'static',
      left: '100%',
      width: '100%',
      top: '16px',
    },
    paperHeader: { minHeight: '130px' },
  },

  // --MD Up & Down
  [theme.breakpoints.up('md')]: { paperHeaderCol: { padding: '20px 30px' } },
  [theme.breakpoints.down('md')]: {
    configIcon: { fontSize: '60px' },
    paperHeaderCol: { padding: '20px 20px' },
    paperHeader: { minHeight: 'auto' },
  },

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
    modalBody: { padding: '24px 40px' },
    modalFooter: { padding: '24px 40px' },
  },
  [theme.breakpoints.down('xs')]: {
    modalHeader: { padding: '16px 32px' },
    modalBody: { padding: '16px 32px' },
    modalFooter: { padding: '16px 32px' },
    configIcon: { fontSize: '48px' },
    configTitle: { fontSize: '20px' },
    configCaption: { fontSize: '15px' },
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
    modalBody: { padding: '24px 40px' },
    modalFooter: { padding: '24px 40px' },
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
    modalBody: { padding: '16px 32px' },
    modalFooter: { padding: '16px 32px' },
  },
});

export default styles;

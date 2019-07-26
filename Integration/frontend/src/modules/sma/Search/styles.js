const styles = theme => ({

  wrapperPaper: {
    borderRadius: '6px',
    marginBottom: '48px',
    '& .MuiPaperelevation2-0-2-56': {
      boxShadow: 'none',
    }
  },
  // Header Styles
  searchHeader: {
    display: 'table',
    width: '100%',
  },
  SearchTableContainer: {
    display: 'table-row'
  },
  searchCol: {
    display: 'table-cell',
    boxSizing: 'border-box',
    verticalAlign: 'middle',
    '&:first-child': {
      borderRight: [1, 'solid', theme.palette.grey1Color],
    }
  },
  searchField: {
    display: 'table-cell',
    '&:first-child': {
      width: '100%',
      verticalAlign: 'middle',
    },
    '&:last-child': {
      width: '1%',
      verticalAlign: 'bottom',
    },
    '& input::-ms-clear': {
      display: 'none',
    }
  },
  searchFieldInnerRow: {
    display: 'flex',
    flexDirection: 'row',
  },

  searchFieldInner: {
    display: 'flex',
    width: '100%',
  },

  // appBarShift: {
  //   '& $searchFieldInnerRow': {
  //     flexDirection: 'column',
  //   }    
  // },


  searchFieldScroll: {
    width: '100%',
    overflowX: 'scroll',
    overflowY: 'hidden',
  },
  formControl: {
    width: '100%',
  },
  simpleSelect: {
    width: '100%',
    color: theme.palette.textColor,

    '&:before, &:after, & :before, & :after': {
      display: 'none',
      background: 'transparent',
    },

    '& div>div': {
      color: theme.palette.primary2Color,
      '&:focus': {
        background: 'transparent',
      }
    },
    '& svg': {
      color: theme.palette.primary2Color,
    },
  },

  searchButton: {
    width: '150px',
    textAlign: 'right',
  },

  textFieldContainer: {
    width: '100%',
  },
  textField: {
    color: theme.palette.textColor,
    margin: 0,
    verticalAlign: 'middle',
    '& input': {
      height: 'auto',
    },
    '& svg': {
      color: theme.palette.primary2Color,
    },
    '& select': {
      height: 'auto',
      paddingTop: '10px',
      paddingBottom: '9px',
      color: theme.palette.primary2Color,
    },
    '& label': {
      color: theme.palette.primary2Color,
    },
    '& div': {
      margin: 0,
    },
    '&:before, &:after, & :before, & :after': {
      display: 'none',
      background: 'transparent',
    }
  },

  textFieldNumber: {
    color: theme.palette.textColor,
    backgroundColor: theme.palette.border1Color,
    border: [1, 'solid', theme.palette.border2Color],
    borderRadius: '6px',
    boxSizing: 'border-box',
    margin: 0,
    verticalAlign: 'middle',
    '& input': {
      height: 'auto',
      color: theme.palette.textColor,
    },
    '& svg': {
      color: theme.palette.primary2Color,
    },
    '& select': {
      height: 'auto',
      paddingTop: '10px',
      paddingBottom: '9px',
      color: theme.palette.primary2Color,
    },
    '& label': {
      color: theme.palette.primary2Color,
    },
    '& div': {
      margin: 0,
    },
    '&:before, &:after, & :before, & :after': {
      display: 'none',
      background: 'transparent',
    }

  },

  searchLabels: {
    paddingTop: '6px',
    paddingBottom: '6px',
    fontSize: '12px',
  },

  labelButtonsMargin: {
    margin: '30px 30px',
    '&:last-child': {
      marginLeft: '0',
    }
  },
  raisedButtonDisabled: {
    color: '#FFF!important',
    backgroundColor: theme.palette.primary1Color,
    border: 0,
    borderRadius: '6px',
    //marginLeft: '20px'
  },
  raisedButton: {
    backgroundColor: theme.palette.primary2Color,
    border: 0,
    borderRadius: '6px',
    color: 'white',
    '&:hover': {
      background: theme.palette.secondary3Color,
    },
    //marginLeft: '20px',
  },
  flatButton: {
    backgroundColor: theme.palette.grey1Color,
    border: 0,
    borderRadius: '6px',
    color: theme.palette.textColor,
    '&:hover': {
      background: theme.palette.grey2Color,
    }
  },
  cancelButton: {
    marginLeft: '20px',
  },

  // Advanced Header Styles
  advancedSearchHeader: {
    backgroundColor: theme.palette.primary2Color,
  },

  // Container Styles
  wrapperContainer: {
    padding: [40],
  },

  whiteButtonWrapper: {
    display: 'inline-block',
    verticalAlign: 'top',
    padding: '5px 0',
    '&:last-child': {
      marginRight: 0,
    },
  },
  whiteButton: {
    color: theme.palette.white,
    background: 'rgba(255, 255, 255, 0.2)',
    textTransform: 'capitalize',
    letterSpacing: 0,
    borderRadius: '6px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.3)',
    }
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  simpleMenuPaper: {
    borderRadius: '6px',
    overflow: 'inherit',
    '&:before': {
      content: '""',
      display: 'block',
      width: 0,
      height: 0,
      position: 'absolute',
      right: 26,
      top: '-10px',
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderBottom: '10px solid #FFF',
      zIndex: '999'
    }
  },

  simpleMenuPaper1: {
    borderRadius: '6px',
    overflow: 'inherit',
    '&:before': {
      content: '""',
      display: 'block',
      width: 0,
      height: 0,
      position: 'absolute',
      right: 26,
      top: '-10px',
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderBottom: '10px solid #FFF',
      zIndex: '999'
    }
  },
  simpleMenu: {
    marginTop: '70px',
    '& ul': {
      width: '272px',
    },
    '& li': {
      position: 'relative',
      overflow: 'inherit',
    }
  },

  calendarPickerInput: {
    width: '100%',
    padding: '7px 10px',
    border: [1, 'solid', theme.palette.grey1Color]
  },
  calendarContainer: {
    fontSize: '1.6rem',
    '& .react-datepicker__navigation': {
      border: '0.9rem solid transparent',
    },

    '& .react-datepicker__navigation--previous': {
      left: '10px',
      borderRightColor: '#ccc',
    },

    '& .react-datepicker__navigation--next': {
      right: '10px',
      borderLeftColor: '#ccc'
    },

    '& .react-datepicker__header': {
      paddingTop: '8px',
      '& .react-datepicker__current-month': {
        fontSize: '1.6rem',
      },
      '& .react-datepicker__day-name': {
        width: '3rem',
        lineHeight: '3rem',
      }
    },
    '& .react-datepicker__month': {
      margin: '1rem',
    },

    '& .react-datepicker__header--time': {
      padding: '10px',
      '& .react-datepicker-time__header': {
        fontSize: '1.6rem',
      }
    },

    '& .react-datepicker__time-container': {
      width: '120px',

      '& .react-datepicker__time-box': {
        width: '120px',
      },

      '& .react-datepicker__time-list': {
        overflow: 'inherit!important',
        padding: '0!important',
      },
      '& .react-datepicker__time-list-item': {
        width: '100%',
        overflow: 'inherit!important',
      }

    },

  },

  dayDateBox: {
    width: '3rem',
    lineHeight: '3rem',
  },

  noSearchResult: {
    minHeight: '450px',
    height: '450px',
    display: 'table',
    width: '100%',
  },

  noSearchResultContent: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },

  lightBulbIcon: {
    fontSize: '96px',
    marginBottom: '24px',
    color: theme.palette.accent3Color,
    opacity: '0.3',
  },
  errorOutlineIcon: {
    fontSize: '96px',
    marginBottom: '24px',
    color: '#FF0000',
    opacity: '0.3',
  },
  serverError: {
    color: '#FF0000',
  },


  formControle: {
    margin: 0,
  },
  formControleListItem: {
    paddingTop: '5px',
    paddingBottom: '5px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey1Color,
    },
    '&:focus': {
      outline: 'none',
    },
    '&:last-child': {
      paddingTop: '10px',
      paddingBottom: '10px',
    }
  },
  multipleSelectGroup: {
    flexDirection: 'inherit',
  },
  inputLabel: {
    textTransform: 'capitalize',
    color: '#FFF!important',
    whiteSpace: 'nowrap',
    transform: 'inherit',
    position: 'inherit',
    opacity: 1,
    fontWeight: 'normal',
    margin: 0,
    '& svg': {
      verticalAlign: 'middle',
    }
  },
  multipleSelect: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    marginTop: '0!important',
    //width: '115px',
    //marginTop: '0!important',
    '&:before, &:after': {
      display: 'none',
    },
    '& div': {
      paddingRight: 0,
      overflow: 'inherit',
    },
    '& svg': {
      display: 'none',
    },
    '& div > div': {
      opacity: 0,
      textIndent: '-999em',
      height: '100%',
    }
  },
  textFieldSelectGroup: {
    '& $select': {
      paddingTop: '12px',
      paddingBottom: '12px',
    }
  },

  fieldError: {
    borderColor: '#FF0000',
  },

  errorContainer: {
    position: 'relative',
  },
  errorPaper: {
    position: 'absolute',
    left: 0,
    top: 10,
    zIndex: '99',
    maxWidth: '420px',
    minWidth: '220px',
    color: '#FF0000',
    padding: '20px 20px',
    overflow: 'inherit',
    filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,.25))',
    boxShadow: 'none',
    '&:before': {
      top: '-10px',
      width: 0,
      left: '20px',
      height: 0,
      content: "''",
      display: 'block',
      position: 'absolute',
      borderLeft: [10, 'solid', 'transparent'],
      borderRight: [10, 'solid', 'transparent'],
      borderBottom: [10, 'solid', theme.palette.white],
    },
    '& svg': {
      verticalAlign: 'text-bottom',
      color: '#FF0000',
    },



  },





  [theme.breakpoints.up('lg')]: {
    raisedButtonDisabled: {
      padding: [14, 32],
    },
    raisedButton: {
      padding: [14, 32],
    },
    flatButton: {
      padding: [14, 32],
    },
    searchIcon: {
      display: 'none',
    },
    searchText: {
      display: 'inline',
    },
    searchCol: {
      padding: [16, 40],
    },
    tipsContent: {
      fontSize: '22px',
      lineHeight: '1.5',
      padding: '20px 40px',
    },
    simpleSelect: {
      fontSize: '2.2rem',
      lineHeight: '1.5',
    },
    textField: {
      fontSize: '2.2rem',
      lineHeight: '1.5',
    },
    searchSelectField: {
      width: '275px',
    },

    whiteButtonWrapper: {
      marginRight: '40px',
    },
    whiteButton: {
      fontSize: '2.2rem',
      paddingLeft: '24px',
      paddingRight: '24px',
    },
    advancedSearchHeader: {
      padding: [32, 40]
    },
    textFieldNumber: {
      fontSize: '1.6rem',
      lineHeight: '1.2',
      paddingLeft: '8px',
      paddingRight: '8px',
    },
    searchLabels: {
      fontSize: '16px',
    },

  },

  // Media Queries
  [theme.breakpoints.down('lg')]: {
    searchField: {
      '& button': {
        padding: '8px',
        minWidth: '48px'
      }
    },
    searchIcon: {
      display: 'inline',
    },
    searchText: {
      display: 'none',
    },
    raisedButtonDisabled: {
      padding: [10, 20],
    },
    raisedButton: {
      padding: [10, 20],
    },
    flatButton: {
      padding: [10, 20],
    },
    searchCol: {
      padding: [14, 20],
    },
    tipsContent: {
      fontSize: '18px',
      lineHeight: '1.5',
      padding: '20px 20px',
    },
    simpleSelect: {
      fontSize: '1.8rem',
      lineHeight: '1.5',
    },
    textField: {
      fontSize: '1.8rem',
      lineHeight: '1.5',
    },
    searchSelectField: {
      width: '225px',
    },
    whiteButtonWrapper: {
      marginRight: '30px',
    },
    whiteButton: {
      fontSize: '1.8rem',
      paddingLeft: '16px',
      paddingRight: '16px',
      '& svg': {
        fontSize: '18px'
      }
    },
    advancedSearchHeader: {
      padding: [16, 20]
    },
    textFieldNumber: {
      fontSize: '1.2rem',
      lineHeight: '1.2',
      paddingLeft: '6px',
      paddingRight: '6px',
    },
  },

  [theme.breakpoints.up('md')]: {
    inputLabel: {
      paddingTop: '10px',
      paddingBottom: '10px',
    },

  },

  [theme.breakpoints.down('md')]: {
    searchCol: {
      padding: [8, 20],
      display: 'block',
      '&:first-child': {
        borderRight: 0,
        borderBottom: [1, 'solid', theme.palette.grey1Color],
      }
    },
    searchSelectField: {
      width: '100%',
    },


    whiteButtonWrapper: {
      marginRight: '16px',
    },
    whiteButton: {
      fontSize: '1.6rem',
      paddingLeft: '16px',
      paddingRight: '16px',
      '& svg': {
        fontSize: '16px'
      }
    },
    advancedSearchHeader: {
      padding: [16, 20]
    },
  },

  // [theme.breakpoints.down('sm')]: {
  //   searchFieldInnerRow: {
  //     flexDirection: 'column',
  //   },
  //   searchFieldInner: {
  //     marginBottom: '10px',
  //     '&:last-child': {
  //       marginBottom: 0,
  //     }
  //   },

  //   raisedButtonDisabled: {
  //     padding: [8, 8],
  //   },
  //   raisedButton: {
  //     padding: [8, 8],
  //   },
  //   flatButton: {
  //     padding: [8, 8],
  //   },

  //   textField: {
  //     fontSize: '1.6rem',
  //     lineHeight: '1.5',
  //   }

  // },


  // Media Queries

});

export default styles;
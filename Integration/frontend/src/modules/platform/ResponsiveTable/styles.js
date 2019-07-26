const styles = theme => ({
  responsiveTableWidget: {
    overflowX: 'auto',
    overflowY: 'hidden',
    width: '100%',
    // height: '750px',
    position: 'relative',
    '&:before, &:after': {
      content: '""',
      boxSizing: 'inherit'
    },
    '& a': {
      textDecoration: 'none'
    }
  },

  tableWidget: {
    width: '100%',
    height: 'auto',
    padding: 0,
    borderCollapse: 'collapse',
    borderSpacing: 0,
    display: 'table',
    overflow: 'hidden',
    '& thead, & tbody': {
      width: '100%'
    },
    '& thead': {
      background: theme.palette.grey1Color,
      display: 'table!important'
    },
    '& tbody': {
      background: 'transparent',
      display: 'block!important',
      height: '750px!important',
      overflowY: 'auto!important',
      overflowX: 'hidden!important',
      '& tr:hover': {
        background: theme.palette.grey1Color
      }
    },
    '& tr': {
      display: 'table!important' // Commented for SMA
    },
    '& tr td:last-child, & tr th:last-child': {
      width: '100%',
      minWidth: '130px'
    },
    '& tr:last-child td': {
      borderBottom: 0
    },
    '& th, & td': {
      boxSizing: 'border-box',
      textAlign: 'left',
      borderBottom: [[1, 'solid', theme.palette.border2Color]]
    },

    '& th.chartBox, & td.chartBox': {
      padding: '0!important',
      // verticalAlign: 'top',
      verticalAlign: 'middle'
    },
    '& th': {
      color: theme.palette.textColor,
      position: 'relative',
      padding: 0,

      '& .resize-container': {
        paddingLeft: '20px',
        paddingRight: '20px'
      },

      // IE 11 Hack
      '@media all and (-ms-high-contrast:none)': {
        '& .resize-container': {
          position: 'relative',
          height: '100%'
        }
      },
      // IE 11 Hack

      '& .resize-value': {
        display: 'table',
        width: '100%',
        height: '100%',
        verticalAlign: 'middle'
      },
      '& .resize-handle': {
        background: theme.palette.primary2Color,
        width: '3px',
        height: '24px',
        position: 'absolute',
        right: '-4px',
        top: 'calc(50% - 12px)',
        zIndex: '999',
        cursor: 'col-resize'
      }
    },
    '& th:last-child': {
      '& .resize-container': {
        '& .resize-handle': {
          display: 'none'
        }
      }
    },
    '& td': {
      overflow: 'hidden',
      paddingLeft: '20px',
      paddingRight: '20px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: theme.palette.textColor,
      '& a': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        cursor: 'pointer'
      }
    }
  },

  errorRow: {
    position: 'relative',
    '&:before': {
      content: '""',
      borderLeft: '2px solid #FF0000',
      position: 'absolute',
      height: '100%'
    },
    '&:after': {
      content: '""',
      borderRight: '2px solid #FF0000',
      position: 'absolute',
      height: '100%',
      right:0,
    },

    '& td': {
      paddingBottom: '0 !important',
      backgroundColor: '#f6d2d2',
    }
  },
  errorMessage: {
    position: 'relative',
    '&:before': {
      content: '""',
      borderLeft: '2px solid #FF0000',
      position: 'absolute',
      height: '100%'
    },
    '&:after': {
      content: '""',
      borderRight: '2px solid #FF0000',
      position: 'absolute',
      height: '100%',
      right:0,
    },
    width: '100%',
    '& td': {
      display: 'none',
      border: '0',
      backgroundColor: '#f6d2d2',
      color: 'red',
      fontSize:'0.8em'
    },
    '& td:first-child': {
      display: 'table-cell',
      paddingTop: 0,
      '& div': {
        wordBreak: 'break-word',
        whiteSpace: 'normal',
        textOverflow: 'inherit',
        overflow: 'inherit'
      }
    }
  },

  pagination: {
    display: 'block'
  },
  selectDropList: {
    fontSize: '14px'
  },
  selectIcon: {
    top: 'calc(50% - 12px)',
    right: '-4px'
  },

  backIconButton: {
    background: '#FF0000'
  },
  nextIconButton: {
    background: '#00FF00'
  },

  // Media Queries
  // ---------------------------------------

  [theme.breakpoints.only('xl')]: {
    responsiveTableWidget: {
      fontSize: '22px',
      lineHeight: '1.1',
      '& a': {
        fontSize: '22px'
      }
    },
    tableWidget: {
      '& th:first-child': {
        '& .resize-container': {
          paddingLeft: '40px'
        }
      },
      '& th:first-last': {
        '& .resize-container': {
          paddingLeft: '40px'
        }
      },

      '& td:first-child': {
        paddingLeft: '40px'
      },
      '& td:first-last': {
        paddingRight: '40px'
      },

      '& .resize-container': {
        paddingTop: '20px',
        paddingBottom: '20px'
      },
      '& td': {
        paddingTop: '20px',
        paddingBottom: '20px'
      }
    }
  },

  '@media screen and ( max-width: 1600px )': {},

  [theme.breakpoints.only('lg')]: {
    responsiveTableWidget: {
      fontSize: '16px',
      lineHeight: '1.1',
      '& a': {
        fontSize: '16px'
      }
    },
    tableWidget: {
      '& th:first-child': {
        '& .resize-container': {
          paddingLeft: '20px'
        }
      },
      '& th:first-last': {
        '& .resize-container': {
          paddingLeft: '30px',
          paddingRight: '0px'
        }
      },
      '& td:first-child': {
        paddingLeft: '20px'
      },
      '& td:first-last': {
        paddingRight: '30px'
      },

      '& .resize-container': {
        paddingTop: '12px',
        paddingBottom: '12px'
      },
      '& td': {
        paddingTop: '12px',
        paddingBottom: '12px'
      }
    }
  },

  [theme.breakpoints.only('md')]: {
    responsiveTableWidget: {
      fontSize: '14px',
      lineHeight: '1.1',
      '& a': {
        fontSize: '14px'
      }
    },
    tableWidget: {
      '& th:first-child': {
        '& .resize-container': {
          paddingLeft: '20px'
        }
      },
      '& th:first-last': {
        '& .resize-container': {
          paddingLeft: '20px'
        }
      },
      '& td:first-child': {
        paddingLeft: '20px'
      },
      '& td:first-last': {
        paddingRight: '20px'
      },

      '& .resize-container': {
        paddingTop: '8px',
        paddingBottom: '8px'
      },
      '& td': {
        paddingTop: '8px',
        paddingBottom: '8px'
      }
    }
  },

  [theme.breakpoints.between('xs', 'sm')]: {
    responsiveTableWidget: {
      fontSize: '12px',
      lineHeight: '1.1',
      '& a': {
        fontSize: '12px'
      }
    },
    tableWidget: {
      '& th:first-child': {
        '& .resize-container': {
          paddingLeft: '20px'
        }
      },
      '& th:first-last': {
        '& .resize-container': {
          paddingLeft: '20px'
        }
      },
      '& td:first-child': {
        paddingLeft: '20px'
      },
      '& td:first-last': {
        paddingRight: '20px'
      },

      '& .resize-container': {
        paddingTop: '4px',
        paddingBottom: '4px'
      },
      '& td': {
        paddingTop: '4px',
        paddingBottom: '4px'
      }
    }
  },

  // Vertical Media Queries
  '@media screen and ( max-height: 639px )': {
    tableWidget: {
      '& .resize-container': {
        paddingTop: '8px',
        paddingBottom: '8px'
      },
      '& td': {
        paddingTop: '8px',
        paddingBottom: '8px'
      }
    }
  },
  '@media screen and ( max-height: 589px )': {
    tableWidget: {
      '& .resize-container': {
        paddingTop: '4px',
        paddingBottom: '4px'
      },
      '& td': {
        paddingTop: '4px',
        paddingBottom: '4px'
      }
    }
  }

  // Media Queries
})

export default styles

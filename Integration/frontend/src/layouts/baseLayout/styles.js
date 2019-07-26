const drawerWidth = 300;
const styles = theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    zIndex: 1,
    position: 'relative',
  },
  appBar: {
    paddingTop: '24px',
    paddingBottom: '24px',
    background: 'transparent',
    color: 'inherit',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },

  contentContainer: {
    flex: 'auto',
    width:'100%',
    overflow: 'auto',
    background: theme.palette.grey1Color,
  },


  // Medium Screen
  [theme.breakpoints.up('lg')]: {
    contentContainer: {
      paddingLeft: theme.spacing.unit * 5,
      paddingRight: theme.spacing.unit * 5,
    }
  },
  [theme.breakpoints.down('lg')]: {
    contentContainer: {
      paddingLeft: theme.spacing.unit * 3.75,
      paddingRight: theme.spacing.unit * 3.75,
    },
  },

  [theme.breakpoints.down('md')]: {
    contentContainer: {
      paddingLeft: theme.spacing.unit * 2.5,
      paddingRight: theme.spacing.unit * 2.5,
    },
    appBarShift: {
      '& .SearchsearchFieldInnerRow-0-2-303': {
        flexDirection: 'column',
      },
      '& .SpecificHeaderSelectorsearchFieldInner-0-2-469': {
        marginBottom: '10px',
        '&:last-child': {
          marginBottom: 0,
        }
      },
    },
  },

  // Small Screen
  [theme.breakpoints.down('sm')]: {
    contentContainer: {
      paddingLeft: theme.spacing.unit * 2.0,
      paddingRight: theme.spacing.unit * 2.0,
    }
  },

  // Extra Small Screen
  [theme.breakpoints.down('xs')]: {
    contentContainer: {
      paddingLeft: theme.spacing.unit * 1.5,
      paddingRight: theme.spacing.unit * 1.5,
    }
  }


});

export default styles;
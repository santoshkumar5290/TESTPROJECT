import React from 'react'

import { sickLogo } from '../../svgIcons'

import { withStyles } from '@material-ui/core/styles'

import SvgIcon from '@material-ui/core/SvgIcon'
import Dialog from '@material-ui/core/Dialog'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  configDialog: {
    display: 'block'
  },
  configPart1Dialog: {
    maxWidth: theme.spacing.unit * 100,
    width: theme.spacing.unit * 100,
    overflow: 'inherit'
  },
  logoContainer: {
    marginBottom: theme.spacing.unit * 2,
    lineHeight: 0
  },
  clientLogo: {
    textAlign: 'left',
    color: theme.palette.primary2Color,
    transitionDuration: 300,
    MinHeight: '24px',
    height: 'auto',
    verticalAlign: 'middle',
    fontSize: '100px'
  },
  leftContent: {
    padding: theme.spacing.unit * 4,
    marginTop: -theme.spacing.unit * 4,
    position:'relative',
    height: 'calc(100% + 64px)',
    display: 'flex',
    boxSizing:'border-box',
    flexDirection: 'column',
    background: {
      image: 'url("images/platformLayout_sm_bg.png")',
      color: theme.palette.secondary2Color,
      repeat: 'no-repeat',
      position: 'center center',
      size: 'cover'
    }
  },
  leftContentTitle: {
    color: theme.palette.white,
    fontWeight: '100',
    marginBottom: theme.spacing.unit
  },
  leftContentSubTitle: {
    color: theme.palette.white,
    marginBottom: theme.spacing.unit
  },
  leftContentCopy: {
    color: theme.palette.white,
    marginBottom: theme.spacing.unit,
    flexGrow: '1'
  },
  leftContentBottomCopy: {
    color: theme.palette.primary2Color
  },

  rightContent: {
    padding: theme.spacing.unit * 5,
    height: 'calc(100% - 80px)'
  },
  // Media Queries  ---------------------------------------------

  // --LG Up & Down
  [theme.breakpoints.up('lg')]: {
    logoContainer: {
      marginBottom: theme.spacing.unit * 3
    },
    leftContentTitle: {
      marginBottom: theme.spacing.unit * 3
    },
    leftContentSubTitle: {
      marginBottom: theme.spacing.unit * 3
    },
    leftContentCopy: {
      marginBottom: theme.spacing.unit * 3
    }
  },
  [theme.breakpoints.down('lg')]: {
    logoContainer: {
      marginBottom: theme.spacing.unit * 3
    },
    leftContentTitle: {
      marginBottom: theme.spacing.unit * 3
    },
    leftContentSubTitle: {
      marginBottom: theme.spacing.unit * 3
    },
    leftContentCopy: {
      marginBottom: theme.spacing.unit * 3
    }
  },

  // --MD Up & Down
  [theme.breakpoints.down('md')]: {
    logoContainer: {
      marginBottom: theme.spacing.unit * 2
    },
    leftContentTitle: {
      marginBottom: theme.spacing.unit * 2
    },
    leftContentSubTitle: {
      marginBottom: theme.spacing.unit * 2
    },
    leftContentCopy: {
      marginBottom: theme.spacing.unit * 2
    }
  },

  // --SM, XS Up & Down
  [theme.breakpoints.down('sm')]: {},
  [theme.breakpoints.down('xs')]: {},

  // --Media Queris for Height Mentainence.
  '@media screen and ( max-height: 639px )': {
    logoContainer: {
      marginBottom: theme.spacing.unit * 2
    },
    leftContentTitle: {
      marginBottom: theme.spacing.unit * 2
    },
    leftContentSubTitle: {
      marginBottom: theme.spacing.unit * 2
    },
    leftContentCopy: {
      marginBottom: theme.spacing.unit * 2
    }
  },
  '@media screen and ( max-height: 589px )': {
    logoContainer: {
      marginBottom: theme.spacing.unit * 2
    },
    leftContentTitle: {
      marginBottom: theme.spacing.unit
    },
    leftContentSubTitle: {
      marginBottom: theme.spacing.unit
    },
    leftContentCopy: {
      marginBottom: theme.spacing.unit
    }
  }
})

function PlatformModal ({
  classes,
  leftContentTitle,
  leftContentSubTitle,
  leftContentCopy,
  leftContentBottomCopy,
  children
}) {
  return (
    <Dialog open className={classes.configDialog} classes={{ paper: classes.configPart1Dialog }} hideBackdrop>
      <Grid container spacing={30}>
        <Grid item xs={6}>
          <Paper className={classes.leftContent} elevation={0}>
            <Typography className={classes.logoContainer} component='h1' variant='h1'>
              <SvgIcon className={classes.clientLogo} viewBox='0 0 1000 320'>
                {sickLogo}
              </SvgIcon>
            </Typography>
            <Typography className={classes.leftContentTitle} component='h2' variant='h2'>
              {leftContentTitle}
            </Typography>
            <Typography className={classes.leftContentSubTitle} variant='h5'>
              {leftContentSubTitle}
            </Typography>
            <Typography className={classes.leftContentCopy} variant='body1'>
              {leftContentCopy}
            </Typography>
            <Typography className={classes.leftContentBottomCopy} variant='body1'>
              {leftContentBottomCopy}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.rightContent} elevation={0}>
            {children}
          </Paper>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default withStyles(styles)(PlatformModal)

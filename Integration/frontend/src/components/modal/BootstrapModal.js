import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { sickLogo } from '../../svgIcons'
import { SvgIcon, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Grid, Typography } from '@material-ui/core'

const styles = theme => ({
  configDialog: {
    display: 'block'
  },
  configPart2Dialog: {
    maxWidth: theme.spacing.unit * 160,
    width: theme.spacing.unit * 160,
    overflow: 'inherit',
    minHeight: '400px'
    // margin: theme.spacing.unit * 4,
  },
  configDialogTitle: {
    padding: 0
  },

  configDialogContent: {
    padding: 0,
    marginTop: -theme.spacing.unit * 8,
    background: theme.palette.white,
    borderRadius: [6, 6, 0, 0]
  },
  dialogActionsBottom: {
    borderTop: [1, 'solid', theme.palette.border2Color],
    margin: 0,
    position: 'relative'
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
  topContent: {
    padding: [theme.spacing.unit * 4, theme.spacing.unit * 4, theme.spacing.unit * 12, theme.spacing.unit * 4],
    margin: [0, -theme.spacing.unit * 4],
    display: 'flex',
    flexDirection: 'column',
    background: {
      image: 'url("images/paltformLayout_md_bg.png")',
      color: theme.palette.secondary2Color,
      repeat: 'no-repeat',
      position: 'center center',
      size: 'cover'
    }
  },
  leftContainer: {
    maxWidth: '270px',
    minWidth: '270px',
    borderRight: [1, 'solid', theme.palette.primary1Color],
    paddingRight: [theme.spacing.unit * 4]
  },
  rightContainer: {
    padding: [0, theme.spacing.unit * 4],
    alignSelf: 'center'
  },
  topContentSubTitle: {
    color: theme.palette.white,
    marginBottom: theme.spacing.unit
  },
  clientLogoCaption: {
    color: theme.palette.white,
    fontWeight: 'normal'
  },
  topContentCopy: {
    color: theme.palette.white
  },

  // Media Queries  ---------------------------------------------

  // --LG Up & Down
  [theme.breakpoints.up('lg')]: {
    logoContainer: {
      marginBottom: theme.spacing.unit * 2
    },
    topContentSubTitle: {
      marginBottom: theme.spacing.unit * 2
    },
    dialogActionsBottom: {
      padding: [theme.spacing.unit * 4, theme.spacing.unit * 4]
    }
  },
  [theme.breakpoints.down('lg')]: {
    logoContainer: {
      marginBottom: theme.spacing.unit * 2
    },
    topContentSubTitle: {
      marginBottom: theme.spacing.unit * 2
    },
    dialogActionsBottom: {
      padding: [theme.spacing.unit * 2, theme.spacing.unit * 4]
    }
  },

  // --MD Up & Down
  [theme.breakpoints.up('md')]: {},
  [theme.breakpoints.down('md')]: {
    logoContainer: {
      marginBottom: theme.spacing.unit * 2
    },
    topContentSubTitle: {
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
    topContentSubTitle: {
      marginBottom: theme.spacing.unit * 2
    },
    dialogActionsBottom: {
      padding: [theme.spacing.unit * 2, theme.spacing.unit * 4]
    }
  },
  '@media screen and ( max-height: 589px )': {
    logoContainer: {
      marginBottom: theme.spacing.unit * 2
    },
    topContentSubTitle: {
      marginBottom: theme.spacing.unit
    },
    dialogActionsBottom: {
      padding: [theme.spacing.unit * 2, theme.spacing.unit * 4]
    }
  }
})

const BootstrapModal = ({ classes, caption, subTitle, topContentCopy, content, actions }) => {
  return (
    <Dialog
      aria-labelledby='customized-dialog-title'
      open
      className={classes.configDialog}
      classes={{ paper: classes.configPart2Dialog }}
      hideBackdrop
    >
      <DialogTitle id='customized-dialog-title' variant='div' className={classes.configDialogTitle}>
        <Grid item xs={12}>
          <Paper className={classes.topContent} elevation={0}>
            <Grid container spacing={0}>
              <Grid item xs className={classes.leftContainer}>
                <Typography className={classes.logoContainer} component='h1' variant='h1'>
                  <SvgIcon className={classes.clientLogo} viewBox='0 0 1000 320'>
                    {sickLogo}
                  </SvgIcon>
                </Typography>
                <Typography className={classes.clientLogoCaption} variant='h6'>
                  {caption}
                </Typography>
              </Grid>
              <Grid item xs className={classes.rightContainer}>
                <Typography className={classes.topContentSubTitle} variant='h5'>
                  {subTitle}
                </Typography>
                <Typography className={classes.topContentCopy} variant='body2'>
                  {topContentCopy}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.configDialogContent}>{content}</DialogContent>
      <DialogActions className={classes.dialogActionsBottom}>{actions}</DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(BootstrapModal)


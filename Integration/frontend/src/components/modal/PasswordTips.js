/**React */
import React from 'react'

/**MUI */
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

/**MUI Icons */
import InfoOutlineIcon from '@material-ui/icons/InfoOutline'

/**Local */
import Modal from './Modal'
import { A } from '../link'
import { embedI18n } from '../../services/I18nl10n'

// ------------------------------------
// Components
// ------------------------------------

const styles = theme => ({
  dialogPaper: {
    maxWidth: "700px",
    width: '700px',
    border: {
      radius: [6, 6]
    }
  },
  modalWindow: {
    display: 'block',
  },

  //Modal Header JSS
  modalHeader: {
    background: theme.palette.canvasColor,
    borderBottom: [
      [1, 'solid', theme.palette.border3Color]
    ],
    position: 'relative',
    '& h2': {
      margin: 0,
      color: theme.palette.textColorDark,
      '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 'calc(50% - 0)',
        backgroundColor: theme.palette.primary2Color,
      },
    },
    '& p': {
      margin: 0
    },
  },

  //Modal Form JSS
  modalBody: {
    background: theme.palette.canvasColor,
  },
  tipsWrapper: {
    position: 'relative',
  },
  tipsLink: {
    position: 'absolute',
    right: 0,
    bottom: '18px',
    fontSize: '14px'
  },
  tipsContainer: {
    display: 'block',
  },
  tipsList: {
    display: 'block',
  },
  tipsListItem: {
    paddingLeft: '0',
    paddingRight: '0'
  },

  //Modal Footer JSS
  modalFooter: {
    background: theme.palette.canvasColor,
    borderTop: [
      [1, 'solid', theme.palette.border3Color]
    ],
  },
  footerContainer: {
    display: 'block',
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
        }
      },
    },
    modalBody: {
      padding: '32px 80px'
    },
    modalFooter: {
      padding: '32px 80px'
    },
  },
  [theme.breakpoints.down('lg')]: {
    modalHeader: {
      padding: '24px 64px',
      '& h2': {
        '&:before': {
          height: '35px',
          width: '6px',
        }
      },
    },
    modalBody: {
      padding: '24px 64px'
    },
    modalFooter: {
      padding: '24px 64px'
    },
  },

  // --MD Up & Down
  [theme.breakpoints.up('md')]: {
  },
  [theme.breakpoints.down('md')]: {
  },

  // --SM, XS Up & Down
  [theme.breakpoints.down('sm')]: {
    modalHeader: {
      padding: '24px 40px',
      '& h2': {
        '&:before': {
          height: '25px',
          width: '5px',
        }
      },
    },
    modalBody: {
      padding: '24px 40px',
    },
    modalFooter: {
      padding: '24px 40px',
    },
  },
  [theme.breakpoints.down('xs')]: {
    modalHeader: {
      padding: '16px 32px',
    },
    modalBody: {
      padding: '16px 32px',
    },
    modalFooter: {
      padding: '16px 32px',
    },
  },

  // --Media Queris for Height Mentainence.
  '@media screen and ( max-height: 639px )': {
    modalHeader: {
      padding: '24px 40px',
      '& h2': {
        '&:before': {
          height: '25px',
          width: '5px',
        }
      },
    },
    modalBody: {
      padding: '24px 40px',
    },
    modalFooter: {
      padding: '24px 40px',
    },
  },

  '@media screen and ( max-height: 589px )': {
    modalHeader: {
      padding: '16px 32px',
      '& h2': {
        '&:before': {
          height: '25px',
          width: '5px',
        }
      },
    },
    modalBody: {
      padding: '16px 32px ',
    },
    modalFooter: {
      padding: '16px 32px',
    },
  },

});


/**
 * Modal for displaying password tips.
 *
 * @private
 */
class DialogPasswordTips extends React.Component {
/**
  * @ignore
  *
*/
  static defaultProps = {
    localize: () => { },
  };

  state = {
    open: false,
    dense: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {

    const { classes, localize } = this.props
    const { dense } = this.state;
    return (
      <div className={classes.tipsWrapper}>
        <A className={classes.tipsLink} href='#' onClick={this.handleOpen}>
          {localize('PASSWORD_TIPS')}
        </A>
        {
          this.state.open &&
          <Modal
            classes={{ "paper": this.props.classes.dialogPaper }}
            title={localize('PASSWORD_TIPS')}
            open
            submitButton={false}
            cancelLabel={localize('OK')}
            cancelAction={this.handleClose}>

            <div className={classes.tipsContainer}>
              <List className={classes.tipsList}>

                <ListItem className={classes.tipsListItem}>
                  <ListItemIcon>
                    <InfoOutlineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={localize('PASSWORD_MIN_LENGTH')}
                  />
                </ListItem>

                <ListItem className={classes.tipsListItem}>
                  <ListItemIcon>
                    <InfoOutlineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={localize('PASSWORD_MAX_LENGTH')}
                  />
                </ListItem>

                <ListItem className={classes.tipsListItem}>
                  <ListItemIcon>
                    <InfoOutlineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={localize('PASSWORD_DIGIT')}
                  />
                </ListItem>

                <ListItem className={classes.tipsListItem}>
                  <ListItemIcon>
                    <InfoOutlineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={localize('PASSWORD_SMALL_LETTER')}
                  />
                </ListItem>

                <ListItem className={classes.tipsListItem}>
                  <ListItemIcon>
                    <InfoOutlineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={localize('PASSWORD_CAPITAL_LETTER')}
                  />
                </ListItem>

                <ListItem className={classes.tipsListItem}>
                  <ListItemIcon>
                    <InfoOutlineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={localize('PASSWORD_SPECIAL_CHAR')}
                  />
                </ListItem>

              </List>
            </div>



          </Modal>
        }
      </div>
    )
  }
}


export default withStyles(styles, { withTheme: true })(embedI18n(DialogPasswordTips))

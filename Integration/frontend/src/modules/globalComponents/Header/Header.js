/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
/** MUI */
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { embedI18n } from '../../../services/I18nl10n'
/** Locals */
import { getAuthenticationURL } from '../../../services/httpRequest'
import ProfileAvatar from '../../auth/profileAvatar/components'

import styles from './styles'

/**
 * React component that encapsulates the Header tool bar displayed in the template.
 *
 */

class Header extends Component {
  static propTypes = {
    leftNodes: PropTypes.node,
    centerNodes: PropTypes.node,
    rightNodes: PropTypes.node,
    addAutoRefresh: PropTypes.func,
    title: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    aboutInfo: PropTypes.array,
    facilityTable: PropTypes.object,
    open: PropTypes.bool,
    getfacilityTableRows: PropTypes.func,
    handleDrawerClose: PropTypes.func,
    handleDrawerOpen: PropTypes.func,
    listIconColor: PropTypes.bool,
    breadcrumb: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.countDown = 0
    this.state = {
      snackbar: { open: false, message: '' },
      openAboutPage: false,
      anchorEl: null,
      listView: false,
      mapView: false,
      timerValue: this.props.dashBoardTime
    }
    this.getBreadcrumb = this.getBreadcrumb.bind(this)
  }

  /**
   * Handles new messge. Displays the message in a snackbar
   * @param {Object} data New message on websocket
   */
  handleMessage = data => {
    const message = Array.isArray(data) ? data[0].message : 'Invalid Message format'
    const snackbar = { open: true, message: message }
    this.setState({ snackbar: snackbar })
  }

  /**
   * Handles about dialog
   */
  handleAboutPage = () => {
    this.setState({ openAboutPage: true })
  }

  handleCloseAboutPage = () => {
    this.setState({ openAboutPage: false })
  }

  /**
   * @function getBreadcrumb Returns  breadcrumb to be  shown
   */
  getBreadcrumb = () => {
    if (this.props.breadcrumb) {
      let { classes } = this.props
      let concat = ''
      const breadcrumb = 'dashboard/' + this.props.breadcrumb.value
      let arr = breadcrumb.split('/').filter(value => {
        return value !== ''
      })
      return arr.map((value, index) => {
        if (index > 0) {
          concat = concat + '/' + value
        }
        // let spacedWords = this.getSapcedWordFromCamelcase(value)
        if (index === arr.length - 1) {
          return (
            <ListItem key={index} className={classes.breadCrumbItem}>
              {this.props.localize(value)}
            </ListItem>
          )
        }
        if (index === 0) {
          return (
            <ListItem key={index} className={classes.breadCrumbItem}>
              <Link to={'/sma'}>{this.props.localize(value)}</Link>
            </ListItem>
          )
        }
        return (
          <ListItem key={index} className={classes.breadCrumbItem}>
            <Link to={concat}>{this.props.localize(value)}</Link>
          </ListItem>
        )
      })
    }
    return null
  }
  /**
   * Called when snackbar is closed. Used to reset snackbar state.
   */
  handleSnackBarClose = () => {
    const snackbar = { open: false, message: '' }
    this.setState({ snackbar: snackbar })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.breadcrumb.value !== '/') {
      clearInterval(this.countDown)
    }
    return true
  }

  componentDidUpdate () {}

  decreaseTimerValue = () => {
    this.setState(prevState => ({ timerValue: Math.max(0, prevState.timerValue - 1) }))
  }

  handleRefresh = () => {
    if (this.props.facilityTable.tableConfig && !this.props.mapIconColor && this.props.listIconColor) {
      this.props.getfacilityTableRows(this.props.facilityTable.selectedTab.url, getAuthenticationURL(), false)
      this.setState({ timerValue: this.props.dashBoardTime })
      clearInterval(this.countDown)
      this.countDown = window.setInterval(this.decreaseTimerValue, 1000)
    }
    if (this.props.mapIconColor) {
      let obj = {},
        mapPreferences = this.props.mapPreferences
      if (mapPreferences.facilitySelected) obj = { facilityId: mapPreferences.facilitySelected }
      else {
        if (mapPreferences.countrySelected) {
          obj['country'] = mapPreferences.countrySelected
          if (mapPreferences.stateSelected) obj['state'] = mapPreferences.stateSelected
        }
      }
      this.props.getMapFacility(getAuthenticationURL(), obj)
      this.setState({ timerValue: this.props.dashBoardTime })
      clearInterval(this.countDown)
      this.countDown = window.setInterval(this.decreaseTimerValue, 1000)
    }
  }

  handleIconClick = val => {
    if (val === 'list') {
      this.props.setUserRedirectionObj(getAuthenticationURL(), {
        isListIconClicked: true,
        isMapIconClicked: false,
        isFirstUser: this.props.isFirstUser
      })
    } else {
      this.props.setUserRedirectionObj(getAuthenticationURL(), {
        isListIconClicked: false,
        isMapIconClicked: true,
        isFirstUser: this.props.isFirstUser
      })
    }
  }

  render () {
    let { classes } = this.props
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div className={classes.headerToolbarContainer}>
            <div className={classNames(classes.headerToolbar, classes.headerToolbarLeft)}>
              <div className={classes.headerLeftAlign}>
                <div className={classNames(classes.headerCol, classes.headerColFirst)}>
                  {this.props.open ? (
                    <IconButton
                      color='inherit'
                      aria-label='close drawer'
                      onClick={this.props.handleDrawerClose}
                      className={classNames(classes.menuButton, this.props.open)}>
                      <ArrowBackIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      color='inherit'
                      aria-label='open drawer'
                      onClick={this.props.handleDrawerOpen}
                      className={classNames(classes.menuButton, this.props.open)}>
                      <ArrowForwardIcon />
                    </IconButton>
                  )}
                </div>
                <div className={classes.headerCol}>
                  <List className={classes.breadCrumbList}>{this.getBreadcrumb()}</List>
                </div>
              </div>
            </div>
            <div className={classNames(classes.headerToolbar, classes.headerToolbarRight)}>
              <div className={classes.headerRightAlign}>
                <div className={classNames(classes.headerCol, classes.profileAvatar)}>
                  <ProfileAvatar />
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  aboutInfo: (state.about && state.about.get('aboutInfo')) || [],
  facilityTable: state.facilityTable,
  auth: state.authentication,
  breadcrumb: state.breadcrumb,
  privilege: state.privileges.values
})

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(embedI18n(Header)))

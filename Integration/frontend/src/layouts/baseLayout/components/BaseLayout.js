/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/** MUI */
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'

/** Local */
import styles from './../styles'
import { getAuthenticationURL } from '../../../services/httpRequest'
import { Header, NavBar } from '../../../modules/globalComponents'

/**
 * Layout for the system dashboard. Contains Header, navigation and main display area.
 */
class BaseLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    navbar: PropTypes.bool,
    header: PropTypes.bool,
    navbarStyle: PropTypes.object,
    navbarExpanded: PropTypes.bool,
    fetchGlobalPrivileges: PropTypes.func,
    loadAppSettings: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      classes: ['sk-navbar--active'],
      open: false
    }
  }
  componentWillMount() {
    this.props.loadAppSettings(getAuthenticationURL())
    this.props.fetchGlobalPrivileges(getAuthenticationURL())
  }
  onNavbarToggle = (e, navbarExpanded) => {
    this.setState((prevState) => {
      navbarExpanded ? prevState.classes.push('sk-navbar--expanded') : prevState.classes = ['sk-navbar--active']
    })
  }
  handleDrawerOpen = () => {
    this.setState({ open: true })
  }
  handleDrawerClose = () => {
    this.setState({ open: false })
  }
  render() {
    const { navbar, header, navbarExpanded, classes, facility } = this.props
    const childrenStyle = Object.assign({}, this.props.childrenStyle, childrenStyle)
    const headerStyle = Object.assign({}, this.props.headerStyle, headerStyle)
    const navbarStyle = Object.assign({}, this.props.navbarStyle, navbarStyle)
    return (
      <div className={classes.mainContainer}>
        {navbar &&
          <NavBar
            open={this.state.open}
            onToggle={this.onNavbarToggle}
          />
        }
        <main className={classNames(classes.contentContainer, this.state.open && classes.appBarShift)}>
          {header &&
            <AppBar
              elevation={0}
              position='static'
              color='default'
              className={classes.appBar}
            >
              <Header
                open={this.state.open}
                handleDrawerOpen={this.handleDrawerOpen}
                handleDrawerClose={this.handleDrawerClose}
              />
            </AppBar>
          }
          <React.Fragment>
            {this.props.children}
          </React.Fragment>
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(BaseLayout)

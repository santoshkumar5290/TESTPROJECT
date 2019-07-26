/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Link, withRouter, NavLink } from 'react-router-dom'

/** MUI */
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { indigo } from '@material-ui/core/colors'

/** MUI Icons */
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import DefaultUserIcon from '@material-ui/icons/AccountCircle'
import GroupIcon from '@material-ui/icons/GroupWork'
import PeopleIcon from '@material-ui/icons/People'
import PersonIcon from '@material-ui/icons/Person'
import LoginIcon from '@material-ui/icons/Lock'
import RoleIcon from '@material-ui/icons/Work'
import ChangePasswordIcon from '@material-ui/icons/Replay'

/** Local */
import styles from '../styles'
import { getAuthenticationURL } from '../../../../services/httpRequest'
import { default as ChangePassword } from '../../changePassword/components'
import theme from '../../../../theme'
import { actions } from '../../../auth'
import { updateSnack } from '../../../../services/snackbar'
import { routeConstants } from '../../route'
import {
  GLOBAL_PRIVILEGES_LOADING_STATUS,
  GUEST_PRIVILEGES_LOADED_STATUS,
  USER_PRIVILEGES_LOADED_STATUS,
  USER_PRIVILEGES_LOADING_STATUS,
  fetchUserPrivileges,
  fetchGlobalPrivileges
} from '../../../../services/privileges'
import { updateUserSettings, updatePreferences, cacheKeys } from '../../../../services/userSettings'
import {
  setGlobalPreferenceToStorage,
  fetchUserPreferences,
  fetchGuestPreferences,
  saveUserPreferences,
  editUserPreferences,
  clearPreferences
} from '../../../../services/userPreference'
import { embedI18n } from '../../../../services/I18nl10n'

const { authReduxActions, profileReduxActions } = actions
const { PROFILE_CREATED_STATUS } = profileReduxActions.statusConstants
const { logout } = authReduxActions.features
const { fetchProfile, clearProfile } = profileReduxActions.features
/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state, ownProps) => ({
  auth: state.authentication,
  preference: state.userPreference,
  privilege: state.privileges,
  profile: state.profileManagement.profile,
  profileStatus: state.profileManagement.status,
  userSettings: state.appCache[cacheKeys.AUTH_KEY]
})

/**
  *styling for link and active link
*/
const indigo900 = indigo[900]

/**
  * Profile Component
  *
*/
export class ProfileAvatar extends Component {

  /**
    *Validation for props (Static propTypes)
    * @static
    * @type {object} validators
      {
        PropTypes styles object,
        PropTypes logout function,
        PropTypes profile object,
        PropTypes auth object,
        PropTypes preference object,
        PropTypes privilege object,
        PropTypes updateUserSettings function,
        PropTypes clearPreferences function,
        PropTypes clearProfile function,
        PropTypes fetchUserPrivileges function,
        PropTypes fetchGlobalPrivileges function,
        PropTypes fetchGuestPreferences function,
        PropTypes fetchProfile function,
        PropTypes fetchUserPreferences function,
        PropTypes userSettings object,
        PropTypes profileStatus string,
        PropTypes setGlobalPreferenceToStorage function,
        PropTypes updateSnack function,
        PropTypes clear function,
      }
  */
  static propTypes = {
    styles: PropTypes.object,
    classes: PropTypes.object,
    logout: PropTypes.func,
    profile: PropTypes.object,
    auth: PropTypes.object,
    preference: PropTypes.object,
    privilege: PropTypes.object,
    updateUserSettings: PropTypes.func,
    clearPreferences: PropTypes.func,
    clearProfile: PropTypes.func,
    fetchUserPrivileges: PropTypes.func,
    fetchGlobalPrivileges: PropTypes.func,
    fetchGuestPreferences: PropTypes.func,
    fetchProfile: PropTypes.func,
    fetchUserPreferences: PropTypes.func,
    userSettings: PropTypes.object,
    profileStatus: PropTypes.string,
    setGlobalPreferenceToStorage: PropTypes.func,
    updateSnack: PropTypes.func,
    clear: PropTypes.func,
    history: PropTypes.object
  }

  /**
    * default prop values.
  */
  static defaultProps = {
  }

  /**
    * creates a instance of Profile.
    * @param {object} props
  */
  constructor(props, context) {
    super(props, context)
    this.state = {
      menuElement: null,
      loginOpen: false,
      changePasswordOpen: false,
      isDownArrowClicked: false
    }
  }

  /**
    * setting state to true for login modal
  */
  loginView = () => {
    this.setState({ loginOpen: true })
  }

  openMenu = event => {
    this.setState({ menuElement: event.currentTarget, isDownArrowClicked: true })
  };

  closeMenu = (e, callback) => {
    this.setState({ menuElement: null, isDownArrowClicked: false })
    typeof callback === 'function' && callback.apply(this)
  };

  changePasswordView = () => {
    this.setState({ changePasswordOpen: true })
  }

  /**
    * setting state to false for change password modal to be closed
  */
  closeChangePassword = () => {
    this.setState({ changePasswordOpen: false })
  }

  /**
    * Logout the user
  */
  _logout = () => {
    this.props.logout(getAuthenticationURL())
  }
  /**
    * Set Guest Menu
  */
  setGuestMenu(theme) {
    const { menuElement } = this.state
    let { classes, localize } = this.props
    return (
      <Menu
        anchorEl={menuElement}
        open={Boolean(menuElement)}
        className={classes.menuList}
        classes={{ 'paper': this.props.classes.menuListPaper }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={this.closeMenu}>
        <MenuItem
          onClick={this.closeMenu}
          className={classes.menuListItem}
          style={{
            cursor: 'auto'
          }}>
          <div className={classes.menuListItemLink}>
            <span className={classes.menuListItemLinkCell}>
              <ListItemText className={classes.menuListItemText} inset primary={`${localize('WELCOME')} Guest`} />
            </span>
          </div>
        </MenuItem>

        <MenuItem
          style={{ fontSize: '14px' }}
          onClick={(e) => this.closeMenu(e, this.loginView)}
          className={classes.menuListItem}
          component={Link} to='/login'
        >
          <div className={classes.menuListItemLink}>

            <span className={classes.menuListItemLinkCell}>
              <ListItemIcon className={classes.menuListItemIcon}>
                <LoginIcon />
              </ListItemIcon>
            </span>
            <span className={classes.menuListItemLinkCell}>
              <ListItemText className={classes.menuListItemText} inset primary='Login' />
            </span>

          </div>
        </MenuItem>

      </Menu>
    )
  }
  /**
    * Set User Menu
  */
  setUserMenu(theme) {
    const { menuElement } = this.state
    const { classes, localize } = this.props
    const welcomeText = [localize('WELCOME'),
      this.props.profile ? [this.props.profile.firstName, this.props.profile.lastName].join(' ') : '']
      .join(' ')
    return (
      <Menu
        anchorEl={menuElement}
        className={classes.menuList}
        classes={{ 'paper': this.props.classes.menuListPaper }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(menuElement)}
        onClose={this.closeMenu}
      >

        <MenuItem className={classes.menuListItem}>
          <div className={classes.menuListItemLink}>
            <ListItemText className={classNames(classes.menuListItemText, classes.menuListItemWelcomeText)} primary={welcomeText} />
          </div>
        </MenuItem>

        <MenuItem className={classes.menuListItem} onClick={this.closeMenu}>
          <NavLink className={classes.menuListItemLink} to={routeConstants.PROFILE_MANAGEMENT} activeClassName={classes.activeLink}>
            <span className={classes.menuListItemLinkCell}>
              <ListItemIcon className={classes.menuListItemIcon}>
                <PersonIcon />
              </ListItemIcon>
            </span>
            <span className={classes.menuListItemLinkCell}>
              <ListItemText className={classes.menuListItemText} inset primary={localize('MY_PROFILE')} />
            </span>
          </NavLink>
        </MenuItem>

        {this.props.privilege && (this.props.privilege.values.user && this.props.privilege.values.user.list) &&
          <MenuItem className={classes.menuListItem} onClick={this.closeMenu} style={styles.link}>
            <NavLink className={classes.menuListItemLink} to={routeConstants.USER_MANAGEMENT} activeClassName={classes.activeLink}>

              <span className={classes.menuListItemLinkCell}>
                <ListItemIcon className={classes.menuListItemIcon}>
                  <PeopleIcon />
                </ListItemIcon>
              </span>
              <span className={classes.menuListItemLinkCell}>
                <ListItemText className={classes.menuListItemText} inset primary={localize('MANAGE_USERS')} />
              </span>

            </NavLink>
          </MenuItem>
        }

        {this.props.privilege && (this.props.privilege.values.group && this.props.privilege.values.group.list) &&
          <MenuItem className={classes.menuListItem} onClick={this.closeMenu} style={styles.link}>
            <NavLink className={classes.menuListItemLink} to={routeConstants.GROUP_MANAGEMENT} activeClassName={classes.activeLink}>

              <span className={classes.menuListItemLinkCell}>
                <ListItemIcon className={classes.menuListItemIcon}>
                  <GroupIcon />
                </ListItemIcon>
              </span>
              <span className={classes.menuListItemLinkCell}>
                <ListItemText className={classes.menuListItemText} inset primary={localize('MANAGER_GROUPS')} />
              </span>

            </NavLink>
          </MenuItem>
        }

        {this.props.privilege && (this.props.privilege.values.role && this.props.privilege.values.role.list) &&
          <MenuItem className={classes.menuListItem} onClick={this.closeMenu} style={styles.link} >
            <NavLink className={classes.menuListItemLink} to={routeConstants.ROLE_MANAGEMENT} activeClassName={classes.activeLink}>

              <span className={classes.menuListItemLinkCell}>
                <ListItemIcon className={classes.menuListItemIcon}>
                  <RoleIcon />
                </ListItemIcon>
              </span>
              <span className={classes.menuListItemLinkCell}>
                <ListItemText className={classes.menuListItemText} inset primary={localize('MANAGE_ROLES')} />
              </span>

            </NavLink>
          </MenuItem>
        }

        {this.props.auth && !this.props.auth.interAppAuth &&
        <MenuItem className={classes.menuListItem} onClick={(e) => { this.closeMenu(e, this.changePasswordView) }}>
          <div className={classes.menuListItemLink}>

            <span className={classes.menuListItemLinkCell}>
              <ListItemIcon className={classes.menuListItemIcon}>
                <ChangePasswordIcon />
              </ListItemIcon>
            </span>
            <span className={classes.menuListItemLinkCell}>
              <ListItemText className={classes.menuListItemText} inset primary={localize('CHANGE_PASSWORD')} />
            </span>

          </div>
        </MenuItem>}

        {this.props.auth && !this.props.auth.interAppAuth &&
        <MenuItem className={classes.menuListItem}>
          <span className={classes.menuListItemLink} >
            <Button className={classes.menuListItemButton} color='primary' onClick={(e) => { this.closeMenu(e, this._logout) }} size='medium' fullWidth={false}>
              {localize('LOGOUT')}
            </Button>
          </span>
        </MenuItem>}

      </Menu>
    )
  }

  /**
    * React lifecycle method
  */
  componentDidUpdate(prevProps) {
    if (!this.props.auth.loggedIn && prevProps.auth.loggedIn) {
      const snack = {
        message: this.props.localize('LOGGED_OUT_SUCCESS')
      }
      this.props.updateUserSettings(Object.assign({}, this.props.userSettings, { token: null }))
      this.props.updateSnack(snack)
      this.props.history.replace('/logout')
      this.closeChangePassword()
    }
    if (!this.props.auth.loggedIn && !this.props.preference.cleared) {
      this.props.clearPreferences()
    }
    if (!this.props.auth.loggedIn && this.props.profile) {
      this.props.clearProfile()
    }
    if (!this.props.auth.loggedIn &&
      this.props.privilege.status === USER_PRIVILEGES_LOADED_STATUS &&
      this.props.privilege.status !== GLOBAL_PRIVILEGES_LOADING_STATUS) {
      this.props.fetchGlobalPrivileges(getAuthenticationURL())
    }
    if (!this.props.auth.loggedIn && prevProps.auth.loggedIn) {
      this.props.fetchGuestPreferences(getAuthenticationURL())
    }
    if (this.props.auth.loggedIn && !prevProps.auth.loggedIn) {
      this.props.fetchProfile(this.props.auth.username, getAuthenticationURL())
    }
    if (this.props.profileStatus === PROFILE_CREATED_STATUS && (prevProps.profileStatus !== this.props.profileStatus)) {
      this.props.profile.passwordResetRequired && this.changePasswordView()
      this.props.fetchUserPreferences(this.props.profile.id, getAuthenticationURL())
    }
    if (this.props.auth.loggedIn &&
      (this.props.privilege.status === GUEST_PRIVILEGES_LOADED_STATUS) &&
      (this.props.privilege.status !== USER_PRIVILEGES_LOADING_STATUS)) {
      this.props.fetchUserPrivileges(getAuthenticationURL())
    }
  }

  /**
    * React lifecycle method
  */

  componentWillMount() {
    if (this.props.auth.loggedIn) {
      this.props.fetchProfile(this.props.auth.username, getAuthenticationURL())
    } else {
      this.props.fetchGuestPreferences(getAuthenticationURL())
    }
  }
  /**
    *React lifecycle method
  */
  componentWillUnmount() {

  }

  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in div
  */
  render() {
    let avatar = <DefaultUserIcon color={'primary'} />
    const { classes, localize } = this.props
    var userName = ''
    let menuOptions = this.setGuestMenu(theme)
    let title = 'Login'

    if (this.props.auth.loggedIn) {
      avatar = <Avatar style={{ backgroundColor: indigo900 }}>{
        this.props.profile
          ? ((this.props.profile.firstName[0].toUpperCase()) + (this.props.profile.lastName[0].toUpperCase())) : ''}
      </Avatar>
      menuOptions = this.setUserMenu(theme)
      title = this.props.profile ? this.props.profile.firstName : ''
    }
    if (this.props.profile) {
      userName = (this.props.profile.firstName + ' ' + this.props.profile.lastName)
    }
    return (
      <React.Fragment>
        <List className={classes.avtarList}>
          <ListItem onClick={this.openMenu} className={classes.avtarListItem} title={userName}>
            <IconButton className={classes.avtarListItemImage}>
              {avatar}
            </IconButton>
            <ListItemText className={classes.avtarListItemText} primary={userName} />
            <IconButton className={classes.upDownArrow} aria-label='More' aria-haspopup='true' onClick={this.openMenu}>
              {this.state.isDownArrowClicked ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </ListItem>
        </List>
        {menuOptions}
        {
          this.state.changePasswordOpen && <ChangePassword primaryHeader={localize('CHANGE_PASSWORD')} onCancel={this.closeChangePassword} />
        }
      </React.Fragment>
    )
  }
}

export default withRouter(connect(mapStateToProps, {
  logout,
  updateUserSettings,
  updatePreferences,
  setGlobalPreferenceToStorage,
  editUserPreferences,
  saveUserPreferences,
  fetchUserPreferences,
  fetchGuestPreferences,
  clearPreferences,
  fetchProfile,
  clearProfile,
  fetchUserPrivileges,
  fetchGlobalPrivileges,
  updateSnack
})(withStyles(styles, { withTheme: true })(embedI18n(ProfileAvatar))))

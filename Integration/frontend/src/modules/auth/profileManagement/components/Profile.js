/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/** MUI */
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

/** Local */
import styles from './../styles'
import { EditableList } from '../../../../components'
import { actions } from '../../../auth'
import { getAuthenticationURL } from '../../../../services/httpRequest'
import { updateSnack } from '../../../../services/snackbar'
import { updateBreadcrumb } from '../../../../services/breadcrumb'
import { GUEST_PRIVILEGES_LOADED_STATUS } from '../../../../services/privileges'
import { APPLICATION_INDEX_ROUTE } from '../../../routes'
import { embedI18n } from '../../../../services/I18nl10n'


const { profileReduxActions } = actions
const { PROFILE_EDITED_STATUS,
  PROFILE_EDITING_STATUS } = profileReduxActions.statusConstants
const { fetchProfile,
  editProfile,
  validateEmail,
  clearProfile } = profileReduxActions.features
/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state) => {
  return {
    auth: state.authentication,
    profileManagement: state.profileManagement,
    privilege: state.privileges
  }
}

/**
  * ProfileManagementContainer
  *
*/
export class ProfileManagementContainer extends Component {

  /**
    *Validation for props (Static propTypes)
    * @static
    * @type {object} validators
      {
        PropTypes profileManagement object,
        PropTypes auth object,
        PropTypes fetchProfile function,
        PropTypes updateSnack function,
        PropTypes editProfile object,
        PropTypes clearProfile function,
        PropTypes loader object
      }
  */
  static propTypes = {
    classes: PropTypes.object,
    profileManagement: PropTypes.object,
    auth: PropTypes.object,
    fetchProfile: PropTypes.func,
    updateSnack: PropTypes.func,
    editProfile: PropTypes.func,
    clearProfile: PropTypes.func,
    validateEmail: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object,
    updateBreadcrumb: PropTypes.func
  }

  /**
    * creates a instance of ProfileManagementContainer.
    * @param {object} props
  */
  constructor(props) {
    super(props)
    this.state = {}
    this.editProfile = this.editProfile.bind(this)
  }

  /**
    * React lifecycle method :
  */
  componentWillMount() {
    if (!this.props.auth.loggedIn) {
      this.props.updateSnack({ message: this.props.localize('PLEASE_LOGIN') })
      this.props.history.replace(APPLICATION_INDEX_ROUTE)
    } else {
      this.props.updateBreadcrumb(this.props.location.pathname)
      this.props.fetchProfile(this.props.auth.username, getAuthenticationURL())
    }
  }
  /**
    * React lifecycle method :
  */
  shouldComponentUpdate(nextProps) {
    if (!nextProps.auth.loggedIn && (nextProps.privilege.status === GUEST_PRIVILEGES_LOADED_STATUS)) {
      nextProps.updateSnack({ message: 'Please login to view your profile.' })
      this.props.history.replace(APPLICATION_INDEX_ROUTE)
      return false
    } else {
      return true
    }
  }

  componentWillReceiveProps(nextProps) {
    const profile = nextProps.profileManagement.profile
    profile && this.setState({
      username: { value: profile.username },
      groupNames: this.state.groupNames || {
        value: (profile.groups[0]
          ? profile.groups[0].name : '')
      },
      firstName: this.state.firstName || { value: profile.firstName },
      lastName: this.state.lastName || { value: profile.lastName },
      userId: { value: profile.id },
      email: this.state.email || { value: profile.email }
    })
  }

  /**
    * React lifecycle method :
  */
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.profileManagement.status === PROFILE_EDITED_STATUS) {
      nextProps.fetchProfile(nextProps.auth.username, getAuthenticationURL())
    }
  }

  /**
    * React lifecycle method :
  */
  /** @ignore */
  componentWillUnmount() {
  }

  /**
    *Edit Profile
  */
  // editProfile (keylist, value) {
  //   let res = keylist.reduce(function (acc, key, keyindex) {
  //     return (Object.assign({}, acc, {
  //       [key] : value[keyindex]
  //     }))
  //   }, {})
  //   this.setState(res, this.apiCall)
  // }
  /**
    * Save Profile through API
  */
  editProfile(payload) {
    const { username,
      groupNames,
      firstName,
      lastName,
      userId,
      email } = Object.assign({}, this.state, payload || {})
    this.props.editProfile(getAuthenticationURL(),
      {
        username: username.value,
        groupNames: groupNames.value,
        firstName: firstName.value,
        lastName: lastName.value,
        userId: userId.value,
        email: email.value
      })
  }

  listRowHandler = () => {
    const profile = this.props.profileManagement.profile
    profile && this.setState({
      username: { value: profile.username },
      groupNames: {
        value: (profile.groups[0]
          ? profile.groups[0].name : '')
      },
      firstName: { value: profile.firstName },
      lastName: { value: profile.lastName },
      userId: { value: profile.id },
      email: { value: profile.email }
    })
  }

  /**
    * Show Snackbar
  */
  showGenericError = (profile) => {
    if (profile.status) {
      var snack = {
        message: profile.message,
        action: Boolean(profile.log) && this.props.REPORT('REPORT'),
        log: Boolean(profile.log) && profile.log
      }
      this.props.updateSnack(snack)
    }
  }

  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement}
  */
  render() {
    // filterkeys will be fetched from API in future
    // const filterKeys = this.props.profileManagement.filterkeys
    const { classes, localize } = this.props

    const filterKeys = [{
      keys: [localize('FIRST_NAME'), localize('LAST_NAME')],
      label: localize('NAME'),
      editable: true,
      fetchState: (obj) => {
        this.setState((prevState) => {
          return { [obj.name]: Object.assign({}, prevState[obj.name], { ...obj }) }
        })
      },
      trim: true,
      getErrorText: () => {
        return {
          firstName: this.state.firstName && this.state.firstName.errorMessage,
          lastName: this.state.firstName && this.state.lastName.errorMessage
        }
      },
      regex: [/^([\w]){1,20}$/]
    },
    {
      keys: ['username'],
      label: localize('USER_NAME'),
      editable: false
    },
    {
      keys: ['groups'],
      label: localize('GROUP'),
      editable: false
    },
    {
      keys: ['email'],
      label: localize('EMAIL_ADDRESS'),
      editable: true,
      onBlurValidation: (email) => this.props.validateEmail(email, getAuthenticationURL()),
      fetchState: (obj) => {
        this.setState((prevState) => {
          return { [obj.name]: Object.assign({}, prevState[obj.name], { ...obj }) }
        })
      },
      trim: false,
      getErrorText: () => {
        return {
          email: (this.state.email && (this.state.email.blurred || this.state.email.paused) &&
            this.props.profileManagement.status === 'INVALID_EMAIL'
            ? (this.state.email.errorMessage || 'Email already exists.') : this.state.email.errorMessage)
        }
      },
      regex: [/^[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/]
    }]

    const userProfilelist = this.props.profileManagement.profile &&
      Object.assign({}, this.props.profileManagement.profile, {
        groups: this.props.profileManagement.profile.groups.length
          ? this.props.profileManagement.profile.groups[0].displayName : localize('NO_GROUP_ASSIGNED'),
        name: this.props.profileManagement.profile.firstName + ' ' + this.props.profileManagement.profile.lastName
      })
    // if (keyitem === 'groups') {
    //   return (Object.assign({}, {
    //     key : keyitem,
    //     value : this.props.profileManagement.profile[keyitem][0]
    //     ? this.props.profileManagement.profile[keyitem][0].displayName : 'No Group(s) assigned'
    //   }))
    // } else {
    //   return (Object.assign({}, {
    //     key : keyitem,
    //     value : this.props.profileManagement.profile[keyitem]
    //   }))
    // }
    return (
      <Paper className={classes.wrapperPaper} elevation={4}>

        <div className={classes.tableHeader}>
          <AppBar position='static' color='default' className={classes.tableHeaderPaper}>
            <div className={classes.tableHeaderToolbar}>
              <div className={classes.tableHeaderBlock}>
                <Typography variant='title' color='inherit' >
                  {localize('MY_PROFILE')}
                </Typography>
              </div>
            </div>
          </AppBar>
        </div>

        <div className={classes.wrapperContainer}>
          <div className={classes.wrapperContent}>
            {this.props.profileManagement.profile && <EditableList
              selectedIndex={0}
              list={userProfilelist}
              dataKeys={filterKeys}
              saveHandler={this.editProfile}
              editInProgress={this.props.profileManagement.status === PROFILE_EDITING_STATUS}
              onListClick={this.listRowHandler} />}
          </div>
          <div className={classes.wrapperContent}>
            {this.props.profileManagement.message && this.showGenericError(this.props.profileManagement)}
          </div>
        </div>
      </Paper>
    )
  }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, {
  fetchProfile,
  editProfile,
  validateEmail,
  clearProfile,
  updateSnack,
  updateBreadcrumb
})(embedI18n(ProfileManagementContainer))))

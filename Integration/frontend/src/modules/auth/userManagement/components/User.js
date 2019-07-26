/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/** MUI */
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ContentAdd from '@material-ui/icons/Add'

/** Locals */
import { EditableTable, ConfirmationDialog } from '../../../../components'
import CreateUser from './CreateUser'
import EditUser from './EditUser'
import ResetPassword from './ResetPassword'
import { updateSnack } from '../../../../services/snackbar'
import { updateBreadcrumb } from '../../../../services/breadcrumb'
import { actions } from '../../../auth'
import { getAuthenticationURL } from '../../../../services/httpRequest'
import { USER_PRIVILEGES_LOADED_STATUS, GUEST_PRIVILEGES_LOADED_STATUS } from '../../../../services/privileges'
import { APPLICATION_INDEX_ROUTE } from '../../../routes'
import { embedI18n } from '../../../../services/I18nl10n'

const styles = theme => ({

})

const { userReduxActions } = actions
const { features } = userReduxActions

/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state) => {
  return {
    auth: state.authentication,
    privilege: state.privileges,
    userManagement: state.userManagement
  }
}

/**
  * UserManagementContainer
*/
export class UserManagementContainer extends Component {

  /**
    *Validation for props (Static propTypes)
    * @static
    * @type {object} validators
      {
        PropTypes userManagement object,
        PropTypes fetchAllUsers function,
        PropTypes auth function,
        PropTypes clear function,
        PropTypes removeUser function,
        PropTypes privilege object,
        PropTypes updateSnack function,
        PropTypes loader function,
      }
  */
  static propTypes = {
    userManagement: PropTypes.object,
    fetchAllUsers: PropTypes.func,
    auth: PropTypes.object,
    clear: PropTypes.func,
    removeUser: PropTypes.func,
    privilege: PropTypes.object,
    updateSnack: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object,
    updateBreadcrumb: PropTypes.func
  }

  /**
    * creates a instance of UserManagementContainer.
    * @param {object} props
  */
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      modalView: null,
      selectedUser: null
    }
  }

  isPrivileged = (props) => {
    if (props.auth.loggedIn && (props.privilege.status === USER_PRIVILEGES_LOADED_STATUS)) {
      if (props.privilege.values.user && !props.privilege.values.user.list) {
        props.updateSnack({ message: 'No permissions to manage users.' })
        this.props.history.replace(APPLICATION_INDEX_ROUTE)
        return false
      } else {
        return true
      }
    } else if (!props.auth.loggedIn && (props.privilege.status === GUEST_PRIVILEGES_LOADED_STATUS)) {
      if (props.privilege.values.user && !props.privilege.values.user.list) {
        props.updateSnack({ message: 'Please login to manage users.' })
        this.props.history.replace(APPLICATION_INDEX_ROUTE)
        return false
      } else {
        return true
      }
    } else {
      return Boolean(props.auth.loggedIn)
    }
  }
  /**
    * React lifecycle method
  */
  shouldComponentUpdate(nextProps) {
    return this.isPrivileged(nextProps)
  }

  /**
    * React lifecycle method
  */
  componentWillUpdate(nextProps) {
    if (this.props.userManagement.status !== nextProps.userManagement.status &&
      !nextProps.userManagement.status) {
      this.props.fetchAllUsers(getAuthenticationURL())
    }
    // } else if (this.props.userManagement.status === nextProps.userManagement.status &&
    //   nextProps.userManagement.status) {
    //   this.props.clear()
    // }
  }
  /**
    * React lifecycle method
  */
  componentWillMount() {
    if (this.isPrivileged(this.props)) {
      this.props.updateBreadcrumb(this.props.location.pathname)
      this.props.fetchAllUsers(getAuthenticationURL())
    }
  }

  /**
    * React lifecycle method
  */
  componentWillUnmount() {
    this.state = {
      modalOpen: false,
      modalView: null,
      selectedUser: null
    }
    this.props.clear()
  }

  /**
    * Reset Popup
  */
  ressetPopUp = () => {
    this.props.clear()
    this.setState({
      modalOpen: true,
      modalView: {
        component: ResetPassword,
        props: {
          onSuccess: this.closeModal,
          selectedUser: this.state.selectedUser
        }
      }
    })
  }
  /**
    * Close Reset Popup
  */
  closeResetPopup = () => {
    this.setState({ modalOpen: false, modelView: null })
  }

  /**
    * Create User modal
  */
  createUser = () => {
    this.props.clear()
    this.setState({
      modalOpen: true,
      modalView: {
        component: CreateUser,
        props: {
          onSuccess: this.closeModal
        }
      }
    })
  }

  /**
    * Edit User Popup
  */
  editUser = () => {
    this.setState({
      modalOpen: true,
      modalView: {
        component: EditUser,
        props: {
          onSuccess: this.closeModal,
          selectedUser: this.state.selectedUser
        }
      }
    })
  }

  deleteUser = () => {
    const {localize} = this.props;
    this.setState({
      modalOpen: true,
      modalView: {
        component: ConfirmationDialog,
        props: {
          onSuccess: this.closeModal,
          title: localize('CONFIRM_DELETE'),
          message: localize('DELETE_WARNING'),
          submitAction: this.userDelete
        }
      }
    })
  }

  userDelete = () => {
    this.props.removeUser(this.state.selectedUser.id, this.state.selectedUser.username, getAuthenticationURL())
  }

  closeModal = () => {
    this.setState({ modalOpen: false, modelView: null })
  }

  /**
    * Manage Options
  */
  manageOptions = (option) => {
    this.props.clear()
    const {localize} = this.props;
    if (this.state.selectedUser) {
      switch (option) {
        case localize('EDIT'):
          this.editUser()
          break
        case localize('SMALL_DELETE'):
          this.deleteUser()
          break
        case 'DISABLE':
          break
        case localize('RESET_PASSWORD'):
          this.ressetPopUp()
          break
      }
    }
  }

  /**
    * Option Clicked
  */
  optionClicked = (user) => {
    this.props.clear()
    this.setState({
      selectedUser: user
    })
  }
  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in div
  */
  render() {
    const { localize } = this.props;
    const filterKeys = [{
      keys: ['firstName', 'lastName'],
      label: localize('NAME')
    }, {
      keys: ['username'],
      label: localize('USER_NAME')
    }, {
      keys: ['groups'],
      label: localize('GROUP(S)')
    }, {
      keys: ['options']
    }]

    const detailKeys = filterKeys.concat([{
      keys: ['email'],
      label: localize('EMAIL_ID')
    }, {
      keys: ['createdBy'],
      label: localize('CREATED_BY')
    }, {
      keys: ['privileges'],
      label: localize('PRIVILEGES')
    }])

    const userPrivileges = this.props.privilege.values.user
    const passwordPrivileges = this.props.privilege.values.password
    const users = this.props.userManagement.users &&
      this.props.userManagement.users.map(user => (
        Object.assign({}, user, {
          options: [{ label: localize('EDIT'), key: 'Edit', visible: userPrivileges && userPrivileges.modify },
          { label: localize('SMALL_DELETE'), key: 'Delete', visible: userPrivileges && userPrivileges.delete },
          { label: localize('RESET_PASSWORD'), key: 'Reset Password', visible: userPrivileges && passwordPrivileges && passwordPrivileges.reset }],
          createdBy: user.createdBy,
          groups: user.groups.map(group => (group.displayName)),
          groupCodes: user.groups.map(group => (group.name)),
          privileges: user.groups
            .map(group => group.roles.map(role => role.privileges.map(privilege => privilege.displayName)).pop()).pop(),
          email: user.email
        }
        )))
    const ModalView = this.state.modalView && this.state.modalView.component
    const modalViewProps = this.state.modalView && this.state.modalView.props
    return (

      <div>

        {
          userPrivileges && userPrivileges.create &&
          <div style={{ top: '83px', right: '30px', position: 'fixed' }}>
            <Button variant='fab' color='primary' onClick={this.createUser}>
              <ContentAdd />
            </Button>
          </div>
        }

        <div>
          {
            users && users.length ? <EditableTable
              selectedIndex={0}
              dataKeys={filterKeys}
              detailKeys={detailKeys}
              title={localize('MANAGE_USERS')}
              data={users}
              options={(Boolean(userPrivileges &&
                userPrivileges.modify ||
                userPrivileges.delete)) ||
                (Boolean(passwordPrivileges &&
                  passwordPrivileges.reset))}
              onTapOptions={this.optionClicked}
              onOptionsSelect={this.manageOptions} />
              : (!this.props.userManagement.loading && <div>
                {localize('NO_USER_EXIST')}
                </div>)
          }
        </div>

        {
          this.state.modalOpen &&
          ModalView && <ModalView onCancel={this.closeModal}
            {...modalViewProps} />
        }

        {
          Boolean(this.props.userManagement.message) &&
          this.props.updateSnack({
            action: Boolean(this.props.userManagement.log) && 'REPORT',
            log: Boolean(this.props.userManagement.log) && this.props.userManagement.log,
            message: localize(this.props.userManagement.message)
          })
        }

      </div>

    )
  }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, { ...features, updateSnack, updateBreadcrumb })(embedI18n(UserManagementContainer))))

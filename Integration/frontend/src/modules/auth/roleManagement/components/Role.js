/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/** MUI */
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ContentAdd from '@material-ui/icons/Add'

/** Local */
import { EditableTable, ConfirmationDialog } from '../../../../components'
import CreateRole from './CreateRole'
import EditRole from './EditRole'
import { USER_PRIVILEGES_LOADED_STATUS, GUEST_PRIVILEGES_LOADED_STATUS } from '../../../../services/privileges'
import { actions } from '../../../auth'
import { getAuthenticationURL } from '../../../../services/httpRequest'
import { updateSnack } from '../../../../services/snackbar'
import { updateBreadcrumb } from '../../../../services/breadcrumb'
import theme from '../../../../theme'
import { APPLICATION_INDEX_ROUTE } from '../../../routes'
import { embedI18n } from '../../../../services/I18nl10n'

const styles = (theme) => ({

})

const { roleReduxActions } = actions
const { fetchAllRoles,
  removeRole,
  clear } = roleReduxActions
/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state) => {
  return {
    privilege: state.privileges,
    roleManagement: state.roleManagement,
    profileManagement: state.profileManagement
  }
}

/**
  * RoleManagementContainer
*/
export class RoleManagementContainer extends Component {
  static propTypes = {
    roleManagement: PropTypes.object,
    fetchAllRoles: PropTypes.func,
    auth: PropTypes.object,
    clear: PropTypes.func,
    removeRole: PropTypes.func,
    privilege: PropTypes.object,
    updateSnack: PropTypes.func,
    history:PropTypes.object,
    location:PropTypes.object,
    updateBreadcrumb:PropTypes.func
  }

  /**
    * creates a instance of RoleManagementContainer.
    * @param {object} props
  */
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
      modalView: null,
      selectedRole: null
    }
  }

  isPrivileged = (props) => {
    const viewRolePrivilege = props.privilege.values.role && props.privilege.values.role.list
    // props.privilege.loading && props.updateSnack({ message:'Loading Permissions.' })
    !props.privilege.loading && !viewRolePrivilege && props.updateSnack({ message:'No permissions to manage roles.' })
    return Boolean(viewRolePrivilege)
  }

  /**
    * React lifecycle method
    * Checks if a user has a privilege to view this component
  */
  shouldComponentUpdate (nextProps) {
    return this.isPrivileged(nextProps)
  }

  /**
    * React lifecycle method
    * Fetching the roles set after operations (create,update,delete) on roles
  */
  componentWillUpdate (nextProps) {
    if ((this.props.roleManagement.status !== nextProps.roleManagement.status) &&
      !nextProps.roleManagement.status) {
      this.props.fetchAllRoles(getAuthenticationURL())
    }
    // else if (this.props.roleManagement.status === nextProps.roleManagement.status &&
    //   nextProps.roleManagement.status) {
    //   this.props.clear()
    // }
  }
  /**
    * React lifecycle method
    * Fetching the roles set on initiation
  */
  componentDidMount () {
  //  if (this.isPrivileged(this.props)) {
    this.props.updateBreadcrumb(this.props.location.pathname)
    this.props.fetchAllRoles(getAuthenticationURL())
    // }
  }

  /**
    * React lifecycle method
    * Default the state on component removal from UI
  */
  componentWillUnmount () {
    this.state = {
      modalOpen: false,
      modalView: null,
      selectedRole: null
    }
    this.props.clear()
  }

  /**
    * Create a role
    * Sets the modal view for create role
  */
  createRole = () => {
    this.props.clear()
    this.setState({
      modalOpen: true,
      modalView: {
        component: CreateRole,
        props: {
          onSuccess: this.closeModal
        }
      }
    })
  }

  /**
  * Edit a role
  * Sets the modal view for edit role
  */
  editRole = () => {
    this.setState({
      modalOpen: true,
      modalView: {
        component: EditRole,
        props: {
          onSuccess: this.closeModal,
          selectedRole: this.state.selectedRole
        }
      }
    })
  }

  deleteRole = () => {
    const {localize} = this.props;
    this.setState({
      modalOpen: true,
      modalView: {
        component: ConfirmationDialog,
        props: {
          onSuccess: this.closeModal,
          title: localize('CONFIRM_DELETE'),
          message: localize('DELETE_ROLE_WARNING'),
          submitAction: this.roleDelete
        }
      }
    })
  }

  roleDelete = () => {
    this.props.removeRole(this.state.selectedRole.id, getAuthenticationURL())
  }

  /**
    * close modal popup on successfull role creation or updation
  */
  closeModal = () => {
    this.setState({ modalOpen: false, modelView: null })
  }

  /**
    * Manage Options Handler
    * Runs a function corresponding to the option clicked
  */
  manageOptions = (option) => {
    this.props.clear()
    const {localize} = this.props;
    if (this.state.selectedRole) {
      switch (option) {
        case localize('EDIT'):
          this.editRole()
          break
        case localize('SMALL_DELETE'):
          this.deleteRole()
          break
        case 'DISABLE':
          break
      }
    }
  }
  /**
    * Option Icon Click handler
    * Selects the clicked role for further operations
  */
  optionClicked = (role) => {
    this.props.clear()
    this.setState({
      selectedRole: role
    })
  }

  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in div
  */
  render () {
    const { localize } = this.props;
    // keys to be shown in tabular format
    const filterKeys = [{
      keys: ['displayName'],
      label: localize('ROLE_NAME')
    }, {
      keys: ['name'],
      label: localize('ROLE_CODE')
    }, {
      keys: ['createdBy'],
      label: localize('CREATED_BY')
    }, {
      keys: ['options']
    }]

    // details to be shown on selecting a role
    const detailKeys = filterKeys.concat([{
      keys: ['privileges'],
      label: localize('PRIVILEGES')
    }])

    const userRoleNames = this.props.profileManagement.status === 'PROFILE_CREATED_STATUS' ? this.props.profileManagement.profile.groups.reduce((a, c) => [...a, ...c.roles], []).map(r => r.name) : []

    const rolePrivileges = this.props.privilege.values.role
    // prepare the roles object with required keys
    const roles = this.props.roleManagement.roles &&
      this.props.roleManagement.roles.map(role => (
        Object.assign({}, role, {
          options: [{ label: localize('EDIT'), key: 'Edit', visible: rolePrivileges && rolePrivileges.modify },
          { label: localize('SMALL_DELETE'), key: 'Delete', visible: rolePrivileges && rolePrivileges.delete }],
          createdBy: role.createdBy,
          isOptionDisabled: userRoleNames.includes(role.name),
          privileges: role.privileges.map(privilege => privilege.displayName),
          privilegeCodes: role.privileges.map(privilege => privilege.name)
        }
        )))

    const ModalView = this.state.modalView && this.state.modalView.component
    const modalViewProps = this.state.modalView && this.state.modalView.props

    return (
      <div>

        {
          rolePrivileges && rolePrivileges.create &&
          <div style={{ top: '83px', right: '30px', position: 'fixed' }}>
            <Button variant='fab' color='primary' onClick={this.createRole}>
              <ContentAdd />
            </Button>
          </div>
        }

        <div>
          {
            roles && roles.length ? <EditableTable
              selectedIndex={0}
              dataKeys={filterKeys}
              detailKeys={detailKeys}
              title={localize('MANAGE_ROLES')}
              data={roles}
              options={Boolean(rolePrivileges &&
                (rolePrivileges.modify ||
                  rolePrivileges.delete))}
              onTapOptions={this.optionClicked}
              onOptionsSelect={this.manageOptions} />
              : (!this.props.roleManagement.loading && <div
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  textAlign: 'center',
                  marginTop: '10%',
                  color: theme.palette.primary1Color
                }}>
                {localize('NO_ROLE_EXIST')}
              </div>)
          }
        </div>

        {
          this.state.modalOpen &&
          ModalView && <ModalView onCancel={this.closeModal}
            {...modalViewProps} styles={{ margin: '10px auto', backgroundColor: 'white' }} />
        }

        {
          Boolean(this.props.roleManagement.message) &&
          this.props.updateSnack({
            action: Boolean(this.props.roleManagement.log) && localize('REPORT'),
            log: Boolean(this.props.roleManagement.log) && this.props.roleManagement.log,
            message: this.props.roleManagement.message
          })
        }

      </div>
    )
  }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps,
  { fetchAllRoles, removeRole, clear, updateSnack, updateBreadcrumb })(embedI18n(RoleManagementContainer))))

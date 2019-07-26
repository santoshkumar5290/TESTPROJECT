/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/** MUI */
import Button from '@material-ui/core/Button'
import ContentAdd from '@material-ui/icons/Add'

/** Local */
import { EditableTable, ConfirmationDialog } from '../../../../components'
import CreateGroup from './CreateGroup'
import EditGroup from './EditGroup'
import { USER_PRIVILEGES_LOADED_STATUS, GUEST_PRIVILEGES_LOADED_STATUS } from '../../../../services/privileges'
import { actions } from '../../../auth'
import { getAuthenticationURL } from '../../../../services/httpRequest'
import { updateSnack } from '../../../../services/snackbar'
import { updateBreadcrumb } from '../../../../services/breadcrumb'
import theme from '../../../../theme'
import { APPLICATION_INDEX_ROUTE } from '../../../routes'
import { embedI18n } from '../../../../services/I18nl10n'

const { groupReduxActions } = actions
const { fetchAllGroups, removeGroup, clear } = groupReduxActions.features

/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state) => {
  return {
    auth: state.authentication,
    privilege: state.privileges,
    groupManagement: state.groupManagement,
    profileManagement: state.profileManagement
  }
}

/**
  * GroupManagementContainer
*/
export class GroupManagementContainer extends Component {

  static propTypes = {
    groupManagement: PropTypes.object,
    fetchAllGroups: PropTypes.func,
    auth: PropTypes.object,
    clear: PropTypes.func,
    removeGroup: PropTypes.func,
    privilege: PropTypes.object,
    updateSnack: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object,
    updateBreadcrumb: PropTypes.func
  }

  /**
    * creates a instance of GroupManagementContainer.
    * @param {object} props
  */
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      modalView: null,
      selectedGroup: null
    }
  }

  isPrivileged = (props) => {
    if (props.auth.loggedIn && (props.privilege.status === USER_PRIVILEGES_LOADED_STATUS)) {
      if (props.privilege.values.group && !props.privilege.values.group.list) {
        props.updateSnack({ message: 'No permissions to manage groups.' })
        this.props.history.replace(APPLICATION_INDEX_ROUTE)
        return false
      } else {
        return true
      }
    } else if (!props.auth.loggedIn && (props.privilege.status === GUEST_PRIVILEGES_LOADED_STATUS)) {
      if (props.privilege.values.group && !props.privilege.values.group.list) {
        props.updateSnack({ message: 'Please login to manage groups.' })
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
    if ((this.props.groupManagement.status !== nextProps.groupManagement.status) &&
      !nextProps.groupManagement.status) {
      this.props.fetchAllGroups(getAuthenticationURL())
    }
  }
  /**
    * React lifecycle method
  */
  componentWillMount() {
    if (this.isPrivileged(this.props)) {
      this.props.updateBreadcrumb(this.props.location.pathname)
      this.props.fetchAllGroups(getAuthenticationURL())
    }
  }

  /**
    * React lifecycle method
  */
  componentWillUnmount() {
    this.state = {
      modalOpen: false,
      modalView: null,
      selectedGroup: null
    }
    this.props.clear()
  }

  /**
    * Component Group modal
  */
  createGroup = () => {
    this.props.clear()
    this.setState({
      modalOpen: true,
      modalView: {
        component: CreateGroup,
        props: {
          onSuccess: this.groupCreated
        }
      }
    })
  }

  /**
    * Modal popup closed after Group is created
  */
  groupCreated = () => {
    this.setState({ modalOpen: false, modelView: null })
  }

  /**
    * Component EditGroup Modal
  */
  editGroup = () => {
    this.setState({
      modalOpen: true,
      modalView: {
        component: EditGroup,
        props: {
          onSuccess: this.groupEdited,
          selectedGroup: this.state.selectedGroup
        }
      }
    })
  }

  /**
    * Modal popup closed after Group is edited
  */
  groupEdited = () => {
    this.setState({ modalOpen: false, modelView: null })
  }

  deleteGroup = () => {
    const {localize} = this.props;
    this.setState({
      modalOpen: true,
      modalView: {
        component: ConfirmationDialog,
        props: {
          onSuccess: this.closeModal,
          title: localize('CONFIRM_DELETE'),
          message: localize('DELETE_GROUP_WARNING'),
          submitAction: this.groupDelete
        }
      }
    })
  }

  groupDelete = () => {
    this.props.removeGroup(this.state.selectedGroup.id, getAuthenticationURL())
  }

  /**
    * Modal popup closed
  */
  closeModal = () => {
    this.setState({ modalOpen: false, modelView: null })
  }

  /**
    * Manage Options
  */
  manageOptions = (option) => {
    this.props.clear()
    const {localize} = this.props;
    if (this.state.selectedGroup) {
      switch (option) {
        case localize('EDIT'):
          this.editGroup()
          break
        case localize('SMALL_DELETE'):
          this.deleteGroup()
          break
        case 'DISABLE':
          break
      }
    }
  }
  /**
    * Option Clicked
  */
  optionClicked = (group) => {
    this.props.clear()
    this.setState({
      selectedGroup: group
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
      keys: ['displayName'],
      label: localize('GROUP_NAME')
    }, {
      keys: ['name'],
      label: localize('GROUP_CODE')
    }, {
      keys: ['createdBy'],
      label: localize('CREATED_BY')
    }, {
      keys: ['options']
    }]

    const detailKeys = filterKeys.concat([{
      keys: ['description'],
      label: localize('DESCRIPTION')
    },
    {
      keys: ['roles'],
      label: localize('ROLES')
    },
    {
      keys: ['privileges'],
      label: localize('PRIVILEGES')
    }
    ])

    const userGroupNames = this.props.profileManagement.status === 'PROFILE_CREATED_STATUS' ? this.props.profileManagement.profile.groups.map(group => group.name) : []
    const groupPrivileges = this.props.privilege.values.group
    const groups = this.props.groupManagement.groups &&
      this.props.groupManagement.groups.map(group => (
        Object.assign({}, group, {
          options: [{ label: localize('EDIT'), key: 'Edit', visible: groupPrivileges && groupPrivileges.modify },
          { label: localize('SMALL_DELETE'), key: 'Delete', visible: groupPrivileges && groupPrivileges.delete }],
          roles: group.roles.map(role => role.displayName),
          roleCodes: group.roles.map(role => role.name),
          isOptionDisabled:  userGroupNames.includes(group.name),
          privileges: group.roles.map(role => role.privileges.map(privilege => privilege.displayName))[0]
        }
        )))

    const ModalView = this.state.modalView && this.state.modalView.component
    const modalViewProps = this.state.modalView && this.state.modalView.props

    return (
      <React.Fragment>
        {groups && groups.length ? <EditableTable
          selectedIndex={0}
          dataKeys={filterKeys}
          detailKeys={detailKeys}
          title={localize('MANAGER_GROUPS')}
          data={groups}
          options={groupPrivileges &&
            (groupPrivileges.modify ||
              groupPrivileges.delete)}
          onTapOptions={this.optionClicked}
          onOptionsSelect={this.manageOptions} /> : (!this.props.groupManagement.loading && <div style={{
            fontSize: '16px',
            fontWeight: 600,
            textAlign: 'center',
            marginTop: '10%',
            color: theme.palette.primary1Color
          }}>
            {localize('NO_GROUP_EXIST')}
            </div>)
        }
        {groupPrivileges && groupPrivileges.create &&
          <div style={{ top: '83px', right: '30px', position: 'fixed' }}>
            <Button variant='fab' color='primary' onClick={this.createGroup}>
              <ContentAdd />
            </Button>
          </div>}
        {this.state.modalOpen &&
          ModalView && <ModalView onCancel={this.closeModal}
            {...modalViewProps} styles={{ margin: '10px auto', backgroundColor: 'white' }} />
        }
        {this.props.groupManagement.message &&
          this.props.updateSnack({
            action: Boolean(this.props.groupManagement.log) && 'REPORT',
            log: Boolean(this.props.groupManagement.log) && this.props.groupManagement.log,
            message: localize(this.props.groupManagement.message)
          })}
      </React.Fragment>
    )
  }
}

export default withRouter(connect(mapStateToProps,
  { fetchAllGroups, removeGroup, clear, updateSnack, updateBreadcrumb })(embedI18n(GroupManagementContainer)))

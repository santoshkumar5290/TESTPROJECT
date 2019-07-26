/**React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

/**MUI */
import { withStyles } from '@material-ui/core/styles'

/**Local */
import { TextField, SelectField, Modal } from '../../../../components'
import theme from '../../../../theme'
import { updateSnack } from '../../../../services/snackbar'
import { actions } from '../../../auth'
import { getAuthenticationURL } from '../../../../services/httpRequest'
import { embedI18n } from '../../../../services/I18nl10n'

const styles = (theme) => ({

  modalRow: {
    display: 'block',
    position: 'relative',
    //paddingBottom: '25px',
    '& label': {
      fontSize: '22px',
      lineHeight: '1'
    },
    '& input': {
      fontSize: '2.6rem',
      lineHeight: '1.5'
    },
    '& p': {
      fontSize: '1.8rem',
      position: 'absolute',
      bottom: '-30px',
      width: '100%'
    },
    '&:first-child > div, &:first-child > div > div': {
      marginTop: 0,
    },
    '&:last-child': {
      paddingTop: 36,
      paddingBottom: 24,
    }
  }

});


const { roleReduxActions, editGroupReduxActions } = actions
const { fetchAllRoles } = roleReduxActions.features
const { features } = editGroupReduxActions
const { GROUP_EDITED_STATUS,
  GROUP_EDITING_STATUS,
  GENERIC_ERROR_STATUS,
  INVALID_GROUP_LABEL_STATUS } = editGroupReduxActions.statusConstants

/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state, ownProps) => ({
  group: state.editGroup,
  groupManagement: state.profileManagement,
  roles: state.roleManagement ? (state.roleManagement.roles || []) : []
})

/**
  * EditUser
*/
export class EditGroup extends Component {
  static propTypes = {
    styles: PropTypes.object,
    edit: PropTypes.func,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    primaryHeader: PropTypes.string,
    secondaryHeader: PropTypes.string,
    selectedGroup: PropTypes.object,
    fetchAllRoles: PropTypes.func,
    clear: PropTypes.func,
    group: PropTypes.object,
    roles: PropTypes.array,
    role: PropTypes.array,
    groupManagement: PropTypes.object,
    validateGroupName: PropTypes.func,
    validateGroupDisplayName: PropTypes.func,
    identicalGroupName: PropTypes.func,
    identicalGroupDisplayName: PropTypes.func,
    updateSnack: PropTypes.func
  }

  /**
    * default prop values.
  */
  static defaultProps = {
    onCancel: () => { },
    edit: () => { },
    onSuccess: () => { },
    primaryHeader: 'Edit Group',
    secondaryHeader: ''
  }

  /**
    * creates a instance of EditUSer.
    * @param {object} props
  */
  constructor(props, context) {
    super(props, context)

    this.state = {
      groupCode: '',
      groupName: '',
      role: '',
      description: ''
    }
  }

  /**
    Modal pop-up Cancel
  */
  _cancel = () => {
    this.props.onCancel()
  }

  /**
    * React lifecycle method :
  */
  componentWillUpdate(nextProps) {
    if (nextProps.group.status === GROUP_EDITED_STATUS) {
      this.props.onSuccess(nextProps.group.groupData, nextProps.group.message)
    }
    if (nextProps.group.status === GENERIC_ERROR_STATUS) {
      this.setState({
        groupCode: '',
        groupName: '',
        role: '',
        description: ''
      })
    }
  }

  /**
    * React lifecycle method :
  */
  componentWillMount() {
    this.props.fetchAllRoles(getAuthenticationURL())
  }

  /**
    * React lifecycle method :
  */
  componentWillUnmount() {
    this.props.clear()
  }

  /**
    *Edit a User
  */
  _edit = () => {
    const { groupCode, groupName, role, description } = this.state

    this.props.edit({
      name: groupCode.value,
      displayName: groupName.value.toLowerCase().trim(),
      role: role.value,
      description: description.value,
      groupId: this.props.selectedGroup.id
    }, getAuthenticationURL())
  }

  /**
    *Check Group Display Name availablity
  */
  _checkGroupDisplayNameAvailable = (value) => {
    if (value.toLowerCase() !== this.props.selectedGroup.displayName.toLowerCase()) {
      this.props.validateGroupDisplayName(value, getAuthenticationURL())
    }
  }

  /**
    *Get Error Text for Generic Errors
  */
  _showGenericError(group) {
    if (group.status === GENERIC_ERROR_STATUS) {
      var snack = {
        message: group.message,
        action: Boolean(group.log) && 'REPORT',
        log: Boolean(group.log) && group.log
      }
      this.props.updateSnack(snack)
    }
  }

  /**
    *Check enabled for Create
  */
  _checkEditEnabled() {
    const { group } = this.props
    const valid = Object.values(this.state).every((field) => field.valid)
    return valid && group.status !== GROUP_EDITING_STATUS
  }

  _postValidation = (obj) => {
    this.setState((prevState) => {
      return { [obj.name]: Object.assign({}, prevState[obj.name], { ...obj }) }
    })
  }

  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in Madal,div
  */
  render() {
    const { primaryHeader, group, roles, selectedGroup, classes, localize } = this.props
    const { groupName } = this.state



    const containerStyle = {
      ...styles.container,
      ...this.props.styles
    }

    return (
      <Modal
        open
        title={primaryHeader}
        submitDisable={!this._checkEditEnabled()}
        submitAction={this._edit}
        cancelAction={this._cancel}
        submitLabel={localize('SAVE')}>

        <div style={containerStyle} className='scroll'>
          <div style={styles.accountCreateTopWrapper}>

            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                disabled
                floatingLabelText={localize('GROUP_CODE')}
                name={'groupCode'}
                value={selectedGroup.name}
                postValidation={this._postValidation}
                regex={[/^[^\s<>"'&/.\\]+$/]}
              />
            </div>
            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                floatingLabelText={localize('GROUP_NAME')}
                name={'groupName'}
                value={selectedGroup.displayName}
                onFocusOut={this._checkGroupDisplayNameAvailable}
                postValidation={this._postValidation}
                externalErrorText={groupName && (groupName.blurred || groupName.paused) &&
                  group.status === INVALID_GROUP_LABEL_STATUS
                  ? (groupName.errorMessage || localize('GROUP_NAME_EXIST')) : groupName.errorMessage}
                regex={[/^[^<>"'&/.\\]+$/]}
              />
            </div>
            <div className={classNames(classes.modalRow)}>
              <SelectField
                required
                options={roles.filter(role => (role.name !== 'ROLE_SICK_ADMIN'))}
                disabled={!roles.length}
                name={'role'}
                localize={localize}
                value={selectedGroup.roleCodes[0]}
                floatingLabelText={roles.length ? localize('ROLE') : localize('NO_ROLE_AVAILABLE')}
                postValidation={this._postValidation}
              />
            </div>
            <div className={classNames(classes.modalRow, classes.last)}>
              <TextField
                floatingLabelText={'Description'}
                name={'description'}
                value={selectedGroup.description}
                postValidation={this._postValidation}
                regex={[/.{1,64}/]}
              />
            </div>
          </div>
          {this._showGenericError(group)}
        </div>
      </Modal>
    )
  }
}

export default withStyles(styles)(connect(mapStateToProps, { ...features, fetchAllRoles, updateSnack })(embedI18n(EditGroup)))

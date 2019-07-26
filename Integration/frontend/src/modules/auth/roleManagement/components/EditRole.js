/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

/** MUI */
import { withStyles } from '@material-ui/core/styles'

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
      //paddingTop: 36,
      paddingBottom: 24,
    }
  }

})

const { editRoleReduxActions } = actions
const { ROLE_EDITED_STATUS,
  ROLE_EDITING_STATUS,
  ROLE_GENERIC_ERROR_STATUS,
  INVALID_ROLE_DISPLAYNAME_STATUS } = editRoleReduxActions.statusConstants
const { features } = editRoleReduxActions

/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state, ownProps) => {
  return {
    role: state.editRole,
    privilegeHash: state.privileges.codes || []
  }
}

/**
  * EditRole
*/
export class EditRole extends Component {
  static propTypes = {
    styles: PropTypes.object,
    edit: PropTypes.func,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    primaryHeader: PropTypes.string,
    secondaryHeader: PropTypes.string,
    fetchAllRoles: PropTypes.func,
    clear: PropTypes.func,
    validateRoleName: PropTypes.func,
    validateRoleDisplayName: PropTypes.func,
    role: PropTypes.object,
    selectedRole: PropTypes.object,
    updateSnack: PropTypes.func,
    privilegeHash: PropTypes.array
  }

  /**
    * default prop values.
  */
  static defaultProps = {
    onCancel: () => { },
    create: () => { },
    onSuccess: () => { },
    primaryHeader: 'EDIT_ROLE',
    secondaryHeader: ''
  }
  /**
    * creates a instance of CreateUser.
    * @param {object} props
  */
  constructor (props, context) {
    super(props, context)
    this.state = {
      roleCode: '',
      roleName: '',
      privileges: ''
    }
  }

  _cancel = () => {
    this.props.onCancel()
  }

  /**
    * React lifecycle method
  */
  componentWillUpdate (nextProps) {
    if (nextProps.role.status === ROLE_EDITED_STATUS) {
      this.props.onSuccess()
    }
    if (nextProps.role.status === ROLE_GENERIC_ERROR_STATUS) {
      this.setState({
        roleCode: '',
        roleName: '',
        privileges: ''
      })
    }
  }
  /**
    * React lifecycle method
  */
  componentDidUpdate (prevProps) {
    if (prevProps.role.status === ROLE_GENERIC_ERROR_STATUS) {
      prevProps.clear()
    }
  }

  /**
    * React lifecycle method :
  */
  componentWillMount () {
  }

  /**
    * React lifecycle method :
  */
  componentWillUnmount () {
    this.props.clear()
  }

  /**
    *Edit a Role
  */
  _edit = () => {
    const { roleCode, roleName, privileges } = this.state

    this.props.edit({
      name: roleCode.value,
      displayName: roleName.value.toLowerCase().trim(),
      privileges: privileges.value,
      roleId: this.props.selectedRole.id
    }, getAuthenticationURL())
  }

  /**
    *Get Error Text for Generic Error
  */
  _showGenericError (role) {
    if (role.status === ROLE_GENERIC_ERROR_STATUS) {
      var snack = {
        message: role.message,
        action: Boolean(role.log) && 'REPORT',
        log: Boolean(role.log) && role.log
      }
      this.props.updateSnack(snack)
    }
  }

  /**
    *Check role name availablity
  */
  _checkRoleNameAvailable = (value) => {
    if (value !== this.props.selectedRole.name) {
      this.props.validateRoleName(value, getAuthenticationURL())
    }
  }

  /**
    *Check role display name availablity
  */
  _checkRoleDisplayNameAvailable = (value) => {
    if (value.toLowerCase() !== this.props.selectedRole.displayName.toLowerCase()) {
      this.props.validateRoleDisplayName(value, getAuthenticationURL())
    }
  }

  _postValidation = (obj) => {
    this.setState((prevState) => {
      return { [obj.name]: Object.assign({}, prevState[obj.name], { ...obj }) }
    })
  }

  /**
    *Check enabled for save button
  */
  _checkSaveEnabled () {
    const { role } = this.props
    const valid = Object.values(this.state).every((field) => field.valid)
    return valid && role.status !== ROLE_EDITING_STATUS
  }

  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in div
  */
  render () {
    const { role, privilegeHash, primaryHeader, selectedRole, classes, localize } = this.props
    const { roleName } = this.state

    const containerStyle = {
      ...styles.container,
      ...this.props.styles
    }

    return (
      <Modal
        open
        title={localize(primaryHeader)}

        submitDisable={!this._checkSaveEnabled()}
        submitAction={this._edit}
        cancelAction={this._cancel}
        cancelLabel={localize('CANCEL')}
        submitLabel={localize('SAVE')}>

        <div className={classNames(classes.container, classes.scroll)}>
          <div className={classes.wrapper}>

            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                disabled
                value={selectedRole.name}

                floatingLabelText={localize('ROLE_CODE')}
                name={'roleCode'}
                postValidation={this._postValidation}
                regex={[/^[^\s<>"'&/.\\]+$/]}
              />
            </div>
            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                value={selectedRole.displayName}

                floatingLabelText={localize('ROLE_NAME')}
                name={'roleName'}
                onFocusOut={this._checkRoleDisplayNameAvailable}
                postValidation={this._postValidation}
                externalErrorText={roleName && (roleName.blurred || roleName.paused) &&
                  role.status === INVALID_ROLE_DISPLAYNAME_STATUS
                  ? (roleName.errorMessage || localize('ROLE_NAME_EXIST')) : roleName.errorMessage}
                regex={[/^[^<>"'&/.\\]+$/]}
              />
            </div>
            <div className={classNames(classes.modalRow)}>
              <SelectField
                required
                value={selectedRole.privilegeCodes}
                options={privilegeHash.filter(privilege =>
                  (privilege.code !== 'FULL_ACCESS')).map((privilege, index) => (
                    {
                      name: privilege.code,
                      displayName: privilege.name
                    }
                  ))}
                localize={localize}
                disabled={!privilegeHash.length}
                name={'privileges'}
                floatingLabelText={privilegeHash.length ? localize('PRIVILEGES') : localize('NO_PRIVILEGE_AVAILABLE')}
                postValidation={this._postValidation}
                multiple
              />
            </div>

          </div>
          {this._showGenericError(role)}
        </div>
      </Modal>
    )
  }
}

export default withStyles(styles)(connect(mapStateToProps, { ...features, updateSnack })(embedI18n(EditRole)))

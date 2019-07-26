/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

/** MUI */
import { withStyles } from '@material-ui/core/styles'

/** Local */
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
    '& label': {
      fontSize: '22px',
    },
    '& input': {
      fontSize: '2.2rem',
    },
    '& p': {
      fontSize: '1.4rem',
      position: 'absolute',
      bottom: '-20px',
      width: '100%',
      '& span': {
        margin: 0,
        padding: 0
      }
    },
    '&:first-child > div, &:first-child > div > div': {
      marginTop: 0,
    },
    paddingBottom: 10,
    '&:last-child': {
      //paddingTop: 36,
      paddingBottom: 24,
    }
  }
});

const { createRoleReduxActions } = actions
const { ROLE_CREATED_STATUS,
  ROLE_CREATING_STATUS,
  ROLE_GENERIC_ERROR_STATUS,
  INVALID_ROLE_NAME_STATUS,
  INVALID_ROLE_DISPLAYNAME_STATUS } = createRoleReduxActions.statusConstants
const { features } = createRoleReduxActions

/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state, ownProps) => {
  return {
    role: state.createRole,
    privilegeHash: state.privileges.codes || []
  }
}

/**
  * CreateRole
*/
export class CreateRole extends Component {

  static propTypes = {
    styles: PropTypes.object,
    create: PropTypes.func,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    primaryHeader: PropTypes.string,
    secondaryHeader: PropTypes.string,
    fetchAllRoles: PropTypes.func,
    clear: PropTypes.func,
    validateRoleName: PropTypes.func,
    validateRoleDisplayName: PropTypes.func,
    role: PropTypes.object,
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
    primaryHeader: 'CREATE_ROLE',
    secondaryHeader: ''
  }
  /**
    * creates a instance of CreateRole.
    * @param {object} props
  */
  constructor(props, context) {
    super(props, context)
    this.state = {
      roleCode: '',
      roleName: '',
      privileges: []
    }
  }

  /**
    * cancel action handler
  **/
  _cancel = () => {
    this.props.onCancel()
  }

  /**
    * React lifecycle method
    * acts on ROLE_CREATED_STATUS & ROLE_GENERIC_ERROR_STATUS
  */
  componentWillUpdate(nextProps) {
    if (nextProps.role.status === ROLE_CREATED_STATUS) {
      this.props.onSuccess()
    }
    if (nextProps.role.status === ROLE_GENERIC_ERROR_STATUS) {
      this.setState({
        roleCode: '',
        roleName: '',
        privileges: []
      })
    }
  }
  /**
    * React lifecycle method
    * resets the component on error
  */
  componentDidUpdate(prevProps) {
    if (prevProps.role.status === ROLE_GENERIC_ERROR_STATUS) {
      prevProps.clear()
    }
  }

  /**
    * React lifecycle method
    * resets the component on unmount
  */
  componentWillUnmount() {
    this.props.clear()
  }

  /**
    * Create a role
    * Calls the redux for creating a role
  */
  _create = () => {
    const { roleCode, roleName, privileges } = this.state

    this.props.create({
      name: roleCode.value,
      displayName: roleName.value.toLowerCase().trim(),
      privileges: privileges.value
    }, getAuthenticationURL())
  }

  /**
    *Error Text for Generic Error
  */
  _showGenericError(role) {
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
    *Check Role name availablity
  */
  _checkRoleNameAvailable = (value) => {
    this.props.validateRoleName(value, getAuthenticationURL())
  }

  /**
    *Check Role Display name availablity
  */
  _checkRoleDisplayNameAvailable = (value) => {
    this.props.validateRoleDisplayName(value, getAuthenticationURL())
  }

  _postValidation = (obj) => {
    this.setState((prevState) => {
      return { [obj.name]: Object.assign({}, prevState[obj.name], { ...obj }) }
    })
  }

  /**
    *Check enabled for Create button
  */
  _checkCreateEnabled() {
    const { role } = this.props
    const valid = Object.values(this.state).every((field) => field.valid)
    return valid && role.status !== ROLE_CREATING_STATUS
  }

  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in div
  */
  render() {
    const { role, privilegeHash, primaryHeader, classes, localize } = this.props
    const { roleCode, roleName } = this.state
    const containerStyle = {
      ...styles.container,
      ...this.props.styles
    }

    return (

      <Modal
        open
        title={localize(primaryHeader)}
        classes={{ 'paper': this.props.classes.dialogPaper }}
        submitDisable={!this._checkCreateEnabled()}
        submitAction={this._create}
        cancelAction={this._cancel}
        cancelLabel={localize('CANCEL')}
        submitLabel={localize('CREATE')}>
        <div className={classNames(classes.container, classes.scroll)}>
          <div className={classes.wrapper}>

            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                trim
                style={styles.textField}
                floatingLabelText={localize('ROLE_CODE')}
                type={'roleCode'}
                name={'roleCode'}
                onFocusOut={this._checkRoleNameAvailable}
                postValidation={this._postValidation}
                externalErrorText={roleCode && (roleCode.blurred || roleCode.paused) &&
                  role.status === INVALID_ROLE_NAME_STATUS
                  ? (roleCode.errorMessage || 'Role Code already exists.') : roleCode.errorMessage}
                regex={[/^[^\s<>"'&/.\\]+$/]}
              />
            </div>

            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                style={styles.textField}
                floatingLabelText={localize('ROLE_NAME')}
                type={'roleName'}
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
                options={privilegeHash.filter(privilege =>
                  (privilege.code !== 'FULL_ACCESS')).map((privilege, index) => (
                    {
                      name: privilege.code,
                      displayName: privilege.name
                    }
                  ))}
                localize={localize}
                disabled={!privilegeHash.length}
                type={'privileges'}
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

export default withStyles(styles)(connect(mapStateToProps, { ...features, updateSnack })(embedI18n(CreateRole)))

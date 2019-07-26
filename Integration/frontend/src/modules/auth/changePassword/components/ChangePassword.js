/** React */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

/** MUI */
import { withStyles } from '@material-ui/core/styles'

/** MUI Icons */
import ErrorIcon from '@material-ui/icons/ReportProblem'

/** Local */
import { PasswordTips, TextField, Modal } from '../../../../components'
import { actions } from '../../../auth'
import theme from '../../../../theme'
import { getAuthenticationURL } from '../../../../services/httpRequest'
import { updateSnack } from '../../../../services/snackbar'
import { NOOP } from '../../../../services/defaults'
import { embedI18n } from '../../../../services/I18nl10n'

const styles = (theme) => ({
  modalRow: {
    display: 'block',
    position: 'relative',
    paddingBottom: '10px',
    '&:last-child': {
      paddingBottom: 0,
    },
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
  },



});

const { changePasswordReduxActions, authReduxActions, profileReduxActions } = actions
const { PASSWORD_UPDATED_STATUS,
  UPDATING_PASSWORD_STATUS,
  INVALID_UPDATE_STATUS } = changePasswordReduxActions.statusConstants
const { logout } = authReduxActions.features
const { fetchProfile } = profileReduxActions.features

/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state, ownProps) => ({
  user: state.changePassword,
  profile: state.profileManagement.profile,
  auth: state.authentication
})

/**
  * Change Password Component
  *
*/
export class ChangePassword extends React.Component {

  /**
  *Validation for props (Static propTypes)
  * @static
  * @type {object} validators
    {
      PropTypes styles object,
      PropTypes create function,
      PropTypes onCancel function,
      PropTypes onPasswordTipsClicked function,
      PropTypes onSuccess function,
      PropTypes primaryHeader string,
      PropTypes secondaryHeader string,
      PropTypes updatePassword function,
      PropTypes auth object,
      PropTypes fetchProfile function,
      PropTypes fetchAllGroups function,
      PropTypes clearChangePassword function,
      PropTypes logout function,
      PropTypes validateUsername function,
      PropTypes user object,
      PropTypes updateSnack function,
      PropTypes profile object
    }
*/
  static propTypes = {
    styles: PropTypes.object,
    classes: PropTypes.object,
    create: PropTypes.func,
    onCancel: PropTypes.func,
    onPasswordTipsClicked: PropTypes.func,
    onSuccess: PropTypes.func,
    primaryHeader: PropTypes.string,
    secondaryHeader: PropTypes.string,
    updatePassword: PropTypes.func,
    auth: PropTypes.object,
    fetchProfile: PropTypes.func,
    fetchAllGroups: PropTypes.func,
    clearChangePassword: PropTypes.func,
    logout: PropTypes.func,
    validateUsername: PropTypes.func,
    user: PropTypes.object,
    updateSnack: PropTypes.func,
    profile: PropTypes.object
  }

  /**
    * default prop values.
  */
  static defaultProps = {
    onCancel: NOOP,
    create: NOOP,
    onPasswordTipsClicked: NOOP,
    onSuccess: NOOP,
    primaryHeader: 'Change Password',
    secondaryHeader: '',
    updatePassword: NOOP
  }

  /**
    * creates a instance of ChangePassword.
    * @param {object} props
  */
  constructor(props, context) {
    super(props, context)

    this.state = {
      password: '',
      newPassword: '',
      confirmPassword: ''
    }

    this._save = this._save.bind(this)
    this._cancel = this._cancel.bind(this)
    this._showPasswordResetStatus = this._showPasswordResetStatus.bind(this)
  }
  /**
    * On save update password through API
  */
  _save = () => {
    const { password, newPassword, confirmPassword } = this.state
    this.props.updatePassword(password.value, newPassword.value, confirmPassword.value, getAuthenticationURL())
  }

  /**
    * On click of cancel
  */
  _cancel = () => {
    if (this.props.profile.passwordResetRequired) {
      this.props.logout(getAuthenticationURL())
    }
    this.props.onCancel()
  }

  componentWillUpdate(nextProps) {
    if (nextProps.profile.passwordResetRequired && nextProps.user.status === PASSWORD_UPDATED_STATUS) {
      nextProps.fetchProfile(nextProps.auth.username, getAuthenticationURL())
    }
  }

  /**
    * React lifecycle method
  */
  componentWillMount() {
    if (this.props.auth.loggedIn) {
    }
  }
  /**
    * React lifecycle method
  */
  componentWillUnmount() {
    this.props.clearChangePassword()
  }
  /**
    * On click of Enter
  */
  _handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      if (this._checkCreateEnabled()) {
        this._save()
      }
    }
  }

  _isCurrentPasswordValid = (password) => {
    let errorMessage = ''
    if (password) {
      errorMessage = (this.props.user.status !== INVALID_UPDATE_STATUS &&
        this.props.user.message.startsWith('Invalid'))
        ? this.props.user.message : errorMessage
    }
    return errorMessage
  }

  /**
    *Get Error Text for NewPassword field
  */
  _getNewPasswordErrorText(styles, message) {
    return ((!message || message === 'Password History found a match') &&
      <p style={styles.passwordErrorText}>
        {message || 'Current password and new password must be different'}
        <ErrorIcon
          style={styles.passwordErrorIcon}
          color={styles.passwordErrorText.color}
        />
      </p>
    )
  }

  _isSameAsCurrentPassword = (newPassword) => {
    const { password } = this.state
    let errorMessage = ''
    if (newPassword) {
      if (password && password.value) {
        errorMessage = (newPassword === password.value) ? 'Should not match Current Password' : ''
        errorMessage = (this.props.user.status === INVALID_UPDATE_STATUS &&
          !this.props.user.message.startsWith('Invalid'))
          ? this.props.user.message : errorMessage
      }
    }
    return errorMessage
  }

  /**
    *Get Error Text for ConfirmPassword field
  */
  _getConfirmPasswordErrorText(styles) {
    return (
      <p style={styles.passwordErrorText}>
        New password and Confirm new password must be same.
        <ErrorIcon
          style={styles.passwordErrorIcon}
          color={styles.passwordErrorText.color}
        />
      </p>
    )
  }

  _isSameAsNewPassword = (passwordReTyped) => {
    const { newPassword } = this.state
    let errorMessage = ''
    if (passwordReTyped) {
      if (newPassword && newPassword.value) {
        errorMessage = (passwordReTyped === newPassword.value) ? '' : 'Should match New Password'
      } else {
        errorMessage = 'Please fill New Password first'
      }
    }
    return errorMessage
  }

  /**
    * set Password Reset Status
  */
  _showPasswordResetStatus(status, message) {
    if (status === PASSWORD_UPDATED_STATUS) {
      const snack = {
        message: message
      }
      this.props.updateSnack(snack)
      this.props.onCancel()
    }
  }

  /**
    *Checking enabled for create.
  */
  _checkCreateEnabled() {
    const valid = Object.values(this.state).every((value) => value.valid)
    return valid && this.props.user.status !== UPDATING_PASSWORD_STATUS
  }

  _postValidation = (obj) => {
    this.setState((prevState) => {
      return { [obj.name]: Object.assign({}, prevState[obj.name], { ...obj }) }
    })
  }

  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in div and modal component
  */
  render() {
    const { primaryHeader, classes, localize } = this.props
    const { password, newPassword, confirmPassword } = this.state

    return (
      <Modal
        open={this.props.auth.loggedIn}
        title={primaryHeader}
        titleStyle={styles.titleStyle}
        submitDisable={!this._checkCreateEnabled()}
        submitAction={this._save}
        cancelAction={this._cancel}
        cancelLabel={localize('CANCEL')}
        submitLabel={localize('SAVE')}
        className={classes.changePasswordModal}
      >
        <div className={classes.container} onKeyPress={this.handleEnterKey}>

          <div className={classNames(classes.modalRow)}>
            <TextField
              required
              floatingLabelText={localize('CURRENT_PASSWORD')}
              type={'password'}
              name={'password'}
              postValidation={this._postValidation}
              externalErrorText={(password && (password.blurred || password.paused))
                ? (password.errorMessage || this._isCurrentPasswordValid(password.value)) : password.errorMessage}
              regex={[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?!.*_)(?!.*\W).{8,20}$/]}
            />
          </div>

          <div className={classNames(classes.modalRow)}>
            <TextField
              required
              floatingLabelText={localize('NEW_PASSWORD')}
              type={'password'}
              name={'newPassword'}
              postValidation={this._postValidation}
              externalErrorText={(newPassword && (newPassword.blurred || newPassword.paused))
                ? (newPassword.errorMessage || this._isSameAsCurrentPassword(newPassword.value))
                : newPassword.errorMessage}

              regex={[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?!.*_)(?!.*\W).{8,20}$/]}
            />
            <PasswordTips />
          </div>
          <div className={classNames(classes.modalRow)}>
            <TextField
              required
              floatingLabelText={localize('CONFIRM_PASSWORD')}
              type={'confirmPassword'}
              name={'confirmPassword'}
              postValidation={this._postValidation}
              externalErrorText={(confirmPassword && (confirmPassword.blurred || confirmPassword.paused))
                ? (confirmPassword.errorMessage || this._isSameAsNewPassword(confirmPassword.value))
                : confirmPassword.errorMessage}
              type={'password'}
            />
          </div>

          {this._showPasswordResetStatus(this.props.user.status, this.props.user.message)}

        </div>
      </Modal>
    )
  }
}

export default withStyles(styles)(connect(mapStateToProps,
  { logout, ...changePasswordReduxActions.features, fetchProfile, updateSnack }
)(embedI18n(ChangePassword)))

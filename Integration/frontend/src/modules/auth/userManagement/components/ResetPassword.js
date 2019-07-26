/**React */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

/**MUI */
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Collapse from '@material-ui/core/Collapse'

/**Local */
import { Modal, PasswordTips, TextField } from '../../../../components'
import theme from '../../../../theme'
import { updateSnack } from '../../../../services/snackbar'
import { actions } from '../../../auth'
import { getAuthenticationURL } from '../../../../services/httpRequest'
import { NOOP } from '../../../../services/defaults'
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



const { resetPasswordReduxActions } = actions
const { features } = resetPasswordReduxActions
const { PASSWORD_UPDATED_STATUS,
  PASSWORD_UPDATING_STATUS,
  GENERIC_ERROR_STATUS } = resetPasswordReduxActions.statusConstants

/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state, ownProps) => ({
  user: state.resetPassword,
  auth: state.authentication
})

/**
  * ResetPassword
*/
export class ResetPassword extends React.Component {

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
        PropTypes clear function,
        PropTypes user object,
        PropTypes logout object,
        PropTypes config object,
        PropTypes profile object,
        PropTypes selectedUser object,
        PropTypes resetPasswordUser object
      }
  */
  static propTypes = {
    styles: PropTypes.object,
    create: PropTypes.func,
    onCancel: PropTypes.func,
    onPasswordTipsClicked: PropTypes.func,
    onSuccess: PropTypes.func,
    primaryHeader: PropTypes.string,
    secondaryHeader: PropTypes.string,
    auth: PropTypes.object,
    clear: PropTypes.func,
    logout: PropTypes.func,
    user: PropTypes.object,
    config: PropTypes.object,
    profile: PropTypes.object,
    selectedUser: PropTypes.object,
    resetPasswordUser: PropTypes.func,
    updateSnack: PropTypes.func
  }

  /**
    * default prop values.
  */
  static defaultProps = {
    onCancel: () => { },
    resetPasswordUser: () => { },
    onPasswordTipsClicked: NOOP,
    onSuccess: () => { },
    primaryHeader: 'RESET_PASSWORD',
    secondaryHeader: ''
  }

  /**
    * creates a instance of ResetPasswrd.
    * @param {object} props
  */
  constructor(props, context) {
    super(props, context)

    this.state = {
      username: this.props.selectedUser.username,
      password: '',
      randomPassword: '',
      confirmPassword: ''
    }
  }

  _cancel = () => {
    this.props.onCancel()
  }
  /**
    * save new changed password
  */
  _save = () => {
    const { username, confirmPassword, password, randomPassword } = this.state
    if (this.state.randomPassword) {
      this.props.resetPasswordUser(username, randomPassword, randomPassword, getAuthenticationURL())
    } else {
      this.props.resetPasswordUser(username, password.value, confirmPassword.value, getAuthenticationURL())
    }
  }
  /**
    * handles random and manual password
  */
  _onChange = (e, selected) => {
    if (selected === 'randomPassword') {
      let value = this._generatePassword()
      this.setState({
        randomPassword: value
      })
    } else if (selected === 'manualPassword') {
      this.setState({
        randomPassword: ''
      })
    }
  }

  /**
    * generate random password.
    * one lowercase
    * one uppercase
    * one number
    * minimum length 8
  */
  _generatePassword = () => {
    let lowerCase = 'abcdefghijklmnopqrstuvwxyz'
    let upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let numbers = '0123456789'
    let alphanumeric = lowerCase + upperCase + numbers
    var pass = []
    var i
    for (i = 0; i < 1; ++i) { pass.push(this._getRand(lowerCase)) }
    for (i = 0; i < 1; ++i) { pass.push(this._getRand(upperCase)) }
    for (i = 0; i < 1; ++i) { pass.push(this._getRand(numbers)) }
    for (i = 0; i < 5; ++i) { pass.push(this._getRand(alphanumeric)) }
    return pass.join('')
  }

  /**
    *get random password value
  */
  _getRand = (values) => {
    return values.charAt(Math.floor(Math.random() * values.length))
  }

  /**
    * React lifecycle method
  */
  componentWillUpdate(nextProps) {
    if (nextProps.user.status === PASSWORD_UPDATED_STATUS) {
      this.props.onSuccess(nextProps.user.userData, nextProps.user.message)
    }
    if (nextProps.user.status === PASSWORD_UPDATED_STATUS && this.state.password) {
      this.setState(
        {
          username: this.props.selectedUser.username,
          password: '',
          randomPassword: '',
          confirmPassword: ''
        }
      )
    }
  }

  /**
    * React lifecycle method
  */
  componentDidUpdate(prevProps) {
    if (prevProps.user.status === PASSWORD_UPDATED_STATUS) {
      prevProps.clear()
    }
  }

  /**
    * React lifecycle method
  */
  componentWillMount() {
  }

  /**
    * React lifecycle method
  */
  componentWillUnmount() {
    this.props.clear()
  }

  /**
    * Close SnackBar
  */
  _closeSnackBar = () => {
    this.props.onSuccess()
  }

  /**
    * Show password reset status
  */
  _showGenericError = (user) => {
    if (user.status === GENERIC_ERROR_STATUS) {
      var snack = {
        message: user.message,
        action: Boolean(user.log) && 'REPORT',
        log: Boolean(user.log) && user.log
      }
      this.props.updateSnack(snack)
    }
  }

  _isSameAsNewPassword = (passwordReTyped) => {
    const { password } = this.state
    let errorMessage = ''
    if (passwordReTyped) {
      if (password && password.value) {
        errorMessage = (passwordReTyped === password.value) ? '' : 'Should match New Password'
      } else {
        errorMessage = 'Please fill New Password first'
      }
    }
    return errorMessage
  }

  /**
    *Check enabled for Create/Save button
  */
  _checkCreateEnabled() {
    if (!this.state.randomPassword) {
      const { password, confirmPassword } = this.state
      const valid = (password.valid && confirmPassword.valid)
      return valid && (this.props.user.status !== PASSWORD_UPDATING_STATUS)
    }
    return true
  }

  _postValidation = (obj) => {
    this.setState((prevState) => {
      return { [obj.name]: Object.assign({}, prevState[obj.name], { ...obj }) }
    })
  }

  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in div
  */
  render() {
    const { primaryHeader, user, classes, localize } = this.props
    const { confirmPassword, randomPassword } = this.state

    const containerStyle = {
      ...styles.container,
      ...this.props.styles
    }

    return (
      <Modal
        open
        title={localize(primaryHeader)}
        titleStyle={styles.titleStyle}
        submitDisable={!this._checkCreateEnabled([])}
        submitAction={this._save}
        cancelAction={this._cancel}
        cancelLabel={localize('CANCEL')}
        submitLabel={localize('SAVE')}>

        <div className={classNames(classes.container, classes.scroll)}>
          <div className={classes.wrapper}>

            <FormControl fullWidth>

              <Collapse in={!this.state.randomPassword}>
                <div className={classNames(classes.modalRow)}>
                  <RadioGroup name='passwordGeneration'
                    value={this.state.randomPassword ? 'randomPassword' : 'manualPassword'} onChange={this._onChange}>
                    <FormControlLabel
                      value='manualPassword'
                      control={<Radio color='primary' name='choice_1' />}
                      label={localize('RESET_PASSWORD_MANUALLY')}
                    />
                    <FormControlLabel
                      value='randomPassword'
                      control={<Radio color='primary' name='choice_2' />}
                      label={localize('GENERATE_PASSWORD_RANDOM')}
                    />
                  </RadioGroup>
                </div>
              </Collapse>

              <Collapse in={!this.state.randomPassword}>
                <div className={classNames(classes.modalRow)}>
                  <TextField
                    required
                    style={styles.textField}
                    floatingLabelText={localize('NEW_PASSWORD')}
                    type={'password'}
                    name={'password'}
                    postValidation={this._postValidation}
                    regex={[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?!.*_)(?!.*\W).{8,20}$/]}
                  />
                  <PasswordTips />
                </div>

                <div className={classNames(classes.modalRow)}>
                  <TextField
                    required
                    style={styles.textField}
                    floatingLabelText={localize('CONFIRM_NEW_PASSWORD')}
                    type={'password'}
                    name={'confirmPassword'}
                    postValidation={this._postValidation}
                    externalErrorText={(confirmPassword && (confirmPassword.blurred || confirmPassword.paused))
                      ? (confirmPassword.errorMessage || this._isSameAsNewPassword(confirmPassword.value))
                      : confirmPassword.errorMessage}                    
                  />
                </div>
              </Collapse>

              <Collapse in={this.state.randomPassword}>
              {this.state.randomPassword &&
                <div className={classNames(classes.modalRow, classes.last)}>
                  <TextField
                    style={styles.disabledTextField}
                    floatingLabelText={localize('RANDOM_PASSWORD')}
                    type={'password'}
                    name={'randomPassword'}
                    disabled
                    value={randomPassword}
                  />
                </div>
              }
              </Collapse>

            </FormControl>
          </div>
          {this._showGenericError(user)}
        </div>
      </Modal>
    )
  }
}

export default withStyles(styles)(connect(mapStateToProps,
  { ...features, updateSnack })(embedI18n(ResetPassword)))

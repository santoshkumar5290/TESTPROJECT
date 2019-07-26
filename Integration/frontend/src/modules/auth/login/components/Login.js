/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'

/** MUI */
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

/** Locals */
import { TextField } from '../../../../components'
import { getAuthenticationURL } from '../../../../services/httpRequest'
import theme from '../../../../theme'
import { updateSnack, updateLog } from '../../../../services/snackbar'
import { actions } from '../../../auth'
import { updateUserSettings, cacheKeys } from '../../../../services/userSettings'
import styles from '../styles'
import LoginHeader from './LoginHeader'
import LoginFooter from './LoginFooter'
import FormModal from '../../../globalComponents/FormModal'
import { embedI18n, features as I18feature } from '../../../../services/I18nl10n'

const { statusConstants, features } = actions.authReduxActions

/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.authentication,
    authSettings: state.appCache[cacheKeys.AUTH_KEY] || {}
  }
}

/**
  * Login Component
  *
*/
class Login extends Component {

  /**
    *Validation for props (Static propTypes)
    * @static
    * @type {object} validators
      {
        PropTypes styles object,
        PropTypes onSignUp function,
        PropTypes primaryHeader string,
        PropTypes authSettings object,
        PropTypes auth object,
        PropTypes clear function,
        PropTypes login function,
        PropTypes updateUserSettings function,
        PropTypes updateSnack function
      }
  */

  static propTypes = {
    styles: PropTypes.object,
    onSignUp: PropTypes.func,
    onCancel: PropTypes.func,
    onForgetPassword: PropTypes.func,
    onSuccess: PropTypes.func,
    primaryHeader: PropTypes.string,
    secondaryHeader: PropTypes.string,
    authSettings: PropTypes.object,
    auth: PropTypes.object,
    clear: PropTypes.func,
    login: PropTypes.func,
    updateUserSettings: PropTypes.func,
    updateSnack: PropTypes.func
  }

  /**
    * default prop values.
  */
  static defaultProps = {
    onSignUp: () => { },
    onForgetPassword: () => { },
    onSuccess: () => { },
    primaryHeader: 'LOGIN',
    secondaryHeader: ''
  }

  /**
    * creates a instance of Login.
    * @param {object} props
  */
  constructor(props, context) {
    super(props, context)

    this.state = {
      username: '',
      password: '',
      rememberMe: true
    }
  }

  _cancel = () => {
    this.props.onCancel()
  }
  /**
    * React lifecycle method :
    * setting state for rememberMe, username, token, password.
  */
  componentWillUpdate(nextProps) {
    if ((nextProps.auth.loggedIn) && (this.props.authSettings.token !== nextProps.auth.token)) {
      const update = {
        'rememberMe': this.state.rememberMe,
        'username': this.state.username.value,
        'token': nextProps.auth.token,
        'expiry': nextProps.auth.tokenTimeout
      }
      nextProps.updateUserSettings(update)
    }
    if (nextProps.auth.status === statusConstants.GENERIC_ERROR_STATUS && this.state.password.value) {
      this.props.clear()
    }
  }

  /**
    * React lifecycle method :
    * setting boolean value for onSuccess
  */
  componentDidUpdate(prevProps) {
    if (this.props.auth.loggedIn && !prevProps.auth.loggedIn) {
      var snack = {
        message: this.props.localize('LOGGED_IN_SUCCESS')
      }
      this.props.updateSnack(snack)
      this.props.onSuccess && this.onSuccess()
    }
    if (this.props.auth.loggedIn) {
      this.props.onSuccess && this.onSuccess()
    }
  }

  /**
    * React lifecycle method :
    * setting props to initial state.
  */

  componentWillMount() {
    this.props.fetchGlobalMessageNLocal(getAuthenticationURL())
    const { authSettings } = this.props
    this.setState({ rememberMe: authSettings.rememberMe })
  }

  /**
    * React lifecycle method :
    * setting props to initial state.
  */
  componentWillUnmount() {
    this.props.clear()
  }

  onSuccess = () => {
    this.props.fetchMessageNLocal(getAuthenticationURL())
    this.props.history.replace('/sma')
  }

  /**
    *Authenticating user through API
  */
  _login = () => {
    const { username, password } = this.state
    this.props.login(username.value.toLowerCase(), password.value, getAuthenticationURL())
  }

  /**
    *Check RememberMe and set it's state
  */
  _checkRememberMe = (e, isInputChecked) => {
    // if (isInputChecked) {
    //   this.props.updateUserSettings({ 'rememberMe': isInputChecked })
    // } else {
    //   this.props.updateUserSettings({ 'rememberMe': isInputChecked, 'username': '' })
    // }
    this.setState({ 'rememberMe': isInputChecked })
  }

  /**
    *Get Error Text for Generic Errors
  */
  _showGenericError(auth) {
    if (auth.status === statusConstants.GENERIC_ERROR_STATUS) {
      var snack = {
        message: auth.message,
        log: Boolean(auth.log) && auth.log
      }
      this.props.updateSnack(snack)
      this.props.updateLog(snack)
    }
  }

  /**
    *Checking SignIn enabled
  */
  _checkSignInEnabled() {
    const { username, password } = this.state
    const { auth } = this.props
    const valid = username.valid && password.valid
    return valid && auth.status !== statusConstants.LOGGING_IN_STATUS
  }

  _postValidation = (obj) => {
    this.setState((prevState) => {
      return { [obj.name]: Object.assign({}, prevState[obj.name], { ...obj }) }
    }, this.props.clear)
  }

  handleEnterKey = (e) => {
    if ((e.key === 'Enter') && this._checkSignInEnabled()) {
      this._login()
    }
  }

  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in div
  */
  render() {

    const { auth, authSettings, classes, localize } = this.props
    const { password, rememberMe } = this.state
    return (
      <div className={classes.modalContainer}>
        <div className={classes.modalWindow}>
          <FormModal
            open
            submitLabel={'LOG IN'}>

            <div className={classes.modalWrapper}>

              {/* -- Login Header -- */}
              <LoginHeader>
                <h2>{localize('SIGN_IN')}</h2>
              </LoginHeader>

              {/* -- Login Form -- */}
              <div className={classes.modalBody}>
                <div className={classes.container} onKeyPress={this.handleEnterKey}>
                  <div className={classNames(classes.modalRow, classes.userNameRow)}>
                    {
                    localize('USER_NAME') ?
                      <TextField
                        required
                        id='username'
                        floatingLabelText={localize('USER_NAME')}
                        type={'username'}
                        name={'username'}
                        pauseDuration={1}
                        postValidation={this._postValidation}
                        value={authSettings.rememberMe ? authSettings.username : ''}
                      />:null
                    }

                  </div>
                  <div className={classNames(classes.modalRow, classes.passwordRow)}>
                   {
                   localize('PASSWORD') ?
                    <TextField
                      required
                      id='password'
                      floatingLabelText={localize('PASSWORD')}
                      type={'password'}
                      name={'password'}
                      pauseDuration={0}
                      postValidation={this._postValidation}
                      externalErrorText={password &&
                        (password.blurred || password.paused) && auth.status === statusConstants.WRONG_CREDS_STATUS
                        ? (password.errorMessage || 'Username or password is incorrect.')
                        : password.errorMessage}
                    />:null
                   }

                    {/* <Button onClick={() => history.push('/ForgotPassword')}
                            color="secondary" disableRipple="true" className={classes.forgotButton}>
                      Forgot?
                    </Button> */}
                  </div>
                  <div className={classNames(classes.modalRow, classes.signInRow)}>
                    <Button className={classNames({ [classes.signInButtonDisabled]: !this._checkSignInEnabled(), [classes.signInButton]: this._checkSignInEnabled() })} disabled={!this._checkSignInEnabled()} onClick={this._login} >
                      {localize('LOGIN')}
                    </Button>
                  </div>
                </div>
                {this._showGenericError(auth)}
              </div>

              {/* -- Login Footer -- */}
              <LoginFooter />

            </div>

          </FormModal>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, { ...features, updateUserSettings, updateSnack, updateLog, ...I18feature })(withStyles(styles)(embedI18n(Login))))

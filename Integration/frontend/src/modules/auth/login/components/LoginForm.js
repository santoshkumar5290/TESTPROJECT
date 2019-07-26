/**React */
import React from 'react'

/**MUI */
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

/**Local */
import styles from '../styles'

const LoginForm = ({
  classes,
  history,
  authSettings,
  postValidation,
  password,
  auth,
  statusConstants,
  _checkSignInEnabled,
  _login,
  _showGenericError
}) => {
  return (
    <div className={classes.modal_body}>
      <div className={classes.container}>
        <div className={classes.userName_row}>
          <TextField
            value={authSettings.rememberMe ? authSettings.username : ''}
            required
            fullWidth={true}
            floatingLabelText={'Username'}
            name={'username'}
            pauseDuration={1}
            postValidation={postValidation}
          />
        </div>
        <div className={classes.password_row}>
          <TextField
            value={"DIV05Service"}
            required
            fullWidth={true}
            floatingLabelText={'Password'}
            type={'password'}
            name={'password'}
            pauseDuration={1}
            postValidation={postValidation}
            externalErrorText={password &&
              (password.blurred || password.paused) && auth.status === statusConstants.WRONG_CREDS_STATUS
              ? (password.errorMessage || 'Username or password is incorrect.')
              : password.errorMessage}
          />
        </div>
        <div className={classes.signIn_row}>
          <Button
            variant='raised'
            onClick={_login()}
            disabled={!_checkSignInEnabled()}
            className={classes.signInButton}
            color='primary' >
            LOG IN
          </Button>
        </div>
        {_showGenericError(auth)}
      </div>
    </div>
  )
}

export default (withStyles(styles)(LoginForm))

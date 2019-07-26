/**React */
import React from 'react'
import PropTypes from 'prop-types'

/**MUI */
import Dialog from '@material-ui/core/Dialog'
import FlatButton from '@material-ui/core/FlatButton'
import RaisedButton from '@material-ui/core/RaisedButton'
import TextField from '@material-ui/core/TextField'

/**Local */
import { localization } from '../Localization'

const styles = {
  inputFile: {
    width: 450
  },
  errorText: {
    top: 50,
    position: 'absolute'
  }
}

export class PasswordPrompt extends React.Component {

  /** @ignore */
  static propTypes = {
    componentName: PropTypes.string.isRequired,
    redirectLink: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    pageLocked: PropTypes.bool.isRequired,
    pageSetLock: PropTypes.func.isRequired,
    updateSnack: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
      }),
      staticContext: PropTypes.object
    }).isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      open: true,
      localized: false,
      password: ''
    }
  }

  componentWillMount () {
    this.props.pageSetLock(true)
    !this.state.localized && Promise.all([
      localization.loadMessageSet('common')
    ]).then(() => {
      this.setState({
        localized: true
      })
    })
  }

  _handleClose = () => {
    this.context.router.push(this.props.redirectLink)
  }

  _handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this._handleSubmit(event)
    }
  }

  _handleSubmit = (event) => {
    event.preventDefault()
    const { config } = this.props
    const systemPassword = config.system && config.system.password || ''

    if (this.state.password === systemPassword) {
      this.setState({ open: false })
      this.props.pageSetLock(false)
    } else {
      this.props.updateSnack({
        message: localization.formatMessage('common:invalidPassword')
      })
      setTimeout(() => {
        this.context.router.push(this.props.redirectLink)
      }, 1000)
    }
  }

  _passwordChange = (event) => {
    const password = event.target.value
    this.setState({ password: password })
  }

  render () {
    const { componentName } = this.props
    const { errorMsg, open } = this.state

    const actions = [
      <FlatButton
        label={localization.formatMessage('common:cancelButton')}
        primary
        onTouchTap={this._handleClose}
      />,
      <RaisedButton
        label={localization.formatMessage('common:submitButton')}
        primary
        onTouchTap={this._handleSubmit}
      />
    ]

    return (
      <div>
        <Dialog
          modal
          title={componentName}
          actions={actions}
          open={open}
        >
          <div>
            <p>{localization.formatMessage('common:passwordDialogMsg')}</p>
            <TextField
              autoFocus
              hintText={localization.formatMessage('common:password')}
              style={styles.inputFile}
              onChange={(event) => { this._passwordChange(event) }}
              onKeyPress={this._handleKeyPress}
              type='password'
              errorText={errorMsg}
              errorStyle={styles.errorText}
            />
          </div>
        </Dialog>
      </div>
    )
  }
}

export default PasswordPrompt

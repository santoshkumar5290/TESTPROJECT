import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAuthenticationURL } from '../../services/httpRequest'

import { actions } from 'platform/auth'
import { updateUserSettings, updateInterAppAuthSettings } from '../../services/userSettings'

const { features } = actions.authReduxActions

const mapStateToProps = (state) => {
  return {
    interAppAuth: state.authentication.interAppAuth
  }
}
class WindowListener extends React.Component {

  loginWithInterApplicationUser = (event) => {
        // below code is important , need to make the url configurable
        // if (event.origin.indexOf(`http://${window.location.hostname}:8080`) < 0) {
        //     return
        // }
    !this.props.interAppAuth && this.props.interApplicationLogin && this.props.interApplicationLogin(event.data)
    const update = {
      'rememberMe': false,
      'username': event.data.username,
      'token': event.data.data.access_token,
      'expiry': 120
    }
    this.props.updateUserSettings(update)
    this.props.updateInterAppAuthSettings({ interAppAuth: true })
    event.source.postMessage('SUCCESS', event.origin)
  }

  componentDidMount () {
    // if (this.props.interAppAuth) {
    //   window.removeEventListener('message', this.loginWithInterApplicationUser, false)
    // } else {
    //   window.addEventListener('message', this.loginWithInterApplicationUser, false)
    // }
  }

  render () {
    return null
  }

}

export default connect(mapStateToProps, {
  ...features,
  updateUserSettings,
  updateInterAppAuthSettings
})(WindowListener)

/** React */
import { connect } from 'react-redux'
/** Local */
import { InactivityContainer } from './InactivityContainer'
import { actions as authActions } from 'platform/auth'
import { withRouter } from 'react-router-dom'
import { embedI18n } from 'platform/services/I18nl10n'

const features = authActions.authReduxActions.features
/*
* @Function Mapping component state to props.
* @param {Object} states
* @returns {Object} containing props
*/

const mapStateToProps = (state) => ({
  loggedIn: state.authentication && state.authentication.loggedIn,
  reminder: state.appSettings.idleTimeout.reminder,
  timeOut: state.appSettings.idleTimeout.value
})

export default withRouter(connect(mapStateToProps, { ...features })(embedI18n(InactivityContainer)))

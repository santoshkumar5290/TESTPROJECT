/**React */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

/**MUI */
import { withStyles } from '@material-ui/core/styles'

/**Local */
import {routeConstants} from 'platform/auth/route'
import { ConfirmationDialog } from '../../../components'
import { embedI18n } from 'platform/services/I18nl10n'

/*
* @Function Mapping component state to props.
* @param {Object} states
* @returns {Object} containing props
*/

const styles = (theme) => ({

});

const mapStateToProps = (state, ownProps) => ({
  auth: state.authentication
})

/**
  * ForcedLogoutContainer Component
  *
*/
class ForcedLogout extends React.Component {
  /**
  *Validation for props (Static propTypes)
  * @static
  * @type {object} validators
    {
      PropTypes auth object
    }
  */
  static propTypes = {
    auth: PropTypes.object,
    message: PropTypes.string
  }
  /**
    * creates a instance of ForcedLogoutContainer.
    * @param {object} props
  */
  constructor(props, context) {
    super(props, context)
    this.state = {
      showConfirmationDialog: false
    }
  }

  handleSubmit = () => {
    this.setState({ showConfirmationDialog: false })
    this.props.history.replace(routeConstants.LOGIN)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.auth.forcedLogOut === true && this.props.auth.loggedIn) {
      this.setState({ showConfirmationDialog: true })
    }
    else{
      this.setState({ showConfirmationDialog: false }) 
    }
  }

  render() {
    const { classes, localize } = this.props
    if (this.state.showConfirmationDialog) {
      return (<ConfirmationDialog
        title={localize('LOGGED_OUT')}
        message={localize('SESSION_TIMEOUT_MSG')}
        submitLabel={localize('OK')}
        submitAction={this.handleSubmit}
        cancelButton={false}
        />)
    } else {
      return null
    }
  }
}
export default withRouter(withStyles(styles)(connect(mapStateToProps)(embedI18n(ForcedLogout))))
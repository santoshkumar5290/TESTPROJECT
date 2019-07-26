/**React */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/**Loacl */
import { ConfirmationDialog } from '../../../components'
/*
* @Function Mapping component state to props.
* @param {Object} states
* @returns {Object} containing props
*/

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
  close = () => {
    this.setState({ showConfirmationDialog: false })
    this.props.history.replace('/logout')
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.forcedLogOut === true && this.props.auth.loggedIn) {
      this.setState({ showConfirmationDialog: true })
    }
  }

  handleSubmit = () => {
    console.log("it is not in work")
  }

  render() {
    if (this.state.showConfirmationDialog) {
      return (<ConfirmationDialog
        title={'Logged'}
        message={this.props.auth.message}
        cancelLabel={'OK'}
        onCancel={this.close}
        submitButton={this.handleSubmit}
      />)
    } else {
      return null
    }
  }
}
export default withRouter(connect(mapStateToProps)(ForcedLogout))

/** React */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

/** Local */
import BaseLayout from './baseLayout'
import ApplyLicenseDialog from '../modules/globalComponents/ApplyLicenseDialog'
import { features } from '../modules/License/redux/actions'
import { getAuthenticationURL } from '../services/httpRequest'

const { getLicenseInfo } = features

class DashboardLayout extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.object,
    getLicenseInfo: PropTypes.func,
    auth: PropTypes.object
  }

  /**
   * Litening for route change to fetch SystemLicense on every Route change
   */
  componentWillMount() {
    if (this.props.auth.loggedIn) this.props.getLicenseInfo(getAuthenticationURL())
    this.unlisten = this.props.history.listen((location, action) => {
      if (this.props.auth.loggedIn) this.props.getLicenseInfo(getAuthenticationURL())
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    return (
      <React.Fragment>
        <BaseLayout
          navbar
          header
          navbarExpanded
          children={this.props.children}
          isDrawerOpen={this.props.isDrawerOpen}
        />
        <ApplyLicenseDialog />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authentication,
    isDrawerOpen: state.configuration.isDrawerOpen
  }
}

export default withRouter(connect(mapStateToProps, { getLicenseInfo })(DashboardLayout))

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseLayout from './baseLayout'

class AuthLayout extends Component {

  static propTypes = {
    children : PropTypes.node.isRequired
  }
  
  render () {
    return (
      <BaseLayout
      children={this.props.children}
      />
    )
  }
}

export default AuthLayout

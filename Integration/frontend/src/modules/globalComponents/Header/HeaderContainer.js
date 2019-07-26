/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/** Local */
import Header from './Header'

//  HeaderContainer will be a container Component for Header
export default class HeaderContainer extends Component {

  static propTypes={
    open:PropTypes.bool,
    handleDrawerOpen:PropTypes.func,
    handleDrawerClose:PropTypes.func
  }

  render () {
    return (
      <Header title='Title Placeholder'
        open={this.props.open}
        handleDrawerOpen={this.props.handleDrawerOpen}
        handleDrawerClose={this.props.handleDrawerClose} />
    )
  }
}

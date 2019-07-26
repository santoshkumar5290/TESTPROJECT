import React from 'react'
import PropTypes from 'prop-types'

const style = {
  textDecoration: 'none',
  cursor: 'pointer'
}
/**
 * Reusable component to encapsulate hyperlink.
 * @private
 */
export class A extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    children: PropTypes.node,
    name: PropTypes.string,
    href: PropTypes.string,
    onClick : PropTypes.func
  }

  render () {
    const finalStyle = {
      ...style,
      ...this.props.style
    }
    const linkProps = {
      name,
      onClick:  (e) => {
        this.props.onClick && this.props.onClick(this.props.href)
      }
    }
    return (
      <a {...linkProps} style={finalStyle}>
        {this.props.children}
      </a>
    )
  }
}

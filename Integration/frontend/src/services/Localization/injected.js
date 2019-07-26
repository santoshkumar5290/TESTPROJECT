import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { setIntl } from './localization'

class Injected extends React.Component {
  /** @ignore */
  static propTypes = {
    intl: PropTypes.object,
    children: PropTypes.object
  }

  render () {
    setIntl(this.props.intl)
    return (this.props.children)
  }
}
export default injectIntl(Injected)

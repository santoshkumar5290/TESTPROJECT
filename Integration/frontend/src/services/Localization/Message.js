import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { localization } from './localization'

export default class Message extends React.Component {
  /** @ignore */
  static propTypes = {
    html: PropTypes.bool,
    id: PropTypes.string
  }

  render = () => {
    const Tag = this.props.html ? FormattedHTMLMessage : FormattedMessage
    const message = localization.getMessage(this.props.id)
    const props = {
      ...this.props,
      ...message
    }

    if (!props.values) {
      props.values = props
    }

    return (
      <Tag
        {...props}
      />
    )
  }
}

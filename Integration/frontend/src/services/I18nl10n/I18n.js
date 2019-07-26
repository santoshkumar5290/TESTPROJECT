import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {features as intlFeatures} from './reducer'
import {getAuthenticationURL} from '../httpRequest'

const mapStateToProps = (state) => {
  return {
    i18nl10n : state.i18nl10n
  }
}

class Intl extends React.Component {
  /** @ignore */
  static propTypes = {
    i18nl10n: PropTypes.object,
    children: PropTypes.node
  }

  /**
    * @ignore
    *
  */
  static defaultProps = {
    userPreference: false
  };

  constructor (props) {
    super(props)
  }

  getChildContext() {
    return {messages: this.props.i18nl10n.messages};
  }

  /**
   * @private
   *
   * Request data.
   */
  componentWillMount = () => {
    if(this.props.userPreference)
      this.props.fetchMessageNLocal(getAuthenticationURL())
    else
	   this.props.loadStaticContent(getAuthenticationURL())
  }

  render = () => {
    return (
          this.props.children
    )
  }
}

Intl.childContextTypes = {
  messages : PropTypes.object
}

export default connect(mapStateToProps, {...intlFeatures})(Intl)

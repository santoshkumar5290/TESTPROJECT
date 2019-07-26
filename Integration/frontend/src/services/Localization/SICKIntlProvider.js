import React from 'react'
import PropTypes from 'prop-types'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import de from 'react-intl/locale-data/de'
import moment from 'moment'
import { localization } from './localization'
import Injected from './injected'
import parse from 'url-parse'

addLocaleData([...en])
addLocaleData([...de])

export default class SICKIntlProvider extends React.Component {
  /** @ignore */
  static propTypes = {
    children: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.state = {
      locale: 'en'
    }
  }

  /**
   * @private
   *
   * Request data.
   */
  componentWillMount = () => {
    localization.loadMessageSet(localization.messageSets.common, true).then((data) => {
      moment.locale(localization.getLocale())
      this.setState({
        locale: localization.getLocale()
      })
    })
  }

  // TODO: this is for testing to allow switching of loc on the client
  componentDidMount () {
    window.addEventListener('hashchange', () => {
      if (location.hash) {
        const u = parse(location.origin + '?' + location.hash.substring(1), true)
        if (u.query.loc) {
          localization.setLocale(u.query.loc)
          this.setState({
            locale: u.query.loc
          })
        }
      }
    }, false)
  }

  render = () => {
    const { locale } = this.state
    return (
      <IntlProvider locale={locale} defaultLocale={locale} messages={localization.messages}>
        <Injected>
          {this.props.children}
        </Injected>
      </IntlProvider>
    )
  }
}

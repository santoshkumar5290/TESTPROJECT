/** React */
import React from 'react'
import PropTypes from 'prop-types'

/** Local */
import { routeConstants } from 'platform/auth/route'
import { ConfirmationDialog } from '../../../components'
import { getAuthenticationURL } from '../../../services/httpRequest'

/**
  * InactivityContainer Component
  *
*/
export class InactivityContainer extends React.Component {

  /**
    *Validation for props (Static propTypes)
    * @static
    * @type {object} validators
      {
        PropTypes auth object,
        PropTypes logout function,
        PropTypes refreshingtoken function,
        PropTypes clear function
      }
  */
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    reminder: PropTypes.number.isRequired,
    timeOut: PropTypes.number.isRequired,
    logout: PropTypes.func,
    history:PropTypes.object
  }
   /**
    * default prop values.
  */
  static defaultProps = {
    loggedIn: false,
    timeOut : 120,
    reminder : 30
  }

  /**
    * creates a instance of InactivityContainer.
    * @param {object} props
  */
  constructor (props, context) {
    super(props, context)
    this.timeoutID = 0
    this.countDown = 0
    this.events = ['mousemove', 'mousedown', 'keypress', 'DOMMouseScroll', 'mousewheel', 'touchmove', 'MSPointerMove']
    this.state = {
      active : false,
      confirmation : false,
      timerValue: this.props.reminder
    }
  }
  /**
    * React lifecycle method
  */
  componentWillUnmount () {
    this.events.map(function (event) {
      window.removeEventListener(event, this.resetTimer, false)
    }, this)
  }

  componentWillMount () {
    if (this.props.loggedIn) {
      this.setState({ active:true })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.loggedIn && !this.propsloggedIn) {
      this.setState({ active:true,
        timerValue:this.props.reminder },
         this.setup())
    }
  }

  componentWillUpdate (nextProps) {
    // to be done - refresh token case
    // if (this.props.auth.status === REFRESHING_SESSION_STATUS && nextProps.auth.status === LOGGED_IN_STATUS) {
    //   this.setState({ active:true }, this.setup())
    // }
  }
  /**
    * React lifecycle method
  */
  componentDidUpdate (prevProps) {
    if (this.props.loggedIn && !this.state.active) {
      this.props.logout(getAuthenticationURL(), 'inActive')
      this.props.history.replace(routeConstants.LOGIN)
    }
    if (!this.props.loggedIn && prevProps.loggedIn) {
      window.clearInterval(this.countDown)
      window.clearTimeout(this.timeoutID)
      this.events.map(function (event) {
        window.removeEventListener(event, this.resetTimer, false)
      }, this)
    }
  }
  /**
    * adding event listeners
    * calling method startTimer
  */
  setup = () => {
    this.events.map(function (event) {
      window.addEventListener(event, this.resetTimer, false)
    }, this)
    this.startTimer()
  }
   /**
    *Setting inActive value
  */
  resetTimer = (e) => {
    this.setState({
      active:true
    }, this.startTimer)
  }
  /**
    *Setting timeoutID value
  */
  startTimer =() => {
    window.clearTimeout(this.timeoutID)
    this.timeoutID = window.setTimeout(this.notify,
      (this.props.timeOut - this.props.reminder) * 1000)
  }
  /**
    *Setting inActive value and timeoutID value
  */
  goInactive = () => {
    if (this.state.confirmation) {
      window.clearInterval(this.countDown)
      this.setState({
        active:false,
        confirmation : false,
        timerValue: this.props.reminder
      })
    }
  }

  goActive = () => {
    if (this.state.confirmation) {
      window.clearInterval(this.countDown)
      this.setup()
      this.setState({
        active:true,
        confirmation : false,
        timerValue: this.props.reminder
      })
    }
  }
 /**
    *Setting confirmation value
    *removing event listeners
    * clear countDown interval
    * clear timeoutID
  */
  notify = () => {
    if (this.props.loggedIn) {
      this.setState({ confirmation:true })
      // removing event listeners
      this.events.map(function (event) {
        window.removeEventListener(event, this.resetTimer, false)
      }, this)
      window.clearInterval(this.countDown)
      this.countDown = window.setInterval(this.decreaseTimerValue, 1000)
      window.clearTimeout(this.timeoutID)
    }
  }
  /**
    *Decreasing timerValue for Confirmation dialog
  */
  decreaseTimerValue = () => {
    if (this.state.timerValue === 0) {
      this.goInactive()
    } else {
      this.setState((prevState) => ({ timerValue: Math.max(0, prevState.timerValue - 1) }))
    }
  }
  /**
    *Submit action for Confirmation dialog
  */
  stayLoggedIn = () => {
    this.goActive()
  }
  /**
    *Cancel action for Confirmation dialog
  */
  logout = () => {
    this.goInactive()
  }
/**
    * React lifecycle method :
    * Renders the confiramation modal component
  */
  render () {
    const { localize } = this.props
    if (this.state.confirmation) {
      return (<ConfirmationDialog
        title={localize('CONFIRM_LOGOUT')}
        message={`${localize('LOGOUT_MSG')}  ${this.state.timerValue} ${localize('SECONDS')}.`}
        submitLabel={localize('STAY_LOGIN')}
        cancelLabel={localize('LOGOUT')}
        submitAction={this.stayLoggedIn}
        onCancel={this.logout}
      />)
    } else {
      return null
    }
  }
}
/** React */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/** MUI */
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'

/** Local */
import { updateLog } from '../../../services/snackbar'
import { getAuthenticationURL } from '../../../services/httpRequest'

const styles = theme => ({
  snackbarContainer: {
    '& > div': {
      borderRadius: '6px',
      flexDirection: 'row',
      flexWrap: 'inherit',
      width: '100%',
      alignItems: 'flex-start',
      '& div:first-child': {
        paddingTop: '13px',
        paddingBottom: '13px'
      },
      '& div:last-child': {
        textAlign: 'right'
      }
    }
  },
  actionButton: {
    color: theme.palette.accent2Color,
    '&:hover': {
      background: 'transparent',
      color: theme.palette.accent3Color
    }
  },

  clearIcon: {
    color: theme.palette.alternateTextColor
  }
})

const mapStateToProps = state => ({
  snack: state.snackbar || {},
})
/**
 * SnackbarContainer Component
 *
 */
export class SnackbarContainer extends React.Component {
  /**
    *Validation for props (Static propTypes)
    * @static
    * @type {object} validators
      {
        PropTypes snack object
      }
  */
  static propTypes = {
    snack: PropTypes.object.isRequired,
    updateLog: PropTypes.func,
    classes: PropTypes.object
  }

  /**
   * default prop values.
   */
  static defaultProps = {
    snack: {}
  }

  /**
   * creates a instance of InactivityContainer.
   * @param {object} props
   */
  constructor (props) {
    super(props)
    this.timer = 7
    this.interval = null
    this.state = {
      open: false,
      hovered: false
    }
  }

  counter = () => {
    this.timer > 0 && this.timer--
    if (this.timer === 0) {
      window.clearInterval(this.interval)
      this.setState({ open: false })
    }
  }

  updateLog = e => {
    this.props.updateLog(this.props.snack.log, getAuthenticationURL())
  }

  hoverIn = e => {
    if (!this.state.hovered) {
      window.clearInterval(this.interval)
      this.setState({ hovered: true })
    }
  }

  hoverOut = e => {
    if (this.state.hovered) {
      this.interval = window.setInterval(this.counter, 1000)
      this.setState({ hovered: false })
    }
  }

  onRequestClose = (e, reason) => {
    window.clearInterval(this.interval)
    this.setState(prevState => ({ open: prevState.hovered }))
  }

  handleCancelClick = () => {
    this.setState({ open: false })
  }

  /**
   * React lifecycle method
   */
  shouldComponentUpdate (nextProps) {
    return true
  }

  componentWillReceiveProps (nextProps) {
    const { snack } = nextProps
    if (
      snack.id > this.props.snack.id &&
      ((snack.message && snack.message.length > 0) || (snack.error && snack.error.length > 0))
    ) {
      window.clearInterval(this.interval)
      this.setState({
        snack,
        open: true
      })
    }
  }

  componentDidMount () {
    this.snack.addEventListener('mouseover', this.hoverIn, false)
    this.snack.addEventListener('mouseout', this.hoverOut, false)
  }

  componentWillUpdate (nextProps) {
    const didMessageChange = this.props.snack.message !== nextProps.snack.message
    const didActionChange = this.props.snack.action !== nextProps.snack.action
    if (didMessageChange || didActionChange) {
      window.clearInterval(this.interval)
      this.timer = 7
      this.interval = window.setInterval(this.counter, 1000)
    }
  }

  /**
   * React lifecycle method :
   * Renders this component
   * @returns {ReactElement} - wrapped in div
   */
  render () {
    const { open } = this.state
    const { classes, snack } = this.props

    //  invalid_token error are sent in {error:'Error Message '} format while other error are sent in {message:'Error message'} format
    if (!('message' in snack) && 'error' in snack) {
      snack.message = snack.error
    }

    const snackProps = {
      key: snack.message,
      anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
      open,
      message:
        snack.message && snack.message.length
          ? snack.message.endsWith('.')
            ? snack.message
            : snack.message.concat('.')
          : ''
    }

    snack.onActionTouchTap = snack.onActionTouchTap || this.updateLog
    snackProps.onClose = this.onRequestClose
    return (
      <div
        ref={element => {
          this.snack = element
        }}>
        <Snackbar
          className={classes.snackbarContainer}
          {...snackProps}
          action={[
            snack.action && (
              <Button
                key='0'
                className={classes.actionButton}
                color='primary'
                size='small'
                onClick={snack.onActionTouchTap}>
                {snack.action}
              </Button>
            ),
            <IconButton key='1' onClick={() => this.handleCancelClick()}>
              <ClearIcon className={classes.clearIcon} />
            </IconButton>
          ]}
        />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  { updateLog }
)(withStyles(styles, { withTheme: true })(SnackbarContainer))

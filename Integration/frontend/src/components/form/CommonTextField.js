/**React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
/**MUI */
import TextField from '@material-ui/core/TextField'
/**MUI Icons */
import ErrorIcon from '@material-ui/icons/ReportProblem'
/**Local */
import theme from '../../theme'

import {
  validateUsername,
  validatePassword,
  validateEmail,
  validateFirstName,
  validateLastName,
  validateRoleCode,
  validateRoleDisplayName,
  validateGroupCode,
  validateGroupDisplayName,
  validateGroupDescription
} from '../../services/validations'

function getStyles (props, muiTheme) {
  return {
    textField: {
      width: '100%'
    },
    errorText: {
      marginTop: 5,
      marginBottom: 20,
      color : muiTheme.textField.errorColor
    },
    errorIcon: {
      float: 'right',
      height: 16,
      width: 16
    }
  }
}

export class CommonTextField extends Component {

  static propTypes = {
    style: PropTypes.object,
    value: PropTypes.string,
    floatingLabelText: PropTypes.string,
    onFocusOut: PropTypes.func,
    type:PropTypes.string,
    name: PropTypes.string.isRequired,
    postValidation: PropTypes.func.isRequired,
    trim: PropTypes.bool,
    regex: PropTypes.array.isRequired,
    externalErrorText: PropTypes.string,
    pauseDuration: PropTypes.number,
    disabled: PropTypes.bool,
    required:PropTypes.bool
  }

  static defaultProps = {
    postValidation : () => {},
    externalErrorText:'',
    pauseDuration:2,
    required:false,
    regex:[/.*/]
  }

  constructor (props, context) {
    super(props, context)
    this.validationMethod = () => {}
    this.timer = null
    this.state = {
      valid: (!props.required || props.disabled) || false,
      errorMessage: '',
      name: props.name,
      value: props.value,
      blurred:false
    }
  }

  componentWillMount () {
    var key = this.props.name
    switch (key) {
      case 'username':
        this.validationMethod = validateUsername
        break
      case 'email':
        this.validationMethod = validateEmail
        break
      case 'firstName':
        this.validationMethod = validateFirstName
        break
      case 'lastName':
        this.validationMethod = validateLastName
        break
      case 'password':
      case 'newPassword':
      case 'confirmPassword':
        this.validationMethod = validatePassword
        break
      case 'roleCode':
        this.validationMethod = validateRoleCode
        break
      case 'roleName':
        this.validationMethod = validateRoleDisplayName
        break
      case 'groupCode':
        this.validationMethod = validateGroupCode
        break
      case 'groupName':
        this.validationMethod = validateGroupDisplayName
        break
      case 'description':
        this.validationMethod = validateGroupDescription
        break
    }
  }

  validate = (regex, value) => {
    if ((this.props.required || value) && !this.props.disabled) {
      return this.validationMethod(regex, value)
    }
    return {
      valid : this.state.valid,
      errorMessage : this.state.errorMessage
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    const stateUpdated = Boolean(nextProps.externalErrorText !== this.props.externalErrorText ||
      (nextState.valid !== this.state.valid ||
      nextState.errorMessage !== this.state.errorMessage ||
      nextState.value !== this.state.value))
    const pauseChanged = (nextState.paused !== this.state.paused)
    const focusChanged = (nextState.blurred !== this.state.blurred)
    // if ((stateUpdated && !nextState.blurred) && focusChanged) {
    //   return true
    // }
    if (stateUpdated) {
      return true
    }
    if ((!stateUpdated || nextState.blurred) && focusChanged) {
      return true
    }
    if (pauseChanged && nextState.paused) {
      return true
    }
    return false
  }

  componentDidMount () {
    if (this.props.value) {
      const validationStatus = this.validate(this.props.regex, this.props.value)
      this.setState({
        valid: validationStatus.valid,
        errorMessage: validationStatus.errorMessage,
        name: this.props.name,
        value: this.props.value,
        blurred : true
      })
    } else {
      this.props.postValidation(this.state)
    }
  }

  componentWillReceiveProps (nextProps, prevProps) {
    if ((this.state.errorMessage !== nextProps.externalErrorText)) {
      this.setState({
        valid: false,
        errorMessage: nextProps.externalErrorText
          ? nextProps.externalErrorText : this.state.errorMessage,
        name: nextProps.name,
        value: this.state.value
      })
    }
  }

  _onBlur=(e) => {
    const validationStatus = this.validate(this.props.regex, e.target.value)
    validationStatus && this.setState({
      valid: this.state.errorMessage ? false : validationStatus.valid,
      errorMessage: validationStatus.errorMessage,
      blurred : true,
      paused : false
    })
  }

  _onChange=(e, value) => {
    window.clearTimeout(this.timer)
    if (this.state.value !== value) {
      this.setState({
        value: this.props.trim ? value.trim() : value,
        errorMessage:'',
        blurred : false,
        paused : false
      })
      this.timer = window.setTimeout(() => {
        const validationStatus = this.validate(this.props.regex, this.state.value)
        validationStatus && this.setState({
          valid: this.state.errorMessage ? false : validationStatus.valid,
          errorMessage: validationStatus.errorMessage,
          blurred : false,
          paused : true
        })
      }, this.props.pauseDuration * 1000)
    }
  }

  componentDidUpdate () {
    if (this.state.blurred || this.state.paused) {
      this.props.postValidation(this.state)
      const callFocusOut = !this.state.errorMessage || this.state.valid
      if (callFocusOut) {
        this.props.onFocusOut && this.props.onFocusOut(this.state.value)
      }
    }
  }

  _getErrorText (errorText, styles) {
    if (errorText && errorText.length) {
      return (
        <React.Fragment>
        <p style={styles.errorText}>
          {errorText}
          <ErrorIcon
            style={styles.errorIcon}
            color={styles.errorText.color}
          />
        </p>
        </React.Fragment>
      )
    }
  }

  render () {
    const { floatingLabelText, type, style, disabled } = this.props
    const { errorMessage, value } = this.state
    const styles = getStyles(this.props, theme)

    return (
      <TextField
        disabled={disabled}
        style={style}
        floatingLabelText={floatingLabelText}
        type={type}
        onBlur={this._onBlur}
        errorText={errorMessage && this._getErrorText(errorMessage, styles)}
        onChange={this._onChange}
        value={value}
      />
    )
  }
}

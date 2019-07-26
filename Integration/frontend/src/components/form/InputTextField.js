/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
/** MUI */
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
/** MUI Icons */
import ErrorIcon from '@material-ui/icons/ReportProblem'
/** Local */
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

function getStyles(props, muiTheme) {
  return {
    textField: {
      width: '100%'
    },
    errorText: {
      marginTop: 5,
      marginBottom: 20,
      color: muiTheme.textField.errorColor
    },
    errorIcon: {
      float: 'right',
      height: 16,
      width: 16
    }
  }
}

export default class InputTextField extends Component {

  static propTypes = {
    style: PropTypes.object,
    id: PropTypes.string,
    value: PropTypes.string,
    floatingLabelText: PropTypes.string,
    onFocusOut: PropTypes.func,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    postValidation: PropTypes.func.isRequired,
    trim: PropTypes.bool,
    regex: PropTypes.array.isRequired,
    externalErrorText: PropTypes.string,
    pauseDuration: PropTypes.number,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    forceValidate: PropTypes.bool,
    copyPaste: PropTypes.bool
  }

  static defaultProps = {
    id: String(Math.ceil(Math.random() * 1000)),
    value: '',
    postValidation: () => { },
    externalErrorText: '',
    pauseDuration: 2,
    required: false,
    regex: [/.*/],
    forceValidate: false,
    copyPaste: true
  }

  constructor(props, context) {
    super(props, context)
    this.validationMethod = () => { }
    this.timer = null
    this.state = {
      valid: (!props.required || props.disabled) || false,
      errorMessage: '',
      name: props.name,
      value: props.value,
      blurred: false
    }
  }

  componentWillMount() {
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
      return { ...this.validationMethod(regex, value.trim()), value: value.trim() }
    }
    return {
      value: value.trim(),
      valid: this.state.valid,
      errorMessage: this.state.errorMessage,
      forceValidate: false
    }
  }

  setValidationStatus = (validationStatus) => {
    validationStatus && this.setState({
      valid: this.state.errorMessage ? false : validationStatus.valid,
      errorMessage: validationStatus.errorMessage,
      blurred: true,
      paused: false,
      forceValidate: validationStatus.forceValidate,
      value: validationStatus.value
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateUpdated = Boolean(nextProps.externalErrorText !== this.props.externalErrorText ||
      (nextState.valid !== this.state.valid ||
        nextState.errorMessage !== this.state.errorMessage ||
        nextState.value !== this.state.value))
    const pauseChanged = (nextState.paused !== this.state.paused)
    const focusChanged = (nextState.blurred !== this.state.blurred)
    const forceValidate = (nextState.forceValidate !== this.state.forceValidate)

    if (stateUpdated) {
      return true
    }
    if ((!stateUpdated || nextState.blurred) && focusChanged) {
      return true
    }
    if (pauseChanged && nextState.paused) {
      return true
    }
    if (forceValidate && nextState.forceValidate) {
      return true
    }
    return false
  }

  componentDidMount() {
    if (this.props.value) {
      const validationStatus = this.validate(this.props.regex, this.props.value)
      this.setState({
        valid: validationStatus.valid,
        errorMessage: validationStatus.errorMessage,
        name: this.props.name,
        value: this.props.value,
        blurred: true,
        forceValidate: validationStatus.forceValidate
      })
    } else {
      this.props.postValidation(this.state)
    }
  }

  componentWillReceiveProps(nextProps, prevProps) {
    if ((this.state.errorMessage !== nextProps.externalErrorText)) {
      this.setState({
        valid: false,
        errorMessage: nextProps.externalErrorText
          ? nextProps.externalErrorText : this.state.errorMessage,
        name: nextProps.name,
        value: this.state.value
      })
    }
    if (nextProps.forceValidate && nextProps.forceValidate !== this.state.forceValidate) {
      const validationStatus = this.validate(nextProps.regex, this.state.value)
      this.setValidationStatus(validationStatus)
    }
  }

  _onBlur = (e) => {
    const validationStatus = this.validate(this.props.regex, e.target.value)
    this.setValidationStatus(validationStatus)
  }

  _disableCopyPaste = (e) => {
    if (!this.props.copyPaste) {
      e.preventDefault()
      return false
    } else {
      return true
    }
  }

  _onChange = (e, value) => {
    window.clearTimeout(this.timer)
    if (this.state.value !== e.target.value) {
      this.setState({
        value: this.props.trim ? e.target.value.trim() : e.target.value,
        errorMessage: '',
        blurred: false,
        paused: false
      })
      this.timer = window.setTimeout(() => {
        const validationStatus = this.validate(this.props.regex, this.state.value)
        this.setValidationStatus(validationStatus)
      }, this.props.pauseDuration * 1000)
    }
  }

  componentDidUpdate() {
    if (this.state.blurred || this.state.paused) {
      this.props.postValidation(this.state)
      const callFocusOut = !this.state.errorMessage || this.state.valid
      if (callFocusOut) {
        this.props.onFocusOut && this.props.onFocusOut(this.state.value)
      }
    }
  }

  _getErrorText(errorText, styles) {
    if (errorText && errorText.length) {
      return (
        <span style={styles.errorText}>
          {errorText}
          <ErrorIcon
            style={styles.errorIcon}
            color={'error'}
          />
        </span>
      )
    }
  }

  render() {
    const { floatingLabelText, type, style, disabled, name, id } = this.props
    const { errorMessage, value } = this.state
    const styles = getStyles(this.props, theme)

    return (
      <FormControl fullWidth>
        <TextField
          fullWidth
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={this._onChange}
          disabled={disabled}
          style={style}

          margin='normal'
          label={floatingLabelText}
          helperText={errorMessage && this._getErrorText(errorMessage, styles)}
          onBlur={this._onBlur}
          onCopy={this._disableCopyPaste}
          onPaste={this._disableCopyPaste}
          inputRef={
            (ref) => { this.field = ref }
          }
        />
      </FormControl>
    )
  }
}

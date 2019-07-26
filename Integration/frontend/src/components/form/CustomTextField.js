/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

/** MUI Icons */
import ErrorIcon from '@material-ui/icons/ReportProblem'

/** Local */
import theme from '../../theme'

function getStyles (props, muiTheme) {
  return {
    selectField: {
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

/**
 * CustomTextField component
 */
export default class CustomTextField extends Component {

  static propTypes = {
    id:PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value:PropTypes.string,
    required:PropTypes.bool,
    postValidation: PropTypes.func
  }

  static defaultProps = {
    id:String(Math.ceil(Math.random() * 1000)),
    postValidation : () => {}
  }

  constructor (props, context) {
    super(props, context)
    this.state = {
      valid: props.valid,
      errorMessage: '',
      name: props.name,
      value:props.value
    }
  }

/**
 *@ignore
 */
  componentWillReceiveProps (nextProps) {
    this.setState({ value:nextProps.value, valid:nextProps.valid })
  }

// Custom validation can be used here according to props.name
  validate = (value) => {
    let errorMessage = '', valid = true
    if (this.props.required && !this.props.disabled && !value) {
      // No error message is shown now
      valid = false
    }
    return {
      errorMessage,
      valid
    }
  }

  /**
   * @function handleChange
   * Handle change in Selectfield value
   */
  handleChange=(e) => {
    const validationStatus = this.validate(e.target.value)
    const object = {
      name:this.props.name,
      value:e.target.value || '',
      valid:validationStatus.valid,
      errorMessage:validationStatus.errorMessage
    }
    this.setState(object)
    this.props.postValidation(object)
  }

  /**
   * @param {srtring} errorText
   * @param {object} styles
   * @returns The error react node
   */
  _getErrorText (errorText, styles) {
    if (errorText.length) {
      return (
        <p style={styles.errorText}>
          {errorText}
          <ErrorIcon
            style={styles.errorIcon}
            color={'error'}
          />
        </p>
      )
    }
  }

  /**
   * @ignore
   */
  render () {
    const { id, name, label, classes } = this.props
    const { errorMessage } = this.state
    const styles = getStyles(this.props, theme)
    return (
      <TextField
          id={id}
          name={name}
          label={label}
          fullWidth
          className={classes.textField}
          margin='normal'
          helperText={errorMessage && this._getErrorText(errorMessage, styles)}
          value={this.state.value}
          onChange={this.handleChange}
      />
    )
  }
}

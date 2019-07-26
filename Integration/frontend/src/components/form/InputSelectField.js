/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/** MUI */
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select'

/** MUI Icons */
import ErrorIcon from '@material-ui/icons/ReportProblem'

/** Local */
import theme from '../../theme'

function getStyles(props, muiTheme) {
  return {
    selectField: {
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

export default class InputSelectField extends Component {

  static propTypes = {
    style: PropTypes.object,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    options: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    floatingLabelText: PropTypes.string,
    postValidation: PropTypes.func,
    name: PropTypes.string,
    multiple: PropTypes.boolean,
    optionsComponent: PropTypes.node,
    externalErrorText: PropTypes.string
  }

  static defaultProps = {
    id: String(Math.ceil(Math.random() * 1000)),
    postValidation: () => { },
    multiple: false,
    required: false
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      valid: (!props.required || props.disabled) || Boolean(props.value),
      errorMessage: '',
      name: props.name,
      value: props.multiple
        ? (props.value && Array.isArray(props.value)) ? props.value : []
        : props.value || ''
    }
  }

  componentDidMount() {
    this.props.postValidation(this.state)
  }

  componentDidUpdate(prevProps) {
    prevProps.postValidation(this.state)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateUpdation = Boolean(nextState.valid !== this.state.valid ||
      nextState.errorMessage !== this.state.errorMessage ||
      nextState.value !== this.state.value ||
      nextState.name !== this.state.name)
    const optionsUpdated = (nextProps.optionsComponent &&
      nextProps.optionsComponent.length !== this.props.optionsComponent.length) ||
      (nextProps.options && nextProps.options.length !== this.props.options.length)
    const propsUpdation = Boolean(optionsUpdated ||
      this.props.floatingLabelText !== nextProps.floatingLabelText)
    return Boolean(stateUpdation || propsUpdation)
  }

  validate = (value) => {
    let errorMessage = ''
    if (this.props.required && !this.props.disabled && Array.isArray(value) && !value.length) {
      errorMessage = this.props.localize('REQUIRED_FIELD_MSG')
    }
    if (this.props.required && !this.props.disabled && !value) {
      errorMessage = this.props.localize('REQUIRED_FIELD_MSG')
    }
    return {
      errorMessage,
      valid: !errorMessage
    }
  }

  blur = (e) => {
    const validationStatus = this.validate(this.state.value)
    validationStatus && this.setState({
      valid: validationStatus.valid,
      errorMessage: validationStatus.errorMessage,
      blurred: true
    })
  }

  handleChange = (e) => {
    const validationStatus = this.validate(e.target.value)
    this.setState({
      value: e.target.value,
      valid: validationStatus.valid,
      errorMessage: validationStatus.errorMessage,
      blurred: false
    })
  }

  _getErrorText(errorText, styles) {
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

  render() {
    const { id, name, type, disabled, floatingLabelText, options, multiple, localize } = this.props
    const styles = getStyles(this.props, theme)

    return (
      <FormControl fullWidth margin='normal'>
        <InputLabel htmlFor={id}>{floatingLabelText}</InputLabel>
        <Select
          fullWidth
          id={id}
          name={name}
          type={type}
          value={this.state.value}
          onChange={this.handleChange}
          disabled={disabled}


          MenuProps={{}}
          input={<Input inputRef={(ref) => { this.field = ref }} />}
          multiple={multiple}
          onClose={this.blur}
          renderValue={
            (values) => {
              values = [].concat(values).map((value) => {
                const option = options.find((option) => (value === option.name))
                return option && option.displayName
              })
              switch (values.length) {
                case 0:
                  break
                case 1:
                case 2:
                  return values.join(' | ')
                default:
                  return `${values.length} ${name} ${localize('SMALL_SELECTED')}`
              }
            }
          }
        >
          {
            options.map((option, index) => <MenuItem
              value={option.name} key={index}
              selected={this.state.value && this.state.value.indexOf(option.name) > -1} >
              {multiple && <Checkbox checked={this.state.value && this.state.value.indexOf(option.name) > -1} />}
              <ListItemText primary={option.displayName} />
            </MenuItem>)
          }
        </Select>
        {this.state.errorMessage ? <FormHelperText>{this._getErrorText(this.state.errorMessage, styles)}</FormHelperText> : null}
      </FormControl>
    )
  }
}

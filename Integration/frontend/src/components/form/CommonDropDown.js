/**React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
/**MUI */
import SelectField from '@material-ui/core/SelectField'
import MenuItem from '@material-ui/core/MenuItem'
/**MUI Icons */
import ErrorIcon from '@material-ui/icons/ReportProblem'
/**Local */
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

export class CommonDropDown extends Component {

  static propTypes = {
    style: PropTypes.object,
    disabled: PropTypes.bool,
    required:PropTypes.bool,
    options: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    floatingLabelText: PropTypes.string,
    postValidation: PropTypes.func,
    name: PropTypes.string,
    multiple : PropTypes.boolean,
    optionsComponent : PropTypes.node,
    externalErrorText: PropTypes.string
  }

  static defaultProps = {
    postValidation : () => {},
    multiple : false,
    required : false
  }

  constructor (props, context) {
    super(props, context)
    this.state = {
      valid: (!props.required || props.disabled) || Boolean(props.value),
      errorMessage: '',
      name: props.name,
      value: props.value
    }
  }

  componentDidMount () {
    this.props.postValidation(this.state)
  }

  componentDidUpdate (prevProps) {
    prevProps.postValidation(this.state)
  }

  shouldComponentUpdate (nextProps, nextState) {
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
      errorMessage = 'This field is required'
    }
    if (this.props.required && !this.props.disabled && !value) {
      errorMessage = 'This field is required'
    }
    return {
      errorMessage,
      valid : !errorMessage
    }
  }

  blur = (e) => {
    const validationStatus = this.validate(this.state.value)
    validationStatus && this.setState({
      valid: validationStatus.valid,
      errorMessage: validationStatus.errorMessage,
      blurred : true
    })
  }

  handleChange=(e, index, value) => {
    const validationStatus = this.validate(value)
    this.setState({ value, valid:validationStatus.valid, errorMessage:validationStatus.errorMessage, blurred:false })
  }

  _getErrorText (errorText, styles) {
    if (errorText.length) {
      return (
        <p style={styles.errorText}>
          {errorText}
          <ErrorIcon style={styles.errorIcon} color={styles.errorText.color} />
        </p>
      )
    }
  }

  render () {
    const { name, disabled, floatingLabelText, options, multiple } = this.props
    const styles = getStyles(this.props, theme)

    return (
      <SelectField 
        dropDownMenuProps={{
        menuStyle:{ width:'320px', left:'126px' },
        listStyle:{ width:'320px' },
        iconStyle:{ right:'0px', top:'20px' },
        maxHeight: 200,
        style:{ width:'100%' },
        autoWidth:false }}
        errorText={this._getErrorText(this.state.errorMessage, styles)}
        multiple={multiple}
        value={this.state.value}
        onChange={this.handleChange}
        onBlur={this.blur}
        disabled={disabled}
        style={styles.selectField}
        floatingLabelText={floatingLabelText}
        selectionRenderer={(values) => {
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
              return `${values.length} ${name} selected`
          }
        }
        }
         >
        {
          options.map((option, index) => <MenuItem
            value={option.name} key={index}
            primaryText={option.displayName}
            checked={multiple && this.state.value && this.state.value.indexOf(option.name) > -1} />)
        }
      </SelectField>
    )
  }
}

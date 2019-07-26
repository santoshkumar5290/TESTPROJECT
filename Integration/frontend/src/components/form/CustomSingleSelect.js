/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
/** MUI */
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
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
 * CustomSingleSelect component can be used to handle validation properly
 * Pass the list of option as props
 * Each option should have value property
 */
export default class CustomSingleSelect extends Component {

  static propTypes = {
    classes:PropTypes.object,
    id:PropTypes.string,
    required:PropTypes.bool,
    options: PropTypes.array,
    label: PropTypes.string,
    postValidation: PropTypes.func,
    name: PropTypes.string,
    valid:PropTypes.bool,
    index:PropTypes.string
  }

  static defaultProps = {
    id:String(Math.ceil(Math.random() * 1000)),
    postValidation : () => {},
    options:[]
  }

  constructor (props, context) {
    super(props, context)
    this.state = {
      valid:props.valid,
      errorMessage: '',
      name: props.name,
      id:props.id,
      index:props.index
    }
  }

/**
 * @ignore
 */
  componentWillReceiveProps (nextProps) {
    this.setState({ index:nextProps.index, valid:nextProps.valid })
  }

// Custom validation can be used here according to props.name
  validate = (value) => {
    let errorMessage = ''
    let valid = true
    if (this.props.required && this.props.options.length > 0 && !value) {
      // No error message is shown now
      valid = false
    }
    return {
      errorMessage,
      valid
    }
  }

  handleChange=(e) => {
    const { options } = this.props
    const index = e.target.value
    const validationStatus = this.validate(options[index].value)
    const object = {
      name:this.props.name,
      index:index,
      ...options[index],
      ...validationStatus
    }
    this.setState(object)
    this.props.postValidation(object)
  }

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

  render () {
    const { id, name, label, options, classes } = this.props
    const { errorMessage, index } = this.state
    const styles = getStyles(this.props, theme)

    return (
      <TextField
        id={id}
        fullWidth
        className={classes.textField}
        margin='normal'
        select
        disabled={options.length === 0}
        helperText={errorMessage && this._getErrorText(errorMessage, styles)}
        name={name}
        label={label}
        value={index}
        onChange={this.handleChange}
      >
        {
          options && options.map((option, index) => (
            <MenuItem key={index} value={index} >
              {option.value}
            </MenuItem>
          ))
        }
      </TextField>
    )
  }
}

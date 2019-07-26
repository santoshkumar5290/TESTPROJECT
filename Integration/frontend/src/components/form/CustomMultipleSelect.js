/** React */
import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
/** MUI */
import MenuItem from '@material-ui/core//MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Clear from '@material-ui/icons/Clear'
import ErrorIcon from '@material-ui/icons/ReportProblem'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import SvgIcon from '@material-ui/core/SvgIcon'
import Toolbar from '@material-ui/core/Toolbar'
import { lightBulbIcon } from '../../svgIcons'
/** Local */
import theme from '../../theme'
import { embedI18n } from '../../services/I18nl10n'

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

/**
 * CustomMultipleSelect component can be used to handle validation properly
 * Pass the list of option as props
 * Each option should have value property
 */
class CustomMultipleSelect extends Component {

  static propTypes = {
    classes: PropTypes.object,
    id: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    options: PropTypes.array,
    value: PropTypes.array,
    label: PropTypes.string,
    postValidation: PropTypes.func,
    valid: PropTypes.bool,
    disabled: PropTypes.bool,
    inputLabelClassName: PropTypes.string,
    selectClassName: PropTypes.string,
    scroll: PropTypes.bool
  }

  static defaultProps = {
    id: String(Math.ceil(Math.random() * 1000)),
    postValidation: () => { },
    options: []
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      valid: props.valid,
      errorMessage: '',
      name: props.name,
      value: props.value,
      open: false
    }
  }

  /**
   * @ignore
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value, valid: nextProps.valid })
  }

  // Custom validation can be used here according to props.name
  validate = (value) => {
    let errorMessage = ''
    let valid = true
    if (this.props.required && !this.props.disabled && Array.isArray(value) && !value.length) {
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
   * Called when change in seleted list boccurs
   */
  handleChange = (value) => {
    // For handling cancel and done
    if (value[value.length - 1] === 'doneButton') {
      this.handleDone()
      return
    } else if (value[value.length - 1] === 'cancelButton') {
      this.handleCancelClick()
      return
    }
    // for (let i = 0; i < value.length; i++) {
    //   if (typeof (value[i]) === 'undefined') {
    //     return
    //   }
    // }
    const validationStatus = this.validate(value)
    this.setState({ value: value, ...validationStatus })
    this.props.postValidation({ ...validationStatus, value: value, name: this.props.name })
  }

  /**
   * @function handleOpen
   * Called just before the menu is opened
   */
  handleOpen = () => {
    this.setState({ open: true })
  };

  /**
   * @function handleClose
   * Called just before the menu is closed
   */
  handleClose = () => {

  };

  /**
   * @function handleDone
   * Called on clicking done button in menu
   */
  handleDone = () => {
    this.setState({ open: false })
  }

  /**
   * @function handleCancelClick
   * Called on clicking cancel button in menu
   * It clears the selected options and closes the menu
   */
  handleCancelClick = () => {
    this.setState({ open: false })
    this.handleChange([])
  }

  /**
   * @function handleRemove
   * Handles removing of option from selected options
   */
  handleRemove = (i) => {
    var array = this.state.value
    if (i > -1) array.splice(i, 1)
    this.handleChange(array)
  }

  /**
   * @param {srtring} errorText
   * @param {object} styles
   * @returns The error react node
   */
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

  /**
   * @ignore
   */
  render() {
    const { label, options, classes, name, inputLabelClassName, selectClassName, scroll, localize } = this.props
    const { value } = this.state

    return (

      <FormControl fullWidth className={classes.formControle}>
        <InputLabel className={inputLabelClassName} htmlFor='select-multiple-checkbox' >
          {label}
        </InputLabel>
        <Select
          multiple
          name={name}
          open={this.state.open}
          onOpen={this.handleOpen}
          onClose={this.handleClose}
          fullWidth
          className={selectClassName}
          value={value}
          onChange={(e) => { this.handleChange(e.target.value) }}
          renderValue={selected => selected.join(',') && ''}
        >
          {
            // If we use ListItem selecting using enter does not work
            options.map(option => (
              <MenuItem className={classes.formControleListItem} key={option.id} value={option.value}>
                <Checkbox checked={value.indexOf(option.value) > -1} />
                <ListItemText primary={option.value} />
              </MenuItem>
            ))
          }

          {/* Button clicks are handled in handleChange of select */}
          <Button className={classNames(classes.labelButtonsMargin, { [classes.raisedButtonDisabled]: true, [classes.raisedButton]: !(value.length === 0) })}
            disabled={value.length === 0} value='doneButton'> {localize('DONE')} </Button>

          <Button className={classNames(classes.labelButtonsMargin, classes.flatButton)} variant='flat' value='cancelButton'> {localize('CANCEL')} </Button>

        </Select>

        { this.props.hint && value.length === 0 ?
        <div className={classes.formGroupHint}>
          <Paper elevation={0}>
            <Toolbar>
              <IconButton className={classes.hintIcon} color="inherit" aria-label="Menu">
                <SvgIcon viewBox="0 0 1000.000000 1000.000000">
                  {lightBulbIcon}
                </SvgIcon>
              </IconButton>
              <Typography className={classes.hintText} component="h6">
                {this.props.hint}
              </Typography>
            </Toolbar>
          </Paper>
        </div> : null
        }


        <div className={classNames({ [classes.formGroupScroll]: scroll, [classes.spclHeight]: scroll })}>
          <List className={classes.formControleList}>
            {!(this.state.open) && this.state.value.map((value, i) => {
              return (
                <ListItem key={i} value={value}>
                  <ListItemText primary={value} />
                  <IconButton value={i} onClick={() => { this.handleRemove(i) }}><Clear /></IconButton>
                </ListItem>)
            })
            }
          </List>
        </div>
      </FormControl>
    )
  }
}

export default (embedI18n(CustomMultipleSelect))

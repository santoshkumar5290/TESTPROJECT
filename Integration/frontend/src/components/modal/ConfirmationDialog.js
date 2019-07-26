/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/** MUI */
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'

/** MUI Icons */
import WarningIcon from '@material-ui/icons/Warning'

/** Local */
import Modal from './Modal'

const styles = (theme) => ({
  dialogPaper: {
    maxWidth: '700px',
    border: {
      radius: [6, 6]
    }
  },
  modalWindow: {
    display: 'block'
  },
  WarningIcon:{
    marginRight:'20px',
    fontSize:'84px'
  }
})

class ConfirmationDialog extends Component {

  static propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    styles: PropTypes.object,
    onSuccess: PropTypes.func,
    primaryHeader: PropTypes.string,
    submitAction: PropTypes.func,
    cancelButton: PropTypes.bool,
    submitButton: PropTypes.bool,
    onCancel: PropTypes.func,
    message: PropTypes.string,
    submitLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    classes:PropTypes.object
  }

  static defaultProps = {
    title: 'Delete User',
    message: 'Are you sure you want to delete?',
    submitLabel: 'DELETE',
    cancelLabel: 'CANCEL',
    cancelButton: true,
    submitButton: true,
    submitAction: () => { },
    onSuccess: () => { },
    onCancel: () => { }
  }

  constructor (props, context) {
    super(props, context)
    this.state = {
      open: false
    }
  }

  _cancel = () => {
    this.props.onCancel()
  }

  _submit = () => {
    this.props.submitAction()
    this.props.onSuccess()
  }

  render () {
    const { title, message, classes } = this.props

    return (
      <Modal
        open
        title={title}
        maxWidth='sm'
        classes={{ 'dialogPaper': this.props.classes.dialogPaper }}
        submitDisable={false}
        submitLabel={this.props.submitLabel}
        cancelLabel={this.props.cancelLabel}
        cancelButton={this.props.cancelButton}
        submitButton={this.props.submitButton}
        cancelAction={this._cancel}
        submitAction={this._submit}
      >
        <div className={classes.modalWindow}>

          <Toolbar>
            <WarningIcon className={classes.WarningIcon} color={'error'} />
            {message}
          </Toolbar>

        </div>
      </Modal>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ConfirmationDialog)

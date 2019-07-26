/**React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**MUI */
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from  '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class DialogComponent extends Component {

  static propTypes = {
    cancelAction: PropTypes.func,
    submitAction: PropTypes.func,
    cancelButton: PropTypes.bool,
    submitButton: PropTypes.bool,
    cancelLabel: PropTypes.string,
    submitLabel: PropTypes.string,
    cancelDisable: PropTypes.bool,
    submitDisable: PropTypes.bool,
    title: PropTypes.node,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    styles: PropTypes.object,
    children: PropTypes.object,
    titleStyle: PropTypes.object
  }

  static defaultProps = {
    cancelAction: () => { },
    submitAction: () => { },
    cancelButton: true,
    submitButton: true,
    cancelLabel: 'CANCEL',
    submitLabel: 'SUBMIT',
    cancelDisable: false,
    submitDisable: true,
    title: '',
    onClose: () => { },
    styles: {}
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      if (!this.props.submitDisable) {
        this.handleSubmit()
      }
    }
  }

  handleSubmit = () => {
    this.props.submitAction()
  };

  handleCancel = () => {
    this.setState({ open: false }, this.props.cancelAction)
    this.props.onClose()
  };

  componentWillMount() {
    this.setState({ open: this.props.open })
  }

  render() {
    const styles = Object.assign({}, { width: '400px', maxWidth: 'none', height: 600 }, this.props.styles)
    const title = this.props.title

    return (
      <Dialog contentStyle={styles}
        disableBackdropClick
        disableEscapeKeyDown
        disableRestoreFocus
        open={this.state.open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div onKeyPress={this.handleEnterKey}>{this.props.children}</div>
        </DialogContent>
        <DialogActions>
          {this.props.cancelButton && <Button
            variant='flat'
            color='primary'
            disabled={this.props.cancelDisable}
            onClick={this.handleCancel}
            style={{ margin: '5px' }}
          >{this.props.cancelLabel}</Button>}
          {this.props.submitButton && <Button
            variant='raised'
            color='primary'
            disabled={this.props.submitDisable}
            onClick={this.handleSubmit}
            style={{ margin: '5px' }}
          >{this.props.submitLabel}</Button>}
        </DialogActions>
      </Dialog>
    )
  }
}

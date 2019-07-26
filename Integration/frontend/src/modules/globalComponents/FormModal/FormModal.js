/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/** MUI */
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'

/**
* A modal dialog can only be closed by selecting one of the actions.
*/
const styles = (theme) => ({
  dialogPaper: {
    minWidth: '600px',
    background: 'transparent',
    border: {
      radius: ['6px', '6px']
    },
    boxShadow: [
      [0, -30, 0, -20, 'rgba(255,255,255, 0.3)']
    ],
    margin: [20],
  },

  [theme.breakpoints.up('md')]: {
    dialogPaper: {
      maxWidth: '700px',
      width: '700px',
    }
  },

  [theme.breakpoints.down('md')]: {
    dialogPaper: {
      maxWidth: '600px',
      width: '600px',
    }
  },

  // [theme.breakpoints.down('sm')]: {
  //   dialogPaper: {
  //     maxWidth: '500px',
  //     width: '500px',
  //   }
  // },

})

class Modal extends Component {

  static propTypes = {
    classes: PropTypes.object,
    cancelAction: PropTypes.func,
    submitAction: PropTypes.func,
    cancelButton: PropTypes.bool,
    submitButton: PropTypes.bool,
    cancelLabel: PropTypes.string,
    submitLabel: PropTypes.string,
    cancelDisable: PropTypes.bool,
    submitDisable: PropTypes.bool,
    title: PropTypes.string,
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

  handleSubmit = () => {
    // this.setState({open: true})
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
    const actions = [

      this.props.submitButton && <Button
        variant='raised'
        label={this.props.submitLabel}
        primary
        disabled={this.props.submitDisable}
        onClick={this.handleSubmit}
        style={{ margin: '5px' }} />,

      this.props.cancelButton && <Button
        label={this.props.cancelLabel}
        primary
        disabled={this.props.cancelDisable}
        onClick={this.handleCancel}
        style={{ margin: '5px' }} />

    ]

    const title = this.props.title

    return (

      <Dialog
        fullWidth
        classes={{ 'paper': this.props.classes.dialogPaper }}
        maxWidth='sm'
        actions={actions}
        title={title}
        hideBackdrop
        open={this.state.open}>
        {this.props.children}
      </Dialog>

    )
  }
}

export default withStyles(styles)(Modal)

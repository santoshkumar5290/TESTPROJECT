/**React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**MUI */
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    dialogPaper: {
        background: 'transparent',
        boxShadow: 'none',
        overflow: 'inherit',
        textAlign: "center",
        border: {
            radius: [6, 6]
        }
    },
    modalWindow: {
        display: 'block',
    },
});


class ModalComponent extends Component {

    static propTypes = {
        cancelAction: PropTypes.func,
        submitAction: PropTypes.func,
        cancelButton: PropTypes.bool.isRequired,
        submitButton: PropTypes.bool.isRequired,
        cancelLabel: PropTypes.string,
        submitLabel: PropTypes.string,
        cancelDisable: PropTypes.bool,
        submitDisable: PropTypes.bool,
        title: PropTypes.string,
        footer: PropTypes.node,
        open: PropTypes.bool,
        onClose: PropTypes.func,
        styles: PropTypes.object,
        children: PropTypes.node,
        titleStyle: PropTypes.object,
        transparent: PropTypes.bool
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
        transparent: false,
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
    };

    getFooterNode = () => {
        const { classes } = this.props
        if (this.props.footer) {
            return this.props.footer
        }
        return (
            <div className={classes.footerContainer}>

                {
                    this.props.submitButton &&
                    <Button
                        variant='raised'
                        color='primary'
                        disabled={this.props.submitDisable}
                        onClick={this.handleSubmit}
                        className={classes.raisedButton}
                    >
                        {this.props.submitLabel}
                    </Button>
                }

                {
                    this.props.cancelButton &&
                    <Button
                        variant='flat'
                        color='primary'
                        disabled={this.props.cancelDisable}
                        onClick={this.handleCancel}
                        className={classes.flatButton}
                    >
                        {this.props.cancelLabel}
                    </Button>
                }

            </div>
        )
    }

    componentWillMount() {
        this.setState({ open: this.props.open })
    }

    render() {
        const { classes } = this.props
        // const styles = Object.assign({}, { width:'400px', maxWidth: 'none', height:600 }, this.props.styles)
        const title = this.props.title

        return (

            <Dialog
                open={this.state.open}
                classes={{ "paper": this.props.classes.dialogPaper }}
            >



                <div>
                    {this.props.children}
                </div>



            </Dialog>
        )
    }
}


export default withStyles(styles, { withTheme: true })(ModalComponent)
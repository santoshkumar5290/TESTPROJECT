/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/** MUI */
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import styles from '../../enterprise/Configuration/styles'

/** Local */
import { getAuthenticationURL } from '../../../services/httpRequest'
// import { configurationRouteConstants } from '../../enterprise/route'
// import { licenseRouteConstants } from '../route'
import { actionHandler } from 'platform/License/redux'
import { features as configurationFeatures } from 'platform/License/redux/actions'
import { actions as authActions } from 'platform/auth'
import { embedI18n } from 'platform/services/I18nl10n'

const { logout } = authActions.authReduxActions.features
const { updateLicenseInfo } = configurationFeatures
const {handleApplyLicense} = actionHandler

class ApplyLicenseDialog extends Component {

  static propTypes = {
    open: PropTypes.bool,
    onCancel: PropTypes.func,
    onApply: PropTypes.func,
    classes: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
    updateLicenseInfo: PropTypes.func,
    licenseInfo: PropTypes.object,
    logout: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      dialogShown: false
    }
  }

  openFileDialog = () => {
    this.fileInput.click()
  }

  handleFileChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      this.setState({ fileName: file.name, licenseData: reader.result })
    }
  }

  applyDisabled = () => {
    if (this.fileInput && this.fileInput.value) return false
    return true
  }

  onCancel = () => {
    const { licenseInfo } = this.props
    if ('openPopup' in this.props) {
      this.handleCancelApplyLicense();
    } else {
      if (licenseInfo.noFile) {
        this.props.logout(getAuthenticationURL())
      } else {
        this.setState({ dialogShown: true })
        this.props.history.replace('/configuration')
      }
    }
    this.fileInput.value = ''
  }

  onApply = () => {
    this.props.updateLicenseInfo(getAuthenticationURL(), this.state.licenseData)
    this.handleCancelApplyLicense();
    //this.props.onApply(this.state.licenseData)
    this.fileInput.value = ''
  }

  handleCancelApplyLicense = () => {
    this.props.handleApplyLicense(false)
  }

  render() {
    const { classes, localize } = this.props
    const { fileName } = this.state
    const { pathname } = this.props.location
    let open = false;

    // If applylicense rendered globally
    // if (pathname === '/configuration/editLicense') {
    //   open = false
    // }
    if (!this.props.licenseInfo.valid && (this.props.licenseInfo.expired || this.props.licenseInfo.noFile)) {
      open = (!this.props.licenseInfo.valid) || this.props.licenseInfo.expired
    }
    // If dialog is previously opened then don't open it again
    if (open) {
      open = !(this.state.dialogShown)
    }

    // If applyLicense is rendered manually
    if ('openPopup' in this.props) {
      open = this.props.openPopup
    }
    return (
      <Dialog
        title='ApplyLicense'
        open={open}
        fullWidth
        classes={{ 'paper': this.props.classes.dialogPaper }}
      >
        <div className={classes.modalWindow}>

          <header className={classes.modalHeader}>
            <h2>{localize('APPLY_LICENSE')}</h2>
          </header>

          <div className={classes.modalBody} onKeyPress={this.handleEnterKey}>
            <Grid container>
              <Grid item xs={8}>
                <input className={classes.textField} type='file' multiple={false} ref={(el) => { this.fileInput = el }} style={{ display: 'none' }} onChange={this.handleFileChange} />
                <TextField className={classes.textField} fullWidth disabled value={(this.fileInput && this.fileInput.value) ? fileName : localize('LICENSE_PLACEHOLDER')} />
              </Grid>
              <Grid item xs={4}>
                <Button className={classNames(classes.raisedButton, classes.raisedButtonBrowse, classes.alignRight)} variant='raised' onClick={this.openFileDialog} style={{ marginLeft: '10px' }} > {localize('CHOOSE')} </Button>
              </Grid>
            </Grid>
          </div>

          <footer className={classes.modalFooter}>

            <Button className={classNames(classes.buttonsMargin, { [classes.raisedButtonDisabled]: true, [classes.raisedButton]: !(this.applyDisabled()) })}
              disabled={this.applyDisabled()} onClick={this.onApply}
            >
              {localize('APPLY')}
            </Button>

            <Button className={classNames(classes.flatButton, classes.buttonsMargin)} variant='flat' color='primary' onClick={this.onCancel}>{localize('CANCEL')}</Button>
          </footer>

        </div>
      </Dialog>

    )
  }
}

const mapStateToProps = state => {
  return {
    licenseInfo: state.licenseReducer.licenseInfo
  }
}

export default withRouter(connect(mapStateToProps, { updateLicenseInfo, logout, handleApplyLicense })(withStyles(styles)(embedI18n(ApplyLicenseDialog))))
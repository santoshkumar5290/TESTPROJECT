/**React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

/**MUI */
import { withStyles } from '@material-ui/core/styles'

/**Local */
import { Modal, TextField, SelectField } from '../../../../components'
import { updateSnack } from '../../../../services/snackbar'
import { actions } from '../../../auth'
import { getAuthenticationURL } from '../../../../services/httpRequest'
import theme from '../../../../theme'
import { embedI18n } from '../../../../services/I18nl10n'

const styles = (theme) => ({

  modalRow: {
    display: 'block',
    position: 'relative',
    paddingBottom: '10px',
    '&:last-child': {
      paddingBottom: 0,
    },
    '& label': {
      fontSize: '22px',
    },
    '& input': {
      fontSize: '2.2rem',
    },
    '& p': {
      fontSize: '1.4rem',
      position: 'absolute',
      bottom: '-20px',
      width: '100%',
      '& span': {
        margin: 0,
        padding: 0
      }
    },
    '&:first-child > div, &:first-child > div > div': {
      marginTop: 0,
    },
    paddingBottom: 10,
    '&:last-child': {
      //paddingTop: 36,
      paddingBottom: 24,
    }
  },

});


const { editUserReduxActions, profileReduxActions, groupReduxActions } = actions
const { features } = editUserReduxActions
const { USER_EDITED_STATUS,
  GENERIC_ERROR_STATUS,
  USER_EDITING_STATUS } = editUserReduxActions.statusConstants
const profileActions = profileReduxActions.features
const { fetchAllGroups } = groupReduxActions.features



/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state, ownProps) => ({
  user: state.editUser,
  groups: state.groupManagement ? (state.groupManagement.groups || []) : []
})

/**
  * EditUser
*/
export class EditUser extends Component {
  static propTypes = {
    styles: PropTypes.object,
    edit: PropTypes.func,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    primaryHeader: PropTypes.string,
    secondaryHeader: PropTypes.string,
    selectedUser: PropTypes.object,
    fetchAllGroups: PropTypes.func,
    clear: PropTypes.func,
    user: PropTypes.object,
    groups: PropTypes.array,
    validateEmail: PropTypes.func,
    profileEmail: PropTypes.func,
    profileManagement: PropTypes.object,
    updateSnack: PropTypes.func
  }

  /**
    * default prop values.
  */
  static defaultProps = {
    onCancel: () => { },
    edit: () => { },
    onPasswordTipsClicked: () => { },
    onSuccess: () => { },
    primaryHeader: 'EDIT_USER',
    secondaryHeader: ''
  }

  /**
    * creates a instance of EditUSer.
    * @param {object} props
  */
  constructor(props, context) {
    super(props, context)

    this.state = {
      username: '',
      groupNames: '',
      firstName: '',
      lastName: '',
      email: ''
    }
  }

  _cancel = () => {
    this.props.onCancel()
  }

  /**
    * React lifecycle method :
  */
  componentWillUpdate(nextProps) {
    if (nextProps.user.status === USER_EDITED_STATUS) {
      this.props.onSuccess(nextProps.user.userData, nextProps.user.message)
    }
    if (nextProps.user.status === GENERIC_ERROR_STATUS) {
      this.setState({
        username: '',
        groupNames: '',
        firstName: '',
        lastName: '',
        email: ''
      })
    }
  }

  /**
    * React lifecycle method :
  */
  componentWillMount() {
    this.props.fetchAllGroups(getAuthenticationURL())
  }

  /**
    * React lifecycle method :
  */
  componentWillUnmount() {
    this.props.clear()
  }

  _postValidation = (obj) => {
    this.setState((prevState) => {
      return { [obj.name]: Object.assign({}, prevState[obj.name], { ...obj }) }
    })
  }

  /**
    *Edit a User
  */
  _edit = () => {
    const { username, groupNames, firstName, lastName, email } = this.state
    this.props.edit({
      username: username.value.toLowerCase(),
      groupNames: groupNames.value,
      firstName: firstName.value,
      lastName: lastName.value,
      userId: this.props.selectedUser.id,
      email: email.value.toLowerCase()
    }, getAuthenticationURL())
  }

  /**
    *Check Email availablity
  */
  _checkEmailAvailable = (value) => {
    if (value.toLowerCase() !== this.props.selectedUser.email.toLowerCase()) {
      this.props.validateEmail(value.toLowerCase(), getAuthenticationURL())
    }
  }

  /**
    *Get Error Text for Generic Error
  */
  _showGenericError(user) {
    if (user.status === GENERIC_ERROR_STATUS) {
      var snack = {
        message: user.message,
        action: Boolean(user.log) && this.props.localize('REPORT'),
        log: Boolean(user.log) && user.log
      }
      this.props.updateSnack(snack)
    }
  }

  /**
    *Check enabled for Edit/Save button
  */
  _checkEditEnabled() {
    const { user } = this.props
    const valid = Object.values(this.state).every((field) => field.valid)
    return valid && user.status !== USER_EDITING_STATUS
  }
  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in div
  */
  render() {
    const { primaryHeader, groups, user, classes, localize } = this.props
    const { username, groupCodes, firstName, lastName, email } = this.props.selectedUser

    return (
      <Modal
        open
        title={localize(primaryHeader)}
        classes={{ "paper": this.props.classes.dialogPaper }}
        submitDisable={!this._checkEditEnabled()}
        submitAction={this._edit}
        cancelAction={this._cancel}
        cancelLabel={localize('CANCEL')}
        submitLabel={localize('SAVE')}>

        <div className={classNames(classes.container, classes.scroll)}>
          <div className={classes.wrapper}>

            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                floatingLabelText={localize('USER_NAME')}
                name={'username'}
                postValidation={this._postValidation}
                disabled
                value={username}
                regex={[/^[a-zA-Z0-9]+([_.]{1}[a-zA-Z0-9]{1,})*[a-zA-Z0-9]*$/]}
              />
            </div>
            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                value={email}
                floatingLabelText={localize('EMAIL')}
                name={'email'}
                onFocusOut={this._checkEmailAvailable}
                postValidation={this._postValidation}
                trim
                externalErrorText={this.state.email && (this.state.email.blurred || this.state.email.paused) &&
                  user.status === 'INVALID_EMAIL'
                  ? (this.state.email.errorMessage || 'Email already exists.') : this.state.email.errorMessage}
                regex={[/^[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/]}
              />
            </div>
            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                value={firstName}
                floatingLabelText={localize('FIRST_NAME')}
                name={'firstName'}
                postValidation={this._postValidation}
                regex={[/^([\w]){1,20}$/]}
              />
            </div>
            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                value={lastName}
                floatingLabelText={localize('LAST_NAME')}
                name={'lastName'}
                postValidation={this._postValidation}
                regex={[/^([\w]){1,20}$/]}
              />
            </div>
            <div className={classNames(classes.modalRow)}>
              <SelectField
                options={groups}
                disabled={!groups.length}
                localize={localize}
                floatingLabelText={groups.length ? localize('GROUP') : localize('NO_GROUP_AVAILABLE')}
                name={'groupNames'}
                postValidation={this._postValidation}
                value={groupCodes[0]}
              />
            </div>

          </div>
          {this._showGenericError(user)}
        </div>
      </Modal>
    )
  }
}

export default withStyles(styles)(connect(mapStateToProps, { ...features, fetchAllGroups, ...profileActions, updateSnack })(embedI18n(EditUser)))

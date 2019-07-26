/**React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

/**MUI */
import { withStyles } from '@material-ui/core/styles'

/**Local */
import { Modal, PasswordTips, TextField, SelectField } from '../../../../components'
import theme from '../../../../theme'
import { updateSnack } from '../../../../services/snackbar'
import { actions } from '../../../auth'
import { getAuthenticationURL } from '../../../../services/httpRequest'
import { embedI18n } from '../../../../services/I18nl10n'

const styles = (theme) => ({
  modalRow: {
    display: 'block',
    position: 'relative',
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
  }
});

const { createUserReduxActions, profileReduxActions, groupReduxActions } = actions
const { features } = createUserReduxActions
const { USER_CREATED_STATUS,
  USER_CREATING_STATUS,
  GENERIC_ERROR_STATUS } = createUserReduxActions.statusConstants
const profileActions = profileReduxActions.features
const { fetchAllGroups } = groupReduxActions.features

/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state, ownProps) => ({
  user: state.createUser,
  groups: state.groupManagement ? (state.groupManagement.groups || []) : []
})

/**
  * CreateUser
*/
export class CreateUser extends Component {
  static propTypes = {
    styles: PropTypes.object,
    create: PropTypes.func,
    onCancel: PropTypes.func,
    onPasswordTipsClicked: PropTypes.func,
    onSuccess: PropTypes.func,
    primaryHeader: PropTypes.string,
    secondaryHeader: PropTypes.string,
    fetchAllGroups: PropTypes.func,
    clear: PropTypes.func,
    validateUsername: PropTypes.func,
    validateEmail: PropTypes.func,
    user: PropTypes.object,
    groups: PropTypes.array,
    updateSnack: PropTypes.func,
    profileManagement: PropTypes.object
  }

  /**
    * default prop values.
  */
  static defaultProps = {
    onCancel: () => { },
    create: () => { },
    onPasswordTipsClicked: () => { },
    onSuccess: () => { },
    primaryHeader: 'CREATE_USER',
    secondaryHeader: ''
  }
  /**
    * creates a instance of CreateUser.
    * @param {object} props
  */
  constructor(props, context) {
    super(props, context)

    this.state = {
      email: '',
      username: '',
      password: '',
      groupNames: '',
      firstName: '',
      lastName: ''
    }
  }

  /**
    Modal pop-up Cancel
  */
  _cancel = () => {
    this.props.onCancel()
  }

  /**
    * React lifecycle method
  */
  componentWillUpdate(nextProps) {
    if (nextProps.user.status === USER_CREATED_STATUS) {
      this.props.onSuccess(nextProps.user.userData, nextProps.user.message)
    }
    if (nextProps.user.status === GENERIC_ERROR_STATUS && this.state.password) {

    }
  }
  /**
    * React lifecycle method
  */
  componentDidUpdate(prevProps) {
    if (prevProps.user.status === GENERIC_ERROR_STATUS) {
      prevProps.clear()
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

  /**
    *Create a User
  */
  _create = () => {
    const { username, password, groupNames, firstName, lastName, email } = this.state
    this.props.create({
      username: username.value.toLowerCase(),
      password: password.value,
      groupNames: groupNames.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value.toLowerCase()
    }, getAuthenticationURL())
  }

  /**
    *Get Error Text for Generic Error
  */
  _showGenericError(user) {
    if (user.status === GENERIC_ERROR_STATUS) {
      var snack = {
        message: user.message,
        action: Boolean(user.log) && 'REPORT',
        log: Boolean(user.log) && user.log
      }
      this.props.updateSnack(snack)
    }
  }

  /**
    *Check Username availablity
  */
  _checkUsernameAvailable = (value) => {
    this.props.validateUsername(value.toLowerCase(), getAuthenticationURL())
  }

  /**
    *Check Email availablity
  */
  _checkEmailAvailable = (value) => {
    this.props.validateEmail(value, getAuthenticationURL())
  }

  _postValidation = (obj) => {
    this.setState((prevState) => {
      return { [obj.name]: Object.assign({}, prevState[obj.name], { ...obj }) }
    })
  }

  /**
    *Check enabled for Create
  */
  _checkCreateEnabled() {
    const { user } = this.props
    const valid = Object.values(this.state).every((field) => field.valid)
    return valid && user.status !== USER_CREATING_STATUS
  }

  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in div
  */
  render() {
    const { user, primaryHeader, classes, localize } = this.props

    const containerStyle = {
      ...styles.container,
      ...this.props.styles
    }

    // const errors = this._validateFields()

    return (
      <Modal
        open
        title={localize(primaryHeader)}
        titleStyle={styles.titleStyle}
        submitDisable={!this._checkCreateEnabled()}
        submitAction={this._create}
        cancelAction={this._cancel}
        cancelLabel={localize('CANCEL')}
        submitLabel={localize('CREATE')}
      >

        <div className={classNames(classes.container, classes.scroll)}>
          <div className={classes.wrapper}>

            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                trim
                floatingLabelText={localize('USER_NAME')}
                type={'username'}
                name={'username'}
                onFocusOut={this._checkUsernameAvailable}
                postValidation={this._postValidation}
                externalErrorText={this.state.username && (this.state.username.blurred || this.state.username.paused) &&
                  user.status === 'INVALID_USERNAME'
                  ? (this.state.username.errorMessage || 'Username already exists.') : this.state.username.errorMessage}
                regex={[/^[a-zA-Z0-9]+([_.]{1}[a-zA-Z0-9]{1,})*[a-zA-Z0-9]*$/]}
              />
            </div>
            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                floatingLabelText={localize('EMAIL')}
                type={'email'}
                name={'email'}
                onFocusOut={this._checkEmailAvailable}
                postValidation={this._postValidation}
                externalErrorText={this.state.email && (this.state.email.blurred || this.state.email.paused) &&
                  user.status === 'INVALID_EMAIL'
                  ? (this.state.email.errorMessage || 'Email already exists.') : this.state.email.errorMessage}
                regex={[/^[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/]}
              />
            </div>
            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                floatingLabelText={localize('FIRST_NAME')}
                type={'firstName'}
                name={'firstName'}
                postValidation={this._postValidation}
                regex={[/^([\w]){1,20}$/]}
              />
            </div>
            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                floatingLabelText={localize('LAST_NAME')}
                type={'lastName'}
                name={'lastName'}
                postValidation={this._postValidation}
                regex={[/^([\w]){1,20}$/]}
              />
            </div>
            <div className={classNames(classes.modalRow)}>
              <SelectField
                floatingLabelText={this.props.groups.length ? localize('GROUP') : localize('NO_GROUP_AVAILABLE')}
                type={'groupNames'}
                name={'groupNames'}
                localize={localize}
                postValidation={this._postValidation}
                options={this.props.groups}
                disabled={!this.props.groups.length}
              />
            </div>

            <div className={classNames(classes.modalRow)}>

              <TextField
                required
                floatingLabelText={localize('PASSWORD')}
                type={'password'}
                name={'password'}
                postValidation={this._postValidation}
                externalErrorText={this.state.password && (this.state.password.blurred || this.state.password.paused) &&
                  this.state.username.value && this.state.username.value === this.state.password.value
                  ? 'Username and Password cannot be same.' : ''}
                regex={[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?!.*_)(?!.*\W).{8,20}$/]}
              />

              <PasswordTips />

            </div>

          </div>
          {this._showGenericError(user)}
        </div>

      </Modal>
    )
  }
}

export default withStyles(styles)(connect(mapStateToProps, { ...features, fetchAllGroups, updateSnack, ...profileActions })(embedI18n(CreateUser)))

/**React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

/**MUI */
import { withStyles } from '@material-ui/core/styles'

/**Local */
import { TextField, SelectField, Modal } from '../../../../components'
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


const { roleReduxActions, createGroupReduxActions } = actions
const { fetchAllRoles } = roleReduxActions.features
const { features } = createGroupReduxActions
const { GROUP_CREATED_STATUS,
  GROUP_CREATING_STATUS,
  GENERIC_ERROR_STATUS,
  INVALID_GROUP_CODE_STATUS,
  INVALID_GROUP_LABEL_STATUS } = createGroupReduxActions.statusConstants


/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state, ownProps) => ({
  group: state.createGroup,
  groupManagement: state.groupManagement,
  roles: state.roleManagement ? (state.roleManagement.roles || []) : []
})

/**
  * CreateGroup
*/
export class CreateGroup extends Component {
  static propTypes = {
    styles: PropTypes.object,
    create: PropTypes.func,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    primaryHeader: PropTypes.string,
    secondaryHeader: PropTypes.string,
    fetchAllRoles: PropTypes.func,
    clear: PropTypes.func,
    group: PropTypes.object,
    roles: PropTypes.array,
    updateSnack: PropTypes.func,
    groupManagement: PropTypes.object,
    validateGroupName: PropTypes.func,
    validateGroupDisplayName: PropTypes.func
  }

  /**
    * default prop values.
  */
  static defaultProps = {
    onCancel: () => { },
    create: () => { },
    onSuccess: () => { },
    primaryHeader: 'CREATE_GROUP',
    secondaryHeader: ''
  }
  /**
    * creates a instance of CreateGroup.
    * @param {object} props
  */
  constructor(props, context) {
    super(props, context)

    this.state = {
      groupCode: '',
      groupName: '',
      role: '',
      description: ''
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
    if (nextProps.group.status === GROUP_CREATED_STATUS) {
      this.props.onSuccess()
    }
    if (nextProps.group.status === GENERIC_ERROR_STATUS) {
      this.setState({
        groupCode: '',
        groupName: '',
        role: '',
        description: ''
      })
    }
  }
  /**
    * React lifecycle method
  */
  componentDidUpdate(prevProps) {
    if (prevProps.group.status === GENERIC_ERROR_STATUS) {
      prevProps.clear()
    }
  }

  /**
    * React lifecycle method :
  */
  componentWillMount() {
    this.props.fetchAllRoles(getAuthenticationURL())
  }

  /**
    * React lifecycle method :
  */
  componentWillUnmount() {
    this.props.clear()
  }

  /**
    *Create a Group
  */
  _create = () => {
    const { groupCode, groupName, role, description } = this.state

    this.props.create({
      name: groupCode.value,
      displayName: groupName.value.toLowerCase().trim(),
      role: role.value,
      description: description.value
    }, getAuthenticationURL())
  }

  /**
    *Get Error Text for Generic Errors
  */
  _showGenericError(group) {
    if (group.status === GENERIC_ERROR_STATUS) {
      var snack = {
        message: group.message,
        action: Boolean(group.log) && 'REPORT',
        log: Boolean(group.log) && group.log
      }
      this.props.updateSnack(snack)
    }
  }

  /**
    *Check Group name availablity
  */
  _checkGroupNameAvailable = (value) => {
    this.props.validateGroupName(value, getAuthenticationURL())
  }

  /**
    *Check Group DisplayName availablity
  */
  _checkGroupDisplayNameAvailable = (value) => {
    this.props.validateGroupDisplayName(value, getAuthenticationURL())
  }

  /**
    *Check enabled for Create
  */
  _checkCreateEnabled() {
    const { group } = this.props
    const valid = Object.values(this.state).every((field) => field.valid)
    return valid && group.status !== GROUP_CREATING_STATUS
  }

  _postValidation = (obj) => {
    this.setState((prevState) => {
      return { [obj.name]: Object.assign({}, prevState[obj.name], { ...obj }) }
    })
  }

  // /**
  //   * React lifecycle method :
  //   * Renders this component
  //   * @returns {ReactElement} - wrapped in Modal,div
  // */
  render() {
    const { primaryHeader, group, roles, classes, localize } = this.props
    const { groupCode, groupName } = this.state

    const containerStyle = {
      ...styles.container,
      ...this.props.styles
    }

    return (
      <Modal
        open
        title={localize(primaryHeader)}
        classes={{ "paper": this.props.classes.dialogPaper }}
        submitDisable={!this._checkCreateEnabled()}
        submitAction={this._create}
        cancelAction={this._cancel}
        cancelLabel={localize('CANCEL')}
        submitLabel={localize('CREATE')}>

        <div className={classNames(classes.container, classes.scroll)}>
          <div className={classes.wrapper}>

            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                trim
                style={styles.textField}
                floatingLabelText={localize('GROUP_CODE')}
                type={'groupCode'}
                name={'groupCode'}
                onFocusOut={this._checkGroupNameAvailable}
                postValidation={this._postValidation}
                externalErrorText={groupCode && (groupCode.blurred || groupCode.paused) &&
                  group.status === INVALID_GROUP_CODE_STATUS
                  ? (groupCode.errorMessage || localize('GROUP_CODE_ALREADY_EXISTS')) : groupCode.errorMessage}
                regex={[/^[^\s<>"'&/.\\]+$/]}
              />


            </div>

            <div className={classNames(classes.modalRow)}>
              <TextField
                required
                style={styles.textField}
                floatingLabelText={localize('GROUP_NAME')}
                type={'groupName'}
                name={'groupName'}
                onFocusOut={this._checkGroupDisplayNameAvailable}
                postValidation={this._postValidation}
                externalErrorText={groupName && (groupName.blurred || groupName.paused) &&
                  group.status === INVALID_GROUP_LABEL_STATUS
                  ? (groupName.errorMessage || localize('GROUP_NAME_EXIST')) : groupName.errorMessage}
                regex={[/^[^<>"'&/.\\]+$/]}
              />
            </div>

            <div className={classNames(classes.modalRow)}>
              <SelectField
                required
                options={this.props.roles.filter(role => (role.name !== 'ROLE_SICK_ADMIN'))}
                disabled={!roles.length}
                type={'role'}
                name={'role'}
                localize={localize}
                floatingLabelText={roles.length ? localize('ROLE') : localize('NO_ROLE_AVAILABLE')}
                postValidation={this._postValidation}
              />
            </div>

            <div className={classNames(classes.modalRow)}>
              <TextField
                style={styles.textField}
                floatingLabelText={localize('DESCRIPTION')}
                type={'description'}
                name={'description'}
                postValidation={this._postValidation}
                regex={[/.{1,64}/]}
              />
            </div>

          </div>
          {this._showGenericError(group)}
        </div>
      </Modal>
    )
  }
}

export default withStyles(styles)(connect(mapStateToProps, { ...features, fetchAllRoles, updateSnack })(embedI18n(CreateGroup)))

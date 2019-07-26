/** React */
import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Link, withRouter } from 'react-router-dom'

/** MUI */
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import SvgIcon from '@material-ui/core/SvgIcon'

/** Local */
import { getAuthenticationURL } from '../../../../services/httpRequest'
import LoginHeader from '../../login/components/LoginHeader'
import FormModal from '../../../globalComponents/FormModal'
import LoginFooter from '../../login/components/LoginFooter'
import { folderIcon } from './../../../../svgIcons'
import { features as I18feature} from '../../../../services/I18nl10n'
import styles from '../styles'
import { embedI18n } from '../../../../services/I18nl10n'

const mapStateToProps = state => {
  return {
    auth: state.authentication
  }
}

class Logout extends React.Component {
  componentWillMount() {
    if (this.props.auth.loggedIn) {
      this.props.history.replace("/login");
    }
    else{
      this.props.fetchGlobalMessageNLocal(getAuthenticationURL())
    }
  }

  render() {
    const { classes, localize } = this.props;
    return (
      <div className={classes.modalContainer}>
        <div className={classes.modalWindow}>
          <FormModal open={true} submitLabel={"LOG OUT"}>
            <div className={classes.modalWrapper}>
              {/*-- Login Header --*/}
              <LoginHeader>
                <h2>{localize('APPLICATION_THANKS_MSG')}</h2>
                <p>{localize('LOGOUT_SUCCESS')}</p>
              </LoginHeader>
              <div className={classes.modalBody}>
                <div
                  className={classes.container}
                  onKeyPress={this.handleEnterKey}
                >
                  <form noValidate autoComplete="off">
                    <div className={classNames(classes.modalRow, classes.signInBack_row)}
                    >
                      <SvgIcon
                        className={classes.folderIcon}
                        viewBox="0 0 1000.000000 1000.000000"
                      >
                        {folderIcon}
                      </SvgIcon>
                    </div>
                    <div className={classNames(classes.modalRow, classes.signInBack_row)}
                    >
                      <Button
                        component={Link}
                        to="/login"
                        color="secondary"
                        className={classes.signBackInButton}
                      >
                        {localize('SIGN_BACK_IN')}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              {/*-- Login Footer --*/}
              <LoginFooter />
            </div>
          </FormModal>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, {...I18feature})(withStyles(styles)(embedI18n(Logout))))
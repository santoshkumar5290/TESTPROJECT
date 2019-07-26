import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import { Client } from '@stomp/stompjs';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getBasesocketUrl } from '../../../services/httpRequest';
import { smaActions } from '../../sma/MachineWidget/redux';
import SensorModal from 'platform/TableHandler/components/SensorModal';
import { MySnackbarContentWrapper } from './SnackbarContent';

export const styles = theme => ({
  margin: { margin: theme.spacing.unit },
});

class CustomizedSnackbars extends React.Component {
  state = {
    open: false,
    data: {
      systemName: '',
      componentName: '',
      infoURL: '',
      status: '',
    },
  };

  componentDidMount() {
    this.client = new Client();
    this.client.brokerURL = `ws://${getBasesocketUrl()}/websocket-example`;
    this.client.onConnect = () => {
      this.client.subscribe('/topic/snackbarnotification', message => {
        // called when the client receives a STOMP message from the server
        if (message.body) {
          this.setState({ data: JSON.parse(message.body), open: true });
        }
      });
    };
    this.client.onStompError = frame => {
      console.error(`Broker reported error: ${frame.headers.message}`);
      console.error(`Additional details: ${frame.body}`);
    };
    this.client.activate();
  }

  componentWillUnmount() {
    this.client.deactivate();
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  onCloseInfo = () => {
    this.setState({ openInfo: false });
  };

  onInfoClick = async () => {
    const { snackbarViewClick, history } = this.props;
    const { data } = this.state;
    snackbarViewClick(data.systemName);
    history.push('/sma');
  };

  render() {
    const { open, data, openInfo, info } = this.state;
    const { auth } = this.props;
    const { componentName, systemName, infoURL, status } = data;
    if (!auth.loggedIn) return null;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={status === 'CLOSE' ? 'success' : 'warning'}
            message={`${systemName} - ${componentName}`}
            infoURL={infoURL}
            onInfoClick={this.onInfoClick}
          />
        </Snackbar>
        {openInfo && <SensorModal openInfo={openInfo} closeInfo={this.onCloseInfo} info={info} />}
      </div>
    );
  }
}
CustomizedSnackbars.propTypes = { classes: PropTypes.object.isRequired };

/**
 * @function mapStateToProps
 * function to map redux state as props.systemConfig
 * @param {*} state
 * Redux state
 */
const mapStateToProps = state => ({
  auth: state.authentication,
});

export default withRouter(
  connect(
    mapStateToProps,
    { ...smaActions }
  )(withStyles(styles)(CustomizedSnackbars))
);

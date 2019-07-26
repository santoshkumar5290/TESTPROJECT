import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';
import WidgetstIcon from '@material-ui/icons/Widgets';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import UpdateIcon from '@material-ui/icons/Update';
import { Client } from '@stomp/stompjs';

import TableContainer from '../../TablesContainer/SMATableContainer';
import styles from '../styles';
import { smaRouteConstants } from '../../route';
import { updateBreadcrumb } from '../../../../services/breadcrumb';
import { getBasesocketUrl } from '../../../../services/httpRequest';
import ReactMachineWidget from '../../Machine';
import { smaActions, smaFeatures } from '../redux';

class MachineContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTitle: '',
      selectedIndex: 0,
      selectedType: 'Image',
    };
  }

  componentDidMount = () => {
    const { history, updateBreadcrumb, getConfig, location, getCacheData } = this.props;
    updateBreadcrumb(location.pathname);
    this.subscribeToWS();
    getConfig('/api/v1/sma/configuration').then(() => {
      const { sma, snackbarClickEnd } = this.props;
      if (sma.config.machineConfig) {
        this.setState({
          activeTitle: sma.config.machineConfig[0] && sma.config.machineConfig[0].name,
          selectedIndex: 0,
        });
        if (sma.systemName) {
          sma.config.machineConfig.forEach((e, id) => {
            if (e.name === sma.systemName) {
              this.setState({ selectedIndex: id, selectedType: 'Image', activeTitle: e.name });
              snackbarClickEnd();
            }
          });
        }
      } else {
        setTimeout(() => history.push(smaRouteConstants.SYSCONFIG), 3000);
      }
    });
    getCacheData('/api/v1/sma/dashboard/cachedata');
  };

  componentDidUpdate(prevProps) {
    const { sma } = this.props;
    if (sma.systemName !== prevProps.sma.systemName) {
      sma.config.machineConfig.forEach((e, id) => {
        if (e.name === sma.systemName) this.setState({ selectedIndex: id, selectedType: 'Image', activeTitle: e.name });
      });
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.poller);
    this.client.deactivate();
    // this.props.subscribeToWS();
  };
  
  subscribeToWS = () => {
    const { dataReceived } = this.props;
    this.client = new Client();
    this.client.brokerURL = `ws://${getBasesocketUrl()}/websocket-example`;
    this.client.onConnect = () => {
      // Do something, all subscribes must be done is this callback
      // This is needed because this will be executed after a (re)connect
      // this.client.send("/topic/table", {}, JSON.stringify({test:"This is using send"}));
      // this.client.
      this.client.subscribe('/topic/table', message => {
        // called when the client receives a STOMP message from the server
        if (message.body) {
          // console.log(message.body)
          dataReceived('dashboardTableData2', JSON.parse(message.body).smaSystemDataDTO.dataList);
        }
      });
      this.client.subscribe('/topic/machine', message => {
        // called when the client receives a STOMP message from the server
        if (message.body) {
          // console.log(message.body)
          const data = JSON.parse(message.body).dashboardMachine.machine;
          dataReceived('dashboardTableData', data);
        }
      });
      // this.client.publish({ destination: '/topic/table', body: 'This is publish' });
      this.client.subscribe('/topic/smaconfig', message => {
        if (message.body) {
          const data = JSON.parse(message.body);
          // eslint-disable-next-line no-console
          console.log(data);
          // dataReceived('config', data);
        }
      });
    };
    this.client.onStompError = frame => {
      // Will be invoked in case of error encountered at Broker
      // Bad login/passcode typically will cause an error
      // Complaint brokers will set `message` header with a brief message. Body may contain details.
      // Compliant brokers will terminate the connection after any error
      console.error(`Broker reported error: ${frame.headers.message}`);
      console.error(`Additional details: ${frame.body}`);
    };
    this.client.activate();
  };

  activeTitleText = (incomingText, incomingIndex) => {
    this.setState({ activeTitle: incomingText, selectedIndex: incomingIndex });
  };

  handleIconClick = val => {
    if (val === 'list') {
      this.setState({ selectedType: 'Table' });
    } else {
      this.setState({ selectedType: 'Image' });
    }
  };

  pullConfig = () => {
    const { sma } = this.props;
    const { activeTitle } = this.state;
    const temp = sma.config.machineConfig.filter(e => e.name === activeTitle);
    if (temp[0]) return temp[0].machineComponents;
    return [];
  };

  /**
   *render method
   */
  render() {
    const { classes, sma } = this.props;
    const { selectedType, activeTitle, selectedIndex } = this.state;
    const { machineConfig, tableConfig } = sma.config;
    let data;
    const sensorsData = {};
    if (!machineConfig) return <div> No machines configured, Redirecting to System Configuration ...</div>;
    if (machineConfig.length === 0) return <div> Waiting for Network.... </div>;
    // if (!data || !data.length || this.state.activeTitle === '') return <div> No Data Available </div>
    const temp = machineConfig.filter(e => e.name === activeTitle);
    const table = temp[0] || machineConfig[0];
    const imageUrl = machineConfig[selectedIndex].url;
    if (selectedType === 'Table' || !imageUrl) {
      data = sma.dashboardTableData2;
    } else {
      data = sma.dashboardTableData;
      data && data.find(e => e.name === activeTitle) && data.find(e => e.name === activeTitle).components.forEach(e => (sensorsData[e.uniqueId] = e.default_color));
    }

    return (
      <React.Fragment>
        <Paper className={classes.wrapperPaper} elevation={4}>
          <div className={classes.tableHeader}>
            <AppBar position="static" className={classes.tableHeaderPaper}>
              <div className={classes.tableHeaderToolbar}>
                <div className={classes.tableHeaderLeft}>
                  <Typography variant="h2">{imageUrl === null || selectedType === 'Table' ? 'List View' : 'GUI View'}</Typography>
                </div>

                <div className={classes.tableHeaderRight}>
                  {/* <Button className={classes.raisedButton}>Stop Wrapper Arm 1</Button> */}
                  <Paper className={classes.viewsPaper} elevation={0}>
                    {imageUrl !== null && (
                      <IconButton
                        className={classNames({
                          [classes.viewsButton]: true,
                          [classes.viewsButtonActive]: selectedType === 'Image',
                        })}
                        onClick={() => this.handleIconClick('quilt')}
                      >
                        <WidgetstIcon />
                      </IconButton>
                    )}

                    <IconButton
                      className={classNames({
                        [classes.viewsButton]: true,
                        [classes.viewsButtonActive]: selectedType === 'Table' || imageUrl === null,
                      })}
                      onClick={() => this.handleIconClick('list')}
                    >
                      <ViewListIcon />
                    </IconButton>
                  </Paper>
                </div>
              </div>
            </AppBar>
          </div>
          <div className={classes.wrapperContainer}>
            <div className={classes.root}>
              <Drawer className={classes.innerDrawer} variant="permanent" classes={{ paper: classes.drawerPaper }} anchor="left">
                <List className={classes.innerDrawerList} component="div">
                  {machineConfig.map((text, index) => (
                    <ListItem
                      button
                      key={text.name}
                      className={classNames({
                        [classes.innerDrawerListItem]: true,
                        [classes.innerDrawerListItemError]: !data || !data.find(e => e.name === text.name) || !data.find(e => e.name === text.name).isActive,
                      })}
                      classes={{ selected: classes.innerDrawerListItemSelected }}
                      onClick={() => this.activeTitleText(text.name, index)}
                      selected={selectedIndex === index}
                    >
                      <ListItemText className={classes.innerDrawerListItemText} primary={text.name} />
                      {data && data.find(e => e.name === text.name) && (
                        <ListItemIcon className={classes.innerDrawerListItemIcon}>{data.find(e => e.name === text.name).isActive ? <DoneIcon /> : <ErrorIcon />}</ListItemIcon>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Drawer>

              <div className={classes.contentContainer}>
                <ExpansionPanel className={classes.expansionPanel} elevation={0} CollapseProps={{ classes: { container: selectedType === 'Image' && imageUrl !== null && classes.hideContainer } }}>
                  <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="title">
                      {/* eslint-disable-next-line no-nested-ternary*/}
                      {activeTitle} ({data && data.find(e => e.name === activeTitle) ? (data.find(e => e.name === activeTitle).isActive ? 'Active' : 'Stopped') : 'No Data Available'})
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                    <List className={classes.expansionList}>
                      <ListItem className={classes.expansionListItem}>
                        <div className={classes.expansionListRow}>
                          <div className={classes.expansionListCol}>
                            <ListItemIcon className={classes.expansionListIcons}>
                              <ErrorOutlineIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.expansionListText} primary="13 Interrupts total on current day" secondary="4 Interrupts in the last hour" />
                          </div>
                          <div className={classes.expansionListCol}>
                            <ListItemIcon className={classes.expansionListIcons}>
                              <UpdateIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.expansionListText} primary="3.53 hours constant uptime" secondary="21.24 hours constant uptime on current day" />
                          </div>
                        </div>
                      </ListItem>
                      <ListItem className={classes.expansionListItem}>
                        <div className={classes.expansionListRow}>
                          <div className={classes.expansionListCol}>
                            <ListItemIcon className={classes.expansionListIcons}>
                              <ErrorOutlineIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.expansionListText} primary="13 Interrupts total on current day" secondary="4 Interrupts in the last hour" />
                          </div>
                          <div className={classes.expansionListCol}>
                            <ListItemIcon className={classes.expansionListIcons}>
                              <UpdateIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.expansionListText} primary="3.53 hours constant uptime" secondary="21.24 hours constant uptime on current day" />
                          </div>
                        </div>
                      </ListItem>
                    </List>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                {selectedType === 'Image' && imageUrl !== null && (
                  <div className={classes.machineContainer}>
                    <ReactMachineWidget key={activeTitle} title={activeTitle} diagram={table.url} sensors={this.pullConfig()} sensorsData={sensorsData} pullData={this.pullConfig} />
                  </div>
                )}

                {(imageUrl === null || selectedType === 'Table') && (
                  <div className={classes.tableContainer}>
                    <TableContainer config={tableConfig} data={data && data.find(e => e.name === activeTitle)} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Paper>
      </React.Fragment>
    );
  }
}

/**
 * Function to map redux state to props
 */
const mapStateToProps = ({ sma }) => ({ sma });

export default connect(
  mapStateToProps,
  { ...smaFeatures, ...smaActions, updateBreadcrumb }
)(withStyles(styles)(MachineContainer));

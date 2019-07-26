import React, { lazy, Suspense } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// material-ui

import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import Settings from '@material-ui/icons/Settings';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import { systemConfigFeatures, systemConfigActions } from './redux';
import { AlertDialog } from '../../../components/modal';
import { smaRouteConstants } from '../route';

const EditSystemConfig = lazy(() => import('./SystemConfig'));

// import EditSystemConfig from './SystemConfig';

const styles = theme => ({
  systemConfigCard: {},

  systemConfigCardContent: { padding: theme.spacing.unit * 3 },
  systemConfigSubTitle: {
    fontSize: '2.2rem',
    color: theme.palette.textColorLight,
  },
  systemConfigTitle: {
    fontSize: '3rem',
    fontWeight: 'normal',
    color: theme.palette.primary2Color,
  },

  systemConfigCardActions: { padding: [theme.spacing.unit * 1.5, theme.spacing.unit * 2] },
  systemConfigFabButton: {
    boxShadow: 'inherit',
    background: 'transparent',
    fontSize: '2rem',
    color: theme.palette.accent2Color,
    textTransform: 'inherit',
    letterSpacing: 'inherit',
    padding: 0,
    margin: 0,
    '&:hover': {
      background: 'transparent',
      color: theme.palette.accent3Color,
    },
    '& svg': { marginRight: theme.spacing.unit },
  },
  rightAlignment: { flexGrow: 1 },
  paperTitle: {
    textTransform: 'uppercase',
    fontSize: '22px',
    margin: '15px',
  },
});

const crc = Math.floor(Math.random() * 100000000);

//for config screen

const SystemPaper = ({ classes, name, handleSettings, handleDelete, privilege }) => {
  return (
    <React.Fragment>
      {name.map((value, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className={classes.systemConfigCard} elevation={2}>
            <CardContent className={classes.systemConfigCardContent}>
              <Typography className={classes.systemConfigSubTitle} color="textSecondary">
                {`CRC ${crc}`}
              </Typography>
              <Typography className={classes.systemConfigTitle} variant="h5" component="h5">
                {value.name}
              </Typography>
            </CardContent>

            <Divider light />

            <CardActions className={classes.systemConfigCardActions}>
              {privilege.system.modify && (
                <>
                  <Fab size="small" variant="extended" className={classes.systemConfigFabButton} aria-label="Configure" onClick={() => handleSettings(value.id)}>
                    <Settings className={classes.extendedIcon} /> Configure
                  </Fab>
                  <div className={classes.rightAlignment} />
                </>
              )}
              {privilege.system.delete && (
                <Fab size="small" variant="extended" className={classes.systemConfigFabButton} aria-label="Remove" onClick={() => handleDelete(i, name)}>
                  <DeleteIcon className={classes.extendedIcon} /> Remove
                </Fab>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </React.Fragment>
  );
};

class PaperSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      configure: false,
      open: false,
      i: '',
      name: '',
      id: '',
      arrayOfSystem: '',
    };
  }

  handleDelete = (i, array) => {
    this.setState({ open: true, i, name: array[i].name, id: array[i].id, arrayOfSystem: array });
  };

  handleSettings = async id => {
    const { getComponentList, getList, getSourceList, getByteMappingList } = this.props;
    await getList('/api/v1/sma/system/ips', 'ipList');
    await getList('/api/v1/sma/data/source/type', 'sourceType');
    await getSourceList('/api/v1/sma/datasource');
    await getByteMappingList('/api/v1/sma/bytemap');
    const res = await getComponentList(`/api/v1/sma/system/${id}`);
    this.setState({ configure: true, configureId: id, res });
  };

  handleClose = () => {
    this.setState({ configure: false, configureId: undefined });
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/systemConfig');
  };

  deleteSystem = async id => {
    const { arrayOfSystem, i } = this.state;
    const { deleteSystem } = this.props;
    const e = await deleteSystem(`/api/v1/sma/system/${id}`);
    if (e.type === 'success') {
      const j = arrayOfSystem.splice(i, 1);
      this.setState({ arrayOfSystem: j });
      this.setState({ open: false });
    }
  };

  componentDidMount = async () => {
    const { getSystem } = this.props;
    await getSystem('/api/v1/sma/system');
    const { systemConfig, history } = this.props;
    if (systemConfig.systemName.length === 0) {
      setTimeout(() => history.push(smaRouteConstants.SYSCONFIG), 3000);
    }
  };

  render() {
    const { classes, systemConfig, privilege } = this.props;
    const { configure, configureId, open, name, id, res } = this.state;
    const { systemName } = systemConfig;
    if (configure)
      return (
        <Suspense fallback={<div>Loading ...</div>}>
          <EditSystemConfig type="normal" initialTab={3} systemId={configureId} handleClose={this.handleClose} res={res} />;
        </Suspense>
      );
    if (!systemName) return <div> Waiting for Network ... </div>;
    if (systemName.length === 0) return <div>No system is configured, Redirecting to System Configuration ...</div>;
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Typography className={classes.paperTitle} variant="headline" color="primary">
            {'SYSTEM CONFIGURATION'}
          </Typography>
        </Grid>
        <div className={classes.root}>
          <Grid container spacing={24}>
            {systemName && <SystemPaper classes={classes} name={systemName} handleDelete={this.handleDelete} handleSettings={this.handleSettings} privilege={privilege} />}
            <AlertDialog
              open={open}
              title="Remove"
              Icon={DeleteIcon}
              contentText={`Are you sure you want to Remove ${name} ? `}
              name="Remove"
              handleNameClick={() => this.deleteSystem(id)}
              handleCancelClick={() => this.setState({ open: false })}
              handleClose={() => this.setState({ open: false })}
            />
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ systemConfig, privileges }) => ({ systemConfig, privilege: privileges.values });

export default withRouter(
  connect(
    mapStateToProps,
    { ...systemConfigFeatures, ...systemConfigActions }
  )(withStyles(styles)(PaperSheet))
);

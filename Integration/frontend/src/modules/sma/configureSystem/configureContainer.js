/** React */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** MUI */
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
/** Local */

import Configure from './configure';
import styles from './styles';
import { updateBreadcrumb } from '../../../services/breadcrumb';

class ConfigureContainer extends React.Component {
  static propTypes = { classes: PropTypes.objectOf(PropTypes.string) };

  componentDidMount = () => {
    const { updateBreadcrumb, location } = this.props;
    updateBreadcrumb(location.pathname);
  };

  render() {
    const { classes, privilege, licenseInfo } = this.props;
    return (
      <div className={classes.mainContainer}>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item xs={12}>
            <Typography className={classes.paperTitle} variant="headline" color="primary">
              {'configuration'}
            </Typography>
          </Grid>
          <Configure privilege={privilege} licenseInfo={licenseInfo}/>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  privilege: state.privileges.values,
  licenseInfo: state.licenseReducer.licenseInfo,
});

export default withRouter(
  connect(
    mapStateToProps,
    { updateBreadcrumb }
  )(withStyles(styles)(ConfigureContainer))
);

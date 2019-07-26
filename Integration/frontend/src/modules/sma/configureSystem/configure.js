import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import SvgIcon from '@material-ui/core/SvgIcon';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import styles from './styles';

import { systemConfigIcon, sourceConfigIcon, settingIcon } from '../../../svgIcons';
import { licenseRouteConstants } from 'platform/License/route';
import { settingRouteConstants } from 'platform/userAndGlobalPreference/route';
import { smaRouteConstants } from '../route';

const Configure = ({ classes, privilege, licenseInfo }) => {
  const systemArray = [
    {
      title: 'System Configurations',
      subtitle: 'Setup your required system configuration',
      icon: systemConfigIcon,
      links: [
        { name: 'CONFIGURE/REMOVE SYSTEM', linkTo: smaRouteConstants.CONFIGSYSTEM, isVisible: privilege && privilege.system && (privilege.system.modify || privilege.system.delete) },
        { name: 'ADD SYSTEM', linkTo: smaRouteConstants.ADDSYSTEM, isVisible: privilege && privilege.system && privilege.system.create },
      ],
      isVisible: privilege && privilege.system && Object.keys(privilege.system).reduce((acc, cur) => privilege.system[cur] || acc, false),
    },
    {
      title: 'Source Configuration',
      subtitle: 'Setup your required source configuration',
      icon: sourceConfigIcon,
      links: [
        {
          name: 'ADD/EDIT SOURCE',
          linkTo: smaRouteConstants.CONFIGSOURCE,
          isVisible: privilege && privilege.source && (privilege.source.modify || privilege.source.create || privilege.source.delete),
        },
      ],
      isVisible: privilege && privilege.source && Object.keys(privilege.source).reduce((acc, cur) => privilege.source[cur] || acc, false),
    },
    {
      title: 'Software setting',
      subtitle: 'Set parameters help you use sick analytics',
      icon: settingIcon,
      isVisible: true,
      links: [
        { name: 'GLOBAL SETTINGs', linkTo: settingRouteConstants.EDITSETTING, isVisible: true },
        { name: 'MY PREFRENCE', linkTo: settingRouteConstants.EDITLOCALSETTING, isVisible: true },
        { name: 'SOFT SETTING', linkTo: settingRouteConstants.SOFTSETTING, isVisible: false },
      ],
    },
    {
      title: 'License Registration',
      subtitle: 'License Setup',
      icon: settingIcon,
      isVisible: true,
      links: [{ name: 'LICENSE APPLY', linkTo: licenseRouteConstants.EDITLICENSE, isVisible: true }],
    },
  ];
  return (
    <React.Fragment>
      {systemArray
        .filter(e => e.isVisible)
        .map(value => {
          return (
            <Grid item xs={12} md={6} lg={4}>
              <Paper className={classes.paperTiles}>
                <div className={classes.paperWrapper}>
                  <div className={classes.paperHeader}>
                    <div className={classes.paperHeaderCol}>
                      <SvgIcon className={classes.configIcon} viewBox="0 0 1000 1000">
                        {value.icon}
                      </SvgIcon>
                    </div>
                    <div className={classes.paperHeaderCol}>
                      <Typography className={classes.configTitle} variant="headline" color="primary">
                        {value.title}
                      </Typography>
                      <Typography className={classes.configCaption} variant="headline" color="primary">
                        {value.subtitle}
                      </Typography>
                    </div>
                  </div>
                  <Divider />
                  <div className={classes.paperBody}>
                    <FormGroup className={classes.paperLinks}>
                      {value.links
                        .filter(e => e.isVisible)
                        .map(value => {
                          return (
                            <Button className={classes.buttonLink} component={Link} to={value.linkTo}>
                              {value.name}
                            </Button>
                          );
                        })}
                    </FormGroup>
                  </div>
                </div>
              </Paper>
            </Grid>
          );
        })}
    </React.Fragment>
  );
};

Configure.propTypes = { classes: PropTypes.objectOf(PropTypes.string).isRequired };

export default withStyles(styles)(Configure);

import React from 'react';
import classNames from 'classnames';
import { Typography, TextField, Grid, Drawer, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Checkbox } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Button as CustomButton } from '../../../components';

export default ({ classes, that }) => (
  <Grid item xs={12}>
    <div className={classes.bottomContent}>
      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }}>
        <List className={classNames(classes.drawerList, classes.drawerListTabberTab)}>
          <ListItem className={classes.drawerListItem} dense button onClick={that.handleToggleSelectAll}>
            <Checkbox className={classes.drawerListItemCheckbox} checked={that.state.selectAll || false} tabIndex={-1} disableRipple />
            <ListItemText primary="Select All" />
          </ListItem>
          {that.props.systemConfig.componentList.map((e, i) => (
            <React.Fragment>
              {e.isValid && !that.props.systemConfig.visibleComponents[i] && (
                <ListItem className={classes.drawerListItem} dense button onClick={that.handleToggle(i)}>
                  <Checkbox className={classes.drawerListItemCheckbox} checked={that.state.visibleComponents[i] || false} tabIndex={-1} disableRipple />
                  <ListItemText primary={e.componentName} secondary={e.uniqueId || 'Unique Id'} />
                </ListItem>
              )}
            </React.Fragment>
          ))}
          <ListItem dense button className={classes.listItemButtonRow}>
            <CustomButton
              className={classes.importCompButton}
              disabled={!that.props.systemConfig.componentList.filter((e, i) => that.state.visibleComponents[i] && e.isValid && !that.props.systemConfig.visibleComponents[i]).length}
              onClick={() => that.props.updateVisibleComponents(that.state.visibleComponents)}
            >
              Import Components
            </CustomButton>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.mainContent}>
        <Paper className={classes.configDialogPaper} elevation={0} style={{ minHeight: '300px' }}>
          <Grid container spacing={24}>
            <Grid item xs="12">
              <TextField fullWidth label="System Name" value={that.state.systemName} disabled />
            </Grid>

            <Grid item xs="12">
              <Paper className={classes.componentsListContainer} elevation={2}>
                <Typography className={classes.componentsListTitle} variant="h6">
                  Components
                </Typography>
                <List disablePadding className={classes.componentsList}>
                  {that.props.systemConfig.componentList.map((e, i) => (
                    <React.Fragment>
                      {that.props.systemConfig.visibleComponents[i] && (
                        <ListItem dense disableGutters className={classes.componentsListItem}>
                          <ListItemText primary={`${e.componentName} , ${that.props.systemConfig.sourceList.find(e1 => e1.id === e.dataSourceId).sourceName} , ${e.uniqueId} `} />
                          <ListItemSecondaryAction>
                            <IconButton onClick={that.handleUpdateVisible(i)}>
                              <CloseIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </div>
  </Grid>
);

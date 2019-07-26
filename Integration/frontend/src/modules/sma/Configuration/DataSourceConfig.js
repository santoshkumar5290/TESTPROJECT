import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MenuItem, DialogActions, TextField, Grid, Drawer, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button as CustomButton } from '../../../components';

const DataSourceConfig = ({
  classes,
  systemConfig,
  handleClick,
  onDeleteIconClick,
  currentSource,
  ip,
  handleChange,
  sourceName,
  sourceType,
  noOfComponents,
  updateSource,
  reset,
  type,
  privilege,
  license,
}) => (
  <Grid item xs={12}>
    {/* {console.log(previousClickTab)} */}
    <div className={classes.bottomContent}>
      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }}>
        <List className={classes.drawerList}>
          {systemConfig.sourceList.map((e, i) => (
            <ListItem
              key={e.id}
              button
              onClick={handleClick(i)}
              classes={{ container: classes.drawerListItemContainer }}
              className={classNames(classes.drawerListItem, { [classes.drawerListItemSelected]: i === currentSource })}
            >
              <ListItemText primary={e.sourceName || 'Source Name'} secondary={e.ip || 'IP Address'} />
              {privilege && privilege.source && privilege.source.delete && (
                <ListItemSecondaryAction className={classes.drawerListActionButton}>
                  <IconButton onClick={onDeleteIconClick(i)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.mainContent}>
        <Paper className={classes.configDialogPaper} elevation={0}>
          <Grid container spacing={32}>
            <Grid container item sm={12} xl={type === 'normal' ? 8 : 12} spacing={32}>
              <Grid item sm={12} md={12} lg={6}>
                <TextField
                  disabled={!(privilege && privilege.source && privilege.source.modify)}
                  required
                  select
                  fullWidth
                  value={ip}
                  onChange={handleChange}
                  label="Select IP"
                  name="ip"
                  inputProps={{ id: 'language-required' }}
                  className={classes.selectEmpty}
                >
                  {systemConfig.ipList
                    .filter(e => !e.isSelected || e.name === systemConfig.sourceList[currentSource].ip)
                    .map(e => (
                      <MenuItem key={e.name} value={e.name}>
                        {e.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item sm={12} md={12} lg={6}>
                <TextField
                  disabled={!(privilege && privilege.source && privilege.source.modify)}
                  required
                  fullWidth
                  value={sourceName}
                  name="sourceName"
                  label="Set Source Name"
                  error={sourceName && sourceName.trim().length < 5}
                  helperText={sourceName && sourceName.trim().length < 5 && 'Source Name can not be less than 5 character'}
                  onChange={handleChange}
                  className={classes.textField}
                />
              </Grid>
              <Grid item sm={12} md={12} lg={6}>
                <TextField
                  disabled={!(privilege && privilege.source && privilege.source.modify)}
                  required
                  select
                  fullWidth
                  value={sourceType}
                  label="Select Type of Source"
                  onChange={handleChange}
                  name="sourceType"
                  className={classes.selectEmpty}
                >
                  {systemConfig.sourceType.map(e => (
                    <MenuItem key={e.id} value={e.id}>
                      {e.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {sourceType === systemConfig.sourceType[1].id && (
                <Grid item sm={12} md={12} lg={6}>
                  <TextField
                    disabled={!(privilege && privilege.source && privilege.source.modify)}
                    required
                    fullWidth
                    label="No. of Components"
                    error={noOfComponents > 100 || noOfComponents < 1}
                    value={sourceType === 'JSON' ? noOfComponents : 1}
                    helperText={(noOfComponents > 100 && 'Exceeding the limit') || (noOfComponents < 1 && 'Invalid value')}
                    name="noOfComponents"
                    type="Number"
                    className={classes.textField}
                    onChange={handleChange}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>

          <Grid style={{ paddingTop: '32px' }}>
            <DialogActions className={classes.configDialogActions}>
              <CustomButton
                disabled={!(ip && sourceName && sourceName.trim().length >= 5 && sourceType && (sourceType === systemConfig.sourceType[0].id || (noOfComponents > 0 && noOfComponents < 101)))}
                className={classes.leftButton}
                onClick={updateSource}
              >
                Update to List
              </CustomButton>
              <CustomButton variant="flat" onClick={reset}>
                Reset
              </CustomButton>
            </DialogActions>
          </Grid>
        </Paper>
      </main>
    </div>
  </Grid>
);

DataSourceConfig.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  systemConfig: PropTypes.shape({
    sourceList: PropTypes.arrayOf(PropTypes.object),
    componentList: PropTypes.arrayOf(PropTypes.object),
    sourceType: PropTypes.arrayOf(PropTypes.object),
    byteMappingList: PropTypes.arrayOf(PropTypes.object),
    ipList: PropTypes.arrayOf(
      PropTypes.shape({
        isSelected: PropTypes.bool,
        name: PropTypes.string,
      })
    ),
  }),
  noOfComponents: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  currentSource: PropTypes.number.isRequired,
  onDeleteIconClick: PropTypes.func.isRequired,
  sourceName: PropTypes.string,
  sourceType: PropTypes.string,
  ip: PropTypes.string,
  updateSource: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default DataSourceConfig;

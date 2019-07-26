import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MenuItem, TextField, Grid, Drawer, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Backup from '@material-ui/icons/Backup';
import Clear from '@material-ui/icons/Clear';
import { Button as CustomButton } from '../../../components';

const ComponentsConfig = ({
  classes,
  systemConfig,
  dataSourceId,
  handleChange,
  handleClick,
  currentComponent,
  onDeleteIconClick,
  byteMapping,
  componentName,
  uniqueId,
  partNumber,
  productFamily,
  message,
  updateComponent,
  reset,
  type,
  handleComponentImage,
  componentImageInBytes,
  removeComponentImage,
  imageName,
  dataSource,
  isParsing,
  displayImage
}) => {
  const enabledByteMapping = systemConfig.sourceList.find(e => e.id === dataSourceId);
  const byteMappingList = enabledByteMapping && systemConfig.byteMapping[enabledByteMapping.sourceName];
  const displayImageName=displayImage && displayImage.split("/")[5].split('?')[0]
  return (
    <Grid item xs={12}>
      <div className={classes.bottomContent}>
        <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }}>
          <List className={classes.drawerList}>
            {systemConfig.componentList.map((e, i) => (
              <ListItem
                button
                onClick={handleClick(i)}
                key={e.id}
                classes={{ container: classes.drawerListItemContainer }}
                className={classNames(classes.drawerListItem, { [classes.drawerListItemSelected]: i === currentComponent })}
              >
                <ListItemText
                  primary={e.componentName || 'Set Component'}
                  secondary={
                    <React.Fragment>
                      {e.dataSourceId ? systemConfig.sourceList.find(e1 => e1.id === e.dataSourceId).sourceName : ''}
                      <br />
                      {e.byteMapping}
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction className={classes.drawerListActionButton}>
                  <IconButton onClick={onDeleteIconClick(i)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
           }
          </List>
        </Drawer>
        <main className={classes.mainContent}>
          <Paper className={classes.configDialogPaper} elevation={0}>
            <Grid container spacing={32}>
              <Grid container item sm={12} xl={type === 'normal' ? 8 : 12} spacing={32}>
                <Grid item sm={12} md={12} lg={6}>
                  <TextField required select label="Select Source" fullWidth value={(dataSourceId!=="" && dataSourceId) || dataSource } onChange={handleChange} name="dataSourceId" className={classes.selectEmpty}>
                    {systemConfig.sourceList.map(
                      e =>
                        e.isValid && (
                          <MenuItem key={e.id} value={e.id}>
                            {e.sourceName}
                          </MenuItem>
                        )
                    )}
                  </TextField>
                </Grid>
                <Grid item sm={12} md={12} lg={6}>
                  <TextField
                    required
                    select
                    label="Select Byte Mapping"
                    disabled={!dataSourceId }
                    fullWidth
                    value={byteMapping}
                    onChange={handleChange}
                    name="byteMapping"
                    className={classes.selectEmpty}
                  >
                    {enabledByteMapping &&
                      Object.keys(byteMappingList).map(e => {
                        return !byteMappingList[e].isSelected || e === byteMapping ? (
                          <MenuItem key={e} value={e}>
                            {systemConfig.byteMapping[enabledByteMapping.sourceName][e].name}
                          </MenuItem>
                        ) : null;
                      })}
                  </TextField>
                </Grid>
                <Grid item sm={12} md={12} lg={6}>
                  <TextField
                    fullWidth
                    required
                    value={(dataSourceId || isParsing) && componentName || ''}
                    name="componentName"
                    label="Name"
                    error={componentName && componentName.trim().length < 5}
                    helperText={componentName && componentName.trim().length < 5 && 'Component Name can not be less than 5 char'}
                    onChange={handleChange}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item sm={12} md={12} lg={6}>
                  <TextField
                    fullWidth
                    required
                    value={(dataSourceId || isParsing) && uniqueId || ''}
                    name="uniqueId"
                    label="Unique Id"
                    error={uniqueId && uniqueId.trim().length < 5}
                    helperText={uniqueId && uniqueId.trim().length < 5 && 'Unique ID can not be less than 5 char'}
                    onChange={handleChange}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item sm={12} md={12} lg={6}>
                  <TextField fullWidth value={(dataSourceId || isParsing) && productFamily || ''} name="productFamily" label="Product Family" onChange={handleChange} className={classes.textField} />
                </Grid>
                <Grid item sm={12} md={12} lg={6}>
                  <TextField fullWidth value={(dataSourceId || isParsing) && partNumber || ''} name="partNumber" label="Part Number" onChange={handleChange} className={classes.textField} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth value={(dataSourceId || isParsing) && message || ''} name="message" label="Custom Interruption Message" onChange={handleChange} className={classes.textField} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={32}>
                    {type === 'normal' && (
                      <Grid item sm={12} md={12} lg={6}>
                        <label htmlFor="upload-config" className={classes.browseLabel}>
                          <CustomButton component="span" variant="extended" className={classNames(classes.leftButton, classes.browseButton)} disabled={componentImageInBytes !== undefined}>
                            <Backup className={classes.uploadButton} />
                            <React.Fragment>Upload Image</React.Fragment>
                          </CustomButton>
                          <input style={{ display: 'none' }} accept=".png" id="upload-config" type="file" onChange={handleComponentImage} />
                        </label>
                      </Grid>
                    )}
                    {(componentImageInBytes !== undefined || displayImage) && (
                      <Grid item sm={12} md={12} lg={6}>
                        <div className={classes.uploadedImageWrap}>
                         <svg className={classes.uploadImage} viewBox="0 0 48 48" preserveAspectRatio="xMinYMin meet">
                       <image className={classes.uploadedImageImg} xlinkHref={displayImage  || componentImageInBytes } width="48" height="48" /> 
                          </svg>
                          <span className={classes.uploadedImagePath}>{ displayImageName || imageName}</span>
                          <Clear className={classes.uploadClear} onClick={removeComponentImage} />
                        </div>
                      </Grid>
                    )}
                  </Grid>
                  <Divider className={classes.dividerBorder} />
                </Grid>
              </Grid>
            </Grid>
            <Grid style={{ paddingTop: '32px', paddingBottom: '32px' }}>
              <CustomButton
                disabled={!(componentName.trim() && componentName.trim().length >= 5 && uniqueId.trim() && uniqueId.trim().length >= 5 && dataSourceId && byteMapping.trim())}
                className={classes.leftButton}
                onClick={updateComponent}
              >
                Update to List
              </CustomButton>
              <CustomButton variant="flat" onClick={reset}>
                Reset
              </CustomButton>
            </Grid>
          </Paper>
        </main>
      </div>
    </Grid>
  );
};

ComponentsConfig.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  systemConfig: PropTypes.shape({
    sourceList: PropTypes.arrayOf(PropTypes.object),
    componentList: PropTypes.arrayOf(PropTypes.object),
    sourceType: PropTypes.arrayOf(PropTypes.object),
    byteMappingList: PropTypes.arrayOf(PropTypes.object),
  }),
  dataSourceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  currentComponent: PropTypes.number.isRequired,
  onDeleteIconClick: PropTypes.func.isRequired,
  byteMapping: PropTypes.string,
  componentName: PropTypes.string,
  uniqueId: PropTypes.string,
  partNumber: PropTypes.string,
  productFamily: PropTypes.string,
  message: PropTypes.string,
  updateComponent: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default ComponentsConfig;

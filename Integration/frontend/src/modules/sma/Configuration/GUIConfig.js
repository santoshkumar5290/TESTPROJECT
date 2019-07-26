import React from 'react';
import classNames from 'classnames';
import { Typography, Grid, Drawer, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Divider } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import Dropzone from 'react-dropzone';
import ComponentLocator from './ComponentLocator';
import { uploadSystemIcon } from '../../../svgIcons';

export default ({ classes, that }) => (
  
  <Grid item xs={12}>
    <div className={classes.bottomContent}>
      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }}>
        <List>
          {that.props.systemConfig.componentList.map((e, i) => {
            return (
              e.isValid && (
                <React.Fragment>
                  <ListItem button key={e.id} onClick={that.state.imageURL && that.props.changeVisible.bind(null, i, true)}>
                    <ListItemText
                      primary={e.componentName}
                      secondary={
                        <React.Fragment>
                          {that.props.systemConfig.sourceList.find(e1 => e1.id === e.dataSourceId).sourceName}
                          <br />
                          {e.uniqueId}
                        </React.Fragment>
                      }
                    />
                    {that.state.imageURL && e.isVisible && (
                      <ListItemSecondaryAction>
                        <IconButton disableRipple disabled>
                          <SvgIcon viewBox="0 0 32 32">
                            <g cursor="pointer" transform="translate(16,16)">
                              <circle r="16" style={{ fill: 'rgb(0, 131, 255)' }} />
                              <text textAnchor="middle" fill="white" fontSize="20px" fontFamily="arial" dy=".3em">
                                {i + 1}
                              </text>
                            </g>
                          </SvgIcon>
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                  <Divider />
                </React.Fragment>
              )
            );
          })}
        </List>
      </Drawer>
      
      <main className={classes.mainContent}>
        <Paper className={classes.configDialogPaper} elevation={0}>
          <Typography variant="h4" color="primary" gutterBottom>
            {that.state.systemName}
          </Typography>
          {that.state.imageURL && <ComponentLocator changeVisible={that.props.changeVisible} circles={that.props.systemConfig.componentList} imageURL={that.state.imageURL} />}
          {!that.state.imageURL && (
            <Dropzone onDrop={that.handleFile} accept="image/jpg,image/png,image/jpeg,image/gif,image/bmp" maxSize={5242880}>
              {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                const maxSize = 5242880;
                const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                return (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Paper className={classNames({ [classes.uploadSystemContainer]: true, [classes.uploadSystemContainerDragActive]: isDragActive && !isDragReject })} elevation={0}>
                      <SvgIcon className={classes.uploadSystemIcon} viewBox="0 0 1000.000000 1000.000000">
                        {uploadSystemIcon}
                      </SvgIcon>
                      <Typography variant="h5" gutterBottom>
                        Upload System Image
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {!isDragActive && (
                          <div>
                            Drop or Click here to upload.
                            <br />
                            Upload images of size less than 5MB and .PNG/.JPEG/.JPG format. For optimal usage, a grayscale image of 800px by 400px is recommended.
                          </div>
                        )}
                        {isDragActive && !isDragReject && 'Drop the file to upload'}
                        {isDragReject && <div style={{ color: '#d50000' }}>File type not accepted, sorry!</div>}
                        {!isDragActive && isFileTooLarge && <div style={{ color: '#d50000' }}>File was too large.</div>}
                      </Typography>
                    </Paper>
                  </div>
                );
              }}
            </Dropzone>
          )}
        </Paper>
      </main>
    </div>
  </Grid>
);

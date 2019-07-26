import React from 'react';
import { Link } from 'react-router-dom';
import { Fab, Tooltip } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from '@material-ui/icons/Add';
import { Button as CustomButton } from '../../../components';
import { smaRouteConstants } from '../route';
/**
 * Function for the actions in source layout and component in bootstrap screen
 *
 */
export default function({ classes, that, enableUpload, privilege, license }) {
  return (
    <React.Fragment>
      {(that.state.currentTab !== 2 || (that.props.systemConfig.sourceList.length < that.props.systemConfig.ipList.length && privilege && privilege.source && privilege.source.create)) && (
        <Tooltip
          title={`Add ${that.state.currentTab === 2 ? 'Data Source' : 'Component'}`}
          placement="right"
          classes={{
            tooltip: classes.tooltip,
            popper: classes.tooltipPopper,
            touch: classes.tooltipOpen,
            tooltipPlacementTop: classes.tooltipPlacementTop,
            tooltipPlacementRight: classes.tooltipPlacementRight,
            tooltipPlacementBottom: classes.tooltipPlacementBottom,
            tooltipPlacementLeft: classes.tooltipPlacementLeft,
          }}
        >
          <Fab color="primary" aria-label="Add" className={classes.fab} onClick={that.state.currentTab === 2 ? that.addSource : that.addComponent}>
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
      {enableUpload && (
        <React.Fragment>
          <label className={classes.leftAuto}>
            <CustomButton component="span" variant="flat" className={classes.leftButton} onClick={that.handleUploadConfigButton}>
              <CloudUploadIcon className={classes.uploadButton} />
              <React.Fragment>Upload Config</React.Fragment>
            </CustomButton>
            {/* <input style={{ display: 'none' }} accept=".csv" id="upload" type="file" onChange={that.handleUploadConfigButton} /> */}
          </label>
        </React.Fragment>
      )}
      <CustomButton variant="flat" onClick={that.handlePreviousClick}>
        Previous
      </CustomButton>
      <CustomButton
        disabled={
          // source
          (that.state.currentTab === 2 && that.props.systemConfig.sourceList.filter(e => e.isValid).length === 0) ||
          // component
          (that.state.currentTab === 3 && that.props.systemConfig.componentList.filter(e => e.isValid).length === 0) ||
          !(privilege && privilege.system && privilege.system.create)
        }
        className={classes.rightButton}
        onClick={that.handleNextClick}
      >
        Next
      </CustomButton>
    </React.Fragment>
  );
}

// Function for source actions and component actions for non bootstarp screen

export const SourceActionsE = function SourceActionsE({ classes, that, enableUpload, privilege }) {
  return (
    <React.Fragment>
      {(that.state.currentTab !== 2 || (that.props.systemConfig.sourceList.length < that.props.systemConfig.ipList.length && privilege && privilege.source && privilege.source.create)) && (
        <Tooltip
          title={`Add ${that.state.currentTab === 2 ? 'Data Source' : 'Component'}`}
          placement="right"
          classes={{
            tooltip: classes.tooltip,
            popper: classes.tooltipPopper,
            touch: classes.tooltipOpen,
            tooltipPlacementTop: classes.tooltipPlacementTop,
            tooltipPlacementRight: classes.tooltipPlacementRight,
            tooltipPlacementBottom: classes.tooltipPlacementBottom,
            tooltipPlacementLeft: classes.tooltipPlacementLeft,
          }}
        >
          <Fab color="primary" aria-label="Add" className={classes.fab} onClick={that.state.currentTab === 2 ? that.addSource : that.addComponent}>
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
      {enableUpload && (
        <React.Fragment>
          <label className={classes.leftAuto}>
            <CustomButton component="span" variant="flat" className={classes.leftButton} onClick={that.handleUploadConfigButton}>
              <CloudUploadIcon className={classes.uploadButton} />
              <React.Fragment>Upload Config</React.Fragment>
            </CustomButton>
            {/* <input style={{ display: 'none' }} accept=".csv" id="upload" type="file" onChange={that.handleUploadConfig} /> */}
          </label>
        </React.Fragment>
      )}
      {that.props.initialTab === 2 && (
        <CustomButton
          variant="flat"
          className={that.state.currentTab === 2 ? classes.rightButton : classes.leftButton}
          component={that.state.currentTab === 2 ? Link : undefined}
          to={that.state.currentTab === 2 && smaRouteConstants.CONFIG}
          onClick={that.state.currentTab === 3 && that.props.handleClose}
        >
          Cancel
        </CustomButton>
      )}
      {that.props.initialTab === 1 && (
        <CustomButton variant="flat" className={classes.leftButton} onClick={() => that.setState({ currentTab: 1 })}>
          Previous
        </CustomButton>
      )}
      {that.state.currentTab === 3 && (
        <CustomButton
          disabled={that.state.currentTab === 3 && that.props.systemConfig.componentList.filter(e => e.isValid).length === 0}
          className={classes.rightButton}
          onClick={that.handleNextClick}
        >
          Next
        </CustomButton>
      )}
    </React.Fragment>
  );
};

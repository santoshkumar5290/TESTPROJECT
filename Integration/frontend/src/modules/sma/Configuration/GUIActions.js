import React from 'react';
import classNames from 'classnames';
import { Button as CustomButton } from '../../../components';

export default ({ classes, that }) => (
  <React.Fragment>
    {that.state.imageURL && (
      <CustomButton variant="flat" disabled={!that.state.imageURL} className={classNames(classes.leftButton, classes.leftAuto)} onClick={that.removeFile} component="span">
        <React.Fragment>Remove Image</React.Fragment>
      </CustomButton>
    )}
    <CustomButton variant="flat" onClick={that.handleNextClick}>
      Skip GUI Setup
    </CustomButton>
    <CustomButton disabled={!that.state.imageURL || !that.props.systemConfig.componentList.filter(e => e.isValid && e.isVisible).length} className={classes.rightButton} onClick={that.handleSaveClick}>
      Save
    </CustomButton>
  </React.Fragment>
);

export const GUIActionsE = ({ classes, that }) => (
  <React.Fragment>
    {that.state.imageURL && (
      <CustomButton variant="flat" disabled={!that.state.imageURL} className={classNames(classes.leftButton, classes.leftAuto)} onClick={that.removeFile} component="span">
        <React.Fragment>Remove Image</React.Fragment>
      </CustomButton>
    )}
    <CustomButton variant="flat" onClick={that.handlePreviousClick}>
      Previous
    </CustomButton>
    <CustomButton disabled={!that.state.imageURL || !that.props.systemConfig.componentList.filter(e => e.isValid && e.isVisible).length} className={classes.rightButton} onClick={that.handleSaveClick}>
      Save
    </CustomButton>
  </React.Fragment>
);

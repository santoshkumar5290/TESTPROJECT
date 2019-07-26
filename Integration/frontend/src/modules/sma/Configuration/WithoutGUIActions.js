import React from 'react';
import classNames from 'classnames';
import { Button as CustomButton } from '../../../components';

export default ({ classes, that, enableSkip = false }) => (
  <React.Fragment>
    {enableSkip && (
      <CustomButton
        className={classNames(classes.leftButton, classes.leftAuto)}
        onClick={() => {
          that.setState({ currentTab: 4 });
        }}
        component="span"
      >
        Setup GUI View
      </CustomButton>
    )}
    <CustomButton variant="flat" className={classes.leftButton} onClick={that.handlePreviousClick}>
      Previous
    </CustomButton>
    <CustomButton
      className={classes.rightButton}
      onClick={that.handleSaveClick}
      disabled={!that.props.systemConfig.componentList.filter((_e, i) => that.props.systemConfig.visibleComponents[i]).length}
    >
      Save
    </CustomButton>
  </React.Fragment>
);

/** React */
import React from "react"

/** MUI */
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from "@material-ui/core/IconButton"
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Button from "@material-ui/core/Button"
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import ClearIcon from '@material-ui/icons/Clear'
import EditIcon from '@material-ui/icons/BorderColor'
import Search from '@material-ui/icons/Search'
import GetApp from '@material-ui/icons/GetApp'

/**Local */
import styles from "../styles"
import muiTheme from "../../../../theme"

/**
  * facilirt table subheader
  *
*/
const TableHeaderFilters = ({
  toggleColumnEditorModal,
  localizationSet,
  subheader,
  selectedDropDown,
  handleSubHeaderDropDown,
  handleSearch,
  isSearchClick,
  handleTextSearch,
  handleButtonClick,
  selectedRow,
  handleClearIcon,
  handleDownloadIcon,
  classes,
  localize
}) => {
  let flag = false;
  const actionIconColor = muiTheme.palette.iconColor;
  const getSubheader = subheader.map((items, index) => {
    if (items.isVisible) {
      switch (items.type) {
        case "icon":
          if (items.icon == "edit") {
            flag = true;
            return (
              <div key={index} className={classes.subHeaderRightCol}>


                <Tooltip
                  disableFocusListener
                  enterDelay={100}
                  id="tooltipControlled"
                  leaveDelay={100}
                  placement="top"
                  title={localize('EDIT_FIELDS')}
                  classes={{
                    'tooltip': classes.tooltip,
                    'popper': classes.tooltipPopper,
                    'open': classes.tooltipOpen,
                    'tooltipPlacementTop': classes.tooltipPlacementTop,
                    'tooltipPlacementRight': classes.tooltipPlacementRight,
                    'tooltipPlacementBottom': classes.tooltipPlacementBottom,
                    'tooltipPlacementLeft': classes.tooltipPlacementLeft
                  }}
                >

                  <IconButton                    
                    onClick={toggleColumnEditorModal}
                    className={classes.editIcon}
                  >
                    <EditIcon />
                  </IconButton>

                </Tooltip>
              </div>
            );
          }
          if (items.icon == "search") {
            flag = true;
            return (
              <div key={index} className={classes.subHeaderRightCol}>
                {isSearchClick ?
                  <FormControl >
                    <Input
                      id="adornment-search"
                      onChange={(e) => handleTextSearch(e)}
                      placeholder={localize('SEARCHTABLE')}
                      autoFocus={true}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton className={classes.clearIcon} onClick={handleClearIcon} >
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl> :
                  <Tooltip
                    disableFocusListener
                    enterDelay={100}
                    id="tooltipControlled"
                    leaveDelay={100}
                    placement="top"
                    title={localize('SEARCHTABLE')}
                    classes={{
                      'tooltip': classes.tooltip,
                      'popper': classes.tooltipPopper,
                      'open': classes.tooltipOpen,
                      'tooltipPlacementTop': classes.tooltipPlacementTop,
                      'tooltipPlacementRight': classes.tooltipPlacementRight,
                      'tooltipPlacementBottom': classes.tooltipPlacementBottom,
                      'tooltipPlacementLeft': classes.tooltipPlacementLeft
                    }}
                  >
                    <IconButton
                      className={classes.searchIcon}
                      onClick={(e) => handleSearch(e, true)} >
                      <Search color={actionIconColor} />
                    </IconButton>
                  </Tooltip>
                }
              </div>
            );
          }
          if (items.icon == "download") {
            flag = true;
            return (
              <div key={index} className={classes.subHeaderRightCol}>


                <Tooltip
                  disableFocusListener
                  enterDelay={100}
                  id="tooltipControlled"
                  leaveDelay={100}
                  placement="top"
                  title={localize('DOWNLOAD')}
                  classes={{
                    'tooltip': classes.tooltip,
                    'popper': classes.tooltipPopper,
                    'open': classes.tooltipOpen,
                    'tooltipPlacementTop': classes.tooltipPlacementTop,
                    'tooltipPlacementRight': classes.tooltipPlacementRight,
                    'tooltipPlacementBottom': classes.tooltipPlacementBottom,
                    'tooltipPlacementLeft': classes.tooltipPlacementLeft
                  }}
                >

                  <IconButton onClick={handleDownloadIcon} className={classes.downloadIcon}>
                    <GetApp />
                  </IconButton>

                </Tooltip>
              </div>
            );
          }
        case "dropdown":
          flag = true;
          const subheaderfilterlist = items.filter.map((conf, key) => {
            return <MenuItem value={conf.name} key={"dropdown" + key}>{conf.name}</MenuItem>;
          });
          return (
            <div key={index} className={classes.subHeaderRightCol}>
              <FormControl className={classes.dropBox}>
                <Select
                  value={selectedDropDown}
                  className={classes.selectedDropDown}
                  onChange={(e) => handleSubHeaderDropDown(e)}
                >
                  {subheaderfilterlist}
                </Select>
              </FormControl>
            </div>
          );
        case "button":
          var buttonClass = '';
          if (selectedRow.length > 0) {
            flag = true;
            if (items.value === 'DOWNLOAD')
              buttonClass = classes.raisedButton
            if (items.value === 'CANCEL')
              buttonClass = classes.flatButton
            return (

              <Button key={index} onClick={() => handleButtonClick(items.value)} className={buttonClass} color="primary">
                {localize(items.value)}
              </Button>

            );
          }
          else {
            return
          }
      }
    }
  });

  if (flag) {
    return (
      <div className={classes.subHeaderRight}>
        {getSubheader}
      </div>);
  } else {
    return <div />;
  }
};

export default withStyles(styles, { withTheme: true })(TableHeaderFilters);
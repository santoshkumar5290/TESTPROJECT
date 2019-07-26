/**React */
import React from "react"
import PropTypes from "prop-types"

/**MUI */
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import SvgIcon from '@material-ui/core/SvgIcon'
import LightbulbOutline from "@material-ui/icons/LightbulbOutline"

/**Local */
import TableHeaderFilters from "./TableHeaderFilters"
import { lightBulbIcon } from './../../../../svgIcons'
import styles from "../styles"


class TableHeader extends React.Component {

  static propTypes = {
    localizationSet: "widgets",
    toggleColumnEditorModal: PropTypes.func.isRequired,
    localizationSet: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedTab: {},
      values: [],
      selectedDropDown: 0,
      initialCall: true,
      isSearchClick: false,
    };
  }

  handleSubHeaderDropDown = (event) => {
    this.setState({ selectedDropDown: event.target.value });
  };

  /**
   * handler
   * @param {obj} selected tab.
   * This function is used to call its parent function for update rows and columns.
   */
  handleTabChange = (event, value) => {
    this.setState({
      selectedTab: value,
      isSearchClick: false
    });
    for (let i = 0; i < this.props.tabs.length; i++) {
      if (value == this.props.tabs[i].label) {
        this.props.handleTableRows(this.props.tabs[i].url);
        this.props.handleColumns(this.props.tabs[i].index, this.props.tabs[i].url);
        this.props.handleTextSearch("");
        this.handleButtonClick(this.props.localize('CANCEL'));
        break;
      }
    }
  };

  /** @ignore */
  componentWillReceiveProps(nextProps) {
    if (this.state.initialCall && nextProps.tabs.length > 0) {
      for (let i = 0; i < nextProps.tabs.length; i++) {
        if (nextProps.tabs[i].isVisible) {
          this.props.handleColumns(nextProps.tabs[i].index, nextProps.tabs[i].url);
          this.props.handleTableRows(nextProps.tabs[i].url);
          this.setState({
            initialCall: false,
            selectedTab: nextProps.tabs[i].label
          });
          break;
        }
      }
    }
  }

  /** @private */
  createTabs = () => {
    const { classes } = this.props;

    return this.props.tabs.map((conf, key) => {
      if (conf.isVisible) {
        let value = {
          value: conf.label,
          url: conf.url,
          index: conf.index
        }
        return (
          <Tab
            label={conf.label}
            key={key}
            value={conf.label}
            className={classes.tableHeaderTabberTab}
          />
        );
      }
    });
  };

  handleSearch = (e, clicked) => {
    this.setState({ isSearchClick: clicked });
  }

  handleTextSearch = (e) => {
    this.props.handleTextSearch(e.target.value);
  }

  handleClearIcon = () => {
    this.setState({ isSearchClick: false });
    this.props.handleTextSearch("");
  }

  handleButtonClick = (button_data) => {
    this.props.handleButtonClick(button_data);
  }

  render() {
    var tabBarVisible = 0, visibleTab = 0;
    if (this.props.tabs.length > 0) {
      for (let i = 0; i < this.props.tabs.length; i++) {
        if (this.props.tabs[i].isVisible) {
          tabBarVisible += 1;
          visibleTab = i
        }
      }
    }
    const { selectedTab } = this.state;
    const { classes, theme, localize } = this.props
    return (
      <div className={classes.tableHeader}>
        {tabBarVisible == 1 && (
          <AppBar position="static" color="default" className={classes.tableHeaderPaper}>
            <div className={classes.tableHeaderToolbar}>
              <div className={classes.tableHeaderLeft}>

                <Typography variant="title" color="inherit" >
                  {this.props.tabs[visibleTab].label}
                </Typography>

                {this.props.tipVisible && this.props.tip.isVisible && this.props.selectedRow.length === 0 ?
                  <div className={classes.messageBox}>
                    <IconButton className={classes.lightBulbIcon} color="inherit" aria-label="Menu">
                      <SvgIcon viewBox="0 0 1000.000000 1000.000000">
                        {lightBulbIcon}
                      </SvgIcon>
                    </IconButton>
                    <Typography>
                      {this.props.tip.label}
                    </Typography>
                  </div> : null
                }

                {this.props.selectedRow.length > 0 ?
                  <Typography variant="title" color="inherit">
                    {this.props.selectedRow.length + " " + localize('SELECTED')}
                  </Typography> : null
                }
              </div>
              <div className={classes.tableHeaderRight}>
                {this.props.subheader.length > 0 && (
                  <TableHeaderFilters
                    toggleColumnEditorModal={this.props.toggleColumnEditorModal}
                    localizationSet={this.props.localizationSet}
                    subheader={this.props.subheader}
                    handleSubHeaderDropDown={this.handleSubHeaderDropDown}
                    selectedDropDown={this.state.selectedDropDown}
                    handleSearch={this.handleSearch}
                    isSearchClick={this.state.isSearchClick}
                    handleTextSearch={this.handleTextSearch}
                    handleButtonClick={this.handleButtonClick}
                    selectedRow={this.props.selectedRow}
                    handleClearIcon={this.handleClearIcon}
                    handleDownloadIcon={this.props.handleDownloadIcon}
                    localize={localize} />
                )}
              </div>
            </div>
          </AppBar>
        )}

        {tabBarVisible > 1 && (
          <AppBar position="static" color="default" className={classes.tableHeaderPaper}>
            <div className={classes.tableHeaderToolbar}>
              <div className={classes.tableHeaderRight}>
                <Tabs
                  value={selectedTab}
                  onChange={this.handleTabChange}
                  className={classes.tableHeaderTabs}
                  textColor={theme.palette.primary2Color}
                  fullWidth="true"
                >
                  {this.createTabs()}
                </Tabs>

                {this.props.tip.isVisible ?
                  <Typography>
                    <IconButton color="inherit" aria-label="Menu">
                      <LightbulbOutline />
                    </IconButton>
                    {this.props.tip.label}
                  </Typography> : null
                }

              </div>
              <div className={classes.tableHeaderRight}>
                {this.props.subheader.length > 0 && (
                  <TableHeaderFilters
                    toggleColumnEditorModal={this.props.toggleColumnEditorModal}
                    localizationSet={this.props.localizationSet}
                    subheader={this.props.subheader}
                    handleSubHeaderDropDown={this.handleSubHeaderDropDown}
                    selectedDropDown={this.state.selectedDropDown}
                    handleSearch={this.handleSearch}
                    isSearchClick={this.state.isSearchClick}
                    handleTextSearch={this.handleTextSearch}
                    handleButtonClick={this.handleButtonClick}
                    selectedRow={this.props.selectedRow}
                    handleClearIcon={this.handleClearIcon}
                    handleDownloadIcon={this.handleDownloadIcon}
                    localize={localize} />
                )}
              </div>
            </div>
          </AppBar>
        )}


      </div>
    );
  }
}


export default withStyles(styles, { withTheme: true })(TableHeader);
/* eslint-disable import/no-cycle */
/** React */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
// import html2canvas from 'html2canvas';
// import $ from 'jquery';

/** MUI */
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import Home from '@material-ui/icons/Home';
import AboutInfoIcon from '@material-ui/icons/Info';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import DownloadLogsIcon from '@material-ui/icons/GetApp';

/** Local */
import styles from './styles';
import { sickLogo, systemSettingIcon, eventLogIcon } from '../../../svgIcons';
import { smaRouteConstants } from '../../sma/route';
import { AboutusRouteConstants } from 'platform/Aboutus';
import { logTableRouteConstants } from 'platform/DownloadLogs';
import { embedI18n } from '../../../services/I18nl10n';

/**
 * Component to display left navigation options in the template. Contains the links to react router navigation.
 */
export class NavBar extends React.Component {
  static defaultProps = {
    location: {},
    navbarExpanded: true,
    onToggle: () => {},
  };

  /** @ignore */
  constructor(props, context) {
    super(props, context);
    this.state = {
      // localized: localization.isMessageSetAvailable(COMMON_LOCALIZATION_SET),
      data: '',
    };
  }

  // componentWillMount = () => {
  //   this.props.onToggle(null, this.state.navbarExpanded)
  //   this.setState({
  //     localized: true
  //   })
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.privilege)
  // }

  // handleSearch =()=>{
  //   this.props.history.replace(searchRouteConstants.Search)
  // }

  // handleCallBack = () => {
  //   this.setState({data:$("#myList").innerHTML})
  //   this.setState({ data: true });
  // };

  // handleScreenshot = () => {
  //   var _this = this;
  //   var dom = $('#tablePaper');
  //   var clonnedDom = dom.clone();
  //   document.getElementById('myList').appendChild(clonnedDom[0]);
  //   var mySvg = $('#myList').find('svg');
  //   var len = mySvg.length;

  //   mySvg.map(function(index, value) {
  //     var svg = $(this);
  //     let computedStyle = window.getComputedStyle(svg[0]);
  //     var s = new XMLSerializer().serializeToString(svg[0]);
  //     var encodedData = window.btoa(s);
  //     var img = document.createElement('IMG');
  //     img.src = `data:image/svg+xml;base64,${encodedData}`;

  //     var canvas = document.querySelector('canvas');
  //     var ctx = canvas.getContext('2d');
  //     img.onload = function() {
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //       ctx.fillStyle = computedStyle.color;
  //       ctx.drawImage(img, 0, 0);
  //       var newImage = new Image();
  //       newImage.src = canvas.toDataURL();
  //       newImage.style = computedStyle;
  //       try {
  //         var classes = svg.attr('class').toString();
  //       } catch (e) {}
  //       newImage.className = classes;
  //       svg.replaceWith(newImage);
  //       if (len - 1 == index) {
  //         _this.handleCallBack();
  //       }
  //     };
  //   });
  // };

  handleClose = () => {
    this.setState({ data: null });
  };

  handleSaveClick = () => {
    // html2canvas(document.getElementById('YYYY')).then(canvas => {
    //   var a = document.createElement('a');
    //   a.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
    //   a.download = 'somefilename.jpg';
    //   a.click();
    // });
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { classes, theme, open, privilege, licenseInfo, localize, isMapUserHome } = this.props;
    const { data, visible } = this.state;
    const item1 = [
      {
        name: localize('DASHBOARD'),
        icon: Home,
        isVisible: true,
        link: smaRouteConstants.SMA,
      },
      {
        name: localize('CONFIGURATION'),
        icon: () => <SvgIcon viewBox="0 320 1000 320"> {systemSettingIcon}</SvgIcon>,
        isVisible: true,
        link: smaRouteConstants.CONFIG,
      },
      {
        name: localize('EVENT LOG'),
        icon: () => <SvgIcon viewBox="0 320 1000 320">{eventLogIcon} </SvgIcon>,
        isVisible: true,
        link: smaRouteConstants.EVENTLOG,
      },
      {
        name: localize('DOWNLOAD_LOGS'),
        isVisible: true || (privilege.logs && privilege.logs.list && licenseInfo.valid && !licenseInfo.expired && licenseInfo.features && licenseInfo.features.DOWNLOAD_LOGS),
        icon: DownloadLogsIcon,
        link: logTableRouteConstants.DOWNLOADLOGFILES,
      },
      {
        name: localize('ABOUT_INFO'),
        icon: AboutInfoIcon,
        isVisible: true,
        link: AboutusRouteConstants.Aboutus,
      },
    ];

    let navListItems = item1.map(conf => {
      const MenuIconTop = conf.icon;
      if (conf.isVisible && conf.link) {
        return (
          <ListItem key={conf.name} className={classes.navListItem} button component={Link} to={conf.link}>
            <ListItemIcon className={classes.navListItemIcon}>{<MenuIconTop />}</ListItemIcon>
            <ListItemText className={classes.navListItemText} primary={conf.name} />
          </ListItem>
        );
      }
      if (conf.isVisible && conf.onClick) {
        return (
          <ListItem key={conf.name} onClick={conf.onClick} className={classes.navListItem} button>
            <ListItemIcon className={classes.navListItemIcon}>{<MenuIconTop />}</ListItemIcon>
            <ListItemText className={classes.navListItemText} primary={conf.name} />
          </ListItem>
        );
      }
      return null;
    });

    navListItems = item1
      .filter(e => e.isVisible)
      .map(conf => {
        const MenuIconTop = conf.icon;
        return conf.expandComponent ? (
          <ListItem
            // className={classes.navListItem}
            className={visible === 0 ? classNames(classes.expandedItem, classes.navListItem) : classes.navListItem}
            button
            component={Link}
            to={conf.link}
            key={conf.name}
            /* onClick={()=>{}} */
          >
            <ListItemIcon className={classes.navListItemIcon}>
              <MenuIconTop />
            </ListItemIcon>
            <ListItemText className={classes.navListItemText} primary={conf.name} />
          </ListItem>
        ) : (
          <ListItem key={conf.name} className={classes.navListItem} button component={Link} to={conf.link} onClick={conf.onClick}>
            <ListItemIcon className={classes.navListItemIcon}>
              <MenuIconTop />
            </ListItemIcon>
            <ListItemText className={classes.navListItemText} primary={conf.name} />
          </ListItem>
        );
      });

    navListItems = item1
      .filter(e => e.isVisible)
      .map(conf => {
        const MenuIconTop = conf.icon;
        return conf.expandComponent ? (
          <ListItem
            // className={classes.navListItem}
            className={visible === 0 ? classNames(classes.expandedItem, classes.navListItem) : classes.navListItem}
            button
            component={Link}
            to={conf.link}
            key={conf.name}
            /* onClick={()=>{}} */
          >
            <ListItemIcon className={classes.navListItemIcon}>
              <MenuIconTop />
            </ListItemIcon>
            <ListItemText className={classes.navListItemText} primary={conf.name} />
          </ListItem>
        ) : (
          <ListItem key={conf.name} className={classes.navListItem} button component={Link} to={conf.link} onClick={conf.onClick}>
            <ListItemIcon className={classes.navListItemIcon}>
              <MenuIconTop />
            </ListItemIcon>
            <ListItemText className={classes.navListItemText} primary={conf.name} />
          </ListItem>
        );
      });

    return (
      <Drawer variant="permanent" className={classes.drawerWrapper} classes={{ paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose) }} open={open}>
        <Dialog open={!!data} onClose={this.handleClose} classes={{ paper: classes.modalDialogPaper }} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogContent className={classes.modalDialogBody}>
            <Button className={classes.closeIconButton} onClick={this.handleClose}>
              <ClearIcon className={classes.closeIcon} />
            </Button>
            <div className={classes.screenShotImageBox}>
              <div className={classes.screenShotImage} dangerouslySetInnerHTML={{ __html: data }} />
            </div>
          </DialogContent>

          <DialogActions className={classes.modalDialogFooter}>
            <Button onClick={this.handleSaveClick} className={classes.raisedButton}>
              {localize('SAVE')}
            </Button>
            <Button onClick={this.handleClose} className={classes.flatButton}>
              {localize('Cancel')}
            </Button>
          </DialogActions>
        </Dialog>

        <div className={classes.drawerContent}>
          <div color="inherit" className={classes.sickLogo}>
            <Link to={smaRouteConstants.SMA} style={{ color: 'white' }}>
              <SvgIcon viewBox="0 0 1000 320">{sickLogo}</SvgIcon>
            </Link>
          </div>

          {/* <div className={classes.searchBarContainer}>
        privilege.search&&privilege.search.show &&licenseInfo.valid && !licenseInfo.expired &&
          <div className={classes.searchBar}>
            <div className={classes.searchBarCol}>
              <IconButton className={classes.searchIcon} tooltipPosition="bottom-left" onClick={this.handleSearch}>
                <Search />
              </IconButton>
            </div>
            <div className={classes.searchBarCol}>
              <FormControl className={classes.searchForm}>
                <Typography className={classes.searchLabel} onClick={this.handleSearch}>
                  Enterprise search...
                </Typography>
              </FormControl>
            </div>
          </div>
        </div>
        */}
          <Divider />

          <div className={classes.navList}>{navListItems}</div>

          <Divider />

          {/* functionality not implemented */}

          {/* <div className={classes.navList}>
          {otherNavListItems}
        </div> */}
        </div>
      </Drawer>
    );
  }
}

const mapStateToProps = state => {
  return {
    privilege: state.privileges.values,
    licenseInfo: state.licenseReducer.licenseInfo,
    messages: state.i18nl10n.messages,
  };
};

export default connect(mapStateToProps)(embedI18n(withStyles(styles, { withTheme: true })(NavBar)));

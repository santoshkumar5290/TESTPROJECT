/** React */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import Home from '@material-ui/icons/Home';
import AboutInfoIcon from '@material-ui/icons/Info';
import DownloadLogsIcon from '@material-ui/icons/GetApp';

import { AboutusRouteConstants } from 'platform/Aboutus/route';
import { logTableRouteConstants } from 'platform/DownloadLogs/route';
import { smaRouteConstants } from './modules/sma/route';
import { systemSettingIcon, eventLogIcon } from './svgIcons';
/**
 * Component to display left navigation options in the template. Contains the links to react router navigation.
 */
export default {
  appName: 'SMA',
  navList: [
    {
      name: 'DASHBOARD',
      icon: Home,
      isVisible: true,
      link: smaRouteConstants.SMA,
    },
    {
      name: 'CONFIGURATION',
      icon: () => <SvgIcon viewBox="0 320 1000 320"> {systemSettingIcon}</SvgIcon>,
      isVisible: true,
      link: smaRouteConstants.CONFIG,
    },
    {
      name: 'EVENT LOG',
      icon: () => <SvgIcon viewBox="0 320 1000 320">{eventLogIcon} </SvgIcon>,
      isVisible: true,
      link: smaRouteConstants.EVENTLOG,
    },
    {
      name: 'DOWNLOAD_LOGS',
      isVisible: false,
      icon: DownloadLogsIcon,
      link: logTableRouteConstants.DOWNLOADLOGFILES,
    },
    {
      name: 'ABOUT_INFO',
      icon: AboutInfoIcon,
      isVisible: true,
      link: AboutusRouteConstants.Aboutus,
    },
  ],
};

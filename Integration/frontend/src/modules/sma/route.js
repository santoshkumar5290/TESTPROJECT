import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { DashboardLayout, BootstrapLayout } from 'platform/layouts';
import { routeConstants } from 'platform/auth/route';
import Configuration from './Configuration/configurationScreen';
import ConfigureContainer from './configureSystem/configureContainer';

const MachineContainer = lazy(() => import('./MachineWidget'));
const SystemConfig = lazy(() => import('./Configuration/SystemConfig'));
const Search = lazy(() => import('./Event Log'));

export const smaRouteConstants = {
  SMA: '/sma',
  SYSCONFIG: '/systemConfig',
  CONFIG: '/configuration',
  CONFIGSYSTEM: '/configureSystem',
  CONFIGSOURCE: '/configureSource',
  ADDSYSTEM: '/addSystem',
  EVENTLOG: '/eventLog',
};

export const smaRouteConfig = [
  {
    path: smaRouteConstants.SMA,
    component: DashboardLayout,
    indexRoute: { component: ({ userLogged, ...rest }) => (userLogged ? <MachineContainer {...rest} /> : <Redirect to={routeConstants.LOGIN} />) },
  },
  {
    path: smaRouteConstants.SYSCONFIG,
    component: BootstrapLayout,
    indexRoute: { component: ({ userLogged, ...rest }) => (userLogged ? <SystemConfig {...rest} /> : <Redirect to={routeConstants.LOGIN} />) },
  },
  {
    path: smaRouteConstants.CONFIGSOURCE,
    component: DashboardLayout,
    indexRoute: { component: ({ userLogged, ...rest }) => (userLogged ? <SystemConfig {...rest} type="normal" initialTab={2} /> : <Redirect to={routeConstants.LOGIN} />) },
  },
  {
    path: smaRouteConstants.ADDSYSTEM,
    component: DashboardLayout,
    indexRoute: { component: ({ userLogged, ...rest }) => (userLogged ? <SystemConfig {...rest} type="normal" initialTab={1} /> : <Redirect to={routeConstants.LOGIN} />) },
  },
  {
    path: smaRouteConstants.CONFIG,
    component: DashboardLayout,
    indexRoute: { component: ({ userLogged, ...rest }) => (userLogged ? <ConfigureContainer {...rest} /> : <Redirect to={routeConstants.LOGIN} />) },
  },
  {
    path: smaRouteConstants.CONFIGSYSTEM,
    component: DashboardLayout,
    indexRoute: { component: ({ userLogged, ...rest }) => (userLogged ? <Configuration {...rest} /> : <Redirect to={routeConstants.LOGIN} />) },
  },
  {
    path: smaRouteConstants.EVENTLOG,
    component: DashboardLayout,
    indexRoute: { component: ({ userLogged, ...rest }) => (userLogged ? <Search {...rest} /> : <Redirect to={routeConstants.LOGIN} />) },
  },
];

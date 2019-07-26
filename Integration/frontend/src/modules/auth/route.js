import { AuthLayout, DashboardLayout, PlatformLayout } from '../../layouts';
import Login from './login/components';
import Profile from './profileManagement/components';
import { Role } from './roleManagement/components';
import { Group } from './groupManagement/components';
import { User } from './userManagement/components';
import Logout from './logout/components';
import { Help, Privacy, Terms } from './policy/components';

export const routeConstants = {
  LOGIN: '/login',
  PROFILE_MANAGEMENT: '/profileManagement',
  ROLE_MANAGEMENT: '/roleManagement',
  GROUP_MANAGEMENT: '/groupManagement',
  USER_MANAGEMENT: '/userManagement',
  LOGGED_OUT: '/logout',
  HELP: '/help',
  PRIVACY: '/privacy',
  TERMS: '/terms',
};

const routeConfig = [
  {
    path: routeConstants.LOGIN,
    component: AuthLayout,
    indexRoute: { component: Login },
  },
  {
    path: routeConstants.PROFILE_MANAGEMENT,
    component: DashboardLayout,
    indexRoute: { component: Profile },
  },
  {
    path: routeConstants.ROLE_MANAGEMENT,
    component: DashboardLayout,
    indexRoute: { component: Role },
  },
  {
    path: routeConstants.GROUP_MANAGEMENT,
    component: DashboardLayout,
    indexRoute: { component: Group },
  },
  {
    path: routeConstants.USER_MANAGEMENT,
    component: DashboardLayout,
    indexRoute: { component: User },
  },
  {
    path: routeConstants.LOGGED_OUT,
    component: AuthLayout,
    indexRoute: { component: Logout },
  },
  {
    path: routeConstants.HELP,
    component: AuthLayout,
    indexRoute: { component: Help },
  },
  {
    path: routeConstants.PRIVACY,
    component: AuthLayout,
    indexRoute: { component: Privacy },
  },
  {
    path: routeConstants.TERMS,
    component: AuthLayout,
    indexRoute: { component: Terms },
  },
];

export default routeConfig;

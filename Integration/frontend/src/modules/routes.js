import React from 'react';
import { Redirect } from 'react-router-dom';
import routeConfig from 'platform/auth/route';
import { AboutusRouteConfig } from 'platform/AboutUs/route';
import { LogTableRouteConfig } from 'platform/DownloadLogs/route';
import { settingRouteConfig } from 'platform/userAndGlobalPreference/route';
import { licenseRouteConfig } from 'platform/License/route';
import { smaRouteConfig } from './sma/route';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const APPLICATION_INDEX_ROUTE = '/';

export const createRoutes = store => {
  const EmptyLayout = ({ children }) => <div>{children}</div>;
  const RedirectComponent = props => <Redirect to="/login" />;

  // This route is for redirecting '/' to '/facility'
  let routes = [{ path: APPLICATION_INDEX_ROUTE, component: EmptyLayout, indexRoute: { component: RedirectComponent } }];

  // Concatinating all routes
  routes = routes.concat(routeConfig, AboutusRouteConfig, LogTableRouteConfig, smaRouteConfig, settingRouteConfig, licenseRouteConfig);

  return routes;
};

export default createRoutes;

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

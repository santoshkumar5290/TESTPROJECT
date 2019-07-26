import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { setPlatformAuthenticationURL, setSuccesUrl } from 'platform';
import { setNavbarList } from 'platform/globalComponents/NavBar/navbarListProvider';
import AppRootWithStyles from './app';
import { setRestBaseURL, setAuthenticationURL, setBasesocketUrl } from './services/httpRequest';
import createStore from './store/createStore';
import navBarList from './setNavbar';

// ========================================================
// Store Instantiation
// ========================================================
/**
 * As Redux cannot work with multiple stores and Widget repo already has a redux store, we
 * are using the widget repo store to add template's reducers. This is a temporary work-around
 * and long term solution is discussed with product owner and needs to be prioritized
 */

const store = createStore();
// To unsubscribe, invoke `store.unsubscribeHistory()` anytime

// store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const routes = require('./modules/routes').default(store);
  ReactDOM.render(<AppRootWithStyles store={store} routes={routes} />, MOUNT_NODE);
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = error => {
      const RedBox = require('redbox-react').default;
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./modules/routes', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  }
}

// ========================================================
// Go!
// ========================================================

/* eslint-disable */
let url = window.location.origin;
let authUrl = window.location.origin;
let socketUrl = window.location.host;

socketUrl = '10.72.15.138:5084';
url = `http://${socketUrl}`;
authUrl = `http://${socketUrl}`;

setRestBaseURL(url);
setBasesocketUrl(socketUrl);
setAuthenticationURL(authUrl);

/** don't remove or comment below code(related to platform) */
setPlatformAuthenticationURL(authUrl);
setSuccesUrl('/sma');
setNavbarList(navBarList);
/** platform related functiona ends here */

// const loadedStates = ['complete', 'loaded', 'interactive'];

// if (loadedStates.includes(document.readyState) && document.body) {
//   run();
// } else {
//   window.addEventListener('DOMContentLoaded', run, false);
// }
$(document).ready(function() {
  render();
});

export default store;

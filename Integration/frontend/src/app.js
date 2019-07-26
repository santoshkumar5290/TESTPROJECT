/** React */
import React, { Suspense, PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Normalize from 'normalize.jss';
import { JssProvider, SheetsRegistry, jss } from 'react-jss';
import 'typeface-roboto';
import { hot } from 'react-hot-loader/root';

/** MUI */
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

/** Local */
import I18n from './services/I18nl10n';
import { SnackbarNotification, SnackbarNotification2, Loader, InactivityControl, ForcedLogout, WindowListener } from './modules/globalComponents';
import myTheme from './theme';

const sheet = jss.createStyleSheet({ '@global': Normalize });
sheet.attach();
const muiTheme = createMuiTheme(myTheme);

const styles = () => ({
  '@global': {
    html: myTheme.typography.html,
    body: myTheme.typography.body,
    a: myTheme.typography.a,
    h1: myTheme.typography.h1,
    h2: myTheme.typography.h2,
    h3: myTheme.typography.h3,
    h4: myTheme.typography.h4,
    h5: myTheme.typography.h5,
    h6: myTheme.typography.h6,
    button: myTheme.typography.button,

    '@media (min-width:600px)': {
      body: myTheme.typographySM.body,
      h1: myTheme.typographySM.h1,
      h2: myTheme.typographySM.h2,
      h3: myTheme.typographySM.h3,
      h4: myTheme.typographySM.h4,
      h5: myTheme.typographySM.h5,
      h6: myTheme.typographySM.h6,
      button: myTheme.typographySM.button,
    },

    '@media (min-width:960px)': {
      body: myTheme.typographyMD.body,
      h1: myTheme.typographyMD.h1,
      h2: myTheme.typographyMD.h2,
      h3: myTheme.typographyMD.h3,
      h4: myTheme.typographyMD.h4,
      h5: myTheme.typographyMD.h5,
      h6: myTheme.typographyMD.h6,
      button: myTheme.typographyMD.button,
    },

    '@media (min-width:1280px)': {
      body: myTheme.typographyLG.body,
      h1: myTheme.typographyLG.h1,
      h2: myTheme.typographyLG.h2,
      h3: myTheme.typographyLG.h3,
      h4: myTheme.typographyLG.h4,
      h5: myTheme.typographyLG.h5,
      h6: myTheme.typographyLG.h6,
      button: myTheme.typographyLG.button,
    },

    '@media (min-width:1920px)': {
      body: myTheme.typographyXL.body,
      h1: myTheme.typographyXL.h1,
      h2: myTheme.typographyXL.h2,
      h3: myTheme.typographyXL.h3,
      h4: myTheme.typographyXL.h4,
      h5: myTheme.typographyXL.h5,
      h6: myTheme.typographyXL.h6,
      button: myTheme.typographyXL.button,
    },

    '@media screen and ( max-height: 639px )': {
      body: myTheme.typographyMD.body,
      h1: myTheme.typographyMD.h1,
      h2: myTheme.typographyMD.h2,
      h3: myTheme.typographyMD.h3,
      h4: myTheme.typographyMD.h4,
      h5: myTheme.typographyMD.h5,
      h6: myTheme.typographyMD.h6,
      button: myTheme.typographyMD.button,
    },

    '@media screen and ( max-height: 589px )': {
      body: myTheme.typographySM.body,
      h1: myTheme.typographySM.h1,
      h2: myTheme.typographySM.h2,
      h3: myTheme.typographySM.h3,
      h4: myTheme.typographySM.h4,
      h5: myTheme.typographySM.h5,
      h6: myTheme.typographySM.h6,
      button: myTheme.typographySM.button,
    },
  },
});

const withJSSProvider = Component => props => (
  <JssProvider registry={new SheetsRegistry()} jss={jss}>
    <Component {...props} />
  </JssProvider>
);

class App extends PureComponent {
  // Using react-router v4
  render() {
    const { store, routes } = this.props;
    // can be used for hiding errors
    //  window.console = { log: () => { }, warn: () => { }, error: () => { } }
    return (
      <MuiThemeProvider theme={muiTheme}>
        <Provider store={store}>
          <I18n userPreference>
            <Router>
              <React.Fragment>
                <Switch>
                  {routes.map(option => (
                    <Route
                      key={option.path}
                      exact
                      path={option.path}
                      render={props => (
                        <option.component {...props}>
                          <Suspense fallback={<div>Loading ...</div>}>
                            <option.indexRoute.component {...props} userLogged={store.getState().authentication.loggedIn} />
                          </Suspense>
                        </option.component>
                      )}
                    />
                  ))}
                </Switch>
                <SnackbarNotification />
                <SnackbarNotification2 />
                <Loader />
                <InactivityControl />
                <ForcedLogout />
                <WindowListener />
              </React.Fragment>
            </Router>
          </I18n>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
const AppRootWithStyles = withStyles(styles)(withJSSProvider(hot(App)));

export default AppRootWithStyles;

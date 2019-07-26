/** React */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { platformReducer } from 'platform'

/** Local */
import snackbar from '../services/snackbar'
import breadcrumb from '../services/breadcrumb'
import { reducers as smaReducer } from '../modules/sma'
// import {reducers as platformReducer } from '../modules/platform'
import appCache from '../services/userSettings'
import userPreference from '../services/userPreference'
import privileges from '../services/privileges'
import loader from '../services/loader'
import appSettings from '../services/appSettings'
import { i18nReducer as i18nl10n } from '../services/I18nl10n'

export const makeRootReducer = asyncReducers => {
  return combineReducers({
    // ...authReducer,
    ...platformReducer,
    ...smaReducer,
    appSettings,
    appCache,
    snackbar,
    breadcrumb,
    loader,
    userPreference,
    privileges,
    i18nl10n,
    ...asyncReducers,
    routing: routerReducer
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

import { shallow, mount, render } from 'enzyme'
import {createMuiTheme} from '@material-ui/core/styles'
import SICKMuiTheme from '../theme'
import React from 'react'
import PropTypes from 'prop-types'

const options = {context: {muiTheme: createMuiTheme(SICKMuiTheme)}, childContextTypes: {muiTheme: PropTypes.object}}

export const mountWithContext = (component) => mount(component, options)

export const shallowWithContext = (component) => shallow(component, options)

export const renderWithContext = (component) => render(component, options)

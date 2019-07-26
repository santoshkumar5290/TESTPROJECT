/** React */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { styles } from './styles'
import { withStyles } from '@material-ui/core/styles'



function PlatformLayout({ classes, children }) {
    return <div className={classes.platformLayout}>{children}</div>
}

export default withStyles(styles)(PlatformLayout)




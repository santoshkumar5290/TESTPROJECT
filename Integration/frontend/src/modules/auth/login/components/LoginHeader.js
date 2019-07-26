/** React */
import React from 'react'
var createReactClass = require('create-react-class')

/** MUI */
import { withStyles } from '@material-ui/core/styles'

/** Local */
import styles from '../styles'

const LoginHeader = createReactClass({

  render: function () {
    const { classes } = this.props
    return (
      <div className={classes.modalHeader} >
        <div>{this.props.children}</div>
      </div>)
  }
})

export default withStyles(styles)(LoginHeader)

/** React */
import React from 'react'

/** MUI */
import { withStyles } from '@material-ui/core/styles'

/** Local */
import styles from '../styles'

const LoginHeader = ({ classes }) => (
  <div className={classes.modalHeader}>
      <h2>Thanks for using SICK Analytics Enterprise.</h2>
      <p>You have been logged out successfully</p>
    </div>
)

export default withStyles(styles)(LoginHeader)

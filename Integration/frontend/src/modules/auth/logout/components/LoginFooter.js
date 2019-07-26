/** React */
import React from 'react'

/** MUI */
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

/** Local */
import styles from '../styles'

const LoginFooter = ({ classes }) => (
  <div className={classes.modalFooter}>
      <div className={classes.root}>
          <Grid container spacing={0}>
              <Grid item xs={3}>
                  <div className={classes.clientLogo}>
                        SICK Logo
                    </div>
                </Grid>
              <Grid item xs={9}>
                  <div className={classes.clientLinks}>
                      <List component='nav' className={classes.navList} >
                          <ListItem button className={classes.navItem} >
                              <ListItemText primary='Help' className={classes.navItemText} />
                            </ListItem>
                          <ListItem button className={classes.navItem} >
                              <ListItemText primary='Privacy' className={classes.navItemText} />
                            </ListItem>
                          <ListItem button className={classes.navItem} >
                              <ListItemText primary='Terms' className={classes.navItemText} />
                            </ListItem>
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    </div>
)

export default withStyles(styles)(LoginFooter)

/** React */
import React from 'react'
import { Link } from 'react-router-dom'
/** MUI */
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import SvgIcon from '@material-ui/core/SvgIcon'
import { sickLogo } from './../../../../svgIcons'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
/** Local */
import styles from '../styles'
import {routeConstants} from '../../route'

const LoginFooter = ({ classes }) => (
    <div className={classes.modalFooter}>
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <SvgIcon className={classes.clientLogo} viewBox="0 0 1000 320">
                        {sickLogo}
                    </SvgIcon>
                </Grid>
                {/*<Grid item xs={9}>
                    <div className={classes.clientLinks}>
                        <List component="nav" className={classes.navList} >
                            <ListItem button className={classes.navItem} component={Link} target='_blank' to={routeConstants.HELP}>
                                <ListItemText primary="Help" className={classes.navItemText} />
                            </ListItem>
                            <ListItem button className={classes.navItem} component={Link} target='_blank' to={routeConstants.PRIVACY}>
                                <ListItemText primary="Privacy" className={classes.navItemText} />
                            </ListItem>
                            <ListItem button className={classes.navItem} component={Link} target='_blank' to={routeConstants.TERMS}>
                                <ListItemText primary="Terms" className={classes.navItemText} />
                            </ListItem>
                        </List>
                    </div>
                </Grid>*/}
            </Grid>
        </div>
    </div>
)

export default withStyles(styles)(LoginFooter)

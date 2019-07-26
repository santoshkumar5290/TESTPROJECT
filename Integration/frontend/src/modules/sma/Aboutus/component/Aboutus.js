/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

/** MUI */
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import AppBar from '@material-ui/core/AppBar'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'
import { embedI18n } from '../../../../services/I18nl10n'

/** Local */
import { getAuthenticationURL } from '../../../../services/httpRequest'
import { aboutUsFeature } from '../redux'
import styles from '../styles'
import { updateBreadcrumb } from '../../../../services/breadcrumb'
import Divider from '@material-ui/core/Divider'




/*
*About us container
*/
class AboutUs extends Component {

  static propTypes = {
    location: PropTypes.object,
    requestAboutUsPage: PropTypes.func,
    aboutUs: PropTypes.object,
    classes: PropTypes.object,
    updateBreadcrumb: PropTypes.func
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      tableVersionList: [],
      buildDate: '',
      version: '',
      visitSite: 'http://sick.com',
      copyright: ''
    }
  }
  /*
  * @ignore
  */
  componentWillMount() {
    this.props.updateBreadcrumb(this.props.location.pathname)
    this.props.requestAboutUsPage(getAuthenticationURL())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.aboutUs && nextProps.aboutUs.code === '200') {
      this.setState({
        tableVersionList: nextProps.aboutUs.versionList,
        buildDate: nextProps.aboutUs.buildDate,
        version: nextProps.aboutUs.version,
        copyright: nextProps.aboutUs.copyright
      })
    }
  }

  handleVisitClick = () => {
    window.open(this.state.visitSite)
  }

  /**
  *@ignore
  */
  render() {
    const { classes, localize } = this.props
    return (
      <div>
        <Paper className={classes.wrapperPaper}>

          <div className={classes.aboutHeader}>
            <AppBar position='static' color='default' className={classes.aboutHeaderAppBar}>
              <div className={classes.aboutHeaderToolbar}>
                <div className={classes.aboutHeaderLeft}>

                  <Typography variant='title' color='primary'>
                    {localize('ABOUT_INFO')}
                  </Typography>

                </div>
                <div className={classes.aboutHeaderRight} />
              </div>
            </AppBar>
          </div>

          <div className={classes.aboutBanner}>
            <Card className={classes.bannerCard}>
              <CardMedia className={classes.bannerCardMedia} image='images/about-img.png' title='SICK Logistics Diagnostic Analytics' />
            </Card>
          </div>

          <div className={classes.aboutContainer}>
            <Typography className={classes.aboutTitle} variant='display2' component='h2'>
              {localize('SICK_ENTERPRISE')}
            </Typography>

            <List className={classes.aboutList}>
              <ListItem className={classes.aboutListItem}>
                <ListItemText className={classes.aboutListItemText} primary={`Version ${this.state.version}`} />
              </ListItem>
              <ListItem className={classes.aboutListItem}>
                <ListItemText className={classes.aboutListItemText} primary={`Build Date ${this.state.buildDate}`} />
              </ListItem>
            </List>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <Table className={classes.aboutTable}>
                  <TableBody className={classes.aboutTableBody}>
                    {
                      this.state.tableVersionList.map((option, key) => (
                        <TableRow className={classes.aboutTableRow} key={key}>
                          <TableCell className={classes.aboutTableCell}>{option.key}</TableCell>
                          <TableCell className={classes.aboutTableCell}>- {option.version}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={12} sm={6} >
                <div className={classes.alignButton}>
                  <div className={classes.alignButtonBottom}>
                    <Button className={classNames(classes.raisedButton)} variant='raised' color='primary' onClick={this.handleVisitClick}>
                      {localize('VISIT_SITE')}
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          <Divider light />
          <div className={classes.aboutContainer}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12} >
                <Typography>
                  {/* <CopyrightIcon />  */}
                  {this.state.copyright}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    )
  }
};
/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = state => {
  return {
    aboutUs: state.aboutUsReducer.aboutUsData
  }
}

export default connect(mapStateToProps, { ...aboutUsFeature, updateBreadcrumb })(withStyles(styles)(embedI18n(AboutUs)))

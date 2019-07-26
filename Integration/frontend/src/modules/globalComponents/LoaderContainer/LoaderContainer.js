/**React */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**MUI */
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

/**Local */
import Modal from './LoaderModal'
import { embedI18n } from 'platform/services/I18nl10n'

/**
 * function for styles of LoaderContainer
*/
const styles = theme => ({
    progressContainer:{
      position:'relative',
    },
    progressPercentage: {
      color: theme.palette.white,
      fontSize: "24px",
      lineHeight:'84px',
      width:'84px',
      height:'84px',
      position:'absolute',
      top: 'calc(50% - 42px)',
      left: 'calc(50% - 42px)'
    },
    progressMessage: {
      color: theme.palette.white,
      padding: "20px",
      fontSize: "24px"
    },
});

/**
  * LoaderContainer Component
  *
*/
class LoaderContainer extends React.Component {
  /**
    *Validation for props (Static propTypes)
    * @static
    * @type {object} validators
      {
        PropTypes loader object
      }
  */
  static propTypes = {
    loader: PropTypes.object.isRequired,
    size: PropTypes.number
  }
  /**
    * React lifecycle method :
    * Renders this component
    * @returns {ReactElement} - wrapped in div
  */
  render() {
    const props = {
      size: this.props.size || 84
    }
    const { classes } = this.props
    return (
      this.props.loader.counter > 0 &&
      <Modal open transparent cancelButton={false} submitButton={false}>
        <div className={classes.progressContainer}>
        <Typography className={classes.progressPercentage}>{this.props.loadPercent}</Typography>
        <CircularProgress {...props} />
        </div>
        <Typography className={classes.progressMessage}>{this.props.localize(this.props.loadMsg)}</Typography>
      </Modal>
      )
  }
}

/*
* @Function Mapping component state to props.
* @param {Object} state
* @returns {Object} containing props
*/
const mapStateToProps = (state) => ({
  loader: state.loader || {},
  // loadPercent: state.searchReducer.loadPercent,
  // loadMsg: state.searchReducer.loadMsg
})

export default (connect(mapStateToProps))(withStyles(styles, { withTheme: true })(embedI18n(LoaderContainer)))
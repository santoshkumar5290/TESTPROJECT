/** React */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'

/** MUI */
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'

/** MUI Icons */
import RightIcon from '@material-ui/icons/ChevronRight'

/** Local */
import { TextField } from '../form'
import { embedI18n } from '../../services/I18nl10n'

const styles = theme => ({

  editProfileRow: {
    paddingBottom: '20px'
  },
  editProfileButtons: {
    '& button': {
      marginLeft: '20px'
    },
    '& button:first-child': {
      marginLeft: '0'
    }
  },

  menuIcon: {
    width: 'auto',
    height: 'auto',
  },

  editableTableBox: {
    display: 'block',
    '& table': {
      '& td, & th': {
        paddingLeft: '12px',
        paddingRight: '12px'
      },
      '& td:last-child': {        
        '& svg': {
          float:'right',
          verticalAlign: 'middle',
        }
      }
    }
  },

  '@media screen and ( max-height: 639px )': {
    editableTableBox: {
      '& table tr': {
        height: '42px'
      }
    },
  },

  '@media screen and ( max-height: 589px )': {
    editableTableBox: {
      '& table tr': {
        height: '36px'
      }
    },
  },

  raisedButtonDisabled: {
    color: '#FFF!important',
    backgroundColor: [`${theme.palette.primary1Color}!important`],
    border: 0,
    borderRadius: '6px',
    padding: '15px 50px 12px'
  },
  raisedButton: {
    backgroundColor: [`${theme.palette.primary2Color}!important`],
    border: 0,
    borderRadius: '6px',
    color: 'white',
    padding: '15px 50px 12px',
    '&:hover': {
      background: [`${theme.palette.secondary3Color}!important`]
    }
  },
  flatButton: {
    backgroundColor: theme.palette.grey1Color,
    border: 0,
    borderRadius: '6px',
    color: theme.palette.textColor,
    padding: '15px 50px 12px',
    '&:hover': {
      background: theme.palette.grey2Color
    }
  }

})

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class EditableList extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    editInProgress: PropTypes.bool,
    detailsOnSelect: PropTypes.bool,
    selectedIndex: PropTypes.number,
    list: PropTypes.object.isRequired,
    dataKeys: PropTypes.array.isRequired,
    saveHandler: PropTypes.func,
    onListClick: PropTypes.func,
    classes: PropTypes.object
  }

  static defaultProps = {
    title: '',
    detailsOnSelect: true,
    selectedIndex: -1,
    list: [],
    dataKeys: [],
    onListClick: () => { },
    saveHandler: () => { }
  }

  constructor(props) {
    super(props)
    this.state = {
      index: this.props.selectedIndex,
      field1Value: '',
      field2Value: '',
      keyValue: '',
      selectedDetailsOpen: (this.props.selectedIndex >= 0) && this.props.detailsOnSelect
    }
  }

  handleCellSelection = (row) => {
    this.setState({
      index: row,
      selectedDetailsOpen: true
    }, this.props.onListClick)
  }

  handleSave = () => {
    this.props.saveHandler()
  }

  handleCancel = () => {
    this.setState({
      selectedDetailsOpen: false
    })
  }

  render() {
    const { dataKeys, list, editInProgress, classes, localize } = this.props
    const { index } = this.state
    const detailData = dataKeys[index]
    return (

      <Grid container spacing={40}>

        {
          <Grid item md={12} lg={6}>
            <div className={classes.editableTableBox}>
              <Table>
                <TableBody>

                  {
                    dataKeys && dataKeys.map((datakey, dataIndex) => {
                      if (datakey.label) {
                        return (
                          <TableRow
                            onClick={() => this.handleCellSelection(dataIndex)}
                            key={'row_' + dataIndex}
                            id={'row_' + dataIndex}
                            selected={index === dataIndex}
                          >
                            <TableCell key={'cell1_' + dataIndex}>
                              {datakey.label}
                            </TableCell>
                            <TableCell key={'cell2_' + dataIndex}>
                              {datakey.keys.map((keyitem) => (list[keyitem])).join(' ')}
                            </TableCell>
                            <TableCell key={'cell3_' + dataIndex} >
                              {datakey.editable && <RightIcon />}
                            </TableCell>
                          </TableRow>
                        )
                      } else {
                        return <TableRow> here </TableRow>
                      }
                    })
                  }

                </TableBody>
              </Table>
            </div>
          </Grid>
        }

        {

          this.state.selectedDetailsOpen && detailData.editable &&

          <Grid item md={12} lg={6}>

            <div className={classes.editProfile}>

              <div className={classes.editProfileRow}>
                {detailData.label}
              </div>

              <div className={classes.editProfileRow}>
                {
                  detailData.keys.map((key) => {
                    const labelText = key.charAt(0).toUpperCase() + key.slice(1)
                    return <TextField
                      key={`field${key}`}
                      required
                      value={list[key]}
                      floatingLabelText={labelText.replace(/([A-Z])/g, ' $1').trim()}
                      name={key}
                      onFocusOut={(value) => {
                        (value !== list[key]) &&
                          detailData.onBlurValidation && detailData.onBlurValidation(value)
                      }}
                      postValidation={detailData.fetchState}
                      trim={detailData.trim}
                      externalErrorText={detailData.getErrorText ? detailData.getErrorText()[key] : ''}
                      regex={detailData.regex}
                    />
                  })
                }
              </div>

              <div className={classNames(classes.editProfileRow, classes.editProfileButtons, classes.textAlignRight)} >
                <Button className={classes.flatButton} variant='flat' onClick={this.handleCancel} color='primary' >
                  {localize('CANCEL')}
                </Button>

                <Button className={classNames({ [classes.raisedButtonDisabled]: true, [classes.raisedButton]: !(detailData.getErrorText ? Object.values(detailData.getErrorText()).some((value) => Boolean(value)) : editInProgress) })} variant='raised' onClick={this.handleSave} color='primary'
                  disabled={detailData.getErrorText ? Object.values(detailData.getErrorText()).some((value) => Boolean(value)) : editInProgress} >
                  {localize('SAVE')}
                </Button>

              </div>

            </div>
          </Grid>
        }

      </Grid >


    )
  }
}

export default (withStyles(styles, { withTheme: true })(embedI18n(EditableList)))

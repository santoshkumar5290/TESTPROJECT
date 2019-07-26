/** React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/** MUI */
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
/** MUI Icons */
import MoreOptionsIcon from '@material-ui/icons/MoreVert'
import DisableIcon from '@material-ui/icons/Block'
import DeleteIcon from '@material-ui/icons/Delete'
import ResetPasswordIcon from '@material-ui/icons/Replay'
import EditIcon from '@material-ui/icons/Edit'

import { embedI18n } from '../../services/I18nl10n'

const styles = theme => ({
  wrapperPaper: {
    borderRadius: '6px',
    marginBottom: '48px'
  },
  wrapperContainer: {
    padding: [40]
  },
  editableTableBox: {
    display: 'block',
    '& table': {
      '& td, & th': {
        paddingLeft: '12px',
        paddingRight: '12px'
      },
      '& td:last-child': {
        '& button': {
          width: 'auto',
          height: 'auto',
          float: 'right',
          background: 'transparent',
          '& span': {
            background: 'transparent',
          }
        },
        '& svg': {
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

  editableTableBoxButtons: {
    borderBottom: 0,
    paddingTop: '24px',
    paddingRight: '0',
    paddingBottom: '24px',
    paddingLeft: '0',

    '& button': {
      marginLeft: '20px'
    },
    '& button:first-child': {
      marginLeft: '0'
    }
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
  },

  tableHeaderPaper: {
    boxShadow: 'none',
    display: 'table',
    width: '100%',
    background: 'transparent',
    borderBottom: [[1, 'solid', theme.palette.border1Color]],
    '& p': {
      fontSize: '18px',
      color: theme.palette.primary1Color
    },
    '& h2': {
      fontSize: '22px',
      color: theme.palette.primary2Color,
      marginRight: '50px'
    }
  },
  tableHeaderToolbar: {
    display: 'table-row'
  },
  tableHeaderBlock: {
    display: 'table-cell',
    verticalAlign: 'middle',
    '& p, & h2': {
      display: 'inline'
    }
  },


  // Media Queries
  [theme.breakpoints.only('xl')]: {
    tableHeaderPaper: {
      padding: [24, 40],
    }
  },
  [theme.breakpoints.only('lg')]: {
    tableHeaderPaper: {
      padding: [16, 30],
    }
  },
  [theme.breakpoints.only('md')]: {
    tableHeaderPaper: {
      padding: [12, 20],
    }
  },

  [theme.breakpoints.between('xs', 'sm')]: {
    tableHeaderPaper: {
      padding: [12, 20],
    }
  },
  // Media Queries



})

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class EditableTable extends Component {

  static propTypes = {
    title: PropTypes.string,
    options: PropTypes.bool,
    onTapOptions: PropTypes.func,
    onItemSelect: PropTypes.func,
    onOptionsSelect: PropTypes.func,
    detailsOnSelect: PropTypes.bool,
    selectedIndex: PropTypes.number,
    data: PropTypes.array,
    dataKeys: PropTypes.array,
    detailKeys: PropTypes.array
  }

  static defaultProps = {
    title: '',
    options: true,
    onTapOptions: () => { },
    onItemSelect: () => { },
    onOptionsSelect: () => { },
    detailsOnSelect: true,
    selectedIndex: -1,
    data: [],
    dataKeys: [],
    detailKeys: []
  }

  constructor(props) {
    super(props)
    this.state = {
      index: this.props.selectedIndex,
      selectedDetailsOpen: (this.props.selectedIndex >= 0) && this.props.detailsOnSelect,
      menuElement: null,
      option: false,
      selectedOptionIndex: -1
    }
  }

  openMenu = event => {
    this.setState({ menuElement: event.currentTarget })
  };

  handleCellSelection = (row) => {
    this.setState({
      index: row,
      selectedOptionIndex: -1,
      selectedDetailsOpen: true
    })
  }

  handleOptionsCellSelection = (row) => {
    this.setState({
      index: row,
      selectedDetailsOpen: true,
      selectedOptionIndex: row
    }, this.props.onTapOptions(this.props.data[row]))
  }

  onClose = () => {
    this.setState({ menuElement: null })
  }

  handleOptions = (e, value) => {
    e.stopPropagation()
    this.setState({ menuElement: null }, () => {
      this.props.onOptionsSelect(value)
    })
  }

  handleDetailsClose = () => {
    this.setState({
      selectedDetailsOpen: false
    })
  }

  getOptionsComponent = (index, options) => {
    const icons = {
      edit: EditIcon,
      delete: DeleteIcon,
      disable: DisableIcon,
      resetpassword: ResetPasswordIcon
    }
    const { menuElement } = this.state
    const optionOpen = (this.state.selectedOptionIndex === index)
    return (
      this.props.options &&

      <React.Fragment>
        <IconButton
          onClick={this.openMenu}>
          <MoreOptionsIcon />
        </IconButton>
        <Menu
          anchorEl={menuElement}
          open={Boolean(menuElement)}
          onClose={this.onClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {options.map(option => {

            const OptionIcon = icons[option.label.replace(' ', '').toLowerCase()]
            return (option.visible && OptionIcon &&
              <MenuItem
                open={optionOpen}
                onClick={event => this.handleOptions(event, option.label)}
                key={option.label}
              >
                <ListItemIcon>
                  <OptionIcon />
                </ListItemIcon>
                <ListItemText inset primary={option.label} />
              </MenuItem>)
          })
          }
        </Menu>

      </React.Fragment>

    )
  }

  isCellContentValid = (cell) => {
    return this.props.dataKeys.map((datakey) => (datakey.label)).includes(cell)
  }

  getDetails = (detailKey) => {
    const detail = this.props.data[this.state.index][detailKey.keys[0]]
    const style = { wordWrap: 'break-word', wordBreak: 'break-all' }
    if (Array.isArray(detail)) {
      const value = detail.map(key => <div key={key}>{key}</div>)
      const rowSpan = detail.length || 1
      return <td style={style} rowSpan={rowSpan}>{value.length ? value : `No ${detailKey.label} assigned`}</td>
    } else {
      const value = detailKey.keys.map(key => this.props.data[this.state.index][key]).join(' ')
      return <td style={style}>{(value && value.trim()) || `No ${detailKey.label} assigned`}</td>
    }
  }

  render() {
    const { classes, localize } = this.props
    return (
      <Paper className={classes.wrapperPaper} elevation={4}>
        <div className={classes.tableHeader}>
          <AppBar position='static' color='default' className={classes.tableHeaderPaper}>
            <div className={classes.tableHeaderToolbar}>
              <div className={classes.tableHeaderBlock}>
                <Typography variant='title' color='inherit' >
                  {this.props.title}
                </Typography>
              </div>
            </div>
          </AppBar>
        </div>
        <div className={classes.wrapperContainer}>
          <Grid container spacing={40}>
            <Grid item md={12} lg={6}>
              <div className={classes.editableTableBox}>
                <Table>

                  <TableHead>
                    <TableRow>
                      {this.props.dataKeys.map((dataKey, index) => {
                        return (Boolean(this.props.options || dataKey.label) &&
                          <TableCell key={'header_' + index}>
                            {dataKey.label}
                          </TableCell>)
                      })}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {this.props.data.map((row, rowIndex) => (
                      <TableRow
                        key={'row_' + rowIndex} id={'row_' + rowIndex}
                        selected={this.state.index === rowIndex}
                      >
                        {this.props.dataKeys.map((cell, cellIndex) => {
                          if (this.isCellContentValid(cell.label)) {
                            if (cell.label) {
                              return <TableCell onClick={() => this.handleCellSelection(rowIndex)}
                                key={'cell_' + cellIndex}>
                                {cell.keys.map(key => (row[key])).join(' ') || `No ${cell.label} assigned`}
                              </TableCell>
                            } else if (this.props.options) {
                              return <TableCell onClick={() => this.handleOptionsCellSelection(rowIndex)}
                                key={'cell_' + cellIndex}>
                                {this.getOptionsComponent(rowIndex, row[cell.keys[0]])}</TableCell>
                            }
                          } else {
                            return false
                          }
                        })}
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              </div>
            </Grid>

            {
              this.state.selectedDetailsOpen &&
              <Grid item md={12} lg={6}>
                <div className={classes.editableTableBox}>
                  <Table>

                    <TableHead>
                      <TableRow>
                        <TableCell colSpan='2'>
                          <Typography variant='title' gutterBottom>
                            {this.props.detailKeys[0].keys.map(key => (this.props.data[this.state.index][key])).join(' ')}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {
                        this.props.detailKeys.map((dataKey, dataIndex) => {
                          const key = `details_${dataIndex}`
                          if (dataKey.label && dataIndex > 0) {
                            return (
                              <TableRow>
                                <TableCell>
                                  {dataKey.label}
                                </TableCell>
                                <TableCell>
                                  {this.getDetails(dataKey)}
                                </TableCell>
                              </TableRow>
                            )
                          } else {
                            return null
                          }
                        })
                      }
                      <TableRow>
                        <TableCell colSpan='2' className={classNames(classes.textAlignRight, classes.editableTableBoxButtons)}>
                          <Button className={classes.raisedButton} variant='raised' onClick={this.handleDetailsClose} color='primary'>
                            {localize('OK')}
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>

                  </Table>
                </div>
              </Grid>
            }

          </Grid>
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles, { withTheme: true })(embedI18n(EditableTable))

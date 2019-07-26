/**React */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**MUI */
import IconMenu from '@material-ui/core/IconMenu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import { lightBlack } from '@material-ui/core/colors'

/**MUI Icons */
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import CopyIcon from 'material-ui/svg-icons/content/content-copy'
import CloneIcon from 'material-ui/svg-icons/av/fiber-smart-record'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import AddIcon from 'material-ui/svg-icons/content/add'

/**
 * Component responsible for System edit, copy, clone and delete features.
 * Will be called from Table and Grid views.
 */
export class EditMenu extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,

    handleAdd: PropTypes.func,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func,
    handleClone: PropTypes.func,
    handleCopy: PropTypes.func,

    addLabel: PropTypes.string,
    editLabel: PropTypes.string,
    copyLabel: PropTypes.string,
    cloneLabel: PropTypes.string,
    deleteLabel: PropTypes.string,

    disableAdd: PropTypes.bool,
    disableEdit: PropTypes.bool,
    disableCopy: PropTypes.bool,
    disableClone: PropTypes.bool,
    disableDelete: PropTypes.bool,

    disabled: PropTypes.bool
  }

  static defaultProps = {
    name: '',
    addLabel: 'Add',
    editLabel: 'Edit',
    copyLabel: 'Copy',
    cloneLabel: 'Clone',
    deleteLabel: 'Delete',
    disableAdd: false,
    disableEdit: false,
    disableCopy: false,
    disableClone: false,
    disableDelete: false,
    disabled: false
  }

  render () {
    return (
      <IconMenu
        iconButtonElement={<IconButton disabled={this.props.disabled}><MoreVertIcon color={lightBlack} /></IconButton>}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        useLayerForClickAway
      >
        {this.props.handleAdd && <MenuItem
          primaryText={this.props.addLabel}
          onTouchTap={() => { this.props.handleAdd(this.props.name) }}
          rightIcon={<AddIcon />}
          disabled={this.props.disableAdd}
        />}
        {this.props.handleEdit && <MenuItem
          primaryText={this.props.editLabel}
          onTouchTap={() => { this.props.handleEdit(this.props.name) }}
          rightIcon={<EditIcon />}
          disabled={this.props.disableEdit}
        />}
        {this.props.handleCopy && <MenuItem
          primaryText={this.props.copyLabel}
          onTouchTap={() => { this.props.handleCopy(this.props.name) }}
          rightIcon={<CopyIcon />}
          disabled={this.props.disableCopy}
        />}
        {this.props.handleClone && <MenuItem
          primaryText={this.props.cloneLabel}
          onTouchTap={() => { this.props.handleClone(this.props.name) }}
          rightIcon={<CloneIcon />}
          disabled={this.props.disableClone}
        />}
        {this.props.handleDelete && <MenuItem
          primaryText={this.props.deleteLabel}
          onTouchTap={() => { this.props.handleDelete(this.props.name) }}
          rightIcon={<DeleteIcon />}
          disabled={this.props.disableDelete}
        />}
      </IconMenu>
    )
  }
}

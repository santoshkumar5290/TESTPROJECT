const styles = theme => ({

  modalSortableList: {
    padding: '0',
    margin: '0',
    border: '0px',
  },
  modalSortableListItem: {
    display: 'block',
    padding: '12px 24px'
  },

  expander: {
    display: 'inline-block',
    width: 20,
    textAlign: 'center',
    cursor: 'pointer'
  },
  noExpander: {
    display: 'inline-block',
    width: 20,
    paddingLeft: '10px'
  },
  iconStyle: {
    fontSize: '14px',
    lineHeight: '14px',
    width: 'auto',
    height: 'auto',
    marginRight: '14px',
  },
  labelStyle: {
    width: 'auto',
    wordBreak: 'break-word',
    color: theme.palette.textColorDark,
    margin: 0,
    '& span': {
      fontSize: '14px',
      lineHeight: '14px',
    }
  },
  card: {
    borderBottom: [
      [1, 'solid', theme.palette.grey2Color]
    ],
    padding: [12, 24],
    display: 'flex',
    backgroundColor: [theme.palette.grey1Color],
    '&:hover': {
      backgroundColor: [theme.palette.grey2Color],
    }
  },
  selectAllCard: {
    borderBottom: [
      [1, 'solid', theme.palette.grey2Color]
    ],
    padding: [12, 24],
    display: 'flex'
  },

  slExpanderRight: {
    width: '10px',
    height: 0,
    borderColor: 'transparent transparent transparent $grey600',
    borderStyle: 'solid',
    borderWidth: '5px 0 5px 5px',
    marginLeft: '10px',
    marginTop: '7px',
    cursor: 'pointer'
  },
  slExpanderDown: {
    width: '10px',
    height: 0,
    borderColor: '$grey600 transparent transparent transparent',
    borderStyle: 'solid',
    borderWidth: '5px 5px 0 5px',
    marginTop: '10px',
    marginLeft: '10px',
    width: '1px',
    cursor: 'pointer',
  }

});

export default styles;
/**React */
import React from 'react'
import PropTypes from 'prop-types'

/**MUI */
import { withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel  from '@material-ui/core/FormControlLabel'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'

/**Locals */
import styles from "../styles"




const canMoveUp = (index, cards) => {
  const before = cards.slice(0, index + 1).filter((card) => (card.get('isActive')))
  const newIndex = before.size - 1
  if(index === 0){
    return false
  } else if(!cards.get(index).get('columnEditable')){
    return false
  } else if(!cards.get(index-1).get('columnEditable') && 
    cards.get(index).get('columnEditable')){
    return false
  } else if (before.size === 0) {
    return false
  } else if (before.get(newIndex).get('property').toLowerCase() === 'id') {
    return false
  } else if (before.get(newIndex - 1).get('property').toLowerCase() === 'id') {
    return false
  }

  return true
}

const canMoveDown = (index, cards) => {
  const after = cards.slice(index, cards.size).filter((card) => (card.get('isActive')))
  const newIndex = 0
  if(!cards.get(index).get('columnEditable')){
    return false
  } else if(index === cards.size - 2 && cards.get(cards.size-1).get('type') === "Button"){
    return false
  } else if (index === cards.size - 1) {
    return false
  } else if (after.size === 0) {
    return false
  } else if (after.get(newIndex).get('property').toLowerCase() === 'id') {
    return false
  }

  return true
}

class SelectAllCard extends React.Component {
  static propTypes = {
    selectAll: PropTypes.func.isRequired,
    allSelected: PropTypes.bool.isRequired
  }

  render() {
    const { classes, localize } = this.props
    return (
      <div className={classes.selectAllCard} >
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.allSelected}
              onChange={() => this.props.selectAll()}
              value="Select All"
              className={classes.iconStyle}
            />
          }
          label={localize('SELECT_ALL')}
          className={classes.labelStyle}
        />
      </div>
    )
  }
}

class Card extends React.Component {
  static propTypes = {
    key: PropTypes.number,
    item: PropTypes.object.isRequired,
    moveUp: PropTypes.bool.isRequired,
    moveDown: PropTypes.bool.isRequired,
    sortBase: PropTypes.func.isRequired,
    updateBool: PropTypes.func.isRequired,
    depth: PropTypes.number.isRequired,
    parentIndex: PropTypes.array,
  }

  static defaultProps = {
    styles: {
      border: '1px solid black',
      width: 200,
      padding: 10
    },
    parentIndex: [-1],
    indexKey: 0
  }

  getHeaderLabel(column) {
    return column.getIn(['header', 'label']) || column.get('property')
  }

  render() {
    const {
      indexKey, item, moveUp, moveDown, sortBase, updateBool, depth, parentIndex, classes, theme
    } = this.props
    const hasChildren = item.get('children') && item.get('children').size > 0

    let handleExpand = null
    if (hasChildren) {
      handleExpand = () => updateBool(item.get('index'), parentIndex[0], 'expanded')
    }
    return (
      <div >
        <div
          className={classes.card}
          key={indexKey}
        >
          <div onClick={handleExpand}>
            {hasChildren
              ? <div
                onClick={handleExpand}
              >
                {item.get('expanded')
                  ? <div className={classes.slExpanderDown} />
                  : <div className={classes.slExpanderRight} />
                }
              </div>
              : <div />
            }

            <FormControlLabel
              control={
                <Checkbox
                  checked={!item.get('columnEditable') || item.get('isVisible')}
                  disabled={!item.get('columnEditable')}
                  onChange={() => updateBool(item.get('index'), item.get('header').get('label'), parentIndex[0], 'isVisible')}
                  value={this.getHeaderLabel(item)}
                  className={classes.iconStyle}
                />
              }
              label={this.getHeaderLabel(item)}
              className={classes.labelStyle}
            />
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <KeyboardArrowUp
              onClick={() => sortBase('up', item, parentIndex[0])}
              style={{
                cursor: 'pointer',
                display: moveUp ? 'initial' : 'none',
                marginRight: moveDown ? 0 : 24
              }}
            />
            <KeyboardArrowDown
              onClick={() => sortBase('down', item, parentIndex[0])}
              style={{
                cursor: 'pointer',
                display: moveDown ? 'initial' : 'none'
              }}
            />
          </div>
        </div>
        {item.get('expanded') && hasChildren
          ? item.get('children').map((child, j, children) => {
            return (
              <Card
                indexKey={j}
                key={j}
                item={child}
                moveUp={canMoveUp(j, children)}
                moveDown={canMoveDown(j, children)}
                sortBase={sortBase}
                updateBool={updateBool}
                depth={depth + 1}
                parentIndex={[item.get('index')]}
              />)
          })
          : null
        }
      </div>
    )
  }
}

class SortableList extends React.Component {
  static propTypes = {
    sortableCards: PropTypes.object.isRequired,
    sortBase: PropTypes.func.isRequired,
    updateBool: PropTypes.func.isRequired,
    selectAll: PropTypes.func.isRequired,
    allSelected: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  render() {
    const { classes,localize } = this.props;

   let activeColumn  =  this.props.sortableCards.filter((item, i) =>{
      return (item.get("isActive") === true && item.get('property') != "Button")
    })
    return (
      <div className={classes.modalSortableList}>
        <SelectAllCard
          selectAll={this.props.selectAll}
          allSelected={this.props.allSelected}
          classes={this.props.classes}
          localize={localize}
        />
        {activeColumn.map((item, i, allCards) =>
          item.get('type') !== 'Button' && item.get('isActive') ?
          <Card
            indexKey={i}
            key={i}
            styles={item.get('isActive')
              ? styles.card
              : Object.assign({}, styles.card, { display: 'none' })
            }
            item={item}
            classes={this.props.classes}
            moveUp={canMoveUp(i, allCards)}
            moveDown={canMoveDown(i, allCards)}
            last={i === allCards.size - 1}
            sortBase={this.props.sortBase}
            updateBool={this.props.updateBool}

            depth={0}
          />: null
        )}
      </div>
    )
  }
}


export default withStyles(styles, { withTheme: true })(SortableList);
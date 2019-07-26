import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styles from '../styles';

class SpecificHeaderSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentName: '',
      componentId: '',
      systemName: '',
      status: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleOnBlur = () => {
    const { handleValue } = this.props;
    handleValue(this.state);
  };

  render() {
    const { classes, filterQuery } = this.props;
    return (
      <div className={classes.filterRow}>
        {filterQuery.map(e => (
          <TextField key={e.name} name={e.name} label={e.title} className={classes.textFieldSearch} margin="normal" onBlur={this.handleOnBlur} onChange={this.handleChange} />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(SpecificHeaderSelector);

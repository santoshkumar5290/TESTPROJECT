/** React */
import React, { Component, PropTypes } from "react";
import { fromJS } from "immutable";

/** MUI Import */
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import AppBar from "material-ui/AppBar";
import * as colors from "material-ui/styles/colors";
import ArrowDropRight from "material-ui/svg-icons/navigation-arrow-drop-right";

/** Machine Config*/
import { machineList } from "../../mocks/data/machineListJson";

/**Redux */
import { connect } from "../../platform";

/**Actions */
import {
  getMachineConfig,
  getMachinebasicConfig
} from "../../reducers/machine";

/** @ignore */
const mapStateToProps = state => ({
  machine: state.machine.toJS()
});

/**
 * MachineAppBar component.
 * @reactProps {Object} machine - this is props
 */
export class MachineAppbar extends Component {
  /** @ignore */
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataValue: "Set Gauge Value"
    };
  }
  
  /** @ignore */
  static contextTypes = {
    muiTheme: PropTypes.object
  };

  /** @private */
  componentDidMount() {
    this.props.getMachinebasicConfig();
  }

  /**
    *  handle select of machine
    * @param event
    * @param index
    * @param value
    */
  selectMachine = (event, index, value) => this.props.getMachineConfig(value);

  /** Render Machine List 
    * @private
    */
  createListItems = () => {
    return machineList.map((item, key) => {
      return (
        <MenuItem value={item.id} key={key} primaryText={item.systemName} />
      );
    });
  };
  
  /**
    * render
    * @return {ReactElement} markup
    */
  render() {
    const machineConfig = this.props.machine.machineConfig;
    return (
      <div>
        <SelectField
          floatingLabelText={"Select Machine"}
          value={machineConfig.id}
          onChange={this.selectMachine}
          fullWidth={true}
        >
          {this.createListItems()}
        </SelectField>
      </div>
    );
  }
}

/** @ignore */
export const MachineAppbarConnect = connect(mapStateToProps, {
  getMachinebasicConfig,
  getMachineConfig
})(MachineAppbar);

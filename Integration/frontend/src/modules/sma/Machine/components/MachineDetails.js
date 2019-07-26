/** React */
import React, { Component } from "react";
import {machine2 as machineConfig, sensor} from './mock'

/** React d3 machine schematics components */
import { ReactMachineWidget } from "./ReactD3Machine";


/**
 * MachineDetail component.
 * @reactProps {Object} machine - this is props
 */
export class MachineDetails extends Component {

  /**
    * pull sensor data
    * @param url
    */
  pullData(url) {
    return sensor[1].data;
  }

  /**
    * render
    * @return {ReactElement} markup
    */
  render() {
    // const machineConfig = this.props.machine.machineConfig;
    const basicConfig = sensor[1].data[1];
    return (
      <ReactMachineWidget
        title={machineConfig.title}
        diagram={machineConfig.diagram}
        width={machineConfig.width}
        height={machineConfig.height}
        grid={machineConfig.grid}
        sensors={this.pullData()}
        pollingFrequency={basicConfig.polling_frequency}
        pullData={this.pullData.bind(this)}
      />
    );
  }
}


export default MachineDetails;

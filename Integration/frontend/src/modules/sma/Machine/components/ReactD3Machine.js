/** React */
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
/** d3 */
import * as d3 from 'd3';

/**
 * @function LightenDarkenColor
 * Tool to make colour lighten or darken
 * @param {*} col - Colour in hex
 * @param {*} amt - Amount (positive for lighten,negative for darken)
 */
function LightenDarkenColor(color, amt) {
  let col = color;
  if (col === undefined) return undefined;
  let usePound = false;
  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }
  const num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00ff) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  let g = (num & 0x0000ff) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound ? '#' : '') + String(`000000${(g | (b << 8) | (r << 16)).toString(16)}`).slice(-6);
}

/**
 * ReactMachineSchematicsD3 component.
 * @extends {React.Component}
 * @reactProps {string} title - this is property param.
 * @reactProps {string} diagram - this is property param.
 * @reactProps {number} width - this is property param.
 * @reactProps {number} height - this is property param.
 * @reactProps {string[]} grid - this is property param.
 * @reactProps {string[]} sensors - this is property param.
 * @reactProps {number} polling_frequency - this is property param.
 */
class ReactMachineWidget extends Component {
  /** @private */
  componentDidMount() {
    /** Call diagram rendering */
    this.renderMachineDiagram();
    this.updateSensorData();
  }

  componentDidUpdate(prevProps) {
    const { title, diagram, sensors } = this.props;
    if (title !== prevProps.title || diagram !== prevProps.diagram || sensors.toString() !== prevProps.sensors.toString()) {
      this.renderMachineDiagram();
      this.updateSensorData();
    } else {
      this.updateSensorData();
    }
  }

  /** render diagram png image */
  renderMachineDiagram = () => {
    const { diagram } = this.props;

    d3.select(this.machineDiv)
      .selectAll('image')
      .remove();
    d3.select(this.machineDiv)
      .selectAll('circle')
      .remove();
    d3.select(this.machineDiv)
      .selectAll('svg')
      .remove();

    /** Define the svg element for the diagram png/jpg */
    const svgTag = d3
      .select(this.machineDiv)
      .append('svg:svg')
      .attr('viewBox', `0 0 ${800} ${400}`)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .classed('svg-content', true);

    /** Define the image element to place png/jpg diagram */
    const machineDiagram = svgTag.selectAll('image').data([0]);
    machineDiagram
      .enter()
      .append('svg:image')
      .attr('xlink:href', diagram)
      .attr('width', 800)
      .attr('height', 400);

    machineDiagram.exit().remove();
    // Call sensors rendering
    this.renderSensors();
  };

  /** render sensors on there cordinates */
  renderSensors = () => {
    const { sensorsData, sensors } = this.props;
    d3.select(this.machineDiv)
      .selectAll('circle')
      .remove();

    // Define the divs for the tooltips
    d3.select(this.machineDiv)
      .select('.tooltipWrapper')
      .selectAll('div')
      .data(sensors)
      .enter()
      .append('div')
      .attr('class', 'tooltip')
      .attr('id', d => `a${d.uniqueId.split(" ").join("a")}`)
      .style('opacity', d => (sensorsData[d.uniqueId] === '#FF0000' ? 100 : 0))
      .style('z-index', 9999)
      .style('position', 'absolute')
      .style('background', '#fff')
      .html(d => `${d.name}<br/>${d.uniqueId}`)
      .style('width', '150px')
      .style('pointer-events', 'none')
      .style('text-align', 'center')
      .style('color', d => sensorsData && LightenDarkenColor(sensorsData[d.uniqueId], -100))
      .style('border', '1px solid #000') // this.props.sensorsData && this.props.sensorsData[i].default_color)
      .style('background', d => sensorsData && LightenDarkenColor(sensorsData[d.uniqueId], 200))
      .style('font-size', '1.4rem')
      .style('line-height', '1.2')
      .style('padding', '10px')
      .style('border-radius', '6px')
      .style('left', d => {
        const tooltipWidth = document.querySelector(`#a${d.uniqueId.split(" ").join("a")}`).clientWidth;
        let x = ((d.xAxis + 10) * this.machineDiv.clientWidth) / 800;
        if (x > this.machineDiv.clientWidth - tooltipWidth) {
          x -= tooltipWidth + (20 * this.machineDiv.clientWidth) / 800;
        }
        return `${x}px`;
      })
      .style('top', d => {
        const tooltipHeight = document.querySelector(`#a${d.uniqueId.split(" ").join("a")}`).clientHeight;
        return `${Math.max(0, Math.min((d.yAxis * this.machineDiv.clientHeight) / 400 - tooltipHeight / 2, this.machineDiv.clientHeight - tooltipHeight))}px`;
      });

    /** Define the group element for sensors */
    const groupElement = d3.select(this.machineDiv).select('svg');

    /** Define the sensors element inside group element */
    const sensors1 = groupElement
      .selectAll('circle')
      .data(sensors)
      .enter()
      .append('circle');

    sensors1.exit().remove();
  };

  /** Update sensor data */
  updateSensorData = () => {
    const { sensors, sensorsData } = this.props;

    // update tooltips
    d3.select(this.machineDiv)
      .select('.tooltipWrapper')
      .selectAll('div')
      .data(sensors)
      .style('opacity', d => (sensorsData[d.uniqueId] === '#FF0000' ? 100 : 0))
      .style('color', d => sensorsData && LightenDarkenColor(sensorsData[d.uniqueId], -100))
      .style('border', '1px solid #000') // this.props.sensorsData && this.props.sensorsData[i].default_color)
      .style('background', d => sensorsData && LightenDarkenColor(sensorsData[d.uniqueId], 200))
      .style('left', d => {
        const tooltipWidth = document.querySelector(`#a${d.uniqueId.split(" ").join("a")}`).clientWidth;
        let x = ((d.xAxis + 10) * this.machineDiv.clientWidth) / 800;
        if (x > this.machineDiv.clientWidth - tooltipWidth) {
          x -= tooltipWidth + (20 * this.machineDiv.clientWidth) / 800;
        }
        return `${x}px`;
      })
      .style('top', d => {
        const tooltipHeight = document.querySelector(`#a${d.uniqueId.split(" ").join("a")}`).clientHeight;
        return `${Math.max(0, Math.min((d.yAxis * this.machineDiv.clientHeight) / 400 - tooltipHeight / 2, this.machineDiv.clientHeight - tooltipHeight))}px`;
      });

    //update circles
    d3.select(this.machineDiv)
      .selectAll('circle')
      .data(sensors)
      .attr('cx', d => {
        return d.xAxis;
      })
      .attr('cy', d => {
        return d.yAxis;
      })
      .attr('r', 10)
      .style('fill', d => {
        return sensorsData[d.uniqueId];
      })
      .on('mouseover', d => {
        if (sensorsData[d.uniqueId] === '#FF0000') return;
        const tooltip = d3.select(this.machineDiv).select(`[id=${`a${d.uniqueId.split(" ").join("a")}`}]`);
        tooltip
          .transition()
          .duration(200)
          .style('opacity', 0.95);
        tooltip
          .style('color', sensorsData && LightenDarkenColor(sensorsData[d.uniqueId], -100))
          .style('border', '1px solid #000') // this.props.sensorsData && this.props.sensorsData[i].default_color)
          .style('background', sensorsData && LightenDarkenColor(sensorsData[d.uniqueId], 200));
      })
      .on('mouseout', d => {
        if (sensorsData[d.uniqueId] === '#FF0000') return;
        const tooltip = d3.select(this.machineDiv).select(`[id=${`a${d.uniqueId.split(" ").join("a")}`}]`);
        tooltip
          .transition()
          .duration(500)
          .style('opacity', 0);
      });
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <Paper>
        <div ref={ref => (this.machineDiv = ref)} id="machine" className="svg-container-machine">
          <div style={{ position: 'absolute' }} className="tooltipWrapper" />
        </div>
      </Paper>
    );
  }
}

/** Define the proptypes */
/** Make all the props and 'required' and provide sensible default in the 'defaultProps' */
// ReactMachineWidget.propTypes = {
//     /** Machine diagram Title */
//     title: Prop
//     PropTypes.string.isRequired,
//     /** Machine diagram href */
//     diagram: PropTypes.string.isRequired,
//     /** Width of machine diagram container and diagram */
//     width: PropTypes.number.isRequired,
//     /** Width of height diagram container and diagram */
//     height: PropTypes.number.isRequired,
//     /** Grid lines matrix for sensor placement */
//     grid: PropTypes.array.isRequired,
//     /** Contains array with sensor details like cordinates , labels, tooltip, default color */
//     sensors: PropTypes.array.isRequired
// }

/** define the default proptypes */
ReactMachineWidget.defaultProps = {
  /** Machine diagram Title */
  title: 'Title',
  /** Machine diagram href */
  diagram: 'dist/images/noImage.png',
  /** width of machine diagram container and diagram */
  width: 500,
  /** width of height diagram container and diagram */
  height: 500,
  /** grid lines matrix for sensor placement */
  grid: [100, 100],
  /** contains array with sensor details like cordinates , labels, tooltip, default color */
  sensors: [],
};

export { ReactMachineWidget };

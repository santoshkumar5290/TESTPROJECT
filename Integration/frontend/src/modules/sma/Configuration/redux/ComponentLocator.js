import React, { Component } from 'react';
import * as d3 from 'd3';

export default class ComponentLocator extends Component {
  componentDidMount = () => {
    this.drawCircles();
  };

  componentDidUpdate = prevProps => {
    const { circles } = this.props;
    prevProps.circles !== circles && this.updateCircles();
  };

  updateCircles = () => {
    const { circles } = this.props;
    this.circle.attr('style', (d, i) => {
      return (!d.isValid || !circles[i].isVisible) && 'display:none';
    });
  };

  drawCircles = () => {
    let that = this;
    const { circles, imageURL } = this.props;
    const svg = d3.select(this.svg);
    const width = 800;
    const height = 400;
    const radius = 12;
    // const color = d3.scaleOrdinal().range(d3.schemeCategory20);
    svg.selectAll('circle').remove();
    svg.selectAll('text').remove();
    const tooltip = d3
      .select(this.svg.parentNode)
      .select('#tooltipWrapper')
      .select('.tooltip')
      .style('opacity', 0)
      .style('z-index', 9999)
      .style('position', 'relative')
      .style('background', '#fff');

    /**
     * function called when drag starts
     *
     */
    function dragstarted() {
      d3.select(this)
        .raise()
        .classed('active', true);
    }

    /**
     * Function called when dragging the circle
     * @param {*} d
     */
    function dragged(d,i) {
      tooltip.style('opacity', 0);
      const x = Math.max(radius, Math.min(width - radius, d3.event.x));
      const y = Math.max(radius, Math.min(height - radius, d3.event.y));
      // eslint-disable-next-line no-param-reassign
      d3.select(this).attr('transform', `translate(${(that.props.circles[i].xAxis = x)},${(that.props.circles[i].yAxis = y)})`);
      console.log(that);
    }

    /**
     * Function called after drag ends
     *
     */
    function dragended() {
      d3.select(this).classed('active', false);
    }
    if (imageURL) {
      const circle = svg
        .selectAll('circle')
        .data(this.props.circles)
        .enter()
        .append('g')
        .attr('cursor', 'pointer')
        .attr('transform', d => `translate(${d.xAxis},${d.yAxis})`)
        .attr('style', d => (!d.isValid || !d.isVisible) && 'display:none')
        .on('click', d => {
          if (d3.event.defaultPrevented) return;
          tooltip
            .html(`${d.componentName}<br/>${d.uniqueId}`)
            .style('display', 'block')
            .style('height', 'auto')
            .style('left', `${parseInt((d.xAxis * this.svg.clientWidth) / 800, 10) + 10}px`)
            .style('top', `${parseInt((d.yAxis * this.svg.clientHeight) / 400, 10) + 10}px`)
            .style('width', '150px')
            .style('opacity', 0.85)
            // .style('pointer-events', 'none')
            .style('text-align', 'center')
            .style('color', 'black')
            .style('border', '1px solid #000') // this.props.sensorsData && this.props.sensorsData[i].default_color)
            .style('background', 'white')
            .style('font-size', '1.4rem')
            .style('line-height', '1.2')
            .style('padding', '10px')
            .style('border-radius', '6px');
        })
        .call(
          d3
            .drag()
            .on('drag', dragged)
            .on('start', dragstarted)
            .on('end', dragended)
        );
      circle
        .append('circle')
        .attr('r', radius)
        .style('fill', '#0083ff');

      circle
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .attr('font-size', '16px')
        .attr('font-family', 'arial')
        .attr('dy', '0.35em')
        .html((d, i) => i + 1);
      this.circle = circle;
    }
  };

  render() {
    const { imageURL } = this.props;
    return (
      <div>
        <div style={{ position: 'absolute', width: 0, height: 0 }} id="tooltipWrapper">
          <div className="tooltip" />
        </div>
        <svg ref={ref => (this.svg = ref)} width="100%" viewBox="0 0 800 400" preserveAspectRatio="xMinYMin meet">
          <image xlinkHref={imageURL || '/images/upload_image.png'} width="100%" height="100%" />
        </svg>
      </div>
    );
  }
}

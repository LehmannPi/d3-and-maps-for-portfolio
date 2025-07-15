import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { BarChartData, ChartProps } from '../../types/chart';
import {
  getChartDimensions,
  createColorScale,
  formatValue,
} from '../../utils/chartUtils';

interface BarChartProps extends Omit<ChartProps, 'data'> {
  data: BarChartData[];
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  config,
  className = '',
  onDataPointClick,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    const dimensions = getChartDimensions(config);
    const { width, height, margin, innerWidth, innerHeight } = dimensions;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .range([innerHeight, 0]);

    const colorScale = createColorScale(data, config?.colors);

    // Axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => formatValue(Number(d)));

    g.append('g').attr('transform', `translate(0,${innerHeight})`).call(xAxis);

    g.append('g').call(yAxis);

    // Bars
    const bars = g
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.category) || 0)
      .attr('y', innerHeight)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', (d) => colorScale(d.id) as string)
      .style('cursor', 'pointer')
      .on('click', function (_event, d) {
        if (onDataPointClick) onDataPointClick(d);
        return null;
      });

    // Animate bars
    bars
      .transition()
      .duration(750)
      .attr('y', (d) => yScale(d.value))
      .attr('height', (d) => innerHeight - yScale(d.value));

    // Add value labels
    g.selectAll('.bar-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', (d) => (xScale(d.category) || 0) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.value) - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#333')
      .text((d) => formatValue(d.value));
  }, [data, config, onDataPointClick]);

  return (
    <div className={`bar-chart ${className}`}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

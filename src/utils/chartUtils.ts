import * as d3 from 'd3';
import type { ChartConfig, ChartData } from '../types/chart';

export const defaultChartConfig: ChartConfig = {
  width: 600,
  height: 400,
  margin: { top: 20, right: 30, bottom: 40, left: 60 },
  colors: [...d3.schemeCategory10],
  animate: true,
};

export const getChartDimensions = (config: Partial<ChartConfig> = {}) => {
  const finalConfig = { ...defaultChartConfig, ...config };
  const { width, height, margin } = finalConfig;

  return {
    width,
    height,
    margin,
    innerWidth: width - margin.left - margin.right,
    innerHeight: height - margin.top - margin.bottom,
  };
};

export const createColorScale = (data: ChartData[], colors?: string[]) => {
  const colorArray = colors || defaultChartConfig.colors || [];
  return d3
    .scaleOrdinal()
    .domain(data.map((d) => d.id))
    .range(colorArray);
};

export const formatValue = (value: number, format: string = ',') => {
  return d3.format(format)(value);
};

export const getMaxValue = (data: ChartData[]) => {
  return d3.max(data, (d) => d.value) || 0;
};

export const getMinValue = (data: ChartData[]) => {
  return d3.min(data, (d) => d.value) || 0;
};

export const createTransition = (duration: number = 750) => {
  return d3.transition().duration(duration).ease(d3.easeLinear);
};

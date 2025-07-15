export interface ChartData {
  id: string;
  value: number;
  label: string;
  color?: string;
}

export interface ChartConfig {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  colors?: string[];
  animate?: boolean;
}

export interface BarChartData extends ChartData {
  category: string;
}

export interface LineChartData {
  date: string | Date;
  value: number;
  category?: string;
}

export interface PieChartData extends ChartData {
  percentage?: number;
}

export interface ChartProps {
  data: ChartData[] | BarChartData[] | LineChartData[] | PieChartData[];
  config?: Partial<ChartConfig>;
  className?: string;
  onDataPointClick?: (data: ChartData) => void;
}

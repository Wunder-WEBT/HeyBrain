export interface PerformanceMetricChart {
  chartLabel: string[];
  data: number[][];
}

export abstract class PerformanceMetricChartData {
  abstract getPerformanceMetricChartData(period: string): PerformanceMetricChart;
}

export interface IMetricThreshold {
  id: number;
  metricId: number;
  greenMin: number;
  yellowMin: number;
  comparisonField: string;
  unit: 'percentage' | 'ratio' | 'count';
  isDefault: boolean;
  createdByUserId?: string;
}

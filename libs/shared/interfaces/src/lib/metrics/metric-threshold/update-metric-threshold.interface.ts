export interface IUpdateMetricThreshold {
  greenMin?: number;
  yellowMin?: number;
  comparisonField?: string;
  unit?: 'percentage' | 'ratio' | 'count';
  isDefault?: boolean;
  createdByUserId?: string;
}

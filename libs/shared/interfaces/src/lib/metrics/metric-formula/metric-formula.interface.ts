export interface IMetricFormula {
  id: number;
  metricId: number;
  expression: string;
  outputField: string;
  createdByUserId?: string;
}

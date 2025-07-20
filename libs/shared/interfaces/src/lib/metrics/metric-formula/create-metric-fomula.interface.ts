export interface ICreateMetricFormula {
  metricId: number;
  expression: string;
  outputField: string;
  createdByUserId?: string;
}

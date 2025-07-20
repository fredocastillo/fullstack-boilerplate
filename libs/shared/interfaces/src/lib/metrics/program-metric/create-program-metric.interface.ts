/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICreateProgramMetric {
  programId: number;
  metricId: number;
  reportingMonthId: number;
  rawData?: Record<string, any>;
}

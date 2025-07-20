/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusEnum } from '@shared/types';

export interface IProgramMetric {
  id: number;
  programId: number;
  metricId: number;
  reportingMonthId: number;
  rawData?: Record<string, any>;
  calculatedValue?: number;
  status?: StatusEnum;
}

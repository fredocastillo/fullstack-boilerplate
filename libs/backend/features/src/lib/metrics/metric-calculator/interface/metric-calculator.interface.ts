/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusEnum } from '@shared/types';

export interface MetricCalculator {
  calculate(rawData: Record<string, any>): {
    value: number;
    status: StatusEnum;
  };
}

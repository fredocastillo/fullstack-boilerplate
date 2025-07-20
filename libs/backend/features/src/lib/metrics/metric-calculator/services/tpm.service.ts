import { Injectable } from '@nestjs/common';
import { StatusEnum } from '@shared/types';
import { MetricCalculator } from '../interface/metric-calculator.interface';

@Injectable()
export class TpmCalculator implements MetricCalculator {
  calculate(rawData: { totalTPMs: number; metTPMs: number }) {
    const { totalTPMs, metTPMs } = rawData;
    const percentMet = (metTPMs / totalTPMs) * 100;

    if (percentMet >= 90)
      return { value: percentMet, status: StatusEnum.GREEN };
    if (percentMet >= 70)
      return { value: percentMet, status: StatusEnum.YELLOW };
    return { value: percentMet, status: StatusEnum.RED };
  }
}

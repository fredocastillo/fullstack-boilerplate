import { Injectable } from '@nestjs/common';
import { StatusEnum } from '@shared/types';
import { MetricCalculator } from '../interface/metric-calculator.interface';

@Injectable()
export class RequirementsStabilityCalculator implements MetricCalculator {
  calculate(rawData: { originalCount: number; totalChanged: number }) {
    const { originalCount, totalChanged } = rawData;
    const stabilityRatio = (originalCount - totalChanged) / originalCount;

    if (stabilityRatio >= 0.9)
      return { value: stabilityRatio, status: StatusEnum.GREEN };
    if (stabilityRatio >= 0.75)
      return { value: stabilityRatio, status: StatusEnum.YELLOW };
    return { value: stabilityRatio, status: StatusEnum.RED };
  }
}

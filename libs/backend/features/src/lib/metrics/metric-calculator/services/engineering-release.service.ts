import { Injectable } from '@nestjs/common';
import { StatusEnum } from '@shared/types';
import { MetricCalculator } from '../interface/metric-calculator.interface';

@Injectable()
export class EngineeringReleaseCalculator implements MetricCalculator {
  calculate(rawData: { plannedReleases: number; onTimeReleases: number }) {
    const { plannedReleases, onTimeReleases } = rawData;
    const percentOnTime = (onTimeReleases / plannedReleases) * 100;

    if (percentOnTime >= 90)
      return { value: percentOnTime, status: StatusEnum.GREEN };
    if (percentOnTime >= 75)
      return { value: percentOnTime, status: StatusEnum.YELLOW };
    return { value: percentOnTime, status: StatusEnum.RED };
  }
}

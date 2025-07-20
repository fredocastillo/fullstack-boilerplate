import { Injectable } from '@nestjs/common';
import { StatusEnum } from '@shared/types';
import { MetricCalculator } from '../interface/metric-calculator.interface';

@Injectable()
export class SoftwarePlanCalculator implements MetricCalculator {
  calculate(rawData: { plannedTasks: number; completedTasks: number }) {
    const { plannedTasks, completedTasks } = rawData;
    const percentCompleted = (completedTasks / plannedTasks) * 100;

    if (percentCompleted >= 90)
      return { value: percentCompleted, status: StatusEnum.GREEN };
    if (percentCompleted >= 70)
      return { value: percentCompleted, status: StatusEnum.YELLOW };
    return { value: percentCompleted, status: StatusEnum.RED };
  }
}

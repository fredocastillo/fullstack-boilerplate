import { Injectable } from '@nestjs/common';
import { StatusEnum } from '@shared/types';
import { MetricCalculator } from '../interface/metric-calculator.interface';

@Injectable()
export class VerificationTestingCalculator implements MetricCalculator {
  calculate(rawData: { plannedTests: number; passedTests: number }) {
    const { plannedTests, passedTests } = rawData;
    const percentPassed = (passedTests / plannedTests) * 100;

    if (percentPassed >= 90)
      return { value: percentPassed, status: StatusEnum.GREEN };
    if (percentPassed >= 75)
      return { value: percentPassed, status: StatusEnum.YELLOW };
    return { value: percentPassed, status: StatusEnum.RED };
  }
}

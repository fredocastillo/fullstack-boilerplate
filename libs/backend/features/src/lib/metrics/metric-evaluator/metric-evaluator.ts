/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { evaluate } from 'mathjs';
import { StatusEnum } from '@shared/types';
import { MetricFormulaService } from '../metric-formula/metric-fomula.service';
import { MetricThresholdService } from '../metric-threshold/metric-threshold.service';

export interface MetricValueStatus {
  value: number;
  status: StatusEnum;
}

@Injectable()
export class MetricEvaluatorService {
  constructor(
    private readonly formulaService: MetricFormulaService,
    private readonly thresholdService: MetricThresholdService
  ) {}

  async evaluateMetric(
    metricId: number,
    rawData: Record<string, any>
  ): Promise<MetricValueStatus> {
    const formula = await this.formulaService.findOne(metricId);
    const threshold = await this.thresholdService.findOne(metricId);

    let value: number;
    try {
      value = evaluate(formula.expression, rawData);
    } catch (err) {
      throw new Error(
        `Error evaluating formula for metric ${metricId}: ${err}`
      );
    }

    rawData[formula.outputField] = value;

    const comparisonValue = rawData[threshold.comparisonField];
    if (comparisonValue === undefined || comparisonValue === null) {
      throw new Error(
        `Comparison field '${threshold.comparisonField}' is missing in evaluated result for metric ${metricId}`
      );
    }

    let status: StatusEnum;
    if (comparisonValue >= threshold.greenMin) status = StatusEnum.GREEN;
    else if (comparisonValue >= threshold.yellowMin) status = StatusEnum.YELLOW;
    else status = StatusEnum.RED;

    return { value: comparisonValue, status };
  }
}

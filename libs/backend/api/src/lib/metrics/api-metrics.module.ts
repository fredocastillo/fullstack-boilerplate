import { Module } from '@nestjs/common';

import {
  MetricService,
  MetricFormulaService,
  MetricThresholdService,
  ProgramMetricService,
  ReportingMonthService,
} from '@backend/features';
import { MetricController } from './metric/metric.controller';
import { MetricFormulaController } from './metric-formula/metric-formula.controller';
import { MetricThresholdController } from './metric-threshold/metric-threshold.controller';
import { ProgramMetricController } from './program-metric/program-metric.controller';
import { ReportingMonthController } from './reporting-month/reporting-month.controller';

@Module({
  imports: [],
  controllers: [
    MetricController,
    MetricFormulaController,
    MetricThresholdController,
    ProgramMetricController,
    ReportingMonthController,
  ],
  providers: [
    MetricService,
    MetricFormulaService,
    MetricThresholdService,
    ProgramMetricService,
    ReportingMonthService,
  ],
})
export class ApiMetricsModule {}

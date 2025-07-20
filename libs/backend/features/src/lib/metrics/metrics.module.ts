import { Module } from '@nestjs/common';
import { MetricCalculatorModule } from './metric-calculator/metric-calculator.module';
import { MetricService } from './metric/metric.service';
import { MetricFormulaService } from './metric-formula/metric-fomula.service';
import { MetricThresholdService } from './metric-threshold/metric-threshold.service';
import { ProgramMetricService } from './program-metric/program-metric.service';
import { ReportingMonthService } from './reporting-month/reporting-month.service';
import { MetricEvaluatorService } from './metric-evaluator/metric-evaluator';

@Module({
  imports: [MetricCalculatorModule],
  providers: [
    MetricService,
    MetricFormulaService,
    MetricThresholdService,
    ProgramMetricService,
    ReportingMonthService,
    MetricEvaluatorService,
  ],
  exports: [
    MetricService,
    MetricFormulaService,
    MetricThresholdService,
    ProgramMetricService,
    ReportingMonthService,
    MetricEvaluatorService,
  ],
})
export class MetricsModule {}

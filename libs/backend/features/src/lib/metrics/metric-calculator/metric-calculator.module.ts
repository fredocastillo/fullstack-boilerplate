import { Module } from '@nestjs/common';
import { RequirementsStabilityCalculator } from './services/requirements-stability.service';
import { TpmCalculator } from './services/tpm.service';
import { EngineeringReleaseCalculator } from './services/engineering-release.service';
import { SoftwarePlanCalculator } from './services/software-plan.service';
import { VerificationTestingCalculator } from './services/verification-testing.service';

@Module({
  providers: [
    RequirementsStabilityCalculator,
    TpmCalculator,
    EngineeringReleaseCalculator,
    SoftwarePlanCalculator,
    VerificationTestingCalculator,
  ],
  exports: [
    RequirementsStabilityCalculator,
    TpmCalculator,
    EngineeringReleaseCalculator,
    SoftwarePlanCalculator,
    VerificationTestingCalculator,
  ],
})
export class MetricCalculatorModule {}

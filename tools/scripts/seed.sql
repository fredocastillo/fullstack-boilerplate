
-- 1. Insert Business Areas
INSERT INTO business_area (id, name) VALUES
(1, 'Defense'),
(2, 'Aerospace');

-- 2. Insert LOBs
INSERT INTO lob (id, name, "businessAreaId") VALUES
(1, 'Radar Systems', 1),
(2, 'Missile Systems', 1),
(3, 'Flight Avionics', 2);

-- 3. Insert Programs
INSERT INTO program (id, name, "lobId") VALUES
(1, 'EagleEye', 1),
(2, 'SkyTracker', 2),
(3, 'OrionNav', 3);

INSERT INTO metric (id, name, type) VALUES
(1, 'Requirements Stability', 'leading'),
(2, 'TPM/KPP', 'leading'),
(3, 'Engineering Release', 'lagging'),
(4, 'Software Performance to Plan', 'lagging'),
(5, 'Verification Testing', 'lagging')
-- (6, 'Technical Score', 'calculated');  -- optional calculated metric

INSERT INTO reporting_month (id, "monthStart") VALUES
(1, '2025-06-01'),
(2, '2025-07-01');

INSERT INTO program_metric (id, "programId", "metricId", "monthId", "calculatedValue", status,"rawData") VALUES
-- EagleEye in June
(1, 1, 1, 1, 0.9, 'G', '{"totalRequirements": 100, "changedRequirements": 10}'),
(2, 1, 2, 1, 0.85, 'Y', '{"achievedTPMs": 17, "totalTPMs": 20}'),
(3, 1, 3, 1, 0.6, 'R', '{"engineeringReleased": 12, "engineeringPlanned": 20}'),
(4, 1, 4, 1, 0.75, 'Y', '{"completedSP": 30, "plannedSP": 40}'),
(5, 1, 5, 1, 0.95, 'G', '{"testsPassed": 95, "totalTests": 100}'),
-- SkyTracker in July
(6, 2, 1, 2, 0.95, 'G', '{"totalRequirements": 200, "changedRequirements": 10}'),
(7, 2, 2, 2, 0.92, 'G', '{"achievedTPMs": 46, "totalTPMs": 50}'),
(8, 2, 3, 2, 0.82, 'Y', '{"engineeringReleased": 41, "engineeringPlanned": 50}'),
(9, 2, 4, 2, 0.79, 'Y', '{"completedSP": 79, "plannedSP": 100}'),
(10, 2, 5, 2, 0.88, 'G', '{"testsPassed": 88, "totalTests": 100}');


INSERT INTO metric_threshold (
  id, "metricId", "greenMin", "yellowMin", "comparisonField", unit, "isDefault", "createdByUserId"
) VALUES
(1, 1, 0.9, 0.75, 'requirementsStability', 'ratio', true, 'admin'), -- Requirements Stability
(2, 2, 0.95, 0.8, 'tpmScore', 'ratio', true, 'admin'),              -- TPM/KPP
(3, 3, 0.9, 0.75, 'engineeringReleaseScore', 'ratio', true, 'admin'), -- Engineering Release
(4, 4, 0.9, 0.75, 'softwarePerformanceScore', 'ratio', true, 'admin'), -- Software Performance to Plan
(5, 5, 0.9, 0.75, 'verificationTestingScore', 'percentage', true, 'admin'); -- Verification Testing


INSERT INTO metric_formula (id, "metricId", expression, "outputField", "createdByUserId") VALUES
(1, 1, '(totalRequirements - changedRequirements) / totalRequirements', 'requirementsStability', 'admin'),
(2, 2, 'achievedTPMs / totalTPMs', 'tpmScore', 'admin'),
(3, 3, 'engineeringReleased / engineeringPlanned', 'engineeringReleaseScore', 'admin'),
(4, 4, 'completedSP / plannedSP', 'softwarePerformanceScore', 'admin'),
(5, 5, 'testsPassed / totalTests', 'verificationTestingScore', 'admin');


SELECT id,name FROM business_area;

SELECT id,name,"businessAreaId" FROM lob;

SELECT id,name,"type" FROM metric;

SELECT id,expression,"outputField","createdByUserId","metricId" FROM metric_formula;

SELECT id,"greenMin","yellowMin","comparisonField",unit,"isDefault","createdByUserId","metricId" FROM metric_threshold;

SELECT id,name,"lobId" FROM program;

SELECT id,"rawData","calculatedValue",status,"programId","monthId","metricId" FROM program_metric;

SELECT id,"monthStart" FROM reporting_month;
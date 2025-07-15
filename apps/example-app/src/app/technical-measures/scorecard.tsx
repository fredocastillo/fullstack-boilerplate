import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Calendar,
  Filter,
  Download,
  RefreshCw,
  FileText,
  Grid,
  TableIcon,
  TrendingUp,
  Database,
  Info,
  BarChart3,
  Table,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ToggleGroup,
  ToggleGroupItem,
} from '@frontend/ui';
import { Page, PageHeader } from '@frontend/components';

// Types for our metric data
interface MetricData {
  id: string;
  businessArea: string;
  lob: string;
  programName: string;
  notes: string;
  cpiItd: number;
  spiItd: number;
  technicalScore: 'R' | 'Y' | 'G' | 'NA' | 'NS';
  requirementStability: 'R' | 'Y' | 'G' | 'NA' | 'NS';
  tpmsKpps: 'R' | 'Y' | 'G' | 'NA' | 'NS';
  engineeringRelease: 'R' | 'Y' | 'G' | 'NA' | 'NS';
  swPerformance: 'R' | 'Y' | 'G' | 'NA' | 'NS';
  verificationTesting: 'R' | 'Y' | 'G' | 'NA' | 'NS';
  corporateReportable: boolean;
  hotProgram: boolean;
}

// Sample data
const sampleData: MetricData[] = [
  {
    id: '1',
    businessArea: 'Defense Systems',
    lob: 'Missile Defense',
    programName: 'Aegis Ballistic Missile Defense',
    notes:
      'On track for Q2 milestone. Integration testing proceeding as planned. Minor delays in software component delivery but overall schedule maintained. Risk mitigation strategies in place for potential supply chain disruptions.',
    cpiItd: 0.95,
    spiItd: 1.02,
    technicalScore: 'G',
    requirementStability: 'Y',
    tpmsKpps: 'G',
    engineeringRelease: 'G',
    swPerformance: 'Y',
    verificationTesting: 'G',
    corporateReportable: true,
    hotProgram: false,
  },
  {
    id: '2',
    businessArea: 'Space Systems',
    lob: 'Satellite Communications',
    programName: 'Next-Gen SATCOM',
    notes:
      'Risk mitigation in progress for critical path items. Technical review board has identified three high-priority issues requiring immediate attention. Additional resources allocated to resolve antenna performance concerns.',
    cpiItd: 0.88,
    spiItd: 0.92,
    technicalScore: 'R',
    requirementStability: 'R',
    tpmsKpps: 'Y',
    engineeringRelease: 'R',
    swPerformance: 'R',
    verificationTesting: 'Y',
    corporateReportable: true,
    hotProgram: true,
  },
  {
    id: '3',
    businessArea: 'Cyber Security',
    lob: 'Network Defense',
    programName: 'Advanced Threat Detection',
    notes:
      'Ahead of schedule with all major milestones completed early. Excellent team performance and stakeholder satisfaction. Considering acceleration of Phase 2 activities due to strong progress.',
    cpiItd: 1.05,
    spiItd: 1.12,
    technicalScore: 'G',
    requirementStability: 'G',
    tpmsKpps: 'G',
    engineeringRelease: 'G',
    swPerformance: 'G',
    verificationTesting: 'G',
    corporateReportable: false,
    hotProgram: false,
  },
  {
    id: '4',
    businessArea: 'Defense Systems',
    lob: 'Air Defense',
    programName: 'Patriot Modernization',
    notes:
      'Technical challenges identified in radar subsystem integration. Working closely with vendor to resolve compatibility issues. Schedule impact being assessed with potential 2-week delay in testing phase.',
    cpiItd: 0.91,
    spiItd: 0.89,
    technicalScore: 'Y',
    requirementStability: 'Y',
    tpmsKpps: 'R',
    engineeringRelease: 'Y',
    swPerformance: 'Y',
    verificationTesting: 'R',
    corporateReportable: true,
    hotProgram: true,
  },
  {
    id: '5',
    businessArea: 'Intelligence Systems',
    lob: 'Signal Intelligence',
    programName: 'SIGINT Platform Alpha',
    notes:
      'Program not yet started. Awaiting final contract approval and security clearance processing for key personnel. Expected start date moved to Q2 2024.',
    cpiItd: 0.0,
    spiItd: 0.0,
    technicalScore: 'NS',
    requirementStability: 'NS',
    tpmsKpps: 'NS',
    engineeringRelease: 'NS',
    swPerformance: 'NS',
    verificationTesting: 'NS',
    corporateReportable: false,
    hotProgram: false,
  },
  {
    id: '6',
    businessArea: 'Naval Systems',
    lob: 'Surface Warfare',
    programName: 'DDG-51 Flight III',
    notes:
      'Integration testing phase proceeding well. Combat system integration showing positive results. Minor issues with power distribution system resolved. On track for sea trials next quarter.',
    cpiItd: 1.08,
    spiItd: 0.97,
    technicalScore: 'G',
    requirementStability: 'G',
    tpmsKpps: 'Y',
    engineeringRelease: 'G',
    swPerformance: 'G',
    verificationTesting: 'Y',
    corporateReportable: true,
    hotProgram: false,
  },
  {
    id: '7',
    businessArea: 'Space Systems',
    lob: 'Launch Systems',
    programName: 'Heavy Lift Vehicle',
    notes:
      'Requirements not applicable for certain metrics due to program phase. Currently in preliminary design review. Software performance metrics not yet relevant at this stage of development.',
    cpiItd: 0.93,
    spiItd: 0.88,
    technicalScore: 'Y',
    requirementStability: 'NA',
    tpmsKpps: 'R',
    engineeringRelease: 'Y',
    swPerformance: 'NA',
    verificationTesting: 'R',
    corporateReportable: false,
    hotProgram: true,
  },
];

// Generate sample requirements stability data for a specific program
const generateRequirementsData = (programId: string, period: string) => {
  const baseData = [
    {
      period: 'Week 1',
      approved: 245,
      plan: 280,
      deleted: 12,
      modified: 18,
      new: 25,
    },
    {
      period: 'Week 2',
      approved: 268,
      plan: 285,
      deleted: 8,
      modified: 22,
      new: 15,
    },
    {
      period: 'Week 3',
      approved: 275,
      plan: 290,
      deleted: 15,
      modified: 20,
      new: 30,
    },
    {
      period: 'Week 4',
      approved: 285,
      plan: 295,
      deleted: 10,
      modified: 25,
      new: 20,
    },
    {
      period: 'Week 5',
      approved: 290,
      plan: 300,
      deleted: 5,
      modified: 15,
      new: 25,
    },
    {
      period: 'Week 6',
      approved: 295,
      plan: 305,
      deleted: 8,
      modified: 18,
      new: 22,
    },
    {
      period: 'Week 7',
      approved: 302,
      plan: 310,
      deleted: 12,
      modified: 20,
      new: 28,
    },
    {
      period: 'Week 8',
      approved: 308,
      plan: 315,
      deleted: 6,
      modified: 16,
      new: 18,
    },
  ];

  const programMultiplier =
    programId === '1' ? 1.2 : programId === '2' ? 0.8 : 1.0;
  const adjustedData = baseData.map((item) => ({
    ...item,
    approved: Math.round(item.approved * programMultiplier),
    plan: Math.round(item.plan * programMultiplier),
    deleted: Math.round(item.deleted * programMultiplier),
    modified: Math.round(item.modified * programMultiplier),
    new: Math.round(item.new * programMultiplier),
  }));

  switch (period) {
    case '2weeks':
      return adjustedData
        .filter((_, index) => index % 2 === 0)
        .map((item, index) => ({
          ...item,
          period: `Period ${index + 1} (2 weeks)`,
        }));
    case '3weeks':
      return adjustedData
        .filter((_, index) => index % 3 === 0)
        .map((item, index) => ({
          ...item,
          period: `Period ${index + 1} (3 weeks)`,
        }));
    case '4weeks':
      return adjustedData
        .filter((_, index) => index % 4 === 0)
        .map((item, index) => ({
          ...item,
          period: `Period ${index + 1} (4 weeks)`,
        }));
    default:
      return adjustedData;
  }
};

// Generate TPMs/KPPs data
const generateTPMsData = (programId: string, period: string) => {
  const baseData = [
    { period: 'Week 1', met: 85, atRisk: 10, notMet: 5, total: 100 },
    { period: 'Week 2', met: 88, atRisk: 8, notMet: 4, total: 100 },
    { period: 'Week 3', met: 82, atRisk: 12, notMet: 6, total: 100 },
    { period: 'Week 4', met: 90, atRisk: 7, notMet: 3, total: 100 },
    { period: 'Week 5', met: 87, atRisk: 9, notMet: 4, total: 100 },
    { period: 'Week 6', met: 92, atRisk: 6, notMet: 2, total: 100 },
    { period: 'Week 7', met: 89, atRisk: 8, notMet: 3, total: 100 },
    { period: 'Week 8', met: 94, atRisk: 4, notMet: 2, total: 100 },
  ];

  const programMultiplier =
    programId === '1' ? 1.1 : programId === '2' ? 0.9 : 1.0;
  return baseData.map((item) => ({
    ...item,
    met: Math.round(item.met * programMultiplier),
    atRisk: Math.round(item.atRisk * (2 - programMultiplier)),
    notMet: Math.round(item.notMet * (2 - programMultiplier)),
  }));
};

// Generate Engineering Release data
const generateEngineeringReleaseData = (programId: string, period: string) => {
  const baseData = [
    { period: 'Week 1', planned: 25, released: 22, delayed: 3, cancelled: 0 },
    { period: 'Week 2', planned: 30, released: 28, delayed: 2, cancelled: 0 },
    { period: 'Week 3', planned: 28, released: 24, delayed: 3, cancelled: 1 },
    { period: 'Week 4', planned: 35, released: 33, delayed: 2, cancelled: 0 },
    { period: 'Week 5', planned: 32, released: 30, delayed: 2, cancelled: 0 },
    { period: 'Week 6', planned: 40, released: 37, delayed: 2, cancelled: 1 },
    { period: 'Week 7', planned: 38, released: 36, delayed: 2, cancelled: 0 },
    { period: 'Week 8', planned: 42, released: 40, delayed: 2, cancelled: 0 },
  ];

  const programMultiplier =
    programId === '1' ? 1.2 : programId === '2' ? 0.8 : 1.0;
  return baseData.map((item) => ({
    ...item,
    planned: Math.round(item.planned * programMultiplier),
    released: Math.round(item.released * programMultiplier),
    delayed: Math.round(item.delayed * (2 - programMultiplier)),
    cancelled: Math.round(item.cancelled * (2 - programMultiplier)),
  }));
};

// Generate SW Performance data
const generateSWPerformanceData = (programId: string, period: string) => {
  const baseData = [
    {
      period: 'Week 1',
      completed: 78,
      inProgress: 15,
      blocked: 7,
      velocity: 85,
    },
    {
      period: 'Week 2',
      completed: 82,
      inProgress: 12,
      blocked: 6,
      velocity: 88,
    },
    {
      period: 'Week 3',
      completed: 75,
      inProgress: 18,
      blocked: 7,
      velocity: 82,
    },
    {
      period: 'Week 4',
      completed: 88,
      inProgress: 10,
      blocked: 2,
      velocity: 92,
    },
    {
      period: 'Week 5',
      completed: 85,
      inProgress: 12,
      blocked: 3,
      velocity: 89,
    },
    {
      period: 'Week 6',
      completed: 90,
      inProgress: 8,
      blocked: 2,
      velocity: 94,
    },
    {
      period: 'Week 7',
      completed: 87,
      inProgress: 11,
      blocked: 2,
      velocity: 91,
    },
    {
      period: 'Week 8',
      completed: 92,
      inProgress: 6,
      blocked: 2,
      velocity: 96,
    },
  ];

  const programMultiplier =
    programId === '1' ? 1.1 : programId === '2' ? 0.85 : 1.0;
  return baseData.map((item) => ({
    ...item,
    completed: Math.round(item.completed * programMultiplier),
    inProgress: Math.round(item.inProgress * (2 - programMultiplier)),
    blocked: Math.round(item.blocked * (2 - programMultiplier)),
    velocity: Math.round(item.velocity * programMultiplier),
  }));
};

// Generate Verification Testing data
const generateVerificationData = (programId: string, period: string) => {
  const baseData = [
    { period: 'Week 1', passed: 145, failed: 12, pending: 23, coverage: 87 },
    { period: 'Week 2', passed: 158, failed: 8, pending: 19, coverage: 89 },
    { period: 'Week 3', passed: 162, failed: 15, pending: 18, coverage: 85 },
    { period: 'Week 4', passed: 175, failed: 10, pending: 15, coverage: 91 },
    { period: 'Week 5', passed: 182, failed: 8, pending: 12, coverage: 93 },
    { period: 'Week 6', passed: 195, failed: 6, pending: 9, coverage: 95 },
    { period: 'Week 7', passed: 201, failed: 9, pending: 8, coverage: 94 },
    { period: 'Week 8', passed: 215, failed: 5, pending: 6, coverage: 97 },
  ];

  const programMultiplier =
    programId === '1' ? 1.15 : programId === '2' ? 0.9 : 1.0;
  return baseData.map((item) => ({
    ...item,
    passed: Math.round(item.passed * programMultiplier),
    failed: Math.round(item.failed * (2 - programMultiplier)),
    pending: Math.round(item.pending * (2 - programMultiplier)),
    coverage: Math.round(item.coverage * programMultiplier),
  }));
};

const requirementsSeriesDescriptions = [
  {
    field: 'Approved',
    color: 'bg-green-500',
    description: 'Requirements that have been formally approved and baselined',
  },
  {
    field: 'Plan',
    color: 'bg-blue-500',
    description: 'Total planned requirements for the given period',
  },
  {
    field: 'Deleted',
    color: 'bg-red-500',
    description: 'Requirements that have been removed from the baseline',
  },
  {
    field: 'Modified',
    color: 'bg-yellow-500',
    description: 'Requirements that have been changed from their original form',
  },
  {
    field: 'New',
    color: 'bg-purple-500',
    description: 'Newly added requirements during the period',
  },
];

const tpmsSeriesDescriptions = [
  {
    field: 'Met',
    color: 'bg-green-500',
    description:
      'Technical Performance Measures and Key Performance Parameters that are meeting targets',
  },
  {
    field: 'At Risk',
    color: 'bg-yellow-500',
    description:
      'TPMs/KPPs that are approaching threshold limits and require attention',
  },
  {
    field: 'Not Met',
    color: 'bg-red-500',
    description:
      'TPMs/KPPs that are not meeting minimum acceptable performance levels',
  },
];

const engineeringSeriesDescriptions = [
  {
    field: 'Planned',
    color: 'bg-blue-500',
    description: 'Total number of engineering releases planned for the period',
  },
  {
    field: 'Released',
    color: 'bg-green-500',
    description:
      'Engineering releases that were successfully completed and delivered',
  },
  {
    field: 'Delayed',
    color: 'bg-yellow-500',
    description:
      'Releases that missed their planned delivery date but are still active',
  },
  {
    field: 'Cancelled',
    color: 'bg-red-500',
    description:
      'Planned releases that were cancelled or indefinitely postponed',
  },
];

const swPerformanceSeriesDescriptions = [
  {
    field: 'Completed',
    color: 'bg-green-500',
    description:
      'Software features and tasks that have been completed and delivered',
  },
  {
    field: 'In Progress',
    color: 'bg-blue-500',
    description: 'Software work items currently being developed',
  },
  {
    field: 'Blocked',
    color: 'bg-red-500',
    description: 'Software tasks that are blocked by dependencies or issues',
  },
  {
    field: 'Velocity',
    color: 'bg-purple-500',
    description: 'Team velocity metric showing overall productivity trend',
  },
];

const verificationSeriesDescriptions = [
  {
    field: 'Passed',
    color: 'bg-green-500',
    description:
      'Test cases that have passed verification and validation criteria',
  },
  {
    field: 'Failed',
    color: 'bg-red-500',
    description: 'Test cases that failed and require remediation',
  },
  {
    field: 'Pending',
    color: 'bg-yellow-500',
    description: 'Test cases that are scheduled but not yet executed',
  },
  {
    field: 'Coverage',
    color: 'bg-blue-500',
    description:
      'Percentage of system requirements covered by verification tests',
  },
];

// Status color mapping for scorecard cells
const getStatusCellStyle = (status: string) => {
  switch (status) {
    case 'R':
      return 'bg-red-500';
    case 'Y':
      return 'bg-yellow-500';
    case 'G':
      return 'bg-green-500';
    case 'NA':
      return 'bg-gray-500';
    case 'NS':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

const getTechnicalScoreColor = (score: string) => {
  switch (score) {
    case 'G':
      return 'text-green-400 bg-green-400/10 border-green-400';
    case 'Y':
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400';
    case 'R':
      return 'text-red-400 bg-red-400/10 border-red-400';
    case 'NA':
      return 'text-gray-400 bg-gray-400/10 border-gray-400';
    case 'NS':
      return 'text-blue-400 bg-blue-400/10 border-blue-400';
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400';
  }
};

// Requirements Stability Drill-down Component
const RequirementsStabilityDrilldown = ({
  program,
}: {
  program: MetricData;
}) => {
  const [displayPeriod, setDisplayPeriod] = useState('1week');
  const [activeTab, setActiveTab] = useState('chart');

  const data = generateRequirementsData(program.id, displayPeriod);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <BarChart3 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white font-light">
            Requirements Stability - {program.programName}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-light text-gray-300">
                    Display Period:
                  </label>
                  <Select
                    value={displayPeriod}
                    onValueChange={setDisplayPeriod}
                  >
                    <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="1week">Every Week</SelectItem>
                      <SelectItem value="2weeks">Every 2 Weeks</SelectItem>
                      <SelectItem value="3weeks">Every 3 Weeks</SelectItem>
                      <SelectItem value="4weeks">Every 4 Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white font-light">
                Requirements Stability Chart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="period"
                      stroke="#9CA3AF"
                      fontSize={12}
                      fontWeight="300"
                    />
                    <YAxis
                      stroke="#9CA3AF"
                      fontSize={12}
                      fontWeight="300"
                      label={{
                        value: 'Plan Values',
                        angle: -90,
                        position: 'insideLeft',
                        style: {
                          textAnchor: 'middle',
                          fill: '#9CA3AF',
                          fontWeight: '300',
                        },
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '6px',
                        color: '#F9FAFB',
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="deleted"
                      stackId="changes"
                      fill="#EF4444"
                      name="Deleted"
                    />
                    <Bar
                      dataKey="modified"
                      stackId="changes"
                      fill="#F59E0B"
                      name="Modified"
                    />
                    <Bar
                      dataKey="new"
                      stackId="changes"
                      fill="#8B5CF6"
                      name="New"
                    />
                    <Line
                      type="monotone"
                      dataKey="approved"
                      stroke="#10B981"
                      strokeWidth={3}
                      name="Approved"
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="plan"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      name="Plan"
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="px-6 pt-6">
                  <TabsList className="bg-gray-700 border-gray-600">
                    <TabsTrigger value="chart" className="font-light">
                      <Database className="w-4 h-4 mr-2" />
                      Data Table
                    </TabsTrigger>
                    <TabsTrigger value="usage" className="font-light">
                      <Info className="w-4 h-4 mr-2" />
                      Chart Usage
                    </TabsTrigger>
                    <TabsTrigger value="series" className="font-light">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Series Description
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6">
                  <TabsContent value="chart" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white">
                        Raw Data Table
                      </h3>
                      <div className="rounded-lg border border-gray-600 overflow-hidden">
                        <Table>
                          <TableHeader className="bg-gray-700">
                            <TableRow className="border-gray-600">
                              <TableHead className="text-gray-300 font-light">
                                Period
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Approved
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Plan
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Deleted
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Modified
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                New
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {data.map((row, index) => (
                              <TableRow key={index} className="border-gray-600">
                                <TableCell className="text-white font-light">
                                  {row.period}
                                </TableCell>
                                <TableCell className="text-green-400 font-light">
                                  {row.approved}
                                </TableCell>
                                <TableCell className="text-blue-400 font-light">
                                  {row.plan}
                                </TableCell>
                                <TableCell className="text-red-400 font-light">
                                  {row.deleted}
                                </TableCell>
                                <TableCell className="text-yellow-400 font-light">
                                  {row.modified}
                                </TableCell>
                                <TableCell className="text-purple-400 font-light">
                                  {row.new}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="usage" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white">
                        Chart Usage
                      </h3>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 font-light leading-relaxed">
                          The Requirements Stability Metric chart for{' '}
                          {program.programName} provides a comprehensive view of
                          how requirements change over time within this specific
                          program. This visualization combines both quantitative
                          tracking and trend analysis to help stakeholders
                          understand the stability and maturity of the
                          requirements baseline.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="series" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white">
                        Series Description
                      </h3>
                      <div className="grid gap-4">
                        {requirementsSeriesDescriptions.map((series) => (
                          <div
                            key={series.field}
                            className="flex items-start gap-3 p-4 rounded-lg bg-gray-700 border border-gray-600"
                          >
                            <div
                              className={`w-4 h-4 rounded ${series.color} mt-0.5 flex-shrink-0`}
                            ></div>
                            <div>
                              <h4 className="text-white font-light text-base">
                                {series.field}
                              </h4>
                              <p className="text-gray-300 font-light text-sm mt-1">
                                {series.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// TPMs/KPPs Drill-down Component
const TPMsKPPsDrilldown = ({ program }: { program: MetricData }) => {
  const [displayPeriod, setDisplayPeriod] = useState('1week');
  const [activeTab, setActiveTab] = useState('chart');

  const data = generateTPMsData(program.id, displayPeriod);
  const pieData = [
    { name: 'Met', value: data[data.length - 1]?.met || 0, fill: '#10B981' },
    {
      name: 'At Risk',
      value: data[data.length - 1]?.atRisk || 0,
      fill: '#F59E0B',
    },
    {
      name: 'Not Met',
      value: data[data.length - 1]?.notMet || 0,
      fill: '#EF4444',
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <BarChart3 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white font-light">
            TPMs/KPPs Performance - {program.programName}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-light text-gray-300">
                    Display Period:
                  </label>
                  <Select
                    value={displayPeriod}
                    onValueChange={setDisplayPeriod}
                  >
                    <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="1week">Every Week</SelectItem>
                      <SelectItem value="2weeks">Every 2 Weeks</SelectItem>
                      <SelectItem value="3weeks">Every 3 Weeks</SelectItem>
                      <SelectItem value="4weeks">Every 4 Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white font-light">
                  TPMs/KPPs Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="period"
                        stroke="#9CA3AF"
                        fontSize={12}
                        fontWeight="300"
                      />
                      <YAxis stroke="#9CA3AF" fontSize={12} fontWeight="300" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '6px',
                          color: '#F9FAFB',
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="met"
                        stackId="1"
                        stroke="#10B981"
                        fill="#10B981"
                        name="Met"
                        fillOpacity={0.8}
                      />
                      <Area
                        type="monotone"
                        dataKey="atRisk"
                        stackId="1"
                        stroke="#F59E0B"
                        fill="#F59E0B"
                        name="At Risk"
                        fillOpacity={0.8}
                      />
                      <Area
                        type="monotone"
                        dataKey="notMet"
                        stackId="1"
                        stroke="#EF4444"
                        fill="#EF4444"
                        name="Not Met"
                        fillOpacity={0.8}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white font-light">
                  Current Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent ?? 0 * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="px-6 pt-6">
                  <TabsList className="bg-gray-700 border-gray-600">
                    <TabsTrigger value="chart" className="font-light">
                      <Database className="w-4 h-4 mr-2" />
                      Data Table
                    </TabsTrigger>
                    <TabsTrigger value="usage" className="font-light">
                      <Info className="w-4 h-4 mr-2" />
                      Chart Usage
                    </TabsTrigger>
                    <TabsTrigger value="series" className="font-light">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Series Description
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6">
                  <TabsContent value="chart" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white">
                        Raw Data Table
                      </h3>
                      <div className="rounded-lg border border-gray-600 overflow-hidden">
                        <Table>
                          <TableHeader className="bg-gray-700">
                            <TableRow className="border-gray-600">
                              <TableHead className="text-gray-300 font-light">
                                Period
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Met
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                At Risk
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Not Met
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Total
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {data.map((row, index) => (
                              <TableRow key={index} className="border-gray-600">
                                <TableCell className="text-white font-light">
                                  {row.period}
                                </TableCell>
                                <TableCell className="text-green-400 font-light">
                                  {row.met}
                                </TableCell>
                                <TableCell className="text-yellow-400 font-light">
                                  {row.atRisk}
                                </TableCell>
                                <TableCell className="text-red-400 font-light">
                                  {row.notMet}
                                </TableCell>
                                <TableCell className="text-blue-400 font-light">
                                  {row.total}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="usage" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white">
                        Chart Usage
                      </h3>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 font-light leading-relaxed">
                          The TPMs/KPPs Performance chart for{' '}
                          {program.programName} tracks Technical Performance
                          Measures and Key Performance Parameters over time.
                          This helps identify trends in system performance and
                          early warning indicators for potential issues.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="series" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white">
                        Series Description
                      </h3>
                      <div className="grid gap-4">
                        {tpmsSeriesDescriptions.map((series) => (
                          <div
                            key={series.field}
                            className="flex items-start gap-3 p-4 rounded-lg bg-gray-700 border border-gray-600"
                          >
                            <div
                              className={`w-4 h-4 rounded ${series.color} mt-0.5 flex-shrink-0`}
                            ></div>
                            <div>
                              <h4 className="text-white font-light text-base">
                                {series.field}
                              </h4>
                              <p className="text-gray-300 font-light text-sm mt-1">
                                {series.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Engineering Release Drill-down Component
const EngineeringReleaseDrilldown = ({ program }: { program: MetricData }) => {
  const [displayPeriod, setDisplayPeriod] = useState('1week');
  const [activeTab, setActiveTab] = useState('chart');

  const data = generateEngineeringReleaseData(program.id, displayPeriod);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <BarChart3 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white font-light">
            Engineering Release Performance - {program.programName}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-light text-gray-300">
                    Display Period:
                  </label>
                  <Select
                    value={displayPeriod}
                    onValueChange={setDisplayPeriod}
                  >
                    <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="1week">Every Week</SelectItem>
                      <SelectItem value="2weeks">Every 2 Weeks</SelectItem>
                      <SelectItem value="3weeks">Every 3 Weeks</SelectItem>
                      <SelectItem value="4weeks">Every 4 Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white font-light">
                Engineering Release Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="period"
                      stroke="#9CA3AF"
                      fontSize={12}
                      fontWeight="300"
                    />
                    <YAxis stroke="#9CA3AF" fontSize={12} fontWeight="300" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '6px',
                        color: '#F9FAFB',
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="delayed"
                      stackId="issues"
                      fill="#F59E0B"
                      name="Delayed"
                    />
                    <Bar
                      dataKey="cancelled"
                      stackId="issues"
                      fill="#EF4444"
                      name="Cancelled"
                    />
                    <Line
                      type="monotone"
                      dataKey="planned"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      name="Planned"
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="released"
                      stroke="#10B981"
                      strokeWidth={3}
                      name="Released"
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="px-6 pt-6">
                  <TabsList className="bg-gray-700 border-gray-600">
                    <TabsTrigger value="chart" className="font-light">
                      <Database className="w-4 h-4 mr-2" />
                      Data Table
                    </TabsTrigger>
                    <TabsTrigger value="usage" className="font-light">
                      <Info className="w-4 h-4 mr-2" />
                      Chart Usage
                    </TabsTrigger>
                    <TabsTrigger value="series" className="font-light">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Series Description
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6">
                  <TabsContent value="chart" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white">
                        Raw Data Table
                      </h3>
                      <div className="rounded-lg border border-gray-600 overflow-hidden">
                        <Table>
                          <TableHeader className="bg-gray-700">
                            <TableRow className="border-gray-600">
                              <TableHead className="text-gray-300 font-light">
                                Period
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Planned
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Released
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Delayed
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Cancelled
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {data.map((row, index) => (
                              <TableRow key={index} className="border-gray-600">
                                <TableCell className="text-white font-light">
                                  {row.period}
                                </TableCell>
                                <TableCell className="text-blue-400 font-light">
                                  {row.planned}
                                </TableCell>
                                <TableCell className="text-green-400 font-light">
                                  {row.released}
                                </TableCell>
                                <TableCell className="text-yellow-400 font-light">
                                  {row.delayed}
                                </TableCell>
                                <TableCell className="text-red-400 font-light">
                                  {row.cancelled}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="usage" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white">
                        Chart Usage
                      </h3>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 font-light leading-relaxed">
                          The Engineering Release Performance chart for{' '}
                          {program.programName} tracks the delivery performance
                          of engineering releases over time. This helps identify
                          bottlenecks and process improvements in the
                          engineering delivery pipeline.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="series" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white">
                        Series Description
                      </h3>
                      <div className="grid gap-4">
                        {engineeringSeriesDescriptions.map((series) => (
                          <div
                            key={series.field}
                            className="flex items-start gap-3 p-4 rounded-lg bg-gray-700 border border-gray-600"
                          >
                            <div
                              className={`w-4 h-4 rounded ${series.color} mt-0.5 flex-shrink-0`}
                            ></div>
                            <div>
                              <h4 className="text-white font-light text-base">
                                {series.field}
                              </h4>
                              <p className="text-gray-300 font-light text-sm mt-1">
                                {series.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// SW Performance Drill-down Component
const SWPerformanceDrilldown = ({ program }: { program: MetricData }) => {
  const [displayPeriod, setDisplayPeriod] = useState('1week');
  const [activeTab, setActiveTab] = useState('chart');

  const data = generateSWPerformanceData(program.id, displayPeriod);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <BarChart3 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white font-light">
            SW Performance / Feature Completion - {program.programName}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-light text-gray-300">
                    Display Period:
                  </label>
                  <Select
                    value={displayPeriod}
                    onValueChange={setDisplayPeriod}
                  >
                    <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="1week">Every Week</SelectItem>
                      <SelectItem value="2weeks">Every 2 Weeks</SelectItem>
                      <SelectItem value="3weeks">Every 3 Weeks</SelectItem>
                      <SelectItem value="4weeks">Every 4 Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white font-light">
                Software Development Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="period"
                      stroke="#9CA3AF"
                      fontSize={12}
                      fontWeight="300"
                    />
                    <YAxis stroke="#9CA3AF" fontSize={12} fontWeight="300" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '6px',
                        color: '#F9FAFB',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="completed" fill="#10B981" name="Completed" />
                    <Bar
                      dataKey="inProgress"
                      fill="#3B82F6"
                      name="In Progress"
                    />
                    <Bar dataKey="blocked" fill="#EF4444" name="Blocked" />
                    <Line
                      type="monotone"
                      dataKey="velocity"
                      stroke="#8B5CF6"
                      strokeWidth={3}
                      name="Velocity"
                      dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="px-6 pt-6">
                  <TabsList className="bg-gray-700 border-gray-600">
                    <TabsTrigger value="chart" className="font-light">
                      <Database className="w-4 h-4 mr-2" />
                      Data Table
                    </TabsTrigger>
                    <TabsTrigger value="usage" className="font-light">
                      <Info className="w-4 h-4 mr-2" />
                      Chart Usage
                    </TabsTrigger>
                    <TabsTrigger value="series" className="font-light">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Series Description
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6">
                  <TabsContent value="chart" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white">
                        Raw Data Table
                      </h3>
                      <div className="rounded-lg border border-gray-600 overflow-hidden">
                        <Table>
                          <TableHeader className="bg-gray-700">
                            <TableRow className="border-gray-600">
                              <TableHead className="text-gray-300 font-light">
                                Period
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Completed
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                In Progress
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Blocked
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Velocity
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {data.map((row, index) => (
                              <TableRow key={index} className="border-gray-600">
                                <TableCell className="text-white font-light">
                                  {row.period}
                                </TableCell>
                                <TableCell className="text-green-400 font-light">
                                  {row.completed}
                                </TableCell>
                                <TableCell className="text-blue-400 font-light">
                                  {row.inProgress}
                                </TableCell>
                                <TableCell className="text-red-400 font-light">
                                  {row.blocked}
                                </TableCell>
                                <TableCell className="text-purple-400 font-light">
                                  {row.velocity}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="usage" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white">
                        Chart Usage
                      </h3>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 font-light leading-relaxed">
                          The SW Performance / Feature Completion chart for{' '}
                          {program.programName} tracks software development
                          progress and team velocity over time. This helps
                          identify productivity trends and potential blockers in
                          the development process.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="series" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white">
                        Series Description
                      </h3>
                      <div className="grid gap-4">
                        {swPerformanceSeriesDescriptions.map((series) => (
                          <div
                            key={series.field}
                            className="flex items-start gap-3 p-4 rounded-lg bg-gray-700 border border-gray-600"
                          >
                            <div
                              className={`w-4 h-4 rounded ${series.color} mt-0.5 flex-shrink-0`}
                            ></div>
                            <div>
                              <h4 className="text-white font-light text-base">
                                {series.field}
                              </h4>
                              <p className="text-gray-300 font-light text-sm mt-1">
                                {series.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Verification Testing Drill-down Component
const VerificationTestingDrilldown = ({ program }: { program: MetricData }) => {
  const [displayPeriod, setDisplayPeriod] = useState('1week');
  const [activeTab, setActiveTab] = useState('chart');

  const data = generateVerificationData(program.id, displayPeriod);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <BarChart3 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white font-light">
            Verification Testing / System Acceptance - {program.programName}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-light text-gray-300">
                    Display Period:
                  </label>
                  <Select
                    value={displayPeriod}
                    onValueChange={setDisplayPeriod}
                  >
                    <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="1week">Every Week</SelectItem>
                      <SelectItem value="2weeks">Every 2 Weeks</SelectItem>
                      <SelectItem value="3weeks">Every 3 Weeks</SelectItem>
                      <SelectItem value="4weeks">Every 4 Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white font-light">
                Verification & Validation Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="period"
                      stroke="#9CA3AF"
                      fontSize={12}
                      fontWeight="300"
                    />
                    <YAxis
                      yAxisId="left"
                      stroke="#9CA3AF"
                      fontSize={12}
                      fontWeight="300"
                      label={{
                        value: 'Test Cases',
                        angle: -90,
                        position: 'insideLeft',
                        style: {
                          textAnchor: 'middle',
                          fill: '#9CA3AF',
                          fontWeight: '300',
                        },
                      }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#9CA3AF"
                      fontSize={12}
                      fontWeight="300"
                      label={{
                        value: 'Coverage %',
                        angle: 90,
                        position: 'insideRight',
                        style: {
                          textAnchor: 'middle',
                          fill: '#9CA3AF',
                          fontWeight: '300',
                        },
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '6px',
                        color: '#F9FAFB',
                      }}
                    />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="passed"
                      fill="#10B981"
                      name="Passed"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="failed"
                      fill="#EF4444"
                      name="Passed"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="failed"
                      fill="#EF4444"
                      name="Failed"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="pending"
                      fill="#F59E0B"
                      name="Pending"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="coverage"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      name="Coverage %"
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="px-6 pt-6">
                  <TabsList className="bg-gray-700 border-gray-600">
                    <TabsTrigger value="chart" className="font-light">
                      <Database className="w-4 h-4 mr-2" />
                      Data Table
                    </TabsTrigger>
                    <TabsTrigger value="usage" className="font-light">
                      <Info className="w-4 h-4 mr-2" />
                      Chart Usage
                    </TabsTrigger>
                    <TabsTrigger value="series" className="font-light">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Series Description
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6">
                  <TabsContent value="chart" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white">
                        Raw Data Table
                      </h3>
                      <div className="rounded-lg border border-gray-600 overflow-hidden">
                        <Table>
                          <TableHeader className="bg-gray-700">
                            <TableRow className="border-gray-600">
                              <TableHead className="text-gray-300 font-light">
                                Period
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Passed
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Failed
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Pending
                              </TableHead>
                              <TableHead className="text-gray-300 font-light">
                                Coverage %
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {data.map((row, index) => (
                              <TableRow key={index} className="border-gray-600">
                                <TableCell className="text-white font-light">
                                  {row.period}
                                </TableCell>
                                <TableCell className="text-green-400 font-light">
                                  {row.passed}
                                </TableCell>
                                <TableCell className="text-red-400 font-light">
                                  {row.failed}
                                </TableCell>
                                <TableCell className="text-yellow-400 font-light">
                                  {row.pending}
                                </TableCell>
                                <TableCell className="text-blue-400 font-light">
                                  {row.coverage}%
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="usage" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white">
                        Chart Usage
                      </h3>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 font-light leading-relaxed">
                          The Verification Testing / System Acceptance chart for{' '}
                          {program.programName} tracks the progress of
                          verification and validation activities. This helps
                          ensure system quality and readiness for deployment.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="series" className="mt-0">
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-white">
                        Series Description
                      </h3>
                      <div className="grid gap-4">
                        {verificationSeriesDescriptions.map((series) => (
                          <div
                            key={series.field}
                            className="flex items-start gap-3 p-4 rounded-lg bg-gray-700 border border-gray-600"
                          >
                            <div
                              className={`w-4 h-4 rounded ${series.color} mt-0.5 flex-shrink-0`}
                            ></div>
                            <div>
                              <h4 className="text-white font-light text-base">
                                {series.field}
                              </h4>
                              <p className="text-gray-300 font-light text-sm mt-1">
                                {series.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function MetricViewPage() {
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [businessAreaFilter, setBusinessAreaFilter] = useState('all');
  const [lobFilter, setLobFilter] = useState('all');
  const [corporateReportableOnly, setCorporateReportableOnly] = useState(false);
  const [hotProgramsOnly, setHotProgramsOnly] = useState(false);
  const [redYellowTechnicalOnly, setRedYellowTechnicalOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Get unique values for filters
  const businessAreas = useMemo(
    () =>
      Array.from(new Set(sampleData.map((item) => item.businessArea))).sort(),
    []
  );

  const lobs = useMemo(
    () => Array.from(new Set(sampleData.map((item) => item.lob))).sort(),
    []
  );

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    return sampleData.filter((item) => {
      if (
        businessAreaFilter !== 'all' &&
        item.businessArea !== businessAreaFilter
      )
        return false;
      if (lobFilter !== 'all' && item.lob !== lobFilter) return false;
      if (corporateReportableOnly && !item.corporateReportable) return false;
      if (hotProgramsOnly && !item.hotProgram) return false;
      if (redYellowTechnicalOnly && !['R', 'Y'].includes(item.technicalScore))
        return false;
      return true;
    });
  }, [
    businessAreaFilter,
    lobFilter,
    corporateReportableOnly,
    hotProgramsOnly,
    redYellowTechnicalOnly,
  ]);

  const renderTableView = () => (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2 text-gray-300 font-light bg-gray-800 border-r border-gray-700 w-32">
                  Business Area
                </th>
                <th className="text-left p-2 text-gray-300 font-light bg-gray-800 border-r border-gray-700 w-32">
                  LOB
                </th>
                <th className="text-left p-2 text-gray-300 font-light bg-gray-800 border-r border-gray-700 w-48">
                  Program Name
                </th>
                <th className="text-center p-2 text-gray-300 font-light bg-gray-800 border-r border-gray-700 w-16">
                  Notes
                </th>
                <th className="text-center p-2 text-gray-300 font-light bg-gray-800 border-r border-gray-700 w-24">
                  CPI(ITD)
                </th>
                <th className="text-center p-2 text-gray-300 font-light bg-gray-800 border-r border-gray-700 w-24">
                  SPI(ITD)
                </th>
                <th
                  className="text-center p-1 text-gray-300 font-light bg-gray-800 border-r border-gray-700"
                  style={{ width: '200px' }}
                >
                  Technical Score
                </th>
                <th
                  className="text-center p-1 text-gray-300 font-light bg-gray-800 border-r border-gray-700"
                  style={{ width: '200px' }}
                >
                  Requirement Stability
                </th>
                <th
                  className="text-center p-1 text-gray-300 font-light bg-gray-800 border-r border-gray-700"
                  style={{ width: '200px' }}
                >
                  TPMs/KPPs
                </th>
                <th
                  className="text-center p-1 text-gray-300 font-light bg-gray-800 border-r border-gray-700"
                  style={{ width: '200px' }}
                >
                  Engineering Release
                </th>
                <th
                  className="text-center p-1 text-gray-300 font-light bg-gray-800 border-r border-gray-700"
                  style={{ width: '200px' }}
                >
                  SW Performance
                </th>
                <th
                  className="text-center p-1 text-gray-300 font-light bg-gray-800"
                  style={{ width: '200px' }}
                >
                  Verification Testing
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-700 hover:bg-gray-800/30 ${
                    row.hotProgram ? 'bg-orange-900/10' : ''
                  }`}
                >
                  <td className="p-2 text-gray-300 font-light border-r border-gray-700 text-xs">
                    <div className="flex flex-col gap-1">
                      <span className="truncate">{row.businessArea}</span>
                      <div className="flex gap-1">
                        {row.corporateReportable && (
                          <Badge
                            variant="outline"
                            className="text-xs border-blue-500 text-blue-400 px-1 py-0"
                          >
                            CR
                          </Badge>
                        )}
                        {row.hotProgram && (
                          <Badge
                            variant="outline"
                            className="text-xs border-orange-500 text-orange-400 px-1 py-0"
                          >
                            HOT
                          </Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 text-gray-300 font-light border-r border-gray-700 text-xs truncate">
                    {row.lob}
                  </td>
                  <td className="p-2 text-gray-300 font-light font-medium border-r border-gray-700 text-sm">
                    {row.programName}
                  </td>
                  <td className="p-2 text-center border-r border-gray-700">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-white font-light">
                            Program Notes - {row.programName}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <p className="text-gray-300 font-light leading-relaxed">
                            {row.notes}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                  <td className="p-2 text-center border-r border-gray-700">
                    <span
                      className={`font-light text-sm ${
                        row.cpiItd >= 1.0
                          ? 'text-green-400'
                          : row.cpiItd >= 0.9
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    >
                      {row.cpiItd > 0 ? row.cpiItd.toFixed(2) : '-'}
                    </span>
                  </td>
                  <td className="p-2 text-center border-r border-gray-700">
                    <span
                      className={`font-light text-sm ${
                        row.spiItd >= 1.0
                          ? 'text-green-400'
                          : row.spiItd >= 0.9
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    >
                      {row.spiItd > 0 ? row.spiItd.toFixed(2) : '-'}
                    </span>
                  </td>
                  <td
                    className={`text-center text-white font-bold h-12 border-r border-gray-700 ${getStatusCellStyle(
                      row.technicalScore
                    )}`}
                    style={{ width: '200px' }}
                  >
                    {row.technicalScore}
                  </td>
                  <td
                    className={`text-center text-white font-bold h-12 border-r border-gray-700 ${getStatusCellStyle(
                      row.requirementStability
                    )}`}
                    style={{ width: '200px' }}
                  >
                    {row.requirementStability}
                  </td>
                  <td
                    className={`text-center text-white font-bold h-12 border-r border-gray-700 ${getStatusCellStyle(
                      row.tpmsKpps
                    )}`}
                    style={{ width: '200px' }}
                  >
                    {row.tpmsKpps}
                  </td>
                  <td
                    className={`text-center text-white font-bold h-12 border-r border-gray-700 ${getStatusCellStyle(
                      row.engineeringRelease
                    )}`}
                    style={{ width: '200px' }}
                  >
                    {row.engineeringRelease}
                  </td>
                  <td
                    className={`text-center text-white font-bold h-12 border-r border-gray-700 ${getStatusCellStyle(
                      row.swPerformance
                    )}`}
                    style={{ width: '200px' }}
                  >
                    {row.swPerformance}
                  </td>
                  <td
                    className={`text-center text-white font-bold h-12 ${getStatusCellStyle(
                      row.verificationTesting
                    )}`}
                    style={{ width: '200px' }}
                  >
                    {row.verificationTesting}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const renderCardView = () => (
    <div className="space-y-4">
      {filteredData.map((row) => (
        <Card
          key={row.id}
          className={`bg-gray-900 border-gray-800 ${
            row.hotProgram ? 'border-orange-500/50' : ''
          }`}
        >
          <CardContent className="p-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Program Info Section */}
              <div className="col-span-3">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-white font-medium text-lg">
                      {row.programName}
                    </h3>
                    <div className="flex gap-2 mt-1">
                      {row.corporateReportable && (
                        <Badge
                          variant="outline"
                          className="text-xs border-blue-500 text-blue-400"
                        >
                          Corporate Reportable
                        </Badge>
                      )}
                      {row.hotProgram && (
                        <Badge
                          variant="outline"
                          className="text-xs border-orange-500 text-orange-400"
                        >
                          Hot Program
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="text-gray-400">
                      <span className="font-light">Business Area:</span>
                      <span className="text-gray-300 ml-2">
                        {row.businessArea}
                      </span>
                    </div>
                    <div className="text-gray-400">
                      <span className="font-light">LOB:</span>
                      <span className="text-gray-300 ml-2">{row.lob}</span>
                    </div>
                  </div>
                  <div className="pt-2 space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent w-full"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View Notes
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-white font-light">
                            Program Notes - {row.programName}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <p className="text-gray-300 font-light leading-relaxed">
                            {row.notes}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              {/* Key Performance Metrics */}
              <div className="col-span-4">
                <div className="space-y-4">
                  <h4 className="text-gray-300 font-light text-sm uppercase tracking-wide">
                    Key Performance Metrics
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="text-gray-400 text-xs font-light mb-1">
                        CPI (ITD)
                      </div>
                      <div
                        className={`text-2xl font-light ${
                          row.cpiItd >= 1.0
                            ? 'text-green-400'
                            : row.cpiItd >= 0.9
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        }`}
                      >
                        {row.cpiItd > 0 ? row.cpiItd.toFixed(2) : '-'}
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="text-gray-400 text-xs font-light mb-1">
                        SPI (ITD)
                      </div>
                      <div
                        className={`text-2xl font-light ${
                          row.spiItd >= 1.0
                            ? 'text-green-400'
                            : row.spiItd >= 0.9
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        }`}
                      >
                        {row.spiItd > 0 ? row.spiItd.toFixed(2) : '-'}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-gray-400 text-xs font-light mb-2">
                      Technical Score
                    </div>
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-md border font-medium ${getTechnicalScoreColor(
                        row.technicalScore
                      )}`}
                    >
                      {row.technicalScore}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Metrics Grid */}
              <div className="col-span-5">
                <div className="space-y-4">
                  <h4 className="text-gray-300 font-light text-sm uppercase tracking-wide">
                    Status Metrics
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="flex items-center justify-between text-gray-400 text-xs font-light mb-2">
                        <span>Req Stability</span>
                        <RequirementsStabilityDrilldown program={row} />
                      </div>
                      <div
                        className={`w-full h-12 flex items-center justify-center text-white font-bold rounded ${getStatusCellStyle(
                          row.requirementStability
                        )}`}
                      >
                        {row.requirementStability}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-between text-gray-400 text-xs font-light mb-2">
                        <span>TPMs/KPPs</span>
                        <TPMsKPPsDrilldown program={row} />
                      </div>
                      <div
                        className={`w-full h-12 flex items-center justify-center text-white font-bold rounded ${getStatusCellStyle(
                          row.tpmsKpps
                        )}`}
                      >
                        {row.tpmsKpps}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-between text-gray-400 text-xs font-light mb-2">
                        <span>Eng Release</span>
                        <EngineeringReleaseDrilldown program={row} />
                      </div>
                      <div
                        className={`w-full h-12 flex items-center justify-center text-white font-bold rounded ${getStatusCellStyle(
                          row.engineeringRelease
                        )}`}
                      >
                        {row.engineeringRelease}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-between text-gray-400 text-xs font-light mb-2">
                        <span>SW Performance</span>
                        <SWPerformanceDrilldown program={row} />
                      </div>
                      <div
                        className={`w-full h-12 flex items-center justify-center text-white font-bold rounded ${getStatusCellStyle(
                          row.swPerformance
                        )}`}
                      >
                        {row.swPerformance}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-between text-gray-400 text-xs font-light mb-2">
                        <span>Verification</span>
                        <VerificationTestingDrilldown program={row} />
                      </div>
                      <div
                        className={`w-full h-12 flex items-center justify-center text-white font-bold rounded ${getStatusCellStyle(
                          row.verificationTesting
                        )}`}
                      >
                        {row.verificationTesting}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <Page>
      <PageHeader
        title="Systems Engineering Metric View"
        details="Comprehensive view of program metrics and performance indicators"
      />
      {/* Controls Section */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white font-light flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-4">
            <Label className="text-gray-300 font-light">View Mode:</Label>
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(value) =>
                value && setViewMode(value as 'table' | 'cards')
              }
            >
              <ToggleGroupItem
                value="table"
                className="data-[state=on]:bg-gray-700"
              >
                <TableIcon className="h-4 w-4 mr-2" />
                Table
              </ToggleGroupItem>
              <ToggleGroupItem
                value="cards"
                className="data-[state=on]:bg-gray-700"
              >
                <Grid className="h-4 w-4 mr-2" />
                Cards
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Month Selection */}
          <div className="flex items-center gap-4">
            <Label className="text-gray-300 font-light flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Data Month:
            </Label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="2024-01">January 2024</SelectItem>
                <SelectItem value="2023-12">December 2023</SelectItem>
                <SelectItem value="2023-11">November 2023</SelectItem>
                <SelectItem value="2023-10">October 2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Standard Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-300 font-light">Business Area</Label>
              <Select
                value={businessAreaFilter}
                onValueChange={setBusinessAreaFilter}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All Business Areas</SelectItem>
                  {businessAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300 font-light">
                Line of Business
              </Label>
              <Select value={lobFilter} onValueChange={setLobFilter}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All LOBs</SelectItem>
                  {lobs.map((lob) => (
                    <SelectItem key={lob} value={lob}>
                      {lob}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="space-y-3">
            <Label className="text-gray-300 font-light">Quick Filters</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="corporate-reportable"
                  checked={corporateReportableOnly}
                  onCheckedChange={(checked) =>
                    setCorporateReportableOnly(checked === true)
                  }
                  className="border-gray-600"
                />
                <Label
                  htmlFor="corporate-reportable"
                  className="text-gray-300 font-light"
                >
                  Corporate Reportable Only
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hot-programs"
                  checked={hotProgramsOnly}
                  onCheckedChange={(checked) =>
                    setHotProgramsOnly(checked === true)
                  }
                  className="border-gray-600"
                />
                <Label
                  htmlFor="hot-programs"
                  className="text-gray-300 font-light"
                >
                  Hot Programs Only
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="red-yellow-technical"
                  checked={redYellowTechnicalOnly}
                  onCheckedChange={(checked) =>
                    setRedYellowTechnicalOnly(checked === true)
                  }
                  className="border-gray-600"
                />
                <Label
                  htmlFor="red-yellow-technical"
                  className="text-gray-300 font-light"
                >
                  Red/Yellow Technical Scores Only
                </Label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400 font-light">
          Showing {filteredData.length} of {sampleData.length} programs for{' '}
          {selectedMonth}
        </p>
      </div>

      {/* Dynamic View */}
      {viewMode === 'table' ? renderTableView() : renderCardView()}

      {/* Legend */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white font-light text-sm">
            Status Legend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 flex items-center justify-center text-white font-bold text-xs">
                G
              </div>
              <span className="text-gray-300 font-light">Green - On Track</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-500 flex items-center justify-center text-white font-bold text-xs">
                Y
              </div>
              <span className="text-gray-300 font-light">Yellow - At Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 flex items-center justify-center text-white font-bold text-xs">
                R
              </div>
              <span className="text-gray-300 font-light">Red - Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-500 flex items-center justify-center text-white font-bold text-xs">
                NA
              </div>
              <span className="text-gray-300 font-light">Not Applicable</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                NS
              </div>
              <span className="text-gray-300 font-light">Not Started</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Page>
  );
}

import { NavigationItem } from '@frontend/layout';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  HomeIcon,
  Building2,
  Layers,
  Target,
  Database,
  Cable,
  Calendar,
  AlertTriangle,
  ListOrdered,
  GitBranch,
  Link,
  CheckCircle,
  Star,
  Cog,
} from 'lucide-react';
import { NavigationGroup } from '@frontend/layout';

const appicationNav: NavigationItem[] = [
  {
    title: 'Home',
    icon: HomeIcon,
    href: '/',
  },
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
];

const systemEngineeringNav: NavigationItem[] = [
  {
    title: 'System Engineering',
    icon: Cog,
    children: [
      {
        title: 'Requirements Stability',
        href: '/systems-engineering/requirements-stability',
        icon: GitBranch,
      },
      {
        title: 'Requirements Traceability',
        href: '/systems-engineering/requirements-traceability',
        icon: Link,
      },
      {
        title: 'Requirements TBD/TBx Count',
        href: '/systems-engineering/requirements-tbd-count',
        icon: AlertTriangle,
      },
      {
        title: 'Verification Status',
        href: '/systems-engineering/verification-status',
        icon: CheckCircle,
      },
      {
        title: 'Customer Criticality',
        href: '/systems-engineering/customer-criticality',
        icon: Star,
      },
    ],
  },
];

const corporateNav: NavigationItem[] = [
  {
    title: 'Technical Measures',
    icon: LayoutDashboard,
    children: [
      {
        title: 'Scorecard',
        href: '/technical-measures/scorecard',
        icon: ListOrdered,
      },
    ],
  },
];

const adminNav: NavigationItem[] = [
  {
    title: 'Organization',
    icon: Building2,
    children: [
      {
        title: 'Business Areas',
        href: '/organization/business-areas',
        icon: Building2,
      },
      {
        title: 'Lines of Business',
        href: '/organization/lines-of-business',
        icon: Layers,
      },
      {
        title: 'Programs',
        href: '/organization/programs',
        icon: Target,
      },
    ],
  },
  {
    title: 'Metrics',
    icon: BarChart3,
    children: [
      {
        title: 'Metric Definitions',
        href: '/metrics/definitions',
        icon: FileText,
      },
      {
        title: 'Metric Configuration',
        href: '/metrics/configuration',
        icon: Settings,
      },
    ],
  },
  {
    title: 'Source Data Connectors',
    icon: Database,
    children: [
      {
        title: 'JDBC Connections',
        href: '/connectors/jdbc',
        icon: Database,
      },
      {
        title: 'Jira Integration',
        href: '/connectors/jira',
        icon: Cable,
      },
      {
        title: 'S3 Storage',
        href: '/connectors/s3',
        icon: Database,
      },
      {
        title: 'Scheduled Jobs',
        href: '/connectors/scheduled-jobs',
        icon: Calendar,
      },
    ],
  },
];

export const navigationGroups: NavigationGroup[] = [
  {
    name: '',
    items: appicationNav,
  },
  {
    name: 'Metrics',
    items: [...corporateNav, ...systemEngineeringNav],
  },
  {
    name: 'Admin',
    items: adminNav,
  },
];

import { NavigationItem } from '@frontend/layout';
import {
  LayoutDashboard,
  Users,
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
  Brain,
  TrendingUp,
  Eye,
  Lightbulb,
  Zap,
  MessageSquare,
  Shield,
  TrendingDown,
  Search,
  Award,
  AlertTriangle,
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

const adminNav: NavigationItem[] = [
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

const metricsNav: NavigationItem[] = [
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
    title: 'AI & Analytics',
    icon: Brain,
    children: [
      {
        title: 'Predictive Analytics',
        href: '/ai/predictive-analytics',
        icon: TrendingUp,
      },
      {
        title: 'Anomaly Detection',
        href: '/ai/anomaly-detection',
        icon: Eye,
      },
      {
        title: 'Automated Insights',
        href: '/ai/automated-insights',
        icon: Lightbulb,
      },
      {
        title: 'Smart Alerts',
        href: '/ai/smart-alerts',
        icon: Zap,
      },
      {
        title: 'Natural Language Query',
        href: '/ai/natural-language-query',
        icon: MessageSquare,
      },
      {
        title: 'Risk Prediction',
        href: '/ai/risk-prediction',
        icon: Shield,
      },
      {
        title: 'Performance Optimization',
        href: '/ai/performance-optimization',
        icon: TrendingDown,
      },
      {
        title: 'Data Discovery',
        href: '/ai/data-discovery',
        icon: Search,
      },
    ],
  },
  {
    title: 'Dashboards',
    icon: LayoutDashboard,
    children: [
      {
        title: 'Corporate Technical Measures',
        href: '/dashboards/corporate-technical-measures',
        icon: TrendingUp,
      },
      {
        title: 'Performance Analytics',
        href: '/dashboards/performance',
        icon: BarChart3,
      },
      {
        title: 'Quality Metrics',
        href: '/dashboards/quality-metrics',
        icon: Award,
      },
      {
        title: 'Resource Utilization',
        href: '/dashboards/resource-utilization',
        icon: Users,
      },
      {
        title: 'Risk Analysis',
        href: '/dashboards/risk-analysis',
        icon: AlertTriangle,
      },
      {
        title: 'Timeline Analysis',
        href: '/dashboards/timeline-analysis',
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
    items: metricsNav,
  },
  {
    name: 'Admin',
    items: adminNav,
  },
];

import { NavigationItem } from '@frontend/layout';
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Link2,
  UserCog,
  Settings,
  HelpCircle,
  Home,
} from 'lucide-react';

export const navigation: NavigationItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  {
    name: 'Cases',
    href: '/cases',
    icon: FileText,
    children: [
      { name: 'All Cases', href: '/cases' },
      { name: 'Create New Case', href: '/cases/new' },
      { name: 'Case Archive', href: '/cases/archive' },
    ],
  },
  {
    name: 'Jurors',
    href: '/jurors',
    icon: Users,
    children: [
      { name: 'Juror Pool', href: '/jurors' },
      { name: 'Add / Import Jurors', href: '/jurors/import' },
      { name: 'Juror Scoring', href: '/jurors/scoring' },
      { name: 'AI Recommendations', href: '/jurors/recommendations' },
    ],
  },
  {
    name: 'Reports & Analytics',
    href: '/reports',
    icon: BarChart3,
    children: [
      { name: 'Export Reports', href: '/reports/export' },
      { name: 'Scoring Summary', href: '/reports/scoring' },
      { name: 'Voir Dire History', href: '/reports/voir-dire' },
    ],
  },
  {
    name: 'Integrations',
    href: '/integrations',
    icon: Link2,
    children: [
      { name: 'Clio / PracticePanther', href: '/integrations/crm' },
      { name: 'API Settings', href: '/integrations/api' },
    ],
  },
  {
    name: 'Team & Permissions',
    href: '/team',
    icon: UserCog,
    children: [
      { name: 'Manage Users', href: '/team/users' },
      { name: 'Roles & Access', href: '/team/roles' },
    ],
  },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help & Support', href: '/help', icon: HelpCircle },
];

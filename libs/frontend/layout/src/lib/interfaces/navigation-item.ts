import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  title: string;
  href?: string;
  icon?: LucideIcon;
  children?: NavigationItem[];
}

export interface NavigationGroup {
  name: string;
  items: NavigationItem[];
}

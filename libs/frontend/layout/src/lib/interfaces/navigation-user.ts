import { NavigationItem } from './navigation-item';

export interface NavigationUser {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  jobTitle: string;
  navigation: NavigationItem[];
  avatar?: string;
}

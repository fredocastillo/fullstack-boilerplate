import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@frontend/ui';
import { NavigationArea } from '../interfaces/navigation-areas';
import NavHeader from '../nav-header/nav-header';
import { NavigationGroup } from '../interfaces/navigation-item';
import NavGroup from '../nav-group/nav-group';
import NavFooter from '../nav-footer/nav-footer';

export interface NavBarProps {
  name: string;
  logo: React.ElementType;
  areasName: string;
  areas: NavigationArea[];
  groups: NavigationGroup[];
}

export function NavBar({ name, logo, areasName, areas, groups }: NavBarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavHeader
          appName={name}
          appLogo={logo}
          areasName={areasName}
          areas={areas}
        />
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group, index) => (
          <NavGroup key={index} group={group} />
        ))}
      </SidebarContent>
      <SidebarFooter>{/* <NavFooter></NavFooter> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default NavBar;

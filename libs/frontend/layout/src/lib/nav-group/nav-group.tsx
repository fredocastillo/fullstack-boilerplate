import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@frontend/ui';
import { ChevronRight } from 'lucide-react';
import { NavigationGroup } from '../interfaces/navigation-item';
import { useLocation } from 'react-router-dom';

export interface NavGroupProps {
  group: NavigationGroup;
}

export function NavGroup({ group }: NavGroupProps) {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      {group.name && <SidebarGroupLabel>{group.name}</SidebarGroupLabel>}
      <SidebarMenu>
        {group.items.map((item) => {
          const hasChildren =
            Array.isArray(item.children) && item.children.length > 0;

          // Check if this item or any of its subitems is active
          const isItemActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const isSubItemActive = item.children?.some(
            (sub) =>
              pathname === sub.href || pathname.startsWith(`${sub.href}/`)
          );

          const isActive = isItemActive || isSubItemActive;

          if (hasChildren) {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children?.map((subItem) => {
                        const isSubActive =
                          pathname === subItem.href ||
                          pathname.startsWith(`${subItem.href}/`);
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a
                                href={subItem.href}
                                className={
                                  isSubActive
                                    ? 'font-semibold text-primary'
                                    : ''
                                }
                              >
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          } else {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a
                    href={item.href}
                    className={isItemActive ? 'font-semibold text-primary' : ''}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default NavGroup;

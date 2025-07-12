import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { NavigationItem } from '../interfaces/navigation-item';
import { Button } from '@frontend/ui';
import { cn } from '@frontend/utils';

export interface SidebarProps {
  navigation: NavigationItem[];
}

export function Sidebar({ navigation }: SidebarProps) {
  const { pathname } = useLocation();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col h-full">
      <div className="flex flex-col flex-grow border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold">Jury Selection</h1>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <div key={item.name} className="space-y-1">
                  <Link to={item.href}>
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      className={cn(
                        'w-full justify-start',
                        isActive ? 'bg-gray-100 dark:bg-gray-800' : ''
                      )}
                    >
                      {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                      {item.name}
                    </Button>
                  </Link>

                  {item.children && isActive && (
                    <div className="pl-10 space-y-1">
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href;

                        return (
                          <Link key={child.name} to={child.href}>
                            <Button
                              variant={isChildActive ? 'secondary' : 'ghost'}
                              size="sm"
                              className={cn(
                                'w-full justify-start text-sm',
                                isChildActive
                                  ? 'bg-gray-100 dark:bg-gray-800'
                                  : ''
                              )}
                            >
                              {child.name}
                            </Button>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
        <div className="px-4 mt-4">
          <Button className="w-full" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

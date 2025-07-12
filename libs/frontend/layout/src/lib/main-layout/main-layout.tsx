import { SidebarProvider } from '@frontend/ui';
import { Header } from '../header/header';
import { User } from '../interfaces/navigation-user';
import { ThemeProvider } from '@frontend/utils';
import { NavBar } from '../nav-bar/nav-bar';
import { NavigationArea } from '../interfaces/navigation-areas';
import { NavigationGroup } from '../interfaces/navigation-item';

export interface MainLayoutProps {
  user: User;
  name: string;
  logo: React.ElementType;
  areasName: string;
  areas: NavigationArea[];
  groups: NavigationGroup[];
  children: React.ReactNode;
}

export function MainLayout({
  user,
  name,
  logo,
  areasName,
  areas,
  groups,
  children,
}: MainLayoutProps) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <NavBar
            name={name}
            logo={logo}
            areasName={areasName}
            areas={areas}
            groups={groups}
          />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header user={user} />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white dark:bg-gray-950">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default MainLayout;

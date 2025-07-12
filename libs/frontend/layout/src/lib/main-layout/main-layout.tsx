import Header from '../header/header';
import { NavigationUser } from '../interfaces/navigation-user';
import Sidebar from '../sidebar/sidebar';
import { ThemeProvider } from '@frontend/utils';

export interface MainLayoutProps {
  children: React.ReactNode;
  user: NavigationUser;
}

export function MainLayout({ children, user }: MainLayoutProps) {
  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar navigation={user.navigation} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header user={user} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MainLayout;

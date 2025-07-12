import Header from '../header/header';
import { NavigationItem } from '../interfaces/navigation-item';
import Sidebar from '../sidebar/sidebar';
import { ThemeProvider } from '@frontend/utils';

export interface MainLayoutProps {
  children: React.ReactNode;
  navigation: NavigationItem[];
}

export function MainLayout({ children, navigation }: MainLayoutProps) {
  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar navigation={navigation} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MainLayout;

import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@frontend/layout';
import Dashboard from './dashboard/dashboard';
import Home from './home/home';

import { user } from './constants/user';
import { navigationGroups } from './constants/routes';
import { BarChart3 } from 'lucide-react';
import { areas } from './constants/areas';

export function App() {
  const name = 'Enterprise Metrics';
  const logo = BarChart3;
  const areasName = 'Business Areas';

  return (
    <MainLayout
      user={user}
      name={name}
      logo={logo}
      areasName={areasName}
      areas={areas}
      groups={navigationGroups}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import { MainLayout, NavigationUser } from '@frontend/layout';
import { navigation } from '../routes/routes';
import Dashboard from './dashboard/dashboard';
import Home from './home/home';

export function App() {
  const user: NavigationUser = {
    firstName: 'Alfredo',
    lastName: 'Castillo',
    displayName: 'Castillo, Alfredo',
    email: 'alfredo.castillo@gmail.com',
    jobTitle: 'Full Stack Engineer Staff',
    navigation,
  };
  return (
    <MainLayout user={user}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

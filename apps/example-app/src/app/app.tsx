import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@frontend/layout';
import { navigation } from '../routes/routes';
import Dashboard from './dashboard/dashboard';
import Home from './home/home';

export function App() {
  return (
    <MainLayout navigation={navigation}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

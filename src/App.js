import React, { useState, createContext, useContext } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import VehiclesPage from './pages/VehiclesPage';
import BrandsPage from './pages/BrandsPage';
import UsersPage from './pages/UsersPage';
import SalesPage from './pages/SalesPage';
import ReportsPage from './pages/ReportsPage';

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('vehicles');

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  const pages = {
    vehicles: <VehiclesPage />,
    brands: <BrandsPage />,
    users: <UsersPage />,
    sales: <SalesPage />,
    reports: <ReportsPage />,
  };

  if (!user) return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <LoginPage />
    </AuthContext.Provider>
  );

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <DashboardLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
        {pages[currentPage] || <VehiclesPage />}
      </DashboardLayout>
    </AuthContext.Provider>
  );
}

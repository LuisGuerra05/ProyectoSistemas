// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import PrivateRoute from './components/PrivateRoute';

import Dashboard from './pages/Dashboard';
import Quotations from './pages/Quotations';
import Orders from './pages/Orders';
import Inventory from './pages/Inventory';
import Profile from './pages/Profile';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta login con AuthLayout */}
        <Route
          path="/"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        {/* Rutas privadas con Layout */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/quotations"
          element={
            <Layout>
              <PrivateRoute>
                <Quotations />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/orders"
          element={
            <Layout>
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/inventory"
          element={
            <Layout>
              <PrivateRoute>
                <Inventory />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            </Layout>
          }
        />

        {/* Redirección fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import Dashboard from './pages/Dashboard';
import Quotations from './pages/Quotations';
import Orders from './pages/Orders';
import Inventory from './pages/Inventory';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

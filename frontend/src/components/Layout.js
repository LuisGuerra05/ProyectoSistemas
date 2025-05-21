// src/components/Layout.js
import React, { useEffect } from 'react';
import AppNavbar from './Navbar';
import Footer from './Footer';
import CotizacionesData from '../data/QuotationsData';
import PedidosData from '../data/PedidosData';
import InventarioData from '../data/InventoryData';

function Layout({ children }) {
  useEffect(() => {
    if (!localStorage.getItem('cotizaciones') || JSON.parse(localStorage.getItem('cotizaciones')).length === 0) {
      localStorage.setItem('cotizaciones', JSON.stringify(CotizacionesData));
    }

    if (!localStorage.getItem('pedidos') || JSON.parse(localStorage.getItem('pedidos')).length === 0) {
      localStorage.setItem('pedidos', JSON.stringify(PedidosData));
    }

    if (!localStorage.getItem('inventario') || JSON.parse(localStorage.getItem('inventario')).length === 0) {
      localStorage.setItem('inventario', JSON.stringify(InventarioData));
    }
  }, []);

  return (
    <div className="page-container">
      <AppNavbar />
      <div className="page-content">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

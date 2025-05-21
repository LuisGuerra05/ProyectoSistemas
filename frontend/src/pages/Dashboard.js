// src/pages/Dashboard.js

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function Dashboard() {
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('userRole');

  const [cotizaciones, setCotizaciones] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    const storedCotis = JSON.parse(localStorage.getItem('cotizaciones')) || [];
    const storedPedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const storedInventario = JSON.parse(localStorage.getItem('inventario')) || [];

    const visiblesCotis = role === 'admin' ? storedCotis : storedCotis.filter(c => c.asignadoA === email);
    const visiblesPedidos = role === 'admin' ? storedPedidos : storedPedidos.filter(p => p.asignadoA === email);

    setCotizaciones(visiblesCotis);
    setPedidos(visiblesPedidos);
    setInventario(storedInventario);
  }, [email, role]);

  const cotizacionesPorEstado = cotizaciones.reduce((acc, coti) => {
    acc[coti.estado] = (acc[coti.estado] || 0) + 1;
    return acc;
  }, {});

  const pedidosPorEstado = pedidos.reduce((acc, pedido) => {
    acc[pedido.estado] = (acc[pedido.estado] || 0) + 1;
    return acc;
  }, {});

  const productosBajoStock = inventario.filter(p => p.stock < 40).length;

  const chartCotizaciones = {
    labels: Object.keys(cotizacionesPorEstado),
    datasets: [
      {
        label: 'Cotizaciones por estado',
        data: Object.values(cotizacionesPorEstado),
        backgroundColor: ['#ffc107', '#0dcaf0', '#198754', '#dc3545'],
      }
    ]
  };

  const chartPedidos = {
    labels: Object.keys(pedidosPorEstado),
    datasets: [
      {
        label: 'Pedidos por estado',
        data: Object.values(pedidosPorEstado),
        backgroundColor: ['#ffc107', '#198754', '#6c757d'],
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <h2 className="mb-4">Resumen del Sistema</h2>

      <Row className="mb-4">
        <Col md={3}>
          <Card bg="light" className="text-center">
            <Card.Body>
              <Card.Title>Total Cotizaciones</Card.Title>
              <h3>{cotizaciones.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="light" className="text-center">
            <Card.Body>
              <Card.Title>Total Pedidos</Card.Title>
              <h3>{pedidos.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="light" className="text-center">
            <Card.Body>
              <Card.Title>Productos en Inventario</Card.Title>
              <h3>{inventario.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="light" className="text-center">
            <Card.Body>
              <Card.Title>Productos con Bajo Stock</Card.Title>
              <h3>{productosBajoStock}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="p-4 shadow-sm">
        <Row>
          <Col md={6}>
            <h5 className="mb-3">Cotizaciones por Estado</h5>
            <div style={{ height: '300px' }}>
              <Bar data={chartCotizaciones} options={chartOptions} />
            </div>
          </Col>
          <Col md={6}>
            <h5 className="mb-3">Pedidos por Estado</h5>
            <div style={{ height: '300px' }}>
              <Pie data={chartPedidos} options={chartOptions} />
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default Dashboard;

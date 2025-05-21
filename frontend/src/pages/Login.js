// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const mockUsers = [
    {
      email: process.env.REACT_APP_ADMIN_EMAIL,
      password: process.env.REACT_APP_ADMIN_PASSWORD,
      role: 'admin',
    },
    {
      email: process.env.REACT_APP_COMERCIAL_EMAIL,
      password: process.env.REACT_APP_COMERCIAL_PASSWORD,
      role: 'comercial',
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', foundUser.role);
      localStorage.setItem('email', foundUser.email);
      navigate('/dashboard');
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div style={{ backgroundColor: '#f7f9fc', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container className="d-flex justify-content-center">
        <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow p-4">
          <div className="text-center mb-4">
            <img src="/logo.png" alt="WellAging Logo" style={{ width: 50 }} />
            <h4 className="mt-3">Bienvenido a WellAging</h4>
            <p className="text-muted mb-0">Inicia sesión para continuar</p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                id = "email"
                placeholder="ejemplo@wellaging.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                id = "password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Iniciar Sesión
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default Login;

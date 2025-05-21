// src/pages/Profile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Profile = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email') || 'No disponible';
  const role = localStorage.getItem('userRole') || 'No definido';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">Perfil de Usuario</h2>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Rol:</strong> {role === 'admin' ? 'Administrador' : 'Ejecutivo comercial'}</p>
              <div className="d-grid mt-4">
                <Button variant="primary" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

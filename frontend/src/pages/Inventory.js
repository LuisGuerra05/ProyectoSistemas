import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import InventoryData from '../data/InventoryData';

function Inventory() {
  const role = localStorage.getItem('userRole');
  const [inventario, setInventario] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoStock, setNuevoStock] = useState('');
  const [showModalEditar, setShowModalEditar] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('inventario');
    if (stored) {
      setInventario(JSON.parse(stored));
    } else {
      setInventario(InventoryData);
      localStorage.setItem('inventario', JSON.stringify(InventoryData));
    }
  }, []);

  useEffect(() => {
  const stored = localStorage.getItem('inventario');
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
      setInventario(parsed);
    } else {
      throw new Error();
    }
  } catch {
    setInventario(InventoryData);
    localStorage.setItem('inventario', JSON.stringify(InventoryData));
  }
}, []);


  const handleEditar = () => {
    const actualizado = inventario.map((item) =>
      item.id === productoSeleccionado.id
        ? { ...item, stock: parseInt(nuevoStock) }
        : item
    );
    setInventario(actualizado);
    setShowModalEditar(false);
    setProductoSeleccionado(null);
    setNuevoStock('');
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Inventario</h2>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Stock</th>
            <th>Estado</th>
            {role === 'admin' && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {inventario.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.producto}</td>
              <td>{item.descripcion}</td>
              <td>{item.stock}</td>
              <td>
                <Badge bg={item.stock < 40 ? 'danger' : 'success'}>
                  {item.stock < 40 ? 'Bajo stock' : 'Stock suficiente'}
                </Badge>
              </td>
              {role === 'admin' && (
                <td>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => {
                      setProductoSeleccionado(item);
                      setNuevoStock(item.stock);
                      setShowModalEditar(true);
                    }}
                  >
                    Editar
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Editar Stock */}
      <Modal show={showModalEditar} onHide={() => setShowModalEditar(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productoSeleccionado && (
            <>
              <p><strong>Producto:</strong> {productoSeleccionado.producto}</p>
              <Form.Group>
                <Form.Label>Nuevo stock</Form.Label>
                <Form.Control
                  type="number"
                  value={nuevoStock}
                  onChange={(e) => setNuevoStock(e.target.value)}
                  min="0"
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalEditar(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEditar}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Inventory;

import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  Button,
  Modal
} from 'react-bootstrap';
import pedidosData from '../data/PedidosData';

function Orders() {
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('userRole');
  const [pedidos, setPedidos] = useState([]);
  const [showModalDetalle, setShowModalDetalle] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('pedidos');
    let data = [];

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          data = parsed;
        } else {
          data = pedidosData;
          localStorage.setItem('pedidos', JSON.stringify(pedidosData));
        }
      } catch {
        data = pedidosData;
        localStorage.setItem('pedidos', JSON.stringify(pedidosData));
      }
    } else {
      data = pedidosData;
      localStorage.setItem('pedidos', JSON.stringify(pedidosData));
    }

    setPedidos(data);
  }, []);

  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  const handleCambiarEstado = (id, nuevoEstado) => {
    const actualizados = pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, estado: nuevoEstado, ultimaActualizacion: new Date().toLocaleDateString() } : pedido
    );
    setPedidos(actualizados);
  };

  const pedidosVisibles =
    role === 'admin' ? pedidos : pedidos.filter((p) => p.asignadoA === email);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Pedidos</h2>

      {pedidosVisibles.length === 0 ? (
        <p className="text-muted">No hay pedidos registrados.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Última actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidosVisibles.map((pedido, index) => (
              <tr key={pedido.id}>
                <td>{index + 1}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.descripcion}</td>
                <td>${pedido.monto.toLocaleString()}</td>
                <td>
                  <span className={`badge 
                    ${pedido.estado === 'Aprobado' ? 'bg-success' :
                      pedido.estado === 'En preparación' ? 'bg-secondary':
                      pedido.estado === 'Despachado' ? 'bg-warning text-dark' :
                      pedido.estado === 'En camino' ? 'bg-info text-dark' :
                      pedido.estado === 'Entregado' ?  'bg-success': 'bg-light text-dark'}`}>
                    {pedido.estado}
                  </span>
                </td>
                <td>{pedido.fechaPedido}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        setPedidoSeleccionado(pedido);
                        setShowModalDetalle(true);
                      }}
                    >
                      Ver Detalle
                    </Button>
                    {role === 'admin' && (
                      <>
                        {pedido.estado === 'Aprobado' && (
                          <Button
                            size="sm"
                            variant="warning"
                            onClick={() =>
                              handleCambiarEstado(pedido.id, 'En preparación')
                            }
                          >
                            Preparar
                          </Button>
                        )}
                        {pedido.estado === 'En preparación' && (
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() =>
                              handleCambiarEstado(pedido.id, 'Despachado')
                            }
                          >
                            Despachar
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal DETALLE */}
      <Modal
        show={showModalDetalle}
        onHide={() => setShowModalDetalle(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Pedido #{pedidoSeleccionado?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pedidoSeleccionado && (
            <Container>
              <p><strong>Cliente:</strong> {pedidoSeleccionado.cliente}</p>
              <p><strong>Descripción:</strong> {pedidoSeleccionado.descripcion}</p>

              {Array.isArray(pedidoSeleccionado.detalle) ? (
                <>
                  <Table bordered className="mt-3">
                    <thead className="table-light">
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedidoSeleccionado.detalle.map((item, i) => (
                        <tr key={i}>
                          <td>{item.nombre}</td>
                          <td>{item.cantidad}</td>
                          <td>${item.precioUnitario.toLocaleString()}</td>
                          <td>${(item.cantidad * item.precioUnitario).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <p className="text-end fw-bold mt-3">
                    Total: ${pedidoSeleccionado.monto.toLocaleString()}
                  </p>

                  {/* Mensajes según estado */}
                  {pedidoSeleccionado.estado === 'En camino' && pedidoSeleccionado.entregadoPor && (
                    <p className="text-muted mt-3">
                      Este pedido será entregado por <strong>{pedidoSeleccionado.entregadoPor}</strong> el día <strong>{pedidoSeleccionado.fechaEntrega}</strong> a las <strong>{pedidoSeleccionado.horaEntrega}</strong>.
                    </p>
                  )}

                  {pedidoSeleccionado.estado === 'Despachado' && pedidoSeleccionado.entregadoPor && (
                    <p className="text-muted mt-3">
                      Será entregado por <strong>{pedidoSeleccionado.entregadoPor}</strong>.
                    </p>
                  )}

                  {pedidoSeleccionado.estado === 'Entregado' && pedidoSeleccionado.entregadoPor && (
                    <p className="text-muted mt-3">
                      Este pedido fue entregado con éxito el día <strong>{pedidoSeleccionado.fechaEntrega}</strong> a las <strong>{pedidoSeleccionado.horaEntrega}</strong> por <strong>{pedidoSeleccionado.entregadoPor}</strong>.
                    </p>
                  )}
                </>
              ) : (
                <p className="text-muted">Este pedido no tiene detalle de productos.</p>
              )}
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalDetalle(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Orders;

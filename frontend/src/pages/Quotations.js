import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  Button,
  Modal,
  Form
} from 'react-bootstrap';
import dataInicial from '../data/QuotationsData';

function Quotations() {
  const role = localStorage.getItem('userRole');
  const email = localStorage.getItem('email');

  const [cotizaciones, setQuotations] = useState([]);
  const [showModalCrear, setShowModalCrear] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalAsignar, setShowModalAsignar] = useState(false);
  const [cotizacionSeleccionada, setCotizacionSeleccionada] = useState(null);

  const [formData, setFormData] = useState({
    cliente: '',
    descripcion: '',
    monto: '',
    pdfName: ''
  });

  const [asignadoA, setAsignadoA] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('cotizaciones');
    let data = [];

    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        data = parsed;
      } else {
        data = dataInicial;
        localStorage.setItem('cotizaciones', JSON.stringify(dataInicial));
      }
    } else {
      data = dataInicial;
      localStorage.setItem('cotizaciones', JSON.stringify(dataInicial));
    }

    setQuotations(data);
  }, []);

  useEffect(() => {
    localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));
  }, [cotizaciones]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData((prev) => ({
        ...prev,
        pdfName: file.name
      }));
    }
  };

  const handleCrear = () => {
    const nueva = {
      id: Date.now(),
      cliente: formData.cliente,
      descripcion: formData.descripcion,
      monto: parseInt(formData.monto),
      fecha: new Date().toLocaleDateString(),
      autor: email,
      asignadoA: role === 'admin' ? asignadoA : email,
      estado: 'Pendiente',
      ultimaActualizacion: new Date().toLocaleDateString(),
      pdfName: formData.pdfName || ''
    };

    setQuotations([...cotizaciones, nueva]);
    setFormData({ cliente: '', descripcion: '', monto: '', pdfName: '' });
    setAsignadoA('');
    setShowModalCrear(false);
  };

  const handleEditar = () => {
    const actualizadas = cotizaciones.map((coti) =>
      coti.id === cotizacionSeleccionada.id
        ? {
            ...coti,
            cliente: formData.cliente,
            descripcion: formData.descripcion,
            monto: parseInt(formData.monto),
            ultimaActualizacion: new Date().toLocaleDateString()
          }
        : coti
    );
    setQuotations(actualizadas);
    setShowModalEditar(false);
  };

  const handleAsignar = () => {
    const actualizadas = cotizaciones.map((coti) =>
      coti.id === cotizacionSeleccionada.id
        ? {
            ...coti,
            asignadoA,
            ultimaActualizacion: new Date().toLocaleDateString()
          }
        : coti
    );
    setQuotations(actualizadas);
    setShowModalAsignar(false);
    setAsignadoA('');
  };

  const cotizacionesVisibles =
    role === 'admin'
      ? cotizaciones
      : cotizaciones.filter((c) => c.asignadoA === email);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Cotizaciones</h2>
        <Button onClick={() => setShowModalCrear(true)}>+ Nueva Cotización</Button>
      </div>

      {cotizacionesVisibles.length === 0 ? (
        <p className="text-muted">No hay cotizaciones registradas.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Cliente</th>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Autor</th>
              <th>Asignado a</th>
              <th>Estado</th>
              <th>Última actualización</th>
              <th>PDF</th>
              {role === 'admin' && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {cotizacionesVisibles.map((coti) => (
              <tr key={coti.id}>
                <td>{coti.cliente}</td>
                <td>{coti.descripcion}</td>
                <td>${coti.monto.toLocaleString()}</td>
                <td>{coti.fecha}</td>
                <td>{coti.autor}</td>
                <td>{coti.asignadoA}</td>
                <td>
                  <span className={`badge 
                    ${coti.estado === 'Pendiente' ? 'bg-warning text-dark' :
                      coti.estado === 'En revisión' ? 'bg-info text-dark' :
                      coti.estado === 'Aprobado' ? 'bg-success' :
                      coti.estado === 'Rechazado' ? 'bg-danger' :
                      'bg-secondary'}`}>
                    {coti.estado}
                  </span>
                </td>
                <td>{coti.ultimaActualizacion}</td>
                <td>
                  {coti.pdfName ? (
                    <Button variant="outline-info" size="sm" disabled>
                      Ver PDF
                    </Button>
                  ) : (
                    <span className="text-muted">Sin archivo</span>
                  )}
                </td>
                {role === 'admin' && (
                  <td>
                    <div className="d-flex flex-column gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                          setCotizacionSeleccionada(coti);
                          setFormData({
                            cliente: coti.cliente,
                            descripcion: coti.descripcion,
                            monto: coti.monto
                          });
                          setShowModalEditar(true);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => {
                          setCotizacionSeleccionada(coti);
                          setAsignadoA(coti.asignadoA);
                          setShowModalAsignar(true);
                        }}
                      >
                        Asignar
                      </Button>
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={() => {
                          const nuevoEstado = coti.estado === 'Pendiente'
                            ? 'En revisión'
                            : coti.estado === 'En revisión'
                            ? 'Aprobado'
                            : 'Pendiente';

                          const actualizadas = cotizaciones.map((cot) =>
                            cot.id === coti.id
                              ? {
                                  ...cot,
                                  estado: nuevoEstado,
                                  ultimaActualizacion: new Date().toLocaleDateString()
                                }
                              : cot
                          );

                          setQuotations(actualizadas);
                        }}
                      >
                        Cambiar estado
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal CREAR */}
      <Modal show={showModalCrear} onHide={() => setShowModalCrear(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Cotización</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Cliente</Form.Label>
              <Form.Control name="cliente" value={formData.cliente} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                name="monto"
                type="number"
                value={formData.monto}
                onChange={handleChange}
              />
            </Form.Group>

            {role === 'admin' && (
              <>
                <Form.Group className="mt-3">
                  <Form.Label>Asignar a (email del comercial)</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ej: comercial1@wellaging.com"
                    value={asignadoA}
                    onChange={(e) => setAsignadoA(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Adjuntar PDF (simulado)</Form.Label>
                  <Form.Control type="file" accept="application/pdf" onChange={handlePdfUpload} />
                  {formData.pdfName && (
                    <small className="text-muted mt-1">Archivo seleccionado: {formData.pdfName}</small>
                  )}
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalCrear(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleCrear}>Guardar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal EDITAR */}
      <Modal show={showModalEditar} onHide={() => setShowModalEditar(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cotización</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Cliente</Form.Label>
              <Form.Control name="cliente" value={formData.cliente} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Monto</Form.Label>
              <Form.Control name="monto" type="number" value={formData.monto} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalEditar(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleEditar}>Guardar cambios</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal ASIGNAR */}
      <Modal show={showModalAsignar} onHide={() => setShowModalAsignar(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Asignar Responsable</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Email del comercial asignado</Form.Label>
            <Form.Control
              type="email"
              value={asignadoA}
              onChange={(e) => setAsignadoA(e.target.value)}
              placeholder="comercial@wellaging.com"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalAsignar(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleAsignar}>Asignar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Quotations;

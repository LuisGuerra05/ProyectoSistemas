// src/data/PedidosData.js

const PedidosData = [
  {
    id: 1,
    cliente: 'Salud Integral Ltda.',
    descripcion: 'Suministro de suplementos para pacientes geriátricos.',
    monto: 1160000,
    fechaPedido: '30/06/2025',
    asignadoA: 'comercial@wellaging.com',
    estado: 'En preparación',
    detalle: [
      { nombre: 'Vitamina C Inyectable 500mg', cantidad: 10, precioUnitario: 50000 },
      { nombre: 'Complejo B Inyectable', cantidad: 8, precioUnitario: 45000 },
      { nombre: 'Glutatión Intravenoso', cantidad: 5, precioUnitario: 60000 }
    ]
  },
  {
    id: 2,
    cliente: 'Municipalidad de Renca',
    descripcion: 'Programa de bienestar para funcionarios de salud.',
    monto: 890000,
    fechaPedido: '29/06/2025',
    asignadoA: 'comercial@wellaging.com',
    estado: 'Despachado',
    entregadoPor: 'Alejandro Mañón',
    detalle: [
      { nombre: 'Solución Salina Estéril', cantidad: 6, precioUnitario: 75000 },
      { nombre: 'Vitamina C Inyectable 500mg', cantidad: 4, precioUnitario: 50000 },
      { nombre: 'Coenzima Q10 IV', cantidad: 6, precioUnitario: 40000 }
    ]
  },
  {
    id: 3,
    cliente: 'Clínica Santa Fe',
    descripcion: 'Pedido para tratamiento de pacientes con fatiga crónica.',
    monto: 1320000,
    fechaPedido: '29/06/2025',
    asignadoA: 'comercial@wellaging.com',
    estado: 'En camino',
    entregadoPor: 'María González',
    fechaEntrega: '01/07/2025',
    horaEntrega: '15:00',
    detalle: [
      { nombre: 'Vitamina B12 Inyectable', cantidad: 6, precioUnitario: 40000 },
      { nombre: 'Magnesio Inyectable', cantidad: 4, precioUnitario: 43000 },
      { nombre: 'Solución Salina Estéril', cantidad: 5, precioUnitario: 75000 }
    ]
  },
  {
    id: 4,
    cliente: 'Centro Médico Andino',
    descripcion: 'Requerimiento de suplementos postquirúrgicos.',
    monto: 980000,
    fechaPedido: '30/06/2025',
    asignadoA: 'comercial@wellaging.com',
    estado: 'Entregado',
    entregadoPor: 'Carlos Palacios',
    fechaEntrega: '30/06/2025',
    horaEntrega: '10:45',
    detalle: [
      { nombre: 'Colágeno Hidrolizado IV', cantidad: 3, precioUnitario: 60000 },
      { nombre: 'Glutatión Intravenoso', cantidad: 5, precioUnitario: 60000 },
      { nombre: 'Complejo B Inyectable', cantidad: 7, precioUnitario: 45000 }
    ]
  }
];

export default PedidosData;

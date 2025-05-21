// src/data/PedidosData.js

const PedidosData = [
  {
    id: 1,
    cliente: 'Salud Integral Ltda.',
    descripcion: 'Suministro de suplementos para pacientes geriátricos.',
    monto: 1160000,
    fechaPedido: '18/05/2025',
    asignadoA: 'comercial@wellaging.com',
    estado: 'En preparación',
    detalle: [
      { nombre: 'Vitamina C intravenosa (25g)', cantidad: 10, precioUnitario: 50000 },
      { nombre: 'Complejo B intravenoso', cantidad: 8, precioUnitario: 45000 },
      { nombre: 'Glutatión liposomal', cantidad: 5, precioUnitario: 60000 }
    ]
  },
  {
    id: 2,
    cliente: 'Municipalidad de Renca',
    descripcion: 'Programa de bienestar para funcionarios de salud.',
    monto: 890000,
    fechaPedido: '11/05/2025',
    asignadoA: 'comercial@wellaging.com',
    estado: 'Despachado',
    detalle: [
      { nombre: 'Suero revitalizante con minerales', cantidad: 6, precioUnitario: 75000 },
      { nombre: 'Vitamina C intravenosa (25g)', cantidad: 4, precioUnitario: 50000 },
      { nombre: 'Coenzima Q10 inyectable', cantidad: 6, precioUnitario: 40000 }
    ]
  }
];

export default PedidosData;

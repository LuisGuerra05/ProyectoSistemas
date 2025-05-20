# WellAging Dashboard

Este proyecto corresponde al desarrollo de un prototipo frontend de un sistema de gestión para la empresa **WellAging**, dedicada a la venta de productos enfocados en el envejecimiento saludable, como suplementos intravenosos (por ejemplo, vitamina C).

---

## Objetivo del proyecto

Simular el funcionamiento de una herramienta digital centralizada que permita gestionar de forma eficiente las operaciones de WellAging: cotizaciones, inventario, estado de pedidos y despacho.

Este prototipo se centra exclusivamente en la interfaz de usuario (frontend), desarrollada en **React**, sin conexión a base de datos ni backend.

---

## Tecnologías utilizadas

- React (Create React App)
- React Router DOM (para navegación entre vistas)
- CSS o Bootstrap (según estilo que usemos)
- [Opcional] Chart.js o Recharts (para dashboard visual)

---

## Funcionalidades del prototipo

Este sistema simula el flujo completo del área comercial de WellAging a través de distintas vistas:

### 1. **Inicio de sesión (simulado)**
- Interfaz para ingresar correo y contraseña.
- Diferenciación visual entre dos roles:
  - **Ejecutivo comercial**
  - **Administrador**

### 2. **Panel de Cotizaciones**
- Tabla con cotizaciones registradas.
- Filtros por estado, cliente o fecha.
- Botón para agregar nueva cotización (abre formulario).

### 3. **Seguimiento de Pedidos**
- Vista con estados de cada pedido ("En preparación", "Enviado", "Entregado").
- Simulación de cambio de estado manual.

### 4. **Inventario**
- Lista de productos y stock disponible.
- Alerta visual de productos con bajo stock.
- Acciones simuladas para modificar stock.

### 5. **Dashboard resumen**
- Indicadores clave como:
  - Cotizaciones activas.
  - Pedidos en curso.
  - Productos más cotizados.
- Gráficos simulados con datos de ejemplo.

---

## Estructura del proyecto
```bash
frontend/
├── public/
src/
├── assets/
├── components/
│   └── Navbar.js
├── pages/
│   ├── Login.js
│   ├── Quotations.js
│   ├── Orders.js
│   ├── Inventory.js
│   └── Dashboard.js
├── styles/
│   └── App.css
│   └── index.css
├── App.js
└── index.js
├── package.json
└── README.md
```



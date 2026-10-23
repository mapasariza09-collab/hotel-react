# Gran Hotel — Sistema de Gestión Hotelera (React)

Dashboard administrativo de hotel en **React + TypeScript + Vite + Tailwind CSS v4**.
Interfaz en español, tema oscuro con acento dorado, 6 módulos con estado en vivo,
bitácora de auditoría y exportación de reportes en `.zip`.

## Requisitos

- Node.js 20.19+ / 22.12+ / 24.x (`node -v`)
- npm 10+

## Puesta en marcha

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:5173
```

## Scripts

| Script | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Typecheck (`tsc -b`) + build de producción en `dist/` |
| `npm run preview` | Sirve el build de producción |
| `npm run typecheck` | Solo comprobación de tipos |
| `npm run check:ssr` | Render de humo del árbol de componentes |

## Módulos

| Módulo | Descripción |
| --- | --- |
| **Panel** | Métricas globales (ocupación, reservas activas, ingresos, huéspedes), resumen de habitaciones y últimos eventos |
| **Habitaciones** | Alta de habitaciones, filtros por estado/tipo, agrupación por piso y cambio de estado en línea |
| **Huéspedes** | Registro de clientes con documento, contacto, contador de visitas y búsqueda |
| **Reservas** | Creación de reservas, filtro por estado (Pendiente / Confirmada / Check In / Check Out / Cancelada) |
| **Usuarios** | Cuentas del personal, roles y switch de activación/desactivación |
| **Auditoría** | Bitácora completa de acciones por usuario, módulo y marca de tiempo |

Cada acción que modifica datos (alta de habitación/huésped/reserva/usuario, cambio de
estado, activación de usuario) se registra automáticamente en la bitácora de auditoría.

## Estructura

```
src/
├── App.tsx                    # Estado global y orquestación de vistas
├── types.ts                   # Tipos de dominio
├── data/mockData.ts           # Datos iniciales de demostración
├── lib/
│   ├── exportReport.ts        # Exportación .zip (JSON + CSV) con JSZip
│   └── utils.ts               # Formato de moneda, iniciales, ids y helpers
├── components/
│   ├── layout/Sidebar.tsx     # Navegación principal
│   ├── modals/                # Formularios modales (habitación, huésped, reserva, usuario)
│   └── ui/                    # Modal, badges, avatar y controles de formulario
└── views/                     # Una vista por módulo
```

## Notas

- Los datos son de demostración y viven en memoria (React state); no hay backend.
- El botón **“Descargar archivo .zip”** genera un reporte real con el estado actual:
  `datos/datos.json`, `datos/habitaciones.csv`, `datos/reservas.csv`, `datos/auditoria.csv`.
- Los colores de marca están definidos con valores arbitrarios de Tailwind
  (`#0b1329` fondo, `#111a30` panel, `#182442` superficie, `#cbb061` acento dorado).

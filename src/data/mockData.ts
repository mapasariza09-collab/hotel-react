import type { AuditEntry, Guest, HotelUser, Reservation, Room } from '../types';

export const INITIAL_ROOMS: Room[] = [
  {
    id: '101',
    number: '101',
    type: 'Simple',
    price: 120,
    status: 'Disponible',
    floor: 1,
    capacity: 1,
    cleaningStatus: 'Limpia',
    description: 'Hogar íntimo con cama individual, buen descanso y un ambiente acogedor para viajeros en tránsito.',
    imageUrl:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '102',
    number: '102',
    type: 'Doble',
    price: 180,
    status: 'Ocupada',
    floor: 1,
    capacity: 2,
    cleaningStatus: 'Pendiente',
    description: 'Habitación doble con espacio cómodo para dos personas, decoración cálida y excelente iluminación natural.',
    imageUrl:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '103',
    number: '103',
    type: 'Suite',
    price: 280,
    status: 'Mantenimiento',
    floor: 1,
    capacity: 4,
    cleaningStatus: 'En Limpieza',
    description: 'Suite elegante con sala de estar, cama premium y detalles contemporáneos para una estancia especial.',
    imageUrl:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '104',
    number: '104',
    type: 'Suite',
    price: 450,
    status: 'Disponible',
    floor: 1,
    capacity: 4,
    cleaningStatus: 'Limpia',
    description: 'Suite presidencial con ambiente exclusivo, gran espacio y vista sofisticada para huéspedes VIP.',
    imageUrl:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '201',
    number: '201',
    type: 'Simple',
    price: 125,
    status: 'Disponible',
    floor: 2,
    capacity: 1,
    cleaningStatus: 'Limpia',
    description: 'Alojamiento funcional y limpio, ideal para viajeros que buscan comodidad y tranquilidad.',
    imageUrl:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '202',
    number: '202',
    type: 'Doble',
    price: 190,
    status: 'Ocupada',
    floor: 2,
    capacity: 2,
    cleaningStatus: 'Pendiente',
    description: 'Habitación doble moderna con mobiliario práctico, descanso óptimo y ambiente acogedor para parejas.',
    imageUrl:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '203',
    number: '203',
    type: 'Suite',
    price: 300,
    status: 'Disponible',
    floor: 2,
    capacity: 3,
    cleaningStatus: 'Limpia',
    description: 'Suite espaciosa con diseño premium, ambiente relajante y excelente versatilidad para estancias largas.',
    imageUrl:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '301',
    number: '301',
    type: 'Presidencial',
    price: 500,
    status: 'Ocupada',
    floor: 3,
    capacity: 5,
    cleaningStatus: 'Limpia',
    description: 'Ambiente exclusivo y refinado con comodidades superiores para huéspedes que buscan lujo y confort.',
    imageUrl:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '302',
    number: '302',
    type: 'Doble',
    price: 200,
    status: 'Disponible',
    floor: 3,
    capacity: 2,
    cleaningStatus: 'Limpia',
    description: 'Habitación doble con estilo contemporáneo, iluminación suave y una distribución ideal para descanso.',
    imageUrl:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
  },
];

export const INITIAL_GUESTS: Guest[] = [
  { id: 'G-101', name: 'Ana Gómez', initials: 'AG', docType: 'DNI', docId: '1098765432', email: 'ana.gomez@gmail.com', phone: '+57 311 456 7890', visits: 3, status: 'Activo' },
  { id: 'G-102', name: 'Luis Restrepo', initials: 'LR', docType: 'PASAPORTE', docId: 'US9823145', email: 'luis.r@hotmail.com', phone: '+1 415 555 0199', visits: 5, status: 'Activo' },
  { id: 'G-103', name: 'María Pérez', initials: 'MP', docType: 'DNI', docId: '52413698', email: 'maria.perez@yahoo.com', phone: '+57 300 123 4567', visits: 1, status: 'Activo' },
  { id: 'G-104', name: 'Carlos Delgado', initials: 'CD', docType: 'PASAPORTE', docId: 'ES887612', email: 'carlos.d@outlook.com', phone: '+34 612 345 678', visits: 2, status: 'Activo' },
  { id: 'G-105', name: 'Laura López', initials: 'LL', docType: 'DNI', docId: '1012345678', email: 'laura.l@gmail.com', phone: '+57 320 888 9911', visits: 4, status: 'Activo' },
  { id: 'G-106', name: 'Juan Castro', initials: 'JC', docType: 'CE', docId: 'E-459812', email: 'juan.castro@empresa.com', phone: '+57 315 999 0011', visits: 2, status: 'Activo' },
  { id: 'G-107', name: 'Sofia Vergara', initials: 'SV', docType: 'PASAPORTE', docId: 'US7712399', email: 'sofia.v@hollywood.com', phone: '+1 310 555 9011', visits: 6, status: 'Activo' },
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  { id: 'RES-1005', guestName: 'Ana Gómez', roomNumber: '102', dates: '20 Oct - 25 Oct 2026', guestsCount: 2, price: 900, status: 'Check In' },
  { id: 'RES-1006', guestName: 'Luis Restrepo', roomNumber: '301', dates: '22 Oct - 28 Oct 2026', guestsCount: 4, price: 3000, status: 'Confirmada' },
  { id: 'RES-1007', guestName: 'María Pérez', roomNumber: '202', dates: '18 Oct - 21 Oct 2026', guestsCount: 2, price: 570, status: 'Check Out' },
  { id: 'RES-1008', guestName: 'Carlos Delgado', roomNumber: '101', dates: '26 Oct - 29 Oct 2026', guestsCount: 1, price: 360, status: 'Pendiente' },
  { id: 'RES-1009', guestName: 'Laura López', roomNumber: '203', dates: '15 Oct - 17 Oct 2026', guestsCount: 3, price: 600, status: 'Cancelada' },
];

export const INITIAL_USERS: HotelUser[] = [
  { id: 'U-01', initials: 'AG', name: 'Admin General', username: 'admin', email: 'admin@hotel.com', role: 'Administrador', active: true },
  { id: 'U-02', initials: 'LR', name: 'Laura Restrepo', username: 'lrestrepo', email: 'laura@hotel.com', role: 'Recepción', active: true },
  { id: 'U-03', initials: 'JM', name: 'Jorge Martínez', username: 'jmartinez', email: 'jorge@hotel.com', role: 'Recepción', active: false },
  { id: 'U-04', initials: 'SV', name: 'Sofia Vergara', username: 'svergara', email: 'sofia@hotel.com', role: 'Supervisora', active: true },
];

export const INITIAL_AUDITS: AuditEntry[] = [
  { id: 'AUD-901', user: 'Admin General', action: 'Cambio de estado Habitación 103 a Mantenimiento', module: 'Habitaciones', timestamp: '2026-10-21 13:45' },
  { id: 'AUD-902', user: 'Laura Restrepo', action: 'Nueva reserva RES-1006 creada para Luis Restrepo', module: 'Reservas', timestamp: '2026-10-21 12:30' },
  { id: 'AUD-903', user: 'Laura Restrepo', action: 'Check In realizado para Ana Gómez (Hab 102)', module: 'Reservas', timestamp: '2026-10-20 15:10' },
  { id: 'AUD-904', user: 'Admin General', action: 'Actualización de permisos del usuario Jorge Martínez', module: 'Usuarios', timestamp: '2026-10-19 09:15' },
];

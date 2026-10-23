export type RoomStatus = 'Disponible' | 'Ocupada' | 'Mantenimiento';
export type CleaningStatus = 'Limpia' | 'Pendiente' | 'En Limpieza';
export type RoomType = 'Simple' | 'Doble' | 'Suite' | 'Presidencial';

export type ReservationStatus =
  | 'Pendiente'
  | 'Confirmada'
  | 'Check In'
  | 'Check Out'
  | 'Cancelada';

export type UserRole = 'Administrador' | 'Recepción' | 'Supervisora';
export type DocumentType = 'DNI' | 'PASAPORTE' | 'CE';

export type TabKey =
  | 'panel'
  | 'habitaciones'
  | 'huespedes'
  | 'reservas'
  | 'usuarios'
  | 'auditoria';

export type ModalKey = 'room' | 'guest' | 'reservation' | 'user' | null;

export interface Room {
  id: string;
  number: string;
  type: RoomType;
  price: number;
  status: RoomStatus;
  floor: number;
  capacity: number;
  cleaningStatus: CleaningStatus;
  description?: string;
  imageUrl?: string;
}

export interface Guest {
  id: string;
  name: string;
  initials: string;
  docType: DocumentType;
  docId: string;
  email: string;
  phone: string;
  visits: number;
  status: 'Activo';
}

export interface Reservation {
  id: string;
  guestName: string;
  roomNumber: string;
  dates: string;
  guestsCount: number;
  price: number;
  status: ReservationStatus;
}

export interface HotelUser {
  id: string;
  initials: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  active: boolean;
}

export interface AuditEntry {
  id: string;
  user: string;
  action: string;
  module: 'Habitaciones' | 'Huéspedes' | 'Reservas' | 'Usuarios';
  timestamp: string;
}

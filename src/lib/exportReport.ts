import JSZip from 'jszip';
import type { AuditEntry, Guest, HotelUser, Reservation, Room } from '../types';
import { formatCurrency } from './utils';

export interface ReportData {
  rooms: Room[];
  guests: Guest[];
  reservations: Reservation[];
  users: HotelUser[];
  audits: AuditEntry[];
}

function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const escape = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  return [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => escape(row[header])).join(',')),
  ].join('\n');
}

export async function downloadReport(data: ReportData): Promise<void> {
  const zip = new JSZip();

  zip.file(
    'datos/datos.json',
    JSON.stringify(
      {
        generadoEn: new Date().toISOString(),
        hotel: 'Gran Hotel',
        ...data,
      },
      null,
      2,
    ),
  );

  zip.file(
    'datos/habitaciones.csv',
    toCsv(
      data.rooms.map((room) => ({
        numero: room.number,
        tipo: room.type,
        piso: room.floor,
        capacidad: room.capacity,
        precio: formatCurrency(room.price),
        estado: room.status,
        limpieza: room.cleaningStatus,
      })),
    ),
  );

  zip.file(
    'datos/reservas.csv',
    toCsv(
      data.reservations.map((reservation) => ({
        codigo: reservation.id,
        huesped: reservation.guestName,
        habitacion: reservation.roomNumber,
        fechas: reservation.dates,
        personas: reservation.guestsCount,
        total: formatCurrency(reservation.price),
        estado: reservation.status,
      })),
    ),
  );

  zip.file(
    'datos/auditoria.csv',
    toCsv(
      data.audits.map((audit) => ({
        id: audit.id,
        modulo: audit.module,
        accion: audit.action,
        usuario: audit.user,
        fecha: audit.timestamp,
      })),
    ),
  );

  zip.file(
    'README.txt',
    [
      'SISTEMA DE GESTION HOTELERA - GRAN HOTEL',
      '',
      `Reporte generado el ${new Date().toLocaleString('es-CO')}`,
      '',
      'El archivo contiene la informacion exportada del dashboard:',
      '  datos/datos.json      -> snapshot completo de la aplicacion',
      '  datos/habitaciones.csv -> listado de habitaciones',
      '  datos/reservas.csv     -> listado de reservas',
      '  datos/auditoria.csv    -> bitacora de auditoria',
    ].join('\n'),
  );

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'gran-hotel-reporte.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

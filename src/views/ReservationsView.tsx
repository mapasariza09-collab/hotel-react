import { Plus } from 'lucide-react';
import type { Reservation, ReservationStatus } from '../types';
import { ResBadge } from '../components/ui/Badges';
import { cn } from '../lib/utils';

const STATUS_FILTERS: Array<ReservationStatus | 'Todos'> = [
  'Todos',
  'Pendiente',
  'Confirmada',
  'Check In',
  'Check Out',
  'Cancelada',
];

interface ReservationsViewProps {
  reservations: Reservation[];
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onCreate: () => void;
}

export default function ReservationsView({
  reservations,
  statusFilter,
  onStatusFilterChange,
  onCreate,
}: ReservationsViewProps) {
  const visibleReservations = reservations.filter(
    (reservation) => statusFilter === 'Todos' || reservation.status === statusFilter,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">Reservas</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Administra las reservaciones activas, ingresos y salidas.
          </p>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="flex items-center gap-2 rounded-xl bg-[#cbb061] px-4 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-[#cbb061]/20 transition-all hover:bg-[#d8be6e]"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          + Nueva reserva
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-800/80 bg-[#111a30] p-4 shadow-lg">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onStatusFilterChange(status)}
            className={cn(
              'rounded-xl px-3 py-1.5 text-xs font-bold transition-all',
              statusFilter === status
                ? 'bg-[#cbb061] text-slate-950 shadow-md'
                : 'bg-[#182442] text-slate-300 hover:bg-[#202f54]',
            )}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-[#111a30] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-[#182442]/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                <th className="p-4">Código</th>
                <th className="p-4">Huésped</th>
                <th className="p-4">Habitación</th>
                <th className="p-4">Fechas</th>
                <th className="p-4">Personas</th>
                <th className="p-4">Precio Total</th>
                <th className="p-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {visibleReservations.map((reservation) => (
                <tr key={reservation.id} className="transition-colors hover:bg-[#182442]/40">
                  <td className="p-4 font-mono text-xs font-bold text-[#cbb061]">
                    {reservation.id}
                  </td>
                  <td className="p-4 font-bold text-slate-200">{reservation.guestName}</td>
                  <td className="p-4 font-bold text-[#cbb061]">#{reservation.roomNumber}</td>
                  <td className="p-4 text-xs text-slate-300">{reservation.dates}</td>
                  <td className="p-4 text-xs text-slate-300">{reservation.guestsCount} pers.</td>
                  <td className="p-4 font-black text-white">
                    $ {reservation.price.toLocaleString('es-CO')},00
                  </td>
                  <td className="p-4 text-center">
                    <ResBadge status={reservation.status} />
                  </td>
                </tr>
              ))}
              {visibleReservations.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-sm text-slate-400">
                    No hay reservas con el estado seleccionado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

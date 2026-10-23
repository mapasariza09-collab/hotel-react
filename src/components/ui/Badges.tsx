import type { ReservationStatus, RoomStatus } from '../../types';
import { cn } from '../../lib/utils';

const badgeBase =
  'px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider';

const roomStyles: Record<RoomStatus, string> = {
  Disponible: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Ocupada: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  Mantenimiento: 'bg-slate-800 text-slate-400 border-slate-700',
};

const reservationStyles: Record<ReservationStatus, string> = {
  'Check In': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Confirmada: 'bg-[#cbb061]/10 text-[#cbb061] border-[#cbb061]/20',
  'Check Out': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  Pendiente: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Cancelada: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export function RoomBadge({ status }: { status: RoomStatus }) {
  return <span className={cn(badgeBase, roomStyles[status])}>{status}</span>;
}

export function ResBadge({ status }: { status: ReservationStatus }) {
  return <span className={cn(badgeBase, reservationStyles[status])}>{status}</span>;
}

export function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-tr from-[#cbb061] to-[#e6cf8b] text-slate-950 font-extrabold text-xs flex items-center justify-center shadow">
      {initials}
    </div>
  );
}

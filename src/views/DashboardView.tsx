import {
  Activity,
  BedDouble,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  Users,
} from 'lucide-react';
import type { AuditEntry, Guest, Reservation, Room, TabKey } from '../types';
import { RoomBadge } from '../components/ui/Badges';

interface DashboardViewProps {
  rooms: Room[];
  guests: Guest[];
  reservations: Reservation[];
  audits: AuditEntry[];
  onNavigate: (tab: TabKey) => void;
}

export default function DashboardView({
  rooms,
  guests,
  reservations,
  audits,
  onNavigate,
}: DashboardViewProps) {
  const occupied = rooms.filter((room) => room.status === 'Ocupada').length;
  const activeReservations = reservations.filter(
    (reservation) => reservation.status === 'Check In' || reservation.status === 'Confirmada',
  ).length;
  const monthlyIncome = reservations
    .filter((reservation) => reservation.status !== 'Cancelada')
    .reduce((total, reservation) => total + reservation.price, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">Panel de Control</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Métricas globales y estado en tiempo real del establecimiento.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#111a30] p-5 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Habitaciones Ocupadas
              </p>
              <h3 className="mt-1 text-2xl font-black text-white">
                {occupied} <span className="text-sm font-normal text-slate-400">/ {rooms.length}</span>
              </h3>
            </div>
            <div className="rounded-xl border border-[#cbb061]/20 bg-[#cbb061]/10 p-3 text-[#cbb061]">
              <BedDouble className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs font-medium text-emerald-400">
            <TrendingUp className="mr-1 h-3.5 w-3.5" />
            <span>+12% vs la semana pasada</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-[#111a30] p-5 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Reservas Activas
              </p>
              <h3 className="mt-1 text-2xl font-black text-white">{activeReservations}</h3>
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-400">
              <CalendarCheck className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400">Próximos arribos hoy</p>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-[#111a30] p-5 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Ingresos del Mes
              </p>
              <h3 className="mt-1 text-2xl font-black text-[#cbb061]">
                $ {monthlyIncome.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
              </h3>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-amber-400">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400">Pagos completados</p>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-[#111a30] p-5 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Huéspedes
              </p>
              <h3 className="mt-1 text-2xl font-black text-white">{guests.length}</h3>
            </div>
            <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-3 text-purple-400">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400">Registrados en la base</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-800/80 bg-[#111a30] p-6 shadow-xl lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-extrabold text-white">
              <BedDouble className="h-5 w-5 text-[#cbb061]" />
              Resumen de Habitaciones
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('habitaciones')}
              className="text-xs font-bold text-[#cbb061] hover:underline"
            >
              Ver todas →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#182442]/60 p-3.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">Piso {room.floor}</span>
                  <RoomBadge status={room.status} />
                </div>
                <p className="mt-2 text-xl font-black text-white">#{room.number}</p>
                <span className="text-[11px] font-semibold text-[#cbb061]">{room.type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-[#111a30] p-6 shadow-xl">
          <h3 className="mb-4 flex items-center gap-2 text-base font-extrabold text-white">
            <Activity className="h-5 w-5 text-[#cbb061]" />
            Últimos Eventos
          </h3>
          <div className="space-y-3.5">
            {audits.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="border-b border-slate-800/80 pb-3 last:border-0 last:pb-0"
              >
                <p className="text-xs font-medium text-slate-200">{item.action}</p>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-[#cbb061]">{item.user}</span>
                  <span>{item.timestamp.split(' ')[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

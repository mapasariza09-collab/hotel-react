import { useMemo } from 'react';
import { Building, Filter, Plus } from 'lucide-react';
import type { Room, RoomStatus, RoomType } from '../types';
import { RoomBadge } from '../components/ui/Badges';

interface RoomsViewProps {
  rooms: Room[];
  statusFilter: string;
  typeFilter: string;
  onStatusFilterChange: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
  onRoomStatusChange: (roomId: string, status: RoomStatus) => void;
  onCreate: () => void;
}

const ROOM_IMAGE_FALLBACKS: Record<RoomType, string> = {
  Simple:
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  Doble:
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80',
  Suite:
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
  Presidencial:
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
};

export default function RoomsView({
  rooms,
  statusFilter,
  typeFilter,
  onStatusFilterChange,
  onTypeFilterChange,
  onRoomStatusChange,
  onCreate,
}: RoomsViewProps) {
  const filteredRooms = useMemo(
    () =>
      rooms.filter((room) => {
        const matchStatus = statusFilter === 'Todos' || room.status === statusFilter;
        const matchType = typeFilter === 'Todos' || room.type === typeFilter;
        return matchStatus && matchType;
      }),
    [rooms, statusFilter, typeFilter],
  );

  const roomsByFloor = useMemo(() => {
    const grouped: Record<string, Room[]> = {};
    filteredRooms.forEach((room) => {
      const floor = String(room.floor);
      if (!grouped[floor]) grouped[floor] = [];
      grouped[floor].push(room);
    });
    return grouped;
  }, [filteredRooms]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">Habitaciones</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Control de estado, capacidad y tipo de habitación por pisos.
          </p>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="flex items-center gap-2 rounded-xl bg-[#cbb061] px-4 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-[#cbb061]/20 transition-all hover:bg-[#d8be6e]"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          + Nueva habitación
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-800/80 bg-[#111a30] p-4 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Filter className="h-4 w-4 text-[#cbb061]" />
          Filtros:
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Estado:</label>
          <select
            value={statusFilter}
            onChange={(event) => onStatusFilterChange(event.target.value)}
            className="rounded-xl border border-slate-700/80 bg-[#182442] px-3 py-1.5 text-xs font-semibold text-slate-200 outline-none focus:border-[#cbb061]"
          >
            <option value="Todos">Todos</option>
            <option value="Disponible">Disponible</option>
            <option value="Ocupada">Ocupada</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Tipo:</label>
          <select
            value={typeFilter}
            onChange={(event) => onTypeFilterChange(event.target.value)}
            className="rounded-xl border border-slate-700/80 bg-[#182442] px-3 py-1.5 text-xs font-semibold text-slate-200 outline-none focus:border-[#cbb061]"
          >
            <option value="Todos">Todos</option>
            <option value="Simple">Simple</option>
            <option value="Doble">Doble</option>
            <option value="Suite">Suite</option>
            <option value="Presidencial">Presidencial</option>
          </select>
        </div>
      </div>

      {Object.keys(roomsByFloor).length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-[#111a30] py-12 text-center">
          <p className="text-sm text-slate-400">
            No se encontraron habitaciones con los filtros seleccionados.
          </p>
        </div>
      ) : (
        Object.keys(roomsByFloor)
          .sort((a, b) => Number(a) - Number(b))
          .map((floorNum) => (
            <div key={floorNum} className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-[#cbb061]">
                <Building className="w-4 h-4" /> Piso {floorNum}
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {roomsByFloor[floorNum].map((room) => (
                  <div
                    key={room.id}
                    className="group overflow-hidden rounded-2xl border border-slate-800/90 bg-[#111a30] shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-[#cbb061]/60 hover:shadow-[0_18px_40px_rgba(12,18,32,0.45)]"
                  >
                    <div className="relative">
                      <img
                        src={room.imageUrl ?? ROOM_IMAGE_FALLBACKS[room.type]}
                        alt={`Habitación ${room.number}`}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-200/80">
                            Habitación
                          </span>
                          <h4 className="text-2xl font-black text-white">#{room.number}</h4>
                        </div>
                        <RoomBadge status={room.status} />
                      </div>
                    </div>

                    <div className="space-y-3 p-4">
                      <div className="flex items-center justify-between text-[11px] font-medium text-slate-300">
                        <span>
                          {room.type} · {room.capacity} pers.
                        </span>
                        <span className="rounded bg-[#182442] px-2 py-0.5 text-[10px] text-slate-300">
                          Limpieza: <strong className="text-emerald-400">{room.cleaningStatus}</strong>
                        </span>
                      </div>

                      <p className="line-clamp-3 min-h-[52px] text-xs leading-5 text-slate-300">
                        {room.description ||
                          `Habitación ${room.type.toLowerCase()} con comodidad, estilo moderno y atención para una estancia agradable.`}
                      </p>

                      <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
                        <div>
                          <p className="text-base font-black text-[#cbb061]">
                            $ {room.price.toLocaleString('es-CO')},00
                          </p>
                          <span className="text-[10px] text-slate-400">/ noche</span>
                        </div>

                        <select
                          value={room.status}
                          onChange={(event) =>
                            onRoomStatusChange(room.id, event.target.value as RoomStatus)
                          }
                          className="rounded-lg border border-slate-700/80 bg-[#182442] px-2 py-1 text-xs font-semibold text-slate-200 outline-none"
                          aria-label={`Estado de la habitación ${room.number}`}
                        >
                          <option value="Disponible">Disponible</option>
                          <option value="Ocupada">Ocupada</option>
                          <option value="Mantenimiento">Mantenimiento</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
      )}
    </div>
  );
}

export const ROOM_TYPES: RoomType[] = ['Simple', 'Doble', 'Suite', 'Presidencial'];

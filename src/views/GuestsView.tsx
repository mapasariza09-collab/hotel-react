import { Plus, Search } from 'lucide-react';
import type { Guest } from '../types';
import { Avatar } from '../components/ui/Badges';

interface GuestsViewProps {
  guests: Guest[];
  search: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
}

export default function GuestsView({
  guests,
  search,
  onSearchChange,
  onCreate,
}: GuestsViewProps) {
  const query = search.trim().toLowerCase();

  const visibleGuests = guests.filter(
    (guest) =>
      query.length === 0 ||
      guest.name.toLowerCase().includes(query) ||
      guest.docId.toLowerCase().includes(query),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">Huéspedes</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Listado de clientes registrados e historial de estadías.
          </p>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="flex items-center gap-2 rounded-xl bg-[#cbb061] px-4 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-[#cbb061]/20 transition-all hover:bg-[#d8be6e]"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          + Nuevo huésped
        </button>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-[#111a30] p-3 shadow-lg">
        <Search className="ml-1 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar por nombre o documento..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full border-none bg-transparent text-sm text-slate-200 outline-none placeholder-slate-500"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-[#111a30] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-[#182442]/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                <th className="p-4">Huésped</th>
                <th className="p-4">Documento</th>
                <th className="p-4">Email / Teléfono</th>
                <th className="p-4 text-center">Visitas</th>
                <th className="p-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {visibleGuests.map((guest) => (
                <tr key={guest.id} className="transition-colors hover:bg-[#182442]/40">
                  <td className="p-4 font-semibold">
                    <div className="flex items-center gap-3">
                      <Avatar initials={guest.initials} />
                      <span className="font-bold text-slate-200">{guest.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs text-slate-300">
                    <span className="mr-2 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-[#cbb061]">
                      {guest.docType}
                    </span>
                    {guest.docId}
                  </td>
                  <td className="p-4 text-xs">
                    <p className="text-slate-200">{guest.email}</p>
                    <p className="text-slate-400">{guest.phone}</p>
                  </td>
                  <td className="p-4 text-center font-bold text-[#cbb061]">{guest.visits}</td>
                  <td className="p-4 text-center">
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-extrabold uppercase text-emerald-400">
                      {guest.status}
                    </span>
                  </td>
                </tr>
              ))}
              {visibleGuests.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-sm text-slate-400">
                    No se encontraron huéspedes que coincidan con la búsqueda.
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

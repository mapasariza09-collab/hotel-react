import { Plus, Search } from 'lucide-react';
import type { HotelUser } from '../types';
import { Avatar } from '../components/ui/Badges';
import { cn } from '../lib/utils';

interface UsersViewProps {
  users: HotelUser[];
  search: string;
  onSearchChange: (value: string) => void;
  onlyActive: boolean;
  onOnlyActiveChange: (value: boolean) => void;
  onToggleActive: (userId: string) => void;
  onCreate: () => void;
}

export default function UsersView({
  users,
  search,
  onSearchChange,
  onlyActive,
  onOnlyActiveChange,
  onToggleActive,
  onCreate,
}: UsersViewProps) {
  const query = search.trim().toLowerCase();

  const visibleUsers = users
    .filter((user) => !onlyActive || user.active)
    .filter(
      (user) =>
        query.length === 0 ||
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">Usuarios</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Gestión de cuentas del personal, roles y estado de acceso.
          </p>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="flex items-center gap-2 rounded-xl bg-[#cbb061] px-4 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-[#cbb061]/20 transition-all hover:bg-[#d8be6e]"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          + Nuevo usuario
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800/80 bg-[#111a30] p-4 shadow-lg">
        <div className="flex max-w-md flex-1 items-center gap-3 rounded-xl border border-slate-700/80 bg-[#182442] px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar usuario por nombre o email..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full border-none bg-transparent text-xs text-slate-200 outline-none placeholder-slate-500"
          />
        </div>

        <button
          type="button"
          onClick={() => onOnlyActiveChange(!onlyActive)}
          className={cn(
            'rounded-xl border px-3.5 py-2 text-xs font-bold transition-all',
            onlyActive
              ? 'border-[#cbb061] bg-[#cbb061] text-slate-950'
              : 'border-slate-700/80 bg-[#182442] text-slate-300 hover:bg-[#202f54]',
          )}
        >
          Solo activos
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-[#111a30] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-[#182442]/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                <th className="p-4">Usuario</th>
                <th className="p-4">Nombre Completo</th>
                <th className="p-4">Email</th>
                <th className="p-4">Rol</th>
                <th className="p-4 text-center">Estado Switch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {visibleUsers.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-[#182442]/40">
                  <td className="p-4 font-semibold">
                    <div className="flex items-center gap-3">
                      <Avatar initials={user.initials} />
                      <p className="font-bold text-slate-200">@{user.username}</p>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-300">{user.name}</td>
                  <td className="p-4 text-xs text-slate-400">{user.email}</td>
                  <td className="p-4">
                    <span className="rounded-md border border-[#cbb061]/20 bg-[#cbb061]/10 px-2.5 py-1 text-[11px] font-bold text-[#cbb061]">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      type="button"
                      onClick={() => onToggleActive(user.id)}
                      aria-label={`Cambiar estado de ${user.username}`}
                      aria-pressed={user.active}
                      className={cn(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                        user.active ? 'bg-emerald-500' : 'bg-slate-700',
                      )}
                    >
                      <span
                        className={cn(
                          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                          user.active ? 'translate-x-6' : 'translate-x-1',
                        )}
                      />
                    </button>
                  </td>
                </tr>
              ))}
              {visibleUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-sm text-slate-400">
                    No se encontraron usuarios que coincidan con el filtro.
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

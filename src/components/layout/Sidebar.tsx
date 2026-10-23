import {
  BedDouble,
  CalendarCheck,
  ChevronRight,
  ClipboardList,
  Download,
  Hotel,
  LayoutDashboard,
  UserCog,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TabKey } from '../../types';
import { cn } from '../../lib/utils';

interface NavItem {
  id: TabKey;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'panel', label: 'Panel', icon: LayoutDashboard },
  { id: 'habitaciones', label: 'Habitaciones', icon: BedDouble },
  { id: 'huespedes', label: 'Huéspedes', icon: Users },
  { id: 'reservas', label: 'Reservas', icon: CalendarCheck },
  { id: 'usuarios', label: 'Usuarios', icon: UserCog },
  { id: 'auditoria', label: 'Auditoría', icon: ClipboardList },
];

interface SidebarProps {
  activeTab: TabKey;
  onSelect: (tab: TabKey) => void;
  onExport: () => void;
  exporting: boolean;
}

export default function Sidebar({ activeTab, onSelect, onExport, exporting }: SidebarProps) {
  return (
    <aside className="flex w-full shrink-0 flex-col justify-between border-b border-slate-800/80 bg-[#111a30] p-5 shadow-2xl md:w-64 md:border-b-0 md:border-r">
      <div>
        <div className="mb-6 flex items-center gap-3 border-b border-slate-800 pb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#cbb061] to-[#e6cf8b] font-black text-slate-950 shadow-lg shadow-[#cbb061]/20">
            <Hotel className="h-6 w-6 text-[#0b1329]" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-wide text-white">Gran Hotel</h1>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#cbb061]">
              Dashboard Admin
            </span>
          </div>
        </div>

        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={cn(
                  'flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-[#cbb061] font-bold text-slate-950 shadow-lg shadow-[#cbb061]/25'
                    : 'text-slate-400 hover:bg-[#182442] hover:text-slate-200',
                )}
              >
                <Icon className={cn('h-5 w-5', isActive ? 'text-slate-950' : 'text-slate-400')} />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="ml-auto h-4 w-4 text-slate-950 opacity-80" />}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4 border-t border-slate-800 pt-6">
        <button
          type="button"
          onClick={onExport}
          disabled={exporting}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#cbb061]/30 bg-[#182442] px-4 py-2.5 text-xs font-bold text-[#cbb061] shadow transition-all hover:bg-[#202f54] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Download className="h-4 w-4" />
          {exporting ? 'Generando .zip...' : 'Descargar archivo .zip'}
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#182442]/50 p-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#cbb061] text-xs font-extrabold text-slate-950">
            AG
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-slate-200">Admin General</p>
            <p className="truncate text-[11px] text-slate-400">admin@hotel.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

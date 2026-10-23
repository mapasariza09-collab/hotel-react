import type { AuditEntry } from '../types';

export default function AuditView({ audits }: { audits: AuditEntry[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-white">Auditoría</h2>
        <p className="mt-0.5 text-xs text-slate-400">
          Histórico completo de acciones de usuarios y cambios de sistema.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-[#111a30] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-[#182442]/60 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                <th className="p-4">ID Evento</th>
                <th className="p-4">Módulo</th>
                <th className="p-4">Acción</th>
                <th className="p-4">Usuario</th>
                <th className="p-4">Fecha &amp; Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {audits.map((log) => (
                <tr key={log.id} className="transition-colors hover:bg-[#182442]/40">
                  <td className="p-4 font-mono text-xs text-slate-500">{log.id}</td>
                  <td className="p-4">
                    <span className="rounded border border-slate-700 bg-[#182442] px-2 py-0.5 text-xs font-bold text-[#cbb061]">
                      {log.module}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-200">{log.action}</td>
                  <td className="p-4 font-semibold text-slate-300">{log.user}</td>
                  <td className="p-4 font-mono text-xs text-slate-400">{log.timestamp}</td>
                </tr>
              ))}
              {audits.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-sm text-slate-400">
                    Todavía no hay eventos registrados.
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

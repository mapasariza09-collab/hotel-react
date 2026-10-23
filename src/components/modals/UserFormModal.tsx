import { useState, type FormEvent } from 'react';
import Modal from '../ui/Modal';
import { Field, Select, TextInput } from '../ui/FormControls';
import type { UserRole } from '../../types';

export interface UserFormValues {
  name: string;
  username: string;
  email: string;
  role: UserRole;
}

const EMPTY_FORM: UserFormValues = {
  name: '',
  username: '',
  email: '',
  role: 'Recepción',
};

interface UserFormModalProps {
  onClose: () => void;
  onSubmit: (values: UserFormValues) => void;
}

export default function UserFormModal({ onClose, onSubmit }: UserFormModalProps) {
  const [form, setForm] = useState<UserFormValues>(EMPTY_FORM);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.username) return;
    onSubmit(form);
  };

  return (
    <Modal title="Nuevo Usuario de Sistema" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Field label="Nombre Completo">
          <TextInput
            type="text"
            placeholder="Ej. Roberto Gómez"
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Usuario (Username)">
            <TextInput
              type="text"
              placeholder="rgomez"
              required
              value={form.username}
              onChange={(event) => setForm({ ...form, username: event.target.value })}
            />
          </Field>

          <Field label="Rol">
            <Select
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value as UserRole })}
            >
              <option value="Recepción">Recepción</option>
              <option value="Administrador">Administrador</option>
              <option value="Supervisora">Supervisora</option>
            </Select>
          </Field>
        </div>

        <Field label="Email">
          <TextInput
            type="email"
            placeholder="roberto@hotel.com"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </Field>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#cbb061] py-3 font-extrabold text-slate-950 shadow-lg transition-all hover:bg-[#d8be6e]"
        >
          Guardar Usuario
        </button>
      </form>
    </Modal>
  );
}

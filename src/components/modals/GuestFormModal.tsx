import { useState, type FormEvent } from 'react';
import Modal from '../ui/Modal';
import { Field, Select, TextInput } from '../ui/FormControls';
import type { DocumentType } from '../../types';

export interface GuestFormValues {
  name: string;
  docType: DocumentType;
  docId: string;
  email: string;
  phone: string;
}

const EMPTY_FORM: GuestFormValues = {
  name: '',
  docType: 'DNI',
  docId: '',
  email: '',
  phone: '',
};

interface GuestFormModalProps {
  onClose: () => void;
  onSubmit: (values: GuestFormValues) => void;
}

export default function GuestFormModal({ onClose, onSubmit }: GuestFormModalProps) {
  const [form, setForm] = useState<GuestFormValues>(EMPTY_FORM);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.docId) return;
    onSubmit(form);
  };

  return (
    <Modal title="Nuevo Huésped" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Field label="Nombre Completo">
          <TextInput
            type="text"
            placeholder="Ej. Andrés Morales"
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Tipo Doc.">
            <Select
              value={form.docType}
              onChange={(event) =>
                setForm({ ...form, docType: event.target.value as DocumentType })
              }
            >
              <option value="DNI">DNI</option>
              <option value="PASAPORTE">PASAPORTE</option>
              <option value="CE">CE</option>
            </Select>
          </Field>

          <Field label="Número Documento">
            <TextInput
              type="text"
              placeholder="1098..."
              required
              value={form.docId}
              onChange={(event) => setForm({ ...form, docId: event.target.value })}
            />
          </Field>
        </div>

        <Field label="Email">
          <TextInput
            type="email"
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </Field>

        <Field label="Teléfono">
          <TextInput
            type="tel"
            placeholder="+57 300 000 0000"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />
        </Field>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#cbb061] py-3 font-extrabold text-slate-950 shadow-lg transition-all hover:bg-[#d8be6e]"
        >
          Registrar Huésped
        </button>
      </form>
    </Modal>
  );
}

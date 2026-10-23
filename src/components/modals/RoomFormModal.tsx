import { useState, type FormEvent } from 'react';
import Modal from '../ui/Modal';
import { Field, Select, TextInput } from '../ui/FormControls';
import type { RoomType } from '../../types';

export interface RoomFormValues {
  number: string;
  type: RoomType;
  floor: string;
  capacity: string;
  price: string;
  description: string;
  imageUrl: string;
}

const EMPTY_FORM: RoomFormValues = {
  number: '',
  type: 'Simple',
  floor: '1',
  capacity: '1',
  price: '',
  description: '',
  imageUrl: '',
};

interface RoomFormModalProps {
  onClose: () => void;
  onSubmit: (values: RoomFormValues) => void;
}

export default function RoomFormModal({ onClose, onSubmit }: RoomFormModalProps) {
  const [form, setForm] = useState<RoomFormValues>(EMPTY_FORM);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.number || !form.price) return;
    onSubmit(form);
  };

  return (
    <Modal title="Nueva Habitación" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Field label="Número de Habitación">
          <TextInput
            type="text"
            placeholder="Ej. 105"
            required
            value={form.number}
            onChange={(event) => setForm({ ...form, number: event.target.value })}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Tipo">
            <Select
              value={form.type}
              onChange={(event) => setForm({ ...form, type: event.target.value as RoomType })}
            >
              <option value="Simple">Simple</option>
              <option value="Doble">Doble</option>
              <option value="Suite">Suite</option>
              <option value="Presidencial">Presidencial</option>
            </Select>
          </Field>

          <Field label="Piso">
            <TextInput
              type="number"
              min="1"
              max="10"
              value={form.floor}
              onChange={(event) => setForm({ ...form, floor: event.target.value })}
            />
          </Field>
        </div>

        <Field label="Precio por Noche ($)">
          <TextInput
            type="number"
            placeholder="Ej. 150"
            required
            value={form.price}
            onChange={(event) => setForm({ ...form, price: event.target.value })}
          />
        </Field>

        <Field label="Capacidad (personas)">
          <TextInput
            type="number"
            min="1"
            max="12"
            value={form.capacity}
            onChange={(event) => setForm({ ...form, capacity: event.target.value })}
          />
        </Field>

        <Field label="Descripción">
          <textarea
            rows={3}
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            placeholder="Ej. Habitación con vista al jardín, cama king size y baño privado."
            className="w-full rounded-xl border border-slate-700 bg-[#182442] p-2.5 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-[#cbb061]"
          />
        </Field>

        <Field label="URL de imagen">
          <TextInput
            type="url"
            placeholder="https://example.com/habitacion.jpg"
            value={form.imageUrl}
            onChange={(event) => setForm({ ...form, imageUrl: event.target.value })}
          />
        </Field>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#cbb061] py-3 font-extrabold text-slate-950 shadow-lg transition-all hover:bg-[#d8be6e]"
        >
          Guardar Habitación
        </button>
      </form>
    </Modal>
  );
}

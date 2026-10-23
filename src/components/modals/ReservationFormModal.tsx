import { useState, type FormEvent } from 'react';
import Modal from '../ui/Modal';
import { Field, Select, TextInput } from '../ui/FormControls';
import type { Room } from '../../types';

export interface ReservationFormValues {
  guestName: string;
  roomNumber: string;
  dates: string;
  guestsCount: string;
  price: string;
}

interface ReservationFormModalProps {
  rooms: Room[];
  onClose: () => void;
  onSubmit: (values: ReservationFormValues) => void;
}

export default function ReservationFormModal({
  rooms,
  onClose,
  onSubmit,
}: ReservationFormModalProps) {
  const [form, setForm] = useState<ReservationFormValues>({
    guestName: '',
    roomNumber: rooms[0]?.number ?? '',
    dates: '',
    guestsCount: '1',
    price: '',
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.guestName || !form.dates) return;
    onSubmit(form);
  };

  return (
    <Modal title="Nueva Reserva" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <Field label="Huésped">
          <TextInput
            type="text"
            placeholder="Nombre del cliente"
            required
            value={form.guestName}
            onChange={(event) => setForm({ ...form, guestName: event.target.value })}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Habitación">
            <Select
              value={form.roomNumber}
              onChange={(event) => setForm({ ...form, roomNumber: event.target.value })}
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.number}>
                  #{room.number} ({room.type})
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Precio Total ($)">
            <TextInput
              type="number"
              placeholder="500"
              value={form.price}
              onChange={(event) => setForm({ ...form, price: event.target.value })}
            />
          </Field>
        </div>

        <Field label="Rango de Fechas">
          <TextInput
            type="text"
            placeholder="Ej. 24 Oct - 28 Oct 2026"
            required
            value={form.dates}
            onChange={(event) => setForm({ ...form, dates: event.target.value })}
          />
        </Field>

        <Field label="Número de personas">
          <TextInput
            type="number"
            min="1"
            max="12"
            value={form.guestsCount}
            onChange={(event) => setForm({ ...form, guestsCount: event.target.value })}
          />
        </Field>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#cbb061] py-3 font-extrabold text-slate-950 shadow-lg transition-all hover:bg-[#d8be6e]"
        >
          Crear Reserva
        </button>
      </form>
    </Modal>
  );
}

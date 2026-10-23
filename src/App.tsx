import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import DashboardView from './views/DashboardView';
import RoomsView from './views/RoomsView';
import GuestsView from './views/GuestsView';
import ReservationsView from './views/ReservationsView';
import UsersView from './views/UsersView';
import AuditView from './views/AuditView';
import RoomFormModal from './components/modals/RoomFormModal';
import GuestFormModal from './components/modals/GuestFormModal';
import ReservationFormModal from './components/modals/ReservationFormModal';
import UserFormModal from './components/modals/UserFormModal';
import {
  INITIAL_AUDITS,
  INITIAL_GUESTS,
  INITIAL_RESERVATIONS,
  INITIAL_ROOMS,
  INITIAL_USERS,
} from './data/mockData';
import { downloadReport } from './lib/exportReport';
import { initialsFrom, nowTimestamp, randomId } from './lib/utils';
import type {
  AuditEntry,
  ModalKey,
  ReservationStatus,
  Room,
  RoomStatus,
  TabKey,
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('panel');
  const [activeModal, setActiveModal] = useState<ModalKey>(null);
  const [exporting, setExporting] = useState(false);

  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [guests, setGuests] = useState(INITIAL_GUESTS);
  const [reservations, setReservations] = useState(INITIAL_RESERVATIONS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [audits, setAudits] = useState(INITIAL_AUDITS);

  const [roomFilterStatus, setRoomFilterStatus] = useState('Todos');
  const [roomFilterType, setRoomFilterType] = useState('Todos');
  const [guestSearch, setGuestSearch] = useState('');
  const [resFilterStatus, setResFilterStatus] = useState('Todos');
  const [userSearch, setUserSearch] = useState('');
  const [onlyActiveUsers, setOnlyActiveUsers] = useState(false);

  const addAuditLog = (action: string, module: AuditEntry['module']) => {
    const log: AuditEntry = {
      id: randomId('AUD', 100, 999),
      user: 'Admin General',
      action,
      module,
      timestamp: nowTimestamp(),
    };
    setAudits((previous) => [log, ...previous]);
  };

  const handleRoomStatusChange = (roomId: string, status: RoomStatus) => {
    const room = rooms.find((item) => item.id === roomId);
    setRooms((previous) =>
      previous.map((item) => (item.id === roomId ? { ...item, status } : item)),
    );
    if (room) addAuditLog(`Hab. #${room.number} -> ${status}`, 'Habitaciones');
  };

  const handleToggleUserActive = (userId: string) => {
    const user = users.find((item) => item.id === userId);
    if (!user) return;
    const nextState = !user.active;
    setUsers((previous) =>
      previous.map((item) => (item.id === userId ? { ...item, active: nextState } : item)),
    );
    addAuditLog(
      `Usuario ${user.username} ${nextState ? 'activado' : 'desactivado'}`,
      'Usuarios',
    );
  };

  const handleAddRoom = (values: {
    number: string;
    type: Room['type'];
    floor: string;
    capacity: string;
    price: string;
    description: string;
    imageUrl: string;
  }) => {
    const room: Room = {
      id: `${Date.now()}`,
      number: values.number,
      type: values.type,
      price: Number(values.price),
      status: 'Disponible',
      floor: Number(values.floor),
      capacity: Number(values.capacity),
      cleaningStatus: 'Limpia',
      description:
        values.description.trim() ||
        `Habitación ${values.type.toLowerCase()} con diseño moderno y ambiente acogedor.`,
      imageUrl:
        values.imageUrl.trim() ||
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    };
    setRooms((previous) => [...previous, room]);
    addAuditLog(`Habitación #${values.number} creada`, 'Habitaciones');
    setActiveModal(null);
  };

  const handleAddGuest = (values: {
    name: string;
    docType: 'DNI' | 'PASAPORTE' | 'CE';
    docId: string;
    email: string;
    phone: string;
  }) => {
    const guest = {
      id: randomId('G', 100, 999),
      name: values.name,
      initials: initialsFrom(values.name),
      docType: values.docType,
      docId: values.docId,
      email: values.email,
      phone: values.phone,
      visits: 1,
      status: 'Activo' as const,
    };
    setGuests((previous) => [...previous, guest]);
    addAuditLog(`Huésped ${values.name} registrado`, 'Huéspedes');
    setActiveModal(null);
  };

  const handleAddReservation = (values: {
    guestName: string;
    roomNumber: string;
    dates: string;
    guestsCount: string;
    price: string;
  }) => {
    const reservation = {
      id: randomId('RES', 1000, 9999),
      guestName: values.guestName,
      roomNumber: values.roomNumber,
      dates: values.dates,
      guestsCount: Number(values.guestsCount),
      price: Number(values.price) || 200,
      status: 'Pendiente' as ReservationStatus,
    };
    setReservations((previous) => [reservation, ...previous]);
    addAuditLog(`Reserva ${reservation.id} creada para ${values.guestName}`, 'Reservas');
    setActiveModal(null);
  };

  const handleAddUser = (values: {
    name: string;
    username: string;
    email: string;
    role: 'Administrador' | 'Recepción' | 'Supervisora';
  }) => {
    const user = {
      id: randomId('U', 10, 99),
      initials: initialsFrom(values.name),
      name: values.name,
      username: values.username,
      email: values.email,
      role: values.role,
      active: true,
    };
    setUsers((previous) => [...previous, user]);
    addAuditLog(`Usuario ${values.username} creado`, 'Usuarios');
    setActiveModal(null);
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await downloadReport({ rooms, guests, reservations, users, audits });
      addAuditLog('Reporte .zip generado por el administrador', 'Usuarios');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0b1329] font-sans text-slate-100 selection:bg-[#cbb061]/30 selection:text-[#cbb061] md:flex-row">
      <Sidebar
        activeTab={activeTab}
        onSelect={setActiveTab}
        onExport={handleExport}
        exporting={exporting}
      />

      <main className="w-full max-w-7xl flex-1 overflow-y-auto p-4 md:p-8">
        {activeTab === 'panel' && (
          <DashboardView
            rooms={rooms}
            guests={guests}
            reservations={reservations}
            audits={audits}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'habitaciones' && (
          <RoomsView
            rooms={rooms}
            statusFilter={roomFilterStatus}
            typeFilter={roomFilterType}
            onStatusFilterChange={setRoomFilterStatus}
            onTypeFilterChange={setRoomFilterType}
            onRoomStatusChange={handleRoomStatusChange}
            onCreate={() => setActiveModal('room')}
          />
        )}

        {activeTab === 'huespedes' && (
          <GuestsView
            guests={guests}
            search={guestSearch}
            onSearchChange={setGuestSearch}
            onCreate={() => setActiveModal('guest')}
          />
        )}

        {activeTab === 'reservas' && (
          <ReservationsView
            reservations={reservations}
            statusFilter={resFilterStatus}
            onStatusFilterChange={setResFilterStatus}
            onCreate={() => setActiveModal('reservation')}
          />
        )}

        {activeTab === 'usuarios' && (
          <UsersView
            users={users}
            search={userSearch}
            onSearchChange={setUserSearch}
            onlyActive={onlyActiveUsers}
            onOnlyActiveChange={setOnlyActiveUsers}
            onToggleActive={handleToggleUserActive}
            onCreate={() => setActiveModal('user')}
          />
        )}

        {activeTab === 'auditoria' && <AuditView audits={audits} />}
      </main>

      {activeModal === 'room' && (
        <RoomFormModal onClose={() => setActiveModal(null)} onSubmit={handleAddRoom} />
      )}

      {activeModal === 'guest' && (
        <GuestFormModal onClose={() => setActiveModal(null)} onSubmit={handleAddGuest} />
      )}

      {activeModal === 'reservation' && (
        <ReservationFormModal
          rooms={rooms}
          onClose={() => setActiveModal(null)}
          onSubmit={handleAddReservation}
        />
      )}

      {activeModal === 'user' && (
        <UserFormModal onClose={() => setActiveModal(null)} onSubmit={handleAddUser} />
      )}
    </div>
  );
}

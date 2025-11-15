'use client';

import React, { useEffect, useState } from 'react';
import { UserCircle, EnvelopeSimple, Phone, Image as ImageIcon } from '@phosphor-icons/react';

interface EventOrganizerProps {
  organizerName: string;
  organizerDescription: string;
  organizerAvatarUrl: string;
  organizerEmail: string;
  organizerPhone: string;
  onChangeOrganizerName: (value: string) => void;
  onChangeOrganizerDescription: (value: string) => void;
  onChangeOrganizerAvatarUrl: (value: string) => void;
  onChangeOrganizerEmail: (value: string) => void;
  onChangeOrganizerPhone: (value: string) => void;
}

export const EventOrganizer: React.FC<EventOrganizerProps> = ({
  organizerName,
  organizerDescription,
  organizerAvatarUrl,
  organizerEmail,
  organizerPhone,
  onChangeOrganizerName,
  onChangeOrganizerDescription,
  onChangeOrganizerAvatarUrl,
  onChangeOrganizerEmail,
  onChangeOrganizerPhone,
}) => {
  const [name, setName] = useState(organizerName);
  const [description, setDescription] = useState(organizerDescription);
  const [avatarUrl, setAvatarUrl] = useState(organizerAvatarUrl);
  const [email, setEmail] = useState(organizerEmail);
  const [phone, setPhone] = useState(organizerPhone);

  useEffect(() => {
    setName(organizerName);
  }, [organizerName]);

  useEffect(() => {
    setDescription(organizerDescription);
  }, [organizerDescription]);

  useEffect(() => {
    setAvatarUrl(organizerAvatarUrl);
  }, [organizerAvatarUrl]);

  useEffect(() => {
    setEmail(organizerEmail);
  }, [organizerEmail]);

  useEffect(() => {
    setPhone(organizerPhone);
  }, [organizerPhone]);

  return (
    <div className="flex flex-col gap-6 p-6 bg-[#4E4B4B]/20 border border-[#4E4B4B]/80 rounded-lg">
      <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
        <UserCircle size={32} className="text-[#3BAFBB]" />
        Event Organizer
      </h2>

      {/* Nombre del organizador */}
      <div className="flex flex-col gap-3">
        <label className="text-white text-lg flex items-center gap-2">
          <UserCircle size={24} className="text-[#3BAFBB]" />
          Organizer Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            onChangeOrganizerName(e.target.value);
          }}
          placeholder="e.g., John Doe Productions"
          className="w-full px-4 py-3 bg-[#1C1A1A] border border-[#4E4B4B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3BAFBB]"
        />
      </div>

      {/* Descripción del organizador */}
      <div className="flex flex-col gap-3">
        <label className="text-white text-lg">
          Organizer Description
        </label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            onChangeOrganizerDescription(e.target.value);
          }}
          placeholder="Brief description about the organizer..."
          rows={3}
          className="w-full px-4 py-3 bg-[#1C1A1A] border border-[#4E4B4B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3BAFBB] resize-none"
        />
      </div>

      {/* Avatar URL del organizador */}
      <div className="flex flex-col gap-3">
        <label className="text-white text-lg flex items-center gap-2">
          <ImageIcon size={24} className="text-[#3BAFBB]" />
          Organizer Avatar URL
        </label>
        <input
          type="url"
          value={avatarUrl}
          onChange={(e) => {
            setAvatarUrl(e.target.value);
            onChangeOrganizerAvatarUrl(e.target.value);
          }}
          placeholder="https://example.com/avatar.jpg"
          className="w-full px-4 py-3 bg-[#1C1A1A] border border-[#4E4B4B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3BAFBB]"
        />
        {avatarUrl && (
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-[#1C1A1A] border border-[#3BAFBB]/30">
            <img
              src={avatarUrl}
              alt="Organizer avatar preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Email y teléfono del organizador */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <label className="text-white text-lg flex items-center gap-2">
            <EnvelopeSimple size={24} className="text-[#3BAFBB]" />
            Contact Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              onChangeOrganizerEmail(e.target.value);
            }}
            placeholder="organizer@example.com"
            className="w-full px-4 py-3 bg-[#1C1A1A] border border-[#4E4B4B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3BAFBB]"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-white text-lg flex items-center gap-2">
            <Phone size={24} className="text-[#3BAFBB]" />
            Contact Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              onChangeOrganizerPhone(e.target.value);
            }}
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-3 bg-[#1C1A1A] border border-[#4E4B4B] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#3BAFBB]"
          />
        </div>
      </div>

      {/* Sugerencias */}
      <div className="bg-[#3BAFBB]/10 border border-[#3BAFBB]/30 rounded-lg p-4 text-gray-300 text-sm">
        <p className="font-semibold text-[#3BAFBB] mb-2">💡 Sugerencias:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Proporciona información de contacto válida para consultas</li>
          <li>La descripción ayuda a los asistentes a conocer al organizador</li>
          <li>El avatar debe ser una imagen cuadrada (recomendado: 200x200px)</li>
        </ul>
      </div>
    </div>
  );
};


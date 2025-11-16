'use client';

import React from 'react';
import {
  MusicNotesPlus,
  MapPin,
} from '@phosphor-icons/react';
import { TimeInput } from '@/components/TimeInput';
import { CalendarDropdownSimple } from '@/components/CalendarDropdownSimple';
import { Dropdown } from '@/components/Dropdown';
import { InputField } from '@/components/InputField';
import { useEventForm } from './hooks/useEventForm';

export const EventDetails: React.FC = () => {
  const { eventForm, updateField } = useEventForm();

  // Extraer horas y minutos de startTime y endTime
  const [startHour, startMinute] = eventForm.startTime ? eventForm.startTime.split(':') : ['', ''];
  const [endHour, endMinute] = eventForm.endTime ? eventForm.endTime.split(':') : ['', ''];

  const getAmPm = (h: string) => {
    if (h === '') return '';
    const hour = Number(h);
    return hour >= 12 ? 'PM' : 'AM';
  };

  const handleTimeChange = (field: 'start' | 'end', hour: string, minute: string) => {
    const timeString = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
    if (field === 'start') {
      updateField('startTime', timeString);
    } else {
      updateField('endTime', timeString);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      updateField('date', date.toISOString());
    } else {
      updateField('date', '');
    }
  };

  // Convertir la fecha del store (string ISO) a objeto Date para el calendario
  const selectedDate = eventForm.date ? new Date(eventForm.date) : undefined;

  return (
    <div className="flex justify-center">
      <form className="bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 border border-pink-500/30 rounded-xl w-full max-w-[1400px] p-8 space-y-10 relative z-30 overflow-visible backdrop-blur-sm">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-cyan-400/5 pointer-events-none z-0"></div>
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-4 pb-2 border-b border-pink-500/30">
            <MusicNotesPlus
              className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
              size={36}
            />
            <div className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-2xl font-semibold relative">
              Event Details
              <div className="absolute inset-0 text-pink-500 blur-sm opacity-30">
                Event Details
              </div>
            </div>
          </div>

          {/* Event Title */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <div className="flex-1 flex flex-col gap-1">
              <InputField
                label="Event Title"
                required
                placeholder="Enter event title"
                value={eventForm.title}
                onChange={(value) => updateField('title', value)}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <InputField
                label="Category"
                required
                placeholder="Enter event category"
                value={eventForm.category}
                onChange={(value) => updateField('category', value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <InputField
              label="Description"
              required
              placeholder="Describe your event..."
              textarea
              value={eventForm.description}
              onChange={(value) => updateField('description', value)}
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col gap-1">
              <label className="text-cyan-300 text-md font-medium drop-shadow-sm">
                Date *
              </label>
              <div className="border border-pink-500/30 focus-within:border-cyan-400/60 focus-within:shadow-[0_0_15px_rgba(6,182,212,0.3)] py-1 px-4 rounded-lg bg-black/20 backdrop-blur-sm transition-all duration-300 relative z-50 h-12 flex items-center">
                <CalendarDropdownSimple
                  width="w-full"
                  location="right"
                  date={selectedDate}
                  onDateChange={handleDateChange}
                  placeholder="Select a date"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-cyan-300 text-md font-medium drop-shadow-sm">
                Time Range *
              </label>
              <div className="w-full">
                <TimeInput
                  startHour={startHour}
                  startMinute={startMinute}
                  endHour={endHour}
                  endMinute={endMinute}
                  setStartHour={(h) => handleTimeChange('start', h, startMinute)}
                  setStartMinute={(m) => handleTimeChange('start', startHour, m)}
                  setEndHour={(h) => handleTimeChange('end', h, endMinute)}
                  setEndMinute={(m) => handleTimeChange('end', endHour, m)}
                  getAmPm={getAmPm}
                />
              </div>
            </div>
          </div>

          {/* Address & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8">
            <div className="flex flex-col gap-1">
              <label className="text-cyan-300 text-md font-medium drop-shadow-sm">
                Address *
              </label>
              <div className="border border-pink-500/30 focus-within:border-cyan-400/60 focus-within:shadow-[0_0_15px_rgba(6,182,212,0.3)] px-4 rounded-lg bg-black/20 backdrop-blur-sm transition-all duration-300 h-12 flex items-center">
                <MapPin
                  size={18}
                  weight="bold"
                  className="text-cyan-400 mr-3 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
                />
                <input
                  type="text"
                  placeholder="Enter address"
                  value={eventForm.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  className="flex-1 bg-transparent text-cyan-300 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-cyan-300 text-md font-medium drop-shadow-sm">
                Location *
              </label>
              <div className="border border-pink-500/30 px-4 rounded-lg w-full flex items-center focus-within:border-cyan-400/60 focus-within:shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-black/20 backdrop-blur-sm transition-all duration-300 relative z-50 h-12">
                <Dropdown
                  selectedValue={eventForm.location}
                  onValueChange={(value) => updateField('location', value)}
                  className="w-full"
                  options={[
                    'Artigas',
                    'Canelones',
                    'Cerro Largo',
                    'Colonia',
                    'Durazno',
                    'Flores',
                    'Florida',
                    'Lavalleja',
                    'Maldonado',
                    'Montevideo',
                    'Paysandú',
                    'Río Negro',
                    'Rivera',
                    'Rocha',
                    'Salto',
                    'San José',
                    'Soriano',
                    'Tacuarembó',
                    'Treinta y Tres',
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Event Images - Ahora están en EventImages.tsx component */}
          {/* Main & Featured Event - Ahora están en EventImages.tsx component */}
        </div>
      </form>
    </div>
  );
};

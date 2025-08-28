'use client';

import React, { useState } from 'react';

// ✅ Todos los íconos desde Phosphor
import {
  MusicNotesPlus,
  Trash,
  FolderSimple,
  MapPin,
  Plus,
  ImageSquare,
  Check,
} from '@phosphor-icons/react';

import { TimeInput } from '@/components/TimeInput';
import { CalendarDropdownSimple } from '@/components/CalendarDropdownSimple';
import { Dropdown } from '@/components/Dropdown';
import { InputField } from '@/components/InputField';
import { InputFieldIcon } from '@/components/InputFieldIcon';

interface EventDetailsProps {
  eventDate: Date | undefined;
  setEventDate: (date: Date | undefined) => void;
  location: string;
  setLocation: (location: string) => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  eventDate,
  setEventDate,
  location,
  setLocation,
}) => {
  const [startHour, setStartHour] = useState<string>('');
  const [startMinute, setStartMinute] = useState<string>('');
  const [endHour, setEndHour] = useState<string>('');
  const [endMinute, setEndMinute] = useState<string>('');

  const [eventImages, setEventImages] = useState<string[]>([
    'https://example.com/event-image.jpg',
  ]);
  const [mainEventImage, setMainEventImage] = useState<string>(
    'https://example.com/main-event-image.jpg'
  );
  const [isMainEvent, setIsMainEvent] = useState<boolean>(true);
  const [isFeatured, setIsFeatured] = useState<boolean>(true);

  const getAmPm = (h: string) => {
    if (h === '') return '';
    const hour = Number(h);
    return hour >= 12 ? 'PM' : 'AM';
  };

  const handleAddImage = () => {
    setEventImages(prev => [...prev, '']);
  };

  const handleRemoveImage = (index: number) => {
    setEventImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (index: number, value: string) => {
    setEventImages(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleFileUpload = (index: number, file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file); // preview local image
    setEventImages(prev => {
      const next = [...prev];
      next[index] = url;
      return next;
    });
  };

  return (
    <div className="flex items-center justify-center gap-6 px-4">
      <form className="bg-[#3BAFBB1A] border border-[#3BAFBB] rounded-xl w-full max-w-[1400px] p-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <MusicNotesPlus className="text-[#3BAFBB]" size={36} />
          <p className="text-gray-300 text-2xl font-semibold">Event Details</p>
        </div>

        {/* Título y categoría */}
        <div className="mt-8 w-full flex gap-8">
          <InputField
            label="Event Title"
            required
            placeholder="Enter event title"
          />
          <InputField
            label="Category"
            required
            placeholder="Enter event category"
          />
        </div>

        {/* Descripción */}
        <InputField
          label="Description"
          required
          placeholder="Describe your event..."
          textarea
          className="mt-6"
        />

        <div className="mt-8 w-full flex gap-8 max-[970px]:flex-col h-20 items-center">
          <div className="flex flex-col w-full max-[970px]:order-2  ">
            <label className="text-gray-300 text-md mb-2">Date *</label>
            <div className="border-1 border-[#3BAFBB]/60 focus-within:border-2  focus-within:border-[#3BAFBB] py-1 px-4 rounded-lg focus-within:ring-[#3BAFBB]">
              <CalendarDropdownSimple
                width="w-1/2"
                location="right"
                date={eventDate}
                onDateChange={setEventDate}
                placeholder="Select a date"
              />
            </div>
          </div>

          <div className="flex flex-col w-full max-[970px]:order-1 ">
            <label className="text-gray-300 text-md  mb-2">Time Range *</label>
            <TimeInput
              startHour={startHour}
              startMinute={startMinute}
              endHour={endHour}
              endMinute={endMinute}
              setStartHour={setStartHour}
              setStartMinute={setStartMinute}
              setEndHour={setEndHour}
              setEndMinute={setEndMinute}
              getAmPm={getAmPm}
            />
          </div>
        </div>

        {/* Dirección y ubicación */}
        <div className="mt-8 w-full flex gap-8 max-[700px]:flex-col">
          <InputFieldIcon
            label="Address"
            required
            placeholder="Enter address"
            icon={<MapPin size={18} weight="bold" />}
          />

          <div className="flex flex-col w-full">
            <label className="text-gray-300 text-md mb-2">Location *</label>
            <div className="border border-[#3BAFBB] group h-full px-4 rounded-lg w-full flex items-center focus-within:border-2">
              <Dropdown
                selectedValue={location}
                onValueChange={setLocation}
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

        {/* Imágenes y opciones */}
        <div className="mt-10 border-t border-[#3BAFBB]/50 pt-8">
          <p className="text-gray-300 text-xl font-semibold mb-4">
            Event Images
          </p>

          {eventImages.map((img, index) => (
            <div key={index} className="flex items-end gap-2 mb-3">
              <div className="flex-1">
                <InputFieldIcon
                  label={`Image ${index + 1} URL`}
                  placeholder="https://example.com/event-image.jpg"
                  value={img}
                  onChange={val => handleImageChange(index, val)}
                  icon={<ImageSquare size={18} weight="bold" />}
                />
              </div>

              <label className="bg-[#3BAFBB] hover:bg-[#2f8f99] text-white px-3 py-2 rounded-lg cursor-pointer flex items-center justify-center h-[42px]">
                <FolderSimple size={18} weight="bold" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e =>
                    handleFileUpload(index, e.target.files?.[0] || null)
                  }
                />
              </label>

              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="bg-[#3baebb32] hover:bg-[#3baebb32]/20 text-white px-3 py-2 cursor-pointer rounded-lg flex items-center justify-center h-[42px]"
                aria-label={`Remove image ${index + 1}`}
                title="Remove"
              >
                <Trash size={18} weight="bold" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddImage}
            className="flex items-center cursor-pointer gap-2 text-[#3BAFBB] mt-2 hover:underline"
          >
            <Plus size={18} weight="bold" /> Add Image
          </button>

          {/* Main Event */}
          <div className="mt-6">
            <label
              className="flex items-center gap-3 text-gray-300 cursor-pointer select-none"
              onClick={() => setIsMainEvent(!isMainEvent)}
            >
              {/* cuadrado custom */}
              <div
                className={`h-5 w-5 flex items-center justify-center border rounded 
        border-[#3BAFBB] bg-[#3BAFBB1A] transition-all duration-200
        ${isMainEvent ? 'bg-[#3BAFBB80]' : ''}`}
              >
                {isMainEvent && <Check size={14} weight="bold" color="white" />}
              </div>
              {/* input escondido para accesibilidad */}
              <input
                type="checkbox"
                checked={isMainEvent}
                onChange={() => setIsMainEvent(!isMainEvent)}
                className="hidden"
              />
              Main Event
            </label>

            {isMainEvent && (
              <div className="mt-3">
                <InputField
                  label="Main Event Image"
                  required
                  value={mainEventImage}
                  onChange={setMainEventImage}
                  placeholder="https://example.com/main-event-image.jpg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  This image will be displayed on the main page
                </p>
              </div>
            )}
          </div>

          {/* Featured Event */}
          <div className="mt-6">
            <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={() => setIsFeatured(!isFeatured)}
                className="appearance-none h-5 w-5 cursor-pointer border border-[#3BAFBB] bg-[#3BAFBB1A] checked:bg-[#3BAFBB80] transition-all duration-200"
                style={{
                  backgroundImage: isFeatured
                    ? "url(\"data:image/svg+xml;utf8,<svg fill='white' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-3.75-3.75a1 1 0 011.414-1.414l3.043 3.043 7.543-7.543a1 1 0 011.414 0z' clip-rule='evenodd'/></svg>\")"
                    : 'none',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '14px',
                }}
              />
              Featured Event
            </label>
            <p className="text-sm text-gray-500 ml-7">
              Mark this event as featured for special promotion
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

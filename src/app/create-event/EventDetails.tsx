'use client';

import React, { useState } from 'react';

import { MusicNotesPlus, Trash, FolderSimple } from '@phosphor-icons/react';
import { MapPin, Plus } from 'lucide-react';
import { TimeInput } from '@/components/TimeInput';
import { CalendarDropdownSimple } from '@/components/CalendarDropdownSimple';

import { Dropdown } from '@/components/Dropdown';

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
    setEventImages([...eventImages, '']);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...eventImages];
    newImages.splice(index, 1);
    setEventImages(newImages);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...eventImages];
    newImages[index] = value;
    setEventImages(newImages);
  };

  const handleFileUpload = (index: number, file: File | null) => {
    if (!file) return;
    const newImages = [...eventImages];
    newImages[index] = URL.createObjectURL(file); // preview local image
    setEventImages(newImages);
  };

  return (
    <div className="flex items-center justify-center gap-6 px-4">
      <form className="bg-[#3BAFBB1A] border border-[#3BAFBB] rounded-xl w-full max-w-[1400px] p-8">
        <div className="flex items-center gap-4">
          <MusicNotesPlus className="text-[#3BAFBB]" size={36} />
          <p className="text-gray-300 text-2xl font-semibold">Event Details</p>
        </div>

        {/* Título y categoría */}
        <div className="mt-8 w-full flex gap-8">
          <div className="flex flex-col w-full">
            <label className="text-gray-300 text-md mb-2">Event Title *</label>
            <input
              type="text"
              className="border border-[#3BAFBB] rounded-lg w-full py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB]"
              placeholder="Enter event title"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-300 text-md mb-2">Category *</label>
            <input
              type="text"
              className="border border-[#3BAFBB] rounded-lg w-full py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB]"
              placeholder="Enter event category"
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="flex flex-col w-full mt-6">
          <label className="text-gray-300 text-md mb-2">Description *</label>
          <textarea
            className="border border-[#3BAFBB] rounded-lg w-full min-h-[180px] p-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB] resize-none"
            placeholder="Describe your event..."
          />
        </div>

        {/* Fecha y horario */}
        <div className="mt-8 w-full flex gap-8 max-[970px]:flex-col">
          <div className="flex flex-col w-full max-[970px]:order-2">
            <label className="text-gray-300 text-md mb-2">Date *</label>
            <div className="border border-[#3BAFBB] py-1 px-4 rounded-lg">
              <CalendarDropdownSimple
                width="w-1/2"
                location="right"
                date={eventDate}
                onDateChange={setEventDate}
                placeholder="Select a date"
              />
            </div>
          </div>
          <div className="flex flex-col w-full max-[970px]:order-1">
            <label className="text-gray-300 text-md mb-2">Time Range *</label>
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
          <div className="flex flex-col w-full">
            <label className="text-gray-300 text-md mb-2">Address *</label>
            <div className="border border-[#3BAFBB] flex py-2 px-4 rounded-lg gap-2">
              <div className="flex items-center gap-2 w-full ml-2">
                <MapPin className="h-full text-[#3BAFBB] w-4" />
                <input
                  type="text"
                  className="border-none placeholder:text-sm outline-none w-full text-gray-300 bg-transparent"
                  placeholder="Enter address"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-300 text-md mb-2">Location *</label>
            <div className="border border-[#3BAFBB] h-full px-4 rounded-lg w-full flex items-center">
              <Dropdown
                selectedValue={location}
                onValueChange={setLocation}
                className="w-full "
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

        {/* === SECCIÓN NUEVA: IMÁGENES Y OPCIONES === */}
        <div className="mt-10 border-t border-[#3BAFBB]/50 pt-8">
          <p className="text-gray-300 text-xl font-semibold mb-4">
            Event Images
          </p>

          {eventImages.map((img, index) => (
            <div key={index} className="flex items-center gap-2 mb-3">
              <input
                type="text"
                value={img}
                onChange={e => handleImageChange(index, e.target.value)}
                className="border border-[#3BAFBB] rounded-lg w-full py-2 px-4 text-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB]"
                placeholder="https://example.com/event-image.jpg"
              />

              <label className="bg-[#3BAFBB] hover:bg-[#2f8f99] text-white px-3 py-2 rounded-lg cursor-pointer flex items-center justify-center">
                <FolderSimple size={18} />
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
                className="bg-[#3baebb32] hover:bg-[#3baebb32]/20 text-white px-3 py-2 cursor-pointer rounded-lg flex items-center justify-center"
              >
                <Trash size={18} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddImage}
            className="flex items-center cursor-pointer gap-2 text-[#3BAFBB] mt-2 hover:underline"
          >
            <Plus size={18} /> Add Image
          </button>

          {/* Main Event */}
          <div className="mt-6">
            <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isMainEvent}
                onChange={() => setIsMainEvent(!isMainEvent)}
                className={`
        appearance-none h-5 w-5 cursor-pointer border border-[#3BAFBB]
        bg-[#3BAFBB1A] 
        checked:bg-[#3BAFBB80]
        flex items-center justify-center
        transition-all duration-200
      `}
                style={{
                  backgroundImage: isMainEvent
                    ? "url(\"data:image/svg+xml;utf8,<svg fill='white' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-3.75-3.75a1 1 0 011.414-1.414l3.043 3.043 7.543-7.543a1 1 0 011.414 0z' clip-rule='evenodd'/></svg>\")"
                    : 'none',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '14px',
                }}
              />
              Main Event
            </label>

            {isMainEvent && (
              <div className="mt-3">
                <label className="text-gray-300 text-md mb-2 block">
                  Main Event Image *
                </label>
                <input
                  type="text"
                  value={mainEventImage}
                  onChange={e => setMainEventImage(e.target.value)}
                  className="border border-[#3BAFBB] rounded-lg w-full py-2 px-4 text-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB]"
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
                className={`
        appearance-none h-5 w-5 cursor-pointer border border-[#3BAFBB]
        bg-[#3BAFBB1A] 
        checked:bg-[#3BAFBB80]
        flex items-center justify-center
        transition-all duration-200
      `}
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

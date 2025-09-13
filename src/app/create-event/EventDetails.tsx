'use client';

import React, { useState } from 'react';
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

  const handleAddImage = () => setEventImages(prev => [...prev, '']);
  const handleRemoveImage = (index: number) =>
    setEventImages(prev => prev.filter((_, i) => i !== index));
  const handleImageChange = (index: number, value: string) => {
    setEventImages(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };
  const handleFileUpload = (index: number, file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setEventImages(prev => {
      const next = [...prev];
      next[index] = url;
      return next;
    });
  };

  return (
    <div className="flex justify-center">
      <form className="bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 border border-pink-500/30 rounded-xl w-full max-w-[1400px] p-8 space-y-10 relative overflow-hidden backdrop-blur-sm">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-cyan-400/5 pointer-events-none"></div>
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
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <InputField
                label="Category"
                required
                placeholder="Enter event category"
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
                  date={eventDate}
                  onDateChange={setEventDate}
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
                  setStartHour={setStartHour}
                  setStartMinute={setStartMinute}
                  setEndHour={setEndHour}
                  setEndMinute={setEndMinute}
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

          {/* Event Images */}
          <div className="pt-8 space-y-4">
            <div className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-xl font-semibold mb-4 relative">
              Event Images
              <div className="absolute inset-0 text-pink-500 blur-sm opacity-30">
                Event Images
              </div>
            </div>
            {eventImages.map((img, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-end  gap-2"
              >
                <div className="flex-1">
                  <InputFieldIcon
                    label={`Image ${index + 1} URL`}
                    placeholder="https://example.com/event-image.jpg"
                    value={img}
                    onChange={val => handleImageChange(index, val)}
                    icon={<ImageSquare size={18} weight="bold" />}
                  />
                </div>
                <div className="max-[700px]:px-20 max-[700px]:w-full max-[700px]:flex-col gap-2 px-3 py-2 rounded-lg cursor-pointer flex">
                  <label className="bg-gradient-to-r from-cyan-400/60 to-cyan-500/60 hover:from-cyan-400/80 hover:to-cyan-500/80 text-white px-3 py-2 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-105 border border-pink-500/30 backdrop-blur-sm">
                    <FolderSimple
                      size={18}
                      weight="bold"
                      className="drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"
                    />
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
                    className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 text-cyan-300 px-3 py-2 cursor-pointer rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] border border-pink-500/30 backdrop-blur-sm"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <Trash
                      size={18}
                      weight="bold"
                      className="drop-shadow-[0_0_4px_rgba(6,182,212,0.2)]"
                    />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddImage}
              className="flex items-center cursor-pointer gap-2 text-cyan-400 mt-2 hover:text-pink-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] font-medium"
            >
              <Plus
                size={18}
                weight="bold"
                className="drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
              />{' '}
              Add Image
            </button>

            {/* Main & Featured Event */}
            <div className="space-y-4 mt-6 border-t border-pink-500/30 pt-6">
              <label
                className="flex items-center gap-3 text-cyan-300 cursor-pointer select-none hover:text-pink-400 transition-all duration-300"
                onClick={() => setIsMainEvent(!isMainEvent)}
              >
                <div
                  className={`h-5 w-5 flex items-center justify-center border rounded border-pink-500/40 bg-pink-500/10 backdrop-blur-sm transition-all duration-200 hover:shadow-[0_0_10px_rgba(236,72,153,0.4)] ${
                    isMainEvent
                      ? 'bg-gradient-to-r from-pink-500/60 to-cyan-400/60 shadow-[0_0_8px_rgba(236,72,153,0.6)]'
                      : ''
                  }`}
                >
                  {isMainEvent && (
                    <Check
                      size={14}
                      weight="bold"
                      color="white"
                      className="drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
                    />
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={isMainEvent}
                  onChange={() => setIsMainEvent(!isMainEvent)}
                  className="hidden"
                />
                Main Event
              </label>

              {isMainEvent && (
                <div className="flex flex-col gap-2">
                  <InputField
                    label="Main Event Image"
                    required
                    value={mainEventImage}
                    onChange={setMainEventImage}
                    placeholder="https://example.com/main-event-image.jpg"
                  />
                  <p className="text-sm text-gray-400 mt-1 italic">
                    This image will be displayed on the main page
                  </p>
                </div>
              )}

              <label className="flex items-center gap-3 text-cyan-300 cursor-pointer hover:text-pink-400 transition-all duration-300">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={() => setIsFeatured(!isFeatured)}
                  className={`appearance-none h-5 w-5 cursor-pointer border border-pink-500/40 bg-pink-500/10 backdrop-blur-sm transition-all duration-200 hover:shadow-[0_0_10px_rgba(236,72,153,0.4)] ${
                    isFeatured
                      ? 'bg-gradient-to-r from-pink-500/60 to-cyan-400/60 shadow-[0_0_8px_rgba(236,72,153,0.6)]'
                      : ''
                  }`}
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
              <p className="text-sm text-gray-400 ml-7 italic">
                Mark this event as featured for special promotion
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

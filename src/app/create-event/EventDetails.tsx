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
      <form className="bg-[#3BAFBB1A] border border-[#3BAFBB] rounded-xl w-full max-w-[1400px] p-8 space-y-10 relative overflow-hidden shadow-2xl">
        {/* Neon glow effect for form */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#3BAFBB]/10 via-cyan-400/5 to-[#3BAFBB]/10 blur-xl"></div>
        <div className="absolute inset-0 rounded-xl border border-[#3BAFBB]/30 shadow-[0_0_20px_rgba(59,175,187,0.3)]"></div>
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-4 pb-2 border-b border-[#3BAFBB]/20">
            <MusicNotesPlus
              className="text-[#3BAFBB] drop-shadow-[0_0_10px_rgba(59,175,187,0.8)] filter brightness-125"
              size={36}
            />
            <p className="text-gray-300 text-2xl font-semibold relative">
              Event Details
              <div className="absolute inset-0 text-[#3BAFBB] blur-sm opacity-40">
                Event Details
              </div>
            </p>
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
          <InputField
            label="Description"
            required
            placeholder="Describe your event..."
            textarea
          />

          {/* Date & Time */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-gray-300 text-md font-medium drop-shadow-sm">
                Date *
              </label>
              <div className="border border-[#3BAFBB]/60 focus-within:border-2 focus-within:border-[#3BAFBB] focus-within:shadow-[0_0_15px_rgba(59,175,187,0.4)] py-1 px-4 rounded-lg bg-black/20 transition-all duration-300">
                <CalendarDropdownSimple
                  width="w-full"
                  location="right"
                  date={eventDate}
                  onDateChange={setEventDate}
                  placeholder="Select a date"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label className="text-gray-300 text-md font-medium drop-shadow-sm">
                Time Range *
              </label>
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

          {/* Address & Location */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <div className="flex-1 flex flex-col gap-1">
              <InputFieldIcon
                label="Address"
                required
                placeholder="Enter address"
                icon={<MapPin size={18} weight="bold" />}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label className="text-gray-300 text-md font-medium drop-shadow-sm">
                Location *
              </label>
              <div className="border border-[#3BAFBB] px-4 rounded-lg w-full flex items-center focus-within:border-2 focus-within:shadow-[0_0_15px_rgba(59,175,187,0.4)] bg-black/20 transition-all duration-300">
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
          <div className="border-t border-[#3BAFBB]/50 pt-8 space-y-4">
            <p className="text-gray-300 text-xl font-semibold mb-4 relative">
              Event Images
              <div className="absolute inset-0 text-[#3BAFBB] blur-sm opacity-30">
                Event Images
              </div>
            </p>
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
                  <label className="bg-[#3BAFBB] hover:bg-[#2f8f99] text-white px-3 py-2 rounded-lg cursor-pointer flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,175,187,0.6)] hover:scale-105 border border-[#3BAFBB]/50">
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
                    className="bg-[#3baebb32] hover:bg-[#3baebb32]/20 text-white px-3 py-2 cursor-pointer rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,175,187,0.4)] border border-[#3BAFBB]/30"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <Trash size={18} weight="bold" />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddImage}
              className="flex items-center cursor-pointer gap-2 text-[#3BAFBB] mt-2 hover:text-cyan-300 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(59,175,187,0.8)] font-medium"
            >
              <Plus size={18} weight="bold" /> Add Image
            </button>

            {/* Main & Featured Event */}
            <div className="space-y-4 mt-6 border-t border-[#3BAFBB]/30 pt-6">
              <label
                className="flex items-center gap-3 text-gray-300 cursor-pointer select-none hover:text-cyan-300 transition-all duration-300"
                onClick={() => setIsMainEvent(!isMainEvent)}
              >
                <div
                  className={`h-5 w-5 flex items-center justify-center border rounded border-[#3BAFBB] bg-[#3BAFBB1A] transition-all duration-200 hover:shadow-[0_0_10px_rgba(59,175,187,0.4)] ${
                    isMainEvent
                      ? 'bg-[#3BAFBB80] shadow-[0_0_8px_rgba(59,175,187,0.6)]'
                      : ''
                  }`}
                >
                  {isMainEvent && (
                    <Check size={14} weight="bold" color="white" />
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

              <label className="flex items-center gap-3 text-gray-300 cursor-pointer hover:text-cyan-300 transition-all duration-300">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={() => setIsFeatured(!isFeatured)}
                  className={`appearance-none h-5 w-5 cursor-pointer border border-[#3BAFBB] bg-[#3BAFBB1A] checked:bg-[#3BAFBB80] transition-all duration-200 hover:shadow-[0_0_10px_rgba(59,175,187,0.4)] ${
                    isFeatured ? 'shadow-[0_0_8px_rgba(59,175,187,0.6)]' : ''
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

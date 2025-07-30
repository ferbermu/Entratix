// Eliminado código inválido fuera de módulo
import React from 'react';
import { CalendarDropdown } from '@/components/CalendarDropdown';
import { LocationDropdown } from '@/components/LocationDropdown';
import { MusicNotesPlus } from '@phosphor-icons/react';
import { MapPin } from 'lucide-react';
import { TimeInput } from '@/components/TimeInput';
import { DateRange } from 'react-day-picker';

interface EventDetailsProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  location: string;
  setLocation: (location: string) => void;
  hour: number | '';
  setHour: (val: number | '') => void;
  minute: number | '';
  setMinute: (val: number | '') => void;
  getAmPm: (h: number | '') => string;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  date,
  setDate,
  location,
  setLocation,
  hour,
  setHour,
  minute,
  setMinute,
  getAmPm,
}) => (
  <div className="flex items-center justify-center gap-6 px-4">
    <form className="bg-[#3BAFBB1A] border border-[#3BAFBB] rounded-xl w-full max-w-[1400px] p-8">
      <div className="flex items-center gap-4">
        <MusicNotesPlus className="text-[#3BAFBB] " size={36} />
        <p className="text-gray-300 text-2xl font-semibold">Event Details</p>
      </div>
      <div className="mt-8 w-full flex gap-8">
        <div className="flex flex-col w-full">
          <label className="text-gray-300 text-md  mb-2">Event Title *</label>
          <input
            type="text"
            className="border border-[#3BAFBB] rounded-lg w-full py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB]"
            placeholder="Enter event title"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-gray-300 text-md  mb-2">Category *</label>
          <input
            type="text"
            className="border border-[#3BAFBB] rounded-lg w-full py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB]"
            placeholder="Enter event category"
          />
        </div>
      </div>
      <div className="flex flex-col w-full mt-6">
        <label className="text-gray-300 text-md  mb-2">Description *</label>
        <textarea
          className="border border-[#3BAFBB] rounded-lg w-full min-h-[180px] p-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB] resize-none"
          placeholder="Describe your event..."
        />
      </div>
      <div className="mt-8 w-full flex gap-8">
        <div className="flex flex-col w-full">
          <label className="text-gray-300 text-md  mb-2">Date *</label>
          <div className="border border-[#3BAFBB] py-1 px-4 rounded-lg">
            <CalendarDropdown
              width="w-1/2"
              location="right"
              date={date}
              onDateChange={setDate}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-gray-300 text-md mb-2">Time *</label>
          <TimeInput
            hour={hour}
            minute={minute}
            setHour={setHour}
            setMinute={setMinute}
            getAmPm={getAmPm}
          />
        </div>
      </div>
      <div className="mt-8 w-full flex gap-8 ">
        <div className="flex flex-col w-full ">
          <label className="text-gray-300 text-md  mb-2">Time *</label>
          <div className="border  border-[#3BAFBB]  flex py-2 px-4 rounded-lg gap-2">
            <div className="flex items-center gap-2 w-full ml-2">
              <MapPin className="h-full text-[#3BAFBB] w-4" />
              <input
                type="text"
                className="border-none placeholder:text-sm outline-none w-full text-gray-300"
                placeholder="Enter address"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <label className="text-gray-300 text-md mb-2">Location *</label>
          <div className="border  border-[#3BAFBB] h-full px-4 rounded-lg ">
            <LocationDropdown
              selectedValue={location}
              onValueChange={setLocation}
              width="w-full"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
);

import React, { useState } from 'react';
import { LocationDropdown } from '@/components/LocationDropdown';
import { MusicNotesPlus } from '@phosphor-icons/react';
import { MapPin } from 'lucide-react';
import { TimeInput } from '@/components/TimeInput';
import { CalendarDropdownSimple } from '@/components/CalendarDropdownSimple';

interface EventDetailsProps {
  eventDate: Date | undefined;
  setEventDate: (date: Date | undefined) => void;
  location: string;
  setLocation: (location: string) => void;
  title?: string;
  category?: string;
  description?: string;
  address?: string;
  startTime?: string;
  endTime?: string;
  onChangeTitle?: (v: string) => void;
  onChangeCategory?: (v: string) => void;
  onChangeDescription?: (v: string) => void;
  onChangeAddress?: (v: string) => void;
  onChangeTimes?: (start: string, end: string) => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  eventDate,
  setEventDate,
  location,
  setLocation,
  title = '',
  category = '',
  description = '',
  address = '',
  startTime = '',
  endTime = '',
  onChangeTitle,
  onChangeCategory,
  onChangeDescription,
  onChangeAddress,
  onChangeTimes,
}) => {
  // Parse startTime and endTime from props
  const [sh = '', sm = ''] = startTime.split(':');
  const [eh = '', em = ''] = endTime.split(':');

  const [startHour, setStartHour] = useState<string>(sh);
  const [startMinute, setStartMinute] = useState<string>(sm);
  const [endHour, setEndHour] = useState<string>(eh);
  const [endMinute, setEndMinute] = useState<string>(em);

  // Sync local state when props change
  React.useEffect(() => {
    const [newSh = '', newSm = ''] = startTime.split(':');
    const [newEh = '', newEm = ''] = endTime.split(':');
    setStartHour(newSh);
    setStartMinute(newSm);
    setEndHour(newEh);
    setEndMinute(newEm);
  }, [startTime, endTime]);

  const getAmPm = (h: string) => {
    if (h === '') return '';
    const hour = Number(h);
    return hour >= 12 ? 'PM' : 'AM';
  };

  const pad2 = (v: string) => (v && v.length === 1 ? `0${v}` : v);
  const notifyTimes = (
    nextStartHour?: string,
    nextStartMinute?: string,
    nextEndHour?: string,
    nextEndMinute?: string
  ) => {
    if (!onChangeTimes) return;
    const sh = pad2(nextStartHour ?? startHour);
    const sm = pad2(nextStartMinute ?? startMinute);
    const eh = pad2(nextEndHour ?? endHour);
    const em = pad2(nextEndMinute ?? endMinute);
    const start = sh && sm ? `${sh}:${sm}` : '';
    const end = eh && em ? `${eh}:${em}` : '';
    onChangeTimes(start, end);
  };

  return (
    <div className="flex items-center justify-center gap-6 px-4">
      <form className="bg-[#3BAFBB1A] border border-[#3BAFBB] rounded-xl w-full max-w-[1400px] p-8">
        <div className="flex items-center gap-4">
          <MusicNotesPlus className="text-[#3BAFBB]" size={36} />
          <p className="text-gray-300 text-2xl font-semibold">Event Details</p>
        </div>

        <div className="mt-8 w-full flex gap-8">
          <div className="flex flex-col w-full">
            <label className="text-gray-300 text-md mb-2">Event Title *</label>
            <input
              type="text"
              value={title}
              className="border border-[#3BAFBB] rounded-lg w-full py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB]"
              placeholder="Enter event title"
              onChange={e => onChangeTitle?.(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-300 text-md mb-2">Category *</label>
            <input
              type="text"
              value={category}
              className="border border-[#3BAFBB] rounded-lg w-full py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB]"
              placeholder="Enter event category"
              onChange={e => onChangeCategory?.(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col w-full mt-6">
          <label className="text-gray-300 text-md mb-2">Description *</label>
          <textarea
            value={description}
            className="border border-[#3BAFBB] rounded-lg w-full min-h-[180px] p-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB] resize-none"
            placeholder="Describe your event..."
            onChange={e => onChangeDescription?.(e.target.value)}
          />
        </div>

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
              setStartHour={(v: string) => {
                setStartHour(v);
                notifyTimes(v, undefined, undefined, undefined);
              }}
              setStartMinute={(v: string) => {
                setStartMinute(v);
                notifyTimes(undefined, v, undefined, undefined);
              }}
              setEndHour={(v: string) => {
                setEndHour(v);
                notifyTimes(undefined, undefined, v, undefined);
              }}
              setEndMinute={(v: string) => {
                setEndMinute(v);
                notifyTimes(undefined, undefined, undefined, v);
              }}
              getAmPm={getAmPm}
            />
          </div>
        </div>

        <div className="mt-8 w-full flex gap-8 max-[700px]:flex-col">
          <div className="flex flex-col w-full">
            <label className="text-gray-300 text-md mb-2">Address *</label>
            <div className="border border-[#3BAFBB] flex py-2 px-4 rounded-lg gap-2">
              <div className="flex items-center gap-2 w-full ml-2">
                <MapPin className="h-full text-[#3BAFBB] w-4" />
                <input
                  type="text"
                  value={address}
                  className="border-none placeholder:text-sm outline-none w-full text-gray-300"
                  placeholder="Enter address"
                  onChange={e => onChangeAddress?.(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-300 text-md mb-2">Location *</label>
            <div className="border border-[#3BAFBB] h-full px-4 rounded-lg w-full">
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
};

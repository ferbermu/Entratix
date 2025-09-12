import React from 'react';
import { Clock } from '@phosphor-icons/react';

interface TimeInputProps {
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  setStartHour: (val: string) => void;
  setStartMinute: (val: string) => void;
  setEndHour: (val: string) => void;
  setEndMinute: (val: string) => void;
  getAmPm: (h: string) => string;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  startHour,
  startMinute,
  endHour,
  endMinute,
  setStartHour,
  setStartMinute,
  setEndHour,
  setEndMinute,
  getAmPm,
}) => {
  const handleHourChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setHour: (val: string) => void,
    nextInputId?: string
  ) => {
    const val = e.target.value;
    if (/^\d{0,2}$/.test(val)) {
      if (val === '' || (Number(val) >= 0 && Number(val) <= 23)) {
        setHour(val);
        if (val.length === 2 && nextInputId) {
          const nextInput = document.getElementById(
            nextInputId
          ) as HTMLInputElement | null;
          if (nextInput) {
            nextInput.focus();
            setTimeout(() => {
              nextInput.setSelectionRange(
                nextInput.value.length,
                nextInput.value.length
              );
            }, 0);
          }
        }
      }
    }
  };

  const handleMinuteChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setMinute: (val: string) => void,
    nextInputId?: string
  ) => {
    const val = e.target.value;
    if (/^\d{0,2}$/.test(val)) {
      if (val === '' || (Number(val) >= 0 && Number(val) <= 59)) {
        setMinute(val);
        if (val.length === 2 && nextInputId) {
          const nextInput = document.getElementById(
            nextInputId
          ) as HTMLInputElement | null;
          if (nextInput) {
            nextInput.focus();
            setTimeout(() => {
              nextInput.setSelectionRange(
                nextInput.value.length,
                nextInput.value.length
              );
            }, 0);
          }
        }
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    prevInputId?: string,
    nextInputId?: string
  ) => {
    if (e.key === 'ArrowRight' && nextInputId) {
      const nextInput = document.getElementById(
        nextInputId
      ) as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
        setTimeout(() => {
          nextInput.setSelectionRange(
            nextInput.value.length,
            nextInput.value.length
          );
        }, 0);
      }
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' && prevInputId) {
      const prevInput = document.getElementById(
        prevInputId
      ) as HTMLInputElement | null;
      if (prevInput) {
        prevInput.focus();
        setTimeout(() => {
          prevInput.setSelectionRange(
            prevInput.value.length,
            prevInput.value.length
          );
        }, 0);
      }
      e.preventDefault();
    } else if (
      !['ArrowRight', 'ArrowLeft', 'Backspace', 'Tab', 'Delete'].includes(
        e.key
      ) &&
      !/\d/.test(e.key)
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex gap-4 w-full max-[700px]:flex-col max-[700px]:gap-3 max-[700px]:mb-4 h-12 max-[700px]:h-auto">
      {/* Start Time */}
      <div className="border border-pink-500/30 focus-within:border-cyan-400/60 focus-within:shadow-[0_0_15px_rgba(6,182,212,0.3)] flex py-2 px-4 rounded-lg gap-1 items-center w-1/2 max-[700px]:w-full bg-black/20 backdrop-blur-sm transition-all duration-300 h-full max-[700px]:h-12">
        <Clock
          className="text-cyan-400 ml-2 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
          size={16}
        />
        <span className="text-cyan-300 text-sm mr-2 max-[700px]:text-xs w-20 max-[700px]:w-16 shrink-0 truncate">
          Start:
        </span>

        <input
          id="start-hour-input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={startHour}
          onChange={e =>
            handleHourChange(e, setStartHour, 'start-minute-input')
          }
          className="border-none outline-none w-8 max-[700px]:w-10 text-cyan-300 text-center bg-transparent no-spinner placeholder-gray-400"
          placeholder="HH"
          maxLength={2}
          onKeyDown={e => handleKeyDown(e, undefined, 'start-minute-input')}
        />
        <span className="text-cyan-300">:</span>
        <input
          id="start-minute-input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={startMinute}
          onChange={e => handleMinuteChange(e, setStartMinute)}
          className="border-none outline-none w-8 max-[700px]:w-10 text-cyan-300 text-center bg-transparent no-spinner placeholder-gray-400"
          placeholder="MM"
          maxLength={2}
          onKeyDown={e => handleKeyDown(e, 'start-hour-input')}
        />
        <span className="ml-2 text-cyan-300 font-semibold text-sm max-[700px]:text-xs w-8 text-center shrink-0">
          {getAmPm(startHour)}
        </span>
      </div>

      {/* End Time */}
      <div className="border border-pink-500/30 focus-within:border-cyan-400/60 focus-within:shadow-[0_0_15px_rgba(6,182,212,0.3)] flex py-2 px-4 rounded-lg gap-1 items-center w-1/2 max-[700px]:w-full bg-black/20 backdrop-blur-sm transition-all duration-300 h-full max-[700px]:h-12">
        <Clock
          className="text-cyan-400 ml-2 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
          size={16}
        />
        <span className="text-cyan-300 text-sm mr-2 max-[700px]:text-xs w-20 max-[700px]:w-16 shrink-0 truncate">
          End (optional):
        </span>

        <input
          id="end-hour-input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={endHour}
          onChange={e => handleHourChange(e, setEndHour, 'end-minute-input')}
          className="border-none outline-none w-8 max-[700px]:w-10 text-cyan-300 text-center bg-transparent no-spinner placeholder-gray-400"
          placeholder="HH"
          maxLength={2}
          onKeyDown={e => handleKeyDown(e, undefined, 'end-minute-input')}
        />
        <span className="text-cyan-300">:</span>
        <input
          id="end-minute-input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={endMinute}
          onChange={e => handleMinuteChange(e, setEndMinute)}
          className="border-none outline-none w-8 max-[700px]:w-10 text-cyan-300 text-center bg-transparent no-spinner placeholder-gray-400"
          placeholder="MM"
          maxLength={2}
          onKeyDown={e => handleKeyDown(e, 'end-hour-input')}
        />
        <span className="ml-2 text-cyan-300 font-semibold text-sm max-[700px]:text-xs w-8 text-center shrink-0">
          {endHour !== '' ? getAmPm(endHour) : ''}
        </span>
      </div>
    </div>
  );
};

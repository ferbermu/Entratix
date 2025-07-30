import React from 'react';
import { Clock } from '@phosphor-icons/react';

interface TimeInputProps {
  hour: number | '';
  minute: number | '';
  setHour: (val: number | '') => void;
  setMinute: (val: number | '') => void;
  getAmPm: (h: number | '') => string;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  hour,
  minute,
  setHour,
  setMinute,
  getAmPm,
}) => {
  return (
    <div className="border border-[#3BAFBB] flex py-2 px-4 rounded-lg gap-1 items-center">
      <Clock className="text-[#3BAFBB] ml-2" size={16} />
      <input
        id="hour-input"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={hour}
        onChange={e => {
          const val = e.target.value;
          if (/^\d{0,2}$/.test(val)) {
            let num: number | '' = '';
            if (val === '') {
              num = '';
            } else {
              const n = Number(val);
              num = Math.max(0, Math.min(23, n));
              if (n > 23) num = 23;
            }
            setHour(num);
            if (val.length === 2) {
              const minuteInput = document.getElementById(
                'minute-input'
              ) as HTMLInputElement | null;
              if (minuteInput) {
                minuteInput.focus();
                setTimeout(() => {
                  minuteInput.setSelectionRange(
                    minuteInput.value.length,
                    minuteInput.value.length
                  );
                }, 0);
              }
            }
          }
        }}
        className="border-none outline-none w-8 text-gray-300 text-center bg-transparent no-spinner"
        placeholder="HH"
        maxLength={2}
        style={{ marginRight: '-2px' }}
        onKeyDown={e => {
          if (e.key === 'ArrowRight') {
            const minuteInput = document.getElementById(
              'minute-input'
            ) as HTMLInputElement | null;
            if (minuteInput) {
              minuteInput.focus();
              setTimeout(() => {
                minuteInput.setSelectionRange(
                  minuteInput.value.length,
                  minuteInput.value.length
                );
              }, 0);
            }
          }
          if (
            !['ArrowRight', 'ArrowLeft', 'Backspace', 'Tab'].includes(e.key) &&
            !/\d/.test(e.key)
          ) {
            e.preventDefault();
          }
        }}
      />
      <span className="text-gray-300">:</span>
      <input
        id="minute-input"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={minute}
        onChange={e => {
          const val = e.target.value;
          if (/^\d{0,2}$/.test(val)) {
            let num: number | '' = '';
            if (val === '') {
              num = '';
            } else {
              const n = Number(val);
              num = Math.max(0, Math.min(59, n));
              if (n > 59) num = 59;
            }
            setMinute(num);
          }
        }}
        className="border-none outline-none w-8 text-gray-300 text-center bg-transparent no-spinner"
        placeholder="MM"
        maxLength={2}
        style={{ marginLeft: '-2px' }}
        onKeyDown={e => {
          if (e.key === 'ArrowLeft') {
            const hourInput = document.getElementById(
              'hour-input'
            ) as HTMLInputElement | null;
            if (hourInput) {
              hourInput.focus();
              setTimeout(() => {
                hourInput.setSelectionRange(
                  hourInput.value.length,
                  hourInput.value.length
                );
              }, 0);
            }
          }
          if (
            !['ArrowRight', 'ArrowLeft', 'Backspace', 'Tab'].includes(e.key) &&
            !/\d/.test(e.key)
          ) {
            e.preventDefault();
          }
        }}
      />
      <span className="ml-2 text-gray-300 font-semibold">{getAmPm(hour)}</span>
    </div>
  );
};

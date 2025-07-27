import React from 'react';
import Image from 'next/image';
import { Download, QrCode, ShareNetwork } from '@phosphor-icons/react';

export interface CardTicketProps {
  status: string;
  imageUrl: string;
  title: string;
  artists: string;
  date: string;
  time: string;
  location: string;
  ticketType: string;
  ticketPrice: string;
  totalPaid: string;
}

export const CardTicket: React.FC<CardTicketProps> = ({
  status,
  imageUrl,
  title,
  artists,
  date,
  time,
  location,
  ticketType,
  ticketPrice,
  totalPaid,
}) => {
  return (
    <div className="flex flex-col bg-[#3BAFBB1A] border border-[#3BAFBB] rounded-xl w-full max-w-xl p-4 text-white relative">
      {' '}
      <span className="absolute top-4 right-4 bg-[#19c37d] text-white text-xs px-4 py-1 rounded-full font-semibold">
        {status}
      </span>
      <div className="flex gap-6">
        <div className="rounded-lg overflow-hidden min-w-[120px] h-[120px] relative">
          <Image
            src={imageUrl}
            alt="Ticket Image"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between w-full">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-300">{artists}</p>
          <div className="flex items-center gap-2 text-sm text-gray-300 mt-2">
            <Image
              src="/assets/icons/cards/calendar_month.svg"
              alt="date"
              width={18}
              height={18}
            />
            <span>{date}</span>
            <span className="mx-1">•</span>
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
            <Image
              src="/assets/icons/cards/location.svg"
              alt="location"
              width={18}
              height={18}
            />
            <span>{location}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col divide-y divide-[#3BAFBB33] my-4">
        <div className="flex justify-between items-center text-sm py-2">
          <span>{ticketType}</span>
          <span className="font-semibold text-[#3BAFBB]">{ticketPrice}</span>
        </div>
        <div className="flex justify-between items-center text-base font-semibold py-2">
          <span>Total Paid</span>
          <span className="text-[#3BAFBB]">{totalPaid}</span>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button className="flex items-center gap-2 bg-[#a259ff] text-white px-4 py-2 rounded-lg text-sm font-semibold">
          <QrCode size={16} />
          View QR
        </button>
        <button className="flex items-center gap-2 border border-[#3BAFBB] text-white px-4 py-2 rounded-lg text-sm font-semibold">
          <Download size={16} />
          Download
        </button>
        <button className="flex items-center justify-center px-3 py-2 rounded-lg border border-transparent hover:bg-[#3BAFBB22]">
          <ShareNetwork size={16} />
        </button>
      </div>
    </div>
  );
};

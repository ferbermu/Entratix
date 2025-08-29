'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import { Download, QrCode, ShareNetwork } from '@phosphor-icons/react';
import { Modal } from './ModalQr'; // 👈 importa el nuevo modal

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
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <div className="flex flex-col bg-[#3BAFBB1A] border border-[#3BAFBB] rounded-xl w-full p-4 text-white relative ">
        {/* Status */}
        <span className="absolute top-4 right-4 border border-[#19c37d] bg-[#19c37d]/10 text-[#19c37d] text-xs px-4 font-semibold rounded-full z-1 max-[700px]:rounded-none max-[700px]:rounded-tr-lg">
          {status}
        </span>

        {/* Contenido */}
        <div className="flex max-[700px]:flex-col gap-6">
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

        {/* Detalles */}
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

        {/* Acciones */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowQR(true)}
            className="cursor-pointer flex items-center gap-2 bg-[#3BAFBB] text-white px-4 py-2 rounded-lg text-sm max-[700px]:text-xs font-semibold"
          >
            <QrCode size={16} />
            View QR
          </button>
          <button className="cursor-pointer flex items-center gap-2 border border-[#3BAFBB] text-white px-4 py-2 rounded-lg text-sm max-[700px]:text-xs font-semibold">
            <Download size={16} />
            Download
          </button>
          <button className="cursor-pointer flex items-center justify-center px-3 py-2 rounded-lg border border-transparent hover:bg-[#3BAFBB22]">
            <ShareNetwork size={16} />
          </button>
        </div>
      </div>

      {/* Modal QR */}
      <Modal isOpen={showQR} onClose={() => setShowQR(false)}>
        <div className="flex flex-col items-center">
          <QRCode value={`Ticket - ${title} - ${date} - ${time}`} size={180} />
          <p className="mt-4 text-[#3BAFBB] font-semibold text-sm">
            {title} • {date} {time}
          </p>
        </div>
      </Modal>
    </>
  );
};

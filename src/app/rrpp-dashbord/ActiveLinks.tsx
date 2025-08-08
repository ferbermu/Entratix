'use client';
import React from 'react';
import { Calendar, Eye, DownloadSimple } from '@phosphor-icons/react';

const events = [
  {
    name: 'Underground Techno Night',
    date: '14/8/2024',
    time: '23:00',
    courtesyAvailable: 20,
    courtesySent: 15,
    ticketsSold: 45,
    cashRemaining: 32,
    link: 'https://entratix.com/event/underground-techno-night?rrpp=john123',
  },
  {
    name: 'Latin Beats Festival',
    date: '21/8/2024',
    time: '20:00',
    courtesyAvailable: 15,
    courtesySent: 10,
    ticketsSold: 28,
    cashRemaining: 0,
    link: 'https://entratix.com/event/latin-beats-festival?rrpp=john123',
  },
];

export const ActiveLinks = () => {
  return (
    <div className="flex flex-col  w-full px-20  max-[700px]:px-0 max-[1200px]:px-10 gap-6  ">
      {events.map((event, i) => (
        <div
          key={i}
          className="bg-[#3BAFBB]/10 border border-[#3BAFBB40] rounded-xl p-6 shadow-md relative"
        >
          <div className="flex justify-between items-center mb-6 ">
            <div>
              <h2 className="text-xl font-semibold text-white">{event.name}</h2>
              <div className="flex items-center text-sm text-[#A3A3A3] mt-1 gap-2">
                <Calendar size={16} />
                <span>{event.date}</span>
                <span>{event.time}</span>
              </div>
            </div>
            <p className="bg-[#3BAFBB1A] text-[#3BAFBB] text-xs font-bold px-3 py-1 rounded-full border border-[#3BAFBB40]">
              Active
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-4 max-[1200px]:grid-cols-1  gap-4 mb-5">
            <MetricCard
              label="Courtesy Available"
              value={event.courtesyAvailable}
            />
            <MetricCard label="Courtesy Sent" value={event.courtesySent} />
            <MetricCard label="Tickets Sold" value={event.ticketsSold} />
            <MetricCard
              label="Cash Remaining"
              value={event.cashRemaining}
              highlight={
                event.cashRemaining > 0 ? 'text-yellow-400' : 'text-red-500'
              }
            />
          </div>

          {/* Event Link + Buttons */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              readOnly
              value={event.link}
              className="bg-[#1C1C2E]/10 text-sm text-white px-4 py-2 rounded-md w-full border border-[#3BAFBB40]"
            />
            <button className="text-white bg-[#3BAFBB] hover:bg-[#2B9FA9] px-4 py-2 text-sm rounded-lg shrink-0">
              Copy
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4 max-[1200px]:justify-between max-[340px]:flex-col  ">
            <button className="max-[340px]:w-full max-[700px]:w-full max-[340px]:justify-center max-[340px]:text-center flex items-center gap-2 bg-[#3BAFBB] hover:bg-[#2B9FA9] text-white text-sm font-medium px-4 py-2 rounded-md">
              <Eye size={16} /> View Details
            </button>
            <button className="max-[700px]:w-full max-[340px]:justify-center max-[340px]:text-center  flex items-center gap-2 bg-[#3BAFBB1A] hover:bg-[#3BAFBB33] text-[#3BAFBB] text-sm font-medium px-4 py-2 rounded-md border border-[#3BAFBB40]">
              <DownloadSimple size={16} /> Download Report
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const MetricCard = ({
  label,
  value,
  highlight = 'text-white',
}: {
  label: string;
  value: number;
  highlight?: string;
}) => (
  <div className="bg-[#3BAFBB1A] p-3 rounded-lg border border-[#3BAFBB40] text-center">
    <p className="text-xs text-[#A3A3A3]">{label}</p>
    <p className={`text-lg font-semibold ${highlight}`}>{value}</p>
  </div>
);

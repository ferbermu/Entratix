'use client';
import React from 'react';

interface CashSalesProps {
  onSellTickets: () => void;
  onViewSales: () => void;
}

export const CashSales = ({ onSellTickets, onViewSales }: CashSalesProps) => {
  const events = [
    {
      name: 'Underground Techno Night',
      ticketsLeft: 32,
    },
  ];

  return (
    <div className="w-full max-[1200px]:px-4 flex flex-col max-w-[1400px]   bg-[#3BAFBB]/10 p-6 rounded-2xl border border-[#3BAFBB40] text-white shadow-md">
      <h2 className="text-lg font-semibold mb-4">Cash Sales Events</h2>
      {events.map((event, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 bg-[#3BAFBB1A] justify-between rounded-xl p-4 border border-[#3BAFBB40]"
        >
          <div className="flex justify-between gap-2 ">
            <h3 className="font-medium mr-12">{event.name}</h3>
            <p className="text-yellow-400 text-sm font-semibold">
              {event.ticketsLeft} tickets left
            </p>
          </div>
          <div className="flex  gap-2 items-start ">
            <div className="flex gap-2 max-[700px]:flex-col max-[700px]:items-start max-[700px]:w-full">
              <button
                onClick={onSellTickets}
                className="bg-[#3BAFBB] max-[700px]:w-full hover:bg-[#2B9FA9] text-white px-3 py-1.5 text-sm rounded-md"
              >
                Sell Tickets
              </button>
              <button
                onClick={onViewSales}
                className="bg-[#3BAFBB1A] max-[700px]:w-full hover:bg-[#3BAFBB33] text-[#3BAFBB] px-3 py-1.5 text-sm rounded-md border border-[#3BAFBB40]"
              >
                View Sales Summary
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

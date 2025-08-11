'use client';
import React from 'react';
import { EnvelopeSimple, UserPlus } from '@phosphor-icons/react';

const subRrpps = [
  {
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    phone: '+1234567890',
    joined: '14/1/2024',
    totalSales: 156,
    cashSalesEnabled: false,
  },
  {
    name: 'Carlos Mendez',
    email: 'carlos@example.com',
    phone: '+1234567891',
    joined: '19/2/2024',
    totalSales: 89,
    cashSalesEnabled: true,
  },
];

export const SubRrpp = () => {
  return (
    <div className="flex flex-col gap-6 w-full px-4 sm:px-6 md:px-12 xl:px-80 max-[700px]:px-4">
      <div className="flex justify-between items-center mb-6 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-3">
        <h2 className="text-2xl font-bold text-white">Sub RRPPs</h2>
        <button className="bg-[#3BAFBB] hover:bg-[#2B9FA9] cursor-pointer text-white px-4 py-2 text-sm rounded-md flex items-center gap-2 max-[700px]:w-full max-[700px]:justify-center">
          <UserPlus size={16} /> Add Sub RRPP
        </button>
      </div>

      {subRrpps.map((rrpp, index) => (
        <div
          key={index}
          className="bg-[#3BAFBB]/10 border border-[#3BAFBB]/60 rounded-xl p-4 md:p-6 shadow-md grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-4 gap-y-3 max-[700px]:p-4"
        >
          <div className="flex flex-col gap-1 flex-1 col-[1] row-[1]">
            <h2 className="text-lg font-semibold text-white">{rrpp.name}</h2>
            <div className="flex flex-col gap-2 text-sm text-[#A3A3A3] mt-1">
              <div className="flex items-center gap-2">
                <EnvelopeSimple size={16} /> {rrpp.email}
              </div>
              <div className="flex items-center gap-2">{rrpp.phone}</div>
              <div className="flex items-center gap-2">
                Joined: {rrpp.joined}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end h-full justify-between col-[2] row-[1]">
            <div className="flex flex-col items-end">
              <p className="text-sm text-[#A3A3A3] mb-1">Total Sales</p>
              <p className="text-2xl font-bold text-[#3BAFBB]">
                {rrpp.totalSales}
              </p>
            </div>
          </div>

          <div className="col-[1] row-[2] flex items-center">
            {rrpp.cashSalesEnabled ? (
              <span className="bg-[#3BAFBB1A] text-[#3BAFBB] text-xs font-medium px-3 py-1 rounded-full border border-[#3BAFBB40]">
                Cash Sales Enabled
              </span>
            ) : (
              <span className="bg-[#3BAFBB1A] text-[#3BAFBB] text-xs font-medium px-3 py-1 rounded-full border border-[#3BAFBB40]">
                Link Only
              </span>
            )}
          </div>

          <div className="col-[2] row-[2] flex items-center justify-end ">
            <button className=" bg-[#3BAFBB] hover:bg-[#2B9FA9] cursor-pointer text-white px-4 py-2 text-sm rounded-md">
              View Sales Report
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

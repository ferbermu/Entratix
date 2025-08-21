'use client';
import React, { useState } from 'react';
import {
  ChartLineUp,
  UsersThree,
  Database,
  WhatsappLogo,
  Envelope,
} from '@phosphor-icons/react';
import { CustomDropdown } from './CustomDropdown';
export default function Analytics() {
  const [genre, setGenre] = useState('All Genres');
  const [producer, setProducer] = useState('All Producers');
  const [ticketTypeFilter, setTicketTypeFilter] = useState('All Ticket Types');
  const [year, setYear] = useState('All Years');

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Flow Analysis */}
        <div className="bg-[#3BAFBB]/10 border border-[#3BAFBB40] rounded-2xl p-5 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ChartLineUp className="text-[#3BAFBB]" size={20} /> Sales Flow
            Analysis
          </h2>
          <div className="h-48 bg-[#1C1C2E]/10 rounded-xl border border-[#3BAFBB40] flex items-center justify-center text-[#A3A3A3]">
            Sales flow chart visualization
          </div>
        </div>

        {/* Customer Demographics */}
        <div className="bg-[#3BAFBB]/10 border border-[#3BAFBB40] rounded-2xl p-5 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <UsersThree className="text-[#3BAFBB]" size={20} /> Customer
            Demographics
          </h2>
          {[
            { label: 'Age 18-25', percent: 45 },
            { label: 'Age 26-35', percent: 35 },
            { label: 'Age 36+', percent: 20 },
          ].map(({ label, percent }, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between text-sm text-[#A3A3A3]">
                <span>{label}</span>
                <span>{percent}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full mt-1">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Database */}
      <div className="bg-[#3BAFBB]/10 border border-[#3BAFBB40] rounded-2xl p-5 shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Database className="text-[#3BAFBB]" size={20} /> Customer Database
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
          <CustomDropdown
            options={['All Genres', 'Rock', 'Pop', 'EDM']}
            selected={genre}
            onSelect={setGenre}
          />

          <CustomDropdown
            options={['All Producers', 'Producer A', 'Producer B']}
            selected={producer}
            onSelect={setProducer}
          />

          <CustomDropdown
            options={['All Ticket Types', 'VIP', 'General', 'Early Bird']}
            selected={ticketTypeFilter}
            onSelect={setTicketTypeFilter}
          />

          <CustomDropdown
            options={['All Years', '2022', '2023', '2024']}
            selected={year}
            onSelect={setYear}
            className="col-span-2 md:col-span-1"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-[#3BAFBB] py-2 px-4 rounded-lg bg-transparent text-gray-300 hover:bg-[#3BAFBB1A]">
            <Envelope size={18} className="text-[#3BAFBB]" />
            <span className="text-sm">Email Campaign</span>
          </button>
          <button className="flex items-center gap-2 border border-[#3BAFBB] py-2 px-4 rounded-lg bg-transparent text-gray-300 hover:bg-[#3BAFBB1A]">
            <WhatsappLogo size={18} className="text-[#3BAFBB]" />
            <span className="text-sm">WhatsApp Campaign</span>
          </button>
        </div>
        <p className="text-[#A3A3A3] text-sm mt-6">
          Customer database with filtering and campaign tools will be displayed
          here
        </p>
      </div>
    </div>
  );
}

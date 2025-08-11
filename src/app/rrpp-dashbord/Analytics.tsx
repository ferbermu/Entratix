'use client';
import React from 'react';
import {
  ChartLineUp,
  UsersThree,
  Database,
  EnvelopeSimple,
  WhatsappLogo,
} from '@phosphor-icons/react';
export default function Analytics() {
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
            { label: 'Age 18-25', percent: 45, color: 'bg-[#3BAFBB]' },
            { label: 'Age 26-35', percent: 35, color: 'bg-[#3BAFBB]' },
            { label: 'Age 36+', percent: 20, color: 'bg-[#3BAFBB]' },
          ].map(({ label, percent, color }, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between text-sm text-[#A3A3A3]">
                <span>{label}</span>
                <span>{percent}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full mt-1">
                <div
                  className={`${color} h-2 rounded-full`}
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
          <select className="bg-[#1C1C2E]/10 text-sm text-white px-3 py-2 rounded-xl border border-[#3BAFBB40]">
            <option>All Genres</option>
          </select>
          <select className="bg-[#1C1C2E]/10 text-sm text-white px-3 py-2 rounded-xl border border-[#3BAFBB40]">
            <option>All Producers</option>
          </select>
          <select className="bg-[#1C1C2E]/10 text-sm text-white px-3 py-2 rounded-xl border border-[#3BAFBB40]">
            <option>All Ticket Types</option>
          </select>
          <select className="bg-[#1C1C2E]/10 text-sm text-white px-3 py-2 rounded-xl border border-[#3BAFBB40] col-span-2 md:col-span-1">
            <option>All Years</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-[#3BAFBB] py-2 px-4 rounded-lg bg-transparent text-gray-300 hover:bg-[#3BAFBB1A]">
            <EnvelopeSimple size={18} className="text-[#3BAFBB]" />
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

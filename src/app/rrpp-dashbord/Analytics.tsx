'use client';
import React from 'react';
import { Button } from 'react-day-picker';
export default function Analytics() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Flow Analysis */}
        <div className="bg-[#2C2C3F] rounded-2xl p-5 shadow-lg">
          <h2 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
            <span className="text-pink-400">📈</span> Sales Flow Analysis
          </h2>
          <div className="h-48 bg-[#1f1f2e] rounded-xl flex items-center justify-center text-gray-400">
            Sales flow chart visualization
          </div>
        </div>

        {/* Customer Demographics */}
        <div className="bg-[#2C2C3F] rounded-2xl p-5 shadow-lg">
          <h2 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
            <span className="text-pink-400">🕒</span> Customer Demographics
          </h2>
          {[
            { label: 'Age 18-25', percent: 45, color: 'bg-pink-400' },
            { label: 'Age 26-35', percent: 35, color: 'bg-blue-400' },
            { label: 'Age 36+', percent: 20, color: 'bg-green-400' },
          ].map(({ label, percent, color }, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between text-sm text-gray-300">
                <span>{label}</span>
                <span>{percent}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full mt-1">
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
      <div className="bg-[#2C2C3F] rounded-2xl p-5 shadow-lg">
        <h2 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
          <span className="text-pink-400">💽</span> Customer Database
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
          <select className="bg-[#1f1f2e] text-sm text-white px-3 py-2 rounded-xl border border-gray-600">
            <option>All Genres</option>
          </select>
          <select className="bg-[#1f1f2e] text-sm text-white px-3 py-2 rounded-xl border border-gray-600">
            <option>All Producers</option>
          </select>
          <select className="bg-[#1f1f2e] text-sm text-white px-3 py-2 rounded-xl border border-gray-600">
            <option>All Ticket Types</option>
          </select>
          <select className="bg-[#1f1f2e] text-sm text-white px-3 py-2 rounded-xl border border-gray-600 col-span-2 md:col-span-1">
            <option>All Years</option>
          </select>
        </div>
        <div className="flex gap-3">
          <Button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-xl text-sm">
            📧 Email Campaign
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm">
            💬 WhatsApp Campaign
          </Button>
        </div>
        <p className="text-gray-400 text-sm mt-6">
          Customer database with filtering and campaign tools will be displayed
          here
        </p>
      </div>
    </div>
  );
}

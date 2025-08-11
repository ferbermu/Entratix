'use client';
import React from 'react';
import {
  X,
  MagnifyingGlass,
  FunnelSimple,
  DownloadSimple,
  CurrencyDollar,
  ChartLineUp,
  Users,
} from '@phosphor-icons/react';

export interface SalesRow {
  id: string;
  customer: string;
  ci: string;
  phone: string;
  email: string;
  type: string;
  qty: number;
  unit: number;
  total: number;
  date: string;
}

export interface SalesReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  rows: SalesRow[];
  totals: {
    revenue: number;
    tickets: number;
    customers: number;
  };
  onExportCsv?: () => void;
}

export const SalesReportModal: React.FC<SalesReportModalProps> = ({
  isOpen,
  onClose,
  eventName,
  rows,
  totals,
  onExportCsv,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60
"
        onClick={onClose}
      />

      <div className="relative w-[95%] max-w-[1150px] bg-[#3BAFBB]/10 rounded-2xl shadow-2xl border border-[#3BAFBB40] overflow-hidden backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-[#3BAFBB40] bg-[#3BAFBB1A]">
          <div>
            <h3 className="text-xl font-semibold text-white">{eventName}</h3>
            <p className="text-xs text-[#A3A3A3]">Cash Sales Summary</p>
          </div>
          <button
            className="cursor-pointer p-2 rounded-md bg-[#3BAFBB1A] hover:bg-[#3BAFBB33] text-[#3BAFBB] border border-[#3BAFBB40]"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Top metrics */}
        <div className="grid grid-cols-3 gap-4 p-5 max-[900px]:grid-cols-1">
          <div className="bg-[#3BAFBB1A] border border-[#3BAFBB40] rounded-xl p-4">
            <p className="text-xs text-[#A3A3A3]">Total Revenue</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold text-white">${totals.revenue}</p>
              <CurrencyDollar size={18} className="text-[#3BAFBB]" />
            </div>
          </div>
          <div className="bg-[#3BAFBB1A] border border-[#3BAFBB40] rounded-xl p-4">
            <p className="text-xs text-[#A3A3A3]">Total Tickets</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold text-white">{totals.tickets}</p>
              <ChartLineUp size={18} className="text-[#3BAFBB]" />
            </div>
          </div>
          <div className="bg-[#3BAFBB1A] border border-[#3BAFBB40] rounded-xl p-4">
            <p className="text-xs text-[#A3A3A3]">Total Customers</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold text-white">
                {totals.customers}
              </p>
              <Users size={18} className="text-[#3BAFBB]" />
            </div>
          </div>
        </div>

        {/* Search + Filter + Export */}
        <div className="flex items-center gap-3 px-5 pb-3">
          <div className="flex-1 relative">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]"
            />
            <input
              placeholder="Search by name, email, purchase ID, or CI..."
              className="w-full bg-[#1C1C2E]/10 border border-[#3BAFBB40] rounded-md text-sm text-white placeholder:text-[#A3A3A3] px-9 py-2"
            />
          </div>
          <button className="cursor-pointer flex items-center gap-2 bg-[#3BAFBB1A] hover:bg-[#3BAFBB33] text-[#3BAFBB] border border-[#3BAFBB40] px-3 py-2 text-sm rounded-md">
            <FunnelSimple size={16} /> All Ticket Types
          </button>
          <button
            className="cursor-pointer flex items-center gap-2 bg-[#3BAFBB] hover:bg-[#2B9FA9] text-white px-3 py-2 text-sm rounded-md"
            onClick={onExportCsv}
          >
            <DownloadSimple size={16} /> Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="px-5 pb-5">
          <div className="overflow-auto max-h-[420px] rounded-lg border border-[#3BAFBB40]">
            <table className="min-w-full text-sm text-gray-200">
              <thead className="bg-[#3BAFBB1A] text-left sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3">Purchase ID</th>
                  <th className="px-4 py-3">Customer Name</th>
                  <th className="px-4 py-3">CI</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Ticket Type</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Unit Price</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Sale Date</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => (
                  <tr key={row.id} className="odd:bg-white/[0.02]">
                    <td className="px-4 py-3 text-[#3BAFBB] font-medium">
                      {row.id}
                    </td>
                    <td className="px-4 py-3">{row.customer}</td>
                    <td className="px-4 py-3">{row.ci}</td>
                    <td className="px-4 py-3">{row.phone}</td>
                    <td className="px-4 py-3">{row.email}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 text-xs rounded-full border border-[#3BAFBB40] bg-[#3BAFBB1A] text-[#3BAFBB]">
                        {row.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">{row.qty}</td>
                    <td className="px-4 py-3">${row.unit}</td>
                    <td className="px-4 py-3 text-[#3BAFBB] font-semibold">
                      ${row.total}
                    </td>
                    <td className="px-4 py-3">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Totals */}
          <div className="flex items-center justify-end gap-10 text-sm text-gray-300 mt-4">
            <div className="text-center">
              <p className="text-xs text-[#A3A3A3]">Total Tickets Sold</p>
              <p className="text-[#3BAFBB] font-semibold">{totals.tickets}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#A3A3A3]">Total Revenue</p>
              <p className="text-[#3BAFBB] font-semibold">${totals.revenue}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

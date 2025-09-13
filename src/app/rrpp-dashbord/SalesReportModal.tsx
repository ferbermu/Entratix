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
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-[95%] max-w-[1150px] bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 rounded-2xl shadow-2xl border border-pink-500/30 overflow-hidden backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-pink-500/30 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20">
          <div>
            <h3 className="text-xl font-semibold text-white">{eventName}</h3>
            <p className="text-xs text-cyan-300">Cash Sales Summary</p>
          </div>
          <button
            className="cursor-pointer p-2 rounded-md bg-gradient-to-r from-pink-500/30 to-purple-500/30 hover:from-pink-500/40 hover:to-purple-500/40 text-cyan-300 border border-pink-500/30 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Top metrics */}
        <div className="grid grid-cols-3 gap-4 p-5 max-[900px]:grid-cols-1">
          <div className="bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-400/20 border border-pink-500/30 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xs text-cyan-300">Total Revenue</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold text-white">${totals.revenue}</p>
              <CurrencyDollar
                size={18}
                className="text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
              />
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-400/20 border border-pink-500/30 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xs text-cyan-300">Total Tickets</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold text-white">{totals.tickets}</p>
              <ChartLineUp
                size={18}
                className="text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
              />
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-400/20 border border-pink-500/30 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xs text-cyan-300">Total Customers</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold text-white">
                {totals.customers}
              </p>
              <Users
                size={18}
                className="text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
              />
            </div>
          </div>
        </div>

        {/* Search + Filter + Export */}
        <div className="flex items-center gap-3 px-5 pb-3">
          <div className="flex-1 relative">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
            />
            <input
              placeholder="Search by name, email, purchase ID, or CI..."
              className="w-full bg-black/30 border border-pink-500/30 rounded-md text-sm text-cyan-300 placeholder:text-gray-400 px-9 py-2 backdrop-blur-sm focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
            />
          </div>
          <button className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-pink-500/30 to-purple-500/30 hover:from-pink-500/40 hover:to-purple-500/40 text-cyan-300 border border-pink-500/30 px-3 py-2 text-sm rounded-md backdrop-blur-sm">
            <FunnelSimple size={16} /> All Ticket Types
          </button>
          <button
            className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-500 text-white px-3 py-2 text-sm rounded-md border border-pink-500/20 hover:border-cyan-400 relative overflow-hidden"
            onClick={onExportCsv}
          >
            <DownloadSimple size={16} className="relative z-10" />
            <span className="relative z-10">Export CSV</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
          </button>
        </div>

        {/* Table */}
        <div className="px-5 pb-5">
          <div className="overflow-auto max-h-[420px] rounded-lg border border-pink-500/30 bg-black/20 backdrop-blur-sm">
            <table className="min-w-full text-sm text-gray-200">
              <thead className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20 text-left sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-cyan-300 font-semibold">
                    Purchase ID
                  </th>
                  <th className="px-4 py-3 text-cyan-300 font-semibold">
                    Customer Name
                  </th>
                  <th className="px-4 py-3 text-cyan-300 font-semibold">CI</th>
                  <th className="px-4 py-3 text-cyan-300 font-semibold">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-cyan-300 font-semibold">
                    Email
                  </th>
                  <th className="px-4 py-3 text-cyan-300 font-semibold">
                    Ticket Type
                  </th>
                  <th className="px-4 py-3 text-cyan-300 font-semibold">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-cyan-300 font-semibold">
                    Unit Price
                  </th>
                  <th className="px-4 py-3 text-cyan-300 font-semibold">
                    Total
                  </th>
                  <th className="px-4 py-3 text-cyan-300 font-semibold">
                    Sale Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => (
                  <tr
                    key={row.id}
                    className="odd:bg-white/[0.05] even:bg-white/[0.02] hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-purple-500/10 hover:to-cyan-400/10 border-b border-pink-500/20"
                  >
                    <td className="px-4 py-3 text-cyan-400 font-medium">
                      {row.id}
                    </td>
                    <td className="px-4 py-3 text-white font-medium">
                      {row.customer}
                    </td>
                    <td className="px-4 py-3 text-cyan-300">{row.ci}</td>
                    <td className="px-4 py-3 text-cyan-300">{row.phone}</td>
                    <td className="px-4 py-3 text-cyan-300">{row.email}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 text-xs rounded-full border border-pink-500/30 bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-cyan-300 backdrop-blur-sm">
                        {row.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white font-medium">
                      {row.qty}
                    </td>
                    <td className="px-4 py-3 text-cyan-300">${row.unit}</td>
                    <td className="px-4 py-3 text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text font-semibold">
                      ${row.total}
                    </td>
                    <td className="px-4 py-3 text-cyan-300">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Totals */}
          <div className="flex items-center justify-end gap-10 text-sm text-gray-300 mt-4">
            <div className="text-center">
              <p className="text-xs text-cyan-300">Total Tickets Sold</p>
              <p className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text font-semibold">
                {totals.tickets}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-cyan-300">Total Revenue</p>
              <p className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text font-semibold">
                ${totals.revenue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

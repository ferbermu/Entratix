'use client';
import React, { useState, useMemo, useEffect } from 'react';
import {
  MagnifyingGlass,
  DownloadSimple,
  Calendar,
  CheckCircle,
  Eye,
  XCircle,
} from '@phosphor-icons/react';
import { CustomDropdown } from './CustomDropdown';

export interface RrppSalesRow {
  event: string;
  ticketId: string;
  fullName: string;
  email: string;
  ticketType: string;
  value: number;
  paymentMethod: string;
  status: 'Valid' | 'Used' | 'Expired';
  purchaseDate: string;
}

export interface RrppSalesReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  rrppName: string;
  rows: RrppSalesRow[];
  totals?: {
    revenue: number;
    sales: number;
  };
  onExportCsv?: () => void;
}

export const RrppSalesReportModal: React.FC<RrppSalesReportModalProps> = ({
  isOpen,
  onClose,
  rrppName,
  rows,
  onExportCsv,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string>('All Events');
  const [selectedTicketType, setSelectedTicketType] =
    useState<string>('All Ticket Types');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Status');
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('All Payment Method');

  const uniqueEvents = useMemo(
    () => ['All Events', ...Array.from(new Set(rows.map(row => row.event)))],
    [rows]
  );
  const uniqueTicketTypes = useMemo(
    () => [
      'All Ticket Types',
      ...Array.from(new Set(rows.map(row => row.ticketType))),
    ],
    [rows]
  );
  const uniqueStatuses = useMemo(
    () => ['All Status', ...Array.from(new Set(rows.map(row => row.status)))],
    [rows]
  );
  const uniquePaymentMethods = useMemo(
    () => [
      'All Payment Method',
      ...Array.from(new Set(rows.map(row => row.paymentMethod))),
    ],
    [rows]
  );

  const filteredRows = useMemo(() => {
    return rows.filter(row => {
      const matchesSearch =
        searchTerm === '' ||
        row.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.event.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesEvent =
        selectedEvent === 'All Events' || row.event === selectedEvent;
      const matchesTicketType =
        selectedTicketType === 'All Ticket Types' ||
        row.ticketType === selectedTicketType;
      const matchesStatus =
        selectedStatus === 'All Status' || row.status === selectedStatus;
      const matchesPaymentMethod =
        selectedPaymentMethod === 'All Payment Method' ||
        row.paymentMethod === selectedPaymentMethod;

      return (
        matchesSearch &&
        matchesEvent &&
        matchesTicketType &&
        matchesStatus &&
        matchesPaymentMethod
      );
    });
  }, [
    rows,
    searchTerm,
    selectedEvent,
    selectedTicketType,
    selectedStatus,
    selectedPaymentMethod,
  ]);

  const filteredTotals = useMemo(() => {
    const revenue = filteredRows.reduce((sum, row) => sum + row.value, 0);
    const sales = filteredRows.length;
    return { revenue, sales };
  }, [filteredRows]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Valid':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'Used':
        return <Eye size={16} className="text-blue-500" />;
      case 'Expired':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center max-[1200px]:items-start max-[1200px]:p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-[98%] max-w-[1280px] bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 rounded-2xl shadow-2xl border border-pink-500/30 overflow-hidden backdrop-blur-sm max-[1200px]:max-h-[90vh] max-[1200px]:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-pink-500/30 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20">
          <div>
            <h3 className="text-2xl font-bold text-white">{rrppName}</h3>
            <p className="text-sm text-cyan-300">Sales Report</p>
          </div>
        </div>

        {/* Summary Statistics / Badges */}
        <div className="grid grid-cols-2 gap-4 p-5">
          <div className="bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-400/20 border border-pink-500/30 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xs text-cyan-300">Total Revenue</p>
            <p className="text-2xl font-bold text-white">
              ${filteredTotals.revenue}
            </p>
          </div>
          <div className="bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-400/20 border border-pink-500/30 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xs text-cyan-300">Total Sales</p>
            <p className="text-2xl font-bold text-white">
              {filteredTotals.sales}
            </p>
          </div>
        </div>

        {/* Search + Filter + Export */}
        <div className="grid grid-cols-6 gap-3 px-5 pb-3 max-[1200px]:grid-cols-1">
          <div className="col-span-1 relative">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
            />
            <input
              placeholder="Search by name, email, ticket ID, or event..."
              className="w-full bg-black/30 border border-pink-500/30 rounded-md text-sm text-cyan-300 placeholder:text-gray-400 px-9 py-2 backdrop-blur-sm focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Event Dropdown */}
          <div className="col-span-1 relative">
            <CustomDropdown
              options={uniqueEvents}
              selected={selectedEvent}
              onSelect={val => setSelectedEvent(val)}
            />
          </div>

          {/* Ticket Type Dropdown */}
          <div className="col-span-1 relative">
            <CustomDropdown
              options={uniqueTicketTypes}
              selected={selectedTicketType}
              onSelect={val => setSelectedTicketType(val)}
            />
          </div>

          {/* Status Dropdown */}
          <div className="col-span-1 relative">
            <CustomDropdown
              options={uniqueStatuses}
              selected={selectedStatus}
              onSelect={val => setSelectedStatus(val)}
            />
          </div>

          {/* Payment Method Dropdown */}
          <div className="col-span-1 relative">
            <CustomDropdown
              options={uniquePaymentMethods}
              selected={selectedPaymentMethod}
              onSelect={val => setSelectedPaymentMethod(val)}
            />
          </div>

          <button
            className="col-span-1 cursor-pointer flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-500 text-white px-3 py-2 text-sm rounded-md justify-center border border-pink-500/20 hover:border-cyan-400 relative overflow-hidden"
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
                  <th className="px-4 py-3 flex items-center gap-2">
                    <Calendar size={16} />
                    Event
                  </th>
                  <th className="px-4 py-3">Ticket ID</th>
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Ticket Type</th>
                  <th className="px-4 py-3">Value</th>
                  <th className="px-4 py-3">Payment Method</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Purchase Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white/[0.05] even:bg-white/[0.02] hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-purple-500/10 hover:to-cyan-400/10 border-b border-pink-500/20"
                  >
                    <td className="px-4 py-3">{row.event}</td>
                    <td className="px-4 py-3 text-cyan-400 font-medium">
                      {row.ticketId}
                    </td>
                    <td className="px-4 py-3">{row.fullName}</td>
                    <td className="px-4 py-3">{row.email}</td>
                    <td className="px-4 py-3">
                      <span className="text-nowrap px-2 py-0.5 text-xs rounded-full border border-pink-500/30 bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-cyan-300 backdrop-blur-sm">
                        {row.ticketType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text">
                      ${row.value}
                    </td>
                    <td className="px-4 py-3">{row.paymentMethod}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-700 flex items-center justify-center">
                          {getStatusIcon(row.status)}
                        </div>
                        {row.status}
                      </div>
                    </td>
                    <td className="px-4 py-3">{row.purchaseDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-300 mt-4">
            <div>
              <p className="text-cyan-300">
                Showing {filteredTotals.sales} sales
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-cyan-300">
                Total Revenue from Filtered Results
              </p>
              <p className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text font-semibold">
                ${filteredTotals.revenue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

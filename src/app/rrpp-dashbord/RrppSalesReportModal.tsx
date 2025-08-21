'use client';
import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
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

      <div className="relative w-[98%] max-w-[1280px] bg-[#1C1A1A] rounded-2xl shadow-2xl border border-[#3BAFBB40] overflow-hidden max-[1200px]:max-h-[90vh] max-[1200px]:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#3BAFBB40] bg-[#3BAFBB1A]">
          <div>
            <h3 className="text-2xl font-bold text-white">{rrppName}</h3>
            <p className="text-sm text-[#A3A3A3]">Sales Report</p>
          </div>
          <button
            className="cursor-pointer p-2 rounded-md bg-[#3BAFBB1A] hover:bg-[#3BAFBB33] text-[#3BAFBB] border border-[#3BAFBB40]"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Summary Statistics / Badges */}
        <div className="grid grid-cols-2 gap-4 p-5">
          <div className="bg-[#3BAFBB1A] border border-[#3BAFBB40] rounded-xl p-4">
            <p className="text-xs text-[#A3A3A3]">Total Revenue</p>
            <p className="text-2xl font-bold text-white">
              ${filteredTotals.revenue}
            </p>
          </div>
          <div className="bg-[#3BAFBB1A] border border-[#3BAFBB40] rounded-xl p-4">
            <p className="text-xs text-[#A3A3A3]">Total Sales</p>
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]"
            />
            <input
              placeholder="Search by name, email, ticket ID, or event..."
              className="w-full bg-[#1C1C2E]/10 border border-[#3BAFBB40] rounded-md text-sm text-white placeholder:text-[#A3A3A3] px-9 py-2"
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
            className="col-span-1 cursor-pointer flex items-center gap-2 bg-[#3BAFBB] hover:bg-[#2B9FA9] text-white px-3 py-2 text-sm rounded-md justify-center"
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
                  <tr key={index} className="odd:bg-white/[0.02]">
                    <td className="px-4 py-3">{row.event}</td>
                    <td className="px-4 py-3 text-[#3BAFBB] font-medium">
                      {row.ticketId}
                    </td>
                    <td className="px-4 py-3">{row.fullName}</td>
                    <td className="px-4 py-3">{row.email}</td>
                    <td className="px-4 py-3">
                      <span className="text-nowrap px-2 py-0.5 text-xs rounded-full border border-[#3BAFBB40] bg-[#3BAFBB1A] text-[#3BAFBB]">
                        {row.ticketType}
                      </span>
                    </td>
                    <td className="px-4 py-3">${row.value}</td>
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
              <p className="text-[#A3A3A3]">
                Showing {filteredTotals.sales} sales
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#A3A3A3]">
                Total Revenue from Filtered Results
              </p>
              <p className="text-[#3BAFBB] font-semibold">
                ${filteredTotals.revenue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

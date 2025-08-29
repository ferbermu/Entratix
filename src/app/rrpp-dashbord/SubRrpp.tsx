'use client';
import React, { useState } from 'react';
import { EnvelopeSimple, UserPlus } from '@phosphor-icons/react';
import { RrppSalesReportModal, RrppSalesRow } from './RrppSalesReportModal';
import { AddSubRrppModal, Event } from './AddSubRrppModal';
import { useExportCsv } from '@/hooks/useExportCsv';

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

const sampleEvents: Event[] = [
  {
    id: '1',
    name: 'Underground Techno Night',
    date: '14/8/2024',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Latin Beats Festival',
    date: '21/8/2024',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Summer Electronic Festival',
    date: '4/9/2024',
    status: 'Active',
  },
  { id: '4', name: 'Jazz & Blues Night', date: '11/9/2024', status: 'Active' },
  { id: '5', name: 'Rock Revolution', date: '18/9/2024', status: 'Active' },
];

const sampleSalesData: RrppSalesRow[] = [
  {
    event: 'Underground Techno Night',
    ticketId: 'TKT-001',
    fullName: 'Ana García Rodríguez',
    email: 'ana.garcia@email.com',
    ticketType: 'VIP',
    value: 120,
    paymentMethod: 'Credit Card',
    status: 'Valid',
    purchaseDate: '14/7/2024',
  },
  {
    event: 'Latin Beats Festival',
    ticketId: 'TKT-002',
    fullName: 'Carlos Mendoza Silva',
    email: 'carlos.mendoza@email.com',
    ticketType: 'General',
    value: 80,
    paymentMethod: 'Debit Card',
    status: 'Used',
    purchaseDate: '17/7/2024',
  },
  {
    event: 'Underground Techno Night',
    ticketId: 'TKT-003',
    fullName: 'María José López',
    email: 'maria.lopez@email.com',
    ticketType: 'Early Bird',
    value: 60,
    paymentMethod: 'PayPal',
    status: 'Valid',
    purchaseDate: '9/7/2024',
  },
  {
    event: 'Summer Electronic Festival',
    ticketId: 'TKT-004',
    fullName: 'Roberto Fernández',
    email: 'roberto.fernandez@email.com',
    ticketType: 'VIP',
    value: 120,
    paymentMethod: 'Bank Transfer',
    status: 'Expired',
    purchaseDate: '24/6/2024',
  },
  {
    event: 'Underground Techno Night',
    ticketId: 'TKT-005',
    fullName: 'Laura Martínez',
    email: 'laura.martinez@email.com',
    ticketType: 'General',
    value: 80,
    paymentMethod: 'Credit Card',
    status: 'Valid',
    purchaseDate: '12/7/2024',
  },
  {
    event: 'Latin Beats Festival',
    ticketId: 'TKT-006',
    fullName: 'Diego Ramírez',
    email: 'diego.ramirez@email.com',
    ticketType: 'Early Bird',
    value: 60,
    paymentMethod: 'PayPal',
    status: 'Used',
    purchaseDate: '15/7/2024',
  },
];

export const SubRrpp = () => {
  const { exportToCsv } = useExportCsv();

  const [selectedRrpp, setSelectedRrpp] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddSubRrppModalOpen, setIsAddSubRrppModalOpen] = useState(false);

  const handleViewSalesReport = (rrppName: string) => {
    setSelectedRrpp(rrppName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRrpp('');
  };

  const handleExportCsv = () => {
    exportToCsv('rrpp-sales-report', sampleSalesData, [
      { key: 'event', header: 'Event' },
      { key: 'ticketId', header: 'Ticket ID' },
      { key: 'fullName', header: 'Full Name' },
      { key: 'email', header: 'Email' },
      { key: 'ticketType', header: 'Ticket Type' },
      { key: 'value', header: 'Value' },
      { key: 'paymentMethod', header: 'Payment Method' },
      { key: 'status', header: 'Status' },
      { key: 'purchaseDate', header: 'Purchase Date' },
    ]);
  };

  const handleAddSubRrpp = (
    email: string,
    selectedEvents: string[],
    enableCashSales: boolean
  ) => {
    console.log('Adding Sub RRPP:', { email, selectedEvents, enableCashSales });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 xl:px-12">
      <div className="flex justify-between items-center mb-6 max-[700px]:flex-col max-[700px]:items-stretch max-[700px]:gap-3">
        <h2 className="text-2xl font-bold text-white">Sub RRPPs</h2>
        <button
          className="bg-[#3BAFBB] hover:bg-[#2B9FA9] cursor-pointer text-white px-4 py-2 text-sm rounded-md flex items-center gap-2 max-[700px]:w-full max-[700px]:justify-center"
          onClick={() => setIsAddSubRrppModalOpen(true)}
        >
          <UserPlus size={16} /> Add Sub RRPP
        </button>
      </div>

      {subRrpps.map((rrpp, index) => (
        <div
          key={index}
          className="bg-[#3BAFBB]/10 border border-[#3BAFBB]/60 rounded-xl p-4 md:p-6 shadow-md grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-6 gap-y-4 max-[700px]:p-4"
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
            <button
              className=" bg-[#3BAFBB] hover:bg-[#2B9FA9] cursor-pointer text-white px-4 py-2 text-sm rounded-md"
              onClick={() => handleViewSalesReport(rrpp.name)}
            >
              View Sales Report
            </button>
          </div>
        </div>
      ))}

      <RrppSalesReportModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        rrppName={selectedRrpp || ''}
        rows={sampleSalesData}
        totals={{ revenue: 580, sales: 6 }}
        onExportCsv={handleExportCsv}
      />

      <AddSubRrppModal
        isOpen={isAddSubRrppModalOpen}
        onClose={() => setIsAddSubRrppModalOpen(false)}
        events={sampleEvents}
        onAddSubRrpp={handleAddSubRrpp}
      />
    </div>
  );
};

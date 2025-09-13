'use client';
import React, { useState } from 'react';
import { EnvelopeSimple, UserPlus } from '@phosphor-icons/react';
import { RrppSalesReportModal, RrppSalesRow } from './RrppSalesReportModal';
import { AddSubRrppModal, Event } from './AddSubRrppModal';
import { useExportCsv } from '@/hooks/useExportCsv';
import { motion } from 'framer-motion';

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
      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-[700px]:flex-col max-[700px]:items-stretch max-[700px]:gap-3">
        <h2 className="text-2xl font-bold text-white animate-fadeInDown">
          Sub RRPPs
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-400/40 hover:from-pink-500/60 hover:via-purple-500/60 hover:to-cyan-400/60 text-white px-4 py-2 text-sm rounded-md flex items-center gap-2 max-[700px]:w-full max-[700px]:justify-center backdrop-blur-sm border border-pink-500/20 hover:border-cyan-400 relative overflow-hidden"
          onClick={() => setIsAddSubRrppModalOpen(true)}
        >
          <UserPlus
            size={16}
            className="drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"
          />
          <span className="relative z-10">Add Sub RRPP</span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
        </motion.button>
      </div>

      {/* RRPP Cards */}
      {subRrpps.map((rrpp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 border border-pink-500/30 rounded-xl p-4 md:p-6 shadow-md grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-6 gap-y-4 max-[700px]:p-4 hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="flex flex-col gap-1 flex-1 col-[1] row-[1]">
            <h2 className="text-lg font-semibold text-white">{rrpp.name}</h2>
            <div className="flex flex-col gap-2 text-sm text-cyan-300 mt-1">
              <div className="flex items-center gap-2">
                <EnvelopeSimple
                  size={16}
                  className="text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
                />{' '}
                {rrpp.email}
              </div>
              <div className="flex items-center gap-2">{rrpp.phone}</div>
              <div className="flex items-center gap-2">
                Joined: {rrpp.joined}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end h-full justify-between col-[2] row-[1]">
            <div className="flex flex-col items-end">
              <p className="text-sm text-cyan-300 mb-1">Total Sales</p>
              <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text">
                {rrpp.totalSales}
              </p>
            </div>
          </div>

          <div className="col-[1] row-[2] flex items-center">
            <motion.span
              className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20 text-cyan-300 text-xs font-medium px-3 py-1 rounded-full border border-pink-500/30 backdrop-blur-sm"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {rrpp.cashSalesEnabled ? 'Cash Sales Enabled' : 'Link Only'}
            </motion.span>
          </div>

          <div className="col-[2] row-[2] flex items-center justify-end ">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-400/40 hover:from-pink-500/60 hover:via-purple-500/60 hover:to-cyan-400/60 text-white px-4 py-2 text-sm rounded-md backdrop-blur-sm border border-pink-500/20 hover:border-cyan-400 relative overflow-hidden"
              onClick={() => handleViewSalesReport(rrpp.name)}
            >
              <span className="relative z-10">View Sales Report</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
            </motion.button>
          </div>
        </motion.div>
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

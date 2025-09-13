'use client';
import React from 'react';
import { SalesReportModal, SalesRow } from './SalesReportModal';
import SellTicketsModal from './SellTicketsModal';
import { useExportCsv } from '@/hooks/useExportCsv';
import { motion } from 'framer-motion';

interface CashSalesProps {
  onSellTickets: () => void;
  onViewSales: () => void;
}

export const CashSales = ({ onViewSales }: CashSalesProps) => {
  const { exportToCsv } = useExportCsv();

  const events = [{ name: 'Underground Techno Night', ticketsLeft: 32 }];

  const [isReportOpen, setIsReportOpen] = React.useState(false);
  const [isSellOpen, setIsSellOpen] = React.useState(false);

  const salesRows: SalesRow[] = [
    {
      id: 'CS-001',
      customer: 'Ana García Rodríguez',
      ci: '12345678',
      phone: '+1234567890',
      email: 'ana.garcia@email.com',
      type: 'VIP',
      qty: 2,
      unit: 120,
      total: 240,
      date: '14/7/2024',
    },
    {
      id: 'CS-002',
      customer: 'Carlos Mendoza Silva',
      ci: '87654321',
      phone: '+1234567891',
      email: 'carlos.mendoza@email.com',
      type: 'General',
      qty: 1,
      unit: 80,
      total: 80,
      date: '17/7/2024',
    },
    {
      id: 'CS-003',
      customer: 'María José López',
      ci: '11223344',
      phone: '+1234567892',
      email: 'maria.lopez@email.com',
      type: 'Early Bird',
      qty: 3,
      unit: 60,
      total: 180,
      date: '9/7/2024',
    },
  ];

  const handleExportCsv = () => {
    exportToCsv('cash-sales-report', salesRows, [
      { key: 'id', header: 'ID' },
      { key: 'customer', header: 'Customer' },
      { key: 'ci', header: 'CI' },
      { key: 'phone', header: 'Phone' },
      { key: 'email', header: 'Email' },
      { key: 'type', header: 'Ticket Type' },
      { key: 'qty', header: 'Qty' },
      { key: 'unit', header: 'Unit Price' },
      { key: 'total', header: 'Total' },
      { key: 'date', header: 'Date' },
    ]);
  };

  return (
    <motion.div
      className="w-full max-[1200px]:px-4 flex flex-col max-w-[1400px] bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 p-6 rounded-2xl border border-pink-500/30 text-white shadow-md backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold mb-4">Cash Sales Events</h2>
      {events.map((event, index) => (
        <motion.div
          key={index}
          className="flex flex-col gap-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20 justify-between rounded-xl p-4 border border-pink-500/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <div className="flex justify-between gap-2 ">
            <h3 className="font-medium mr-12">{event.name}</h3>
            <p className="text-white text-sm font-semibold">
              {event.ticketsLeft} tickets left
            </p>
          </div>
          <div className="flex gap-2 items-start ">
            <div className="flex gap-2 max-[700px]:flex-col max-[700px]:items-start max-[700px]:w-full">
              <motion.button
                onClick={() => setIsSellOpen(true)}
                className="cursor-pointer bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-400/40 hover:from-pink-500/60 hover:via-purple-500/60 hover:to-cyan-400/60 text-white px-3 py-1.5 text-sm rounded-md backdrop-blur-sm border border-pink-500/20 hover:border-cyan-400 relative overflow-hidden max-[700px]:w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Sell Tickets</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
              </motion.button>
              <motion.button
                onClick={() => {
                  setIsReportOpen(true);
                  onViewSales();
                }}
                className="cursor-pointer bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 text-cyan-300 px-3 py-1.5 text-sm rounded-md border border-pink-500/30 backdrop-blur-sm max-[700px]:w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Sales Report
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}

      <SalesReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        eventName="Underground Techno Night"
        rows={salesRows}
        totals={{ revenue: 1260, tickets: 13, customers: 6 }}
        onExportCsv={handleExportCsv}
      />

      <SellTicketsModal
        isOpen={isSellOpen}
        onClose={() => setIsSellOpen(false)}
        eventName={events[0].name}
        ticketsLeft={events[0].ticketsLeft}
        onComplete={() => setIsSellOpen(false)}
      />
    </motion.div>
  );
};

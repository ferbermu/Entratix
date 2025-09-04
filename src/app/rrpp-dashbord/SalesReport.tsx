'use client';
import React from 'react';
import {
  CurrencyDollarSimple,
  CalendarBlank,
  User,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const salesData = [
  {
    event: 'Underground Techno Night',
    buyer: 'Ana García',
    tickets: 2,
    amount: 100,
    type: 'cash',
    date: '19/7/2024',
  },
];

export const SalesReports = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: 'Total Revenue',
            value: '$100',
            icon: <CurrencyDollarSimple size={24} />,
          },
          { label: 'Tickets Sold', value: '2', icon: <User size={24} /> },
          {
            label: 'Active Events',
            value: '2',
            icon: <CalendarBlank size={24} />,
          },
        ].map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MetricCard {...metric} color="text-white" />
          </motion.div>
        ))}
      </div>

      {/* Recent Sales Table */}
      <motion.div
        className="bg-[#3BAFBB]/10 rounded-xl border border-[#3BAFBB40] p-6 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold text-white mb-4">Recent Sales</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-white">
            <thead className="text-xs uppercase text-[#A3A3A3] border-b border-[#3BAFBB20]">
              <tr>
                <th className="px-4 py-2">Event</th>
                <th className="px-4 py-2">Buyer</th>
                <th className="px-4 py-2">Tickets</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className="border-b border-[#3BAFBB20]"
                >
                  <td className="px-4 py-3">{sale.event}</td>
                  <td className="px-4 py-3">{sale.buyer}</td>
                  <td className="px-4 py-3">{sale.tickets}</td>
                  <td className="px-4 py-3 text-[#3BAFBB]">${sale.amount}</td>
                  <td className="px-4 py-3">
                    <motion.span
                      className="bg-[#3BAFBB1A] text-[#3BAFBB] text-xs font-medium px-2 py-1 rounded-full border border-[#3BAFBB40]"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      {sale.type}
                    </motion.span>
                  </td>
                  <td className="px-4 py-3">{sale.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

const MetricCard = ({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) => {
  return (
    <div className="bg-[#3BAFBB]/10 border border-[#3BAFBB40] rounded-xl p-4 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-sm text-[#3BAFBB]">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
      <div className="text-[#3BAFBB]/80">{icon}</div>
    </div>
  );
};

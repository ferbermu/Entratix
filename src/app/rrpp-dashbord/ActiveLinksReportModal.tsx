'use client';
import React from 'react';
import {
  X,
  MagnifyingGlass,
  DownloadSimple,
  CreditCard,
  Bank,
  PaypalLogo,
  CurrencyDollar,
  CheckCircle,
  ClockCounterClockwise,
  XCircle,
} from '@phosphor-icons/react';
import { CustomDropdown } from './CustomDropdown';
import { useExportCsv } from '@/hooks/useExportCsv';
import { motion, AnimatePresence } from 'framer-motion';

export interface ActiveLinksRow {
  fullName: string;
  email: string;
  phone: string;
  ticketType: 'VIP' | 'General' | 'Early Bird';
  value: number;
  paymentMethod:
    | 'Credit Card'
    | 'Debit Card'
    | 'Paypal'
    | 'Bank Transfer'
    | 'Cash';
  status: 'Valid' | 'Used' | 'Expired';
  purchaseDate: string; // dd/mm/yyyy
}

export interface ActiveLinksReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  rows: ActiveLinksRow[];
  totals: {
    revenue: number;
    customers: number;
  };
}

const StatusPill = ({ status }: { status: ActiveLinksRow['status'] }) => {
  const map: Record<ActiveLinksRow['status'], string> = {
    Valid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Used: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    Expired: 'bg-red-500/10 text-red-400 border-red-500/30',
  };
  const Icon =
    status === 'Valid'
      ? CheckCircle
      : status === 'Used'
      ? ClockCounterClockwise
      : XCircle;
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs border ${map[status]}`}
    >
      <Icon size={14} /> {status}
    </span>
  );
};

const TicketPill = ({ type }: { type: ActiveLinksRow['ticketType'] }) => (
  <span className="inline-flex px-3 py-1 rounded-full text-xs bg-gradient-to-r from-gray-600 to-gray-500 text-cyan-300 border border-pink-500/30">
    {type}
  </span>
);

const Payment = ({ method }: { method: ActiveLinksRow['paymentMethod'] }) => {
  const iconClass = 'text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]';
  switch (method) {
    case 'Credit Card':
      return (
        <span className="inline-flex items-center gap-2">
          <CreditCard size={16} className={iconClass} /> Credit Card
        </span>
      );
    case 'Debit Card':
      return (
        <span className="inline-flex items-center gap-2">
          <CreditCard size={16} className={iconClass} /> Debit Card
        </span>
      );
    case 'Paypal':
      return (
        <span className="inline-flex items-center gap-2">
          <PaypalLogo size={16} className={iconClass} /> Paypal
        </span>
      );
    case 'Bank Transfer':
      return (
        <span className="inline-flex items-center gap-2">
          <Bank size={16} className={iconClass} /> Bank Transfer
        </span>
      );
    case 'Cash':
      return (
        <span className="inline-flex items-center gap-2">
          <CurrencyDollar size={16} className={iconClass} /> Cash
        </span>
      );
  }
};

export const ActiveLinksReportModal: React.FC<ActiveLinksReportModalProps> = ({
  isOpen,
  onClose,
  eventName,
  rows,
  totals,
}) => {
  const [status, setStatus] = React.useState<string>('All Status');
  const [ticketType, setTicketType] =
    React.useState<string>('All Ticket Types');
  const [paymentMethod, setPaymentMethod] = React.useState<string>(
    'All Payment Methods'
  );
  const [search, setSearch] = React.useState<string>('');

  const { exportToCsv } = useExportCsv();

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const filteredRows = React.useMemo(() => {
    return rows.filter(r => {
      const matchesSearch =
        search.trim().length === 0 ||
        r.fullName.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === 'All Status' || r.status === status;
      const matchesTicket =
        ticketType === 'All Ticket Types' ||
        r.ticketType === (ticketType as ActiveLinksRow['ticketType']);
      const matchesPayment =
        paymentMethod === 'All Payment Methods' ||
        r.paymentMethod === (paymentMethod as ActiveLinksRow['paymentMethod']);

      return matchesSearch && matchesStatus && matchesTicket && matchesPayment;
    });
  }, [rows, search, status, ticketType, paymentMethod]);

  const handleExportCsv = () => {
    exportToCsv('active-links-report', filteredRows, [
      { key: 'fullName', header: 'Full Name' },
      { key: 'email', header: 'Email' },
      { key: 'phone', header: 'Phone' },
      { key: 'ticketType', header: 'Ticket Type' },
      { key: 'value', header: 'Value' },
      { key: 'paymentMethod', header: 'Payment Method' },
      { key: 'status', header: 'Status' },
      { key: 'purchaseDate', header: 'Purchase Date' },
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-2 md:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative max-w-full h-[66vh] max-[700px]:h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-pink-500/30 flex flex-col overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-pink-500/30 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
              <div>
                <h3 className="text-2xl font-bold text-white">{eventName}</h3>
                <p className="text-sm text-cyan-300">
                  Customer Purchase Details
                </p>
              </div>
            </div>

            {/* Search + Filters */}
            <div className="px-6 py-4 flex-shrink-0">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex-1 relative min-w-[200px]">
                  <MagnifyingGlass
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
                  />
                  <input
                    placeholder="Search by name or email..."
                    className="w-full bg-gray-800 border border-pink-500/30 rounded-lg text-sm text-cyan-300 placeholder:text-gray-400 pl-9 pr-3 h-11 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <button
                  className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-500 text-white px-4 h-11 text-sm rounded-md border border-pink-500/20 hover:border-cyan-400 relative overflow-hidden"
                  onClick={handleExportCsv}
                >
                  <DownloadSimple size={18} className="relative z-10" />
                  <span className="relative z-10">Export CSV</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
                </button>
              </div>

              <div className="flex gap-2 mt-3 flex-wrap">
                <CustomDropdown
                  selected={status}
                  options={['All Status', 'Valid', 'Used', 'Expired']}
                  onSelect={setStatus}
                />
                <CustomDropdown
                  selected={ticketType}
                  options={['All Ticket Types', 'VIP', 'General', 'Early Bird']}
                  onSelect={setTicketType}
                />
                <CustomDropdown
                  selected={paymentMethod}
                  options={[
                    'All Payment Methods',
                    'Credit Card',
                    'Debit Card',
                    'Paypal',
                    'Bank Transfer',
                    'Cash',
                  ]}
                  onSelect={setPaymentMethod}
                />
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-4 px-5 py-3 flex-shrink-0 flex-wrap">
              <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-cyan-300 px-4 py-2 rounded-md text-sm border border-pink-500/30">
                Total Customers:{' '}
                <span className="text-white font-semibold">
                  {totals.customers}
                </span>
              </div>
              <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-cyan-300 px-4 py-2 rounded-md text-sm border border-pink-500/30">
                Total Revenue:{' '}
                <span className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text font-semibold">
                  ${totals.revenue}
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="px-5 pb-5 flex-1 overflow-auto">
              <div className="overflow-auto max-h-[460px] max-[700px]:h-full rounded-lg border border-pink-500/30 bg-gray-800">
                <table className="min-w-full text-sm text-gray-200">
                  <thead className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-left sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3">Full Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3">Ticket Type</th>
                      <th className="px-4 py-3">Value</th>
                      <th className="px-4 py-3">Payment</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Purchase Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((r, i) => (
                      <tr
                        key={i}
                        className="border-b border-pink-500/30 odd:bg-gray-700 even:bg-gray-800 hover:bg-gradient-to-r hover:from-gray-600 hover:via-gray-500 hover:to-gray-600"
                      >
                        <td className="px-4 py-2">{r.fullName}</td>
                        <td className="px-4 py-2">{r.email}</td>
                        <td className="px-4 py-2">{r.phone}</td>
                        <td className="px-4 py-2">
                          <TicketPill type={r.ticketType} />
                        </td>
                        <td className="px-4 py-2">${r.value}</td>
                        <td className="px-4 py-2">
                          <Payment method={r.paymentMethod} />
                        </td>
                        <td className="px-4 py-2">
                          <StatusPill status={r.status} />
                        </td>
                        <td className="px-4 py-2">{r.purchaseDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className=" top-4 right-4 p-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white border border-pink-500/20 hover:border-cyan-400 relative overflow-hidden"
            >
              <X size={20} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
  <span className="inline-flex px-3 py-1 rounded-full text-xs bg-[#3BAFBB]/30 text-white border border-[#3BAFBB]">
    {type}
  </span>
);

const Payment = ({ method }: { method: ActiveLinksRow['paymentMethod'] }) => {
  const iconClass = 'text-[#A3A3A3]';
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

  // BLOQUEO DE SCROLL DEL BODY CUANDO EL MODAL ESTÁ ABIERTO
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2 md:px-0">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative oveflow-y-auto max-w-full h-[66vh] max-[700px]:h-full bg-[#1C1A1A] rounded-2xl shadow-2xl border border-[#3BAFBB40] overflow-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#3BAFBB40] bg-[#3BAFBB1A]">
          <div>
            <h3 className="text-2xl font-bold text-white">{eventName}</h3>
            <p className="text-sm text-[#A3A3A3]">Customer Purchase Details</p>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="px-6 py-4 flex-shrink-0">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1 relative min-w-[200px]">
              <MagnifyingGlass
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]"
              />
              <input
                placeholder="Search by name or email..."
                className="w-full bg-[#3BAFBB1A] border border-[#3BAFBB] rounded-lg text-sm text-white placeholder:text-[#A3A3A3] pl-9 pr-3 h-11"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button
              className="cursor-pointer flex items-center gap-2 bg-[#3BAFBB] hover:bg-[#2B9FA9] text-white px-4 h-11 text-sm rounded-md"
              onClick={handleExportCsv}
            >
              <DownloadSimple size={18} /> Export CSV
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
          <div className="bg-[#3BAFBB1A] text-[#A3A3A3] px-4 py-2 rounded-md text-sm border border-[#3BAFBB]">
            Total Customers:{' '}
            <span className="text-white font-semibold">{totals.customers}</span>
          </div>
          <div className="bg-[#3BAFBB1A] text-[#A3A3A3] px-4 py-2 rounded-md text-sm border border-[#3BAFBB]">
            Total Revenue:{' '}
            <span className="text-[#3BAFBB] font-semibold">
              ${totals.revenue}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="px-5 pb-5 flex-1 overflow-auto">
          <div className="overflow-auto max-h-[460px] max-[700px]:h-full rounded-lg border border-[#3BAFBB40]">
            <table className="min-w-full text-sm text-gray-200">
              <thead className="bg-[#3BAFBB1A] text-left sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Ticket Type</th>
                  <th className="px-4 py-3">Value</th>
                  <th className="px-4 py-3">Payment Method</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Purchase Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, idx) => (
                  <tr key={idx} className="odd:bg-white/[0.02]">
                    <td className="px-4 py-3">{row.fullName}</td>
                    <td className="px-4 py-3">{row.email}</td>
                    <td className="px-4 py-3">{row.phone}</td>
                    <td className="px-4 py-3 text-nowrap">
                      <TicketPill type={row.ticketType} />
                    </td>
                    <td className="px-4 py-3 text-[#3BAFBB] font-semibold">
                      ${row.value}
                    </td>
                    <td className="px-4 py-3">
                      <Payment method={row.paymentMethod} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={row.status} />
                    </td>
                    <td className="px-4 py-3">{row.purchaseDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Close */}
        <button
          className="absolute top-4 right-4 p-2 rounded-md bg-[#3BAFBB1A] text-[#A3A3A3] hover:text-white border border-[#3BAFBB] cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ActiveLinksReportModal;

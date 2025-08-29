'use client';
import React from 'react';
import { Calendar, Eye, DownloadSimple } from '@phosphor-icons/react';
import ActiveLinksReportModal, {
  type ActiveLinksRow,
} from './ActiveLinksReportModal';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const events = [
  {
    name: 'Underground Techno Night',
    date: '14/8/2024',
    time: '23:00',
    courtesyAvailable: 20,
    courtesySent: 15,
    ticketsSold: 45,
    cashRemaining: 32,
    link: 'https://entratix.com/event/underground-techno-night?rrpp=john123',
    status: 'active',
  },
  {
    name: 'Latin Beats Festival',
    date: '21/8/2024',
    time: '20:00',
    courtesyAvailable: 15,
    courtesySent: 10,
    ticketsSold: 28,
    cashRemaining: 0,
    link: 'https://entratix.com/event/latin-beats-festival?rrpp=john123',
    status: 'active',
  },
];

type FilterKey = 'all' | 'active' | 'finished' | 'suspended';

export const ActiveLinks = () => {
  const [filter, setFilter] = React.useState<FilterKey>('all');
  const [isReportOpen, setIsReportOpen] = React.useState(false);
  const [reportEventName, setReportEventName] = React.useState<string>('');
  const [reportRows, setReportRows] = React.useState<ActiveLinksRow[]>([]);
  const [reportTotals, setReportTotals] = React.useState({
    revenue: 0,
    customers: 0,
  });
  const [copiedLink, setCopiedLink] = React.useState<string | null>(null);

  const openReportForEvent = (eventName: string) => {
    setReportEventName(eventName);

    // Datos de ejemplo, estos vendrán del backend
    const rows: ActiveLinksRow[] = [
      {
        fullName: 'Ana García Rodríguez',
        email: 'ana.garcia@email.com',
        phone: '+1234567890',
        ticketType: 'VIP',
        value: 120,
        paymentMethod: 'Credit Card',
        status: 'Valid',
        purchaseDate: '14/7/2024',
      },
      {
        fullName: 'Carlos Mendoza Silva',
        email: 'carlos.mendoza@email.com',
        phone: '+1234567891',
        ticketType: 'General',
        value: 80,
        paymentMethod: 'Debit Card',
        status: 'Used',
        purchaseDate: '17/7/2024',
      },
      {
        fullName: 'María José López',
        email: 'maria.lopez@email.com',
        phone: '+1234567892',
        ticketType: 'Early Bird',
        value: 60,
        paymentMethod: 'Paypal',
        status: 'Valid',
        purchaseDate: '9/7/2024',
      },
      {
        fullName: 'Roberto Fernández',
        email: 'roberto.fernandez@email.com',
        phone: '+1234567893',
        ticketType: 'VIP',
        value: 120,
        paymentMethod: 'Bank Transfer',
        status: 'Expired',
        purchaseDate: '24/6/2024',
      },
      {
        fullName: 'Isabella Torres',
        email: 'isabella.torres@email.com',
        phone: '+1234567894',
        ticketType: 'General',
        value: 80,
        paymentMethod: 'Cash',
        status: 'Valid',
        purchaseDate: '19/7/2024',
      },
    ];

    const revenue = rows.reduce((acc, r) => acc + r.value, 0);
    const customers = rows.length;
    setReportRows(rows);
    setReportTotals({ revenue, customers });
    setIsReportOpen(true);
  };

  const exportPdf = () => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text(`Sales Report - ${reportEventName}`, 14, 20);

    // Totales
    doc.setFontSize(12);
    doc.text(`Revenue: $${reportTotals.revenue}`, 14, 30);
    doc.text(`Customers: ${reportTotals.customers}`, 14, 38);

    // Tabla
    autoTable(doc, {
      startY: 45,
      head: [
        [
          'Full Name',
          'Email',
          'Phone',
          'Ticket Type',
          'Value',
          'Payment Method',
          'Status',
          'Purchase Date',
        ],
      ],
      body: reportRows.map(r => [
        r.fullName,
        r.email,
        r.phone,
        r.ticketType,
        `$${r.value}`,
        r.paymentMethod,
        r.status,
        r.purchaseDate,
      ]),
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [59, 175, 187] }, // celeste
    });

    doc.save(`${reportEventName.replace(/\s+/g, '_')}_sales.pdf`);
  };

  const filteredEvents = events.filter(e =>
    filter === 'all' ? true : e.status === filter
  );

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#3BAFBB1A] text-[#3BAFBB] border-[#3BAFBB40]';
      case 'finished':
        return 'bg-white/10 text-white border-white/20';
      case 'suspended':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="flex flex-col w-full px-20 max-[700px]:px-0 max-[1200px]:px-10 gap-6">
      {/* Tabs */}
      <div className="flex gap-3 mb-1 p-1 bg-[#3BAFBB]/10 rounded-lg max-[700px]:grid max-[700px]:grid-cols-2 max-[700px]:gap-2">
        {(
          [
            { key: 'all', label: 'All Events' },
            { key: 'active', label: 'Active' },
            { key: 'finished', label: 'Finished' },
            { key: 'suspended', label: 'Suspended' },
          ] as Array<{ key: FilterKey; label: string }>
        ).map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-1.5 text-md rounded-lg cursor-pointer transition-colors duration-150 max-[700px]:w-full max-[700px]:py-2 ${
              filter === tab.key
                ? 'bg-[#3BAFBB] text-white border-[#3BAFBB]'
                : ' text-[#A3A3A3]  hover:bg-[#3BAFBB33]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Eventos */}
      {filteredEvents.map((event, i) => (
        <div
          key={i}
          className="bg-[#3BAFBB]/10 border border-[#3BAFBB40] rounded-xl p-6 shadow-md relative"
        >
          <div className="flex justify-between items-center mb-6 ">
            <div>
              <h2 className="text-xl font-semibold text-white">{event.name}</h2>
              <div className="flex items-center text-sm text-[#A3A3A3] mt-1 gap-2">
                <Calendar size={16} />
                <span>{event.date}</span>
                <span>{event.time}</span>
              </div>
            </div>
            <p
              className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusClasses(
                event.status
              )}`}
            >
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-4 max-[1200px]:grid-cols-1  gap-4 mb-5">
            <MetricCard
              label="Courtesy Available"
              value={event.courtesyAvailable}
            />
            <MetricCard label="Courtesy Sent" value={event.courtesySent} />
            <MetricCard label="Tickets Sold" value={event.ticketsSold} />
            <MetricCard
              label="Cash Remaining"
              value={event.cashRemaining}
              highlight={
                event.cashRemaining > 0 ? 'text-yellow-400' : 'text-red-500'
              }
            />
          </div>

          {/* Event Link + Copy Button */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              readOnly
              value={event.link}
              className="bg-[#1C1C2E]/10 text-sm text-white px-4 py-2 rounded-md w-full border border-[#3BAFBB40]"
            />
            <button
              onClick={() => handleCopy(event.link)}
              className={`px-4 py-2 text-sm rounded-lg shrink-0 transition-colors duration-200 cursor-pointer ${
                copiedLink === event.link
                  ? 'bg-green-500 text-white'
                  : 'bg-[#3BAFBB] hover:bg-[#2B9FA9] text-white'
              }`}
            >
              {copiedLink === event.link ? 'Copiado' : 'Copy'}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4 max-[1200px]:justify-between max-[340px]:flex-col">
            <button
              className="cursor-pointer max-[340px]:w-full max-[700px]:w-full max-[340px]:justify-center max-[340px]:text-center flex items-center gap-2 bg-[#3BAFBB] hover:bg-[#2B9FA9] text-white text-sm font-medium px-4 py-2 rounded-md"
              onClick={() => openReportForEvent(event.name)}
            >
              <Eye size={16} /> View Details
            </button>
            <button
              onClick={exportPdf}
              className="cursor-pointer max-[700px]:w-full max-[340px]:justify-center max-[340px]:text-center flex items-center gap-2 bg-[#3BAFBB1A] hover:bg-[#3BAFBB33] text-[#3BAFBB] text-sm font-medium px-4 py-2 rounded-md border border-[#3BAFBB40]"
            >
              <DownloadSimple size={16} /> Download Report
            </button>
          </div>
        </div>
      ))}

      <ActiveLinksReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        eventName={reportEventName}
        rows={reportRows}
        totals={reportTotals}
      />
    </div>
  );
};

const MetricCard = ({
  label,
  value,
  highlight = 'text-white',
}: {
  label: string;
  value: number;
  highlight?: string;
}) => (
  <div className="bg-[#3BAFBB1A] p-3 rounded-lg border border-[#3BAFBB40] text-center">
    <p className="text-xs text-[#A3A3A3]">{label}</p>
    <p className={`text-lg font-semibold ${highlight}`}>{value}</p>
  </div>
);

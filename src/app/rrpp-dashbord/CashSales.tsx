'use client';
import React from 'react';
import { SalesReportModal, SalesRow } from './SalesReportModal';

interface CashSalesProps {
  onSellTickets: () => void;
  onViewSales: () => void;
}

export const CashSales = ({ onSellTickets, onViewSales }: CashSalesProps) => {
  const events = [
    {
      name: 'Underground Techno Night',
      ticketsLeft: 32,
    },
  ];

  const [isReportOpen, setIsReportOpen] = React.useState(false);

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

  return (
    <div className="w-full max-[1200px]:px-4 flex flex-col max-w-[1400px]   bg-[#3BAFBB]/10 p-6 rounded-2xl border border-[#3BAFBB40] text-white shadow-md">
      <h2 className="text-lg font-semibold mb-4">Cash Sales Events</h2>
      {events.map((event, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 bg-[#3BAFBB1A] justify-between rounded-xl p-4 border border-[#3BAFBB40]"
        >
          <div className="flex justify-between gap-2 ">
            <h3 className="font-medium mr-12">{event.name}</h3>
            <p className="text-white text-sm font-semibold">
              {event.ticketsLeft} tickets left
            </p>
          </div>
          <div className="flex  gap-2 items-start ">
            <div className="flex gap-2 max-[700px]:flex-col max-[700px]:items-start max-[700px]:w-full">
              <button
                onClick={onSellTickets}
                className="cursor-pointer bg-[#3BAFBB] max-[700px]:w-full hover:bg-[#2B9FA9] text-white px-3 py-1.5 text-sm rounded-md"
              >
                Sell Tickets
              </button>
              <button
                onClick={() => {
                  setIsReportOpen(true);
                  if (onViewSales) {
                    onViewSales();
                  }
                }}
                className="cursor-pointer bg-[#3BAFBB1A] max-[700px]:w-full hover:bg-[#3BAFBB33] text-[#3BAFBB] px-3 py-1.5 text-sm rounded-md border border-[#3BAFBB40]"
              >
                View Sales Report
              </button>
            </div>
          </div>
        </div>
      ))}

      <SalesReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        eventName="Underground Techno Night"
        rows={salesRows}
        totals={{ revenue: 1260, tickets: 13, customers: 6 }}
        onExportCsv={() => {
          // Placeholder export handler
          const header =
            'id,customer,ci,phone,email,type,qty,unit,total,date\n';
          const body = salesRows
            .map(
              r =>
                `${r.id},${r.customer},${r.ci},${r.phone},${r.email},${r.type},${r.qty},${r.unit},${r.total},${r.date}`
            )
            .join('\n');
          const blob = new Blob([header + body], {
            type: 'text/csv;charset=utf-8;',
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'cash-sales-report.csv';
          link.click();
          URL.revokeObjectURL(url);
        }}
      />
    </div>
  );
};

'use client';
import React, { useState } from 'react';
import { CashSales } from './CashSales';
import { ActiveLinks } from './ActiveLinks';
import { SubRrpp } from './SubRrpp';
import { SalesReports } from './SalesReport';
import Analytics from './Analytics';
import RrppManual from './RrppManual';

export default function RrppDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'links' | 'cash' | 'subrrpp' | 'sales' | 'analytics' | 'manual'
  >('cash');

  const renderComponent = () => {
    switch (activeTab) {
      case 'links':
        return <ActiveLinks />;
      case 'cash':
        return (
          <CashSales
            onSellTickets={() => alert('Sell Tickets clicked')}
            onViewSales={() => alert('View Sales Summary clicked')}
          />
        );
      case 'subrrpp':
        return <SubRrpp />;
      case 'sales':
        return <SalesReports />;
      case 'analytics':
        return <Analytics />;
      case 'manual':
        return <RrppManual />;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center py-10 px-4 gap-6 h-screen mt-30  mb-30">
      <h1 className="text-4xl font-bold text-[#3BAFBB]">RRPP Dashboard</h1>
      <p className="text-sm text-gray-300 mb-4 text-center">
        Manage your events, sales, and team from one place
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('links')}
          className={`px-4 py-2 rounded-full text-sm ${
            activeTab === 'links'
              ? 'bg-[#3BAFBB] text-white'
              : 'bg-[#2C2C3F] text-gray-300'
          }`}
        >
          Active Links
        </button>
        <button
          onClick={() => setActiveTab('cash')}
          className={`px-4 py-2 rounded-full text-sm ${
            activeTab === 'cash'
              ? 'bg-fuchsia-600 text-white'
              : 'bg-[#2C2C3F] text-gray-300'
          }`}
        >
          Cash Sales
        </button>
        <button
          onClick={() => setActiveTab('subrrpp')}
          className={`px-4 py-2 rounded-full text-sm ${
            activeTab === 'subrrpp'
              ? 'bg-purple-600 text-white'
              : 'bg-[#2C2C3F] text-gray-300'
          }`}
        >
          Sub RRPPs
        </button>

        <button
          onClick={() => setActiveTab('sales')}
          className={`px-4 py-2 rounded-full text-sm ${
            activeTab === 'sales'
              ? 'bg-fuchsia-600 text-white'
              : 'bg-[#2C2C3F] text-gray-300'
          }`}
        >
          Sales Reports
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-full text-sm ${
            activeTab === 'analytics'
              ? 'bg-fuchsia-600 text-white'
              : 'bg-[#2C2C3F] text-gray-300'
          }`}
        >
          Analytics
        </button>

        <button
          onClick={() => setActiveTab('manual')}
          className={`px-4 py-2 rounded-full text-sm ${
            activeTab === 'manual'
              ? 'bg-purple-500 text-white'
              : 'bg-[#2C2C3F] text-gray-300'
          }`}
        >
          Manual
        </button>
      </div>

      {renderComponent()}
    </div>
  );
}

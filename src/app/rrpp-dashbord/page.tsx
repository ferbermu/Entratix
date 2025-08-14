'use client';
import React, { useState } from 'react';
import { CashSales } from './CashSales';
import { ActiveLinks } from './ActiveLinks';
import { SubRrpp } from './SubRrpp';
import { SalesReports } from './SalesReport';
import Analytics from './Analytics';
import RrppManual from './RrppManual';
import {
  LinkSimple,
  CurrencyDollar,
  Users,
  ChartBar,
  Activity,
  BookOpen,
} from '@phosphor-icons/react';

const tabs = [
  {
    key: 'links',
    label: 'Active Links',
    Icon: LinkSimple,
    activeClass: 'bg-[#3BAFBB] text-white',
  },
  {
    key: 'cash',
    label: 'Cash Sales',
    Icon: CurrencyDollar,
    activeClass: 'bg-[#3BAFBB] text-white',
  },
  {
    key: 'subrrpp',
    label: 'Sub RRPPs',
    Icon: Users,
    activeClass: 'bg-[#3BAFBB] text-white',
  },
  {
    key: 'sales',
    label: 'Sales Reports',
    Icon: ChartBar,
    activeClass: 'bg-[#3BAFBB] text-white',
  },
  {
    key: 'analytics',
    label: 'Analytics',
    Icon: Activity,
    activeClass: 'bg-[#3BAFBB] text-white',
  },
  {
    key: 'manual',
    label: 'Manual',
    Icon: BookOpen,
    activeClass: 'bg-[#3BAFBB] text-white',
  },
] as const;

type TabKey = (typeof tabs)[number]['key'];

export default function RrppDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('cash');

  const renderComponent = () => {
    switch (activeTab) {
      case 'links':
        return <ActiveLinks />;
      case 'cash':
        return (
          <CashSales
            onSellTickets={() => alert('Sell Tickets clicked')}
            onViewSales={() => {}}
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
    <div className="flex flex-col min-h-screen w-full py-30 px-4 gap-6">
      <div className="flex flex-col items-center gap-6 w-full max-w-[1200px] mx-auto">
        <h1 className="text-5xl font-bold text-[#3BAFBB]">RRPP Dashboard</h1>
        <p className="text-xl text-gray-300 mb-4 text-center">
          Manage your events, sales, and team from one place
        </p>

        <div className="mt-10 gap-2 mb-6 grid grid-cols-6 max-[1200px]:grid-cols-3 max-[700px]:grid-cols-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={` py-3 px-4 rounded-xl text-md cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === tab.key
                  ? tab.activeClass
                  : 'bg-[#2C2C3F] text-gray-300'
              }`}
            >
              {tab.Icon ? <tab.Icon size={18} weight="bold" /> : null}
              {tab.label}
            </button>
          ))}
        </div>

        {renderComponent()}
      </div>
    </div>
  );
}

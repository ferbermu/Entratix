'use client';
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
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

  // Variants para animaciones
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen w-full py-30 px-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div
        variants={item}
        className="flex flex-col items-center gap-6 w-full max-w-[1200px] mx-auto"
      >
        <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text">
          RRPP Dashboard
        </h1>
        <p className="text-xl text-cyan-300 mb-4 text-center">
          Manage your events, sales, and team from one place
        </p>

        <div className="mt-10 gap-2 mb-6 grid grid-cols-6 max-[1200px]:grid-cols-3 max-[700px]:grid-cols-2">
          {tabs.map(tab => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-3 px-4 rounded-xl text-md cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-400/40 text-white backdrop-blur-sm border border-pink-500/20 hover:border-cyan-400 relative overflow-hidden'
                  : 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-cyan-300 border border-pink-500/30 backdrop-blur-sm hover:from-pink-500/20 hover:to-purple-500/20'
              }`}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {tab.Icon && (
                <tab.Icon
                  size={18}
                  weight="bold"
                  className={
                    activeTab === tab.key
                      ? 'drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]'
                      : 'drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]'
                  }
                />
              )}
              <span className={activeTab === tab.key ? 'relative z-10' : ''}>
                {tab.label}
              </span>
              {activeTab === tab.key && (
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Contenido del tab */}
        <motion.div variants={item} className="w-full">
          {renderComponent()}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

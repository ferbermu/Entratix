'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Gear, Lock } from '@phosphor-icons/react';
import { ProfileContent } from './components/ProfileContent';
import { SettingsContent } from './components/SettingsContent';
import { SecurityContent } from './components/SecurityContent';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Gear size={20} /> },
    { id: 'security', label: 'Security', icon: <Lock size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileContent />;
      case 'settings':
        return <SettingsContent />;
      case 'security':
        return <SecurityContent />;
    }
  };

  return (
    <div className="w-full min-h-screen px-60 max-[1400px]:px-4 text-white pt-40 pb-40">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
        {/* Page Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-[#3BAFBB] mb-2">My Account</h1>
          <p className="text-gray-400 text-xl">
            Manage your profile, tickets, and preferences
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex cursor-pointer items-center gap-2 px-6 py-3 rounded-lg border transition-colors
                ${
                  activeTab === tab.id
                    ? 'bg-[#3BAFBB]/80 text-white border-[#3BAFBB]'
                    : 'bg-[#1C1A1A] text-white border-[#3BAFBB40] hover:bg-[#3BAFBB1A]'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

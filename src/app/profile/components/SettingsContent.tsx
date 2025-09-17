'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, CaretDown } from '@phosphor-icons/react';

export const SettingsContent = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    profileVisibility: 'Public',
    dataSharing: true,
  });

  const handleToggle = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting as keyof typeof prev]: !prev[setting as keyof typeof prev],
    }));
  };

  const handleVisibilityChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      profileVisibility: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Notification Preferences Card */}
      <motion.div
        className="bg-black/20 border border-pink-500/30 rounded-xl p-6 backdrop-blur-sm shadow-lg shadow-pink-500/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Bell
              size={24}
              className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text"
            />
          </motion.div>
          <h3 className="text-xl font-semibold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text">
            Notification Preferences
          </h3>
        </div>

        <div className="space-y-4">
          {[
            {
              label: 'Email Notifications',
              description: 'Receive updates about your tickets and events',
              key: 'emailNotifications',
            },
            {
              label: 'SMS Notifications',
              description: 'Get text messages for important updates',
              key: 'smsNotifications',
            },
            {
              label: 'Push Notifications',
              description: 'Browser notifications for real-time updates',
              key: 'pushNotifications',
            },
          ].map((item, i) => (
            <motion.div
              key={item.key}
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <div>
                <p className="text-white font-medium">{item.label}</p>
                <p className="text-cyan-300 text-sm">{item.description}</p>
              </div>
              <motion.button
                onClick={() => handleToggle(item.key)}
                className={`cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings[item.key as keyof typeof settings]
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                    : 'bg-gray-600'
                }`}
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <motion.span
                  className="inline-block h-4 w-4 transform rounded-full bg-white"
                  animate={{
                    x: settings[item.key as keyof typeof settings] ? 24 : 2,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Privacy & Security Card */}
      <motion.div
        className="bg-black/20 border border-pink-500/30 rounded-xl p-6 backdrop-blur-sm shadow-lg shadow-pink-500/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Shield
              size={24}
              className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text"
            />
          </motion.div>
          <h3 className="text-xl font-semibold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text">
            Privacy & Security
          </h3>
        </div>

        <div className="space-y-4">
          {/* Profile Visibility */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <p className="text-white font-medium">Profile Visibility</p>
              <p className="text-cyan-300 text-sm">
                Make your profile visible to other users
              </p>
            </div>
            <div className="relative">
              <motion.select
                value={settings.profileVisibility}
                onChange={e => handleVisibilityChange(e.target.value)}
                className="appearance-none cursor-pointer bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 border border-pink-500/30 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-pink-500/50 focus:shadow-lg focus:shadow-pink-500/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Friends Only">Friends Only</option>
              </motion.select>
              <CaretDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Data Sharing */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div>
              <p className="text-white font-medium">Data Sharing</p>
              <p className="text-cyan-300 text-sm">
                Allow anonymous analytics to improve our service
              </p>
            </div>
            <motion.button
              onClick={() => handleToggle('dataSharing')}
              className={`cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.dataSharing
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                  : 'bg-gray-600'
              }`}
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <motion.span
                className="inline-block h-4 w-4 transform rounded-full bg-white"
                animate={{ x: settings.dataSharing ? 24 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

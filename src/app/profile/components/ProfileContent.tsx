'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Ticket,
  CreditCard,
  Star,
  Envelope,
  Phone,
} from '@phosphor-icons/react';

export const ProfileContent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setHasChanges(false);
    setFormData({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
    });
  };

  const handleSave = () => {
    console.log('Saving data:', formData);
    setIsEditing(false);
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Summary Card */}
      <motion.div
        className="bg-[#1C1A1A] border border-[#3BAFBB40] rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-start justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-20 h-20 bg-[#3BAFBB] rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white font-bold text-xl">JD</span>
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white">John Doe</h3>
              <p className="text-gray-400">Member since 14/1/2024</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 w-full mt-6 p-4 rounded-lg max-[700px]:grid-cols-1">
            {[
              {
                icon: <Ticket size={24} />,
                value: '0',
                label: 'Total Tickets',
              },
              {
                icon: <CreditCard size={24} />,
                value: '$0',
                label: 'Total Spent',
              },
              { icon: <Star size={24} />, value: '4.8', label: 'Rating' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-[#3BAFBB1A] border border-[#3BAFBB40] rounded-lg p-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex justify-center mb-2 text-[#3BAFBB]">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Personal Information Card */}
      <motion.div
        className="bg-[#1C1A1A] border border-[#3BAFBB40] rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            Personal Information
          </h3>
          <div className="flex gap-3">
            <AnimatePresence>
              {hasChanges && (
                <motion.button
                  onClick={handleSave}
                  className="bg-[#19c37d] hover:bg-[#16a367] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Save Changes
                </motion.button>
              )}
            </AnimatePresence>
            <motion.button
              onClick={isEditing ? handleCancel : () => setIsEditing(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isEditing
                  ? 'bg-[#3BAFBB]/30 hover:bg-[#3BAFBB]/40 text-white cursor-pointer'
                  : 'bg-[#3BAFBB] hover:bg-[#2B9FA9] text-white cursor-pointer'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[
            {
              label: 'First Name',
              field: 'firstName',
              icon: <User size={20} />,
            },
            { label: 'Last Name', field: 'lastName', icon: <User size={20} /> },
            {
              label: 'Email',
              field: 'email',
              icon: <Envelope size={20} />,
              disabled: true,
            },
            { label: 'Phone', field: 'phone', icon: <Phone size={20} /> },
          ].map((input, i) => (
            <motion.div
              key={input.field}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {input.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {input.icon}
                </span>
                <input
                  type={input.field === 'email' ? 'email' : 'text'}
                  value={formData[input.field as keyof typeof formData]}
                  onChange={e => handleInputChange(input.field, e.target.value)}
                  disabled={input.disabled ?? !isEditing}
                  className="w-full bg-[#3BAFBB1A] border border-[#3BAFBB40] rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 disabled:opacity-50"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

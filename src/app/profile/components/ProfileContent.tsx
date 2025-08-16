'use client';

import React, { useState } from 'react';
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
    // Reset form data to original values
    setFormData({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
    });
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving data:', formData);
    setIsEditing(false);
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Summary Card */}
      <div className="bg-[#1C1A1A] border border-[#3BAFBB40] rounded-xl p-6">
        <div className="flex flex-col items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-[#3BAFBB] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">JD</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">John Doe</h3>
              <p className="text-gray-400">Member since 14/1/2024</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 w-full mt-6 p-4 rounded-lg max-[700px]:grid-cols-1">
            <div className="bg-[#3BAFBB1A] border border-[#3BAFBB40] rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <Ticket size={24} className="text-[#3BAFBB]" />
              </div>
              <div className="text-2xl font-bold text-white">0</div>
              <div className="text-sm text-gray-400">Total Tickets</div>
            </div>
            <div className="bg-[#3BAFBB1A] border border-[#3BAFBB40] rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <CreditCard size={24} className="text-[#3BAFBB]" />
              </div>
              <div className="text-2xl font-bold text-white">$0</div>
              <div className="text-sm text-gray-400">Total Spent</div>
            </div>
            <div className="bg-[#3BAFBB1A] border border-[#3BAFBB40] rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <Star size={24} className="text-[#3BAFBB]" />
              </div>
              <div className="text-2xl font-bold text-white">4.8</div>
              <div className="text-sm text-gray-400">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Card */}
      <div className="bg-[#1C1A1A] border border-[#3BAFBB40] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            Personal Information
          </h3>
          <div className="flex gap-3">
            {hasChanges && (
              <button
                onClick={handleSave}
                className="bg-[#19c37d] hover:bg-[#16a367] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Save Changes
              </button>
            )}
            <button
              onClick={isEditing ? handleCancel : () => setIsEditing(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isEditing
                  ? 'bg-[#3BAFBB]/30 hover:bg-[#3BAFBB]/40  text-white cursor-pointer'
                  : 'bg-[#3BAFBB] hover:bg-[#2B9FA9] text-white cursor-pointer'
              }`}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              First Name
            </label>
            <div className="relative">
              <User
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={formData.firstName}
                onChange={e => handleInputChange('firstName', e.target.value)}
                disabled={!isEditing}
                className="w-full bg-[#3BAFBB1A] border border-[#3BAFBB40] rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Last Name
            </label>
            <div className="relative">
              <User
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={formData.lastName}
                onChange={e => handleInputChange('lastName', e.target.value)}
                disabled={!isEditing}
                className="w-full bg-[#3BAFBB1A] border border-[#3BAFBB40] rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email
            </label>
            <div className="relative">
              <Envelope
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                disabled={true}
                className="w-full bg-[#3BAFBB1A] border border-[#3BAFBB40] rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Phone
            </label>
            <div className="relative">
              <Phone
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={e => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                className="w-full bg-[#3BAFBB1A] border border-[#3BAFBB40] rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

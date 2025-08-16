'use client';

import React, { useState } from 'react';
import { Lock, Eye, EyeSlash, SignOut } from '@phosphor-icons/react';

export const SecurityContent = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  return (
    <div className="space-y-8">
      {/* Change Password Section */}
      <div className="bg-[#1C1A1A] border border-[#3BAFBB40] rounded-xl p-8">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
          <Lock size={24} className="text-[#3BAFBB]" />
          Change Password
        </h2>

        {/* Current Password */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Current Password</label>
          <div className="relative">
            <input
              type={showPassword.current ? 'text' : 'password'}
              placeholder="Enter current password"
              className="w-full bg-[#2A2A2A] border border-[#3BAFBB40] rounded-lg px-4 py-3 pr-10 text-sm outline-none focus:border-[#3BAFBB]"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  current: !showPassword.current,
                })
              }
            >
              {showPassword.current ? (
                <EyeSlash size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-sm mb-2">New Password</label>
          <div className="relative">
            <input
              type={showPassword.new ? 'text' : 'password'}
              placeholder="Enter new password"
              className="w-full bg-[#2A2A2A] border border-[#3BAFBB40] rounded-lg px-4 py-3 pr-10 text-sm outline-none focus:border-[#3BAFBB]"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() =>
                setShowPassword({ ...showPassword, new: !showPassword.new })
              }
            >
              {showPassword.new ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Confirm New Password</label>
          <div className="relative">
            <input
              type={showPassword.confirm ? 'text' : 'password'}
              placeholder="Confirm new password"
              className="w-full bg-[#2A2A2A] border border-[#3BAFBB40] rounded-lg px-4 py-3 pr-10 text-sm outline-none focus:border-[#3BAFBB]"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  confirm: !showPassword.confirm,
                })
              }
            >
              {showPassword.confirm ? (
                <EyeSlash size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <button className="bg-[#3BAFBB] hover:bg-[#3BAFBB]/80 text-white font-medium px-6 py-3 rounded-lg transition cursor-pointer">
          Update Password
        </button>
      </div>

      {/* Account Actions Section */}
      <div className="bg-[#1C1A1A] border border-[#3BAFBB40] rounded-xl p-8">
        <h2 className="text-xl font-bold mb-6">Account Actions</h2>
        <button className="bg-[#3BAFBB]/10 hover:bg-[#3BAFBB]/20 flex items-center gap-2 text-white px-6 py-3 rounded-lg transition cursor-pointer">
          <SignOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

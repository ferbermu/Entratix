'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
      <motion.div
        className="bg-black/20 border border-pink-500/30 rounded-xl p-8 backdrop-blur-sm shadow-lg shadow-pink-500/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-xl font-bold flex items-center gap-2 mb-6 text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Lock
            size={24}
            className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text"
          />
          Change Password
        </motion.h2>

        {[
          {
            label: 'Current Password',
            key: 'current',
            placeholder: 'Enter current password',
          },
          {
            label: 'New Password',
            key: 'new',
            placeholder: 'Enter new password',
          },
          {
            label: 'Confirm New Password',
            key: 'confirm',
            placeholder: 'Confirm new password',
          },
        ].map((field, i) => (
          <motion.div
            key={field.key}
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <label className="block text-sm mb-2 text-cyan-300">
              {field.label}
            </label>
            <div className="relative">
              <motion.input
                type={
                  showPassword[field.key as keyof typeof showPassword]
                    ? 'text'
                    : 'password'
                }
                placeholder={field.placeholder}
                className="w-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 border border-pink-500/30 rounded-lg px-4 py-3 pr-10 text-sm outline-none focus:border-pink-500/50 focus:shadow-lg focus:shadow-pink-500/10 backdrop-blur-sm text-white placeholder-cyan-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              />
              <motion.button
                type="button"
                className="absolute right-3 top-3 text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    [field.key]:
                      !showPassword[field.key as keyof typeof showPassword],
                  })
                }
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {showPassword[field.key as keyof typeof showPassword] ? (
                  <EyeSlash size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </motion.button>
            </div>
          </motion.div>
        ))}

        <motion.button
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium px-6 py-3 rounded-lg transition cursor-pointer shadow-lg shadow-pink-500/25"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
        >
          Update Password
        </motion.button>
      </motion.div>

      {/* Account Actions Section */}
      <motion.div
        className="bg-black/20 border border-pink-500/30 rounded-xl p-8 backdrop-blur-sm shadow-lg shadow-pink-500/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h2
          className="text-xl font-bold mb-6 text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          Account Actions
        </motion.h2>
        <motion.button
          className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 hover:from-pink-500/20 hover:via-purple-500/20 hover:to-cyan-400/20 flex items-center gap-2 text-white px-6 py-3 rounded-lg transition cursor-pointer border border-pink-500/30 hover:border-pink-500/50"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
        >
          <SignOut
            size={20}
            className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text"
          />
          Sign Out
        </motion.button>
      </motion.div>
    </div>
  );
};

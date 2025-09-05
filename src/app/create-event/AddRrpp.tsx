'use client';

import React, { useState } from 'react';
import { Plus, Minus, User } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

export const AddRrpp = () => {
  const [rrppEmail, setRrppEmail] = useState('');
  const [rrppList, setRrppList] = useState<string[]>([]);

  const isValidEmail = (email: string) =>
    email.includes('@') && email.includes('.com');

  const handleAddEmail = () => {
    if (isValidEmail(rrppEmail)) {
      setRrppList([...rrppList, rrppEmail]);
      setRrppEmail('');
    }
  };

  const handleRemoveEmail = (indexToRemove: number) => {
    setRrppList(rrppList.filter((_, i) => i !== indexToRemove));
  };

  return (
    <motion.div
      className="bg-[#3BAFBB1A] max-w-[1400px] rounded-xl p-8 mx-auto mt-8 border border-[#3BAFBB] relative overflow-hidden shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Neon glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#3BAFBB]/10 via-cyan-400/5 to-[#3BAFBB]/10 blur-xl"></div>
      <div className="absolute inset-0 rounded-xl border border-[#3BAFBB]/30 shadow-[0_0_20px_rgba(59,175,187,0.3)]"></div>
      <div className="relative z-10">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <User
              className="text-[#3BAFBB] drop-shadow-[0_0_10px_rgba(59,175,187,0.8)] filter brightness-125"
              size={24}
            />
            <span className="text-gray-300 text-xl font-bold relative">
              RRPP
              <div className="absolute inset-0 text-[#3BAFBB] blur-sm opacity-40">
                RRPP
              </div>
            </span>
          </div>
          <motion.button
            onClick={handleAddEmail}
            disabled={!isValidEmail(rrppEmail)}
            className={`cursor-pointer flex items-center gap-2 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300 ${
              isValidEmail(rrppEmail)
                ? 'bg-[#3BAFBB] hover:bg-[#2A8C99] hover:shadow-[0_0_20px_rgba(59,175,187,0.6)] hover:scale-105 border border-[#3BAFBB]/50'
                : 'bg-gray-400 cursor-not-allowed border border-gray-600'
            }`}
            whileHover={isValidEmail(rrppEmail) ? { scale: 1.05 } : {}}
            whileTap={isValidEmail(rrppEmail) ? { scale: 0.95 } : {}}
          >
            <Plus size={18} />
            Add RRPP
          </motion.button>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div
            className="flex flex-col w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <label className="text-gray-300 text-sm mb-1 font-medium drop-shadow-sm">
              RRPP Email
            </label>
            <input
              type="text"
              value={rrppEmail}
              onChange={e => setRrppEmail(e.target.value)}
              placeholder="Enter RRPP email"
              className="text-gray-300 rounded-lg px-4 py-2 border border-[#3BAFBB] focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(59,175,187,0.4)] bg-black/20 transition-all duration-300"
            />
          </motion.div>

          <AnimatePresence>
            {rrppList.length > 0 && (
              <motion.div
                className="w-full flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {rrppList.map((email, i) => (
                  <motion.div
                    key={email}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <input
                      type="text"
                      readOnly
                      value={email}
                      className="flex-1 text-gray-300 rounded-lg px-4 py-2 border focus:outline-none border-[#3BAFBB] bg-gradient-to-r from-[#3BAFBB]/10 via-cyan-400/5 to-[#3BAFBB]/10 cursor-default shadow-inner"
                    />
                    <motion.button
                      onClick={() => handleRemoveEmail(i)}
                      className="cursor-pointer bg-[#3baebb32] hover:bg-[#3baebb32]/20 px-3 py-2 rounded-lg text-white transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,175,187,0.4)] border border-[#3BAFBB]/30 hover:scale-105"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Minus size={16} />
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

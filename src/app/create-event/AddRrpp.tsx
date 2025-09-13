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
      className="bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 border border-pink-500/30 max-w-[1400px] rounded-xl p-8 mx-auto mt-8 backdrop-blur-sm relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-cyan-400/5 pointer-events-none"></div>
      <div className="relative z-10">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <User
              className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
              size={24}
            />
            <span className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-xl font-bold relative">
              RRPP
              {/* Neon glow effect */}
              <div className="absolute inset-0 text-pink-500 blur-sm opacity-30">
                RRPP
              </div>
            </span>
          </div>
          <motion.button
            onClick={handleAddEmail}
            disabled={!isValidEmail(rrppEmail)}
            className={`cursor-pointer flex items-center gap-2 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm ${
              isValidEmail(rrppEmail)
                ? 'bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-400/40 hover:from-pink-500/60 hover:via-purple-500/60 hover:to-cyan-400/60 hover:border-cyan-400 border border-pink-500/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] relative overflow-hidden'
                : 'bg-gray-500/20 cursor-not-allowed border border-gray-500/30'
            }`}
            whileHover={isValidEmail(rrppEmail) ? { scale: 1.02 } : {}}
            whileTap={isValidEmail(rrppEmail) ? { scale: 0.98 } : {}}
          >
            <Plus
              size={18}
              className="drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"
            />
            <span className="relative z-10">Add RRPP</span>
            {/* Button glow effect */}
            {isValidEmail(rrppEmail) && (
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
            )}
          </motion.button>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div
            className="flex flex-col w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <label className="text-cyan-300 text-sm mb-1 font-medium drop-shadow-sm">
              RRPP Email
            </label>
            <input
              type="text"
              value={rrppEmail}
              onChange={e => setRrppEmail(e.target.value)}
              placeholder="Enter RRPP email"
              className="text-cyan-300 placeholder-gray-400 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-black/20 backdrop-blur-sm transition-all duration-300"
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
                      className="flex-1 text-cyan-300 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none bg-gradient-to-r from-pink-500/10 via-purple-500/5 to-cyan-400/10 cursor-default backdrop-blur-sm"
                    />
                    <motion.button
                      onClick={() => handleRemoveEmail(i)}
                      className="cursor-pointer bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 px-3 py-2 rounded-lg text-cyan-300 backdrop-blur-sm border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Minus
                        size={16}
                        className="drop-shadow-[0_0_4px_rgba(6,182,212,0.2)]"
                      />
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

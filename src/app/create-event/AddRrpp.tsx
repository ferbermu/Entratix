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
      className="bg-[#3BAFBB1A] max-w-[1400px] rounded-xl p-8 mx-auto mt-8 border border-[#3BAFBB]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <User className="text-[#3BAFBB]" size={24} />
          <span className="text-gray-300 text-xl font-bold">RRPP</span>
        </div>
        <motion.button
          onClick={handleAddEmail}
          disabled={!isValidEmail(rrppEmail)}
          className={`cursor-pointer flex items-center gap-2 text-white font-semibold px-5 py-2 rounded-lg transition-all ${
            isValidEmail(rrppEmail)
              ? 'bg-[#3BAFBB] hover:bg-[#2A8C99]'
              : 'bg-gray-400 cursor-not-allowed'
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
          <label className="text-gray-300 text-sm mb-1">RRPP Email</label>
          <input
            type="text"
            value={rrppEmail}
            onChange={e => setRrppEmail(e.target.value)}
            placeholder="Enter RRPP email"
            className="text-gray-300 rounded-lg px-4 py-2 border border-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB]"
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
                    className="flex-1 text-gray-300 rounded-lg px-4 py-2 border focus:outline-none border-[#3BAFBB] bg-[#3BAFBB1A] cursor-default"
                  />
                  <motion.button
                    onClick={() => handleRemoveEmail(i)}
                    className="cursor-pointer bg-[#3baebb32] hover:bg-[#3baebb32]/20 px-3 py-2 rounded-lg text-white"
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
    </motion.div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

interface TicketAdquiredProps {
  selected: string;
  onSelect: (status: string) => void;
}

export const TicketAdquired: React.FC<TicketAdquiredProps> = ({
  selected,
  onSelect,
}) => {
  const options = [
    { label: 'Active', value: 'Active' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Expired', value: 'Expired' },
    { label: 'All', value: 'All' },
  ];

  const selectedIndex = options.findIndex(opt => opt.value === selected);

  return (
    <div className="flex items-center w-full h-full justify-between bg-gradient-to-r from-pink-500/10 via-purple-900/20 to-cyan-400/10 border border-pink-500/30 rounded-lg text-lg max-[1075px]:text-md max-[700px]:text-xs overflow-hidden backdrop-blur-sm relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-cyan-400/5 pointer-events-none"></div>

      {/* Animated background indicator */}
      <motion.div
        className="absolute inset-y-0 bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-400/40 backdrop-blur-sm rounded-lg"
        initial={false}
        animate={{
          x: `${selectedIndex * 100}%`,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        style={{
          width: `${100 / options.length}%`,
        }}
      />

      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-y-0 flex items-center justify-center text-pink-500 blur-sm opacity-30 pointer-events-none"
        initial={false}
        animate={{
          x: `${selectedIndex * 100}%`,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        style={{
          width: `${100 / options.length}%`,
        }}
      >
        {options[selectedIndex]?.label}
      </motion.div>

      {options.map((opt, index) => (
        <motion.button
          key={opt.value}
          className={`w-full h-full py-4 cursor-pointer relative z-10 transition-colors duration-300
            ${index === 0 ? 'rounded-l-lg' : ''}
            ${index === options.length - 1 ? 'rounded-r-lg' : ''}
            hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-purple-500/10 hover:to-cyan-400/10`}
          onClick={() => onSelect(opt.value)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span
            className={`transition-all duration-300 ${
              selected === opt.value ? 'text-white font-bold' : 'text-cyan-300'
            }`}
            animate={{
              color: selected === opt.value ? '#ffffff' : '#67e8f9',
            }}
          >
            {opt.label}
          </motion.span>
        </motion.button>
      ))}
    </div>
  );
};

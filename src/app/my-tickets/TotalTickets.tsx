import React from 'react';

interface TotalTicketsProps {
  totalSpent?: number;
  totalEvents?: number;
  totalTickets?: number;
}

export const TotalTickets: React.FC<TotalTicketsProps> = ({
  totalSpent = 0,
  totalEvents = 0,
  totalTickets = 0,
}) => {
  return (
    <div className="col-span-2 bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 border border-pink-500/30 rounded-xl w-full mb-16 backdrop-blur-sm relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-cyan-400/5 pointer-events-none"></div>

      <div className="px-8 py-4 border-b border-pink-500/30 relative z-10">
        <div className="text-lg font-semibold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-center relative">
          Your Event Stats
          {/* Neon glow effect */}
          <div className="absolute inset-0 text-pink-500 blur-sm opacity-30">
            Your Event Stats
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-8 py-8 text-center gap-2 relative z-10">
        <div className="flex-1">
          <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text relative">
            {totalEvents}
            <div className="absolute inset-0 text-purple-400 blur-sm opacity-40">
              {totalEvents}
            </div>
          </div>
          <div className="text-cyan-300 mt-2 max-[700px]:text-xs relative">
            Total Events
            <div className="absolute inset-0 text-pink-500/20 blur-sm">
              Total Events
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text relative">
            {totalTickets}
            <div className="absolute inset-0 text-cyan-400 blur-sm opacity-40">
              {totalTickets}
            </div>
          </div>
          <div className="text-cyan-300 mt-2 max-[700px]:text-xs relative">
            Total Tickets
            <div className="absolute inset-0 text-pink-500/20 blur-sm">
              Total Tickets
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text relative">
            ${totalSpent.toFixed(2)}
            <div className="absolute inset-0 text-pink-500 blur-sm opacity-40">
              ${totalSpent.toFixed(2)}
            </div>
          </div>
          <div className="text-cyan-300 mt-2 max-[700px]:text-xs relative">
            Total Spent
            <div className="absolute inset-0 text-pink-500/20 blur-sm">
              Total Spent
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

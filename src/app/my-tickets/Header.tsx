import React from 'react';

export const Header = () => {
  return (
    <div className="flex flex-col py-20">
      <h1 className="text-3xl font-condensed font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text py-5 relative">
        My Tickets
        {/* Neon glow effect */}
        <div className="absolute inset-0 text-pink-500 blur-sm opacity-40">
          My Tickets
        </div>
      </h1>
      <div className="text-cyan-300 relative">
        <p>Manage your event tickets and view your purchase history.</p>
        {/* Subtle glow effect for description */}
        <div className="absolute inset-0 text-pink-500/30 blur-sm">
          Manage your event tickets and view your purchase history.
        </div>
      </div>
    </div>
  );
};

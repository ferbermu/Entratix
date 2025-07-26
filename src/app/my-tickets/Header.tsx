import React from 'react';

export const Header = () => {
  return (
    <div className="flex flex-col py-20 ">
      <h1 className="text-white text-2xl font-bold py-5">My Tickets</h1>
      <p className="text-gray-400">
        Manage your event tickets and view your purchase history.
      </p>
    </div>
  );
};

import React, { useState } from 'react';
import { Plus, Minus, User } from '@phosphor-icons/react';

export const AddRrpp = () => {
  const [rrppEmail, setRrppEmail] = useState('');
  const [rrppList, setRrppList] = useState<string[]>([]);

  const isValidEmail = (email: string) => {
    return email.includes('@') && email.includes('.com');
  };

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
    <div className="bg-[#3BAFBB1A] max-w-[1400px] rounded-xl p-8 mx-auto mt-8 border border-[#3BAFBB]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <User className="text-[#3BAFBB]" size={24} />
          <span className="text-gray-300 text-xl font-bold">RRPP</span>
        </div>
        <button
          onClick={handleAddEmail}
          disabled={!isValidEmail(rrppEmail)}
          className={`cursor-pointer flex items-center gap-2 text-white font-semibold px-5 py-2 rounded-lg transition-all ${
            isValidEmail(rrppEmail)
              ? 'bg-[#3BAFBB] hover:bg-[#2A8C99]'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          <Plus size={18} />
          Add RRPP
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col w-full">
          <label className="text-gray-300 text-sm mb-1">RRPP Email</label>
          <input
            type="text"
            value={rrppEmail}
            onChange={e => setRrppEmail(e.target.value)}
            placeholder="Enter RRPP email"
            className="text-gray-300 rounded-lg px-4 py-2 border border-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB]"
          />
        </div>

        {rrppList.length > 0 && (
          <div className="w-full flex flex-col gap-4">
            {rrppList.map((email, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={email}
                  className="flex-1 text-gray-300 rounded-lg px-4 py-2 border  focus:outline-none border-[#3BAFBB] bg-[#3BAFBB1A] cursor-default"
                />
                <button
                  onClick={() => handleRemoveEmail(i)}
                  className="cursor-pointer bg-[#3baebb32] hover:bg-[#3baebb32]/20 px-3 py-2 rounded-lg text-white"
                >
                  <Minus size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

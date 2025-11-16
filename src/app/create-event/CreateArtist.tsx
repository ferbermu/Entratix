import React from 'react';
import { Plus, Minus, User } from '@phosphor-icons/react';
import { useEventForm } from './hooks/useEventForm';

export const CreateArtist = () => {
  const { eventForm, addArtist, updateArtist, removeArtist } = useEventForm();

  const handleAddArtist = () => {
    addArtist({
      name: '',
      photoUrl: '',
    });
  };

  const handleRemoveArtist = (indexToRemove: number) => {
    if (eventForm.artists.length === 1) return;
    removeArtist(indexToRemove);
  };

  const handleArtistChange = (
    index: number,
    field: keyof typeof eventForm.artists[0],
    value: string
  ) => {
    const artist = eventForm.artists[index];
    updateArtist(index, {
      ...artist,
      [field]: value,
    });
  };

  return (
    <div className="bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 border border-pink-500/30 max-w-[1400px] rounded-xl p-8 mx-auto mt-8 backdrop-blur-sm relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-cyan-400/5 pointer-events-none"></div>

      <div className="flex items-center justify-between mb-16 relative z-10">
        <div className="flex items-center gap-2">
          <User
            className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
            size={24}
          />
          <span className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-xl font-bold relative">
            Artist & Performers
            {/* Neon glow effect */}
            <div className="absolute inset-0 text-pink-500 blur-sm opacity-30">
              Artist & Performers
            </div>
          </span>
        </div>
        <button
          onClick={handleAddArtist}
          className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-400/40 hover:from-pink-500/60 hover:via-purple-500/60 hover:to-cyan-400/60 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm border border-pink-500/20 hover:border-cyan-400 relative overflow-hidden"
        >
          <Plus
            size={18}
            className="drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"
          />
          <span className="relative z-10">Add Artist</span>
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
        </button>
      </div>

      <div className="flex flex-col gap-14 relative z-10">
        {eventForm.artists.map((artist, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-pink-500/5 via-purple-900/10 to-cyan-400/5 relative rounded-xl p-4 flex flex-col gap-4 backdrop-blur-sm border border-pink-500/20"
          >
            {eventForm.artists.length > 1 && (
              <div className="absolute right-0 -top-10">
                <button
                  onClick={() => handleRemoveArtist(index)}
                  className="cursor-pointer mb-2 text-cyan-300 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1 backdrop-blur-sm border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
                >
                  <Minus
                    size={16}
                    className="drop-shadow-[0_0_4px_rgba(6,182,212,0.2)]"
                  />
                  Remove
                </button>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex flex-col w-full">
                <label className="text-cyan-300 text-sm mb-1">
                  Artist Name
                </label>
                <input
                  type="text"
                  value={artist.name}
                  onChange={(e) => handleArtistChange(index, 'name', e.target.value)}
                  placeholder="Enter artist name"
                  className="bg-black/20 text-cyan-300 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-cyan-300 text-sm mb-1">Photo URL</label>
                <input
                  type="text"
                  value={artist.photoUrl}
                  onChange={(e) => handleArtistChange(index, 'photoUrl', e.target.value)}
                  placeholder="Enter photo URL"
                  className="bg-black/20 text-cyan-300 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

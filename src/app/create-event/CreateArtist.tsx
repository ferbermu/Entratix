import React, { useState } from 'react';
import { Plus, Minus, User } from '@phosphor-icons/react';

export const CreateArtist = () => {
  const [artists, setArtists] = useState([
    { name: '', photoUrl: '', description: '', socialLinks: [''] },
  ]);

  const handleAddArtist = () => {
    setArtists([
      ...artists,
      { name: '', photoUrl: '', description: '', socialLinks: [''] },
    ]);
  };

  const handleRemoveArtist = (indexToRemove: number) => {
    if (artists.length === 1) return;
    setArtists(artists.filter((_, index) => index !== indexToRemove));
  };

  const handleAddSocialLink = (artistIndex: number) => {
    setArtists(prevArtists =>
      prevArtists.map((artist, idx) => {
        if (idx === artistIndex && artist.socialLinks.length < 3) {
          return {
            ...artist,
            socialLinks: [...artist.socialLinks, ''],
          };
        }
        return artist;
      })
    );
  };

  const handleRemoveSocialLink = (artistIndex: number, linkIndex: number) => {
    setArtists(prevArtists =>
      prevArtists.map((artist, idx) => {
        if (idx === artistIndex) {
          return {
            ...artist,
            socialLinks: artist.socialLinks.filter((_, i) => i !== linkIndex),
          };
        }
        return artist;
      })
    );
  };

  const handleSocialLinkChange = (
    artistIndex: number,
    linkIndex: number,
    value: string
  ) => {
    setArtists(prevArtists =>
      prevArtists.map((artist, idx) => {
        if (idx === artistIndex) {
          const updatedLinks = [...artist.socialLinks];
          updatedLinks[linkIndex] = value;
          return { ...artist, socialLinks: updatedLinks };
        }
        return artist;
      })
    );
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
        {artists.map((artist, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-pink-500/5 via-purple-900/10 to-cyan-400/5 relative rounded-xl p-4 flex flex-col gap-4 backdrop-blur-sm border border-pink-500/20"
          >
            {artists.length > 1 && (
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
                  placeholder="Enter artist name"
                  className="bg-black/20 text-cyan-300 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-cyan-300 text-sm mb-1">Photo URL</label>
                <input
                  type="text"
                  placeholder="Enter photo URL"
                  className="bg-black/20 text-cyan-300 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-cyan-300 text-sm mb-1">
                  Description
                </label>
                <textarea
                  className="bg-black/20 border border-pink-500/30 rounded-lg w-full min-h-[180px] p-4 text-cyan-300 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300 resize-none"
                  placeholder="Brief description of the artist..."
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center justify-between">
                <label className="text-cyan-300 text-sm">
                  Social Links (Max 3)
                </label>
                <button
                  onClick={() => handleAddSocialLink(index)}
                  disabled={artist.socialLinks.length >= 3}
                  className={`cursor-pointer flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded-lg transition-all duration-300 ${
                    artist.socialLinks.length >= 3
                      ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed backdrop-blur-sm border border-gray-500/30'
                      : 'bg-gradient-to-r from-cyan-400/60 to-cyan-500/60 hover:from-cyan-400/80 hover:to-cyan-500/80 text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] backdrop-blur-sm border border-cyan-400/50'
                  }`}
                >
                  <Plus
                    size={14}
                    className="drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"
                  />
                  Add Link
                </button>
              </div>

              <div className="w-full flex flex-col gap-4">
                {artist.socialLinks.map((link, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Social link #${i + 1}`}
                      value={link}
                      onChange={e =>
                        handleSocialLinkChange(index, i, e.target.value)
                      }
                      className="flex-1 bg-black/20 text-cyan-300 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
                    />
                    <button
                      onClick={() => handleRemoveSocialLink(index, i)}
                      className="cursor-pointer bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 px-3 py-2 rounded-lg text-cyan-300 backdrop-blur-sm border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
                    >
                      <Minus
                        size={16}
                        className="drop-shadow-[0_0_4px_rgba(6,182,212,0.2)]"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

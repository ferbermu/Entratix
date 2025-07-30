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
    <div className="bg-[#3BAFBB1A] max-w-[1400px] rounded-xl p-8 mx-auto mt-8 border border-[#3BAFBB]">
      <div className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-2">
          <User className="text-[#3BAFBB]" size={24} />
          <span className="text-gray-300 text-xl font-bold">
            Artist & Performers
          </span>
        </div>
        <button
          onClick={handleAddArtist}
          className="cursor-pointer flex items-center gap-2 bg-[#3BAFBB] hover:bg-[#2A8C99] text-white font-semibold px-5 py-2 rounded-lg transition-all"
        >
          <Plus size={18} />
          Add Artist
        </button>
      </div>

      <div className="flex flex-col gap-14">
        {artists.map((artist, index) => (
          <div
            key={index}
            className="bg-[#3BAFBB]/5 relative rounded-xl p-4 flex flex-col gap-4"
          >
            {artists.length > 1 && (
              <div className="absolute right-0 -top-10">
                <button
                  onClick={() => handleRemoveArtist(index)}
                  className="cursor-pointer mb-2 text-white bg-[#3baebb32] hover:bg-[#3baebb32]/20 px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                >
                  <Minus size={16} />
                  Remove
                </button>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex flex-col w-full">
                <label className="text-gray-300 text-sm mb-1">
                  Artist Name
                </label>
                <input
                  type="text"
                  placeholder="Enter artist name"
                  className="text-gray-300 rounded-lg px-4 py-2 border border-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB]"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-gray-300 text-sm mb-1">Photo URL</label>
                <input
                  type="text"
                  placeholder="Enter photo URL"
                  className="text-gray-300 rounded-lg px-4 py-2 border border-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB]"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-gray-300 text-sm mb-1">
                  Description
                </label>
                <textarea
                  className="border border-[#3BAFBB] rounded-lg w-full min-h-[180px] p-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] resize-none"
                  placeholder="Brief description of the artist..."
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center justify-between">
                <label className="text-gray-300 text-sm">
                  Social Links (Max 3)
                </label>
                <button
                  onClick={() => handleAddSocialLink(index)}
                  disabled={artist.socialLinks.length >= 3}
                  className={`cursor-pointer flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded-lg ${
                    artist.socialLinks.length >= 3
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : 'bg-[#3BAFBB] text-white hover:bg-[#2A8C99]'
                  }`}
                >
                  <Plus size={14} />
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
                      className="flex-1 text-gray-300 rounded-lg px-4 py-2 border border-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB]"
                    />
                    <button
                      onClick={() => handleRemoveSocialLink(index, i)}
                      className="cursor-pointer bg-[#3baebb32] hover:bg-[#3baebb32]/20 px-3 py-2 rounded-lg text-white"
                    >
                      <Minus size={16} />
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

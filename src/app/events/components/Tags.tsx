import React from 'react';

interface TagsProps {
  tags: string[];
}

export const Tags = ({ tags }: TagsProps) => {
  return (
    <div className="flex flex-col gap-4 w-full bg-gradient-to-br from-gray-900/60 via-black/50 to-gray-800/60 backdrop-blur-md border border-gray-600/40 rounded-lg p-4 shadow-2xl hover:shadow-[0_0_20px_rgba(255,20,147,0.15)] transition-all duration-300">
      <h3 className="text-2xl text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text font-condensed font-bold drop-shadow-[0_0_10px_rgba(255,20,147,0.6)]">
        Tags
      </h3>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gradient-to-r from-gray-800/40 via-gray-900/50 to-gray-700/40 backdrop-blur-sm text-gray-300 px-4 py-2 rounded-lg text-sm border border-gray-600/30 hover:border-pink-500/50 hover:from-gray-800/60 hover:via-gray-900/70 hover:to-gray-700/60 hover:text-cyan-300 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,20,147,0.2)] cursor-pointer transform hover:scale-105"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

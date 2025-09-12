import React, { useState } from 'react';
import { Tag, X } from '@phosphor-icons/react';

export const EventTags = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags([...tags, trimmed]);
    setInputValue('');
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 border border-pink-500/30 max-w-[1400px] rounded-xl p-8 mx-auto mt-8 backdrop-blur-sm relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-cyan-400/5 pointer-events-none"></div>

      <div className="flex items-center gap-2 mb-6 relative z-10">
        <Tag
          className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
          size={24}
        />
        <span className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-xl font-bold relative">
          Event Tags
          {/* Neon glow effect */}
          <div className="absolute inset-0 text-pink-500 blur-sm opacity-30">
            Event Tags
          </div>
        </span>
      </div>

      {/* Tags visualizadas */}
      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20 hover:from-pink-500/30 hover:via-purple-500/30 hover:to-cyan-400/30 text-cyan-300 px-3 py-1 rounded-full flex items-center gap-2 max-w-[260px] md:max-w-[360px] lg:max-w-[420px] backdrop-blur-sm border border-pink-500/20 hover:border-cyan-400/40 transition-all duration-300 relative"
          >
            <span className="text-sm truncate min-w-0" title={tag}>
              {tag}
            </span>
            <button
              onClick={() => removeTag(index)}
              className="hover:text-pink-400 transition-colors cursor-pointer flex-shrink-0 drop-shadow-[0_0_4px_rgba(6,182,212,0.2)]"
            >
              <X size={14} />
            </button>
            {/* Tag glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-400/5 blur-xl opacity-20 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Input + Add */}
      <div className="flex relative z-10">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add tags (e.g., melodic techno, underground, warehouse)"
          className="flex-1 bg-black/20 text-cyan-300 placeholder-gray-400 rounded-l-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
        />
        <button
          onClick={addTag}
          className="cursor-pointer bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-400/40 hover:from-pink-500/60 hover:via-purple-500/60 hover:to-cyan-400/60 px-5 py-2 text-white rounded-r-lg transition-all duration-300 font-semibold backdrop-blur-sm border border-pink-500/20 hover:border-cyan-400 border-l-0 relative overflow-hidden"
        >
          <span className="relative z-10">Add</span>
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
        </button>
      </div>
    </div>
  );
};

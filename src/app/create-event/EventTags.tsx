import React, { useEffect, useState } from 'react';
import { Tag, X } from '@phosphor-icons/react';

interface EventTagsProps {
  tags?: string[];
  onUpdate?: (tags: string[]) => void;
}

export const EventTags: React.FC<EventTagsProps> = ({
  tags: externalTags = [],
  onUpdate,
}) => {
  const [tags, setTags] = useState<string[]>(externalTags);
  const [inputValue, setInputValue] = useState('');

  // Sync with external tags
  useEffect(() => {
    setTags(externalTags);
  }, [externalTags]);

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    const newTags = [...tags, trimmed];
    setTags(newTags);
    setInputValue('');
    onUpdate?.(newTags);
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onUpdate?.(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="bg-[#3BAFBB1A] max-w-[1400px] rounded-xl p-8 mx-auto mt-8 border border-[#3BAFBB]">
      <div className="flex items-center gap-2 mb-6">
        <Tag className="text-[#3BAFBB]" size={24} />
        <span className="text-gray-300 text-xl font-bold">Event Tags</span>
      </div>

      {/* Tags visualizadas */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-[#3baebb32] hover:bg-[#3baebb32]/20 text-white px-3 py-1 rounded-full flex items-center gap-2 max-w-[260px] md:max-w-[360px] lg:max-w-[420px]"
          >
            <span className="text-sm truncate min-w-0" title={tag}>
              {tag}
            </span>
            <button
              onClick={() => removeTag(index)}
              className="hover:text-gray-200 transition cursor-pointer flex-shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Input + Add */}
      <div className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add tags (e.g., melodic techno, underground, warehouse)"
          className="flex-1 bg-transparent text-white placeholder-gray-400 rounded-l-lg px-4 py-2 border border-[#3BAFBB] focus:outline-none "
        />
        <button
          onClick={addTag}
          className="bg-[#3BAFBB] cursor-pointer hover:bg-[#2A8C99] px-5 py-2 text-white rounded-r-lg transition-all font-semibold"
        >
          Add
        </button>
      </div>
    </div>
  );
};

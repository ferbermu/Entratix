import React from 'react';

interface TagsProps {
  tags: string[];
}

export const Tags = ({ tags }: TagsProps) => {
  return (
    <div className="flex flex-col p-6 gap-4">
      <h3 className="text-xl text-[#53C6A8] font-semibold">Tags</h3>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-[#FFFFFF0D] text-[#FFFFFF]/60  px-4 py-2 rounded-lg text-sm "
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

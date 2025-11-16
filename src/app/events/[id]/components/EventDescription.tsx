import React, { useState } from 'react';

interface EventDescriptionProps {
  title: string;
  description: string;
}

export const EventDescription: React.FC<EventDescriptionProps> = ({
  title,
  description,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-4 text-white bg-gradient-to-br from-gray-900/65 via-black/55 to-gray-800/65 backdrop-blur-md rounded-lg p-6 border border-gray-600/40 shadow-2xl hover:shadow-[0_0_20px_rgba(255,20,147,0.15)] transition-all duration-300">
      <h1 className="text-start text-4xl font-condensed font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text drop-shadow-[0_0_15px_rgba(255,20,147,0.6)]">
        {title}
      </h1>

      <div>
        <p
          className={`
          text-start text-md text-gray-300
          transition-all duration-200 opacity-90 
          ${!expanded ? 'line-clamp-3' : ''}
        `}
        >
          {description}
        </p>
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="underline cursor-pointer w-full text-end text-cyan-400 hover:text-pink-500 transition-colors duration-300 font-condensed drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] hover:drop-shadow-[0_0_8px_rgba(255,20,147,0.6)]"
        >
          {expanded ? 'Leer menos' : 'Leer más'}
        </button>
      </div>
    </div>
  );
};


import React, { useState } from 'react';

export interface EventDescriptionProps {
  title: string;
  description: string;
}

export const EventDescription = ({
  title,
  description,
}: EventDescriptionProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-4 text-white">
      <h1 className="text-start text-3xl font-medium">{title}</h1>

      {/* El párrafo: tiene line-clamp-3 si NO está expandido */}
      <div className="   ">
        {' '}
        <p
          className={`
          text-start text-md
          transition-all duration-200 opacity-75 
          ${!expanded ? 'line-clamp-3' : ''}
        `}
        >
          {description}
        </p>
        <button
          onClick={() => setExpanded(prev => !prev)}
          className=" underline cursor-pointer  w-full text-end text-[#3BAFBB]"
        >
          {expanded ? 'Leer menos' : 'Leer más'}
        </button>
      </div>
    </div>
  );
};

'use client';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[500px] w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 450"
        role="img"
        aria-label="Loading… synthwave"
        className="w-[600px] h-[400px] max-w-[90vw] max-h-[60vh]"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="sunGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff3fd1" />
            <stop offset="55%" stopColor="#9d4bff" />
            <stop offset="100%" stopColor="#00eaff" />
          </linearGradient>

          {/* Sun stripes mask */}
          <mask id="stripes">
            <rect width="100%" height="100%" fill="white" />
            <g fill="black">
              <rect x="0" y="180" width="800" height="10" />
              <rect x="0" y="205" width="800" height="12" />
              <rect x="0" y="235" width="800" height="14" />
              <rect x="0" y="270" width="800" height="16" />
              <rect x="0" y="310" width="800" height="18" />
            </g>
          </mask>
        </defs>

        <style>
          {`
            :root { --t: 3.2s; }
            @keyframes pulse {
              0%,100% { filter: drop-shadow(0 0 0px #ff52ff); transform: translateY(0) scale(1); }
              50% { filter: drop-shadow(0 0 16px #ff52ff); transform: translateY(-2px) scale(1.02); }
            }
            @keyframes twinkle { 0%,100%{opacity:.2} 50%{opacity:1} }
            @keyframes scan { 0%{stroke-dashoffset:0} 100%{stroke-dashoffset:-800} }
            @keyframes glowline { 0%,100%{opacity:.35} 50%{opacity:.8} }

            @media (prefers-reduced-motion: reduce) {
              #sun, .star, .grid-line, #scan { animation: none !important; }
            }
          `}
        </style>

        {/* Stars */}
        <g id="stars" fill="#b9a8ff">
          <circle className="star" cx="90" cy="60" r="1.6">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle className="star" cx="160" cy="120" r="1.6">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="3.1s"
              repeatCount="indefinite"
            />
          </circle>
          <circle className="star" cx="260" cy="40" r="1.6">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle className="star" cx="650" cy="130" r="1.6">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Sun */}
        <g
          id="sun"
          style={{ animation: 'pulse var(--t) ease-in-out infinite' }}
        >
          <circle
            cx="400"
            cy="300"
            r="115"
            fill="url(#sunGrad)"
            mask="url(#stripes)"
          />
        </g>

        {/* Grid - HIDDEN */}

        <g
          fontFamily="var(--font-roboto-condensed), system-ui, sans-serif"
          fontSize="18"
          fill="#b7b1ff"
          textAnchor="middle"
        ></g>
      </svg>
    </div>
  );
};

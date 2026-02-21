const AppLogo = () => {
  return (
    <div className="w-15 sm:w-55 overflow-hidden">
      <svg
        height="60"
        viewBox="0 0 420 120"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <linearGradient id="snapGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#8B5CF6" />
            <stop offset="100%" stop-color="#06B6D4" />
          </linearGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x="10"
          y="20"
          rx="18"
          ry="18"
          width="80"
          height="80"
          fill="url(#snapGradient)"
        />

        <circle cx="10" cy="60" r="12" fill="white" />
        <circle cx="90" cy="60" r="12" fill="white" />

        <path
          d="M48 35 L35 65 H50 L42 95 L70 55 H55 L65 35 Z"
          fill="white"
          filter="url(#glow)"
        />

        <text
          x="115"
          y="72"
          font-family="Poppins, Arial, sans-serif"
          font-size="48"
          font-weight="600"
          fill="#E5E7EB"
          className="hidden sm:block"
        >
          Event
        </text>

        <text
          x="245"
          y="72"
          font-family="Poppins, Arial, sans-serif"
          font-size="48"
          font-weight="700"
          fill="url(#snapGradient)"
          className="hidden sm:block"
        >
          Snap
        </text>
      </svg>
    </div>
  );
};

export default AppLogo;

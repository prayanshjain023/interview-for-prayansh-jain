import React from "react"
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="relative w-16 h-16">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-4 bg-gray-400 rounded-full"
          style={{
            top: "6px",
            left: "50%",
            transformOrigin: "50% 26px",
            transform: `translateX(-50%) rotate(${i * 30}deg)`,
            opacity: 1 - i * 0.08,
          }}
        />
      ))}
      <div className="absolute inset-0 animate-spin">
        {[...Array(12)].map((_, i) => (
          <div
            key={`spin-${i}`}
            className="absolute w-1.5 h-4 bg-gray-600 rounded-full"
            style={{
              top: "6px",
              left: "50%",
              transformOrigin: "50% 26px",
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
              opacity: i === 0 ? 1 : 0,
            }}
          />
        ))}
      </div>
    </div>
  </div>
)

export default LoadingSpinner

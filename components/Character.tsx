
import React from 'react';

const Character: React.FC = () => {
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 100 100" 
      className="drop-shadow-lg"
    >
      {/* Body */}
      <circle cx="50" cy="60" r="30" fill="#4299E1" />
      {/* Eyes */}
      <circle cx="40" cy="55" r="5" fill="white" />
      <circle cx="60" cy="55" r="5" fill="white" />
      <circle cx="42" cy="56" r="2" fill="black" />
      <circle cx="62" cy="56" r="2" fill="black" />
      {/* Smile */}
      <path d="M 40 70 Q 50 80 60 70" stroke="white" strokeWidth="3" fill="none" />
      {/* Hat */}
      <polygon points="50,0 25,35 75,35" fill="#F56565" />
      <circle cx="50" cy="5" r="8" fill="white" />
    </svg>
  );
};

export default Character;

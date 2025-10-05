import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 text-center flex flex-col items-center gap-6 animate-fade-in">
      <h1 className="text-5xl md:text-7xl font-black text-blue-600 tracking-tighter">數學冒險任務</h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-md">
        回答數學問題，引導你的英雄踏上史詩般的旅程。你能走多遠？
      </p>
      <button 
        onClick={onStart} 
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold text-2xl py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        開始冒險！
      </button>
    </div>
  );
};

export default StartScreen;
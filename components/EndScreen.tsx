import React from 'react';

interface EndScreenProps {
  score: number;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 text-center flex flex-col items-center gap-4 animate-fade-in">
      <h2 className="text-6xl font-black text-red-500">遊戲結束！</h2>
      <p className="text-2xl text-gray-700">你的最終分數是：</p>
      <p className="text-8xl font-black text-blue-600 my-4">{score}</p>
      <button 
        onClick={onRestart}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold text-2xl py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        再玩一次
      </button>
    </div>
  );
};

export default EndScreen;
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Question, Operation } from '../types';
import Character from './Character';

interface GameProps {
  onEndGame: (score: number) => void;
}

const TOTAL_TIME = 60;
const PATH_LENGTH = 20;
const TIME_BONUS = 3; // seconds added for correct answer

const Game: React.FC<GameProps> = ({ onEndGame }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [playerPosition, setPlayerPosition] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; color: string } | null>(null);
  const answerInputRef = useRef<HTMLInputElement>(null);

  const generateQuestion = useCallback(() => {
    const operations = [Operation.Add, Operation.Subtract, Operation.Multiply, Operation.Divide];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1: number, num2: number, answer: number, text: string;

    const difficulty = Math.floor(score / 5);

    if (operation === Operation.Add) {
      num1 = Math.floor(Math.random() * (10 + difficulty * 5)) + 1;
      num2 = Math.floor(Math.random() * (10 + difficulty * 5)) + 1;
      answer = num1 + num2;
      text = `${num1} ${Operation.Add} ${num2}`;
    } else if (operation === Operation.Subtract) {
      num1 = Math.floor(Math.random() * (10 + difficulty * 5)) + 5;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
      text = `${num1} ${Operation.Subtract} ${num2}`;
    } else if (operation === Operation.Multiply) {
      num1 = Math.floor(Math.random() * (5 + difficulty)) + 2;
      num2 = Math.floor(Math.random() * (5 + difficulty)) + 2;
      answer = num1 * num2;
      text = `${num1} ${Operation.Multiply} ${num2}`;
    } else { // Division
      answer = Math.floor(Math.random() * (5 + difficulty)) + 2;
      num2 = Math.floor(Math.random() * (5 + difficulty)) + 2;
      num1 = answer * num2;
      text = `${num1} ${Operation.Divide} ${num2}`;
    }
    
    setCurrentQuestion({ text, answer });
  }, [score]);

  useEffect(() => {
    generateQuestion();
    answerInputRef.current?.focus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      onEndGame(score);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onEndGame, score]);

  const showFeedback = (message: string, color: string) => {
    setFeedback({ message, color });
    setTimeout(() => setFeedback(null), 1000);
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer || !currentQuestion) return;

    if (parseInt(userAnswer, 10) === currentQuestion.answer) {
      setScore(prev => prev + 1);
      setPlayerPosition(prev => prev + 1);
      setTimeLeft(prev => prev + TIME_BONUS);
      showFeedback('答對了！', 'text-green-500');
    } else {
      showFeedback('再試一次！', 'text-red-500');
    }
    setUserAnswer('');
    generateQuestion();
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 space-y-6">
      <div className="flex justify-between items-center text-2xl font-bold">
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">分數: {score}</div>
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg">時間: {timeLeft}秒</div>
      </div>

      <div className="relative h-16 bg-green-100 rounded-full flex items-center px-5">
        <div className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out" style={{ left: `calc(${(playerPosition % PATH_LENGTH) / (PATH_LENGTH - 1) * 100}% - 20px)` }}>
          <Character />
        </div>
        <div className="flex justify-between w-full">
          {Array.from({ length: PATH_LENGTH }).map((_, i) => (
            <div key={i} className={`w-4 h-4 rounded-full ${(playerPosition % PATH_LENGTH) >= i ? 'bg-yellow-400' : 'bg-green-300'}`}></div>
          ))}
        </div>
      </div>

      <div className="text-center space-y-4 pt-4">
        <p className="text-6xl font-black text-gray-700 tracking-wider tabular-nums">{currentQuestion?.text} = ?</p>
        <form onSubmit={handleAnswerSubmit} className="flex justify-center items-center gap-4">
          <input
            ref={answerInputRef}
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="text-4xl font-bold w-48 text-center border-4 border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none"
            autoFocus
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-2xl py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105">
            檢查
          </button>
        </form>
        {feedback && (
          <p className={`text-3xl font-bold transition-opacity duration-500 ${feedback ? 'opacity-100' : 'opacity-0'} ${feedback.color}`}>{feedback.message}</p>
        )}
      </div>
    </div>
  );
};

export default Game;
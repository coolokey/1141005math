
import React, { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import EndScreen from './components/EndScreen';
import { GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [finalScore, setFinalScore] = useState(0);

  const startGame = useCallback(() => {
    setGameState(GameState.Playing);
  }, []);

  const endGame = useCallback((score: number) => {
    setFinalScore(score);
    setGameState(GameState.GameOver);
  }, []);

  const restartGame = useCallback(() => {
    setGameState(GameState.Start);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Playing:
        return <Game onEndGame={endGame} />;
      case GameState.GameOver:
        return <EndScreen score={finalScore} onRestart={restartGame} />;
      case GameState.Start:
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 to-green-200 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;

import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState({
    date: '',
    description: '',
    players: {
      you: {
        name: '',
        faction: '',
        strategy: '',
        score: 0
      },
      opponent: {
        name: '',
        faction: '',
        strategy: '',
        score: 0
      }
    },
    mission: '',
    tactics: []
  });

  return (
    <GameContext.Provider value={[game, setGame]}>
      {children}
    </GameContext.Provider>
  );
};

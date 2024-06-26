import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import factions from '../data/factions.json';
import genericStrategies from '../data/genericStrategies.json';

const PlayerSetup = () => {
  const [game, setGame] = useContext(GameContext);
  const [you, setYou] = useState(game.players.you);
  const [opponent, setOpponent] = useState(game.players.opponent);

  const handlePlayerChange = (player, field, value) => {
    const updatedPlayer = { ...player, [field]: value };
    if (player === you) {
      setYou(updatedPlayer);
    } else {
      setOpponent(updatedPlayer);
    }
  };

  const getStrategies = (factionName) => {
    const faction = factions.find(f => f.name === factionName);
    if (faction) {
      return [...genericStrategies, ...faction.strategies];
    }
    return genericStrategies;
  };

  useEffect(() => {
    setGame({
      ...game,
      players: {
        you,
        opponent,
      },
    });
  }, [you, opponent]);

  return (
    <div className="player-setup">
      <h1>Player Setup</h1>
      <div className="player-section">
        <h2>You</h2>
        <div className="input-group">
          <label>Your Name</label>
          <input
            type="text"
            value={you.name}
            onChange={(e) => handlePlayerChange(you, 'name', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Faction</label>
          <select
            value={you.faction}
            onChange={(e) => handlePlayerChange(you, 'faction', e.target.value)}
          >
            {factions.map((faction) => (
              <option key={faction.name} value={faction.name}>
                {faction.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Grand Strategy</label>
          <select
            value={you.strategy}
            onChange={(e) => handlePlayerChange(you, 'strategy', e.target.value)}
          >
            {getStrategies(you.faction).map(strategy => (
              <option key={strategy} value={strategy}>{strategy}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="player-section">
        <h2>Opponent</h2>
        <div className="input-group">
          <label>Opponent's Name</label>
          <input
            type="text"
            value={opponent.name}
            onChange={(e) => handlePlayerChange(opponent, 'name', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Faction</label>
          <select
            value={opponent.faction}
            onChange={(e) => handlePlayerChange(opponent, 'faction', e.target.value)}
          >
            {factions.map((faction) => (
              <option key={faction.name} value={faction.name}>
                {faction.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Grand Strategy</label>
          <select
            value={opponent.strategy}
            onChange={(e) => handlePlayerChange(opponent, 'strategy', e.target.value)}
          >
            {getStrategies(opponent.faction).map(strategy => (
              <option key={strategy} value={strategy}>{strategy}</option>
            ))}
          </select>
        </div>
      </div>
      <Link to="/mission-setup" className="button">
        Next: Mission Setup
      </Link>
    </div>
  );
};

export default PlayerSetup;

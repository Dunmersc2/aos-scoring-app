import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import missions from '../data/missions.json';

const MissionSetup = () => {
  const [game, setGame] = useContext(GameContext);

  const handleMissionChange = (e) => {
    setGame({ ...game, mission: e.target.value });
  };

  return (
    <div className="mission-setup">
      <h1>Mission Setup</h1>
      <div className="input-group">
        <label>Select Mission</label>
        <select value={game.mission} onChange={handleMissionChange}>
          {missions.map((mission) => (
            <option key={mission.id} value={mission.name}>
              {mission.name}
            </option>
          ))}
        </select>
      </div>
      <Link to="/scoring" className="button">
        Next: Scoring
      </Link>
    </div>
  );
};

export default MissionSetup;

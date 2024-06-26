import React, { useState, useContext, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import tactics from '../data/tactics.json';

const ScoringScreen = () => {
  const [game, setGame] = useContext(GameContext);
  const [shaneScore, setShaneScore] = useState(game.players.you.score);
  const [opponentScore, setOpponentScore] = useState(game.players.opponent.score);
  const [rounds, setRounds] = useState(
    Array(5).fill().map(() => ({ you: 0, opponent: 0, tactic: { you: '', opponent: '' }, tacticAchieved: { you: false, opponent: false } }))
  );

  const handleScoreChange = (player, roundIndex, value) => {
    const updatedRounds = rounds.map((round, index) => 
      index === roundIndex ? { ...round, [player]: value } : round
    );
    setRounds(updatedRounds);
    if (player === 'you') {
      setShaneScore(updatedRounds.reduce((acc, round) => acc + round.you, 0));
    } else {
      setOpponentScore(updatedRounds.reduce((acc, round) => acc + round.opponent, 0));
    }
  };

  const handleTacticChange = (player, roundIndex, value) => {
    const updatedRounds = rounds.map((round, index) => 
      index === roundIndex ? { ...round, tactic: { ...round.tactic, [player]: value }, tacticAchieved: { ...round.tacticAchieved, [player]: false } } : round
    );
    setRounds(updatedRounds);
  };

  const handleTacticResultToggle = (player, roundIndex) => {
    const tacticAchieved = !rounds[roundIndex].tacticAchieved[player];
    const updatedRounds = rounds.map((round, index) => 
      index === roundIndex ? { ...round, tacticAchieved: { ...round.tacticAchieved, [player]: tacticAchieved }, [player]: round[player] + (tacticAchieved ? 2 : -2) } : round
    );
    setRounds(updatedRounds);

    if (player === 'you') {
      setShaneScore(updatedRounds.reduce((acc, round) => acc + round.you, 0));
    } else {
      setOpponentScore(updatedRounds.reduce((acc, round) => acc + round.opponent, 0));
    }
  };

  useEffect(() => {
    setGame({
      ...game,
      players: {
        ...game.players,
        you: { ...game.players.you, score: shaneScore },
        opponent: { ...game.players.opponent, score: opponentScore },
      },
    });
  }, [shaneScore, opponentScore]);

  return (
    <div className="scoring-screen">
      <h1>Scoring</h1>
      <h2>Mission: {game.mission}</h2>
      {rounds.map((round, index) => (
        <div key={index} className="round-section">
          <h3>Round {index + 1}</h3>
          <div className="score-section">
            <h4>Shane</h4>
            <input
              type="number"
              value={round.you}
              onChange={(e) => handleScoreChange('you', index, parseInt(e.target.value))}
            />
            <select
              value={round.tactic.you}
              onChange={(e) => handleTacticChange('you', index, e.target.value)}
            >
              {tactics.map((tactic) => (
                <option key={tactic} value={tactic}>
                  {tactic}
                </option>
              ))}
            </select>
            <button onClick={() => handleTacticResultToggle('you', index)}>
              {round.tacticAchieved.you ? 'Unachieve' : 'Achieve'}
            </button>
          </div>
          <div className="score-section">
            <h4>Opponent</h4>
            <input
              type="number"
              value={round.opponent}
              onChange={(e) => handleScoreChange('opponent', index, parseInt(e.target.value))}
            />
            <select
              value={round.tactic.opponent}
              onChange={(e) => handleTacticChange('opponent', index, e.target.value)}
            >
              {tactics.map((tactic) => (
                <option key={tactic} value={tactic}>
                  {tactic}
                </option>
              ))}
            </select>
            <button onClick={() => handleTacticResultToggle('opponent', index)}>
              {round.tacticAchieved.opponent ? 'Unachieve' : 'Achieve'}
            </button>
          </div>
        </div>
      ))}
      <div className="final-scores">
        <h2>Final Scores</h2>
        <p>Shane: {shaneScore}</p>
        <p>Opponent: {opponentScore}</p>
      </div>
      <div className="tactic-results">
        <h2>Battle Tactic Results</h2>
        <div>
          <h3>Shane</h3>
          {rounds.map((round, index) => (
            round.tactic.you && (
              <p key={index}>{`Round ${index + 1}: ${round.tactic.you} - ${round.tacticAchieved.you ? 'Achieved' : 'Failed'}`}</p>
            )
          ))}
        </div>
        <div>
          <h3>Opponent</h3>
          {rounds.map((round, index) => (
            round.tactic.opponent && (
              <p key={index}>{`Round ${index + 1}: ${round.tactic.opponent} - ${round.tacticAchieved.opponent ? 'Achieved' : 'Failed'}`}</p>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoringScreen;

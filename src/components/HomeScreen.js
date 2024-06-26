import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import { TextField, Button, Container, Typography } from '@material-ui/core';

const HomeScreen = () => {
  const [game, setGame] = useContext(GameContext);

  const handleDateChange = (e) => {
    setGame({ ...game, date: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setGame({ ...game, description: e.target.value });
  };

  return (
    <Container>
      <Typography variant="h4">0-0 Shane vs Opponent</Typography>
      <div className="game-details">
        <div className="game-date">
          <TextField
            label="Game Date"
            type="date"
            value={game.date}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="game-description">
          <TextField
            label="Game Description"
            multiline
            rows={4}
            value={game.description}
            onChange={handleDescriptionChange}
            variant="outlined"
          />
        </div>
        <Link to="/player-setup" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Next: Player Setup
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default HomeScreen;

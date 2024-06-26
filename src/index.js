import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import HomeScreen from './components/HomeScreen';
import PlayerSetup from './components/PlayerSetup';
import MissionSetup from './components/MissionSetup';
import ScoringScreen from './components/ScoringScreen';

const App = () => (
  <GameProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/player-setup" component={PlayerSetup} />
        <Route path="/mission-setup" component={MissionSetup} />
        <Route path="/scoring" component={ScoringScreen} />
      </Switch>
    </Router>
  </GameProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

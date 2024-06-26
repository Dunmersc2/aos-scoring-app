
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import PlayerSetup from './components/PlayerSetup';
import MissionSetup from './components/MissionSetup';
import ScoringScreen from './components/ScoringScreen';
import './styles.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/player-setup" component={PlayerSetup} />
          <Route path="/mission-setup" component={MissionSetup} />
          <Route path="/scoring" component={ScoringScreen} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
            
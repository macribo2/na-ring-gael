import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { PlayerProvider } from'./components/player-context/playerContext'
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChessLike from './components/ChessLike/chessLike';

ReactDOM.render(
  <Router>
      <PlayerProvider>
        <Switch>
        {/* Add other routes as needed */}
         <Route path="/chesslike" component={ChessLike} />
         <Route path="/" component={App} />
      </Switch>
    </PlayerProvider>
  </Router>,
  document.getElementById('root')
);

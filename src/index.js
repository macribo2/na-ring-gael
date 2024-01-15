import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { PlayerProvider } from'./components/player-context/playerContext'
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChessLike from './components/ChessLike/chessLike';

const ChessLikeWrapper = () => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    // This effect runs once when the component mounts
    const timeoutId = setTimeout(() => {
      // Set shouldRefresh to true after 2 seconds
      setShouldRefresh(true);
    }, 2000);

    // Cleanup function to clear the timeout in case the component unmounts
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures that this effect runs only once

  return (
    <>
      <PlayerProvider>
        <Switch>
          <Route path="/chesslike" render={() => (
            <>
              <ChessLike />
              {shouldRefresh && <ChessLike />}
            </>
          )} />
          <Route path="/" component={App} />
        </Switch>
      </PlayerProvider>
    </>
  );
};

ReactDOM.render(
  <Router>
    <ChessLikeWrapper />
  </Router>,
  document.getElementById('root')
);

// src/components/wicklow/Wicklow.js
import React from 'react';
import { Link } from 'react-router-dom';
import GameBoard from '../gameboard/gameboard';
import './wicklow.css';

function Wicklow({ setCurrentMap, gameData }) {
  return (
    <div className="county-game-board">
      {/* Add any other content or styling you need for the Wicklow component */}
      <h1>Wicklow County</h1>
      {/* Add game content and interactions here */}
      <p>Game content for Wicklow goes here.</p>

      <div className="game-board-container">
        {/* Pass the necessary props to the GameBoard component */}
        <GameBoard setCurrentMap={setCurrentMap} currentMap={gameData.map} />
      </div>

      {/* Navigation to other counties */}
      <div className="county-navigation">
        <Link to="/dublin">Go to Dublin</Link>
        {/* Add links to other counties as needed */}
      </div>
    </div>
  );
}

export default Wicklow;

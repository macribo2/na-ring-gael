import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import GameBoard from '../gameboard/gameboard';
import './dublin.css';
import { gameData } from '../../App'; // Import the gameData object from App.js or your data source
// Dublin.js

function Dublin({ setCurrentMap, gameData }) {
  return (
    <div className="center-screen">
    <div className="county-game-board">
      <h1>Co. Baile Átha Cliath</h1>
      {/* Add game content for Dublin here */}
      <p></p>

        <div className="game-board-container">
        <GameBoard setCurrentMap={setCurrentMap} currentMap={gameData.map} />
      </div>

      {/* Navigation to other counties */}
      <div className="county-navigation">
        <Link to="/wicklow">Go to Wicklow</Link>
        {/* Add links to other counties as needed */}
        </div>
        </div>
    </div>
  );
}

export default Dublin;

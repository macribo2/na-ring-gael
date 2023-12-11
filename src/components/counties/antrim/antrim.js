import React, { Component } from 'react';

import antrimMapData from './antrim.json'; // Import the JSON map data for Antrim
import './antrim.css'; // Import the CSS for styling
import GameTile from '../game-tile/game-tile'
class Antrim extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerPosition: {
        row: 0,
        col: 0,
      },
      badGuyPosition: {
        row: 5,
        col: 5,
      },
      message: '',
      remainingMoves: 2,
      isBadGuyMoving: false,
      currentMap: antrimMapData.mapData, // Set the default map data for Antrim
    };
  }

  // Other lifecycle methods, event handlers, and utility functions can go here

  renderGameBoard() {
    const { playerPosition, badGuyPosition, currentMap } = this.state;

    return currentMap.map((row, rowIndex) => (
      <div key={`row-${rowIndex}`} className="game-row">
        {row.map((tile, colIndex) => (
          // Render each tile using the GameTile component
          <GameTile
            key={`tile-${rowIndex}-${colIndex}`}
            tile={tile}
            playerPosition={playerPosition}
            badGuyPosition={badGuyPosition}
            rowIndex={rowIndex}
            colIndex={colIndex}
            remainingMoves={this.state.remainingMoves}
            onTileTouch={this.handleTileTouch}
            
          />
        ))}
      </div>
    ));
  }

  // Other rendering methods, such as UI elements and battle mode, can go here

  render() {
    const { message, isBadGuyMoving, playerPosition, badGuyPosition } = this.state;

    return (
      <div className="county-container">
        {/* Render any county-specific UI elements */}
        <h1>{message}</h1>
        {/* Render the game board */}
        <div className="game-board">
          {this.renderGameBoard()}
     
        </div>
        <button onClick={this.endTurn} disabled={isBadGuyMoving}>
          End Turn
        </button>
      </div>
    );
  }
}

export default Antrim;

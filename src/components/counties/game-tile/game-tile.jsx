import React, { Component } from 'react';

class GameTile extends Component {
  // Add any component-specific methods or state here

  render() {
    const {
      tile,
      playerPosition,
      badGuyPosition,
      rowIndex,
      colIndex,
      remainingMoves,
      onTileTouch,
    } = this.props;

    // Determine if this tile is the player's tile or the bad guy's tile
    const isPlayerTile = rowIndex === playerPosition.row && colIndex === playerPosition.col;
    const isBadGuyTile = badGuyPosition && rowIndex === badGuyPosition.row && colIndex === badGuyPosition.col;

    // Determine if this tile is highlighted based on remaining moves
    const rowDiff = Math.abs(rowIndex - playerPosition.row);
    const colDiff = Math.abs(colIndex - playerPosition.col);
    const isHighlighted = rowDiff <= remainingMoves && colDiff <= remainingMoves;

    // Determine the appropriate content for the tile
    let content = null;
    if (tile === 0) {
      content = <div className="obstacle"></div>;
    } else if (tile >= 30 && tile <= 35 && isPlayerTile) {
      const locationIndex = tile - 30;
      content = <div className="square-number">{this.props.locations[locationIndex]}</div>;
    } else {
      content = <div className="square-number">{tile}</div>;
    }

    return (
      <div
        className={`game-tile ${tile === 9 ? 'non-walkable' : ''} ${isPlayerTile ? 'player-icon' : ''} ${isBadGuyTile ? 'bad-guy-icon' : ''} ${isHighlighted ? 'highlighted' : ''}`}
        onTouchStart={() => onTileTouch(rowIndex, colIndex)}
      >
        {content}
      </div>
    );
  }
}

export default GameTile;

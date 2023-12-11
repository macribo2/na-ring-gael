import React from 'react';
import './enemy-style.css'; // Import the CSS file for EnemyKnight styling

function EnemyKnight({ greenKnightPosition }) {
  const { row, col } = greenKnightPosition;

  // Calculate the position based on gridRow and gridColumn
  const style = {
    gridRow: row + 1, // Adjust based on your grid structure (add 1 to convert from 0-based to 1-based)
    gridColumn: col + 1, // Adjust based on your grid structure (add 1 to convert from 0-based to 1-based)
  };

  return <div className="enemy-knight" style={style}></div>;
}

export default EnemyKnight;

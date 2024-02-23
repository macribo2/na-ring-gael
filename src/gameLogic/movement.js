// gameLogic/movement.js

// Define the size of the game board
export const BOARD_SIZE = 28;

// Function to check if a move is valid for a knight-like piece
export function isValidMove(startX, startY, targetX, targetY) {
  const dx = Math.abs(targetX - startX);
  const dy = Math.abs(targetY - startY);
  return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
}

// Function to move the player piece
export function movePiece(startX, startY, targetX, targetY) {
  if (isValidMove(startX, startY, targetX, targetY)) {
    // Perform the move
    // Update player position or trigger other game events
    console.log(`Moved to (${targetX}, ${targetY})`);
    return true; // Return true if move is valid
  } else {
    console.log('Invalid move');
    return false; // Return false if move is invalid
  }
}

// gameLogic/movement.js

export function getValidKnightMoves(playerPosition) {
  const { row, col } = playerPosition;
  const validMoves = [];
  const knightMoves = [
    { dx: -2, dy: -1 },
    { dx: -2, dy: 1 },
    { dx: -1, dy: -2 },
    { dx: -1, dy: 2 },
    { dx: 1, dy: -2 },
    { dx: 1, dy: 2 },
    { dx: 2, dy: -1 },
    { dx: 2, dy: 1 },
  ];

  knightMoves.forEach(move => {
    const newRow = row + move.dx;
    const newCol = col + move.dy;
    // Check if the new position is within the board bounds
    if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
      validMoves.push({ row: newRow, col: newCol });
    }
  });

  return validMoves;
}

// Define the valid move logic for a pawn
export function getValidPawnMoves(playerPosition) {
  // Implement logic to calculate valid move-to squares for a pawn relative to the player position
}

// Define the valid move logic for a queen
export function getValidQueenMoves(playerPosition) {
  // Implement logic to calculate valid move-to squares for a queen relative to the player position
}

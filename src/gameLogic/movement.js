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
    return true; // Return true if move is valid
  } else {
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

// Function to get valid moves for a pawn
export function getValidPawnMoves(playerPosition, gameBoard, pieceColor) {
  const validMoves = [];

  const { row, col } = playerPosition;
  const playerColor = gameBoard[row][col].pieceColor;

  // Check for diagonal captures
  const leftDiagonal = { row: row + 1, col: col - 1 };
  const rightDiagonal = { row: row + 1, col: col + 1 };
  // Check left diagonal
  if (isSquareOnBoard(leftDiagonal) && isEnemyPiece(leftDiagonal, playerColor, gameBoard)) {
    validMoves.push(leftDiagonal);
  }

  // Check right diagonal
  if (isSquareOnBoard(rightDiagonal) && isEnemyPiece(rightDiagonal, playerColor, gameBoard)) {
    validMoves.push(rightDiagonal);
  }

  return validMoves;
}

function isSquareOnBoard(square) {
  return square.row >= 0 && square.row < BOARD_SIZE && square.col >= 0 && square.col < BOARD_SIZE;
}

function isEnemyPiece(square, playerColor, gameBoard) {
  return gameBoard[square.row][square.col] && gameBoard[square.row][square.col].pieceColor !== playerColor;
}

// Define the valid move logic for a queen
export function getValidQueenMoves(playerPosition) {
  // Implement logic to calculate valid move-to squares for a queen relative to the player position
}

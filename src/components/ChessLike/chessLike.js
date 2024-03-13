import React, { useEffect, useRef } from 'react';import Phaser from 'phaser';
import { isValidMove, movePiece, BOARD_SIZE, getValidKnightMoves, getValidPawnMoves } from './../../gameLogic/movement';
import './chess-like.css'
import greenRingFrame from '../../images/ciorcal-glass6.png'
import molly from '../../images/draoi0.gif'
import { useLocation } from 'react-router-dom';


const PhaserGame = () => {
  const location = useLocation();
  const championName = location.state ? location.state.championName : null;

  const phaserGameRef = useRef(null);
  const gameRef = useRef(null);
  const initializedRef = useRef(false);
  let gameBoard = [];

  const playerStartPosition = { row: 4, col: 4 }; // Adjusted for smaller board

  const squareSize = 50;
  const gridSize = 50; // Adjusted for smaller board
  const boardWidth = squareSize * gridSize;
  const boardHeight = squareSize * gridSize;
  const gridOffsetX = 0;
  const gridOffsetY = 0;
  
  let playerMovesAs = "knight"; // Default to knight moves

  useEffect(() => {


    if (!initializedRef.current) {
      const container = phaserGameRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      const config = {
        type: Phaser.AUTO,
        width: containerWidth,
        height: containerHeight,
        parent: phaserGameRef.current,
        scene: {
          preload: preload,
          create: create,
          update: update,
        },
      };

      gameRef.current = new Phaser.Game(config);
      initializedRef.current = true;
    }

    let champID = localStorage.getItem('champID')

    function preload() {
      const scene = this;
      scene.load.image('background', './phaser-resources/images/bg0.png');
      scene.load.image('puca0', './phaser-resources/images/puca0.png');
      scene.load.image('puca1', './phaser-resources/images/puca1.png');
      scene.load.image('player', './phaser-resources/images/champions/'+champID+'.png');    }

    function centerCameraOnPlayer(scene, playerSprite) {
      // Get the position of the player sprite
      const playerX = playerSprite.x;
      const playerY = playerSprite.y;
    
      // Calculate the new camera position to center on the player
     let offsetX = scene.cameras.main.width / 2; // Offset to center horizontally
      let offsetY = scene.cameras.main.height / 2; // Offset to center vertically
      
      // Adjust offsetY based on device orientation
    if (window.innerHeight < window.innerWidth) {
      // Portrait orientation
      offsetY -= 0; // Adjusted offsetY value for portrait orientation
  } else {
      // Landscape orientation
      offsetY -= 0; // Adjusted offsetY value for landscape orientation
  }
      
      const cameraX = playerX - offsetX;
      const cameraY = playerY - offsetY;
    
      // Set the camera position
      scene.cameras.main.scrollX = cameraX;
      scene.cameras.main.scrollY = cameraY;
    }
    function create() {
      const scene = this;
      const playerPosition = playerStartPosition;
      initializeGameBoard(scene);
      highlightValidMoveToSquares(scene, playerPosition, playerMovesAs);
    
      const { row, col } = playerPosition;
      const startX = gridOffsetX + row * squareSize + squareSize / 2;
      const startY = gridOffsetY + col * squareSize + squareSize / 2;
    
      // Create player sprite
      const player = scene.add.sprite(startX, startY, 'player').setName('player');
      player.setOrigin(0.5);
    
      // Load the .png file for the enemy pieces
      scene.load.image('puca0');
      scene.load.image('puca1');
      scene.load.once('complete', () => {
        // Create sprites for enemy pieces using the loaded image
        const puca0 = scene.add.sprite(gridOffsetX + 3 * squareSize + squareSize / 2, gridOffsetY + 3 * squareSize + squareSize / 2, 'puca0');
        const puca1 = scene.add.sprite(gridOffsetX + 5 * squareSize + squareSize / 2, gridOffsetY + 3 * squareSize + squareSize / 2, 'puca1');
    
        // Call the function to center the camera on the player sprite
        centerCameraOnPlayer(scene, player);
      });
      scene.load.start();
    }
    
    
    function initializeGameBoard(scene) {
      const gridOffsetX = 0;
      const gridOffsetY = 0;

      for (let i = 0; i < gridSize; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < gridSize; j++) {
          const x = gridOffsetX + i * squareSize;
          const y = gridOffsetY + j * squareSize;
          const color = (i + j) % 2 === 0 ? 0x090909 : 0x000000;
          const square = scene.add.rectangle(x + squareSize / 2, y + squareSize / 2, squareSize, squareSize, color);
          square.setInteractive();
          square.on('pointerdown', () => handleSquareClick(scene, i, j));
          gameBoard[i][j] = square;
        }
      }
      const enemyPiece1 = { row: 3, col: 3, pieceColor: 'black' }; // Previous enemy piece
const enemyPiece2 = { row: 3, col: 5, pieceColor: 'black' }; // New enemy piece

  const puca0 = gameBoard[enemyPiece1.row][enemyPiece1.col];
  puca0.pieceColor = "black";
  const puca1 = gameBoard[enemyPiece2.row][enemyPiece2.col];
  puca1.pieceColor = "black";
    }
    function highlightValidMoveToSquares(scene, playerPosition, playerMovesAs) {
      if (playerMovesAs === "knight") {
        let validMoves = getValidKnightMoves(playerPosition);
        validMoves.forEach(move => {
          const { row, col } = move;
          const square = gameBoard[row][col];
          square.setFillStyle(0x005000);
        });
      } else if (playerMovesAs === "pawn") {
        // Implement logic for highlighting valid pawn moves
        let validMoves = getValidPawnMoves(playerPosition, gameBoard);
        validMoves.forEach(move => {
          const { row, col } = move;
          const square = gameBoard[row][col];
          square.setFillStyle(0x005000);
        });
      }
    }


    const playerPosition = playerStartPosition;
    function clearHighlights() {
      // Iterate over all squares in the game board
      gameBoard.forEach(row => {
        row.forEach(square => {
          const color = (row + gameBoard.indexOf(row) + gameBoard.indexOf(square)) % 2 === 0 ? 0x090909 : 0x000000;
          square.setFillStyle(color); // Reset the fill style
        });
      });
    }
    
    
    function handleSquareClick(scene, row, col) {
      // Check if the move is valid
      if (isValidMove(playerPosition.row, playerPosition.col, row, col)) {
        // Move the player piece
        movePiece(playerPosition.row, playerPosition.col, row, col);
        
        // Update the player position
        playerPosition.row = row;
        playerPosition.col = col;
        
        // Clearyyexisting highlights
        clearHighlights();
        
        // Highlight new legal squares based on the updated player position
        highlightValidMoveToSquares(scene, playerPosition,playerMovesAs );
        
        // Calculate the new position for the player sprite
        const newX = gridOffsetX + row * squareSize + squareSize / 2;
        const newY = gridOffsetY + col * squareSize + squareSize / 2;
        
        // Get the player sprite from the scene
        const playerSprite = scene.children.getByName('player');
        // Move the player sprite to the new position
        playerSprite.setPosition(newX, newY);
      } else {
        console.log('Invalid move');
      }
    }

    
    function update() {}

    return () => {};
  }, [championName, playerMovesAs]);

  return (
    <div className="county-game-board">
      <div alt="bg" className="bg0" />
      <div alt="bg1" className="bg1" />
      <div ref={phaserGameRef} className="phaser-chess-like" />;
      <div className="chess-like-frame-container">
        <img src={greenRingFrame} className="chess-like-frame" alt="a round frame of green and purple" />
        <img src={molly} className="og-opponent molly" alt="black molly" />
        {championName && <div className="question-text county-text">Cad a feiceann<br/> {championName}?</div>}
      </div>
    </div>
  );
  
};

export default PhaserGame;

import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import './cork.css';

const Nagels = () => {
  const gameRef = useRef(null); // Reference to hold the Phaser game instance

  useEffect(() => {
    // Configuration for Phaser game
    const config = {
      type: Phaser.AUTO,
      width: '100%',  // Use percentage to adapt to screen width
      height: '100%', // Use percentage to adapt to screen height
      scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };
    
    // Create the Phaser game instance
    gameRef.current = new Phaser.Game(config);

    // Cleanup function to destroy the Phaser game when the component unmounts
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  // Phaser scene methods
  function preload() {
    this.load.image('background', '/phaser-resources/images/background-elements/fields-and-sky.png');
    this.load.image('player', 'path/to/player.png');
    this.load.image('rock', 'path/to/rock.png'); // Load the rock image
  }

  function create() {
    const tileSize = 32;
    const gridWidth = 25; // Number of tiles in width
    const gridHeight =18; // Number of tiles in height
    const bgWidth = tileSize * gridWidth;
    const bgHeight = tileSize * gridHeight;

    this.background = this.add.tileSprite(0, 0, bgWidth, bgHeight, 'background');
    this.background.setOrigin(0, 0);

    // Center the player on a tile
    this.player = this.add.sprite(tileSize * 1.5, tileSize * 1.5, 'player'); // Start at tile (1, 1)
    this.player.setOrigin(0.5, 0.5);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Ensure the player stays locked to the grid
    this.player.nextMove = { x: this.player.x, y: this.player.y };
    this.isMoving = false;
    this.moveDelay = 0; // Add a delay for continuous movement

    // Define rock positions
    this.rocks = [
      { x: 5, y: 5 },
      { x: 10, y: 3 },
      { x: 7, y: 2 }
    ];

    // Draw rocks
    this.rocks.forEach(rock => {
      this.add.sprite(rock.x * tileSize + tileSize / 2, rock.y * tileSize + tileSize / 2, 'rock');
    });

    // Add text for collision messages
    this.collisionText = this.add.text(10, 10, '', { fontSize: '16px', fill: '#ffffff' });

    // Timer for collision messages
    this.collisionMessageTimer = 0;
    this.collisionMessageDuration = 2000; // Duration in milliseconds

    drawGrid(this);
  }

  function update(time, delta) {
    const moveInterval = 150; // Adjust the delay between moves (milliseconds)

    // Clear the collision message after the duration
    if (time > this.collisionMessageTimer) {
      this.collisionText.setText('');
    }

    if (this.isMoving) {
      this.player.x = Phaser.Math.Linear(this.player.x, this.player.nextMove.x, 0.2);
      this.player.y = Phaser.Math.Linear(this.player.y, this.player.nextMove.y, 0.2);

      if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.player.nextMove.x, this.player.nextMove.y) < 1) {
        this.player.x = this.player.nextMove.x;
        this.player.y = this.player.nextMove.y;
        this.isMoving = false;
        this.moveDelay = time + moveInterval; // Set delay after movement is complete
      }
      return;
    }

    if (time < this.moveDelay) {
      return; // Wait until the delay is over
    }

    const tileSize = 32;
    const gridWidth = 25;
    const gridHeight = 18;

    let nextMove = { x: this.player.x, y: this.player.y };
    let collisionMessage = '';

    if (this.cursors.left.isDown) {
      nextMove.x = Phaser.Math.Clamp(this.player.x - tileSize, tileSize * 0.5, tileSize * (gridWidth - 0.5));
    } else if (this.cursors.right.isDown) {
      nextMove.x = Phaser.Math.Clamp(this.player.x + tileSize, tileSize * 0.5, tileSize * (gridWidth - 0.5));
    } else if (this.cursors.up.isDown) {
      nextMove.y = Phaser.Math.Clamp(this.player.y - tileSize, tileSize * 0.5, tileSize * (gridHeight - 0.5));
    } else if (this.cursors.down.isDown) {
      nextMove.y = Phaser.Math.Clamp(this.player.y + tileSize, tileSize * 0.5, tileSize * (gridHeight - 0.5));
    }

    if (isCollision(nextMove, this.rocks, tileSize)) {
      collisionMessage = 'Carraig';
    }

    if (!collisionMessage) {
      this.player.nextMove = nextMove;
      this.isMoving = true;
    } else {
      this.collisionText.setText(collisionMessage); // Set the collision message
      this.collisionMessageTimer = time + this.collisionMessageDuration; // Set the timer
    }
  }

  function isCollision(nextMove, rocks, tileSize) {
    return rocks.some(rock => {
      const rockX = rock.x * tileSize + tileSize / 2;
      const rockY = rock.y * tileSize + tileSize / 2;
      return nextMove.x === rockX && nextMove.y === rockY;
    });
  }

  function drawGrid(scene) {
    const tileSize = 32;
    const gridWidth = 25; // Number of tiles in width
    const gridHeight = 18;  // Number of tiles in height
    const darkGreenTranslucent = 0x004d0080; // Translucent dark green color
  
    // Draw horizontal lines
    for (let x = 0; x <= gridWidth * tileSize; x += tileSize) {
      scene.add.line(0, 0, x, 0, x, gridHeight * tileSize, darkGreenTranslucent).setOrigin(0, 0);
    }
  
    // Draw vertical lines
    for (let y = 0; y <= gridHeight * tileSize; y += tileSize) {
      scene.add.line(0, 0, 0, y, gridWidth * tileSize, y, darkGreenTranslucent).setOrigin(0, 0);
    }
  }

  return (
    <div id="phaser-container" style={{ width: '800px', height: '480px' }}></div>
  );
};

export default Nagels;

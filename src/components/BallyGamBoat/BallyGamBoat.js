import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const BallyGamboatGame = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const initializeGame = () => {
      const config = {
        type: Phaser.AUTO,
        width: window.innerWidth, // Set width to match the window width
    height: window.innerHeight, // Set height to match the window height
    
        scene: {
          preload: preload,
          create: create,
          update: update,
        },
        scale: {
          mode: Phaser.Scale.RESIZE, // Resize the game to fill the entire screen
          autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game horizontally and vertically
        },
      };

      gameRef.current = new Phaser.Game(config);
    };


    // Define scene methods
    function preload() {
      this.load.image('background', './phaser-resources/images/placeholders/ship-gameboy.png');
    }

    function create() {
      // Create the background sprite and set its size to match the game's canvas
      const background = this.add.sprite(0, 0, 'background').setOrigin(0);
      background.displayWidth = this.sys.game.config.width;
      background.displayHeight = this.sys.game.config.height;
    }

    function update() {
      // Update game logic here
    }

    initializeGame();

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  return <div id="ballyGamboat-game-container"></div>;
};

export default BallyGamboatGame;

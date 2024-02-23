import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const BallyTownGame = () => {
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
      this.load.image('background', './phaser-resources/images/placeholders/bally-sample.png');
    }

    function create() {
      // Create the background sprite and set its size to match the game's canvas
      const background = this.add.sprite(0, 0, 'background').setOrigin(0);
      // background.displayWidth = this.sys.game.config.width;
      // background.displayHeight = this.sys.game.config.height;
      // Set the scale mode to cover the entire screen without stretching
      background.setScale(Math.max(this.scale.width / background.width, this.scale.height / background.height));

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

  return <div id="bally-town-game-container"></div>;
};

export default BallyTownGame;

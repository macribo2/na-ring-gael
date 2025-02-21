import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
// import { Room } from 'rot-js/lib/map/feature';
import DungeonScene from './dungeonScene';



// 3. React Component
const BallyGamBoy = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: 'phaser-container',
      width: 800,
      height: 480,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      render: {
        pixelArt: true,
        antialias: false,
        antialiasGL: false,
        roundPixels: true,
        powerPreference: "high-performance",
        pipelines: {
          Light2D: {
            name: 'Light2D',
            game: this, // Reference to game instance
            renderer: null, // Will be auto-populated
            topology: 6
          }
        }
      },
      scene: [DungeonScene],
      input: {
        keyboard: true,
        mouse: {
          preventDefaultWheel: false
        }
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false // Set to true to see physics bodies
        }}
    };
    const game = new Phaser.Game(config);
    gameRef.current = game;

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div id="phaser-container" style={{ width: '100%', height: '100%' }} />;
};

export default BallyGamBoy;
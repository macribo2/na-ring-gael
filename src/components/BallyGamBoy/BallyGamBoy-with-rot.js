import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

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
      scene: [DungeonScene],
      lighting: {
        ambient: {
          color: 0x333333,
          intensity: 1
        }
      },
      input: {
        keyboard: true,
        mouse: {
          preventDefaultWheel: false
        }
      },
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
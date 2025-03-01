// PhaserWrapper.js
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const PhaserWrapper = ({ config, scenes }) => {
  const gameRef = useRef(null);

  useEffect(() => {
    const phaserConfig = {
      ...config,
      scene: scenes // Pass scene CLASSES directly
    };

    const game = new Phaser.Game(phaserConfig);
    gameRef.current = game;

    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, [config, scenes]);

  return <div id="phaser-container" style={{ width: '100%', height: '100%' }} />;
};

export default PhaserWrapper;
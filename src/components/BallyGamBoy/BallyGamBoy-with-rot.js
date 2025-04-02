import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import DungeonScene from './dungeonScene';
import RexTextTypingPlugin from 'phaser3-rex-plugins/plugins/texttyping-plugin.js';
import PucaChase0 from '../pucaChase/pucaChase0';
import ObjectiveScene from './objectiveScene';
import NotificationScene from './notificationsScene';

const BallyGamBoy = () => {
  const gameRef = useRef(null);
  const [showPucaChase, setShowPucaChase] = useState(true);

  useEffect(() => {
    if (gameRef.current) return; // Prevent multiple instances

    const config = {
      type: Phaser.AUTO,
      parent: 'phaser-container',
      width: window.innerWidth,
      height: window.innerHeight,

      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: '100%',
        height: '100%'
      },
   
      render: {
        pixelArt: true,
        antialias: false,
        antialiasGL: false,
        roundPixels: true,
        powerPreference: 'high-performance',
      },
      // scene: [ PucaChase0,DungeonScene,ObjectiveScene,NotificationScene], // ✅ Add PucaChase0 first
      scene: [ DungeonScene,ObjectiveScene,NotificationScene], // ✅ Add PucaChase0 first
      plugins: {
        scene: [
          {
            key: 'rexTextTyping',
            plugin: RexTextTypingPlugin,
            mapping: 'rexTextTyping',
          },
        ],
      },
      input: {
        keyboard: true,
        mouse: {
          preventDefaultWheel: false,
        },
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
    };

    gameRef.current = new Phaser.Game(config);

    // Switch to DungeonScene after 5 seconds

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div id="phaser-container" style={{ width: '100vw', height: '100vh' }} />;
};

export default BallyGamBoy;

import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import FastTravel1 from '../IntroSequence/FastTravel1';

const BallyNeo = () => {
  const gameRef = useRef(null); // Reference for Phaser game instance

  useEffect(() => {
    const initializeGame = () => {
      const config = {
        type: Phaser.AUTO,
        width: window.innerWidth, // Set width to match the window width
        height: window.innerHeight, // Set height to match the window height
        
        scene: [FastTravel1], // Add the scene here (No need to create an instance of FastTravel1 manually)
        
        scale: {
          mode: Phaser.Scale.RESIZE, // Resize the game to fill the entire screen
          autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game horizontally and vertically
        },
      };

      // Initialize Phaser game
      gameRef.current = new Phaser.Game(config);
    };

    // Initialize the game
    initializeGame();

    // Cleanup function to destroy Phaser game when component unmounts
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true); // Ensure the game is destroyed properly when component is removed
      }
    };
  }, []); // Empty dependency array ensures the game is initialized only once

  return <div id="bally-neo-game-container" />; // Game container, no need to render FastTravel1 here
};

export default BallyNeo;

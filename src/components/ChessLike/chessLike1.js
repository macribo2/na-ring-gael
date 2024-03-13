import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import wordPairs from './wordpairs'; // Assuming wordPairs.js is in the same directory
import './chess-like.css'

const PhaserGame = () => {
    let currentWordPairIndex = 0;
  const phaserGameRef = useRef(null);
  function moveOnToNextWordPair() {
      const scene = this;
  // Logic to move to the next word pair
  // For example:
  currentWordPairIndex++; // Assuming you have a variable tracking the current word pair index
  console.log('Moving to next word pair. Index:', currentWordPairIndex);
    if (currentWordPairIndex < wordPairs.length) {
      const nextWordPair = wordPairs[currentWordPairIndex];
      // Update the text objects with the new word pair
      scene.posGaText.setText(nextWordPair.posGa);
      scene.negGaText.setText(nextWordPair.negGa);
    } else {
      // All word pairs have been displayed, handle end of game logic here
      console.log('End of game');
    }
  }
  
  useEffect(() => {
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
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      // Preload assets here if needed
    }

    function create() {
        const scene = this; // Store the scene object
      
        const firstWordPair = wordPairs[0]; // Assuming wordPairs is an array of objects
        const textStyle = {
          fontSize: '24px',
          fontFamily: 'Arial',
          color: '#ffffff',
        };
      
        // Create text objects and store references
        scene.posGaText = scene.add.text(100, 100, firstWordPair.posGa, textStyle);
        scene.negGaText = scene.add.text(100, 150, firstWordPair.negGa, textStyle);
      
        // Set up click handlers for text objects
        scene.posGaText.setInteractive();
        scene.negGaText.setInteractive();
      
        scene.posGaText.on('pointerdown', () => {
            if (localStorage.getItem('chosenPuca') === '1') {
              console.log('Correct answer!'); // Positive Gaelic text clicked, right answer for puca1
            } else {
              console.log('Wrong answer!'); // Positive Gaelic text clicked, wrong answer for puca0
            }
            // Wait for 1 second before moving to the next word pair
            setTimeout(moveOnToNextWordPair.bind(scene), 1000); // Call bind here and pass the scene
          });
          
          scene.negGaText.on('pointerdown', () => {
            if (localStorage.getItem('chosenPuca') === '1') {
              console.log('Wrong answer!'); // Negative Gaelic text clicked, wrong answer for puca1
            } else {
              console.log('Correct answer!'); // Negative Gaelic text clicked, right answer for puca0
            }
            // Wait for 1 second before moving to the next word pair
            setTimeout(moveOnToNextWordPair.bind(scene), 1000); // Call bind here and pass the scene
          });
          
      }
      
    return () => {
      // Cleanup code if needed
      game.destroy(true);
    };
  }, []);

  return <div className='chess-like-1' ref={phaserGameRef}></div>;
};

export default PhaserGame;

import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import wordPairs from './wordpairs'; // Assuming wordPairs.js is in the same directory
import './chess-like.css'
const PhaserGame = () => {
  
    function moveOnToNextWordPair(scene) {
        // Logic to move to the next word pair
        currentWordPairIndex++;
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

    function create() {
        const scene = this; // Store the scene object
        let hearts = 3; // Initialize hearts
        scene.heartSprites = []; // Array to store heart sprites
    
        const firstWordPair = wordPairs[0]; // Assuming wordPairs is an array of objects
        const textStyle = {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
        };
     // Create text objects and store references
     scene.posGaText = scene.add.text(100, 100, wordPairs[0].posGa, textStyle);
     scene.negGaText = scene.add.text(100, 150, wordPairs[0].negGa, textStyle);
   
     // Set up click handlers for text objects
     scene.posGaText.setInteractive();
     scene.negGaText.setInteractive();
   
     scene.posGaText.on('pointerdown', () => {
         if (localStorage.getItem('chosenPuca') === '1') {
             console.log('Correct answer!');
         } else {
             handleWrongAnswer(scene);
         }
         // Wait for 1 second before moving to the next word pair
         setTimeout(() => {
             moveOnToNextWordPair(scene);
         }, 1000);
     });
   
     scene.negGaText.on('pointerdown', () => {
         if (localStorage.getItem('chosenPuca') !== '1') {
             console.log('Correct answer!');
         } else {
             handleWrongAnswer(scene);
         }
         // Wait for 1 second before moving to the next word pair
         setTimeout(() => {
             moveOnToNextWordPair(scene);
         }, 1000);
     });

     // Create heart sprites
     for (let i = 0; i < hearts; i++) {
         let heartSprite = scene.add.sprite(20 + i * 30, 20, 'heart').setScale(0.1); // Adjust position and scale as needed
         scene.heartSprites.push(heartSprite);
     }
 }

 function handleWrongAnswer(scene) {
    // Decrease hearts
    scene.hearts--;
    // Remove last heart sprite
    let removedHeart = scene.heartSprites.pop();
    removedHeart.destroy();
    // Check if player is out of hearts
    if (scene.hearts === 0) {
        // Redirect to game over screen
        // Replace '/gameOver' with your actual game over route
        window.location.href = '/gameOver';
    }
}

    let currentWordPairIndex = 0;
    
    const phaserGameRef = useRef(null);
    function preload() {
        // Load heart texture
        this.load.image('heart', './phaser-resources/images/heart.png');
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


        
        return () => {
            // Cleanup code if needed
            game.destroy(true);
        };
    }, []);

    return <div className='chess-like-1' ref={phaserGameRef}></div>;
};

export default PhaserGame;

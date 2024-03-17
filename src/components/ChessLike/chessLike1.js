import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import wordPairs from './wordpairs'; // Assuming wordPairs.js is in the same directory
import './chess-like.css';

const PhaserGame = () => {
    let player; // Player sprite

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

    function update() {
        if (this && this.cameras && this.cameras.main) {
            // Scroll the camera down slowly
            this.cameras.main.scrollY -= 0.5; // Adjust the scrolling speed as needed
            this.cameras.main.scrollX -= 0.5; // Adjust the scrolling speed as needed
        
        console.log('Update function called');
        }
    }
    function create() {
        const scene = this; // Store the scene object
    
        const containerRect = phaserGameRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        // Define grid dimensions
        const gridSize = 100;
        const squareSize = 64;

        // Create gameboard
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const x = (i + 0.5) * squareSize;
                const y = (j + 0.5) * squareSize;
                const square = scene.add.rectangle(x, y, squareSize, squareSize, 0x008000);
                square.setStrokeStyle(1, 0xffffff);
            }
        }

    // Create UI layer group
       // Create UI layer group
       const uiLayerX = 0; // Adjust these values as needed
       const uiLayerY = 320; // Adjust these values as needed
       const uiLayerWidth = containerWidth / 3;
       const uiLayerHeight = containerHeight;
       const uiLayer = scene.add.group({
           key: 'uiLayer',
           x: uiLayerX,
           y: uiLayerY,
           maxSize: -1
       });
  
        // Create player graphic
        const playerSize = squareSize * 0.8; // Adjust player size relative to square size
        const playerX = (gridSize / 2 + 0.5) * squareSize;
        const playerY = (gridSize / 2 + 0.5) * squareSize;
        player = scene.add.rectangle(playerX, playerY, playerSize, playerSize, 0xff0000);

        let hearts = 3; // Initialize hearts
        scene.heartSprites = []; // Array to store heart sprites
    
        const firstWordPair = wordPairs[0]; // Assuming wordPairs is an array of objects
        const textStyle = {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
        };
        const posX =uiLayerX + uiLayerWidth + 20;;
        const posY = 100;
        const negX = uiLayerX + uiLayerWidth + 20;
        const negY = 100;
        const uiBackground = scene.add.rectangle(uiLayerX, uiLayerY, uiLayerWidth, uiLayerHeight, 0x0000ff);
        uiBackground.setOrigin(0);
        uiLayer.add(uiBackground);
        scene.posGaText = scene.add.text(posX, posY, wordPairs[0].posGa, textStyle).setOrigin(0.5);
        scene.negGaText = scene.add.text(negX, negY, wordPairs[0].negGa, textStyle).setOrigin(0.5);
        uiLayer.add(scene.posGaText);
        uiLayer.add(scene.negGaText);
        uiLayer.add(uiBackground);
                // Add a background rectangle to the UI layer
    
       
        
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

        // Set camera to follow the player
        // scene.cameras.main.startFollow(player);
        // Rotate the camera by 45 degrees
        scene.cameras.main.setRotation(Math.PI / 4);
           // Set rotation individually for each UI element to counteract camera rotation

           uiBackground.setX(uiLayerX);
           scene.posGaText.setX(posX + uiLayerX);
           scene.negGaText.setX(negX + uiLayerX);
        // scene.cameras.main.setSize(2000,2000);
        uiLayer.children.iterate(child => {
            child.setScrollFactor(0);
            child.setRotation(-scene.cameras.main.rotation);
        });
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
    // Define the update function

    const container = phaserGameRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    const config = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: containerWidth,
            height: containerHeight,
        },
        scene: {
            preload: preload,
            create: create,
            update: update,
        },
        
    };

    const game = new Phaser.Game(config);

    // Automatically call the update function during the game loop
    game.events.on(Phaser.Core.Events.POST_UPDATE, update);

    // Cleanup code
    return () => {
        // Stop calling the update function during the game loop
        game.events.off(Phaser.Core.Events.POST_UPDATE, update);

        // Cleanup Phaser game instance
        game.destroy(true);
    };
}, []);


    return <div className='chess-like-1' ref={phaserGameRef}></div>;
};

export default PhaserGame;

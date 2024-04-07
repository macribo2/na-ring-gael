import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import './chess-like.css';
import wordPairs from './wordpairs'; // Assuming wordPairs.js is in the same directory

const PhaserGame = () => {
    let currentWordPairIndex = 0;
    let posGaText, negGaText;
    let hearts = 3;
    const heartSprites = []; // Array to store heart sprites
    const phaserGameRef = useRef(null);

    function moveOnToNextWordPair() {
        currentWordPairIndex++;
        console.log('Moving to next word pair. Index:', currentWordPairIndex);

        if (currentWordPairIndex < wordPairs.length) {
            const nextWordPair = wordPairs[currentWordPairIndex];
            posGaText.setText(nextWordPair.posGa);
            negGaText.setText(nextWordPair.negGa);
        } else {
            console.log('End of game');
        }
    }

    useEffect(() => {
        const loadFont = () => {
            if (document.fonts && document.fonts.ready) {
                return document.fonts.ready.then(() => true);
            } else {
                return Promise.resolve(true);
            }
        };
    
        const initializeGame = () => {
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
    
            return () => {
                game.destroy(true);
            };
        };
    
    
        loadFont().then(initializeGame);
    
    }, []);
    

    function preload() {
        let champID = localStorage.getItem('champID');

        this.load.image('heart', './phaser-resources/images/heart.png');
        this.load.image('pucaBlack', './phaser-resources/images/npcs/pooka0.gif');
        this.load.image('pucaWhite', './phaser-resources/images/npcs/pooka1.gif');
        this.load.image('player', `./phaser-resources/images/champions/${champID}.png`);
    }

    function create() {
        const scene = this;

        // Create the chessboard
        const boardSize = 8; // Adjust as needed
        const squareSize = scene.scale.width / boardSize;

        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const squareColor = (row + col) % 2 === 0 ? 0xffffff : 0x000000;
                const square = scene.add.rectangle(col * squareSize, row * squareSize, squareSize, squareSize, squareColor);
                square.setOrigin(0);
            }
        }

        // Other elements
        const firstWordPair = wordPairs[0];
        
        const posX = 100;
        const posY = 100;
        const negX = 300;
        const negY = 100;
        const textStyle = {
            fontSize: '24px',
            fontFamily: 'aonchlo',
            color: '#ffffff',
            stroke: '#000000', // Stroke color
            strokeThickness: 2, // Stroke thickness
        };
        posGaText = scene.add.text(posX, posY, firstWordPair.posGa, textStyle).setOrigin(0).setDepth(9);
        negGaText = scene.add.text(negX, negY, firstWordPair.negGa, textStyle).setOrigin(0);

        posGaText.setInteractive();
        negGaText.setInteractive();

        posGaText.on('pointerdown', () => {
            handleWrongAnswer(scene);
            moveOnToNextWordPair();
        });

        negGaText.on('pointerdown', () => {
            moveOnToNextWordPair();
        });

        // Create heart sprites representing game lives
        for (let i = 0; i < hearts; i++) {
            const heartX = 20 + i * 30;
            const heartY = 20;
            const heartSprite = scene.add.sprite(heartX, heartY, 'heart').setScale(0.2).setOrigin(0,0).setDepth(9);
            heartSprites.push(heartSprite); // Add heart sprite to array
        }

        // Add puca and player
        const playerSquareRow = 4; // Adjust the row of the player's square
        const playerSquareCol = 4; // Adjust the column of the player's square
        const playerX = playerSquareCol * squareSize;
        const playerY = playerSquareRow * squareSize;
        const player = scene.add.image(playerX, playerY, 'player').setScale(1.5).setOrigin(0,0);

        const pucaLeftSquareRow = playerSquareRow - 2; // Adjust the row of the left puca's square
        const pucaLeftSquareCol = playerSquareCol + 1; // Adjust the column of the left puca's square
        const pucaLeftX = pucaLeftSquareCol * squareSize;
        const pucaLeftY = pucaLeftSquareRow * squareSize;
        const pucaLeft = scene.add.image(pucaLeftX, pucaLeftY, 'pucaBlack').setScale(0.35).setOrigin(0,0);

        const pucaRightSquareRow = playerSquareRow - 1; // Adjust the row of the right puca's square
        const pucaRightSquareCol = playerSquareCol - 2; // Adjust the column of the right puca's square
        const pucaRightX = pucaRightSquareCol * squareSize;
        const pucaRightY = pucaRightSquareRow * squareSize;
        const pucaRight = scene.add.image(pucaRightX, pucaRightY, 'pucaWhite').setScale(0.35).setOrigin(0,0);
    }

    function update() {}

    function handleWrongAnswer(scene) {
        hearts--;

        // Remove heart sprite from array and destroy it
        if (heartSprites.length > 0) {
            const removedHeart = heartSprites.pop();
            if (removedHeart) {
                removedHeart.destroy();
            }
        }

        if (hearts === 0) {
            window.location.href = '/gameOver';
        }
    }

    return <div className='chess-like-1' ref={phaserGameRef}></div>;
};

export default PhaserGame;

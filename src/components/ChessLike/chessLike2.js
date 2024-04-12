import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import './chess-like.css';
import wordPairs from './wordpairs'; // Assuming wordPairs.js is in the same directory

let  gaText;
const PhaserGame = () => {
    let currentWordPairIndex = 0;
    let hearts = 3;
    const heartSprites = []; // Array to store heart sprites
    const phaserGameRef = useRef(null);
    let highlightedPuca = 0; // Tracks which puca is currently highlighted (0 or 1)
    let timerEvent; // Timer event for switching between puca highlights



    function moveOnToNextWordPair() {
        currentWordPairIndex++;
        console.log('Moving to next word pair. Index:', currentWordPairIndex);
    
        if (currentWordPairIndex < wordPairs.length) {
            const nextWordPair = wordPairs[currentWordPairIndex];
    
            // Determine randomly whether to display positive or negative text
            const showPositive = Math.random() > 0.5;
    
            // Update the text based on the random selection
            if (showPositive) {
                gaText.setText(nextWordPair.posGa);
            } else {
                gaText.setText(nextWordPair.negGa);
            }
    
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
        const timeoutId = setTimeout(() => {
            moveOnToNextWordPair();
          }, 5000); // 5 seconds delay
      
          // Cleanup function to clear the timeout when the component unmounts
          return () => clearTimeout(timeoutId);
    }, []);
    

    function preload() {
        let champID = localStorage.getItem('champID');
        this.load.image('circle9', './phaser-resources/images/ciorcal-glass9.png');

        this.load.image('aBtn', './phaser-resources/images/ui/a-btn.png'); // Replace 'path/to/glass_circle.png' with the actual path to your button image
        this.load.image('button-up', './phaser-resources/images/ui/pad-u.png');
        this.load.image('button-down', './phaser-resources/images/ui/pad-d.png');
        this.load.image('button-left', './phaser-resources/images/ui/pad-l.png');
        this.load.image('button-right', './phaser-resources/images/ui/pad-r.png');
        this.load.image('button-middle-lit', './phaser-resources/images/ui/middle-a.png');
        this.load.image('button-middle', './phaser-resources/images/ui/middle-b.png');
        this.load.image('heart', './phaser-resources/images/heart.png');
        this.load.image('pucaBlack', './phaser-resources/images/npcs/pooka0.png');
        this.load.image('pucaWhite', './phaser-resources/images/npcs/pooka1.png');
        this.load.image('player', `./phaser-resources/images/champions/${champID}.png`);
    }

    function create() {
        const scene = this;
        const aBtn = scene.add.sprite(100, scene.cameras.main.height -50, 'aBtn').setDepth(11);
        // aBtn.alpha = 0.5;
        
        aBtn.setInteractive(); // Make the button interactive
        
        // Create the chessboard
        const boardSize = 10; // Adjust as needed
        const squareSize = scene.scale.width / boardSize;
        const boardCenterX = scene.scale.width / 2;
        const boardCenterY = scene.scale.height / 2;
        const boardOffsetX = squareSize * boardSize / 2;
        const boardOffsetY = squareSize * boardSize / 2;
        
        // Container for the entire board
        const boardContainer = scene.add.container(boardCenterX - boardOffsetX, boardCenterY - boardOffsetY);
        
        
        // Rotate the board container 45 degrees (converted to radians)
        boardContainer.rotation = Math.PI / 4;
        boardContainer.x += 400;
        boardContainer.y += 100;
        boardContainer.setScale(0.75)
    
        

        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const squareColor = (row + col) % 2 === 0 ? 0x2E8B57 : 0xD3D3D3;
                const square = scene.add.rectangle(col * squareSize, row * squareSize, squareSize, squareSize, squareColor);
                square.setOrigin(0);
                square.setData('row', row);
                square.setData('col', col);
                boardContainer.add(square);
            }
        }
        
        // Other elements
        const firstWordPair = wordPairs[0];
        
        const posX = 270;
        const posY = 180;
        const negX = 300;
        const negY = 100;
        const textStyle = {
            fontSize: '6em',
            fontFamily: 'aonchlo',
            color: '#ffffff',
            stroke: '#000000', // Stroke color
            strokeThickness: 2, // Stroke thickness
        };
     gaText = scene.add.text(posX, posY, '', textStyle).setOrigin(0).setDepth(9);
          gaText.setInteractive();
        // negGaText = scene.add.text(negX, negY, firstWordPair.negGa, textStyle).setOrigin(0).setDepth(9);
        
        
        
        // Create heart sprites representing game lives
        for (let i = 0; i < hearts; i++) {
            const heartX = 20 + i * 30;
            const heartY = 20;
            const heartSprite = scene.add.sprite(heartX, heartY, 'heart').setScale(0.2).setOrigin(0,0).setDepth(9);
            heartSprites.push(heartSprite); // Add heart sprite to array
        }
    
        // Add puca and player
    
        // Add puca and player to the board container
        const playerSquareRow = 4; // Adjust the row of the player's square
        const playerSquareCol = 4; // Adjust the column of the player's square
    
        // Calculate the player's position with respect to the board
        const playerX = playerSquareCol * squareSize +32;
        const playerY = playerSquareRow * squareSize+ 32;
        const player = scene.add.image(playerX, playerY, 'player').setScale(1.5).setOrigin(0.5, 0.5);
        boardContainer.add(player);
        player.rotation = -Math.PI / 4;
    // Add puca and player to the board container
    const pucaBlackSquareRow =2; // Adjust the row of the left puca's square
    const pucaBlackSquareCol = 3; // Adjust the column of the left puca's square
    const pucaBlackX = pucaBlackSquareCol * squareSize+16;
    const pucaBlackY = pucaBlackSquareRow * squareSize+16;
    const pucaBlack = scene.add.image(pucaBlackX, pucaBlackY, 'pucaBlack').setScale(0.35).setOrigin(0.5, 0.5);
    boardContainer.add(pucaBlack);

    const pucaWhiteSquareRow = 3; // Adjust the row of the right puca's square
    const pucaWhiteSquareCol = 2; // Adjust the column of the right puca's square
    const pucaWhiteX = pucaWhiteSquareCol * squareSize+16;
    const pucaWhiteY = pucaWhiteSquareRow * squareSize+16;
    const pucaWhite = scene.add.image(pucaWhiteX, pucaWhiteY, 'pucaWhite').setScale(0.35).setOrigin(0.5, 0.5);
    pucaBlack.rotation = -Math.PI / 4;
    pucaWhite.rotation = -Math.PI / 4;
    boardContainer.add(pucaWhite);

        // Center the camera on the middle of the screen
        // scene.cameras.main.scrollX = boardContainer.x - (scene.cameras.main.width / 2);
        // scene.cameras.main.scrollY = boardContainer.y - (scene.cameras.main.height / 2);
 
     // Add click event to the button
     aBtn.on('pointerdown', () => {
      
              // Determine whether the correct puca was highlighted when the button was clicked
              const isCorrectPucaHighlighted = (highlightedPuca === 1); // Assuming puca1 is correct, change accordingly
        
              if (isCorrectPucaHighlighted) {
                  // Player pressed the button when the correct puca was highlighted
                  console.log('Correct puca highlighted!');
              } else {
                  // Player pressed the button when the wrong puca was highlighted
                  console.log('Wrong puca highlighted!');
              }
              moveOnToNextWordPair() 
      
    });
 

      // Start the timer to switch between puca highlights every 2 seconds
      timerEvent = scene.time.addEvent({ delay: 2000, callback: switchHighlightedPuca, callbackScope: this, loop: true });


    
      function switchHighlightedPuca() {
        highlightedPuca = (highlightedPuca + 1) % 2; // Toggle between 0 and 1
        // Highlight puca0 or puca1 based on the value of highlightedPuca
        if (highlightedPuca === 0) {
            // Highlight puca0
            pucaBlack.setAlpha(0.1); // Reduce opacity for the other 
            pucaWhite.setAlpha(1);
            
        } else {
            // Highlight puca1
            pucaWhite.setAlpha(0.1); // Reduce opacity for the other 
                  // Highlight puca1
                  pucaBlack.setAlpha(1);
        }
    }

 // Define the position of the directional pad buttons
 const buttonX = this.sys.game.config.width - 100; // Right side of the screen
 const buttonY = this.sys.game.config.height / 2 + 100;
      
    this.buttonLeft = this.add.sprite(buttonX - 50, buttonY, 'button-left').setInteractive().setDepth(9);
    this.buttonDown = this.add.sprite(buttonX, buttonY + 50, 'button-down').setInteractive().setDepth(9);
    this.buttonRight = this.add.sprite(buttonX + 50, buttonY, 'button-right').setInteractive().setDepth(9);
    this.buttonUp = this.add.sprite(buttonX, buttonY - 50, 'button-up').setInteractive().setDepth(9);
    // Add the button to the overlay and hide it initially
    // const buttonG = this.add.sprite(buttonX - 50, buttonY, 'pad-g').setInteractive().setVisible(false).setDepth(5);
    // this.buttonG = buttonG; // Store the button as a class member

    // Add middle button
    this.buttonMiddle = this.add.sprite(buttonX, buttonY, 'button-middle').setInteractive().setDepth(9);
    

   // Set up event listeners for button clicks
   this.buttonMiddle.on('pointerdown', () => this.toggleOverlay());



   // Define behavior for pointer events (e.g., hover, click)
   this.buttonMiddle.on('pointerover', () => {
       // Change the button texture to the lit state image when hovered
       this.buttonMiddle.setTexture('button-middle-lit');
       setTimeout(() => {
           this.buttonMiddle.setTexture('button-middle');
   },500);});


   this.buttonMiddle.on('pointerout', () => {
       // Change the button texture back to the normal state image when not hovered
       setTimeout(() => {
           this.buttonMiddle.setTexture('button-middle');
   },500);});





   this.buttonUp.on('pointerdown', () => this.moveElement('up'));
   this.buttonDown.on('pointerdown', () => this.moveElement('down'));
   this.buttonLeft.on('pointerdown', () => this.moveElement('left'));
   this.buttonRight.on('pointerdown', () => this.moveElement('right'));
// Add the image
// Add the image
const circleFrame = this.add.image(0, 0, 'circle9').setOrigin(0).setDepth(2);

// Calculate scale to cover the entire screen without distortion
const c9scaleX = this.sys.game.config.width / circleFrame.width;
const c9scaleY = this.sys.game.config.height / circleFrame.height;
const c9scale = Math.max(c9scaleX, c9scaleY); // Use Math.max instead of Math.min

// Zoom in the image (adjust the scale factor as needed)
const zoomFactor = 0.6;
const scaledWidth = circleFrame.width * zoomFactor;
const scaledHeight = circleFrame.height * zoomFactor;
const c9scaleZoomedX = this.sys.game.config.width / scaledWidth;
const c9scaleZoomedY = this.sys.game.config.height / scaledHeight;
const c9scaleZoomed = Math.max(c9scaleZoomedX, c9scaleZoomedY);

// Set the scale of the image to cover the entire screen while maintaining aspect ratio
circleFrame.setScale(c9scaleZoomed).setScrollFactor(0);

// Center the circular frame horizontally and vertically on the screen
const c9posX = (this.sys.game.config.width - circleFrame.displayWidth) / 2;
const c9posY = (this.sys.game.config.height - circleFrame.displayHeight) / 2;
circleFrame.setPosition(c9posX, c9posY);

function create() {
    const scene = this;
    const aBtn = scene.add.sprite(100, scene.cameras.main.height -50, 'aBtn').setDepth(11);
    // aBtn.alpha = 0.5;

    aBtn.setInteractive(); // Make the button interactive

    // Create the chessboard
    const boardSize = 10; // Adjust as needed
    const squareSize = scene.scale.width / boardSize;
    const boardCenterX = scene.scale.width / 2;
    const boardCenterY = scene.scale.height / 2;
    const boardOffsetX = squareSize * boardSize / 2;
    const boardOffsetY = squareSize * boardSize / 2;

    // Container for the entire board
    const boardContainer = scene.add.container(boardCenterX - boardOffsetX, boardCenterY - boardOffsetY);


    // Rotate the board container 45 degrees (converted to radians)
    boardContainer.rotation = Math.PI / 4;
    boardContainer.x += 400;
    boardContainer.y += 100;
    boardContainer.setScale(0.75)

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const squareColor = (row + col) % 2 === 0 ? 0x2E8B57 : 0xD3D3D3;
            const square = scene.add.rectangle(col * squareSize, row * squareSize, squareSize, squareSize, squareColor);
            square.setOrigin(0);
            square.setData('row', row);
            square.setData('col', col);
            boardContainer.add(square);
        }
    }

    // Other elements
    const firstWordPair = wordPairs[0];

    const posX = 270;
    const posY = 180;
    const negX = 300;
    const negY = 100;
    const textStyle = {
        fontSize: '6em',
        fontFamily: 'aonchlo',
        color: '#ffffff',
        stroke: '#000000', // Stroke color
        strokeThickness: 2, // Stroke thickness
    };
    
  

    // Create heart sprites representing game lives
    for (let i = 0; i < hearts; i++) {
        const heartX = 20 + i * 30;
        const heartY = 20;
        const heartSprite = scene.add.sprite(heartX, heartY, 'heart').setScale(0.2).setOrigin(0,0).setDepth(9);
        heartSprites.push(heartSprite); // Add heart sprite to array
    }

    // Add puca and player

    // Add puca and player to the board container
    const playerSquareRow = 4; // Adjust the row of the player's square
    const playerSquareCol = 4; // Adjust the column of the player's square

    // Calculate the player's position with respect to the board
    const playerX = playerSquareCol * squareSize +32;
    const playerY = playerSquareRow * squareSize+ 32;
    const player = scene.add.image(playerX, playerY, 'player').setScale(1.5).setOrigin(0.5, 0.5);
    boardContainer.add(player);
    player.rotation = -Math.PI / 4;

    // Add puca and player to the board container
    const pucaBlackSquareRow =2; // Adjust the row of the left puca's square
    const pucaBlackSquareCol = 3; // Adjust the column of the left puca's square
    const pucaBlackX = pucaBlackSquareCol * squareSize+16;
    const pucaBlackY = pucaBlackSquareRow * squareSize+16;
    const pucaBlack = scene.add.image(pucaBlackX, pucaBlackY, 'pucaBlack').setScale(0.35).setOrigin(0.5, 0.5);
    boardContainer.add(pucaBlack);

    const pucaWhiteSquareRow = 3; // Adjust the row of the right puca's square
    const pucaWhiteSquareCol = 2; // Adjust the column of the right puca's square
    const pucaWhiteX = pucaWhiteSquareCol * squareSize+16;
    const pucaWhiteY = pucaWhiteSquareRow * squareSize+16;
    const pucaWhite = scene.add.image(pucaWhiteX, pucaWhiteY, 'pucaWhite').setScale(0.35).setOrigin(0.5, 0.5);
    pucaBlack.rotation = -Math.PI / 4;
    pucaWhite.rotation = -Math.PI / 4;
    boardContainer.add(pucaWhite);

    // Center the camera on the middle of the screen
// Add click event to the button
// Add click event to the button
aBtn.on('pointerdown', () => {
    // Determine randomly whether to display positive or negative text
    const showPositive = Math.random() > 0.5;

    // Update the text based on the random selection
    if (showPositive) {
        gaText.setText(wordPairs[currentWordPairIndex].posGa);
    } else {
        gaText.setText(wordPairs[currentWordPairIndex].negGa);
    }
});


    // Start the timer to switch between puca highlights every 2 seconds
    timerEvent = scene.time.addEvent({ delay: 2000, callback: switchHighlightedPuca, callbackScope: this, loop: true });

}
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

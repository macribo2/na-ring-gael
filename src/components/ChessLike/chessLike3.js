import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import './chess-like.css';
import knightRounds from './knightRounds'; // Assuming knightRounds.js is in the same directory
import geaga1 from '../../images/geaga-1.png'; // Assuming knightRounds.js is in the same directory
import portrait from '../../images/port-swd.png'

import NavCD from '../navCD/navCD';


function PhaserGame(){
  const [highlightedSquares, setHighlightedSquares] = React.useState([]);
const [player, setPlayer] = React.useState(null);
const [puca, setPuca] = React.useState(null);

    let  gaText, enText;

    
    let currentWordPairIndex = 0;
    let hearts = 3;
    const heartSprites = []; // Array to store heart sprites
    const phaserGameRef = useRef(null);
    let highlightedPuca = 0; // Tracks which puca is currently highlighted (0 or 1)
    let timerEvent; // Timer event for switching between puca highlights
    let score = 0;
    
    
    let gaTextRef = useRef(null);
    let enTextRef = useRef(null);
    
    
    // Create the overlay container
    let overlay;
    const [message, setMessage] = useState("");

    const [fullscreen, setFullscreen] = useState(false);
    const displayMessage = (message) => {
        setMessage(message);
    
        // Hide the message after 3 seconds
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    
    const toggleFullscreen = () => {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            const elem = document.documentElement;
            const fullscreenPromise = elem.requestFullscreen ? elem.requestFullscreen() : elem.webkitRequestFullscreen(); // Safari
            fullscreenPromise.then(() => {
                setFullscreen(true);
            });
        } else {
            const exitPromise = document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen(); // Safari
            exitPromise.then(() => {
                setFullscreen(false);
            });
        }
    };
    
    
    //   overlay.setVisible(false); // Initially hide the overlay
    function moveOnToNextWordPair() {
        currentWordPairIndex++;
        console.log('Moving to next word pair. Index:', currentWordPairIndex);
        
        if (currentWordPairIndex < knightRounds.length) {
            const nextWordPair = knightRounds[currentWordPairIndex];
            gaText.setAlpha(0);
            enText.setAlpha(0);
            // Determine randomly whether to display positive or negative text
            const showPositive = Math.random() > 0.5;
    
            // Update the text based on the random selection
            if (showPositive) {
                gaText.setAlpha(0);
                enText.setAlpha(0);
                setTimeout(()=>{
                    gaText.setText(nextWordPair.posGa);
                    enText.setText(nextWordPair.posEn);
                    gaText.setAlpha(1);
enText.setAlpha(1);
                },500)
            } else {

                gaText.setText(nextWordPair.negGa);
                enText.setText(nextWordPair.negEn);
                setTimeout(()=>{
                    gaText.setAlpha(1);
enText.setAlpha(1);
                },500)

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
                    // Add additional scenes here
    NavCD: NavCD
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
    this.load.image(
        "puca-mounted",
        "/phaser-resources/images/npcs/pookaMounted.png",
      );                           
    this.load.image('tallBg', './phaser-resources/images/background-elements/level2.png');

    this.load.image('glassbg', './phaser-resources/images/big-glass.png');

    this.load.image('overlay', './phaser-resources/images/overlay.png'); // Load overlay image

        this.load.audio('fanfare', 'phaser-resources/audio/fanfare.ogg');
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
        this.load.image('pookaSq01', './phaser-resources/images/ui/pookaSQ01.png');
      
        this.load.image('player', `./phaser-resources/images/champions/${champID}.png`);
    }




    let isSceneLaunched = false;
function create() {

    console.log("Scene created");

    // Other initialization code...

    // Initialize overlay container
    this.overlay = this.add.container(0, 0).setDepth(3);
    this.overlay.setVisible(false); // Initially hide the overlay
    const glassbg = this.add.sprite(0, 0, 'glassbg').setOrigin(0);
    glassbg.displayWidth = this.sys.game.config.width;
    glassbg.displayHeight = this.sys.game.config.height;
    this.overlay.add(glassbg);

    const enTextStyle = {
        fontSize: '4em',
        fontFamily: 'anaphora',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 3,
    };

    this.enText = this.add.text(0, 0, 'English Text', enTextStyle).setOrigin(0).setDepth(9);
    this.overlay.add(this.enText);

    // Add middle button
    this.buttonMiddle = this.add
        .sprite(-500, -500, "button-middle")
        .setDepth(20)
        .setInteractive()
        .on("pointerdown", () => {
            if (!this.isToggling) { // Check if not already toggling
                this.isToggling = true; // Set flag to true
                this.toggleOverlay(); // Call the toggleOverlay method
            }
        });

    // Define behavior for pointer events (e.g., hover)
    this.buttonMiddle.on('pointerover', () => {
        this.buttonMiddle.setTexture('button-middle-lit');
        setTimeout(() => {
            this.buttonMiddle.setTexture('button-middle');
        }, 500);
    });

    const scene = this;
    // Calculate the center of the screen
    const centerX = scene.cameras.main.width / 2;
    const centerY = scene.cameras.main.height / 2;


    let    gameWidth = this.sys.game.config.width + 100;
    let    gameHeight = this.sys.game.config.height + 100;
    
       overlay = this.add.container(0, 0);
    overlay.setVisible(false); // Initially hide the overlay
        

   
    glassbg.displayWidth = gameWidth;
glassbg.displayHeight = gameHeight;
  overlay.add(glassbg).setDepth(3);


        glassbg.setAlpha(0.9).setDepth(15);
        // this.overlay.add(glassbg).setDepth(3);
        const aBtn = scene.add.sprite(100, scene.cameras.main.height -50, 'aBtn').setDepth(11);
        // aBtn.alpha = 0.5;
        // overlay.setVisible(false); // Initially hide the overlay
        overlay.add(glassbg);

        aBtn.setInteractive(); // Make the button interactive
        
        // Create the chessboard
        
        // Other elements
        const firstWordPair = knightRounds[0];
        
        const posX = scene.sys.game.config.width / 2;
        const posY = scene.sys.game.config.height / 2;
        const negX = 300;
        const negY = 100;
        const textStyle = {
            fontSize: '6em',
            fontFamily: 'aonchlo',
            color: '#ffffff',
            stroke: '#000000', // Stroke color
            strokeThickness: 3, // Stroke thickness
        };

        enText = scene.add.text(posX-64, posY+100, '', enTextStyle).setOrigin(0).setDepth(9);
        
                gaText = scene.add.text(posX, posY, '', textStyle).setOrigin(0.5).setDepth(9);

// Add enText to the overlay container
overlay.add(enText);
        //   gaText.setInteractive();
        // negGaText = scene.add.text(negX, negY, firstWordPair.negGa, textStyle).setOrigin(0).setDepth(9);
        
        
        
        // Create heart sprites representing game lives
        for (let i = 0; i < hearts; i++) {
            const heartX = 20 + i * 30;
            const heartY = 20;
            const heartSprite = scene.add.sprite(heartX+30, heartY, 'heart').setScale(0.2).setOrigin(0,0).setDepth(9);
            heartSprites.push(heartSprite); // Add heart sprite to array
        }
        
        // Add puca and player
        // const player = scene.add.image(centerX, centerY + 64, 'player').setScale(1.5).setOrigin(0.5, 0.5).setDepth(5);
        
        this.puca = this.add.sprite(centerX, centerY, "puca-mounted");
        this.puca.setDepth(921);
        this.puca.setScale(0.3);
        this.puca.setOrigin(0.7, 0.4);
     
        this.player = this.add.sprite(centerX, centerY, "player");
        this.player.setDepth(920);
        this.player.setScale(1.3);
        this.player.setOrigin(0.5, 0.5);
     
scene.cameras.main.scrollY = 0;


const squares = {
    pookaSq001: this.add.image(centerX + 96, centerY - 32, 'pookaSq01').setScale(0.35).setDepth(5),
    pookaSq010: this.add.image(centerX + 96, centerY + 32, 'pookaSq01').setScale(0.35).setDepth(5),
    pookaSq011: this.add.image(centerX - 96, centerY - 32, 'pookaSq01').setScale(0.35).setDepth(5),
    pookaSq100: this.add.image(centerX - 96, centerY + 32, 'pookaSq01').setScale(0.35).setDepth(5),
    pookaSq101: this.add.image(centerX + 32, centerY + 96, 'pookaSq01').setScale(0.35).setDepth(5),
    pookaSq110: this.add.image(centerX + 32, centerY - 96, 'pookaSq01').setScale(0.35).setDepth(5),
    pookaSq111: this.add.image(centerX - 32, centerY + 96, 'pookaSq01').setScale(0.35).setDepth(5),
    pookaSq000: this.add.image(centerX - 32, centerY - 96, 'pookaSq01').setScale(0.35).setDepth(5)
};


const movePlayerAndPuca = (targetX, targetY) => {
    // Move the puca and player to the new position
    this.puca.setPosition(targetX, targetY);
    this.player.setPosition(targetX, targetY);

    // Call the function to update possible moves
    updatePossibleMoves(targetX, targetY);

    // Fade out all squares
    fadeOutSquare();
};


// Function to fade out the specified square
const fadeOutSquare = (scene, square) => {
    if (square) { // Check if the square is defined
        scene.tweens.add({
            targets: square,  // The element you want to fade out
            alpha: 0,         // Fade to fully transparent
            duration: 500,    // Duration of the fade-out in milliseconds
            ease: 'Linear',   // Easing function for smooth transition
            onComplete: () => {
                square.setVisible(false); // Optional: Hide the square after fade-out
            }
        });
    }
};

// Define squares object to store square references
scene.squares = {};

// Assuming these squares are defined somewhere in your code
scene.squares.pookaSq000 = scene.add.image(centerX - 32, centerY - 96, 'pookaSq01').setScale(0.35).setOrigin(0.5, 0.5).setDepth(5).setInteractive();
scene.squares.pookaSq001 = scene.add.image(centerX + 96, centerY - 32, 'pookaSq01').setScale(0.35).setOrigin(0.5, 0.5).setDepth(5).setInteractive();
// ... define other squares similarly

// Add event listeners to the squares
Object.entries(squares).forEach(([key, square]) => {
    if (square) {
        square.setInteractive();
        square.on('pointerdown', () => {
            movePlayerAndPuca.call(this, square.x, square.y);
        });
    }
});

// Function to fade out all squares
const fadeOutAllSquares = () => {
    Object.values(squares).forEach(square => {
        if (square) {
            this.tweens.add({
                targets: square,
                alpha: 0,              // Fade to fully transparent
                duration: 500,         // Duration of the fade-out in milliseconds
                ease: 'Linear',        // Easing function for smooth transition
                onComplete: () => {
                    square.setVisible(false); // Optional: hide or destroy the square after fade-out
                }
            });
        }
    });
};

// Function to update possible moves
const updatePossibleMoves = (playerX, playerY) => {
    squares.pookaSq001.setPosition(playerX + 96, playerY - 32);
    squares.pookaSq010.setPosition(playerX + 96, playerY + 32);
    squares.pookaSq011.setPosition(playerX - 96, playerY - 32);
    squares.pookaSq100.setPosition(playerX - 96, playerY + 32);
    squares.pookaSq101.setPosition(playerX + 32, playerY + 96);
    squares.pookaSq110.setPosition(playerX + 32, playerY - 96);
    squares.pookaSq111.setPosition(playerX - 32, playerY + 96);
    squares.pookaSq000.setPosition(playerX - 32, playerY - 96);
};


    
    let isProcessing = false; // Flag to indicate whether the function is already in progress
    
    // Start the timer to switch between puca highlights every 2 seconds
    timerEvent = scene.time.addEvent({ delay: 2000, callback: switchHighlightedPuca, callbackScope: this, loop: true });
    
// Function to switch between puca highlights
function switchHighlightedPuca() {
    
}
    // Define the position of the directional pad buttons
    const buttonX = this.sys.game.config.width - 100; // Right side of the screen
    const buttonY = this.sys.game.config.height / 2 + 200;
    
    this.buttonLeft = this.add.sprite(buttonX - 50, buttonY, 'button-left').setInteractive().setDepth(9);
    this.buttonDown = this.add.sprite(buttonX, buttonY + 50, 'button-down').setInteractive().setDepth(9);
    this.buttonRight = this.add.sprite(buttonX + 50, buttonY, 'button-right').setInteractive().setDepth(9);
    this.buttonUp = this.add.sprite(buttonX, buttonY - 50, 'button-up').setInteractive().setDepth(9);
   
    let isManuallySettingPuca = false; // Flag to indicate whether puca highlighting is being manually set

    // Add event listener to the left button
    this.buttonLeft.on('pointerdown', () => {
        if (!isManuallySettingPuca) {
             isManuallySettingPuca = true;
           
            if (timerEvent) {
                timerEvent.remove(false);
            }
            
            // Schedule a delayed call to switch the highlighted puca back after 2 seconds
            scene.time.delayedCall(10, () => {
                // Revert to alternating puca highlights after 2 seconds
                timerEvent = scene.time.addEvent({ delay: 2000, callback: switchHighlightedPuca, callbackScope: this, loop: true });
                // Reset the flag to indicate that puca highlighting is no longer being manually set
                isManuallySettingPuca = false;
            });
        }
    });
 
    
    // Add event listener to the left button
    this.buttonDown.on('pointerdown', () => {
        if (!isManuallySettingPuca) {
            // Set the flag to indicate that puca highlighting is being manually set
            isManuallySettingPuca = true;
            
            // Set highlightedPuca to 1 to indicate the white puca
            highlightedPuca = 1;
            
            // Update puca transparency based on highlightedPuca
            // pookaSq01.setAlpha(highlightedPuca === 0 ? 1 : 0.1);
            // pucaWhite.setAlpha(highlightedPuca === 1 ? 1 : 0.1);
            
            // Clear the existing timer event to prevent jitteriness
            if (timerEvent) {
                timerEvent.remove(false);
            }
            
            // Schedule a delayed call to switch the highlighted puca back after 2 seconds
            scene.time.delayedCall(10, () => {
                // Revert to alternating puca highlights after 2 seconds
                timerEvent = scene.time.addEvent({ delay: 2000, callback: switchHighlightedPuca, callbackScope: this, loop: true });
                // Reset the flag to indicate that puca highlighting is no longer being manually set
                isManuallySettingPuca = false;
            });
        }
    });
 
    // Add event listener to the left button
    this.buttonUp.on('pointerdown', () => {
        if (!isManuallySettingPuca) {
            // Set the flag to indicate that puca highlighting is being manually set
            isManuallySettingPuca = true;
            
            // Set highlightedPuca to 1 to indicate the white puca
            highlightedPuca = 0;
            
            // Update puca transparency based on highlightedPuca
            // pookaSq01.setAlpha(highlightedPuca ===  0 ? 1 : 0.1);
            // pucaWhite.setAlpha(highlightedPuca === 1 ? 1 : 0.1);
            
            // Clear the existing timer event to prevent jitteriness
            if (timerEvent) {
                timerEvent.remove(false);
            }
            
            // Schedule a delayed call to switch the highlighted puca back after 2 seconds
            scene.time.delayedCall(10, () => {
                // Revert to alternating puca highlights after 2 seconds
                timerEvent = scene.time.addEvent({ delay: 2000, callback: switchHighlightedPuca, callbackScope: this, loop: true });
                // Reset the flag to indicate that puca highlighting is no longer being manually set
                isManuallySettingPuca = false;
            });
        }
    });
 
   // Add event listener to the left button
   this.buttonRight.on('pointerdown', () => {
    if (!isManuallySettingPuca) {

        // Set the flag to indicate that puca highlighting is being manually set
        isManuallySettingPuca = true;
        
        // Set highlightedPuca to 1 to indicate the white puca
        highlightedPuca = 0;
        
        // Update puca transparency based on highlightedPuca
        // pookaSq01.setAlpha(highlightedPuca === 0 ? 1 : 0.1);
        // pucaWhite.setAlpha(highlightedPuca === 1 ? 1 : 0.1);
        
        // Clear the existing timer event to prevent jitteriness
        if (timerEvent) {
            timerEvent.remove(false);
        }
        
        // Schedule a delayed call to switch the highlighted puca back after 2 seconds
        scene.time.delayedCall(10, () => {
            // Revert to alternating puca highlights after 2 seconds
            timerEvent = scene.time.addEvent({ delay: 2000, callback: switchHighlightedPuca, callbackScope: this, loop: true });
            // Reset the flag to indicate that puca highlighting is no longer being manually set
            isManuallySettingPuca = false;
        });
    }
});

    let isToggling = false; // Flag to track if overlay is currently toggling

    // Add middle button
    this.buttonMiddle = this.add.sprite(buttonX, buttonY, 'button-middle').setInteractive().setDepth(20);
    
    
    
// Set up event listener for button clicks
this.buttonMiddle.on('pointerdown', () => {
    if (!isToggling) { // Check if not already toggling
        isToggling = true; // Set flag to true
        toggleOverlay();
    }
});
    
    // Define behavior for pointer events (e.g., hover, click)
    this.buttonMiddle.on('pointerover', () => {
        // Change the button texture to the lit state image when hovered
        this.buttonMiddle.setTexture('button-middle-lit');
        setTimeout(() => {
            this.buttonMiddle.setTexture('button-middle');
        },500);});



function toggleOverlay() {
    if (overlay !== null && overlay !== undefined) {
        overlay.setVisible(!overlay.visible);
        setTimeout(()=>{
            isToggling=false;
        },200)
    }
}
        this.buttonMiddle.on('pointerout', () => {
            // Change the button texture back to the normal state image when not hovered
            setTimeout(() => {
                this.buttonMiddle.setTexture('button-middle');
            },500);});
            
            
            
            
                    aBtn.on('pointerdown', () => {
                       
                        highlightedPuca = 1;
                    console.log("highlightedPuca: " + highlightedPuca)
                        if (!isProcessing) { // Check if the function is already in progress
                            isProcessing = true; // Set flag to true while processing
                    
                            // Determine whether the correct puca was highlighted when the button was clicked
                            const isPosDisplayed = gaText.text === knightRounds[currentWordPairIndex].posGa;
                    
                            if (highlightedPuca === 0 && isPosDisplayed) {
                                // Player pressed the button when the correct puca was highlighted and the displayed word is positive
                                console.log('Correct puca highlighted and positive word displayed!');
                                // Increment score, if you're tracking it
                    handleRightAnswer(scene)

                                // score++;
                                moveOnToNextWordPair();
                            } else if (highlightedPuca === 1 && !isPosDisplayed) {
                                // Player pressed the button when the correct puca was highlighted and the displayed word is negative
                                console.log('Correct puca highlighted and negative word displayed!');
                                // Increment score, if you're tracking it
                                // score++;
                    handleRightAnswer(scene)
                    console.log("highlightedPuca: " + highlightedPuca)
            
                                moveOnToNextWordPair();
                    console.log("highlightedPuca: " + highlightedPuca)

                            } else {
                                // Player pressed the button when the wrong puca was highlighted or the displayed word is incorrect
                                console.log('Wrong puca highlighted or incorrect word displayed!');
                                setTimeout(() => {
                                    handleWrongAnswer(scene);
                    console.log("highlightedPuca: " + highlightedPuca)

                                }, 500);
                            }
                    
                            // Reset flag after a short delay to allow next touch
                            setTimeout(() => {
                                isProcessing = false;
                            }, 500);
                        }
                    });
            
// Add the image
// const circleFrame = this.add.image(0, 0, 'circle9').setOrigin(0).setDepth(2);

// Calculate scale to cover the entire screen without distortion
// const c9scaleX = this.sys.game.config.width / circleFrame.width;
// const c9scaleY = this.sys.game.config.height / circleFrame.height;
// const c9scale = Math.max(c9scaleX, c9scaleY); // Use Math.max instead of Math.min

// Zoom in the image (adjust the scale factor as needed)
const zoomFactor = 0.6;
// const scaledWidth = circleFrame.width * zoomFactor;
// const scaledHeight = circleFrame.height * zoomFactor;
// const c9scaleZoomedX = this.sys.game.config.width / scaledWidth;
// const c9scaleZoomedY = this.sys.game.config.height / scaledHeight;
// const c9scaleZoomed = Math.max(c9scaleZoomedX, c9scaleZoomedY);

// Set the scale of the image to cover the entire screen while maintaining aspect ratio
// circleFrame.setScale(c9scaleZoomed).setScrollFactor(0);

// Center the circular frame horizontally and vertically on the screen
// const c9posX = (this.sys.game.config.width - circleFrame.displayWidth) / 2;
// const c9posY = (this.sys.game.config.height - circleFrame.displayHeight) / 2;
// circleFrame.setPosition(c9posX, c9posY);






// Create the image layer
const tallBg = scene.add.image(centerX, scene.cameras.main.height-10, 'tallBg').setOrigin(0.50, 1).setScale(1.5).setDepth(-1);


// Animate the image layer to slide down the screen
function slideDownImageLayer(scene) {
    // pookaSq01.setAlpha(0);
    // pucaWhite.setAlpha(0);
    
        scene.tweens.add({
            targets: tallBg,
            y: tallBg.y + 128, // Move down by the height of 3 board squares
            duration: 700, // Adjust the duration as needed
            ease: 'Linear',
            onComplete: () => {
                // Animation complete
            }
        });
    setTimeout(()=>{

},800)}


function handleWrongAnswer(scene) {
    hearts--;

// 
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
    console.log("highlightedPuca: " + highlightedPuca)
    
}






function handleRightAnswer(scene) {
    slideDownImageLayer(scene);
    
    scene.sound.play('fanfare');
    
    // Increment the score
    score++;
    
    // Create the "ceart!" text object
    const ceartText = scene.add.text(100, 100, 'ceart!', { fontFamily: 'aonchlo', fontSize: 24, color: '#ffffff' }).setOrigin(0.5).setDepth(20);
    console.log("highlightedPuca inside handle right answer: " + highlightedPuca);
    
    // Tween the text object to simulate floating
    scene.tweens.add({
        targets: ceartText,
        y: ceartText.y - 50, // Float upwards by 50 pixels
        alpha: 0, // Fade out
        duration: 1000, // 1 second duration
        ease: 'Linear',
        onComplete: () => {
            // Remove the text object when the tween is complete
            ceartText.destroy();
        }
    });
    
    // Verify conditions before launching the scene
    console.log("Score: " + score);
    console.log("isSceneLaunched: " + isSceneLaunched);
    

}

      
}//close  create()

let latestTarget = 5;
function update(scene) {

//try 25
    if (score >= latestTarget && !isSceneLaunched) {
        latestTarget ++;
        this.scene.add('NavCD', NavCD);
        // Launch the desired scene
   
   
        this.scene.launch('NavCD');
        // Set the flag to true to prevent launching the scene multiple times
        isSceneLaunched = true;
        console.log("Scene launched!");
    } else {
        console.log("Conditions not met for launching scene.");
    }
}
    
    

    return(

        <>
       
<div className='chess-like-1' ref={phaserGameRef}></div>




            {fullscreen && <div className="fullscreen-overlay" onClick={toggleFullscreen}></div>}
            
            <div className="no-pointer-events">


<img id="landscape" rel="preload" src={ portrait}></img>

<div>
<div className="landscape-mode-text-container">

<p className="menu landscape-mode-txt swd-quote-1 ga">

Ná tarraing mi gun adhbhar,
<br/>'s ná pill mi gun chliú  
</p>
<br/>
<p className="menu landscape-mode-txt swd-quote-2 en">

Draw me not <br/>without cause,
<br/>
nor return me <br/>without honor.
</p>
</div>

</div>
</div>


{!fullscreen && (
<>
                <img
                    src={geaga1}
                    alt="foggy fields"
                    className="fullscreen-image"
                    onClick={toggleFullscreen}
                    />
                    <div className='touch-prompt-container'>
<div className='touch-prompt'></div>
<div className='touch-prompt'></div></div>
                    </>
            )}

            </>


    ) 

};

export default PhaserGame;

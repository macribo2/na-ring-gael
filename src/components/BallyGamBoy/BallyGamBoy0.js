import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import molly from '../../images/draoi0.gif'
import Easca from '../easca/easca2';
import './bally.css';
import { useHistory } from 'react-router-dom';


// let glassTextA = [
//     `Translations and comments go here. json soon. This is glassTextA[0]`,
// ];
const BallyGamboyGame = () => {
    
    
    let championName = localStorage.getItem('championName');
    const gameRef = useRef(null);
    const [showEasca, setShowEasca] = useState(false); // State to control visibility of Easca component
    
    useEffect(() => {
        const initializeGame = () => {
            const config = {
                type: Phaser.AUTO,
                width: window.innerWidth, // Set width to match the browser window width
                height: window.innerHeight, // Set height to match the browser window height
                scene: [GameScene],
                parent: 'ballygamboy-game-container'
            };
            
            gameRef.current = new Phaser.Game(config);
        };
        
        initializeGame();
        
        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
            }
        };
    }, []); 
    const toggleOverlay = () => {
        setShowEasca(!showEasca); // Toggle the visibility state
        
    };

    return (
        <>
            <div id="ballygamboy-game-container"></div>;
            <div className="chess-like-frame-container">
                 <img src={molly} className="molly hidden" alt="black molly" /> 
                {championName && <div className="question-text county-text">Cad a feiceann<br /> {championName}?</div>}
            </div>
            <div style={{fontFamily:"anaphora", position: "absolute", left:"-1000px", visibility:"hidden"}}>.</div>

            <div style={{fontFamily:"aonchlo", position: "absolute", left:"-1000px", visibility:"hidden"}}>.</div>
            {showEasca && <Easca />}
        </>
    );
};

class GameScene extends Phaser.Scene {
    
    constructor() {
    
        super({ key: 'GameScene' });
        this.bally0map = null;
        this.bgOverlay = null;
        this.playerMapLocationTracker = 0; // Start at location 1
        this.mapLocations = {
            0: { x: 0.35, y: 0.43 },
            1: { x: 0.43, y: 0.54 },
            2: { x: 0.60, y: 0.54 },
            3: { x: 0.64, y: 0.40},
            4: { x: 0.67, y: 0.40},
            5: { x: 0.67, y: 0.40},
        };
        this.textGa = null; // Initialize textGa and textEn as class properties
        this.textEn = null;
        this.dialogues = [];
    
    }
  // Function to disable movement controls
 disableMovementControls() {
    this.movementControlsEnabled = false;
}

// Function to enable movement controls
 enableMovementControls() {
    this.movementControlsEnabled = true;
}

 
    preload() {

        // Load assets
        // this.load.plugin('aonchlo', './phaser-resources/fonts/aonchlo.ttf');
        
        this.load.json('dialogues', './phaser-resources/text/dialogues.json');
        this.load.audio('rabbitTown', './phaser-resources/audio/rabbitTown.ogg');
        let champID = localStorage.getItem('champID');
        this.load.image('player', `./phaser-resources/images/champions/${champID}.png`);
        this.load.image('background', './phaser-resources/images/24c.png');
        this.load.image('glassbg0', './phaser-resources/images/big-glass.png');
        this.load.image('greenRingLeft', './phaser-resources/images/ciorcal-glass8.png');
        this.load.image('button-up', './phaser-resources/images/ui/pad-u.png');
        this.load.image('button-down', './phaser-resources/images/ui/pad-d.png');
        this.load.image('button-left', './phaser-resources/images/ui/pad-l.png');
        this.load.image('button-right', './phaser-resources/images/ui/pad-r.png');
        this.load.image('button-middle-lit', './phaser-resources/images/ui/middle-a.png');
        this.load.image('button-middle', './phaser-resources/images/ui/middle-b.png');
        this.load.image('pad-g', './phaser-resources/images/ui/pad-g.png');
        this.load.image('bally0map', './phaser-resources/images/map2.png');
        this.load.image('bgOverlay', './phaser-resources/images/map2-overlay.png');
        this.load.image('overlay', './phaser-resources/images/overlay.png'); // Load overlay image
        this.load.image('yinCard', './phaser-resources/images/cards/puca0.png'); // Load overlay image
        this.load.image('yanCard', './phaser-resources/images/cards/puca1.png'); // Load overlay image
    }

   
    updateText(playerMapLocationTracker) {
        // Retrieve the current dialogue based on the playerMapLocationTracker
        const dialogues = this.cache.json.get('dialogues');
        const currentDialogue = this.dialogues[playerMapLocationTracker];
        
        // Check if the currentDialogue is defined
        if (dialogues) {
        // alert(dialogues[0].text.ga)            // Get the text for the current dialogue
            
            // Update the textGa and textEn with the new dialogue text
            this.textGa.setText(dialogues[this.playerMapLocationTracker].text.ga);
            this.textEn.setText(dialogues[this.playerMapLocationTracker].text.en);
        } else {
        }
    }
    
    introduceNewElements() {
        const mollyElement = document.querySelector('.molly');
        if (mollyElement) {
            mollyElement.classList.add('hidden');
        } else {
        }
setTimeout(() => {

    // Add sprites for the playing cards

    this.yinCard = this.add.sprite(this.sys.game.config.width / 2 - 60, this.sys.game.config.height / 2,'yinCard').setDepth(7);
    this.yanCard = this.add.sprite(this.sys.game.config.width / 2 + 120, this.sys.game.config.height / 2, 'yanCard').setDepth(7);
// Inside the create() method or wherever you initialize your cards
this.yinCard.setInteractive();
this.yinCard.on('pointerdown', () => {
    // Handle click on yinCard
    handleCardClick(this.yinCard, this.yanCard);
    localStorage.setItem('chosenPuca', '1');
    setTimeout(() => {  window.location.href = 'https://www.na-ring-gael.com/pucaloic'; }, 2000);
    
});
const handleCardClick = (chosenCard, otherCard) => {

    this.tweens.add({
        targets: chosenCard,
        angle: 360,  // Rotate the card 360 degrees
        scale:1,
        x:this.sys.game.config.width / 2, 
        duration: 500,  // Duration of the animation
        onComplete: () => {
            this.textGa.setText("Ag Lódál...");
            this.textEn.setText("loading...");
            this.yinCard.setScale(1);
            this.yanCard.setScale(1);
            // Set the chosen card to invisible after the animation completes
            // chosenCard.setVisible(false);
        }
    });

        // Fade out the other card
        this.tweens.add({
            targets: otherCard,
            alpha: 0,  // Fade out the card
            duration: 500,  // Duration of the animation
            onComplete: () => {
                // Set the other card to invisible after the animation completes
                otherCard.setVisible(false);

            }
        });
           }   
this.yanCard.setInteractive();
this.yanCard.on('pointerdown', () => {
    // Handle click on yinCard
    handleCardClick(this.yanCard, this.yinCard);
    localStorage.setItem('chosenPuca', '0');
    setTimeout(() => {  window.location.href = 'https://www.na-ring-gael.com/pucaloic'; }, 2000);
    
});

    // Adjust the scale of the card sprites to make them smaller
    const cardScale = 0.4; // Adjust this value as needed
    this.yanCard.setScale(cardScale);
    this.yinCard.setScale(cardScale);
// Define the bobbing and scale in/out effect for the puca cards
const bobTween1 = this.tweens.add({
    targets: this.yinCard, // Replace this.yinCard with your first card sprite
    y: '-=15', // Move the card up slightly
    scaleX: 0.41, // Scale up horizontally
    scaleY: 0.41, // Scale up vertically
    duration: 1400, // Adjust the duration of the tween
    yoyo: true, // Repeat the tween in reverse
    repeat: -1 // Repeat indefinitely
});

// Define the bobbing and scale in/out effect for the second puca card with a slight delay
const bobTween2 = this.tweens.add({
    targets: this.yanCard, // Replace this.yanCard with your second card sprite
    y: '-=20', // Move the card up slightly
    scaleX: 0.41, // Scale up horizontally
    scaleY: 0.41, // Scale up vertically
    duration: 1400, // Adjust the duration of the tween
    delay: 350, // Delay the start of the tween for the second card
    yoyo: true, // Repeat the tween in reverse
    repeat: -1, // Repeat indefinitely

});

}, 500);
   

        // Play the entrance animation for the 'yinCard' with a delay
        this.time.delayedCall(600, () => {
            // Spin and fade-in animation for the 'yanCard'
            this.tweens.add({
                targets: this.yanCard,
                angle: 359,
                alpha: 1,
                duration: 1000,
                ease: 'Power2',
            });
            
            // Spin and fade-in animation for the 'yinCard'
            this.tweens.add({
                targets: this.yinCard,
                angle: 350,
                alpha: 1,
                duration: 1000,
                ease: 'Power2',
            });
        });
    

    }
    
    
    create() {

        
    // Define a boolean flag to track whether movement controls are enabled
 this.movementControlsEnabled = true;


        let  firstGaText;
        let  firstEnText;        
        // Get the dialogues data from the cache
        const dialogues = this.cache.json.get('dialogues');
        let textGa, textEn;
   if (dialogues) {
       
       // Check if dialogues data is available
       firstGaText = dialogues[this.playerMapLocationTracker].text.ga;
       firstEnText = dialogues[this.playerMapLocationTracker].text.en;
       this.textGa = this.add.text(520, 80, firstGaText, { fill: '#ffffff',fontFamily: 'aonchlo' });

       this.textEn = this.add.text(380, 328, firstEnText, { color: '#ffffff', fontFamily: 'anaphora'});

       // Adjust text properties as needed
       this.textGa.setFontSize(30);
       this.textGa.setOrigin(0.5);
       this.textGa.setDepth(19);
       this.textGa.setFontFamily('aonchlo');


       this.textEn.setFontSize(24);
       this.textEn.setOrigin(0);
       this.textEn.setDepth(19);
       // Access and use the dialogues data here
   } else {
   }
      const music = this.sound.add('rabbitTown',{ loop: true });
   
      music.play();

    // Add background sprite
    const background = this.add.sprite(0, 0, 'background').setOrigin(0);
    const glassbg0 = this.add.sprite(0, 0, 'glassbg0').setOrigin(0);
    glassbg0.setAlpha(0.1);

    // Calculate scale to contain the background within the game dimensions
    const scaleX = this.sys.game.config.width / background.width;
    const scaleY = this.sys.game.config.height / background.height;
    const scale = Math.max(scaleX, scaleY);

    // Set the scale of the background
    background.setScale(scale).setScrollFactor(0);

    // Create the bally0map element
    this.bally0map = this.add.sprite(0, 0, 'bally0map').setOrigin(0);

    const bally0mapScale = Math.max(this.sys.game.config.width, this.sys.game.config.height) / Math.max(this.bally0map.width, this.bally0map.height) * 2;
    this.bally0map.setScale(bally0mapScale);
    this.bally0map.x = (this.sys.game.config.width - this.bally0map.displayWidth) / 2;
    this.bally0map.y = (this.sys.game.config.height - this.bally0map.displayHeight) / 2;
   // Add the bgOverlay image
this.bgOverlay = this.add.sprite(this.bally0map.x, this.bally0map.y, 'bgOverlay').setOrigin(0);
this.bgOverlay.setScale(bally0mapScale);

// Ensure the bgOverlay moves with the background
this.bally0map.on('changedata-x', () => {
    this.bgOverlay.x = this.bally0map.x;
});
this.bally0map.on('changedata-y', () => {
    this.bgOverlay.y = this.bally0map.y;
});

// Ensure the bgOverlay renders above the player
this.bgOverlay.setDepth(1);


    // Ensure the bgOverlay moves with the background
    this.bally0map.on('changedata-x', () => {
        this.bgOverlay.x = this.bally0map.x;
    });
    this.bally0map.on('changedata-y', () => {
        this.bgOverlay.y = this.bally0map.y;
    });

    // Ensure the bgOverlay renders above the player
    this.bgOverlay.setDepth(1);

     // Add green frame image
// Add green frame image
// Add green frame image
const greenFrame = this.add.image(0, 0, 'greenRingLeft').setOrigin(0).setDepth(2);

// Calculate scale to cover the entire screen without distortion
const scaleXGreen = this.sys.game.config.width / greenFrame.width;
const scaleYGreen = this.sys.game.config.height / greenFrame.height;
const scaleGreen = Math.max(scaleXGreen, scaleYGreen);

// Set the scale of the green frame image to cover the entire screen
greenFrame.setScale(scaleGreen).setScrollFactor(0);

// Calculate position to center the image on the screen
// const posX = (this.sys.game.config.width - greenFrame.displayWidth) / 2;
const posY = (this.sys.game.config.height - greenFrame.displayHeight) / 2;

// Set the position of the green frame image, ensuring it doesn't overflow the edges
greenFrame.setPosition(posX, posY);
// Calculate position to align the left side of the image with the left side of the screen
const posX = 0;

// Calculate vertical position to center the image on the screen

// Set the position of the green frame image
greenFrame.setPosition(posX, posY);

    const playerX = this.sys.game.config.width / 4;
    const playerY = this.sys.game.config.height / 2;
    this.player = this.add.sprite(playerX, playerY, 'player');
    this.player.setScale(1.5);
    this.player.setDepth(6);

    // Create a duplicate of the original player sprite
    this.tintedPlayer = this.add.sprite(this.player.x, this.player.y, 'player');
    // Apply the tint to the duplicate sprite
    this.tintedPlayer.setTintFill(0x3d535f, 0x91afc0, 0x9793c1, 0x3d535f); // Use the hexadecimal color codes here
    this.tintedPlayer.setDepth(7);
    this.tintedPlayer.alpha = 0.65;
    this.tintedPlayer.setScale(1.5);

    // Create the overlay container
    this.overlay = this.add.container(0, 0);
    this.overlay.setVisible(false); // Initially hide the overlay
    // Add a transparent background to cover the entire screen
    const glassbg = this.add.sprite(0, 0, 'glassbg0').setOrigin(0);
    glassbg.displayWidth = this.sys.game.config.width;
    glassbg.displayHeight = this.sys.game.config.height;
    this.overlay.add(glassbg).setDepth(3);

    // Add translations and text to the overlay
    // const text = this.add.text(100, 100, , { color: '#ffffff' });
    this.overlay.add([glassbg0, this.textEn]);

    // Define the position of the directional pad buttons
    const buttonX = this.sys.game.config.width - 150; // Right side of the screen
    const buttonY = this.sys.game.config.height / 2 + 50;

    // Add directional pad buttons with fixed positions
    this.buttonLeft = this.add.sprite(buttonX - 50, buttonY, 'button-left').setInteractive().setDepth(4);
    this.buttonDown = this.add.sprite(buttonX, buttonY + 50, 'button-down').setInteractive().setDepth(4);
    this.buttonRight = this.add.sprite(buttonX + 50, buttonY, 'button-right').setInteractive().setDepth(4);
    this.buttonUp = this.add.sprite(buttonX, buttonY - 50, 'button-up').setInteractive().setDepth(4);
    // Add the button to the overlay and hide it initially
    // const buttonG = this.add.sprite(buttonX - 50, buttonY, 'pad-g').setInteractive().setVisible(false).setDepth(5);
    // this.buttonG = buttonG; // Store the button as a class member

    // Add middle button
    this.buttonMiddle = this.add.sprite(buttonX, buttonY, 'button-middle').setInteractive().setDepth(4);

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

    this.tintedPlayer.setOrigin(0.5, 0.5);
    this.player.setOrigin(0.5, 0.5);
// Define a function to update the text based on the player map location tracker value


// Call the updateText function with the initial player map location tracker value
this.updateText(this.playerMapLocationTracker);
  
   
}
update() {
    // Continuously update the position of bgOverlay to match bally0map
    if (this.bgOverlay && this.bally0map) {
        this.bgOverlay.x = this.bally0map.x;
        this.bgOverlay.y = this.bally0map.y;
    }
}


moveElement(direction) {
 
    // Check if movement controls are enabled
    if (!this.movementControlsEnabled) {
        return; // Exit the function if controls are disabled
    }

    if (this.playerMapLocationTracker === 3){
        const mollyElement = document.querySelector('.molly');
    if (mollyElement) {
        mollyElement.classList.add('hidden');
    } else {
    }
}

    if (this.playerMapLocationTracker === 4){
        this.introduceNewElements();
            const mollyElement = document.querySelector('.molly');
        if (mollyElement) {
            mollyElement.classList.remove('wait-and-fade');
            mollyElement.classList.remove('hidden');
        } else {
        }

        this.   disableMovementControls();
    }

    const speed = 500; // Adjust the speed as needed

    switch (direction) {
        case 'up':
            this.playerMapLocationTracker++; // Increment tracker
            if (this.playerMapLocationTracker >5) {
            this.playerMapLocationTracker=5; // Increment tracker

            }
            this.updateText(this.playerMapLocationTracker);
       
            break;
        case 'down':
            this.playerMapLocationTracker--; // Decrement tracker
            if (this.playerMapLocationTracker < 0) {
            this.playerMapLocationTracker=0; // Increment tracker
                
            }
            this.updateText(this.playerMapLocationTracker);
       
            break;
        case 'left':
            this.playerMapLocationTracker--; // Decrement tracker

            if (this.playerMapLocationTracker < 0) {
                this.playerMapLocationTracker=0; // Increment tracker
                    
                }
            this.updateText(this.playerMapLocationTracker);
       
            break;
        case 'right':
            this.playerMapLocationTracker++; // Increment tracker
            if (this.playerMapLocationTracker >5) {
            this.playerMapLocationTracker=5; // Increment tracker

            }
            this.updateText(this.playerMapLocationTracker);
       
            break;
    }

   // Get the new map location coordinates as percentages
   const { x, y } = this.mapLocations[this.playerMapLocationTracker];
   const mapWidth = this.bally0map.width;
   const mapHeight = this.bally0map.height;
   
   // Calculate the actual pixel coordinates based on percentages
   const targetX = -x * mapWidth + this.sys.game.config.width / 2;
   const targetY = -y * mapHeight + this.sys.game.config.height / 2;

   // Tween the map to the new position
   this.tweens.add({
       targets: this.bally0map,
       x: targetX,
        y: targetY, // Negative y to move the map in the opposite direction
        duration: speed,
        ease: 'Linear',
        onComplete: () => {
        }
    });
}




    toggleOverlay() {
        this.overlay.setVisible(!this.overlay.visible);
        // this.buttonG.setVisible(this.overlay.visible); // Toggle button visibility based on overlay visibility
   
   
    }
}

export default BallyGamboyGame;

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
        let champID = localStorage.getItem('champID');
        
        this.load.json('dialogues', './phaser-resources/text/dialogues.json');
        this.load.audio('mecha', './phaser-resources/audio/mecha.wav');
        this.load.image('sparks', `./phaser-resources/images/spark_02.png`);
        this.load.image('player', `./phaser-resources/images/champions/${champID}.png`);
        this.load.image('background', './phaser-resources/images/placeholders/ultima-like.png');
        this.load.image('glassbg0', './phaser-resources/images/big-glass.png');
        this.load.image('greenRingLeft', './phaser-resources/images/ciorcal-glass8.png');
        this.load.image('button-up', './phaser-resources/images/ui/pad-u.png');
        this.load.image('button-down', './phaser-resources/images/ui/pad-d.png');
        this.load.image('button-left', './phaser-resources/images/ui/pad-l.png');
        this.load.image('button-right', './phaser-resources/images/ui/pad-r.png');
        this.load.image('button-middle-lit', './phaser-resources/images/ui/middle-a.png');
        this.load.image('button-middle', './phaser-resources/images/ui/middle-b.png');
        this.load.image('pad-g', './phaser-resources/images/ui/pad-g.png');
        this.load.image('bally0map', './phaser-resources/images/ghostTown.png');
        this.load.image('overlay', './phaser-resources/images/overlay.png'); // Load overlay image
     
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
            console.error(`No dialogue found for playerMapLocationTracker: ${playerMapLocationTracker}`);
        }
    }
    
    introduceNewElements() {
        const mollyElement = document.querySelector('.molly');
        if (mollyElement) {
            mollyElement.classList.add('wait-and-fade');
        } else {
            console.error('Element with className "molly" not found.');
        }
        
        
        
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
       console.log(dialogues);
       
       // Check if dialogues data is available
       firstGaText = dialogues[this.playerMapLocationTracker].text.ga;
       firstEnText = dialogues[this.playerMapLocationTracker].text.en;
       console.log("First 'ga' text:", firstGaText);
       this.textGa = this.add.text(520, 80, firstGaText, { fill: '#ffffff',fontFamily: 'aonchlo' });

       this.textEn = this.add.text(330, 278, firstEnText, { color: '#ffffff', fontFamily: 'anaphora'});

       // Adjust text properties as needed
       this.textGa.setFontSize(30);
       this.textGa.setOrigin(0.5);
       this.textGa.setDepth(19);
       this.textGa.setFontFamily('aonchlo');


       this.textEn.setFontSize(24);
       this.textEn.setOrigin(0.5);
       this.textEn.setDepth(19);
       // Access and use the dialogues data here
   } else {
       console.error('Dialogues data is empty or not loaded correctly.');
   }
      const music = this.sound.add('mecha',{ loop: true });
   
      music.play();

    // Add background sprite
    const background = this.add.sprite(0, 0, 'background').setOrigin(0);
    const glassbg = this.add.sprite(0, 0, 'glassbg').setOrigin(0);
    glassbg.setAlpha(0.1);

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

// Ensure the bgOverlay moves with the background
this.bally0map.on('changedata-x', () => {
});
this.bally0map.on('changedata-y', () => {
});


this.bally0map.on('changedata-x', () => {
});
    this.bally0map.on('changedata-y', () => {
    });
    

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
    this.player.setDepth(3);

    // // Create a duplicate of the original player sprite
    // this.tintedPlayer = this.add.sprite(this.player.x, this.player.y, 'player');
    // // Apply the tint to the duplicate sprite
    // this.tintedPlay//////?///er.setTintFill(0x3d535f, 0x91afc0, 0x9793c1, 0x3d535f); // Use/ the hexadecimal color codes here
    // this.tintedPlayer.setDepth(4);
    // this.tintedPlayer.alpha = 0.65;
    // this.tintedPlayer.setScale(1.5);

    // Create the overlay container
    // this.overlay.setVisible(false); // Initially hide the overlay
    // Add a transparent background to cover the entire screen
    // const glassbg = this.add.sprite(0, 0, 'glassbg0').setOrigin(0);
    glassbg.displayWidth = this.sys.game.config.width;
    glassbg.displayHeight = this.sys.game.config.height;

    // Add translations and text to the overlay
    // const text = this.add.text(100, 100, , { color: '#ffffff' });
    this.overlay = this.add.container(0, 0);
    glassbg.displayWidth = this.sys.game.config.width;
    glassbg.displayHeight = this.sys.game.config.height;
    this.overlay.add([glassbg, this.textEn]);
    // Define the position of the directional pad buttons
    const buttonX = this.sys.game.config.width - 150; // Right side of the screen
    const buttonY = this.sys.game.config.height / 2 + 50;

    // Add directional pad buttons with fixed positions
    this.buttonLeft = this.add.sprite(buttonX - 50, buttonY, 'button-left').setInteractive().setDepth(19);
    this.buttonDown = this.add.sprite(buttonX, buttonY + 50, 'button-down').setInteractive().setDepth(19);
    this.buttonRight = this.add.sprite(buttonX + 50, buttonY, 'button-right').setInteractive().setDepth(19);
    this.buttonUp = this.add.sprite(buttonX, buttonY - 50, 'button-up').setInteractive().setDepth(19);
    // Add the button to the overlay and hide it initially
    // const buttonG = this.add.sprite(buttonX - 50, buttonY, 'pad-g').setInteractive().setVisible(false).setDepth(5);
    // this.buttonG = buttonG; // Store the button as a class member
// Define a flag to track whether the button is processing a touch event
let isMiddleButtonProcessing = false;

    // Add middle button
    this.buttonMiddle = this.add.sprite(buttonX, buttonY, 'button-middle').setInteractive().setDepth(9);

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

    // this.tintedPlayer.setOrigin(0.5, 0.5);
    this.player.setOrigin(0.5, 0.5);
    console.log(this.dialogues[0]);
// Define a function to update the text based on the player map location tracker value


// Call the updateText function with the initial player map location tracker value
this.updateText(this.playerMapLocationTracker);
  
   
}
update() {
    // Continuously update the position of bgOverlay to match bally0map
    // if (this.bgOverlay && this.bally0map) {
        // this.bgOverlay.x = this.bally0map.x;
        // this.bgOverlay.y = this.bally0map.y;
    // }
}


moveElement(direction) {
 
    // Check if movement controls are enabled
    if (!this.movementControlsEnabled) {
        return; // Exit the function if controls are disabled
    }

    if (this.playerMapLocationTracker === 3){
        const sparks = this.add.sprite(250, 150, 'sparks'); // Replace x and y with the desired coordinates
          // Add a tween to fade out the sparks sprite
    this.tweens.add({
        targets: sparks,
        alpha: 0, // Set alpha to 0 for complete transparency
        duration: 1000, // Adjust the duration of the fade out effect (in milliseconds)
        onComplete: () => {
            // This function will be called when the tween completes
            sparks.destroy(); // Remove the sparks sprite from the scene
        }
    });
 
        const mollyElement = document.querySelector('.molly');
    if (mollyElement) {
        mollyElement.classList.add('hidden');
    } else {
        console.error('Element with className "molly" not found.');
    }
}

    if (this.playerMapLocationTracker === 4){
        this.introduceNewElements();
            const mollyElement = document.querySelector('.molly');
        if (mollyElement) {
            mollyElement.classList.add('wait-and-fade');
            mollyElement.classList.remove('hidden');
        } else {
            console.error('Element with className "molly" not found.');
        }

        // this.   disableMovementControls();
    }

    const speed = 500; // Adjust the speed as needed

    switch (direction) {
        case 'up':
            this.playerMapLocationTracker++; // Increment tracker
            if (this.playerMapLocationTracker >5) {
                setTimeout(() => {  window.location.href = 'https://www.na-ring-gael.com/chesslike'; }, 2000);
            }
            console.log("playerMapLocationTracker:", this.playerMapLocationTracker);
            this.updateText(this.playerMapLocationTracker);
       
            break;
        case 'down':
            this.playerMapLocationTracker--; // Decrement tracker
            if (this.playerMapLocationTracker < 0) {
            this.playerMapLocationTracker=0; // Increment tracker
                
            }
            console.log("playerMapLocationTracker:", this.playerMapLocationTracker);
            this.updateText(this.playerMapLocationTracker);
       
            break;
        case 'left':
            this.playerMapLocationTracker--; // Decrement tracker

            if (this.playerMapLocationTracker < 0) {
                this.playerMapLocationTracker=0; // Increment tracker
                    
                }
            console.log("playerMapLocationTracker:", this.playerMapLocationTracker);
            this.updateText(this.playerMapLocationTracker);
       
            break;
        case 'right':
            this.playerMapLocationTracker++; // Increment tracker
            if (this.playerMapLocationTracker >5) {
            this.playerMapLocationTracker=5; // Increment tracker

            }
            console.log("playerMapLocationTracker:", this.playerMapLocationTracker);
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
            console.log(`Background Map Origin: (${Math.floor(this.bally0map.x)}, ${Math.floor(this.bally0map.y)})`);
        }
    });
}




}

export default BallyGamboyGame;

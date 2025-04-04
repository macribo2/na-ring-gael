import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import molly from '../../../../images/cut-scenes/stern.png'
import Easca from '../../../easca/easca2';
import './bally.css';
import { useHistory } from 'react-router-dom';
import NavCD from '../../../navCD/navCD'


import ReactRain from 'react-rain-animation';


// let glassTextA = [
//     `Translations and comments go here. json soon. This is glassTextA[0]`,
// ];
const Kilcash = () => {
    
    let championName = localStorage.getItem('championName');
    const gameRef = useRef(null);
    const [showEasca, setShowEasca] = useState(false); // State to control visibility of Easca component
      // Define a function to handle showing the Easca component
  const handleShowEasca = () => {
    setShowEasca(true);
  };

    useEffect(() => {
        const initializeGame = () => {
            const config = {
                type: Phaser.AUTO,
                width: window.innerWidth, // Set width to match the browser window width
                height: window.innerHeight, // Set height to match the browser window height
                scene: [GameScene,NavCD],
                parent: 'ballygamboy-game-container'
            };
            
            gameRef.current = new Phaser.Game(config);
        };

        window.addEventListener('showEasca', handleShowEasca);

        
        initializeGame();
        
        return () => {
          window.removeEventListener('showEasca', handleShowEasca);

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

            	
					<div className="rain1">
						
						<ReactRain numDrops="56" />
						</div>
						<div className="rain2">
						<ReactRain  numDrops="56" />
						</div>
						<div className="rain3">

						<ReactRain numDrops="56" />
						</div>
						<div className="rain4">

						<ReactRain numDrops="56" />
</div>					
        </>
    );
};

class GameScene extends Phaser.Scene {
    
    constructor() {
        super({ key: 'GameScene' });
        this.userInputText = null; // Initialize userInputText
        this.kilcashMapMap = null;
        this.playerMapLocationTracker = 0; // Start at location 1
        this.mapLocations = {
            0: { x: 0.3, y: 0.1 },
            1: { x: 0.35, y: 0.1 },
            2: { x: 0.4, y: 0.1},
            3: { x: 0.4, y: 0.25 },
            4: { x: 0.4, y: 0.4},
            5: { x: 0.35, y: 0.4},
            6: { x: 0.3, y: 0.1},
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
        this.load.image('horseIcon', '/phaser-resources/images/puca1.png');
        this.load.image('speakIcon', '/phaser-resources/images/ui/speak.png');

        // Load assets
        // this.load.plugin('aonchlo', './phaser-resources/fonts/aonchlo.ttf');
        let champID = localStorage.getItem('champID');
        
        this.load.json('dialogues', '/phaser-resources/text/kilcash.json');
        this.load.image('sparks', `/phaser-resources/images/spark_02.png`);
        this.load.image('player', `/phaser-resources/images/champions/${champID}.png`);
        this.load.image('background', '/phaser-resources/images/map0.png');
        this.load.image('kilcashMap', '/phaser-resources/images/map1.png');
        this.load.image('glassbg0', '/phaser-resources/images/big-glass.png');
        this.load.image('greenRingLeft', '/phaser-resources/images/big-glass.png'); 
        this.load.image('button-up', '/phaser-resources/images/ui/pad-u.png');
        this.load.image('button-down', '/phaser-resources/images/ui/pad-d.png');
        this.load.image('button-left', '/phaser-resources/images/ui/pad-l.png');
        this.load.image('button-right', '/phaser-resources/images/ui/pad-r.png');
        this.load.image('button-middle-lit', '/phaser-resources/images/ui/middle-a.png');
        this.load.image('button-middle', '/phaser-resources/images/ui/middle-b.png');
        this.load.image('pad-g', '/phaser-resources/images/ui/pad-g.png');
        this.load.image('overlay', '/phaser-resources/images/overlay.png'); // Load overlay image
     
    }

    updateText(playerMapLocationTracker) {
        const dialogues = this.cache.json.get('dialogues');
        
        if (dialogues) {
            const currentDialogue = dialogues[playerMapLocationTracker];
            
            if (currentDialogue) {
                // Set the text but make it invisible first
                this.textGa.setAlpha(0);
                this.textEn.setAlpha(0);
                
                // Update the textGa and textEn with the new dialogue text
                this.textGa.setText(currentDialogue.text.ga);
                this.textEn.setText(currentDialogue.text.en);
                
                // Create a fade-in tween for textGa
                this.tweens.add({
                    targets: this.textGa,
                    alpha: 1, // Fade to full visibility
                    duration: 1000, // Duration of the fade in milliseconds
                    ease: 'Power2',
                });
    
                // Create a fade-in tween for textEn
                this.tweens.add({
                    targets: this.textEn,
                    alpha: 1, // Fade to full visibility
                    duration: 1000, // Duration of the fade in milliseconds
                    ease: 'Power2',
                });
            } else {
                console.error(`No dialogue found for playerMapLocationTracker: ${playerMapLocationTracker}`);
            }
        } else {
            console.error(`No dialogues data found in the cache`);
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
    
        let firstGaText;
        let firstEnText;
        // Get the dialogues data from the cache
        const dialogues = this.cache.json.get('dialogues');
    
        if (dialogues) {
            // Check if dialogues data is available
            firstGaText = dialogues[this.playerMapLocationTracker].text.ga;
            firstEnText = dialogues[this.playerMapLocationTracker].text.en;
            
            this.textGa = this.add.text(350, 70, '', { fill: '#ffffff', fontFamily: 'aonchlo' });
            this.textEn = this.add.text(250, 278, '', { fill: '#ffffff', fontFamily: 'anaphora' });
            this.textGa.setVisible(true);
this.textEn.setVisible(true);
            
            // Adjust text properties as needed
            this.textGa.setFontSize(30);
            this.textGa.setOrigin(0.5);
            this.textGa.setDepth(99);
            this.textGa.setFontFamily('aonchlo');
    
            this.textEn.setFontSize(24);
            this.textEn.setOrigin(0.5);
            this.textEn.setDepth(19);
        } else {
            console.error('Dialogues data is empty or not loaded correctly.');
        }
    
    
        // Add background sprite
        const background = this.add.sprite(0, 0, 'background').setOrigin(0);
        const glassbg = this.add.sprite(0, 0, 'glassbg0').setOrigin(0);
        glassbg.setAlpha(0.7);
        const { width, height } = this.sys.game.config;
        const pucaIcon = this.add.sprite(20,height - 50, 'horseIcon').setOrigin(0).setScale(0.5).setAlpha(0.7).setInteractive(); // Make the sprite interactive
        const speakIcon = this.add.sprite(120,height - 50, 'speakIcon').setOrigin(0).setScale(0.5).setAlpha(0.7).setInteractive(); // Make the sprite interactive

        // Add event listener for pointerdown event
        pucaIcon.on('pointerdown', () => {
          // Start the NavCD scene
          this.scene.start('NavCD');
        });


// Add event listener for pointerdown event
speakIcon.on('pointerdown', () => {
    // Dispatch a custom event to notify React to show the Easca component
    const event = new Event('showEasca');
    window.dispatchEvent(event);
});
        // Calculate scale to contain the background within the game dimensions
        const scaleX = this.sys.game.config.width / background.width;
        const scaleY = this.sys.game.config.height / background.height;
        const scale = Math.max(scaleX, scaleY);
    
        // Set the scale of the background
        background.setScale(scale).setScrollFactor(0);
    
        // Create the kilcashMapMap element
        this.kilcashMapMap = this.add.sprite(0.5, 0.5, 'kilcashMap').setOrigin(0);
    
        const kilcashMapMapScale = Math.max(this.sys.game.config.width, this.sys.game.config.height) / Math.max(this.kilcashMapMap.width, this.kilcashMapMap.height) * 4;
        this.kilcashMapMap.setScale(kilcashMapMapScale);
        // this.kilcashMapMap.x = (this.sys.game.config.width - this.kilcashMapMap.displayWidth) / 2;
        // this.kilcashMapMap.y = (this.sys.game.config.height - this.kilcashMapMap.displayHeight) / 2;
        this.kilcashMapMap.x = -700
        this.kilcashMapMap.y =0;
        // Ensure the bgOverlay moves with the background
        this.kilcashMapMap.on('changedata-x', () => {});
        this.kilcashMapMap.on('changedata-y', () => {});
    
        // Add green frame image
        const greenFrame = this.add.image(0, 0, 'greenRingLeft').setOrigin(0).setDepth(2).setAlpha(0);
        const scaleXGreen = this.sys.game.config.width / greenFrame.width;
        const scaleYGreen = this.sys.game.config.height / greenFrame.height;
        const scaleGreen = Math.max(scaleXGreen, scaleYGreen);
    
        greenFrame.setScale(scaleGreen).setScrollFactor(0);
        const posY = (this.sys.game.config.height - greenFrame.displayHeight) / 2;
        const posX = 0;
        greenFrame.setPosition(posX, posY);
    
        const playerX = this.sys.game.config.width / 4;
        const playerY = this.sys.game.config.height / 2;
        this.player = this.add.sprite(playerX, playerY, 'player');
        this.player.setScale(1.5);
        this.player.setDepth(3);
    
        // Create the overlay container
        glassbg.displayWidth = this.sys.game.config.width;
        glassbg.displayHeight = this.sys.game.config.height;
    
        this.overlay = this.add.container(0, 0).setDepth(17);
        this.overlay.setVisible(false); // Initially hide the overlay
    
        glassbg.displayWidth = this.sys.game.config.width;
        glassbg.displayHeight = this.sys.game.config.height;
    
        if (glassbg && this.textEn) {
            this.overlay.add([glassbg, this.textEn, pucaIcon, speakIcon]);
        } else {
            console.error("glassbg or this.textEn is null. Cannot add to overlay.");
        }

        

        // Define the position of the directional pad buttons
        const buttonX = this.sys.game.config.width - 150; // Right side of the screen
        const buttonY = this.sys.game.config.height / 2 + 50;
    
        // Add directional pad buttons with fixed positions
        this.buttonLeft = this.add.sprite(buttonX - 50, buttonY, 'button-left').setInteractive().setDepth(19);
        this.buttonDown = this.add.sprite(buttonX, buttonY + 50, 'button-down').setInteractive().setDepth(19);
        this.buttonRight = this.add.sprite(buttonX + 50, buttonY, 'button-right').setInteractive().setDepth(19);
        this.buttonUp = this.add.sprite(buttonX, buttonY - 50, 'button-up').setInteractive().setDepth(19);
    
        // Add middle button
        this.buttonMiddle = this.add.sprite(buttonX, buttonY, 'button-middle').setInteractive().setDepth(103);
    
        this.buttonMiddle.on('pointerdown', () => {
            // Toggle the visibility of the overlay and its elements
            this.overlay.setVisible(!this.overlay.visible);
        });
    
        this.buttonMiddle.on('pointerover', () => {
            // Change the button texture to the lit state image when hovered
            this.buttonMiddle.setTexture('button-middle-lit');
            setTimeout(() => {
                this.buttonMiddle.setTexture('button-middle');
            }, 500);
        });
    
        this.buttonMiddle.on('pointerout', () => {
            setTimeout(() => {
                this.buttonMiddle.setTexture('button-middle');
            }, 500);
        });
    
        this.buttonUp.on('pointerdown', () => this.moveElement('up'));
        this.buttonDown.on('pointerdown', () => this.moveElement('down'));
        this.buttonLeft.on('pointerdown', () => this.moveElement('left'));
        this.buttonRight.on('pointerdown', () => this.moveElement('right'));
    
        this.player.setOrigin(0.5, 0.5);
    
        // Define a function to update the text based on the player map location tracker value
        // Call the updateText function with the initial player map location tracker value
        this.updateText(this.playerMapLocationTracker);
    
       // Retrieve the input from local storage
       const eascaInput = localStorage.getItem('eascaInput') || '...';

       // Add text element with content from local storage or fallback to 'test1'
       this.userInputText = this.add.text(100, 100, eascaInput, { fill: '#ffffff', fontFamily: 'Arial', fontSize: '24px' });
       this.userInputText.setOrigin(0.5); // Set origin to center the text at (100, 100)

       // Additional setup or code in your create method

       // Set up a repeating event to clear local storage and update text every 5 seconds
       this.time.addEvent({
           delay: 5000, // 5 seconds
           callback: this.updateUserInputText,
           callbackScope: this,
           loop: true
       });
    }

    updateUserInputText() {
        // Clear the local storage value
        localStorage.setItem('eascaInput', '');

        // Update the text with the new value from local storage
        const eascaInput = localStorage.getItem('eascaInput') || ' ';
        if (this.userInputText) {
            this.userInputText.setText(eascaInput);
        } else {
            console.error('userInputText is not defined');
        }
    }

update() {
    // Continuously update the position of bgOverlay to match kilcashMapMap
    // if (this.bgOverlay && this.kilcashMapMap) {
        // this.bgOverlay.x = this.kilcashMapMap.x;
        // this.bgOverlay.y = this.kilcashMapMap.y;
    // }
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
        console.error('Element with className "molly" not found.');
    }
}

    if (this.playerMapLocationTracker === 4){
        this.introduceNewElements();
            const mollyElement = document.querySelector('.molly');
        if (mollyElement) {
            // mollyElement.classList.add('wait-and-fade');
            // mollyElement.classList.remove('hidden');
        } else {
            console.error('Element with className "molly" not found.');
        }

        // this.   disableMovementControls();
    }

    const speed = 500; // Adjust the speed as needed

    switch (direction) {
        case 'up':
            this.playerMapLocationTracker++; // Increment tracker
            if (this.playerMapLocationTracker >7) {
                setTimeout(() => {  window.location.href = 'https://www.na-ring-gael.com/pucaloic'; }, 2000);
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
                setTimeout(() => {  window.location.href = 'https://www.na-ring-gael.com/pucaloic'; }, 2000);
            }
            this.updateText(this.playerMapLocationTracker);
       
            break;
    }

   // Get the new map location coordinates as percentages
   const { x, y } = this.mapLocations[this.playerMapLocationTracker];
   const mapWidth = this.kilcashMapMap.width;
   const mapHeight = this.kilcashMapMap.height;
   
   // Calculate the actual pixel coordinates based on percentages
   const targetX = -x * mapWidth + this.sys.game.config.width / 2;
   const targetY = -y * mapHeight + this.sys.game.config.height / 2;

   // Tween the map to the new position
   this.tweens.add({
       targets: this.kilcashMapMap,
       x: targetX,
        y: targetY, // Negative y to move the map in the opposite direction
        duration: speed,
        ease: 'Linear',
        onComplete: () => {
        }
    });
}




}

export default Kilcash;

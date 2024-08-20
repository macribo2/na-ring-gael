import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import molly from '../../../../images/cut-scenes/stern.png'
import './cavan.css';
import { useHistory } from 'react-router-dom';
import NavCD from '../../../navCD/navCD'
import Fortuna from '../../../fortuna/fortuna'
import Rings6 from '../../../Rings/Rings6'
// let glassTextA = [
//     `Translations and comments go here. json soon. This is glassTextA[0]`,
// ];
const Dunaree = () => {
    
    let championName = localStorage.getItem('championName');
    const gameRef = useRef(null);
    const [showFortuna, setShowFortuna] = useState(false);
    useEffect(() => {
        const initializeGame = () => {
            const config = {
                type: Phaser.AUTO,
                width: window.innerWidth, // Set width to match the browser window width
                height: window.innerHeight, // Set height to match the browser window height
                scene: [GameScene,NavCD,Fortuna],
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
      
      <Fortuna/>
        </>
    );
};

class GameScene extends Phaser.Scene {
    
    constructor() {
    
        super({ key: 'GameScene' });
        this.dunareeMap = null;
        this.playerMapLocationTracker = 0; // Start at location 1
        this.mapLocations = {
            0: { x: 0, y: 0 },
            1: { x: 0, y: 0 },
            2: { x: 0, y: 0},
            3: { x: 0, y: 0 },
            4: { x: 0, y: 0},
            5: { x: 0, y: 0},
            6: { x: 0, y: 0},
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

        // Load assets
        // this.load.plugin('aonchlo', './phaser-resources/fonts/aonchlo.ttf');
        let champID = localStorage.getItem('champID');
        
        this.load.json('dialogues', '/phaser-resources/text/dunaree.json');
        this.load.audio('mecha', '/phaser-resources/audio/mecha.wav');
        this.load.image('sparks', `/phaser-resources/images/spark_02.png`);
        this.load.image('player', `/phaser-resources/images/champions/${champID}.png`);
        this.load.image('background', '/phaser-resources/images/background-elements/fields-and-sky.png');
        this.load.image('dunareeMap', '/phaser-resources/images/fogblue.png');
        this.load.image('glassbg0', '/phaser-resources/images/big-glass.png');
        this.load.image('greenRingLeft', '/phaser-resources/images/big-glass.png'); 
        this.load.image('button-up', '/phaser-resources/images/ui/pad-u.png');
        this.load.image('button-down', '/phaser-resources/images/ui/pad-d.png');
        this.load.image('button-left', '/phaser-resources/images/ui/pad-l.png');
        this.load.image('button-right', '/phaser-resources/images/ui/pad-r.png');
        this.load.image('button-middle-lit', '/phaser-resources/images/ui/middle-a.png');
        this.load.image('button-middle', '/phaser-resources/images/ui/middle-b.png');
        this.load.image('pad-g', '/phaser-resources/images/ui/pad-g.png');

        for (let i = 1; i <= 10; i++) {
            this.load.image(`person${i}`, `/phaser-resources/images/champions/${i}.png`); // Update the path to your image files
        }
    }

    updateText(playerMapLocationTracker) {
        // Retrieve the current dialogue based on the playerMapLocationTracker
        const dialogues = this.cache.json.get('dialogues');
        
        // Check if the current dialogue is defined
        if (dialogues) {
            // Get the text for the current dialogue
            const currentDialogue = dialogues[playerMapLocationTracker];
            
            if (currentDialogue) {
                // Update the textGa and textEn with the new dialogue text
                this.textGa.setText(currentDialogue.text.ga);
                this.textEn.setText(currentDialogue.text.en);
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
            console.log(dialogues);
            // Check if dialogues data is available
            firstGaText = dialogues[this.playerMapLocationTracker].text.ga;
            firstEnText = dialogues[this.playerMapLocationTracker].text.en;
            console.log("First 'ga' text:", firstGaText);
            
            this.textGa = this.add.text(50, 20, '', { fill: '2A3D66', fontFamily: 'INFO56_0' });
            this.textEn = this.add.text(250, 278, '', { fill: '#ffffff', fontFamily: 'anaphora' });
            this.textGa.setVisible(true);
this.textEn.setVisible(true);
      
this.textGa.setStroke('#000000', 6); // 6 is the thickness of the outline
      
            // Adjust text properties as needed
            this.textGa.setFontSize("6em");
            this.textGa.setOrigin(0);
            this.textGa.setDepth(99);
            this.textGa.setFontFamily('INFO56_0');
            this.textGa.setColor('turquoise');
    
            this.textEn.setFontSize(24);
            this.textEn.setOrigin(0.5);
            this.textEn.setDepth(19);
        } else {
            console.error('Dialogues data is empty or not loaded correctly.');
        }
    
        const music = this.sound.add('mecha', { loop: true });
        // music.play();
    
        // Add background sprite
        const background = this.add.sprite(0, 0, 'background').setOrigin(0);
        const glassbg = this.add.sprite(0, 0, 'glassbg0').setOrigin(0);
        glassbg.setAlpha(0.7);
        const { width, height } = this.sys.game.config;
        const pucaIcon = this.add.sprite(20,height - 50, 'horseIcon').setOrigin(0).setScale(0.5).setAlpha(0.7).setInteractive(); // Make the sprite interactive

        // Add event listener for pointerdown event
        pucaIcon.on('pointerdown', () => {
          // Start the NavCD scene
          this.scene.start('NavCD');
        });


  // Add event listener for pointerdown event
  // Calculate scale to contain the background within the game dimensions
        const scaleX = this.sys.game.config.width / background.width;
        const scaleY = this.sys.game.config.height / background.height;
        const scale = Math.max(scaleX, scaleY);
    
        // Set the scale of the background
        background.setScale(scale).setScrollFactor(0);
    
       
    
    
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
            this.overlay.add([glassbg, this.textEn, pucaIcon]);
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
            this.updateText(this.playerMapLocationTracker);
 
       // Create a group to hold the crowd
       this.crowdGroup = this.add.group();

       // Number of people in the crowd
       const crowdSize = 30;
 // Add people to the crowd
 for (let i = 0; i < crowdSize; i++) {
   // Randomly position each person within a specific area
   const x = Phaser.Math.Between(-100, 800);
   const y = Phaser.Math.Between(100, 500);
   const randomImageIndex = Phaser.Math.Between(1, 10);
   const personImage = `person${randomImageIndex}`;
   
   // Create the sprite and add it to the group
   const person = this.add.sprite(x, y, personImage).setScale(2);
   this.crowdGroup.add(person);
   // Add a small random movement to each person to simulate crowd movement
   this.tweens.add({
       targets: person,
       x: person.x + Phaser.Math.Between(-5, 5),
       y: person.y + Phaser.Math.Between(-5, 5),
       duration: Phaser.Math.Between(1000, 2000),
       yoyo: true,
       repeat: -1,
       ease: 'Sine.easeInOut'
   });
}
        }
    
update() {
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
            if (this.playerMapLocationTracker >9) {
                    // Change display property of elements with .fortuna class
                    const fortunaElements = document.querySelectorAll('.fortuna');
                    fortunaElements.forEach(el => {
                      el.style.display = 'block';
                    });
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
            if (this.playerMapLocationTracker >9) {
                // Change display property of elements with .fortuna class
                const fortunaElements = document.querySelectorAll('.fortuna');
                fortunaElements.forEach(el => {
                  el.style.display = 'block';
                });
        }
            console.log("playerMapLocationTracker:", this.playerMapLocationTracker);
            this.updateText(this.playerMapLocationTracker);
       
            break;
    }

   // Get the new map location coordinates as percentages
   
//    const { x, y } = this.mapLocations[this.playerMapLocationTracker];
   
   
}




}

export default Dunaree;

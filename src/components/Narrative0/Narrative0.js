import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import './narrative.css';

const Narrative0 = () => {
    const gameRef = useRef(null);
    useEffect(() => {
        const initializeGame = () => {
            const gameConfig = {
                type: Phaser.AUTO,
                width: window.innerWidth,
                height: window.innerHeight,
                parent: 'narrative-container',
                scene: [GameScene] // Add GameScene to the game's scenes
            };
            const gameInstance = new Phaser.Game(gameConfig);
            gameRef.current = new Phaser.Game(gameConfig);
        };
        initializeGame();
    
        // Other code...
    }, []);
    
    return (
        <div id="narrative-container">
        </div>
    );
};

class GameScene extends Phaser.Scene {
    constructor(props) {
        super({ key: 'GameScene' });
        this.narrativeTracker = 0;
        this.textGa = null;
        this.textEn = null;
        this.hero = localStorage.getItem('portrait');
        this.graphics = null; // Store reference to graphics
            // Bind updateText method to the current instance of GameScene
  
            

    }
    updateText = ()=> {
        if (this.narrativeTracker === 6) {

            window.location.href = "https://www.na-ring-gael.com/rings4";
            // Access the scene directly from the Phaser game instance
            const narrative0 = this.gameRef.current.scene.getScene('Narrative0');
            if (narrative0) {
            } else {
                console.error('GameScene not found.');
            }
        }

        // Retrieve the current dialogue based on the narrativeTracker
        const narrativeData = this.cache.json.get('narrative0');
    
        // Check if narrativeData is an array and not empty
        if (Array.isArray(narrativeData) && narrativeData.length > 0) {
            const narrative0 = narrativeData[0]; // Extract the first object from the array
            console.log('Narrative0:', narrative0); // Check if the JSON data is loaded correctly
    
            // Check if narrativeTracker is within the expected range
            if (this.narrativeTracker >= 0 && this.narrativeTracker < 7) {
                const currentNarrative = narrative0[this.hero]; //
                console.log('Current Narrative:', currentNarrative); // Check the current narrative data
    
                // Construct the keys based on the narrativeTracker value
                const key = `gae${this.narrativeTracker}`;
    
                // Check if the currentNarrative and the key are defined
                if (currentNarrative && currentNarrative[key]) {
                    // Update the gaText and enText with the new dialogue text
                    this.textGa.setText(currentNarrative[key]);
                    this.textEn.setText(currentNarrative[key.replace('gae', 'eng')]); // Replace 'gae' with 'eng'
                } else {
                    console.error(`No dialogue found for key: ${key}`);
                }
            } else {
                console.error(`narrativeTracker value (${this.narrativeTracker}) is out of range.`);
            }
        } else {
            console.error('narrativeData is empty or not loaded correctly.');
        }
    }

    preload() {
        this.load.image('Sirriam', './phaser-resources/images/players/alex.png');
        this.load.image('Fand', './phaser-resources/images/players/poet.png');
        this.load.image('Douglas_Hyde', './phaser-resources/images/players/douglas.png');
        this.load.image('Pooka', './phaser-resources/images/players/pooka.png');
        this.load.image('Fionn', './phaser-resources/images/players/fionn0.png');
        this.load.image('Mug_Ruith', './phaser-resources/images/players/agnes_new.png');
        this.load.image('Abhartach', './phaser-resources/images/players/diamhrai0.gif');
        this.load.image('Oisin', './phaser-resources/images/players/fianna0.png');
        this.load.image('Niamh', './phaser-resources/images/players/niamh0.png');
        this.load.image('panel-molly-1', './phaser-resources/images/players/draoi.gif');
        this.load.image('panel-molly-0', './phaser-resources/images/players/draoi0.gif');
        this.load.json('narrative0', './phaser-resources/text/narrative0.json');
        this.load.image('glassbg0', './phaser-resources/images/big-glass.png');
        this.load.image('button-up', './phaser-resources/images/ui/pad-u.png');
        this.load.image('button-down', './phaser-resources/images/ui/pad-d.png');
        this.load.image('button-left', './phaser-resources/images/ui/pad-l.png');
        this.load.image('button-right', './phaser-resources/images/ui/pad-r.png');
        this.load.image('button-middle-lit', './phaser-resources/images/ui/middle-a.png');
        this.load.image('button-middle', './phaser-resources/images/ui/middle-b.png');
    }
    
    create() {
        
        this.hero = parseInt(this.hero); // Convert to a numbert
        this.updateNarrativeTracker();

        switch(this.hero){
            case 0: this.hero= "Niamh"; break;
            case 1: this.hero= "Niamh"; break;
            case 2: this.hero= "Douglas_Hyde"; break;
            case 3: this.hero= "Oisin"; break;
            case 4: this.hero= "Sirriam"; break;
            case 5: this.hero= "Mug_Ruith"; break;
            case 6: this.hero= "Abhartach"; break;
            case 7: this.hero= "Fionn"; break;
            case 8: this.hero= "Pooka"; break;
            case 9: this.hero= "Fand"; break;
            default: this.hero= "Niamh"; break;
        }
        const narrative0 = this.cache.json.get('narrative0');
        if (narrative0) {
            const firstGaText = narrative0[0][this.hero].gae0;
            const firstEnText = narrative0[0][this.hero].eng0;
            this.textGa = this.add.text(30, 20, firstGaText, { fill: '#ffffff', fontFamily: 'aonchlo' });
            this.textEn = this.add.text(30, 200, firstEnText, { color: '#ffffff', fontFamily: 'anaphora'});
            this.textGa.setFontSize(30);
            // this.textGa.setOrigin(0);
            this.textGa.setDepth(19);
            this.textEn.setFontSize(24);
            this.textEn.setDepth(19);
        } else {
            console.error('narrative data is empty or not loaded correctly.');
        }

        const glassbg0 = this.add.sprite(0, 0, 'glassbg0').setOrigin(0);
        glassbg0.setAlpha(0.1);
        const glassbg = this.add.sprite(0, 0, 'glassbg0').setOrigin(0);
        glassbg.displayWidth = this.sys.game.config.width;
        glassbg.displayHeight = this.sys.game.config.height;
        this.overlay = this.add.container(0, 0);
        this.overlay.setVisible(false);
        this.overlay.add([glassbg0, this.textEn]);

        const buttonX = this.sys.game.config.width - 150;
        const buttonY = this.sys.game.config.height / 2 + 50;
        this.buttonLeft = this.add.sprite(buttonX - 50, buttonY, 'button-left').setInteractive().setDepth(4);
        this.buttonDown = this.add.sprite(buttonX, buttonY + 50, 'button-down').setInteractive().setDepth(4);
        this.buttonRight = this.add.sprite(buttonX + 50, buttonY, 'button-right').setInteractive().setDepth(4);
        this.buttonUp = this.add.sprite(buttonX, buttonY - 50, 'button-up').setInteractive().setDepth(4);

        this.buttonMiddle = this.add.sprite(buttonX, buttonY, 'button-middle').setInteractive().setDepth(4);
        this.buttonMiddle.on('pointerdown', () => this.toggleOverlay());

        this.buttonUp.on('pointerdown', () => {
            this.updateNarrativeTracker('increment');
            this.updateText(); // Call updateText() when buttonUp is clicked
        });
        

        this.buttonDown.on('pointerdown', () => {
            this.updateNarrativeTracker('decrement');
            this.updateText(); // Call updateText() when buttonUp is clicked
        });
        
        this.buttonLeft.on('pointerdown', () => {
            this.updateNarrativeTracker('decrement');
            this.updateText(); // Call updateText() when buttonUp is clicked
        });
        
        this.buttonRight.on('pointerdown', () => {
            this.updateNarrativeTracker('increment');
            this.updateText(); // Call updateText() when buttonUp is clicked
        });
        

    }
   
    toggleOverlay() {
        this.overlay.setVisible(!this.overlay.visible);
    }
  

    
    
    
updateNarrativeTracker(direction) {
    if (direction === 'increment') {
        this.narrativeTracker = Math.min(6, this.narrativeTracker + 1); // Ensure narrativeTracker does not exceed 5
    } else if (direction === 'decrement') {
        this.narrativeTracker = Math.max(0, this.narrativeTracker - 1); // Ensure narrativeTracker does not go below 0
    }
    console.log('Narrative Tracker:', this.narrativeTracker);
    if (this.graphics) {
        this.graphics.destroy(); // Clear previous image
    }
    
    switch (this.narrativeTracker) {
        case 0:
            this.graphics = this.add.image(-150, 120, 'panel-molly-0').setOrigin(0, 0).setScale(4).setFlipX(true).setDepth(-1);
            break; 
        case 1:
            this.graphics = this.add.image(100, 70, ''+this.hero).setOrigin(0, 0).setScale(4).setDepth(-1);
            break;

        case 2:
            this.graphics = this.add.image(-150, 120, 'panel-molly-0').setOrigin(0, 0).setScale(4).setFlipX(true).setDepth(-1);
            break;

            case 3:
                this.graphics = this.add.image(100, 70, ''+this.hero).setOrigin(0, 0).setScale(4).setDepth(-1);
                break;
                case 4:
                    this.graphics = this.add.image(-150, 120, 'panel-molly-0').setOrigin(0, 0).setScale(4).setFlipX(true).setDepth(-1);
                    break;
                    case 5:
                        this.graphics = this.add.image(100, 70, ''+this.hero).setOrigin(0, 0).setScale(4).setDepth(-1);
                        break;
                        case 6:
                            this.graphics = this.add.image(-50, 120, 'panel-molly-0').setOrigin(0, 0).setScale(4).setDepth(-1);
                            break;
                                        







        default:
            // Hide the image if narrativeTracker exceeds 6
            this.graphics = this.add.image(10, 150, 'placeholder-image').setVisible(false); // Adjust 'placeholder-image' accordingly
            break;
    }    // Now you can use this.narrativeTracker to update the text or any other functionality based on the current narrative index
}

}

export default Narrative0;

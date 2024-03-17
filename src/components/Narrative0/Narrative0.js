import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import './narrative.css';

const Narrative0 = () => {
    const gameRef = useRef(null);

    useEffect(() => {
        const initializeGame = () => {
            const config = {
                type: Phaser.AUTO,
                width: window.innerWidth,
                height: window.innerHeight,
                scene: [GameScene],
                parent: 'narrative-container'
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
        <div id="narrative-container"></div>
    );
};

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.textGa = null;
        this.textEn = null;
        this.narrativeTracker = 0; // Initial value for narrativeTracker
    }

    preload() {
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
        const narrative0 = this.cache.json.get('narrative0');
        if (narrative0) {
            const firstGaText = narrative0[0].Niamh.gae0;
            const firstEnText = narrative0[0].Niamh.eng0;
            this.textGa = this.add.text(520, 80, firstGaText, { fill: '#ffffff', fontFamily: 'aonchlo' });
            this.textEn = this.add.text(380, 328, firstEnText, { color: '#ffffff', fontFamily: 'anaphora'});
            this.textGa.setFontSize(30);
            this.textGa.setOrigin(0.5);
            this.textGa.setDepth(19);
            this.textEn.setFontSize(24);
            this.textEn.setOrigin(0.5);
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
        
        this.buttonDown.on('pointerdown', () => this.updateNarrativeTracker('decrement'));
        this.buttonLeft.on('pointerdown', () => this.updateNarrativeTracker('decrement'));
        this.buttonRight.on('pointerdown', () => this.updateNarrativeTracker('increment'));
    }

    toggleOverlay() {
        this.overlay.setVisible(!this.overlay.visible);
    }
    updateText() {
        // Retrieve the current dialogue based on the narrativeTracker
        const narrativeData = this.cache.json.get('narrative0');
    
        // Check if narrativeData is an array and not empty
        if (Array.isArray(narrativeData) && narrativeData.length > 0) {
            const narrative0 = narrativeData[0]; // Extract the first object from the array
            console.log('Narrative0:', narrative0); // Check if the JSON data is loaded correctly
    
            // Check if narrativeTracker is within the expected range
            if (this.narrativeTracker >= 0 && this.narrativeTracker <= 5) {
                const currentNarrative = narrative0.Niamh; // Assuming Niamh is always present
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
    
    
    
updateNarrativeTracker(direction) {
    if (direction === 'increment') {
        this.narrativeTracker = Math.min(5, this.narrativeTracker + 1); // Ensure narrativeTracker does not exceed 5
    } else if (direction === 'decrement') {
        this.narrativeTracker = Math.max(0, this.narrativeTracker - 1); // Ensure narrativeTracker does not go below 0
    }
    console.log('Narrative Tracker:', this.narrativeTracker);
    // Now you can use this.narrativeTracker to update the text or any other functionality based on the current narrative index
}

}

export default Narrative0;

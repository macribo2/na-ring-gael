import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import './narrative.css';

// Define GameScene class before using it in the component
class GameScene extends Phaser.Scene {
    constructor(config) {
        super({ key: 'GameScene' });
        this.narrativeTracker = 0;
        this.textGa = null;
        this.textEn = null;
        this.overlay = null;
        this.isOverlayVisible = false;
        this.hero = 'hero';
    }

    // Accept setShowNarrative in init
    init(data) {
        this.setShowNarrative = data.setShowNarrative; // Access setShowNarrative here
    }

    preload() {
        this.load.json('narrative1', './phaser-resources/text/narrative1.json');  // Ensure the path is correctZ
   
        this.load.image('button-up', './phaser-resources/images/ui/pad-u.png');
        this.load.image('button-down', './phaser-resources/images/ui/pad-d.png');
        this.load.image('button-left', './phaser-resources/images/ui/pad-l.png');
        this.load.image('button-right', './phaser-resources/images/ui/pad-r.png');
        this.load.image('button-middle-lit', './phaser-resources/images/ui/middle-a.png');
        this.load.image('button-middle', './phaser-resources/images/ui/middle-b.png');
    }

    create() {
        this.addTextBubbles();
        this.setupControls();
        this.updateText();
     // Access the passed setShowNarrative function from settings
     if (this.sys.settings.data && this.sys.settings.data.setShowNarrative) {
        this.setShowNarrative = this.sys.settings.data.setShowNarrative;
    }


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
        
        // Access the passed setShowNarrative function
        if (this.scene.settings.data && this.scene.settings.data.setShowNarrative) {
            this.setShowNarrative = this.scene.settings.data.setShowNarrative;
        }
    }

    updateText() {
        const narrativeData = this.cache.json.get('narrative1');

        if (!narrativeData || !Array.isArray(narrativeData) || narrativeData.length === 0) {
            console.error('Narrative data is empty or not loaded correctly.');
            return;
        }

        const currentNarrative = narrativeData[0][this.hero];

        if (!currentNarrative) {
            console.error(`No narrative found for hero: ${this.hero}`);
            return;
        }

        const keyGa = `gae${this.narrativeTracker}`;
        const keyEn = `eng${this.narrativeTracker}`;

        if (currentNarrative[keyGa] && currentNarrative[keyEn]) {
            this.textGa.setText(currentNarrative[keyGa]);
            this.textEn.setText(currentNarrative[keyEn]);
        } else {
            console.error(`No dialogue found for narrative tracker: ${this.narrativeTracker}`);
        }

        // Save narrativeTracker to localStorage
        localStorage.setItem('narrativeTracker', this.narrativeTracker);

     
    }

    addTextBubbles() {
        // Define your logic for adding text bubbles here
        this.textGa = this.add.text(100, 100, '', { fontSize: '32px', fill: '#fff' });
        this.textEn = this.add.text(100, 150, '', { fontSize: '32px', fill: '#fff' });
    }

    setupControls() {
        // Your controls logic here
    }

    updateText() {
        const narrativeData = this.cache.json.get('narrative1');
    
        if (!narrativeData || !Array.isArray(narrativeData) || narrativeData.length === 0) {
            console.error('Narrative data is empty or not loaded correctly.');
            return;
        }
    
        const currentNarrative = narrativeData[0][this.hero];
    
        if (!currentNarrative) {
            console.error(`No narrative found for hero: ${this.hero}`);
            return;
        }
    
        const keyGa = `gae${this.narrativeTracker}`;
        const keyEn = `eng${this.narrativeTracker}`;
    
        if (currentNarrative[keyGa] && currentNarrative[keyEn]) {
            this.textGa.setText(currentNarrative[keyGa]);
            this.textEn.setText(currentNarrative[keyEn]);
        } else {
            console.error(`No dialogue found for narrative tracker: ${this.narrativeTracker}`);
        }
    
       
    }
    

    // Other methods...

    toggleOverlay() {
        this.isOverlayVisible = !this.isOverlayVisible;
        this.overlay.setVisible(this.isOverlayVisible);
        this.textEn.setVisible(this.isOverlayVisible);
    }
    updateNarrativeTracker(direction) {
        const maxTracker = 5;
        if (direction === 'increment') {
            this.narrativeTracker = Math.min(maxTracker, this.narrativeTracker + 1);
        } else {
            this.narrativeTracker = Math.max(0, this.narrativeTracker - 1);
        }
    
        // Update localStorage so the React component can track it
        localStorage.setItem('narrativeTracker', this.narrativeTracker);
    
        // Update the text bubbles, narrative, etc.
        this.updateText();
    }
    
    
}


const Narrative1 = ({ setShowNarrative }) => {
    const gameRef = useRef(null);

    useEffect(() => {
        const initializeGame = () => {
            const gameConfig = {
                type: Phaser.AUTO,
                width: window.innerWidth,
                height: window.innerHeight,
                parent: 'narrative-container',
                scene: [GameScene],
                backgroundColor: 'rgba(0, 60, 0, 0)', // Transparent background

                // Pass setShowNarrative via the scene config
                sceneConfig: {
                    data: {
                        setShowNarrative, // Passing the function here
                    },
                },
            };

            if (!gameRef.current) {
                gameRef.current = new Phaser.Game(gameConfig);
            }
        };

        initializeGame();

        // Cleanup on unmount
        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, [setShowNarrative]); // Ensure to include setShowNarrative in dependency array

    return <div id="narrative-container"></div>;
};

export default Narrative1;

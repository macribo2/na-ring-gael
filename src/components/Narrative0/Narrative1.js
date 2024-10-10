import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import './narrative.css';

// Define GameScene class before using it in the component
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.narrativeTracker = 0;
        this.textGa = null;
        this.textEn = null;
        this.overlay = null;
        this.isOverlayVisible = false; // Track overlay visibility
        this.hero = 'hero';
    }

    preload() {
        // Your preload logic here
    }

    create() {
        this.addTextBubbles();
        this.setupControls();
        this.updateText();
    }

    addTextBubbles() {
        // Your text bubbles logic here
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

        // Hide narrative overlay when narrativeTracker reaches 5
        if (this.narrativeTracker === 5) {
            alert('Narrative hidden');
            // Call props.setShowNarrative(false) in parent, passed via props if needed
        }
    }

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
                backgroundColor: 'rgba(0, 60, 0, 0)', // This makes the background transparent
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
    }, []);

    return <div id="narrative-container"></div>;
};

export default Narrative1;

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
        this.load.image('scene1-bg', '/phaser-resources/images/illustrations/snakeEmerge.png');
        this.load.image('scene2-bg', 'phaser-resources/images/illustrations/snakeEmerge2.png');
        this.load.image('scene3-bg', '/phaser-resources/images/illustrations/goldInLake.png');
        this.load.image('scene4-bg', '/phaser-resources/images/illustrations/snakeEmerge3.png');
        this.load.image('scene5-bg', '/phaser-resources/images/illustrations/torches.png');
        this.load.image('scene6-bg', '/phaser-resources/images/illustrations/torches2.png');
        this.load.json('narrative1', './phaser-resources/text/narrative1.json');  // Ensure the path is correct
        this.load.image('overlay', '/phaser-resources/images/big-glass.png');
        this.load.image('button-up', '/phaser-resources/images/ui/pad-u.png');
        this.load.image('button-up-yellow', '/phaser-resources/images/ui/pad-u-yellow.png');
        this.load.image('button-down', '/phaser-resources/images/ui/pad-d.png');
        this.load.image('button-left', '/phaser-resources/images/ui/pad-l.png');
        this.load.image('button-right', '/phaser-resources/images/ui/pad-r.png');
        this.load.image('button-down-yellow', '/phaser-resources/images/ui/pad-d-yellow.png');
        this.load.image('button-left-yellow', '/phaser-resources/images/ui/pad-l-yellow.png');
        this.load.image('button-right-yellow', '/phaser-resources/images/ui/pad-r-yellow.png');
        this.load.image('button-middle-lit', './phaser-resources/images/ui/middle-a.png');
        this.load.image('button-middle', './phaser-resources/images/ui/middle-b.png');
        this.load.audio('chirp', './phaser-resources/audio/text-message.ogg');
    }

    create() {
        const textures = ['button-right', 'button-right-yellow','button-right', 'button-right-yellow','button-right', 'button-right-yellow', ];
        
        const tileSize = 32;
        const gridWidth = 25; // Number of tiles in width
        const gridHeight = 18; // Number of tiles in height
        const bgWidth = tileSize * gridWidth;
        const bgHeight = tileSize * gridHeight;
    
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
        this.buttonMiddle = this.add.sprite(buttonX, buttonY, 'button-middle').setInteractive().setDepth(23).setScrollFactor(0);
        this.buttonMiddle.on('pointerdown', () => handleMiddleButtonClick(this));
    
        // Create the translucent background and English text
        this.translucentBg = this.add.tileSprite(this.cameras.main.width / 2, this.cameras.main.height / 2, bgWidth, bgHeight, 'overlay').setScale(3).setAlpha(0.8).setVisible(false);
        
        function handleMiddleButtonClick(scene) {
            if (scene.isMiddleButtonCooldown) return;
            toggleVisibility(scene);
            scene.buttonMiddle.setTexture('button-middle-lit');
            scene.isMiddleButtonCooldown = true;
            setTimeout(() => {
                scene.isMiddleButtonCooldown = false;
            }, 800);
        }
        
        this.buttonMiddle.on('pointerup', () => { 
            setTimeout(() => { this.buttonMiddle.setTexture('button-middle'); }, 800);
        });
    
        function toggleVisibility(scene) {
            scene.translucentBg.setVisible(!scene.translucentBg.visible);
            scene.textEn.setVisible(!scene.textEn.visible); // Use textEn instead of keyEn
        }
    
        this.buttonUp.on('pointerdown', () => {
            this.buttonUp.setTexture('button-up-yellow');
            this.updateNarrativeTracker('increment');
            this.updateText(); 
            setTimeout(() => {
                this.buttonUp.setTexture('button-up'); 
            }, 500);
        });
    
        this.buttonDown.on('pointerdown', () => {
            this.buttonDown.setTexture('button-down-yellow');
            this.updateNarrativeTracker('decrement');
            this.updateText(); 
            setTimeout(() => {
                this.buttonDown.setTexture('button-down'); 
            }, 500);
        });
    
        this.buttonLeft.on('pointerdown', () => {
            this.buttonLeft.setTexture('button-left-yellow');
            this.updateNarrativeTracker('decrement');
            this.updateText(); 
            setTimeout(() => {
                this.buttonLeft.setTexture('button-left'); 
            }, 500);
        });
    
        this.buttonRight.on('pointerdown', () => {
            this.buttonRight.setTexture('button-right-yellow');
            this.updateNarrativeTracker('increment');
            this.updateText(); 
        
            // Use arrow function to maintain the context of 'this'
            setTimeout(() => {
                // Check if this.buttonRight still exists before trying to set the texture
                if (this.buttonRight) {
                    this.buttonRight.setTexture('button-right'); 
                }
            }, 500);
        });
        
        // Function to prompt the right button
        function promptRightButton() {
            let index = 0; // Start with the first texture
        
            const changeTexture = () => {
                if (index < textures.length) {
                    this.buttonRight.setTexture(textures[index]); // Change to the current texture
                    index++; // Move to the next texture
        
                    // Set a timeout to change the texture again after 500ms
                    setTimeout(changeTexture, 500); // No need to bind here since we're using arrow function
                } else {
                    // Optionally revert to the original texture after the prompt
                    if (this.buttonRight) {
                        this.buttonRight.setTexture('button-right');
                    }
                }
            };
        
            changeTexture.call(this); // Start changing textures with the correct context
        }
        
    
        promptRightButton.call(this); // Call the function with the correct context
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
    
        // Update graphics based on the narrativeTracker
        this.updateGraphics();
    }
    updateGraphics() {
        const backgroundImages = [
            'scene1-bg',
            'scene2-bg',
            'scene3-bg',
            'scene4-bg',  // Add more as needed
            'scene5-bg',  // Add more as needed
            'scene6-bg',  // Add more as needed
        ];
    
        // Assuming you've preloaded these background images
        const currentBackground = backgroundImages[this.narrativeTracker];
    
        if (this.backgroundSprite) {
            this.backgroundSprite.setTexture(currentBackground);
        } else {
            this.backgroundSprite = this.add.sprite(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                currentBackground
            ).setOrigin(0.5, 0.5).setDepth(-1);  // Background below text and controls
        }
        console.log('Updating background to:', currentBackground);

    }
        



// Call this function to prompt the user
    addTextBubbles() {
        // Position for text bubbles
        const textPositionY = 10;
        const textPositionX = 10;
    
       
        // Add Irish text with initial ellipsis
        this.textGa = this.add.text(textPositionX, textPositionY, '...', {
            fontSize: '32px',
            fill: '#D8BFD8',
            stroke:'black',
            strokeThickness: '2',
            fontFamily: 'aonchlo',
            padding: { x: 10, y: 10 },
        }).setDepth(9999).setLineSpacing(-300);
    
        // Add English text below (or modify as needed)
        this.textEn = this.add.text(textPositionX, textPositionY + 160, '', {
            fontSize: '28px',
            fill: 'lime',
            fontFamily: 'Ubuntu',
            padding: { x: 10, y: 10 },
            stroke: '#000000',
            strokeThickness: 3
        }).setDepth(998).setVisible(false);
    
   
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
        const keyGa = `gae${this.narrativeTracker}`;
        const keyEn = `eng${this.narrativeTracker}`;
    
        if (currentNarrative[keyGa] && currentNarrative[keyEn]) {
            // Play chirp sound when text appears
            this.sound.play('chirp');
    
            // Fade out the existing background before updating the text and background
            this.fadeOutBackground(() => {
                // Set text after background fades out
                this.textGa.setText(currentNarrative[keyGa]);
                this.textEn.setText(currentNarrative[keyEn]);
    
                // Fade in the updated background after a short delay
                this.time.delayedCall(100, () => {
                    this.fadeInBackground();
                });
            });
    
        } else {
            console.error(`No dialogue found for narrative tracker: ${this.narrativeTracker}`);
        }
    }
    
    fadeInBackground() {
        const backgroundImages = [
            'scene1-bg',
            'scene2-bg',
            'scene3-bg',
            'scene4-bg',
            'scene5-bg',
            'scene6-bg',
        ];
    
        const currentBackground = backgroundImages[this.narrativeTracker];
    
        // Create or update the background sprite and fade it in
        if (this.backgroundSprite) {
            this.backgroundSprite.setTexture(currentBackground);
            this.tweens.add({
                targets: this.backgroundSprite,
                alpha: { from: 0, to: 1 },
                duration: 500, // Fade in over 1 second
                ease: 'Power2'
            });
        } else {
            this.backgroundSprite = this.add.sprite(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                currentBackground
            ).setOrigin(0.5, 0.5).setAlpha(0).setDepth(-1);
    
            this.tweens.add({
                targets: this.backgroundSprite,
                alpha: { from: 0, to: 1 },
                duration: 500,
                ease: 'Power2'
            });
        }
    }
    
    fadeOutBackground(onComplete) {
        if (this.backgroundSprite) {
            // Fade out the current background
            this.tweens.add({
                targets: this.backgroundSprite,
                alpha: { from: 1, to: 0 },
                duration: 1000, // Fade out over 1 second
                ease: 'Power2',
                onComplete: onComplete, // Call the callback after fade out completes
            });
        } else {
            // If no background exists, immediately call the onComplete function
            onComplete();
        }
    }
    
    
    fadeInBackground() {
        const backgroundImages = [
            'scene1-bg',
            'scene2-bg',
            'scene3-bg',
            'scene4-bg',
            'scene5-bg',
            'scene6-bg',
        ];
    
        const currentBackground = backgroundImages[this.narrativeTracker];
    
        // If the background sprite already exists, fade it in
        if (this.backgroundSprite) {
            this.backgroundSprite.setTexture(currentBackground);
            this.tweens.add({
                targets: this.backgroundSprite,
                alpha: { from: 0, to: 1 },
                duration: 1000, // Fade in over 1 second
                ease: 'Power2'
            });
        } else {
            // Create the background sprite with an initial alpha of 0
            this.backgroundSprite = this.add.sprite(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                currentBackground
            ).setOrigin(0.5, 0.5).setAlpha(0).setDepth(-1);
    
            // Fade in the sprite
            this.tweens.add({
                targets: this.backgroundSprite,
                alpha: { from: 0, to: 1 },
                duration: 1000,
                ease: 'Power2'
            });
        }
    }
    

    // Other methods...

    toggleOverlay() {
        this.isOverlayVisible = !this.isOverlayVisible;
        this.overlay.setVisible(this.isOverlayVisible);
        this.textEn.setVisible(this.isOverlayVisible);
    }
    updateNarrativeTracker(direction) {
        const maxTracker = 7;
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
        let timeoutId;
    
        const initializeGame = () => {
            const gameConfig = {
                type: Phaser.AUTO,
                width: window.innerWidth,
                height: window.innerHeight,
                parent: 'narrative-container',
                scene: [GameScene],
                backgroundColor: '#191970',
                sceneConfig: {
                    data: {
                        setShowNarrative,
                    },
                },
            };
    
            if (!gameRef.current) {
                gameRef.current = new Phaser.Game(gameConfig);
    
                gameRef.current.events.on('shutdown', () => {
                    const scene = gameRef.current.scene.scenes[0];
                    if (scene) {
                        if (scene.buttonRight) scene.buttonRight.destroy();
                        if (scene.buttonLeft) scene.buttonLeft.destroy();
                        if (scene.buttonUp) scene.buttonUp.destroy();
                        if (scene.buttonDown) scene.buttonDown.destroy();
                        if (scene.buttonMiddle) scene.buttonMiddle.destroy();
                    }
                });
            }
        };
    
        const setButtonTextureAfterDelay = () => {
            timeoutId = setTimeout(() => {
                if (
                    gameRef.current &&
                    gameRef.current.scene &&
                    gameRef.current.scene.scenes[0] &&
                    gameRef.current.scene.scenes[0].buttonRight
                ) {
                    gameRef.current.scene.scenes[0].buttonRight.setTexture('button-right');
                }
            }, 500);
        };
        
    
        initializeGame();
        setButtonTextureAfterDelay();
    
        // Cleanup on unmount
        return () => {
            clearTimeout(timeoutId); // Clear timeout to prevent errors
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, [setShowNarrative]);
    
    return <div id="narrative-container"></div>;
};

export default Narrative1;

import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { useHistory } from 'react-router-dom';
import './narrative.css';

const Narrative0 = () => {
    const gameRef = useRef(null);
    const appHistory = useHistory(); // Correct for react-router-dom v5

    useEffect(() => {
        const initializeGame = () => {
            const gameConfig = {
                type: Phaser.AUTO,
                width: window.innerWidth,
                height: window.innerHeight,
                parent: 'narrative-container',
                scene: [GameScene],
            };

            if (!gameRef.current) {
                gameRef.current = new Phaser.Game(gameConfig);
            }
        };

        const handleNarrativeComplete = () => {
            appHistory.push("/rings4"); // Navigate to the new route when narrative is complete
        };

        // Listen for custom narrativeComplete event
        window.addEventListener('narrativeComplete', handleNarrativeComplete);

        initializeGame();

        // Cleanup on unmount
        return () => {
            window.removeEventListener('narrativeComplete', handleNarrativeComplete);
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, [appHistory]);

    return <div id="narrative-container"></div>;
};

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.music = null;
        this.narrativeTracker = 0;
        this.textGa = null;
        this.textEn = null;
        this.hero = localStorage.getItem('portrait');
        this.graphics = null;
    }

 
    preload() {
        this.load.image('button-up', '/phaser-resources/images/ui/pad-u.png');
    
        this.load.image('button-down', '/phaser-resources/images/ui/pad-d.png');
        this.load.image('button-left', '/phaser-resources/images/ui/pad-l.png');
        this.load.image('button-right', '/phaser-resources/images/ui/pad-r.png');
        this.load.image('button-down-yellow', '/phaser-resources/images/ui/pad-d-yellow.png');
        this.load.image('button-left-yellow', '/phaser-resources/images/ui/pad-l-yellow.png');
        this.load.image('button-right-yellow', '/phaser-resources/images/ui/pad-r-yellow.png');
        this.load.image('button-middle-lit', './phaser-resources/images/ui/middle-a.png');
        this.load.image('button-middle', './phaser-resources/images/ui/middle-b.png');
        this.load.image('overlay', '/phaser-resources/images/big-glass.png');


        // this.load.audio('threeRedHearts', './phaser-resources/audio/threeRedHearts.ogg');
        this.load.image('button-up-yellow', '/phaser-resources/images/ui/pad-u-yellow.png');
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
    }
    
    create() {
        const textures = ['button-right', 'button-right-yellow','button-right', 'button-right-yellow','button-right', 'button-right-yellow', ];
       
        this.updateNarrativeTracker();
        this.hero = parseInt(this.hero); // Convert to a number

        this.textGa = this.add.text(100, 100, '', { fontSize: '32px', color: '#ffffff' ,fontFamily:'aonchlo'});
        this.textEn = this.add.text(100, 150, '', { fontSize: '32px', color: '#ffffff' });
        const tileSize = 32;
        const gridWidth = 25; // Number of tiles in width
        const gridHeight = 18; // Number of tiles in height
        const bgWidth = tileSize * gridWidth;
        const bgHeight = tileSize * gridHeight;
    

        this.updateText();   
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
            this.textEn = this.add.text(30, 200, firstEnText, { color: 'lime', fontFamily: 'ubuntu'});
            this.textGa.setFontSize(32);
            this.textGa.setDepth(19);
            this.textEn.setFontSize(32);
            this.textEn.setDepth(19);
        this.textEn.setVisible(false)


        } else {
            console.error('narrative data is empty or not loaded correctly.');
        }

        const glassbg0 = this.add.sprite(0, 0, 'glassbg0').setOrigin(0);
        glassbg0.setAlpha(0.1);
        const glassbg = this.add.sprite(0, 0, 'glassbg0').setOrigin(0);
        glassbg.displayWidth = this.sys.game.config.width;
        glassbg.displayHeight = this.sys.game.config.height;
        this.overlay = this.add.container(0, 0);
        this.overlay.setVisible(true);
        this.overlay.add([glassbg0, this.textEn]);
        const buttonX = this.sys.game.config.width - 150;
        const buttonY = this.sys.game.config.height / 2 + 50;
        this.buttonLeft = this.add.sprite(buttonX - 50, buttonY, 'button-left').setInteractive().setDepth(4);
        this.buttonDown = this.add.sprite(buttonX, buttonY + 50, 'button-down').setInteractive().setDepth(4);
        this.buttonRight = this.add.sprite(buttonX + 50, buttonY, 'button-right').setInteractive().setDepth(4);
        this.buttonUp = this.add.sprite(buttonX, buttonY - 50, 'button-up').setInteractive().setDepth(4);

        this.buttonMiddle = this.add.sprite(buttonX, buttonY, 'button-middle').setInteractive().setDepth(4);
        this.buttonMiddle.on('pointerdown', () => handleMiddleButtonClick(this));
    
        this.buttonUp.on('pointerdown', () => {
            this.buttonUp.setTexture('button-up-yellow');
            this.updateNarrativeTracker('increment');
            this.updateText(); 
            setTimeout(() => {
                this.buttonUp.setTexture('button-up'); 
            }, 500);
        });
        function toggleVisibility(scene) {
            // Toggle visibility of elements
            scene.translucentBg.setVisible(!scene.translucentBg.visible);
            scene.textEn.setVisible(!scene.textEn.visible); // Use textEn instead of keyEn
        }
        function handleMiddleButtonClick(scene) {
            if (scene.isMiddleButtonCooldown) {return;}
            toggleVisibility(scene);
            scene.buttonMiddle.setTexture('button-middle-lit');
            scene.isMiddleButtonCooldown = true;
            setTimeout(() => {
                scene.isMiddleButtonCooldown = false;
            }, 100);
        }
        
        this.buttonMiddle.on('pointerup', () => { 
            setTimeout(() => { this.buttonMiddle.setTexture('button-middle'); }, 800);
        });
// Create the translucent background and English text
this.translucentBg = this.add.tileSprite(this.cameras.main.width / 2, this.cameras.main.height / 2, bgWidth, bgHeight, 'overlay').setScale(3).setAlpha(0.8).setVisible(false);
        
   
    
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
    updateText = () => {
        if (this.narrativeTracker === 6) {
            const narrativeCompleteEvent = new CustomEvent('narrativeComplete');
            window.dispatchEvent(narrativeCompleteEvent); // Emit custom event on window
            
            return;
        }
    
        const narrativeData = this.cache.json.get('narrative0');
        if (Array.isArray(narrativeData) && narrativeData.length > 0) {
            const narrative0 = narrativeData[0];
            const currentNarrative = narrative0[this.hero];
    
            if (currentNarrative) {
                const key = `gae${this.narrativeTracker}`;
                if (currentNarrative[key]) {
                    this.textGa.setText(currentNarrative[key]);
                    this.textEn.setText(currentNarrative[key.replace('gae', 'eng')]);
                } else {
                    console.error(`No dialogue found for key: ${key}`);
                }
            } else {
                console.error(`No narrative found for hero: ${this.hero}`);
            }
        } else {
            console.error('narrativeData is empty or not loaded correctly.');
        }
    };
    

    toggleOverlay() {
        this.overlay.setVisible(!this.overlay.visible);
    }

    
    updateNarrativeTracker(direction) {
        if (direction === 'increment') {
            this.narrativeTracker = Math.min(6, this.narrativeTracker + 1); // Ensure narrativeTracker does not exceed 5
        } else if (direction === 'decrement') {
            this.narrativeTracker = Math.max(0, this.narrativeTracker - 1); // Ensure narrativeTracker does not go below 0
        }
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

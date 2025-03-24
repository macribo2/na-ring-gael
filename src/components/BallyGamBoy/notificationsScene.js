import Phaser from 'phaser';

class NotificationScene extends Phaser.Scene {
    constructor() {
        super({ key: 'NotificationScene' });
        this.currentStep = 0;
        this.objectiveDismissed = false;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.timeoutIds = []; // Track timeout IDs
        this.hasPlayedDescend = false;
        this.textsGa = [
            'Ní rachfaidh mé gan mo héidaigh.',
            '',
            
        ];

        this.textsEn = [
            'I won\'t go without my clothes',
            '',
        ];

        this.isDismissing = false; // Add this line
        this.cooldownDuration = 500; // Add this line - adjust value as needed
    }

    preload() {
        // Load the frame image
        this.load.image('frame', 'phaser-resources/images/mapFrame2.png');
        this.load.image('upButtonDark', '/phaser-resources/images/ui/pad-u.png');
        this.load.image('downButtonDark', '/phaser-resources/images/ui/pad-d.png');
        this.load.image('leftButtonDark', '/phaser-resources/images/ui/pad-l.png');
        this.load.image('rightButtonDark', '/phaser-resources/images/ui/pad-r.png');
        this.load.image('middleButtonDark', '/phaser-resources/images/ui/middle-b.png');
        this.load.image('upButtonLit', '/phaser-resources/images/ui/pad-u-lit.png');
        this.load.image('downButtonLit', '/phaser-resources/images/ui/pad-d-lit.png');
        this.load.image('leftButtonLit', '/phaser-resources/images/ui/pad-l-lit.png');
        this.load.image('rightButtonLit', '/phaser-resources/images/ui/pad-r-lit.png');
        this.load.image('middleButtonLit', '/phaser-resources/images/ui/middle-a.png');
    }

    // Function to set button to lit texture
    setButtonLit(button, buttonName) {
        if (button && button.scene) {
            button.setTexture(buttonName);
        }
    }

    // Function to reset button to normal texture
    resetButton(button, buttonName) {
        if (button && button.scene) {
            button.setTexture(buttonName);
        }
    }

    create() {
        // Add grey lines to simulate the frame's top and left walls
        const lineColor = 0x4b474b;
        const lineThickness = 15;

      
        // Top line
        this.topLine =   this.add.rectangle(0, 0, this.scale.width - 10, lineThickness, lineColor).setOrigin(0, 0).setDepth(900);

        // Left line
        this.leftLine =     this.add.rectangle(0, 0, lineThickness + 15, this.scale.height - 28, lineColor).setOrigin(0, 0).setDepth(900);

        // Add the frame image
        this.frameImage = this.add.image(this.scale.width / 2, this.scale.height / 2, 'frame');
        this.frameImage.setOrigin(0.5); // Center the origin
        this.frameImage.setDisplaySize(this.scale.width, this.scale.height); // Adjust size to account for lines
        

        this.textObjectEn = this.add.text(this.scale.width * 0.05, this.scale.height * 0.6, '', {
            font: '32px Anaphora',
            fill: 'plum',
            wordWrap: { width: this.scale.width * 0.8 },
            stroke: '#000000', // Stroke color (black)
            strokeThickness: 4, // Thickness of the stroke
        }).setVisible(true).setDepth(45).setAlpha(0);

        this.textObjectGa = this.add.text(this.scale.width * 0.05, this.scale.height * 0.1, '', {
            font: '32px aonchlo',
            fill: 'LavenderBlush',
            wordWrap: { width: this.scale.width * 0.8 },
        }).setDepth(44);

        // Initialize typing effect using rexTextTyping
        this.typingEffect = this.rexTextTyping.add(this.textObjectGa, {
            speed: 30, // Set the speed of typing
        });

        // Start typing effect on the first text
        this.typingEffect.start(this.textsGa[this.currentStep]).on('complete', () => {
            console.log('Typing complete');
            this.textObjectEn.setText(this.textsEn[this.currentStep]).setDepth(47);
        });

        // Dynamically calculate the position
        const buttonSize = 65;
        const buttonSpacing = 0;
        const centerX = this.scale.width * 0.85; // Adjust for your layout
        const centerY = this.scale.height * 0.7;

        // Load button graphics
        this.upButton = this.add.image(centerX, centerY - (buttonSize + buttonSpacing), 'upButtonDark').setInteractive().setDepth(200);
        this.downButton = this.add.image(centerX, centerY + (buttonSize + buttonSpacing), 'downButtonDark').setInteractive().setDepth(200);
        this.leftButton = this.add.image(centerX - (buttonSize + buttonSpacing), centerY, 'leftButtonDark').setInteractive().setDepth(200);
        this.rightButton = this.add.image(centerX + (buttonSize + buttonSpacing), centerY, 'rightButtonDark').setInteractive().setDepth(200);
        this.middleButton = this.add.image(centerX, centerY, 'middleButtonDark').setInteractive().setDepth(200);

        // Ensure buttons exist
        if (!this.rightButton) console.error('ControlSquare2 does not have a rightButton defined!');
        if (!this.middleButton) console.error('ControlSquare2 does not have a middleButton defined!');
        if (!this.leftButton) console.error('ControlSquare2 does not have a leftButton defined!');
        if (!this.downButton) console.error('ControlSquare2 does not have a downButton defined!');
        if (!this.upButton) console.error('ControlSquare2 does not have a upButton defined!');

        // Variable to track whether the translation is visible or not
        this.isTranslationVisible = false; // Start with the Irish version visible

        // Set up button event handlers
        this.setupButtonHandlers();





// Save back to localStorage

    }

    // Move button handlers to a separate method for better organization
    setupButtonHandlers() {
        // Bind the context for functions to be used in timeouts
        const self = this;

        // Create the middle button to toggle translations
        this.middleButton.on('pointerdown', () => {
            this.setButtonLit(this.middleButton, 'middleButtonLit');

            const timeoutId = setTimeout(() => {
                if (this.scene.isActive()) {
                    this.resetButton(this.middleButton, 'middleButtonDark');
                }
            }, 1000);
            this.timeoutIds.push(timeoutId);

            // Check if cooldown is active
            if (this.isCooldownActive) return;

            // Activate cooldown
            this.isCooldownActive = true;
            this.time.delayedCall(this.cooldownDuration, () => {
                this.isCooldownActive = false;
            });

            // Toggle the visibility of the English translation
            this.isTranslationVisible = !this.isTranslationVisible;

            // Update the displayed text based on the current visibility state
            if (this.isTranslationVisible) {
                // Show English translation
                if (this.textObjectEn) {
                    this.textObjectEn.setVisible(true).setAlpha(0.8).setDepth(48);
                } else {
                    console.error("textObjectEn is not defined. Ensure it is created before this point.");
                }
            } else {
                // Hide English translation
                if (this.textObjectEn) {
                    this.textObjectEn.setVisible(false);
                }
            }
        });

        this.rightButton.on('pointerdown', () => {
            this.dismissNotification();

        });

        this.upButton.on('pointerdown', () => {
            this.dismissNotification();
          
        });

        this.downButton.on('pointerdown', () => {
            this.dismissNotification();
           
        });

        this.leftButton.on('pointerdown', () => {
            this.dismissNotification();
           
        });
    }

    // Extract message transition methods to class methods
    showNextMessageWithTyping(newMessage) {
        // Animate the old text sliding up and fading out
        this.tweens.add({
            targets: this.textObjectGa,
            y: this.textObjectGa.y - 100, // Move up by 100 pixels
            alpha: 0, // Fade out
            duration: 500, // Duration of the animation
            ease: 'Quad.easeIn',
            onComplete: () => {
                // Once the animation is complete, reset the text object
                this.textObjectGa.y += 100; // Move back to the original position
                this.textObjectGa.alpha = 1; // Reset alpha for the new text
                this.textObjectGa.setText(''); // Clear the text

                // Start the typing effect for the new message
                this.typingEffect.start(newMessage);
            }
        });
    }

 

    dismissNotification() {
        console.log('dismissNotification() was called');
    
        // Clear timeouts
        if (this.timeoutIds && this.timeoutIds.length > 0) {
            this.timeoutIds.forEach(id => clearTimeout(id));
            this.timeoutIds = [];
        }
    
        // Remove listeners
        if (this.rightButton) this.rightButton.removeAllListeners();
        if (this.leftButton) this.leftButton.removeAllListeners();
        if (this.upButton) this.upButton.removeAllListeners();
        if (this.downButton) this.downButton.removeAllListeners();
        if (this.middleButton) this.middleButton.removeAllListeners();
    
        // Fade out the objective text, frame, buttons, and lines
        this.tweens.add({
            targets: [
                this.textObjectEn, 
                this.textObjectGa, 
                this.frameImage,
                this.upButton, 
                this.downButton, 
                this.leftButton, 
                this.rightButton, 
                this.middleButton,
                this.topLine, // Assuming the line is saved as this.topLine
                this.leftLine,  // Assuming the line is saved as this.leftLine
            ],
            alpha: 0,
            duration: 1000,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                console.log('Emitting objectiveDismissed event');
                if (this.game && this.game.events) {
                    this.game.events.emit('objectiveDismissed');
                } else if (this.events) {
                    this.events.emit('objectiveDismissed');
                } else {
                    console.error('No event emitter found');
                }
           
                // Delay scene stop slightly
                this.time.delayedCall(500, () => {
                    console.log('Stopping NotificationScene');
                    this.scene.stop('NotificationScene');
                });
            }
        });
    }
    
    // Add shutdown method to ensure cleanup
    shutdown() {
        // Clear all timeouts
        if (this.timeoutIds && this.timeoutIds.length > 0) {
            this.timeoutIds.forEach(id => clearTimeout(id));
            this.timeoutIds = [];
        }

        // Remove all listeners
        if (this.rightButton) this.rightButton.removeAllListeners();
        if (this.leftButton) this.leftButton.removeAllListeners();
        if (this.upButton) this.upButton.removeAllListeners();
        if (this.downButton) this.downButton.removeAllListeners();
        if (this.middleButton) this.middleButton.removeAllListeners();
    }

    update() {
        if (this.currentStep === 0) {
           }

        if (this.currentStep === 1) {
           }
        if (this.currentStep === 2) {
          
        }
        

        if (this.currentStep === 3) {
        }
    }
}

export default NotificationScene;

import Phaser from 'phaser';

class ObjectiveScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ObjectiveScene' });
        this.currentStep = 0;
        this.objectiveDismissed = false;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.timeoutIds = []; // Track timeout IDs

        this.textsGa = [
            'Cá bhfuil mé?',
            'Cá bhfuil mo bhrístí?',
            'Ar sciobadh mo héide?',
        ];

        this.textsEn = [
            'Where am I?',
            'Where are my breeches?',
            'I\'ll find those cursed pookas',
            'But first, my clothes ',
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
        this.add.rectangle(0, 0, this.scale.width - 10, lineThickness, lineColor).setOrigin(0, 0).setDepth(900);

        // Left line
        this.add.rectangle(0, 0, lineThickness + 15, this.scale.height - 28, lineColor).setOrigin(0, 0).setDepth(900);

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
            this.setButtonLit(this.rightButton, 'rightButtonLit');

            const timeoutId = setTimeout(() => {
                if (this.scene.isActive()) {
                    this.resetButton(this.rightButton, 'rightButtonDark');
                }
            }, 1000);
            this.timeoutIds.push(timeoutId);

            if (this.isCooldownActive || this.currentStep >= 4) return; // Prevent input past step 5

            this.isCooldownActive = true;
            this.currentStep++;

            if (this.currentStep < this.textsGa.length) {
                this.showNextMessageWithTyping(this.textsGa[this.currentStep]);
            } else {
                this.scene.start('MainGame');
            }

            this.time.delayedCall(this.cooldownDuration, () => {
                this.isCooldownActive = false;
            });

            // 🛑 Disable button interaction when step >= 5
            if (this.currentStep >= 4) {
                this.rightButton.disableInteractive(); // Disable the button
                console.log('Button disabled to prevent rapid presses.');
            }
        });

        this.upButton.on('pointerdown', () => {
            if (this.isCooldownActive) return;

            this.setButtonLit(this.upButton, 'upButtonLit');

            const timeoutId = setTimeout(() => {
                if (this.scene.isActive()) {
                    this.resetButton(this.upButton, 'upButtonDark');
                }
            }, 1000);
            this.timeoutIds.push(timeoutId);

            this.isCooldownActive = true;
            this.currentStep++;

            if (this.currentStep < this.textsGa.length) {
                this.showNextMessageWithTyping(this.textsGa[this.currentStep]);
            } else {
                this.scene.start('MainGame');
            }

            this.time.delayedCall(this.cooldownDuration, () => {
                this.isCooldownActive = false;
            });

            // 🛑 Disable button interaction when step >= 5
            if (this.currentStep >= 4) {
                this.rightButton.disableInteractive(); // Disable the button
                console.log('Button disabled to prevent rapid presses.');
            }
        });

        this.downButton.on('pointerdown', () => {
            if (this.isCooldownActive) return;

            this.setButtonLit(this.downButton, 'downButtonLit');

            const timeoutId = setTimeout(() => {
                if (this.scene.isActive()) {
                    this.resetButton(this.downButton, 'downButtonDark');
                }
            }, 1000);
            this.timeoutIds.push(timeoutId);

            this.isCooldownActive = true;

            if (this.currentStep > 0) {
                this.showPreviousMessageWithDropDown();
            } else {
                console.log("Already at the first message");
            }

            this.time.delayedCall(this.cooldownDuration, () => {
                this.isCooldownActive = false;
            });
        });

        this.leftButton.on('pointerdown', () => {
            if (this.isCooldownActive) return;

            this.setButtonLit(this.leftButton, 'leftButtonLit');

            const timeoutId = setTimeout(() => {
                if (this.scene.isActive()) {
                    this.resetButton(this.leftButton, 'leftButtonDark');
                }
            }, 1000);
            this.timeoutIds.push(timeoutId);

            this.isCooldownActive = true;

            if (this.currentStep > 0) {
                this.showPreviousMessageWithDropDown();
            } else {
                console.log("Already at the first message");
            }

            this.time.delayedCall(this.cooldownDuration, () => {
                this.isCooldownActive = false;
            });
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

    showPreviousMessageWithDropDown() {
        // Animate the current text sliding up and fading out
        this.tweens.add({
            targets: this.textObjectGa,
            y: this.textObjectGa.y + 100, // Move down by 100 pixels
            alpha: 0, // Fade out
            duration: 500, // Duration of the animation
            ease: 'Quad.easeIn',
            onComplete: () => {
                // Once the animation is complete, reset the text object
                this.textObjectGa.y -= 100; // Move back to the original position
                this.textObjectGa.alpha = 1; // Reset alpha for the new text
                this.textObjectGa.setText(''); // Clear the text

                // Set the previous message as the current one and start showing it
                this.currentStep--; // Move back to the previous step
                if (this.currentStep >= 0) {
                    // Slide the previous message down and fade it in
                    this.tweens.add({
                        targets: this.textObjectGa,
                        y: this.textObjectGa.y, // Keep at the original position
                        alpha: 1, // Fade in
                        duration: 500, // Duration of the animation
                        ease: 'Quad.easeOut',
                        onComplete: () => {
                            // Set the previous message text
                            this.textObjectGa.setText(this.textsGa[this.currentStep]);
                            this.textObjectEn.setText(this.textsEn[this.currentStep]);
                        }
                    });
                }
            }
        });
    }

    dismissObjective() {
        console.log('dismissObjective() was called');

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

        // Fade out the objective text
        this.tweens.add({
            targets: [this.textObjectEn, this.textObjectGa, this.frameImage],
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
                    console.log('Stopping ObjectiveScene');
                    this.scene.stop('ObjectiveScene');
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
            // Logic for step 0
        }

        if (this.currentStep === 1) {
            this.game.events.emit('arise');
        }

        if (this.currentStep === 2) {
            console.log('Current step is ≥ 2, isDismissing:', this.isDismissing);
            this.dismissObjective();
        }

        // Add a flag to ensure dismissObjective is called only once
        if (this.currentStep >= 3 && !this.isDismissing) {
            console.log('Calling dismissObjective()');
            this.isDismissing = true; // Set flag to prevent multiple calls
            this.dismissObjective();
        }
    }
}

export default ObjectiveScene;

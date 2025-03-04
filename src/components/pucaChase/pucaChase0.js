import Phaser, { AUTO } from 'phaser';

import RippleManager from '../IntroSequence/rippleManager'



class PucaChase0 extends Phaser.Scene {
  constructor() {
    
    super({ key: 'PucaChase0' });
    this.width= window.innerWidth; // Set width to match the window width
    this.height=window.innerHeight; // Set height to match the window height
    this.isRaining = false;
    this.currentStep = 0;
    this.characterSheet = {};
    this.textsGa = [
      'lasmuigh, bhí sé ina stealladh báistí.',
      'Deabhal fothain a bhí sa phluais',  
      'Mo bhrat? Ar snámh.\nMo chathéide? báite.',
      'Ní fada go mbéadh an phluais\nfaoi uisce... ach foighne!','Diúltaím mo charbad féin a bhrú. Ceap magaidh!\nFanfaidh mé anseo go dtí go feicim-',
      'Deis! Ach go tobann - ',
    ];
    this.textsEn = [
      'outside, it poured',
      'Devil the shelter was in the cave.',
      'My armour? Soaked\nMy cloak? swimming',
      'Not long before the cave would be \nflooded... but patience!',
      'I refuse to push my own chariot - \na laughing stock!\nI\'ll stay here until I see-',
      'A chance! But suddenly - ',
      
    ];
    let horseBlack, horseWhite;
    this.xPosition1 = 0;
    this.xPosition2 = 200;
    this.yPosition1 = 200;
    this.yPosition2 = 200;
    
  
  // Function to switch to the lit (pressed) version of the button
  const setButtonLit = (button, buttonName) => {
    button.setTexture(buttonName); // Switch to the "lit" texture (e.g., upButtonLit)
  };

  // Function to reset to the normal button state
  const resetButton = (button, buttonName) => {
    button.setTexture(buttonName); // Switch back to the normal texture (e.g., buttonUp)
  };

  
  }
  destroy() {
    // Clean up or stop the ripple effect
    this.scene.tweens.killAll(); // Stop all active tweens
    // Add any additional cleanup logic, like stopping animations or removing objects
  }
  
  preload() {
    this.load.spritesheet('pookacave', 'phaser-resources/images/npcs/pookacave-sprite.png', {
      frameWidth: 509,  // Example: If the spritesheet is 644px wide with 4 frames
      frameHeight:644
    });
    this.load.spritesheet('pookacave2', 'phaser-resources/images/npcs/pookacave-sprite2.png', {
      frameWidth: 509,  // Example: If the spritesheet is 644px wide with 4 frames
      frameHeight:644
    });
   
    this.load.audio('thunder', 'phaser-resources/audio/thunder.wav');
    this.load.audio('rainSound', 'phaser-resources/audio/rain.ogg'); 
    
    this.load.image('bg1', 'phaser-resources/images/bg1.png');
    // Load assets needed for the main game
    this.load.atlas('championSprites', 'phaser-resources/images/champions0.png', 'phaser-resources/json/champions0.json');
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
  
  create() {
    const originalWidth = 509;
    const originalHeight = 644;
    const newWidth = this.width; // Full width of the screen
    const newHeight = (newWidth / originalWidth) * originalHeight; // Keep aspect ratio
    
    
// Add this to your game initialization
// Create the rain sound but don't play it yet
this.rainSound = this.sound.add('rainSound', { loop: true, volume: 0.5 });
this.thunder = this.sound.add('thunder', { loop: false, volume: 1 });
if (this.rainSound) this.rainSound.play();


// Adjust the starting Y position (further up)
const startY = -100; // Moves it even further up

    this.rippleManager = new RippleManager(this);

     this.anims.create({
      key: 'pookacaveanim', 
      frames: this.anims.generateFrameNumbers('pookacave', {
        start: 0,
        end: 2,
        margin: 0,
        frameWidth: 509,
        frameHeight: 644
      }),
      frameRate: 10,  // Slow down the animation for smoother transition
      repeat: -1      
    });
    
    this.anims.create({
      key: 'pookacaveanim2', 
      frames: this.anims.generateFrameNumbers('pookacave2', {
        start: 0,
        end: 2,
        margin: 0,
        frameWidth: 509,
        frameHeight: 644
      }),
      frameRate: 10,  // Slow down the animation for smoother transition
      repeat: -1      
    });
    
  this.pookacave = this.add.sprite(this.width / 2, startY, 'pookacave')
    .setDisplaySize(newWidth, newHeight)  
    .setAlpha(0)  // Initially visible
    .setDepth(20); // Keep it on top
    this.pookacave2 = this.add.sprite(this.width / 2, startY, 'pookacave2')
    .setDisplaySize(newWidth, newHeight)  
    .setAlpha(0)  // Initially visible
    .setDepth(20); // Keep it on top

// Check if the animation exists before playing it
if (this.anims.exists('pookacaveanim')) {
 this.pookacave.play('pookacaveanim');
} else {
 console.error("Animation 'pookacaveanim' is not found!");
}this.pookacave.on('animationupdate', (anim, frame) => {
  console.log(`Current frame: ${frame.index}`);
});
if (this.anims.exists('pookacaveanim2')) {
  this.pookacave2.play('pookacaveanim2');
 } else {
  console.error("Animation 'pookacaveanim' is not found!");
 }this.pookacave2.on('animationupdate', (anim, frame) => {
   console.log(`Current frame: ${frame.index}`);
 });
 
   // const texture2 = this.textures.get('pookacave').getSourceImage();
console.log(this.textures.list); // Lists all loaded textures
console.log(this.textures.exists('pookacave')); // Should return true if loaded

      // Cooldown flag and timer
  this.isCooldownActive = false;
  this.cooldownDuration = 500; // 500ms cooldown
  
  const backgroundDarken = this.add.image(0, 0, 'bg1'); // Position it at (0, 0)
  // Set the image origin to the center of the image so it can be sc    this.choiceTextGa.setVisible(!this.isEnglish);

  backgroundDarken.setOrigin(0, 0); // Set origin to the top-left corner
  
  // Scale the image to cover the entire screen
  backgroundDarken.setDisplaySize(this.scale.width, this.scale.height); // Stretch to the full screen size
  backgroundDarken.setAlpha(1);
  const scrollSpeed = 300; // Initial speed (pixels per second)
  const imageHeight = 740; // Image height
  let slowingDown = false; // Track the slowing down state
    // Create text object for narrative
    this.textObjectGa = this.add.text(this.scale.width * 0.05, this.scale.height * 0.1, '', {
      font: '32px aonchlo',
      fill: 'LavenderBlush',
      
      wordWrap: { width:this.scale.width*0.8 },
    }).setDepth(10).setDepth(44);


    this.textObjectEn = this.add.text(this.scale.width * 0.05, this.scale.height * 0.6, '', {
        font: '32px dum1',
        fill: 'plum',
        wordWrap: { width: this.scale.width * 0.8},
        stroke: '#000000', // Stroke color (black)
        strokeThickness: 4, // Thickness of the stroke
      }).setVisible(true).setDepth(45).setAlpha(0);
      
  
    // Initialize typing effect using rexTextTyping
    this.typingEffect = this.rexTextTyping.add(this.textObjectGa, {
      speed:30, // Set the speed of typing
    });

    // Start typing effect on the first text
    this.typingEffect.start(this.textsGa[this.currentStep]).on('complete', () => {
      console.log('Typing complete');
      this.textObjectEn.setText(this.textsEn[this.currentStep]).setDepth(47);

      // Add logic to show next text or transition to next scene
    });

    // Dynamically calculate the position
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;

// Button positions
const buttonSize = 65;
const buttonSpacing = 0;
const centerX = this.scale.width *0.85; // Adjust for your layout
const centerY = this.scale.height *0.7;

// Load button graphics
this.upButton = this.add.image(centerX, centerY - (buttonSize + buttonSpacing), 'upButtonDark').setInteractive().setDepth(200);
this.downButton = this.add.image(centerX, centerY + (buttonSize + buttonSpacing), 'downButtonDark').setInteractive().setDepth(200);
this.leftButton = this.add.image(centerX - (buttonSize + buttonSpacing), centerY, 'leftButtonDark').setInteractive().setDepth(200);
this.rightButton = this.add.image(centerX + (buttonSize + buttonSpacing), centerY, 'rightButtonDark').setInteractive().setDepth(200);
this.middleButton = this.add.image(centerX, centerY, 'middleButtonDark').setInteractive().setDepth(200);





// Ensure dir Buttons exists
    if (!this.rightButton) {
      console.error('ControlSquare2 does not have a rightButton defined!');
      return;
    }

    if (!this.middleButton) {
        console.error('ControlSquare2 does not have a middleButton defined!');
        return;
      }

    if (!this.leftButton) {
        console.error('ControlSquare2 does not have a leftButton defined!');
        return;
      }


      if (!this.downButton) {
        console.error('ControlSquare2 does not have a downButton defined!');
        return;
      }
      if (!this.upButton) {
          console.error('ControlSquare2 does not have a upButton defined!');
          return;
        }

    // Make the left button interactive
    this.leftButton.setInteractive();
// Variable to track whether the translation is visible or not
this.isTranslationVisible = false; // Start with the Irish version visible



// Function to show the next message with typewriting and sweeping transition
function showNextMessageWithTyping(newMessage) {
    // Animate the old text sliding up and fading out
    this.tweens.add({
        targets: this.textObjectGa,
        y: this.textObjectGa.y - 100, // Move up by 50 pixels
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
  // Function to handle going back to the previous message with fade-in and drop-down
  function showPreviousMessageWithDropDown() {
      // Animate the current text sliding up and fading out
      this.tweens.add({
          targets: this.textObjectGa,
          y: this.textObjectGa.y + 100, // Move up by 50 pixels
          alpha: 0, // Fade out
          duration: 500, // Duration of the animation
          ease: 'Quad.easeIn',
          onComplete: () => {
              // Once the animation is complete, reset the text object
              this.textObjectGa.y -=100; // Move back to the original position
              this.textObjectGa.alpha = 1; // Reset alpha for the new text
        this.textObjectGa.setText(''); // Clear the text
        
        // Set the previous message as the current one and start showing it
        this.currentStep--; // Move back to the previous step
        if (this.currentStep >= 0) {
          // Slide the previous message down and fade it in
          this.tweens.add({
              targets: this.textObjectGa,
            y: this.textObjectGa.y , // Move down by 50 pixels
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

    // Function to switch to the lit (pressed) version of the button
    const setButtonLit = (button, buttonName) => {
      button.setTexture(buttonName); // Switch to the "lit" texture (e.g., upButtonLit)
    };
  
    // Function to reset to the normal button state
    const resetButton = (button, buttonName) => {
      button.setTexture(buttonName); // Switch back to the normal texture (e.g., buttonUp)
    };
  
  // Create the middle button to toggle translations
this.middleButton.on('pointerdown', () => {
  setButtonLit(this.middleButton, 'middleButtonLit');
    setTimeout(()=>{
      resetButton(this.middleButton,'middleButtonDark')
    },1000)
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
    setButtonLit(this.rightButton, 'rightButtonLit');
    setTimeout(()=>{
      resetButton(this.rightButton,'rightButtonDark')
    },1000)

  if (this.isCooldownActive || this.currentStep >= 5) return; // Prevent input past step 5

  this.isCooldownActive = true;
  this.currentStep++;

  if (this.currentStep < this.textsGa.length) {
      showNextMessageWithTyping.call(this, this.textsGa[this.currentStep]);
  } else {
      this.scene.start('MainGame');
  }

  this.time.delayedCall(this.cooldownDuration, () => {
      this.isCooldownActive = false;
  });

  // 🛑 Disable button interaction when step >= 5
  if (this.currentStep >= 5) {
      this.rightButton.disableInteractive(); // Disable the button
      console.log('Button disabled to prevent rapid presses.');
  }
});

  this.upButton.on('pointerdown', () => {
    if (this.isCooldownActive) return;
    setButtonLit(this.upButton, 'upButtonLit');
    setTimeout(()=>{
      resetButton(this.upButton,'upButtonDark')
    },1000)

    this.isCooldownActive = true;
  
    this.currentStep++;
  
    if (this.currentStep < this.textsGa.length) {
      showNextMessageWithTyping.call(this, this.textsGa[this.currentStep]);
    } else {
      this.scene.start('MainGame');
    }
  
    this.time.delayedCall(this.cooldownDuration, () => {
      this.isCooldownActive = false;
    });


  // 🛑 Disable button interaction when step >= 5
  if (this.currentStep >= 5) {
    this.rightButton.disableInteractive(); // Disable the button
    console.log('Button disabled to prevent rapid presses.');
}
  });
  
  this.downButton.on('pointerdown', () => {
    if (this.isCooldownActive) return;
    setButtonLit(this.downButton, 'downButtonLit');
    setTimeout(()=>{
      resetButton(this.downButton,'downButtonDark')
    },1000)

    this.isCooldownActive = true;
  
    if (this.currentStep > 0) {
      showPreviousMessageWithDropDown.call(this);
    } else {
      console.log("Already at the first message");
    }
  
    this.time.delayedCall(this.cooldownDuration, () => {
      this.isCooldownActive = false;
    });
  });
  
  this.leftButton.on('pointerdown', () => {
    if (this.isCooldownActive) return;
    setButtonLit(this.leftButton, 'leftButtonLit');
    setTimeout(()=>{
      resetButton(this.leftButton,'leftButtonDark')
    },1000)

    this.isCooldownActive = true;
  
    if (this.currentStep > 0) {
      showPreviousMessageWithDropDown.call(this);
    } else {
      console.log("Already at the first message");
    }
  
    this.time.delayedCall(this.cooldownDuration, () => {
      this.isCooldownActive = false;
    });
  });


  // Safely create and verify overlay element
  try {
    this.overlay = document.createElement('div');
    if (!(this.overlay instanceof Element)) {
      throw new Error('Failed to create overlay element');
    }

  
  this.overlay.style = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 10000;
  `;
  if (document.body) {
    document.body.appendChild(this.overlay);
  } else {
    this.time.delayedCall(100, () => {
      if (document.body) document.body.appendChild(this.overlay);
    });
  }
    // Event listener with proper cleanup
    const clickHandler = () => {
      if (this.overlay) {
        this.overlay.removeEventListener('click', clickHandler);
        document.body.removeChild(this.overlay);
        this.overlay = null;
      }
      this.toggleFullscreen();
    };

    this.overlay.addEventListener('click', clickHandler, { once: true });

  } catch (error) {
    console.error('Overlay creation failed:', error);
    // Fallback to Phaser DOM element
    this.add.dom(0, 0, 'div')
      .setOrigin(0)
      .setSize(this.scale.width, this.scale.height)
      .setInteractive()
      .on('click', () => this.toggleFullscreen());
  }

  this.isWobbleActive = true; // Initially, the wobble is active

this.time.addEvent({
    delay: 50,
    loop: true,
    callback: () => {
        if (!this.isWobbleActive) return; // Skip effect if not active

        const offsetY = Math.sin(this.time.now * 0.005) * 2;  // Vertical bob
        const offsetX = Math.cos(this.time.now * 0.003) * 2;  // Horizontal sway

        // Slight scaling variation
        const scaleFactorX = 1 + Math.sin(this.time.now * 0.05) * 0.05;
        const scaleFactorY = 1 + Math.cos(this.time.now * 0.05) * 0.03;

        // Ensure scaling doesn't shrink too much
        this.pookacave.displayWidth = newWidth * scaleFactorX;
        this.pookacave.displayHeight = newHeight * scaleFactorY;

        // Match exact position of pookacave2
        this.pookacave.x = this.pookacave2.x + offsetX;
        this.pookacave.y = this.pookacave2.y + offsetY;

        // Keep pookacave2 at fullscreen size
        this.pookacave2.setDisplaySize(newWidth, newHeight);

        if (this.currentStep < 5) {
            this.pookacave2.x += offsetX;
            this.pookacave2.y += offsetY;
        }
    }
});

const scaleMultiplier = 1.1; // Increase size by 10%

this.time.addEvent({
    delay: 50,
    loop: true,
    callback: () => {
        if (!this.isWobbleActive) return; // Skip effect if not active

        const offsetY = Math.sin(this.time.now * 0.002) * 2;  // Vertical bob
        const offsetX = Math.cos(this.time.now * 0.003) * 2;  // Horizontal sway

        // Slight scaling variation
        const scaleFactorX = 1 + Math.sin(this.time.now * 0.01) * 0.02;
        const scaleFactorY = 1 + Math.cos(this.time.now * 0.009) * 0.02;

        // Scale up the base size by 10%
        const scaledWidth = newWidth * scaleMultiplier * scaleFactorX;
        const scaledHeight = newHeight * scaleMultiplier * scaleFactorY;

        // Apply identical transformation to both images
        [this.pookacave, this.pookacave2].forEach(sprite => {
            sprite.displayWidth = scaledWidth;
            sprite.displayHeight = scaledHeight;
            sprite.x = this.width / 2 + offsetX; // Keep both centered
            sprite.y = startY + offsetY;
        });
    }
});




}




toggleFullscreen() {
  const gameCanvas = this.game.canvas;

  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    const requestFs = gameCanvas.requestFullscreen || gameCanvas.webkitRequestFullscreen;
    requestFs.call(gameCanvas).then(() => {
      this.isFullscreen = true;
      this.game.scale.resize(window.innerWidth, window.innerHeight);
    }).catch(err => console.log(err));
  } else {
    const exitFs = document.exitFullscreen || document.webkitExitFullscreen;
    exitFs.call(document).then(() => {
      this.isFullscreen = false;
      this.game.scale.resize(window.innerWidth, window.innerHeight);
    });
  }
  

}
  rainEffect1() {
    if (this.isRaining || this.currentStep === 3) {
        return; // Don't create ripples if we are at step 3
    }
    this.ripples = new RippleManager(this);
    this.ripples.create();
    this.isRaining = true;
}


update() {
if (this.currentStep === 0) {
 this.rainEffect1()
}

if (this.currentStep === 1) {
  this.tweens.add({
      targets: this.pookacave,
      alpha: 0.5,  // Fade in to fully visible
      duration: 500,  // Adjust duration as needed (1500ms = 1.5s)
      ease: 'Sine.easeInOut' // Smooth transition
  });
}

if (this.currentStep === 4) {
    // Fade in both images
    this.tweens.add({
        targets: this.pookacave2,
        alpha: 0.5,      // Fade to fully visible
        duration: 2000,  // Time for the fade-in effect (2 seconds)
        ease: 'Linear',  // Easing function for the fade
    });

    if (this.currentStep === 4) {
      // Fade out empty cave
      this.tweens.add({
          targets: this.pookacave,
          alpha: 0,      // Fade to fully visible
          duration: 2000,  // Time for the fade-in effect (2 seconds)
          ease: 'Linear',  // Easing function for the fade
      });
  }


  }
  if (this.currentStep >= 5) {
    console.log(`Step triggered: ${this.currentStep}, stepHandled: ${this.stepHandled}`);

    if (this.stepHandled) return; // Early exit if already handled

    this.stepHandled = true; // Mark it immediately

    // Disable wobble effect for pookacave2
    this.isWobbleActive = false;

    // Use `this.once` to ensure this transition only happens once
    this.events.once('puca_transition', () => {
        console.log('Handling step 5 transition...');

        this.tweens.add({
            targets: this.pookacave2,
            y: this.height,
            duration: 1200,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                console.log('Tween complete, executing effects.');

                this.ripples.hide();


                // ⚡ STEP 5: Direct transition to DungeonScene (no fade) ⚡
                setTimeout(() => {



                // ⚡ STEP 1: Generate a jagged lightning bolt ⚡
                const bolt = this.add.graphics({ x: 0, y: 0 }).setDepth(10000);
                drawLightningBolt.call(this, bolt);

                bolt.setAlpha(1);
                setTimeout(() => bolt.setAlpha(0), 480);

                // ⚡ STEP 2: Full-screen flash ⚡
                const flash = this.add.rectangle(0, 0, this.width, this.height, 0xFFFFFF)
                    .setOrigin(0, 0)
                    .setAlpha(1)
                    .setDepth(9999)
                    .setScrollFactor(0);

                this.tweens.add({
                    targets: flash,
                    alpha: 0,
                    duration: 1450,
                    ease: 'Cubic.easeOut',
                    onComplete: () => flash.destroy()
                });

                // ⚡ STEP 3: Intense shake ⚡
                this.cameras.main.shake(400, 0.12, true);

                // ⚡ STEP 4: Thunder sound ⚡
                if (this.thunder) {
                    this.thunder.play();
                }
              
              setTimeout(()=>{


                console.log('Direct scene switch to DungeonScene...');
                if (this.scene.isActive('DungeonScene')) {
                    console.warn('DungeonScene already active! Aborting extra transitions.');
                    return;
                }

                this.scene.switch('DungeonScene', { 
                    initialTransition: true,
                    fromScene: 'PucaChase0',
                });


              },500)
              }, 1500);
            }
        });
    });

    // Fire the event
    this.events.emit('puca_transition');
}



// ⚡ Function to draw a jagged lightning bolt (fixed)
function drawLightningBolt(graphics) {
  const startX = Phaser.Math.Between(50, this.width - 50);
  const startY = 0;
  const endX = Phaser.Math.Between(50, this.width - 50);
  const endY = this.height / 2;

  graphics.lineStyle(6, 0xFFFFFF, 1);
  graphics.beginPath();
  graphics.moveTo(startX, startY);

  let prevX = startX;
  let prevY = startY;

  for (let i = 0; i < 5; i++) {
      const newX = prevX + Phaser.Math.Between(-40, 40);
      const newY = prevY + Phaser.Math.Between(30, 60);
      graphics.lineTo(newX, newY);
      prevX = newX;
      prevY = newY;
  }

  graphics.lineTo(endX, endY);
  graphics.strokePath();
}


// ⚡ Function to draw a jagged lightning bolt ⚡
function drawLightningBolt(graphics) {
  const startX = Phaser.Math.Between(50, this.width - 50);
  const startY = 0;
  const endX = Phaser.Math.Between(50, this.width - 50);
  const endY = this.height / 2;

  graphics.lineStyle(6, 0xFFFFFF, 1);
  graphics.beginPath();
  graphics.moveTo(startX, startY);

  let prevX = startX;
  let prevY = startY;
  
  // Create jagged path
  for (let i = 0; i < 5; i++) {
      const newX = prevX + Phaser.Math.Between(-40, 40);
      const newY = prevY + Phaser.Math.Between(30, 60);
      graphics.lineTo(newX, newY);
      prevX = newX;
      prevY = newY;
  }

  graphics.lineTo(endX, endY);
  graphics.strokePath();
}

}






}

export default PucaChase0;

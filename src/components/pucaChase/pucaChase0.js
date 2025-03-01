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
      'Bhí sé ag stealladh',
      'Bhíos ag feitheamh i mbéillic na carraige',  
      'Deabhail fothain ánn. \nBhí mo brat ag snámh \nmo chaith éadaigh súightighe',
      'An plúis geall a bheith ciar-thuilte\n ach...','"Ní shoighne ach foighne a breitheann ar púca"',
      'Deis! Ach go toban - ',

        
      ];
      
      this.textsEn = [
        'It was lashing',
        'I was waiting in the cavern under the rock.',
        'Devil the shelter in it.\nMy cloak was swimming\nMy armour soaked',
        'The cave just about black-flooded\nbut...',
        '"not comfort but patience does catch the pooka"',
        'A chance! But suddenly - ',

    ];
    let horseBlack, horseWhite;
    this.xPosition1 = 0;
    this.xPosition2 = 200;
    this.yPosition1 = 200;
    this.yPosition2 = 200;
      
  }
  destroy() {
    // Clean up or stop the ripple effect
    this.scene.tweens.killAll(); // Stop all active tweens
    // Add any additional cleanup logic, like stopping animations or removing objects
  }

  preload() {
    this.load.image('twoHorses', 'phaser-resources/images/npcs/pooka2.png');
    this.load.audio('thunder', 'phaser-resources/audio/thunder.wav');
    this.load.audio('rainSound', 'phaser-resources/audio/rain.ogg'); 

    this.load.image('lightning', 'phaser-resources/images/lightning.png');
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
    const texture = this.textures.get('twoHorses').getSourceImage();
const originalWidth = texture.width;
const originalHeight = texture.height;

// Calculate the new height to maintain aspect ratio
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
    this.twoHorses = this.add.image(this.width / 2, startY, 'twoHorses')
    .setDisplaySize(newWidth, newHeight) // Maintain aspect ratio
    .setAlpha(0) // Initially invisible
    .setDepth(20); // Keep it on top


      // Cooldown flag and timer
  this.isCooldownActive = false;
  this.cooldownDuration = 500; // 500ms cooldown
  
  const  lightning = this.add.image(0, 0, 'lightning'); // Position it at (0, 0)
  // Set the image origin to the center of the image so it can be scaled properly
  lightning.setOrigin(0, 0); // Set origin to the top-left corner
  
  // Scale the image to cover the entire screen
 lightning.setDisplaySize(this.scale.width, this.scale.height); // Stretch to the full screen size
  const backgroundDarken = this.add.image(0, 0, 'bg1'); // Position it at (0, 0)
  // Set the image origin to the center of the image so it can be scaled properly
  backgroundDarken.setOrigin(0, 0); // Set origin to the top-left corner
  
  // Scale the image to cover the entire screen
  backgroundDarken.setDisplaySize(this.scale.width, this.scale.height); // Stretch to the full screen size
  backgroundDarken.setAlpha(1);
  const scrollSpeed = 300; // Initial speed (pixels per second)
  const imageHeight = 740; // Image height
  let slowingDown = false; // Track the slowing down state
    // Create text object for narrative
    this.textObjectGa = this.add.text(this.scale.width * 0.05, this.scale.height * 0.1, '', {
      font: '48px aonchlo',
      fill: 'LavenderBlush',
      wordWrap: { width:this.scale.width*0.8 },
    }).setDepth(10).setDepth(44);


    this.textObjectEn = this.add.text(this.scale.width * 0.05, this.scale.height * 0.5, '', {
        font: '32px dum1',
        fill: 'plum',
        wordWrap: { width: this.scale.width * 0.8},
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

const ControlSquare2X = 350;
const ControlSquare2Y = 200;
// Button positions
const buttonSize = 65;
const buttonSpacing = 0;
const centerX = this.scale.width - 200; // Adjust for your layout
const centerY = this.scale.height - 200;

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
  // Create the middle button to toggle translations
this.middleButton.on('pointerdown', () => {
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
    if (this.isCooldownActive) return;
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
  });
  

  this.upButton.on('pointerdown', () => {
    if (this.isCooldownActive) return;
  
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
  });
  
  this.downButton.on('pointerdown', () => {
    if (this.isCooldownActive) return;
  
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



  // Add transparent overlay div for initial click
  const overlay = document.createElement('div');
  overlay.style = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 10000;
  `;
  document.body.appendChild(overlay);

  const clickHandler = () => {
    this.toggleFullscreen();
    overlay.removeEventListener('click', clickHandler);
    overlay.remove();
  };

  overlay.addEventListener('click', clickHandler);
}

toggleFullscreen() {
const gameCanvas = this.game.canvas;

if (!document.fullscreenElement && !document.webkitFullscreenElement) {
  const requestFs = gameCanvas.requestFullscreen || 
                    gameCanvas.webkitRequestFullscreen;
  requestFs.call(gameCanvas).then(() => {
    this.isFullscreen = true;
    this.game.scale.resize(window.innerWidth, window.innerHeight);
  }).catch(err => console.log(err));
} else {
  const exitFs = document.exitFullscreen || 
                 document.webkitExitFullscreen;
  exitFs.call(document).then(() => {
    this.isFullscreen = false;
    this.game.scale.resize(window.innerWidth, window.innerHeight,); // Your base game size
  });
}
this.currentStep=1;
this.overlay.remove();
    
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

if (this.currentStep === 4) {
    // Fade in both images
    this.tweens.add({
        targets: this.twoHorses,
        alpha: 1,      // Fade to fully visible
        duration: 2000,  // Time for the fade-in effect (2 seconds)
        ease: 'Linear',  // Easing function for the fade
    });
}

if (this.currentStep >= 5 && !this.stepHandled) {
  this.stepHandled = true; // Prevent re-triggering

  // First, animate the twoHorses image
  this.tweens.add({
      targets: this.twoHorses,
      y: this.height, // Aligns top edge with the top of the screen
      duration: 1200, 
      ease: 'Sine.easeInOut',
      onComplete: () => {
          this.ripples.hide();

          // Fade out elements in the PucaChase0 scene
          this.tweens.add({
              targets: this.cameras.main,
              alpha: 0, // Fade the camera view of PucaChase0
              duration: 1000, // Duration of the fade-out
              ease: 'Sine.easeInOut',
              onComplete: () => {
                this.rainSound.stop();
                if (this.thunder) this.thunder.play();
                setTimeout(()=>{

                  // Now, we activate DungeonScene by switching it
                  this.scene.switch('DungeonScene'); // Switch to DungeonScene instead of start

                },1000)
              }
          });
      }
  });
}


}






}

export default PucaChase0;

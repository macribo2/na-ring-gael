import Phaser from 'phaser';
import ControlSquare from '../ControlSquare/ControlSquare';
import ChampionSelect1 from './ChampionSelect1'
import ChampionSelect2 from './ChampionSelect2'
import RippleManager from './rippleManager'
import ballyGamBoy from '../BallyGamBoy/dungeonScene'


import { EventEmitter } from './EventEmitter';

class IntroSequence extends Phaser.Scene {
  constructor() {
    
    super({ key: 'IntroSequence' });
    this.bandDiscovered = false;
  this.championDiscovered = false; // Flag to track discovery
this.isRaining = false;
    this.currentStep = 0;
  this.hasFaded = false;
    this.characterSheet = {};
    this.textsGa = [
        'Síos, Síos, níos faide síos...',
        'Síos i pluais gan éag... \n"Cé atá tagtha go ríocht na préimhe?"',
        '                    "Is mise..."',
        '"Ba fhínín mé, fadó..."',
        ' ',
        " ",
        '\nIs cuimhin liom an bháisteach...',
        ' ',

        
      ];
      
      this.textsEn = [
        'Down, down \nfurther down...',
        'Down in an endless cavern \n "Who has come to the kingdom of the root?"',
        '"I am...',
        'I was a fenian, long ago...',
        ' ',
        ' ',
        'I remember the rain...',
        ' ',

              ];
      
  }

  preload() {
    this.load.image('player-frame', 'phaser-resources/images/ciorcal-glass.png');
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
  
  
      this.load.image('fortuna00', 'phaser-resources/images/o-fortuna/0.png');
      this.load.image('fortuna01', 'phaser-resources/images/o-fortuna/1.png');
      this.load.image('fortuna02', 'phaser-resources/images/o-fortuna/2.png');
      this.load.image('fortuna03', 'phaser-resources/images/o-fortuna/3.png');
      this.load.image('fortuna04', 'phaser-resources/images/o-fortuna/4.png');
      this.load.image('fortuna05', 'phaser-resources/images/o-fortuna/5.png');
      this.load.image('fortuna06', 'phaser-resources/images/o-fortuna/6.png');
      this.load.image('fortuna07', 'phaser-resources/images/o-fortuna/7.png');
      this.load.image('fortuna08', 'phaser-resources/images/o-fortuna/8.png');
      this.load.image('fortuna09', 'phaser-resources/images/o-fortuna/9.png');
      this.load.image('fortuna10', 'phaser-resources/images/o-fortuna/10.png');
      this.load.image('fortuna11', 'phaser-resources/images/o-fortuna/11.png');
      this.load.image('fortuna12', 'phaser-resources/images/o-fortuna/12.png');
      this.load.image('fortuna13', 'phaser-resources/images/o-fortuna/13.png');
      this.load.image('fortuna14', 'phaser-resources/images/o-fortuna/14.png');
      this.load.image('fortuna15', 'phaser-resources/images/o-fortuna/15.png');
      this.load.image('fortuna16', 'phaser-resources/images/o-fortuna/16.png');
      this.load.image('fortuna17', 'phaser-resources/images/o-fortuna/17.png');
      this.load.image('fortuna18', 'phaser-resources/images/o-fortuna/18.png');
      this.load.image('fortuna19', 'phaser-resources/images/o-fortuna/19.png');
      this.load.image('fortuna20', 'phaser-resources/images/o-fortuna/10.png');
      this.load.image('fortuna21', 'phaser-resources/images/o-fortuna/21.png');
      this.load.image('fortuna22', 'phaser-resources/images/o-fortuna/22.png');
      this.load.image('fortuna23', 'phaser-resources/images/o-fortuna/23.png');
      this.load.image('fortuna24', 'phaser-resources/images/o-fortuna/24.png');
      this.load.image('fortuna25', 'phaser-resources/images/o-fortuna/25.png');
      this.load.image('fortuna26', 'phaser-resources/images/o-fortuna/26.png');
      this.load.image('fortuna27', 'phaser-resources/images/o-fortuna/27.png');
      this.load.image('fortuna28', 'phaser-resources/images/o-fortuna/28.png');
      this.load.image('fortuna29', 'phaser-resources/images/o-fortuna/29.png');
      this.load.image('fortuna30', 'phaser-resources/images/o-fortuna/30.png');
      this.load.image('fortuna31', 'phaser-resources/images/o-fortuna/31.png');
      this.load.image('fortuna32', 'phaser-resources/images/o-fortuna/32.png');
      this.load.image('fortuna33', 'phaser-resources/images/o-fortuna/33.png');
      this.load.image('fortuna34', 'phaser-resources/images/o-fortuna/34.png');
      this.load.image('fortuna35', 'phaser-resources/images/o-fortuna/35.png');
      this.load.image('fortuna36', 'phaser-resources/images/o-fortuna/36.png');
      this.load.image('fortuna37', 'phaser-resources/images/o-fortuna/37.png');
      this.load.image('fortuna38', 'phaser-resources/images/o-fortuna/38.png');
      this.load.image('fortuna39', 'phaser-resources/images/o-fortuna/39.png');
      this.load.image('fortuna40', 'phaser-resources/images/o-fortuna/40.png');
      this.load.image('fortuna41', 'phaser-resources/images/o-fortuna/41.png');
      this.load.image('fortuna42', 'phaser-resources/images/o-fortuna/42.png');
      this.load.image('fortuna43', 'phaser-resources/images/o-fortuna/43.png');
      this.load.image('fortuna44', 'phaser-resources/images/o-fortuna/44.png');
      this.load.image('fortuna45', 'phaser-resources/images/o-fortuna/45.png');
      this.load.image('fortuna46', 'phaser-resources/images/o-fortuna/46.png');
      this.load.image('fortuna47', 'phaser-resources/images/o-fortuna/47.png');
      this.load.image('fortuna48', 'phaser-resources/images/o-fortuna/48.png');
      this.load.image('fortuna49', 'phaser-resources/images/o-fortuna/49.png');
      this.load.image('fortuna50', 'phaser-resources/images/o-fortuna/50.png');
      this.load.image('fortuna51', 'phaser-resources/images/o-fortuna/51.png');
      this.load.image('fortuna52', 'phaser-resources/images/o-fortuna/52.png');
      this.load.image('fortuna53', 'phaser-resources/images/o-fortuna/53.png');
      this.load.image('fortuna54', 'phaser-resources/images/o-fortuna/54.png');
      this.load.image('fortuna55', 'phaser-resources/images/o-fortuna/55.png');
      this.load.image('fortuna56', 'phaser-resources/images/o-fortuna/56.png');
      this.load.image('fortuna57', 'phaser-resources/images/o-fortuna/57.png');
      this.load.image('fortuna58', 'phaser-resources/images/o-fortuna/58.png');
      this.load.image('fortuna59', 'phaser-resources/images/o-fortuna/59.png');
      this.load.image('fortuna60', 'phaser-resources/images/o-fortuna/60.png');
      this.load.image('fortuna61', 'phaser-resources/images/o-fortuna/61.png');
      this.load.image('fortuna62', 'phaser-resources/images/o-fortuna/62.png');
      this.load.image('fortuna63', 'phaser-resources/images/o-fortuna/63.png');
  
  
  
    }

  create() {
    this.rippleManager = new RippleManager(this);
    
 // Create playerFrame, initially hidden (alpha 0)
 this.playerFrame = this.add.sprite(100, 100, 'player-frame').setDepth(50).setAlpha(0).setScale(0.75);
 this.playerFrame.setInteractive();

 // Handle pointerdown event for the playerFrame
 this.playerFrame.on('pointerdown', () => {
   // Check if cooldown is active
   if (this.isCooldownActive) return;

   // Activate cooldown
   this.isCooldownActive = true;

   // Guard condition: Block progression if currentStep === 2 and champion is not discovered
   if (this.currentStep === 2 && !this.championDiscovered) {
     this.isCooldownActive = false; // Reset cooldown
     return; // Stop further execution
   }
   if (this.currentStep === 4 && !this.bandDiscovered) {
     this.isCooldownActive = false; // Reset cooldown
     return; // Stop further execution
   }

   // Fade out the player frame when clicked
   this.tweens.add({
     targets: this.playerFrame,
     alpha: 0, // Fade to 0 (invisible)
     duration: 500, // Duration of the fade-out
     ease: 'Quad.easeOut', // Ease function for smooth fading
     onComplete: () => {
       // Once the fade-out is complete, increment the step
       this.currentStep++;
       EventEmitter.emit('stepChanged', this.currentStep);

       if (this.currentStep < this.textsGa.length) {
         // Combine sweeping and typewriter effect
         this.showNextMessageWithTyping.call(this, this.textsGa[this.currentStep]);
       } else {
         this.scene.start('MainGame'); // Transition to main game
       }

       // Reset cooldown after the specified duration
       this.time.delayedCall(this.cooldownDuration, () => {
         this.isCooldownActive = false;
       });
     }
   });
 });
      // Cooldown flag and timer
  this.isCooldownActive = false;
  this.cooldownDuration = 500; // 500ms cooldown
  this.particles = null; // Initialize particles as null
  
  const background = this.add.image(0, 0, 'backgroundFoggy'); // Position it at (0, 0)
  // Set the image origin to the center of the image so it can be scaled properly
  background.setOrigin(0, 0); // Set origin to the top-left corner
  
  // Scale the image to cover the entire screen
  background.setDisplaySize(this.scale.width, this.scale.height); // Stretch to the full screen size
  const backgroundDarken = this.add.image(0, 0, 'bg1'); // Position it at (0, 0)
  // Set the image origin to the center of the image so it can be scaled properly
  backgroundDarken.setOrigin(0, 0); // Set origin to the top-left corner
  
  // Scale the image to cover the entire screen
  backgroundDarken.setDisplaySize(this.scale.width, this.scale.height); // Stretch to the full screen size
  backgroundDarken.setAlpha(0);
  const scrollSpeed = 300; // Initial speed (pixels per second)
  const imageHeight = 740; // Image height
  let slowingDown = false; // Track the slowing down state
  
  // Create a container for the scrolling images
  const branchesContainer = this.add.container(this.scale.width / 2, 0);
  
  // Add two images for looping
  const branches1 = this.add.image(0, 0, 'branches').setOrigin(0.5, 0);
  const branches2 = this.add.image(0, imageHeight, 'branches').setOrigin(0.5, 0);
  
  // Create the final image (hidden initially)
  const branches3 = this.add.image(0, imageHeight * 2, 'branches3').setOrigin(0.5, 0).setVisible(false);
  
  branchesContainer.add([branches1, branches2, branches3]).setAlpha(0.28)
  
  // Animate looping scroll
  const scrollTween = this.tweens.add({
    targets: branchesContainer,
    y: `-=${imageHeight}`, // Move up by one image height
    duration: (imageHeight / scrollSpeed) * 9000, // Control speed
    ease: 'Linear',
    repeat: -1,
    onRepeat: () => {
      if (slowingDown) return; // Don't reset loop if slowing down
  
      // Reset position for infinite loop if branchesContainer is fully out of view
      if (branchesContainer.y <= -imageHeight) {
        branchesContainer.y = 0;
      }
  
      // Check for swap condition
      if (this.currentStep === 1 && !slowingDown) {
        slowingDown = true;
        this.swapAndSlow(); // Call the method to swap and slow down
      }
    }
  });
  
  // Function to swap an image and slow the movement properly
  this.swapAndSlow = () => {
    // Hide branches2 and show branches3
    branches2.setVisible(false);
    branches3.setVisible(true);
  
    // Move branches3 to the top of the screen (just below branches2)
    branches3.y = imageHeight; // Ensure there's no gap, branches3 starts right where branches2 ends
  
    // Calculate the time it should take for branches3 to reach the top
    const remainingDistance = imageHeight; // We want to stop when branches3 reaches the top of the screen
  
    // Stop the scrolling animation
    this.tweens.add({
      targets: branchesContainer,
      y: `-=${remainingDistance}`, // Scroll the exact remaining distance
      duration: (remainingDistance / scrollSpeed) * 1000, // Adjust duration based on remaining scroll
      ease: 'Linear',
      onComplete: () => {
        console.log('Arrived at Geaga!');
        // Stop the scroll animation and hold position
        scrollTween.stop();
      }
    });
  };
    // Tween to fade in backgroundDarken
this.tweens.add({
  targets: backgroundDarken,    // The object to animate
  alpha: 1,                     // Target alpha value (fully visible)
  duration: 6000,               // Duration of the fade-in effect (in milliseconds)
  ease: 'Linear',               // Easing function for a smooth transition
  onStart: () => {
      console.log("Fade-in started");
  },
  onComplete: () => {
      console.log("Fade-in completed");
  }
});
    // Create text object for narrative
    this.textObjectGa = this.add.text(this.scale.width * 0.05, this.scale.height * 0.1, '', {
      font: '40px dum1',
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

// Center horizontally and position in the bottom third
const controlSquareX = screenWidth / 4;
const controlSquareY = (screenHeight * 1/3) 

this.controlSquare = new ControlSquare(this, controlSquareX, controlSquareY);
this.controlSquare.setAlpha(0).setDepth(950); // Start invisible
    this.add.existing(this.controlSquare); // Add to the scene

    // Ensure dir Buttons exists
    if (!this.controlSquare.rightButton) {
      console.error('ControlSquare does not have a rightButton defined!');
      return;
    }

    if (!this.controlSquare.middleButton) {
        console.error('ControlSquare does not have a middleButton defined!');
        return;
      }

    if (!this.controlSquare.leftButton) {
        console.error('ControlSquare does not have a leftButton defined!');
        return;
      }


      if (!this.controlSquare.downButton) {
        console.error('ControlSquare does not have a downButton defined!');
        return;
      }
      if (!this.controlSquare.upButton) {
          console.error('ControlSquare does not have a upButton defined!');
          return;
        }

    // Make the left button interactive
    this.controlSquare.leftButton.setInteractive();
// Variable to track whether the translation is visible or not
this.isTranslationVisible = false; // Start with the Irish version visible

// Create the middle button to toggle translations
this.controlSquare.middleButton.on('pointerdown', () => {
   // Check if cooldown is active
   if (this.isCooldownActive) return;
   // Activate cooldown
   this.isCooldownActive = true;
  
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

        if (this.subtitleTextEn) {
            this.subtitleTextEn.setVisible(true).setAlpha(0.8).setDepth(10);
        } else {
            console.error("subtitleTextEn is not defined. Ensure it is created before this point.");
        }
    } else {
        // Hide English translation
        if (this.textObjectEn) {
            this.textObjectEn.setVisible(false);
        }

        if (this.subtitleTextEn) {
            this.subtitleTextEn.setVisible(false);
        }
    }

    // Check if ChampionSelect1 exists before calling its method
    if (this.ChampionSelect2) {
        // Also toggle the visibility of the English name in ChampionSelect
        this.ChampionSelect2.toggleEnglishNameVisibility(this.isTranslationVisible);
    }
       // Check if ChampionSelect1 exists before calling its method
       if (this.ChampionSelect1) {
        // Also toggle the visibility of the English name in ChampionSelect
        this.ChampionSelect1.toggleEnglishNameVisibility(this.isTranslationVisible);
    }
      // Reset cooldown after the specified duration
      this.time.delayedCall(this.cooldownDuration, () => {
        this.isCooldownActive = false;
      });
});

// Fade in ControlSquare and text
this.tweens.add({
    targets: [this.controlSquare, this.textObjectGa],
    alpha: 1,
    duration: 1000,
    ease: 'Linear',
    onComplete: () => {
      // Animate the controlSquare to float to the right
      const targetX = (this.cameras.main.width * 3) / 5; // 3/4 of the screen width
      this.tweens.add({
          targets: this.controlSquare,
          x: targetX - 10,
          
          duration: 700,
          ease: 'Sine.easeInOut',
        });
    },
});


// Assuming `this.textObjectGa` is the text displaying the current message


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
        EventEmitter.emit('stepChanged', this.currentStep);
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
  
  EventEmitter.on('bandDiscovered', () => {
    this.bandDiscovered = true;
    console.log('band has been discovered!');
  });  
  
  EventEmitter.on('championDiscovered', () => {
    this.championDiscovered = true;
    console.log('Champion has been discovered!');
  });

  this.events.on('championDiscovered', () => {
    this.championDiscovered = true;
    console.log("Champion discovered in IntroSequence!");
  });


  this.events.on('bandDiscovered', () => {
    this.bandDiscovered = true;
    console.log("band discovered in IntroSequence!");
  });
  this.controlSquare.rightButton.on('pointerdown', () => {
    // Check if cooldown is active
    if (this.isCooldownActive) return;
  
    // Activate cooldown
    this.isCooldownActive = true;
  
    // Guard condition: Block progression if currentStep === 2 and champion is not discovered
    if (this.currentStep === 2 && !this.championDiscovered) {
      this.isCooldownActive = false; // Reset cooldown
      return; // Stop further execution
    }
  
    if (this.currentStep === 4 && !this.bandDiscovered) {
      this.isCooldownActive = false; // Reset cooldown
      return; // Stop further execution
    }
  
    // Show and hide playerFrame depending on the currentStep
    if (this.currentStep === 2 ) {
      // Fade in the playerFrame if it isn't visible
      this.tweens.add({
        targets: this.playerFrame,
        alpha: 0, // Fade in
        duration: 500, // Duration of the fade-in
        ease: 'Quad.easeOut', // Smooth fade-in effect
      });

      
    } else if (this.currentStep === 3 ) {
      // Fade out the playerFrame if it is visible
      this.tweens.add({
        targets: this.playerFrame,
        alpha: 1, // Fade out
        duration: 500, // Duration of the fade-out
        ease: 'Quad.easeOut', // Smooth fade-out effect
      });
    }else if (this.currentStep === 4 ) {
      // Fade out the playerFrame if it is visible
      this.tweens.add({
        targets: this.playerFrame,
        alpha: 1, // Fade out
        duration: 500, // Duration of the fade-out
        ease: 'Quad.easeOut', // Smooth fade-out effect
      });
    }
  
    // Increment step and emit event
    this.currentStep++;
    EventEmitter.emit('stepChanged', this.currentStep);
  
    if (this.currentStep < this.textsGa.length) {
      // Combine sweeping and typewriter effect
      this.showNextMessageWithTyping.call(this, this.textsGa[this.currentStep]);
    } else {
      this.scene.start('MainGame'); // Transition to main game
    }
  
    // Reset cooldown after the specified duration
    this.time.delayedCall(this.cooldownDuration, () => {
      this.isCooldownActive = false;
    });
  });
  
  this.controlSquare.downButton.on('pointerdown', () => {
    // Check if cooldown is active
    if (this.isCooldownActive) return;
  
    // Activate cooldown
    this.isCooldownActive = true;
  
    // Guard condition: Block progression if currentStep === 2 and champion is not discovered
    if (this.currentStep === 2 && !this.championDiscovered) {
      this.isCooldownActive = false; // Reset cooldown
      return; // Stop further execution
    }
  
    if (this.currentStep === 4 && !this.bandDiscovered) {
      this.isCooldownActive = false; // Reset cooldown
      return; // Stop further execution
    }
  
    // Show and hide playerFrame depending on the currentStep
    if (this.currentStep === 2 ) {
      // Fade in the playerFrame if it isn't visible
      this.tweens.add({
        targets: this.playerFrame,
        alpha: 0, // Fade in
        duration: 500, // Duration of the fade-in
        ease: 'Quad.easeOut', // Smooth fade-in effect
      });

      
    } else if (this.currentStep === 3 ) {
      // Fade out the playerFrame if it is visible
      this.tweens.add({
        targets: this.playerFrame,
        alpha: 1, // Fade out
        duration: 500, // Duration of the fade-out
        ease: 'Quad.easeOut', // Smooth fade-out effect
      });
    }else if (this.currentStep === 4 ) {
      // Fade out the playerFrame if it is visible
      this.tweens.add({
        targets: this.playerFrame,
        alpha: 1, // Fade out
        duration: 500, // Duration of the fade-out
        ease: 'Quad.easeOut', // Smooth fade-out effect
      });
    }
  
    // Increment step and emit event
    this.currentStep++;
    EventEmitter.emit('stepChanged', this.currentStep);
  
    if (this.currentStep < this.textsGa.length) {
      // Combine sweeping and typewriter effect
      this.showNextMessageWithTyping.call(this, this.textsGa[this.currentStep]);
    } else {
      this.scene.start('MainGame'); // Transition to main game
    }
  
    // Reset cooldown after the specified duration
    this.time.delayedCall(this.cooldownDuration, () => {
      this.isCooldownActive = false;
    });
  });
  

  
  this.controlSquare.leftButton.on('pointerdown', () => {
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


  this.ChampionSelect1 = null
  this.ChampionSelect2 = null


  this.particles = this.add.particles(0, 0, 'fairyLightBlur', {
    speed:{ min: 5, max: 30 },
    lifespan: 2500,
    gravityY: -110,
    frequency:2600,
    scale: { start: 0.8, end: 1.4, ease: 'Linear' },
    alpha: { start: 1, end: 0, ease: 'Linear' },
     x: { min: 0, max: this.scale.width }, // Randomize starting x position
     y: this.scale.height+70, // Randomize starting y position
   
    onEmit: (particle) => {
      // Smooth, unpredictable direction changes
      particle.body.acceleration.x = Math.sin(this.time.now / 2000) * 2; 
      particle.body.acceleration.y = Math.cos(this.time.now / 1500) * 3; 
  }}) 
  this.fairylights = [];


  for (let i = 0; i < 3; i++) {
    let fairylight = this.add.image(
        this.cameras.main.width / 2, // Start centered horizontally
        this.cameras.main.height / 2 - (i * 100), // Spread them out vertically
        'fairyLight'
    );

    fairylight.sineOffset = i * Math.PI / 2;  // Offset for variety
    fairylight.baseY = fairylight.y;  // Store the original Y position
    fairylight.frequencyX = 0.0003 + (i * 0.0002);  // Smooth horizontal swaying
    fairylight.horizontalRange = 250 + (i * 50);  // Left-right range
    fairylight.frequencyY = 0.0001 + (i * 0.00005);  // Slow vertical bobbing
    fairylight.verticalRange = 140; // **Almost imperceptible bobbing**
  // Add a flicker timer that updates opacity every 200-500ms

    this.fairylights.push(fairylight);
}


  }
// Function to show the next message with typewriting and sweeping transition
showNextMessageWithTyping(newMessage) {
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
rainEffect1(){
  
  
  if (this.isRaining){
return
  }
  this.ripples = new RippleManager(this);
  this.ripples.create();
  this.isRaining = true;

}

update() {

  this.fairylights.forEach(fairylight => {
    // Smooth horizontal swaying
    fairylight.x = this.cameras.main.width / 2 + 
        Math.sin(this.time.now * fairylight.frequencyX + fairylight.sineOffset) * fairylight.horizontalRange;

    // **Extremely subtle vertical bobbing**
    fairylight.y = fairylight.baseY + 
        Math.sin(this.time.now * fairylight.frequencyY + fairylight.sineOffset) * fairylight.verticalRange;
});

// Check for step and fade out the particles
if (this.currentStep === 1) {
  // Reduce lifespan and fade out particles
  if (!this.particles) {
    console.warn("Particles not initialized");
    return;
  }

  // Directly destroy the particles object
  this.particles.destroy();
  this.particles = null;

  console.log("Particles stopped");
  // this.currentStep = 2; // Prevent repeat calls

}


  if (this.currentStep === 2 && !this.ChampionSelect1) {
    // Create the instance of ChampionSelect1 and pass a callback function
    this.ChampionSelect1 = new ChampionSelect1(this, 250, 250,  this.currentStep,() => {
      // This callback will be executed when selectChampion is triggered
      
      this.currentStep= 3;
      EventEmitter.emit('stepChanged', this.currentStep);
      this.textObjectGa.setText(this.textsGa[this.currentStep]);
      this.textObjectEn.setText(this.textsEn[this.currentStep]);
      // Use Phaser's Time event to delay the destruction of the object
      this.time.delayedCall(100, () => {
        // Now, destroy the instance of ChampionSelect1
        console.log(this.ChampionSelect1); // Check the object before destruction
      this.ChampionSelect1.setVisible(false);  // Hide it 
this.ChampionSelect1.destroy(); // Then destroy it.
        console.log('ChampionSelect1 destroyed', this.currentStep);
      });
  
    }).setDepth(5).setInteractive(true).setVisible(false); // Initially hidden (setVisible(false))
    this.tweens.add({
      targets: this.playerFrame,
      alpha: 1, // Fade in
      duration: 500, // Duration of the fade-in
      ease: 'Quad.easeOut', // Smooth fade-in effect
    });
    
    console.log('Texture exists?', this.textures.exists('championSprites'));
  }

  console.log('Current step:', this.currentStep);
  if (this.currentStep === 3 && !this.hasFaded) {
  
    this.ChampionSelect1.fadeInBackground2();
  
    // Fade out the current text
    this.tweens.add({
      targets: this.textObjectGa,
      alpha: 0, // Fade out to alpha 0
      duration: 300, // Duration of 0.3 seconds
      ease: 'Power1', // Smooth easing
      onComplete: () => {
        // Change text properties (position, font size, etc.)
        this.textObjectGa.setPosition(50, 50); // New position
  
        setTimeout(() => {
          // Fade in the updated text
          this.tweens.add({
            targets: this.textObjectGa,
            alpha: 1, // Fade in to alpha 1
            duration: 1000, // Duration of 1 second
            ease: 'Power1', // Smooth easing
            onStart: () => {
              console.log("textObjectGa is fading back in.");
            },
            onComplete: () => {
              console.log("textObjectGa fully visible.");
            },
          });
        }, 1500); // Delay before fading back in
    this.hasFaded = true; // Set the flag to prevent repeated execution

      },
    });
  }
  





  

  if (this.currentStep === 4 && !this.ChampionSelect2) { // 2
    // Create the instance only when needed
    this.ChampionSelect2 = new ChampionSelect2(this, 250, 250, this.currentStep).setDepth(5).setInteractive(true).setVisible(false);
  
      this.tweens.add({
      targets: this.playerFrame,
      alpha: 1, // Fade in
      duration: 500, // Duration of the fade-in
      ease: 'Quad.easeOut', // Smooth fade-in effect
    });

    // Now you can safely access textures in the scene context
    console.log('Texture exists?', this.textures.exists('championSprites'));
  }
  



if(this.currentStep === 5 ){
  let characterSheet = JSON.parse(localStorage.getItem('characterSheet'));
 // Add the inventory array if it doesn't already exist
 if (!characterSheet.hasOwnProperty('inventory')) {
  characterSheet.inventory = [];  // Initialize an empty inventory
}
  // Update the name and branch variables
  this.nameGa = characterSheet.nameGa;
  this.branchGa = characterSheet.branchGa;
  this.branchEn = characterSheet.branchEn;
setTimeout(()=>{
  // Dynamically update the text at the required step
  this.textsGa[5] = `\n\nInis do Géaga faoi ${this.nameGa} dhíl.`;
  this.textsEn[5] = `Tell Géaga about\n faithful ${this.nameGa}.`;


},1000)
  // Update any text object showing the text if necessary
  this.textObjectGa.setText(this.textsGa[this.currentStep]);
  this.textObjectEn.setText(this.textsEn[this.currentStep]);

  this.textObjectGa.setDepth(135);
  this.textObjectEn.setDepth(135)
  this.textObjectGa.y = this.scale.height * 0.01;
  this.ChampionSelect2.fadeInBackground2();
  
}
if (this.currentStep === 6) {
 this.rainEffect1()
}

if (this.currentStep === 7) {
  // this.scene.start('ballyGamBoy');  // Transition directly to the next scene
  this.scene.stop('IntroSequence');  // Transition to IntroSequence scene
  localStorage.setItem('charactersheet', JSON.stringify(this.charactersheet));
  window.location.href = '/ballygamboy';  // Uncomment if needed
}


}



}

export default IntroSequence;

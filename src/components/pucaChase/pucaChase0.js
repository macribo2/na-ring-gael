import Phaser from 'phaser';
import ControlSquare from '../ControlSquare/ControlSquare';
import RippleManager from '../IntroSequence/rippleManager'



class PucaChase0 extends Phaser.Scene {
  constructor() {
    
    super({ key: 'PucaChase0' });
this.isRaining = false;
    this.currentStep = 0;
    this.characterSheet = {};
    this.textsGa = [
        'lorem dúthlán ',
        'lorem le breith ar púca',
        'lorem ipsum',
        'lorem fenian lorem bough',
        ' ',
        "Is cuimhin leis na géaga",
        'Bhí fothain á glachadh agam ón baisteach\n  mbéillic na carraige.',
        'Bhí mé ag ulmhú dán,\nchun breith ar an púca...',

        
      ];
      
      this.textsEn = [
        'Down, down \nfar far down...',
        'Down in an endless cavern \n "Who has come to the kingdom of the root?"',
        '"I am...',
        'I was a fenian, long ago...',
        '',
        'The branches recall',
        'I was taking shelter from the rain \nin the cavern beneath the rock.',
        'I was preparing a poem,\n to catch the phantom...',

              ];
      
  }

  preload() {
    this.load.image('bg1', 'phaser-resources/images/bg1.png');
      // Load assets needed for the main game
      this.load.atlas('championSprites', 'phaser-resources/images/champions-test.png', 'phaser-resources/json/champions-test.json');
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
    this.rippleManager = new RippleManager(this);
    

      // Cooldown flag and timer
  this.isCooldownActive = false;
  this.cooldownDuration = 500; // 500ms cooldown
  
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

});



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
  

  this.controlSquare.rightButton.on('pointerdown', () => {
    // Check if cooldown is active
    if (this.isCooldownActive) return;
  
    // Activate cooldown
    this.isCooldownActive = true;
  
    this.currentStep++;
  
    if (this.currentStep < this.textsGa.length) {
      // Combine sweeping and typewriter effect
      showNextMessageWithTyping.call(this, this.textsGa[this.currentStep]);
    } else {
      this.scene.start('MainGame'); // Transition to main game
    }
  
    // Reset cooldown after the specified duration
    this.time.delayedCall(this.cooldownDuration, () => {
      this.isCooldownActive = false;
    });
  });

  this.controlSquare.upButton.on('pointerdown', () => {
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
  
  this.controlSquare.downButton.on('pointerdown', () => {
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

}



}

export default PucaChase0;

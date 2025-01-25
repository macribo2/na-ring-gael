import Phaser from 'phaser';
import ControlSquare from '../ControlSquare/ControlSquare';
import ChampionSelect1 from './ChampionSelect1'
import ChampionSelect2 from './ChampionSelect2'

class IntroSequence extends Phaser.Scene {
  constructor() {
    
    super({ key: 'IntroSequence' });
    this.currentStep = 0;
    this.characterSheet = {};
    this.textsGa = [
        'Síos,    \nsíos,      \nsíos go doimhean...',
        'Síos go plúis gan éag...\n     \n"Cé a tagann go ríocht an préamh?"',
        '                    "Is mise..."',
        // '"Scaoilfar aonarán, ar ais ar an saol. \nRoghnaigh féinnidh..."', 
        '"Le cén géag dos na Fianna a bhainneann tú?"',
        ' ',
"Cad  a tógann anseo thú?",
        '"A Crann na Bethadh, \ntá Tír na nÓg ionraithe!     \nScaoil ar ais go hÉireann mé, leis na fianna a bhailú chugainn!"',
        ' '
      ];
      
      this.textsEn = [
        'Down, down \nfar far down...',
        'Down to an endless cavern \n "Who has come to the kingdom of the root?"',
        '"I am ...',
        // '"One alone shall be released to the living world. \nchoose your champion..."',
        'With which branch of the Fianna do you belong?',
        '',
        'What brings you here?',
        '"O Tree of Life, we are invaded! \nRelease me to Ireland, to summon champions!"',
        '',
      ];
      
  }

  preload() {
    this.load.image('bg1', 'assets/images/bg1.png');
      // Load assets needed for the main game
      this.load.atlas('championSprites', 'assets/images/champions-test.png', 'assets/json/champions-test.json');
  }

  create() {
    this.particles = null; // Initialize particles as null


    const background = this.add.image(0, 0, 'background'); // Position it at (0, 0)
      // Set the image origin to the center of the image so it can be scaled properly
      background.setOrigin(0, 0); // Set origin to the top-left corner

      // Scale the image to cover the entire screen
      background.setDisplaySize(this.scale.width, this.scale.height); // Stretch to the full screen size
      const backgroundDarken = this.add.image(0, 0, 'bg1'); // Position it at (0, 0)
      // Set the image origin to the center of the image so it can be scaled properly
      backgroundDarken.setOrigin(0, 0); // Set origin to the top-left corner

      // Scale the image to cover the entire screen
      backgroundDarken.setDisplaySize(this.scale.width, this.scale.height); // Stretch to the full screen size
    backgroundDarken.setAlpha(0)

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
    // Create text object
    this.textObjectGa = this.add.text(50, 50, '', {
      font: '32px IrishPenny',
      fill: '#ffffff',
      wordWrap: { width: 700 },
    }).setDepth(10);


    this.textObjectEn = this.add.text(50, 250, '', {
        font: '25px ubuntu',
        fill: 'limegreen',
        wordWrap: { width: 600 },
      }).setVisible(false)
  
    // Initialize typing effect using rexTextTyping
    this.typingEffect = this.rexTextTyping.add(this.textObjectGa, {
      speed:30, // Set the speed of typing
    });

    // Start typing effect on the first text
    this.typingEffect.start(this.textsGa[this.currentStep]).on('complete', () => {
      console.log('Typing complete');
      this.textObjectEn.setText(this.textsEn[this.currentStep]).setDepth(10);

      // Add logic to show next text or transition to next scene
    });

    // Dynamically calculate the position
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;

// Center horizontally and position in the bottom third
const controlSquareX = screenWidth / 4;
const controlSquareY = (screenHeight * 1/3) 

this.controlSquare = new ControlSquare(this, controlSquareX, controlSquareY);
this.controlSquare.setAlpha(0).setDepth(50); // Start invisible
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

    // Make the right button interactive
    this.controlSquare.leftButton.setInteractive();
// Variable to track whether the translation is visible or not
this.isTranslationVisible = false; // Start with the Irish version visible

// Create the middle button to toggle translations
this.controlSquare.middleButton.on('pointerdown', () => {
    // Toggle the visibility of the English translation
    this.isTranslationVisible = !this.isTranslationVisible;
    
 // Update the displayed text based on the current visibility state
    if (this.isTranslationVisible) {
        // Show English translation
        if (this.textObjectEn) {
            this.textObjectEn.setVisible(true).setAlpha(0.8).setDepth(10);
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
          x: targetX,
          
          duration: 700,
          ease: 'Sine.easeInOut',
        });
    },
});


// Assuming `this.textObjectGa` is the text displaying the current message

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
    this.currentStep++;
    if (this.currentStep < this.textsGa.length) {
      // Combine sweeping and typewriter effect
      showNextMessageWithTyping.call(this, this.textsGa[this.currentStep]);
      
      
    } else {
        this.scene.start('MainGame'); // Transition to main game
    }
});

this.controlSquare.upButton.on('pointerdown', () => {
    this.currentStep++;
    if (this.currentStep < this.textsGa.length) {
        // Combine sweeping and typewriter effect
        showNextMessageWithTyping.call(this, this.textsGa[this.currentStep]);
        
        
    } else {
        this.scene.start('MainGame'); // Transition to main game
    }
});

// Set up pointerdown event for going back to the previous message
this.controlSquare.downButton.on('pointerdown', () => {
    if (this.currentStep > 0) {
        // Move back and show previous message with fade-in and drop-down
        showPreviousMessageWithDropDown.call(this);
        
        
        
    } else {
        // Handle scenario if the current step is the first message
        console.log("Already at the first message");
    }
});
// Set up pointerdown event for going back to the previous message
this.controlSquare.leftButton.on('pointerdown', () => {
    if (this.currentStep > 0) {
        // Move back and show previous message with fade-in and drop-down
        showPreviousMessageWithDropDown.call(this);
        
        

    } else {
      // Handle scenario if the current step is the first message
      console.log("Already at the first message");
    }
  });
 
  this.ChampionSelect1 = null
  this.ChampionSelect2 = null


  this.particles = this.add.particles(0, 0, 'fairyLight', {
    speed:{ min: 5, max: 30 },
    lifespan: 3000,
    gravityY: -7100,
    frequency:100,
    scale: { start: 0.5, end: 1.2, ease: 'Linear' },
    alpha: { start: 0.8, end: 0, ease: 'Linear' },
     angle: { min: 0, max: 360 }, 
     x: { min: 0, max: this.scale.width }, // Randomize starting x position
     y: this.scale.height+50, // Randomize starting y position
   
    onEmit: (particle) => {
      // Smooth, unpredictable direction changes
      particle.body.acceleration.x = Math.sin(this.time.now / 2000) * 2; 
      particle.body.acceleration.y = Math.cos(this.time.now / 1500) * 3; 
  }}) 
} 

update() {
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
    this.ChampionSelect1 = new ChampionSelect1(this, 250, 250, () => {
      // This callback will be executed when selectChampion is triggered
      
      this.currentStep= 3;
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

  
    console.log('Texture exists?', this.textures.exists('championSprites'));
  }
  
  if (this.currentStep === 3) {
    this.ChampionSelect1.fadeInBackground2();
  
  }
/*

   this.ChampionSelect1 = new ChampionSelect1(this, 250, 250, () => {
      // Callback: Advance to the next step
      this.currentStep++;
      console.log('Character selected. Moving to step:', this.currentStep);
    }).setDepth(5);
*/

if (this.currentStep === 4 && !this.ChampionSelect2) { //2
  // Create the instance only when needed
  this.ChampionSelect2 = new ChampionSelect2(this, 250, 250).setDepth(5).setInteractive(true).setVisible(false);
      // Now you can safely access textures in the scene context
console.log('Texture exists?', this.textures.exists('championSprites'));

}
if (this.currentStep === 5) {
  this.ChampionSelect2.fadeInBackground2();

}

if (this.currentStep===7){
  this.scene.stop('IntroSequence');  // Transition to IntroSequence scene

}
}



}

export default IntroSequence;

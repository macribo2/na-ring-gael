import Phaser from 'phaser';
import ControlSquare from '../ControlSquare/ControlSquare';
import ChampionSelect1 from './ChampionSelect1'
import ChampionSelect2 from './ChampionSelect2'


import { EventEmitter } from './EventEmitter';

class IntroSequence extends Phaser.Scene {
  constructor() {
    
    super({ key: 'IntroSequence' });
  this.championDiscovered = false; // Flag to track discovery
  this.branchesDiscovered = false; // Flag to track discovery
this.nameGa="test";
this.branchGa="test";
    this.currentStep = 0;
  this.hasFaded = false;
    this.characterSheet = {};
    this.textsGa = [
        'Síos,    \nsíos,      \nsíos go doimhin...',
        'Síos i plúis gan éag...\n     \n"Cé a tagann go ríocht an préamh?"',
        '                    "Is mise..."',
        '"Céarbh íad na fiann len ar ghaiscigh tú fadó?"',
        ' ',
        "Cad  a tógann ós comhair na géaga thú " + this.nameGa + ", " + this.branchGa + "?",

        '"A Crann na Bethadh, \ntá Tír na nÓg ionraithe!     \nScaoil ar ais go hÉireann mé, \n bailleoidh mé na fianna!"',
        ' '
      ];
      
      this.textsEn = [
        'Down, down \nfar far down...',
        'Down in an endless cavern \n "Who has come to the kingdom of the root?"',
        '"I am ...',
        'With which band were your deeds of yore?',
        '',
        'What brings you here?',
        '"O Tree of Life, we are invaded! \nRelease me to Ireland, \nI will summon champions!"',
        '',
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
    this.particles = null; // Initialize particles as null


    const background = this.add.image(0, 0, 'background'); // Position it at (0, 0)
      // Set the image origin to the center of the image so it can be scaled properly

      // Scale the image to cover the entire screen
      background.setOrigin(0).setDisplaySize(this.scale.width, this.scale.height);

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
    this.textObjectGa = this.add.text(this.scale.width*0.05,this.scale.height*0.1, '', {
      font: '32px IrishPenny',
      fill: 'LavenderBlush',
      wordWrap: { width: 700 },
    }).setDepth(10).setDepth(35);


    this.textObjectEn = this.add.text(this.scale.width*0.05,this.scale.height*0.6 ,'', {
        font: '26px IrishPenny',
        fill: 'plum',
        wordWrap: { width: 600 },
      }).setVisible(true).setDepth(35).setAlpha(0);
  
    // Initialize typing effect using rexTextTyping
    this.typingEffect = this.rexTextTyping.add(this.textObjectGa, {
      speed:30, // Set the speed of typing
    });

    // Start typing effect on the first text
    this.typingEffect.start(this.textsGa[this.currentStep]).on('complete', () => {
      console.log('Typing complete');
      this.textObjectEn.setText(this.textsEn[this.currentStep]).setDepth(35);

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
    if (!this.controlSquare.rightButton0) {
      console.error('ControlSquare does not have a rightButton defined!');
      return;
    }

    if (!this.controlSquare.middleButton0) {
        console.error('ControlSquare does not have a middleButton defined!');
        return;
      }

    if (!this.controlSquare.leftButton0) {
        console.error('ControlSquare does not have a leftButton defined!');
        return;
      }


      if (!this.controlSquare.downButton0) {
        console.error('ControlSquare does not have a downButton defined!');
        return;
      }
      if (!this.controlSquare.upButton0) {
          console.error('ControlSquare does not have a upButton defined!');
          return;
        }

    // Make the right button interactive
    this.controlSquare.leftButton0.setInteractive();
// Variable to track whether the translation is visible or not
this.isTranslationVisible = false; // Start with the Irish version visible

// Create the middle button to toggle translations
this.controlSquare.middleButton0.on('pointerdown', () => {
    // Toggle the visibility of the English translation
    this.isTranslationVisible = !this.isTranslationVisible;
    
 // Update the displayed text based on the current visibility state
    if (this.isTranslationVisible) {
        // Show English translation
        if (this.textObjectEn) {
            this.textObjectEn.setVisible(true).setAlpha(0.8).setDepth(40);
        } else {
            console.error("textObjectEn is not defined. Ensure it is created before this point.");
        }

        if (this.subtitleTextEn) {
            this.subtitleTextEn.setVisible(true).setAlpha(0.8).setDepth(40);
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
              this.textObjectGa.setText
              (this.textsGa[this.currentStep]);
              this.textObjectEn.setText(this.textsEn[this.currentStep]);
            }
          });
        }
      }
    });
  }
  
  
  
  EventEmitter.on('championDiscovered', () => {
    this.championDiscovered = true;
    console.log('Champion has been discovered!');
  });
  EventEmitter.on('branchesDiscovered', () => {
    this.branchesDiscovered = true;
    console.log('Branches have been discovered!');
  });
  this.events.on('championDiscovered', () => {
    this.championDiscovered = true;
    console.log("Champion discovered in IntroSequence!");
  });
  this.controlSquare.rightButton0.on('pointerdown', () => {

      // Guard condition: Block progression if currentStep === 2 and champion is not discovered
  if (this.currentStep === 2 && !this.championDiscovered) {
    return; // Stop further execution
  }
  if (this.currentStep === 4 && !this.branchesDiscovered) {
    return; // Stop further execution
  }
    this.currentStep++;
    EventEmitter.emit('stepChanged', this.currentStep);
    if (this.currentStep < this.textsGa.length) {
      // Combine sweeping and typewriter effect
      showNextMessageWithTyping.call(this, this.textsGa[this.currentStep]);
      
      
    } else {
        this.scene.start('MainGame'); // Transition to main game
    }
});

this.controlSquare.upButton0.on('pointerdown', () => {
    this.currentStep++;
    EventEmitter.emit('stepChanged', this.currentStep);
    if (this.currentStep < this.textsGa.length) {
        // Combine sweeping and typewriter effect
        showNextMessageWithTyping.call(this, this.textsGa[this.currentStep]);
        
        
    } else {
        this.scene.start('MainGame'); // Transition to main game
    }
});

// Set up pointerdown event for going back to the previous message
this.controlSquare.downButton0.on('pointerdown', () => {
    if (this.currentStep > 0) {
        // Move back and show previous message with fade-in and drop-down
        showPreviousMessageWithDropDown.call(this);
        
        
        
    } else {
        // Handle scenario if the current step is the first message
        console.log("Already at the first message");
    }
});
// Set up pointerdown event for going back to the previous message
this.controlSquare.leftButton0.on('pointerdown', () => {
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


  this.particles = this.add.particles(0, 0, 'fairyLightBlur', {
    speed:{ min: 5, max: 30 },
    lifespan: 3000,
    gravityY: -5100,
    frequency:200,
    scale: { start: 0.5, end: 1.2, ease: 'Linear' },
    alpha: { start: 0.8, end: 0, ease: 'Linear' },
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
        this.textObjectGa.setPosition(this.scale.width*0.01,this.scale.height*0.75); // New position
  
        setTimeout(() => {
          // Fade in the updated text
          this.tweens.add({
            targets: this.textObjectGa,
            alpha: 0.6,
            color:'lightgrey', // Fade in to alpha 1
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
  





  


if (this.currentStep === 4 && !this.ChampionSelect2) { //2
  // Create the instance only when needed
  this.ChampionSelect2 = new ChampionSelect2(this, 250, 250, this.currentStep).setDepth(5).setInteractive(true).setVisible(false);
      // Now you can safely access textures in the scene context
console.log('Texture exists?', this.textures.exists('championSprites'));

}
if (this.currentStep === 5) {
    let characterSheet = JSON.parse(localStorage.getItem('characterSheet'));

    // Update the name and branch variables
    this.nameGa = characterSheet.nameGa;
    this.branchGa = characterSheet.branchGa;

    // Dynamically update the text at the required step
    this.textsGa[5] = `${this.nameGa}! \nCad  a tógann chuig na sean géaga seo arís,\n a ${this.nameGa} dhíl?`;
    this.textsEn[5] = `${this.nameGa}!\nWhat brings you back to these old branches,\n faithful ${this.nameGa}?`;

    // Update any text object showing the text if necessary
    this.textObjectGa.setText(this.textsGa[this.currentStep]);
    this.textObjectEn.setText(this.textsEn[this.currentStep]);

    this.ChampionSelect2.fadeInBackground2();
    this.textObjectGa.setDepth(35);
    this.textObjectEn.setDepth(35);
    this.textObjectGa.y = this.scale.height * 0.01;
}

if (this.currentStep===7){
  this.scene.stop('IntroSequence');  // Transition to IntroSequence scene
  localStorage.setItem('charactersheet', JSON.stringify(this.charactersheet));
  window.location.href = '/ballygamboy';
  
}


}



}

export default IntroSequence;

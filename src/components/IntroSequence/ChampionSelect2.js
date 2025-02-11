import Phaser from "phaser";
import { EventEmitter } from './EventEmitter';


class ChampionSelect1 extends Phaser.GameObjects.Container {
  
  constructor(scene, x, y, onComplete) {
    
    super(scene, x, y);
    this.championDiscovered = false; // Initially, the champion is not discovered
    const centerX = 100;
    const centerY = 100;
    this.championImage = scene.add.image(centerX, centerY, 'championSprites').setVisible(false)
    
this.onComplete=onComplete;
this.background2 = null; // Declare background2 here
    const radius = 450;
    this.numSpokes = 300; // Total number of spokes
    this.currentAngle = 0;
    this.champions = [
 {spriteKey:'1.png' ,gender:"", nameGa: 'Tassach',  nameEn: 'idle; inactive'}
,
,{spriteKey:'1.png',gender:"", nameGa: 'Órnait', nameEn: 'sallow'}
  
]

  
this.displayedChampion = JSON.parse(JSON.stringify(this.champions[0])); // Default to the first champion

this.background2 = scene.add.sprite(0, 0, 'bg1').setVisible(false).setDepth(15);
this.background2.setOrigin(0, 0);
this.background2.setDisplaySize(scene.scale.width, scene.scale.height);
this.background2.setAlpha(0); // Set initial alpha to 0


this.background = scene.add.sprite(0, 0, 'bg1'); 
this.background.setOrigin(0, 0); 
this.background.setDisplaySize(scene.scale.width, scene.scale.height);
  // Add the dynamic rainbow circle
  this.createRainbowCircle(scene, centerX, centerY, 50);

this.championSprite = scene.add.sprite(400, 300, 'championSprites').setVisible(false);

// Create the sprite for the wheel
this.wheel = scene.add.sprite(centerX,centerY, 'celt-ring').setOrigin(0.5, 0.5).setAlpha(0.5);
    this.wheel.setDisplaySize(radius * 2, radius * 2);
    this.wheel.setInteractive();
    
    // Add the container to the scene
    scene.add.existing(this);
    
    // Draw spokes
    this.spokes = scene.add.graphics().setAlpha(0);
    this.spokes.setPosition(centerX, centerY); // Align spokes to center
    this.drawSpokes(radius, this.numSpokes);
    
    // Add the square sensor
    this.sensor = scene.add.rectangle(400, 250, 2, 2, 0x003300);
    
    // Add text for the name
    this.nameTextGa = scene.add.text(scene.scale.width * 0.5, scene.scale.height * 0.5, 'test', {
      font: '80px dum1',
      fill: 'LavenderBlush',
    }).setOrigin(0.5).setAlpha(0).setDepth(30);;
       // Add text for the name
     this.nameTextEn =scene.add.text(scene.scale.width * 0.2, scene.scale.height * 0.8, '', {
      font: '32px dum1',
      fill: 'plum',
      wordWrap: { width: 600 },
    }).setAlpha(0).setDepth(135).setVisible(true);
    
    
 // Set up the event listener
EventEmitter.on('stepChanged', (newStep) => {
  console.log(`ChampionSelect1 noticed step change: ${newStep}`);
  if (newStep === 3) {
    // Stop the spin and settle on the currently visible champion
    this.rotationVelocity = 0; // Set velocity to 0 to stop spinning
    this.isDragging = false;  // Ensure dragging isn't happening
    this.dampingFactor = 1;   // Remove damping to instantly stop any residual motion

    // Calculate the visible champion index based on the wheel's rotation
    const numChampions = this.champions.length;
    const rotationNormalized = this.wheel.rotation % (Math.PI * 2); // Normalize rotation to one full circle
    const championAngle = (Math.PI * 2) / numChampions; // Angle per champion
    const championIndex = Math.floor((rotationNormalized + championAngle / 2) / championAngle) % numChampions;

    // Handle negative indices (due to modulo behavior in JavaScript)
    this.currentChampionIndex = championIndex < 0 ? championIndex + numChampions : championIndex;

    // Assign the displayed champion
    this.displayedChampion = this.champions[this.currentChampionIndex];

    // Log the selected champion for debugging
    console.log("Selected Champion Data (Raw):", this.displayedChampion);

    // Deep copy the selected champion to ensure no data is lost
    const selectedChampionCopy = JSON.parse(JSON.stringify(this.displayedChampion));
    console.log("Selected Champion Data (Deep Copy):", selectedChampionCopy);

    // Stop any remaining motion and visually "snap" to the selected champion
    this.wheel.rotation = this.currentChampionIndex * championAngle;

    setTimeout(() => {
      console.log("Spinning stopped. Selecting champion...");

      if (this.displayedChampion) {
        console.log("Selected Champion Data (Final):", this.displayedChampion);
      } else {
        console.error("No champion data found for the selected index.");
      }

      // Existing logic for fading out and repositioning `nameTextGa`
      if (this.nameTextGa) {
        this.scene.tweens.add({
          targets: this.nameTextGa,
          alpha: 0, // Fade out to alpha 0
          duration: 1000, // Duration of 1 second
          ease: "Power1", // Smooth easing
          font:'32px dum1',
          onComplete: () => {
            // Change text properties (position, font size, etc.)
            this.nameTextGa.setPosition(scene.scale.width * 0.02, scene.scale.height * 0.6).setFontSize(26); // New position
            this.nameTextGa.setOrigin(0);

            // Fade in the updated text
            this.scene.tweens.add({
              targets: this.nameTextGa,
              alpha: 1, // Fade in to alpha 1
              duration: 1000, // Duration of 1 second
              ease: "Power1", // Smooth easing
              onStart: () => {
                console.log("nameTextGa is fading back in.");
              },
              onComplete: () => {
                console.log("nameTextGa fully visible.");
              },
            });
          },
        });
      } else {
        console.warn("nameTextGa is not defined yet.");
      }
    }, 100);

    // Move the champion sprite down (walking effect)
    if (this.championImage) {
      this.scene.tweens.add({
        targets: this.championImage,
        y:scene.scale.height * 0.8, // Move down 250px
        duration: 2000, // Duration of 2 seconds for walking effect
        ease: "Sine.easeInOut", // Smooth easing function
        onStart: () => {
          console.log("ChampionSprite started walking down.");
        },
        onComplete: () => {
          this.championImage.flipX = !this.championImage.flipX; // Flip horizontally

          console.log("ChampionSprite finished walking down.");
        },
      });
    } else {
      console.warn("championImage is not defined yet.");
    }
  }


         if (newStep === 4) {
          if (this.nameTextGa) {
              // Fade out the current text
              this.scene.tweens.add({
                  targets: this.nameTextGa,
                  alpha: 0, // Fade out to alpha 0
                  duration: 1000, // Duration of 1 second
                  ease: 'Power1', // Smooth easing
                  onComplete: () => {
                      console.log("nameTextGa faded out.");
                      
                      // Change text properties (position, font size, etc.)
                      this.nameTextGa.setFontSize(26); // Smaller font size
                      this.nameTextGa.setPosition(scene.scale.width * 0.02, scene.scale.height * 0.6); // New position
                      this.nameTextGa.setAlpha(0.5); // New position
                      
                      // Fade in the updated text
                      this.scene.tweens.add({
                          targets: this.nameTextGa,
                          alpha: 1, // Fade in to alpha 1
                          duration: 1000, // Duration of 1 second
                          ease: 'Power1', // Smooth easing
                          onStart: () => {
                              console.log("nameTextGa is fading back in.");
                          },
                          onComplete: () => {
                              console.log("nameTextGa fully visible.");
                          }
                      });
                  }
              });
          } else {
              console.warn("nameTextGa is not defined yet.");
          }
      }


  })
 
    // Add a sprite to display the champion image
    this.championImage = scene.add.sprite(centerX, centerY, 'defaultSprite').setVisible(false).setAlpha(0);
    this.championImage.setScale(2).setDepth(30); // Adjust size as needed


    // Variables for tracking rotation and velocity
    this.rotationVelocity = 0;
    this.isDragging = false;
    this.dampingFactor = 0.9995;
    this.minVelocity = 0.0001;
    this.friction = 0.995;
    this.dragSensitivity = 0.0005;
    
    // Pointer events
    this.wheel.on('pointerdown', (pointer) => this.startDrag(pointer));
    this.wheel.on('pointermove', (pointer) => this.dragWheel(pointer));
    this.wheel.on('pointerup', () => this.stopDrag());
    
    // Update the wheel rotation in the game loop
    scene.events.on('update', this.updateWheel, this);

  }
  // Example function when the champion is discovered
  onChampionDiscovered() {
    // Make the image visible
    this.championDiscovered = true;
    this.championImage.setAlpha(1);

    // Emit a custom event to notify other scenes
    EventEmitter.emit('championDiscovered');
    
  }
    updateChampionSprite(spriteKey) {
    if (this.scene.textures.exists('championSprites') && spriteKey) {
      this.championImage.setTexture('championSprites', spriteKey).setVisible(true);
    } else {
      this.championImage.setVisible(false);
    }
  }

  // Method to toggle the visibility of the English name
  toggleEnglishNameVisibility(visible) {
    this.nameTextEn.setVisible(visible);
   
  }
  

 // Method to create a dynamic rainbow circle
 createRainbowCircle(scene, x, y, radius) {
  this.rainbowCircle = scene.add.graphics().setAlpha(0);
  scene.events.on('update', () => {
    this.updateColorShiftCircle(x, y, radius);
  });
}


 

  drawSpokes(radius, numSpokes) {
    const angleStep = (2 * Math.PI) / numSpokes;
    this.spokes.clear();
    
    // Draw each spoke
    for (let i = 0; i < numSpokes; i++) {
      const angle = i * angleStep;
      const endX = Math.cos(angle) * radius;
      const endY = Math.sin(angle) * radius;
      
      this.spokes.lineStyle(1, 0xffffff, 0.3);
      this.spokes.beginPath();
      this.spokes.moveTo(0, 0); // Draw relative to the graphics object's center
      this.spokes.lineTo(endX, endY);
      this.spokes.strokePath();
    }
  }
  
  startDrag(pointer) {
    this.isDragging = true;
    this.startY = pointer.y;
    this.previousAngle = this.currentAngle;
    this.rotationVelocity = 0;
  }
  
  dragWheel(pointer) {
    if (this.isDragging) {
      
      this.nameTextGa.setAlpha(1)
      this.nameTextEn.setAlpha(1)
      this.rainbowCircle.setAlpha(1)
      this.championImage.setAlpha(1)
       this.onChampionDiscovered();
      const dy = pointer.y - this.startY;
      const deltaAngle = dy * this.dragSensitivity;
      this.currentAngle += deltaAngle;
      this.startY = pointer.y;
      
      // Rotate both wheel and spokes
      this.wheel.rotation = this.currentAngle;
      this.spokes.rotation = this.currentAngle;
      
      this.rotationVelocity = deltaAngle;
    }
  }
  fadeInBackground2=()=> {
    if (this.background2) {
        this.background2.setVisible(true);
        this.scene.tweens.add({
            targets: this.background2,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                console.log("Background2 has successfully faded in!");
            },
        });
    } else {
        console.error("background2 is not defined or not initialized.");
    }
}
  stopDrag() {
    this.isDragging = false;
  }
  
  updateWheel() {
    if (!this.isDragging) {
      
      if (Math.abs(this.rotationVelocity) > this.minVelocity) {
            // Continue natural rotation with damping
            this.currentAngle += this.rotationVelocity;
            this.wheel.rotation = this.currentAngle;
            this.spokes.rotation = this.currentAngle;
            
            this.rotationVelocity *= this.dampingFactor;
            this.rotationVelocity *= this.friction;
          } else {
            // Snapping to nearest spoke
            const angleStep = (2 * Math.PI) / this.numSpokes;
            const snappedAngle = Math.round(this.currentAngle / angleStep) * angleStep;
            
            // Smoothly transition to the snapped angle
            if (Math.abs(snappedAngle - this.currentAngle) > 0.001) {
              this.currentAngle = Phaser.Math.Interpolation.Linear([this.currentAngle, snappedAngle], 0.1);
              this.wheel.rotation = this.currentAngle;
              this.spokes.rotation = this.currentAngle;
            } else {
                this.currentAngle = snappedAngle; // Final snap to exact position
                this.rotationVelocity = 0; // Stop rotation completely
            }
        }
    }
    
    // Highlight spokes touching the sensor
    this.highlightSpokes();
  }
  
  selectChampion(characterName) {
    if (!this.scene) {
      console.error('Scene is not defined');
      return;
    }
  
   this.selectedCharacter = characterName;
    console.log(`Selected: ${characterName}`);
  
  
  
    if (this.onComplete) {
      this.onComplete();
    }
    if (this.timerEvent) {
      this.timerEvent.remove();
    }
    this.off('pointerdown'); // Remove pointer listener
this.scene.events.off('update', this.updateColorShiftCircle, this); // Unsubscribe from update

this.scene.time.delayedCall(0, () => {
  this.destroy();
});
  }
  

  highlightSpokes() {
    if (!this.scene) {
      console.error("Scene is undefined. Ensure the method is called after initialization.");
      return;
    }
  
    // Ensure spokes is initialized
    if (!this.spokes) {
      this.spokes = this.scene.add.graphics();
    }
  
    const centerX = 100;
    const centerY = 100;
    const radius = 450;
    const angleStep = (2 * Math.PI) / this.numSpokes;
    var sensorX = this.sensor && this.sensor.x !== undefined ? this.sensor.x : 0;
    var sensorY = this.sensor && this.sensor.y !== undefined ? this.sensor.y : 0;
  
    let sensorAngle = Math.atan2(sensorY - centerY, sensorX - centerX);
    sensorAngle = Phaser.Math.Angle.Wrap(sensorAngle - this.currentAngle);
  
    const highlightingRange = Math.PI / (this.numSpokes * 2);
    let sensorTouched = false;
    let highlightedSpokeIndex = -1;
  
    this.spokes.clear();
  
    for (let i = 0; i < this.numSpokes; i++) {
      const rotatedAngle = i * angleStep;
      let angleDifference = Phaser.Math.Angle.Wrap(sensorAngle - rotatedAngle);
  
      const endX = Math.cos(rotatedAngle) * radius;
      const endY = Math.sin(rotatedAngle) * radius;
  
      if (Math.abs(angleDifference) < highlightingRange) {
        sensorTouched = true;
        this.spokes.lineStyle(3, 0x003300, 1);
        highlightedSpokeIndex = i;
      } else {
        this.spokes.lineStyle(1, 0xffffff, 0.3);
      }
  
      this.spokes.beginPath();
      this.spokes.moveTo(0, 0);
      this.spokes.lineTo(endX, endY);
      this.spokes.strokePath();
    }
  
    if (sensorTouched && this.sensor) {
      this.sensor.setFillStyle(0x000000);
      this.scene.time.delayedCall(50, () => {
        if (this.sensor) this.sensor.setFillStyle(0x003300);
      });
    }
  
    if (sensorTouched && highlightedSpokeIndex !== -1) {
      const displayedChampion = this.champions[highlightedSpokeIndex % this.champions.length];
  
      this.nameTextGa.setText(displayedChampion.nameGa);
      this.nameTextEn.setText(displayedChampion.nameEn);
  
      this.displayedChampion = {
        nameGa: displayedChampion.nameGa,
        nameEn: displayedChampion.nameEn,
        gender: displayedChampion.gender,
        spriteKey: displayedChampion.spriteKey,
      };
      let characterSheet = {}
   characterSheet.nameGa = displayedChampion.nameGa;
   characterSheet.nameEn = displayedChampion.nameEn;
   characterSheet.gender = displayedChampion.gender;
   characterSheet.spriteKey = displayedChampion.spriteKey;

// Save characterSheet to local storage
localStorage.setItem('characterSheet', JSON.stringify(characterSheet));

// Log the updated characterSheet for debugging
console.log("Updated characterSheet and saved to local storage:", characterSheet);

      const textureExists = this.scene.textures.exists('championSprites');
      if (textureExists) {
        const spriteKey = `${displayedChampion.spriteKey}`;
        if (spriteKey) {
          this.championImage
            .setTexture('championSprites', spriteKey)
            .setVisible(true)
            .setInteractive()
            .on('pointerdown', () => {
              this.selectChampion(this.displayedChampion.nameGa);
           
            });
        } else {
          this.championImage.setVisible(false);
        }
      } else {
        console.warn("Texture 'championSprites' does not exist.");
        this.championImage.setVisible(false);
      }
    }
  

  }
  

}

export default ChampionSelect1;

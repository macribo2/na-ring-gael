import Phaser from "phaser";

class ActionMenu extends Phaser.GameObjects.Container {
  constructor(scene, menuKey, closeActionMenu,goDownStairs,goUpStairs) {
    super(scene);
    this.scene = scene;
    this.menuKey = menuKey;
    this.closeActionMenu = closeActionMenu; // Store function reference
    this.goDownStairs = goDownStairs; // Store function reference
    this.goUpStairs = goUpStairs; // Store function reference
    this.scene.events.on('cycleAction', this.handleCycleAction, this);


    if (!scene.cache.json.exists('menuContent')) {
      console.error('Menu data not loaded!');
      return;
    }

    this.menuData = scene.cache.json.get('menuContent');

  this.overlay = scene.add.rectangle(
  scene.cameras.main.centerX, 
  scene.cameras.main.centerY,
  scene.scale.width*2,
  scene.scale.height*2,
  0x004400,
  0.1
)
    
     // Get graphic key from JSON configuration
     const graphicKey = this.menuData.graphic || 'default_fallback_texture'; // Add fallback

          
      // Wheel
        this.wheel = scene.add.sprite(scene.scale.width/2,scene.scale.height/2, 'celt-ring')
          .setVisible(false)
          .setDepth(1100)
          .setInteractive({ draggable: true })
          .setScrollFactor(0)
          .setDisplaySize(400, 400);
          this.scene.physics.add.existing(this.wheel);
    // this.wheel.body.setAngularDamping(0.8);
    
        // Spokes container
        this.spokesContainer = scene.add.container(scene.scale.width/2,scene.scale.height/2)
          .setDepth(1599)
          .setScrollFactor(0).setVisible(true);
    
      
     
    // State variables
    this.isDragging = false;
    this.dragSensitivity = 0.005;
    this.angularVelocity = 0;
    this.deceleration = 0.98;
    this.minVelocity = 0.001;
    this.numChoices = 0;
    this.choices = [];
    
    this.isEnglish = false; // Add state for English toggle

    // Listen for the toggleTranslation event
    this.scene.events.on('toggleTranslation', this.onToggleTranslation, this);

    // Variables for spoke selection
    this.choiceIndex = 0;  // Current choice index
    this.spokeAngle = 0;   // Angle between spokes
    this.direction = 0;    // Rotation direction: 1 for clockwise, -1 for counter-clockwise
    this.choiceCounter = 0; // To keep track of current choice
    this.previousAngle = 0; // Track previous wheel angle for determining direction
    this.lastRotation = 0;  // Store last rotation for direction detection
    
    // Event listeners
    this.wheel.on('pointerdown', this.startDrag.bind(this));
    this.scene.input.on('pointermove', this.dragWheel.bind(this));
    this.scene.input.on('pointerup', this.stopDrag.bind(this));

    this.setVisible(false);


    

    // Load the base button graphic from the atlas (from JSON)
this.buttonBase = scene.add.sprite(scene.scale.width / 2, scene.scale.height / 2, 'default_button')
.setDepth(6001)
.setScrollFactor(0).setScale(0.75).setAlpha(1)
.setInteractive().on("pointerdown", () => {
    // Emit the confirmAction event to trigger selection confirmation
    this.scene.events.emit('confirmAction', this.choiceCounter);
});

        
   
    this.buttonContainer = scene.add.container(0, 0, [this.buttonBase,]) //this.buttonFrame])
    .setDepth(600)
    .setVisible(false)
    .setScrollFactor(0)
    .setInteractive(new Phaser.Geom.Circle(0, 0, 40), Phaser.Geom.Circle.Contains);
       

    this.titleTextEn = scene.add.text(scene.scale.width/2,scene.scale.height/6+10, "test!!!!!", {
      fontSize: "32px",
      fontFamily:'dum1, sans-serif',
      fill: "darkorange",
      align: "center",
      wordWrap: { width: 800 }
    }).setOrigin(0.5).setDepth(2600).setVisible(false).setScrollFactor(0).setAlpha(0.7);

    this.titleTextGa = scene.add.text(scene.scale.width/2,scene.scale.height/10, "", {
      fontSize: "32px",
      fontFamily:'aonchlo, sans-serif',
      fill: "LavenderBlush",
      align: "center",
      wordWrap: { width: 800 }
    }).setOrigin(0.5).setDepth(2600).setVisible(false).setScrollFactor(0);
this.choiceTextEn = scene.add.text(scene.scale.width/2,scene.scale.height/2+30, "Also Test", {
  fontSize: "24px",
  fill: "gunmetal",
  fontFamily:'dum1',
  align: "center",
  wordWrap: { width: 600 }
}).setOrigin(0.5).setDepth(2600).setVisible(false).setScrollFactor(0);




    // Current choice text (displayed when spinning)g
    this.choiceTextGa = scene.add.text(scene.scale.width/2,scene.scale.height/2, "", {
      fontSize: "32px",
      fill: "gunmetal",
      fontFamily:'dum1',
      align: "center",
      wordWrap: { width: 600 }
    }).setOrigin(0.5).setDepth(2600).setVisible(false).setScrollFactor(0);
 
  
  
    
    
    this.scene.tweens.add({
      targets: this.buttonBase,
      alpha: { start: 1, to: 0.5, duration: 1500, yoyo: true, repeat: -1 }, // Fade between 1 (visible) and 0.5 (semi-transparent)
      ease: 'Sine.easeInOut', // Smooth easing for a gentle fade
      yoyo: true, // Makes the tween reverse (fade back in after fading out)
      repeat: -1, // Loops indefinitely
    });  
    
    this.add([this.overlay, this.wheel, this.buttonBase, this.titleTextGa,this.choiceTextGa,this.titleTextEn, this.choiceTextEn]);
    this.scene.add.existing(this);

 
    // this.scene.events.on('cycleAction', (direction) => this.handleCycleAction(direction), this);
    this.scene.events.on('cycleAction', this.handleCycleAction.bind(this), this);
    this.scene.events.on('confirmAction', () => {
      // Use the internal choiceCounter that's maintained by the ActionMenu
      this.confirmSelection(this.choiceCounter);
    });
  }

  confirmSelection(choiceIndex) {
    console.log('Choices:', this.choices);  // Log the choices array
    console.log('Choice Index:', choiceIndex);  // Log the index
    
    if (choiceIndex === undefined) {
      console.error('Choice index is undefined');
      return;
    }
    
    const selectedChoice = this.choices[choiceIndex];  // Get the current choice
    if (!selectedChoice) {
      console.error('Selected choice is undefined for index', choiceIndex);
      return;
    }
    
    console.log('Selected choice:', selectedChoice);
    
    // Handle the action based on the string value
    if (selectedChoice.action === 'goDownStairs') {
      this.scene.goDownStairs();
      this.scene.closeActionMenu(); // Close the menu if the player chooses to go down
    } else if (selectedChoice.action === 'goUpStairs') {
      this.scene.goUpStairs();
      this.scene.closeActionMenu(); // Close the menu if the player chooses to go up
    } else if (selectedChoice.action === 'cancel') {
      this.scene.closeActionMenu(); // Close the menu if the player cancels
    } else {
      console.log('Unknown action:', selectedChoice.action);
      this.scene.closeActionMenu(); // Close the menu anyway
    }
    
    // You could also use a switch statement if you prefer:
    /*
    switch(selectedChoice.action) {
      case 'goDownStairs':
        this.scene.goDownStairs();
        this.scene.closeActionMenu();
        break;
      case 'goUpStairs':
        this.scene.goUpStairs();
        this.scene.closeActionMenu();
        break;
      case 'cancel':
        this.scene.closeActionMenu();
        break;
      default:
        console.log('Unknown action:', selectedChoice.action);
        this.scene.closeActionMenu();
    }
    */
  }
handleCycleAction(direction) {
  const rotationStep = (Math.PI * 2) / this.numChoices;  // Calculate the rotation per choice
  const rotationChange = direction * rotationStep; // The change in rotation based on direction
  
  // Update wheel rotation
  const targetRotation = this.wheel.rotation + rotationChange;
  
  // Animate the wheel rotation
  this.scene.tweens.add({
    targets: this.wheel,
    rotation: targetRotation,
    duration: 150,  // Animation duration
    ease: 'Sine.easeOut',
    onUpdate: () => {
      // Keep the spokes aligned with the wheel
      this.spokesContainer.rotation = this.wheel.rotation;
    },
    onComplete: () => {
      this.updateSelection(direction);  // Update selection after animation completes
    }
  });
}

updateSelection(direction) {
  // Adjust the choiceCounter based on the direction of the wheel
  if (direction === 1) {
    // Move to next choice
    this.choiceCounter = (this.choiceCounter + 1) % this.numChoices;
  } else if (direction === -1) {
    // Move to previous choice
    this.choiceCounter = (this.choiceCounter - 1 + this.numChoices) % this.numChoices;
  }

  console.log('Current choiceCounter:', this.choiceCounter);  // Log to check the updated counter

  // Update the displayed text based on the current choice
  this.updateChoiceText();
}

updateChoiceText() {
  // Set the text for the current choice based on the `choiceCounter`
  const choice = this.choices[this.choiceCounter];
  if (this.isEnglish) {
    this.choiceTextEn.setText(choice.textEn);
    this.titleTextEn.setText(choice.titleEn);
  } else {
    this.choiceTextGa.setText(choice.textGa);
    this.titleTextGa.setText(choice.titleGa);
  }
}

  onToggleTranslation() {
    this.isEnglish = !this.isEnglish; // Toggle state

    console.log("Toggling translation. isEnglish:", this.isEnglish);

    // Toggle visibility based on the new state
    this.titleTextEn.setVisible(this.isEnglish);
    this.choiceTextEn.setVisible(this.isEnglish);
}
  
  updateChoiceDisplay() {
    // Ensure index stays within bounds
    this.choiceCounter = Phaser.Math.Wrap(this.choiceCounter, 0, this.numChoices);

    // Make sure choices array has elements before trying to access
    if (this.choices && this.choices.length > 0) {
      // Update the choice text to reflect the current choice
      this.choiceTextGa.setText(this.choices[this.choiceCounter].nameGa);
      this.choiceTextEn.setText(this.choices[this.choiceCounter].nameEn);

    }

    
    
  }

  createSpokes(choices) {
    this.spokesContainer.removeAll(true);
  
    this.choices = choices;
    this.numChoices = choices.length;
  
    // Calculate angle between spokes
    this.spokeAngle = Phaser.Math.PI2 / this.numChoices;
  
    choices.forEach((choice, index) => {
      const angle = this.spokeAngle * index;
      
      // Create a spoke line (visual)
      const spoke = this.scene.add.line(0, 0, 0, 0, 0, -180, 0xffffff)
        .setLineWidth(3).setRotation(angle);
      
      this.spokesContainer.add(spoke).setDepth(6000);
      
      // Create an invisible physics body along the spoke line
      const spokeX = Math.cos(angle) * 180; // Was 90
      const spokeY = Math.sin(angle) * 180;
  
      
  

    });
  
    // Update choice display
    this.choiceCounter = 0;
    this.updateChoiceDisplay();
  

  }
  
  getRotationDirection() {
    const currentAngle = this.wheel.rotation; // Use rotation in radians
    const previousAngle = this.previousAngle || currentAngle;
    let delta = currentAngle - previousAngle;
    
    // Adjust for full rotations (2π radians)
    // delta = ((delta + Math.PI) % (Math.PI * 2)) - Math.PI;
    
    this.previousAngle = currentAngle;
    // const angularVelocity = this.wheel.body?.angularVelocity ?? 0;
    const angularVelocity = (this.wheel.body && this.wheel.body.angularVelocity) !== undefined ? this.wheel.body.angularVelocity : 0;

    return angularVelocity > 0 ? 1 : -1; // Use physics body velocity
    // return Math.sign(delta);
  }

  showMenu(menuKey) {

    
    if (!this.menuData[menuKey]) {
      console.error(`No data for menu key: ${menuKey}`);
      return;
    }

    const data = this.menuData[menuKey];

    // List of elements to fade in
    const elements = [
        this.overlay,
        this.wheel,
        this.buttonBase,
        this.titleTextGa,
        this.choiceTextGa
    ];

    if (!this.titleHidden) {
        this.titleTextGa.setText(data.subjectGa).setScrollFactor(0);
        this.titleTextEn.setText(data.subjectEn).setScrollFactor(0);
    }

    if (!this.choicesVisible) {
        this.choiceTextGa.setScrollFactor(0);
        this.choiceTextEn.setScrollFactor(0);
    }

    this.createSpokes(data.choices);
    this.setVisible(true);

    // Reset rotation tracking
    this.lastRotation = this.wheel.rotation;
    this.direction = 0;

    this.scene.input.setTopOnly(true);
    this.overlay.setInteractive();

    // Apply fade-in effect to each element
    elements.forEach(element => {
        if (element) {
            element.setAlpha(0).setVisible(true); // Start invisible
            this.scene.tweens.add({
                targets: element,
                alpha: 1, // Fade in
                duration: 500, // Adjust speed of fade
                ease: 'Power2'
            });
        }
    });

    this.wheel.setScale(0.75); // Set scale after visibility
}

  updateSpokePositions() {
    // Get current wheel rotation
    const rotation = this.wheel.rotation;
    

    
    // Track rotation direction
    this.getRotationDirection();
  }

  // Update dragWheel method to track proper rotation
  dragWheel(pointer) {
    if (!this.isDragging) return;
  
    // Get angle from pointer position
    const currentAngle = Phaser.Math.Angle.Between(
      400, 300, // Wheel center
      pointer.x, pointer.y
    );
    
    // Calculate actual rotation delta
    const delta = currentAngle - this.startAngle;
    
    // Update wheel rotation
    this.wheel.rotation = this.wheelStartRotation + delta;
    this.spokesContainer.rotation = this.wheel.rotation;
    
    // Update angular velocity based on actual rotation
    this.angularVelocity = delta - this.previousDelta;
    this.previousDelta = delta;
  

  }
  
  startDrag(pointer) {

    this.isDragging = true;
    this.startAngle = Phaser.Math.Angle.Between(
      400, 300, // Wheel center
      pointer.x, pointer.y
    );
    this.wheelStartRotation = this.wheel.rotation;
    this.previousDelta = 0;
    this.angularVelocity = 0;
    
    // Reset last rotation to current rotation for accurate direction detection
    this.lastRotation = this.wheel.rotation;
  
  if (!this.choicesVisible) {
      this.choicesVisible = true;
      this.scene.tweens.add({
          targets: this.choiceTextGa,
          alpha: 1,
          duration: 500,
          ease: 'Linear',
          onStart: () => {
              this.choiceTextGa.setAlpha(0).setVisible(true).setActive(true); // Ensure visibility
          }
      });
  }

  }

  decelerateWheel() {
    if (Math.abs(this.angularVelocity) < this.minVelocity) {
      this.angularVelocity = 0;
      return;
    }

    this.angularVelocity *= this.deceleration;
    this.wheel.rotation += this.angularVelocity;
    this.spokesContainer.rotation = this.wheel.rotation;
    

    if (Math.abs(this.angularVelocity) >= this.minVelocity) {
      this.scene.time.delayedCall(16, () => this.decelerateWheel());
    }
  }

  stopDrag() {
    this.isDragging = false;
    this.decelerateWheel();
  }

  update() {
    this.updateSelection();
    
    // Visual feedback for current selection
    const highlightAngle = this.getCurrentChoiceIndex() * this.spokeAngle;
    // this.spokesContainer.getChildren().forEach((spoke, index) => {
    //     spoke.setStrokeStyle(3, index === this.choiceCounter ? 0x00ff00 : 0xffffff);
    // });
}
getCurrentChoiceIndex() {
  // Get normalized rotation angle (0-2π)
  const normalizedRotation = Phaser.Math.Angle.Wrap(this.wheel.rotation);
  
  // Calculate index based on rotation
  const rawIndex = Math.floor((normalizedRotation / (Math.PI * 2)) * this.numChoices);
  
  // Ensure positive index within bounds
  return (rawIndex + this.numChoices) % this.numChoices;
}
updateSelection() {
  const newIndex = this.getCurrentChoiceIndex();
  
  // Only update if index changed
  if (newIndex !== this.choiceCounter) {
      const delta = newIndex - this.choiceCounter;
      
      // Handle wrap-around cases
      if (Math.abs(delta) > this.numChoices / 2) {
          this.choiceCounter += (delta > 0) ? -1 : 1;
      } else {
          this.choiceCounter = newIndex;
      }
      
      // Keep within bounds
      this.choiceCounter = (this.choiceCounter + this.numChoices) % this.numChoices;
      this.updateChoiceDisplay();
  }
}

  hideMenu() {
    this.setVisible(false);
    this.overlay.setVisible(false);
    this.titleTextGa.setVisible(false);
    this.titleTextEn.setVisible(false);
    this.wheel.setVisible(false);
    this.buttonBase.setVisible(false);
    this.choiceTextGa.setVisible(false);
    this.choiceTextEn.setVisible(false);
    this.scene.input.setTopOnly(false);
    
    // Clean up physics
  }

  
}

export default ActionMenu;

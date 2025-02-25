import Phaser from "phaser";

class ActionMenu extends Phaser.GameObjects.Container {
  constructor(scene, menuKey, closeActionMenu,goDownStairs) {
    super(scene);
    this.scene = scene;
    this.menuKey = menuKey;
    this.closeActionMenu = closeActionMenu; // Store function reference
    this.goDownStairs = goDownStairs; // Store function reference


    if (!scene.cache.json.exists('menuContent')) {
      console.error('Menu data not loaded!');
      return;
    }

    this.menuData = scene.cache.json.get('menuContent');

  this.overlay = scene.add.rectangle(
  scene.cameras.main.centerX, 
  scene.cameras.main.centerY,
  scene.scale.width,
  scene.scale.height,
  0x000000,
  0.8
)
    // Add menu text
    
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
    this.buttonBase = scene.add.sprite(scene.scale.width / 2, scene.scale.height / 2, 'stairs_down_texture')
    .setDepth(6001)
    .setScrollFactor(0).setScale(8).setAlpha(0.6)
    .setInteractive().on("pointerdown", () => {
      if (this.menuData.choices.action==='goDownStairs') {
          this.goDownStairs();
          this.closeActionMenu();
      }
      if (this.menuData.choices.action==='cancel'){
        this.closeActionMenu();

      }
      ;})
        
    // Load the frame overlay (from preload)
    this.buttonFrame = scene.add.image(scene.scale.width / 2, scene.scale.height / 2, 'ciorcal-light')
    .setDepth(602) // Ensure it's above the base
    .setScrollFactor(0)
    .setScale(1.5);
    this.titleHidden=false;
    this.choicesVisible=false;
    // Make sure both elements are properly grouped
    this.buttonContainer = scene.add.container(0, 0, [this.buttonBase, this.buttonFrame])
    .setDepth(600)
    .setVisible(false)
    .setScrollFactor(0)
    .setInteractive(new Phaser.Geom.Circle(0, 0, 40), Phaser.Geom.Circle.Contains);
       
    this.titleText = scene.add.text(scene.scale.width/2,scene.scale.height/5, "", {
      fontSize: "64px",
      fontFamily:'dum1, sans-serif',
      fill: "LavenderBlush",
      align: "center",
      wordWrap: { width: 600 }
    }).setOrigin(0.5).setDepth(2600).setVisible(false).setScrollFactor(0);

    // Current choice text (displayed when spinning)g
    this.choiceText = scene.add.text(scene.scale.width/2,scene.scale.height/5, "", {
      fontSize: "64px",
      fill: "LavenderBlush",
      fontFamily:'dum1',
      align: "center",
      wordWrap: { width: 600 }
    }).setOrigin(0.5).setDepth(2600).setVisible(false).setScrollFactor(0);
 
  
    
    this.add([this.overlay, this.wheel, this.buttonBase, this.buttonFrame, this.titleText,this.choiceText]);
  
  
  }

  updateChoiceDisplay() {
    // Ensure index stays within bounds
    this.choiceCounter = Phaser.Math.Wrap(this.choiceCounter, 0, this.numChoices);

    // Make sure choices array has elements before trying to access
    if (this.choices && this.choices.length > 0) {
      // Update the choice text to reflect the current choice
      this.choiceText.setText(this.choices[this.choiceCounter].nameGa);
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
    
    if (!this.titleHidden) {
      this.titleText.setVisible(true)
                    .setAlpha(1)
                    .setText(data.subjectGa)
                    .setScrollFactor(0);
  }
  if (!this.choicesVisible) {
    this.choiceText.setVisible(true)
      .setAlpha(0)
      .setScrollFactor(0);
  }
  this.createSpokes(data.choices);
    this.overlay.setVisible(true);
    this.wheel.setVisible(true);
    this.buttonFrame.setVisible(true);
    this.buttonBase.setVisible(true);
    this.setVisible(true);

    // Create spokes for choices (physics setup happens inside)

    // Reset rotation tracking
    this.lastRotation = this.wheel.rotation;
    this.direction = 0;

    this.scene.input.setTopOnly(true);
    this.overlay.setInteractive();
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
    if (!this.titleHidden) {
      this.titleHidden = true;
      this.scene.tweens.add({
          targets: this.titleText,
          alpha: 0,
          duration: 500,
          ease: 'Linear',
          onComplete: () => {
              this.titleText.setVisible(false).setActive(false); // Fully disable
          }
      });
  }
  
  if (!this.choicesVisible) {
      this.choicesVisible = true;
      this.scene.tweens.add({
          targets: this.choiceText,
          alpha: 1,
          duration: 500,
          ease: 'Linear',
          onStart: () => {
              this.choiceText.setAlpha(0).setVisible(true).setActive(true); // Ensure visibility
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
    this.titleText.setVisible(false);
    this.wheel.setVisible(false);
    this.buttonFrame.setVisible(false);
    this.buttonBase.setVisible(false);
    this.choiceText.setVisible(false);
    this.scene.input.setTopOnly(false);
    
    // Clean up physics
  }
}

export default ActionMenu;

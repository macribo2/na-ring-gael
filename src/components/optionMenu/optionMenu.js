import Phaser from "phaser";

class OptionsMenu extends Phaser.GameObjects.Container {
  constructor(scene, closeOptionsMenu) {
    super(scene);
    this.scene = scene;
    this.closeOptionsMenu = closeOptionsMenu; // Store function reference
  this.overlay = scene.add.rectangle(
  scene.cameras.main.centerX, 
  scene.cameras.main.centerY,
  scene.scale.width*2,
  scene.scale.height*2,
  0x004400,
  0.1
)
if (!scene.cache.json.exists('optionContent')) {
  console.error('Menu data not loaded!');
  return;
}

this.menuData = scene.cache.json.get('optionContent');

      // Wheel
        this.wheel = scene.add.sprite(scene.scale.width/2,scene.scale.height/2, 'celt-ring')
          .setVisible(true)
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
    this.numoptions = 0;
    this.options = [];
    
    this.isEnglish = false; // Add state for English toggle

    // Listen for the toggleTranslation event
    this.scene.events.on('toggleTranslation', this.onToggleTranslation, this);

    // Variables for spoke selection
    this.optionIndex = 0;  // Current option index
    this.spokeAngle = 0;   // Angle between spokes
    this.direction = 0;    // Rotation direction: 1 for clockwise, -1 for counter-clockwise
    this.optionCounter = 0; // To keep track of current option
    this.previousAngle = 0; // Track previous wheel angle for determining direction
    this.lastRotation = 0;  // Store last rotation for direction detection
    
    // Event listeners
    this.wheel.on('pointerdown', this.startDrag.bind(this));
    this.scene.input.on('pointermove', this.dragWheel.bind(this));
    this.scene.input.on('pointerup', this.stopDrag.bind(this));

    this.setVisible(false);


    


    this.buttonBase = scene.add.sprite(scene.scale.width / 2, scene.scale.height / 2, 'default_button')
    .setDepth(6001)
    .setScrollFactor(0).setScale(0.75).setAlpha(1)
    .setInteractive().on("pointerdown", () => {
  //     if (this.options[this.optionCounter].action === 'goDownStairs') {
  //       this.scene.goDownStairs()
  //       this.scene.closeActionMenu(); // Closes the menu if they choose not to go down
  //   } else  if (this.options[this.optionCounter].action === 'goUpStairs') {
  //     this.scene.goUpStairs()
  //     this.scene.closeActionMenu(); // Closes the menu if they choose not to go down
  // }    
  //   else if (this.options[this.optionCounter].action === 'cancel') {
  //       this.scene.closeActionMenu(); // Closes the menu if they choose not to go down
  //   }
      ;})
        
      
    
    this.buttonContainer = scene.add.container(0, 0, [this.buttonBase,]) //this.buttonFrame])
    .setDepth(600)
    .setVisible(false)
    .setScrollFactor(0)
    .setInteractive(new Phaser.Geom.Circle(0, 0, 40), Phaser.Geom.Circle.Contains);
       

    this.titleTextEn = scene.add.text(scene.scale.width/2,scene.scale.height-40, "test!!!!!", {
      fontSize: "32px",
      fontFamily:'dum1, sans-serif',
      fill: "gunmetal",
      align: "center",
      wordWrap: { width: 800 }
    }).setOrigin(0.5).setDepth(2600).setVisible(true).setScrollFactor(0);

    this.titleTextGa = scene.add.text(scene.scale.width/2,scene.scale.height/10, "", {
      fontSize: "32px",
      fontFamily:'aonchlo, sans-serif',
      fill: "LavenderBlush",
      align: "center",
      wordWrap: { width: 800 }
    }).setOrigin(0.5).setDepth(2600).setVisible(false).setScrollFactor(0);
this.optionTextEn = scene.add.text(scene.scale.width/2,scene.scale.height/2+30, "Also Test", {
  fontSize: "24px",
  fill: "plum",
  fontFamily:'dum1',
  align: "center",
  wordWrap: { width: 600 }
}).setOrigin(0.5).setDepth(2600).setVisible(false).setScrollFactor(0);




    // Current option text (displayed when spinning)g
    this.optionTextGa = scene.add.text(scene.scale.width/2,scene.scale.height/2, "", {
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
    
    this.add([this.overlay, this.wheel, this.buttonBase, this.titleTextGa,this.optionTextGa,this.titleTextEn, this.optionTextEn]);
    this.scene.add.existing(this);

  }

  onToggleTranslation() {
    this.isEnglish = !this.isEnglish; // Toggle state

    console.log("Toggling translation. isEnglish:", this.isEnglish);

    // Toggle visibility based on the new state
    this.titleTextEn.setVisible(this.isEnglish);
    this.optionTextEn.setVisible(this.isEnglish);
}
  
  updateoptionDisplay() {
    // Ensure index stays within bounds
    this.optionCounter = Phaser.Math.Wrap(this.optionCounter, 0, this.numoptions);

    // Make sure options array has elements before trying to access
    if (this.options && this.options.length > 0) {
      // Update the option text to reflect the current option
      this.optionTextGa.setText(this.options[this.optionCounter].nameGa);
      this.optionTextEn.setText(this.options[this.optionCounter].nameEn);

    }

    
    
  }

  createSpokes(options) {
    this.spokesContainer.removeAll(true);
  
    this.options = options;
    this.numoptions = options.length;
  
    // Calculate angle between spokes
    this.spokeAngle = Phaser.Math.PI2 / this.numoptions;
  
    options.forEach((option, index) => {
      const angle = this.spokeAngle * index;
      
      // Create a spoke line (visual)
      const spoke = this.scene.add.line(0, 0, 0, 0, 0, -180, 0xffffff)
        .setLineWidth(3).setRotation(angle);
      
      this.spokesContainer.add(spoke).setDepth(6000);
      
      // Create an invisible physics body along the spoke line
      const spokeX = Math.cos(angle) * 180; // Was 90
      const spokeY = Math.sin(angle) * 180;
  
      
  

    });
  
    // Update option display
    this.optionCounter = 0;
    this.updateoptionDisplay();
  

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
        this.optionTextGa
    ];

    if (!this.titleHidden) {
        this.titleTextGa.setText(data.subjectGa).setScrollFactor(0);
        this.titleTextEn.setText(data.subjectEn).setScrollFactor(0);
    }

    if (!this.optionsVisible) {
        this.optionTextGa.setScrollFactor(0);
        this.optionTextEn.setScrollFactor(0);
    }

    this.createSpokes(data.options);
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
  
  if (!this.optionsVisible) {
      this.optionsVisible = true;
      this.scene.tweens.add({
          targets: this.optionTextGa,
          alpha: 1,
          duration: 500,
          ease: 'Linear',
          onStart: () => {
              this.optionTextGa.setAlpha(0).setVisible(true).setActive(true); // Ensure visibility
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
    const highlightAngle = this.getCurrentoptionIndex() * this.spokeAngle;
    
}
getCurrentoptionIndex() {
  // Get normalized rotation angle (0-2π)
  const normalizedRotation = Phaser.Math.Angle.Wrap(this.wheel.rotation);
  
  // Calculate index based on rotation
  const rawIndex = Math.floor((normalizedRotation / (Math.PI * 2)) * this.numoptions);
  
  // Ensure positive index within bounds
  return (rawIndex + this.numoptions) % this.numoptions;
}
updateSelection() {
  const newIndex = this.getCurrentoptionIndex();
  
  // Only update if index changed
  if (newIndex !== this.optionCounter) {
      const delta = newIndex - this.optionCounter;
      
      // Handle wrap-around cases
      if (Math.abs(delta) > this.numoptions / 2) {
          this.optionCounter += (delta > 0) ? -1 : 1;
      } else {
          this.optionCounter = newIndex;
      }
      
      // Keep within bounds
      this.optionCounter = (this.optionCounter + this.numoptions) % this.numoptions;
      this.updateoptionDisplay();
  }
}

  hideMenu() {
    this.setVisible(false);
    this.overlay.setVisible(false);
    this.titleTextGa.setVisible(false);
    this.titleTextEn.setVisible(false);
    this.wheel.setVisible(false);
    this.buttonBase.setVisible(false);
    this.optionTextGa.setVisible(false);
    this.optionTextEn.setVisible(false);
    this.scene.input.setTopOnly(false);
    
    // Clean up physics
  }

  
}

export default OptionsMenu;

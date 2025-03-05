import Phaser from "phaser";

class OptionMenu extends Phaser.GameObjects.Container {
  constructor(scene, closeOptionMenu) {
    super(scene);
    this.scene = scene;
    this.closeOptionMenu = closeOptionMenu; // Store function reference
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
    this.numOptions = 0;
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
    }).setOrigin(0.5).setDepth(6600).setVisible(true).setScrollFactor(0);
this.optionTextEn = scene.add.text(scene.scale.width/2,scene.scale.height/2+30, "Also Test", {
  fontSize: "24px",
  fill: "plum",
  fontFamily:'dum1',
  align: "center",
  wordWrap: { width: 600 }
}).setOrigin(0.5).setDepth(6600).setVisible(false).setScrollFactor(0);




    // Current option text (displayed when spinning)g
    this.optionTextGa = scene.add.text(scene.scale.width/2,scene.scale.height/2, "asdfs", {
      fontSize: "32px",
      fill: "gunmetal",
      fontFamily:'dum1',
      align: "center",
      wordWrap: { width: 600 }
    }).setOrigin(0.5).setDepth(2600).setVisible(true).setScrollFactor(0);
 
  
  
    
    
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

  updateOptionDisplay() {
    // Ensure optionCounter is within bounds
    this.optionCounter = Phaser.Math.Wrap(this.optionCounter, 0, this.numOptions);
    if (this.options && this.options.length > 0) {
      const currentOption = this.options[this.optionCounter];
      
      // Update both Ga and En texts
      if (currentOption.optionGa) {
        this.optionTextGa.setText(currentOption.optionGa);
        this.optionTextGa.setVisible(true);
      }
      
      if (currentOption.optionEn) {
        this.optionTextEn.setText(currentOption.optionEn);
        this.optionTextEn.setVisible(this.isEnglish);
      }
    }}
createSpokes(options) {
  // Clear existing spokes

  
  this.options = options;
  this.numOptions = options.length;

  // Calculate angle between spokes
  this.spokeAngle = Phaser.Math.PI2 / this.numOptions;

  options.forEach((option, index) => {
    const angle = this.spokeAngle * index;
    
    // Create a spoke line (visual representation)
    const spoke = this.scene.add.line(0, 0, 0, 0, 0, -180, 0xff0000) // Changed color for visibility
      .setLineWidth(3)
      .setRotation(angle);
    
    this.spokesContainer.add(spoke).setDepth(6000);
  });

  // Reset to first option
  this.optionCounter = 0;
  this.updateOptionDisplay(); // Fixed typo here (capital 'O')
}




onToggleTranslation() {
  this.isEnglish = !this.isEnglish; // Toggle state

  console.log("Toggling translation. isEnglish:", this.isEnglish);

  // Toggle visibility based on the new state
  this.titleTextEn.setVisible(this.isEnglish);
  this.optionTextEn.setVisible(this.isEnglish);
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
    // 1. Check if menuData exists for this key
    if (!this.menuData || !this.menuData[menuKey]) {
      console.error(`Menu data not found for key: ${menuKey}`);
      return;
    }
  
    // 2. Get the menu data
    const menuData = this.menuData[menuKey];
  
    // 3. Check if options array exists
    if (!menuData.options || !Array.isArray(menuData.options)) {
      console.error(`Invalid options array in menu data for key: ${menuKey}`);
      return;
    }
  
    // Create spokes using the validated options array
    this.createSpokes(menuData.options);
        // Explicitly reset visibility
        this.setVisible(true);
        this.overlay.setVisible(true);
        this.titleTextGa.setVisible(true);
        this.titleTextEn.setVisible(this.isEnglish);
        this.wheel.setVisible(true);
        this.buttonBase.setVisible(true);
        this.optionTextGa.setVisible(true);
        this.optionTextEn.setVisible(this.isEnglish);
    this.setVisible(true);
    
    // Set title texts if available
    if (menuData.titleGa) this.titleTextGa.setText(menuData.titleGa);
    if (menuData.titleEn) this.titleTextEn.setText(menuData.titleEn);
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
// alert(this.optionCounter)

    // Correct method call with proper capitalization
    const newIndex = this.getCurrentOptionIndex();
    
    if (newIndex !== this.optionCounter) {
      this.optionCounter = newIndex;
      this.updateOptionDisplay(); // This should update both Ga and En texts
    }
  }
getCurrentOptionIndex() {
  // Ensure the wheel rotation is normalized and wrapped
  const normalizedRotation = Phaser.Math.Angle.Wrap(this.wheel.rotation);
  
  // Calculate index based on wheel rotation and spoke angle
  return Math.floor(normalizedRotation / this.spokeAngle) % this.numOptions;
}
updateSelection() {
  const newIndex = this.getCurrentOptionIndex();
  if (newIndex !== this.optionCounter) {
    this.optionCounter = newIndex;
    this.updateOptionDisplay(); // Update text when index changes
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

export default OptionMenu;

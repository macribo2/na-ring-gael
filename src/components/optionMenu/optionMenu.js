import Phaser from "phaser";
import InventoryMenu from "./inventoryMenu"; // Import the InventoryMenu
import QuestMenu from "./questMenu"; 
import CharacterMenu from "./characterMenu"; 
import ChatMenu from "./chatMenu"; 
import OtherMenu from "./otherMenu";
import SettingsMenu from "./settingsMenu";

class OptionMenu extends Phaser.GameObjects.Container {
  constructor(scene, closeOptionMenu) {
    super(scene);
    this.scene = scene;





    this.characterMenu = new CharacterMenu(scene);
    this.inventoryMenu = new InventoryMenu(scene);

    this.questMenu = new QuestMenu(scene);
    this.chatMenu = new ChatMenu(scene);
    this.settingsMenu = new SettingsMenu(scene);
    this.otherMenu = new OtherMenu(scene);
    this.scene.add.existing(this.inventoryMenu);

    this.scene.add.existing(this.otherMenu);
    this.scene.add.existing(this.chatMenu);
    this.scene.add.existing(this.questMenu);
    this.scene.add.existing(this.characterMenu);








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
        this.wheel = scene.add.sprite(scene.scale.width*0.7,scene.scale.height/4, 'celt-ring')
          .setVisible(true)
          .setDepth(1100)
          .setInteractive({ draggable: true })
          .setScrollFactor(0)
          .setDisplaySize(400, 400);
          this.scene.physics.add.existing(this.wheel);
    // this.wheel.body.setAngularDamping(0.8);
    
        // Spokes container
        this.spokesContainer = scene.add.container(scene.scale.width*0.7,scene.scale.height/4)
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
 
  
  
    
    
 
    
    this.add([this.overlay, this.wheel,  this.optionTextGa, this.optionTextEn]);
    this.scene.add.existing(this);

  }

// Revised crossfade function without using timeline
crossfadeMenus(menuToHide, menuToShow, duration = 300) {
  if (!menuToHide || !menuToShow) return;
  
  // Ensure both menus are visible during the transition
  menuToShow.setVisible(true);
  menuToHide.setVisible(true);
  
  // Start the new menu at alpha 0
  menuToShow.setAlpha(0);
  
  // Fade in the new menu
  this.scene.tweens.add({
    targets: menuToShow,
    alpha: 1,
    duration: duration,
    ease: 'Linear'
  });
  
  // Simultaneously fade out the current menu
  this.scene.tweens.add({
    targets: menuToHide,
    alpha: 0,
    duration: duration,
    ease: 'Linear',
    onComplete: () => {
      menuToHide.setVisible(false);
    }
  });
}

// The updateOptionDisplay function remains the same, except for removing timeline references
updateOptionDisplay() {
  // Ensure optionCounter is within bounds
  this.optionCounter = Phaser.Math.Wrap(this.optionCounter, 0, this.numOptions);
  console.log('YO OPTION COUNTER '+this.optionCounter);
  
  if (this.options && this.options.length > 0) {
    const currentOption = this.options[this.optionCounter];
    
    // Update both Ga and En texts for the options
    if (currentOption.optionGa) {
      this.optionTextGa.setText(currentOption.optionGa);
      this.optionTextGa.setVisible(true);
    }
    
    if (currentOption.optionEn) {
      this.optionTextEn.setText(currentOption.optionEn);
      this.optionTextEn.setVisible(this.isEnglish);
    }
    
    // Determine which menu to show based on optionCounter
    let newMenuToShow = null;
    switch (this.optionCounter) {
      case 0: newMenuToShow = this.inventoryMenu; break;
      case 1: newMenuToShow = this.characterMenu; break;
      case 2: newMenuToShow = this.questMenu; break;
      case 3: newMenuToShow = this.chatMenu; break;
      case 4: newMenuToShow = this.settingsMenu; break;
      case 5: newMenuToShow = this.otherMenu; break;
    }
    
    // Find the currently active menu
    let currentVisibleMenu = null;
    if (this.isInventoryVisible) currentVisibleMenu = this.inventoryMenu;
    else if (this.isCharacterVisible) currentVisibleMenu = this.characterMenu;
    else if (this.isLogVisible) currentVisibleMenu = this.questMenu;
    else if (this.isChatVisible) currentVisibleMenu = this.chatMenu;
    else if (this.isSettingsVisible) currentVisibleMenu = this.settingsMenu;
    else if (this.isOtherVisible) currentVisibleMenu = this.otherMenu;
    
    // Update visibility flags based on the option counter
    this.isInventoryVisible = (this.optionCounter === 0);
    this.isCharacterVisible = (this.optionCounter === 1);
    this.isLogVisible = (this.optionCounter === 2);
    this.isChatVisible = (this.optionCounter === 3);
    this.isSettingsVisible = (this.optionCounter === 4);
    this.isOtherVisible = (this.optionCounter === 5);
    
    // First time showing a menu
    if (!currentVisibleMenu && newMenuToShow) {
      newMenuToShow.setAlpha(1);
      newMenuToShow.setVisible(true);
    } 
    // Crossfade between menus (only if they're different)
    else if (currentVisibleMenu && newMenuToShow && currentVisibleMenu !== newMenuToShow) {
      // Cancel any existing tweens on both menus to prevent conflicts
      this.scene.tweens.killTweensOf(currentVisibleMenu);
      this.scene.tweens.killTweensOf(newMenuToShow);
      
      this.crossfadeMenus(currentVisibleMenu, newMenuToShow);
    }
  }
}

  
  // Function to show the inventory menu (you can update this based on your implementation)
  showInventoryMenu() {
    // You can create or activate your InventoryMenu here
    if (!this.inventoryMenu) {
      // Create InventoryMenu if not already created
      this.inventoryMenu = new InventoryMenu(this.scene);
    }
  
    // Display the InventoryMenu
    this.inventoryMenu.setVisible(true);
    this.inventoryMenu.bringToTop(); // Ensure it's in front if there are other UI elements
  }
  /* this is "hide" in terms of spinning the optionmenu wheel: use 
  this.inventorymenu.hideinventory() to actually hide the menu completely.*/
  hideInventoryMenu() {
    if (this.inventoryMenu) {
      this.inventoryMenu.setVisible(false); // Hide the inventory menu when it's not needed
    }
  }



  showQuestMenu() {
    if (!this.questMenu) {
      this.questMenu = new QuestMenu(this.scene);
    }
  
    this.questMenu.setVisible(true);
    this.questMenu.bringToTop(); 
  }
  hideQuestMenu() {
    if (this.questMenu) {
      this.questMenu.setVisible(false); 
    }
  }
  showCharacterMenu() {
    if (!this.characterMenu) {
      this.characterMenu = new CharacterMenu(this.scene);
    }
  
    this.characterMenu.setVisible(true);
    this.characterMenu.bringToTop(); 
  }
  hideCharacterMenu() {
    if (this.characterMenu) {
      this.characterMenu.setVisible(false); 
    }
  }
  showChatMenu() {
    if (!this.chatMenu) {
      this.chatMenu = new ChatMenu(this.scene);
    }
  
    this.chatMenu.setVisible(true);
    this.chatMenu.bringToTop(); 
  }
  hideChatMenu() {
    if (this.chatMenu) {
      this.chatMenu.setVisible(false); 
    }
  }
  showSettingsMenu() {
    if (!this.settingsMenu) {
      this.settingsMenu = new SettingsMenu(this.scene);
    }
  
    this.settingsMenu.setVisible(true);
    this.settingsMenu.bringToTop();
  }
  hideSettingsMenu() {
    if (this.settingsMenu) {
      this.settingsMenu.setVisible(false);
    }
  }
  showOtherMenu() {
    if (!this.otherMenu) {
      this.otherMenu = new OtherMenu(this.scene);
    }
  
    this.otherMenu.setVisible(true);
    this.otherMenu.bringToTop(); 
  }
  hideOtherMenu() {
    if (this.otherMenu) {
      this.otherMenu.setVisible(false);
    }
  }





createSpokes(options) {
  // Clear existing spokes

  
  this.options = options;
  this.numOptions = options.length;

  // Calculate angle between spokes
  this.spokeAngle = Phaser.Math.PI2 / this.numOptions;

  options.forEach((option, index) => {
    const angle = this.spokeAngle * index;
    
    // Create a spoke line (visual representation)
    const spoke = this.scene.add.line(0, 0, 0, 0, 0, -180, 0xff0000).setAlpha(0.2) // Changed color for visibility
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
      
        this.wheel.setVisible(true);
      
        this.optionTextGa.setVisible(true);
        this.optionTextEn.setVisible(this.isEnglish);
    this.setVisible(true);
    
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
  
    // Get angle from pointer position (center of the wheel is 400, 300)
    const currentAngle = Phaser.Math.Angle.Between(
      400, 300, // Wheel center
      pointer.x, pointer.y
    );
  
    // Calculate actual rotation delta and invert it
    const delta = this.startAngle - currentAngle; // Invert the direction by switching startAngle and currentAngle
    
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
    this.wheel.setVisible(false);
    this.optionTextGa.setVisible(false);
    this.optionTextEn.setVisible(false);
    this.scene.input.setTopOnly(false);
    this.inventoryMenu.hideInventory();
    this.characterMenu.hideCharacter()
    this.chatMenu.hideChat()
    this.questMenu.hideQuest()
    this.otherMenu.hideOther()

    // Clean up physics
  }

  
}

export default OptionMenu;

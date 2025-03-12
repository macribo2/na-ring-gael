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
    // this.otherMenu = new OtherMenu(scene);
    this.scene.add.existing(this.inventoryMenu);

    // this.scene.add.existing(this.otherMenu);
    this.scene.add.existing(this.chatMenu);
    this.scene.add.existing(this.questMenu);
    this.scene.add.existing(this.characterMenu);








    this.closeOptionMenu = closeOptionMenu; // Store function reference

if (!scene.cache.json.exists('optionContent')) {
  console.error('Menu data not loaded!');
  return;
}

this.menuData = scene.cache.json.get('optionContent');

      // Wheel
        this.wheel = scene.add.sprite(scene.scale.width*0.75,scene.scale.height*0.64, 'celt-ring')
          .setVisible(true)
          .setDepth(6110)
          .setInteractive({ draggable: true })
          .setScrollFactor(0)
          .setDisplaySize(300, 300);
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


    


      
   
this.optionTextEn = scene.add.text(scene.scale.width/2,scene.scale.height*0.3+20, "", {
  fontSize: "24px",
  fill: "plum",
  fontFamily:'dum1',
  align: "center",
  wordWrap: { width: 600 }
}).setOrigin(0.5).setDepth(6600).setVisible(false).setScrollFactor(0).setAlpha(0.6);




    // Current option text (displayed when spinning)g
    this.optionTextGa = scene.add.text(scene.scale.width*0.7,scene.scale.height*0.25, "", {
      fontSize: "32px",
      fill: "gunmetal",
      fontFamily:'IrishPenny',
      align: "center",
      wordWrap: { width: 600 }
    }).setOrigin(0.5).setDepth(6620).setVisible(true).setScrollFactor(0).setAlpha(0.7);
 
  
    this.background = scene.add.image(
      scene.cameras.main.centerX, 
      scene.cameras.main.centerY, 
      'other'
    ).setDepth(900).setScrollFactor(0).setAlpha(0);
 
    
    this.add([ this.wheel,  this.optionTextGa, this.optionTextEn]);
    this.scene.add.existing(this);

  }


crossfadeMenus(menuToHide, menuToShow, duration = 300) {
  if (!menuToHide || !menuToShow) return;
  
  // Ensure both menus are visible during the transition
  menuToShow.setVisible(true);
  menuToHide.setVisible(true);
  
  // Start the new menu at alpha 0
  menuToShow.setAlpha(0).setDepth(6000);
  
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

  if (this.options && this.options.length > 0) {
    const currentOption = this.options[this.optionCounter];

    if (currentOption.optionGa) {
      // Update text and ensure visibility
      this.optionTextGa.setText(currentOption.optionGa);
      this.optionTextGa.setAlpha(1);
      this.optionTextGa.setVisible(true);

      // Cancel any existing tween before starting a new one
      this.scene.tweens.killTweensOf(this.optionTextGa);

      // Fade out after 2 seconds
      this.scene.time.delayedCall(2000, () => {
        this.scene.tweens.add({
          targets: this.optionTextGa,
          alpha: 0, // Fade out
          duration: 1000, // 1 second fade-out
          ease: 'Linear'
        });
      });
    }

    if (currentOption.optionEn) {
      this.optionTextEn.setText(currentOption.optionEn);
      this.optionTextEn.setVisible(this.isEnglish);
    }

    // Store previous chat visibility state
    const wasChatVisible = this.isChatVisible;

    // Update visibility flags based on the option counter
    this.isInventoryVisible = (this.optionCounter === 0);
    this.isCharacterVisible = (this.optionCounter === 1);
    this.isLogVisible = (this.optionCounter === 2);
    this.isChatVisible = (this.optionCounter === 3);
    this.isSettingsVisible = (this.optionCounter === 4);
    this.isOtherVisible = (this.optionCounter === 5);

    // Determine which menu to show based on optionCounter
    let newMenuToShow = null;
    switch (this.optionCounter) {
      case 0: newMenuToShow = this.inventoryMenu; break;
      case 1: newMenuToShow = this.characterMenu; break;
      case 2: newMenuToShow = this.questMenu; break;
      case 3: newMenuToShow = this.chatMenu; break;
      case 4: newMenuToShow = this.settingsMenu; break;
    }

    // Find the currently active menu
    let currentVisibleMenu = null;
    if (this.isInventoryVisible && this.optionCounter !== 0) currentVisibleMenu = this.inventoryMenu;
    else if (this.isCharacterVisible && this.optionCounter !== 1) currentVisibleMenu = this.characterMenu;
    else if (this.isLogVisible && this.optionCounter !== 2) currentVisibleMenu = this.questMenu;
    else if (this.isChatVisible && this.optionCounter !== 3) currentVisibleMenu = this.chatMenu;
    else if (this.isSettingsVisible && this.optionCounter !== 4) currentVisibleMenu = this.settingsMenu;

    // Handle chat activation/deactivation specially
    if (!wasChatVisible && this.isChatVisible) {
      // Chat wasn't visible but should be now - call showChat
      this.chatMenu.showChat();
    } else if (wasChatVisible && !this.isChatVisible) {
      // Chat was visible but should be hidden now
      this.chatMenu.hideChat();
    }

    // First time showing a menu
    if (!currentVisibleMenu && newMenuToShow) {
      newMenuToShow.setAlpha(1);
      newMenuToShow.setVisible(true);
    } 
    // Crossfade between menus (only if they're different)
    else if (currentVisibleMenu && newMenuToShow && currentVisibleMenu !== newMenuToShow) {
      this.scene.tweens.killTweensOf(currentVisibleMenu);
      this.scene.tweens.killTweensOf(newMenuToShow);
      this.crossfadeMenus(currentVisibleMenu, newMenuToShow);
      
      // If we're transitioning to the chat menu, also call showChat
      if (newMenuToShow === this.chatMenu && !wasChatVisible) {
        this.chatMenu.showChat();
      }
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
    this.inventoryMenu.setVisible(true).setDepth(6500);
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
  
    this.questMenu.setVisible(true).setDepth(6500);
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
  
    this.characterMenu.setVisible(true).setDepth(6500);
    this.characterMenu.bringToTop(); 
  }
  hideCharacterMenu() {
    if (this.characterMenu) {
      this.characterMenu.setVisible(false).setDepth(6500); 
    }
  }
  showChatMenu() {
    if (!this.chatMenu) {
      this.chatMenu = new ChatMenu(this.scene);
    }
  
    this.chatMenu.setVisible(true).setDepth(6500);
    this.chatMenu.bringToTop(); 
  }
  hideChatMenu() {
    if (this.chatMenu) {
      this.chatMenu.setVisible(false).setDepth(6500); 
    }
  }
  showSettingsMenu() {
    if (!this.settingsMenu) {
      this.settingsMenu = new SettingsMenu(this.scene);
    }
  
    this.settingsMenu.setVisible(true).setDepth(6500);
    this.settingsMenu.bringToTop();
  }
  hideSettingsMenu() {
    if (this.settingsMenu) {
      this.settingsMenu.setVisible(false);
    }
  }



 
  createSpokes(options) {
    this.options = options;
    this.numOptions = options.length;

    // Set the angle per option to 35 degrees (converted to radians)
    this.spokeAngle = Phaser.Math.DegToRad(35);

    options.forEach((option, index) => {
      const angle = this.spokeAngle * index;
      
      // Create a spoke line (visual representation)
      const spoke = this.scene.add.line(0, 0, 0, 0, 0, -180, 0xff0000).setAlpha(0) // Changed color for visibility
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


  // Toggle visibility based on the new state
  this.optionTextEn.setVisible(this.isEnglish);
}



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
updateControlSquareScale() {
  const zoomLevel = this.scene.cameras.main.zoom;
  this.scene.controlSquare.setScale(1 / zoomLevel); 
}
showMenu(menuKey) {
  if (this.background) {
    this.background.setAlpha(0).setVisible(true);
  }
  this.previousZoom = this.scene.cameras.main.zoom;
  this.scene.cameras.main.setZoom(1.5);
  this.updateControlSquareScale();

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

  // Set high depth values for all menu components
  const baseDepth = 10000; 
  this.setDepth(baseDepth);
  this.wheel.setDepth(baseDepth + 1);
  this.optionTextGa.setDepth(baseDepth + 2);
  this.optionTextEn.setDepth(baseDepth + 2);

  // Make components visible
  this.setVisible(true);

  // Initial wheel setup for animation
  this.wheel.setVisible(true);
  this.wheel.setScale(0.1); // Start small
  this.wheel.setAlpha(0.5); // Start semi-transparent

  // Kill any existing wheel tweens to prevent conflicts
  this.scene.tweens.killTweensOf(this.wheel);

  // Add the entrance animation for the wheel
  this.scene.tweens.add({
    targets: this.wheel,
    scale: 0.5,      // Grow to full size
    alpha: 0.5,      // Fade to full opacity
    rotation: '+=0.2', // Small rotation effect
    duration: 2000, // Animation duration in ms
    ease:'Circ.easeOut', // Elastic-like effect
    onComplete: () => {
      // Ensure full visibility after animation
      this.wheel.setScale(0.5).setAlpha(0.5);
    }
  });

  // Option text visibility
  this.optionTextGa.setVisible(true);
  this.optionTextEn.setVisible(this.isEnglish);

  if (this.background) {
    this.background.setAlpha(1);
  }

  // Optional: ensure menu input has priority
  this.scene.input.setTopOnly(true);
  this.showInventoryMenu()
}

hideMenu() {
  // Ensure that the ControlSquare is reset first before anything else
  this.updateControlSquareScale(); // Make sure the ControlSquare returns to its proper size

  // Add the closing animation for the wheel (reverse of the opening animation)
  this.scene.tweens.add({
    targets: this.wheel,
    scale: 0.1, // Shrink to initial size
    alpha: 0,   // Fade out
    rotation: '-=0.2', // Reverse the rotation effect
    duration: 500,  // Animation duration (quicker)
    ease: 'Circ.easeIn', // Smooth reverse effect
    onComplete: () => {
      // Ensure visibility is fully hidden after animation
      this.wheel.setScale(0.1).setAlpha(0);

      // Now hide the other components after the wheel animation completes
      this.setVisible(false); // Hide all components
      this.optionTextGa.setVisible(false);
      this.optionTextEn.setVisible(false);
      this.background.setAlpha(0); 

      // Optional: ensure menu input no longer has priority
      this.scene.input.setTopOnly(false);

      // Hide any additional menus or components
      this.inventoryMenu.hideInventory();
      this.characterMenu.hideCharacter();
      this.chatMenu.hideChat();
      this.questMenu.hideQuest();
      this.settingsMenu.hideSettings();

      if (this.previousZoom) {
        this.scene.cameras.main.setZoom(this.previousZoom); // Restore zoom
      }

      this.updateControlSquareScale();
    }
  });
}

getRotationDirection() {
  const currentAngle = this.wheel.rotation; // Use rotation in radians
  const previousAngle = this.previousAngle || currentAngle;
  let delta = currentAngle - previousAngle;
  
  this.previousAngle = currentAngle;
  const angularVelocity = (this.wheel.body && this.wheel.body.angularVelocity) !== undefined ? this.wheel.body.angularVelocity : 0;

  return angularVelocity > 0 ? 1 : -1;
}

updateSpokePositions() {
  // Get current wheel rotation
  const rotation = this.wheel.rotation;
  // Track rotation direction
  this.getRotationDirection();
}

nextSubmenu() {
  // Rotate the wheel clockwise to show next menu
  const newRotation = this.wheel.rotation - this.spokeAngle; // Negative for clockwise
  
  // Create a smooth animation for the rotation
  this.scene.tweens.add({
    targets: this.wheel,
    rotation: newRotation,
    duration: 300,
    ease: 'Cubic.easeOut',
    onComplete: () => {
      // Ensure the rotation is properly wrapped and update the display
      this.wheel.rotation = Phaser.Math.Angle.Wrap(newRotation);
      this.optionCounter = this.getCurrentOptionIndex();
      this.updateOptionDisplay();
    }
  });
}

previousSubmenu() {
  // Rotate the wheel counter-clockwise to show previous menu
  const newRotation = this.wheel.rotation + this.spokeAngle; // Positive for counter-clockwise
  
  // Create a smooth animation for the rotation
  this.scene.tweens.add({
    targets: this.wheel,
    rotation: newRotation,
    duration: 300,
    ease: 'Cubic.easeOut',
    onComplete: () => {
      // Ensure the rotation is properly wrapped and update the display
      this.wheel.rotation = Phaser.Math.Angle.Wrap(newRotation);
      this.optionCounter = this.getCurrentOptionIndex();
      this.updateOptionDisplay();
    }
  });
}
}

export default OptionMenu;

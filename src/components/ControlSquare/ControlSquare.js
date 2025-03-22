import Phaser from 'phaser';
import TranslationManager from '../translationManager/translationManager'
class ControlSquare extends Phaser.GameObjects.Container {
 
  // Getter method to check actionMenuActive
  getActionMenuActive() {
    return this._actionMenuActive;
  }
  
  // Setter method to update actionMenuActive
  setActionMenuActive(actionMenuActive) {
    this._actionMenuActive = actionMenuActive;
  }
  
  constructor(scene, x, y,clearPathCallback,openOptionMenu,closeOptionMenu,actionMenuActive, nextMenuFunc, prevMenuFunc) {
    super(scene, x, y);
    scene.add.existing(this);
    let isMiddleButtonPressed = false;
    this.openOptionMenu = openOptionMenu;
    this.closeOptionMenu = closeOptionMenu;
    this.clearPathCallback = clearPathCallback; 
    this._actionMenuActive = false; 
    this.isOptionMenuOpen = false;
    this.nextMenuFunc = nextMenuFunc;
    this.prevMenuFunc = prevMenuFunc;

   
    const middleButton = scene.add.sprite(x, y, 'middleButtonDark')
      .setOrigin(0.5, 0.5).setDepth(9999);
      this.scene.events.on('resetMiddleButton', () => {
        console.log("Force resetting middle button state");
        setButtonLit(middleButton, 'middleButton'); // Reset texture
        middleButton.setAlpha(1); // Ensure proper visibility
        middleButton.setFrame(0); // Ensure it resets if using a sprite atlas
      });
    const buttonSize = 40; // Size of each button
 
    const upButton = scene.add.sprite(x, y - 60, 'upButtonDark').setInteractive(); // Up button above the middle
    const downButton = scene.add.sprite(x, y + 60, 'downButtonDark').setInteractive(); // Down button below the middle
    const leftButton = scene.add.sprite(x - 60, y, 'leftButtonDark').setInteractive(); // Left button to the left of the middle
    const rightButton = scene.add.sprite(x + 60, y, 'rightButtonDark').setInteractive(); // Right button to the right of the middle

    // Add the buttons to the container first (they'll be rendered above the square)
    this.add(middleButton);
    this.add(upButton);
    this.add(downButton);
    this.add(leftButton);
    this.add(rightButton);
    this.middleButton = middleButton;
    this.upButton = upButton;
    this.downButton = downButton;
    this.leftButton = leftButton;
    this.rightButton = rightButton;

    // Function to switch to the lit (pressed) version of the button
    const setButtonLit = (button, buttonName) => {
      button.setTexture(buttonName); // Switch to the "lit" texture (e.g., upButtonLit)
    };
 
    // Function to reset to the normal button state
    const resetButton = (button, buttonName) => {
      button.setTexture(buttonName); // Switch back to the normal texture (e.g., buttonUp)
    };

    // Handle pointer events for each button

    upButton.on('pointerdown', () => {
      if (this.isOptionMenuOpen) {
        this.highlightPreviousItem(); // Navigate up in the menu
      } else {
        this.emit('control-action', 'up-down'); // Move player up
        if (this.clearPathCallback) {
          this.clearPathCallback(); // Clear the path if needed
        }
      }
      setButtonLit(upButton, 'upButtonLit');
    });
    downButton.on('pointerdown', () => {
      if (this.getActionMenuActive()) {
        // Simply emit the confirm event without trying to access data you don't have
        this.scene.events.emit('confirmAction');
        console.log('Action confirmed');
      } else {
        // Handle regular player movement if ActionMenu is not open
        this.emit('control-action', 'down-down'); 
        if (this.clearPathCallback) {
          this.clearPathCallback();
        }
      }
      setButtonLit(downButton, 'downButtonLit');
    });

    
    leftButton.on('pointerdown', () => {
      if (this.getActionMenuActive()) {
        // Emit cycle action for decrementing choice and log the action
        this.scene.events.emit('cycleAction', -1); // Move left (previous choice)
        console.log('Cycle action: Previous choice');
      } else {
        // Move player left when actionMenu is not open
        this.emit('control-action', 'left-down');
        if (this.clearPathCallback) {
          this.clearPathCallback(); // Clear the path if needed
        }
      }
    
      setButtonLit(leftButton, 'leftButtonLit');
    });
    
    rightButton.on('pointerdown', () => {
      if (this.getActionMenuActive()) {
        // Emit cycle action for incrementing choice and log the action
        this.scene.events.emit('cycleAction', 1); // Move right (next choice)
        console.log('Cycle action: Next choice');
      } else {
        // Move player right when actionMenu is not open
        this.emit('control-action', 'right-down');
        if (this.clearPathCallback) {
          this.clearPathCallback(); // Clear the path if needed
        }
      }
    
      setButtonLit(rightButton, 'rightButtonLit');
    });
    

    // When button is released (pointer up)
    middleButton.on('pointerup', () => {
      resetButton(middleButton, 'middleButtonLit');
    });
    upButton.on('pointerup', () => {
      resetButton(upButton, 'upButtonLit');
    });
    downButton.on('pointerup', () => {
      resetButton(downButton, 'downButtonLit');
    });
    leftButton.on('pointerup', () => {
      resetButton(leftButton, 'leftButtonLit');
    });
    rightButton.on('pointerup', () => {
      resetButton(rightButton, 'rightButtonLit');
    });

    // Handle pointer out (when the pointer is moved away from the button)
    middleButton.on('pointerout', () => {
      resetButton(middleButton, 'middleButtonDark');
    });
    upButton.on('pointerout', () => {
      resetButton(upButton, 'upButtonDark');
    });
    downButton.on('pointerout', () => {
      resetButton(downButton, 'downButtonDark');
    });
    leftButton.on('pointerout', () => {
      resetButton(leftButton, 'leftButtonDark');
    });
    rightButton.on('pointerout', () => {
      resetButton(rightButton, 'rightButtonDark');
    });
    
    // Control square functionality...

    // Initialize state for button press tracking
    let pressStartTime = 0;
    let initialPointerX = x;
    let initialPointerY = y;
    let draggingControlSquare = false;
    let pressInterval = null;
    let dragTimeout = null; // Timeout to automatically stop dragging after 500ms of inactivity
    let isPressLongEnough = false; // Track if the press duration is long enough for dragging
    let dragDistanceThreshold = 50; // Threshold to start dragging (in pixels)
    let pressDurationThreshold = .75; // 2 seconds for press to be considered long enough to start drag
    let maxPressDuration = 3; // Max press duration before stopping (3 seconds)

    // Variables for inertia
    let velocityX = 0;
    let velocityY = 0;
    let lastPointerX = x;
    let lastPointerY = y;
    let dragStartTime = 0;

    // Handle pointerup (both for buttons and control square dragging)
    const handlePointerUp = () => {
      // stopPress(); // Stop the continuous logging
      console.log('Pointer Up! Final position of ControlSquare: ', this.x, this.y);  // Show alert on pointer release
    };

    // Listen for pointerup event on the whole container (or buttons themselves)
    middleButton.on('pointerup', handlePointerUp);
    upButton.on('pointerup', handlePointerUp);
    downButton.on('pointerup', handlePointerUp);
    leftButton.on('pointerup', handlePointerUp);
    rightButton.on('pointerup', handlePointerUp);

    // Listen for pointerupoutside event (if pointer is released outside the container)
    this.on('pointerupoutside', handlePointerUp);

    // Set up additional listener to drop the controller if tapped during drag
    this.on('pointerdown', (pointer) => {
      if (draggingControlSquare) {
        console.log("Tapped during drag, dropping control square...");
        // stopPress();  // Drop the control square if tapped
      }
    });

    scene.add.existing(this);
    middleButton.setScrollFactor(0);
upButton.setScrollFactor(0);
downButton.setScrollFactor(0);
leftButton.setScrollFactor(0);
rightButton.setScrollFactor(0);
middleButton.setInteractive();

this.overlay = scene.add.rectangle(0, 0, scene.cameras.main.width, scene.cameras.main.height, 0x000000, 0.2)
  .setOrigin(0)
  .setScrollFactor(0)
  .setDepth(100) // Make sure it's above other UI elements
  .setVisible(false); // Start hidden

 // Function to toggle the overlay
 const toggleOverlay = () => {
  // if (!this.overlay) {
  //   this.overlay = scene.add.graphics();
  //   this.overlay.fillStyle(0x000000, 0.2); // Black color with 20% alpha
  //   this.overlay.fillRect(0, 0, scene.cameras.main.width*2, scene.cameras.main.height*2);
  //   this.overlay.setDepth(100).setScrollFactor(0); // Ensure it's on top of other elements
  // } else {
  //   this.overlay.destroy();
  //   this.overlay = null;
  // }


};



 
// Add to the scene and set scroll factors
scene.add.existing(this);
middleButton.setScrollFactor(0);

middleButton.removeAllListeners('pointerdown'); // Prevent duplicates
// Notify PlayerEntity when the OptionMenu is opened or closed
middleButton.on('pointerdown', (pointer) => {
  // Set the flag to indicate middle button is pressed
  isMiddleButtonPressed = true;
  
  console.log("actionMenuActive:", this.getActionMenuActive());

  if (this.isOptionMenuOpen) {
    this.closeOptionMenu();
    this.isOptionMenuOpen = false;
    // Notify PlayerEntity that the menu is closed
    this.scene.events.emit('optionMenuState', false); // false means menu is closed
  } else if (!this.getActionMenuActive()) {
    if (this.openOptionMenu) {
      console.log("Opening Option Menu...");
      console.log("openOptionMenu exists?", this.openOptionMenu);

      this.openOptionMenu();
      this.isOptionMenuOpen = true;
      // Notify PlayerEntity that the menu is open
      this.scene.events.emit('optionMenuState', true); // true means menu is open
    } else {
      console.log("openOptionMenu is undefined");
      TranslationManager.toggleTranslation();
      this.scene.events.emit('toggleTranslation');
    }
  }

  // Block easca2 interactions
  if (isMiddleButtonPressed) {
    console.log('Middle button pressed, blocking easca2 interaction.');
    // Optionally, add logic here to block or stop easca2 if needed.
  }

  // Your middle button handling logic continues
  setButtonLit(middleButton, 'middleButtonLit');
  toggleOverlay();

  if (this.clearPathCallback) {
    this.clearPathCallback();
  }
});

// Reset the flag when the pointer is released or when the action is completed
middleButton.on('pointerup', () => {
  isMiddleButtonPressed = false;
});


}




// Then in your button handling methods
switchToNextMenu() {
  if (this.nextMenuFunc) {
    this.nextMenuFunc();
  } else {
    console.log("Switching to next menu...");
  }
}

switchToPreviousMenu() {
  if (this.prevMenuFunc) {
    this.prevMenuFunc();
  } else {
    console.log("Switching to previous menu...");
  }
}
// Highlight previous or next item in the current menu
highlightPreviousItem() {
console.log("Highlighting previous item...");
// Add your logic for highlighting previous item here
}

highlightNextItem() {
console.log("Highlighting next item...");
// Add your logic for highlighting next item here
}

}

export default ControlSquare;
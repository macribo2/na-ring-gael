import Phaser from 'phaser';
import TranslationManager from '../translationManager/translationManager'
 class ControlSquare extends Phaser.GameObjects.Container {
  constructor(scene, x, y,clearPathCallback) {
    super(scene, x, y);
    scene.add.existing(this);
    this.clearPathCallback = clearPathCallback; // Store the clearPath callback

    // Center buttons within container
    const middleButton = scene.add.sprite(x, y, 'middleButtonDark')
      .setOrigin(0.5, 0.5).setDepth(9999);
    // Create the directional buttons (left, right, up, down) and the middle button
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

    // When button is pressed (pointer down)
    middleButton.on('pointerdown', () => {
      setButtonLit(middleButton, 'middleButtonLit');
      if (this.clearPathCallback) {
        this.clearPathCallback(); // Calls DungeonScene's clearPath method
    }
    });
    upButton.on('pointerdown', () => {
      this.emit('control-action', 'up-down'); // Emit event
      if (this.clearPathCallback) {
        this.clearPathCallback(); // Calls DungeonScene's clearPath method
    }
      setButtonLit(upButton, 'upButtonLit');
    });
    downButton.on('pointerdown', () => {
      this.emit('control-action', 'down-down'); // Emit event
      if (this.clearPathCallback) {
        this.clearPathCallback(); // Calls DungeonScene's clearPath method
    }
      setButtonLit(downButton, 'downButtonLit');
    });
    leftButton.on('pointerdown', () => {
      this.emit('control-action', 'left-down'); // Emit event
      if (this.clearPathCallback) {
        this.clearPathCallback(); // Calls DungeonScene's clearPath method
    }
      setButtonLit(leftButton, 'leftButtonLit');
    });
    rightButton.on('pointerdown', () => {
      this.emit('control-action', 'right-down'); // Emit event
      if (this.clearPathCallback) {
        this.clearPathCallback(); // Calls DungeonScene's clearPath method
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

    // Function to handle continuous press logging and drag action
    const logPressDuration = (pointer) => {
      const pressDuration = (scene.time.now - pressStartTime) / 1000; // Duration in seconds
      const deltaX = pointer.x - initialPointerX;
      const deltaY = pointer.y - initialPointerY;

      // Stop dragging if press duration exceeds max press duration (3 seconds)
      if (pressDuration > maxPressDuration) {
        console.log("Press duration exceeded max time. Stopping...");
        stopPress(); // Stop if pressed too long
      }

      // Only start dragging after the press is long enough AND movement exceeds 50px
      if (pressDuration >= pressDurationThreshold && (Math.abs(deltaX) > dragDistanceThreshold || Math.abs(deltaY) > dragDistanceThreshold)) {
        if (!draggingControlSquare) {
          draggingControlSquare = true;
          console.log('Dragging control square...');
          setTimeout(()=>{stopPress()
            draggingControlSquare = false;
          },1500)
        }

        // Calculate new position for the control square
        let newX = pointer.x - initialPointerX;
        let newY = pointer.y - initialPointerY;

        // Keep the control square within screen bounds (limit movement)
        const sceneWidth = scene.cameras.main.width;
        const sceneHeight = scene.cameras.main.height;
        const controlSquareWidth = this.width;
        const controlSquareHeight = this.height;

        // Constrain the x and y positions to be within the screen bounds
        newX = Phaser.Math.Clamp(newX, 0, sceneWidth - controlSquareWidth);
        newY = Phaser.Math.Clamp(newY, 0, sceneHeight - controlSquareHeight);

        // Move the whole control square (all elements in the container)
        this.setPosition(newX, newY);

        // Calculate velocity (speed) of the drag for inertia effect
        const deltaTime = scene.time.now - dragStartTime; // Time since the last update
        const deltaVX = pointer.x - lastPointerX;
        const deltaVY = pointer.y - lastPointerY;

        velocityX = deltaVX / deltaTime; // X velocity
        velocityY = deltaVY / deltaTime; // Y velocity

        // Update last position and time for the next calculation
        lastPointerX = pointer.x;
        lastPointerY = pointer.y;
        dragStartTime = scene.time.now;

        // Reset the drag timeout to restart the 500ms countdown whenever the drag is happening
        clearTimeout(dragTimeout);
        dragTimeout = setTimeout(() => {
          stopPress(); // Stop the continuous logging after 500ms of inactivity
        }, 500);
      }
    };

    // Function to start tracking the press
    const startPress = (pointer) => {
      pressStartTime = scene.time.now; // Use Phaser's time system for better accuracy
      initialPointerX = x;
      initialPointerY = y;
      lastPointerX = pointer.x;
      lastPointerY = pointer.y;
      dragStartTime = scene.time.now;
      isPressLongEnough = false; // Reset the flag for press duration
    
      // Start an interval to log press duration and movement
      pressInterval = scene.time.addEvent({
        delay: 100, // Log every 100ms while pressed
        callback: () => {
          const pressDuration = (scene.time.now - pressStartTime) / 1000; 
          console.log(`Press Duration: ${pressDuration}s`); // Log the press duration
          if (pressDuration >= pressDurationThreshold) {  // 2-second hold required before enabling dragging
            isPressLongEnough = true; // Enable drag after 2 seconds
          }
          logPressDuration(pointer); // Log press duration
        },
        loop: true
      });
    };

    // Function to stop tracking the press and dragging
    const stopPress = () => {
      if (pressInterval) {
        pressInterval.remove(); // Stop the continuous logging when the press ends
        pressInterval = null;
      }
      draggingControlSquare = false; // Stop dragging the control square
      console.log(`Button released. Final position of ControlSquare: ${this.x}, ${this.y}`);
      clearTimeout(dragTimeout); // Clear the drag timeout when the pointer is released

      // Apply momentum/ inertia (simulate "fling") after release
      if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
        // Fling with velocity and ease out
   // Fling with velocity and ease out
   scene.tweens.add({
    targets: this,
    x: Phaser.Math.Clamp(this.x + velocityX * 200, 0, scene.cameras.main.width - this.width), // Clamp the fling X within bounds
    y: Phaser.Math.Clamp(this.y + velocityY * 200, 0, scene.cameras.main.height - this.height), // Clamp the fling Y within bounds
    duration:500, // Duration for the "fling" effect
    ease: 'Cubic.Out', // Ease out to slow down
    onComplete: () => {
      velocityX = 0; // Stop velocity after fling completes
      velocityY = 0;
    }
  });
      }
    };

    // Set up pointer events for each button
    middleButton.on('pointerdown', (pointer) => startPress(pointer));
    upButton.on('pointerdown', (pointer) => startPress(pointer));
    downButton.on('pointerdown', (pointer) => startPress(pointer));
    leftButton.on('pointerdown', (pointer) => startPress(pointer));
    rightButton.on('pointerdown', (pointer) => startPress(pointer));

    // Handle pointerup (both for buttons and control square dragging)
    const handlePointerUp = () => {
      stopPress(); // Stop the continuous logging
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
        stopPress();  // Drop the control square if tapped
      }
    });
    
// // Add this after creating your buttons to see the hit areas
// scene.input.enableDebug(middleButton, 0x00ff00);
// scene.input.enableDebug(upButton, 0x00ff00);
// scene.input.enableDebug(downButton, 0x00ff00);
// scene.input.enableDebug(leftButton, 0x00ff00);
// scene.input.enableDebug(rightButton, 0x00ff00);
    // Add this container to the scene
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
  if (!this.overlay) {
    this.overlay = scene.add.graphics();
    this.overlay.fillStyle(0x000000, 0.2); // Black color with 20% alpha
    this.overlay.fillRect(0, 0, scene.cameras.main.width, scene.cameras.main.height);
    this.overlay.setDepth(100).setScrollFactor(0); // Ensure it's on top of other elements
  } else {
    this.overlay.destroy();
    this.overlay = null;
  }
};

// Handle pointer events for middle button (to toggle overlay)
middleButton.on('pointerdown', () => {
  setButtonLit(middleButton, 'middleButtonLit');
  toggleOverlay();  // Toggle the overlay
  TranslationManager.toggleTranslation();
  this.scene.events.emit('toggleTranslation');

  if (this.clearPathCallback) {
    this.clearPathCallback(); // Calls DungeonScene's clearPath method
  }
});

middleButton.on('pointerup', () => {
  resetButton(middleButton, 'middleButtonDark');
});

middleButton.on('pointerout', () => {
  resetButton(middleButton, 'middleButtonDark');
});

// Add to the scene and set scroll factors
scene.add.existing(this);
middleButton.setScrollFactor(0);

  }
}

export default ControlSquare;
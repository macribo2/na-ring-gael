import Phaser from 'phaser';

 class ControlSquare extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    // Create the directional buttons (left, right, up, down) and the middle button
    const buttonSize = 40; // Size of each button
    const middleButton0 = scene.add.sprite(x, y, 'middleButtonDark').setInteractive();
    const upButton0 = scene.add.sprite(x, y - 60, 'upButtonDark').setInteractive(); // Up button above the middle
    const downButton0 = scene.add.sprite(x, y + 60, 'downButtonDark').setInteractive(); // Down button below the middle
    const leftButton0 = scene.add.sprite(x - 60, y, 'leftButtonDark').setInteractive(); // Left button to the left of the middle
    const rightButton0 = scene.add.sprite(x + 60, y, 'rightButtonDark').setInteractive(); // Right button to the right of the middle

    // Add the buttons to the container first (they'll be rendered above the square)
    this.add(middleButton0);
    this.add(upButton0);
    this.add(downButton0);
    this.add(leftButton0);
    this.add(rightButton0);
    this.middleButton0 = middleButton0;
    this.upButton0 = upButton0;
    this.downButton0 = downButton0;
    this.leftButton0 = leftButton0;
    this.rightButton0 = rightButton0;


    // Function to switch to the lit (pressed) version of the button
    const setButtonLit = (button, buttonName) => {
      button.setTexture(buttonName); // Switch to the "lit" texture (e.g., upButtonLit)
    };

    // Function to reset to the normal button state
    const resetButton = (button, buttonName) => {
      button.setTexture(buttonName); // Switch back to the normal texture (e.g., buttonUp)
    };

// Cooldown flags for each button
let middleButtonCooldown = false;
let upButtonCooldown = false;
let downButtonCooldown = false;
let leftButtonCooldown = false;
let rightButtonCooldown = false;

// Function to handle button press with cooldown
const handleButtonPress = (button, litClass, cooldownFlag) => {
  if (cooldownFlag.value) return; // Ignore clicks during cooldown

  setButtonLit(button, litClass);

  cooldownFlag.value = true; // Activate cooldown

  // Reset cooldown after 500ms
  setTimeout(() => {
    cooldownFlag.value = false;
  }, 500);
};

// Event listeners for each button with cooldown
middleButton0.on('pointerdown', () => {
  handleButtonPress(middleButton0, 'middleButtonLit', { value: middleButtonCooldown });
});
upButton0.on('pointerdown', () => {
  handleButtonPress(upButton0, 'upButtonLit', { value: upButtonCooldown });
});
downButton0.on('pointerdown', () => {
  handleButtonPress(downButton0, 'downButtonLit', { value: downButtonCooldown });
});
leftButton0.on('pointerdown', () => {
  handleButtonPress(leftButton0, 'leftButtonLit', { value: leftButtonCooldown });
});
rightButton0.on('pointerdown', () => {
  handleButtonPress(rightButton0, 'rightButtonLit', { value: rightButtonCooldown });
});

    // When button is released (pointer up)
    middleButton0.on('pointerup', () => {
      resetButton(middleButton0, 'middleButtonLit');
    });
    upButton0.on('pointerup', () => {
      resetButton(upButton0, 'upButtonLit');
    });
    downButton0.on('pointerup', () => {
      resetButton(downButton0, 'downButtonLit');
    });
    leftButton0.on('pointerup', () => {
      resetButton(leftButton0, 'leftButtonLit');
    });
    rightButton0.on('pointerup', () => {
      resetButton(rightButton0, 'rightButtonLit');
    });

    // Handle pointer out (when the pointer is moved away from the button)
    middleButton0.on('pointerout', () => {
      resetButton(middleButton0, 'middleButtonDark');
    });
    upButton0.on('pointerout', () => {
      resetButton(upButton0, 'upButtonDark');
    });
    downButton0.on('pointerout', () => {
      resetButton(downButton0, 'downButtonDark');
    });
    leftButton0.on('pointerout', () => {
      resetButton(leftButton0, 'leftButtonDark');
    });
    rightButton0.on('pointerout', () => {
      resetButton(rightButton0, 'rightButtonDark');
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
    middleButton0.on('pointerdown', (pointer) => startPress(pointer));
    upButton0.on('pointerdown', (pointer) => startPress(pointer));
    downButton0.on('pointerdown', (pointer) => startPress(pointer));
    leftButton0.on('pointerdown', (pointer) => startPress(pointer));
    rightButton0.on('pointerdown', (pointer) => startPress(pointer));

    // Handle pointerup (both for buttons and control square dragging)
    const handlePointerUp = () => {
      stopPress(); // Stop the continuous logging
      console.log('Pointer Up! Final position of ControlSquare: ', this.x, this.y);  // Show alert on pointer release
    };

    // Listen for pointerup event on the whole container (or buttons themselves)
    middleButton0.on('pointerup', handlePointerUp);
    upButton0.on('pointerup', handlePointerUp);
    downButton0.on('pointerup', handlePointerUp);
    leftButton0.on('pointerup', handlePointerUp);
    rightButton0.on('pointerup', handlePointerUp);

    // Listen for pointerupoutside event (if pointer is released outside the container)
    this.on('pointerupoutside', handlePointerUp);

    // Set up additional listener to drop the controller if tapped during drag
    this.on('pointerdown', (pointer) => {
      if (draggingControlSquare) {
        console.log("Tapped during drag, dropping control square...");
        stopPress();  // Drop the control square if tapped
      }
    });
    

    // Add this container to the scene
    scene.add.existing(this);
  }
}

export default ControlSquare;
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
// import './cork.css';

const Baile = () => {
  const gameRef = useRef(null); // Reference to hold the Phaser game instance
  const phaserRef = useRef(null);
  useEffect(() => {
    // Configuration for Phaser game
    const config = {
      type: Phaser.AUTO,
      width: '100%',  // Use percentage to adapt to screen width
      height: '100%', // Use percentage to adapt to screen height
      clickTally:0,
      scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };
    
    // Create the Phaser game instance
    gameRef.current = new Phaser.Game(config);

    // Cleanup function to destroy the Phaser game when the component unmounts
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  // Phaser scene methods
  function preload() {

    let champID = localStorage.getItem('champID');
    this.load.image('glassbg0', '/phaser-resources/images/big-glass.png');
    this.load.image('greenRingLeft', '/phaser-resources/images/big-glass.png'); 
    this.load.image('button-up', '/phaser-resources/images/ui/pad-u.png');
    this.load.image('button-down', '/phaser-resources/images/ui/pad-d.png');
    this.load.image('button-left', '/phaser-resources/images/ui/pad-l.png');
    this.load.image('button-right', '/phaser-resources/images/ui/pad-r.png');
    this.load.image('button-middle-lit', '/phaser-resources/images/ui/middle-a.png');
    this.load.image('button-middle', '/phaser-resources/images/ui/middle-b.png');
    this.load.image('pad-g', '/phaser-resources/images/ui/pad-g.png');
    this.load.json('dialogues', '/phaser-resources/text/baile.json');
    this.load.image('sparks', `/phaser-resources/images/spark_02.png`);
    this.load.image('border', `/phaser-resources/images/spark_02.png`);
    this.load.image('player', `/phaser-resources/images/players/eighty.png`);
    this.load.image('background', '/phaser-resources/images/background-elements/baile.png');
    this.load.image('rock', '/phaser-resources/images/sprites/rock.png'); // Load the rock image
    this.load.image('tree', '/phaser-resources/images/sprites/tree34.png'); // Load the tree image
    this.load.image('fern', '/phaser-resources/images/sprites/plantGreen_2.png'); // Load the tree image
    this.load.image('treeSlim', '/phaser-resources/images/sprites/tree23.png'); // Load the tree image
    this.load.image('treeRed', '/phaser-resources/images/sprites/tree35.png'); // Load the tree image
    this.load.image('treeHawthorn', '/phaser-resources/images/sprites/treeSmall_green3.png'); // Load the tree image
    this.load.image('treeWillow', '/phaser-resources/images/sprites/willow.png'); // Load the tree image
    this.load.image('say', '/phaser-resources/images/sprites/say.png'); // Replace with the path to your say image
    this.load.image('stump', '/phaser-resources/images/sprites/empty.png'); // Load the tree image
    this.load.image('say', '/phaser-resources/images/sprites/say.png'); // Replace with the path to your say image
    this.load.image('translucentBg', '/phaser-resources/images/background-elements/grey-bg.png'); // Replace with the path to your say image

  

  }
  function create() {

    const tileSize = 32;
    const gridWidth = 25; // Number of tiles in width
    const gridHeight = 18; // Number of tiles in height
    const bgWidth = tileSize * gridWidth;
    const bgHeight = tileSize * gridHeight;
    // Initialize borderGraphics
    this.borderGraphics = this.add.graphics(playerStartX, playerStartY, 'border');;
    this.borderGraphics.setDepth(9); // Optional: Set depth if needed
  
    this.background = this.add.tileSprite(0, 0, bgWidth, bgHeight, 'background');
    this.background.setOrigin(0, 0);
  
    // Center the player on the grid
    const playerStartX = Math.floor(gridWidth / 2) * tileSize + tileSize / 2;
    const playerStartY = Math.floor(gridHeight / 2) * tileSize + tileSize / 2;
    this.player = this.add.sprite(playerStartX, playerStartY, 'player'); // Start near the center of the grid
    this.player.setOrigin(0.5, 0.5).setScale(0.5);
    this.cursors = this.input.keyboard.createCursorKeys();
  
    // Ensure the player stays locked to the grid
    this.player.nextMove = { x: this.player.x, y: this.player.y };
    this.isMoving = false;
    this.moveDelay = 100; // Add a delay for continuous movement (milliseconds)
    this.lastMoveTime = 0; // Track the last time movement occurred
  

    this.interactiveObjects = [
      // { type: 'stump', x: 2, y: 5, nameEng: 'carpet', name: 'carpéid' },
      // { type: 'stump', x: 2, y: 5, nameEng: 'carpet', name: 'carpéid' },

      // { type: 'stump', x: 2, y: 5, nameEng: 'carpet', name: 'carpéid' },
      // { type: 'stump', x: 15, y: 8, nameEng: 'stairs', name: 'staighre' },
      // Add more non-blocking interactive objects here
      { type: 'noPic', x: 1, y: 4, nameEng: 'carpet', name: 'carpéid' },
      { type: 'noPic', x: 3, y: 4, nameEng: 'carpet', name: 'carpéid'},
      { type: 'noPic', x: 1, y: 4, nameEng: 'carpet', name: 'carpéid' },
      { type: 'noPic', x: 2, y: 5, nameEng: 'carpet', name: 'carpéid'},
      { type: 'noPic', x: 4, y: 5, nameEng: 'carpet', name: 'carpéid' },
      { type: 'noPic', x: 3, y: 5, nameEng: 'parent', name: 'tuismitheoir' },
      { type: 'noPic', x: 1, y: 3, nameEng: 'sink', name: 'doirteal' },

      { type: 'noPic', x: 4, y: 3, nameEng: 'parent', name: 'tuismitheoir' },
      { type: 'noPic', x: 3, y: 3, nameEng: 'parent', name: 'tuismitheoir' },
      { type: 'noPic', x: 2, y: 3, nameEng: 'parent (familiar)', name: 'tuiste' },
      { type: 'noPic', x: 2, y: 4, nameEng: 'parent (familiar)', name: 'tuiste' },

    ];
    
    // Log the interactive objects for debugging
    
    // Define obstacles with names and positions
    this.obstacles = [
      { type: 'noPic', x: 0, y: 4, nameEng: 'wall', name: 'balla' },
      { type: 'noPic', x: 0, y: 3, nameEng: 'wall', name: 'balla' },

      { type: 'noPic', x: 0, y: 2, nameEng: 'wall', name: 'balla' },
      { type: 'noPic', x: 1, y: 2, nameEng: 'wall', name: 'balla' },
      { type: 'noPic', x: 2, y: 2, nameEng: 'wall', name: 'balla' },
      { type: 'noPic', x: 3, y: 2, nameEng: 'oven', name: 'oigheann' },
      { type: 'noPic', x: 4, y: 2, nameEng: 'wall', name: 'balla' },
      { type: 'furniture', x: 17, y: 4, nameEng:'fishtank',name: 'umar éisc' },
      { type: 'noPic', x: 18, y: 2, nameEng:'fala',name: 'wall'},
      { type: 'noPic', x: 18, y: 2, nameEng:'window',name: 'fuinneóg'} 

    ];
  
    // Draw obstacles
    this.obstacles.forEach(obstacle => {
      const sprite = this.add.sprite(obstacle.x * tileSize + tileSize / 2, obstacle.y * tileSize + tileSize / 2, obstacle.type === 'noPic' ? 'noPic' : obstacle.type);
      sprite.setName(obstacle.name);
  
      if (obstacle.type === 'noPic') {
        sprite.setAlpha(0); // Make the sprite invisible
      }
    });
  
    // Create a say graphic
    this.sayGraphic = this.add.sprite(0, 0, 'say');
    this.sayGraphic.setAlpha(0); // Initially invisible
    this.sayGraphic.setDepth(8); // Ensure it is above other elements
      // Add the translucent background and English text
    
    this.collisionTextEng = this.add.text(200, 210, '', {
      fontSize: '16px',
      fill: '#ffffff',
      fontFamily: 'Anaphora-Light-trial',
      padding: { x: 10, y: 10 },
      stroke: '#000000',
      strokeThickness: 3
    }).setScrollFactor(0).setVisible(false).setDepth(19);

    

    
    this.collisionText = this.add.text(200, 80, '', {
      fontSize: '26px',
      fill: '#ffffff',
      fontFamily: 'urchlo',
      padding: { x: 10, y: 10 },
      stroke: '#000000',
      strokeThickness: 3
    }).setScrollFactor(0).setDepth(20);
  


    
    // Timer for collision messages
    this.collisionMessageTimer = 0;
    this.collisionMessageDuration = 2000; // Duration in milliseconds
  
    drawGrid(this, tileSize, gridWidth, gridHeight);
  // Add this check before using `this.borderGraphics.clear()`


    // Add and po/sition buttons
    this.buttonMiddle = this.add.sprite(0, 0, 'button-middle').setInteractive().setDepth(23).setScrollFactor(0);
    this.buttonMiddle.on('pointerdown', () => handleMiddleButtonClick(this));

    this.buttonLeft = this.add.sprite(0, 0, 'button-left').setInteractive().setDepth(22).setScrollFactor(0);
    this.buttonDown = this.add.sprite(0, 0, 'button-down').setInteractive().setDepth(22).setScrollFactor(0);
    this.buttonRight = this.add.sprite(0, 0, 'button-right').setInteractive().setDepth(22).setScrollFactor(0);
    this.buttonUp = this.add.sprite(0, 0, 'button-up').setInteractive().setDepth(22).setScrollFactor(0);
  
    // Set up the camera
    this.cameras.main.setZoom(2); // Zoom in 2x
    this.cameras.main.startFollow(this.player, true); // Follow the player
  
    // Set camera bounds to the size of the map
    this.cameras.main.setBounds(0, 0, bgWidth, bgHeight);
  
    // Update button positions initially
    updateButtonPositions(this);
  
    // Listen for resize events
    this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
      updateButtonPositions(this);
    });
  
    // Bind button interactions
    this.buttonLeft.on('pointerdown', () => handleButtonInput.call(this, 'left'));
    this.buttonRight.on('pointerdown', () => handleButtonInput.call(this, 'right'));
    this.buttonUp.on('pointerdown', () => handleButtonInput.call(this, 'up'));
    this.buttonDown.on('pointerdown', () => handleButtonInput.call(this, 'down'));
  
    this.buttonLeft.on('pointerup', () => handleButtonInputRelease.call(this, 'left'));
    this.buttonRight.on('pointerup', () => handleButtonInputRelease.call(this, 'right'));
    this.buttonUp.on('pointerup', () => handleButtonInputRelease.call(this, 'up'));
    this.buttonDown.on('pointerup', () => handleButtonInputRelease.call(this, 'down'));
  
     // Create the translucent background and English text
    this.translucentBg = this.add.tileSprite(this.cameras.main.width / 2, this.cameras.main.height / 2, bgWidth, bgHeight, 'translucentBg');
     
    //  this.translucentBg = this.add.sprite(800, this.cameras.main.height / 2, 'translucentBg');
     this.translucentBg.setVisible(false); // Initially hidden
    this.translucentBg.setDepth(9).setAlpha(0.4);
    
    // Timeout flag
    this.isMiddleButtonCooldown = false;
  }
    function handleMiddleButtonClick(scene) {
      if (scene.isMiddleButtonCooldown) return;
      toggleVisibility(scene);
  
      scene.isMiddleButtonCooldown = true;
      setTimeout(() => {
        scene.isMiddleButtonCooldown = false;
      }, 500); // Adjust the delay as needed (500ms in this case)
    }
    function toggleVisibility(scene) {
      // Toggle visibility of elements
      scene.translucentBg.setVisible(!scene.translucentBg.visible);
      scene.collisionTextEng.setVisible(!scene.collisionTextEng.visible);
    }  
  
  
  
  function handleButtonInput(direction) {
    if (direction === 'left') {
      this.cursors.left.isDown = true;
    } else if (direction === 'right') {
      this.cursors.right.isDown = true;
    } else if (direction === 'up') {
      this.cursors.up.isDown = true;
    } else if (direction === 'down') {
      this.cursors.down.isDown = true;
    }
    this.clickTally++;
    movePlayer.call(this);
  }
  
  function handleButtonInputRelease(direction) {
    if (direction === 'left') {
      this.cursors.left.isDown = false;
    } else if (direction === 'right') {
      this.cursors.right.isDown = false;
    } else if (direction === 'up') {
      this.cursors.up.isDown = false;
    } else if (direction === 'down') {
      this.cursors.down.isDown = false;
    }
  }
  
  function movePlayer() {
    const tileSize = 32; // Example tile size, adjust as needed
    const gridWidth = 25; // Example grid width, adjust as needed
    const gridHeight = 18; // Example grid height, adjust as needed
  
    if (!this.isMoving && this.time.now - this.lastMoveTime > this.moveDelay) {
      this.isMoving = true;
      this.lastMoveTime = this.time.now;
  
      let nextMove = { x: this.player.x, y: this.player.y };
  
      if (this.cursors.left.isDown) {
        nextMove.x = Phaser.Math.Clamp(this.player.x - tileSize, tileSize * 0.5, tileSize * (gridWidth - 0.5));
      } else if (this.cursors.right.isDown) {
        nextMove.x = Phaser.Math.Clamp(this.player.x + tileSize, tileSize * 0.5, tileSize * (gridWidth - 0.5));
      } else if (this.cursors.up.isDown) {
        nextMove.y = Phaser.Math.Clamp(this.player.y - tileSize, tileSize * 0.5, tileSize * (gridHeight - 0.5));
      } else if (this.cursors.down.isDown) {
        nextMove.y = Phaser.Math.Clamp(this.player.y + tileSize, tileSize * 0.5, tileSize * (gridHeight - 0.5));
      }
  
      this.player.nextMove = nextMove;
      this.player.setPosition(nextMove.x, nextMove.y);
  
      this.isMoving = false;
    }
  }
let buttonPressed = false;

function handleButtonLeft() {
  this.buttonLeft.on('pointerdown', () => {
    buttonPressed = true;
    // Optionally handle visual feedback for button press start
  });

  this.buttonLeft.on('pointerup', () => {
    if (buttonPressed) {
      buttonPressed = false;
      // Ensure movePlayer is called only once
      movePlayer.call(this, 'left');
    }
  });
}

function handleButtonRight() {
  this.buttonRight.on('pointerdown', () => {
    buttonPressed = true;
    // Optionally handle visual feedback for button press start
  });

  this.buttonRight.on('pointerup', () => {
    if (buttonPressed) {
      buttonPressed = false;
      // Ensure movePlayer is called only once
      movePlayer.call(this, 'right');
    }
  });
}

function handleButtonUp() {
  this.buttonUp.on('pointerdown', () => {
    buttonPressed = true;
    // Optionally handle visual feedback for button press start
  });

  this.buttonUp.on('pointerup', () => {
    if (buttonPressed) {
      buttonPressed = false;
      // Ensure movePlayer is called only once
      movePlayer.call(this, 'up');
    }
  });
}

function handleButtonDown() {
  this.buttonDown.on('pointerdown', () => {
    buttonPressed = true;
    // Optionally handle visual feedback for button press start
  });

  this.buttonDown.on('pointerup', () => {
    if (buttonPressed) {
      buttonPressed = false;
      // Ensure movePlayer is called only once
      movePlayer.call(this, 'down');
    }
  });
}

// Track the state of the mouse click
let mousePressed = false;

function setupMouseEvents() {
  this.input.on('pointerdown', (pointer) => {
    mousePressed = true;
    // Optionally, handle visual feedback for mouse click start
  });

  this.input.on('pointerup', (pointer) => {
    if (mousePressed) {
      mousePressed = false;
      // Trigger movement or other actions only on mouse click end
      // Example: movePlayer.call(this, 'left'); // Call relevant function based on context
    }
  });
}
  
let isMoving = false; // Track if movement is ongoing

function movePlayer(direction) {
  if (isMoving) return; // Prevent overlapping movements

  isMoving = true;
  const speed = 32; // Size of one square

  let targetX = this.player.x;
  let targetY = this.player.y;

  switch (direction) {
    case 'left':
      targetX -= speed;
      break;
    case 'right':
      targetX += speed;
      break;
    case 'up':
      targetY -= speed;
      break;
    case 'down':
      targetY += speed;
      break;
  }

  this.tweens.add({
    targets: this.player,
    x: targetX,
    y: targetY,
    duration: 200, // Adjust as needed
    onComplete: () => {
      isMoving = false; // Allow next move
    }
  });
}

  
  function handleButtonLeft() {
    if (!this.isMoving) {
      this.isMoving = true;
      this.cursors.left.isDown = true;
      movePlayer.call(this);
      this.cursors.left.isDown = false;
    }
  }
  
  function handleButtonRight() {
    if (!this.isMoving) {
      this.isMoving = true;
      this.cursors.right.isDown = true;
      movePlayer.call(this);
      this.cursors.right.isDown = false;
    }
  }
  
  function handleButtonUp() {
    if (!this.isMoving) {
      this.isMoving = true;
      this.cursors.up.isDown = true;
      movePlayer.call(this);
      this.cursors.up.isDown = false;
    }
  }
  
  function handleButtonDown() {
    if (!this.isMoving) {
      this.isMoving = true;
      this.cursors.down.isDown = true;
      movePlayer.call(this);
      this.cursors.down.isDown = false;
    }
  }
  
// Helper function to create a delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function movePlayer() {
  const tileSize = 32; // Example tile size, adjust as needed
  const gridWidth = 25; // Example grid width, adjust as needed
  const gridHeight = 18; // Example grid height, adjust as needed
  
  if (!this.isMoving && this.time.now - this.lastMoveTime > this.moveDelay) {
    this.isMoving = true;
    this.lastMoveTime = this.time.now;

    let nextMove = { x: this.player.x, y: this.player.y };

    if (this.cursors.left.isDown) {
      nextMove.x = Phaser.Math.Clamp(this.player.x - tileSize, tileSize * 0.5, tileSize * (gridWidth - 0.5));
    } else if (this.cursors.right.isDown) {
      nextMove.x = Phaser.Math.Clamp(this.player.x + tileSize, tileSize * 0.5, tileSize * (gridWidth - 0.5));
    } else if (this.cursors.up.isDown) {
      nextMove.y = Phaser.Math.Clamp(this.player.y - tileSize, tileSize * 0.5, tileSize * (gridHeight - 0.5));
    } else if (this.cursors.down.isDown) {
      nextMove.y = Phaser.Math.Clamp(this.player.y + tileSize, tileSize * 0.5, tileSize * (gridHeight - 0.5));
    }

    // Wait for 500ms before moving the player
    await delay(500);

    this.player.setPosition(nextMove.x, nextMove.y);

    this.isMoving = false;
  }
}



function handleButtonLeft() {
  if (!this.isMoving) {
    this.isMoving = true;
    this.cursors.left.isDown = true;
    movePlayer.call(this);
    this.cursors.left.isDown = false;
  }
}

function handleButtonRight() {
  if (!this.isMoving) {
    this.isMoving = true;
    this.cursors.right.isDown = true;
    movePlayer.call(this);
    this.cursors.right.isDown = false;
  }
}

function handleButtonUp() {
  if (!this.isMoving) {
    this.isMoving = true;
    this.cursors.up.isDown = true;
    movePlayer.call(this);
    this.cursors.up.isDown = false;
  }
}

function handleButtonDown() {
  if (!this.isMoving) {
    this.isMoving = true;
    this.cursors.down.isDown = true;
    movePlayer.call(this);
    this.cursors.down.isDown = false;
  }
}

  function update(time, delta) {
    const moveInterval = 50; // Adjust the delay between moves (milliseconds)

    // Clear the collision message after the duration
    if (time > this.collisionMessageTimer) {
        this.collisionText.setText('');
        this.collisionTextEng.setText('');
    }

    // Handle player movement
    if (this.isMoving) {
        this.player.x = Phaser.Math.Linear(this.player.x, this.player.nextMove.x, 0.2);
        this.player.y = Phaser.Math.Linear(this.player.y, this.player.nextMove.y, 0.2);

        if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.player.nextMove.x, this.player.nextMove.y) < 1) {
            this.player.x = this.player.nextMove.x;
            this.player.y = this.player.nextMove.y;
            this.isMoving = false;
            this.moveDelay = time + moveInterval; // Set delay after movement is complete
            if (this.borderGraphics) {
            // Clear the border graphics when movement is complete
            this.borderGraphics.setVisible(false);
          }}
        return;
    }

    if (time < this.moveDelay) {
        return; // Wait until the delay is over
    }

    const tileSize = 32;
    const gridWidth = 25;
    const gridHeight = 18;

    let nextMove = { x: this.player.x, y: this.player.y };
    let collisionMessage = '';
    let collisionMessageEng = '';

    // Determine the next move based on user input
    if (this.cursors.left.isDown) {
        nextMove.x = Phaser.Math.Clamp(this.player.x - tileSize, tileSize * 0.5, tileSize * (gridWidth - 0.5));
    } else if (this.cursors.right.isDown) {
        nextMove.x = Phaser.Math.Clamp(this.player.x + tileSize, tileSize * 0.5, tileSize * (gridWidth - 0.5));
    } else if (this.cursors.up.isDown) {
        nextMove.y = Phaser.Math.Clamp(this.player.y - tileSize, tileSize * 0.5, tileSize * (gridHeight - 0.5));
    } else if (this.cursors.down.isDown) {
        nextMove.y = Phaser.Math.Clamp(this.player.y + tileSize, tileSize * 0.5, tileSize * (gridHeight - 0.5));
    }

    // Check for collision
    const collision = checkCollision(nextMove, this.obstacles, tileSize);
    if (collision) {
        collisionMessage = collision.name;
        collisionMessageEng = collision.nameEng; // Assuming 'nameEng' is also present in obstacles

        // Show the say graphic
        this.sayGraphic.setPosition(this.player.x, this.player.y - 40);
        this.sayGraphic.setAlpha(1).setScale(3);

        // Fade out the say graphic
        this.tweens.add({
            targets: this.sayGraphic,
            alpha: 0,
            duration: 200,
            ease: 'Linear'
        });

        // Show border around the collision square
        const borderX = collision.x * tileSize;
        const borderY = collision.y * tileSize;
        this.borderGraphics.clear();
        this.borderGraphics.setVisible(true);
        this.borderGraphics.strokeRect(borderX, borderY, tileSize, tileSize);

        // Hide the border after a brief delay
        this.time.delayedCall(200, () => {
            this.borderGraphics.setVisible(false);
        });

        // Set the collision messages
        this.collisionText.setText(collisionMessage);
        this.collisionTextEng.setText(collisionMessageEng);
        this.collisionMessageTimer = time + this.collisionMessageDuration; // Set the timer
        return; // Exit early if there's a collision
    }

    // Check for non-blocking interactions
    const interactiveObject = checkInteraction(nextMove, this.interactiveObjects, tileSize);
    if (interactiveObject) {
        this.collisionText.setText(interactiveObject.name);
        this.collisionTextEng.setText(interactiveObject.nameEng); // Set the interaction message
        this.collisionMessageTimer = time + this.collisionMessageDuration; // Set the timer


    }

    // Move the player if there's no collision
    this.player.nextMove = nextMove;
    this.isMoving = true;
}
function updateButtonPositions(scene) {
  const padding = 20;
  const buttonSize = 50;
  const screenWidth = scene.scale.width;
  const screenHeight = scene.scale.height;

  const buttonX = screenWidth - padding - buttonSize-200;
  const buttonY = screenHeight - padding - buttonSize-100;


  // Update positions
  scene.buttonMiddle.setPosition(buttonX, buttonY).setScale(0.5);
  scene.buttonLeft.setPosition(buttonX - buttonSize / 2, buttonY).setScale(0.5);
  scene.buttonDown.setPosition(buttonX, buttonY + buttonSize / 2).setScale(0.5);
  scene.buttonRight.setPosition(buttonX + buttonSize / 2, buttonY).setScale(0.5);
  scene.buttonUp.setPosition(buttonX, buttonY - buttonSize / 2).setScale(0.5);

}

// Helper function to check interaction
function checkInteraction(nextMove, interactiveObjects, tileSize) {
    if (!interactiveObjects || !Array.isArray(interactiveObjects)) {
        return null;
    }

    return interactiveObjects.find(object => {
        if (!object || typeof object.x === 'undefined' || typeof object.y === 'undefined') {
            // console.error('Invalid object in interactiveObjects:', object); // Debugging statement
            return false;
        }
        const objectX = object.x * tileSize + tileSize / 2;
        const objectY = object.y * tileSize + tileSize / 2;
        return nextMove.x === objectX && nextMove.y === objectY;
    });
}

// Helper function to check collision
function checkCollision(nextMove, obstacles, tileSize) {
    return obstacles.find(obstacle => {
        const obstacleX = obstacle.x * tileSize + tileSize / 2;
        const obstacleY = obstacle.y * tileSize + tileSize / 2;
        return nextMove.x === obstacleX && nextMove.y === obstacleY;
    });
}

// Helper function to draw grid
function drawGrid(scene, tileSize, gridWidth, gridHeight) {
    const darkGreenTranslucent = 0x00000000; // Translucent dark green color

    // Draw horizontal lines
    for (let x = 0; x <= gridWidth * tileSize; x += tileSize) {
        // scene.add.line(0, 0, x, 0, x, gridHeight * tileSize, darkGreenTranslucent).setOrigin(0, 0);
    }

    // Draw vertical lines
    for (let y = 0; y <= gridHeight * tileSize; y += tileSize) {
        // scene.add.line(0, 0, 0, y, gridWidth * tileSize, y, darkGreenTranslucent).setOrigin(0, 0);
    }
}

// Helper function to check interaction
function checkInteraction(nextMove, interactiveObjects, tileSize) {
    if (!interactiveObjects || !Array.isArray(interactiveObjects)) {
        return null;
    }

    return interactiveObjects.find(object => {
        if (!object || typeof object.x === 'undefined' || typeof object.y === 'undefined') {
            // console.error('Invalid object in interactiveObjects:', object); // Debugging statement
            return false;
        }
        const objectX = object.x * tileSize + tileSize / 2;
        const objectY = object.y * tileSize + tileSize / 2;
        return nextMove.x === objectX && nextMove.y === objectY;
    });
}

// Helper function to check collision
function checkCollision(nextMove, obstacles, tileSize) {
    return obstacles.find(obstacle => {
        const obstacleX = obstacle.x * tileSize + tileSize / 2;
        const obstacleY = obstacle.y * tileSize + tileSize / 2;
        return nextMove.x === obstacleX && nextMove.y === obstacleY;
    });
}

// Helper function to draw grid
function drawGrid(scene, tileSize, gridWidth, gridHeight) {
    const darkGreenTranslucent = 0x00000000; // Translucent dark green color

    // Draw horizontal lines
    for (let x = 0; x <= gridWidth * tileSize; x += tileSize) {
        // scene.add.line(0, 0, x, 0, x, gridHeight * tileSize, darkGreenTranslucent).setOrigin(0, 0);
    }

    // Draw vertical lines
    for (let y = 0; y <= gridHeight * tileSize; y += tileSize) {
        // scene.add.line(0, 0, 0, y, gridWidth * tileSize, y, darkGreenTranslucent).setOrigin(0, 0);
    }
}


// Helper function to check interaction
function checkInteraction(nextMove, interactiveObjects, tileSize) {
    if (!interactiveObjects || !Array.isArray(interactiveObjects)) {
        return null;
    }

    return interactiveObjects.find(object => {
        if (!object || typeof object.x === 'undefined' || typeof object.y === 'undefined') {
            // console.error('Invalid object in interactiveObjects:', object); // Debugging statement
            return false;
        }
        const objectX = object.x * tileSize + tileSize / 2;
        const objectY = object.y * tileSize + tileSize / 2;
        return nextMove.x === objectX && nextMove.y === objectY;
    });
}


// Helper function to check interaction
function checkInteraction(nextMove, interactiveObjects, tileSize) {
    if (!interactiveObjects || !Array.isArray(interactiveObjects)) {
        // console.error('Interactive objects are not defined or not an array:', interactiveObjects); // Debugging statement
        return null;
    }

    return interactiveObjects.find(object => {
        if (!object || typeof object.x === 'undefined' || typeof object.y === 'undefined') {
            // console.error('Invalid object in interactiveObjects:', object); // Debugging statement
            return false;
        }
        const objectX = object.x * tileSize + tileSize / 2;
        const objectY = object.y * tileSize + tileSize / 2;
        return nextMove.x === objectX && nextMove.y === objectY;
    });
}

function updateText(playerMapLocationTracker) {
    // Retrieve the current dialogue based on the playerMapLocationTracker
    const dialogues = this.cache.json.get('dialogues');
    
    // Check if the current dialogue is defined
    if (dialogues) {
        // Get the text for the current dialogue
        const currentDialogue = dialogues[playerMapLocationTracker];
        
        if (currentDialogue) {
            // Update the textGa and textEn with the new dialogue text
            this.textGa.setText(currentDialogue.text.ga).setPosition(200,50);
            this.textEn.setText(currentDialogue.text.en).setOrigin(0.5);
        } else {
            console.error(`No dialogue found for playerMapLocationTracker: ${playerMapLocationTracker}`);
        }
    } else {
        console.error(`No dialogues data found in the cache`);
    }
}
  function checkCollision(nextMove, obstacles, tileSize) {
    return obstacles.find(obstacle => {
      const obstacleX = obstacle.x * tileSize + tileSize / 2;
      const obstacleY = obstacle.y * tileSize + tileSize / 2;
      return nextMove.x === obstacleX && nextMove.y === obstacleY;
    });
  }

  function drawGrid(scene, tileSize, gridWidth, gridHeight) {
    const darkGreenTranslucent = 0x00000000; // Translucent dark green color
  
    // Draw horizontal lines
    for (let x = 0; x <= gridWidth * tileSize; x += tileSize) {
      // scene.add.line(0, 0, x, 0, x, gridHeight * tileSize, darkGreenTranslucent).setOrigin(0, 0);
    }
  
    // Draw vertical lines
    for (let y = 0; y <= gridHeight * tileSize; y += tileSize) {
      // scene.add.line(0, 0, 0, y, gridWidth * tileSize, y, darkGreenTranslucent).setOrigin(0, 0);
    }
  }

  return (
    <div id="phaser-container" style={{ width: '800px', height: '480px' }}>


    </div>
  );
};

export default Baile;

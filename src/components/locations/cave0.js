import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';

const Cave0 = () => {






  const [collisionMessageTimer, setCollisionMessageTimer] = useState(0); // Declare state for the timer

  const gameRef = useRef(null); // Reference to hold the Phaser game instance
  const phaserRef = useRef(null);
  useEffect(() => {



      // Define mapLayout, obstacleMap, and interactiveMap inside useEffect
      const mapLayout = [
        ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a'],
        ['a','a','a','a','a','a','a','a','a','c','c','c','a','a','a','a','a','a','a','a','a','a','a','a','a'],
        ['a','a','a','a','a','a',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a','a','a','a','a','a','a','a'],
        ['a','a','a','a','a','a',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a','a','a','a','a','a','a','a'],
        ['a','a',' ',' ','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b',' ',' ',' ',' ','a']
    ];

    const obstacleMap = {
        'a': { type: 'noPic', nameEng: 'A rock wall', name: 'balla na pluaise' },
        'b': { type: 'noPic', nameEng: 'dark water', name: 'uisce doracha' },
        'd': { type: 'noPic', nameEng: 'large rock', name: 'carraig mór' }
    };
//deleting this causes crash so ...
    const interactiveMap = {
      
    };

    const newObstacles = [];
    const newInteractiveObjects = [];

    // Configuration for Phaser game
    const config = {
      type: Phaser.AUTO,
      width: '100%',  // Use percentage to adapt to screen width
      height: '100%', // Use percentage to adapt to screen height
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
    mapLayout.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
          const obstacle = obstacleMap[cell];
          const interactive = interactiveMap[cell];
          
          if (obstacle && obstacle.type !== 'walkable') {
              newObstacles.push({
                  type: obstacle.type,
                  x: colIndex,
                  y: rowIndex,
                  nameEng: obstacle.nameEng,
                  name: obstacle.name
              });
          }

          if (interactive) {
              newInteractiveObjects.push({
                  type: interactive.type,
                  x: colIndex,
                  y: rowIndex,
                  nameEng: interactive.nameEng,
                  name: interactive.name
              });
          }
      });
  });



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
    this.load.json('dialogues', '/phaser-resources/text/dunaree.json');
    this.load.image('sparks', `/phaser-resources/images/spark_02.png`);
    this.load.image('border', `/phaser-resources/images/spark_02.png`);
    this.load.image('player', `/phaser-resources/images/champions/${champID}.png`);
    this.load.image('background', '/phaser-resources/images/background-elements/cave0.png');
    this.load.image('rock', '/phaser-resources/images/sprites/rock.png'); // Load the rock image
    this.load.image('tree', '/phaser-resources/images/sprites/tree34.png'); // Load the tree image
    this.load.image('fern', '/phaser-resources/images/sprites/plantGreen_2.png'); // Load the tree image
    this.load.image('treeSlim', '/phaser-resources/images/sprites/tree23.png'); // Load the tree image
    this.load.image('treeRed', '/phaser-resources/images/sprites/tree35.png'); // Load the tree image
    this.load.image('treeHawthorn', '/phaser-resources/images/sprites/treeSmall_green3.png'); // Load the tree image
    this.load.image('treeWillow', '/phaser-resources/images/sprites/willow.png'); // Load the tree image
    this.load.image('stump', '/phaser-resources/images/sprites/empty.png'); // Load the tree image
    this.load.image('say', '/phaser-resources/images/sprites/say.png'); // Replace with the path to your say image
    this.load.image('translucentBg', '/phaser-resources/images/background-elements/grey-bg.png'); // Replace with the path to your say image

  

  }
  function create() {

    const mapLayout = [
        ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a'],
        ['a','a','a','a','a','a','a','a','a','c','c','c','a','a','a','a','a','a','a','a','a','a','a','a','a'],
        ['a','a','a','a','a','a',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a','a','a','a','a','a','a','a'],
        ['a','a','a','a','a','a',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a','a','a','a','a','a','a','a'],
        ['a','a','a','a','a','a',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a','a','a','a','a','a','a'],
        ['a','a','a','a','a','a',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a','a','a','a','a','a','a'],
        ['a','a','a','a','a','a',' ',' ',' ',' ','e',' ',' ',' ',' ',' ','a','a','a','a','a','a','a','a','a'],
        ['a','a','a','a','a','a',' ',' ',' ',' ','f',' ',' ',' ',' ',' ','a','a','a','a','a','a','a','a','a'],
        ['a','a',' ',' ',' ',' ',' ',' ',' ',' ','g',' ',' ',' ',' ',' ','a','a','a','a','a','a','a','a','a'],
        ['a','a','a','a','a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a','a','a','a','a','a'],
        ['a','a','a','a','a',' ',' ',' ',' ',' ',' ',' ',' ','d',' ',' ','a','a','a','a','a','a','a','a','a'],
        ['a','a','a','a','a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a','a','a','a','a','a'],
        ['a','a','a','a','a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a','a','a','a','a'],
        ['a','a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a','a','a','a','a'],
        ['a','a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a','a'],
        ['a','a',' ',' ',' ','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','a','a','a','a','a'],
        ['a','a',' ',' ','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','a','a','a','a'],
        ['a','a',' ',' ','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b','b',' ',' ',' ',' ','a']];
    
    const obstacleMap = {
        'a': { type: 'noPic', nameEng: 'A rock wall', name: 'balla cloiche' },
        'b': { type: 'noPic', nameEng: 'dark water', name: 'uisce doracha' },
        'd': { type: 'noPic', nameEng: 'large rock', name: 'carraig mór' },
        'c': { type: 'noPic', nameEng: 'I am in the mouth of the cave', name: 'Tá mé i mbéal na plúise' },
           };

           
    const interactiveMap = {
        'i': { type: 'puddle', nameEng: 'Puddle', name: 'lochán' },
        'i': { type: 'puddle', nameEng: 'Puddle', name: 'lochán' },
        'i': { type: 'puddle', nameEng: 'Puddle', name: 'lochán' },
        'r': { type: 'rubble', nameEng: 'Rubble', name: 'smionagar' },
        'e': { type: 'noPic', nameEng: 'I listen sharply', name: 'éistím go géir' },
        'f': { type: 'noPic', nameEng: 'The darkness seems alive to me, with rumors and tidings', name: 'do-chím dorchadas beo le tualas' },
        'g': { type: 'noPic', nameEng: '', name: '' },
        ' ': { type: 'walkable', nameEng: '', name: '' }
    };
    this.obstacles = [];
    this.interactiveObjects = []; // New array for interactive objects
    
    mapLayout.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const obstacle = obstacleMap[cell];
            const interactive = interactiveMap[cell];
            
            if (obstacle) {
                if (obstacle.type !== 'walkable') { // Only add non-walkable obstacles
                    this.obstacles.push({
                        type: obstacle.type,
                        x: colIndex,
                        y: rowIndex,
                        nameEng: obstacle.nameEng,
                        name: obstacle.name
                    });
                }
            }
            
            if (interactive) {
                this.interactiveObjects.push({
                    type: interactive.type,
                    x: colIndex,
                    y: rowIndex,
                    nameEng: interactive.nameEng,
                    name: interactive.name
                });
            }
        });
    });
    
      
      
    const tileSize = 32;
    const gridWidth = 25; // Number of tiles in width
    const gridHeight = 18; // Number of tiles in height
    const bgWidth = tileSize * gridWidth;
    const bgHeight = tileSize * gridHeight;
    // Initialize borderGraphics
    this.borderGraphics = this.add.graphics(playerStartX, playerStartY, 'border');;
    this.borderGraphics.setDepth(99); // Optional: Set depth if needed
  
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
  
    this.textForFade = this.add.text(200, 80, '', {
      fontSize: '26px',
      fill: '#ffffff',
      fontFamily: 'urchlo',
      padding: { x: 10, y: 10 },
      stroke: '#000000',
      strokeThickness: 3
    }).setScrollFactor(0).setDepth(20);
  

       
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
      movePlayer.call(this, direction); // Pass direction to movePlayer
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
    
 
let buttonPressed = false;

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
  
    }
  });
}
  
let isMoving = false; // Track if movement is ongoing


  
// Helper function to create a delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Declare a timer for collision message

// Modify the movePlayer function to handle collision and display the message
async function movePlayer() {
  // collisionMessageTimer.current = 100; // Update ref value without triggering a re-render
  

  const tileSize = 32;
  const gridWidth = 25;
  const gridHeight = 18;

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

    // Check for obstacles here before applying the delay
    const nextTileX = Math.floor(nextMove.x / tileSize);
    const nextTileY = Math.floor(nextMove.y / tileSize);

    const obstacle = this.obstacles.find(o => o.x === nextTileX && o.y === nextTileY);

    //deleting this if causes walk through first wall bug.
    if (obstacle) {
      // Show collision message
      this.collisionText.setText('Obstacle ahead!');
      this.collisionTextEng.setText('Obstacle ahead (Eng)!');

      // Set the timer for how long the message should stay
      this.collisionMessageTimer = this.time.now + 3000; // Show for 3 seconds

      this.isMoving = false;

      return; // Block movement and stop further execution
    }

    // Add delay before setting the new position
    await delay(500);

    this.player.setPosition(nextMove.x, nextMove.y);
    this.isMoving = false;
  }
}

function update(time, delta) {
  const moveInterval = 50;

  // Clear the collision message after the duration
  if (time > this.collisionMessageTimer) {
      setTimeout(() => {
          this.collisionText.setText('');
          this.collisionTextEng.setText('');
      }, 3000);
  }

  // Handle player movement
  if (this.isMoving) {
      this.player.x = Phaser.Math.Linear(this.player.x, this.player.nextMove.x, 0.2);
      this.player.y = Phaser.Math.Linear(this.player.y, this.player.nextMove.y, 0.2);

      if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.player.nextMove.x, this.player.nextMove.y) < 1) {
          this.player.x = this.player.nextMove.x;
          this.player.y = this.player.nextMove.y;
          this.isMoving = false;
          this.moveDelay = time + moveInterval;
          if (this.borderGraphics) {
              this.borderGraphics.setVisible(false);
          }
      }
      return;
  }

  if (time < this.moveDelay) {
      return;
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
        // Only access 'name' and 'nameEng' if collision is valid (not undefined)
        if (collision.name && collision.nameEng) {
      collisionMessage = collision.name;
      collisionMessageEng = collision.nameEng;
      // Show the say graphic
      this.sayGraphic.setPosition(this.player.x, this.player.y - 25);
      this.sayGraphic.setAlpha(1).setScale(0.5);
      
    }





    
          // Set the collision messages
          this.collisionText.setText(collisionMessage);
          this.collisionTextEng.setText(collisionMessageEng);
          this.collisionMessageTimer = time + this.collisionMessageDuration;

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



        // Update textForFade only if it's not already fading
        if (!this.isFading) {
          this.textForFade.setText(collisionMessage);  // Set the text
          this.textForFade.setAlpha(1);                // Make it fully visible
          this.isFading = true;  // Lock the fading process to prevent updates

          // Fade out the textForFade over 3 seconds
          this.tweens.add({
              targets: this.textForFade,
              alpha: 0,
              duration: 3000,  // 3 seconds fade
              ease: 'Linear',
              onComplete: () => {
                  this.isFading = false;  // Allow new collisions after fade-out
              }
          });
      }
      return; // Exit early if there's a collision
  }

  // Check for non-blocking interactions
  const interactiveObject = checkInteraction(nextMove, this.interactiveObjects, tileSize);
  if (interactiveObject) {
      this.collisionText.setText(interactiveObject.name);
      this.collisionTextEng.setText(interactiveObject.nameEng);
      this.collisionMessageTimer = time + this.collisionMessageDuration;
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


// Helper function to check collision
function checkCollision(nextMove, obstacles, tileSize) {
    return obstacles.find(obstacle => {
        const obstacleX = obstacle.x * tileSize + tileSize / 2;
        const obstacleY = obstacle.y * tileSize + tileSize / 2;
        return nextMove.x === obstacleX && nextMove.y === obstacleY;
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
    <div id="phaser-container" style={{ width: '800px', height: '480px' }}></div>
  );
};

export default Cave0;

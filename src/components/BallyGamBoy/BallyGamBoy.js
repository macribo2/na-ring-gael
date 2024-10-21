import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import geaga1 from '../../images/go-full-screen-bg-0.png'; // Assuming wordPairs.js is in the same directory
import './bally.css'
import Easca from '../easca/easca2';
import Narrative1 from '../../components/Narrative0/Narrative1'
const BallyGamBoy = () => {
  const [showMessage, setShowMessage] = useState(false); // Show/hide message

  const [showNarrative, setShowNarrative] = useState(false); // Manage the visibility of Narrative1

  const toggleNarrative = () => {
      setShowNarrative(!showNarrative); // Toggle Narrative1 visibility
  };

  const handleShowEasca = () => {
    setShowEasca(true);
  };
  const [showEasca, setShowEasca] = useState(false); // 
  const [collisionMessageTimer, setCollisionMessageTimer] = useState(0); // Declare state for the timer
  const rippleTriggered = useRef(false);
  const gameRef = useRef(null); // Reference to hold the Phaser game instance
  const phaserRef = useRef(null);


  const checkNarrativeTracker = () => {
    const trackerValue = localStorage.getItem('narrativeTracker');
    if (trackerValue && parseInt(trackerValue, 10) === 6) {
      setShowNarrative(false);  // Close the narrative
      localStorage.setItem('narrativeTracker', 0);  // Optionally reset the tracker
  
      // Access the Phaser scene and call sinkCreature
      if (gameRef.current && gameRef.current.scene.scenes[0]) {
        gameRef.current.scene.scenes[0].sinkCreature();  // Call sinkCreature inside the scene
      }
    }
  };
  
  function createRipple(x, y) {
    // Easing function (easeOutQuart)
    const easeOutQuart = (t, b, c, d) => {
      t = t / d - 1;
      return -c * (t * t * t * t - 1) + b;
    };
  
    // Function to create a ripple with specified style
    const createThinRipple = (color, delay, depth) => {
      const ripple = this.add.graphics({ lineStyle: { width: 1, color, alpha: 1 } }).setDepth(depth);
      let progress = 0;
      const maxRadius = 180;
      const duration = 14000;  // Total duration of the effect
  
      const expandRipple = () => {
        ripple.clear();
        ripple.lineStyle(1, color, 1);  // Ensure style is applied each time
        const easedRadius = easeOutQuart(progress, 5, maxRadius - 5, duration);
        ripple.strokeCircle(x, y, easedRadius);  // Draw the ripple with the eased radius
        progress += 16;  // Increase time progress by the frame duration (~60 FPS)
  
        if (progress < duration) {
          this.time.delayedCall(16, expandRipple);  // Call every 16ms (~60 FPS)
        } else {
          ripple.destroy();  // Destroy once the animation is complete
        }
      };
  
      expandRipple();  // Start the ripple animation
    };
  
    // Create the first white ripple
    createThinRipple(0xffffff, 0, -2);  // White ripple at depth -2
  
    // Create a second ripple after a delay (optional style modification)
    this.time.delayedCall(50, () => {
      createThinRipple(0x707070, 500, -1);  // Black ripple at depth -1
    });
  }
  
  const [message, setMessage] = useState("");

// Function to handle message passed from Easca
const handleSendMessage = (msg) => {
  setMessage(msg); // Update the state with the new message

  const messageElement = document.querySelector('.player-message');
  messageElement.style.opacity = '0'; // Ensure it starts hidden
  messageElement.classList.remove('visible'); // Remove the visible class initially

  // Show message 1 second after send
  setTimeout(() => {
    messageElement.classList.add('visible'); // Add the visible class
    messageElement.style.opacity = '1'; // Make the message visible
  }, 1000); // 1-second delay

  // Hide message after 4 seconds
  setTimeout(() => {
    messageElement.style.opacity = '0'; // Fade it out
    setTimeout(() => {
      messageElement.classList.remove('visible'); // Hide the bubble after fade out
    }, 500); // Wait for the fade-out transition to complete
  }, 5000); // 4 seconds after it appears
};

// Call this function periodically or on state updates
useEffect(() => {
  const delayCheck = setTimeout(() => {
    const interval = setInterval(checkNarrativeTracker, 1000);  // Check every second
    return () => clearInterval(interval);
}, 2000);  // Add a 2-second delay before starting the check

  const trackerValue = localStorage.getItem('narrativeTracker');
  // If there's no tracker value or if it's undefined, reset it to 0
  if (!trackerValue) {
      localStorage.setItem('narrativeTracker', 0);
  }
    const interval = setInterval(checkNarrativeTracker, 1000);  // Poll every second
    

    if (!localStorage.getItem('narrativeTracker')) {
      localStorage.setItem('narrativeTracker', 0);
  }
      // Define mapLayout, obstacleMap, and interactiveMap inside useEffect
      const mapLayout = [
     
    ];

    const obstacleMap = {
        'a': { type: 'noPic', nameEng: 'A rock wall', name: 'balla na pluaise' },
        'b': { type: 'noPic', nameEng: 'deep water', name: 'uisce domhain' },
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

    window.addEventListener('showEasca', handleShowEasca);
        


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

  const handleStorageChange = (e) => {
    if (e.key === 'narrativeTracker') {
        checkNarrativeTracker();
    }
};

// Add an event listener for localStorage changes
window.addEventListener('storage', handleStorageChange);

// Run the check once on component mount to hide the narrative if already at 5
checkNarrativeTracker();



    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      window.removeEventListener('showEasca', handleShowEasca);
            
      if (gameRef.current) {
          gameRef.current.destroy(true);
      }
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
      clearTimeout(delayCheck);
    };




  }, []);

  // Phaser scene methods
  function preload() {
    this.load.image('featherIcon', '/phaser-resources/images/feather.png');

    this.load.image('lake-wizard', '/phaser-resources/images/npcs/snake.png');
    this.load.image('lure',         '/phaser-resources/images/sprites/gold_pile_0.png');
    let champID = localStorage.getItem('champID');
    this.load.image('fullscreen', '/phaser-resources/images/big-glass.png');
    this.load.image('geaga1', '/phaser-resources/images/big-glass.png');

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
    this.load.image('background', '/phaser-resources/images/background-elements/doonsheen.png');
    this.load.image('rock', '/phaser-resources/images/sprites/rock.png'); // Load the rock image
    this.load.image('tree', '/phaser-resources/images/sprites/tree34.png'); // Load the tree image
    this.load.image('lakeMask', '/phaser-resources/images/background-elements/lakeMask.png'); // Load the tree image
    this.load.image('fern', '/phaser-resources/images/sprites/plantGreen_2.png'); // Load the tree image
    this.load.image('treeSlim', '/phaser-resources/images/sprites/tree23.png'); // Load the tree image
    this.load.image('treeRed', '/phaser-resources/images/sprites/tree35.png'); // Load the tree image
    this.load.image('treeHawthorn', '/phaser-resources/images/sprites/treeSmall_green3.png'); // Load the tree image
    this.load.image('treeWillow', '/phaser-resources/images/sprites/willow.png'); // Load the tree image
    this.load.image('stump', '/phaser-resources/images/sprites/empty.png'); // Load the tree image
    this.load.image('say', '/phaser-resources/images/sprites/say.png'); // Replace with the path to your say image
    this.load.image('translucentBg', '/phaser-resources/images/background-elements/grey-bg.png'); // Replace with the path to your say image

  

  }

  
  let creature = null;
  function create() {
    let creature = null;

      // Initialize a reference for the creature
 // Define the sinkCreature function within the Phaser scene
 this.sinkCreature = () => {
  createRipple.call(this, 370, 560); // Adjust the coordinates as needed
  
  // Destroy the existing creature if it exists
  if (this.creature) {
    this.creature.destroy();
  }
  
  // Create a new creature instance
  this.creature = this.add.image(370, 550, 'lake-wizard')
  .setAlpha(0.8)
  .setScale(0.3)
  .setDepth(59);
  
  this.tweens.add({
    targets: this.creature,
    alpha: 0,
    y: '+=50',
    duration: 2000,
    ease: 'Power1',
    onComplete: () => {
      this.creature.destroy();  // Remove the creature after sinking
      this.creature = null; // Clear the reference
    }
  });
};
    this.rippleCount = 0; // Step 1: Initialize the counter

    const mapLayout = [
        ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a'],
        ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a'],
        ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a'],
        ['a','a','a','a','a','a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','x',' ',' ',' ','a'],
        ['x',' ',' ',' ',' ','a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a',' ','a',' ',' ','a'],
        ['a','a','a',' ',' ','a',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a',' ',' ','a',' ','a',' ',' ','a'],
        ['a',' ',' ','a',' ','a',' ',' ',' ',' ',' ',' ',' ','a',' ',' ',' ','a',' ','a',' ','a',' ',' ','a'],
        ['a',' ',' ','a',' ','a',' ',' ',' ',' ',' ',' ',' ','a',' ',' ',' ','a','a','a',' ','a',' ',' ','a'],
        ['a',' ',' ','a',' ','a',' ',' ',' ',' ',' ',' ',' ','a',' ',' ',' ',' ',' ',' ',' ','a',' ',' ','a'],
        ['a',' ',' ','a',' ','a','a','a',' ',' ',' ',' ',' ','a',' ',' ',' ','a','a','a','a','a',' ',' ','a'],
        ['a',' ',' ','a',' ',' ',' ','a','a',' ',' ',' ',' ','a',' ',' ',' ','a',' ',' ',' ',' ',' ',' ','a'],
        ['a','a','a','a',' ',' ',' ',' ','a','a','j','a','a','a',' ',' ',' ','a',' ',' ',' ',' ',' ',' ','a'],
        ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a',' ',' ',' ',' ',' ',' ','a'],
        ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a',' ',' ',' ',' ',' ',' ','a'],
        ['a','a','a',' ',' ',' ',' ',' ',' ','g','g','g','g','g','g',' ',' ','a',' ',' ',' ',' ',' ',' ','a'],
        ['a',' ','a','a','a','a','a','a','d',' ',' ',' ',' ','g','g',' ',' ','a','a','a','a','a','a','a','a'],
        ['a',' ',' ',' ',' ',' ',' ',' ','d',' ',' ',' ',' ','g',' ',' ',' ',' ','k','e',' ',' ',' ',' ','x'],
        ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a']   
    
    ];
    
    const obstacleMap = {
        'a': { type: 'noPic', nameEng: '\nI Cannot go that way', name: '\nNí féidir liom dul \nan treo sin' },
        'b': { type: 'noPic', nameEng: '\nA cliff in the darkness\nI don\'t see the bottom', name: '\nAill sa dorchadas\nní fheicim an bun' },
        'c': { type: 'noPic', nameEng: '\nI don\'t trust those boxes', name: '\nNíl muinnín agam as\nnaboscaí sin' },
        'd': { type: 'noPic', nameEng: '\ndeep water', name: '\nuisce doimhean' },
        'j': { type: 'noPic', nameEng: 'Flood mouth', name: '\nBéal Tuile' },
        'g': { type: 'rippleEffect', nameEng: '', name: '' },
           };

           
    const interactiveMap = {
        'r': { type: 'rubble', nameEng: 'Rubble', name: 'smionagar' },
        'e': { type: 'noPic', nameEng: 'I stand upon a bridge', name: 'Seasaim ar droichead' },
        'k': { type: 'noPic', nameEng: 'Who knows what lies ahead', name: 'Cá bhfios \ncád atá romhainn' },
        'f': { type: 'noPic', nameEng: 'I stand in the stream', name: 'Seasaim sa sruthán' },
        'h': { type: 'noPic', nameEng: '', name: '' },
        'i': { type: 'noPic', nameEng: 'it\'s pitch dark here', name: 'Tá sé dubh doracha anseo.' },
        'x':{type: 'exit', nameEng:'exiting area...',name:'ag fágál an áit...'} 
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
    this.rippleCreated = false; // Add this in your scene initialization
    this.background = this.add.tileSprite(0, 0, bgWidth, bgHeight, 'background');
    this.background.setOrigin(0, 0);
  // Specify starting column and row
const startColumn = 20; // Horizontal position on the grid (1-25)
const startRow = 16; // Vertical position on the grid (1-18)

// Calculate the player's starting coordinates
const playerStartX = startColumn * tileSize + tileSize / 2;
const playerStartY = startRow * tileSize + tileSize / 2;

    this.player = this.add.sprite(playerStartX, playerStartY, 'player'); // Start near the center of the grid
    this.player.setOrigin(0.5, 0.4)
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
  
      if (obstacle.type === 'noPic'||'rippleEffect') {
        sprite.setAlpha(0); // Make the sprite invisible
      }
    });
  
    // Create a say graphic
    this.sayGraphic = this.add.sprite(0, 0, 'say');
    this.sayGraphic.setAlpha(0); // Initially invisible
    this.sayGraphic.setDepth(8); // Ensure it is above other elements
      // Add the translucent background and English text
    
    this.collisionTextEng = this.add.text(200, 160, '', {
      fontSize: '16px',
      fill: 'lime',
      fontFamily: 'Ubuntu',
      padding: { x: 10, y: 10 },
      stroke: '#000000',
      strokeThickness: 3
    }).setScrollFactor(0).setVisible(false).setDepth(19);

    

    
    this.collisionText = this.add.text(200, 90, '', {
      fontSize: '20px',
      fill: '#D8BFD8',
      fontFamily: 'urchlo',
      padding: { x: 10, y: 10 },
      stroke: '#000000',
      strokeThickness: 3
    }).setScrollFactor(0).setDepth(20);
  
    this.textForFade = this.add.text(200, 90, '', {
      fontSize: '24px',
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
    this.translucentBg = this.add.tileSprite(this.cameras.main.width / 2, this.cameras.main.height / 2, bgWidth, bgHeight, 'translucentBg').setScale(3);
     
// Feather icon in the bottom left corner
this.featherIcon = this.add.sprite(220, 230, 'featherIcon').setOrigin(0).setScale(0.3).setAlpha(1).setInteractive().setDepth(999).setVisible(false).setScrollFactor(0) ; // Make the sprite interactive
    //  this.translucentBg = this.add.sprite(800, this.cameras.main.height / 2, 'translucentBg');
     this.translucentBg.setVisible(false); // Initially hidden
    this.translucentBg.setDepth(9).setAlpha(0.4);
    
    // Timeout flag
    this.isMiddleButtonCooldown = false;
  
  

    const lakeMask = this.add.sprite(0, 250, 'lakeMask')
    .setDepth(-9) // Set depth so it's on top
    .setOrigin(0, 0) // Make sure it's positioned from the top-left corner
    .setScale(6); // Scale the sprite up if necessary

  // Ensure the sprite covers the entire screen
  lakeMask.displayWidth = this.cameras.main.width;
  lakeMask.displayHeight = this.cameras.main.height;


 

  this.featherIcon.on('pointerdown', () => {
    // Dispatch a custom event to notify React to show the Easca component
   
    const event = new Event('showEasca');
    window.dispatchEvent(event);
  });
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
      scene.featherIcon.setVisible(!scene.featherIcon.visible);
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


const [fullscreen, setFullscreen] = useState(false);


const toggleFullscreen = () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const elem = document.documentElement;
        const fullscreenPromise = elem.requestFullscreen ? elem.requestFullscreen() : elem.webkitRequestFullscreen(); // Safari
        fullscreenPromise.then(() => {
            setFullscreen(true);
        });
    } else {
        const exitPromise = document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen(); // Safari
        exitPromise.then(() => {
            setFullscreen(false);
        });
    }
};


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

function playerStepsInWater(nextMove, interactiveMap) {
    if (!nextMove || !interactiveMap) return false;  // Safeguard check

    const tileX = Math.floor(nextMove.x / 32);  // Convert pixel position to grid position (assuming 32px per tile)
    const tileY = Math.floor(nextMove.y / 32);

    // Check if tileX and tileY are within the bounds of interactiveMap
    if (tileY < 0 || tileY >= interactiveMap.length || tileX < 0 || tileX >= interactiveMap[0].length) {
        return false;  // Out of bounds, so no water here
    }

    const tile = interactiveMap[tileY][tileX];  // Safely access the tile

    return tile && tile.type === 'g';  // Return true if the tile type is 'g' (water)
}
let lastRippleTime = 0; // Track last ripple time

function update(time, delta) {
    const moveInterval = 50;

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
        this.moveDelay = time + moveInterval;
             // Reset ripple flag when player finishes movement
      rippleTriggered.current = false;

      // Reset ripple flag when player finishes movement
      rippleTriggered.current = false;
        if (this.borderGraphics) {
          this.borderGraphics.setVisible(false);
        }
      }
      return; // Exit early if still moving
    }

    if (time < this.moveDelay) {
      return; // Wait until move delay is over
    }

    let creature = null; // Global variable to hold the creature instance

    function emergeCreature() {
      if (creature) return; // If the creature already exists, don't create a new one
    
      // Create the first ripple with a delay of 1 second before showing the creature
      this.time.delayedCall(1000, () => {
        createRipple.call(this, 370, 560);
        
        // Create the creature instance
        creature = this.add.image(370, 550, 'lake-wizard')
          .setAlpha(0)     // Initially transparent
          .setScale(0.2)   // Start with a small scale
          .setDepth(-2);   // Set depth to appear above other objects
    
        // Animate the fade-in, zoom, and bobbing effect for the creature
        this.tweens.add({
          targets: creature,
          alpha: 0.8,             // Fade in to near full opacity
          scale: 0.3,             // Zoom in to final size
          duration: 3400,         // Duration of the initial rise
          ease: 'Power1',
          onComplete: () => {
            // Ripple once the creature rises
            createRipple.call(this, 370, 560);
            
            // Bobbing effect
            this.tweens.add({
              targets: creature,
              y: '+=4',          // Move 4 pixels up
              yoyo: true,        // Move back down
              repeat: -1,        // Repeat the bobbing indefinitely
              duration: 4000,    // Duration of each bob cycle
              ease: 'Sine.easeInOut'  // Smooth bobbing motion
            });
    
            // Delay before showing the treasure (lure) after creature rises (2 seconds delay)
            this.time.delayedCall(2000, () => {
              const lure = this.add.image(370, 600, 'lure')  // Adjust the y position as needed
                .setAlpha(0)    // Initially transparent
                .setScale(0.15) // Set desired size for the treasure
                .setDepth(1);   // Ensure it appears above other objects
    
              // Fade in the treasure (lure)
              this.tweens.add({
                targets: lure,
                alpha: 1,        // Fully visible
                duration: 1000,  // Fade-in duration
                ease: 'Power1'
              });
            }, [], this);  // 2-second delay after the creature appears
          }
        });
    
        this.time.delayedCall(4000, () => {
          setShowNarrative(true);  // Show the narrative overlay
        }, [], this);
      }, [], this);
    
       // Command to hide the creature after 4 seconds
       this.time.delayedCall(5000, () => {
        // Animate the creature's disappearance
        this.tweens.add({
          targets: creature,
          alpha: 0,        // Fade out to fully transparent
          duration: 1000,  // Fade-out duration
          ease: 'Power1',
          onComplete: () => {
            creature.destroy(); // Remove the creature from the scene
            creature = null;    // Clear the reference to the creature
          }
        });
      }, [], this);

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
    if (playerStepsInWater()) {
      createRipple.call(this, this.player.x, this.player.y);  // Make sure `this` is bound correctly
  }


  


    // Initialize a flag in your class constructor or setup method
this.isInWater = false;  // Flag to track if the player is in water

// Check for collision
// Check for collision
const collision = checkCollision(nextMove, this.obstacles, tileSize);
if (collision) {
  console.log('Ripple Count:', this.rippleCount);

  // Check if the player stepped in water (type 'g')
  if (collision.type === 'rippleEffect') {
    // Only increment ripple count if we haven't already triggered a ripple on this square
    if (!this.rippleTriggered) {
      createRipple.call(this, this.player.x, this.player.y);  // Trigger ripple
      this.rippleCount++;  // Increment ripple count
      this.rippleTriggered = true;  // Set flag to prevent multiple ripples

      console.log('Updated Ripple Count:', this.rippleCount);
      
      // Emerge the creature after the 4th ripple
      if (this.rippleCount === 3) {
        emergeCreature.call(this);  // Creature emerges after 4 ripples
      }

      // Reset the flag after a delay (e.g., 500ms) to allow more ripples
      this.time.delayedCall(500, () => {
        this.rippleTriggered = false;  // Allow ripples again after delay
      });
    }
  } else {

    this.rippleTriggered = false;  // Reset the flag when moving away from water
  }

  // Handle regular collision
  if (collision.name && collision.nameEng) {
    collisionMessage = collision.name;
    collisionMessageEng = collision.nameEng;
  }

  // Show the say graphic (and handle other collision logic)
  this.sayGraphic.setPosition(this.player.x, this.player.y - 50);
  this.sayGraphic.setAlpha(1);

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

  // Set the collision messages
  this.collisionText.setText(collisionMessage);
  this.collisionTextEng.setText(collisionMessageEng);
  this.collisionMessageTimer = time + this.collisionMessageDuration;

  return; // Exit early if there's a collision
}

// Check for non-blocking interactions
const interactiveObject = checkInteraction(nextMove, this.interactiveObjects, tileSize);
if (interactiveObject) {

    //exit area

    if(interactiveObject.type==="exit"){
        window.location.href = 'https://www.na-ring-gael.com/pucaloic';
    }
  // Check if the interactive object is of type 'water' (or whatever your specific type is)
  let rippleCooldown = 5000; // 5 seconds cooldown
  this.lastRippleTime = this.lastRippleTime || 0; // Ensure lastRippleTime is initialized
  
  if (interactiveObject.type === 'rippleEffect') { // Assuming 'g' is the type for water
      // Set the water messages
      this.collisionText.setText(interactiveObject.name || '');
      this.collisionTextEng.setText(interactiveObject.nameEng || '');
      
      const currentTime = this.time.now; // Get the current time in milliseconds
  
      // Check if enough time has passed since the last ripple
      if (currentTime - this.lastRippleTime >= rippleCooldown) {
          createRipple.call(this, this.player.x, this.player.y); // Call ripple creation function
          this.lastRippleTime = currentTime; // Update last ripple time
      }
  }
  else {
    // Set messages for other interactive objects
    this.collisionText.setText(interactiveObject.name);
    this.collisionTextEng.setText(interactiveObject.nameEng);
  }
  
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
    <>
    <div id="phaser-container" style={{ width: '800px', height: '480px' }}>
   
    {showNarrative && (
                <div style={{ width: '75vw', height: '75vh', margin: 'auto', position: 'relative' }}>
                    <Narrative1 setShowNarrative={setShowNarrative} />
                </div>
            )}

            {/* Game content continues here when narrative is hidden */}
   
  
     
{!fullscreen && (
<>
                <img
                    src={geaga1}
                    alt="foggy fields"
                    className="fullscreen-image"
                    onClick={toggleFullscreen}
                    />
                    <div className='touch-prompt-container bally-rings fullscreen-image'>
<div className='touch-prompt'></div>
<div className='touch-prompt'></div></div>
                    </>
            )}
   {showEasca && <Easca onSendMessage={handleSendMessage} />}
   <p className="player-message">{message}</p>
  </div>
    </>
  );
};

export default BallyGamBoy;
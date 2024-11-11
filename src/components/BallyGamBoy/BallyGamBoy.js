import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import geaga1 from '../../images/go-full-screen-bg-0.png'; // Assuming wordPairs.js is in the same directory
import './bally.css'
import Easca from '../easca/easca2';
import Narrative1 from '../../components/Narrative0/Narrative1'
import portrait from '../../images/vert-bg3.png'
import TorchEmitters from './TorchEmitters';

let torchEmitters = null;
let backgroundLit;
const BallyGamBoy = () => {
  let middleButtonRecentlyPressed = false

  const [isEmittersReady, setEmittersReady] = useState(false);

  let hasInteractedWithSerpent = false; // To track if the player has interacted with the serpent
  let hasTriggeredTSquare = false; // To track if the player has already triggered the "t" square
  const [initialLayout, setInitialLayout] = useState("easca"); // Default to "easca"

  const [eascaActive, setEascaActive] = useState(false); 
  const [showEasca, setShowEasca] = useState(false); // 

  const [isHolding, setisHolding] = useState(false); 


  const handleHideEasca = () => {
    setShowEasca(false); // Hide Easca keyboard
    setEascaActive(false); // Mark Easca as inactive
    
  };

  const handleShowEasca = () => {
    setShowEasca(true); // Show Easca keyboard
    setEascaActive(true); // Mark Easca as active
  };
  const [showMessage, setShowMessage] = useState(false); // Show/hide message

  const [showNarrative, setShowNarrative] = useState(false); // Manage the visibility of Narrative1

  const toggleNarrative = () => {
      setShowNarrative(!showNarrative); // Toggle Narrative1 visibility
  };

 
  const [collisionMessageTimer, setCollisionMessageTimer] = useState(0); // Declare state for the timer
  const rippleTriggered = useRef(false);
  const gameRef = useRef(null); // Reference to hold the Phaser game instance
  const phaserRef = useRef(null);
  const isHoldingRef = useRef(isHolding);

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
      const ripple = this.add.graphics({ lineStyle: { width: 1, color, alpha: 1 } }).setDepth(-10);
      let progress = 0;
      const maxRadius = 195;
      const duration = 11000;  // Total duration of the effect
  
      const expandRipple = () => {
        ripple.clear();
        ripple.lineStyle(1, color, 1);  // Ensure style is applied each time
        const easedRadius = easeOutQuart(progress, 5, maxRadius - 5, duration);
        ripple.strokeCircle(x, y, easedRadius);  // Draw the ripple with the eased radius
        progress += 16;  // Increase time progress by the frame duration (~60 FPS)
  
        if (progress < duration ) {
          this.time.delayedCall(32, expandRipple);  // Call every 16ms (~60 FPS)
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
      createThinRipple(0x5c7678 , 500, -2);  // Black ripple at depth -1
    });
  }
  
  const [message, setMessage] = useState("");


  

useEffect(() => {
  const showEascaListener = () => handleShowEasca();
  window.addEventListener('showEasca', showEascaListener);

  isHoldingRef.current = isHolding;
  // Cleanup function for intervals
  const clearAllIntervals = () => {
    // clearInterval(checkNarrativeTrackerInterval);
  };

  // Logic for isHolding
  if (isHolding) {
    console.log('Handling isHolding state');
    // Additional logic for when isHolding is true
  }

  return () => {
    clearAllIntervals();
    window.removeEventListener('showEasca', showEascaListener);
 
  };
}, [isHolding]);

// Separate effect for managing the game instance
useEffect(() => {
  const config = {
    type: Phaser.AUTO,
    width: '100%',
    height: '100%',
    scale: {
      mode: Phaser.Scale.ScaleModes.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  // Create the Phaser game instance
  gameRef.current = new Phaser.Game(config);
   // Listen for the custom event from Phaser when emitters are ready
    gameRef.current.events.on('emittersReady', () => {
      setEmittersReady(true);  // Set flag to true when emitters are initialized
      console.log("Emitters are ready!");
    });

  return () => {
    if (gameRef.current) {
      gameRef.current.destroy(true);
      gameRef.current = null;
    }
  };
}, []); // Only run on mount

// Effect for localStorage management
useEffect(() => {
  const trackerValue = localStorage.getItem('narrativeTracker');
  if (!trackerValue) {
    localStorage.setItem('narrativeTracker', 0);
  }

  const handleStorageChange = (e) => {
    if (e.key === 'narrativeTracker') {
      checkNarrativeTracker();
    }
  };

  window.addEventListener('storage', handleStorageChange);

  // Cleanup for storage change listener
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}, []); // Only run on mount

// Set interval for narrative tracking on mount
useEffect(() => {
  const interval = setInterval(checkNarrativeTracker, 1000);

  return () => clearInterval(interval); // Clear interval on unmount
}, []); // Only run on mount

  // Phaser scene methods
  function preload() {
    this.load.image('torches', '/phaser-resources/images/foreground-elements/torches.png');
    this.load.image('featherIcon', '/phaser-resources/images/feather.png');

    this.load.image('lake-wizard', '/phaser-resources/images/npcs/snake.png');
    this.load.image('lure',         '/phaser-resources/images/sprites/gold_pile_0.png');
    let champID = localStorage.getItem('champID');
    this.load.image('fullscreen', '/phaser-resources/images/big-glass.png');
    this.load.image('geaga1', '/phaser-resources/images/big-glass.png');

    this.load.image('glassbg0', '/phaser-resources/images/big-glass.png');
    this.load.image('greenRingLeft', '/phaser-resources/images/big-glass.png'); 
    this.load.image('button-up', '/phaser-resources/images/ui/pad-u.png');
    this.load.image('button-up-yellow', '/phaser-resources/images/ui/pad-u-yellow.png');
    this.load.image('button-down', '/phaser-resources/images/ui/pad-d.png');
    this.load.image('button-left', '/phaser-resources/images/ui/pad-l.png');
    this.load.image('button-right', '/phaser-resources/images/ui/pad-r.png');
    this.load.image('button-down-yellow', '/phaser-resources/images/ui/pad-d-yellow.png');
    this.load.image('button-left-yellow', '/phaser-resources/images/ui/pad-l-yellow.png');
    this.load.image('button-right-yellow', '/phaser-resources/images/ui/pad-r-yellow.png');
    this.load.image('button-middle-lit', '/phaser-resources/images/ui/middle-a.png');
    this.load.image('button-middle', '/phaser-resources/images/ui/middle-b.png');
    this.load.image('pad-g', '/phaser-resources/images/ui/pad-g.png');
    this.load.json('dialogues', '/phaser-resources/text/dunaree.json');
    this.load.image('spark', `/phaser-resources/images/sprites/spark.png`);
    this.load.image('sparks', `/phaser-resources/images/spark_02.png`);
    this.load.image('border', `/phaser-resources/images/spark_02.png`);
    this.load.image('player', `/phaser-resources/images/champions/${champID}.png`);
    this.load.image('background', '/phaser-resources/images/background-elements/doonsheen.png');
    this.load.image('background-lit', '/phaser-resources/images/background-elements/doonsheen-lit.png');
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





  const backgroundRef = React.useRef(null);
  function create() {
  torchEmitters = new TorchEmitters(this, 702, 76, 608, 76);  // Initialize emitters
    console.log("Emitters initialized:", torchEmitters);
    
    let creature = null;
///let's try a wave effect
this.waves = []; // Array for visible waves
this.blackWaves = []; // Array for black waves

// Create 8 ripple lines
for (let i = 0; i < 8; i++) {
  // Create visible wave
  let wave = this.add.graphics();
  wave.lineStyle(1, 0x5c7678, 1); // 1px wide, glistening wave color
  wave.setAlpha(0.5); // Semi-transparent waves

  wave.beginPath();
  let prevY = i * 90; // Starting Y position for this wave

  // Draw dotted lines with increased randomness
  for (let x = 0; x <= this.scale.width / 2; x += Math.random() * 15 + 5) {
    const randomOffset = (Math.random() * 20 - 10) + Math.sin(x * 0.2) * 5; // Random offset
    const currentY = prevY + randomOffset; // Add random offset to previous Y

    // Draw a short line segment to create the dotted effect
    wave.moveTo(x, currentY);
    wave.lineTo(x + Math.random() * 5 + 3, currentY);

    prevY = currentY; // Update previous Y for the next point
  }

  wave.strokePath().setDepth(-6); // Render the wave
  wave.x = 500; // Position them centered horizontally (50% width)
  this.waves.push(wave); // Add visible wave to array

  // Create black wave (invisible)
  let blackWave = this.add.graphics().setDepth(-5);
  blackWave.lineStyle(16, 0x211e27, 1); // Black color
  blackWave.setAlpha(1); // Fully opaque

  blackWave.beginPath();
  prevY = i * 70; // Starting Y position for black wave

  // Draw dotted lines for black waves with the same randomness
  for (let x = 0; x <= this.scale.width / 2; x += Math.random() * 15 + 5) {
    const randomOffset = (Math.random() * 20 - 10) + Math.sin(x * 0.2) * 5; // Random offset
    const currentY = prevY + randomOffset; // Add random offset to previous Y

    // Draw a short line segment for the black wave
    blackWave.moveTo(x, currentY);
    blackWave.lineTo(x + Math.random() * 10 + 23, currentY);

    prevY = currentY; // Update previous Y for the next point
  }

  blackWave.strokePath(); // Render the black wave
  blackWave.x = 500; // Position them centered horizontally
  this.blackWaves.push(blackWave); // Add black wave to array
}
this.torches = this.add.image(656, 102, 'torches').setDepth(1)

this.blackWaveSpeed = 0.1; // Slower speed at which the ripples scroll down
this.waveSpeed = 0.2; // Slower speed at which the ripples scroll down
this.frameSkipCounter = 0; // Variable to control choppy frame updates
this.framesToSkip = 8; // Adjust this to control how choppy the effect should be

// Update function to animate the waves
function updateWaves(delta) {
  this.frameSkipCounter++;

  // Update waves only after skipping frames
  if (this.frameSkipCounter >= this.framesToSkip) {
    this.frameSkipCounter = 0; // Reset counter

    // Update visible waves
    this.waves.forEach((wave, index) => {
      wave.clear(); // Clear previous frame
      wave.lineStyle(1, 0x5c7678, 1); // Reset line style
      wave.setAlpha(0.5); // Set transparency

      wave.beginPath();
      let prevY = index * 120; // Starting Y position

      // Draw short segments to create a dotted effect
      for (let x = 0; x <= this.scale.width / 2; x += 10) {
        const randomOffset = Math.sin(x * 0.1 + this.time.now * 0.005) * 10; // Dynamic sine wave
        const currentY = prevY + randomOffset; // Create varying heights

        // Draw a short line segment instead of a full line
        wave.moveTo(x, currentY); // Move to the starting point of the segment
        wave.lineTo(x + 5, currentY); // Draw a short line segment (5px)
        prevY = currentY; // Update previous Y for the next segment
      }

      wave.strokePath(); // Render the wave
      wave.y += this.waveSpeed; // Move wave downward

      // Reset if out of bounds
      if (wave.y > this.scale.height+200) {
        wave.y = -200; // Reset to the top
      }
    });

  }
}


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
      ['a','a','a','a','a','a','a','a','a','a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','x','x','a','a','a'],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ','a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a',' ','a'],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ','a',' ',' ',' ','a','a','a',' ',' ',' ',' ',' ',' ','a',' ','a'],
      ['a','a','a','a','a','a',' ',' ',' ','a',' ',' ',' ','a','a','a','a','a','a','a','t','a',' ',' ','a'],
      ['x',' ',' ',' ',' ','a',' ',' ',' ','a','a','a',' ','a',' ',' ',' ',' ',' ','a',' ','a',' ',' ','a'],
      ['x',' ',' ',' ',' ','a',' ',' ',' ',' ',' ','a',' ','a','a','a','a',' ',' ','a',' ','a',' ',' ','a'],
      ['a','a','a','a',' ','a',' ',' ',' ',' ',' ','a',' ','a',' ',' ',' ','a',' ','a',' ','a',' ',' ','a'],
      ['a',' ',' ','a',' ','a',' ',' ',' ',' ',' ','a',' ','a',' ',' ',' ','a','a','a',' ','a',' ',' ','a'],
      ['a',' ',' ','a',' ','a',' ',' ','a','a','a','a',' ','a',' ',' ',' ',' ',' ',' ',' ','a',' ',' ','a'],
      ['a',' ',' ','a',' ','a','a','a',' ',' ',' ',' ',' ','a',' ',' ',' ',' ',' ',' ',' ','a',' ',' ','a'],
      ['a',' ',' ','a',' ',' ',' ','a','a','a','a','a','a','a',' ',' ',' ','a','a','a','a','a',' ',' ','a'],
      ['a','a','a','a',' ',' ',' ',' ','a','a','j','a','a','a',' ',' ',' ','a',' ',' ',' ',' ',' ',' ','a'],
      ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a',' ',' ',' ',' ',' ',' ','a'],
      ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a',' ',' ',' ',' ',' ',' ','a'],
      ['a','a','a',' ',' ',' ',' ',' ',' ','g','g','g','g','g','g',' ',' ','a',' ',' ',' ',' ',' ',' ','a'],
      ['a',' ','a','a','a','a','a','a','d',' ',' ',' ',' ','g','g',' ',' ','a','a','a','a','a','a','a','a'],
      ['a',' ',' ',' ',' ',' ',' ',' ','d',' ',' ',' ',' ','g',' ',' ',' ',' ','k','e',' ',' ',' ',' ','x'],
      ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a']   
  
  ];    
    const obstacleMap = {
        'a': { type: 'noPic', nameEng: '\nOne cannot go that way', name: 'Ní féidir dul \nan treo sin' },
        'b': { type: 'noPic', nameEng: '\nA cliff in the darkness\nI don\'t see the bottom', name: '\nAill sa dorchadas\nní fheicim an bun' },
        'c': { type: 'noPic', nameEng: '\nI don\'t trust those boxes', name: '\nNíl muinnín agam as\nnaboscaí sin' },
        'd': { type: 'noPic', nameEng: '\ndeep water', name: '\nuisce doimhean' },
        'j': { type: 'noPic', nameEng: 'Flood mouth', name: 'Béal Tuile' },
        'g': { type: 'rippleEffect', nameEng: '', name: '' },
           };

           
    const interactiveMap = {
        ' ': { type: 'noPic', nameEng: '', name: '' },
        'r': { type: 'rubble', nameEng: 'Rubble', name: 'smionagar' },
        'e': { type: 'noPic', nameEng: 'You stand upon a bridge', name: 'Seasann tú ar droichead' },
        'k': { type: 'noPic', nameEng: 'Who knows what lies ahead', name: 'Cá bhfios \ncad atá romhat' },
        'f': { type: 'noPic', nameEng: 'I stand in the stream', name: 'Seasain tú sa sruthán' },
        'h': { type: 'noPic', nameEng: '', name: '' },
        'i': { type: 'noPic', nameEng: 'it\'s pitch dark here', name: 'Tá sé dubh doracha anseo.' },
        'x':{type: 'exit', nameEng:'exiting area...',name:'ag fágál an áit...'} ,
        't':{type: 'illuminate', nameEng:'',name:''} 


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

    
    backgroundRef.current = this.add.tileSprite(0, 0, bgWidth, bgHeight, 'background');
    backgroundRef.current.setOrigin(0, 0);
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
      fontSize: '2.5em', // Larger font size
      fill: '#f0f0f0', // Text color
      fontFamily: 'aonchlo', // Use 'aonchlo' font for player text
      padding: { x: 10, y: 10 },
      align: 'center', // Align the text to center
      border: '2px solid #ccc' // Optional border
    }).setScrollFactor(0).setDepth(20);
  
    this.textForFade = this.add.text(200, 90, '', {
      fontSize: '2.5em', // Larger font size
      fill: '#f0f0f0', // Text color
      fontFamily: 'aonchlo', // Use 'aonchlo' font for player text

      padding: { x: 10, y: 10 },
      align: 'center', // Align the text to center
      border: '2px solid #ccc' // Optional border
    }).setScrollFactor(0).setDepth(20);
   
   
    this.textForFadeEng = this.add.text(200, 160, '', {
      fontSize: '16px',
      fill: 'lime',
      fontFamily: 'Ubuntu',
      padding: { x: 10, y: 10 },
      stroke: '#000000',
      strokeThickness: 3,
      align:'left'
    }).setScrollFactor(0).setDepth(20)

       
    this.collisionMessageTimer = 0;
    this.collisionMessageDuration = 3500; // Duration in milliseconds
  
    drawGrid(this, tileSize, gridWidth, gridHeight);
  // Add this check before using `this.borderGraphics.clear()`
  
  
  
  // Add and po/sition buttons
  this.buttonMiddle = this.add.sprite(0, 0, 'button-middle').setInteractive().setDepth(23).setScrollFactor(0);
  gameRef.current.buttonMiddle = this.buttonMiddle; // Store reference for later use
    this.buttonMiddle.on('pointerdown', () =>{ handleMiddleButtonClick(this)
  this.buttonMiddle.setTexture('button-middle-lit'); // Swap to pressed texture

    });

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
    this.input.on('pointerdown', (pointer) => {
      handleButtonInput.call(this, 'left'); // Example for left; adjust as needed
    });
    
    this.input.on('pointerup', (pointer) => {
      handleButtonInputRelease.call(this, 'left'); // Example for left; adjust as needed
    });
    // Bind button interactions
// Handle button press with texture swap
this.buttonLeft.on('pointerdown', () => { 
  handleButtonInput.call(this, 'left'); 
  this.buttonLeft.setTexture('button-left-yellow'); // Swap to pressed texture
  this.player.setFlipX(true); 
});
this.buttonMiddle.on('pointerup', () => { 
  setTimeout( ()=>{this.buttonMiddle.setTexture('button-middle')},800)
});


this.buttonRight.on('pointerdown', () => { 
  handleButtonInput.call(this, 'right'); 
  this.buttonRight.setTexture('button-right-yellow'); // Swap to pressed texture
  this.player.setFlipX(false); 
});

this.buttonUp.on('pointerdown', () => { 
  handleButtonInput.call(this, 'up'); 
  this.buttonUp.setTexture('button-up-yellow'); // Swap to pressed texture
});

this.buttonDown.on('pointerdown', () => { 
  handleButtonInput.call(this, 'down'); 
  this.buttonDown.setTexture('button-down-yellow'); // Swap to pressed texture
});

// Handle button release and revert texture
this.buttonLeft.on('pointerup', () => {
  handleButtonInputRelease.call(this, 'left'); 
  this.buttonLeft.setTexture('button-left'); // Revert to normal texture
});

this.buttonRight.on('pointerup', () => {
  handleButtonInputRelease.call(this, 'right'); 
  this.buttonRight.setTexture('button-right'); // Revert to normal texture
});

this.buttonUp.on('pointerup', () => {
  handleButtonInputRelease.call(this, 'up'); 
  this.buttonUp.setTexture('button-up'); // Revert to normal texture
});

this.buttonDown.on('pointerup', () => {
  handleButtonInputRelease.call(this, 'down'); 
  this.buttonDown.setTexture('button-down'); // Revert to normal texture
});
  
     // Create the translucent background and English text
    this.translucentBg = this.add.tileSprite(this.cameras.main.width / 2, this.cameras.main.height / 2, bgWidth, bgHeight, 'translucentBg').setScale(3);
     
// Feather icon in the bottom left corner
this.featherIcon = this.add.sprite(220, 230, 'featherIcon').setOrigin(0).setScale(0.3).setAlpha(1).setInteractive().setDepth(999).setVisible(false).setScrollFactor(0) ; // Make the sprite interactive
    //  this.translucentBg = this.add.sprite(800, this.cameras.main.height / 2, 'translucentBg');
     this.translucentBg.setVisible(false); // Initially hidden
    this.translucentBg.setDepth(9).setAlpha(0.4);
    
    // Timeout flag
    this.isMiddleButtonCooldown = false;
  
  
    const lakeMask2 = this.add.sprite(470, 230, 'lakeMask').setDepth(-7) // Set depth so it's on top
    .setOrigin(0, 0) // Make sure it's positioned from the top-left corner
    .setScale(6); // Scale the sprite up if necessary

    const lakeMask = this.add.sprite(0, 250, 'lakeMask')
    .setDepth(-12) // Set depth so it's on top
    .setOrigin(0, 0) // Make sure it's positioned from the top-left corner
    .setScale(6); // Scale the sprite up if necessary

  // Ensure the sprite covers the entire screen
  lakeMask.displayWidth = this.cameras.main.width;
  lakeMask.displayHeight = this.cameras.main.height;

  lakeMask2.displayWidth = this.cameras.main.width;
  lakeMask2.displayHeight = this.cameras.main.height;

 

  this.featherIcon.on('pointerdown', () => {
    // Dispatch a custom event to notify React to show the Easca component
   
    const event = new Event('showEasca');
    window.dispatchEvent(event);
  });
   this.game.events.emit('emittersReady');
}

// Function to handle message passed from Easca
const handleSendMessage = (msg) => {
  setMessage(msg); // Update the state with the new message
    if (msg === "ls" && isEmittersReady) {
      playerLightsTorches();
      
    return
    } else {
      console.error("Emitters not ready yet!");
    }
  const messageElement = document.querySelector('.player-message');
  const tailElement = document.createElement('div');
  tailElement.className = 'tail';

  messageElement.style.opacity = '0'; // Ensure it starts hidden
  messageElement.classList.remove('visible'); // Remove the visible class initially

  // Append the tail to the message element
  messageElement.appendChild(tailElement);

  // Show message after send
  setTimeout(() => {
      messageElement.classList.add('visible'); // Add the visible class
      messageElement.style.opacity = '1'; // Make the message visible
      tailElement.style.opacity = '1'; // Make the tail visible
  }, 300); // 1-second delay

  // Hide message after 4 seconds
  setTimeout(() => {
      messageElement.style.opacity = '0'; // Fade it out
      tailElement.style.opacity = '0'; // Fade out the tail
      setTimeout(() => {
          messageElement.classList.remove('visible'); // Hide the bubble after fade out
          messageElement.removeChild(tailElement); // Remove the tail after hiding
      }, 500); // Wait for the fade-out transition to complete
  }, 4000); // 4 seconds after it appears
};

function playerLightsTorches() {


  setTimeout(()=>{
    if (torchEmitters) {
      torchEmitters.activateEmitters();

      if (backgroundRef.current) {
          backgroundRef.current.setTexture('background-lit');
      } else {
          console.error("Background reference is not defined!");
      }
      console.log("Emitters activated!");
  } else {
      console.error("TorchEmitters instance is not defined!");
  }

  }, 1000)
  
}

let textureInterval = null; // Store the interval ID
let isSwitching = false; // Flag to control Switching state

// Handle the collision with the "t" square
function handleTSquareCollision(player, tSquare) {
    if (hasInteractedWithSerpent && !hasTriggeredTSquare) {
  if (!isSwitching) { // Start Switching if not already
    promptMiddleButton();  
    isSwitching = true; // Set the flag to true
      }
      
    }
}


function promptMiddleButton() {
  const textures = ['button-middle', 'button-middle-lit'];
  let index = 0; // Start with the first texture

  const buttonMiddle = gameRef.current.buttonMiddle;
  
  if (!buttonMiddle) {
    console.error("buttonMiddle is not defined in gameRef");
    return;
  }
  buttonMiddle.setTexture(textures[1]);

 // Change the texture every 500ms
 textureInterval = setInterval(() => {
  buttonMiddle.setTexture(textures[index]);
  index = (index + 1) % textures.length; // Toggle between textures
}, 500);

}
function stopSwitching() {
  clearInterval(textureInterval); // Stop the texture switching
  const buttonMiddle = gameRef.current.buttonMiddle;
  if (buttonMiddle) {
    buttonMiddle.setTexture('button-middle'); // Reset to original texture
  }
  isSwitching = false; // Reset the Switching state
}

    function handleMiddleButtonClick(scene) {
      middleButtonRecentlyPressed = true;
      console.log('mbr'+middleButtonRecentlyPressed)
    
      if(isSwitching){
        hasTriggeredTSquare = true;
        stopSwitching()
        handleShowEasca() 
        setInitialLayout('code'); // Set the initial easca layout to "code"

      }
      if (scene.isMiddleButtonCooldown) return;
      toggleVisibility(scene);
  
      scene.isMiddleButtonCooldown = true;
      setTimeout(() => {
        scene.isMiddleButtonCooldown = false;
      }, 500); // Adjust the delay as needed (500ms in this case)
    }
 
let toggleTimer; // Declare a variable to store the timer ID

function toggleVisibility(scene) {
  if (!scene) return; // Ensure scene exists

  // Check if the elements are defined before attempting to toggle visibility
  if (scene.translucentBg && scene.featherIcon && scene.collisionTextEng) {
    const isVisible = scene.translucentBg.visible;

    // If the elements are not visible, show them
    if (!isVisible) {
      console.log('Starting timer to hide elements after a fewseconds.');
      
      // Make the elements visible and reset their alpha to 1 (fully visible)
      scene.translucentBg.setVisible(true).setAlpha(0.6);
      scene.featherIcon.setVisible(true).setAlpha(1);
      scene.collisionTextEng.setVisible(true).setAlpha(1);

      // Clear any existing timer before starting a new one
      if (toggleTimer) {
        clearTimeout(toggleTimer);
      }

      // Start a 5-second timer to fade out after 5 seconds
      toggleTimer = setTimeout(() => {
        console.log('Fading out elements over 3 seconds.');
        
        // Animate alpha from 1 to 0 over 3 seconds (fade out)
        scene.tweens.add({
          targets: [scene.translucentBg, scene.featherIcon, scene.collisionTextEng],
          alpha: 0,        // Fade to completely invisible
          duration: 3500,  // Over 3 seconds
          onComplete: () => {

            // After the fade-out is complete, hide the elements
            scene.translucentBg.setVisible(false);
            scene.featherIcon.setVisible(false);
            scene.collisionTextEng.setVisible(false);
            middleButtonRecentlyPressed = false;
     console.log('mbr'+middleButtonRecentlyPressed)

            console.log('Elements hidden after fade-out.');
          }
        });
      }, 3500);
    } else {
      // If elements are currently visible, clear the timer and stop the fading
      console.log('Elements are visible, clearing the timer and stopping fade-out.');
      if (toggleTimer) {
        clearTimeout(toggleTimer);
      }
      // Stop any ongoing tweens (fading animations)
      scene.tweens.killTweensOf([scene.translucentBg, scene.featherIcon, scene.collisionTextEng]);

      // Immediately hide the elements
      scene.translucentBg.setVisible(false);
      scene.featherIcon.setVisible(false);
      scene.collisionTextEng.setVisible(false);
    }
  } else {
    console.error("Scene elements are not defined");
  }
}
let tapTimeoutId = null; // Timer ID for tap detection
const tapThreshold = 500; // Time threshold for distinguishing tap vs. hold

function handleButtonInput(direction) {
  
  // Determine the pressed direction and set cursors accordingly
  if (direction === 'left') {
    this.cursors.left.isDown = true;
    // Start the tap detection timer
    tapTimeoutId = setTimeout(() => {
setisHolding(true);      console.log('isHolding? '+isHolding);
    }, tapThreshold);

  } 
  else if (direction === 'right') {
    this.cursors.right.isDown = true;
    // Start the tap detection timer
    tapTimeoutId = setTimeout(() => {
      setisHolding(true);      console.log('isHolding? '+isHolding);
      console.log('Right button is being held down.');
    }, tapThreshold);
  }
  else if (direction === 'up') {
    this.cursors.up.isDown = true;
    // Start the tap detection timer
    tapTimeoutId = setTimeout(() => {
      setisHolding(true);      console.log('isHolding? '+isHolding);
      console.log('up button is being held down.');
    }, tapThreshold);
  }
  else if (direction === 'down') {
    this.cursors.down.isDown = true;
    // Start the tap detection timer
    tapTimeoutId = setTimeout(() => {
      setisHolding(true);      console.log('isHolding? '+isHolding);
      console.log('Right button is being held down.');
    }, tapThreshold);
  }


  // No movement is triggered here, we only check for tap/hold state
}

function handleButtonInputRelease(direction) {
  if (direction === 'left' || direction === 'right'|| direction === 'up'|| direction === 'down') {
    this.cursors[direction].isDown = false;
    
    // Clear the tap detection timer
    clearTimeout(tapTimeoutId);

    if (!isHolding) {
      console.log(`${direction} button tapped!`); // Log short tap
    } else {
      console.log(`${direction} button released!`); // Log hold
    }

    // Reset holding state
setisHolding(false)  }
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

function movePlayer(direction, isHold) {
  const tileSize = 32;
  let nextMove = { x: this.player.x, y: this.player.y };

  // Set target position based on the direction
  if (direction === 'left') {
    nextMove.x -= tileSize;
  } else if (direction === 'right') {
    nextMove.x += tileSize;
  } else if (direction === 'up') {
    nextMove.y -= tileSize;
  } else if (direction === 'down') {
    nextMove.y += tileSize;
  }

  if (direction === 'up' || direction === 'down' || isHold) {
    // Glide for up/down or hold
    this.tweens.add({
      targets: this.player,
      x: nextMove.x,
      y: nextMove.y,
      duration: 200,
      onComplete: () => {
        if (this.cursors[direction].isDown && isHold) {
          movePlayer.call(this, direction, true); // Repeat slide if holding
        }
      },
    });
  } else {
    // Bobbing effect for taps on left/right
    this.tweens.add({
      targets: this.player,
      x: nextMove.x,
      y: nextMove.y - 5,
      duration: 100,
      yoyo: true,
      onComplete: () => {
        this.isMoving = false;
      },
    });
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
if(middleButtonRecentlyPressed){
  this.textForFadeEng.setVisible(true) 
}   else{
  this.textForFadeEng.setVisible(false) 
}


 const moveInterval = 40;

    //waves
    this.frameSkipCounter++;
    if (this.frameSkipCounter >= this.framesToSkip) {

      this.waves.forEach((wave, index) => {
        wave.y -= this.waveSpeed * 200 * (delta / 1000); // Move each wave up with bigger steps (multiplied by 2)


        if (wave.y < -150) { // Check if the wave has moved off the top of the screen
          wave.y = this.scale.height; // Reposition wave to the bottom when it moves off the top
        }
      });
    
      // Update black waves
      this.blackWaves.forEach((blackWave, index) => {
        blackWave.y += this.waveSpeed * 600 * (delta / 1000); // Move black wave downward
        
        if (blackWave.y > this.scale.height) { // Check if the black wave has moved off the bottom
          blackWave.y = -30; // Reposition black wave to the top
        }
      });
      this.frameSkipCounter = 0; // Reset the counter after movement
    }

    
    if (time > this.collisionMessageTimer) {
      this.collisionText.setText('');
      this.collisionTextEng.setText('');
      this.collisionText.setBackgroundColor(null);
    }

    if (this.isMoving) {
      if (!isHoldingRef.current) { 
      // Set initial value for bobCounter if it doesn't already exist
      this.bobCounter = this.bobCounter || 0.0;
    
      // Update player.x to move smoothly towards nextMove.x
      this.player.x = Phaser.Math.Linear(this.player.x, this.player.nextMove.x, 0.2);
    
      // Calculate smooth movement toward nextMove.y without the bobbing effect
      const baseY = Phaser.Math.Linear(this.player.y, this.player.nextMove.y, 0.2);
    
      // Apply bobbing effect only if moving left or right
      if (this.cursors.left.isDown || this.cursors.right.isDown) {
        const arcAmplitude = 2; // Maximum height of arc
        const arcFrequency = 0.4; // Frequency of the bobbing effect
        this.bobCounter += arcFrequency; // Increment bobCounter for sine wave calculation
    
        // Calculate bobbing effect based on sine wave
        const bobbingEffect = Math.sin(this.bobCounter) * arcAmplitude;
    
        // Combine forward movement with bobbing effect for Y position
        this.player.y = baseY - bobbingEffect; // Bobbing occurs while moving forward
      } else {
        this.player.y = baseY; // Just move without bobbing if no directional input
        this.bobCounter = 0; // Reset bobCounter to ensure clean motion when player stops
      }
    
      // Check if player has reached the target position
      if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.player.nextMove.x, this.player.nextMove.y) < 1) {
        this.player.x = this.player.nextMove.x;
        this.player.y = this.player.nextMove.y;
        this.isMoving = false;
        this.moveDelay = time + moveInterval;
        
        // Reset ripple flag and hide borders if applicable
        rippleTriggered.current = false;
        if (this.borderGraphics) {
          this.borderGraphics.setVisible(false);
        }
      }
      
      return; // Exit early if still moving
    } else  if (isHoldingRef.current) { 
      // Set initial value for bobCounter if it doesn't already exist
      this.bobCounter = this.bobCounter || 0.0;
    
      // Update player.x to move smoothly towards nextMove.x
      this.player.x = Phaser.Math.Linear(this.player.x, this.player.nextMove.x, 0.2);
    
      // Calculate smooth movement toward nextMove.y without the bobbing effect
      const baseY = Phaser.Math.Linear(this.player.y, this.player.nextMove.y, 0.2);
    
      // Apply bobbing effect only if moving left or right
      if (this.cursors.left.isDown || this.cursors.right.isDown) {
        const arcAmplitude = 0; // Maximum height of arc
        const arcFrequency = 0; // Frequency of the bobbing effect
        this.bobCounter += arcFrequency; // Increment bobCounter for sine wave calculation
    
        // Calculate bobbing effect based on sine wave
        const bobbingEffect = Math.sin(this.bobCounter) * arcAmplitude;
    
        // Combine forward movement with bobbing effect for Y position
        this.player.y = baseY - bobbingEffect; // Bobbing occurs while moving forward
      } else {
        this.player.y = baseY; // Just move without bobbing if no directional input
        this.bobCounter = 0; // Reset bobCounter to ensure clean motion when player stops
      }
    
      // Check if player has reached the target position
      if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.player.nextMove.x, this.player.nextMove.y) < 1) {
        this.player.x = this.player.nextMove.x;
        this.player.y = this.player.nextMove.y;
        this.isMoving = false;
        this.moveDelay = time + moveInterval;
        
        // Reset ripple flag and hide borders if applicable
        rippleTriggered.current = false;
        if (this.borderGraphics) {
          this.borderGraphics.setVisible(false);
        }
      }
      
      return; // Exit early if still moving
    }
  }   

    
    if (time < this.moveDelay) {
      return; // Wait until move delay is over
    }

    let creature = null; // Global variable to hold the creature instance

    function emergeCreature() {
      hasInteractedWithSerpent = true;
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
            // createRipple.call(this, 370, 560);
            
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

// Check if Easca is active; if so, ignore directional input
if (!eascaActive) {
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
}

    if (playerStepsInWater()) {
      createRipple.call(this, this.player.x, this.player.y); 
       // Make sure `this` is bound correctly
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
     // Center the collision text locally
     const textWidth = this.collisionText.width; // Get the updated width of the text
     const canvasWidth = this.cameras.main.width; // Get canvas width
     this.collisionText.setX((canvasWidth - textWidth) / 2); // Center the text
 

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

  const cornerRadius = 10; 
  // Show border around the collision square
  const borderX = collision.x * tileSize;
  const borderY = collision.y * tileSize;
  this.borderGraphics.clear();
  this.borderGraphics.setVisible(true);
  this.borderGraphics.strokeRoundedRect(borderX, borderY + 10, tileSize, tileSize, cornerRadius);

  // Hide the border after a brief delay
  this.time.delayedCall(200, () => {
    this.borderGraphics.setVisible(false);
  });

  // Update textForFade only if it's not already fading
  if (!this.isFading) {
    this.textForFade.setText(collisionMessage);  // Set the text
  this.textForFadeEng.setText(collisionMessageEng)

  this.textForFadeEng.setText(collisionMessageEng)
  this.textForFadeEng.setAlpha(1);                // Make it fully visible

    this.textForFade.setAlpha(1);                // Make it fully visible
    this.isFading = true;  // Lock the fading process to prevent updates
    const textWidth = this.textForFade.width; // Get the updated width of the text
    const canvasWidth = this.cameras.main.width; // Get canvas width
    this.textForFade.setX((canvasWidth - textWidth) / 2); // Center the text

    // Fade out the textForFade over 3 seconds
    this.tweens.add({

      targets: [this.textForFade, this.textForFadeEng],
      alpha: 0,
      duration: 2500,  // 3 seconds fade
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
  

// Check if the message text is empty and set background color accordingly
if (collisionMessage === '' ) {

}

  return; // Exit early if there's a collision
}

// Check for non-blocking interactions
const interactiveObject = checkInteraction(nextMove, this.interactiveObjects, tileSize);
if (interactiveObject) {

  if(interactiveObject.type==="illuminate"){
    handleTSquareCollision();
  }
  if(interactiveObject.type==="noPic"){
    stopSwitching();
  }
  
  
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
    const textWidth = this.collisionText.width; // Get the updated width of the text
    const canvasWidth = this.cameras.main.width; // Get canvas width
    this.collisionText.setX((canvasWidth - textWidth) / 2); // Center the text



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
   
    {
     showNarrative &&
     (
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
   <div className="player-message-container">
                    <div className="player-message">{message}</div>
                    <div className="tail" /> {/* Speech bubble tail */}
                    </div>
                    </div>
    
<img id="portrait" rel="preload" src={ portrait}></img>
                    <div className="portrait-mode-text-container">

<p className="menu portrait-mode-txt quote-1 ga">

    Fead air fuar-luirg.

</p>
<p className="menu portrait-mode-txt quote-2">
Whistling on cold track.
</p>
<p className="menu portrait-mode-txt quote-3">
A wild goose chase - no scent.
</p>

<p className="menu portrait-mode-txt quote-4">

↻ mobile landscape to continue 
</p>
<p className='portrait-mode-text'>

<br/>
    
</p>
</div>
{showEasca && <Easca onSendMessage={handleSendMessage} initialLayout={initialLayout} />}
    </>
  );
};

export default BallyGamBoy;
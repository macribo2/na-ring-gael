import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import geaga1 from '../../images/go-full-screen-bg-0.png'; // Assuming wordPairs.js is in the same directory
import './bally.css'
import Easca from '../easca/easca2';
import Narrative1 from '../../components/Narrative0/Narrative1'
import portrait from '../../images/vert-bg3.png'
import TorchEmitters from './TorchEmitters';
import { useHistory, useLocation  } from 'react-router-dom';

let torchEmitters = null;
let backgroundLit;
const BallyGamWest = () => {

    let middleButtonRecentlyPressed = false


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
  

  const [message, setMessage] = useState("");


  
  const appHistory = useHistory(); // Correct for react-router-dom v5

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
}, [isHolding, appHistory]);

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
    this.load.image('featherIcon', '/phaser-resources/images/feather.png');

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
    this.load.image('background', '/phaser-resources/images/background-elements/doonsheen-west.png');
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


  const location = useLocation();



  const backgroundRef = React.useRef(null);
  function create() {
    


    const mapLayout = [
      ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
      ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
      ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a'],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a'],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a'],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a'],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','x'],
      ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','x'],
      ['x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a'],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a'],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a'],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a','a','a'],
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
const startColumn = 23; // Horizontal position on the grid (1-25)
const startRow = 12; // Vertical position on the grid (1-18)

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
  this.buttonMiddle = this.add.sprite(0, 0, 'button-middle').setInteractive().setDepth(23).setScrollFactor(0).setAlpha(0);
  gameRef.current.buttonMiddle = this.buttonMiddle; // Store reference for later use
    this.buttonMiddle.on('pointerdown', () =>{ handleMiddleButtonClick(this)
  this.buttonMiddle.setTexture('button-middle-lit'); // Swap to pressed texture

    });

    this.buttonLeft = this.add.sprite(0, 0, 'button-left').setInteractive().setDepth(22).setScrollFactor(0).setAlpha(0);
    this.buttonDown = this.add.sprite(0, 0, 'button-down').setInteractive().setDepth(22).setScrollFactor(0).setAlpha(0);
    this.buttonRight = this.add.sprite(0, 0, 'button-right').setInteractive().setDepth(22).setScrollFactor(0).setAlpha(0);
    this.buttonUp = this.add.sprite(0, 0, 'button-up').setInteractive().setDepth(22).setScrollFactor(0).setAlpha(0);
  
    // Set up the camera
    this.cameras.main.setZoom(2); 
    // this.cameras.main.ignore([this.buttonLeft,this.buttonRight,this.buttonDown,this.buttonUp,this.buttonMiddle])
    // Set camera bounds to the size of the map
    this.cameras.main.setBounds(0, 0, bgWidth, bgHeight);
   

// Initially set the main camera to zoom level 2
this.cameras.main.setZoom(2);
this.cameras.main.startFollow(this.player, true,0.1,0.1); // Follow the player

// Transition the camera zoom from 2 to 1 over 2 seconds
this.tweens.add({
    targets: this.cameras.main,
    zoom: 1,
    duration: 3000, // 2 seconds
    ease: 'Cubic.easeIn',
    onComplete: () => {
  
        // After the zoom transition, fade in the directional pad elements
        this.tweens.add({
            targets: [this.buttonDown, this.buttonLeft, this.buttonMiddle, this.buttonRight, this.buttonUp], // All directional buttons
            alpha: { from: 0, to: 1 },
            duration: 1500, // 1.5 seconds fade-in
            ease: 'Linear',

            onStart: () => {

                // Make sure buttons are initially invisible and only fade in after the zoom
                [this.buttonDown, this.buttonLeft, this.buttonMiddle, this.buttonRight, this.buttonUp].forEach(button => {
                    button.setAlpha(0).setVisible(true);
                });
            }
        });
    }
});


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
this.featherIcon = this.add.sprite(120, 230, 'featherIcon').setOrigin(0).setScale(0.6).setAlpha(1).setInteractive().setDepth(999).setVisible(false).setScrollFactor(0) ; // Make the sprite interactive
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
    if (msg === "ls" ) {
     alert('ls')
      
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



let textureInterval = null; // Store the interval ID
let isSwitching = false; // Flag to control Switching state





    function handleMiddleButtonClick(scene) {

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



function update(time, delta) {
if(middleButtonRecentlyPressed){
  this.textForFadeEng.setVisible(true) 
}   else{
  this.textForFadeEng.setVisible(false) 
}


 const moveInterval = 40;

    
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

  
// Check for collision
const collision = checkCollision(nextMove, this.obstacles, tileSize);
if (collision) {



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



  
  //exit area
    if(interactiveObject.type==="exit"){
      appHistory.push({
        pathname: "/ballygamboy",
        state: { startColumn: 2, startRow: 13 } // Send specific starting position
      });
  
    }
  

    // Set messages for other interactive objects
    this.collisionText.setText(interactiveObject.name);
    this.collisionTextEng.setText(interactiveObject.nameEng);
    const textWidth = this.collisionText.width; // Get the updated width of the text
    const canvasWidth = this.cameras.main.width; // Get canvas width
    this.collisionText.setX((canvasWidth - textWidth) / 2); // Center the text



  
  this.collisionMessageTimer = time + this.collisionMessageDuration;
}

// Move the player if there's no collision
this.player.nextMove = nextMove;
this.isMoving = true; 




}


function updateButtonPositions(scene) {
  const padding = 20;
  const buttonSize = 100;
  const screenWidth = scene.scale.width;
  const screenHeight = scene.scale.height;

  const buttonX = screenWidth - padding - buttonSize-50;
  const buttonY = screenHeight - padding - buttonSize;


  // Update positions
  scene.buttonMiddle.setPosition(buttonX, buttonY).setScale(1);
  scene.buttonLeft.setPosition(buttonX - buttonSize / 2, buttonY).setScale(1);
  scene.buttonDown.setPosition(buttonX, buttonY + buttonSize / 2).setScale(1);
  scene.buttonRight.setPosition(buttonX + buttonSize / 2, buttonY).setScale(1);
  scene.buttonUp.setPosition(buttonX, buttonY - buttonSize / 2).setScale(1);

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
   
  
{/*      
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
            )} */}
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

export default BallyGamWest;
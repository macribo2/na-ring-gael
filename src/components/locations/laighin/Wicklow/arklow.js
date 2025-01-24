import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import geaga1 from '../../../../images/go-full-screen-bg-0.png'; // Assuming wordPairs.js is in the same directory
// import './bally.css'
import Easca from '../../../easca/easca2';
import Narrative1 from '../../../../components/Narratives/Narrative1'
import portrait from '../../../../images/vert-bg3.png'
import { useHistory, useLocation  } from 'react-router-dom';

let backgroundLit;
const Arklow = () => {

  const [triggeredSingleUseEvents, setTriggeredSingleUseEvents] = useState(new Set());

  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('triggeredEvents') || '[]');
    setTriggeredSingleUseEvents(new Set(storedEvents));
  }, []); // Run only once when the component mounts

  // Function to update the set and save to localStorage
  const addTriggeredEvent = (event) => {
    setTriggeredSingleUseEvents(prev => {
      const updatedEvents = new Set(prev).add(event);
      localStorage.setItem('triggeredEvents', JSON.stringify(Array.from(updatedEvents)));
      return updatedEvents;
    });
  };

  // Save to localStorage on unmount to ensure state is preserved
  useEffect(() => {
    return () => {
      localStorage.setItem('triggeredEvents', JSON.stringify(Array.from(triggeredSingleUseEvents)));
    };
  }, [triggeredSingleUseEvents]);

  const handleSingleUseEvent = (eventKey) => {
    if (this.triggeredEvents.has(eventKey)) {
        // Event has already been triggered, skip showing the message
        return;
    }

    // Show the message (replace this with your message display logic)
    console.log(`Triggering event: ${eventKey}`);

    // Add the event to the set and update localStorage
    this.triggeredEvents.add(eventKey);
    localStorage.setItem('triggeredEvents', JSON.stringify(Array.from(this.triggeredEvents)));
};
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (document.fullscreenElement) {
        console.log('Fullscreen: true');
      } else {
        console.log('Fullscreen: false');
      }
    }, 1000); // Check every 1000ms (1 second)
  
    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  
  let middleButtonRecentlyPressed = false

  const [isEmittersReady, setEmittersReady] = useState(false);
  
  let hasInteractedWithSerpent = false; // To track if the player has interacted with the serpent
  let hasTriggeredTSquare = false; // To track if the player has already triggered the "t" square
  const [initialLayout, setInitialLayout] = useState("easca"); // Default to "easca"
  
  const [eascaActive, setEascaActive] = useState(false); 
  const [showEasca, setShowEasca] = useState(false); // 
  
  const [isHolding, setisHolding] = useState(false); 
  
  const location = useLocation();
  
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

    this.load.image('cloud0', '/phaser-resources/images/foreground-elements/cloud0.png');
    this.load.image('cloud1', '/phaser-resources/images/foreground-elements/cloud1.png');
    this.load.image('cloud2', '/phaser-resources/images/foreground-elements/cloud2.png');

    this.load.image('bridge', '/phaser-resources/images/foreground-elements/bridge.png');
    this.load.image('river0', '/phaser-resources/images/foreground-elements/river0.png');
    this.load.image('river1', '/phaser-resources/images/foreground-elements/river1.png');
    this.load.image('river2', '/phaser-resources/images/foreground-elements/river2.png');
    this.load.image('torches', '/phaser-resources/images/foreground-elements/torches.png');
    this.load.image('textBackground', '/phaser-resources/images/sprites/textBackground.png');
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
    this.load.image('background', '/phaser-resources/images/background-elements/arklow.png');
    this.load.image('foreground', '/phaser-resources/images/foreground-elements/arklow-overlay.png');
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
    this.load.image('translucentBg', '/phaser-resources/images/background-elements/black.png'); // Replace with the path to your say image

    
    
  }
  
  




  const textBackgroundRef = React.useRef(null);
  const backgroundRef = React.useRef(null);
  function create() {

   // Create an array to store clouds
   this.clouds = [];
    // Create a few clouds with random starting positions
    for (let i = 0; i < 3; i++) {
      const cloud = this.add.sprite(Phaser.Math.Between(0, this.cameras.main.width), this.cameras.main.height+160, `cloud${Phaser.Math.Between(0, 2)}`);
          cloud.setScale(3).setDepth(14); // Adjust size as necessary
          cloud.setOrigin(0.5, 1);
      this.clouds.push(cloud);
  }

      // Set up a timed event to animate the clouds
      this.time.addEvent({
        delay: 30, // Move every 30 ms (so it moves smoothly)
        callback: moveClouds,
        callbackScope: this,
        loop: true // Repeats the function continuously
    });
    this.riverFrames = ['river0', 'river1', 'river2']; // Define a pattern
    this.riverIndex = 0; // Start from the first frame

      // Create a single river sprite at the desired position
      this.river = this.add.sprite(596, 256, this.riverFrames[this.riverIndex]).setDepth(3); // Start with 'river0'
      this.bridge = this.add.sprite(647, 55, 'bridge').setDepth(4); // Start with 'river0'
      this.bridge = this.add.sprite(550, 390, 'bridge').setDepth(4); // Start with 'river0'

      this.time.addEvent({
        delay: 300, // Adjust for desired speed
        callback: animateRiver,
        callbackScope: this,
        loop: true
    });

  
const canvasWidth = this.cameras.main.width;


    this.triggeredEvents = new Set(JSON.parse(localStorage.getItem('triggeredEvents') || '[]'));

   
    const mapLayout = [
      ['a','i','j','k',' ',' ',' ','a','b','l','q','f','g','h','i','j','k','m',' ',' ','e',' ','a','b','h','j','j','l','m','n','a','b','i','  a','a',' ',' ',' ',' ','a'],
      ['l',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','e',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a'],
      [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a'],
      [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c',' ',' ',' ','a','a','a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a'],
      [' ','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','a',' ',' ',' ','m','l','k',' ',' ',' ',' ',' ','f','q','g','h',' ','n',' ','a','a'],
      [' ',' ','t',' ',' ',' ',' ',' ','a','b',' ','a','b','a','p','o',' ','c','c','n',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','g','a','a','a','j','a','a',' ','a','a'],
      [' ',' ','t',' ',' ','q','m','c','a','a',' ',' ',' ',' ','a','a','a','c',' ','k','q','f',' ','a','j','a','j','i','h','a','a','g','a','a',' ','k','a','b','a','a'],
      [' ',' ',' ',' ',' ','f','g','a','a','a',' ',' ',' ',' ','a','a','a','c',' ',' ',' ','g','h','i',' ',' ','a','a','a','a','a',' ','h','a',' ','l','a','a','a','a'],
      [' ',' ',' ',' ',' ',' ',' ','h','i','a','a','a','a',' ','n','a','b','c',' ',' ',' ',' ',' ',' ',' ','k','b','a','a','a','f',' ',' ','i',' ',' ','m','n','a','a'],
      [' ',' ',' ',' ',' ',' ',' ',' ',' ','j','q','a','m',' ',' ',' ',' ','c',' ',' ',' ',' ',' ',' ',' ','l',' ','q','f','q',' ',' ',' ',' ',' ',' ',' ',' ','o','e'],
      ['h','g','f',' ',' ',' ',' ',' ',' ',' ',' ','l',' ',' ',' ',' ',' ','c',' ',' ',' ',' ','d',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','p'],
      ['a','a','q',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','e',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','h'],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','e',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a'],
      ['a',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a'],
      ['a','a','n','b','a','n','m',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','c',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a'],
      ['a','a','a',' ',' ',' ',' ',' ',' ','a','b','o','l','f','g',' ',' ',' ','c','c','c',' ',' ','a','h','i','j','k',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','a','a'],
  
  ];    
    const obstacleMap = {
      'c': { type: 'noPic', nameEng: 'Avonmore - the big river', name: 'An Abhainn Mór' },
      'd': { type: 'noPic', nameEng: 'Castle',                     name: 'Caisleán' },
        'a': { type: 'noPic', nameEng: 'You cannot go this way',   name: 'Ní féidir dul an treo seo.' },
  'b': { type: 'noPic', nameEng: 'Path obstructed.',               name: 'Tá an cosán blocáilte.' },
  'f': { type: 'noPic', nameEng: 'Can’t go further.',              name: 'Ní féidir dul níos faide.' },
  'g': { type: 'noPic', nameEng: 'Impassable terrain.',            name: 'Talamh dosháraithe.' },
  'h': { type: 'noPic', nameEng: 'Thick undergrowth here.',        name: 'Fásra tiubh anseo.' },
  'i': { type: 'noPic', nameEng: 'No way through here.',           name: 'Níl bealach tríd anseo.' },
  'j': { type: 'noPic', nameEng: 'There is no path here.',         name: 'Níl aon cosán anseo.' },
  'k': { type: 'noPic', nameEng: 'A wall of thorny branches.',     name: 'Balla géaga deilgneacha.' },
  'l': { type: 'noPic', nameEng: 'You cannot go this way.',        name: 'Ní féidir dul an treo seo.' },
  'm': { type: 'noPic', nameEng: 'The brambles block you.',        name: 'Cuireann driseacha bac ort.' },
  'n': { type: 'noPic', nameEng: 'The path is impassable.',        name: 'Tá an cosán dosháraithe.' },
  'o': { type: 'noPic', nameEng: 'No way here.',                   name: 'Níl slí anseo.' },
  'p': { type: 'noPic', nameEng: 'No way ahead.',                  name: 'Níl slí romhat.' },
  'q': { type: 'noPic', nameEng: 'Dense forest ahead.',            name: 'Foraois dhlúth romhat.' },
  

        'r': { type: 'noPic', nameEng: '', name: 'Arklow Dún Lochlanach \n       ró-dhlúth anseo.      ' },
    
      
      
      };

           
           
           
           
           /*
           IF AN EVENT SHOULD ONLY BE TRIGGERED ONCE IT GOES HERE
           */
          const singleUseEventMap = {
            
            'k': { type: 'noPic', nameEng: 'Who knows what lies ahead', name: 'Cá bhfios \ncad atá romhat' },
          }
          
          const interactiveMap = {
    'e': { type: 'terrain', nameEng: 'a bridge', name: 'Droichead' },
        ' ': { type: 'noPic', nameEng: '', name: '' },
        'x':{type: 'exit', nameEng:'falling!',name:'ag titim!'} ,
        'z':{type: 'exitNorthWest', nameEng:' ',name:' '} ,
        'y':{type: 'exitSouthWest', nameEng:' ',name:' '} ,
        't':{type: 'terrain', nameEng:'Mine Cursed! Keep out!',name:'Mianach mallaithe! Fan amach!'} 


    };

    // Initialize a set to track triggered single-use events
// Initialize a set to track triggered single-use events
// Initialize a set to track triggered single-use events
this.triggeredSingleUseEvents = new Set(
  JSON.parse(localStorage.getItem('triggeredSingleUseEvents') || '[]')
);
this.obstacles = [];
this.interactiveObjects = []; // New array for interactive objects
this.singleUseEvents = [];

// Process the map layout
mapLayout.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
        const obstacle = obstacleMap[cell];
        const interactive = interactiveMap[cell];
        const singleUseEvent = singleUseEventMap[cell];

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

            if (singleUseEvent) {
            const eventKey = `${colIndex}-${rowIndex}`; // Unique key for this event
            if (!this.triggeredSingleUseEvents.has(eventKey)) {
                this.singleUseEvents.push({
                    type: singleUseEvent.type,
                    x: colIndex,
                    y: rowIndex,
                    nameEng: singleUseEvent.nameEng,
                    name: singleUseEvent.name,
                    key: eventKey
                });
              }
        }
    });
});


      
    const tileSize = 32;
    const gridWidth = 40; // Number of tiles in width
    const gridHeight = 16; // Number of tiles in height
    const bgWidth = tileSize * gridWidth;
    const bgHeight = tileSize * gridHeight;
    // Initialize borderGraphics
    this.borderGraphics = this.add.graphics(playerStartX, playerStartY, 'border');;
    this.borderGraphics.setDepth(99); // Optional: Set depth if needed

    textBackgroundRef.current= this.add.image(0, 0, 'textBackground').setVisible(false)
    .setOrigin(0, 0) // Align to top-left
    .setScrollFactor(0)
    .setDepth(19) // Slightly below the text
    .setDisplaySize(canvasWidth, 100); // Fullscreen width, fixed height (adjust as needed)
  // Add the background image

    backgroundRef.current = this.add.tileSprite(0, 0, bgWidth, bgHeight, 'background');
    this.foreground = this.add.tileSprite(0, 0, bgWidth, bgHeight, 'foreground').setDepth(9);
    this.foreground.setOrigin(0, 0);
    backgroundRef.current.setOrigin(0, 0);
  // Specify starting column and row

  // Default startColumn and startRow
  const defaultStartColumn = 4;
  const defaultStartRow = 10;

  // Use passed values if available, otherwise fall back to defaults
  const startColumn = location.state && location.state.startColumn ? location.state.startColumn : defaultStartColumn;
  const startRow = location.state && location.state.startRow ? location.state.startRow : defaultStartRow;

  // Calculate player's starting coordinates
  const playerStartX = startColumn * tileSize + tileSize / 2;
  const playerStartY = startRow * tileSize + tileSize / 2;


    this.player = this.add.sprite(playerStartX, playerStartY, 'player').setDepth(7); // Start near the center of the grid
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
  
      if (obstacle.type === 'noPic') {
        sprite.setAlpha(0); // Make the sprite invisible
      }
    });
  
    // Create a say graphic
    this.sayGraphic = this.add.sprite(0, 0, 'say');
    this.sayGraphic.setAlpha(0); // Initially invisible
    this.sayGraphic.setDepth(89); // Ensure it is above other elements
      // Add the translucent background and English text
    
    this.collisionTextEng = this.add.text(20, 160, '', {
      fontSize: '4em',
      fill: 'lime',
      fontFamily: 'Ubuntu',
      padding: { x: 10, y: 10 },
      stroke: '#000000',
      strokeThickness: 3
    }).setScrollFactor(0).setVisible(false).setDepth(90);

    

    
    this.collisionText = this.add.text(200, -90, '', {
      fontSize: '4em', // Larger font size
      fill: 'black', // Text color
      fontFamily: 'aonchlo', // Use 'aonchlo' font for player text
      padding: { x: 10, y: 10 },
      align: 'center', // Align the text to center
      // backgroundColor: '#f5deb3', // Creamy parchment color (Background color)
    }).setScrollFactor(0).setDepth(90);
    



    
    this.textForFade = this.add.text(200, -90, '', {
      fontSize: '4em', // Larger font size
      fill: 'black', // Text color
      fontFamily: 'aonchlo', // Use 'aonchlo' font for player text
      padding: { x: 10, y: 10 },
      align: 'center', // Align the text to center
      // backgroundColor: '#f5deb3' // Same background color for consistency
    }).setScrollFactor(0).setDepth(20);
  
   
    this.textForFadeEng = this.add.text(20, 160, '', {
      fontSize: '4em',
      fill: 'lime',
      fontFamily: 'Ubuntu',
      padding: { x: 10, y: 10 },
      stroke: '#000000',
      strokeThickness: 3,
      align:'left'
    }).setScrollFactor(0).setDepth(90)

       
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
    // this.cameras.main.setZoom(2); // Zoom in 2x
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
    this.translucentBg = this.add.tileSprite(this.cameras.main.width / 2, this.cameras.main.height / 2, bgWidth, bgHeight, 'translucentBg').setScale(3).setDepth(45);
     
// Feather icon in the bottom left corner
this.featherIcon = this.add.sprite(70, 230, 'featherIcon').setOrigin(0).setScale(0.6).setAlpha(1).setInteractive().setDepth(999).setVisible(false).setScrollFactor(0) ; // Make the sprite interactive
    //  this.translucentBg = this.add.sprite(800, this.cameras.main.height / 2, 'translucentBg');
     this.translucentBg.setVisible(false); // Initially hidden
    this.translucentBg.setAlpha(0.4);
    
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

    // Set up the camera
    this.cameras.main.setZoom(2); 
    // Set camera bounds to the size of the map
    this.cameras.main.setBounds(0, 0, bgWidth, bgHeight);
   

// Initially set the main camera to zoom level 2
this.cameras.main.setZoom(2);
this.cameras.main.startFollow(this.player, true,0.1,0.1); // Follow the player

this.tweens.add({

   targets: this.cameras.main,
  zoom: 1,
  duration: 1000,
  ease: Phaser.Math.Easing.Stepped,
  easeParams: [16], // The number of steps you want
  onUpdate: (tween, target) => {
      // Logically "step" if needed, or just let it run
  },
  onComplete: () => {
      this.tweens.add({
          targets: [this.buttonDown, this.buttonLeft, this.buttonMiddle, this.buttonRight, this.buttonUp],
          alpha: { from: 0, to: 1 },
          duration: 1000,
          ease: 'Linear',
          onStart: () => {
              [this.buttonDown, this.buttonLeft, this.buttonMiddle, this.buttonRight, this.buttonUp].forEach(button => {
                  button.setAlpha(0).setVisible(true);
              });
          }
      });
  }
});
  }


// Function to move the clouds
function moveClouds() {
  this.clouds.forEach(cloud => {
      cloud.x += 0.2; // Move cloud to the right slowly (adjust speed)

      // If the cloud goes off-screen, reset to the left side
      if (cloud.x > this.cameras.main.width+300) {
          cloud.x = -cloud.width-300;
          cloud.setTexture(`cloud${Phaser.Math.Between(0, 2)}`); // Randomly change cloud texture
      }
  });
}
function animateRiver() {
  // Increment the index and wrap around if it exceeds the pattern length
  this.riverIndex = (this.riverIndex + 1) % this.riverFrames.length;

  // Update the texture of the river sprite
  this.river.setTexture(this.riverFrames[this.riverIndex]);
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
          duration: 500,  // Over 3 seconds
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
      }, 2500);
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
const tapThreshold = 300; // Time threshold for distinguishing tap vs. hold

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
  const elem = document.documentElement;

  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen().then(() => {
        setFullscreen(true);
      }).catch((err) => {
        console.error('Error attempting to enable fullscreen mode:', err);
      });
    } else if (elem.webkitRequestFullscreen) { // Safari
      elem.webkitRequestFullscreen();
      setFullscreen(true);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        setFullscreen(false);
      }).catch((err) => {
        console.error('Error attempting to exit fullscreen mode:', err);
      });
    } else if (document.webkitExitFullscreen) { // Safari
      document.webkitExitFullscreen();
      setFullscreen(false);
    }
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
      textBackgroundRef.current.setVisible(false);
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
        
   
      }
      
      return; // Exit early if still moving
    }
  }   

    
    if (time < this.moveDelay) {
      return; // Wait until move delay is over
    }

  
    const tileSize = 32;
    const gridWidth = 40;
    const gridHeight = 16;
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

 


  


    // Initialize a flag in your class constructor or setup method
this.isInWater = false;  // Flag to track if the player is in water


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
      textBackgroundRef.current.setVisible(true);
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
  this.textForFadeEng.setText(collisionMessageEng);

  this.textForFadeEng.setText(collisionMessageEng);
  this.textForFadeEng.setAlpha(1);                // Make it fully visible
  this.textForFade.setAlpha(1);                // Make it fully visible
  
  this.isFading = true;  // Lock the fading process to prevent updates

  const textWidth = this.textForFade.width; // Get the updated width of the text
  const canvasWidth = this.cameras.main.width; // Get canvas width
  this.textForFade.setX((canvasWidth - textWidth) / 2); // Center the text
  this.textForFade.setY(0); // Center the text

  // Delay the fade out by a specified time (e.g., 2 seconds)
  this.time.delayedCall(2500, () => { // 2000 ms delay before starting the fade
    // Fade out the textForFade over 3 seconds
    this.tweens.add({
      targets: [this.textForFade, this.textForFadeEng,],
      alpha: 0,
      duration: 300,  
      ease: 'Linear',
      onComplete: () => {
        this.isFading = false;  // Allow new collisions after fade-out
        textBackgroundRef.current.setVisible(false);  // Hide the background image after the fade-out

      }
    });
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
  if(interactiveObject.type==="exit"){
setTimeout(()=>{ 


  appHistory.push({
    pathname: "/leinster/wicklow/CrystalCaves0",
    state: { startColumn: 4, startRow: 4 } // Send specific starting position
  });
 },250)
  }
 
  if(interactiveObject.type==="terrain"){
    collisionMessage = interactiveObject.name;
    collisionMessageEng = interactiveObject.nameEng;
     // Set the collision messages
  this.collisionText.setText(collisionMessage);
  this.collisionTextEng.setText(collisionMessageEng);
  this.collisionMessageTimer = time + this.collisionMessageDuration;
  // Update textForFade only if it's not already fading
if (!this.isFading) {
  this.textForFade.setText(collisionMessage);  // Set the text
  this.textForFadeEng.setText(collisionMessageEng);

  this.textForFadeEng.setText(collisionMessageEng);
  this.textForFadeEng.setAlpha(1);                // Make it fully visible
  this.textForFade.setAlpha(1);                // Make it fully visible
  
  this.isFading = true;  // Lock the fading process to prevent updates

  const textWidth = this.textForFade.width; // Get the updated width of the text
  const canvasWidth = this.cameras.main.width; // Get canvas width
  this.textForFade.setX((canvasWidth - textWidth) / 2); // Center the text
  this.textForFade.setY(0); // Center the text

  // Delay the fade out by a specified time (e.g., 2 seconds)
  this.time.delayedCall(2500, () => { // 2000 ms delay before starting the fade
    // Fade out the textForFade over 3 seconds
    this.tweens.add({
      targets: [this.textForFade, this.textForFadeEng,],
      alpha: 0,
      duration: 300,  
      ease: 'Linear',
      onComplete: () => {
        this.isFading = false;  // Allow new collisions after fade-out
        textBackgroundRef.current.setVisible(false);  // Hide the background image after the fade-out

      }
    });
  });
}


      textBackgroundRef.current.setVisible(true);


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



// Check for single-use events
const singleUseEvent = checkInteraction(nextMove, this.singleUseEvents, tileSize);
if (singleUseEvent) {
    const eventKey = `${singleUseEvent.x}-${singleUseEvent.y}`; // Unique key for this event

    if (!this.triggeredSingleUseEvents.has(eventKey)) {
        // Mark this event as triggered
        this.triggeredSingleUseEvents.add(eventKey);

        // Update localStorage with the newly triggered event
        localStorage.setItem(
            'triggeredSingleUseEvents',
            JSON.stringify(Array.from(this.triggeredSingleUseEvents))
        );

        // Handle specific single-use event types
        if (singleUseEvent.type === "noPic") {
            // Display the event message
            this.collisionText.setY(0); 

            this.collisionText.setText(singleUseEvent.name || '');

            const textWidth = this.collisionText.width; // Get the updated width of the text
            const canvasWidth = this.cameras.main.width; // Get canvas width
            this.collisionText.setX((canvasWidth - textWidth) / 2); // Center the text
            this.collisionTextEng.setText(singleUseEvent.nameEng || '');
            textBackgroundRef.current.setVisible(true);
            this.time.delayedCall(3000, () => {
              this.tweens.add({
                  targets: this.collisionText,
                  alpha: 0, // Fade out
                  duration: 1000, // Duration of fade (1 second)
                  ease: 'Linear',
                  onComplete: () => {
                    textBackgroundRef.current.setVisible(false)
                      this.collisionText.setBackgroundColor('transparent'); // Reset background
                      this.collisionText.setAlpha(1); // Make it visible again if necessary
                      textBackgroundRef.current.setVisible(false);
                  }
              });
          });
        }
    }
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

  const buttonX = screenWidth - padding - buttonSize-100;
  const buttonY = screenHeight - padding - buttonSize-50;


  // Update positions
  scene.buttonMiddle.setPosition(buttonX, buttonY).setScale(1).setAlpha(0);
  scene.buttonLeft.setPosition(buttonX - buttonSize, buttonY).setScale(1).setAlpha(0);
  scene.buttonDown.setPosition(buttonX, buttonY + buttonSize).setScale(1).setAlpha(0);
  scene.buttonRight.setPosition(buttonX + buttonSize, buttonY).setScale(1).setAlpha(0);
  scene.buttonUp.setPosition(buttonX, buttonY - buttonSize).setScale(1).setAlpha(0);

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

export default Arklow;
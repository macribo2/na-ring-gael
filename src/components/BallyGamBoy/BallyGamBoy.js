import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const BallyGamboyGame = ({ playerGraphic })=> {
  
  //next up ballyfin the town of fin. Ballybofey, fiach's pass. ballymagorry macgorry's townland
  const gameRef = useRef(null);
 let player; // Define player object
let hname= localStorage.getItem('hname')
alert(hname);
  useEffect(() => {
    const initializeGame = () => {
      const config = {
        type: Phaser.AUTO,
        width: window.innerWidth, // Set width to match the window width
    height: window.innerHeight, // Set height to match the window height
    
        scene: {
          preload: preload,
          create: create,
          update: update,
        },
        physics: { // Enable physics system
          default: 'arcade', // Choose the physics engine (e.g., arcade, matter, etc.)
          arcade: {
            // Configure arcade physics
            gravity: { y: 0 }, // Set gravity in the vertical direction (you may adjust this as needed)
            debug: false, // Set to true to enable physics debugging
          },
        },  
        scale: {
          mode: Phaser.Scale.RESIZE, // Resize the game to fill the entire screen
          autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game horizontally and vertically
        },
      };

      gameRef.current = new Phaser.Game(config);
    };

    // Define scene methods
    function preload() {
      this.load.image('player', './phaser-resources/images/champions/11.png');
      this.load.image('background', './phaser-resources/images/placeholders/gamboy.png');
      this.load.image('upButton', './phaser-resources/images/ui/pad-u.png');
      this.load.image('middleButton', './phaser-resources/images/ui/middle-b.png');
      this.load.image('downButton', './phaser-resources/images/ui/pad-d.png');
      this.load.image('leftButton', './phaser-resources/images/ui/pad-l.png');
      this.load.image('rightButton', './phaser-resources/images/ui/pad-r.png');
    }

    function create() {
      // Create the background sprite and set its size to match the game's canvas
      const background = this.add.sprite(0, 0, 'background').setOrigin(0);
      background.displayWidth = this.sys.game.config.width;
      background.displayHeight = this.sys.game.config.height;
      player = this.physics.add.sprite(50, 225, playerGraphic);
  
    const originalPlayer = this.physics.add.sprite(50, 225, player);
    
      // Load player sprite
      // const  = this.physics.add.sprite(50, 225, player);
    
      // Apply the Light2D pipeline (includes grayscale effect)
      // originalPlayer.setPipeline('Light2D');
    
      // Tint the desaturated player sprite to match the background color
      // originalPlayer.setTintFill(0xb2adda, 0xb2adda, 0x9793c1, 0x4c5169);
    
      // Create a duplicate of the original player sprite
      const tintedPlayer = this.add.sprite(originalPlayer.x, originalPlayer.y, 'player');
    
      // Apply the tint to the duplicate sprite
      tintedPlayer.setTintFill(0xb2adda, 0x9793c1, 0x9793c1, 0x726ea0); // Use the hexadecimal color codes here
      tintedPlayer.alpha= 0.84; // Set the transparency (alpha) level
    
      // Create directional pad buttons
      this.upButton = this.add.sprite(750, 250, 'upButton');
      this.downButton = this.add.sprite(750, 350, 'downButton');
      this.leftButton = this.add.sprite(700, 300, 'leftButton');
      this.rightButton = this.add.sprite(800, 300, 'rightButton');
      this.middleButton = this.add.sprite(750, 300, 'middleButton');
    
      // Make buttons interactive
      this.upButton.setInteractive();
      this.downButton.setInteractive();
      this.leftButton.setInteractive();
      this.rightButton.setInteractive();
    
      // Listen for pointer down events on each button
      this.upButton.on('pointerdown', () => {
        // Handle player movement north (up) logic here
        originalPlayer.move('up');
        tintedPlayer.move('up'); // Move the tinted player sprite along with the original player
      });

      // Repeat the above pattern for the other directional buttons
    }
    
    function update() {
      // Update game logic here
    }

    initializeGame();

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  return <div id="ballygamboy-game-container"></div>;
};

export default BallyGamboyGame;

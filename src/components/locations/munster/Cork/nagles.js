import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import './cork.css';

const Nagels = () => {
  const gameRef = useRef(null); // Reference to hold the Phaser game instance

  useEffect(() => {
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
    this.load.json('dialogues', '/phaser-resources/text/dunaree.json');
    this.load.image('sparks', `/phaser-resources/images/spark_02.png`);
    this.load.image('player', `/phaser-resources/images/champions/${champID}.png`);
    this.load.image('background', '/phaser-resources/images/background-elements/fields-and-sky.png');
    this.load.image('rock', '/phaser-resources/images/sprites/rock.png'); // Load the rock image
    this.load.image('tree', '/phaser-resources/images/sprites/tree34.png'); // Load the tree image
    this.load.image('fern', '/phaser-resources/images/sprites/plantGreen_2.png'); // Load the tree image
    this.load.image('treeSlim', '/phaser-resources/images/sprites/tree23.png'); // Load the tree image
    this.load.image('treeRed', '/phaser-resources/images/sprites/tree35.png'); // Load the tree image
    this.load.image('treeHawthorn', '/phaser-resources/images/sprites/treeSmall_green3.png'); // Load the tree image
    this.load.image('treeWillow', '/phaser-resources/images/sprites/willow.png'); // Load the tree image
    this.load.image('noPic', '/phaser-resources/images/sprites/empty.png'); // Load the tree image
    this.load.image('say', '/phaser-resources/images/sprites/say.png'); // Replace with the path to your say image

  }

  function create() {
    const tileSize = 32;
    const gridWidth = 25; // Number of tiles in width
    const gridHeight = 18; // Number of tiles in height
    const bgWidth = tileSize * gridWidth;
    const bgHeight = tileSize * gridHeight;

    this.background = this.add.tileSprite(0, 0, bgWidth, bgHeight, 'background');
    this.background.setOrigin(0, 0);

    // Center the player on the grid
    const playerStartX = Math.floor(gridWidth / 2) * tileSize + tileSize / 2;
    const playerStartY = Math.floor(gridHeight / 2) * tileSize + tileSize / 2;
    this.player = this.add.sprite(playerStartX, playerStartY, 'player'); // Start near the center of the grid
    this.player.setOrigin(0.5, 0.5).setScale(0.5)
    this.cursors = this.input.keyboard.createCursorKeys();

    // Ensure the player stays locked to the grid
    this.player.nextMove = { x: this.player.x, y: this.player.y };
    this.isMoving = false;
    this.moveDelay = 0; // Add a delay for continuous movement

    // Define obstacles with names and positions
    this.obstacles = [
      { type: 'rock', x: 17, y: 4, nameEng:'A rock',name: 'Carraig' },
      { type: 'noPic', x: 18, y: 2, nameEng:'A cliff',name: 'Aill' },
      { type: 'noPic', x: 18, y: 3, nameEng:'A cliff',name: 'Aill' },
      { type: 'noPic', x: 17, y: 1, nameEng:'A cliff',name: 'Aill' },
      { type: 'noPic', x: 17, y: 0, nameEng:'A cliff',name: 'Aill' },
      { type: 'noPic', x: 19, y: 3, nameEng:'A cliff',name: 'Aill' },
      { type: 'noPic', x: 20, y: 4, nameEng:'A cliff',name: 'Aill' },
      { type: 'noPic', x: 20, y: 5, nameEng:'A cliff',name: 'Aill' },
      { type: 'noPic', x: 21, y: 6, nameEng:'A cliff',name: 'Aill' },
      { type: 'noPic', x: 21, y: 7, nameEng:'A cliff',name: 'Aill' },
      { type: 'noPic', x: 21, y: 7, nameEng:'A cliff',name: 'Aill' },
      { type: 'noPic', x: 22, y: 7, nameEng:'A cliff',name: 'Aill' },
      { type: 'noPic', x: 22, y: 8, nameEng:'A cliff',name: 'Aill' },
      { type: 'noPic', x: 22, y: 9, nameEng:'A cliff',name: 'Aill' },
      { type: 'noPic', x: 23, y: 10, nameEng:'A cliff',name: 'Aill' },
      { type: 'noPic', x: 24, y: 11, nameEng:'A cliff',name: 'Aill' },

      { type: 'tree', x: 0, y: 0, nameEng:'Alder',name: 'Fearnóg' },
      { type: 'treeSlim', x: 3, y: 0, nameEng:'Beech',name: 'Feá' },
      { type: 'treeRed', x: 7, y: 0, nameEng:'Ash',name: 'Fuinseog' },
      { type: 'fern', x: 1, y: 4, nameEng:'Bracken', name: 'Raithneach mhór' },
      { type: 'fern', x: 20, y: 9, nameEng:'Buckler fern broad', name: 'Raithneach leathan' },
      { type: 'fern', x: 16, y: 2, nameEng:'Buckler fern hey-scented', name: 'Raithneach chumhra' },
      { type: 'fern', x: 7, y: 10, nameEng:'Wilsons Filmy-fern', name: 'Dallán sléibhe'},
      { type: 'fern', x: 4, y: 4, nameEng:'	Blechnum spicant, Hard fern', name: 'Raithneach chrua' },
      { type: 'tree', x: 14, y: 8, nameEng:'Elm, English', name: 'Leamhán gallda' },
      { type: 'tree', x: 12, y: 4, nameEng:'Chestnut, sweet', name: 'Castán' },
      { type: 'tree', x: 9, y: 6, nameEng:'Blackthorn', name: 'Draighean' },
      { type: 'tree', x: 1, y: 6, nameEng:'Hazel', name: 'Coll' },
      { type: 'tree', x: 5, y: 6, nameEng:'Sycamore', name: 'Seiceamóir' },
      { type: 'treeWillow', x: 8, y: 4, nameEng:'Willow creeping', name: 'Saileach reatha' },

      { type: 'treeWillow', x: 15, y: 10, nameEng:'Willow grey sallow', name: 'Saileach liath' },
      { type: 'treeWillow', x: 21, y: 6, nameEng:'Willow', name: 'Saileánach' },
      { type: 'tree', x: 2, y: 8, nameEng:'Oak, Sessile', name: 'Dair ghaelach' },
      { type: 'treeHawthorn', x: 9, y: 8, nameEng:'Hawthorn', name: 'Sceach gheal' },
      { type: 'tree', x: 11, y: 10, nameEng:'Crab-apple', name: 'Crann fia-úll' },
      { type: 'treeHawthorn', x: 19, y: 10, nameEng:'Hawthrorn', name: 'Sceach gheal' },
      { type: 'tree', x: 1, y: 12,  nameEng:'Oak, Sessile',name: 'Dair ghaelach' },
      { type: 'treeRed', x: 5, y: 12, nameEng:'Maple', name: 'Mailp' },
      { type: 'treeHawthorn', x: 13, y: 12,  nameEng:'Hawthorn',name: 'Sceach gheal' },
      { type: 'tree', x: 6, y: 12, nameEng:'Oak, Sessile', name: 'Dair ghaelach' },
      { type: 'tree', x: 6, y: 13, nameEng:'Horse-Chestnut', name: 'Crann cnó capaill' },
      { type: 'tree', x: 14, y: 14, nameEng:'Chestnut, sweet', name: 'Castán' },
      { type: 'tree', x: 11, y: 16, nameEng:'Oak, Sessile', name: 'Dair ghaelach' },
      { type: 'tree', x: 19, y: 16, nameEng:'Laurel', name: 'Labhras silíní' },
      { type: 'tree', x: 3, y: 16, nameEng:'Oak, Sessile', name: 'Dair ghaelach' },
      { type: 'noPic', x: 13, y: 16, nameEng:'Water',name: 'Uisce' },
      { type: 'noPic', x: 14, y: 16, nameEng:'Water',name: 'Uisce' },
      { type: 'noPic', x: 15, y: 16, nameEng:'Water',name: 'Uisce' },
      { type: 'noPic', x: 13, y: 15, nameEng:'Water',name: 'Uisce' },
      { type: 'noPic', x: 14, y: 15, nameEng:'Water',name: 'Uisce' },
      { type: 'noPic', x: 15, y: 15, nameEng:'Water',name: 'Uisce' },
      
    ];

    
    // Draw obstacles
     // Draw obstacles
     this.obstacles.forEach(obstacle => {
      // Create the sprite for the obstacle
      const sprite = this.add.sprite(obstacle.x * tileSize + tileSize / 2, obstacle.y * tileSize + tileSize / 2, obstacle.type === 'cliff' ? 'noPic' : obstacle.type);
      sprite.setName(obstacle.name);
      
      // Set the alpha for 'cliff' type obstacles
      if (obstacle.type === 'noPic') {
          sprite.setAlpha(0); // Make the sprite invisible
      }
  });



    // Create a say graphic
    this.sayGraphic = this.add.sprite(0,0,'say');
    this.sayGraphic.setAlpha(0); // Initially invisible
    this.sayGraphic.setDepth(10); // Ensure it is above other elements

    // Add text for collision messages with improved styling
    this.collisionText = this.add.text(200, 80, '', {
      fontSize: '26px', // Larger font size
      fill: '#ffffff',  // White color
      fontFamily: 'Arial', // Readable font
      // backgroundColor: '#000000', // Optional background color
      padding: { x: 10, y: 10 }, // Optional padding for better readability
      stroke: '#000000', // Optional stroke color for better contrast
      strokeThickness: 3 // Optional stroke thickness for better contrast
  }).setScrollFactor(0); // Ensures the text does not scroll with the camera
;
    // Timer for collision messages
    this.collisionMessageTimer = 0;
    this.collisionMessageDuration = 2000; // Duration in milliseconds

    drawGrid(this, tileSize, gridWidth, gridHeight);

    const buttonX = this.sys.game.config.width - 150; // Right side of the screen
    const buttonY = this.sys.game.config.height / 2 + 50;

    // Add directional pad buttons with fixed positions
    this.buttonLeft = this.add.sprite(buttonX - 50, buttonY, 'button-left').setInteractive().setDepth(19);
    this.buttonDown = this.add.sprite(buttonX, buttonY + 50, 'button-down').setInteractive().setDepth(19);
    this.buttonRight = this.add.sprite(buttonX + 50, buttonY, 'button-right').setInteractive().setDepth(19);
    this.buttonUp = this.add.sprite(buttonX, buttonY - 50, 'button-up').setInteractive().setDepth(19);
   // Create the border graphics
   this.borderGraphics = this.add.graphics({ lineStyle: { width: 2, color: 0xffff00 } });
   this.borderGraphics.setDepth(10); // Ensure it is above other elements
   this.borderGraphics.setVisible(false); // Initially hidden

    // Add middle button
    this.buttonMiddle = this.add.sprite(buttonX, buttonY, 'button-middle').setInteractive().setDepth(103);

  
     // Set up the camera
    this.cameras.main.setZoom(2); // Zoom in 2x
    this.cameras.main.startFollow(this.player, true); // Follow the player

    // Set camera bounds to the size of the map
    this.cameras.main.setBounds(0, 0, bgWidth, bgHeight);
  }

  function update(time, delta) {
    const moveInterval = 50; // Adjust the delay between moves (milliseconds)

    // Clear the collision message after the duration
    if (time > this.collisionMessageTimer) {
        this.collisionText.setText('');
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

            // Clear the border graphics when movement is complete
            this.borderGraphics.setVisible(false);
        }
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

        // Show the say graphic
        this.sayGraphic.setPosition(this.player.x, this.player.y - 40);
        this.sayGraphic.setAlpha(1).setScale(3);

        // Fade out the say graphic
        this.tweens.add({
            targets: this.sayGraphic,
            alpha: 0,
            duration: 1200,
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
    }

    if (!collisionMessage) {
        this.player.nextMove = nextMove;
        this.isMoving = true;
    } else {
        this.collisionText.setText(collisionMessage); // Set the collision message
        this.collisionMessageTimer = time + this.collisionMessageDuration; // Set the timer
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
    <div id="phaser-container" style={{ width: '800px', height: '480px' }}></div>
  );
};

export default Nagels;

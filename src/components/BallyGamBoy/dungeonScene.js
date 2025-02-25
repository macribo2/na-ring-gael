import Phaser from 'phaser';
import { Map , Path} from 'rot-js';
import { Scheduler, Engine, RNG, FOV } from 'rot-js';
import ActionMenu from '../actionMenu/actionMenu'
import { GameEntity, PlayerEntity } from './entities';
import PhaserEntity from './phaserEntity'
import ControlSquare from '../ControlSquare/ControlSquare';
export default class DungeonScene extends Phaser.Scene {

  constructor() {
    super({ key: 'Dungeon' });
this.lastClickedTile = null;

    this.pathGraphics = null; // Will hold our path drawing graphics
  this.currentPath = [];     // Stores calculated path tiles
  this.lastClickedTile = null; // For click handling
    this.stairGroup = null; // Add this in the constructor
    this.levelCache = new window.Map([]); // Stores generated levels
    this.currentLevel = 1;
    this.playerPositionHistory = new window.Map([]); // Remembers where player entered each level
    this.roomMap = []; // 2D array tracking room IDs
    this.rooms = [];    // Store room references
    this.tileSize = 32;
    this.entities = [];
    this.scheduler = new Scheduler.Simple();
    this.engine = new Engine(this.scheduler);
    this.tiles = null; // Explicit initialization
    this.minRooms = 5;          // Minimum number of rooms to generate
    this.maxAttempts = 50;      // Maximum attempts s
    this.dungeonWidth = 50; // Width of the dungeon
    this.dungeonHeight = 50; // Height of the dungeon
    this.transitioning = false;
     this.stairs = {
      up: null,
      down: null
    };
    this.stairPositions = new Set(); // Track grid positions
    this.lastFOVUpdate = 0;
    this.explored = null;
    this.stairConnections = new window.Map([]); // Track level stair links
 
   
  }
  preload() {
    this.load.image('ciorcal-light', 'phaser-resources/images/ciorcal-glass-light.png')

    this.load.json('menuContent', 'phaser-resources/json/actionMenuContent.json');
    this.load.atlas('championSprites', 'phaser-resources/images/champions0.png', 'phaser-resources/json/champions0.json');
    this.load.image('knotwork', 'phaser-resources/images/rotjs/pathfinding-knot.png');

    this.load.image('bg1','/phaser-resources/images/bg2.png')
    this.load.image('celt-ring','/phaser-resources/images/ui/three-point-wheel.png')

      // Add stair textures
      this.load.spritesheet('stairs_down_texture', '/phaser-resources/images/rotjs/stairs-down.png', { frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet('stairs_up_texture', '/phaser-resources/images/rotjs/stairs-up.png', { frameWidth: 32, frameHeight: 32 });
  
    // Load tilesheet with 32x32 frames arranged in grid
    this.load.spritesheet('dungeon_tiles', '/phaser-resources/images/rotjs/dungeon_tiles_2.png', {
      frameWidth: 32,
      frameHeight: 32,
      margin: 0,
      spacing: 0
    });
    
    this.load.spritesheet('player', '/phaser-resources/images/champions/32.png', {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  setupLighting() {
 
   
  
    this.lights.enable().setAmbientColor(0x222222);
   
   // Create separate layer for ALL wall types
   this.wallLayer = this.add.layer();
   this.tiles.children.each(tile => {
     tile.setPipeline('Light2D');
     
     // Check if tile is any type of wall (including corridor edges)
     if (tile.frame.name >= 100 && tile.frame.name <= 103) {
       this.wallLayer.add(tile);
       tile.setAlpha(1); // Ensure full visibility for walls
     }
   });
     // Create light source
     if (this.player) {
       this.player.light = this.lights.addLight(
         this.player.sprite.x,
         this.player.sprite.y,
         250,
         0xffffff,
         1.5
       );
     }
   
     // Enable lighting on all tiles
     this.tiles.children.each(tile => {
       tile.setPipeline('Light2D');
     });
   }
// Tile type to frame mapping

  stepBack() {
    // Calculate the step back position using previous position
    const stepX = this.player.previousGridX * this.tileSize + this.tileSize / 2;
    const stepY = this.player.previousGridY * this.tileSize + this.tileSize / 2;
    
    // Move the player smoothly
    this.tweens.add({
      targets: this.player.sprite,
      x: stepX,
      y: stepY,
      duration: 150,
      ease: 'Power1',
      onComplete: () => {
        // Update player's grid position to the previous position
        this.player.gridX = this.player.previousGridX;
        this.player.gridY = this.player.previousGridY;
        
        // Update FOV after movement
        if (this.updateFOV) {
          this.updateFOV();
        }
      }
    });
    
    return true; // Successfully stepped back
  }
  showActionMenu(menuKey) {
    console.log(`showActionMenu called with key: ${menuKey}`);
  
    if (!this.actionMenu.menuData) {
      console.error('Menu data is not loaded.');
      return;
    }
  
    const data = this.actionMenu.menuData[menuKey];
  
    if (!data || !data.choices || data.choices.length === 0) {
      console.error(`showActionMenu called with invalid or empty objects array for key: ${menuKey}`);
      return;
    }
    setTimeout(()=>{

      this.stepBack();
    },500)
    console.log('Valid menu data:', data);
  
    // Smoothly zoom out when ActionMenu is shown
    this.tweens.add({
      targets: this.cameras.main,
      zoom: 1,  // Zoom out to normal (1x) for the action menu
      duration: 500, // Duration of the zoom effect
      ease: 'Power2', // Smooth easing
      onComplete: () => {
        // Initialize ActionMenu once the zoom transition is complete
        if (!this.actionMenu) {
          this.actionMenu = new ActionMenu(this).setDepth(500);
        }
        
        // Make sure all elements are visible again
        const elements = [
          this.actionMenu,
          this.actionMenu.overlay,
          this.actionMenu.titleText,
          this.actionMenu.wheel,
          this.actionMenu.buttonFrame,
          this.actionMenu.buttonBase,
          this.actionMenu.spokesContainer
        ];
        this.actionMenu.titleHidden=false;
        this.actionMenu.choicesVisible=false;
        elements.forEach(el => {
          if (el) {
            el.setVisible(true);
            el.setAlpha(1); // Reset alpha since we faded it out
          }
        });
  
        // Open menu after zoom out is complete
        this.actionMenu.showMenu(menuKey);
      }
    });
  
    // Verify method exists
    if (typeof this.actionMenu.showMenu !== 'function') {
      console.error('ActionMenu instance is missing showMenu method!');
    }
  }
// to close the action menu
closeActionMenu() {
  console.log('Closing ActionMenu...');

  const elements = [
    this.actionMenu,
    this.actionMenu.overlay,
    this.actionMenu.titleText,
    this.actionMenu.wheel,
    this.actionMenu.buttonFrame,
    this.actionMenu.buttonBase,
    this.actionMenu.choiceText,
    this.actionMenu.spokesContainer
  ];

  // Fade out UI elements first
  this.tweens.add({
    targets: elements,
    alpha: 0,
    duration: 500,
    ease: 'Linear',
    onComplete: () => {
      // Hide all elements after fade
      elements.forEach(el => el.setVisible(false));


      // Now apply the zoom with a relative value
      this.tweens.add({
        targets: this.cameras.main,
        zoom:  2.5,  // Multiply current zoom for relative zooming
        duration: 500,  
        ease: 'Power2',
        onStart: () => {
        },
        onComplete: () => {
          console.log('Camera zoom complete');
        }})
    }
  });
}

goDownStairs() {
  this.clearPath();
  console.log("===== GOING DOWN STAIRS =====");

  // Prevent multiple transitions
  if (this.transitioning) {
    console.log("Already transitioning, ignoring request");
    return;
  }
  this.transitioning = true;
  console.log("Starting level transition...");

  // Store the current level before transition for reference
  const previousLevel = this.currentLevel;

  // Fade out screen
  this.cameras.main.fadeOut(500, 0, 0, 0);
  console.log("Camera fade out started");

  this.cameras.main.once('camerafadeoutcomplete', async () => {
    console.log("Camera fade out complete");
    
    // Increase level
    this.currentLevel++;
    console.log(`Moving from level ${previousLevel} to level ${this.currentLevel}`);

    // Reload or generate new level
    console.log("Loading new level...");
    await this.loadLevel(); 
    console.log("New level loaded");

    // CRUCIAL CHECK: Log both stairs positions
    console.log("Stairs positions on new level:");
    console.log("Up stairs:", this.stairs.up ? `(${this.stairs.up.x}, ${this.stairs.up.y})` : "None");
    console.log("Down stairs:", this.stairs.down ? `(${this.stairs.down.x}, ${this.stairs.down.y})` : "None");

  // In goDownStairs() after transition:
if (this.stairs.up && this.stairs.down) {
  const distance = Phaser.Math.Distance.BetweenPoints(
    this.stairs.up.sprite,
    this.stairs.down.sprite
  );
  
  if (distance < 500) {
    console.warn("Stairs too close! Up-Down distance:", distance);
  }

}


    // Update FOV for new position
    if (this.updateFOV) {
      console.log("Updating field of view...");
      this.updateFOV();
    }

    // Fade back in
    console.log("Starting camera fade in...");
    this.cameras.main.fadeIn(500);

    // Unlock the game loop after transition
    this.transitioning = false;
    console.log("Transition complete");
    console.log("===== FINISHED GOING DOWN STAIRS =====");
  });
}

findValidAdjacentTile(x, y) {
  const directions = [
    {dx: 1, dy: 0}, {dx: -1, dy: 0}, 
    {dx: 0, dy: 1}, {dx: 0, dy: -1}
  ];

  for (const dir of directions) {
    const checkX = x + dir.dx;
    const checkY = y + dir.dy;
    if (this.isValidStairPosition(checkX, checkY)) {
      return {x: checkX, y: checkY};
    }
  }
  return null;
}
// Add this helper function to debug what's at a specific position
getTileInfo(x, y) {
  // This would need to be adapted to your specific tilemap/layer setup
  if (this.map && this.groundLayer) {
    const tile = this.groundLayer.getTileAt(x, y);
    return tile ? `Tile index: ${tile.index}` : "No tile at position";
  }
  return "Unable to get tile info";
}
  getSpiralWalkableTiles(startX, startY, maxRadius) {
    console.log(`===== SPIRAL SEARCH =====`);
    console.log(`Starting search from: (${startX}, ${startY}) with max radius: ${maxRadius}`);
    
    const validTiles = [];
    
    // Check the starting point first
    console.log(`Checking center tile (${startX}, ${startY})`);
    if (this.isWalkable(startX, startY)) {
      if (!this.isTileStairs(startX, startY)) {
        console.log(`✅ Center tile (${startX}, ${startY}) is valid`);
        validTiles.push({
          x: startX,
          y: startY,
          distance: 0
        });
      } else {
        console.log(`❌ Center tile (${startX}, ${startY}) is stairs - skipping`);
      }
    } else {
      console.log(`❌ Center tile (${startX}, ${startY}) is not walkable`);
    }
    
    // Search in expanding rings
    for (let r = 1; r <= maxRadius; r++) {
      console.log(`\nSearching radius ${r}...`);
      let tilesFoundInThisRadius = 0;
      
      // Check tiles in a square ring at distance r
      for (let x = -r; x <= r; x++) {
        for (let y = -r; y <= r; y++) {
          // Only check tiles exactly at distance r (forming a square perimeter)
          if (Math.max(Math.abs(x), Math.abs(y)) === r) {
            const checkX = startX + x;
            const checkY = startY + y;
            
            console.log(`Checking tile (${checkX}, ${checkY})`);
            
            if (this.isWalkable(checkX, checkY)) {
              if (!this.isTileStairs(checkX, checkY)) {
                console.log(`✅ Tile (${checkX}, ${checkY}) is valid`);
                validTiles.push({
                  x: checkX,
                  y: checkY,
                  distance: Math.abs(x) + Math.abs(y) // Manhattan distance
                });
                tilesFoundInThisRadius++;
              } else {
                console.log(`❌ Tile (${checkX}, ${checkY}) is stairs - skipping`);
              }
            } else {
              console.log(`❌ Tile (${checkX}, ${checkY}) is not walkable`);
            }
          }
        }
      }
      
      console.log(`Found ${tilesFoundInThisRadius} valid tiles at radius ${r}`);
    }
  
    console.log(`\nTotal valid tiles found: ${validTiles.length}`);
    
    // Sort by distance from stairs
    const sortedTiles = validTiles.sort((a, b) => a.distance - b.distance);
    
    if (sortedTiles.length > 0) {
      console.log(`Closest tile is (${sortedTiles[0].x}, ${sortedTiles[0].y}) with distance ${sortedTiles[0].distance}`);
    } else {
      console.log(`No valid tiles found in search!`);
    }
    
    console.log(`===== END SPIRAL SEARCH =====`);
    
    return sortedTiles;
  }
  
  // Helper function to check if a tile is stairs
  isTileStairs(x, y) {
    // Check if the coordinates match any of the stairs
    const isUp = this.stairs.up && this.stairs.up.x === x && this.stairs.up.y === y;
    const isDown = this.stairs.down && this.stairs.down.x === x && this.stairs.down.y === y;
    
    if (isUp || isDown) {
      console.log(`Tile (${x}, ${y}) is ${isUp ? 'upstairs' : 'downstairs'}`);
      return true;
    }
    return false;
  }





    
setupFOV() {
  this.fov = new FOV.PreciseShadowcasting((x, y) => {
    return this.map[x] && this.map[x][y] === 0;

  });
}


isWalkable(x, y) {
  return this.map[x] && this.map[x][y] === 0;
}

pathfindTo(targetX, targetY) {
  // If clicked on the same tile, start moving player
  if (this.lastClickedTile && this.lastClickedTile.x === targetX && this.lastClickedTile.y === targetY) {
    this.movePlayerAlongPath();
    return;
  }

  // Clear previous path
  this.currentPath = [];
  this.pathGraphics.clear();

  // Get player's grid position
  const playerTileX = Math.floor(this.player.sprite.x / this.tileSize);
  const playerTileY = Math.floor(this.player.sprite.y / this.tileSize);

  // Create A* instance
  const astar = new Path.AStar(
    targetX,
    targetY,
    (x, y) => this.isWalkable(x, y),
    { topology: 4 } // 4-direction movement
  );

  // Compute path
  astar.compute(playerTileX, playerTileY, (x, y) => {
    this.currentPath.push({ x, y });
  });

  // Remove starting position
  if (this.currentPath.length > 0) {
    this.currentPath.shift();
  }

  // Validate the path
  if (!this.isPathValid()) {
    console.log('Path is invalid');
    return; // Exit if path is not valid
  }

  // Store the clicked target tile for future movement
  this.lastClickedTile = { x: targetX, y: targetY };

  // Draw the path
  this.drawPath();
}
movePlayerAlongPath() {
  this.clearPath(); // Clear the path once the player starts moving

  // Check if there's a valid path to follow
  if (this.currentPath.length === 0) return;

  // Clear any ongoing path drawing
  this.pathGraphics.clear();

  // Move the player step by step using tweens
  const moveNext = () => {
    if (this.currentPath.length === 0) return;

    const nextTile = this.currentPath.shift(); // Get the next tile in the path
    const targetX = nextTile.x * this.tileSize + this.tileSize / 2;
    const targetY = nextTile.y * this.tileSize + this.tileSize / 2;
    
    // Save previous position before moving
    this.player.previousGridX = this.player.gridX;
    this.player.previousGridY = this.player.gridY;
    
    // Calculate direction to the next tile
    const currentX = this.player.sprite.x;
    const currentY = this.player.sprite.y;
    
    // Determine the primary direction of movement
    const dx = targetX - currentX;
    const dy = targetY - currentY;
    
    // Set facing direction based on the more significant axis of movement
    if (Math.abs(dx) > Math.abs(dy)) {
      this.player.facingDirection = { x: Math.sign(dx), y: 0 };
    } else {
      this.player.facingDirection = { x: 0, y: Math.sign(dy) };
    }

    // Start tween to move the player to the next tile
    this.tweens.add({
      targets: this.player.sprite,
      x: targetX,
      y: targetY,
      duration: 200, // Duration of each move (in milliseconds)
      ease: 'Linear', // Smooth linear transition
      onComplete: () => {
        // Update player's grid position
        this.player.gridX = nextTile.x;
        this.player.gridY = nextTile.y;
        
        // Call moveNext again if there are more steps in the path
        if (this.currentPath.length > 0) {
          moveNext();
        }
      }
    });
  };

  moveNext();
}
isPathValid() {
  // Loop through all tiles in the current path to validate each one
  for (let i = 0; i < this.currentPath.length; i++) {
    const tile = this.currentPath[i];
    if (!this.isWalkable(tile.x, tile.y)) {
      console.log(`Tile at (${tile.x}, ${tile.y}) is not walkable.`);
      return false; // Return false if any tile is not walkable
    }
  }
  return true; // Return true if all tiles are walkable
}

drawPath() {
  // Clear previous path first
  this.pathGroup.clear(true, true);

  if (this.currentPath.length === 0) return;

  let previous = {
    x: this.player.sprite.x + this.tileSize / 2,
    y: this.player.sprite.y + this.tileSize / 2
  };

  // Loop through the current path and add images one by one with a fade-in effect
  this.currentPath.forEach((tile, index) => {
    const x = tile.x * this.tileSize + this.tileSize / 2;
    const y = tile.y * this.tileSize + this.tileSize / 2;

    // Draw line segment connecting path nodes
    // this.pathGraphics.lineBetween(previous.x, previous.y, x, y);

    // Add knotwork image at the path node
    const knotworkImage = this.add.image(x, y, 'knotwork')
      .setAlpha(0).setOrigin(0.5,1.5);  // Start with the image invisible

    // Add the knotwork image to pathGroup for management
    this.pathGroup.add(knotworkImage);

    // Fade in the image with a tween
    this.tweens.add({
      targets: knotworkImage,
      alpha: 1,    // Fade to fully visible
      duration: 200 + index * 100,  // Stagger the fade-in slightly
      ease: 'Linear',
      onComplete: () => {
        // Optionally, you can run logic after each image finishes fading in
      }
    });

    previous = { x, y };
  });
}

// Call this to clear the path images
clearPath() {
  // Clear all images in the path group after tweening is complete
  this.pathGroup.clear(true, true); // Clear pathGroup after all images fade in
}

update() {
  if (this.actionMenu) {
    this.actionMenu.update();
  }
  if (this.player) {
    // Smooth light movement
    this.player.light.x = Phaser.Math.Linear(
      this.player.light.x, 
      this.player.sprite.x, 
      0.2
    );
    this.player.light.y = Phaser.Math.Linear(
      this.player.light.y, 
      this.player.sprite.y, 
      0.2
    );
    
    // Update FOV more efficiently
    if (Date.now() - this.lastFOVUpdate > 100) {
      this.updateFOV();
      this.lastFOVUpdate = Date.now();
    }
  }
  this.handleStairInteraction();
}


updateFOV() {
  if (!this.tiles || !this.player) return;

  // Initialize explored array to match current map dimensions
  if (!this.explored || 
      this.explored.length !== this.map.length || 
      this.explored[0].length !== this.map[0].length
  ) {
    this.explored = Array.from({ length: this.map.length }, () => 
      Array(this.map[0].length).fill(false)
    );
  }

  const [px, py] = [
    Math.floor(this.player.sprite.x / this.tileSize),
    Math.floor(this.player.sprite.y / this.tileSize)
  ];

  // Reset visibility with bounds checking
  this.tiles.getChildren().forEach(tile => {
    const x = Math.floor(tile.x / this.tileSize);
    const y = Math.floor(tile.y / this.tileSize);
    
    if (x >= 0 && y >= 0 && x < this.map.length && y < this.map[0].length) {
      tile.alpha = this.explored[x][y] ? 0.5 : 0.0;
    } else {
      tile.alpha = 0.0; // Hide out-of-bounds tiles
    }
  });

  // Compute new FOV with bounds checking
  this.fov.compute(px, py, 8, (x, y, r, visibility) => {
    if (x >= 0 && y >= 0 && x < this.map.length && y < this.map[0].length) {
      this.explored[x][y] = true;
      const tile = this.tiles.getChildren().find(t => 
        Math.floor(t.x / this.tileSize) === x &&
        Math.floor(t.y / this.tileSize) === y
      );
      if (tile) {
        tile.alpha = Math.min(visibility + 0.3, 1);
      }
    }
  });
}
getTileFrame(tileValue, x, y) {
  const variants = {
    0: { // Floor tiles
      center: [21, 22, 23, 41, 42, 43, 61, 62, 63],
      north: [1, 2, 3],
      south: [81, 82, 83],
      west: [20, 30, 40],
      east: [24, 34, 44],
      corners: {
        nw: 0,
        ne: 4,
        sw: 80,
        se: 84
      }
    },
    1: { // Wall tiles
      center: [91], // Center wall tiles
      north: [101,102,103],  // North edge wall tiles
      south: [91], // South edge wall tiles
      west: [91], // West edge wall tiles
      east: [91], // East edge wall tiles
      corners: {
        nw: 101, // North-West corner wall tile
        ne: 101, // North-East corner wall tile
        sw: 91, // South-West corner wall tile
        se: 91  // South-East corner wall tile
      }
    },
    2: 6,
    3: 7
  };

  // Handle non-floor tiles first (Walls)
  if (tileValue === 1) {
    // Check surrounding wall structure
    const isNorthEdge = y > 0 && this.map[x][y - 1] !== 1;
    const isSouthEdge = y < this.map[0].length - 1 && this.map[x][y + 1] !== 1;
    const isWestEdge = x > 0 && this.map[x - 1][y] !== 1;
    const isEastEdge = x < this.map.length - 1 && this.map[x + 1][y] !== 1;

    // Check corners first
    if (isNorthEdge && isWestEdge) return variants[1].corners.nw;
    if (isNorthEdge && isEastEdge) return variants[1].corners.ne;
    if (isSouthEdge && isWestEdge) return variants[1].corners.sw;
    if (isSouthEdge && isEastEdge) return variants[1].corners.se;

    // Check edges
    if (isNorthEdge) return Phaser.Math.RND.pick(variants[1].north);
    if (isSouthEdge) return Phaser.Math.RND.pick(variants[1].south);
    if (isWestEdge) return Phaser.Math.RND.pick(variants[1].west);
    if (isEastEdge) return Phaser.Math.RND.pick(variants[1].east);

    // Default to center tile
    return Phaser.Math.RND.pick(variants[1].center);
  }

  // Existing floor tile logic
  const roomId = this.roomMap[x][y];
  if (roomId === -1) return Phaser.Math.RND.pick(variants[0].center); // Corridor

  const room = this.rooms[roomId];
  const bounds = {
    left: room.getLeft(),
    right: room.getRight(),
    top: room.getTop(),
    bottom: room.getBottom()
  };

  // Check if tile is on room edge
  const isNorthEdge = y === bounds.top;
  const isSouthEdge = y === bounds.bottom;
  const isWestEdge = x === bounds.left;
  const isEastEdge = x === bounds.right;

  // Check corners first
  if (isNorthEdge) {
    if (isWestEdge) return variants[0].corners.nw;
    if (isEastEdge) return variants[0].corners.ne;
    return Phaser.Math.RND.pick(variants[0].north);
  }

  if (isSouthEdge) {
    if (isWestEdge) return variants[0].corners.sw;
    if (isEastEdge) return variants[0].corners.se;
    return Phaser.Math.RND.pick(variants[0].south);
  }

  if (isWestEdge) return variants[0].west[0];
  if (isEastEdge) return variants[0].east[0];

  // Default to center tile
  return Phaser.Math.RND.pick(variants[0].center);
}

  setupTouchInput() {
    this.input.on('pointerdown', (pointer) => {
      // Convert to world coordinates first
      const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
      
      // Then to tile coordinates
      const tileX = Math.floor(worldPoint.x / this.tileSize);
      const tileY = Math.floor(worldPoint.y / this.tileSize);
      
      this.pathfindTo(tileX, tileY);
    });
  }

  createRoomMap(dungeon) {
    const roomMap = Array.from({ length: this.dungeonWidth }, () => 
      Array(this.dungeonHeight).fill(-1)
    );
    dungeon.getRooms().forEach((room, id) => {
      room.create((x, y) => roomMap[x][y] = id);
    });
    // return roomMap;
      // Clear previous state FIRST
    this.stairPositions.clear();
    this.rooms = [];
    this.roomMap = [];
    
    if (this.stairs.up) {
      this.stairs.up.destroy();
      this.stairs.up = null;
    }
    if (this.stairs.down) {
      this.stairs.down.destroy();
      this.stairs.down = null;
    }
      const mapWidth = Math.floor(this.scale.width / this.tileSize);
      const mapHeight = Math.floor(this.scale.height / this.tileSize);
      
      // Create empty map filled with walls (1)
      this.map = Array.from({ length: mapWidth }, () => 
        Array.from({ length: mapHeight }, () => 1)
      );
    
      // Digger configuration
      this.dungeon = new Map.Digger(mapWidth, mapHeight, {
          roomWidth: [6, 10],       // More reasonable sizes
          corridorLength: [3, 5],
          dugPercentage: 0.4,       // Balanced value
          roomCount: [5, 8]         // Explicit room range
        });
    
      // Create unified callback
      this.dungeon.create((x, y, wall) => {
        this.map[x][y] = wall ? 1 : 0; // Direct ROT.js -> Phaser map sync
      });
  
  
  
    let validDungeon = false;
    
    do {
      // Recreate fresh Digger instance on each attempt
      this.dungeon = new Map.Digger(mapWidth, mapHeight, {
        roomWidth: [4, 8],         // Smaller minimum size
        corridorLength: [2, 5],    // Shorter corridors
        dugPercentage: 0.6,        // Increased from 0.3
        roomCount: [5, 9]          // Explicit minimum of 5 rooms
      });
  
      this.dungeon.create((x, y, wall) => {
        this.map[x][y] = wall ? 1 : 0;
      });
  
      this.rooms = this.dungeon.getRooms();
      attempts++;
      
    } while (this.rooms.length < 2 && attempts < 5);
  
    if (this.rooms.length < 2) {
      // Fallback: Create emergency rooms
      this.createEmergencyRooms();
    }
  
    // Generate base dungeon
    let attempts = 0;
    do {
      // ... dungeon generation attempts ...
    } while (this.rooms.length < 2 && attempts < 5);
  
    // Add emergency rooms if needed
    if (this.rooms.length < 2) {
      this.createEmergencyRooms();
    }
  
    // FINALIZE ROOM DATA BEFORE STAIR PLACEMENT
    this.rooms = this.dungeon.getRooms();
    this.roomMap = Array.from({ length: mapWidth }, () => 
      Array(mapHeight).fill(-1)
    );
    
    this.rooms.forEach((room, roomId) => {
      room.create((x, y) => {
        this.roomMap[x][y] = roomId;
      });
    });
  
    // NOW PLACE STAIRS
    if (this.rooms.length >= 2) {
      this.createStairsInRoom(this.rooms[0], 'down');
      this.createStairsInRoom(this.rooms[1], 'up');
    } else if (this.rooms.length === 1) {
      // ... single room handling ...
    }
  
  
    
      // Store rooms and mark their areas
      this.rooms = this.dungeon.getRooms();
      this.rooms.forEach((room, roomId) => {
        room.create((x, y) => {
          this.roomMap[x][y] = roomId;
        });
      });
    
    
    // Post-generation check
    let wallCount = 0;
    let floorCount = 0;
    
    this.map.forEach(col => col.forEach(cell => {
      cell === 1 ? wallCount++ : floorCount++;
    }));
  
    console.log(`Map Stats - Walls: ${wallCount}, Floors: ${floorCount}`);
    console.assert(wallCount > 0 && floorCount > 0, "Invalid map generation");
  
    // After generating rooms
    this.rooms = this.dungeon.getRooms();
    
    // Validate rooms exist
    if (this.rooms.length < 2) {
      throw new Error("Not enough rooms generated for stair placement!");
    }
  
  
  }
  createEmergencyRooms() {
      // Use proper ROT.js feature constructor
      const Room = Map.Room;
      
      // Clear existing rooms
      this.dungeon._rooms = [];
    
      // Create valid rooms with proper bounds
      const safeRooms = [
        new Room(5, 5, 8, 8),  // x, y, width, height
        new Room(35, 35, 8, 8)
      ];
    
      // Add to digger and update maps
      safeRooms.forEach(room => {
        this.dungeon._rooms.push(room);
        room.create((x, y) => {
          if (x >= 0 && y >= 0 && x < this.map.length && y < this.map[0].length) {
            this.map[x][y] = 0;
            this.roomMap[x][y] = this.dungeon._rooms.indexOf(room);
          }
        });
      });
    
      // Update rooms reference
      this.rooms = this.dungeon.getRooms();
    }





  create() {
    
    this.keys = this.input.keyboard.addKeys({
      interact: Phaser.Input.Keyboard.KeyCodes.E // Or your chosen key
    });
    const characterSheetData = localStorage.getItem('characterSheet');
    if (!characterSheetData) {
        console.warn("No characterSheet found in local storage.");
        return;
    }
  
    const characterSheet = JSON.parse(characterSheetData);
    console.log("HEY " + characterSheet.spriteKey);
  
    // Validate spriteKey
    const spriteKey = characterSheet.spriteKey;
    if (!spriteKey) {
        console.warn("Invalid spriteKey in characterSheet.");
        return;
    }
  
    // Validate the texture exists
    const textureExists = this.textures.exists('championSprites');
    if (!textureExists) {
        console.warn("Texture 'championSprites' does not exist. Please preload it.");
        return;
    }
  
    this.input.addPointer(1); // For multi-touch
    
   
    this.cameras.main.setZoom(1); // Initial zoom level
  
  
  
    this.pathGroup = this.add.group(); // Create a new group for path elements
  
    const Light2DPipeline = Phaser.Renderer.WebGL.Pipelines.Light2DPipeline;
  
    if (!this.renderer.pipelines.get('Light2D')) {
        const Light2DPipeline = Phaser.Renderer.WebGL.Pipelines.Light2DPipeline;
        this.renderer.pipelines.add('Light2D', new Light2DPipeline(this.game));
    }
  
    this.tiles = this.add.group();
    this.generateDungeon();
    this.drawMap(); 
    this.setupFOV();
  
    this.createPlayer(characterSheet); // Pass the characterSheet to the player creation function
    this.setupInput();
    this.engine.start();
  
    const stairsDown = { type: 'stairs', direction: 'down' };
    const stairsUp = { type: 'stairs', direction: 'up' };
  
    this.setupLighting();
  
  
    this.pathGraphics = this.add.graphics()
    .setDepth(9999)
    .setDefaultStyles({
        lineStyle: { width: 3, color: 0x00FF00, alpha: 0.8 },
        fillStyle: { color: 0xFF0000, alpha: 0.5 }
    });
  
    this.setupTouchInput(); 
  
  
    console.log("ActionMenu instance:", this.actionMenu);
  
    // Collision check to trigger action menu
    this.physics.add.overlap(
      this.player.sprite, 
      this.stairs.down.sprite, 
      () => {
        console.log('Stair collision detected!');
        this.showActionMenu('stairsDown'); // Open menu when colliding
      },
      null,
      this
    );
    let menuKey = 'defaultMenu';
      
      
    this.actionMenu = new ActionMenu(this, menuKey, this.closeActionMenu.bind(this));
    this.add.existing(this.actionMenu).setDepth(6000); // Add to the scene, but stays hidden
    
    if (!this.cache.json.exists('menuContent')) {
      throw new Error('Menu data failed to load');
    }
    
    if (typeof this.actionMenu.showMenu !== 'function') {
      console.error('ActionMenu instance is missing showMenu method!');
    }
    
    
  }
  createPlayer(characterSheet) {
    const startRoom = this.dungeon.getRooms()[0];
  
    // Get random walkable position within starting room
    const getWalkablePosition = () => {
      const x = Phaser.Math.Between(startRoom.getLeft() + 1, startRoom.getRight() - 1);
      const y = Phaser.Math.Between(startRoom.getTop() + 1, startRoom.getBottom() - 1);
      return this.map[x][y] === 0 ? [x, y] : getWalkablePosition();
    };
  
    const [x, y] = getWalkablePosition();
  
    // ✅ Corrected: Ensure `scene` is passed to `PlayerEntity`
    this.player = new PlayerEntity(this, x, y); 
  
    // ✅ Create Phaser sprite (linked to player entity)
    this.player.sprite = this.add.sprite(x * this.tileSize, y * this.tileSize, 'championSprites', 'player_idle_0').setOrigin(0.5,0.9);
  
    // ✅ Store grid position in player entity
    this.player.gridX = x;
    this.player.gridY = y;
    this.player.previousGridX = x; 
    this.player.previousGridY = y;
  
    // ✅ Add physics body
    this.physics.add.existing(this.player.sprite);
    this.player.sprite.body.setSize(32, 32).setOffset(4, 8);
  
    // ✅ Add player to turn scheduler
    this.scheduler.add(this.player, true);
  
    // ✅ Set camera to follow player
    this.cameras.main.startFollow(this.player.sprite);
  
    // ✅ Set render order
    this.player.sprite.setDepth(100).setScale(0.75);
  
    console.log('Player starts at:', x, y, 'Walkable:', this.map[x][y] === 0);
  
    // ✅ Update player sprite based on character sheet
    if (characterSheet.spriteKey) {
      this.player.sprite.setTexture('championSprites', characterSheet.spriteKey);
    } else {
      console.warn("No spriteKey found to update player texture.");
    }
  }
  

generateDungeon(previousDownStairs) {
  // Initialize core map properties first
  this.dungeonWidth = 40 + (this.currentLevel);
  this.dungeonHeight = 20 + (this.currentLevel);

  // Initialize map arrays
  this.map = Array.from({ length: this.dungeonWidth }, () => 
    Array(this.dungeonHeight).fill(1)
  );
  this.roomMap = Array.from({ length: this.dungeonWidth }, () => 
    Array(this.dungeonHeight).fill(-1)
  );

  // Create new dungeon instance
  this.dungeon = new Map.Digger(
    this.dungeonWidth,
    this.dungeonHeight,
    {
      roomWidth: [4 + this.currentLevel, 8 + this.currentLevel],
      corridorLength: [3, 5 + Math.floor(this.currentLevel/2)],
      dugPercentage: 0.3 + (this.currentLevel * 0.05),
      roomCount: [3 + this.currentLevel, 6 + this.currentLevel]
    }
  );

  // Generate base map
  this.dungeon.create((x, y, wall) => {
    if (x >= 0 && y >= 0 && x < this.dungeonWidth && y < this.dungeonHeight) {
      this.map[x][y] = wall ? 1 : 0;
    }
  });

  // Store and process rooms
  this.rooms = this.dungeon.getRooms();
  let roomId = 0;
  
  // Populate room map with valid rooms
  this.rooms.forEach(room => {
    if (!room || typeof room.create !== 'function') return;
    
    room.create((x, y) => {
      if (x >= 0 && y >= 0 && x < this.dungeonWidth && y < this.dungeonHeight) {
        this.roomMap[x][y] = roomId;
      }
    });
    roomId++;
  });

  // Mark corridors in room map
  this.dungeon.getCorridors().forEach(corridor => {
    if (!corridor || typeof corridor.create !== 'function') return;
    
    corridor.create((x, y) => {
      if (x >= 0 && y >= 0 && x < this.dungeonWidth && y < this.dungeonHeight) {
        this.roomMap[x][y] = -1;
      }
    });
  });

  // Simplified stair connection logic
  if (previousDownStairs) {
    // Connect stairs between levels - create UP stairs at the position of the previous level's DOWN stairs
    const upX = previousDownStairs.x;
    const upY = previousDownStairs.y;
    
    if (this.isValidStairPosition(upX, upY)) {
      this.createStairsAtPosition(upX, upY, 'up');
      
      // Find a different room for the DOWN stairs
      const downRoom = this.findRoomForNewStairs();
      if (downRoom) {
        this.createStairsInRoom(downRoom, 'down');
        console.log(`Connected stairs: Level ${this.currentLevel}`);
        console.log(`Up @ ${upX},${upY} (from previous level's down)`);
        console.log(`Down @ ${downRoom.centerX},${downRoom.centerY}`);
      } else {
        console.error("No valid room found for down stairs!");
      }
    } else {
      console.error("Invalid up stair position from previous level!");
      // Fallback: Create stairs in first two rooms
      if (this.rooms.length >= 2) {
        this.createStairsInRoom(this.rooms[0], 'up');
        this.createStairsInRoom(this.rooms[1], 'down');
      }
    }
  } else {
    // Initial level generation - place stairs in first two rooms
    if (this.rooms.length >= 2) {
      this.createStairsInRoom(this.rooms[0], 'up');
      this.createStairsInRoom(this.rooms[1], 'down');
    }
  }
}

// Make sure this method for checking stair positions is implemented properly
isValidStairPosition(x, y) {
  // Check if coordinates are within bounds
  if (x < 0 || y < 0 || x >= this.dungeonWidth || y >= this.dungeonHeight) {
    return false;
  }
  
  // Check if position is walkable (not a wall)
  return this.isWalkable(x, y);
}

// Add this method to handle player interactions with stairs
handleStairInteraction() {
  // Skip if no player or no stairs
  if (!this.player || (!this.stairs.up && !this.stairs.down)) {
    return;
  }

  const playerX = this.player.sprite.x;
  const playerY = this.player.sprite.y;
  let interactedStairs = null;

  // Check if player is near up stairs
  if (this.stairs.up) {
    const upStairsX = this.stairs.up.sprite.x;
    const upStairsY = this.stairs.up.sprite.y;
    const distance = Phaser.Math.Distance.Between(playerX, playerY, upStairsX, upStairsY);
    
    if (distance < this.tileSize) {
      interactedStairs = { type: 'up', x: Math.floor(upStairsX / this.tileSize), y: Math.floor(upStairsY / this.tileSize) };
    }
  }

  // Check if player is near down stairs
  if (this.stairs.down) {
    const downStairsX = this.stairs.down.sprite.x;
    const downStairsY = this.stairs.down.sprite.y;
    const distance = Phaser.Math.Distance.Between(playerX, playerY, downStairsX, downStairsY);
    
    if (distance < this.tileSize) {
      interactedStairs = { type: 'down', x: Math.floor(downStairsX / this.tileSize), y: Math.floor(downStairsY / this.tileSize) };
    }
  }

  // Process stair interaction
  if (interactedStairs && this.input.keyboard.checkDown(this.keys.interact, 500)) {
    if (interactedStairs.type === 'down') {
      // Save current down stairs info for connection
      const previousDownStairs = {
        x: interactedStairs.x,
        y: interactedStairs.y,
        level: this.currentLevel
      };
      
      // Increment level and load new one
      this.currentLevel++;
      console.log(`Descending to level ${this.currentLevel}...`);
      this.loadLevel(previousDownStairs);
    } else if (interactedStairs.type === 'up' && this.currentLevel > 1) {
      // Decrement level and load previous one
      this.currentLevel--;
      console.log(`Ascending to level ${this.currentLevel}...`);
      this.loadLevel(); // No need to pass stairs info when going up
    }
  }

}

// Update loadLevel to accept previous stairs info
loadLevel(previousDownStairs) {
  // Clear previous level entities
  this.tiles.clear(true, true);
  this.entities.forEach(e => e.destroy());
  this.entities = [];
  
  // Regenerate with fresh dungeon instance, passing previous down stairs info
  this.generateDungeon(previousDownStairs);
  
  // Draw the new level's tiles
  this.drawMap(); 
  this.setupLighting();

  // In loadLevel() update player positioning:
  if (this.stairs.up) {
    const stairGridX = Math.floor(this.stairs.up.sprite.x / this.tileSize);
    const stairGridY = Math.floor(this.stairs.up.sprite.y / this.tileSize);
    
    // Find spawn position adjacent to UPSTAIRS (new level's entry point)
    const spawnPoint = this.findValidSpawn(stairGridX, stairGridY);
    
    if (spawnPoint) {
      this.player.sprite.setPosition(
        spawnPoint.x * this.tileSize + this.tileSize/2,
        spawnPoint.y * this.tileSize + this.tileSize/2
      );
      console.log("Spawned near UPSTAIRS at:", spawnPoint);
    }
  }
  
  // Reset camera follow
  this.cameras.main.startFollow(this.player.sprite);
  this.cameras.main.setZoom(1);

  console.log('Player spawned at:', this.player.gridX, this.player.gridY);
}

  // Fixed findValidSpawn method to avoid recursion
  findValidSpawn(startX, startY, maxRadius = 5) {
    // Spiral out from starting position
    for (let r = 0; r <= maxRadius; r++) {
      for (let x = -r; x <= r; x++) {
        for (let y = -r; y <= r; y++) {
          if (Math.abs(x) === r || Math.abs(y) === r) {
            const checkX = startX + x;
            const checkY = startY + y;
            
            if (this.isWalkable(checkX, checkY)) {
              return {x: checkX, y: checkY};
            }
          }
        }
      }
    }
  
    // If no valid position found, return null
    console.warn("No valid spawn position found near stairs");
    return null;
  }

// Add this new method to find spawn positions
findValidSpawn(startX, startY, maxRadius = 5) {
  // Spiral out from starting position
  for (let r = 0; r <= maxRadius; r++) {
    for (let x = -r; x <= r; x++) {
      for (let y = -r; y <= r; y++) {
        if (Math.abs(x) === r || Math.abs(y) === r) {
          const checkX = startX + x;
          const checkY = startY + y;
          
          if (this.isWalkable(checkX, checkY)) {
            return {x: checkX, y: checkY};
          }
        }
      }
    }
  }

  // Position player near UP stairs (current level's entry point)
  if (this.stairs.up) {
    const stairPos = {
      x: this.stairs.up.sprite.x,
      y: this.stairs.up.sprite.y
    };
    
    const spawnPoint = this.findValidSpawn(
      Math.floor(stairPos.x / this.tileSize),
      Math.floor(stairPos.y / this.tileSize)
    );

    if (spawnPoint) {
      this.player.sprite.setPosition(
        spawnPoint.x * this.tileSize + this.tileSize/2,
        spawnPoint.y * this.tileSize + this.tileSize/2
      );
      console.log("Spawned near UP stairs:", spawnPoint);
    }
 
    this.cameras.main.centerOn(this.player.sprite.x, this.player.sprite.y);
  return null;
}}

createTile(x, y) {
  if (x < 0 || y < 0 || x >= this.map.length || y >= this.map[0].length) return;

  const tileValue = this.map[x][y];
  const frame = this.getTileFrame(tileValue, x, y);
  const isCorridor = this.roomMap[x][y] === -1;

  // Create main tile
  const tile = this.add.sprite(x * this.tileSize, y * this.tileSize, 'dungeon_tiles', frame)
    .setDepth(tileValue === 1 ? 1 : 0).setOrigin(0,0.5);

  // Add corridor bottom edge if applicable
  if (isCorridor && tileValue === 0) {
    const belowY = y + 1;
    if (belowY < this.map[0].length && this.map[x][belowY] === 1) {
      const edgeTile = this.add.sprite(x * this.tileSize, belowY * this.tileSize, 'dungeon_tiles', 101)
        .setOrigin(0,0.5)
        .setDepth(0.9)
        .setPipeline('Light2D'); // Add pipeline here
        
      this.tiles.add(edgeTile); // Add to tiles group
    }
  
  }

  this.tiles.add(tile);
}


  createStairsInRoom(room, type) {
    
    
     // Add boundary checks
  if (!room || 
    room.getLeft() < 0 || 
    room.getRight() >= this.map.length || 
    room.getTop() < 0 || 
    room.getBottom() >= this.map[0].length
) {
  console.error("Invalid room for stair placement");
  return;
}

    // Clear existing stairs of this type
    if (this.stairs[type]) {
      this.stairs[type].destroy();
      this.stairs[type] = null;
    }
  
    // Get valid position within room bounds
    let x, y, attempts = 0;
    do {
      x = Phaser.Math.Between(room.getLeft() + 1, room.getRight() - 1);
      y = Phaser.Math.Between(room.getTop() + 1, room.getBottom() - 1);
      attempts++;
    } while (this.stairPositions.has(`${x},${y}`) && attempts < 100);
  
    const texture = type === 'down' ? 'stairs_down_texture' : 'stairs_up_texture';
    const pixelX = x * this.tileSize;
    const pixelY = y * this.tileSize;
  

  // SINGLE CREATION CALL
  this.stairs[type] = new PhaserEntity(
    this,
    pixelX,
    pixelY,
    texture,
    { type: 'stairs', direction: type },
    false,
    type === 'down',
    type === 'up'
  );

  // Configure depth and lighting
  this.stairs[type].sprite
    .setDepth(10)
    .setPipeline('Light2D').setOrigin(0.5,0.5);

  this.stairPositions.add(`${x},${y}`);
  const stairData = {
    level: this.currentLevel,
    x: x,
    y: y,
    type: type,
    roomId: room.id
  };
  // Store both types of stairs
  this.stairConnections.set(`${this.currentLevel}-${type}`, stairData);
  console.log(`Created ${type} stairs at (${x},${y}) for level ${this.currentLevel}`);

}

findRoomForNewStairs() {
  // Get rooms that don't contain the upstairs
  const upStairsRoomId = this.stairs.up ? this.stairs.up.roomId : undefined;

  const candidateRooms = this.dungeon.getRooms().filter(room => 
    room.id !== upStairsRoomId && this.isValidRoom(room)
  );

  if (candidateRooms.length === 0) {
    console.warn("No valid rooms found for down stairs! Using first room");
    return this.dungeon.getRooms()[0];
  }

  // Prefer larger rooms for down stairs
  const sortedRooms = candidateRooms.sort((a, b) => 
    (b.getRight() - b.getLeft()) * (b.getBottom() - b.getTop()) -
    (a.getRight() - a.getLeft()) * (a.getBottom() - a.getTop())
  );

  return sortedRooms[0];
}

// Add validation helper
isValidRoom(room) {
  return room && 
    room.getLeft() >= 0 &&
    room.getRight() < this.mapWidth &&
    room.getTop() >= 0 &&
    room.getBottom() < this.mapHeight;
}

createStairsAtPosition(x, y, type) {
  // Validate coordinates
  if (!this.isValidStairPosition(x, y)) {
    console.error(`Invalid stair position at (${x},${y})`);
    return;
  }

  // Clear existing stairs of this type
  if (this.stairs[type]) {
    this.stairs[type].destroy();
    this.stairs[type] = null;
  }

  // Create stairs at exact position
  const texture = type === 'down' ? 'stairs_down_texture' : 'stairs_up_texture';
  const pixelX = x * this.tileSize;
  const pixelY = y * this.tileSize;

  this.stairs[type] = new PhaserEntity(
    this,
    pixelX,
    pixelY,
    texture,
    { type: 'stairs', direction: type },
    false,
    type === 'down',
    type === 'up'
  );

  // Configure visual properties
  this.stairs[type].sprite
    .setDepth(10)
    .setPipeline('Light2D');

  // Track position
  this.stairPositions.add(`${x},${y}`);
  console.log(`Created ${type} stairs at (${x},${y})`);
}
// Function to place a gold coin randomly within one of the rooms
placeGoldCoin(rooms) {
  const randomRoom = Phaser.Utils.Array.GetRandom(rooms);

  // Pick a random position inside the room
  const coinX = Phaser.Math.Between(randomRoom.x, randomRoom.x + randomRoom.width - 1);
  const coinY = Phaser.Math.Between(randomRoom.y, randomRoom.y + randomRoom.height - 1);

  // Create the gold coin sprite at the random position
  const coin = this.add.sprite(
      coinX * this.tileSize + this.tileSize / 2,
      coinY * this.tileSize + this.tileSize / 2,
      'goldCoin'
  );

  // Make the coin interactive for pickup
  coin.setInteractive();
  coin.on('pointerdown', () => {
      console.log("Gold coin collected!");
      coin.destroy(); // Destroy the coin after being collected
  });

  console.log(`Gold coin placed at: (${coinX}, ${coinY})`);
}
drawMap() {
  // Clear previous tiles first
  this.tiles.clear(true, true);
  
  // Create new tile group
  this.tiles = this.add.group();

  // Draw floors first
  for(let x = 0; x < this.map.length; x++) {
    for(let y = 0; y < this.map[0].length; y++) {
      if(this.map[x][y] === 0) {
        this.createTile(x, y); 
      }
    }
  }

  // Then draw walls on top
  for(let x = 0; x < this.map.length; x++) {
    for(let y = 0; y < this.map[0].length; y++) {
      if(this.map[x][y] === 1) {
        this.createTile(x, y);
      }
    }
  }
}

    // drawMap() {
    //   this.tiles = this.add.group();
    
    //   // Draw corridors first
    //   this.dungeon.getCorridors().forEach(corridor => {
    //     corridor.create((x, y) => this.createTile(x, y));
    //   });
    
    //   // Draw rooms on top of corridors
    //   this.dungeon.getRooms().forEach(room => {
    //     // Draw floor
    //     room.create((x, y) => this.createTile(x, y));
        
    //     // Draw walls (new addition)
    //     this.createWallsAroundRoom(room);
    //   });
    // }

    createWallsAroundRoom(room) {
      const { x, y, width, height } = room;
      
      // Horizontal walls
      for (let xi = x - 1; xi <= x + width; xi++) {
        this.createTile(xi, y - 1); // Top wall
        this.createTile(xi, y + height); // Bottom wall
      }
    
      // Vertical walls
      for (let yi = y; yi < y + height; yi++) {
        this.createTile(x - 1, yi); // Left wall
        this.createTile(x + width, yi); // Right wall
      }
    }

    createRoom(room) {
      // Get proper bounds from ROT.js room object
      const bounds = {
        left: room.getLeft(),
        right: room.getRight(),
        top: room.getTop(),
        bottom: room.getBottom()
      };

      
    
      // Visualize room center
      const centerX = (bounds.left + bounds.right) * 0.5 * this.tileSize;
      const centerY = (bounds.top + bounds.bottom) * 0.5 * this.tileSize;
      this.add.circle(centerX, centerY, 5, 0xff0000).setDepth(1000);
    }

    setupInput() {
      const moves = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
      };
    
      window.addEventListener("keydown", async (event) => {
        const direction = moves[event.key];
        if (direction) {
          console.log(this.player); // Debugging: Check if player is correctly initialized
    
          this.engine.lock();  // Locking the engine for movement
          try {
            // Ensure this.player is an instance of PlayerEntity
            if (this.player && typeof this.player.move === 'function') {
              await this.player.move(...direction); // Move the player
            } else {
              console.error('Player move method is undefined');
            }
          } catch (error) {
            console.error("Player move failed", error);
          }
          this.engine.unlock();  // Unlocking after movement
        }
      });
    }
    

}
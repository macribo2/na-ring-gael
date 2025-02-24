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
  
    
    
   
  }

  setupStairCollisions() {
    // Clean up existing group
    // if (this.stairGroup) {
    //   this.stairGroup.clear(true, true);
    // } else {
    //   this.stairGroup = this.physics.add.staticGroup();
    // }
  
    // // Clear existing overlaps
    // this.physics.world.overlap(this.player.sprite, this.stairGroup);
  
    // Handle up stairs
    if (this.stairs.up && this.stairs.up.sprite) {
      // this.stairGroup.add(this.stairs.up.sprite);
      // this.physics.add.overlap(
      //   this.player.sprite,
      //   this.stairs.up.sprite,
      //   () => this.handleAscendingStairCollision(),
      //   null,
      //   this
      // );
    }
  
    // Handle down stairs
    if (this.stairs.down && this.stairs.down.sprite) {
      // this.stairGroup.add(this.stairs.down.sprite);
      // this.physics.add.overlap(
      //   this.player.sprite,
      //   this.stairs.down.sprite,
      //   () => this.handleDescendingStairCollision(),
      //   null,
      //   this
      // );

    }
  }

handleDescendingStairCollision() {

}
  async handleStairTransition(direction) {
    // this.transitioning = true;
    
    // // Properly pause the scheduler instead of stopping
    // if (this.engine && typeof this.engine.lock === 'function') {
    //   this.engine.lock();
    // }
  
    // // Visual effects
    // this.cameras.main.fadeOut(500, 0, 0, 0);
  
    // await new Promise(resolve => {
    //   this.cameras.main.once('camerafadeoutcomplete', resolve);
    // });
  
    // // Change level
    // this.currentLevel = direction === 'down' 
    //   ? this.currentLevel + 1 
    //   : Math.max(1, this.currentLevel - 1);
  
    // // Reload level
    // this.loadLevel();
  
    // // Reset camera and restart scheduler
    // this.cameras.main.fadeIn(500);
    // this.transitioning = false;
    
    // if (this.engine && typeof this.engine.unlock === 'function') {
    //   this.engine.unlock();
    // }
    // if (this.engine && typeof this.engine.start === 'function') {
    //   this.engine.start();
    // }
  }


  // Function to move to the next level
  moveToNextLevel() {
    // this.currentLevel++;
    // this.loadLevel();  // Reload or generate the new level
  }

  // Function to move to the previous level
  moveToPreviousLevel() {
    // if (this.currentLevel > 1) {
    //   this.currentLevel--;
    //   this.loadLevel();  // Reload or generate the previous level
    // }
  }


  loadLevel() {
    // Clear previous level entities
    this.tiles.clear(true, true);
    this.entities.forEach(e => e.destroy());
    this.entities = [];
    
    // Reset map dimensions (if using progressive levels)
    this.mapWidth = 80 + (this.currentLevel * 2); // Example progression
    this.mapHeight = 50 + (this.currentLevel * 2);
    
    // Force garbage collection (Phaser-specific)
    this.game.renderer.snapshot(() => {});
    
    // Regenerate with fresh dungeon instance
    this.generateDungeon();
    
    // Verify player position is within new bounds
    this.player.x = Phaser.Math.Clamp(this.player.x, 0, this.mapWidth-1);
    this.player.y = Phaser.Math.Clamp(this.player.y, 0, this.mapHeight-1);
    this.scene.restart();
}
  

  preload() {
    this.load.json('menuContent', 'phaser-resources/json/actionMenuContent.json');
    this.load.atlas('championSprites', 'phaser-resources/images/champions-test.png', 'phaser-resources/json/champions-test.json');
    
    this.load.image('knotwork', 'phaser-resources/images/rotjs/pathfinding-knot.png');

    this.load.image('bg1','/phaser-resources/images/bg2.png')
    this.load.image('celt-ring','/phaser-resources/images/celt-ring.png')

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
// Tile type to frame mapping


createTile(x, y) {
  if (x < 0 || y < 0 || x >= this.map.length || y >= this.map[0].length) return;

  const tileValue = this.map[x][y];
  const frame = this.getTileFrame(tileValue, x, y);
  const isCorridor = this.roomMap[x][y] === -1;

  // Create main tile
  const tile = this.add.sprite(x * this.tileSize, y * this.tileSize, 'dungeon_tiles', frame)
    .setOrigin(0)
    .setDepth(tileValue === 1 ? 1 : 0);

  // Add corridor bottom edge if applicable
  if (isCorridor && tileValue === 0) {
    const belowY = y + 1;
    if (belowY < this.map[0].length && this.map[x][belowY] === 1) {
      const edgeTile = this.add.sprite(x * this.tileSize, belowY * this.tileSize, 'dungeon_tiles', 101)
        .setOrigin(0)
        .setDepth(0.9)
        .setPipeline('Light2D'); // Add pipeline here
        
      this.tiles.add(edgeTile); // Add to tiles group
    }
  
  }

  this.tiles.add(tile);
}
create() {
    
  
  const characterSheetData = localStorage.getItem('characterSheet');
  if (!characterSheetData) {
      return;
  }

  const characterSheet = JSON.parse(characterSheetData);

  // Validate spriteKey
  const spriteKey = characterSheet.spriteKey;
  if (!spriteKey) {
      return;
  }

  // Validate the texture exists
  const textureExists = this.textures.exists('championSprites');
  if (!textureExists) {
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
  this.setupStairCollisions();


  this.pathGraphics = this.add.graphics()
  .setDepth(9999)
  .setDefaultStyles({
      lineStyle: { width: 3, color: 0x00FF00, alpha: 0.8 },
      fillStyle: { color: 0xFF0000, alpha: 0.5 }
  });

  this.setupTouchInput(); 


  this.actionMenu = new ActionMenu(this);
  this.add.existing(this.actionMenu); // Add to the scene, but stays hidden


  // Collision check to trigger action menu
  this.physics.add.overlap(
    this.player.sprite, 
    this.stairs.down.sprite, 
    () => {
      this.showActionMenu('stairsDown'); // Open menu when colliding
    },
    null,
    this
  );

  if (!this.cache.json.exists('menuContent')) {
    throw new Error('Menu data failed to load');
  }

  if (typeof this.actionMenu.showMenu !== 'function') {
  }
}

// Method to show action menu
showActionMenu(menuKey) {

  if (!this.actionMenu.menuData) {
    return;
  }

  const data = this.actionMenu.menuData[menuKey];

  if (!data || !data.choices || data.choices.length === 0) {
    return;
  }

  this.actionMenu.showMenu(menuKey); // Open menu


  this.actionMenu = new ActionMenu(this).setDepth(500);
  
  // Verify method exists
  if (typeof this.actionMenu.showMenu !== 'function') {
  }
}

showActionMenu(menuKey) {
  
  if (!this.actionMenu.menuData) {
      return;
  }

  const data = this.actionMenu.menuData[menuKey];

  if (!data || !data.choices || data.choices.length === 0) {
      return;
  }

  this.actionMenu.showMenu(menuKey);
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

  // Create player entity (no animation needed)
  const gameEntity = new PlayerEntity(x, y);
  
  // Create Phaser entity with sprite from the atlas (no animations)
  this.player = {};
  this.player.sprite = this.add.sprite(x * this.tileSize, y * this.tileSize, 'championSprites', 'player_idle_0'); // Default frame from the atlas

  // Add physics body to player
  this.physics.add.existing(this.player.sprite);
  this.player.sprite.body.setSize(32, 32); // Match sprite size
  this.player.sprite.body.setOffset(4, 8); // Center collision box

  // Add to scheduler and setup camera
  this.scheduler.add(gameEntity, true);
  this.cameras.main.startFollow(this.player.sprite);
  
  // Set depth above other entities
  this.player.sprite.setDepth(100).setScale(0.75);


  // After creating the player, update the sprite texture based on characterSheet data
  const spriteKey = characterSheet.spriteKey;
  if (spriteKey) {
      this.player.sprite.setTexture('championSprites', spriteKey);  // Update the sprite texture
  } else {
  }
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
  createStairsInRoom(room, type) {
    
    
     // Add boundary checks
  if (!room || 
    room.getLeft() < 0 || 
    room.getRight() >= this.map.length || 
    room.getTop() < 0 || 
    room.getBottom() >= this.map[0].length
) {
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
    .setPipeline('Light2D');

  this.stairPositions.add(`${x},${y}`);

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
  generateDungeon() {


      // Use level-specific seed
  const seed = Date.now() + this.currentLevel;
  RNG.setSeed(seed);

  // Generate fresh dungeon config based on depth
  const config = {
      roomWidth: [4 + this.currentLevel, 8 + this.currentLevel],
      corridorLength: [3, 5 + Math.floor(this.currentLevel/2)],
      dugPercentage: 0.3 + (this.currentLevel * 0.05),
      roomCount: [3 + this.currentLevel, 6 + this.currentLevel]
    };
  // Create and store dungeon
  const dungeon = new Map.Digger(this.dungeonWidth, this.dungeonHeight, config);
  const map = Array.from({ length: this.dungeonWidth }, () => 
    Array(this.dungeonHeight).fill(1)
);

dungeon.create((x, y, wall) => {
  if (map[x] && map[x][y] !== undefined) {
      map[x][y] = wall ? 1 : 0;
  } else {
  }
});

  // Store in cache
  this.levelCache.set(this.currentLevel, {
    map: map,
    rooms: dungeon.getRooms(),
    roomMap: this.createRoomMap(dungeon),
    stairs: {
      up: this.stairs.up,
      down: this.stairs.down
    }
  });

  return this.levelCache.get(this.currentLevel);

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
    drawMap() {
      this.tiles = this.add.group();
    
      // Draw corridors first
      this.dungeon.getCorridors().forEach(corridor => {
        corridor.create((x, y) => this.createTile(x, y));
      });
    
      // Draw rooms on top of corridors
      this.dungeon.getRooms().forEach(room => {
        // Draw floor
        room.create((x, y) => this.createTile(x, y));
        
        // Draw walls (new addition)
        this.createWallsAroundRoom(room);
      });
    }

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
  
      // Start tween to move the player to the next tile
      this.tweens.add({
        targets: this.player.sprite,
        x: targetX,
        y: targetY,
        duration: 200, // Duration of each move (in milliseconds)
        ease: 'Linear', // Smooth linear transition
        onComplete: () => {
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
        .setOrigin(0.5, 0.5)
        .setScale(0.5)
        .setAlpha(0);  // Start with the image invisible
  
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

  updateFOV() {
    if (!this.tiles || !this.player) return;
  
    // Store explored areas
    if (!this.explored) {
      this.explored = Array.from({ length: this.map.length }, () => 
        Array(this.map[0].length).fill(false)
      );
    }
  
    const [px, py] = [
      Math.floor(this.player.sprite.x / this.tileSize),
      Math.floor(this.player.sprite.y / this.tileSize)
    ];
  
    // Reset visibility
    this.tiles.getChildren().forEach(tile => {
      const x = Math.floor(tile.x / this.tileSize);
      const y = Math.floor(tile.y / this.tileSize);
      if (this.explored[x][y]) {
        tile.alpha = 0.5; // Half-visible for explored areas
      } else {
        tile.alpha = 0.0; // Completely hidden for unexplored
      }
    });
  
    // Compute new FOV
    this.fov.compute(px, py, 8, (x, y, r, visibility) => {
      if (x >= 0 && y >= 0 && x < this.map.length && y < this.map[0].length) {
        const tile = this.tiles.getChildren().find(t => 
          Math.floor(t.x / this.tileSize) === x &&
          Math.floor(t.y / this.tileSize) === y
        );
        if (tile) {
          this.explored[x][y] = true;
          tile.alpha = Math.min(visibility + 0.3, 1); // Smooth visibility
        }
      }
    });
  }

 
  setupInput() {
    this.input.keyboard.on('keydown', async (event) => {
      if (this.engine.locked) return;
  
      const moves = {
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        ArrowUp: [0, -1],
        ArrowDown: [0, 1]
      };
  
      const direction = moves[event.key];
      if (direction) {
        this.engine.lock();
        try {
          const moved = await this.player.move(...direction);
          
          if (moved) {
            this.player.gameEntity.resolveInput(); // Call without parameter
            this.updateFOV();
          }
        } finally {
          this.engine.unlock();
          this.engine.start();
        }
      }
    });
  }
// Add these new methods to your DungeonScene class
handleAscendingStairCollision() {


}

handleDescendingStairCollision() {

}

}
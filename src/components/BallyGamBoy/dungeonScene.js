import Phaser from 'phaser';
import { Map,Path } from 'rot-js';
import { Scheduler, Engine, RNG, FOV } from 'rot-js';
import ActionMenu from '../actionMenu/actionMenu'
import { GameEntity, PlayerEntity } from './entities';
import PhaserEntity from './phaserEntity'
export default class DungeonScene extends Phaser.Scene {

  constructor() {
    super({ key: 'Dungeon' });
    this.path = []; // Initialize path array
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
  
    this.actionMenu = null;  // Declare actionMenu

  
  }


  setupStairCollisions() {

    if (!this.player ||  !this.player.sprite) {
      console.error("Player not initialized when setting up stair collisions!");
      return;
    }
    // Create a physics group for stairs
    if (!this.stairGroup) {
      this.stairGroup = this.physics.add.staticGroup();
    }
  
    // Add existing stairs to group
    if (this.stairs.up && this.stairs.up.sprite) {
      this.stairGroup.add(this.stairs.up.sprite);
    }
    if (this.stairs.down && this.stairs.down.sprite) {
      this.stairGroup.add(this.stairs.down.sprite);
    }
  
    // Set up collision check
    this.physics.add.overlap(
      this.player.sprite,
      this.stairGroup,
      (playerSprite, stairSprite) => {
        console.log('Stair collision detected!');
        const direction = stairSprite === this.stairs.up.sprite ? 'up' : 'down';
  
        // Open the action menu for the player to choose what to do with the stairs
        this.openActionMenu(direction);
      },
      null,
      this
    );
  }
  openActionMenu(direction) {
    this.actionMenu.background.setVisible(true);
    this.actionMenu.wheel.setVisible(true);
    
   
  }
    
  async handleStairTransition(direction) {
    this.transitioning = true;
    
    // Properly pause the scheduler instead of stopping
    if (this.engine && typeof this.engine.lock === 'function') {
      this.engine.lock();
    }
  
    // Visual effects
    this.cameras.main.fadeOut(500, 0, 0, 0);
  
    await new Promise(resolve => {
      this.cameras.main.once('camerafadeoutcomplete', resolve);
    });
  
    // Change level
    this.currentLevel = direction === 'down' 
      ? this.currentLevel + 1 
      : Math.max(1, this.currentLevel - 1);
  
    // Reload level
    this.loadLevel();
  
    // Reset camera and restart scheduler
    this.cameras.main.fadeIn(500);
    this.transitioning = false;
    
    if (this.engine && typeof this.engine.unlock === 'function') {
      this.engine.unlock();
    }
    if (this.engine && typeof this.engine.start === 'function') {
      this.engine.start();
    }
  }


  // Function to move to the next level
  moveToNextLevel() {
    console.log("Moving to the next level!");
    this.currentLevel++;
    this.loadLevel();  // Reload or generate the new level
  }

  // Function to move to the previous level
  moveToPreviousLevel() {
    if (this.currentLevel > 1) {
      console.log("Moving to the previous level!");
      this.currentLevel--;
      this.loadLevel();  // Reload or generate the previous level
    }
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
}
  

  preload() {
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
      // Add debug graphics
  this.debugGraphics = this.add.graphics();
  
  // Enable debug input
  this.input.keyboard.on('keydown-D', () => {
    this.drawDebugPath();
  });

  this.debugText = this.add.text(10, 10, '', { 
    fontSize: '16px', 
    fill: '#fff' 
  });
    const canvas = this.sys.game.canvas; // Get the canvas reference
    canvas.addEventListener('touchstart', this.handleTouch.bind(this), false); // Bind `this` context to handleTouch
    
    this.setupTouchInput();
    

    const Light2DPipeline = Phaser.Renderer.WebGL.Pipelines.Light2DPipeline;
    
    if (!this.renderer.pipelines.get('Light2D')) {
        const Light2DPipeline = Phaser.Renderer.WebGL.Pipelines.Light2DPipeline;
        this.renderer.pipelines.add('Light2D', new Light2DPipeline(this.game));
      }
         // Set pipeline quality
    
    this.tiles = this.add.group();
    this.generateDungeon();
    this.drawMap(); 
    this.createPlayer(); // Create player FIRST
    this.setupFOV();
    this.setupInput();
    this.setupStairCollisions();  
    this.setupLighting(); // Then setup lighting

    this.engine.start();
    const stairsDown = { type: 'stairs', direction: 'down' };  // Or define a more meaningful object
    const stairsUp = { type: 'stairs', direction: 'up' };
    
  
  


    this.actionMenu = new ActionMenu(this, this.cameras.main.width / 2, this.cameras.main.height / 2).setDepth(500);
    this.add.existing(this.actionMenu);  // Add it to the scene
    this.actionMenu.close(); // Ensure it's hidden initially
    this.actionMenu.setVisible(false)

  }


  drawDebugPath() {
    this.debugGraphics.clear();
    
    // Draw walkable grid
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        if (!this.isWalkable(x, y)) {
          this.debugGraphics.fillStyle(0xff0000, 0.3);
          this.debugGraphics.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        }
      }
    }}

  setupTouchInput() {
    this.input.on('pointerdown', (pointer) => {
      const tileX = Math.floor(pointer.worldX / this.tileSize);
      const tileY = Math.floor(pointer.worldY / this.tileSize);
      console.log('Tile Coordinates:', tileX, tileY); // Log to check
      this.pathfindTo(tileX, tileY); // Trigger pathfinding when a touch is detected
    });
  }
  isWalkable(x, y) {
    // First check array bounds
    if (y < 0 || x < 0 || y >= this.map.length || x >= this.map[0].length) {
      return false;
    }
    console.log(`Walkability check at ${x},${y}:`, 
      (this.map[y] && this.map[y][x] !== undefined && this.map[y][x] === 0) 
      ? "PASS" 
      : "BLOCKED");
    // Then check tile value
    return this.map[y][x] === 0; // Verify your map uses 0 for walkable
  }

  drawDebugPath() {
    this.debugGraphics.clear();
    
    // Draw walkable tiles
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        if (this.isWalkable(x, y)) {
          this.debugGraphics.fillStyle(0x00ff00, 0.3);
          this.debugGraphics.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        }
      }
    }
  }
// Remove triggerPathfinding and update handleTouch:
handleTouch(event) {
  event.preventDefault();
  const touch = event.touches[0];
  const rect = event.target.getBoundingClientRect();
  
  // Get pixel coordinates relative to game world
  const worldX = touch.pageX - rect.left + this.cameras.main.scrollX;
  const worldY = touch.pageY - rect.top + this.cameras.main.scrollY;
  
  // Convert to tile coordinates
  const tileX = Math.floor(worldX / this.tileSize);
  const tileY = Math.floor(worldY / this.tileSize);
  
  this.pathfindTo(tileX, tileY);

  this.debugGraphics.fillStyle(0xff0000, 0.5);
  this.debugGraphics.fillRect(tileX * this.tileSize, tileY * this.tileSize, this.tileSize, this.tileSize);
  
  this.pathfindTo(tileX, tileY);
}
get playerTile() {
  if (!this.player || !this.player.sprite) return { x: -1, y: -1 };
  
  return {
    x: Math.floor(this.player.sprite.x / this.tileSize),
    y: Math.floor(this.player.sprite.y / this.tileSize)
  };

  
}

  triggerPathfinding(targetX, targetY) {
    // Clear previous path
    this.path = [];
  
    // Check if target is walkable
    if (!this.isWalkable(targetX, targetY)) {
      console.log("Target is unwalkable");
      return;
    }
  
    // Get player's tile position using the getter
    const playerTile = this.playerTile; // <-- This uses the getter
  
    const astar = new Path.AStar(
      targetX,
      targetY,
      (x, y) => this.isWalkable(x, y),
      {
        topology: 8, // Allow diagonal movement
        heuristic: Path.AStar.heuristics.DIAGONAL
      }
    );
  
    // Clear previous path
    this.path.length = 0;
  
    // Compute path from player's CURRENT position
    astar.compute(
      this.playerTile.x,
      this.playerTile.y,
      (x, y) => this.path.push({x, y})
    );
  
    // Remove starting position if present
    if (this.path.length > 0 && 
        this.path[0].x === this.playerTile.x && 
        this.path[0].y === this.playerTile.y) {
      this.path.shift();
    }
  
    // Debug: Draw path
    this.debugGraphics.lineStyle(2, 0xff0000);
    this.path.forEach((tile, index) => {
      const x = tile.x * this.tileSize + this.tileSize/2;
      const y = tile.y * this.tileSize + this.tileSize/2;
      if (index === 0) this.debugGraphics.moveTo(x, y);
      else this.debugGraphics.lineTo(x, y);
    });
    
    this.path.shift();
    this.moveAlongPath(this.path);
  }

  pathfindTo(targetX, targetY) {

      // Validate player position
  if (this.playerTile.x < 0 || this.playerTile.y < 0) {
    console.error("Invalid player position");
    return;
  }

  // Validate target coordinates
  if (targetX < 0 || targetY < 0 || 
      targetX >= this.dungeonWidth || 
      targetY >= this.dungeonHeight) {
    console.error("Target out of bounds");
    return;
  }

    console.log(`Pathfinding from ${this.playerTile.x},${this.playerTile.y} to ${targetX},${targetY}`);
    
    // Clear previous path
    this.path = [];
  
    // Validate coordinates
    if (
      targetX < 0 || targetX >= this.map[0].length ||
      targetY < 0 || targetY >= this.map.length
    ) {
      console.log("Target out of bounds");
      return;
    }
  
    if (!this.isWalkable(targetX, targetY)) {
      console.log("Target is unwalkable");
      return;
    }
  
    try {
      const astar = new Path.AStar(
        targetX,
        targetY,
        (x, y) => this.isWalkable(x, y),
        { topology: 4 } // Use 4-directional movement
      );
  
      astar.compute(
        this.playerTile.x,
        this.playerTile.y,
        (x, y) => this.path.push({ x, y })
      );
  
      // Remove starting position if needed
      if (this.path.length > 0 && 
          this.path[0].x === this.playerTile.x && 
          this.path[0].y === this.playerTile.y) {
        this.path.shift();
      }
  
      console.log("Path:", this.path);
      
      if (this.path.length > 0) {
        this.moveAlongPath(this.path);
      } else {
        console.log("No path found");
      }
    } catch (error) {
      console.error("Pathfinding error:", error);
    }
  
    console.log("Pathfinding details:");
    console.log("Start:", this.playerTile);
    console.log("Target:", {x: targetX, y: targetY});
    console.log("Walkable check:", this.isWalkable(targetX, targetY));
    console.log("Map snippet (3x3 around target):");
    for (let dy = -1; dy <= 1; dy++) {
      let row = [];
      for (let dx = -1; dx <= 1; dx++) {
        row.push(
          (this.map[targetY + dy] && 
          this.map[targetY + dy][targetX + dx] !== undefined) 
            ? this.map[targetY + dy][targetX + dx] 
            : "X"
        );
      }
      console.log(row.join(" "));
    }
  
  }
  moveAlongPath(path) {
    let stepIndex = 0;
    
    const moveStep = () => {
      if (
        !this.player || 
        !this.player.sprite || 
        !this.player.sprite.body
      ) {
        return;
      }
      if (stepIndex >= path.length) {
        this.player.sprite.body.stop();
        this.engine.unlock();
        return;
      }
  
      const target = path[stepIndex];
      const destX = target.x * this.tileSize + this.tileSize/2;
      const destY = target.y * this.tileSize + this.tileSize/2;
  
      // Calculate direction
      const angle = Phaser.Math.Angle.Between(
        this.player.sprite.x,
        this.player.sprite.y,
        destX,
        destY
      );
  
      // Set velocity
      this.player.sprite.body.velocity.x = Math.cos(angle) * 150;
      this.player.sprite.body.velocity.y = Math.sin(angle) * 150;
  
      // Check if reached current step
      const distance = Phaser.Math.Distance.Between(
        this.player.sprite.x,
        this.player.sprite.y,
        destX,
        destY
      );
  
      if (distance < 5) {
        stepIndex++;
      }
  
      this.time.delayedCall(50, moveStep);
    };
  
    this.engine.lock();
    moveStep();
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
    .setPipeline('Light2D');

  this.stairPositions.add(`${x},${y}`);
  console.log(`Created ${type} stairs at (${x}, ${y})`);

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
  
    // Generate fresh dungeon config
    const config = {
      roomWidth: [4 + this.currentLevel, 8 + this.currentLevel],
      corridorLength: [3, 5 + Math.floor(this.currentLevel/2)],
      dugPercentage: 0.3 + (this.currentLevel * 0.05),
      roomCount: [3 + this.currentLevel, 6 + this.currentLevel]
    };
  
    // Create dungeon with proper dimensions
    const dungeon = new Map.Digger(this.dungeonWidth, this.dungeonHeight, config);
    
    // Initialize map correctly [y][x]
    const map = Array.from({ length: this.dungeonHeight }, () => 
      Array(this.dungeonWidth).fill(1)
    );
  
    dungeon.create((x, y, wall) => {
      if (y < map.length && x < map[y].length) {
        map[y][x] = wall ? 1 : 0; // Proper [y][x] access
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
    const startRoom = dungeon.getRooms()[0];
    let walkableCount = 0;
    for (let x = startRoom.getLeft(); x <= startRoom.getRight(); x++) {
      for (let y = startRoom.getTop(); y <= startRoom.getBottom(); y++) {
        if (map[y][x] === 0) walkableCount++;
      }
    }
    console.log(`Starting room has ${walkableCount} walkable tiles`);
    
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
    
    console.log(`Generation attempt ${attempts}: ${this.rooms.length} rooms`);
  } while (this.rooms.length < 2 && attempts < 5);

  if (this.rooms.length < 2) {
    // Fallback: Create emergency rooms
    console.warn("Using emergency room creation");
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

    // Verify map integrity
    console.log('ROT.js Map Sample:', 
      this.map.slice(0, 5).map(col => col.slice(0, 5)));
    // Initialize room map
    this.roomMap = Array.from({ length: mapWidth }, () => 
      Array(mapHeight).fill(-1)
    );
  
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
  // Use ROT.js's built-in Room class
  const ROTRoom = Map.Room;
  
  // Create rooms using proper constructor
  const safeRooms = [
    new ROTRoom(5, 5, 8, 8),  // x1, y1, x2, y2
    new ROTRoom(35, 35, 8, 8)
  ];

  // Ensure rooms have required properties
  safeRooms.forEach(room => {
    room.getLeft = () => room._x1;
    room.getRight = () => room._x2;
    room.getTop = () => room._y1;
    room.getBottom = () => room._y2;
  });

  this.dungeon._rooms = safeRooms;
  console.warn("Created emergency rooms:", safeRooms);
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
  createPlayer() {
    // Add null check for dungeon rooms
    if (
      !this.dungeon || 
      !this.dungeon.getRooms || 
      !this.dungeon.getRooms() || 
      !this.dungeon.getRooms().length
    ) {
      console.error("No rooms in dungeon!");
      return;
    }
    const startRoom = this.dungeon.getRooms()[0];
    
    // Add fallback position
    const fallbackPosition = {
      x: startRoom.getLeft() + 1,
      y: startRoom.getTop() + 1
    };
 // Ensure player is always initialized
 if (!this.player) {
  console.warn("Using fallback player position");
  this.player = new PhaserEntity(
    this,
    fallbackPosition.x * this.tileSize,
    fallbackPosition.y * this.tileSize,
    'player',
    new PlayerEntity(fallbackPosition.x, fallbackPosition.y),
    true
  );

   // Proper physics initialization
   if (!this.player.sprite.body) {
    this.physics.world.enable(this.player.sprite);
  }

  // Configure physics body
  this.player.sprite.body
    .setSize(this.tileSize, this.tileSize)
    .setOffset(0, 0)
    .setCollideWorldBounds(true);

  console.log("Player physics initialized:", this.player.sprite.body);

}  
    // Get random walkable position within starting room with recursion guard
    const getWalkablePosition = (attempts = 0) => {
      // Safety check to prevent infinite recursion
      if (attempts > 100) {
        console.error("Could not find walkable position after 100 attempts");
        return { x: startRoom.getLeft() + 1, y: startRoom.getTop() + 1 }; // Fallback position
      }
  
      const x = Phaser.Math.Between(startRoom.getLeft() + 1, startRoom.getRight() - 1);
      const y = Phaser.Math.Between(startRoom.getTop() + 1, startRoom.getBottom() - 1);
  
      // Validate array bounds before access
      if (y >= this.map.length || x >= this.map[0].length) {
        console.warn(`Generated invalid coordinates: ${x},${y}`);
        return getWalkablePosition(attempts + 1);
      }
  
      // Check if position is walkable and within bounds
      const walkable = this.map[y][x] === 0;
      console.log(`Checking ${x},${y} - walkable: ${walkable} (attempt ${attempts + 1})`);
  
      return walkable ? { x, y } : getWalkablePosition(attempts + 1);
    };
  
    const { x, y } = getWalkablePosition();
    
  }
  update() {

  // Check if debug text exists before updating
  if (this.debugText) {
    this.debugText.setText([
      `Player Tile: ${this.player ? `${this.playerTile.x},${this.playerTile.y}` : 'N/A'}`,
      `Last Path: ${JSON.stringify(this.path)}`
    ]);
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

}
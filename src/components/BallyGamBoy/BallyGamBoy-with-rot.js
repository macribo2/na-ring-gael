import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import * as ROT from 'rot-js';

// 1. Entity Classes
class GameEntity {
  static ENTITY_TYPES = {
    PLAYER: 'player',
    ENEMY: 'enemy',
    ITEM: 'item'
  };

  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.energy = 0;
    this.speed = 10;
    
  }

  getSpeed() {
    return this.speed;
  }

  act() {
    return new Promise(resolve => {
      this.energy -= 100;
      this.performAction(resolve);
    });
  }

  performAction(callback) {
    callback();
  }
}
class PlayerEntity extends GameEntity {
  constructor(x, y) {
    super(x, y, GameEntity.ENTITY_TYPES.PLAYER);
    this.speed = 20;
    this.inputResolver = null;


  }

  // Add this method to resolve input promise
  resolveInput() {
    if (this.inputResolver) {
      this.inputResolver();
      this.inputResolver = null;
    }
  }

  act() {
    return new Promise(resolve => {
      this.waitForInput().then(() => {
        this.energy -= 100;
        resolve();
      });
    });
  }

  waitForInput() {
    return new Promise(resolve => {
      this.inputResolver = resolve;
    });
  }
}
class PhaserEntity {
  constructor(scene, x, y, texture, gameEntity, isPlayer = false) {
    this.scene = scene;
    this.sprite = scene.add.sprite(x, y, texture);
    this.gameEntity = gameEntity;
    this.isPlayer = isPlayer;
    
    if (isPlayer) {
      this.sprite.setDepth(1);
    }
  }

  // SINGLE MOVE METHOD
  move(dx, dy) {
    const newX = this.gameEntity.x + dx;
    const newY = this.gameEntity.y + dy;
  
    // Comprehensive boundary checking
    const isValidPosition = (
      newX >= 0 &&
      newY >= 0 &&
      newX < this.scene.map.length &&
      newY < this.scene.map[newX].length &&
      this.scene.map[newX][newY] === 0
    );
  
    if (isValidPosition) {
      this.gameEntity.x = newX;
      this.gameEntity.y = newY;
  
      return new Promise(resolve => {
        this.scene.tweens.add({
          targets: this.sprite,
          x: newX * this.scene.tileSize,
          y: newY * this.scene.tileSize,
          duration: 200,
          onComplete: () => resolve(true)
        });
      });
    }
    
    return Promise.resolve(false);
  }
}


// 2. Phaser Scene
class DungeonScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Dungeon' });
    this.roomMap = []; // 2D array tracking room IDs
    this.rooms = [];    // Store room references
    this.tileSize = 32;
    this.entities = [];
    this.scheduler = new ROT.Scheduler.Simple();
    this.engine = new ROT.Engine(this.scheduler);
    this.tiles = null; // Explicit initialization
  
  
  }

  preload() {
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
      this.add.sprite(x * this.tileSize, belowY * this.tileSize, 'dungeon_tiles', 101)
        .setOrigin(0)
        .setDepth(0.9); // Just below wall depth
    }
  }

  this.tiles.add(tile);
}
  create() {
    this.tiles = this.add.group();
    this.generateDungeon();
    this.drawMap(); 
    this.setupFOV();
    this.createPlayer(); // Create player FIRST
    this.setupLighting(); // Then setup lighting
    this.setupInput();
    this.engine.start();
  
    
  // Debug grid overlay
  this.debugGraphics = this.add.graphics()
    .setDepth(1000)
    .setVisible(false);

    this.input.keyboard.on('keydown-D', () => {
      this.debugGraphics.visible = !this.debugGraphics.visible;
      this.debugGraphics.clear();
      
      if (this.debugGraphics.visible) {
        // Draw room numbers
        this.dungeon.getRooms().forEach((room, index) => {
          const [x, y] = room.getCenter(); // ROT.js returns an array
          // const x = room.getCenterX() * this.tileSize;
          // const y = room.getCenterY() * this.tileSize;
          this.add.text(x, y, `Room ${index}`, { 
            fontSize: '12px',
            color: '#ffffff',
            backgroundColor: '#000000'
          }).setOrigin(0.5);
        });
      }
    });
  
  }
  
  setupLighting() {
    this.lights.enable().setAmbientColor(0x555555);
    
    // Add null check for safety
    if (this.player) {
      this.player.light = this.lights.addLight(
        this.player.sprite.x,
        this.player.sprite.y,
        200,
        0xffffff,
        1.5
      );
    }
  }

  generateDungeon() {
    // Initialize proper 2D array
    const mapWidth = Math.floor(this.scale.width / this.tileSize);
    const mapHeight = Math.floor(this.scale.height / this.tileSize);
    
    // Create empty map filled with walls (1)
    this.map = Array.from({ length: mapWidth }, () => 
      Array.from({ length: mapHeight }, () => 1)
    );
  
    // Digger configuration
    this.dungeon = new ROT.Map.Digger(mapWidth, mapHeight, {
      roomWidth: [5, 12],
      corridorLength: [3, 10],
      dugPercentage: 0.3
    });
  
    // Create unified callback
    this.dungeon.create((x, y, wall) => {
      this.map[x][y] = wall ? 1 : 0; // Direct ROT.js -> Phaser map sync
    });
  
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
    this.fov = new ROT.FOV.PreciseShadowcasting((x, y) => {
      return this.map[x] && this.map[x][y] === 0;

    });
  }

  createPlayer() {
    const startRoom = this.dungeon.getRooms()[0];
    
    // Get random walkable position within starting room
    const getWalkablePosition = () => {
      const x = Phaser.Math.Between(startRoom.getLeft() + 1, startRoom.getRight() - 1);
      const y = Phaser.Math.Between(startRoom.getTop() + 1, startRoom.getBottom() - 1);
      return this.map[x][y] === 0 ? [x, y] : getWalkablePosition();
    };
  
    const [x, y] = getWalkablePosition();
    
    // Create player entity
    const gameEntity = new PlayerEntity(x, y);
    
    // Create Phaser entity with animations
    this.player = new PhaserEntity(
      this,
      x * this.tileSize,
      y * this.tileSize,
      'player', // Texture key from preloaded spritesheet
      gameEntity,
      true
    );
  
    // Set up player animations
    this.anims.create({
      key: 'player_idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }), //end3 for idle
      frameRate: 6,
      repeat: -1
    });
  
    this.anims.create({
      key: 'player_move',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: 0
    });
  
    // Start idle animation
    this.player.sprite.play('player_idle');
  
    console.log('Player starts at:', x, y, 'Walkable:', this.map[x][y] === 0);
    
    // Add to scheduler and setup camera
    this.scheduler.add(gameEntity, true);
    this.cameras.main.startFollow(this.player.sprite);
    
    // Set depth above other entities
    this.player.sprite.setDepth(100);
  

  
    // // Visualize room boundaries
    // this.debugGraphics.strokeRect(
    //   startRoom.getLeft() * this.tileSize,
    //   startRoom.getTop() * this.tileSize,
    //   (startRoom.getRight() - startRoom.getLeft()) * this.tileSize,
    //   (startRoom.getBottom() - startRoom.getTop()) * this.tileSize
    // );
  
  }
  update() {
    if (this.player) {
      this.player.light.x = this.player.sprite.x;
      this.player.light.y = this.player.sprite.y;
      this.updateFOV();
    }
  }

  updateFOV() {
    if (!this.tiles) return; // Early exit if no tiles
  
    const [px, py] = [
      Math.floor(this.player.sprite.x / this.tileSize),
      Math.floor(this.player.sprite.y / this.tileSize)
    ];
    
    this.fov.compute(px, py, 8, (x, y, r, visibility) => {
      const tile = this.tiles.getChildren().find(t => 
        Math.floor(t.x / this.tileSize) === x &&
        Math.floor(t.y / this.tileSize) === y
      );
      if (tile) tile.alpha = Math.max(visibility, 0.3);
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

// 3. React Component
const BallyGamBoy = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: 'phaser-container',
      width: 800,
      height: 480,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: [DungeonScene],
      lighting: {
        ambient: {
          color: 0x333333,
          intensity: 1
        }
      },
      input: {
        keyboard: true,
        mouse: {
          preventDefaultWheel: false
        }
      },
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div id="phaser-container" style={{ width: '100%', height: '100%' }} />;
};

export default BallyGamBoy;
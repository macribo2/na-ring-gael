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
    this.tileSize = 32;
    this.entities = [];
    this.scheduler = new ROT.Scheduler.Simple();
    this.engine = new ROT.Engine(this.scheduler);
    this.tiles = null; // Explicit initialization
  }

  preload() {
    // Load tilesheet with 32x32 frames arranged in grid
    this.load.spritesheet('dungeon_tiles', '/phaser-resources/images/dungeon_tiles_2.png', {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 2
    });
    
    this.load.spritesheet('player', '/phaser-resources/images/champions/32.png', {
      frameWidth: 32,
      frameHeight: 32
    });
  }
  getTileFrame(tileValue) {
    const variants = {
      0: [0, 1, 2],       // Corridor floors
      1: [3, 4, 5],       // Walls
      2: [6, 7, 8],       // Room floors
      3: [9],             // Special tiles (e.g., water)
      4: [10]             // Other features (e.g., chests)
    };
  
    if (tileValue in variants) {
      const options = variants[tileValue];
      return Array.isArray(options) 
        ? Phaser.Math.RND.pick(options) 
        : options;
    }
    return 0; // Fallback to corridor floor
  }
createTile(x, y) {
  const tileValue = this.map[x][y];
  const frame = this.getTileFrame(tileValue);
  
  // Validate coordinates
  if (x >= this.map.length || y >= this.map[0].length) {
    console.warn(`Out-of-bounds tile at ${x},${y}`);
    return;
  }

  const tile = this.add.sprite(
    x * this.tileSize,
    y * this.tileSize,
    'dungeon_tiles',
    frame
  ).setOrigin(0);

  // Depth based on actual map value
  tile.setDepth(tileValue === 1 ? 1 : 0);
  this.tiles.add(tile);
}


  create() {
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
      this.debugGraphics.lineStyle(1, 0xff0000);
      for (let x = 0; x < this.map.length; x++) {
        for (let y = 0; y < this.map[x].length; y++) {
          if (this.map[x][y] === 1) {
            this.debugGraphics.fillStyle(0xff0000, 0.3);
            this.debugGraphics.fillRect(
              x * this.tileSize,
              y * this.tileSize,
              this.tileSize,
              this.tileSize
            );
          }
        }
      }
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
  
  
  // Post-generation check
  let wallCount = 0;
  let floorCount = 0;
  
  this.map.forEach(col => col.forEach(cell => {
    cell === 1 ? wallCount++ : floorCount++;
  }));

  console.log(`Map Stats - Walls: ${wallCount}, Floors: ${floorCount}`);
  console.assert(wallCount > 0 && floorCount > 0, "Invalid map generation");


  // After initial map creation, mark room floors
  this.dungeon.getRooms().forEach(room => {
    room.getDoors((x, y) => { // Mark door positions
      this.map[x][y] = 4; // Special door tile
    });

    // Iterate through entire room area
    for (let x = room.getLeft(); x <= room.getRight(); x++) {
      for (let y = room.getTop(); y <= room.getBottom(); y++) {
        if (this.map[x][y] === 0) { // Only modify floor tiles
          this.map[x][y] = 2; // Mark as room floor
        }
      }
    }
  });
}


drawMap() {
  this.tiles = this.add.group();

  // Draw corridors first (as basic floors)
  this.dungeon.getCorridors().forEach(corridor => {
    corridor.create((x, y) => {
      if (this.map[x][y] === 0) this.createTile(x, y);
    });
  });

  // Draw rooms on top
  this.dungeon.getRooms().forEach(room => {
    const { x, y, width, height } = room;
    this.createRoom(x, y, width, height);
  });
}



createRoom(x, y, w, h) {
  for (let xi = x; xi < x + w; xi++) {
    for (let yi = y; yi < y + h; yi++) {
      // Only create tiles where map indicates room floors
      if (this.map[xi][yi] === 2) {
        this.createTile(xi, yi);
      }
    }
  }
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
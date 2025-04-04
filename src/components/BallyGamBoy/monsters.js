import { GameEntity } from "./entities";
import Phaser from "phaser";
import * as ROT from "rot-js";

export function populateMonsters(scene) {
  if (scene.currentLevel === 1) {
    // Find a random walkable tile to place the Lútín
    const { x, y } = getRandomWalkableTile(scene);
    if (x !== null && y !== null) {
      const lutin = new Lutin(scene, x, y);
      scene.addEntity(lutin);
      scene.scheduler.add(lutin, true);
      console.log(`A Lútín appears at (${x}, ${y})!`);
    }
  }
}

// Simplified tile finder
function getRandomWalkableTile(scene) {
  const walkableTiles = [];

  for (let x = 0; x < scene.map.length; x++) {
    for (let y = 0; y < scene.map[0].length; y++) {
      if (scene.map[x] && scene.map[x][y] === 0) { // Assuming 0 is walkable
        walkableTiles.push({ x, y });
      }
    }
  }

  if (walkableTiles.length > 0) {
    return Phaser.Utils.Array.GetRandom(walkableTiles);
  }
  return { x: null, y: null }; // No valid position found
}

export class Lutin extends GameEntity {
  constructor(scene, x, y) {
    super(scene, x, y, GameEntity.ENTITY_TYPES.ENEMY);
    
    // Create the sprite
    this.sprite = scene.add.sprite((x + 0.5) * 32, (y + 0.5) * 32, "lutin"); // Center in tile
    
    // Store grid position
    this.gridX = x;
    this.gridY = y;
    
    // Debug visual
    this.debugText = scene.add.text(this.sprite.x, this.sprite.y - 20, "Lutin", {
      fontSize: '10px',
      fill: '#ff0000'
    });
    this.debugText.setOrigin(0.5);

    this.speed = 8;
    this.turnCount = 0;
  }
  act() {
    this.turnCount = (this.turnCount || 0) + 1;
    console.log(`Lutin's turn #${this.turnCount} at (${this.gridX}, ${this.gridY})`);
  
    return new Promise(resolve => {
      // Move toward the player and wait until the movement is complete
      this.moveTowardPlayer();  // Assuming moveTowardPlayer is synchronous. If it's async, use await instead.
  
      // Small delay to make movement visible (optional for a delay)
      setTimeout(() => {
        console.log(`Lutin turn #${this.turnCount} completed`);
  
        // Resolve the promise to tell ROT.Engine that Lutin's turn is over
        resolve();  // This allows ROT.Engine to proceed to the next actor
  
        // Optional debugging tool to check the scheduler state
        if (this.scene.debugScheduler) {
          this.scene.debugScheduler();
        }
      }, 300);  // Adjust the time if needed to match animation frame rate or game pace
    });
  }
   
  // Simplified movement directly toward player
  moveTowardPlayer() {
    if (!this.scene.player) {
      console.error("Player not found in scene!");
      return;
    }
    
    const playerX = this.scene.player.gridX;
    const playerY = this.scene.player.gridY;
    
    console.log(`Player at (${playerX}, ${playerY}), Lutin at (${this.gridX}, ${this.gridY})`);
    
    // Calculate direction to player
    let dx = 0;
    let dy = 0;
    
    if (playerX > this.gridX) dx = 1;
    else if (playerX < this.gridX) dx = -1;
    
    if (playerY > this.gridY) dy = 1;
    else if (playerY < this.gridY) dy = -1;
    
    // Prefer horizontal movement if both directions are valid
    if (dx !== 0 && dy !== 0) {
      // Try horizontal move first
      if (this.canMoveTo(this.gridX + dx, this.gridY)) {
        dy = 0;
      } else {
        dx = 0;
      }
    }
    
    // Try to move
    if (dx !== 0 || dy !== 0) {
      const newGridX = this.gridX + dx;
      const newGridY = this.gridY + dy;
      
      if (this.canMoveTo(newGridX, newGridY)) {
        this.gridX = newGridX;
        this.gridY = newGridY;
        
        const newX = (this.gridX + 0.5) * 32;
        const newY = (this.gridY + 0.5) * 32;
        
        console.log(`Lutin moving to (${newGridX}, ${newGridY})`);
        
        // Move sprite
        this.sprite.setPosition(newX, newY);
        
        // Update debug text
        this.debugText.setPosition(newX, newY - 20);
      } else {
        console.log(`Lutin can't move to (${newGridX}, ${newGridY})`);
      }
    } else {
      console.log("Lutin is at player's position (shouldn't happen)");
    }
  }
  
  // Check if this position is walkable
  canMoveTo(x, y) {
    // Use the scene's isWalkable method if available
    if (this.scene.isWalkable && typeof this.scene.isWalkable === 'function') {
      const walkable = this.scene.isWalkable(x, y);
      console.log(`Scene.isWalkable(${x}, ${y}) = ${walkable}`);
      return walkable;
    } 
    
    // Fall back to checking map directly
    console.log(`Checking map[${x}][${y}] directly`);
    if (!this.scene.map[x] || this.scene.map[x][y] !== 0) {
      console.log(`Position (${x}, ${y}) is not walkable: ${this.scene.map[x] ? this.scene.map[x][y] : 'undefined'}`);
      return false;
    }
    
    return true;
  }
}
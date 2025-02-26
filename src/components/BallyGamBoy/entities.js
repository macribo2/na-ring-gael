// entities.js
export class GameEntity {
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

export class PlayerEntity extends GameEntity {
  constructor(scene,x, y) {
    super(x, y, GameEntity.ENTITY_TYPES.PLAYER);
    this.scene = scene; // Add this
    this.speed = 20;
    this.inputResolver = null;
    this.onStairs = null; // 'up' or 'down' when on stairs
  }

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

  // Add the move method here
  move(dx, dy) {
    const newGridX = this.gridX + dx;
    const newGridY = this.gridY + dy;
  
    // Ensure the scene and map exist before checking collisions
    if (!this.scene || !this.scene.map) {
      console.error("Scene or map is undefined.");
      return;
    }
  
    // Check if the new position is a wall or walkable
    if (this.scene.map[newGridX] && this.scene.map[newGridX][newGridY] === 0) {
      // Only update position if it's a walkable tile
      this.gridX = newGridX;
      this.gridY = newGridY;
    
      const newX = (this.gridX + 0.5) * 32; // Center of tile
      const newY = (this.gridY + 0.5) * 32; // Center of tile
    
      console.log(`Player moving to: (${newX}, ${newY})`);
    
      this.scene.tweens.add({
        targets: this.sprite,
        x: newX,
        y: newY,
        duration: 150, // Adjust duration for speed
        ease: 'Linear', // Smooth movement
        onComplete: () => {
          this.x = newX;
          this.y = newY;
        }
      });
    } else {
      console.log(`Blocked! Cannot move to (${newGridX}, ${newGridY})`);
    }
  }
  
  updatePosition() {
    if (this.sprite) {
      this.sprite.setPosition(this.x, this.y);
      
    }
  }
  
}

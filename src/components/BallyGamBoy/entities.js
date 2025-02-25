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
  constructor(x, y) {
    super(x, y, GameEntity.ENTITY_TYPES.PLAYER);
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
    this.gridX += dx;
    this.gridY += dy;
  
    const newX = this.gridX * 32//TILE_SIZE;
    const newY = this.gridY * 32//TILE_SIZE;
  
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
  }
  
  updatePosition() {
    if (this.sprite) {
      this.sprite.setPosition(this.x, this.y);
    }
  }
  
}

import { GameEntity } from "./entities";
import Phaser from "phaser";


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

// Helper function to find a random walkable tile
function getRandomWalkableTile(scene) {
  const walkableTiles = [];

  for (let x = 0; x < scene.map.length; x++) {
    for (let y = 0; y < scene.map[0].length; y++) {
      if (scene.isWalkable(x, y)) {
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
    this.sprite = scene.add.sprite(x * 32, y * 32, "lutin"); // Adjust based on tile size

    this.speed = 8; // Slightly slower than the player
  }

  performAction(callback) {
    const directions = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 }
    ];

    const { dx, dy } = Phaser.Utils.Array.GetRandom(directions);
    const newX = this.x + dx;
    const newY = this.y + dy;

    if (this.scene.isWalkable(newX, newY)) {
      this.x = newX;
      this.y = newY;
      this.sprite.setPosition(newX * 32, newY * 32); // Move sprite
      console.log(`Lutin moves to (${this.x}, ${this.y})`);
    }
    console.log("Kaloo Kallay "+this.scene.scheduler.getTimeOf(this.player), this.scene.scheduler.getTimeOf(this.lutin));
    callback();
  }
}

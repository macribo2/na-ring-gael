export default class PhaserEntity {
    constructor(scene, x, y, texture, gameEntity, isPlayer = false, isStairsDown = false, isStairsUp = false) {
      this.scene = scene;
      this.sprite = scene.add.sprite(x, y, texture);
      this.gameEntity = gameEntity;
      this.isPlayer = isPlayer;
      this.isStairsDown = isStairsDown;  // Indicates this is stairs down to next level
      this.isStairsUp = isStairsUp;      // Indicates this is stairs up to previous level
  
      if (isPlayer) {
        this.sprite.setDepth(1);
      }
      
      // Add interaction when player reaches the stairs
      if (isStairsDown || isStairsUp) {
        this.sprite.setInteractive();
        this.sprite.on('pointerdown', () => this.handleStairsInteraction());
      }
      if (isStairsDown || isStairsUp) {
        scene.physics.add.existing(this.sprite, true); // Create static body
        this.sprite.body.setSize(16, 16);
        this.sprite.body.setOffset(8, 16);
      }

    }
    destroy() {
        if (this.sprite) {
          this.sprite.destroy();
        }
      }
    // Handle interaction with stairs (either going up or down)
    handleStairsInteraction() {
      if (this.isStairsDown) {
        this.scene.moveToNextLevel();  // This function would handle moving to the next level
      } else if (this.isStairsUp) {
        this.scene.moveToPreviousLevel();  // This function would handle moving to the previous level
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
  
import Phaser from "phaser";

class InventoryMenu extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    // Basic graphics for the inventory container placeholder
  // Check if the 'lightning' asset exists in the texture cache
// Ensure background is added last
if (scene.textures.exists('character')) {
  this.background = scene.add.image(
      scene.cameras.main.centerX, 
      scene.cameras.main.centerY, 
      'character'
  ).setDepth(10000).setScrollFactor(0);

  } else {
  }

 
    // Adding the background and text to the container
    this.add([this.background]);

    // Initially, we don't want it visible
    this.setVisible(false);

    scene.add.existing(this);
  }

  // Method to show the inventory menu
  showCharacter() {
    this.setVisible(true);
  }

  // Method to hide the inventory menu
  hideCharacter() {
    this.setVisible(false);
  }
}

export default InventoryMenu;

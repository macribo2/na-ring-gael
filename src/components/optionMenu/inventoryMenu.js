import Phaser from "phaser";
class InventoryMenu extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    if (scene.textures.exists('inventory')) {
      this.background = scene.add.image(
        scene.cameras.main.centerX, 
        scene.cameras.main.centerY, 
        'inventory'
      ).setDepth(1000).setScrollFactor(0);
    } else {
    }

    // Adding the background and text to the container
    this.add([this.background]);

    // Initially, we don't want it visible
    this.setVisible(false);

    scene.add.existing(this);
  }

  // Method to show the inventory menu
  showInventory() {
    this.setVisible(true);
  }

  // Method to hide the inventory menu
  hideInventory() {
    this.setVisible(false);
    this.background.setVisible(false)
  }
}

export default InventoryMenu;

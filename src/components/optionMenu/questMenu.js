import Phaser from "phaser";

class InventoryMenu extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    // Check if the 'lightning' asset exists in the texture cache
    if (scene.textures.exists('log')) {
      this.background = scene.add.image(
        scene.cameras.main.centerX, 
        scene.cameras.main.centerY, 
        'log'
      ).setDepth(1000).setScrollFactor(0);
    } else {
    }

    // Adding the background and text to the container

    // Initially, we don't want it visible
    this.setVisible(false);

 
    // Adding the background and text to the container
    this.add([this.background]);

    // Initially, we don't want it visible
    this.setVisible(false);

    scene.add.existing(this);
  }

  // Method to show the inventory menu
  showQuest() {
    this.setVisible(true);
  }

  // Method to hide the inventory menu
  hideQuest() {
    this.setVisible(false);
  }
}

export default InventoryMenu;

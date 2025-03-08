import Phaser from "phaser";

class InventoryMenu extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

     // Check if the 'lightning' asset exists in the texture cache
     if (scene.textures.exists('other')) {
      this.background = scene.add.image(
        scene.cameras.main.centerX, 
        scene.cameras.main.centerY, 
        'other'
      ).setDepth(6000).setScrollFactor(0);
    } else {
    }

    // Adding 
    // Adding the background and text to the container
    this.add([this.background]);

    // Initially, we don't want it visible
    this.setVisible(false);

    scene.add.existing(this);
  }

  // Method to show the inventory menu
  showOther() {
    this.setVisible(true);
  }

  // Method to hide the inventory menu
  hideOther() {
    this.background.setVisible(false)
    this.setVisible(false);
  }
}

export default InventoryMenu;

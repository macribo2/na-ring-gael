import Phaser from "phaser";

class SettingsMenu extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

      // Check if the 'lightning' asset exists in the texture cache
      if (scene.textures.exists('settings')) {
        this.background = scene.add.image(
            scene.cameras.main.centerX, 
            scene.cameras.main.centerY, 
            'settings'
        ).setDepth(10000).setScrollFactor(0);
    
      } else {
      }
  
 
    // Adding the background and text to the container
    this.add([this.background]);

    // Initially, we don't want it visible
    this.setVisible(false);

    scene.add.existing(this);
  }

  // Method to show the settings menu
  showSettings() {
    this.setVisible(true);
  }

  // Method to hide the settings menu
  hideSettings() {
    this.setVisible(false);
    this.background.setVisible(false)
  }
}

export default SettingsMenu;

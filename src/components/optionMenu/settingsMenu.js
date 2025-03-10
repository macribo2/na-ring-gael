import Phaser from "phaser";

class SettingsMenu extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this.scene = scene; // Store reference to scene

    // Check if the 'settings' asset exists in the texture cache
    if (scene.textures.exists('settings')) {
      this.background = scene.add.image(
        scene.cameras.main.centerX, 
        scene.cameras.main.centerY, 
        'settings'
      ).setDepth(10000).setScrollFactor(0);

      const zoomLevel = scene.cameras.main.zoom;

      // Create Fullscreen Button
      this.fullscreenButton = scene.add.text(150, 150, 'Lánscálán', {
        fontSize: '64px',
        fill: '#fff',
        backgroundColor: '#333',
        padding: { x: 10, y: 5 }
      })
      .setInteractive()
      .setDepth(10000)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setScale(1 / zoomLevel)
      .on('pointerdown', () => {
        if (this.scene.scale.isFullscreen) {
          this.scene.scale.stopFullscreen();
          this.fullscreenButton.setText('Lánscálán');
        } else {
          this.scene.scale.startFullscreen();
          this.fullscreenButton.setText('Gnáthscáileán');
        }
      });

      // Ensure correct label on start
      if (scene.scale.isFullscreen) {
        this.fullscreenButton.setText('Lánscálán');
      }
    }

    // Add elements to the container
    this.add([this.background, this.fullscreenButton]);

    // Initially hidden
    this.setVisible(false);

    scene.add.existing(this);
  }

  // Method to show settings menu
  showSettings() {
    this.setVisible(true);
    if (this.background) {
      this.background.setVisible(true).setAlpha(1);
    }
  }

  // Method to hide settings menu
  hideSettings() {
    this.setVisible(false);
    this.background.setAlpha(0);
  }
}

export default SettingsMenu;

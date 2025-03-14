import Phaser from "phaser";

class SettingsMenu extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    this.scene = scene;

    // Set a high depth for the settings menu to ensure it's on top
    this.setDepth(1000);

    // Create the background within the container
    if (scene.textures.exists('settings')) {
      this.background = scene.add.image(
        scene.cameras.main.centerX, 
        scene.cameras.main.centerY, 
        'settings'
      ).setScrollFactor(0).setAlpha(1).setDisplaySize(this.scene.cameras.main.width, this.scene.cameras.main.height);;

      this.add(this.background);
    }

    // Create the fullscreen button and ensure it's interactive
    this.fullscreenButton = scene.add.text(50, 50, 'Lánscálán', {
      fontSize: '64px',
      fill: '#fff',
      backgroundColor: '#333',
      padding: { x: 10, y: 5 }
    })
      .setInteractive()
      .setOrigin(0, 0)
      .setAlpha(1)
      .setScrollFactor(0)
      .setDepth(2000)
      .on('pointerdown', () => {
        if (this.scene.scale.isFullscreen) {
          this.scene.scale.stopFullscreen();
          this.fullscreenButton.setText('Lánscálán');
        } else {
          this.scene.scale.startFullscreen();
          this.fullscreenButton.setText('Gnáthscáileán');
        }
      });

    // Ensure the correct label on start
    if (scene.scale.isFullscreen) {
      this.fullscreenButton.setText('Gnáthscáileán');
    } else {
      this.fullscreenButton.setText('Lánscálán');
    }

    // Add elements to the container
    this.add([this.fullscreenButton]);

    // Initially hidden to avoid any visibility quirks
    // this.setVisible(false);
    // this.background.setVisible(false);
    // this.fullscreenButton.setVisible(false);

    scene.add.existing(this);
  }

  // // Method to show settings menu
  // showSettings() {
  //   this.setVisible(true);

  //   // Make background visible
  //   if (this.background) {
  //     this.background.setVisible(true).setAlpha(1);
  //   }

  //   // Make fullscreen button visible and adjust its depth
  //   this.fullscreenButton.setVisible(true).setAlpha(1).setDepth(2000);

  //   // Positioning the fullscreen button (to ensure it is visible)
  //   this.fixButtonPosition();

  //   // Adjust button size based on camera zoom
  //   this.updateButtonScale();

  //   // Set correct fullscreen button state when returning to settings
  //   if (this.scene.scale.isFullscreen) {
  //     this.fullscreenButton.setText('Gnáthscáileán');
  //   } else {
  //     this.fullscreenButton.setText('Lánscálán');
  //   }
  // }

  // // Method to hide settings menu
  // hideSettings() {
  //   this.setVisible(false);
  //   if (this.background) {
  //     this.background.setVisible(false).setAlpha(0);
  //   }
  //   this.fullscreenButton.setVisible(false).setAlpha(0);
  // }

  // Update button scale to adjust based on camera zoom level
  updateButtonScale() {
    if (this.fullscreenButton) {
      const zoomLevel = this.scene.cameras.main.zoom;
      this.fullscreenButton.setScale(1 / zoomLevel);
    }
  }

//   // Ensure the button is within visible bounds based on the camera view
//   fixButtonPosition() {
//     const camWidth = this.scene.cameras.main.width;
//     const camHeight = this.scene.cameras.main.height;

//     // Adjust the fullscreen button's position to ensure it's within the camera bounds
//     this.fullscreenButton.x = Phaser.Math.Clamp(this.fullscreenButton.x, 0, camWidth - this.fullscreenButton.width);
//     this.fullscreenButton.y = Phaser.Math.Clamp(this.fullscreenButton.y, 0, camHeight - this.fullscreenButton.height);
//   }
}

export default SettingsMenu;

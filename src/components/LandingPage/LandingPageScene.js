import Phaser from 'phaser';

class LandingPageScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LandingPageScene' });
  }

  preload() {
    this.load.image('celt-ring', 'phaser-resources/images/celt-ring.png');
    this.load.image('background', 'phaser-resources/images/bg0.png');
    this.load.image('middle-c', 'phaser-resources/images/ui/middle-c.png');
    this.load.image('title', 'phaser-resources/images/game-title.png');
    this.load.image('fairyLight', 'phaser-resources/images/fairyLight.png');
  }

  create() {
    // Add background
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.setDisplaySize(this.scale.width, this.scale.height);

    // Create start button
    const buttonY = window.innerHeight * 2 / 3;
    const startButton = this.add
      .sprite(window.innerWidth / 2, buttonY, 'middle-c')
      .setInteractive();

    startButton.on('pointerdown', () => {
      // Handle button click
    //   this.scene.start('MainGame'); // Replace 'MainGame' with your next scene
    alert('lps')
    });

    // Add button rotation animation
    this.tweens.add({
      targets: startButton,
      rotation: Phaser.Math.DegToRad(360),
      duration: 34000,
      repeat: -1,
      ease: 'Linear',
    });
  }
}

export default LandingPageScene;

import Phaser from 'phaser';
import IntroSequence from '../IntroSequence/IntroSequence'; 
class MainGame extends Phaser.Scene {
  constructor() {
    super({ key: 'MainGame' });  // Key for transitioning

 
  }

  preload() {

    // this.load.font('penny', 'phaser-resources/fonts/IrishPenny.ttf');


    this.load.image('celt-ring', '/phaser-resources/images/celt-ring.png');
    this.load.image('background', '/phaser-resources/images/bg1.png');







  }

  create() {
  
    // Display a background image
    const background = this.add.image(0, 0, 'background');
    background.setOrigin(0, 0);
    background.setDisplaySize(this.scale.width, this.scale.height);
    background.setAlpha(0); // Set initial alpha to 0 (transparent)

    // Fade in the background
    this.tweens.add({
      targets: background,
      alpha: 1,
      duration: 3000,
      ease: 'Linear',
    });


    
    // After fading in background, you can start the intro sequence
    this.scene.start('IntroSequence');  // Transition to IntroSequence scene
  }

  update() {

    
    // Main game logic
  }
}

export default MainGame;

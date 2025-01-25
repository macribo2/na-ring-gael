import Phaser from 'phaser';
import IntroSequence from '../IntroSequence/IntroSequence'; 
class MainGame extends Phaser.Scene {
  constructor() {
    super({ key: 'MainGame' });  // Key for transitioning
  }

  preload() {

    // this.load.font('penny', 'phaser-resources/fonts/IrishPenny.ttf');


    this.load.image('celt-ring', 'assets/images/celt-ring.png');
    this.load.image('background', 'assets/images/bg1.png');
    this.load.image('upButtonDark', 'assets/images/ui/pad-u.png');
    this.load.image('downButtonDark', 'assets/images/ui/pad-d.png');
    this.load.image('leftButtonDark', 'assets/images/ui/pad-l.png');
    this.load.image('rightButtonDark', 'assets/images/ui/pad-r.png');
    this.load.image('middleButtonDark', 'assets/images/ui/middle-b.png');
    this.load.image('upButtonLit', 'assets/images/ui/pad-u-lit.png');
    this.load.image('downButtonLit', 'assets/images/ui/pad-d-lit.png');
    this.load.image('leftButtonLit', 'assets/images/ui/pad-l-lit.png');
    this.load.image('rightButtonLit', 'assets/images/ui/pad-r-lit.png');
    this.load.image('middleButtonLit', 'assets/images/ui/middle-a.png');

    this.load.image('fortuna00', 'assets/images/o-fortuna/0.png');
    this.load.image('fortuna01', 'assets/images/o-fortuna/1.png');
    this.load.image('fortuna02', 'assets/images/o-fortuna/2.png');
    this.load.image('fortuna03', 'assets/images/o-fortuna/3.png');
    this.load.image('fortuna04', 'assets/images/o-fortuna/4.png');
    this.load.image('fortuna05', 'assets/images/o-fortuna/5.png');
    this.load.image('fortuna06', 'assets/images/o-fortuna/6.png');
    this.load.image('fortuna07', 'assets/images/o-fortuna/7.png');
    this.load.image('fortuna08', 'assets/images/o-fortuna/8.png');
    this.load.image('fortuna09', 'assets/images/o-fortuna/9.png');
    this.load.image('fortuna10', 'assets/images/o-fortuna/10.png');
    this.load.image('fortuna11', 'assets/images/o-fortuna/11.png');
    this.load.image('fortuna12', 'assets/images/o-fortuna/12.png');
    this.load.image('fortuna13', 'assets/images/o-fortuna/13.png');
    this.load.image('fortuna14', 'assets/images/o-fortuna/14.png');
    this.load.image('fortuna15', 'assets/images/o-fortuna/15.png');
    this.load.image('fortuna16', 'assets/images/o-fortuna/16.png');
    this.load.image('fortuna17', 'assets/images/o-fortuna/17.png');
    this.load.image('fortuna18', 'assets/images/o-fortuna/18.png');
    this.load.image('fortuna19', 'assets/images/o-fortuna/19.png');
    this.load.image('fortuna20', 'assets/images/o-fortuna/10.png');
    this.load.image('fortuna21', 'assets/images/o-fortuna/21.png');
    this.load.image('fortuna22', 'assets/images/o-fortuna/22.png');
    this.load.image('fortuna23', 'assets/images/o-fortuna/23.png');
    this.load.image('fortuna24', 'assets/images/o-fortuna/24.png');
    this.load.image('fortuna25', 'assets/images/o-fortuna/25.png');
    this.load.image('fortuna26', 'assets/images/o-fortuna/26.png');
    this.load.image('fortuna27', 'assets/images/o-fortuna/27.png');
    this.load.image('fortuna28', 'assets/images/o-fortuna/28.png');
    this.load.image('fortuna29', 'assets/images/o-fortuna/29.png');
    this.load.image('fortuna30', 'assets/images/o-fortuna/30.png');
    this.load.image('fortuna31', 'assets/images/o-fortuna/31.png');
    this.load.image('fortuna32', 'assets/images/o-fortuna/32.png');
    this.load.image('fortuna33', 'assets/images/o-fortuna/33.png');
    this.load.image('fortuna34', 'assets/images/o-fortuna/34.png');
    this.load.image('fortuna35', 'assets/images/o-fortuna/35.png');
    this.load.image('fortuna36', 'assets/images/o-fortuna/36.png');
    this.load.image('fortuna37', 'assets/images/o-fortuna/37.png');
    this.load.image('fortuna38', 'assets/images/o-fortuna/38.png');
    this.load.image('fortuna39', 'assets/images/o-fortuna/39.png');
    this.load.image('fortuna40', 'assets/images/o-fortuna/40.png');
    this.load.image('fortuna41', 'assets/images/o-fortuna/41.png');
    this.load.image('fortuna42', 'assets/images/o-fortuna/42.png');
    this.load.image('fortuna43', 'assets/images/o-fortuna/43.png');
    this.load.image('fortuna44', 'assets/images/o-fortuna/44.png');
    this.load.image('fortuna45', 'assets/images/o-fortuna/45.png');
    this.load.image('fortuna46', 'assets/images/o-fortuna/46.png');
    this.load.image('fortuna47', 'assets/images/o-fortuna/47.png');
    this.load.image('fortuna48', 'assets/images/o-fortuna/48.png');
    this.load.image('fortuna49', 'assets/images/o-fortuna/49.png');
    this.load.image('fortuna50', 'assets/images/o-fortuna/50.png');
    this.load.image('fortuna51', 'assets/images/o-fortuna/51.png');
    this.load.image('fortuna52', 'assets/images/o-fortuna/52.png');
    this.load.image('fortuna53', 'assets/images/o-fortuna/53.png');
    this.load.image('fortuna54', 'assets/images/o-fortuna/54.png');
    this.load.image('fortuna55', 'assets/images/o-fortuna/55.png');
    this.load.image('fortuna56', 'assets/images/o-fortuna/56.png');
    this.load.image('fortuna57', 'assets/images/o-fortuna/57.png');
    this.load.image('fortuna58', 'assets/images/o-fortuna/58.png');
    this.load.image('fortuna59', 'assets/images/o-fortuna/59.png');
    this.load.image('fortuna60', 'assets/images/o-fortuna/60.png');
    this.load.image('fortuna61', 'assets/images/o-fortuna/61.png');
    this.load.image('fortuna62', 'assets/images/o-fortuna/62.png');
    this.load.image('fortuna63', 'assets/images/o-fortuna/63.png');








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

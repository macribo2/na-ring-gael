import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { useHistory, useLocation } from 'react-router-dom';
import MainGame  from '../MainGame/MainGame';
import IntroSequence from '../IntroSequence/IntroSequence';
import RexTextTypingPlugin from 'phaser3-rex-plugins/plugins/texttyping-plugin.js';

const LandingPage = () => {
  const gameRef = useRef(null); // Reference to hold the Phaser game instance
  const [fullscreen, setFullscreen] = useState(false); // Track fullscreen state
  const location = useLocation(); // React Router hook for location
  const appHistory = useHistory(); // React Router hook for navigation

  // Phaser configuration and game initialization
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: 'phaser-container', // Attach the game canvas here
      width: 800,
      height: 480,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: [MainGame, IntroSequence],  
      plugins: {
        scene: [
          {
            key: 'rexTextTyping', // Key to reference the plugin in your scene
            plugin: RexTextTypingPlugin,
            mapping: 'rexTextTyping' // Mapping to access it in the scene (e.g., this.rexTextTyping)
          }
        ]
      
    
      
    }}

    // Create the Phaser game instance
    const game = new Phaser.Game(config);
    gameRef.current = game;

    // Cleanup Phaser instance on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true); // Cleanup Phaser instance on unmount
        gameRef.current = null;
      }
    };
  }, []);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const elem = document.documentElement;
      const fullscreenPromise = elem.requestFullscreen
        ? elem.requestFullscreen()
        : elem.webkitRequestFullscreen(); // Safari
      fullscreenPromise.then(() => setFullscreen(true));
    } else {
      const exitPromise = document.exitFullscreen
        ? document.exitFullscreen()
        : document.webkitExitFullscreen(); // Safari
      exitPromise.then(() => setFullscreen(false));
    }
  };

  // Phaser scene methods
  function preload() {
    this.load.image('fog', '/phaser-resources/images/foreground-elements/fog01.png');
    this.load.image('background', '/phaser-resources/images/bg0.png');
    this.load.image('celt-ring', '/phaser-resources/images/celt-ring.png');
    this.load.image('middle-c', '/phaser-resources/images/ui/middle-c.png');
    this.load.image('title', '/phaser-resources/images/game-title.png');
    this.load.image('fairyLight', '/phaser-resources/images/fairyLight.png'); // Load the fairy light image
  }

  function create() {
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.setDisplaySize(this.scale.width, this.scale.height);

    // Add fog
    this.fog = this.add.tileSprite(0, this.cameras.main.height - 400, 1024, 512, 'fog');
    this.fog.setOrigin(0, 0).setDepth(99).setAlpha(0.5).setScale(2);

    // Add title and start button
    const buttonY = window.innerHeight * 2 / 3;
    const title = this.add.image(window.innerWidth * 1 / 2, window.innerHeight * 1 / 3, 'title').setScale(0.7);
    const startButton = this.add.sprite(window.innerWidth / 2, buttonY, 'middle-c').setInteractive();

    // Add a slow spinning effect (tween)
    this.tweens.add({
      targets: startButton,
      rotation: Phaser.Math.DegToRad(360),
      duration: 34000,
      repeat: -1,
      ease: 'Linear',
    });

    // Add DOM click listener to ensure fullscreen request works
    const canvas = this.game.canvas;
    canvas.addEventListener('click', () => {
      const elem = document.documentElement;

      if (!document.fullscreenElement) {
        elem.requestFullscreen()
          .then(() => console.log('Fullscreen mode enabled'))
          .catch((err) => console.error('Fullscreen request failed:', err));
      } else {
        document.exitFullscreen()
          .then(() => console.log('Fullscreen mode disabled'))
          .catch((err) => console.error('Exiting fullscreen failed:', err));
      }
    });

    // Trigger the DOM click event when Phaser button is clicked
    startButton.on('pointerdown', () => {
     
// Fade out the current scene while fading in the next scene
  this.cameras.main.fadeOut(500, 0, 0, 0); // Fade out the current scene

  // When the fade-out is complete, transition to the next scene
  this.cameras.main.once('camerafadeoutcomplete', () => {
    this.scene.start('MainGame'); // Start the MainGame scene

    // Fade in the new scene (MainGame)
    this.cameras.main.fadeIn(500, 0, 0, 0); // Fade in the new scene


    });
  });

    startButton.on('pointerover', () => {
      startButton.setScale(1.1);
    });

    startButton.on('pointerout', () => {
      startButton.setScale(1);
    });

    // Add particles and animations
    const particleContainer = this.add.container(0, 0);
    const particles = [];
    for (let i = 0; i < 16; i++) {
      const x = Phaser.Math.Between(0, this.scale.width);
      const y = Phaser.Math.Between(0, this.scale.height);
      const particle = this.add.image(x, y, 'fairyLight').setScale(
        Phaser.Math.FloatBetween(0.3, 0.8)
      );
      particle.alpha = Phaser.Math.FloatBetween(0.1, 0.8); // Initial transparency
      particleContainer.add(particle);
      particles.push(particle);

      // Add individual drifting and twinkling animations
      this.tweens.add({
        targets: particle,
        x: `+=${Phaser.Math.Between(-50, 50)}`,
        y: `+=${Phaser.Math.Between(-50, 50)}`,
        duration: Phaser.Math.Between(5000, 10000),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });

      this.tweens.add({
        targets: particle,
        alpha: {
          start: Phaser.Math.FloatBetween(0, 0.5),
          to: Phaser.Math.FloatBetween(0.8, 1),
        },
        duration: Phaser.Math.Between(1000, 9000),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }

    this.tweens.add({
      targets: particleContainer,
      rotation: Phaser.Math.DegToRad(360),
      duration: 400000,
      repeat: -1,
      ease: 'Linear',
    });
  }

  function update(time, delta) {
    if (this.fog) {
      this.fog.tilePositionX += 0.5; // Scroll the fog horizontally
    }
  }

  return(

<>

          <div id="phaser-container" style={{ width: '100%', height: '100%', position:"fixed",zIndex:2}}>
          </div>;
<button
          onClick={toggleFullscreen}
          style={{
            position: 'fixed',
            top: '0',
            right: '0',
            padding: '10px 20px',
            zIndex: 510,
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            border: '34px solid orange',
            cursor: 'pointer',
            fontSize: '16px',
            borderRadius: '4px',
          }}
        >
          Toggle Fullscreen
        </button>
</>
    
  )
  
};

export default LandingPage;

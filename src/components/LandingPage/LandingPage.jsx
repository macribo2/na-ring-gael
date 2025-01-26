import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { useHistory } from 'react-router-dom';
import MainGame from '../MainGame/MainGame';
import IntroSequence from '../IntroSequence/IntroSequence';
import RexTextTypingPlugin from 'phaser3-rex-plugins/plugins/texttyping-plugin.js';
import style from './LandingPage.css';
const LandingPage = () => {
  const gameRef = useRef(null); // Reference to hold the Phaser game instance
  const [fullscreen, setFullscreen] = useState(false); // Track fullscreen state
  const appHistory = useHistory(); // React Router hook for navigation
  const [buttonVisible, setButtonVisible] = useState(true); // Track button visibility

  // Phaser game initialization
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: 'phaser-container', // Attach the game canvas here
             width: window.innerWidth, // Set width to match the window width
         height: window.innerHeight, // Set height to match the window height
         
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: [LandingPageScene, IntroSequence, MainGame], // Include LandingPageScene instead of LandingPage
      plugins: {
        scene: [
          {
            key: 'rexTextTyping',
            plugin: RexTextTypingPlugin,
            mapping: 'rexTextTyping',
          },
        ],
      },
    };

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

  // Toggle fullscreen and start
  const toggleFullscreenAndStart = () => {
    // Handle fullscreen toggle
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

    const button = document.querySelector('.start-fullscreen-button');
    if (button) {
      button.style.opacity = 0; // Start fading the button
      button.style.transition = 'opacity 0.5s ease'; // Smooth fade-out transition
    }
  
    // Trigger start button functionality
    const scene = gameRef.current && gameRef.current.scene.getScene('LandingPageScene');
    if (scene) {
      console.log('Found the scene'); // Check if the scene is properly found
      scene.cameras.main.fadeOut(500, 0, 0, 0); // Fade out the current scene
      scene.cameras.main.once('camerafadeoutcomplete', () => {
        scene.scene.start('IntroSequence'); // Transition to IntroSequence
        scene.cameras.main.fadeIn(500, 0, 0, 0); // Fade in the new scene
      });
      console.log('Transition triggered');
    } else {
      console.log('Scene not found or gameRef not initialized');
    }
  };

  return (
    <>
      <div id="phaser-container" style={{ width: '100%', height: '100%', position: 'fixed', zIndex: 2 }} />
      {buttonVisible && (
        <image
          className="start-fullscreen-button"
          onClick={toggleFullscreenAndStart}
        />
        
      )}
    </>
  );
};

const LandingPageScene = {
  key: 'LandingPageScene', // Explicit scene key

  preload() {
    this.load.image('fog', '/phaser-resources/images/foreground-elements/fog01.png');
    this.load.image('background', '/phaser-resources/images/bg0.png');
    this.load.image('celt-ring', '/phaser-resources/images/celt-ring.png');
    this.load.image('middle-c', '/phaser-resources/images/ui/middle-c.png');
    this.load.image('title', '/phaser-resources/images/game-title.png');
    this.load.image('fairyLight', '/phaser-resources/images/fairyLight.png');
  },  

  create() {
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.setDisplaySize(this.scale.width, this.scale.height);

    this.fog = this.add.tileSprite(0, this.cameras.main.height - 400, 1024, 512, 'fog');
    this.fog.setOrigin(0, 0).setDepth(99).setAlpha(0.5).setScale(2);

    const title = this.add.image(window.innerWidth * 1 / 2, window.innerHeight * 1 / 3, 'title').setScale(0.7);
      // Create a container to hold particles
   const particleContainer = this.add.container(0, 0);

   // Add particles to the container
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
   
     // Add tween for individual drifting and fading
     this.tweens.add({
       targets: particle,
       x: `+=${Phaser.Math.Between(-50, 50)}`, // Random horizontal drift
       y: `+=${Phaser.Math.Between(-50, 50)}`, // Random vertical drift
       duration: Phaser.Math.Between(5000, 10000), // Smooth drifting motion
       yoyo: true,
       repeat: -1,
       ease: 'Sine.easeInOut',
     });
   
     // Add a separate tween for twinkling (alpha changes)
     this.tweens.add({
       targets: particle,
       alpha: {
         start: Phaser.Math.FloatBetween(0, 0.5), // Start with a dim glow
         to: Phaser.Math.FloatBetween(0.8, 1), // Twinkle brighter
       },
       duration: Phaser.Math.Between(1000, 9000), // Faster twinkle effect
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
 

  },

  update(time, delta) {
    if (this.fog) {
      this.fog.tilePositionX += 0.5; // Scroll the fog horizontally
    }
  },
};


export default LandingPage;

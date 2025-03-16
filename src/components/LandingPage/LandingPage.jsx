
import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { useHistory } from 'react-router-dom';
import MainGame from '../MainGame/MainGame';
import IntroSequence from '../IntroSequence/IntroSequence';
import RexTextTypingPlugin from 'phaser3-rex-plugins/plugins/texttyping-plugin.js';
import middleC from '../../images/middle-c.gif';
import style from './LandingPage.css';
import BallyGamboy from '../BallyGamBoy/BallyGamBoy-with-rot'
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
      scene: [ LandingPageScene, IntroSequence, MainGame], 
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
  useEffect(() => {
    // Simulating loading time
    setTimeout(() => {
      // Fade out the mask
      const mask = document.getElementById("mask");
      mask.style.opacity = 0;
    }, 1000); // Mask fades out after 3 seconds (adjust as necessary)
  
  }, []);
  // Toggle fullscreen and start

  // In LandingPage component
const [buttonMounted, setButtonMounted] = useState(false);

useEffect(() => {
  const phaserInitTimer = setTimeout(() => {
    setButtonMounted(true);
  }, 100); // 100ms delay after Phaser init
  
  return () => clearTimeout(phaserInitTimer);
}, []);

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
   // Play the sound
 
    // Fade out the title text
    const title = document.querySelector('.title-text');
    if (title) {
      title.style.transition = 'opacity 0.5s ease-out'; // Smooth fade-out
      title.style.opacity = '0'; // Start fade-out effect
      setTimeout(() => {
        title.style.display = 'none'; // Hide after transition
      }, 500);
    }
  
    // Fade out the button and touch prompts
    const prompts = document.querySelectorAll('.touch-prompt');
    if (prompts.length > 0) {
      prompts.forEach(prompt => {
        prompt.style.transition = 'opacity 0.5s ease-out';
        prompt.style.opacity = '0';
        setTimeout(() => {
          prompt.style.display = 'none';
        }, 500);
      });
    }
    const button = document.querySelector('.start-fullscreen-button');
    if (button) {
      button.style.transition = 'opacity 0.5s ease-out';
      button.style.opacity = '0';
      setTimeout(() => {
        button.style.display = 'none';
      }, 500);
    }

    // Transition to the next scene
    const scene = gameRef.current && gameRef.current.scene.getScene('LandingPageScene');
    if (scene && scene.cameras && scene.cameras.main) {
      scene.cameras.main.fadeOut(500, 0, 0, 0); // Fade out the current scene
      scene.cameras.main.once('camerafadeoutcomplete', () => {
        scene.scene.start('IntroSequence'); // Switch to IntroSequence
        scene.cameras.main.fadeIn(500, 0, 0, 0); // Fade in new scene
      });
    } else {
      console.error('Scene or camera is not properly initialized.');
    }


  };
  

  return (
    <>
      <div id="phaser-container" style={{ width: '100%', height: '100%', position: 'fixed', zIndex: 2 }} />
      
      {buttonVisible && buttonMounted &&(
        <>
          <div className="touch-prompt-container start-button-container  ">

        
<div className='touch-prompt'></div>
<div className='touch-prompt'></div>
<div className='touch-prompt'></div>
<div className='touch-prompt'></div>
                   
            <img
              className="start-fullscreen-button"
              src={middleC}  // Add source for the button image
              alt="Start Fullscreen"
              onClick={toggleFullscreenAndStart}
            />
          </div>
  
          <div className="title-container">
            <div className="title-text"></div>
          </div>
            {/* Full Screen Mask */}
            
    <div id="mask"></div>
        </>
      )}
    </>
  );
  
};

const LandingPageScene = {
  key: 'LandingPageScene', // Explicit scene key

  preload() {
    this.load.image('fog', '/phaser-resources/images/foreground-elements/fog01.png');
    this.load.image('background', '/phaser-resources/images/fog5.png');
    this.load.image('backgroundFoggy', '/phaser-resources/images/fog4.png');
    this.load.image('branches', '/phaser-resources/images/background-elements/branches.png');
    this.load.image('branches3', '/phaser-resources/images/background-elements/branches2.png');
    this.load.image('backgroundFar', '/phaser-resources/images/24d.png');
    this.load.image('celt-ring', '/phaser-resources/images/celt-ring.png');
    this.load.image('middle-c', '/phaser-resources/images/ui/middle-c.png');
    this.load.image('fairyLight', '/phaser-resources/images/fairyLight.png');
    this.load.image('fairyLightBlur', '/phaser-resources/images/fairyLightBlur.png');
  },  

  create() {
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.setDisplaySize(this.scale.width, this.scale.height);

    this.fog = this.add.tileSprite(0, this.cameras.main.height - 450, 1024, 512, 'fog');
    this.fog.setOrigin(0, 0).setDepth(99).setAlpha(0.2).setScale(3);

    this.fog2 = this.add.tileSprite(0, this.cameras.main.height - 400, 1024, 512, 'fog');
    this.fog2.setOrigin(0, 0).setDepth(99).setAlpha(0.1).setScale(2);

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
      this.fog.tilePositionX += 0.3; // Scroll the fog horizontally
    }

    if (this.fog2) {
      this.fog2.tilePositionX += 0.5; // Scroll the fog horizontally
    }

  },
};


export default LandingPage;

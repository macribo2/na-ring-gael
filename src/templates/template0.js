import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { useHistory, useLocation } from 'react-router-dom';

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
      scene: {
        preload,
        create,
        update,
      },
    };

    // Create the Phaser game instance
    const game = new Phaser.Game(config);
    gameRef.current = game;

    // Pass toggleFullscreen function to the Phaser scene
    game.toggleFullscreen = toggleFullscreen;

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

    this.load.image('background', '/phaser-resources/images/bg0.png');
    this.load.image('middle-c', '/phaser-resources/images/ui/middle-c.png');
    this.load.image('title', '/phaser-resources/images/game-title.png');
        this.load.image('fairyLight', '/phaser-resources/images/fairyLight.png'); // Load the fairy light image  

}.

  function create() {
    // Add background
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.setDisplaySize(this.scale.width, this.scale.height);

    // Add fog
    this.fog = this.add.tileSprite(0, this.cameras.main.height - 400, 1024, 512, 'fog');
    this.fog.setOrigin(0, 0).setDepth(99).setAlpha(0.5).setScale(2);


  


    
    // Set the image origin to the center of the image so it can be scaled properly
    background.setOrigin(0, 0); // Set origin to the top-left corner
    
    // Scale the image to cover the entire screen
    background.setDisplaySize(this.scale.width, this.scale.height); // Stretch to the full screen size
    
    // this.add.text(400, 100, 'Welcome to the Game!', {
   //   fontSize: '32px',
   //   fill: '#fff',
   //   align: 'center'
   // }).setOrigin(0.5);
   
   // Calculate the position of the start button
   const buttonY = window.innerHeight * 2 / 3; // Two-thirds of the screen height
   
   const title = this.add.image(window.innerWidth *1/2, window.innerHeight * 1/3, 'title').setScale(0.7); // Position it at (0, 0)
   // Create the start button centered horizontally and two-thirds of the way down the screen
 const startButton = this.add.sprite(window.innerWidth / 2, buttonY, 'middle-c').setInteractive(); // Center horizontally and position vertically

 // Add a slow spinning effect (tween)
 this.tweens.add({
     targets: startButton, // The object we want to tween
     rotation: Phaser.Math.DegToRad(360), // Rotate 360 degrees (one full rotation)
     duration: 34000, // Duration for one full rotation (in milliseconds)
   repeat: -1, // Repeat forever
   ease: 'Linear', // Smooth and constant speed

   
 });

startButton.on('pointerdown', () => {
 
      // Call the toggleFullscreen function defined in React
      if (this.game.toggleFullscreen) {
        this.game.toggleFullscreen();
      }
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
 

 







}

  function update(time, delta) {
    if (this.fog) {
      this.fog.tilePositionX += 0.5; // Scroll the fog horizontally
    }
  }

  return (
    <>
      <div id="phaser-container" style={{ width: '100%', height: '100%' }}></div>
 
    </>
  );
};

export default LandingPage;

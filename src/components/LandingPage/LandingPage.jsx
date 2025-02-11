import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { useHistory } from 'react-router-dom';
import MainGame from '../MainGame/MainGame';
import IntroSequence from '../IntroSequence/IntroSequence';
import RexTextTypingPlugin from 'phaser3-rex-plugins/plugins/texttyping-plugin.js';
import ChampionSelect3 from '../IntroSequence/ChampionSelect3';
import style from './LandingPage.css';

const LandingPage = () => {
  const gameRef = useRef(null); // Reference to hold the Phaser game instance
  const appHistory = useHistory(); // React Router hook for navigation
  


  // Return the landing page component JSX
  return (
    <>
      <div id="phaser-container"  />
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

    this.fog = this.add.tileSprite(0, this.cameras.main.height - 400, 1024, 512, 'fog');
    this.fog.setOrigin(0, 0).setDepth(99).setAlpha(0.2).setScale(2);

    this.fog2 = this.add.tileSprite(0, this.cameras.main.height - 400, 1024, 512, 'fog');
    this.fog2.setOrigin(0, 0).setDepth(99).setAlpha(0.1).setScale(2);

    // Add a dial image for interaction
    const dial = this.add.image(this.scale.width / 2, this.scale.height / 2, 'middle-c');
    dial.setOrigin(0.5, 0.5);
    dial.setInteractive(); // Enable interaction
    dial.setScale(0.5); // Adjust the size of the dial
    
    // Handle click on the dial to transition to the next scene
    dial.on('pointerdown', () => {
      const scene = this.scene;
      const camera = this.cameras.main;

      camera.fadeOut(500, 0, 0, 0); // Fade out the current scene
      camera.once('camerafadeoutcomplete', () => {
        scene.start('IntroSequence'); // Transition to IntroSequence
        camera.fadeIn(500, 0, 0, 0); // Fade in the new scene
      });
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

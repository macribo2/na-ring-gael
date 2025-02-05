import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import * as ROT from 'rot-js';
import { useHistory, useLocation } from 'react-router-dom';

const BallyGamBoy = () => {
  const gameRef = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);
  const location = useLocation();
  const appHistory = useHistory();

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: 'phaser-container',
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

    const game = new Phaser.Game(config);
    gameRef.current = game;
    game.toggleFullscreen = toggleFullscreen;

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setFullscreen(false));
    }
  };

  function preload() {
    this.load.image('floor', '/phaser-resources/images/rot/floor.png');
    this.load.image('wall', '/phaser-resources/images/rot/wall.png');
    this.load.image('player', '/phaser-resources/images/champions/32.png');
  }

  function create() {
    this.map = [];
    this.tileSize = 32;
    
    const mapWidth = Math.floor(this.scale.width / this.tileSize);
    const mapHeight = Math.floor(this.scale.height / this.tileSize);
    const dungeon = new ROT.Map.Digger(mapWidth, mapHeight);
    
    dungeon.create((x, y, wall) => {
      this.map.push({ x, y, type: wall ? 'wall' : 'floor' });
    });
    
    this.map.forEach(tile => {
      this.add.image(tile.x * this.tileSize, tile.y * this.tileSize, tile.type)
        .setOrigin(0);
    });
    
    this.player = this.add.sprite(50, 50, 'player');
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  function update() {
    if (this.cursors.left.isDown) {
      this.player.x -= 2;
    } else if (this.cursors.right.isDown) {
      this.player.x += 2;
    }
    if (this.cursors.up.isDown) {
      this.player.y -= 2;
    } else if (this.cursors.down.isDown) {
      this.player.y += 2;
    }
  }

  return <div id="phaser-container" style={{ width: '100%', height: '100%' }}></div>;
};

export default BallyGamBoy;

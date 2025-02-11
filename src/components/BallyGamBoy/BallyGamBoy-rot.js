import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import * as ROT from 'rot-js';

const DungeonGame = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: 'phaser-container',
      width: 800,
      height: 600,
      scene: { preload, create, update },
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  function preload() {
    this.load.image('floor', '/phaser-resources/images/floor.png');
    this.load.image('wall', '/phaser-resources/images/wall.png');
    this.load.image('player', '/phaser-resources/images/player.png');
  }

  function create() {
    const mapWidth = 40;
    const mapHeight = 30;
    const tileSize = 20;
    
    // Generate a dungeon
    const dungeon = new ROT.Map.Digger(mapWidth, mapHeight);
    const map = Array.from({ length: mapHeight }, () => Array(mapWidth).fill(1));
    
    dungeon.create((x, y, wall) => {
      map[y][x] = wall ? 1 : 0;
    });
    
    // Create tile display
    const tiles = this.add.group();
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const tileType = map[y][x] ? 'wall' : 'floor';
        const tile = this.add.image(x * tileSize, y * tileSize, tileType).setOrigin(0, 0);
        tiles.add(tile);
      }
    }

    // Add player
    const player = this.add.sprite(100, 100, 'player').setOrigin(0, 0);
    this.player = player;
    this.map = map;
    this.tileSize = tileSize;
    
    // Pathfinding setup
    this.pathFinder = new ROT.Path.AStar(5, 5, (x, y) => map[y][x] === 0, { topology: 4 });
  }

  function update() {
    // Placeholder for movement logic
  }

  return <div id="phaser-container" style={{ width: '100%', height: '100%' }}></div>;
};

export default DungeonGame;

import Phaser from 'phaser';

import { CountyData } from './county-data.js';

export default class FastTravel1 extends Phaser.Scene {
  constructor() {
    super({ key: 'fasttravel1' });
this.countyNames = [
  "westmeath", "longford", "cavan", "louth", "dublin", "wicklow", "carlow",
  "kildare", "laois", "offaly", "roscommon", "leitrim", "fermanagh",
  "monaghan", "armagh", "wexford", "kilkenny", "waterford", "cork",
  "tipperary", "limerick", "kerry", "clare", "galway", "mayo", "sligo",
  "donegal", "tyrone", "derry", "antrim", "down", "meath"
]; // 32 counties now
this.baseRotation = 0;
    this.countyTracker = 0;
    this.isTransitioning = false; // Add transition lock
  }

  preload() {
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    this.load.json('countyData', './mapData.json');
    this.load.image('wheel', 'phaser-resources/images/ui/eight-point-wheel.png')
    this.load.image('ciorcal-light', 'phaser-resources/images/ciorcal-glass-light.png')
    this.countyNames.forEach(county => {
      this.load.image(county, `phaser-resources/images/countyMaps/${county}.png`);
    });
  }

  createDynamicGrid() {
    // Destroy old grid if it exists
    if(this.gridContainer) this.gridContainer.destroy();
    
    // Get current county data
    const currentCounty = this.countyData[this.countyNames[this.countyTracker]];
    
    // Create container for grid
    this.gridContainer = this.add.container(400, 300)
      .setDepth(1)
      .setAlpha(0.7);
  
    const cellSize = 20; // Smaller cells for 10x10 grid
    const spacing = 2;
    
    currentCounty.mapData.forEach((row, y) => {
      row.forEach((cellValue, x) => {
        const color = this.getValueColor(cellValue);
        const rect = this.add.rectangle(
          x * (cellSize + spacing),
          y * (cellSize + spacing),
          cellSize,
          cellSize,
          color
        ).setOrigin(0);
        
        this.gridContainer.add(rect);
      });
    });
  
    // Center the grid container
    Phaser.Display.Align.In.Center(
      this.gridContainer,
      this.add.zone(400, 300, 800, 600)
    );
  }
  
  getValueColor(value) {
    // Map values to colors based on your game's needs
    if(value >= 30) return 0xFF0000; // Red for special locations
    if(value > 5) return 0x00FF00;   // Green for pathways
    return 0x555555;                 // Default gray
  }

  create() {
    // Get screen dimensions
    const { width: camWidth, height: camHeight } = this.cameras.main;
    const centerX = camWidth / 2;
    const centerY = camHeight / 2;
  
    // Calculate max grid size (80% of smallest screen dimension)
    const gridSize = Math.min(camWidth, camHeight) * 0.8;
  
    // Initialize maps with responsive sizing
    this.gameMap = this.add.image(centerX, centerY, 'meath')
      .setOrigin(0.5)
      .setDisplaySize(gridSize, gridSize);
  
    this.nextGameMap = this.add.image(centerX, centerY, 'meath')
      .setOrigin(0.5)
      .setAlpha(0)
      .setDisplaySize(gridSize, gridSize);

    
    const rawData = this.cache.json.get('countyData');
    this.countyData = {};
    rawData.forEach(config => {
      this.countyData[config.co] = new CountyData(config);
    });

    this.cameras.main.setBackgroundColor('#242424');
    

    this.wheel = this.add.image(0,0, 'wheel').setInteractive().setDepth(100).setScale(2);
    this.spokeCount = 7;
    this.anglePerSpoke = 360 / this.spokeCount;

 
    // Input handling
    this.dragging = false;
    this.previousAngle = 0;
    this.velocity = 0;
    this.input.on('pointerdown', this.startDrag, this);
    this.input.on('pointermove', this.doDrag, this);
    this.input.on('pointerup', this.stopDrag, this);
    this.input.on('pointerupoutside', this.stopDrag, this);

    // Create grid squares
    this.createDynamicGrid();
  
    const { width, height } = this.cameras.main;

    // Create a black overlay covering the whole screen
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.7); // 70% opacity black
    overlay.fillRect(0, 0, width, height);

    // Create a circular mask (transparent area)
    const maskShape = this.make.graphics();
    maskShape.fillStyle(0xffffff); // White means visible in mask
    maskShape.fillCircle(width / 2, height / 2, width * 0.3); // Scales with screen size

    // Generate a mask from the circle
    const mask = maskShape.createGeometryMask();
    overlay.setMask(mask);

    // Load the window graphic and center it
    this.add.image(width / 2, height / 2, 'ciorcal-light').setOrigin(0.5);

    const paddingRight = 20; // Match tooltip padding
    const countyNameY = 50; // Position above tooltip
  
    this.countyNameGa = this.add.text(0, countyNameY, '', {
      fontSize: '32px',
      fontFamily: 'IrishPenny',
      fill: '#ffffff',
      backgroundColor: '#000000AA',
      padding: { x: 20, y: 10 },
      align: 'right'
    })
    .setOrigin(1, 0.5) // Right-aligned (1 = x origin, 0.5 = y origin)
    .setDepth(2000) // Higher than tooltip's 1000
    .setScrollFactor(0)
    .setPosition(this.cameras.main.width - paddingRight, countyNameY);
  
  }



  startDrag(pointer) {
    this.dragging = true;
    this.previousAngle = Phaser.Math.Angle.Between(
      this.wheel.x, this.wheel.y, pointer.x, pointer.y
    );
    this.velocity = 0;
  }

  doDrag(pointer) {
    if (this.dragging) {
      const currentAngle = Phaser.Math.Angle.Between(
        this.wheel.x, this.wheel.y, pointer.x, pointer.y
      );
      const angleDelta = Phaser.Math.RadToDeg(currentAngle - this.previousAngle);
      
      this.wheel.angle += angleDelta;
      this.velocity = angleDelta;
      this.previousAngle = currentAngle;
    }
  }

  stopDrag() {
    this.dragging = false;
  }

  update() {

    this.gameMap.rotation = this.baseRotation;
this.gridContainer.rotation = this.baseRotation;

    if (!this.dragging) {
      this.wheel.angle += this.velocity;
      this.velocity *= 0.99;
      if (Math.abs(this.velocity) < 0.05) this.velocity = 0;
    }
    this.updateSpoke();
        // Sync grid rotation with the game map's rotation
      
  }

  handleCountyTransition(direction) {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    const newCounty = this.countyNames[this.countyTracker];
    const { width: camWidth, height: camHeight } = this.cameras.main;
    const gridSize = Math.min(camWidth, camHeight) * 0.8;
  
    // Set up new map
    this.nextGameMap
      .setTexture(newCounty)
      .setDisplaySize(gridSize, gridSize)
      .setPosition(camWidth/2, camHeight/2)
      .setAlpha(0)
      .setRotation(this.baseRotation);
  
    // Fade out current map while fading in new map
    this.tweens.add({
      targets: this.gameMap,
      alpha: 0,
      duration: 500,
      ease: 'Sine.easeInOut'
    });
  
    this.tweens.add({
      targets: this.nextGameMap,
      alpha: 1,
      duration: 500,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        // Swap references
        [this.gameMap, this.nextGameMap] = [this.nextGameMap, this.gameMap];
        this.gameMap.setAlpha(1); // Reset alpha for next transition
        this.nextGameMap.setAlpha(0).setTexture('meath'); // Reset next map
        
        this.isTransitioning = false;
        this.createDynamicGrid();
      }
    });
  
    // Continue with rotation animation
    const targetRotation = this.baseRotation + Phaser.Math.DegToRad(direction === 'down' ? 5 : -5);
    this.tweens.add({
      targets: this,
      baseRotation: targetRotation,
      duration: 500,
      ease: 'Sine.easeInOut'
    });
  }
handleSpokeAnimation(direction) {
  // Rotate the gameMap by 5 degrees in place (clockwise or counter-clockwise)
  const targetRotation = this.baseRotation + Phaser.Math.DegToRad(direction === 'down' ? 5 : -5);
  
  this.tweens.add({
    targets: this,
    baseRotation: targetRotation,
    duration: 300,
    ease: 'Power1',
    onUpdate: () => {
      this.gameMap.rotation = this.baseRotation;
      this.gridContainer.rotation = this.baseRotation;
    }
  });}

updateSpoke() {
  const adjustedAngle = (this.wheel.angle % 360 + 360) % 360;
  const spokeIndex = Math.floor(adjustedAngle / this.anglePerSpoke);
  const previousCounty = this.countyTracker;

  // Handle county rotation
  if (this.previousSpokeIndex !== null) {
    if (this.previousSpokeIndex === 6 && spokeIndex === 0) {
      this.countyTracker = (this.countyTracker + 1) % 32;
    } else if (this.previousSpokeIndex === 0 && spokeIndex === 6) {
      this.countyTracker = (this.countyTracker - 1 + 32) % 32;
    }
  }
  const currentCounty = this.countyData[this.countyNames[this.countyTracker]];
  

  this.countyNameGa.setText(`${currentCounty.irishName} `);
  this.highlightSquare(spokeIndex);

  // Handle transitions
  if (this.previousSpokeIndex !== null && this.previousSpokeIndex !== spokeIndex) {
    const direction = spokeIndex > this.previousSpokeIndex || 
                      (this.previousSpokeIndex === 6 && spokeIndex === 0) ? 'down' : 'up';
    
    if (this.countyTracker !== previousCounty) {
      this.handleCountyTransition(direction); // Only handle transitions if county changes
    } else {
      this.handleSpokeAnimation(direction); // Only animate spoke if county doesn't change
    }
  }

  this.previousSpokeIndex = spokeIndex;
}


  handleMapTransition() {
    this.isTransitioning = true;
    const newCounty = this.countyNames[this.countyTracker];
    
    // Set up next map
    this.nextGameMap.setTexture(newCounty).setAlpha(0);
    
    // Animate transition
    this.tweens.add({
      targets: this.gameMap,
      alpha: 0,
      duration: 500,
      ease: 'Power2'
    });
    
    this.tweens.add({
      targets: this.nextGameMap,
      alpha: 1,
      duration: 500,
      ease: 'Power2',
      onComplete: () => {
        // Swap references
        [this.gameMap, this.nextGameMap] = [this.nextGameMap, this.gameMap];
        this.gameMap.setAlpha(1);
        this.isTransitioning = false;
      }
    });
  }


  showLocationTooltip(locationData) {
    if(this.currentTooltip) this.currentTooltip.destroy();
  
    const padding = 20; // Distance from right edge
    const fixedY = 150; // Fixed vertical position
    
    const style = {
      fontSize: '24px',
      fontFamily: 'IrishPenny',
      fill: '#ffffff',
      backgroundColor: '#000000AA',
      padding: { x: 20, y: 15 },
      align: 'right'
    };
  
    // Create text first to measure it
    this.currentTooltip = this.add.text(0, 0, locationData.gaelic, style)
      .setOrigin(1, 0.5) // Right-aligned origin (1 = right, 0.5 = vertical center)
      .setDepth(1000)
      .setScrollFactor(0);
  
    // Position at right edge minus padding
    this.currentTooltip.setPosition(
      this.cameras.main.width - padding,
      fixedY
    );
  }
  // Updated highlightSquare method
  highlightSquare(spokeIndex) {
    const currentCounty = this.countyData[this.countyNames[this.countyTracker]];
    
    // Clear previous highlights
    this.gridContainer.each(child => {
      if(child instanceof Phaser.GameObjects.Rectangle) {
        child.setFillStyle(this.getValueColor(child.getData('originalValue')));
      }
    });
  
    let foundLocation = false;
    
    currentCounty.mapData.forEach((row, rowY) => {
      row.forEach((cellValue, colX) => {
        if(cellValue >= 30) {
          const index = cellValue - 30;
          if(index === spokeIndex) {
            const rect = this.gridContainer.getAt(colX + rowY * row.length);
            rect.setFillStyle(0xFFFF00);
            foundLocation = true;
            this.showLocationTooltip(currentCounty.getLocation(index));
          }
        }
      });
    });
  
    if(!foundLocation && this.currentTooltip) {
      this.currentTooltip.destroy();
      this.currentTooltip = null;
    }
  }
  // Modified highlightSquare method
  highlightSquare(spokeIndex) {
    const currentCounty = this.countyData[this.countyNames[this.countyTracker]];
    
    // Clear previous highlights
    this.gridContainer.each(child => {
      if(child instanceof Phaser.GameObjects.Rectangle) {
        child.setFillStyle(this.getValueColor(child.getData('originalValue')));
      }
    });
  
    currentCounty.mapData.forEach((row, rowY) => {
      row.forEach((cellValue, colX) => {
        if(cellValue >= 30) {
          const index = cellValue - 30;
          if(index === spokeIndex) {
            const rect = this.gridContainer.getAt(colX + rowY * row.length);
            rect.setFillStyle(0xFFFF00);
            
            // Convert grid position to screen coordinates
            const worldPos = this.gridContainer.getLocalPoint(
              rect.x,
              rect.y
            );
            
            this.showLocationTooltip(
              currentCounty.getLocation(index),
              this.gridContainer.x + worldPos.x,
              this.gridContainer.y + worldPos.y
            );
          }
        }
      });
    });}


  createDynamicGrid() {
    if(this.gridContainer) this.gridContainer.destroy();
  
    const { width: camWidth, height: camHeight } = this.cameras.main;
    const centerX = camWidth / 2;
    const centerY = camHeight / 2;
    const gridSize = Math.min(camWidth, camHeight) * 0.8;
  
    const currentCounty = this.countyData[this.countyNames[this.countyTracker]];
    
    this.gridContainer = this.add.container(centerX, centerY)
      .setDepth(1)
      .setAlpha(0.7);
  
    const cols = currentCounty.mapData[0].length;
    const rows = currentCounty.mapData.length;
    const cellWidth = gridSize / cols;
    const cellHeight = gridSize / rows;
  
    currentCounty.mapData.forEach((row, y) => {
      row.forEach((cellValue, x) => {
        const xPos = (x * cellWidth) - gridSize/2 + cellWidth/2;
        const yPos = (y * cellHeight) - gridSize/2 + cellHeight/2;
  
        const rect = this.add.rectangle(
          xPos,
          yPos,
          cellWidth - 2,
          cellHeight - 2,
          this.getValueColor(cellValue)
        )
        .setOrigin(0.5)
        .setData('originalValue', cellValue);
  
        this.gridContainer.add(rect);
      });
    });
 
  this.gridContainer.rotation = this.baseRotation;
  this.gameMap.rotation = this.baseRotation;
  }
  
  getCoordinatesFromSpoke(spokeIndex) {
    const { width: camWidth, height: camHeight } = this.cameras.main;
    const gridSize = Math.min(camWidth, camHeight) * 0.8;
    const radius = gridSize / 2 * 0.9; // 90% of radius to keep within bounds
    
    const angle = Phaser.Math.DegToRad(spokeIndex * (360 / this.spokeCount));
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  }


}
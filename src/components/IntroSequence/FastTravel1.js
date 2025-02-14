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

    this.textDisplay = this.add.text(350, 50, 'Spoke: 0 | County: Meath', { 
      fontSize: '24px', 
      fill: '#ffffff' 
    });

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

    WebFont.load({
      custom: {
        families: ['IrishPenny'],
        urls: ['assets/fonts/irish-penny.css']
      }
    });

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
    if (!this.dragging) {
      this.wheel.angle += this.velocity;
      this.velocity *= 0.99;
      if (Math.abs(this.velocity) < 0.05) this.velocity = 0;
    }
    this.updateSpoke();
        // Sync grid rotation with the game map's rotation
        this.gridContainer.rotation = this.gameMap.rotation;
      
  }



  handleCountyTransition(direction) {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    const newCounty = this.countyNames[this.countyTracker];
  
    // Store reference to old county data
    const oldCountyData = this.countyData[this.countyNames[(this.countyTracker - 1 + 32) % 32]];
  
    // Set up new map
    this.nextGameMap.setTexture(newCounty)
      .setAlpha(0)
      .setRotation(this.gameMap.rotation);
  
    // Animate old map out
    this.tweens.add({
      targets: this.gameMap,
      rotation: `+=${Phaser.Math.DegToRad(direction === 'down' ? 5 : -5)}`,
      duration: 300,
      ease: 'Power2'
    });
  
    // Animate new map in
    this.tweens.add({
      targets: this.nextGameMap,
      rotation: `+=${Phaser.Math.DegToRad(direction === 'down' ? 5 : -5)}`,
      alpha: 1,
      duration: 300,
      ease: 'Power2',
      onComplete: () => {
        // Swap map references
        [this.gameMap, this.nextGameMap] = [this.nextGameMap, this.gameMap];
        this.gameMap.setAlpha(1);
        
        // Update grid with new county data
        this.createDynamicGrid();
        
        // Reset transition lock
        this.isTransitioning = false;
  
        // Force highlight update
        const currentAngle = (this.wheel.angle % 360 + 360) % 360;
        const currentSpoke = Math.floor(currentAngle / this.anglePerSpoke);
        this.highlightSquare(currentSpoke);
      }
    });
  
    // Cleanup old grid data
    if (oldCountyData) {
      // Add any necessary cleanup for old county data
    }
  }
handleSpokeAnimation(direction) {
  // Rotate the gameMap by 5 degrees in place (clockwise or counter-clockwise)
  const rotationAngle = direction === 'down' ? 5 : -5;  // 5 degrees in the direction of travel

  this.tweens.add({
    targets: this.gameMap,
    rotation: `+=${Phaser.Math.DegToRad(rotationAngle)}`, // Rotate 5 degrees relative to current rotation
    duration: 300,
    ease: 'Power1'
  });
}

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

  this.textDisplay.setText(`Spoke: ${spokeIndex} | County: ${this.countyNames[this.countyTracker]}`);
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
  
    // Calculate fixed position based on camera dimensions
    const fixedX = this.cameras.main.width * 0.65;
    const fixedY = this.cameras.main.height * 0.05;
  
    const style = {
      fontSize: '24px',
      fontFamily: 'IrishPenny', // Make sure this font is loaded
      fill: '#ffffff',
      backgroundColor: '#000000AA',
      padding: { x: 20, y: 15 },
      align: 'center'
    };
  
    this.currentTooltip = this.add.text(fixedX, fixedY, locationData.gaelic, style)
      .setOrigin(0.5)
      .setDepth(1000)
      .setScrollFactor(0); // Important: stays fixed during camera movements
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
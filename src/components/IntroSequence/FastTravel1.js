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
    this.load.image('particle', '/phaser-resources/images/fairyLight.png'); // Use a small white circle image

    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    this.load.json('countyData', './mapData.json');
    this.load.image('wheel', 'phaser-resources/images/ui/eight-point-wheel.png')
    this.load.image('ciorcal-light', 'phaser-resources/images/ciorcal-glass-light.png')
    this.countyNames.forEach(county => {
      this.load.image(county, `phaser-resources/images/countyMaps/${county}.png`);
    });
  }
  createDynamicGrid() {
    if(this.gridContainer) this.gridContainer.destroy();
    
    const currentCounty = this.countyData[this.countyNames[this.countyTracker]];
    const { width: camWidth, height: camHeight } = this.cameras.main;
    const gridSize = Math.min(camWidth, camHeight) * 0.8;
    const cols = currentCounty.mapData[0].length;
    const rows = currentCounty.mapData.length;
    const cellWidth = gridSize / cols;
    const cellHeight = gridSize / rows;

    this.gridContainer = this.add.container(camWidth/2, camHeight/2)
        .setDepth(1)
        .setAlpha(0.7);

    currentCounty.mapData.forEach((row, y) => {
        row.forEach((cellValue, x) => {
            const color = this.getValueColor(cellValue);
            const alpha = cellValue >= 30 ? 1 : 0.02; // Set opacity based on value
            
            const rect = this.add.rectangle(
                (x * cellWidth) - gridSize/2 + cellWidth/2,
                (y * cellHeight) - gridSize/2 + cellHeight/2,
                cellWidth - 2,
                cellHeight - 2,
                color
            )
            .setAlpha(alpha)
            .setData('originalValue', cellValue)
            .setOrigin(0.5);

            this.gridContainer.add(rect);
        });
    });
}

getValueColor(value) {
    // Return colors with full opacity - we handle alpha separately
    if(value >= 30) return 0xFF0000; // Red - special locations
    if(value > 0) return 0x00FF00;   // Green - pathways
    return 0x555555;                 // Gray - default
}
  create() {

  
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Calculate sizes
    const gridSize = Math.min(width, height) * 0.8;
    const maskRadius = gridSize / 2 * 1.05; // 5% larger than grid radius
    const backgroundSize = gridSize * 1.2; // 20% larger than grid

    // Create main mask (circle that reveals content)
    const gameMaskShape = this.make.graphics()
        .fillStyle(0xffffff)
        .fillCircle(centerX, centerY, maskRadius);
    
    const gameMask = gameMaskShape.createGeometryMask();

    // Initialize game elements with mask
    this.gameMap = this.add.image(centerX, centerY, 'meath')
        .setDisplaySize(backgroundSize, backgroundSize)
        .setOrigin(0.5)
        .setMask(gameMask);

    this.nextGameMap = this.add.image(centerX, centerY, 'meath')
        .setDisplaySize(backgroundSize, backgroundSize)
        .setOrigin(0.5)
        .setAlpha(0)
        .setMask(gameMask);

    // Create overlay with inverse mask (darkens outside circle)
    const overlayMaskShape = this.make.graphics()
        .fillStyle(0xffffff)
        .fillCircle(centerX, centerY, maskRadius-2);
    
    const overlayMask = overlayMaskShape.createGeometryMask();
    overlayMask.invertAlpha = true; // Invert the mask

    const overlay = this.add.graphics()
        .fillStyle(0x000000)
        .fillRect(0, 0, width, height)
        .setDepth(74)
        .setMask(overlayMask);

    // Add ciorcal frame (matches mask exactly)
    this.add.image(centerX, centerY, 'ciorcal-light')
        .setDisplaySize(maskRadius * 2, maskRadius * 2)
        .setOrigin(0.5)
        .setDepth(100);

    // Initialize grid container (centered within mask)
    this.gridContainer = this.add.container(centerX, centerY)
        .setDisplaySize(gridSize, gridSize)
        .setDepth(1)
        .setAlpha(0.7)
        .setMask(gameMask);

    // Load county data
    const rawData = this.cache.json.get('countyData');
    this.countyData = {};
    rawData.forEach(config => {
        this.countyData[config.co] = new CountyData(config);
    });

    // Set background color
    this.cameras.main.setBackgroundColor('#242424');

    // Create wheel
    this.wheel = this.add.image(0, 0, 'wheel')
        .setInteractive()
        .setDepth(100)
        .setScale(2);

    // Spoke configuration
    this.spokeCount = 7;
    this.anglePerSpoke = 360 / this.spokeCount;

    // County name display
    const paddingRight = 20;
    const countyNameY = 50;
    this.countyNameGa = this.add.text(0, countyNameY, '', {
        fontSize: '32px',
        fontFamily: 'IrishPenny',
        fill: '#ffffff',
        backgroundColor: '#000000AA',
        padding: { x: 20, y: 10 },
        align: 'right'
    })
    .setOrigin(1, 0.5)
    .setDepth(2000)
    .setScrollFactor(0)
    .setPosition(width - paddingRight, countyNameY);

    // Input handling
    this.dragging = false;
    this.previousAngle = 0;
    this.velocity = 0;
    this.input.on('pointerdown', this.startDrag, this);
    this.input.on('pointermove', this.doDrag, this);
    this.input.on('pointerup', this.stopDrag, this);
    this.input.on('pointerupoutside', this.stopDrag, this);

    // Create initial grid
    this.createDynamicGrid();

    this.particles = this.add.particles('particle');
        
    // Create particle emitter
    this.transitionEmitter = this.add.particles(
  500, countyNameY,
  'particle',
  {
      speed: { min: 50, max: 200 },
      lifespan: 1,//000,
      scale: { start: 0.5, end: 0, ease: 'Power2' },
      alpha: { start: 0.8, end: 0 },
      blendMode: 'ADD',
      frequency: -1, // Single burst
      quantity: 15,
      emitZone: {
          type: 'edge',
          source: new Phaser.Geom.Circle(0, 0, 50),
          quantity: 15
      }
  }
).setDepth(200).stop();

// Apply mask to particles
this.transitionEmitter.setMask(gameMask);

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
    
    this.transitionEmitter
        .setPosition(this.cameras.main.centerX, this.cameras.main.centerY)
        .explode(15);
    

    
    // Clear current highlight immediately
    if(this.currentTooltip) {
        this.currentTooltip.destroy();
        this.currentTooltip = null;
    }
    
    this.isTransitioning = true;
;
    
    this.isTransitioning = true;
    const newCounty = this.countyNames[this.countyTracker];
    const { width: camWidth, height: camHeight } = this.cameras.main;
    const gridSize = Math.min(camWidth, camHeight) * 0.8;
  
    // Set up new map
    this.nextGameMap
      .setTexture(newCounty)
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
  if (this.isTransitioning) return; // Prevent updates during transitions
    
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

        // Clear previous highlights more aggressively
        this.gridContainer.each(child => {
          if(child instanceof Phaser.GameObjects.Rectangle) {
              child.setFillStyle(this.getValueColor(child.getData('originalValue')));
              child.setAlpha(child.getData('originalValue') >= 30 ? 1 : 0.02); // Reset alpha
          }
      });
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
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
this.load.image('chariot','phaser-resources/images/ritterB.png')
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
                8,
                8,
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
  this.player = this.add.sprite(0, 0, 'chariot')
    .setOrigin(0.5, 0.5)
    .setDepth(50)
    .setVisible(true)
  
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
    this.wheel = this.add.image(centerX, centerY, 'wheel')
        .setInteractive()
        .setDepth(81).setAlpha(0.2)

    // Spoke configuration
    this.spokeCount = 7;
    this.anglePerSpoke = 360 / this.spokeCount;

    // County name display
    const paddingRight = 20;
    const countyNameY = 50;
    const countyNameX = width - paddingRight;
    
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

        
// Calculate camera offset to align ciorcal-light with screen edges
const cameraOffsetX = centerX - maskRadius; // This moves left edge to screen left
const cameraOffsetY = centerY - maskRadius; // This moves top edge to screen top

// Move the camera
this.cameras.main.setScroll(cameraOffsetX, cameraOffsetY);
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
    
    // Continuous rotation sync
    if (this.gridContainer) {
      // this.player.setRotation(this.gridContainer.rotation);
    }
    
    this.updateSpoke();
  }
  handleCountyTransition(direction) {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
  
    // Clear current highlight immediately
    if(this.currentTooltip) {
      this.currentTooltip.destroy();
      this.currentTooltip = null;
    }
  
    // Store current player position relative to grid
    const relativeX = this.player.x - this.gridContainer.x;
    const relativeY = this.player.y - this.gridContainer.y;
  
    // Transition logic
    const newCounty = this.countyNames[this.countyTracker];
    const { width: camWidth, height: camHeight } = this.cameras.main;
  
    this.nextGameMap
      .setTexture(newCounty)
      .setPosition(camWidth/2, camHeight/2)
      .setAlpha(0)
      .setRotation(this.baseRotation);
  
    const targetRotation = this.baseRotation + Phaser.Math.DegToRad(direction === 'down' ? 5 : -5);
    
    this.tweens.add({
      targets: this,
      baseRotation: targetRotation,
      duration: 500,
      ease: 'Sine.easeInOut',
      onUpdate: () => {
        // Keep player aligned during rotation
        // this.player.setRotation(this.gridContainer.rotation);
      }
    });
  
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
        [this.gameMap, this.nextGameMap] = [this.nextGameMap, this.gameMap];
        this.gameMap.setAlpha(1);
        this.nextGameMap.setAlpha(0).setTexture('meath');
        
        // Rebuild grid first
        this.createDynamicGrid();
        
        // Update player position relative to new grid
        this.player.setPosition(
          this.gridContainer.x + relativeX,
          this.gridContainer.y + relativeY
        );
        
        // Force highlight update
        this.isTransitioning = false;
        this.highlightSquare(this.previousSpokeIndex);
      }
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
  highlightSquare(spokeIndex) {
    // Clear previous highlights
    this.gridContainer.each(child => {
      if(child instanceof Phaser.GameObjects.Rectangle) {
        child.setFillStyle(this.getValueColor(child.getData('originalValue')));
        child.setAlpha(child.getData('originalValue') >= 30 ? 1 : 0.02);
      }
    });
  
    const currentCounty = this.countyData[this.countyNames[this.countyTracker]];
    let foundLocation = false;
  
    // Get current container transform matrix
    const matrix = this.gridContainer.getWorldTransformMatrix();
  
    currentCounty.mapData.forEach((row, y) => {
      row.forEach((cellValue, x) => {
        if(cellValue >= 30) {
          const index = cellValue - 30;
          if(index === spokeIndex) {
            const rect = this.gridContainer.getAt(x + y * row.length);
            
            // Transform cell position using current matrix
            const worldPos = matrix.transformPoint(rect.x, rect.y);
            
            // Tween to new position
            this.tweens.add({
              targets: this.player,
              x: worldPos.x,
              y: worldPos.y,
              // rotation: this.gridContainer.rotation,
              duration: 500,
              ease: 'Power2',
              onStart: () => {
                this.player.setVisible(true);
              },
              onComplete: () => {
                // Pulse animation after reaching destination
                this.tweens.add({
                  targets: this.player,
                  scaleX: 1.1,
                  scaleY: 1.1,
                  duration: 150,
                  yoyo: true,
                  ease: 'Power2'
                });
              }
            });
  
            rect.setFillStyle(0xFFFF00);
            foundLocation = true;
            this.showLocationTooltip(currentCounty.getLocation(index));
          }
        }
      });
    });
  
    if(!foundLocation) {
      if(this.currentTooltip) {
        this.currentTooltip.destroy();
        this.currentTooltip = null;
      }
      
      // Safely get container center or use fallback values
      let centerX = 0;
      let centerY = 0;
      
      const bounds = this.gridContainer.getBounds();
      if (bounds && bounds.centerX !== undefined && bounds.centerY !== undefined) {
        centerX = bounds.centerX;
        centerY = bounds.centerY;
      } else {
        centerX = this.gridContainer.x;
        centerY = this.gridContainer.y;
      }
      
      // Tween to center position
      this.tweens.add({
        targets: this.player,
        x: centerX,
        y: centerY,
        // rotation: this.gridContainer.rotation,
        duration: 500,
        ease: 'Power2'
      });
    }
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
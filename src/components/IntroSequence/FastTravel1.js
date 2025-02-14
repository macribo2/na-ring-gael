import Phaser from 'phaser';

export default class FastTravel1 extends Phaser.Scene {
  constructor() {
    super({ key: 'fasttravel1' });
    this.countyNames = [
      "meath", "westmeath", "kildare", "offaly", "laois", "longford", "roscommon", "cavan",
      "monaghan", "leitrim", "carlow", "kilkenny", "tipperary", "limerick", "clare", "galway",
      "mayo", "sligo", "donegal", "antrim", "down", "louth", "dublin", "wicklow", "wexford", 
      "waterford", "kerry", "cork", "tyrone", "armagh", "fermanagh", "derry"
    ];

    this.countyTracker = 0;
    this.isTransitioning = false; // Add transition lock
  }

  preload() {
    this.load.image('wheel', 'phaser-resources/images/ui/eight-point-wheel.png');
    this.countyNames.forEach(county => {
      this.load.image(county, `phaser-resources/images/countyMaps/${county}.png`);
    });
  }

  create() {
    this.cameras.main.setBackgroundColor('#242424');
    
    // Initialize maps
    this.gameMap = this.add.image(400, 300, 'meath').setOrigin(0.5);
    this.nextGameMap = this.add.image(400, 300, 'meath').setOrigin(0.5).setAlpha(0);

    this.wheel = this.add.image(400, 300, 'wheel').setInteractive();
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
    this.createGrid();
  }

  createGrid() {
    const squareSize = 50;
    const startX = 150;
    const startY = 150;
    this.squares = [];

    // Bottom row
    this.squares.push(this.add.rectangle(
      startX + 60, startY + 2 * (squareSize + 10), 
      squareSize, squareSize, 0x555555
    ));

    // Middle row
    this.squares.push(
      this.add.rectangle(startX + 60, startY + (squareSize + 10), squareSize, squareSize, 0x555555),
      this.add.rectangle(startX + 60 + (squareSize + 10), startY + (squareSize + 10), 
      squareSize, squareSize, 0x555555)
    );

    // Top row
    for (let i = 0; i < 4; i++) {
      this.squares.push(this.add.rectangle(
        startX + i * (squareSize + 10), startY, squareSize, squareSize, 0x555555
      ));
    }

    this.squares.forEach(square => square.setOrigin(0.5));
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
            this.handleCountyTransition(direction);
        } else {
            this.handleSpokeAnimation(direction);
        }
    }

    this.previousSpokeIndex = spokeIndex;
}

handleCountyTransition(direction) {
    this.isTransitioning = true;
    const newCounty = this.countyNames[this.countyTracker];
    const slideDistance = this.game.config.height * 0.02;

    // Position new map off-screen in the direction of travel
    this.nextGameMap.setTexture(newCounty)
        .setAlpha(1)
        .setY(direction === 'down' ? -slideDistance : this.game.config.height + slideDistance);

    // Animate both maps
    this.tweens.add({
        targets: this.gameMap,
        y: direction === 'down' ? this.game.config.height + slideDistance : -slideDistance,
        alpha: 0,
        duration: 300,
        ease: 'Power2'
    });

    this.tweens.add({
        targets: this.nextGameMap,
        y: 300, // Center position
        alpha: 1,
        duration: 300,
        ease: 'Power2',
        onComplete: () => {
            [this.gameMap, this.nextGameMap] = [this.nextGameMap, this.gameMap];
            this.gameMap.setAlpha(1);
            this.isTransitioning = false;
        }
    });
}

handleSpokeAnimation(direction) {
    const slideDistance = this.game.config.height * 0.02;
    const targetY = direction === 'down' ? 
        this.gameMap.y + slideDistance : 
        this.gameMap.y - slideDistance;

    this.tweens.add({
        targets: this.gameMap,
        y: targetY,
        duration: 100,
        ease: 'Power1',
        onComplete: () => {
            // Keep the map at the new position until next transition
        }
    });
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

  highlightSquare(index) {
    this.squares.forEach(square => square.setFillStyle(0x555555));
    const squareIndex = index <= 2 ? index : 3 + (index - 3);
    if (this.squares[squareIndex]) {
      this.squares[squareIndex].setFillStyle(0x00ff00);
    }
  }
}
import Phaser from 'phaser';

export default class FastTravel1 extends Phaser.Scene {
  constructor() {
    super({ key: 'fasttravel1' });
    this.countyNames = [
      "westmeath", "longford", "cavan","louth", "dublin", "wicklow",  "carlow","kildare",  "laois", "offaly","roscommon", 
      "leitrim", "fermanagh", "monaghan", "armagh", , "wexford",  "kilkenny", "waterford", "cork", "tipperary", "limerick", "kerry", "clare", "galway",
      "mayo", "sligo", "donegal","tyrone", "derry", "antrim","down", "meath" 
      ,  
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

    // Loop through the rows (5 rows)
    for (let row = 0; row < 5; row++) {
        // Loop through the columns (5 columns)
        for (let col = 0; col < 5; col++) {
            // Calculate the X and Y position for the square
            const x = startX + col * (squareSize + 10);
            const y = startY + row * (squareSize + 10);

            // Determine color (every second square is 50% opaque for the checkerboard pattern)
            let color = 0x555555; // Default gray color
            if ((row + col) % 2 === 1) {  // Checkerboard pattern (alternating opacity)
                color = 0x555555;  // Set opacity
            }

            // Add the rectangle to the squares array
            const square = this.add.rectangle(x, y, squareSize, squareSize, color).setOrigin(0.5);

            // Set 50% opacity for checkerboard squares
            if ((row + col) % 2 === 1) {
                square.setAlpha(0.5);  // Set opacity for alternating squares
            }

            this.squares.push(square);
        }
    }

    // Ensure all squares are centered correctly
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
  if (this.isTransitioning) return; // Prevent transition if already in progress
  
  this.isTransitioning = true;
  const newCounty = this.countyNames[this.countyTracker];

  // Position the new map off-screen (still rotating around its center)
  this.nextGameMap.setTexture(newCounty)
    .setAlpha(0)
    .setRotation(this.gameMap.rotation); // Keep same rotation as the current map

  // Animate rotation of the current game map (clockwise or counter-clockwise)
  this.tweens.add({
    targets: this.gameMap,
    rotation: `+=${Phaser.Math.DegToRad(direction === 'down' ? 5 : -5)}`,
    duration: 300,
    ease: 'Power2'
  });

  // Animate rotation of the next map and fade it in
  this.tweens.add({
    targets: this.nextGameMap,
    rotation: `+=${Phaser.Math.DegToRad(direction === 'down' ? 5 : -5)}`,
    alpha: 1,
    duration: 300,
    ease: 'Power2',
    onComplete: () => {
      // Swap references once transition is complete
      this.gameMap.setAlpha(0); // Hide the old map
      [this.gameMap, this.nextGameMap] = [this.nextGameMap, this.gameMap];
      this.gameMap.setAlpha(1); // Ensure the new map is fully visible
      this.isTransitioning = false; // Unlock transitions
    }
  });
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

  highlightSquare(index) {
    // Define the grid with specific square labels
    this.grid = [
        [null, null, '5c', null, null],  // Row 5
        [null, null, null, '4d', null],  // Row 4
        [null, '3b', null, null, '3e'],  // Row 3
        [null, null, '2c', null, null],  // Row 2
        ['1a', null, null, null, null]   // Row 1
    ];

    // Reset all squares to the default color
    this.squares.forEach(square => square.setFillStyle(0x555555));

    // Map the provided index to the corresponding square label
    const indexToLabel = {
        0: '1a',
        1: '3b',
        2: '2c',
        3: '5c',
        4: '4d',
        5: '4d',
        6: '3e'
    };

    const squareLabel = indexToLabel[index];  // Get the square label for this index
    if (!squareLabel) {
        console.log(`Invalid index: ${index}`);
        return;
    }

    console.log(`Index: ${index}, Square Label: ${squareLabel}`);  // Debug log

    // Now map the label to the position on the grid
    let rowIndex = -1;
    let colIndex = -1;

    // Find the corresponding position in the grid for the square label
    for (let row = 0; row < this.grid.length; row++) {
        const col = this.grid[row].indexOf(squareLabel);
        if (col !== -1) {
            rowIndex = row;
            colIndex = col;
            break;
        }
    }

    if (rowIndex !== -1 && colIndex !== -1) {
        // Highlight the square based on the label
        const squareIndex = rowIndex * 5 + colIndex;  // Calculate the index in the `squares` array

        // Get the square object from the squares array
        const squareToHighlight = this.squares[squareIndex];

        // Ensure the square exists
        if (squareToHighlight) {
            // Apply highlight color based on the label
            let highlightColor;
            switch (squareLabel) {
                case '5c':
                    highlightColor = 0x00ff00; // Green
                    break;
                case '4d':
                    highlightColor = 0x0000ff; // Blue
                    break;
                case '3b':
                    highlightColor = 0xff0000; // Red
                    break;
                case '3e':
                    highlightColor = 0xffff00; // Yellow
                    break;
                case '2c':
                    highlightColor = 0xff00ff; // Magenta
                    break;
                case '1a':
                    highlightColor = 0x00ffff; // Cyan
                    break;
                default:
                    highlightColor = 0x555555; // Default gray if something goes wrong
            }

            // Set the fill color to highlight the square
            squareToHighlight.setFillStyle(highlightColor);
        }
    }
}


}
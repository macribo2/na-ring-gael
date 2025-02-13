import Phaser from 'phaser';

export default class FastTravel1 extends Phaser.Scene {
  constructor() {
    super({ key: 'fasttravel1' });
  }

  preload() {
    this.load.image('wheel', 'phaser-resources/images/ui/eight-point-wheel.png'); // Wheel image
  }

  create() {
    this.cameras.main.setBackgroundColor('#242424');

    this.wheel = this.add.image(400, 300, 'wheel');
    this.wheel.setInteractive();

    this.spokeCount = 8;
    this.anglePerSpoke = 360 / this.spokeCount;

    this.textDisplay = this.add.text(350, 50, 'Spoke: 0 | County: Meath', { fontSize: '24px', fill: '#ffffff' });

    // County names array
    this.countyNames = [
      "Meath", "Westmeath", "Kildare", "Offaly", "Laois", "Longford", "Roscommon", "Cavan",
      "Monaghan", "Leitrim", "Carlow", "Kilkenny", "Tipperary", "Limerick", "Clare", "Galway",
      "Mayo", "Sligo", "Donegal", "Antrim", "Down", "Louth", "Dublin", "Wicklow", "Wexford", 
      "Waterford", "Kerry", "Cork"
    ];

    // County Tracker initialized
    this.countyTracker = 0;

    this.previousSpokeIndex = null;

    // Add input events for dragging the wheel
    this.input.on('pointerdown', this.startDrag, this);
    this.input.on('pointermove', this.doDrag, this);
    this.input.on('pointerup', this.stopDrag, this);
    this.input.on('pointerupoutside', this.stopDrag, this);

    this.dragging = false;
    this.previousAngle = 0;
    this.velocity = 0;
  }

  startDrag(pointer) {
    this.dragging = true;
    this.previousAngle = Phaser.Math.Angle.Between(this.wheel.x, this.wheel.y, pointer.x, pointer.y);
    this.velocity = 0;
  }

  doDrag(pointer) {
    if (this.dragging) {
      let currentAngle = Phaser.Math.Angle.Between(this.wheel.x, this.wheel.y, pointer.x, pointer.y);
      let angleDelta = Phaser.Math.RadToDeg(currentAngle - this.previousAngle);

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
      this.velocity *= 0.99;  // Gradual deceleration

      if (Math.abs(this.velocity) < 0.05) {
        this.velocity = 0;
      }
    }

    this.updateSpoke();
  }

  updateSpoke() {
    // Normalize the angle to be within 0 to 360
    let adjustedAngle = (this.wheel.angle % 360 + 360) % 360;

    // Calculate the spoke index based on the wheel's angle
    let spokeIndex = Math.floor(adjustedAngle / this.anglePerSpoke);

    // Check for countyTracker update
    if (this.previousSpokeIndex === 7 && spokeIndex === 0) {
      // Going from 7 to 0 (increment countyTracker)
      this.countyTracker = Math.min(this.countyTracker + 1, 31); // Max is 31
    } else if (this.previousSpokeIndex === 0 && spokeIndex === 7) {
      // Going from 0 to 7 (decrement countyTracker)
      this.countyTracker = Math.max(this.countyTracker - 1, 0); // Min is 0
    }

    // Get the current county name based on countyTracker
    let currentCounty = this.countyNames[this.countyTracker];

    // Update the text display with the current spoke and county name
    this.textDisplay.setText(`Spoke: ${spokeIndex} | County: ${currentCounty}`);

    // Store the current spoke index for the next frame
    this.previousSpokeIndex = spokeIndex;
  }
}

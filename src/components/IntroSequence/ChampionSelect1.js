import Phaser from "phaser";
import { EventEmitter } from './EventEmitter';

class ChampionSelect1 extends Phaser.GameObjects.Container {
  
  constructor(scene, x, y, numSpokes = 8, radius = 450) {
    super(scene, x, y);
    this.onComplete = null; // Optional callback when spinning completes
    
    const centerX = x;
    const centerY = y;
    
    // Wheel and spokes setup
    this.wheel = scene.add.sprite(centerX, centerY, 'celt-ring').setOrigin(0.5, 0.5).setAlpha(0.5);
    this.wheel.setDisplaySize(radius * 2, radius * 2);
    this.wheel.setInteractive();
    
    // Add the container to the scene
    scene.add.existing(this);
    
    // Draw spokes
    this.spokes = scene.add.graphics().setAlpha(0);
    this.spokes.setPosition(centerX, centerY); // Align spokes to center
    this.drawSpokes(radius, numSpokes);
    
    // Variables for tracking rotation
    this.rotationVelocity = 0;
    this.isDragging = false;
    this.dampingFactor = 0.9995;
    this.minVelocity = 0.0001;
    
    // Pointer events
    this.wheel.on('pointerdown', (pointer) => this.startDrag(pointer));
    this.wheel.on('pointermove', (pointer) => this.dragWheel(pointer));
    this.wheel.on('pointerup', () => this.stopDrag());
    
    // Update the wheel rotation in the game loop
    scene.events.on('update', this.updateWheel, this);
  }

  drawSpokes(radius, numSpokes) {
    const angleStep = (2 * Math.PI) / numSpokes;
    this.spokes.clear();
    
    // Draw each spoke
    for (let i = 0; i < numSpokes; i++) {
      const angle = i * angleStep;
      const endX = Math.cos(angle) * radius;
      const endY = Math.sin(angle) * radius;
      
      this.spokes.lineStyle(1, 0xffffff, 0.3);
      this.spokes.beginPath();
      this.spokes.moveTo(0, 0); // Draw relative to the graphics object's center
      this.spokes.lineTo(endX, endY);
      this.spokes.strokePath();
    }
  }

  startDrag(pointer) {
    this.isDragging = true;
    this.startY = pointer.y;
    this.rotationVelocity = 0;
  }

  dragWheel(pointer) {
    if (this.isDragging) {
      const dy = pointer.y - this.startY;
      const deltaAngle = dy * 0.0005; // Sensitivity for dragging
      this.currentAngle += deltaAngle;
      this.startY = pointer.y;
      
      // Rotate both wheel and spokes
      this.wheel.rotation = this.currentAngle;
      this.spokes.rotation = this.currentAngle;
      
      this.rotationVelocity = deltaAngle;
    }
  }

  stopDrag() {
    this.isDragging = false;
  }

  updateWheel() {
    if (!this.isDragging) {
      if (Math.abs(this.rotationVelocity) > this.minVelocity) {
        // Continue natural rotation with damping
        this.currentAngle += this.rotationVelocity;
        this.wheel.rotation = this.currentAngle;
        this.spokes.rotation = this.currentAngle;
        
        this.rotationVelocity *= this.dampingFactor;
      } else {
        // Snap to nearest spoke when stopping
        const angleStep = (2 * Math.PI) / 8;
        const snappedAngle = Math.round(this.currentAngle / angleStep) * angleStep;
        this.currentAngle = snappedAngle;
      }
    }
  }
}

export default ChampionSelect1;

import Phaser from "phaser";

class ActionMenu extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        const centerX = scene.scale.width / 2;
        const centerY = scene.scale.height / 2;
        const radius = 450;
        this.numSpokes = 4;
        this.currentAngle = 0;
        this.choices = [
            {spriteKey:'1.png', nameGa: 'Usáid na staighre',  nameEn: 'use the stairs'},
            {spriteKey:'2.png', nameGa: 'Ná húsáid na staighre', nameEn: 'don\'t use the stairs'},
            {spriteKey:'3.png', nameGa: 'Fan agus éist', nameEn: 'wait and listen'},
            {spriteKey:'4.png', nameGa: 'Lig béic', nameEn: 'shout'}
        ];

        this.scene = scene;
        this.menuOpen = false;
        this.displayedChoice = this.choices[0];

        // Background elements
        this.background = scene.add.sprite(0, 0, 'bg1')
            .setVisible(false)
            .setDepth(111)
            .setOrigin(0)
            .setScrollFactor(0);
        
        // Rainbow effect
        this.createRainbowCircle(scene, centerX, centerY, 50);
        
        // Wheel setup
        this.wheel = scene.add.sprite(centerX, centerY, 'celt-ring')
            .setOrigin(0.5)
            .setAlpha(0.5)
            .setVisible(false)
            .setDepth(115)
            .setDisplaySize(radius * 2, radius * 2)
            .setInteractive();

        // Spokes graphics
        this.spokes = scene.add.graphics()
            .setAlpha(0)
            .setPosition(centerX, centerY);
        this.drawSpokes(radius, this.numSpokes);

        // Text elements
        this.choiceTextGa = scene.add.text(centerX, centerY - 50, '', 
            { font: '64px dum1', fill: 'LavenderBlush' })
            .setOrigin(0.5)
            .setDepth(130);
            
        this.choiceTextEn = scene.add.text(centerX, centerY + 50, '',
            { font: '32px dum1', fill: 'plum', wordWrap: { width: 600 } })
            .setOrigin(0.5)
            .setDepth(135);

        // Physics properties
        this.rotationVelocity = 0;
        this.isDragging = false;
        this.dampingFactor = 0.9995;
        this.minVelocity = 0.0001;
        this.friction = 0.995;
        this.dragSensitivity = 0.0005;

        // Event listeners
        this.wheel.on('pointerdown', (pointer) => this.startDrag(pointer));
        this.wheel.on('pointermove', (pointer) => this.dragWheel(pointer));
        this.wheel.on('pointerup', () => this.stopDrag());

        // Update loop
        scene.events.on('update', this.updateWheel, this);
        
        this.setVisible(false);
        scene.add.existing(this);
   // Add confirmation button
   this.confirmButton = scene.add.circle(centerX, centerY, 60, 0x4a4a4a, 0.8)
   .setInteractive()
   .setDepth(940)
   .setVisible(true);

this.buttonText = scene.add.text(centerX, centerY, 'Roghnaigh', 
   { font: '24px Arial', fill: '#ffffff' })
   .setOrigin(0.5)
   .setDepth(141)
   .setVisible(false);

// Button events
this.confirmButton.on('pointerdown', () => this.handleSelection());
}

    open(entity, onChoice) {
        this.menuOpen = true;
        this.setVisible(true);
        this.wheel.setVisible(true);
        this.spokes.setAlpha(1);
        this.rainbowCircle.setAlpha(1);
        this.choiceTextGa.setAlpha(1);
        this.choiceTextEn.setAlpha(1);
        
        // Store callback reference
        this.onChoice = onChoice;
    }

    close() {
        this.menuOpen = false;
        this.wheel.setVisible(false);
        this.spokes.setAlpha(0);
        this.rainbowCircle.setAlpha(0);
        this.choiceTextGa.setAlpha(0);
        this.choiceTextEn.setAlpha(0);
        this.setVisible(false);
    }

    // Modified stopDrag to handle selection
    stopDrag() {
        this.isDragging = false;
        
        // Only trigger selection after spin settles
        if(Math.abs(this.rotationVelocity) < this.minVelocity * 10) {
            this.handleSelection();
        }
    }

   
      handleSelection() {
        // Force immediate stop
        this.rotationVelocity = 0;
        this.isDragging = false;
        
        // Calculate exact current position
        const angleStep = (2 * Math.PI) / this.numSpokes;
        
        // Get raw angle before any snapping
        const rawAngle = Phaser.Math.Angle.Wrap(this.wheel.rotation);
        
        // Calculate precise selected index
        const selectedIndex = Math.floor(((rawAngle + angleStep/2) % (2 * Math.PI)) / angleStep);
        
        // Snap to calculated position
        this.currentAngle = selectedIndex * angleStep;
        this.wheel.rotation = this.currentAngle;
        this.spokes.rotation = this.currentAngle;
        
       // Process selection ONCE
       this.processSelection();

    }


processSelection() {
  const selectedIndex = this.getSelectedIndex();
  const choice = this.choices[selectedIndex];
  
  console.log('Final Selection:', selectedIndex, choice.nameEn);
  
  // Visual feedback
  this.scene.tweens.add({
      targets: [this.confirmButton, this.buttonText],
      scale: 0.8,
      duration: 100,
      yoyo: true
  });

  // Show alert and close
  this.showAlert(`Selected: ${choice.nameEn}`, () => {
      if(this.onChoice) this.onChoice(choice);
      this.close();
  });
}


    showAlert(message, callback) {
        const alert = this.scene.add.text(
            this.scene.scale.width/2,
            this.scene.scale.height/2,
            message,
            { 
                font: '48px Arial',
                fill: '#ffffff',
                backgroundColor: '#000000',
                padding: { x: 20, y: 10 }
            }
        )
        .setOrigin(0.5)
        .setDepth(200);

        this.scene.tweens.add({
            targets: alert,
            alpha: 0,
            duration: 1000,
            delay: 1500,
            onComplete: () => {
                alert.destroy();
                if(callback) callback();
            }
        });
    }

    getSelectedIndex() {
        const angleStep = (2 * Math.PI) / this.numSpokes;
        const normalizedAngle = Phaser.Math.Angle.Wrap(this.currentAngle);
        return Math.floor((normalizedAngle + angleStep/2) / angleStep) % this.numSpokes;
    }

    // Keep original physics-based updateWheel
    updateWheel() {
        if (!this.isDragging) {
            if (Math.abs(this.rotationVelocity) > this.minVelocity) {
                this.currentAngle += this.rotationVelocity;
                this.wheel.rotation = this.currentAngle;
                this.spokes.rotation = this.currentAngle;
                this.rotationVelocity *= this.dampingFactor;
                this.rotationVelocity *= this.friction;
            } else {
                const angleStep = (2 * Math.PI) / this.numSpokes;
                const snappedAngle = Math.round(this.currentAngle / angleStep) * angleStep;
                
                if (Math.abs(snappedAngle - this.currentAngle) > 0.001) {
                    this.currentAngle = Phaser.Math.Interpolation.Linear(
                        [this.currentAngle, snappedAngle], 0.1
                    );
                } else {
                    this.currentAngle = snappedAngle;
                    this.rotationVelocity = 0;
                }
                this.wheel.rotation = this.currentAngle;
                this.spokes.rotation = this.currentAngle;
            }
        }
        this.highlightSpokes();
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
        this.spokes.moveTo(0, 0); 
        this.spokes.lineTo(endX, endY);
        this.spokes.strokePath();
      }
    }
    
    startDrag(pointer) {
      this.isDragging = true;
      this.startY = pointer.y;
      this.previousAngle = this.currentAngle;
      this.rotationVelocity = 0;
    }
    
    dragWheel(pointer) {
      if (this.isDragging) {
        
        this.choiceTextGa.setAlpha(1)
        this.choiceTextEn.setAlpha(1)
        this.rainbowCircle.setAlpha(1)
        const dy = pointer.y - this.startY;
        const deltaAngle = dy * this.dragSensitivity;
        this.currentAngle += deltaAngle;
        this.startY = pointer.y;
        
        // Rotate both wheel and spokes
        this.wheel.rotation = this.currentAngle;
        this.spokes.rotation = this.currentAngle;
        
        this.rotationVelocity = deltaAngle;
      }
    }
    updateColorShiftCircle(x, y, radius) {

      if (!this.scene) {
        return; // Exit if the scene is undefined
      }
      const thickness = 100; // Thickness of the color ring
      const borderThickness = 150; // Border thickness for the  outline
      const colorShiftSpeed = 0.15; // Slower color change for subtle shift
      const time = this.scene.time.now / 1000; // Time-based shift for smooth animation
    
      this.rainbowCircle.clear();
    
      // Calculate a hue based on time, this will slowly shift the color
      const hue = (time * colorShiftSpeed) % 1; // Cycling through hues in the 0-1 range
    
      // Adjust the color saturation (S) and value (V) to get more muted, darker colors
      const saturation = 0.15; // Lower saturation for a more muted color
      const value = 0.75; // Slightly lower value for a darker, muted shade
    
      // Generate a color based on HSV with the muted range
      const color = Phaser.Display.Color.HSVToRGB(hue, saturation, value).color;
    
      // Draw the main color-shifting circle
      this.rainbowCircle.lineStyle(thickness, color, 1);
      this.rainbowCircle.beginPath();
      this.rainbowCircle.arc(x, y, radius, 0, Phaser.Math.DegToRad(360), false);
      this.rainbowCircle.closePath(); // Ensures the circle is closed without gaps
      this.rainbowCircle.strokePath();
    
      // Draw the border around the color-shifting circle
      this.rainbowCircle.lineStyle(borderThickness, 0x503d63, 0.5); // border color
      this.rainbowCircle.beginPath();
      this.rainbowCircle.arc(x, y, 175, 0, Phaser.Math.DegToRad(360), false);
      this.rainbowCircle.closePath(); // Ensures the border is a full circle
      this.rainbowCircle.strokePath();
    }
    
    stopDrag() {
      this.isDragging = false;
    }
 // Method to create a dynamic rainbow circle
 createRainbowCircle(scene, x, y, radius) {
  this.rainbowCircle = scene.add.graphics().setAlpha(0);
  scene.events.on('update', () => {
    this.updateColorShiftCircle(x, y, radius);
  });
}
highlightSpokes() {
  if (!this.scene) return;

  // Use actual wheel center coordinates
  const centerX = this.wheel.x;
  const centerY = this.wheel.y;
  const radius = 450;
  const angleStep = (2 * Math.PI) / this.numSpokes;

  // Calculate angle relative to wheel center
  let sensorAngle = Math.atan2(
      this.scene.input.activePointer.y - centerY,
      this.scene.input.activePointer.x - centerX
  );
  
  sensorAngle = Phaser.Math.Angle.Wrap(sensorAngle - this.currentAngle);

  // Rest of the method remains the same...
  const highlightingRange = Math.PI / (this.numSpokes * 2);
  let highlightedSpokeIndex = -1;

  this.spokes.clear();

  for (let i = 0; i < this.numSpokes; i++) {
      const rotatedAngle = i * angleStep;
      let angleDifference = Phaser.Math.Angle.Wrap(sensorAngle - rotatedAngle);

      // Visual drawing code remains the same...

      if (Math.abs(angleDifference) < highlightingRange) {
          highlightedSpokeIndex = i;
      }
  }

  if (highlightedSpokeIndex !== -1) {
      const displayedChoice = this.choices[highlightedSpokeIndex];
      this.choiceTextGa.setText(displayedChoice.nameGa);
      this.choiceTextEn.setText(displayedChoice.nameEn);
  }
}

// Keep only ONE getSelectedIndex method
getSelectedIndex() {
  const angleStep = (2 * Math.PI) / this.numSpokes;
  const currentRotation = Phaser.Math.Angle.Wrap(this.wheel.rotation);
  return Math.floor((currentRotation + angleStep/2) / angleStep) % this.numSpokes;
}
}

export default ActionMenu;
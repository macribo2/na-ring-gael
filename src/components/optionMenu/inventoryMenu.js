import Phaser from "phaser";

class InventoryMenu extends Phaser.GameObjects.Container {
  constructor(scene, inventory) {
    super(scene);
    this.inventory = inventory; // Link to the player's inventory

    // Background image
    if (scene.textures.exists('inventory')) {
      this.background = scene.add.image(
        scene.cameras.main.centerX, 
        scene.cameras.main.centerY, 
        'inventory'
      ).setDepth(1000).setScrollFactor(0);
    }

    this.add([this.background]);
   
   let gridX = scene.cameras.main.width * 0.1;
   let gridY = scene.cameras.main.height * 0.2;

    // Grid properties
    this.slotSize = 48;
    this.rows = 3;
    this.cols = 5;
    this.slots = []; // Store slot backgrounds for reference
    let lightTea = Phaser.Display.Color.GetColor(210, 180, 140); // Opaque Tea-Stained Beige
    let darkTea = Phaser.Display.Color.GetColor(139,101,69)

  // Top-left offset (adjust as needed)
let startX = scene.cameras.main.width * 0.25; // Small margin from left
let startY = scene.cameras.main.height * 0.28; // Small margin from top

// Create inventory slots (12 total)
for (let row = 0; row < this.rows; row++) {
  for (let col = 0; col < this.cols; col++) {
    let x = startX + col * this.slotSize;
    let y = startY + row * this.slotSize;

        let slot = scene.add.rectangle(x, y, this.slotSize, this.slotSize, darkTea)
        .setDepth(1001)
        .setStrokeStyle(1, lightTea).setAlpha(0.3).setScrollFactor(0);
        this.slots.push(slot);
        this.add(slot);
      }
    }

    // Inventory items will be placed in these slots
    this.itemIcons = [];

    this.setVisible(false);
    scene.add.existing(this);
  }

  // Update inventory display
  updateInventory() {
    // Remove old item icons
    this.itemIcons.forEach(icon => icon.destroy());
    this.itemIcons = [];

    this.inventory.items.forEach((item, index) => {
      if (!item.texture) return;

      let row = Math.floor(index / this.cols);
      let col = index % this.cols;

      let x = this.slots[index].x;
      let y = this.slots[index].y;

      let icon = this.scene.add.image(x, y, item.texture)
        .setDepth(1002)
        .setScale(0.5);
      this.itemIcons.push(icon);
      this.add(icon);
    });
  }

  showInventory() {
    this.setVisible(true);
    this.updateInventory();
  }

  hideInventory() {
    this.setVisible(false);
    this.background.setAlpha(0)
  }
}

export default InventoryMenu;

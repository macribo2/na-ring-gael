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
   // Positioning the inventory in the upper right quadrant
   let gridX = scene.cameras.main.width * 0.65; // Right side
   let gridY = scene.cameras.main.height * 0.25; // Upper half

    // Grid properties
    this.slotSize = 32;
    this.rows = 3;
    this.cols = 4;
    this.slots = []; // Store slot backgrounds for reference

    // Create inventory slots (12 total)
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let x = scene.cameras.main.centerX - (this.cols / 2) * this.slotSize + col * this.slotSize;
        let y = scene.cameras.main.centerY - (this.rows / 2) * this.slotSize + row * this.slotSize;

        let slot = scene.add.rectangle(x, y, this.slotSize, this.slotSize, 0x444444)
          .setDepth(1001)
          .setStrokeStyle(1, 0xffffff).setScrollFactor(0);
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
  }
}

export default InventoryMenu;

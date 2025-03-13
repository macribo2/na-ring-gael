import Phaser from "phaser";

class InventoryMenu extends Phaser.GameObjects.Container {
  constructor(scene, inventory) {
    super(scene);
    this.inventory = inventory; // Link to the player's inventory
    this.inventory = this.inventory || { items: [] }; // Ensure inventory is initialized


    if (scene.textures.exists('inventory')) {
      this.background = scene.add.image(
        scene.cameras.main.centerX,
        scene.cameras.main.centerY,
        'inventory'
      ).setDepth(1000).setScrollFactor(0).setAlpha(1); // Set alpha to 1 for visibility
    }

    this.add([this.background]);

    let gridX = scene.cameras.main.width * 0.3;
    let gridY = scene.cameras.main.height * 0.3;

    // Grid properties
    this.slotSize = 48;
    this.rows = 2;
    this.cols = 8;
    this.slots = []; // Store slot backgrounds for reference
    let lightTea = Phaser.Display.Color.GetColor(210, 180, 140); // Opaque Tea-Stained Beige
    let darkTea = Phaser.Display.Color.GetColor(139, 101, 69); // Dark Tea

    // Top-left offset (adjust as needed)
    let startX = scene.cameras.main.width * 0.25; // Small margin from left
    let startY = scene.cameras.main.height * 0.28; // Small margin from top

    // Create inventory slots (15 total in a 3x5 grid)
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let x = startX + col * this.slotSize;
        let y = startY + row * this.slotSize;

        // Create the individual inventory slot rectangle
        let slot = scene.add.rectangle(x, y, this.slotSize, this.slotSize, darkTea)
          .setDepth(9001)
          .setStrokeStyle(2, lightTea)
          .setAlpha(0.3)  // Set to visible but semi-transparent
          .setScrollFactor(0);
        this.slots.push(slot);
        this.add(slot);
      }
    }

    // Inventory items will be placed in these slots
    this.itemIcons = [];

    // Initially hidden
    this.setVisible(false);
    scene.add.existing(this);
  }

  // Update inventory display
  updateInventory() {
    // Remove old item icons
    this.itemIcons.forEach(icon => icon.destroy());
    this.itemIcons = [];

    // Add new items to the slots
    this.inventory.items.forEach((item, index) => {
      if (!item.texture) return;

      let row = Math.floor(index / this.cols);
      let col = index % this.cols;

      let x = this.slots[index].x;
      let y = this.slots[index].y;

      let icon = this.scene.add.image(x, y, item.texture)
        .setDepth(1002)
        .setScale(0.5);  // Scale down the icon to fit into the slot
      this.itemIcons.push(icon);
      this.add(icon);
    });
  }


// In InventoryMenu.js
// Add this to InventoryMenu.showInventory()
showInventory() {
  console.log("Show Inventory called");
  this.setVisible(true);
  
  // Log slot properties
  this.slots.forEach((slot, index) => {
    console.log(`Slot ${index} visible:${slot.visible} alpha:${slot.alpha} depth:${slot.depth}`);
  });
  
  // Force extreme values to ensure visibility
  this.slots.forEach(slot => {
    slot.setVisible(true)
      .setAlpha(1) // Fully opaque for debugging
      .setDepth(50000); // Extreme depth
  });
  
  this.background.setVisible(true).setAlpha(1).setDepth(5000);
  this.updateInventory();
}
  hideInventory() {
    this.setVisible(false);
    // OR if you want to fade out: this.setAlpha(0);
  }
  // // Show the inventory menu and update the items
  // showInventory() {
  //   this.setVisible(true);
  //   this.updateInventory();
  //   this.background.setVisible(true).setAlpha(1).setDepth(10000); // Ensure the background is visible
  //   this.slots.forEach(slot => slot.setVisible(true).setAlpha(0.7).setDepth(12000)); // Ensure the slots are visible
  // }

  // // Hide the inventory menu
  // hideInventory() {
  //   this.setVisible(false);
  //   this.background.setAlpha(0); // Hide the background
  //   this.slots.forEach(slot => slot.setAlpha(0)); // Hide the slots
  // }
}

export default InventoryMenu;

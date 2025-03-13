// InventoryMenu.js
import Phaser from "phaser";

class InventoryMenu extends Phaser.GameObjects.Container {
  constructor(scene, inventory) {
    super(scene);
    this.inventory = inventory || { items: [] };
    
    // Important: Set a very high depth for the inventory menu
    this.setDepth(1000);
    
    // Create the background within the container
    this.background = scene.add.image(
      scene.cameras.main.centerX,
      scene.cameras.main.centerY,
      'inventory'
    ).setScrollFactor(0)
      .setAlpha(1);
    
    this.add(this.background);

    let lightTea = Phaser.Display.Color.GetColor(210, 180, 140);
    let darkTea = Phaser.Display.Color.GetColor(139, 101, 69);

    let startX = scene.cameras.main.centerX - (8 * 24); // Centering grid
    let startY = scene.cameras.main.centerY - 24; // Adjust position
    this.slotSize = 48;
    this.rows = 2;
    this.cols = 8;
    this.slots = [];

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let x = startX + col * this.slotSize;
        let y = startY + row * this.slotSize;

        let slot = scene.add.rectangle(x, y, this.slotSize - 4, this.slotSize - 4, darkTea)
          .setStrokeStyle(2, lightTea)
          .setAlpha(0.8)
          .setScrollFactor(0);

        this.slots.push(slot);
        this.add(slot);
      }
    }

    this.itemIcons = [];
    this.setVisible(false);
    scene.add.existing(this);
  }

  // Update inventory display
  updateInventory() {
    this.itemIcons.forEach(icon => icon.destroy());
    this.itemIcons = [];
    
    this.inventory.items.forEach((item, index) => {
      if (index < this.slots.length) {
        let x = this.slots[index].x;
        let y = this.slots[index].y;
        let icon = this.scene.add.image(x, y, item.texture)
          .setScale(0.9) // Slightly smaller than slot
          .setScrollFactor(0);
        this.itemIcons.push(icon);
        this.add(icon);
      }
    });
  }

  showInventory() {
    this.setVisible(true);
  }

  hideInventory() {
    this.setVisible(false);
  }
}

export default InventoryMenu;


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
      .setAlpha(1).setDisplaySize(this.scene.cameras.main.width, this.scene.cameras.main.height);
    
    this.add(this.background);

    let lightTea = Phaser.Display.Color.GetColor(210, 180, 140);
    let darkTea = Phaser.Display.Color.GetColor(139, 101, 69);

    let startX = scene.cameras.main.centerX * 0.2; // Centering grid
    let startY = scene.cameras.main.centerY * 0.35; // Adjust position
    this.slotSize = 48;
    this.rows = 2;
    this.cols = 6;
    this.slots = [];

    this.selectedSlotIndex = null; // To track the currently selected slot

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let x = startX + col * this.slotSize;
        let y = startY + row * this.slotSize;

        let slot = scene.add.rectangle(x, y, this.slotSize - 4, this.slotSize - 4, darkTea)
          .setStrokeStyle(2, lightTea)
          .setAlpha(0.8)
          .setScrollFactor(0)
          .setInteractive(); // Make each slot interactive

        // Add a pointerdown event to highlight the clicked slot
        slot.on('pointerdown', (pointer) => {
          this.highlightSlot(slot, this.slots.indexOf(slot)); // Pass the index of the clicked slot
        });

        this.slots.push(slot);
        this.add(slot);
      }
    }

    // Equipped items section
    this.equippedSlots = [];
    let equippedStartX = scene.cameras.main.centerX * 1.2;
    let equippedStartY = scene.cameras.main.centerY * 0.35;
    let equippedSlotLabels = ["Head", "Body", "Weapon", "Shield"];

    for (let i = 0; i < 4; i++) {
      let x = equippedStartX;
      let y = equippedStartY + i * this.slotSize;

      let equippedSlot = scene.add.rectangle(x, y, this.slotSize - 4, this.slotSize - 4, darkTea)
        .setStrokeStyle(2, lightTea)
        .setAlpha(0.8)
        .setScrollFactor(0)
        .setInteractive();

      let label = scene.add.text(x + 30, y - 10, equippedSlotLabels[i], {
        font: "20px Aonchlo",
        fill: "#2a3439"
      }).setOrigin(0, 0).setScrollFactor(0);

      this.equippedSlots.push({ slot: equippedSlot, label: label });
      this.add(equippedSlot);
      this.add(label);
    }

    this.itemIcons = [];
    this.setVisible(false);
    scene.add.existing(this);
  
    // Create a placeholder text element for the description
    this.descriptionText = scene.add.text( scene.cameras.main.centerX * 0.1,
      (scene.cameras.main.worldView.y + scene.cameras.main.height / scene.cameras.main.zoom) * 0.4, // Adjusted for zoom
      
      "", {
      font: "32px Aonchlo",
      fill: "#2a3439",
      wordWrap: { width: 800 }
    }).setOrigin(0,0).setScrollFactor(0).setDepth(9000); // Center and prevent scrolling

    this.add(this.descriptionText);
  }

  // Method to highlight a slot
  highlightSlot(slot, index) {
    // If a slot was previously selected, reset its style
    if (this.selectedSlotIndex !== null) {
      this.slots[this.selectedSlotIndex].setStrokeStyle(2, Phaser.Display.Color.GetColor(210, 180, 140)); // Reset to default
    }

    // Update the selected slot index
    this.selectedSlotIndex = index;

    // Highlight the clicked slot with a different border color (e.g., red)
    slot.setStrokeStyle(4, Phaser.Display.Color.GetColor(55, 55, 60)); // Change border color to red

    // Update the description text based on the selected item
    let selectedItem = this.inventory[index];
    if (selectedItem && selectedItem.name) {
      // If the slot is not empty, display a "Lorem ipsum" or the item description
      this.descriptionText.setText(`${selectedItem.descriptionGa}`);
    } else {
      // If the slot is empty, clear the description text
      this.descriptionText.setText("");
    }
  }

  updateInventory() {
    // Fetch the current inventory from localStorage (or the passed characterSheet)
    let characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
    this.inventory = characterSheet.inventory || [];  // Use the inventory data

    // Remove any previous icons
    this.itemIcons.forEach(icon => icon.destroy());
    this.itemIcons = [];
  }

  // Make sure inventory is visible and updated
  showInventory() {
    this.updateInventory(); // Update inventory first
    this.setVisible(true);
  }

  hideInventory() {
    this.setVisible(false);
  }
}

export default InventoryMenu;

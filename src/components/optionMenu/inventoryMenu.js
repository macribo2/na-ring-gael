import Phaser from "phaser";
import { RedCent,DroppedItem } from "../BallyGamBoy/entities";

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

    let startX = scene.cameras.main.centerX * 0.7; // Centering grid
    let startY = scene.cameras.main.centerY * 0.35; // Adjust position
    this.slotSize = 48;
    this.rows = 2;
    this.cols = 5;
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

    this.itemIcons = [];
    this.setVisible(false);
    scene.add.existing(this);
  
    // Create a placeholder text element for the description
    this.descriptionText = scene.add.text( scene.cameras.main.centerX * 0.1,
      (scene.cameras.main.worldView.y + scene.cameras.main.height / scene.cameras.main.zoom) * 0.45, // Adjusted for zoom
      
      "", {
      font: "32px Aonchlo",
      fill: "#2a3439",
      wordWrap: { width: 800 }
    }).setOrigin(0,0).setScrollFactor(0).setDepth(9000); // Center and prevent scrolling

    this.add(this.descriptionText);
  
  
  // Equipped items section in a diamond shape
this.equippedSlots = [];
let centerX = scene.cameras.main.centerX * 0.3;
let centerY = scene.cameras.main.centerY * 0.5;
let equippedSlotLabels = ["", "", "", " ", ""]; // Added an extra label for the central slot
let positions = [
  { x: centerX, y: centerY - this.slotSize }, // Top (Head)
  { x: centerX - this.slotSize, y: centerY }, // Left (Weapon)
  { x: centerX + this.slotSize, y: centerY }, // Right (Shield)
  { x: centerX, y: centerY + this.slotSize }, // Bottom (Body)
  { x: centerX, y: centerY }  // Center (Main Item) - This is the new slot
];

for (let i = 0; i < 5; i++) { // Loop through 5 instead of 4
  let { x, y } = positions[i];

  let equippedSlot = scene.add.rectangle(x, y, this.slotSize - 4, this.slotSize - 4, darkTea)
    .setStrokeStyle(2, lightTea)
    .setAlpha(0.8)
    .setScrollFactor(0)
    .setInteractive();

  let label = scene.add.text(x, y - 20, equippedSlotLabels[i], {
    font: "20px Aonchlo",
    fill: "#2a3439"
  }).setOrigin(0.5, 0.5).setScrollFactor(0);

  this.equippedSlots.push({ slot: equippedSlot, label: label });
  this.add(equippedSlot);
  this.add(label);
}

    this.itemIcons = [];
    this.setVisible(false);
    scene.add.existing(this);
  
  
  
    this.selectedEquippedSlotIndex = null; // Track the selected equipped slot

    for (let i = 0; i < 5; i++) {
      let { x, y } = positions[i];
    
      let equippedSlot = scene.add.rectangle(x, y, this.slotSize - 4, this.slotSize - 4, darkTea)
        .setStrokeStyle(2, lightTea)
        .setAlpha(0.8)
        .setScrollFactor(0)
        .setInteractive();
    
      let label = scene.add.text(x, y - 20, equippedSlotLabels[i], {
        font: "20px Aonchlo",
        fill: "#2a3439"
      }).setOrigin(0.5, 0.5).setScrollFactor(0);
    
      // Add click event for highlighting
      equippedSlot.on('pointerdown', () => {
        this.highlightEquippedSlot(i); // Pass index of clicked slot
      });
    
      this.equippedSlots.push({ slot: equippedSlot, label: label });
      this.add(equippedSlot);
      this.add(label);
    }
    
  
  // Add action buttons (Use, Drop, Throw) in top-right quadrant with fixed width
  let buttonStartX = scene.cameras.main.centerX * 1.5;
  let buttonStartY = scene.cameras.main.centerY * 0.3;
  let buttonWidth = 120;
  let buttonHeight = 40;
  let buttonLabels = ["úsáid", "síos", "raid"];
  this.actionButtons = [];
  this.actionButtonTexts = []; // Store button texts separately

  buttonLabels.forEach((label, index) => {
    let button = scene.add.rectangle(buttonStartX, buttonStartY + index * 50, buttonWidth, buttonHeight, 0xD2B48C)
      .setStrokeStyle(2, 0x8B6545)
      .setScrollFactor(0)
      .setAlpha(0.2)
      .setInteractive();

    let buttonText = scene.add.text(buttonStartX, buttonStartY + index * 50, label, {
      font: "24px Aonchlo",
      fill: "#2a3439"
    }).setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0.2);

    button.disableInteractive(); // Disable interaction initially
// Add "Unequip" button below the other action buttons
let unequipButtonY = buttonStartY  // Position below last button

this.unequipButton = scene.add.rectangle(buttonStartX, unequipButtonY, buttonWidth, buttonHeight, 0xD2B48C)
  .setStrokeStyle(2, 0x8B6545)
  .setScrollFactor(0)
  .setAlpha(0) // Initially low opacity
  .setInteractive();

this.unequipButtonText = scene.add.text(buttonStartX, unequipButtonY, "bain", {
  font: "24px Aonchlo",
  fill: "#2a3439"
}).setOrigin(0.5, 0.5).setScrollFactor(0).setAlpha(0); // Initially faded

// Disable interaction at start
this.unequipButton.disableInteractive();

// Add to menu container
this.add(this.unequipButton);
this.add(this.unequipButtonText);

    // Add button handlers based on index
    button.on('pointerdown', () => {
      // Only perform action if an item is selected
      if (this.selectedSlotIndex !== null && this.inventory[this.selectedSlotIndex]) {
        const selectedItem = this.inventory[this.selectedSlotIndex];
        
        switch(index) {
          case 0: // úsáid (Use)
            this.useItem(selectedItem);
            break;
          case 1: // síos (Drop)
            this.dropItem(selectedItem);
            break;
          case 2: // raid (Throw)
            this.throwItem(selectedItem);
            break;
        }
      }
    });

    this.actionButtons.push(button);
    this.actionButtonTexts.push(buttonText); // Store reference to text
    this.add(button);
    this.add(buttonText);
  });

  this.unequipButton.on('pointerdown', () => {
    if (this.selectedEquippedSlotIndex !== null) {
        console.log(`Unequipped item from slot ${this.selectedEquippedSlotIndex}`);
        
        // Unequip the item from the selected slot
        this.unequipItem(this.selectedEquippedSlotIndex);

        // If the item in the selected slot was armor (slot index 4), emit 'itemUnequipped'
        if (this.selectedEquippedSlotIndex === 4) {
            this.scene.events.emit('itemUnequipped', "body");
        }
    }
});

  
  }
  unequipItem(slotIndex) {
    if (slotIndex === null) return;

    // Get the character sheet
    const characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
    const equipped = characterSheet.equipped || [];

    // Get the item from the equipped slot
    const itemToUnequip = equipped[slotIndex];

    if (!itemToUnequip) {
        console.log("No item to unequip in slot", slotIndex);
        return;
    }

    console.log("Unequipping item:", itemToUnequip.name);

    // Remove the item from the equipped array
    equipped[slotIndex] = null;
    characterSheet.equipped = equipped;

    // Add the item to the inventory
    if (!characterSheet.inventory) {
        characterSheet.inventory = [];
    }
    characterSheet.inventory.push(itemToUnequip);

    // Save the updated character sheet
    localStorage.setItem('characterSheet', JSON.stringify(characterSheet));

    // Update the local inventory array
    this.inventory.push(itemToUnequip);

    // Remove the item graphic from the equipped slot
    let equippedSlot = this.equippedSlots[slotIndex];
    if (equippedSlot.itemGraphic) {
        equippedSlot.itemGraphic.destroy();
        equippedSlot.itemGraphic = null;
    }

    // Reset the slot color
    equippedSlot.slot.setFillStyle(0xD2B48C); // Reset to default color
    equippedSlot.slot.setStrokeStyle(2, Phaser.Display.Color.GetColor(210, 180, 140));

    // Reset the selected equipped slot
    this.selectedEquippedSlotIndex = null;

    // Update the UI
    this.updateEquippedSlots();
    this.rebuildInventoryDisplay();

    // Hide the unequip button
    this.hideUnequipButton();

    // Clear the description text
    if (this.descriptionText) {
        this.descriptionText.setText("");
    }

    // If this was armor, update the player's armor status
    const player = this.scene.player || this.scene.registry.get('player');
    if (player && slotIndex === 4) { // Assuming center slot (4) is for armor
        player.armor = null;
        
        // Emit an event that the scene can listen for to update the player sprite
        this.scene.events.emit('itemUnequipped', "body");  // You can use the same event name here
    }
}

// Add this method to hide the unequip button
hideUnequipButton() {
  this.unequipButton.setAlpha(0).disableInteractive();
  this.unequipButtonText.setAlpha(0);
}

// Modify the highlightEquippedSlot method to show the unequip button
highlightEquippedSlot(index) {
  // First, clear any existing selections
  this.clearAllSelections();
  
  // Get the character sheet to check if an item is equipped in this slot
  const characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
  const equipped = characterSheet.equipped || [];
  const item = equipped[index];
  
  // If there's an item in this slot
  if (item) {
    console.log(`Selected equipped item: ${item.name}`);
    
    // Highlight the selected equipped slot
    this.equippedSlots[index].slot.setStrokeStyle(2, Phaser.Display.Color.GetColor(255, 215, 0)); // Gold color
    
    // Store the selected equipped slot index
    this.selectedEquippedSlotIndex = index;
    
    // Show item description
    if (this.descriptionText) {
      this.descriptionText.setText(item.descriptionEn || item.name);
    }
    
    // Show the unequip button
    this.unequipButton.setAlpha(1).setInteractive();
    this.unequipButtonText.setAlpha(1);
  }
}

// Modify the clearAllSelections method to include handling the unequip button
clearAllSelections() {
  // Clear inventory selection
  if (this.selectedSlotIndex !== null && this.slots && this.slots[this.selectedSlotIndex]) {
    this.slots[this.selectedSlotIndex].setStrokeStyle(2, Phaser.Display.Color.GetColor(210, 180, 140));
  }
  this.selectedSlotIndex = null;
  
  // Clear equipped slot selection
  if (this.selectedEquippedSlotIndex !== null && this.equippedSlots && this.equippedSlots[this.selectedEquippedSlotIndex]) {
    this.equippedSlots[this.selectedEquippedSlotIndex].slot.setStrokeStyle(2, Phaser.Display.Color.GetColor(210, 180, 140));
  }
  this.selectedEquippedSlotIndex = null;
  
  // Hide the unequip button
  this.hideUnequipButton();}
  highlightEquippedSlot(index) {
    let lightTea = Phaser.Display.Color.GetColor(210, 180, 140);
    let darkTea = Phaser.Display.Color.GetColor(139, 101, 69);
  
    // Reset previously selected equipped slot
    if (this.selectedEquippedSlotIndex !== null) {
      this.equippedSlots[this.selectedEquippedSlotIndex].slot.setFillStyle(darkTea);
    }
  
    // Highlight new equipped slot
    this.equippedSlots[index].slot.setFillStyle(lightTea);
    this.selectedEquippedSlotIndex = index;
  
    // Show and enable Unequip button
    this.unequipButton.setAlpha(1).setInteractive().setDepth(300);
    this.unequipButtonText.setAlpha(1).setDepth(300);
  
    // Hide action buttons for inventory
    this.actionButtons.forEach((button, i) => {
      button.setAlpha(0.2).disableInteractive().setDepth(0);
      this.actionButtonTexts[i].setAlpha(0.2).setDepth(0);
    });
  
    // Clear any selected inventory slot
    if (this.selectedSlotIndex !== null) {
      this.slots[this.selectedSlotIndex].setStrokeStyle(2, lightTea);
      this.selectedSlotIndex = null;
    }
  }
  
  highlightSlot(slot, index) {
    let lightTea = Phaser.Display.Color.GetColor(210, 180, 140);
    let darkGrey = Phaser.Display.Color.GetColor(55, 55, 60);
  
    // Reset previously selected inventory slot
    if (this.selectedSlotIndex !== null) {
      this.slots[this.selectedSlotIndex].setStrokeStyle(2, lightTea);
    }
  
    this.selectedSlotIndex = index;
    slot.setStrokeStyle(4, darkGrey);
  
    const selectedItem = this.inventory[index];
  
    if (selectedItem && selectedItem.name) {
      // Show item description
      this.descriptionText.setText(selectedItem.descriptionGa);
  
      // Show and enable action buttons
      this.actionButtons.forEach((button, i) => {
        button.setAlpha(1).setInteractive().setDepth(300);
        this.actionButtonTexts[i].setAlpha(1).setDepth(300);
      });
    } else {
      this.descriptionText.setText("");
  
      // If slot is empty, disable action buttons
      this.actionButtons.forEach((button, i) => {
        button.setAlpha(0.5).disableInteractive().setDepth(0);
        this.actionButtonTexts[i].setAlpha(0.5).setDepth(0);
      });
    }
  
    // Hide Unequip button (since an inventory slot is selected)
    this.unequipButton.setAlpha(0).disableInteractive().setDepth(0);
    this.unequipButtonText.setAlpha(0).setDepth(0);
  
    // Clear any selected equipped slot
    if (this.selectedEquippedSlotIndex !== null) {
      this.equippedSlots[this.selectedEquippedSlotIndex].slot.setFillStyle(lightTea);
      this.selectedEquippedSlotIndex = null;
    }
  }
  
  useItem(item) {
    console.log("Using item:", item.name);
    
    // Handle different item types
    if (item.type === "consumable") {
        // Handle consumable items (potions, food, etc)
        this.handleConsumable(item);
    } else if (item.type === "equip-body") {
        // Equip armor to the central slot
        this.equipArmor(item); // Equip armor
    } else if (item.type === "key") {
        // Handle key items which may trigger events
        this.scene.events.emit('useKeyItem', item);
    } else {
        // Generic use case
        this.scene.events.emit('useItem', item);
    }
    
    // Emit an event that the scene can listen for
    this.scene.events.emit('itemUsed', item, this.selectedSlotIndex);
}


equipArmor(item) {
  const player = this.scene.player || this.scene.registry.get('player');
  
  if (!player) {
      console.error("Player object not found!");
      return;
  }

  // Ensure item has a valid slot, default to 'body' if not assigned
  if (!item.slot) {
      item.slot = "body";  // Ensure it's set to "body" or adjust accordingly
  }

  console.log("Using item slot:", item.slot);

  // Get the current index of the selected item
  const index = this.selectedSlotIndex;

  if (index !== null && index >= 0 && index < this.inventory.length) {
      // Remove the item from the inventory array
      const equippedItem = this.inventory[index];
      this.inventory.splice(index, 1);
      
      // Find and destroy the item icon in the inventory slot
      if (this.itemIcons && this.itemIcons[index]) {
          this.itemIcons[index].destroy();
          // Remove from the itemIcons array as well
          this.itemIcons.splice(index, 1);
      }

      // Un-highlight the selected slot
      if (this.slots[index]) {
          this.slots[index].setStrokeStyle(2, Phaser.Display.Color.GetColor(210, 180, 140));
      }

      // Reset selection
      this.selectedSlotIndex = null;

      // Clear description
      if (this.descriptionText) {
          this.descriptionText.setText("");
      }

      // Disable action buttons
      if (this.actionButtons) {
          this.actionButtons.forEach((button, i) => {
              button.setAlpha(0.2).disableInteractive();
              if (this.actionButtonTexts && this.actionButtonTexts[i]) {
                  this.actionButtonTexts[i].setAlpha(0.2);
              }
          });
      }

      // Add the item to the central equipment slot (equippedSlots[4])
      let centerSlot = this.equippedSlots[4];
      centerSlot.slot.setFillStyle(0x8B6545);

      // Remove any previous graphic
      if (centerSlot.itemGraphic) {
          centerSlot.itemGraphic.destroy();
      }

      // Use the same approach as updateEquippedSlots
      const textureKey = item.texture || item.name;
      console.log("Using texture key for equipped item:", textureKey);

      // Create an image instead of a sprite
      centerSlot.itemGraphic = this.scene.add.image(
          centerSlot.slot.x, 
          centerSlot.slot.y, 
          textureKey
      ).setScale(0.9).setScrollFactor(0);

      // Add it to the container
      this.add(centerSlot.itemGraphic);
      
      console.log("Successfully added item graphic with texture:", textureKey);

      // Update player stats or conditions
      player.armor = item;

      // Emit the event with the equipped item
      this.scene.events.emit('itemEquipped', item);

      // Update characterSheet in localStorage
      const characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
      
      // Update inventory in localStorage
      characterSheet.inventory = this.inventory;
      
      // Initialize equipped array if it doesn't exist
      if (!characterSheet.equipped) {
          characterSheet.equipped = [];
      }
      
      // Set the armor in the central slot (index 4)
      characterSheet.equipped[4] = item;
      
      // Save the updated character sheet
      localStorage.setItem('characterSheet', JSON.stringify(characterSheet));
      
      // Rebuild the entire inventory display to ensure it's correct
      this.rebuildInventoryDisplay();
      
      // Call updateEquippedSlots to show all equipped items
      if (this.updateEquippedSlots && typeof this.updateEquippedSlots === 'function') {
          this.updateEquippedSlots();
      }
  }
}


// Add this helper method to completely rebuild the inventory display
rebuildInventoryDisplay() {
  // First, clear all existing item icons
  if (this.itemIcons) {
    this.itemIcons.forEach(icon => {
      if (icon && icon.destroy) {
        icon.destroy();
      }
    });
  }
  this.itemIcons = [];
  
  // Now rebuild the icons from the current inventory data
  this.inventory.forEach((item, i) => {
    if (item) {
      const slot = this.slots[i];
      const textureKey = item.texture || item.name;
      
      if (slot) {
        const icon = this.scene.add.image(
          slot.x, 
          slot.y, 
          textureKey
        )
        .setScale(0.9)
        .setScrollFactor(0);
        
        this.itemIcons[i] = icon;
        this.add(icon);
      }
    }
  });
  
  console.log("Inventory display rebuilt with", this.itemIcons.length, "items");
}
  dropItem(item) {
    console.log("Dropping item:", item.name);

    // Get the current index of the selected item
    const index = this.selectedSlotIndex;

    if (index !== null && index >= 0 && index < this.inventory.length) {
        // Remove the item from the inventory array
        const droppedItem = this.inventory[index];
        this.inventory.splice(index, 1);

        // Update the character sheet in localStorage
        const characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
        characterSheet.inventory = this.inventory;
        localStorage.setItem('characterSheet', JSON.stringify(characterSheet));

        // Un-highlight the selected slot
        if (this.slots[index]) {
            this.slots[index].setStrokeStyle(2, Phaser.Display.Color.GetColor(210, 180, 140));
        }

        // Reset selection
        this.selectedSlotIndex = null;

        // Update the inventory visually
        this.updateInventory();

        // Clear description
        this.descriptionText.setText("");

        // Disable action buttons
        this.actionButtons.forEach((button, i) => {
            button.setAlpha(0.2).disableInteractive();
            this.actionButtonTexts[i].setAlpha(0.2);
        });

        // Get player's current position from the scene
        const player = this.scene.player || this.scene.registry.get('player');
        if (player) {
            try {
                // Get the actual player sprite position
                const playerX = player.sprite ? player.sprite.x : player.x;
                const playerY = player.sprite ? player.sprite.y : player.y;

                console.log("Player position:", playerX, playerY);

                // Create sprite at player's exact position (slightly below player)
                const droppedSprite = this.scene.physics.add.sprite(
                    playerX, 
                    playerY + 12, // Drop just below player
                    droppedItem.texture || 'redCent' 
                ).setDepth(9900).setScale(1);

                console.log("Created dropped sprite at:", playerX, playerY + 32);

                // Add collision with player for pickup
                const playerSprite = player.sprite || player;
                this.scene.physics.add.overlap(
                    playerSprite, 
                    droppedSprite, 
                    () => {
                        console.log("Item picked up!");
                        droppedSprite.destroy();

                        // Add item back to character sheet in localStorage
                        let characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
                        if (!characterSheet.inventory) {
                            characterSheet.inventory = [];
                        }

                        // Create a simplified version of the item to store
                        const itemData = {
                            name: droppedItem.name,
                            type: droppedItem.type,
                            texture: droppedItem.name,
                            descriptionGa: droppedItem.descriptionGa,
                            descriptionEn: droppedItem.descriptionEn
                       };

                        // Add to localStorage inventory
                        characterSheet.inventory.push(itemData);
                        localStorage.setItem('characterSheet', JSON.stringify(characterSheet));

                        console.log("Item added back to inventory in localStorage");

                        // Update the inventory UI if needed
                        if (this.updateInventory && typeof this.updateInventory === 'function') {
                            this.updateInventory();
                        }

                        // Emit an event for other listeners
                        this.scene.events.emit('itemPickedUp', droppedItem);
                    }
                );

            } catch (error) {
                console.error('Error dropping item:', error, error.stack);
            }
        }

        // Emit the event for any other listeners
        this.scene.events.emit('itemDropped', item, index);
    }
    if (this.parentContainer && this.parentContainer.hideMenu) {
      this.parentContainer.hideMenu();
  
      // Ensure ControlSquare knows the menu is closed
      if (this.scene.controlSquare) {
        this.scene.controlSquare.isOptionMenuOpen = false;
        this.scene.events.emit('optionMenuState', false); // Notify other systems
      }
    }
  
  }

  throwItem(item) {
    console.log("Throwing item:", item.name);
    
    // Check if item is throwable
    if (item.throwable) {
      // Handle throwable item
      this.scene.events.emit('throwItem', item, this.selectedSlotIndex);
      
      // Check if throwable is consumable (like a potion that breaks)
      if (item.consumedOnThrow) {
        this.removeItemFromInventory(this.selectedSlotIndex);
      }
    } else {
      // For non-throwable items, perhaps show a message
      console.log("This item cannot be thrown");
      this.scene.events.emit('cannotThrowItem', item);
    }
  }
  
  // Helper functions for the action methods
  handleConsumable(item) {
    // Apply item effects (health, mana, etc)
    if (item.effects) {
      for (const effect of item.effects) {
        if (effect.type === "heal") {
          this.scene.events.emit('healPlayer', effect.value);
        } else if (effect.type === "buff") {
          this.scene.events.emit('buffPlayer', effect.stat, effect.value, effect.duration);
        }
        // Add more effect types as needed
      }
    }
    
    // Remove the consumed item
    this.removeItemFromInventory(this.selectedSlotIndex);
  }
  
  equipItem(item) {
    // Determine which equipment slot to use
    let slotIndex = -1;
    if (item.slot === "head") slotIndex = 0;
    else if (item.slot === "weapon") slotIndex = 1;
    else if (item.slot === "shield") slotIndex = 2;
    else if (item.slot === "body") slotIndex = 4;  // Correct slot for body

    if (slotIndex >= 0) {
      // First check if something is already equipped in that slot
      const characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
      const equipped = characterSheet.equipped || [];
      
      if (equipped[slotIndex]) {
        // Unequip current item and add back to inventory
        this.inventory.push(equipped[slotIndex]);
      }
      
      // Equip the new item
      equipped[slotIndex] = item;
      
      // Remove item from inventory
      this.removeItemFromInventory(this.selectedSlotIndex);
      
      // Update character sheet
      characterSheet.equipped = equipped;
      localStorage.setItem('characterSheet', JSON.stringify(characterSheet));
      
      // Update equipped slots visually
      this.updateEquippedSlots();
      
      // Emit equipment change event
      this.scene.events.emit('equipmentChanged', item, slotIndex);
    }
  }
  
  removeItemFromInventory(index) {
    if (index !== null && index >= 0 && index < this.inventory.length) {
      // Remove the item from inventory array
      this.inventory.splice(index, 0, 1);
      
      // Update the character sheet in localStorage
      const characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
      characterSheet.inventory = this.inventory;
      localStorage.setItem('characterSheet', JSON.stringify(characterSheet));
      
      // Reset selection
      this.selectedSlotIndex = null;
      
      // Update the inventory visually
      this.updateInventory();
      
      // Clear description
      this.descriptionText.setText("");
      
      // Disable action buttons
      this.actionButtons.forEach((button, i) => {
        button.setAlpha(0.2).disableInteractive();
        this.actionButtonTexts[i].setAlpha(0.2);
      });
    }
  }
  
  updateEquippedSlots() {
    // Get equipped items from character sheet
    const characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
    const equipped = characterSheet.equipped || [];
    
    // Clear existing equipped item icons
// Clear existing equipped item icons
if (this.equippedItemIcons) {
  this.equippedItemIcons.forEach(icon => icon.destroy());
}
    this.equippedItemIcons = [];
    
    // Add icons for equipped items
    equipped.forEach((item, index) => {
      if (item) {
        const slot = this.equippedSlots[index].slot;
        let icon = this.scene.add.image(slot.x, slot.y, item.name)
          .setScale(0.9)
          .setScrollFactor(0);
        
        this.equippedItemIcons.push(icon);
        this.add(icon);
      }
    });
  }

  
  updateInventory() {
    // Fetch the current inventory from localStorage (or the passed characterSheet)
    let characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
    this.inventory = characterSheet.inventory || [];  // Use the inventory data

    // Remove any previous icons
    this.itemIcons.forEach(icon => icon.destroy());
    this.itemIcons = [];

    // Log the inventory items
    console.log("Updating inventory. Current items:", this.inventory);

    // Populate slots with item icons
    this.inventory.forEach((item, index) => {
      if (index < this.slots.length) {
        let x = this.slots[index].x;
        let y = this.slots[index].y;

        // Log the current item and its texture
        console.log(`Slot ${index}: Adding item -`, item);
        console.log(`Slot ${index}: Item texture -`, item.texture);

        // Create an icon for each item using its texture (or 'imageKey')
        let icon = this.scene.add.image(x, y, item.texture)  // Use item.texture for icon
          .setScale(0.9)  // Scale it to fit the slot
          .setScrollFactor(0);

        this.itemIcons.push(icon);
        this.add(icon);
      } else {
        // Log if there are too many items

// Log if there are too many items for the available slots
        console.log(`Slot ${index} has no available space for an item.`);
      }
    });
    
    // Also update the equipped slots when updating inventory
    this.updateEquippedSlots();
  }

  // Make sure inventory is visible and updated
  showInventory() {
    this.updateInventory(); // Update inventory first
    this.setVisible(true);
  }

  hideInventory() {
    this.setVisible(false);
    
    // Reset selection when hiding inventory
    if (this.selectedSlotIndex !== null) {
      this.slots[this.selectedSlotIndex].setStrokeStyle(2, Phaser.Display.Color.GetColor(210, 180, 140));
      this.selectedSlotIndex = null;
    }
    
    // Clear description
    this.descriptionText.setText("");
    
    // Disable all action buttons
    this.actionButtons.forEach((button, i) => {
      button.setAlpha(0.2).disableInteractive();
      this.actionButtonTexts[i].setAlpha(0.2);
    });
  }
  
  // Method to handle button hover effects
  setupButtonHoverEffects() {
    this.actionButtons.forEach((button, index) => {
      button.on('pointerover', () => {
        if (button.input.enabled) {
          button.setAlpha(1.2);
          this.actionButtonTexts[index].setAlpha(1.2);
        }
      });
      
      button.on('pointerout', () => {
        if (button.input.enabled) {
          button.setAlpha(1);
          this.actionButtonTexts[index].setAlpha(1);
        }
      });
    });
  }
  
  // Method to register global event handlers related to inventory
  registerEvents() {
    // Listen for item pickup events
    this.scene.events.on('itemPickedUp', (item) => {
      // Add item to inventory
      const characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
      const inventory = characterSheet.inventory || [];
      
      // Check if inventory is full
      if (inventory.length < this.rows * this.cols) {
        inventory.push(item);
        characterSheet.inventory = inventory;
        localStorage.setItem('characterSheet', JSON.stringify(characterSheet));
        
        // Update inventory display if it's currently visible
        if (this.visible) {
          this.updateInventory();
        }
      } else {
        // Inventory is full - emit an event
        this.scene.events.emit('inventoryFull', item);
      }
    });
  }
}

export default InventoryMenu;
export class Inventory {
  constructor(size = 10) {
    this.size = size; // Maximum number of items in inventory
    this.items = [];  // List of items in inventory
  }

  // Add an item to the inventory
  addItem(item) {
    if (this.items.length < this.size) {
      this.items.push(item);
      console.log(`${item.name} added to inventory.`);
    } else {
      console.log("Inventory is full. Cannot add item.");
    }
  }

  // Remove an item from the inventory
  removeItem(item) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      console.log(`${item.name} removed from inventory.`);
    } else {
      console.log(`${item.name} is not in the inventory.`);
    }
  }

  // Display the current inventory
  showInventory() {
    console.log("Current Inventory:");
    this.items.forEach(item => {
      console.log(`- ${item.name}`);
    });
  }
}

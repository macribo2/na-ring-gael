export class Inventory {
  constructor(size = 10) {
    this.size = size;
    this.items = []; // Stores objects like { name: 'Red Cent', texture: 'redCent', slot: 4 }
  }

  addItem(item) {
    if (this.items.length < this.size) {
      this.items.push(item);
      console.log(`${item.name} added to inventory.`);
    } else {
      console.log("Inventory is full. Cannot add item.");
    }
  }

  removeItem(item) {
    const index = this.items.findIndex(i => i.name === item.name);
    if (index !== -1) {
      this.items.splice(index, 1);
      console.log(`${item.name} removed from inventory.`);
    } else {
      console.log(`${item.name} is not in the inventory.`);
    }
  }
}

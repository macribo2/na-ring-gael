import { Inventory } from "./inventory";

export class GameEntity {
  static ENTITY_TYPES = {
    PLAYER: 'player',
    ENEMY: 'enemy',
    ITEM: 'item'
  };

  // Scene MUST be first parameter
  constructor(scene, x, y, type) {
    this.scene = scene; // Store scene reference
    this.x = x;
    this.y = y;
    this.type = type;
    this.energy = 0;
    this.speed = 10;
  }


  getSpeed() {
    return this.speed;
  }

  act() {
    return new Promise(resolve => {
      this.energy -= 100;
      this.performAction(resolve);
    });
  }

  performAction(callback) {
    callback();
  }
}

export class Item extends GameEntity {
  // Now properly receives scene first
  constructor(scene, x, y, name, description, type = GameEntity.ENTITY_TYPES.ITEM) {
    super(scene, x, y, type); // Pass scene to parent
    this.name = name;
    this.description = description;
  }
  pickup(player) {
    if (!this.pickedUp) {  // ✅ Prevent multiple pickups
        this.pickedUp = true;
        super.pickup(player);  // ✅ Only call the parent method once
        console.log(`${player.name} picked up something.`);
    }
}

  // Override the use method for when the Red Cent is used
  use(player) {
    super.use(player);
    console.log(`${player.name} used a Red Cent. Nothing special happens.`);
  }

  // Override the drop method for dropping the Red Cent
  drop(player) {
    super.drop(player);
    player.removeFromInventory(this);  // Remove the Red Cent from the player's inventory
    console.log(`${player.name} dropped the Red Cent.`);
  }
}
export class PlayerEntity extends GameEntity {
  constructor(scene, x, y) {
    super(scene, x, y, GameEntity.ENTITY_TYPES.PLAYER);
    this.scene = scene;
    this.speed = 20;
    this.inputResolver = null;
    this.onStairs = null; // 'up' or 'down' when on stairs

    // Cooldown setup
    this.moveCooldown = 200; // Time in milliseconds between movements
    this.lastMoveTime = 0; // Last movement time

    this.pendingInput = false; // Prevent multiple inputs in the same frame
    this.name = "Tomás Tástál"
    this.inventory = new Inventory();  // Use the Inventory class for the player's inventory

    // Menu state flag
    this.isOptionMenuOpen = false;

    // Listen for option menu state changes
    this.scene.events.on('optionMenuState', (isOpen) => {
      this.isOptionMenuOpen = isOpen;
    });
  }

  addToInventory(item) {
    if (this.inventory.items.length < this.inventory.size) {
        this.inventory.addItem(item);
        console.log(`${item.name} added to inventory.`);

        // ✅ Update the inventory menu
        if (this.inventoryMenu) {
            this.inventoryMenu.updateInventory();
        }
    } else {
        console.log("Inventory full. Cannot pick up item.");
    }
}

  // Check for nearby items and interact with them
  interactWithItems() {
    this.scene.entities.forEach(entity => {
      if (entity instanceof RedCent) {
        // Check if the player's position matches the item's position
        if (Math.abs(this.x - entity.x) < this.tileSize && Math.abs(this.y - entity.y) < this.tileSize) {
          entity.pickup(this);  // Pickup the Red Cent
          console.log(`${this.name} interacted with the Red Cent.`);
        }
      }
    });
  }

  // Use the first item in the inventory
  useItem() {
    if (this.inventory.length > 0) {
      const item = this.inventory[0];
      item.use(this);
    } else {
      console.log("No items in inventory.");
    }
  }

  resolveInput() {
    if (this.pendingInput || this.isOptionMenuOpen) {
      return; // Don't process if there's already a pending input or menu is open
    }

    if (this.inputResolver) {
      this.inputResolver();
      this.inputResolver = null;
      this.pendingInput = true; // Mark input as pending until cooldown
    }
  }

  act() {
    return new Promise(resolve => {
      this.waitForInput().then(() => {
        this.energy -= 100;
        resolve();
      });
    });
  }

  waitForInput() {
    return new Promise(resolve => {
      this.inputResolver = resolve;
    });
  }

  // Move method with cooldown logic
  move(dx, dy) {
    if (this.isOptionMenuOpen) return; // Don't move if menu is open

    const currentTime = this.scene.time.now;

    // Only process movement if enough time has passed (based on cooldown)
    if (currentTime - this.lastMoveTime >= this.moveCooldown) {
      this.lastMoveTime = currentTime; // Update the last move time

      const newGridX = this.gridX + dx;
      const newGridY = this.gridY + dy;

      // Ensure the scene and map exist before checking collisions
      if (!this.scene || !this.scene.map) {
        console.error("Scene or map is undefined.");
        return;
      }

      // Check if the new position is a wall or walkable
      if (this.scene.map[newGridX] && this.scene.map[newGridX][newGridY] === 0) {
        // Only update position if it's a walkable tile
        this.gridX = newGridX;
        this.gridY = newGridY;

        const newX = (this.gridX + 0.5) * 32; // Center of tile
        const newY = (this.gridY + 0.5) * 32; // Center of tile

        console.log(`Player moving to: (${newX}, ${newY})`);

        // Smooth transition to the new position
        this.scene.tweens.add({
          targets: this.sprite,
          x: newX,
          y: newY,
          duration: 150, // Adjust duration for speed
          ease: 'Linear', // Smooth movement
          onComplete: () => {
            this.x = newX;
            this.y = newY;
            this.pendingInput = false; // Allow next input after movement is complete

            // After moving, check for interactions with items
            this.interactWithItems();
          }
        });
      } else {
        console.log(`Blocked! Cannot move to (${newGridX}, ${newGridY})`);
        this.pendingInput = false; // Allow input even if blocked
      }
    } else {
      console.log("Move cooldown active. Wait before moving again.");
    }
  }

  updatePosition() {
    if (this.sprite) {
      this.sprite.setPosition(this.x, this.y);
    }
  }
}

export class RedCent extends Item {
  constructor(scene, x, y) {
    // Proper parameter order now matches parent class
    super(scene, x, y, 
      "Red Cent", 
      "A worthless red cent. But it's worth something!"
    );
    
    // Add visual representation for the Red Cent
    this.sprite = this.scene.add.sprite(x, y, 'redCent').setDepth(90);
    this.texture = 'redCent';
    this.descriptionGa = 'Pingin rua: \nCruit ar an aghaidh, cuachóg ar cúl. Pingin ádhmharach, b\'feidir.';
    this.descriptionEn = 'Red cent: \nHarp on the face, a sailor\'s knot / plait / young cuckoo on the back. A lucky penny, perhaps.';
    // Enable physics for the sprite
    this.scene.physics.world.enable(this.sprite);
    this.sprite.body.setCollideWorldBounds(true);  // Optional: prevents the Red Cent from going out of bounds
    this.sprite.body.setImmovable(true);  // Optional: makes the Red Cent immovable

    // Set additional properties for the Red Cent if needed (e.g., interactions)
  }

  // Override the pickup method to add the Red Cent to the player's inventory
  pickup(player) {
    super.pickup(player);
    player.addToInventory(this);  // Add the Red Cent to the player's inventory
    console.log(`${player.name} picked up a Red Cent.`);
  }

  // Override the use method for when the Red Cent is used
  use(player) {
    super.use(player);
    console.log(`${player.name} used a Red Cent. Nothing special happens.`);
  }

  // Override the drop method for dropping the Red Cent
  drop(player) {
    super.drop(player);
    player.removeFromInventory(this);  // Remove the Red Cent from the player's inventory
    console.log(`${player.name} dropped the Red Cent.`);
  }
}


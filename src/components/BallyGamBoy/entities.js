import { Inventory } from "./inventory";
import Phaser from "phaser";


// Item Registry - Add this before other classes
export class ItemRegistry {
  static itemClasses = {
    'Red Cent': RedCent,
    // Add other items as you create them:
    // 'Health Potion': HealthPotion,
  };

  static registerItemClass(name, itemClass) {
    this.itemClasses[name] = itemClass;
  }

  static createItem(scene, x, y, itemName) {
    const ItemClass = this.itemClasses[itemName] || Item;
    return new ItemClass(scene, x, y);
  }
}




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
    super(scene, x, y, "Red Cent", "A worthless red cent. But it's worth something!");
    
    if (!scene) {
      console.error("Scene is undefined. Cannot add sprite.");
      return;
    }
    
    this.scene = scene; // Ensure it's correctly assigned
    
    // Add visual representation for the Red Cent
    this.sprite = this.scene.add.sprite(x, y, 'redCent').setDepth(90);
    this.texture = 'redCent';
    this.descriptionGa = 'Pingin rua: \nCruit ar an aghaidh, cuachóg ar cúl. Pingin ádhmharach, b\'feidir.';
    this.descriptionEn = 'Red cent: \nHarp on the face, a sailor\'s knot / plait / young cuckoo on the back. A lucky penny, perhaps.';
    
    // Enable physics for the sprite
    this.scene.physics.world.enable(this.sprite);
    this.sprite.body.setCollideWorldBounds(true);
    this.sprite.body.setImmovable(true);
  }

  pickup(player) {
    super.pickup(player);
    player.addToInventory(this);
    console.log(`${player.name} picked up a Red Cent.`);
  }

  use(player) {
    super.use(player);
    console.log(`${player.name} used a Red Cent. Nothing special happens.`);
  }

  drop(player) {
    super.drop(player);
    player.removeFromInventory(this);
    console.log(`${player.name} dropped the Red Cent.`);

    // Make sure the Red Cent is dropped properly onto the game map
    // Here, we are assuming the scene has been set correctly
    const droppedItem = new RedCent(this.scene, player.x, player.y + 32); // Drop slightly below the player

    // If necessary, you can add further logic to check collision, visibility, or other actions

    // Example: Add the dropped item to the world (or make it visible in the scene)
    this.scene.add.existing(droppedItem.sprite);

    // Enable collision with the player to pick up the dropped item
    this.scene.physics.add.overlap(player.sprite, droppedItem.sprite, (player, item) => {
      // Handle pickup logic here
      this.scene.events.emit('itemPickedUp', item);
      item.sprite.destroy();  // Destroy the dropped item after pickup
    });
  }
}


export class DroppedItem extends GameEntity {
  constructor(scene, x, y, itemInstance) { // Changed parameter to itemInstance
      super(scene, x, y, GameEntity.ENTITY_TYPES.ITEM);
      this.itemInstance = itemInstance;
      
      const TILE_SIZE = 32;
      this.sprite = scene.physics.add.sprite(
          x * TILE_SIZE + TILE_SIZE/2,
          y * TILE_SIZE + TILE_SIZE/2, 
          itemInstance.texture
      ).setDepth(9900);
      
      // Link sprite to the actual item instance
      this.sprite.entityParent = this.itemInstance;
      
    }
}

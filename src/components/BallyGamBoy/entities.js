
import { Inventory } from "./inventory";
import Phaser from "phaser";

// GameEntity class remains the same
export class GameEntity {
  static ENTITY_TYPES = {
    PLAYER: 'player',
    ENEMY: 'enemy',
    ITEM: 'item'
  };

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
  constructor(scene, x, y, name, type, descriptionGa, descriptionEn) {
    super(scene, x, y, GameEntity.ENTITY_TYPES.ITEM);
    this.name = name;
    this.texture = name; // Add this line to set the texture property
    this.descriptionGa = descriptionGa;
    this.descriptionEn = descriptionEn;
    this.type = type;

    // Use the name as the texture key
    this.sprite = scene.add.sprite(x, y, name).setDepth(90);
    this.sprite.setPipeline('Light2D'); // ✅ Enable dynamic lighting on the sprite

    // Enable physics
    scene.physics.world.enable(this.sprite);
    this.sprite.body.setCollideWorldBounds(true);
    this.sprite.body.setImmovable(true);
  }

  pickup(player) {
    if (!this.pickedUp) {
      this.pickedUp = true;
      player.addToInventory(this);
      console.log(`${player.name} picked up ${this.name}.`);
    }
  }

  use(player) {
    console.log(`${player.name} used ${this.name}. Nothing special happens.`);
  }

  drop(player) {
    player.removeFromInventory(this);
    console.log(`${player.name} dropped the ${this.name}.`);

    // Dropping the item back into the world
    const droppedItem = new DroppedItem(this.scene, player.x, player.y + 32, this);
    this.scene.add.existing(droppedItem.sprite);
  }
}

// RedCent class, now simplified
export class RedCent extends Item {
  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      "redCent",
      "equip-left",
      "Pingin ádhmharach rua",
      "A lucky red penny"
    );
  }
}

export class Armour extends Item {
  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      "armour",
      "equip-body",
      "Cathéide",
      "Battle garment"
    );
  }

  use(player) {
    super.use(player);  // Call the default use behavior
    console.log(`${player.name} used battle garment. It's shiny and valuable!`);
  }
}

// DroppedItem class to handle dropped items in the world
export class DroppedItem extends GameEntity {
  constructor(scene, x, y, itemInstance) {
    super(scene, x, y, GameEntity.ENTITY_TYPES.ITEM);
    this.itemInstance = itemInstance;
    
    const TILE_SIZE = 32;
    this.sprite = scene.physics.add.sprite(
        x * TILE_SIZE + TILE_SIZE / 2,
        y * TILE_SIZE + TILE_SIZE / 2, 
        itemInstance.name
    ).setDepth(19);
    
    // Link sprite to the actual item instance
    this.sprite.entityParent = this.itemInstance;

    // Handle pickup logic if player overlaps with the dropped item
    scene.physics.add.overlap(scene.player.sprite, this.sprite, () => {
      if (!itemInstance.pickedUp) {
        itemInstance.pickup(scene.player);
        this.sprite.destroy();  // Remove the dropped item
      }
    });
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
    
    // New fields for ROT.js scheduler
    this.currentResolve = null;

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

  act() {
    console.log("Player's turn!");
    this.scene.awaitPlayerInput = true;
  
    // Enable controls here (allow the player to interact)
    this.scene.input.keyboard.enabled = true;
    this.scene.events.emit("playerTurnStarted"); // Custom event for other game logic if needed
  
    // Return a promise that resolves when the player's turn is done
    return new Promise(resolve => {
      this.currentResolve = resolve;  // When the player's action completes, call resolve
    });
  }
  
  
  // Call this when player's move animation completes
  handleActionComplete() {
    console.log("Player's turn completed.");
    
    if (this.currentResolve) {
      // Tell the scheduler we're done with our turn
      this.currentResolve();
      this.currentResolve = null;
      this.scene.awaitPlayerInput = false;
      
      // For debugging
      if (this.scene.debugScheduler) {
        this.scene.debugScheduler();
      }
    }
  }
  // This method should be called after the player has made a move
  // (from your input handler or move() method)
  handleActionComplete() {
    console.log("Player's turn completed.");
    
    if (this.currentResolve) {
      this.currentResolve(); // Resolve the promise to tell the scheduler we're done
      this.currentResolve = null;
      this.scene.awaitPlayerInput = false;
    }
  }

  waitForInput() {
    return new Promise(resolve => {
      this.inputResolver = resolve;
    });
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

  // Move method with cooldown logic and step sound
  move(dx, dy) {
    if (this.isOptionMenuOpen) return; // Don't move if menu is open

    const currentTime = this.scene.time.now;

    if (currentTime - this.lastMoveTime >= this.moveCooldown) {
      this.lastMoveTime = currentTime; // Update the last move time

      const newGridX = this.gridX + dx;
      const newGridY = this.gridY + dy;

      if (!this.scene || !this.scene.map) {
        console.error("Scene or map is undefined.");
        return;
      }

      if (this.scene.map[newGridX] && this.scene.map[newGridX][newGridY] === 0) {
        this.gridX = newGridX;
        this.gridY = newGridY;

        const newX = (this.gridX + 0.5) * 32;
        const newY = (this.gridY + 0.5) * 32;

        console.log(`Player moving to: (${newX}, ${newY})`);

        if (dx < 0) {
          this.sprite.setFlipX(true);
        } else if (dx > 0) {
          this.sprite.setFlipX(false);
        }

        // Play step sound with random pitch variation
        const stepSound = this.scene.sound.add('step');
        stepSound.setDetune(Phaser.Math.Between(-100, 100)); // Slightly vary pitch
        stepSound.play();

        // Smooth transition
        this.scene.tweens.add({
          targets: this.sprite,
          x: newX,
          y: newY,
          duration: 150,
          ease: 'Linear',
          onComplete: () => {
            this.x = newX;
            this.y = newY;
            this.pendingInput = false;
            this.interactWithItems();
            console.log("Calling handleActionComplete to end player turn");

            // Complete the player's turn after movement is done
            this.handleActionComplete();
          }
        });

        // Bobbing & Swinging Effect (left/right only)
        if (Math.abs(dx) > Math.abs(dy)) {
          // Bobbing effect for left/right movement
          this.scene.tweens.add({
            targets: this.sprite,
            y: this.sprite.y - 4,
            duration: 75,
            ease: 'Sine.easeInOut',
            yoyo: true,
          });

          // Swinging effect for left/right movement
          this.scene.tweens.add({
            targets: this.sprite,
            angle: dx > 0 ? 5 : -5,
            duration: 75,
            ease: 'Sine.easeInOut',
            yoyo: true,
          });
        }

        // Apply sway effect for up/down movement (no bobbing)
        if (Math.abs(dy) > Math.abs(dx)) {
          // Swinging effect for up/down movement
          this.scene.tweens.add({
            targets: this.sprite,
            angle: dy > 0 ? 5 : -5, // Tilt forward or backward in movement direction
            duration: 75,
            ease: 'Sine.easeInOut',
            yoyo: true, // Swing back
          });
        }
      } else {
        console.log(`Blocked! Cannot move to (${newGridX}, ${newGridY})`);
        this.pendingInput = false;
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
  
  // Remove this method as it's causing the double-unlock issue
  // performAction(callback) {
  //   console.log("Player's turn!");
  //   this.scene.awaitPlayerInput = true; // Stop automatic progression
  //   callback(); // This is causing the problem!
  // }
}
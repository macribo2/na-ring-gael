import { Item, RedCent, Armour } from './entities';  // Import the base Item class and specific items

// Helper function to generate a random item (e.g., RedCent, etc.)
function generateRandomItem(scene, x, y) {
  const itemTypes = [RedCent];  // Add more item types here as you create them
  const randomItemClass = itemTypes[Math.floor(Math.random() * itemTypes.length)];
  return new randomItemClass(scene, x, y);  // Create a random item at the given coordinates
}

export default function populateDungeon(dungeon, inventoryMenu) {
  // Ensure dungeon and physics are properly initialized
  if (!dungeon || !dungeon.physics) {
    console.error("Dungeon scene or physics system is not initialized.");
    return;
  }

  // Ensure the dungeon has rooms
  if (!dungeon.rooms) {
    console.error("populateDungeon: Dungeon or rooms list is missing!");
    return;
  }

  const rooms = dungeon.rooms;

  // Ensure there are rooms in the dungeon
  if (rooms.length === 0) {
    console.error("populateDungeon: No rooms found in the dungeon!");
    return;
  }

  console.log(`populateDungeon: Found ${rooms.length} rooms.`);

  const TILE_SIZE = 32;
  const MIN_DISTANCE = 3; // Minimum distance from player (in tiles)

  const player = dungeon.player;  // Assuming you have a player object in the dungeon
  if (!player) {
    console.error("Player object is missing!");
    return;
  }
  
  // Find which room contains the player
  let playerRoom = null;
  for (const room of rooms) {
    const playerTileX = Math.floor(player.x / TILE_SIZE);
    const playerTileY = Math.floor(player.y / TILE_SIZE);
    
    if (playerTileX >= room._x1 && playerTileX <= room._x2 && 
        playerTileY >= room._y1 && playerTileY <= room._y2) {
      playerRoom = room;
      break;
    }
  }
  
  if (!playerRoom) {
    console.error("Could not determine player's starting room!");
    return;
  }
  
  console.log(`Player is in room at (${playerRoom._x1},${playerRoom._y1}) to (${playerRoom._x2},${playerRoom._y2})`);

  // Create a list of eligible rooms (excluding the player's room)
  const eligibleRooms = rooms.filter(room => room !== playerRoom);
  
  if (eligibleRooms.length === 0) {
    console.error("No eligible rooms found for armour placement!");
    return;
  }

  // Pick a random room for armour that's different from the player's room
  const armourRoom = eligibleRooms[Math.floor(Math.random() * eligibleRooms.length)];
  
  // Find a valid floor tile within the room for the armour
  let armourX, armourY;
  
  // Try to find a position near the center of the room
  armourX = Math.floor((armourRoom._x1 + armourRoom._x2) / 2);
  armourY = Math.floor((armourRoom._y1 + armourRoom._y2) / 2);
  
  // Check if this position is valid (not a wall)
  // This assumes you have a way to check if a tile is walkable
  // You might need to adapt this to your dungeon generation system
  const isWall = dungeon.isWall ? dungeon.isWall(armourX, armourY) : false;
  
  if (isWall) {
    // If the center is a wall, try to find another position within the room
    // This is a simple approach - you may want to improve it
    for (let x = armourRoom._x1 + 1; x < armourRoom._x2; x++) {
      for (let y = armourRoom._y1 + 1; y < armourRoom._y2; y++) {
        if (!dungeon.isWall || !dungeon.isWall(x, y)) {
          armourX = x;
          armourY = y;
          break;
        }
      }
    }
  }

  // Convert room coordinates to pixel coordinates
  const armourPixelX = armourX * TILE_SIZE + TILE_SIZE / 2;
  const armourPixelY = armourY * TILE_SIZE + TILE_SIZE / 2;

  const armour = new Armour(dungeon, armourPixelX, armourPixelY);
  if (typeof dungeon.addEntity === 'function') {
    dungeon.addEntity(armour);
  } else {
    dungeon.add.existing(armour);
  }
  console.log(`populateDungeon: Placed Armour at (${armourX}, ${armourY}) in a different room from player`);

  // Pick another random room for a general item (e.g., RedCent)
  // Avoiding the player's room for this item too
  const randomRoom = eligibleRooms[Math.floor(Math.random() * eligibleRooms.length)];
  const centerX = Math.floor((randomRoom._x1 + randomRoom._x2) / 2);
  const centerY = Math.floor((randomRoom._y1 + randomRoom._y2) / 2);
  const pixelX = centerX * TILE_SIZE + TILE_SIZE / 2;
  const pixelY = centerY * TILE_SIZE + TILE_SIZE / 2;

  // Create a random item (RedCent, etc.) at the calculated position
  const item = generateRandomItem(dungeon, pixelX, pixelY);
  if (typeof dungeon.addEntity === 'function') {
    dungeon.addEntity(item);
  } else {
    dungeon.add.existing(item);
  }
  console.log(`populateDungeon: Placed ${item.name} at (${centerX}, ${centerY})`);

  // Handle collision detection with the player
  if (player) {
    dungeon.physics.add.overlap(
      player.sprite,
      [item.sprite, armour.sprite],
      (playerSprite, pickedItem) => {
        const gameItem = pickedItem === item.sprite ? item : armour;
        if (!gameItem.pickedUp) {
          gameItem.pickedUp = true;
          console.log("Before pickup:", player.inventory.items);

          // Pickup logic
          gameItem.pickup(player);

          // Check if the 'pickup' sound is available in the sound manager
          if (dungeon.sound.get('pickup')) {
            const pickup = dungeon.sound.add('pickup', { loop: false, volume: 1 });

            // Play the pickup sound effect
            pickup.play();
          } else {
            console.warn('Pickup sound is not loaded yet.');
          }

          // Add the item to the character's inventory in localStorage
          let characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
          if (!characterSheet.inventory) {
            characterSheet.inventory = []; // Initialize inventory if it doesn't exist
          }

          // Only store necessary properties, like name, type, and texture
          const itemData = {
            name: gameItem.name,
            type: gameItem.type,
            texture: gameItem.name,
            descriptionGa: gameItem.descriptionGa,
            descriptionEn: gameItem.descriptionEn,
          };

          characterSheet.inventory.push(itemData);
          localStorage.setItem('characterSheet', JSON.stringify(characterSheet));

          console.log("After pickup:", player.inventory.items);

          // Now we tween the item to grow large and then fade out
          gameItem.sprite.setAlpha(1);  // Ensure item is fully visible

          // Grow and fade-out effect
          gameItem.sprite.scene.tweens.add({
            targets: gameItem.sprite,
            scaleX: 25, // Make the item grow
            scaleY: 25, // Make the item grow
            alpha: 0, // Fade out
            duration: 1000, // Duration for the effect
            ease: 'Power2',
            onComplete: () => {
              // After the effect, remove the item from the scene
              gameItem.sprite.destroy();
            },
          });

          // Show the item name using the custom font
          const itemName = gameItem.name;
          const itemText = dungeon.add.text(dungeon.scale.width * 0.05, dungeon.scale.height * 0.1, itemName, {
            font: '32px aonchlo',
            fill: 'LavenderBlush',
            wordWrap: { width: dungeon.scale.width * 0.8 },
          }).setDepth(44);

          // Fade the text out after a short delay
          dungeon.time.delayedCall(1500, () => {
            itemText.setAlpha(0);
          });

          // Update the inventory UI
          if (inventoryMenu) {
            inventoryMenu.updateInventory();
          }
        }
      },
      null,
      dungeon
    );
  }
}
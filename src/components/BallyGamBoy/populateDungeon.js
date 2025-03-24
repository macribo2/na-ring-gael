import { Item, RedCent, Armour } from './entities';  // Import the base Item class and specific items

// Helper function to generate a random item (e.g., RedCent, etc.)
function generateRandomItem(scene, x, y) {
  const itemTypes = [RedCent];  // Add more item types here as you create them
  const randomItemClass = itemTypes[Math.floor(Math.random() * itemTypes.length)];
  return new randomItemClass(scene, x, y);  // Create a random item at the given coordinates
}
// Replace the armor placement code with this more robust approach
export default function populateDungeon(dungeon, inventoryMenu) {
  if (!dungeon || !dungeon.physics) {
    console.error("Dungeon scene or physics system is not initialized.");
    return;
  }

  if (!dungeon.rooms || dungeon.rooms.length === 0) {
    console.error("populateDungeon: No rooms found in the dungeon!");
    return;
  }

  const rooms = dungeon.rooms;
  console.log(`populateDungeon: Found ${rooms.length} rooms.`);

  const TILE_SIZE = 32;
  const player = dungeon.player;

  if (!player) {
    console.error("Player object is missing!");
    return;
  }

  // Helper function to find a guaranteed valid floor tile in a room
  function findValidFloorTile(room) {
    // First, collect ALL valid floor tiles in the room
    const floorTiles = [];
    
    // Scan the entire room
    for (let x = room._x1 + 1; x < room._x2 - 1; x++) {
      for (let y = room._y1 + 1; y < room._y2 - 1; y++) {
        // Check if this is a floor tile (0) AND all surrounding tiles are walkable
        // This ensures we're not right next to a wall
        if (dungeon.map[x][y] === 0) {
          // Only add tiles that aren't adjacent to walls to ensure accessibility
          let isFullyAccessible = true;
          
          // Check all 8 surrounding tiles to make sure we're not adjacent to walls
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              // Skip the center tile (which is our current position)
              if (dx === 0 && dy === 0) continue;
              
              // Check if adjacent tile is a wall
              const adjacentTile = dungeon.map[x + dx][y + dy];
              if (adjacentTile !== 0) {
                isFullyAccessible = false;
                break;
              }
            }
            if (!isFullyAccessible) break;
          }
          
          if (isFullyAccessible) {
            floorTiles.push({ x, y });
          }
        }
      }
    }

    // If no fully accessible tiles found, fall back to any floor tile
    if (floorTiles.length === 0) {
      for (let x = room._x1 + 1; x < room._x2 - 1; x++) {
        for (let y = room._y1 + 1; y < room._y2 - 1; y++) {
          if (dungeon.map[x][y] === 0) {
            floorTiles.push({ x, y });
          }
        }
      }
    }
    
    if (floorTiles.length === 0) {
      console.error("No valid floor tiles found in the room at all!");
      // Return the center of the room as a last resort
      return {
        x: Math.floor((room._x1 + room._x2) / 2),
        y: Math.floor((room._y1 + room._y2) / 2)
      };
    }
    
    // Calculate the center of the room
    const centerX = Math.floor((room._x1 + room._x2) / 2);
    const centerY = Math.floor((room._y1 + room._y2) / 2);
    
    // Find the floor tile closest to the center
    let closestTile = floorTiles[0];
    let closestDistance = Number.MAX_VALUE;
    
    for (const tile of floorTiles) {
      const distance = Math.sqrt(
        Math.pow(tile.x - centerX, 2) + Math.pow(tile.y - centerY, 2)
      );
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestTile = tile;
      }
    }
    
    return closestTile;
  }

  // Always place armor in Room 4 (5th room) if it exists, otherwise use the last room
  let armourRoom = rooms.length > 4 ? rooms[4] : rooms[rooms.length - 1];
  console.log(`populateDungeon: Placing armor in ${rooms.length > 4 ? "Room 4" : "last available room"}.`);

  // Find a valid floor tile for the armor
  const armourTile = findValidFloorTile(armourRoom);
  const armourPixelX = armourTile.x * TILE_SIZE + TILE_SIZE / 2;
  const armourPixelY = armourTile.y * TILE_SIZE + TILE_SIZE / 2;

  // Create and add the armor entity
  const armour = new Armour(dungeon, armourPixelX, armourPixelY);
  if (typeof dungeon.addEntity === 'function') {
    dungeon.addEntity(armour);
  } else {
    dungeon.add.existing(armour);
  }
  console.log(`populateDungeon: Placed Armour at (${armourTile.x}, ${armourTile.y})`);

  // Pick another random room for a general item (e.g., RedCent)
  // Make sure it's not the same room as the armor
  let randomRoomIndex;
  do {
    randomRoomIndex = Math.floor(Math.random() * rooms.length);
  } while (rooms.length > 1 && rooms[randomRoomIndex] === armourRoom);
  
  const randomRoom = rooms[randomRoomIndex];
  
  // Find a valid floor tile for the random item
  const itemTile = findValidFloorTile(randomRoom);
  const pixelX = itemTile.x * TILE_SIZE + TILE_SIZE / 2;
  const pixelY = itemTile.y * TILE_SIZE + TILE_SIZE / 2;

  // Create a random item (RedCent, etc.) at the calculated position
  const item = generateRandomItem(dungeon, pixelX, pixelY);
  if (typeof dungeon.addEntity === 'function') {
    dungeon.addEntity(item);
  } else {
    dungeon.add.existing(item);
  }
  console.log(`populateDungeon: Placed ${item.name} at (${itemTile.x}, ${itemTile.y})`);

  // Handle collision detection with the player
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

        // Play pickup sound effect if available
        if (dungeon.sound.get('pickup')) {
          const pickup = dungeon.sound.add('pickup', { loop: false, volume: 1 });
          pickup.play();
        } else {
          console.warn('Pickup sound is not loaded yet.');
        }

        // Add the item to the character's inventory in localStorage
        let characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
        if (!characterSheet.inventory) {
          characterSheet.inventory = [];
        }

        // Store necessary item properties
        characterSheet.inventory.push({
          name: gameItem.name,
          type: gameItem.type,
          texture: gameItem.name,
          descriptionGa: gameItem.descriptionGa,
          descriptionEn: gameItem.descriptionEn,
        });

        localStorage.setItem('characterSheet', JSON.stringify(characterSheet));
        console.log("After pickup:", player.inventory.items);

        // **Update quest state when armor is picked up**
        if (gameItem instanceof Armour) {
          if (!characterSheet.quests) {
            characterSheet.quests = {};
          }
          characterSheet.quests.armorQuestComplete = true;
          localStorage.setItem('characterSheet', JSON.stringify(characterSheet));
          console.log("Quest updated: Armor picked up!");
          this.scene.launch('NotificationScene', { messageType: 'armorFound' });

        }

        // Tween effect to fade out item
        gameItem.sprite.setAlpha(1);
        gameItem.sprite.scene.tweens.add({
          targets: gameItem.sprite,
          scaleX: 25,
          scaleY: 25,
          alpha: 0,
          duration: 1000,
          ease: 'Power2',
          onComplete: () => {
            gameItem.sprite.destroy();
          },
        });

        // Show item name briefly
        const itemText = dungeon.add.text(dungeon.scale.width * 0.05, dungeon.scale.height * 0.1, gameItem.descriptionGa , {
          font: '32px aonchlo',
          fill: 'LavenderBlush',
          wordWrap: { width: dungeon.scale.width * 0.8 },
        }).setDepth(44).setScrollFactor(0);

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
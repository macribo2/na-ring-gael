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

  let TILE_SIZE = 32;

  // Guarantee that an Armour item is placed in a random room
  const armourRoom = rooms[Math.floor(Math.random() * rooms.length)];
  const armourX = Math.floor((armourRoom._x1 + armourRoom._x2) / 2);
  const armourY = Math.floor((armourRoom._y1 + armourRoom._y2) / 2);
  const armourPixelX = armourX * TILE_SIZE + TILE_SIZE / 2;
  const armourPixelY = armourY * TILE_SIZE + TILE_SIZE / 2;

  const armour = new Armour(dungeon, armourPixelX, armourPixelY);
  if (typeof dungeon.addEntity === 'function') {
    dungeon.addEntity(armour);
  } else {
    dungeon.add.existing(armour);
  }
  console.log(`populateDungeon: Placed Armour at (${armourX}, ${armourY})`);

  // Pick another random room for a general item
  const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
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
  const player = dungeon.player;  // Assuming you have a player object in the dungeon
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

          // Remove item after pickup
          gameItem.sprite.destroy();

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

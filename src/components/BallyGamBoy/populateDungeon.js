import { Item, RedCent, Armour } from './entities';  // Import the base Item class and specific items

// Helper function to generate a random item (e.g., RedCent, etc.)
function generateRandomItem(scene, x, y) {
  const itemTypes = [RedCent];  // Add more item types here as you create them
  const randomItemClass = itemTypes[Math.floor(Math.random() * itemTypes.length)];
  return new randomItemClass(scene, x, y);  // Create a random item at the given coordinates
}

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

  // Always place armor in Room 4 (5th room) if it exists, otherwise use the last room
  let armourRoom = rooms.length > 4 ? rooms[4] : rooms[rooms.length - 1];
  console.log(`populateDungeon: Placing armor in ${rooms.length > 4 ? "Room 4" : "last available room"}.`);

  // Find the true center of the room
  let centreX = Math.floor((armourRoom._x1 + armourRoom._x2) / 2);
  let centreY = Math.floor((armourRoom._y1 + armourRoom._y2) / 2);

  // Ensure we pick a floor tile within the room
  let validSpawn = false;
  while (!validSpawn) {
    if (dungeon.map[centreX][centreY] === 0) { // Assuming 0 is a floor tile
      validSpawn = true;
    } else {
      centreY++; // Try the next tile down until a valid floor is found
    }
  }

  // Convert tile coordinates to pixel coordinates
  const armourPixelX = centreX * TILE_SIZE + TILE_SIZE / 2;
  const armourPixelY = centreY * TILE_SIZE + TILE_SIZE / 2;

  // Create and add the armor entity
  const armour = new Armour(dungeon, armourPixelX, armourPixelY);
  if (typeof dungeon.addEntity === 'function') {
    dungeon.addEntity(armour);
  } else {
    dungeon.add.existing(armour);
  }
  console.log(`populateDungeon: Placed Armour at (${centreX}, ${centreY})`);

  // Pick another random room for a general item (e.g., RedCent)
  const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
  const itemX = Math.floor((randomRoom._x1 + randomRoom._x2) / 2);
  const itemY = Math.floor((randomRoom._y1 + randomRoom._y2) / 2);
  const pixelX = itemX * TILE_SIZE + TILE_SIZE / 2;
  const pixelY = itemY * TILE_SIZE + TILE_SIZE / 2;

  // Create a random item (RedCent, etc.) at the calculated position
  const item = generateRandomItem(dungeon, pixelX, pixelY);
  if (typeof dungeon.addEntity === 'function') {
    dungeon.addEntity(item);
  } else {
    dungeon.add.existing(item);
  }
  console.log(`populateDungeon: Placed ${item.name} at (${itemX}, ${itemY})`);

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
        const itemText = dungeon.add.text(dungeon.scale.width * 0.05, dungeon.scale.height * 0.1, gameItem.name, {
          font: '32px aonchlo',
          fill: 'LavenderBlush',
          wordWrap: { width: dungeon.scale.width * 0.8 },
        }).setDepth(44);

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

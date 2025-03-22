import { Item, RedCent, Armour } from './entities';

function generateRandomItem(scene, x, y) {
  const itemTypes = [RedCent];
  const randomItemClass = itemTypes[Math.floor(Math.random() * itemTypes.length)];
  return new randomItemClass(scene, x, y);
}

export default function populateDungeon(dungeon, inventoryMenu) {
  if (!dungeon || !dungeon.physics) {
    console.error("Dungeon scene or physics system is not initialized.");
    return;
  }

  if (!dungeon.rooms || dungeon.rooms.length === 0) {
    console.error("No rooms found in the dungeon!");
    return;
  }

  console.log(`populateDungeon: Found ${dungeon.rooms.length} rooms.`);

  const TILE_SIZE = 32;
  const MIN_DISTANCE = 3;
  const player = dungeon.player;

  if (!player) {
    console.error("Player object is missing!");
    return;
  }

  function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  // Filter rooms to those at least 3x3 tiles to ensure valid center
  const validRooms = dungeon.rooms.filter(room => {
    const width = room._x2 - room._x1 + 1;
    const height = room._y2 - room._y1 + 1;
    return width >= 3 && height >= 3;
  });

  if (validRooms.length === 0) {
    console.error("No valid rooms to place armour!");
    return;
  }

  let armourX, armourY, validLocation = false;
  while (!validLocation) {
    const armourRoom = validRooms[Math.floor(Math.random() * validRooms.length)];
    
    // Calculate center of the room based on its dimensions
    const roomWidth = armourRoom._x2 - armourRoom._x1 + 1;
    const roomHeight = armourRoom._y2 - armourRoom._y1 + 1;
    armourX = armourRoom._x1 + Math.floor(roomWidth / 2);
    armourY = armourRoom._y1 + Math.floor(roomHeight / 2);

    const distance = calculateDistance(armourX, armourY, player.x / TILE_SIZE, player.y / TILE_SIZE);
    if (distance > MIN_DISTANCE) {
      validLocation = true;
    }
  }

  const armourPixelX = armourX * TILE_SIZE + TILE_SIZE / 2;
  const armourPixelY = armourY * TILE_SIZE + TILE_SIZE / 2;

  const armour = new Armour(dungeon, armourPixelX, armourPixelY);
  if (typeof dungeon.addEntity === 'function') {
    dungeon.addEntity(armour);
  } else {
    dungeon.add.existing(armour);
  }
  console.log(`populateDungeon: Placed Armour at (${armourX}, ${armourY})`);

  // Existing code for placing other items...
  const randomRoom = validRooms[Math.floor(Math.random() * validRooms.length)];
  const roomWidth = randomRoom._x2 - randomRoom._x1 + 1;
  const roomHeight = randomRoom._y2 - randomRoom._y1 + 1;
  const centerX = randomRoom._x1 + Math.floor(roomWidth / 2);
  const centerY = randomRoom._y1 + Math.floor(roomHeight / 2);
  const pixelX = centerX * TILE_SIZE + TILE_SIZE / 2;
  const pixelY = centerY * TILE_SIZE + TILE_SIZE / 2;

  const item = generateRandomItem(dungeon, pixelX, pixelY);
  if (typeof dungeon.addEntity === 'function') {
    dungeon.addEntity(item);
  } else {
    dungeon.add.existing(item);
  }
  console.log(`populateDungeon: Placed ${item.name} at (${centerX}, ${centerY})`);

  if (player) {
    dungeon.physics.add.overlap(
      player.sprite,
      [item.sprite, armour.sprite],
      (playerSprite, pickedItem) => {
        const gameItem = pickedItem === item.sprite ? item : armour;
        if (!gameItem.pickedUp) {
          gameItem.pickedUp = true;
          gameItem.pickup(player);

          let characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
          if (!characterSheet.inventory) {
            characterSheet.inventory = [];
          }

          const itemData = {
            name: gameItem.name,
            type: gameItem.type,
            texture: gameItem.name,
            descriptionGa: gameItem.descriptionGa,
            descriptionEn: gameItem.descriptionEn,
          };

          characterSheet.inventory.push(itemData);
          localStorage.setItem('characterSheet', JSON.stringify(characterSheet));

          gameItem.sprite.destroy();

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
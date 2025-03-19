import { RedCent } from './entities';

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

    // Pick a random room from the dungeon
    const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
    let TILE_SIZE = 32;

    // Calculate the center coordinates of the room
    const centerX = Math.floor((randomRoom._x1 + randomRoom._x2) / 2);
    const centerY = Math.floor((randomRoom._y1 + randomRoom._y2) / 2);

    const pixelX = centerX * TILE_SIZE + TILE_SIZE / 2;
    const pixelY = centerY * TILE_SIZE + TILE_SIZE / 2;

    // Create a RedCent item at the calculated position
    const redCent = new RedCent(dungeon, pixelX, pixelY);

    // Add the Red Cent to the dungeon or entity group
    if (typeof dungeon.addEntity === 'function') {
        dungeon.addEntity(redCent);
    } else {
        dungeon.add.existing(redCent);
    }
    console.log(`populateDungeon: Placed Red Cent at (${centerX}, ${centerY})`);

    // Ensure the RedCent has a physics body enabled
    dungeon.physics.world.enable(redCent.sprite);
    redCent.sprite.body.setCollideWorldBounds(true); // Prevent RedCent from going out of bounds
    redCent.sprite.body.setImmovable(true); // Make RedCent immovable

    // Handle collision detection with the player
    const player = dungeon.player;  // Assuming you have a player object in the dungeon

    if (player) {
        dungeon.physics.add.overlap(
            player.sprite,
            redCent.sprite,
            () => {
                if (!redCent.pickedUp) {  // Prevent multiple pickups
                    redCent.pickedUp = true;
                    console.log("Before pickup:", player.inventory.items);

                    // Pickup logic
                    redCent.pickup(player);

                    // Add RedCent to the character's inventory in localStorage
                    let characterSheet = JSON.parse(localStorage.getItem('characterSheet')) || {};
                    if (!characterSheet.inventory) {
                        characterSheet.inventory = []; // Initialize inventory if it doesn't exist
                    }

                    // Only store necessary properties, like name and type
                    const redCentData = {
                        name: redCent.name, // Add relevant properties
                        type: redCent.type,
                        texture: redCent.texture,
                        descriptionGa: redCent.descriptionGa, // Add other relevant properties as needed
                        descriptionEn: redCent.descriptionEn, // Add other relevant properties as needed
                    };

                    characterSheet.inventory.push(redCentData); // Add the RedCent to the inventory
                    localStorage.setItem('characterSheet', JSON.stringify(characterSheet));

                    console.log("After pickup:", player.inventory.items);

                    // Optional: Remove Red Cent after pickup
                    redCent.sprite.destroy();

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
